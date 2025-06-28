export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      subscriptions: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          billing_cycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off'
          category: string
          start_date: string
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
      usage_tracking: {
        Row: {
          id: string
          subscription_id: string
          user_id: string
          date: string
          used: boolean
          satisfaction_score: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          user_id: string
          date: string
          used: boolean
          satisfaction_score?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          subscription_id?: string
          user_id?: string
          date?: string
          used?: boolean
          satisfaction_score?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          subscription_id: string
          user_id: string
          type: 'trial_ending' | 'payment_due' | 'usage_check' | 'custom'
          remind_at: string
          is_sent: boolean
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          user_id: string
          type: 'trial_ending' | 'payment_due' | 'usage_check' | 'custom'
          remind_at: string
          is_sent?: boolean
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          subscription_id?: string
          user_id?: string
          type?: 'trial_ending' | 'payment_due' | 'usage_check' | 'custom'
          remind_at?: string
          is_sent?: boolean
          message?: string | null
          created_at?: string
        }
      }
      wish_list: {
        Row: {
          id: string
          user_id: string
          name: string
          estimated_cost: number | null
          category: string
          priority: number
          notes: string | null
          url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          estimated_cost?: number | null
          category: string
          priority: number
          notes?: string | null
          url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          estimated_cost?: number | null
          category?: string
          priority?: number
          notes?: string | null
          url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          currency: string
          usage_check_frequency: 'daily' | 'weekly' | 'monthly'
          notification_email: boolean
          notification_push: boolean
          notification_sms: boolean
          theme: 'light' | 'dark' | 'system'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          currency?: string
          usage_check_frequency?: 'daily' | 'weekly' | 'monthly'
          notification_email?: boolean
          notification_push?: boolean
          notification_sms?: boolean
          theme?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          currency?: string
          usage_check_frequency?: 'daily' | 'weekly' | 'monthly'
          notification_email?: boolean
          notification_push?: boolean
          notification_sms?: boolean
          theme?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}