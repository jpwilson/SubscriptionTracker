'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CreditCard, Link as LinkIcon, FileText, Trash2, Edit3, ExternalLink, Loader2, Clock, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { useSubscriptions, useDeleteSubscription, useUpdateSubscription } from '@/hooks/use-subscriptions'
import { formatCurrency, parseLocalDate } from '@/lib/utils'
import { format, differenceInDays } from 'date-fns'
import { InternalHeader } from '@/components/internal-header'
import { EditSubscriptionModal } from '@/components/edit-subscription-modal'

export default function SubscriptionDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: subscriptions = [], isLoading } = useSubscriptions()
  const deleteSubscription = useDeleteSubscription()
  const updateSubscription = useUpdateSubscription()
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setShowEditModal(true)
    }
  }, [searchParams])

  const subscription = subscriptions.find(s => s.id === params.id)

  if (!user) {
    router.push('/login')
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Subscription not found</p>
          <Button
            onClick={() => router.push('/subscriptions')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
          >
            Back to Subscriptions
          </Button>
        </div>
      </div>
    )
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      await deleteSubscription.mutateAsync(subscription.id)
      router.push('/subscriptions')
    }
  }

  const daysUntilPayment = differenceInDays(parseLocalDate(subscription.nextPaymentDate), new Date())
  const monthlyAmount = subscription.billingCycle === 'yearly' 
    ? subscription.amount / 12 
    : subscription.billingCycle === 'quarterly'
    ? subscription.amount / 3
    : subscription.billingCycle === 'weekly'
    ? subscription.amount * 4.33
    : subscription.amount

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <InternalHeader />
            <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowEditModal(true)}
              className="neu-button px-4 py-2 rounded-xl text-purple-400 hover:text-purple-300"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              className="neu-button px-4 py-2 rounded-xl text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            </div>
          </div>

          {/* Subscription Header */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
              style={{ backgroundColor: subscription.color || '#8B5CF6' }}
            >
              {subscription.icon || '📱'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gradient">{subscription.name}</h1>
                {subscription.isTrial && !(subscription.isTrial && daysUntilPayment <= 7 && daysUntilPayment >= 0) && (
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
                    TRIAL
                  </span>
                )}
                {subscription.isTrial && daysUntilPayment <= 7 && daysUntilPayment >= 0 && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30">
                    <AlertCircle className="w-3 h-3" />
                    Trial Ending Soon
                  </span>
                )}
                {subscription.status !== 'active' && subscription.endDate && new Date(subscription.endDate) > new Date() && differenceInDays(new Date(subscription.endDate), new Date()) <= 7 && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/30">
                    <AlertCircle className="w-3 h-3" />
                    Service Ending
                  </span>
                )}
                {subscription.status !== 'active' && subscription.endDate && new Date(subscription.endDate) > new Date() && differenceInDays(new Date(subscription.endDate), new Date()) > 7 && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
                    <Clock className="w-3 h-3" />
                    Unsubscribed
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{subscription.category}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Cost Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="neu-card rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold text-gradient mb-4">Cost Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(subscription.amount)} / {subscription.billingCycle.replace('ly', '')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-purple-400">
                  {formatCurrency(monthlyAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Yearly Cost</p>
                <p className="text-2xl font-bold text-pink-400">
                  {formatCurrency(monthlyAmount * 12)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="neu-card rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold text-gradient mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payment</p>
                    <p className="text-white font-medium">
                      {format(parseLocalDate(subscription.nextPaymentDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">In</p>
                  <p className="text-lg font-bold text-purple-400">
                    {daysUntilPayment} days
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">Started</p>
                    <p className="text-white font-medium">
                      {format(parseLocalDate(subscription.startDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`text-lg font-bold ${subscription.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                    {subscription.status}
                  </p>
                </div>
              </div>

              {subscription.status !== 'active' && subscription.endDate && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ended</p>
                      <p className="text-white font-medium">
                        {format(parseLocalDate(subscription.endDate), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {subscription.isTrial && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    <p className="text-yellow-400 font-medium">Free Trial Active</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neu-card rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold text-gradient mb-4">Additional Information</h2>
            <div className="space-y-4">
              {subscription.url && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-purple-400" />
                    <p className="text-muted-foreground">Website</p>
                  </div>
                  <a
                    href={subscription.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {subscription.notes && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <p className="text-muted-foreground">Notes</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white whitespace-pre-wrap">{subscription.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <p className="text-muted-foreground">Billing Cycle</p>
                </div>
                <p className="text-white font-medium capitalize">{subscription.billingCycle}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Button
              onClick={() => subscription.url && window.open(subscription.url, '_blank')}
              disabled={!subscription.url}
              className="neu-button px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:border-purple-500/30 disabled:opacity-50"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Website
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              className="neu-button px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:border-purple-500/30"
            >
              <CreditCard className="w-5 h-5" />
              Manage Payment
            </Button>
          </motion.div>
        </div>
      </div>
      
      {showEditModal && subscription && (
        <EditSubscriptionModal
          subscription={subscription}
          onClose={() => {
            setShowEditModal(false)
            // Clear the edit query parameter
            router.replace(`/subscriptions/${params.id}`)
          }}
          onSave={() => {
            setShowEditModal(false)
            // Clear the edit query parameter
            router.replace(`/subscriptions/${params.id}`)
          }}
        />
      )}
    </div>
  )
}