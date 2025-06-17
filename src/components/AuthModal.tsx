import React, { useState } from 'react'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    setStep('processing')

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setStep('form')
          setLoading(false)
          return
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters')
          setStep('form')
          setLoading(false)
          return
        }

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
          setSuccess('Account created successfully! Welcome to MCP Academy!')
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
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 relative shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Join MCP Academy'}
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
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {mode === 'signup' ? 'Creating Your Account' : 'Signing You In'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {mode === 'signup' 
                ? 'Setting up your personalized learning experience...' 
                : 'Verifying your credentials and loading your dashboard...'
              }
            </p>
            <div className="bg-matrix-primary/20 border border-matrix-primary/30 rounded-lg p-3">
              <p className="text-matrix-primary text-sm">
                {success || (mode === 'signup' ? 'This may take a few moments...' : 'Almost there...')}
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {mode === 'signup' ? 'Account Created!' : 'Welcome Back!'}
            </h3>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Form State */}
        {step === 'form' && (
          <>
            {/* Error Display */}
            {error && (
              <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-3 mb-4 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Success Display */}
            {success && (
              <div className="bg-matrix-primary/20 border border-matrix-primary/30 rounded-lg p-3 mb-4 flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-matrix-primary mt-0.5 flex-shrink-0" />
                <p className="text-matrix-primary text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-foreground font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-foreground font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">Password</label>
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
                    className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-foreground font-medium mb-2">Confirm Password</label>
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
                        className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-foreground font-medium mb-2">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your role"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground font-medium mb-2">Company</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={loading}
                          className="w-full bg-input border border-border rounded-lg pl-9 pr-4 py-2 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
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
  )
}