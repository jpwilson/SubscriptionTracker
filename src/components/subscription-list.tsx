'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, AlertCircle } from 'lucide-react'
import { MockDataStore, type Subscription } from '@/lib/mock-data'
import { formatCurrency, formatDate, getDaysUntil } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SubscriptionListProps {
  onRefresh: () => void
}

export function SubscriptionList({ onRefresh }: SubscriptionListProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    const subs = MockDataStore.getSubscriptions()
    setSubscriptions(subs)
  }, [onRefresh])

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      MockDataStore.deleteSubscription(id)
      onRefresh()
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Entertainment': 'bg-purple-500/20 text-purple-300',
      'Software': 'bg-blue-500/20 text-blue-300',
      'Finance': 'bg-green-500/20 text-green-300',
      'Health': 'bg-red-500/20 text-red-300',
      'Education': 'bg-yellow-500/20 text-yellow-300',
      'Other': 'bg-gray-500/20 text-gray-300',
    }
    return colors[category] || colors['Other']
  }

  if (subscriptions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-2xl mb-4">
          <Plus className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No subscriptions yet</h3>
        <p className="text-gray-400 mb-6">Start tracking your subscriptions to see insights and save money</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Your Subscriptions</h2>
      <div className="grid gap-4">
        {subscriptions.map((sub, i) => {
          const daysUntilRenewal = getDaysUntil(sub.nextPaymentDate)
          const isExpiringSoon = daysUntilRenewal <= 7 && daysUntilRenewal >= 0
          
          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                    {sub.isTrial && (
                      <span className="px-2 py-1 text-xs font-bold bg-purple-600 text-white rounded">TRIAL</span>
                    )}
                    {isExpiringSoon && (
                      <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold bg-yellow-500/20 text-yellow-300 rounded">
                        <AlertCircle className="w-3 h-3" />
                        Expires Soon
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className={`px-2 py-1 rounded ${getCategoryColor(sub.category)}`}>
                      {sub.category}
                    </span>
                    <span>{sub.billingCycle}</span>
                    <span>Next payment: {formatDate(sub.nextPaymentDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{formatCurrency(sub.amount)}</p>
                    <p className="text-sm text-gray-400">per {sub.billingCycle.replace('ly', '')}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                      onClick={() => {/* TODO: Add edit functionality */}}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-gray-400 hover:text-red-400"
                      onClick={() => handleDelete(sub.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}