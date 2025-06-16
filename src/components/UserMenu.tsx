import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, LogOut, BookOpen, Trophy } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  if (!user || !profile) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <span className="hidden md:block">{profile.full_name || profile.email}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-20">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <div className="text-white font-medium">{profile.full_name || 'User'}</div>
                  <div className="text-gray-400 text-sm">{profile.email}</div>
                  {profile.role && (
                    <div className="text-blue-300 text-xs">{profile.role}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span>Profile Settings</span>
              </Link>
              
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4" />
                <span>Learning Dashboard</span>
              </Link>

              <Link
                to="/achievements"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <Trophy className="w-4 h-4" />
                <span>Achievements</span>
              </Link>
            </div>

            <div className="p-2 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors duration-200 w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}