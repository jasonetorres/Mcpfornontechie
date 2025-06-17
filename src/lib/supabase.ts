import { createClient } from '@supabase/supabase-js'

// For demo purposes, we'll use placeholder values
// In a real app, these would come from your actual Supabase project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key'

// Create a mock client for demo purposes
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: (token?: string) => {
      if (token) {
        const mockUser = localStorage.getItem('mock-user')
        if (mockUser) {
          return Promise.resolve({ data: { user: JSON.parse(mockUser) }, error: null })
        }
      }
      return Promise.resolve({ data: { user: null }, error: null })
    },
    signUp: (credentials: any) => {
      console.log('Mock signup:', credentials.email)
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: credentials.email,
        user_metadata: credentials.options?.data || {},
        getSession: () => Promise.resolve({ 
          data: { 
            session: { 
              access_token: 'mock-token-' + Date.now(),
              user: {
                id: 'mock-user-' + Date.now(),
                email: credentials.email
              }
            } 
          }, 
          error: null 
        })
      }
      localStorage.setItem('mock-user', JSON.stringify(mockUser))
      return Promise.resolve({ data: { user: mockUser }, error: null })
    },
    signInWithPassword: (credentials: any) => {
      console.log('Mock signin:', credentials.email)
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: credentials.email,
        user_metadata: { full_name: 'Demo User' },
        getSession: () => Promise.resolve({ 
          data: { 
            session: { 
              access_token: 'mock-token-' + Date.now(),
              user: {
                id: 'mock-user-' + Date.now(),
                email: credentials.email
              }
            } 
          }, 
          error: null 
        })
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
          const userData = JSON.parse(mockUser)
          callback('SIGNED_IN', { user: userData })
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
          if (table === 'stripe_user_subscriptions') {
            // Mock subscription data
            const mockSubscription = {
              customer_id: 'cus_mock123',
              subscription_id: 'sub_mock123',
              subscription_status: 'active',
              price_id: 'price_1Rax2LRWDp0Sz2pAkHFvLJ9K', // Pro plan
              current_period_start: Math.floor(Date.now() / 1000),
              current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
              cancel_at_period_end: false,
              payment_method_brand: 'visa',
              payment_method_last4: '4242'
            }
            return Promise.resolve({ 
              data: mockSubscription, 
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
      stripe_customers: {
        Row: {
          id: number
          user_id: string
          customer_id: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          user_id: string
          customer_id: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          user_id?: string
          customer_id?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      stripe_subscriptions: {
        Row: {
          id: number
          customer_id: string
          subscription_id: string | null
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean
          payment_method_brand: string | null
          payment_method_last4: string | null
          status: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          customer_id: string
          subscription_id?: string | null
          price_id?: string | null
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          status: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          customer_id?: string
          subscription_id?: string | null
          price_id?: string | null
          current_period_start?: number | null
          current_period_end?: number | null
          cancel_at_period_end?: boolean
          payment_method_brand?: string | null
          payment_method_last4?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      stripe_orders: {
        Row: {
          id: number
          checkout_session_id: string
          payment_intent_id: string
          customer_id: string
          amount_subtotal: number
          amount_total: number
          currency: string
          payment_status: string
          status: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          checkout_session_id: string
          payment_intent_id: string
          customer_id: string
          amount_subtotal: number
          amount_total: number
          currency: string
          payment_status: string
          status?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          checkout_session_id?: string
          payment_intent_id?: string
          customer_id?: string
          amount_subtotal?: number
          amount_total?: number
          currency?: string
          payment_status?: string
          status?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
    }
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string
          subscription_id: string | null
          subscription_status: string
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
      stripe_user_orders: {
        Row: {
          customer_id: string
          order_id: number
          checkout_session_id: string
          payment_intent_id: string
          amount_subtotal: number
          amount_total: number
          currency: string
          payment_status: string
          order_status: string
          order_date: string
        }
      }
    }
  }
}