'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingUp, Calendar, AlertTriangle, Sparkles, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/mock-auth'
import { MockDataStore } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { SubscriptionList } from '@/components/subscription-list'
import { AddSubscriptionModal } from '@/components/add-subscription-modal'
import { OnboardingTour } from '@/components/onboarding-tour'
import { DemoDataInitializer } from '@/components/demo-data'
import { ClearDataButton } from '@/components/clear-data-button'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [showAddModal, setShowAddModal] = useState(false)
  const [stats, setStats] = useState({
    monthlyTotal: 0,
    yearlyTotal: 0,
    upcomingRenewals: 0,
    activeTrials: 0,
  })
  const [refreshKey, setRefreshKey] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    const newStats = MockDataStore.getStats()
    setStats(newStats)
  }, [refreshKey])

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const handleAddSubscription = () => {
    setRefreshKey(prev => prev + 1)
    setShowAddModal(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4"
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-white">Loading your subscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SubTracker</h1>
              <p className="text-gray-400">Welcome back, {user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowAddModal(true)}
              className="add-subscription-btn bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Subscription
            </Button>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Monthly Cost',
              value: formatCurrency(stats.monthlyTotal),
              icon: <Calendar className="w-5 h-5" />,
              color: 'from-blue-500 to-blue-600',
            },
            {
              title: 'Annual Cost',
              value: formatCurrency(stats.yearlyTotal),
              icon: <TrendingUp className="w-5 h-5" />,
              color: 'from-green-500 to-green-600',
            },
            {
              title: 'Upcoming Renewals',
              value: stats.upcomingRenewals,
              icon: <AlertTriangle className="w-5 h-5" />,
              color: 'from-yellow-500 to-yellow-600',
            },
            {
              title: 'Active Trials',
              value: stats.activeTrials,
              icon: <Sparkles className="w-5 h-5" />,
              color: 'from-purple-500 to-purple-600',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <div className={`text-white p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscriptions List */}
        <div className="subscription-list">
          <SubscriptionList onRefresh={() => setRefreshKey(prev => prev + 1)} />
        </div>
        
        {/* Clear Data Button - shown at bottom */}
        <div className="mt-8 text-center">
          <ClearDataButton onClear={() => setRefreshKey(prev => prev + 1)} />
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <AddSubscriptionModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSubscription}
        />
      )}

      {/* Onboarding Tour */}
      <OnboardingTour />
      
      {/* Demo Data Initializer */}
      <DemoDataInitializer />
    </div>
  )
}