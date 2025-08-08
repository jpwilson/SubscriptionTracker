'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CreditCard, Link as LinkIcon, FileText, Settings, Edit3, ExternalLink, Loader2, Clock, DollarSign, AlertCircle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { useSubscriptions, useDeleteSubscription, useUpdateSubscription } from '@/hooks/use-subscriptions'
import { formatCurrency, parseLocalDate } from '@/lib/utils'
import { format, differenceInDays } from 'date-fns'
import { InternalHeader } from '@/components/internal-header'
import { EditSubscriptionModal } from '@/components/edit-subscription-modal'
import { ManageSubscriptionModal } from '@/components/manage-subscription-modal'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function SubscriptionDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: subscriptions = [], isLoading } = useSubscriptions()
  const deleteSubscription = useDeleteSubscription()
  const updateSubscription = useUpdateSubscription()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showManageModal, setShowManageModal] = useState(false)

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

  // Generate mock price history data for now
  // In production, this would come from querying related subscriptions
  const generatePriceHistory = () => {
    if (!subscription) return []
    
    const history = []
    const startDate = new Date(subscription.startDate)
    const today = new Date()
    const monthsDiff = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth())
    
    // Add historical data points
    for (let i = 0; i <= Math.min(monthsDiff, 24); i++) {
      const date = new Date(startDate)
      date.setMonth(date.getMonth() + i)
      
      // Simulate price changes
      let price = subscription.amount
      if (subscription.previousAmount && i < 6) {
        price = subscription.previousAmount
      }
      
      // Add gap if subscription was cancelled
      if (subscription.status === 'cancelled' && subscription.cancellationDate) {
        const cancelDate = new Date(subscription.cancellationDate)
        if (date > cancelDate && subscription.endDate) {
          const endDate = new Date(subscription.endDate)
          if (date > endDate) {
            price = 0
          }
        }
      }
      
      history.push({
        date: format(date, 'MMM yyyy'),
        price: price,
        formattedPrice: formatCurrency(price)
      })
    }
    
    return history
  }

  // Calculate the actual next payment date (ensure it's in the future)
  const calculateNextPaymentDate = () => {
    if (!subscription || subscription.status === 'cancelled') return null
    
    let nextDate = parseLocalDate(subscription.nextPaymentDate)
    const today = new Date()
    
    // If the next payment date is in the past, calculate the next future occurrence
    while (nextDate < today) {
      switch (subscription.billingCycle) {
        case 'weekly':
          nextDate.setDate(nextDate.getDate() + 7)
          break
        case 'monthly':
          nextDate.setMonth(nextDate.getMonth() + 1)
          break
        case 'quarterly':
          nextDate.setMonth(nextDate.getMonth() + 3)
          break
        case 'yearly':
          nextDate.setFullYear(nextDate.getFullYear() + 1)
          break
        default:
          return nextDate // For one-off, return as is
      }
    }
    
    return nextDate
  }
  
  const actualNextPaymentDate = subscription ? calculateNextPaymentDate() : null
  const daysUntilPayment = actualNextPaymentDate ? differenceInDays(actualNextPaymentDate, new Date()) : 0
  const monthlyAmount = subscription ? (
    subscription.billingCycle === 'yearly' 
      ? subscription.amount / 12 
      : subscription.billingCycle === 'quarterly'
      ? subscription.amount / 3
      : subscription.billingCycle === 'weekly'
      ? subscription.amount * 4.33
      : subscription.amount
  ) : 0

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
              onClick={() => setShowManageModal(true)}
              className="neu-button px-4 py-2 rounded-xl text-orange-400 hover:text-orange-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage
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

          {/* Price History Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="neu-card rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gradient">Price History</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Lifetime tracking</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generatePriceHistory()}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#666"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#666"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#999' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {subscription.previousAmount && (
              <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <p className="text-sm text-purple-300">
                  Price changed from {formatCurrency(subscription.previousAmount)} to {formatCurrency(subscription.amount)}
                </p>
              </div>
            )}
            
            {subscription.status === 'cancelled' && subscription.endDate && (
              <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <p className="text-sm text-orange-300">
                  Service will end on {format(parseLocalDate(subscription.endDate), 'MMMM d, yyyy')}
                </p>
              </div>
            )}
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
                      {actualNextPaymentDate ? format(actualNextPaymentDate, 'MMMM d, yyyy') : 'N/A'}
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
      
      {showManageModal && subscription && (
        <ManageSubscriptionModal
          subscription={subscription}
          onClose={() => {
            setShowManageModal(false)
            router.replace(`/subscriptions/${params.id}`)
          }}
        />
      )}
    </div>
  )
}