import React, { useState, useRef, useEffect } from 'react'
import { User, Mail, Building, Briefcase, Save, Camera, Download, Shield, HelpCircle, Upload, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    company: '',
  })

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        role: profile.role || '',
        company: profile.company || '',
      })
      
      if (profile.avatar_url) {
        setImagePreview(profile.avatar_url)
      }
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploadingImage(true)

    try {
      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImagePreview(imageUrl)
        
        // In a real app, you would upload to a service like Supabase Storage
        // For demo purposes, we'll store the base64 image in localStorage
        updateProfile({ avatar_url: imageUrl })
        setUploadingImage(false)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
      setUploadingImage(false)
    }
  }

  const removeProfilePicture = async () => {
    try {
      await updateProfile({ avatar_url: null })
      setImagePreview(null)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error removing profile picture:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const { error } = await updateProfile(formData)

    if (!error) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }

    setLoading(false)
  }

  const handleDownloadData = () => {
    if (!user) return

    // Collect user data
    const userData = {
      profile: profile,
      achievements: JSON.parse(localStorage.getItem(`achievements-${user.id}`) || '[]'),
      progress: JSON.parse(localStorage.getItem('mock-progress') || '[]').filter((item: any) => item.user_id === user.id),
      templates: JSON.parse(localStorage.getItem(`templates-${user.id}`) || '[]'),
      tutorials: JSON.parse(localStorage.getItem('tutorial-completions') || '[]').filter((item: any) => item.userId === user.id)
    }

    // Create and download file
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mcp-academy-data-${user.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-12">
            <User className="w-16 h-16 text-matrix-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Sign In to View Profile</h1>
            <p className="text-muted-foreground mb-8">
              Create an account to manage your profile and track your learning progress
            </p>
            <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>

        <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {imagePreview || profile?.avatar_url ? (
                  <img 
                    src={imagePreview || profile?.avatar_url} 
                    alt="Avatar" 
                    className="w-24 h-24 rounded-full object-cover" 
                  />
                ) : (
                  <User className="w-12 h-12 text-primary-foreground" />
                )}
              </div>
              
              {/* Upload Button */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="absolute bottom-0 right-0 w-8 h-8 bg-matrix-primary hover:bg-matrix-secondary rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
              >
                {uploadingImage ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                ) : (
                  <Camera className="w-4 h-4 text-primary-foreground" />
                )}
              </button>
              
              {/* Remove Button */}
              {(imagePreview || profile?.avatar_url) && (
                <button 
                  onClick={removeProfilePicture}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive hover:bg-destructive/80 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-3 h-3 text-destructive-foreground" />
                </button>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-foreground">{profile?.full_name || 'User'}</h2>
            <p className="text-muted-foreground">{profile?.email}</p>
            
            {/* Upload Instructions */}
            <div className="mt-4 text-center">
              <p className="text-muted-foreground text-sm mb-2">
                Click the camera icon to upload a profile picture
              </p>
              <p className="text-muted-foreground text-xs">
                Supported formats: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
            
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {success && (
            <div className="bg-matrix-primary/20 border border-matrix-primary/30 rounded-lg p-3 mb-6">
              <p className="text-matrix-primary text-sm">Profile updated successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 text-muted-foreground cursor-not-allowed"
                />
              </div>
              <p className="text-muted-foreground text-sm mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-foreground font-medium mb-2">Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20"
                  placeholder="e.g., Community Manager, Marketing Director"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground font-medium mb-2">Company</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:border-matrix-primary focus:outline-none focus:ring-2 focus:ring-matrix-primary/20"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </form>
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-card/50 backdrop-blur-md border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={handleDownloadData}
              className="w-full text-left px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-matrix-primary" />
                <div>
                  <div className="text-foreground font-medium">Download My Data</div>
                  <div className="text-muted-foreground text-sm">Export your learning progress and data</div>
                </div>
              </div>
            </button>
            
            <Link
              to="/office-hours"
              className="w-full text-left px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200 block"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-matrix-secondary" />
                <div>
                  <div className="text-foreground font-medium">Get Help</div>
                  <div className="text-muted-foreground text-sm">Join office hours or ask questions</div>
                </div>
              </div>
            </Link>

            <button className="w-full text-left px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-foreground font-medium">Privacy Settings</div>
                  <div className="text-muted-foreground text-sm">Manage your data and privacy preferences</div>
                </div>
              </div>
            </button>

            <button className="w-full text-left px-4 py-3 bg-destructive/20 hover:bg-destructive/30 border border-destructive/30 rounded-lg transition-colors duration-200">
              <div className="text-destructive font-medium">Delete Account</div>
              <div className="text-destructive/80 text-sm">Permanently delete your account and data</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}