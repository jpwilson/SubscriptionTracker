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
      
      // Add demo subscriptions - mix of mainstream and tech services
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
          isDemo: true,
        },
        {
          name: 'Spotify Premium',
          amount: 10.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: null,
          isTrial: false,
          status: 'active',
          color: '#1DB954',
          icon: '🎵',
          isDemo: true,
        },
        {
          name: 'Amazon Prime',
          amount: 139.00,
          billingCycle: 'yearly',
          category: 'Shopping',
          startDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 165 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: null,
          isTrial: false,
          status: 'active',
          color: '#FF9900',
          icon: '📦',
          isDemo: true,
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
          isDemo: true,
        },
        {
          name: 'YouTube Premium',
          amount: 13.99,
          billingCycle: 'monthly',
          category: 'Entertainment',
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: null,
          isTrial: false,
          status: 'active',
          color: '#FF0000',
          icon: '▶️',
          isDemo: true,
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
          isDemo: true,
        },
        {
          name: 'Planet Fitness',
          amount: 24.99,
          billingCycle: 'monthly',
          category: 'Health & Fitness',
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          nextPaymentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: null,
          isTrial: false,
          status: 'active',
          color: '#7B2FBE',
          icon: '💪',
          notes: 'Black Card membership',
          isDemo: true,
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
          isDemo: true,
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