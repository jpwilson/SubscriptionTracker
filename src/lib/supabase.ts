import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (we'll generate these later with Supabase CLI)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          tier: 'free' | 'premium' | 'forever' | 'enterprise'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          tier?: 'free' | 'premium' | 'forever' | 'enterprise'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          tier?: 'free' | 'premium' | 'forever' | 'enterprise'
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          billing_cycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off'
          category: string
          start_date: string
          end_date: string | null
          next_payment_date: string
          is_trial: boolean
          trial_end_date: string | null
          reminder_days_before: number
          notes: string | null
          status: 'active' | 'cancelled' | 'paused' | 'expired'
          created_at: string
          updated_at: string
          color: string | null
          icon: string | null
          url: string | null
          last_used: string | null
          usage_frequency: 'daily' | 'weekly' | 'monthly' | 'rarely' | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          billing_cycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off'
          category: string
          start_date: string
          end_date?: string | null
          next_payment_date: string
          is_trial?: boolean
          trial_end_date?: string | null
          reminder_days_before?: number
          notes?: string | null
          status?: 'active' | 'cancelled' | 'paused' | 'expired'
          created_at?: string
          updated_at?: string
          color?: string | null
          icon?: string | null
          url?: string | null
          last_used?: string | null
          usage_frequency?: 'daily' | 'weekly' | 'monthly' | 'rarely' | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          amount?: number
          billing_cycle?: 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off'
          category?: string
          start_date?: string
          end_date?: string | null
          next_payment_date?: string
          is_trial?: boolean
          trial_end_date?: string | null
          reminder_days_before?: number
          notes?: string | null
          status?: 'active' | 'cancelled' | 'paused' | 'expired'
          created_at?: string
          updated_at?: string
          color?: string | null
          icon?: string | null
          url?: string | null
          last_used?: string | null
          usage_frequency?: 'daily' | 'weekly' | 'monthly' | 'rarely' | null
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string | null
          icon: string | null
          is_default: boolean
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string | null
          icon?: string | null
          is_default?: boolean
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string | null
          icon?: string | null
          is_default?: boolean
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}