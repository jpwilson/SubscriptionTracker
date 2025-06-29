'use client'

import { useEffect, useRef } from 'react'
import { useSubscriptions, useCreateSubscription } from '@/hooks/use-subscriptions'

export function DemoDataInitializer() {
  const { data: subscriptions } = useSubscriptions()
  const createSubscription = useCreateSubscription()
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Only run once and only if no subscriptions exist
    if (!hasInitialized.current && subscriptions && subscriptions.length === 0) {
      hasInitialized.current = true
      
      // Add demo subscriptions
      const demoSubscriptions = [
        {
          name: 'Netflix',
          amount: 15.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isTrial: false,
          status: 'active',
          color: '#E50914',
        },
        {
          name: 'Spotify Premium',
          amount: 9.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
          nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isTrial: true,
          status: 'active',
          color: '#24292e',
        },
        {
          name: 'Adobe Creative Cloud',
          amount: 52.99,
          billingCycle: 'monthly',
          category: 'Software',
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
  }, [subscriptions, createSubscription])
  
  return null
}