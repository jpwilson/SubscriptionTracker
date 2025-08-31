'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Calendar, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUpdateSubscription } from '@/hooks/use-subscriptions'
import { format, addMonths, addYears, parseISO } from 'date-fns'
import { type Subscription } from '@/lib/api-client'
import { useToast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface ManageSubscriptionModalProps {
  subscription: Subscription
  onClose: () => void
}

export function ManageSubscriptionModal({ subscription, onClose }: ManageSubscriptionModalProps) {
  const updateSubscription = useUpdateSubscription()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [selectedAction, setSelectedAction] = useState<'cancel' | 'delete' | 'reactivate' | null>(null)
  const [endDate, setEndDate] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Check if subscription is already cancelled
  const isAlreadyCancelled = subscription.status === 'cancelled'

  // Calculate suggested end date based on billing cycle
  const getSuggestedEndDate = () => {
    let nextPayment = parseISO(subscription.nextPaymentDate)
    const today = new Date()
    
    // If the next payment date is in the past, calculate the next future occurrence
    while (nextPayment < today) {
      switch (subscription.billingCycle) {
        case 'weekly':
          nextPayment.setDate(nextPayment.getDate() + 7)
          break
        case 'monthly':
          nextPayment.setMonth(nextPayment.getMonth() + 1)
          break
        case 'quarterly':
          nextPayment.setMonth(nextPayment.getMonth() + 3)
          break
        case 'yearly':
          nextPayment.setFullYear(nextPayment.getFullYear() + 1)
          break
        default:
          break
      }
    }
    
    // Subtract one day to end the day before next payment
    nextPayment.setDate(nextPayment.getDate() - 1)
    
    return format(nextPayment, 'yyyy-MM-dd')
  }

  const handleCancel = async () => {
    if (!endDate) {
      toast({
        title: "End date required",
        description: "Please select when your access ends",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    try {
      await updateSubscription.mutateAsync({
        id: subscription.id,
        updates: {
          status: 'cancelled',
          endDate: new Date(endDate).toISOString(),
          cancellationDate: new Date().toISOString()
          // Don't update nextPaymentDate - keep existing value due to DB constraint
        }
      })
      toast({
        title: "Subscription cancelled",
        description: `${subscription.name} will remain active until ${format(new Date(endDate), 'MMMM d, yyyy')}`
      })
      onClose()
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      toast({
        title: "Failed to cancel subscription",
        description: "Please try again or contact support",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDelete = async () => {
    // The delete confirmation is handled by the modal UI itself (selectedAction === 'delete')
    // No need for browser confirm dialog
    
    setIsProcessing(true)
    const subscriptionName = subscription.name
    
    try {
      // Actually delete the subscription from the database
      const response = await fetch(`/api/subscriptions/${subscription.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await supabase.auth.getSession().then(s => s.data.session?.access_token)}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete subscription')
      }
      
      // Store the success message in sessionStorage to show after navigation
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('deletionSuccess', JSON.stringify({
          title: "Subscription deleted",
          description: `${subscriptionName} has been permanently removed`
        }))
      }
      
      // Invalidate queries to refresh the list
      await queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      
      // Navigate to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error deleting subscription:', error)
      toast({
        title: "Failed to delete subscription",
        description: "Please try again or contact support",
        variant: "destructive"
      })
      setIsProcessing(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md neu-card rounded-2xl p-6 border border-white/10"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-orange-500/20">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Manage Subscription</h2>
              <p className="text-sm text-muted-foreground">
                What would you like to do with {subscription.name}?
              </p>
            </div>
          </div>

          {!selectedAction && !isAlreadyCancelled ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-muted-foreground mb-3">
                  <Info className="w-4 h-4 inline mr-1" />
                  Tip: If you&apos;ve cancelled this subscription with the provider, update its status instead of deleting it. This preserves your spending history and tracks when the service ends.
                </p>
              </div>

              <button
                onClick={() => setSelectedAction('cancel')}
                className="w-full p-4 rounded-xl neu-button text-left hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Mark as Cancelled</p>
                    <p className="text-sm text-muted-foreground">Update status to track until it expires</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedAction('delete')}
                className="w-full p-4 rounded-xl neu-button text-left hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Delete Permanently</p>
                    <p className="text-sm text-muted-foreground">Only if added by mistake or duplicate</p>
                  </div>
                </div>
              </button>
            </div>
          ) : !selectedAction && isAlreadyCancelled ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300">
                  This subscription is already cancelled and will end on {subscription.endDate ? format(parseISO(subscription.endDate), 'MMMM d, yyyy') : 'unknown date'}.
                </p>
              </div>
              
              <button
                onClick={() => setSelectedAction('reactivate')}
                className="w-full p-4 rounded-xl neu-button text-left hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Calendar className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Reactivate Subscription</p>
                    <p className="text-sm text-muted-foreground">Resume payments and continue service</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedAction('delete')}
                className="w-full p-4 rounded-xl neu-button text-left hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">Delete Permanently</p>
                    <p className="text-sm text-muted-foreground">Remove all history for this subscription</p>
                  </div>
                </div>
              </button>
            </div>
          ) : selectedAction === 'cancel' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-sm text-emerald-300">
                  You&apos;re about to cancel {subscription.name}. When will your access end?
                </p>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Service ends on
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setEndDate(getSuggestedEndDate())}
                  className="text-xs text-emerald-400 hover:text-emerald-300 mt-2 transition-colors"
                >
                  Suggested: {format(parseISO(getSuggestedEndDate()), 'MMMM d, yyyy')} (day before next billing)
                </button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedAction(null)}
                  className="flex-1 neu-button"
                  disabled={isProcessing}
                >
                  Back
                </Button>
                <Button
                  onClick={handleCancel}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600 transition-colors"
                  disabled={!endDate || isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Cancellation'}
                </Button>
              </div>
            </div>
          ) : selectedAction === 'reactivate' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-green-300">
                  Reactivating {subscription.name} will resume payments starting from the next billing cycle.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedAction(null)}
                  className="flex-1 neu-button"
                  disabled={isProcessing}
                >
                  Back
                </Button>
                <Button
                  onClick={async () => {
                    setIsProcessing(true)
                    try {
                      await updateSubscription.mutateAsync({
                        id: subscription.id,
                        updates: {
                          status: 'active',
                          endDate: null,
                          cancellationDate: null
                        }
                      })
                      toast({
                        title: "Subscription reactivated",
                        description: `${subscription.name} has been reactivated`
                      })
                      onClose()
                    } catch (error) {
                      console.error('Error reactivating subscription:', error)
                      toast({
                        title: "Failed to reactivate subscription",
                        description: "Please try again or contact support",
                        variant: "destructive"
                      })
                    } finally {
                      setIsProcessing(false)
                    }
                  }}
                  className="flex-1 bg-green-500 text-white hover:bg-green-600 transition-colors"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Reactivate'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-sm text-red-300">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  Warning: This will permanently delete all history for {subscription.name}. This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedAction(null)}
                  className="flex-1 neu-button"
                  disabled={isProcessing}
                >
                  Back
                </Button>
                <Button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Deleting...' : 'Delete Forever'}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}