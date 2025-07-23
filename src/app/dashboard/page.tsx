'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingUp, Calendar, AlertTriangle, Sparkles, LogOut, Loader2, Tags, BarChart3, Lightbulb, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { useSubscriptionStats } from '@/hooks/use-subscriptions'
import { formatCurrency } from '@/lib/utils'
import { SubscriptionList } from '@/components/subscription-list'
import { AddSubscriptionModal } from '@/components/add-subscription-modal'
import { ManageCategoriesModal } from '@/components/manage-categories-modal'
import { OnboardingTour } from '@/components/onboarding-tour'
import { DemoDataInitializer } from '@/components/demo-data'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const router = useRouter()
  
  // Use the new hook for stats
  const { data: stats, isLoading: statsLoading } = useSubscriptionStats()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <p className="text-gradient text-lg font-medium">Loading your subscriptions...</p>
        </div>
      </div>
    )
  }

  const displayStats = stats || {
    monthlyTotal: 0,
    yearlyTotal: 0,
    upcomingRenewals: 0,
    activeTrials: 0,
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Modern animated background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-glow" />
              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient">SubTracker</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                Welcome back, {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push('/insights')}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-purple-400 transition-all duration-300 gradient-border"
              title="Smart Insights"
            >
              <Lightbulb className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Insights</span>
            </Button>
            <Button
              onClick={() => router.push('/analytics')}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-purple-400 transition-all duration-300 gradient-border"
              title="View Analytics"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Analytics</span>
            </Button>
            <Button
              onClick={() => setShowCategoriesModal(true)}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-purple-400 transition-all duration-300 gradient-border"
              title="Manage Categories"
            >
              <Tags className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Categories</span>
            </Button>
            <Button
              onClick={() => router.push('/profile')}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-purple-400 transition-all duration-300 gradient-border"
              title="Profile"
            >
              <User className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Profile</span>
            </Button>
            <Button
              onClick={() => setShowAddModal(true)}
              className="add-subscription-btn relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl" />
              <span className="relative flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Subscription
              </span>
            </Button>
            <Button
              onClick={handleSignOut}
              className="neu-button px-3 py-2 rounded-xl border-0 text-white/70 hover:text-white transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Monthly Cost',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : formatCurrency(displayStats.monthlyTotal),
              icon: <Calendar className="w-5 h-5" />,
              color: 'from-blue-500 to-blue-600',
            },
            {
              title: 'Annual Cost',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : formatCurrency(displayStats.yearlyTotal),
              icon: <TrendingUp className="w-5 h-5" />,
              color: 'from-green-500 to-green-600',
            },
            {
              title: 'Upcoming Renewals',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : displayStats.upcomingRenewals,
              icon: <AlertTriangle className="w-5 h-5" />,
              color: 'from-yellow-500 to-yellow-600',
            },
            {
              title: 'Active Trials',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : displayStats.activeTrials,
              icon: <Sparkles className="w-5 h-5" />,
              color: 'from-purple-500 to-purple-600',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden neu-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl" />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <span className="absolute inset-0 bg-white/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative text-white">{stat.icon}</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscriptions List */}
        <div className="subscription-list">
          <SubscriptionList />
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <AddSubscriptionModal
          onClose={() => setShowAddModal(false)}
          onSave={() => setShowAddModal(false)}
        />
      )}

      {/* Manage Categories Modal */}
      {showCategoriesModal && (
        <ManageCategoriesModal
          onClose={() => setShowCategoriesModal(false)}
        />
      )}

      {/* Onboarding Tour */}
      <OnboardingTour />
      
      {/* Demo Data Initializer - Now works with SQLite */}
      <DemoDataInitializer />
    </div>
  )
}