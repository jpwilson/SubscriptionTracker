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
          endDate: null,
          isTrial: false,
          status: 'active',
          color: '#E50914',
          icon: '🎬',
        },
        {
          name: 'Spotify Premium',
          amount: 9.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: null,
          isTrial: false,
          status: 'active',
          color: '#1DB954',
          icon: '🎵',
        },
        {
          name: 'GitHub Pro',
          amount: 4.00,
          billingCycle: 'monthly',
          category: 'Software',
          startDate: new Date().toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: null,
          isTrial: true,
          status: 'active',
          color: '#24292e',
          icon: '💻',
        },
        {
          name: 'Replit Core',
          amount: 180.00,
          billingCycle: 'yearly',
          category: 'Software',
          startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isTrial: false,
          status: 'cancelled',
          color: '#F26207',
          icon: '🔧',
          notes: 'Unsubscribed but still have access until January 2026',
        },
        {
          name: 'Disney+',
          amount: 10.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isTrial: false,
          status: 'cancelled',
          color: '#113CCF',
          icon: '🏰',
          notes: 'Cancelled last month, service ends in 3 days',
        },
        {
          name: 'ChatGPT Pro',
          amount: 200.00,
          billingCycle: 'monthly',
          category: 'AI Tools',
          startDate: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isTrial: false,
          status: 'cancelled',
          color: '#10A37F',
          icon: '🤖',
          notes: 'Cancelled - service ended Jun 1, 2025',
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