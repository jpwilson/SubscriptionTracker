'use client'

import { useEffect } from 'react'
import { useSubscriptions, useCreateSubscription } from '@/hooks/use-subscriptions'

export function DemoDataInitializer() {
  const { data: subscriptions } = useSubscriptions()
  const createSubscription = useCreateSubscription()

  useEffect(() => {
    // Check if user has any subscriptions
    if (subscriptions && subscriptions.length === 0) {
      // Add demo subscriptions
      const demoSubscriptions = [
        {
          name: 'Netflix',
          amount: 15.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 60 days ago
          nextPaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
          isTrial: false,
          status: 'active',
          color: '#E50914',
        },
        {
          name: 'Spotify Premium',
          amount: 9.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
          nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
          isTrial: false,
          status: 'active',
          color: '#1DB954',
        },
        {
          name: 'GitHub Pro',
          amount: 4.00,
          billingCycle: 'monthly',
          category: 'Software',
          startDate: new Date().toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days (trial)
          isTrial: true,
          status: 'active',
          color: '#24292e',
        },
        {
          name: 'Adobe Creative Cloud',
          amount: 52.99,
          billingCycle: 'monthly',
          category: 'Software',
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days ago
          nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 20 days from now
          isTrial: false,
          status: 'active',
          color: '#FF0000',
        },
      ]
      
      // Add demo subscriptions sequentially
      const addDemoData = async () => {
        for (const sub of demoSubscriptions) {
          try {
            await createSubscription.mutateAsync(sub)
          } catch (error) {
            console.error('Error adding demo subscription:', error)
          }
        }
      }
      
      addDemoData()
    }
  }, [subscriptions?.length]) // Only run when subscriptions length changes
  
  return null
}