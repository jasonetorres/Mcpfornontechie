import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, LogOut, BookOpen, Trophy, ChevronDown, Shield, Download, HelpCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { user, profile, signOut } = useAuth()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
      setIsOpen(false)
      // Optional: Show a success message
      console.log('Successfully signed out')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Check if user is admin
  const isAdmin = profile?.role?.toLowerCase().includes('admin') || false;

  if (!user || !profile) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-foreground hover:text-matrix-primary transition-colors duration-200 bg-muted/50 hover:bg-muted rounded-lg px-3 py-2 border border-border"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center overflow-hidden">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <User className="w-4 h-4 text-primary-foreground" />
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium truncate max-w-32">
            {profile.full_name || profile.email.split('@')[0]}
          </div>
          {profile.role && (
            <div className="text-xs text-muted-foreground truncate max-w-32">{profile.role}</div>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 sm:w-80 glass-strong rounded-xl shadow-lg z-20 animate-scale-in origin-top-right">
          {/* User Info Header */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-matrix-primary/10 to-matrix-secondary/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-matrix-primary to-matrix-secondary rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-primary-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground font-semibold truncate">
                  {profile.full_name || 'User'}
                </div>
                <div className="text-muted-foreground text-sm truncate">{profile.email}</div>
                {profile.role && (
                  <div className="text-matrix-primary text-xs truncate">{profile.role}</div>
                )}
                {profile.company && (
                  <div className="text-muted-foreground text-xs truncate">{profile.company}</div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2">
              Account
            </div>
            
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 w-full"
            >
              <Settings className="w-5 h-5" />
              <div>
                <div className="font-medium">Profile Settings</div>
                <div className="text-xs text-muted-foreground">Manage your account information</div>
              </div>
            </Link>
            
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2 mt-2">
              Learning
            </div>
            
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 w-full"
            >
              <BookOpen className="w-5 h-5" />
              <div>
                <div className="font-medium">Learning Dashboard</div>
                <div className="text-xs text-muted-foreground">Track your progress and continue learning</div>
              </div>
            </Link>

            <Link
              to="/achievements"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 w-full"
            >
              <Trophy className="w-5 h-5" />
              <div>
                <div className="font-medium">Achievements</div>
                <div className="text-xs text-muted-foreground">View your badges and milestones</div>
              </div>
            </Link>

            {/* Admin Section - Only show for admins */}
            {isAdmin && (
              <>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2 mt-2">
                  Administration
                </div>
                
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 w-full"
                >
                  <Shield className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="font-medium">Admin Dashboard</div>
                    <div className="text-xs text-muted-foreground">Manage users and content</div>
                  </div>
                </Link>
              </>
            )}

            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2 mt-2">
              Support
            </div>

            <Link
              to="/office-hours"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 w-full"
            >
              <HelpCircle className="w-5 h-5" />
              <div>
                <div className="font-medium">Get Help</div>
                <div className="text-xs text-muted-foreground">Join office hours or ask questions</div>
              </div>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false)
                // Add download functionality here
                console.log('Download data requested')
              }}
              className="flex items-center space-x-3 px-3 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 w-full text-left"
            >
              <Download className="w-5 h-5" />
              <div>
                <div className="font-medium">Download My Data</div>
                <div className="text-xs text-muted-foreground">Export your learning progress</div>
              </div>
            </button>
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-border">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center space-x-3 px-3 py-3 text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg transition-colors duration-200 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              <div>
                <div className="font-medium">
                  {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                </div>
                <div className="text-xs text-destructive/80">
                  {isSigningOut ? 'Please wait...' : 'End your current session'}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}