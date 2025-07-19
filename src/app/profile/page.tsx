'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, CreditCard, TrendingUp, Shield, LogOut, Crown, Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { InternalHeader } from '@/components/internal-header'
import { formatCurrency } from '@/lib/utils'
import { useSubscriptions, useSubscriptionStats } from '@/hooks/use-subscriptions'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { data: subscriptions = [] } = useSubscriptions()
  const { data: stats } = useSubscriptionStats()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
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

  const potentialSavings = subscriptions
    .filter(sub => sub.status === 'active' && !sub.isTrial)
    .reduce((total, sub) => total + (sub.amount * 0.1), 0) // Assume 10% savings potential

  const isFreeTier = userProfile?.tier === 'free' || !userProfile?.tier

  if (!user) {
    router.push('/login')
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
          <div className="neu-card rounded-2xl p-8 border border-white/10 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{user.email}</h1>
                  <div className="flex items-center gap-2 mt-2">
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
                    <span className="text-muted-foreground text-sm">
                      Member since {new Date(user.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-muted-foreground hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
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
                    {formatCurrency(stats?.monthlyTotal || 0)}
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
                    {formatCurrency(potentialSavings)}/mo
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
              className="neu-card rounded-2xl p-8 border border-purple-500/30 mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Unlock Premium Features
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Get advanced analytics, custom categories, and save up to 30% on your subscriptions
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
                      Price change alerts & notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      AI-powered savings recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      Advanced spending analytics
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-white">$5</p>
                  <p className="text-muted-foreground">/month</p>
                  <Button
                    onClick={() => router.push('/payment?plan=premium')}
                    className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
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
                <Button variant="ghost" className="w-full justify-between">
                  Export my data
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between text-red-400 hover:text-red-300">
                  Delete account
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}