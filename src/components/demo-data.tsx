'use client'

import { useEffect } from 'react'
import { MockDataStore } from '@/lib/mock-data'

export function DemoDataInitializer() {
  useEffect(() => {
    // Check if user has any subscriptions
    const subscriptions = MockDataStore.getSubscriptions()
    
    // If no subscriptions exist, add demo data
    if (subscriptions.length === 0) {
      const demoSubscriptions = [
        {
          name: 'Netflix',
          amount: 15.99,
          billingCycle: 'monthly' as const,
          category: 'Entertainment',
          startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days ago
          nextPaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
          isTrial: false,
          status: 'active' as const,
          color: '#E50914',
        },
        {
          name: 'Spotify Premium',
          amount: 9.99,
          billingCycle: 'monthly' as const,
          category: 'Entertainment',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
          nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
          isTrial: false,
          status: 'active' as const,
          color: '#1DB954',
        },
        {
          name: 'GitHub Pro',
          amount: 4.00,
          billingCycle: 'monthly' as const,
          category: 'Software',
          startDate: new Date().toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days (trial)
          isTrial: true,
          status: 'active' as const,
          color: '#24292e',
        },
        {
          name: 'Adobe Creative Cloud',
          amount: 52.99,
          billingCycle: 'monthly' as const,
          category: 'Software',
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days ago
          nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 20 days from now
          isTrial: false,
          status: 'active' as const,
          color: '#FF0000',
        },
      ]
      
      // Add demo subscriptions
      demoSubscriptions.forEach(sub => {
        MockDataStore.saveSubscription(sub)
      })
    }
  }, [])
  
  return null
}