import React, { useState } from 'react'
import { User, Mail, Building, Briefcase, Save, Camera, Download, Shield, HelpCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    role: profile?.role || '',
    company: profile?.company || '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12">
            <User className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Sign In to View Profile</h1>
            <p className="text-gray-300 mb-8">
              Create an account to manage your profile and track your learning progress
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
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
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">Manage your account information and preferences</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-white">{profile?.full_name || 'User'}</h2>
            <p className="text-gray-400">{profile?.email}</p>
          </div>

          {success && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-6">
              <p className="text-green-300 text-sm">Profile updated successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="w-full bg-slate-700 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Community Manager, Marketing Director"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Company</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </form>
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={handleDownloadData}
              className="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">Download My Data</div>
                  <div className="text-gray-400 text-sm">Export your learning progress and data</div>
                </div>
              </div>
            </button>
            
            <Link
              to="/office-hours"
              className="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 block"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-medium">Get Help</div>
                  <div className="text-gray-400 text-sm">Join office hours or ask questions</div>
                </div>
              </div>
            </Link>

            <button className="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-white font-medium">Privacy Settings</div>
                  <div className="text-gray-400 text-sm">Manage your data and privacy preferences</div>
                </div>
              </div>
            </button>

            <button className="w-full text-left px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors duration-200">
              <div className="text-red-300 font-medium">Delete Account</div>
              <div className="text-red-400 text-sm">Permanently delete your account and data</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}