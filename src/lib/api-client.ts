// API client for subscription operations
// This will work with both SQLite (development) and Supabase (production)
// Just by changing the DATABASE_URL environment variable

import { getUserId } from './auth-utils'

export interface Subscription {
  id: string
  name: string
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
}

export interface SubscriptionStats {
  monthlyTotal: number
  yearlyTotal: number
  upcomingRenewals: number
  activeTrials: number
  totalSubscriptions: number
}

export const subscriptionApi = {
  // Get all subscriptions
  async getAll(): Promise<Subscription[]> {
    const response = await fetch('/api/subscriptions', {
      headers: {
        'x-user-id': getUserId(),
      },
    })
    if (!response.ok) throw new Error('Failed to fetch subscriptions')
    return response.json()
  },

  // Get subscription stats
  async getStats(): Promise<SubscriptionStats> {
    const response = await fetch('/api/subscriptions/stats', {
      headers: {
        'x-user-id': getUserId(),
      },
    })
    if (!response.ok) throw new Error('Failed to fetch stats')
    return response.json()
  },

  // Create a new subscription
  async create(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subscription> {
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': getUserId(),
      },
      body: JSON.stringify(subscription),
    })
    if (!response.ok) throw new Error('Failed to create subscription')
    return response.json()
  },

  // Update a subscription
  async update(id: string, updates: Partial<Subscription>): Promise<Subscription> {
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': getUserId(),
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update subscription')
    return response.json()
  },

  // Delete a subscription
  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': getUserId(),
      },
    })
    if (!response.ok) throw new Error('Failed to delete subscription')
  },
}