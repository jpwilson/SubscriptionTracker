import { User } from '@/providers/supabase-auth-provider'

export const isPremiumUser = (user: User | null): boolean => {
  return user?.tier === 'premium'
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