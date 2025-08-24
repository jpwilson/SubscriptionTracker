'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Clock, Archive } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { type Subscription } from '@/lib/api-client'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'

interface SubscriptionSectionsProps {
  subscriptions: Subscription[]
  userCurrency?: string
  selectedCategory?: string
  selectedCategories?: string[]
}

export function SubscriptionSections({ 
  subscriptions, 
  userCurrency = 'USD',
  selectedCategory,
  selectedCategories = []
}: SubscriptionSectionsProps) {
  const router = useRouter()
  const [isPastCollapsed, setIsPastCollapsed] = useState(true)
  
  // Filter subscriptions by category first
  let filteredSubscriptions = subscriptions
  if (selectedCategory) {
    filteredSubscriptions = subscriptions.filter(sub => sub.category === selectedCategory)
  } else if (selectedCategories.length > 0) {
    filteredSubscriptions = subscriptions.filter(sub => selectedCategories.includes(sub.category))
  }
  
  // Separate subscriptions into categories
  const cancelledButActive = filteredSubscriptions.filter(sub => 
    sub.status === 'cancelled' && 
    sub.endDate && 
    new Date(sub.endDate) > new Date()
  )
  
  const pastSubscriptions = filteredSubscriptions.filter(sub => 
    sub.status === 'cancelled' && 
    (!sub.endDate || new Date(sub.endDate) <= new Date())
  )
  
  if (cancelledButActive.length === 0 && pastSubscriptions.length === 0) {
    return null
  }
  
  return (
    <div className="space-y-6 mt-6">
      {/* Cancelled but still accessible */}
      {cancelledButActive.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card rounded-2xl p-4 sm:p-6 border border-orange-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-orange-400">
              Cancelled but Still Accessible
            </h3>
          </div>
          
          <div className="space-y-3">
            {cancelledButActive.map((sub) => (
              <div
                key={sub.id}
                onClick={() => router.push(`/subscriptions/${sub.id}`)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: sub.color || '#6B7280' }}
                  >
                    {sub.icon || '📦'}
                  </div>
                  <div>
                    <p className="font-medium text-white">{sub.name}</p>
                    <div className="text-sm text-muted-foreground">
                      {/* Desktop: Show both dates */}
                      <span className="hidden sm:inline">
                        Service ends: {sub.endDate ? format(parseISO(sub.endDate), 'MMM d, yyyy') : 'Unknown'}
                        {sub.cancellationDate && (
                          <> • Cancelled: {format(parseISO(sub.cancellationDate), 'MMM d, yyyy')}</>
                        )}
                      </span>
                      {/* Mobile: Show both dates condensed */}
                      <span className="sm:hidden text-xs">
                        {sub.cancellationDate && (
                          <div>Cancelled: {format(parseISO(sub.cancellationDate), "MMM d ''yy")}</div>
                        )}
                        {sub.endDate && (
                          <div>Ends: {format(parseISO(sub.endDate), "MMM d ''yy")}</div>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white line-through opacity-50">
                    {formatCurrency(sub.amount, userCurrency)}
                  </p>
                  <p className="text-sm text-orange-400">Cancelled</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Past Subscriptions - Collapsible Archive */}
      {pastSubscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card rounded-2xl p-4 sm:p-6 border border-gray-500/30"
        >
          <button
            onClick={() => setIsPastCollapsed(!isPastCollapsed)}
            className="w-full flex items-center justify-between mb-4 group"
          >
            <div className="flex items-center gap-3">
              <Archive className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-gray-400">
                Past Subscriptions ({pastSubscriptions.length})
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isPastCollapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </motion.div>
          </button>
          
          <motion.div
            className="space-y-3"
          >
            {(isPastCollapsed ? pastSubscriptions.slice(0, 2) : pastSubscriptions).map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => router.push(`/subscriptions/${sub.id}`)}
                  className={`flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all ${isPastCollapsed ? 'opacity-60' : 'opacity-100'} hover:opacity-100`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isPastCollapsed ? 'grayscale' : ''}`}
                      style={{ backgroundColor: isPastCollapsed ? '#6B7280' : (sub.color || '#6B7280') }}
                    >
                      {sub.icon || '📦'}
                    </div>
                    <div>
                      <p className="font-medium text-white">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sub.endDate ? `Ended: ${format(parseISO(sub.endDate), 'MMM d, yyyy')}` : 'Cancelled'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-400 line-through">
                      {formatCurrency(sub.amount, userCurrency)}
                    </p>
                    <p className="text-sm text-gray-500">{sub.billingCycle}</p>
                  </div>
                </div>
              ))}
            {isPastCollapsed && pastSubscriptions.length > 2 && (
              <div className="text-center text-sm text-gray-500">
                +{pastSubscriptions.length - 2} more
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}