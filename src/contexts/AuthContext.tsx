import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

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
  const [supabaseAvailable, setSupabaseAvailable] = useState(false)

  // Test Supabase connection with better error handling
  const testSupabaseConnection = async (): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      console.log('⚠️ Supabase not configured, using mock authentication')
      return false
    }

    try {
      console.log('🔄 Testing Supabase connection...')
      
      // Create a promise that rejects after 3 seconds (shorter timeout)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout')), 3000)
      })

      // Try a simple query to test the connection with timeout
      const queryPromise = supabase.from('profiles').select('id').limit(1)
      
      const { error } = await Promise.race([queryPromise, timeoutPromise])
      
      if (error) {
        console.warn('⚠️ Supabase connection test failed:', error.message)
        return false
      }
      
      console.log('✅ Supabase connection successful')
      return true
    } catch (error: any) {
      // Handle specific fetch errors more gracefully
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('⚠️ Network error connecting to Supabase - using mock authentication')
      } else if (error.message === 'Connection timeout') {
        console.warn('⚠️ Supabase connection timeout - using mock authentication')
      } else {
        console.warn('⚠️ Supabase connection test failed:', error.message || error)
      }
      return false
    }
  }

  useEffect(() => {
    let mounted = true

    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing auth...')
        
        // Test Supabase connection first if configured
        if (isSupabaseConfigured) {
          console.log('✅ Supabase is configured, testing connection...')
          const connectionWorking = await testSupabaseConnection()
          setSupabaseAvailable(connectionWorking)
          
          if (connectionWorking) {
            console.log('✅ Supabase connection successful, checking for session...')
            
            try {
              // Check for existing session in Supabase with timeout
              const timeoutPromise = new Promise<never>((_, reject) => {
                setTimeout(() => reject(new Error('Session check timeout')), 3000)
              })
              
              const sessionPromise = supabase.auth.getSession()
              const { data: sessionData, error } = await Promise.race([sessionPromise, timeoutPromise])
              
              if (error) {
                console.warn('⚠️ Error getting Supabase session:', error.message)
                throw error
              }
              
              if (sessionData?.session) {
                console.log('✅ Found existing session in Supabase')
                setSession(sessionData.session)
                setUser(sessionData.session.user)
                await fetchProfile(sessionData.session.user.id)
                if (mounted) setLoading(false)
                return
              } else {
                console.log('⚠️ No Supabase session found, checking localStorage')
              }
            } catch (sessionError: any) {
              console.warn('⚠️ Supabase session check failed, falling back to mock:', sessionError.message || sessionError)
              setSupabaseAvailable(false)
            }
          } else {
            console.log('⚠️ Supabase connection failed, using mock authentication')
          }
        } else {
          console.log('⚠️ Supabase not configured, using mock authentication')
        }
        
        // If no Supabase session or Supabase not available, check for existing mock user in localStorage
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser && mounted) {
          const userData = JSON.parse(mockUser)
          console.log('✅ Found existing user in localStorage:', userData.email)
          
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
        // Even if there's an error, try to load mock data
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser && mounted) {
          try {
            const userData = JSON.parse(mockUser)
            console.log('✅ Falling back to mock user:', userData.email)
            
            const mockSession = {
              access_token: 'mock-token-' + Date.now(),
              user: userData,
              expires_at: Date.now() + (24 * 60 * 60 * 1000),
              expires_in: 24 * 60 * 60,
              refresh_token: 'mock-refresh-' + Date.now(),
              token_type: 'bearer'
            } as Session

            setUser(userData)
            setSession(mockSession)
            await fetchProfile(userData.id)
          } catch (mockError) {
            console.error('❌ Error loading mock user:', mockError)
          }
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes only if Supabase is available
    let subscription: any = null
    if (isSupabaseConfigured && supabaseAvailable) {
      const {
        data: { subscription: authSubscription },
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
      })
      subscription = authSubscription
    }

    return () => {
      mounted = false
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [supabaseAvailable])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('🔍 Fetching profile for user:', userId)
      
      // Try to get profile from Supabase only if available
      if (supabaseAvailable) {
        try {
          // Add timeout to profile fetch
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Profile fetch timeout')), 3000)
          })
          
          const profilePromise = supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
          
          const { data: supabaseProfile, error } = await Promise.race([profilePromise, timeoutPromise])
          
          if (supabaseProfile && !error) {
            console.log('✅ Found profile in Supabase:', supabaseProfile.email)
            setProfile(supabaseProfile)
            
            // Also save to localStorage for offline/fallback access
            localStorage.setItem('mock-profile', JSON.stringify(supabaseProfile))
            
            return
          } else if (error) {
            console.warn('⚠️ Supabase profile fetch error:', error.message)
            // Don't throw here, fall back to localStorage
          }
        } catch (supabaseError: any) {
          console.warn('⚠️ Supabase profile fetch failed, falling back to localStorage:', supabaseError.message || supabaseError)
          setSupabaseAvailable(false)
        }
      }
      
      // If no Supabase profile or Supabase not available, check localStorage
      const mockProfile = localStorage.getItem('mock-profile')
      if (mockProfile) {
        const profileData = JSON.parse(mockProfile)
        console.log('✅ Found existing profile in localStorage:', profileData.email)
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
      
      // Try to sign up with Supabase first only if available
      if (supabaseAvailable) {
        try {
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Signup timeout')), 8000)
          })
          
          const signupPromise = supabase.auth.signUp({
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
          
          const { data: supabaseData, error: supabaseError } = await Promise.race([signupPromise, timeoutPromise])
          
          if (!supabaseError && supabaseData.user) {
            console.log('✅ User signed up successfully with Supabase')
            
            // Create profile with current timestamp
            const now = new Date().toISOString()
            const profileData = {
              id: supabaseData.user.id,
              email: supabaseData.user.email!,
              full_name: userData?.full_name || null,
              role: userData?.role || null,
              company: userData?.company || null,
              avatar_url: null,
              created_at: now,
              updated_at: now
            }
            
            // Insert profile into Supabase
            const { error: profileError } = await supabase
              .from('profiles')
              .insert(profileData)
            
            if (profileError) {
              console.error('❌ Error creating profile in Supabase:', profileError)
            }
            
            // Update state
            setUser(supabaseData.user)
            setProfile(profileData)
            setSession(supabaseData.session)
            
            // Also save to localStorage for fallback
            localStorage.setItem('mock-user', JSON.stringify(supabaseData.user))
            localStorage.setItem('mock-profile', JSON.stringify(profileData))
            
            // Initialize user data
            initializeUserData(supabaseData.user.id)
            
            addNotification({
              id: `signup-success-${Date.now()}`,
              message: 'Account created successfully! Welcome to MCP4 Everyone!',
              type: 'success'
            })
            
            return { error: null }
          } else if (supabaseError) {
            console.warn('⚠️ Supabase signup error:', supabaseError.message)
            throw supabaseError
          }
        } catch (supabaseError: any) {
          console.warn('⚠️ Supabase signup failed, falling back to mock:', supabaseError.message || supabaseError)
          setSupabaseAvailable(false)
        }
      }
      
      // Fall back to mock implementation
      console.log('⚠️ Using mock signup')
      
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a mock user with a persistent ID
      const userId = `user-${Date.now()}`
      const mockUser = {
        id: userId,
        email,
        user_metadata: {
          full_name: userData?.full_name,
          role: userData?.role,
          company: userData?.company
        },
        created_at: new Date().toISOString()
      }
      
      // Store in localStorage
      localStorage.setItem('mock-user', JSON.stringify(mockUser))
      
      // Create profile with current timestamp
      const now = new Date().toISOString()
      const profileData = {
        id: userId,
        email: email,
        full_name: userData?.full_name || null,
        role: userData?.role || null,
        company: userData?.company || null,
        avatar_url: null,
        created_at: now,
        updated_at: now
      }
      
      // Store profile in localStorage
      localStorage.setItem('mock-profile', JSON.stringify(profileData))
      
      // Update state
      setUser(mockUser as User)
      setProfile(profileData)
      
      // Create session
      const mockSession = {
        access_token: 'mock-token-' + Date.now(),
        user: mockUser,
        expires_at: Date.now() + (24 * 60 * 60 * 1000),
        expires_in: 24 * 60 * 60,
        refresh_token: 'mock-refresh-' + Date.now(),
        token_type: 'bearer'
      } as Session
      setSession(mockSession)
      
      // Initialize user data
      initializeUserData(userId)
      
      addNotification({
        id: `signup-success-${Date.now()}`,
        message: 'Account created successfully! Welcome to MCP4 Everyone!',
        type: 'success'
      })
      
      return { error: null }
    } catch (error: any) {
      console.error('❌ Error in signUp:', error)
      addNotification({
        id: `signup-error-${Date.now()}`,
        message: error.message || 'An error occurred during sign up',
        type: 'error'
      })
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔄 Signing in user:', email)
      setLoading(true)
      
      // Try to sign in with Supabase first only if available
      if (supabaseAvailable) {
        try {
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('Signin timeout')), 8000)
          })
          
          const signinPromise = supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          const { data: supabaseData, error: supabaseError } = await Promise.race([signinPromise, timeoutPromise])
          
          if (!supabaseError && supabaseData.user) {
            console.log('✅ User signed in successfully with Supabase')
            
            // Update state
            setUser(supabaseData.user)
            setSession(supabaseData.session)
            
            // Also save to localStorage for fallback
            localStorage.setItem('mock-user', JSON.stringify(supabaseData.user))
            
            // Fetch and set profile
            await fetchProfile(supabaseData.user.id)
            
            addNotification({
              id: `signin-success-${Date.now()}`,
              message: 'Welcome back! You are now signed in.',
              type: 'success'
            })
            
            return { error: null }
          } else if (supabaseError) {
            console.warn('⚠️ Supabase signin error:', supabaseError.message)
            throw supabaseError
          }
        } catch (supabaseError: any) {
          console.warn('⚠️ Supabase signin failed, falling back to mock:', supabaseError.message || supabaseError)
          setSupabaseAvailable(false)
        }
      }
      
      // Fall back to mock implementation
      console.log('⚠️ Using mock signin')
      
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Check if there's an existing user with this email
      const existingUserData = localStorage.getItem('mock-user')
      let userId: string
      let mockUser: any
      
      if (existingUserData) {
        // Use existing user data
        mockUser = JSON.parse(existingUserData)
        userId = mockUser.id
        console.log('✅ Found existing user account:', mockUser.email)
      } else {
        // Create a new user if none exists
        userId = `user-${Date.now()}`
        mockUser = {
          id: userId,
          email,
          user_metadata: {
            full_name: 'Demo User',
            role: 'Community Member',
            company: 'MCP Academy'
          },
          created_at: new Date().toISOString()
        }
        localStorage.setItem('mock-user', JSON.stringify(mockUser))
        console.log('✅ Created new user account:', mockUser.email)
      }
      
      // Check for existing profile
      const existingProfile = localStorage.getItem('mock-profile')
      if (!existingProfile) {
        // Create a new profile if none exists
        const profileData = {
          id: userId,
          email,
          full_name: mockUser.user_metadata?.full_name || 'Demo User',
          role: mockUser.user_metadata?.role || 'Community Member',
          company: mockUser.user_metadata?.company || 'MCP Academy',
          avatar_url: mockUser.user_metadata?.avatar_url || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        localStorage.setItem('mock-profile', JSON.stringify(profileData))
        console.log('✅ Created new profile:', profileData.email)
      }
      
      // Update state
      setUser(mockUser as User)
      
      // Create session
      const mockSession = {
        access_token: 'mock-token-' + Date.now(),
        user: mockUser,
        expires_at: Date.now() + (24 * 60 * 60 * 1000),
        expires_in: 24 * 60 * 60,
        refresh_token: 'mock-refresh-' + Date.now(),
        token_type: 'bearer'
      } as Session
      setSession(mockSession)
      
      // Fetch and set profile
      await fetchProfile(userId)
      
      // Initialize user data
      initializeUserData(userId)
      
      addNotification({
        id: `signin-success-${Date.now()}`,
        message: 'Welcome back! You are now signed in.',
        type: 'success'
      })
      
      return { error: null }
    } catch (error: any) {
      console.error('❌ Error in signIn:', error)
      addNotification({
        id: `signin-error-${Date.now()}`,
        message: error.message || 'An error occurred during sign in',
        type: 'error'
      })
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
      
      // Try to sign out from Supabase only if available
      if (supabaseAvailable) {
        try {
          const { error } = await supabase.auth.signOut()
          
          if (error) {
            console.error('❌ Error signing out from Supabase:', error)
          }
        } catch (supabaseError) {
          console.warn('⚠️ Supabase signout failed:', supabaseError)
        }
      }
      
      // Clear localStorage for mock implementation
      localStorage.removeItem('mock-user')
      localStorage.removeItem('mock-profile')
      
      console.log('✅ User signed out successfully')
      
      addNotification({
        id: `signout-success-${Date.now()}`,
        message: 'You have been signed out successfully',
        type: 'success'
      })
    } catch (error) {
      console.error('❌ Error in signOut:', error)
      addNotification({
        id: `signout-error-${Date.now()}`,
        message: 'An error occurred during sign out',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      // Try to update profile in Supabase first only if available
      if (supabaseAvailable) {
        try {
          const { error: supabaseError } = await supabase
            .from('profiles')
            .update({
              ...updates,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
          
          if (!supabaseError) {
            console.log('✅ Profile updated in Supabase')
          } else {
            console.warn('⚠️ Supabase profile update error:', supabaseError.message)
            throw supabaseError
          }
        } catch (supabaseError) {
          console.warn('⚠️ Supabase profile update failed, using localStorage:', supabaseError)
          setSupabaseAvailable(false)
        }
      }
      
      // Update in localStorage (as fallback or for mock implementation)
      const existing = JSON.parse(localStorage.getItem('mock-profile') || '{}')
      const updated = { ...existing, ...updates, updated_at: new Date().toISOString() }
      localStorage.setItem('mock-profile', JSON.stringify(updated))
      setProfile(updated)
      
      // Also update the user metadata if relevant fields are being updated
      if (updates.avatar_url !== undefined || updates.full_name !== undefined || 
          updates.role !== undefined || updates.company !== undefined) {
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser) {
          const userData = JSON.parse(mockUser)
          userData.user_metadata = { 
            ...userData.user_metadata, 
            avatar_url: updates.avatar_url !== undefined ? updates.avatar_url : userData.user_metadata?.avatar_url,
            full_name: updates.full_name !== undefined ? updates.full_name : userData.user_metadata?.full_name,
            role: updates.role !== undefined ? updates.role : userData.user_metadata?.role,
            company: updates.company !== undefined ? updates.company : userData.user_metadata?.company
          }
          localStorage.setItem('mock-user', JSON.stringify(userData))
        }
      }
      
      addNotification({
        id: `profile-update-success-${Date.now()}`,
        message: 'Profile updated successfully',
        type: 'success'
      })
      
      return { error: null }
    } catch (error) {
      console.error('❌ Error in updateProfile:', error)
      addNotification({
        id: `profile-update-error-${Date.now()}`,
        message: 'An error occurred while updating your profile',
        type: 'error'
      })
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
    
    // Initialize guide completions
    const guidesKey = `completed-guides-${userId}`
    if (!localStorage.getItem(guidesKey)) {
      localStorage.setItem(guidesKey, JSON.stringify([]))
    }
    
    // Initialize user posts
    const postsKey = `user-posts-${userId}`
    if (!localStorage.getItem(postsKey)) {
      localStorage.setItem(postsKey, JSON.stringify([]))
    }
    
    // Initialize user discussions
    const discussionsKey = `user-discussions-${userId}`
    if (!localStorage.getItem(discussionsKey)) {
      localStorage.setItem(discussionsKey, JSON.stringify([]))
    }
    
    // Initialize liked members
    const likedMembersKey = `liked-members-${userId}`
    if (!localStorage.getItem(likedMembersKey)) {
      localStorage.setItem(likedMembersKey, JSON.stringify([]))
    }
    
    // Initialize XP data
    const xpKey = `xp-${userId}`
    if (!localStorage.getItem(xpKey)) {
      localStorage.setItem(xpKey, JSON.stringify({
        totalXP: 0,
        activities: []
      }))
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

  console.log('🔄 AuthProvider render - user:', user?.email || 'none', 'profile:', profile?.email || 'none', 'loading:', loading, 'supabaseAvailable:', supabaseAvailable)

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}