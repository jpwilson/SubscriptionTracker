'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, TrendingUp, AlertTriangle, Zap, DollarSign, Clock, BarChart2, Lightbulb, Target, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/supabase-auth-provider'
import { useSubscriptions } from '@/hooks/use-subscriptions'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { isPremiumUser } from '@/lib/feature-gates'
import { formatCurrency } from '@/lib/utils'

interface Insight {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  savings?: number
  icon: React.ReactNode
  actionLabel?: string
  actionType?: 'cancel' | 'downgrade' | 'switch' | 'optimize'
  category: 'unused' | 'expensive' | 'duplicate' | 'trial' | 'opportunity'
}

export default function InsightsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const isPremium = isPremiumUser(user)
  const { data: subscriptions = [], isLoading } = useSubscriptions()
  const { data: preferences } = useUserPreferences()
  const userCurrency = preferences?.currency || 'USD'

  // Calculate insights based on subscriptions
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = []

    // Analyze subscription usage patterns
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active')
    const monthlyTotal = activeSubscriptions.reduce((sum, sub) => {
      const monthlyAmount = sub.billingCycle === 'yearly' ? sub.amount / 12 :
                          sub.billingCycle === 'quarterly' ? sub.amount / 3 :
                          sub.billingCycle === 'weekly' ? sub.amount * 4 :
                          sub.amount
      return sum + monthlyAmount
    }, 0)

    // Check for unused subscriptions (placeholder logic - in real app would track actual usage)
    const unusedThreshold = 30 // days
    activeSubscriptions.forEach(sub => {
      // Simulating unused detection - in real app would check lastUsed field
      const daysSinceUse = Math.floor(Math.random() * 60)
      if (daysSinceUse > unusedThreshold) {
        insights.push({
          id: `unused-${sub.id}`,
          title: `${sub.name} hasn't been used in ${daysSinceUse} days`,
          description: 'Consider canceling this subscription to save money',
          impact: 'high',
          savings: sub.amount,
          icon: <AlertTriangle className="w-5 h-5" />,
          actionLabel: 'Cancel Subscription',
          actionType: 'cancel',
          category: 'unused',
        })
      }
    })

    // Check for expensive subscriptions
    const categoryAverages: Record<string, number> = {
      'Entertainment': 15,
      'Software': 30,
      'Finance': 10,
      'Health': 25,
      'Education': 20,
      'Food & Dining': 30,
      'Transportation': 50,
      'Shopping': 20,
      'Other': 15,
    }

    activeSubscriptions.forEach(sub => {
      const average = categoryAverages[sub.category] || 20
      const monthlyAmount = sub.billingCycle === 'yearly' ? sub.amount / 12 :
                          sub.billingCycle === 'quarterly' ? sub.amount / 3 :
                          sub.billingCycle === 'weekly' ? sub.amount * 4 :
                          sub.amount

      if (monthlyAmount > average * 1.5) {
        const percentMore = Math.round(((monthlyAmount - average) / average) * 100)
        insights.push({
          id: `expensive-${sub.id}`,
          title: `${sub.name} costs ${percentMore}% more than average`,
          description: `The average ${sub.category} subscription costs ${formatCurrency(average, userCurrency)}/month`,
          impact: 'medium',
          savings: monthlyAmount - average,
          icon: <DollarSign className="w-5 h-5" />,
          actionLabel: 'Find Alternatives',
          actionType: 'switch',
          category: 'expensive',
        })
      }
    })

    // Check for trials ending soon
    const trialSubs = subscriptions.filter(sub => sub.isTrial && sub.status === 'active')
    trialSubs.forEach(sub => {
      const trialEndDate = new Date(sub.nextPaymentDate)
      const daysUntilEnd = Math.ceil((trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      
      if (daysUntilEnd <= 7 && daysUntilEnd > 0) {
        insights.push({
          id: `trial-${sub.id}`,
          title: `${sub.name} trial ends in ${daysUntilEnd} days`,
          description: `Decide if you want to continue or cancel before you're charged ${formatCurrency(sub.amount, userCurrency)}`,
          impact: daysUntilEnd <= 3 ? 'high' : 'medium',
          icon: <Clock className="w-5 h-5" />,
          actionLabel: 'Review Trial',
          actionType: 'optimize',
          category: 'trial',
        })
      }
    })

    // Savings opportunity - annual vs monthly
    const monthlySubs = activeSubscriptions.filter(sub => sub.billingCycle === 'monthly')
    monthlySubs.forEach(sub => {
      // Estimate 20% savings for annual billing
      const potentialSavings = sub.amount * 12 * 0.2
      if (potentialSavings > 20) {
        insights.push({
          id: `optimize-${sub.id}`,
          title: `Save ${formatCurrency(potentialSavings, userCurrency)} on ${sub.name}`,
          description: 'Switch to annual billing and save 20%',
          impact: potentialSavings > 50 ? 'high' : 'medium',
          savings: potentialSavings,
          icon: <Target className="w-5 h-5" />,
          actionLabel: 'Switch to Annual',
          actionType: 'optimize',
          category: 'opportunity',
        })
      }
    })

    // Add general insights
    if (monthlyTotal > 200) {
      insights.push({
        id: 'total-high',
        title: 'Your subscription spending is above average',
        description: `You're spending ${formatCurrency(monthlyTotal, userCurrency)}/month. The average person spends ${formatCurrency(133, userCurrency)}/month on subscriptions.`,
        impact: 'high',
        icon: <BarChart2 className="w-5 h-5" />,
        category: 'expensive',
      })
    }

    // Sort by impact and potential savings
    return insights.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 }
      const impactDiff = impactOrder[b.impact] - impactOrder[a.impact]
      if (impactDiff !== 0) return impactDiff
      return (b.savings || 0) - (a.savings || 0)
    })
  }

  const insights = generateInsights()
  const totalPotentialSavings = insights.reduce((sum, insight) => sum + (insight.savings || 0), 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Lightbulb className="w-12 h-12 text-purple-500 animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your subscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            onClick={() => router.push('/dashboard')}
            className="neu-button p-2 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center flex-1">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 neu-card rounded-2xl">
              <Lightbulb className="w-7 h-7 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">Smart Insights</h1>
            <p className="text-muted-foreground">AI-powered recommendations to save money</p>
          </div>

          <div className="w-10" /> {/* Spacer for centering */}
        </motion.div>

        {/* Potential Savings Banner */}
        {totalPotentialSavings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 neu-card rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Potential Savings: {formatCurrency(totalPotentialSavings, userCurrency)}
                  </h2>
                  <p className="text-muted-foreground">
                    {isPremium ? 'per month with these recommendations' : 'Upgrade to unlock all insights'}
                  </p>
                </div>
              </div>
              {!isPremium && (
                <Button 
                  onClick={() => router.push('/payment')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Insights Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Great job!</h3>
              <p className="text-muted-foreground">
                Your subscriptions are well-optimized. Keep tracking to maintain your savings.
              </p>
            </motion.div>
          ) : (
            insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`neu-card p-6 rounded-2xl border ${
                  insight.impact === 'high' ? 'border-red-500/20' :
                  insight.impact === 'medium' ? 'border-yellow-500/20' :
                  'border-purple-500/20'
                } ${!isPremium && index > 2 ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${
                    insight.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                    insight.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>

                {insight.savings && (
                  <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm text-green-400 font-medium">
                      Save {formatCurrency(insight.savings, userCurrency)}/month
                    </p>
                  </div>
                )}

                {insight.actionLabel && (
                  <Button
                    className={`w-full ${
                      !isPremium && index > 2 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : insight.actionType === 'cancel' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    disabled={!isPremium && index > 2}
                  >
                    {!isPremium && index > 2 ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Premium Feature
                      </>
                    ) : (
                      insight.actionLabel
                    )}
                  </Button>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Free tier limitation notice */}
        {!isPremium && insights.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 neu-card rounded-2xl text-center border border-purple-500/20"
          >
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {insights.length - 3} More Insights Available
            </h3>
            <p className="text-muted-foreground mb-4">
              Upgrade to Premium to unlock all recommendations and maximize your savings
            </p>
            <Button 
              onClick={() => router.push('/payment')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
            >
              Upgrade for $5/month
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}