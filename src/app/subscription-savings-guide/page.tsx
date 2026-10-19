import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, DollarSign, TrendingUp, Users, Calendar, Shield, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Subscription Savings Guide: 12 Ways to Save Money | SubTracker',
  description: 'Practical strategies to reduce subscription costs. Learn about annual billing savings, family plan sharing, and more money-saving tips.',
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
      savings: 'Annual plans often cheaper',
      description: 'Most subscriptions offer discounts for annual payment',
      examples: [
        'Streaming services often discount annual plans',
        'Software subscriptions (Adobe, Microsoft 365)',
        'News and media subscriptions',
        'Cloud storage services'
      ],
      tips: 'Only switch if you\'re committed to using the service for 12 months'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: 'Share Family Plans',
      savings: 'Split costs among multiple users',
      description: 'Many services offer family plans that cost less per person',
      examples: [
        'Music streaming family plans (up to 6 people)',
        'Video streaming services',
        'Cloud storage family plans',
        'Warehouse club memberships'
      ],
      tips: 'Make sure everyone actually uses it, or you\'re still overpaying'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal-400" />,
      title: 'Downgrade Premium Plans',
      savings: 'Pay only for features you use',
      description: 'Many people don\'t use premium features',
      examples: [
        'Lower video quality tiers if you don\'t need 4K',
        'Basic music plans if you don\'t need offline downloads',
        'Essential software plans instead of full suites',
        'Free tiers for tools you rarely use'
      ],
      tips: 'Downgrade first, cancel only if you don\'t miss it'
    },
    {
      icon: <Calendar className="w-8 h-8 text-indigo-400" />,
      title: 'Rotate Subscriptions',
      savings: 'Only pay when actively using',
      description: 'Subscribe when you need it, cancel when done',
      examples: [
        'Watch one streaming service for a month, then switch',
        'Subscribe to software for specific projects',
        'Seasonal subscriptions (fitness apps in winter)',
        'Meal kits during busy periods only'
      ],
      tips: 'Works best for entertainment and seasonal services'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'Bundle Services Together',
      savings: 'Bundled services cost less than individual',
      description: 'Providers offer discounts when you combine services',
      examples: [
        'Streaming bundles (multiple services for one price)',
        'All-in-one Apple, Microsoft, or Amazon ecosystems',
        'Internet + streaming from your ISP',
        'Cell phone plans with included streaming'
      ],
      tips: 'Only worth it if you use all bundled services'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Use Free Alternatives',
      savings: 'Free can replace paid for basic needs',
      description: 'Many paid services have capable free options',
      examples: [
        'Free design tools instead of pro versions',
        'Free office suites instead of paid subscriptions',
        'Ad-supported streaming instead of premium',
        'Open-source software alternatives'
      ],
      tips: 'Try the free version first before upgrading'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-green-400" />,
      title: 'Cancel Unused Subscriptions',
      savings: 'Stop paying for what you don\'t use',
      description: 'The most effective way to save',
      examples: [
        'Gym memberships you don\'t visit',
        'Streaming services you watched once',
        'Software trials you forgot to cancel',
        'Duplicate services (multiple cloud storage plans)'
      ],
      tips: 'Be honest: If you haven\'t used it in 30 days, cancel it'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-400" />,
      title: 'Negotiate Retention Offers',
      savings: 'Ask for discounts to stay subscribed',
      description: 'Companies offer discounts to keep customers',
      examples: [
        'Cable/Internet: Call to cancel, often get discounts',
        'Satellite radio services',
        'News subscriptions',
        'Audiobook services'
      ],
      tips: 'Actually be willing to cancel if they don\'t offer a discount'
    },
    {
      icon: <Calendar className="w-8 h-8 text-pink-400" />,
      title: 'Time Your Subscriptions',
      savings: 'Subscribe for specific content only',
      description: 'Subscribe for specific content, then pause',
      examples: [
        'Subscribe when new seasons of shows release',
        'Subscribe for one month to binge content',
        'Pause during vacations or busy periods',
        'Skip meal kit weeks when traveling'
      ],
      tips: 'Most services let you pause or restart anytime'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-400" />,
      title: 'Look for Student/Teacher Discounts',
      savings: 'Education discounts available',
      description: 'Many services offer education pricing',
      examples: [
        'Music streaming student plans',
        'Software student versions',
        'News subscriptions for students',
        'Delivery services with student pricing'
      ],
      tips: 'Verify annually. Most require .edu email or student ID.'
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-400" />,
      title: 'Use Credit Card Perks',
      savings: 'Credit card statement credits',
      description: 'Some cards reimburse subscription costs',
      examples: [
        'Premium cards with streaming credits',
        'Cards with food delivery credits',
        'Travel cards with subscription benefits',
        'Cards with cell phone protection'
      ],
      tips: 'Check your card benefits. Many people miss these credits.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      title: 'Take Advantage of Promotions',
      savings: 'Discounted trial periods',
      description: 'New customer deals and limited-time offers',
      examples: [
        'Discounted first months for new subscribers',
        'Free trial periods (remember to cancel)',
        'Black Friday and holiday deals',
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
            Reduce your subscription costs without giving up the services you love. Here&apos;s how.
          </p>

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

          <div className="neu-card rounded-3xl p-8 mb-12 border border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Advanced Tactics
            </h2>
            <div className="space-y-4">
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The &ldquo;Break Even&rdquo; Rule</h3>
                <p className="text-gray-300 text-sm">
                  If a streaming service costs $15/mo, you need to watch at least 3-4 hours per month to justify it. 
                  Otherwise, rent individual movies ($4-6 each) or rotate subscriptions.
                </p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The &ldquo;Pause&rdquo; Strategy</h3>
                <p className="text-gray-300 text-sm">
                  Many services (Audible, meal kits, fitness apps) let you pause for 1-3 months instead of canceling. 
                  Pause during busy months, vacations, or when you&apos;re not using them.
                </p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The &ldquo;Churn&rdquo; Method</h3>
                <p className="text-gray-300 text-sm">
                  Cancel right after subscribing (access continues until period ends). Prevents forgetting. 
                  If you want it next month, you&apos;ll remember to resubscribe.
                </p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2">The &ldquo;Bundle Audit&rdquo;</h3>
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
