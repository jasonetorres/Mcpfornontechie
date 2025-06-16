import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, LogOut, BookOpen, Trophy, ChevronDown, Shield, Download } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false)
      // Optional: Show a success message or redirect
      console.log('Successfully signed out')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user || !profile) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium truncate max-w-32">
            {profile.full_name || profile.email.split('@')[0]}
          </div>
          {profile.role && (
            <div className="text-xs text-gray-400 truncate max-w-32">{profile.role}</div>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl z-20">
            {/* User Info Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">
                    {profile.full_name || 'User'}
                  </div>
                  <div className="text-gray-400 text-sm truncate">{profile.email}</div>
                  {profile.role && (
                    <div className="text-blue-300 text-xs truncate">{profile.role}</div>
                  )}
                  {profile.company && (
                    <div className="text-gray-500 text-xs truncate">{profile.company}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 w-full"
              >
                <Settings className="w-4 h-4" />
                <div>
                  <div className="font-medium">Profile Settings</div>
                  <div className="text-xs text-gray-400">Manage your account</div>
                </div>
              </Link>
              
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 w-full"
              >
                <BookOpen className="w-4 h-4" />
                <div>
                  <div className="font-medium">Learning Dashboard</div>
                  <div className="text-xs text-gray-400">Track your progress</div>
                </div>
              </Link>

              <Link
                to="/achievements"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 w-full"
              >
                <Trophy className="w-4 h-4" />
                <div>
                  <div className="font-medium">Achievements</div>
                  <div className="text-xs text-gray-400">View your badges</div>
                </div>
              </Link>

              <div className="border-t border-white/10 my-2"></div>

              <button
                onClick={() => {
                  setIsOpen(false)
                  // Add download functionality here
                  console.log('Download data requested')
                }}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 w-full"
              >
                <Download className="w-4 h-4" />
                <div>
                  <div className="font-medium">Download Data</div>
                  <div className="text-xs text-gray-400">Export your progress</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  // Add privacy settings functionality here
                  console.log('Privacy settings requested')
                }}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 w-full"
              >
                <Shield className="w-4 h-4" />
                <div>
                  <div className="font-medium">Privacy Settings</div>
                  <div className="text-xs text-gray-400">Manage data privacy</div>
                </div>
              </button>
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors duration-200 w-full"
              >
                <LogOut className="w-4 h-4" />
                <div>
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs text-red-400">End your session</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}