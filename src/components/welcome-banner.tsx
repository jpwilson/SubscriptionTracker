'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Trash2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSubscriptions, useDeleteSubscription } from '@/hooks/use-subscriptions'
import { useAuth } from '@/providers/supabase-auth-provider'

// Define the demo subscriptions we're looking for
const DEMO_SUBSCRIPTIONS = [
  { name: 'Netflix', amount: 15.99 },
  { name: 'Spotify Premium', amount: 10.99 },
  { name: 'Amazon Prime', amount: 139.00 },
  { name: 'GitHub Pro', amount: 4.00 },
  { name: 'YouTube Premium', amount: 13.99 },
  { name: 'Disney+', amount: 10.99 },
  { name: 'Planet Fitness', amount: 24.99 },
  { name: 'Replit Core', amount: 180.00 },
]

export function WelcomeBanner() {
  const { user } = useAuth()
  const { data: subscriptions = [] } = useSubscriptions()
  const deleteSubscription = useDeleteSubscription()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem('subtracker_welcome_dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Check if user is new (created in last hour) and has demo subscriptions
    if (user) {
      const userCreatedAt = new Date(user.created_at || '')
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const isNewUser = userCreatedAt > hourAgo

      // Check if current subscriptions match demo data
      const hasDemoData = subscriptions.some(sub => 
        DEMO_SUBSCRIPTIONS.some(demo => 
          demo.name === sub.name && demo.amount === sub.amount
        )
      )

      setIsVisible(isNewUser && hasDemoData && subscriptions.length >= 6)
    }
  }, [user, subscriptions])

  const handleDismiss = () => {
    localStorage.setItem('subtracker_welcome_dismissed', 'true')
    setIsVisible(false)
  }

  const handleClearDemoData = async () => {
    setIsDeleting(true)
    try {
      // Delete only subscriptions that match our demo data
      const demoSubs = subscriptions.filter(sub =>
        DEMO_SUBSCRIPTIONS.some(demo =>
          demo.name === sub.name && demo.amount === sub.amount
        )
      )

      for (const sub of demoSubs) {
        await deleteSubscription.mutateAsync(sub.id)
      }

      handleDismiss()
    } catch (error) {
      console.error('Error clearing demo data:', error)
      alert('Failed to clear demo data. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isVisible || isDismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
      >
        <div className="neu-card rounded-2xl p-4 sm:p-6 border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Welcome to SubTracker!</h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                We&apos;ve added some example subscriptions to help you explore the app. 
                These are just demos - feel free to delete them and add your own real subscriptions.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Info className="w-4 h-4" />
                <span>Demo subscriptions have a purple border and &ldquo;EXAMPLE&rdquo; badge</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearDemoData}
                disabled={isDeleting}
                className="border-purple-500/30 hover:bg-purple-500/10"
              >
                {isDeleting ? (
                  <>
                    <Trash2 className="w-4 h-4 mr-2 animate-pulse" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Examples
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}