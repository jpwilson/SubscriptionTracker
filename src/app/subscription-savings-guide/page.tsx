import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, DollarSign, TrendingUp, Users, Calendar, Shield, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Subscription Savings Guide: 12 Ways to Save Money | SubTracker',
  description: 'Save $40-$300/month on subscriptions with proven strategies. Learn annual billing savings, family plan sharing, and more money-saving tips.',
  openGraph: {
    title: 'Save Money on Subscriptions: Complete 2025 Guide',
    description: '12 proven strategies to cut subscription costs without losing services you love. Start saving today.',
  },
}

export default function SubscriptionSavingsGuide() {
  const strategies = [
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-400" />,
      title: 'Switch to Annual Billing',
      savings: 'Save 10-20% per year',
      description: 'Most subscriptions offer discounts for annual payment',
      examples: [
        'YouTube Premium: $2.40/mo savings ($28.80/year)',
        'Adobe Creative Cloud: $60-$120/year savings',
        'Spotify: Save ~$20/year',
        'NYTimes Digital: Save $50+/year'
      ],
      tips: 'Only works if you\'re committed to using the service for 12 months'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: 'Share Family Plans',
      savings: 'Save 50-75% per person',
      description: 'Split costs with family or trusted friends',
      examples: [
        'Spotify Family (6 people): $2.83/person vs $10.99 solo',
        'YouTube Premium Family: $3.60/person vs $13.99 solo',
        'Apple Music Family: $2.50/person vs $10.99 solo',
        'Netflix Standard: Split $15.49 between 2-3 users',
        'Costco membership: Split $60 with household'
      ],
      tips: 'Make sure everyone actually uses it, or you\'re still overpaying'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal-400" />,
      title: 'Downgrade Premium Plans',
      savings: 'Save $5-$50/month per service',
      description: 'Most people don\'t use premium features',
      examples: [
        'Spotify: Premium Duo ($14.99) if just 2 people',
        'Netflix: Basic ($6.99) vs Premium ($22.99) if you don\'t need 4K',
        'Canva: Free version covers 90% of casual use',
        'Adobe: Photography plan ($9.99) vs All Apps ($54.99)',
        'LinkedIn: Premium not needed for most job seekers'
      ],
      tips: 'Downgrade first, cancel only if you don\'t miss it'
    },
    {
      icon: <Calendar className="w-8 h-8 text-indigo-400" />,
      title: 'Rotate Subscriptions',
      savings: 'Save $20-$60/month',
      description: 'Subscribe when you need it, cancel when done',
      examples: [
        'Watch Disney+ for 2 months, then switch to HBO Max',
        'Subscribe to Adobe for a project, cancel after',
        'Fitness apps: Subscribe winter months only',
        'Meal kits: Use 1-2 months, then take breaks',
        'Audible: Subscribe when credits run out, pause between'
      ],
      tips: 'Works best for entertainment and seasonal services'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'Bundle Services Together',
      savings: 'Save $10-$30/month',
      description: 'Providers offer discounts when you combine services',
      examples: [
        'Hulu + Disney+ + ESPN+ bundle: Save $8/month',
        'Apple One (Music + TV+ + iCloud): Save $6-$10/month',
        'Amazon Prime (shipping + video + music): Better value',
        'Microsoft 365 Family: 6 users + 1TB each = better than individual',
        'Cell phone plans with streaming included'
      ],
      tips: 'Only worth it if you use all bundled services'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Use Free Alternatives',
      savings: 'Save $5-$50/month per service',
      description: 'Many paid services have capable free options',
      examples: [
        'Canva Free instead of Canva Pro ($12.99/mo)',
        'Google Docs instead of Microsoft 365 ($6.99/mo)',
        'YouTube (free with ads) instead of YouTube Premium',
        'Spotify Free (with ads) if you can tolerate them',
        'Libre Office instead of Microsoft Office'
      ],
      tips: 'Try the free version first before upgrading'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-green-400" />,
      title: 'Cancel Unused Subscriptions',
      savings: 'Save $40-$200/month',
      description: 'The #1 way to save: Stop paying for what you don\'t use',
      examples: [
        'Gym memberships you don\'t visit (avg $50/mo)',
        'Streaming services you watched once ($15/mo each)',
        'Software trials you forgot to cancel ($10-50/mo)',
        'Gaming subscriptions for games you finished',
        'Duplicate services (two cloud storage plans)'
      ],
      tips: 'Be honest: If you haven\'t used it in 30 days, cancel it'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-400" />,
      title: 'Negotiate Retention Offers',
      savings: 'Save 20-50% for 6-12 months',
      description: 'Companies offer discounts to keep customers',
      examples: [
        'Cable/Internet: Call to cancel, usually get 20-40% off',
        'SiriusXM: Threaten to cancel for 50% discount',
        'NYTimes: $1-$4/month offers for existing customers',
        'Audible: Pause membership or get 3 months at 50% off',
        'Dating apps: Get premium at half price before canceling'
      ],
      tips: 'Actually be willing to cancel if they don\'t offer discount'
    },
    {
      icon: <Calendar className="w-8 h-8 text-pink-400" />,
      title: 'Time Your Subscriptions',
      savings: 'Save $10-$30/month',
      description: 'Subscribe for specific content, then pause',
      examples: [
        'HBO Max: Subscribe for Game of Thrones, cancel after',
        'Apple TV+: Subscribe for Ted Lasso season, then cancel',
        'Peloton: Pause during vacations or injury',
        'Meal kits: Skip weeks you\'re traveling',
        'Audible: Only subscribe when you need credits'
      ],
      tips: 'Most services let you pause or restart anytime'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-400" />,
      title: 'Look for Student/Teacher Discounts',
      savings: 'Save 30-50% with valid ID',
      description: 'Many services offer education pricing',
      examples: [
        'Spotify + Hulu + Showtime Student: $5.99/mo (usually $23)',
        'Apple Music Student: $5.99 vs $10.99',
        'Adobe Creative Cloud Student: $19.99 vs $54.99',
        'Amazon Prime Student: $7.49 vs $14.99',
        'YouTube Premium Student: $7.99 vs $13.99'
      ],
      tips: 'Verify annually. Some work for .edu emails only.'
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-400" />,
      title: 'Use Credit Card Perks',
      savings: 'Save $10-$100/year',
      description: 'Some cards reimburse subscription costs',
      examples: [
        'Amex Platinum: Up to $20/mo in credits (Uber, streaming)',
        'Chase Sapphire Reserve: $10/mo DoorDash credit',
        'Capital One Venture X: $10/mo streaming credit',
        'Wells Fargo Active Cash: Cell phone protection',
        'Citi Prestige: Free streaming services (discontinued but grandfathered)'
      ],
      tips: 'Check your card benefits. Many people leave money on table.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      title: 'Take Advantage of Promotions',
      savings: 'Save 50-100% for first 1-6 months',
      description: 'New customer deals and limited-time offers',
      examples: [
        'Streaming services: $0.99-$1.99 for 3-6 months',
        'Music services: Free for 3 months',
        'Black Friday deals: Annual plans at 30-50% off',
        'Sign up with new email for trial periods',
        'Referral bonuses from friends'
      ],
      tips: 'Set reminder to cancel before promo ends if not keeping'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 gradient-mesh" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl neu-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-bold text-gradient">SubTracker</span>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Start Saving Money
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">Subscription Savings Guide</span>
            <br />
            <span className="text-white">12 Proven Ways to Save Money</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Cut your subscription costs by <strong className="text-emerald-400">$40-$300/month</strong> without giving up the services you love. Here&apos;s how.
          </p>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20">
            <h2 className="text-2xl font-bold mb-4 text-center">Quick Wins</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="neu-card rounded-xl p-4 border border-emerald-500/20 text-center">
                <p className="text-3xl font-bold text-gradient mb-2">$147</p>
                <p className="text-sm text-gray-300">Average monthly savings</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-teal-500/20 text-center">
                <p className="text-3xl font-bold text-gradient mb-2">2-5</p>
                <p className="text-sm text-gray-300">Unused subs to cancel</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-blue-500/20 text-center">
                <p className="text-3xl font-bold text-gradient mb-2">30%</p>
                <p className="text-sm text-gray-300">Typical cost reduction</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            {strategies.map((strategy, index) => (
              <div key={index} className="neu-card rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {strategy.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold">{strategy.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold whitespace-nowrap ml-4">
                        {strategy.savings}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{strategy.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white mb-2">Real Examples:</p>
                  <ul className="space-y-2">
                    {strategy.examples.map((example, exIndex) => (
                      <li key={exIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-yellow-400">💡 Pro tip: {strategy.tips}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-teal-400" />
              Savings Calculator
            </h2>
            <p className="text-gray-300 mb-4">
              Combine multiple strategies for maximum savings:
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 neu-card rounded-lg border border-emerald-500/20">
                <span className="text-gray-300">Cancel 3 unused subscriptions ($15 each)</span>
                <span className="font-bold text-emerald-400">+$45/mo</span>
              </div>
              <div className="flex items-center justify-between p-3 neu-card rounded-lg border border-teal-500/20">
                <span className="text-gray-300">Switch Netflix to Basic plan</span>
                <span className="font-bold text-teal-400">+$16/mo</span>
              </div>
              <div className="flex items-center justify-between p-3 neu-card rounded-lg border border-blue-500/20">
                <span className="text-gray-300">Join family plan for Spotify</span>
                <span className="font-bold text-blue-400">+$8/mo</span>
              </div>
              <div className="flex items-center justify-between p-3 neu-card rounded-lg border border-indigo-500/20">
                <span className="text-gray-300">Switch 2 services to annual billing (10% savings)</span>
                <span className="font-bold text-indigo-400">+$4/mo</span>
              </div>
              <div className="flex items-center justify-between p-4 neu-card rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5">
                <span className="text-white font-bold text-lg">Total Monthly Savings</span>
                <span className="font-bold text-emerald-400 text-2xl">$73/mo</span>
              </div>
              <p className="text-center text-gray-400 text-sm pt-2">
                That&apos;s <strong className="text-emerald-400">$876 per year</strong> back in your pocket!
              </p>
            </div>
          </div>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Advanced Tactics
            </h2>
            <div className="space-y-4">
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The \"Break Even\" Rule</h3>
                <p className="text-gray-300 text-sm">
                  If a streaming service costs $15/mo, you need to watch at least 3-4 hours per month to justify it. 
                  Otherwise, rent individual movies ($4-6 each) or rotate subscriptions.
                </p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The \"Pause\" Strategy</h3>
                <p className="text-gray-300 text-sm">
                  Many services (Audible, meal kits, fitness apps) let you pause for 1-3 months instead of canceling. 
                  Pause during busy months, vacations, or when you&apos;re not using them.
                </p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The \"Churn\" Method</h3>
                <p className="text-gray-300 text-sm">
                  Cancel right after subscribing (access continues until period ends). Prevents forgetting. 
                  If you want it next month, you&apos;ll remember to resubscribe.
                </p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The \"Bundle Audit\"</h3>
                <p className="text-gray-300 text-sm">
                  Check if your cell phone, credit card, or employer offers free subscriptions. 
                  Many people pay for Hulu when it&apos;s included with their Spotify or phone plan.
                </p>
              </div>
            </div>
          </div>

          <div className="neu-card rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              Track Everything with SubTracker
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Manually tracking 12+ subscriptions is exhausting. SubTracker automatically organizes everything, 
              sends savings alerts, and shows exactly where your money goes each month.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="neu-card rounded-xl p-4 border border-emerald-500/20 text-center">
                <DollarSign className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white mb-1">Find Savings</p>
                <p className="text-xs text-gray-400">Identify opportunities</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-teal-500/20 text-center">
                <Calendar className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white mb-1">Set Reminders</p>
                <p className="text-xs text-gray-400">Never miss renewals</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-blue-500/20 text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white mb-1">Track Savings</p>
                <p className="text-xs text-gray-400">See your progress</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Start Saving Money Today
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-3">Free forever • No credit card • 5-minute setup</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-4 relative">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 SubTracker. Save money on subscriptions.</p>
        </div>
      </footer>
    </div>
  )
}

function Calculator({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="2" />
      <rect x="8" y="6" width="8" height="2" strokeWidth="2" />
      <rect x="8" y="10" width="2" height="2" strokeWidth="2" />
      <rect x="11" y="10" width="2" height="2" strokeWidth="2" />
      <rect x="14" y="10" width="2" height="2" strokeWidth="2" />
      <rect x="8" y="13" width="2" height="2" strokeWidth="2" />
      <rect x="11" y="13" width="2" height="2" strokeWidth="2" />
      <rect x="14" y="13" width="2" height="2" strokeWidth="2" />
    </svg>
  )
}
