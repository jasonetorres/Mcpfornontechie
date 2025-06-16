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

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('🔄 Getting initial session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (error) {
          console.error('❌ Error getting session:', error)
          return
        }

        console.log('✅ Initial session:', session?.user?.email || 'No session')
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('👤 User found, fetching profile...')
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error('❌ Error in getInitialSession:', error)
      }
    }

    getInitialSession()

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
        .maybeSingle()

      if (error) {
        console.error('❌ Error fetching profile:', error)
        // Create a basic profile if it doesn't exist
        const { data: userData } = await supabase.auth.getUser()
        if (userData.user) {
          console.log('🔧 Creating basic profile from user metadata')
          const basicProfile = {
            id: userId,
            email: userData.user.email!,
            full_name: userData.user.user_metadata?.full_name || null,
            role: userData.user.user_metadata?.role || null,
            company: userData.user.user_metadata?.company || null,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          setProfile(basicProfile)
        }
      } else {
        console.log('✅ Profile fetched:', data?.email)
        setProfile(data)
      }
    } catch (error) {
      console.error('❌ Error in fetchProfile:', error)
      setProfile(null)
    }
  }

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      console.log('🔄 Signing up user:', email)
      
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
        // Try to create profile, but don't fail if it doesn't work
        try {
          const profileData = {
            id: data.user.id,
            email: data.user.email!,
            full_name: userData?.full_name || null,
            role: userData?.role || null,
            company: userData?.company || null,
            avatar_url: null,
          }

          const { error: profileError } = await supabase
            .from('profiles')
            .insert(profileData)

          if (profileError) {
            console.error('❌ Error creating profile:', profileError)
          } else {
            console.log('✅ Profile created successfully')
          }
        } catch (profileError) {
          console.error('❌ Error creating profile:', profileError)
        }
      }

      return { error }
    } catch (error) {
      console.error('❌ Error in signUp:', error)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔄 Signing in user:', email)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!error) {
        console.log('✅ User signed in successfully')
      }
      
      return { error }
    } catch (error) {
      console.error('❌ Error in signIn:', error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      console.log('🔄 Signing out user')
      
      await supabase.auth.signOut()
      setProfile(null)
      
      console.log('✅ User signed out successfully')
    } catch (error) {
      console.error('❌ Error in signOut:', error)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...updates } : null)
      }

      return { error }
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

  const value = {
    user,
    profile,
    session,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  }

  console.log('🔄 AuthProvider render - user:', user?.email || 'none', 'profile:', profile?.email || 'none')

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}