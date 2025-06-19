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
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
}

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
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
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    let mounted = true

    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing auth...')
        
        // Get current session from Supabase
        const { data: sessionData } = await supabase.auth.getSession()
        
        if (sessionData?.session && mounted) {
          console.log('✅ Found existing session:', sessionData.session.user.email)
          setUser(sessionData.session.user)
          setSession(sessionData.session)
          await fetchProfile(sessionData.session.user.id)
        } else {
          console.log('❌ No active session found')
          setLoading(false)
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error)
        setLoading(false)
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
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('❌ Error fetching profile:', error)
        
        // If profile doesn't exist yet, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile')
          await createProfile(userId)
        } else {
          setLoading(false)
        }
        return // Exit the function after handling error
      }
      
      if (data) {
        console.log('✅ Profile fetched successfully:', data.email)
        setProfile(data)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('❌ Error in fetchProfile:', error)
      setProfile(null)
      setLoading(false)
    }
  }

  const createProfile = async (userId: string) => {
    try {
      // Get user data from auth
      const { data: userData } = await supabase.auth.getUser()
      
      if (!userData?.user) {
        throw new Error('No user data available')
      }
      
      const user = userData.user
      const now = new Date().toISOString()
      
      // Create basic profile
      const newProfile = {
        id: userId,
        email: user.email!,
        full_name: user.user_metadata?.full_name || null,
        role: user.user_metadata?.role || null,
        company: user.user_metadata?.company || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        created_at: now,
        updated_at: now
      }
      
      const { error } = await supabase
        .from('profiles')
        .insert(newProfile)
      
      if (error) {
        console.error('❌ Error creating profile:', error)
        setLoading(false)
        return
      }
      
      console.log('✅ Profile created successfully')
      setProfile(newProfile)
      
      // Initialize user data
      initializeUserData(userId)
    } catch (error) {
      console.error('❌ Error in createProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      console.log('🔄 Signing up user:', email)
      setLoading(true)
      
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

      if (error) {
        console.error('❌ Error in signUp:', error)
        addNotification({
          id: `error-${Date.now()}`,
          message: error.message,
          type: 'error'
        })
        setLoading(false)
        return { error }
      }

      if (data.user) {
        console.log('✅ User signed up successfully')
        addNotification({
          id: `success-${Date.now()}`,
          message: 'Account created successfully! Welcome to MCP4 Everyone!',
          type: 'success'
        })
        // Profile will be created by the auth state change handler
      }

      return { error: null }
    } catch (error: any) {
      console.error('❌ Error in signUp:', error)
      addNotification({
        id: `error-${Date.now()}`,
        message: error.message || 'An error occurred during sign up',
        type: 'error'
      })
      setLoading(false)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔄 Signing in user:', email)
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('❌ Error in signIn:', error)
        addNotification({
          id: `error-${Date.now()}`,
          message: error.message,
          type: 'error'
        })
        setLoading(false)
        return { error }
      }
      
      if (data.user) {
        console.log('✅ User signed in successfully')
        addNotification({
          id: `success-${Date.now()}`,
          message: 'Welcome back! You are now signed in.',
          type: 'success'
        })
        // Profile will be fetched by the auth state change handler
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('❌ Error in signIn:', error)
      addNotification({
        id: `error-${Date.now()}`,
        message: error.message || 'An error occurred during sign in',
        type: 'error'
      })
      setLoading(false)
      return { error }
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
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ Error signing out:', error)
        addNotification({
          id: `error-${Date.now()}`,
          message: error.message,
          type: 'error'
        })
      } else {
        console.log('✅ User signed out successfully')
        addNotification({
          id: `success-${Date.now()}`,
          message: 'You have been signed out successfully',
          type: 'success'
        })
      }
    } catch (error: any) {
      console.error('❌ Error in signOut:', error)
      addNotification({
        id: `error-${Date.now()}`,
        message: error.message || 'An error occurred during sign out',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
      
      if (error) {
        console.error('❌ Error updating profile:', error)
        addNotification({
          id: `error-${Date.now()}`,
          message: error.message,
          type: 'error'
        })
        return { error }
      }
      
      // Refresh profile data
      await fetchProfile(user.id)
      
      // Also update the user metadata if avatar_url is being updated
      if (updates.avatar_url !== undefined) {
        await supabase.auth.updateUser({
          data: { avatar_url: updates.avatar_url }
        })
      }
      
      addNotification({
        id: `success-${Date.now()}`,
        message: 'Profile updated successfully',
        type: 'success'
      })
      
      return { error: null }
    } catch (error: any) {
      console.error('❌ Error in updateProfile:', error)
      addNotification({
        id: `error-${Date.now()}`,
        message: error.message || 'An error occurred while updating profile',
        type: 'error'
      })
      return { error }
    } finally {
      setLoading(false)
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

  // Notification functions
  const addNotification = (notification: Notification) => {
    const newNotification = {
      ...notification,
      id: notification.id || `notification-${Date.now()}`
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-remove notification after duration (default: 4000ms)
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, notification.duration || 4000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
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
    notifications,
    addNotification,
    removeNotification
  }

  console.log('🔄 AuthProvider render - user:', user?.email || 'none', 'profile:', profile?.email || 'none', 'loading:', loading)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}