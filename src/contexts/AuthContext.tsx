import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  email: string
  full_name: string | null
  role: string | null
  company: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  signUp: (email: string, password: string, userData?: Partial<Profile>) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  refreshProfile: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing auth...')
        
        // Check for existing mock user
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser && mounted) {
          const userData = JSON.parse(mockUser)
          console.log('✅ Found existing user:', userData.email)
          
          // Create a proper session object
          const mockSession = {
            access_token: 'mock-token-' + Date.now(),
            user: userData,
            expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
            expires_in: 24 * 60 * 60,
            refresh_token: 'mock-refresh-' + Date.now(),
            token_type: 'bearer'
          } as Session

          setUser(userData)
          setSession(mockSession)
          await fetchProfile(userData.id)
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log('🔄 Auth state changed:', event, session?.user?.email || 'No user')
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        console.log('👤 User in auth change, fetching profile...')
        await fetchProfile(session.user.id)
      } else {
        console.log('👤 No user in auth change, clearing profile')
        setProfile(null)
      }
      
      if (mounted) {
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('🔍 Fetching profile for user:', userId)
      
      // Check localStorage first
      const mockProfile = localStorage.getItem('mock-profile')
      if (mockProfile) {
        const profileData = JSON.parse(mockProfile)
        console.log('✅ Found existing profile:', profileData.email)
        setProfile(profileData)
        return
      }

      // Create a basic profile if none exists
      const mockUser = localStorage.getItem('mock-user')
      if (mockUser) {
        const userData = JSON.parse(mockUser)
        const basicProfile = {
          id: userId,
          email: userData.email,
          full_name: userData.user_metadata?.full_name || null,
          role: userData.user_metadata?.role || null,
          company: userData.user_metadata?.company || null,
          avatar_url: userData.user_metadata?.avatar_url || null,
          created_at: userData.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        console.log('✅ Created new profile:', basicProfile.email)
        localStorage.setItem('mock-profile', JSON.stringify(basicProfile))
        setProfile(basicProfile)
      }
    } catch (error) {
      console.error('❌ Error in fetchProfile:', error)
      setProfile(null)
    }
  }

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      console.log('🔄 Signing up user:', email)
      setLoading(true)
      
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name,
            role: userData?.role,
            company: userData?.company
          }
        }
      })

      if (!error && data.user) {
        console.log('✅ User signed up successfully')
        
        // Create profile with current timestamp
        const now = new Date().toISOString()
        const profileData = {
          id: data.user.id,
          email: data.user.email!,
          full_name: userData?.full_name || null,
          role: userData?.role || null,
          company: userData?.company || null,
          avatar_url: null,
          created_at: now,
          updated_at: now
        }

        // Store user with creation timestamp
        const userWithTimestamp = {
          ...data.user,
          created_at: now
        }
        
        // Update state immediately
        setUser(userWithTimestamp)
        setProfile(profileData)
        
        // Create session
        const mockSession = {
          access_token: 'mock-token-' + Date.now(),
          user: userWithTimestamp,
          expires_at: Date.now() + (24 * 60 * 60 * 1000),
          expires_in: 24 * 60 * 60,
          refresh_token: 'mock-refresh-' + Date.now(),
          token_type: 'bearer'
        } as Session
        setSession(mockSession)
        
        // Store in localStorage
        localStorage.setItem('mock-user', JSON.stringify(userWithTimestamp))
        localStorage.setItem('mock-profile', JSON.stringify(profileData))
        
        // Initialize user achievements and progress
        initializeUserData(data.user.id)
        
        console.log('✅ Auth state updated immediately')
      }

      return { error }
    } catch (error) {
      console.error('❌ Error in signUp:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔄 Signing in user:', email)
      setLoading(true)
      
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!error && data.user) {
        console.log('✅ User signed in successfully')
        
        // Update state immediately
        setUser(data.user)
        
        // Create session
        const mockSession = {
          access_token: 'mock-token-' + Date.now(),
          user: data.user,
          expires_at: Date.now() + (24 * 60 * 60 * 1000),
          expires_in: 24 * 60 * 60,
          refresh_token: 'mock-refresh-' + Date.now(),
          token_type: 'bearer'
        } as Session
        setSession(mockSession)
        
        // Fetch and set profile
        await fetchProfile(data.user.id)
        
        console.log('✅ Auth state updated immediately')
      }
      
      return { error }
    } catch (error) {
      console.error('❌ Error in signIn:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      console.log('🔄 Signing out user')
      setLoading(true)
      
      // Clear local state first for immediate UI feedback
      setProfile(null)
      setUser(null)
      setSession(null)
      
      // Then sign out from Supabase (which clears localStorage)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ Error signing out:', error)
      } else {
        console.log('✅ User signed out successfully')
      }
    } catch (error) {
      console.error('❌ Error in signOut:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      const existing = JSON.parse(localStorage.getItem('mock-profile') || '{}')
      const updated = { ...existing, ...updates, updated_at: new Date().toISOString() }
      localStorage.setItem('mock-profile', JSON.stringify(updated))
      setProfile(updated)
      
      // Also update the user metadata if avatar_url is being updated
      if (updates.avatar_url !== undefined) {
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser) {
          const userData = JSON.parse(mockUser)
          userData.user_metadata = { ...userData.user_metadata, avatar_url: updates.avatar_url }
          localStorage.setItem('mock-user', JSON.stringify(userData))
        }
      }
      
      return { error: null }
    } catch (error) {
      console.error('❌ Error in updateProfile:', error)
      return { error }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const initializeUserData = (userId: string) => {
    // Initialize achievements
    const achievementsKey = `achievements-${userId}`
    if (!localStorage.getItem(achievementsKey)) {
      localStorage.setItem(achievementsKey, JSON.stringify([]))
    }

    // Initialize progress
    const progressKey = 'mock-progress'
    const existingProgress = localStorage.getItem(progressKey)
    if (!existingProgress) {
      localStorage.setItem(progressKey, JSON.stringify([]))
    }

    // Initialize tutorial completions
    const tutorialKey = 'tutorial-completions'
    const existingTutorials = localStorage.getItem(tutorialKey)
    if (!existingTutorials) {
      localStorage.setItem(tutorialKey, JSON.stringify([]))
    }

    // Initialize template usage
    const templateKey = `templates-${userId}`
    if (!localStorage.getItem(templateKey)) {
      localStorage.setItem(templateKey, JSON.stringify([]))
    }
  }

  const value = {
    user,
    profile,
    session,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
    loading,
  }

  console.log('🔄 AuthProvider render - user:', user?.email || 'none', 'profile:', profile?.email || 'none', 'loading:', loading)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}