'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingUp, Calendar, AlertTriangle, Sparkles, Loader2, Tags, BarChart3, Lightbulb, User, CreditCard, DollarSign, ListChecks, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { useSubscriptionStats } from '@/hooks/use-subscriptions'
import { formatCurrency } from '@/lib/utils'
import { SubscriptionList } from '@/components/subscription-list'
import { AddSubscriptionModal } from '@/components/add-subscription-modal'
import { ManageCategoriesModal } from '@/components/manage-categories-modal'
import { OnboardingTour } from '@/components/onboarding-tour'
import { DemoDataInitializer } from '@/components/demo-data'
import { MobileNavigation } from '@/components/mobile-navigation'
import { WelcomeBanner } from '@/components/welcome-banner'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { CenterToast } from '@/components/center-toast'
import { TwitterConversion } from '@/components/twitter-conversion'

export const dynamic = 'force-dynamic'

function DashboardContent() {
  const { user } = useAuth()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [deletionMessage, setDeletionMessage] = useState<{ title: string; description: string } | null>(null)
  const [creationMessage, setCreationMessage] = useState<{ title: string; description: string } | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category') || undefined
  
  // Use the new hook for stats
  const { data: stats, isLoading: statsLoading } = useSubscriptionStats()
  const { data: preferences } = useUserPreferences()
  const [hasTrackedSignup, setHasTrackedSignup] = useState(false)

  // Track signup conversion for new users
  useEffect(() => {
    if (user && !hasTrackedSignup) {
      // Check if this is a new user (first visit to dashboard)
      const isNewUser = !localStorage.getItem('returning_user')
      if (isNewUser) {
        localStorage.setItem('returning_user', 'true')
        setHasTrackedSignup(true)
      }
    }
  }, [user, hasTrackedSignup])

  // Check for deletion success message
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const deletionSuccess = sessionStorage.getItem('deletionSuccess')
      if (deletionSuccess) {
        const message = JSON.parse(deletionSuccess)
        setDeletionMessage(message)
        sessionStorage.removeItem('deletionSuccess')
      }
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-50" />
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-2xl">
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
    totalSubscriptions: 0,
    monthlyCount: 0,
    yearlyCount: 0,
    weeklyCount: 0,
    quarterlyCount: 0,
    annualRenewalsNext14Days: 0,
    activeTrials: 0,
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Twitter conversion tracking for new signups */}
      {hasTrackedSignup && (
        <TwitterConversion 
          eventType="signup" 
          status="completed"
          email={user?.email || undefined}
        />
      )}
      
      {/* Modern animated background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-24 sm:pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-50 animate-glow" />
              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-2xl">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gradient">SubTracker</h1>
              <p className="text-sm sm:text-base text-muted-foreground hidden sm:flex items-center gap-2">
                Welcome back, {user?.email}
              </p>
              <p className="text-xs text-gray-500 hidden sm:block mt-1">
                🔐 Encrypted • No third-party sharing
              </p>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={() => router.push('/insights')}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-emerald-400 transition-all duration-300 gradient-border"
              title="Smart Insights"
            >
              <Lightbulb className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Insights</span>
            </Button>
            <Button
              onClick={() => router.push('/analytics')}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-emerald-400 transition-all duration-300 gradient-border"
              title="View Analytics"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Analytics</span>
            </Button>
            <Button
              onClick={() => setShowCategoriesModal(true)}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-emerald-400 transition-all duration-300 gradient-border"
              title="Manage Categories"
            >
              <Tags className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Categories</span>
            </Button>
            <Button
              onClick={() => router.push('/profile')}
              className="neu-button px-4 py-2 rounded-xl border-0 text-white hover:text-emerald-400 transition-all duration-300 gradient-border"
              title="Profile"
            >
              <User className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Profile</span>
            </Button>
          </div>
          
          {/* Add button visible on tablet and desktop */}
          <Button
            onClick={() => setShowAddModal(true)}
            className="add-subscription-btn hidden sm:flex relative px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl" />
            <span className="relative flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Subscription
            </span>
          </Button>
        </motion.div>

        {/* Welcome Banner for new users */}
        <WelcomeBanner />

        {/* Mobile Stats Section - Compact View */}
        <div className="block sm:hidden mb-6">
          {/* Subscription Count - Prominent on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p className="text-5xl font-bold text-gradient">
              {statsLoading ? '-' : displayStats.totalSubscriptions}
            </p>
            <p className="text-muted-foreground text-sm">Active Subscriptions</p>
          </motion.div>
          
          {/* Compact Stats Grid for Mobile */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="neu-card rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-1">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-muted-foreground">Monthly</span>
              </div>
              <p className="text-lg font-bold text-white">
                {statsLoading ? '...' : formatCurrency(displayStats.monthlyTotal, preferences?.currency || 'USD')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="neu-card rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-1">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-xs text-muted-foreground">Yearly</span>
              </div>
              <p className="text-lg font-bold text-white">
                {statsLoading ? '...' : formatCurrency(displayStats.yearlyTotal, preferences?.currency || 'USD')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="neu-card rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ListChecks className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">Breakdown</span>
                  </div>
                  <div className="text-sm font-medium text-white">
                    {statsLoading ? '...' : (
                      <>
                        {displayStats.yearlyCount > 0 && `${displayStats.yearlyCount} Annual`}
                        {displayStats.yearlyCount > 0 && displayStats.monthlyCount > 0 && ', '}
                        {displayStats.monthlyCount > 0 && `${displayStats.monthlyCount} Monthly`}
                      </>
                    )}
                  </div>
                </div>
                {displayStats.annualRenewalsNext14Days > 0 && (
                  <div className="text-xs font-bold text-yellow-400">
                    ⚠️ {displayStats.annualRenewalsNext14Days}
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="neu-card rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between mb-1">
                <Gift className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-muted-foreground">Trials</span>
              </div>
              <div className="text-xs">
                <div className="text-gray-400">Free: 0</div>
                <div className="text-gray-400">Discounted: 0</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop/Tablet Stats Grid */}
        <div className="stats-grid-wrapper">
          <div className="stats-grid hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Monthly Cost',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : formatCurrency(displayStats.monthlyTotal, preferences?.currency || 'USD'),
              icon: <CreditCard className="w-5 h-5" />,
              color: 'from-blue-500 to-blue-600',
            },
            {
              title: 'Annual Cost',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : formatCurrency(displayStats.yearlyTotal, preferences?.currency || 'USD'),
              icon: <DollarSign className="w-5 h-5" />,
              color: 'from-green-500 to-green-600',
            },
            {
              title: 'Subscription Breakdown',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <div className="space-y-1">
                  <div className="text-3xl font-bold">{displayStats.totalSubscriptions}</div>
                  <div className="text-sm text-muted-foreground">
                    {displayStats.yearlyCount > 0 && `${displayStats.yearlyCount} Annual`}
                    {displayStats.yearlyCount > 0 && displayStats.monthlyCount > 0 && ', '}
                    {displayStats.monthlyCount > 0 && `${displayStats.monthlyCount} Monthly`}
                    {displayStats.weeklyCount > 0 && `, ${displayStats.weeklyCount} Weekly`}
                    {displayStats.quarterlyCount > 0 && `, ${displayStats.quarterlyCount} Quarterly`}
                  </div>
                  {displayStats.annualRenewalsNext14Days > 0 && (
                    <div className="text-sm font-bold text-yellow-400">
                      ⚠️ {displayStats.annualRenewalsNext14Days} annual renewal{displayStats.annualRenewalsNext14Days > 1 ? 's' : ''} in next 14 days
                    </div>
                  )}
                </div>
              ),
              icon: <ListChecks className="w-5 h-5" />,
              color: 'from-yellow-500 to-yellow-600',
            },
            {
              title: 'Trials',
              value: statsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <div className="space-y-0.5">
                  <div className="text-sm text-muted-foreground">Free: 0</div>
                  <div className="text-sm text-muted-foreground">Discounted: 0</div>
                </div>
              ),
              icon: <Gift className="w-5 h-5" />,
              color: 'from-emerald-500 to-emerald-600',
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
                <div className="text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300">{stat.value}</div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="subscription-list">
          <SubscriptionList 
            categoryFilter={categoryFilter} 
            userCurrency={preferences?.currency}
            totalSubscriptions={displayStats.totalSubscriptions}
          />
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <AddSubscriptionModal
          onClose={() => setShowAddModal(false)}
          onSave={(subscriptionName, amount, billingCycle) => {
            setShowAddModal(false)
            setCreationMessage({
              title: 'Success',
              description: `${subscriptionName} for ${amount} per ${billingCycle} has been created`
            })
          }}
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
      
      {/* Mobile Navigation */}
      <MobileNavigation 
        onAddClick={() => setShowAddModal(true)}
        onCategoriesClick={() => setShowCategoriesModal(true)}
      />
      
      {/* Center Toast for Deletion */}
      {deletionMessage && (
        <CenterToast
          title={deletionMessage.title}
          description={deletionMessage.description}
          type="delete"
          onClose={() => setDeletionMessage(null)}
        />
      )}
      
      {/* Center Toast for Creation */}
      {creationMessage && (
        <CenterToast
          title={creationMessage.title}
          description={creationMessage.description}
          type="success"
          onClose={() => setCreationMessage(null)}
        />
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-50" />
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <p className="text-gradient text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}