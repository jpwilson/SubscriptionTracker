// API client for subscription operations
// This will work with both SQLite (development) and Supabase (production)
// Just by changing the DATABASE_URL environment variable

import { supabase } from './supabase'

export interface Subscription {
  id: string
  name: string
  company?: string | null
  product?: string | null
  tier?: string | null
  amount: number
  billingCycle: string
  category: string
  startDate: string
  endDate?: string | null
  nextPaymentDate: string
  isTrial: boolean
  status: string
  color?: string | null
  icon?: string | null
  url?: string | null
  notes?: string | null
  createdAt?: string
  updatedAt?: string
  userId?: string
  reminderDaysBefore?: number
  trialEndDate?: string | null
  lastUsed?: string | null
  usageFrequency?: string | null
  cancellationDate?: string | null
  subscriptionGroupId?: string | null
  previousAmount?: number | null
  isReactivation?: boolean
}

export interface SubscriptionStats {
  monthlyTotal: number
  yearlyTotal: number
  totalSubscriptions: number
  monthlyCount: number
  yearlyCount: number
  weeklyCount: number
  quarterlyCount: number
  annualRenewalsNext14Days: number
  activeTrials: number
}

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
  }
}

export const subscriptionApi = {
  // Get all subscriptions
  async getAll(): Promise<Subscription[]> {
    const headers = await getAuthHeaders()
    const response = await fetch('/api/subscriptions', {
      headers,
    })
    if (!response.ok) throw new Error('Failed to fetch subscriptions')
    return response.json()
  },

  // Get subscription stats
  async getStats(): Promise<SubscriptionStats> {
    const headers = await getAuthHeaders()
    const response = await fetch('/api/subscriptions/stats', {
      headers,
    })
    if (!response.ok) throw new Error('Failed to fetch stats')
    return response.json()
  },

  // Create a new subscription
  async create(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    const headers = await getAuthHeaders()
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers,
      body: JSON.stringify(subscription),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create subscription')
    }
    return response.json()
  },

  // Update a subscription
  async update(id: string, updates: Partial<Subscription>): Promise<Subscription> {
    const headers = await getAuthHeaders()
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update subscription')
    return response.json()
  },

  // Delete a subscription
  async delete(id: string): Promise<void> {
    const headers = await getAuthHeaders()
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: 'DELETE',
      headers,
    })
    if (!response.ok) throw new Error('Failed to delete subscription')
  },
}