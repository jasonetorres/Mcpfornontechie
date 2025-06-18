import React, { useState, useEffect } from 'react'
import { X, Mail, Lock, User, Building, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: (wasSuccessfulSignup?: boolean) => void
  defaultMode?: 'signin' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')
  const { signIn, signUp } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: '',
    company: ''
  })

  // Reset form when mode changes
  useEffect(() => {
    setMode(defaultMode)
    resetForm()
  }, [defaultMode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError(null)
    setSuccess(null)
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return false
    }

    if (mode === 'signup') {
      if (!formData.fullName) {
        setError('Full name is required')
        return false
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)
    setStep('processing')

    try {
      if (mode === 'signup') {
        // Show processing message
        setSuccess('Creating your account...')
        
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          role: formData.role,
          company: formData.company
        })

        if (error) {
          setError(error.message)
          setStep('form')
        } else {
          setSuccess('Account created successfully! Welcome to MCP4 Everyone!')
          setStep('success')
          
          // Close modal after showing success - reduced delay for better UX
          setTimeout(() => {
            onClose(true)
            resetForm()
          }, 1500)
        }
      } else {
        // Show processing message
        setSuccess('Signing you in...')
        
        const { error } = await signIn(formData.email, formData.password)
        
        if (error) {
          setError(error.message)
          setStep('form')
        } else {
          setSuccess('Welcome back! You are now signed in.')
          setStep('success')
          
          // Close modal after showing success - reduced delay for better UX
          setTimeout(() => {
            onClose(false)
            resetForm()
          }, 1000)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setStep('form')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: '',
      company: ''
    })
    setError(null)
    setSuccess(null)
    setStep('form')
    setLoading(false)
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    resetForm()
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content max-w-md w-full" 
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
          disabled={loading}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="heading-md mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Join MCP4 Everyone'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'signin' 
                ? 'Sign in to continue your learning journey' 
                : 'Create your account to track progress and access exclusive content'
              }
            </p>
          </div>

          {/* Processing State */}
          {step === 'processing' && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
              </div>
              <h3 className="heading-sm mb-2">
                {mode === 'signup' ? 'Creating Your Account' : 'Signing You In'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {mode === 'signup' 
                  ? 'Setting up your personalized learning experience...' 
                  : 'Verifying your credentials and loading your dashboard...'
                }
              </p>
              <div className="badge-primary p-3">
                <p className="text-matrix-primary text-sm">
                  {success || (mode === 'signup' ? 'This may take a few moments...' : 'Almost there...')}
                </p>
              </div>
            </div>
          )}

          {/* Success State */}
          {step === 'success' && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="heading-sm mb-2">
                {mode === 'signup' ? 'Account Created!' : 'Welcome Back!'}
              </h3>
              <div className="badge-success p-3">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Form State */}
          {step === 'form' && (
            <>
              {/* Error Display */}
              {error && (
                <div className="badge-error p-3 mb-4 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              {/* Success Display */}
              {success && (
                <div className="badge-primary p-3 mb-4 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-matrix-primary mt-0.5 flex-shrink-0" />
                  <p className="text-matrix-primary text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="form-input pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="form-label">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="form-input pl-10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      disabled={loading}
                      className="form-input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="form-label">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          minLength={6}
                          disabled={loading}
                          className="form-input pl-10"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Role</label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          disabled={loading}
                          className="form-input"
                          placeholder="Your role"
                        />
                      </div>
                      <div>
                        <label className="form-label">Company</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="form-input pl-9"
                            placeholder="Company"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>{mode === 'signin' ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    onClick={switchMode}
                    disabled={loading}
                    className="text-matrix-primary hover:text-matrix-secondary ml-1 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}