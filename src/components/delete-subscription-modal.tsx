'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Archive, X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteSubscription } from '@/hooks/use-subscriptions'

interface DeleteSubscriptionModalProps {
  subscription: {
    id: string
    name: string
    amount: number
  }
  isOpen: boolean
  onClose: () => void
  isDemo?: boolean
}

export function DeleteSubscriptionModal({ subscription, isOpen, onClose, isDemo }: DeleteSubscriptionModalProps) {
  const deleteSubscription = useDeleteSubscription()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteSubscription.mutateAsync(subscription.id)
      onClose()
    } catch (error) {
      console.error('Error deleting subscription:', error)
      alert('Failed to delete subscription. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }


  if (!isOpen) return null

  // For demo subscriptions, delete immediately without modal
  if (isDemo) {
    handleDelete()
    return null
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-white/10 p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">
                Manage Subscription
              </h2>
              <p className="text-gray-300">
                What would you like to do with <span className="font-semibold text-white">{subscription.name}</span>?
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700">
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">Tip:</span> If you&apos;ve cancelled this subscription with the provider, 
              update its status instead of deleting it. This preserves your spending history and tracks when the service ends.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                onClose()
                // Navigate to edit page to update status
                window.location.href = `/subscriptions/${subscription.id}?edit=true`
              }}
              className="w-full p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Archive className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Mark as Cancelled</p>
                    <p className="text-sm text-gray-400">Update status to track until it expires</p>
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full p-4 rounded-xl bg-slate-800 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Delete Permanently</p>
                    <p className="text-sm text-gray-400">Only if added by mistake or duplicate</p>
                  </div>
                </div>
                {isDeleting && (
                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full"
              disabled={isDeleting}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}