import { createClient } from '@supabase/supabase-js'

// For demo purposes, we'll use placeholder values
// In a real app, these would come from your actual Supabase project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key'

// Create a mock client for demo purposes
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: (credentials: any) => {
      console.log('Mock signup:', credentials.email)
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: credentials.email,
        user_metadata: credentials.options?.data || {}
      }
      localStorage.setItem('mock-user', JSON.stringify(mockUser))
      return Promise.resolve({ data: { user: mockUser }, error: null })
    },
    signInWithPassword: (credentials: any) => {
      console.log('Mock signin:', credentials.email)
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: credentials.email,
        user_metadata: { full_name: 'Demo User' }
      }
      localStorage.setItem('mock-user', JSON.stringify(mockUser))
      return Promise.resolve({ data: { user: mockUser }, error: null })
    },
    signOut: () => {
      localStorage.removeItem('mock-user')
      localStorage.removeItem('mock-profile')
      localStorage.removeItem('mock-progress')
      return Promise.resolve({ error: null })
    },
    onAuthStateChange: (callback: any) => {
      // Simulate auth state changes
      setTimeout(() => {
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser) {
          callback('SIGNED_IN', { user: JSON.parse(mockUser) })
        } else {
          callback('SIGNED_OUT', { user: null })
        }
      }, 100)
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      }
    }
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        maybeSingle: () => {
          if (table === 'profiles') {
            const profile = localStorage.getItem('mock-profile')
            return Promise.resolve({ 
              data: profile ? JSON.parse(profile) : null, 
              error: null 
            })
          }
          return Promise.resolve({ data: null, error: null })
        },
        single: () => {
          if (table === 'profiles') {
            const profile = localStorage.getItem('mock-profile')
            return Promise.resolve({ 
              data: profile ? JSON.parse(profile) : null, 
              error: null 
            })
          }
          return Promise.resolve({ data: null, error: null })
        }
      })
    }),
    insert: (data: any) => {
      if (table === 'profiles') {
        localStorage.setItem('mock-profile', JSON.stringify(data))
      } else if (table === 'learning_progress') {
        const existing = JSON.parse(localStorage.getItem('mock-progress') || '[]')
        existing.push({ ...data, id: 'progress-' + Date.now() })
        localStorage.setItem('mock-progress', JSON.stringify(existing))
      }
      return Promise.resolve({ error: null })
    },
    update: (data: any) => ({
      eq: (column: string, value: any) => {
        if (table === 'profiles') {
          const existing = JSON.parse(localStorage.getItem('mock-profile') || '{}')
          localStorage.setItem('mock-profile', JSON.stringify({ ...existing, ...data }))
        }
        return Promise.resolve({ error: null })
      }
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        eq: (column2: string, value2: any) => ({
          eq: (column3: string, value3: any) => {
            if (table === 'learning_progress') {
              const existing = JSON.parse(localStorage.getItem('mock-progress') || '[]')
              const filtered = existing.filter((item: any) => 
                !(item.user_id === value && item.path_type === value2 && item.step_index === value3)
              )
              localStorage.setItem('mock-progress', JSON.stringify(filtered))
            }
            return Promise.resolve({ error: null })
          }
        })
      })
    })
  })
})

export const supabase = createMockClient() as any

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string | null
          company: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string | null
          company?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string | null
          company?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          path_type: 'beginner' | 'intermediate' | 'advanced'
          step_index: number
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          path_type: 'beginner' | 'intermediate' | 'advanced'
          step_index: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          path_type?: 'beginner' | 'intermediate' | 'advanced'
          step_index?: number
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
    }
  }
}