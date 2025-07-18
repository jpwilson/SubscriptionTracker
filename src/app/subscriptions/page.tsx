'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CreditCard, Link as LinkIcon, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { useSubscriptions } from '@/hooks/use-subscriptions'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { InternalHeader } from '@/components/internal-header'

export default function SubscriptionsListPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { data: subscriptions = [], isLoading } = useSubscriptions()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <InternalHeader />
            <div className="ml-8">
              <h1 className="text-4xl font-bold text-gradient">All Subscriptions</h1>
              <p className="text-muted-foreground">Click on any subscription to view details</p>
            </div>
          </div>
        </motion.div>

        {/* Subscriptions List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : subscriptions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground mb-4">No subscriptions yet</p>
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
            >
              Add Your First Subscription
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {subscriptions.map((subscription, index) => (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => router.push(`/subscriptions/${subscription.id}`)}
                className="neu-card rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 cursor-pointer group transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: subscription.color || '#8B5CF6' }}
                    >
                      {subscription.icon || '📱'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all">
                        {subscription.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Next: {format(new Date(subscription.nextPaymentDate), 'MMM d, yyyy')}
                        </span>
                        <span className="text-purple-400">
                          {subscription.billingCycle}
                        </span>
                        {subscription.isTrial && (
                          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                            Trial
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white group-hover:text-gradient transition-all">
                      {formatCurrency(subscription.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      per {subscription.billingCycle.replace('ly', '')}
                    </p>
                  </div>
                </div>
                
                {/* Quick Actions Preview */}
                <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-xs text-purple-400">
                    <CreditCard className="w-3 h-3" />
                    <span>Manage Payment</span>
                  </div>
                  {subscription.url && (
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <LinkIcon className="w-3 h-3" />
                      <span>Visit Website</span>
                    </div>
                  )}
                  {subscription.notes && (
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <FileText className="w-3 h-3" />
                      <span>Has Notes</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}