import { User } from '@supabase/supabase-js'

export const isPremiumUser = (user: User | null): boolean => {
  // For now, we'll assume all users are free tier
  // In production, this would check the users table
  return false
}

export const PREMIUM_FEATURES = {
  customCategories: true,
  subcategories: true,
  advancedAnalytics: true,
  usageTracking: true,
  costProjections: true,
  prioritySupport: true,
}

export const FREE_FEATURES = {
  unlimitedSubscriptions: true,
  basicAnalytics: true,
  paymentReminders: true,
  exportData: true,
  defaultCategories: true,
}