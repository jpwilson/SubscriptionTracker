'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, CreditCard, TrendingUp, Shield, LogOut, Crown, Sparkles, ChevronRight, ChevronDown, Globe, Download, AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { InternalHeader } from '@/components/internal-header'
import { formatCurrency } from '@/lib/utils'
import { useSubscriptions, useSubscriptionStats, useDeleteSubscription } from '@/hooks/use-subscriptions'
import { useUserPreferences, useUpdateUserPreferences, SUPPORTED_CURRENCIES } from '@/hooks/use-user-preferences'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, loading: authLoading } = useAuth()
  const { data: subscriptions = [] } = useSubscriptions()
  const { data: stats } = useSubscriptionStats()
  const { data: preferences } = useUserPreferences()
  const updatePreferences = useUpdateUserPreferences()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const deleteSubscription = useDeleteSubscription()

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        // If user doesn't exist in users table, create with default values
        if (error.code === 'PGRST116') {
          const { data: newUser } = await supabase
            .from('users')
            .insert({
              id: user?.id,
              email: user?.email,
              tier: 'free',
            })
            .select()
            .single()
          setUserProfile(newUser)
        }
      } else {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleExportData = () => {
    if (subscriptions.length === 0) {
      alert('No subscriptions to export')
      return
    }

    // Create CSV content
    const headers = ['Name', 'Amount', 'Currency', 'Billing Cycle', 'Category', 'Status', 'Start Date', 'Next Payment', 'Notes']
    const rows = subscriptions.map(sub => [
      sub.name,
      sub.amount,
      preferences?.currency || 'USD',
      sub.billingCycle,
      sub.category,
      sub.status,
      sub.startDate,
      sub.nextPaymentDate || '',
      sub.notes || ''
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subtracker-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleResetAccount = async () => {
    setIsResetting(true)
    try {
      // Delete all subscriptions
      for (const sub of subscriptions) {
        await deleteSubscription.mutateAsync(sub.id)
      }
      
      // Clear localStorage flags
      localStorage.removeItem('subtracker_tour_completed')
      localStorage.removeItem('subtracker_welcome_dismissed')
      
      // Reload the page to trigger demo data
      window.location.reload()
    } catch (error) {
      console.error('Error resetting account:', error)
      alert('Failed to reset account. Please try again.')
    } finally {
      setIsResetting(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.relative')) {
        setShowOptionsMenu(false)
        setShowCurrencyDropdown(false)
      }
    }

    if (showOptionsMenu || showCurrencyDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOptionsMenu, showCurrencyDropdown])

  const potentialSavings = subscriptions
    .filter(sub => sub.status === 'active' && !sub.isTrial)
    .reduce((total, sub) => total + (sub.amount * 0.1), 0) // Assume 10% savings potential

  const isFreeTier = userProfile?.tier === 'free' || !userProfile?.tier

  useEffect(() => {
    if (!user && !authLoading) {
      router.push('/login')
    }
  }, [user, authLoading, router])

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

      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <InternalHeader />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          {/* User Info Section */}
          <div className="neu-card rounded-2xl p-4 sm:p-8 border border-white/10 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-xl sm:text-3xl font-bold text-white break-all sm:break-normal">{user.email}</h1>
                  <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
                    {isFreeTier ? (
                      <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">
                        Free Plan
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm flex items-center gap-1">
                        <Crown className="w-4 h-4" />
                        Premium
                      </span>
                    )}
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      Member since {new Date(user.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Options dropdown for mobile, button for desktop */}
              <div className="relative self-center sm:self-start">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-white sm:hidden"
                  onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                >
                  <span>Options</span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showOptionsMenu ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* Desktop sign out button */}
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex items-center text-muted-foreground hover:text-white"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                
                {/* Mobile dropdown menu */}
                {showOptionsMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl sm:hidden animate-in fade-in slide-in-from-bottom-1" style={{zIndex: 9999}}>
                  {isFreeTier && (
                    <button
                      onClick={() => router.push('/pricing')}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-slate-700 transition-colors border-b border-slate-700"
                    >
                      <Crown className="w-4 h-4 text-purple-400" />
                      Upgrade to Premium
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-slate-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="neu-card rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Subscriptions</p>
                  <p className="text-3xl font-bold text-white mt-1">{subscriptions.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="neu-card rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Monthly Spend</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {formatCurrency(stats?.monthlyTotal || 0, preferences?.currency || 'USD')}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="neu-card rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Potential Savings</p>
                  <p className="text-3xl font-bold text-gradient mt-1">
                    {formatCurrency(potentialSavings, preferences?.currency || 'USD')}/mo
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upgrade Section (for free users) */}
          {isFreeTier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="neu-card rounded-2xl p-4 sm:p-8 border border-purple-500/30 mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Unlock Premium Features
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Get advanced analytics, custom categories, and save up to 30% on your subscriptions
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Price change alerts & notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      AI-powered savings recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Advanced spending analytics
                    </li>
                  </ul>
                </div>
                <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl sm:text-4xl font-bold text-white">$5</p>
                    <p className="text-muted-foreground">/month</p>
                  </div>
                  <Button
                    onClick={() => router.push('/payment?plan=premium')}
                    className="mt-4 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                  >
                    Upgrade Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            
            {/* Currency Settings */}
            <div className="relative">
              <div className="neu-card rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  Display Currency
                </h3>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="w-full sm:w-64 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors flex items-center justify-between"
                >
                  <span>
                    {SUPPORTED_CURRENCIES.find(c => c.code === (preferences?.currency || 'USD'))?.name || 'US Dollar'} ({preferences?.currency || 'USD'})
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
                </button>
                <p className="text-sm text-gray-400 mt-2">All subscription amounts will be displayed in this currency</p>
              </div>
              
              {showCurrencyDropdown && (
                <div className="absolute left-0 sm:left-6 top-[120px] w-[calc(100%-48px)] sm:w-64 max-h-64 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-[9999]">
                  {SUPPORTED_CURRENCIES.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        updatePreferences.mutate({ currency: currency.code })
                        setShowCurrencyDropdown(false)
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors flex items-center justify-between ${
                        preferences?.currency === currency.code ? 'bg-slate-700 text-purple-400' : 'text-white'
                      }`}
                    >
                      <span>{currency.name}</span>
                      <span className="text-sm text-gray-400">{currency.symbol} {currency.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="neu-card rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment reminders</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price change alerts</span>
                  <input type="checkbox" defaultChecked={!isFreeTier} disabled={isFreeTier} className="toggle" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-muted-foreground">Monthly summary</span>
                  <input type="checkbox" defaultChecked className="toggle" />
                </label>
              </div>
            </div>

            <div className="neu-card rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-white/10"
                  onClick={handleExportData}
                  disabled={subscriptions.length === 0}
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export my data (CSV)
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                  onClick={() => setShowResetModal(true)}
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reset account
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-red-400 hover:text-red-300 hover:bg-red-400/10">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Delete account
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Reset Account Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isResetting && setShowResetModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-white/10 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              Reset Account?
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>This will delete all your subscriptions and reset your account to the initial demo state.</p>
              
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">Warning:</strong> This action cannot be undone. 
                    We recommend exporting your data first.
                  </span>
                </p>
              </div>
              
              {subscriptions.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 hover:bg-purple-500/10"
                  onClick={() => {
                    handleExportData()
                    // Don't close modal - let user decide
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data First
                </Button>
              )}
              
              <p className="text-sm">Your account settings and preferences will be preserved.</p>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleResetAccount}
                disabled={isResetting}
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Account'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}