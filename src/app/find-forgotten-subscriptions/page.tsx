import Link from 'next/link'
import { ArrowRight, CheckCircle2, Search, Mail, CreditCard, Receipt, AlertTriangle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/json-ld'
import { MarketingFooter } from '@/components/marketing-footer'
import { MarketingHeader } from '@/components/marketing-header'
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo'
import { LAST_UPDATED_ISO } from '@/lib/site'

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Find forgotten subscriptions', path: '/find-forgotten-subscriptions' },
]

export const metadata = buildMetadata({
  title: 'How to Find Forgotten Subscriptions You Still Pay For',
  description: 'A practical audit for finding recurring charges you forgot about: bank statements, App Store and Google Play subscriptions, email receipts and PayPal agreements.',
  path: '/find-forgotten-subscriptions',
  type: 'article',
})

export default function FindForgottenSubscriptions() {
  const methods = [
    {
      icon: <Mail className="w-8 h-8 text-emerald-400" />,
      title: 'Search Your Email',
      description: 'Your inbox is a goldmine of subscription confirmations',
      steps: [
        'Search for "subscription", "recurring", "billing", "trial", "membership"',
        'Search for "thank you for your order" or "payment received"',
        'Look for monthly receipts from the same sender',
        'Check emails from PayPal, Stripe, or your credit card',
        'Filter by specific services: Netflix, Spotify, Adobe, etc.'
      ],
      keywords: ['subscription', 'recurring payment', 'auto-renew', 'membership', 'premium account', 'trial ending']
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-400" />,
      title: 'Review Bank & Credit Card Statements',
      description: 'Check for regular monthly charges',
      steps: [
        'Download last 3 months of statements',
        'Look for charges that repeat monthly',
        'Identify small charges under $20 (often forgotten)',
        'Search for company names you recognize but don\'t use',
        'Check multiple payment methods (cards, PayPal, Venmo)',
        'Look for charges on old credit cards'
      ],
      keywords: ['Monthly charges', 'Recurring debits', 'Same amount every month', 'Small charges', '$0.99-$29.99']
    },
    {
      icon: <Receipt className="w-8 h-8 text-teal-400" />,
      title: 'Check Payment Platforms',
      description: 'Services often charge through intermediaries',
      steps: [
        'Log into PayPal → Settings → Payments → Manage automatic payments',
        'Check Apple ID → Subscriptions (iPhone: Settings → Apple ID)',
        'Google Play → Subscriptions',
        'Amazon → Account → Memberships & Subscriptions',
        'Review any other payment services you use (Venmo, Cash App, etc.)'
      ],
      keywords: ['PayPal recurring', 'Apple subscriptions', 'Google Play', 'Amazon Prime']
    },
    {
      icon: <Search className="w-8 h-8 text-indigo-400" />,
      title: 'Common Hidden Subscriptions',
      description: 'Services people frequently forget',
      steps: [
        'Streaming: Netflix, Hulu, Disney+, HBO Max, Peacock, Paramount+, Discovery+',
        'Music: Spotify, Apple Music, YouTube Premium, Tidal, Amazon Music',
        'Cloud Storage: iCloud, Google Drive, Dropbox, OneDrive',
        'Software: Adobe Creative Cloud, Microsoft 365, Grammarly, Canva Pro',
        'News: NYTimes, WSJ, Medium, Substack newsletters',
        'Fitness: Peloton, Apple Fitness+, Strava, MyFitnessPal',
        'Gaming: Xbox Game Pass, PlayStation Plus, Nintendo Switch Online, EA Play',
        'VPN & Security: NordVPN, ExpressVPN, Norton, McAfee'
      ],
      keywords: []
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-yellow-400" />,
      title: 'Free Trials You Forgot to Cancel',
      description: 'The #1 source of forgotten subscriptions',
      steps: [
        'Check for 7-day or 30-day trial emails from last 1-3 months',
        'Search email for "trial ending" or "trial ends soon"',
        'Review promotional offers you clicked',
        'Check software you downloaded "just to try"',
        'Look for annual renewals of old trials'
      ],
      keywords: ['Free trial', 'Trial period', '7 days free', '30 days free', 'Cancel anytime']
    },
    {
      icon: <CreditCard className="w-8 h-8 text-purple-400" />,
      title: 'Old Accounts & Services',
      description: 'Services from previous life stages',
      steps: [
        'Student accounts that renewed after graduation',
        'Gym memberships from old addresses',
        'Meal kit subscriptions you stopped using',
        'Dating apps (Match, Tinder Gold, Bumble Boost)',
        'Children\'s services if kids grew older',
        'Work-related subscriptions after job changes'
      ],
      keywords: ['Student discount', 'Membership', 'Old account']
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-400" />,
      title: 'Family & Shared Accounts',
      description: 'Subscriptions you pay for but others use',
      steps: [
        'Family sharing plans (Spotify, Apple Music, YouTube Premium)',
        'Services your kids signed up for with your card',
        'Shared streaming accounts you forgot about',
        'Services for elderly parents',
        'Group memberships (Costco, Amazon Household)'
      ],
      keywords: ['Family plan', 'Shared account', 'Kids subscription']
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 gradient-mesh" />
      
      <JsonLd
        data={[
          breadcrumbSchema(BREADCRUMB),
          articleSchema({
            headline: 'How to Find Forgotten Subscriptions You Still Pay For',
            description: 'A practical audit for finding recurring charges you forgot about: bank statements, App Store and Google Play subscriptions, email receipts and PayPal agreements.',
            path: '/find-forgotten-subscriptions',
            datePublished: LAST_UPDATED_ISO,
            dateModified: LAST_UPDATED_ISO,
          }),
        ]}
      />
      <MarketingHeader />

      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">How to Find Forgotten Subscriptions</span>
            <br />
            <span className="text-white">Stop Wasting Money Today</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            Many people have forgotten subscriptions they&apos;re still paying for. Here&apos;s exactly how to find yours.
          </p>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              Why This Matters
            </h2>
            <p className="text-gray-300">
              Forgotten subscriptions are common. Free trials that auto-renew, services you used once, or accounts from previous life stages can add up. Finding and canceling unused subscriptions puts money back in your budget.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gradient text-center mb-8">
              7 Methods to Find Hidden Subscriptions
            </h2>
            
            {methods.map((method, index) => (
              <div key={index} className="neu-card rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                    <p className="text-gray-400">{method.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {method.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
                
                {method.keywords && method.keywords.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2">Search keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {method.keywords.map((keyword, kidx) => (
                        <span key={kidx} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-teal-400" />
              Red Flags: Signs of Forgotten Subscriptions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="neu-card rounded-xl p-4 border border-red-500/20">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Warning Signs
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Charges under $10 (easy to miss)</li>
                  <li>• Company names you don&apos;t recognize</li>
                  <li>• Services you &quot;tried once&quot;</li>
                  <li>• Annual charges you forgot about</li>
                  <li>• Apps you deleted but still pay for</li>
                </ul>
              </div>
              <div className="neu-card rounded-xl p-4 border border-emerald-500/20">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Action Steps
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Cancel if unused for 30+ days</li>
                  <li>• Downgrade instead of full cancel</li>
                  <li>• Switch to annual for savings</li>
                  <li>• Share family plans with others</li>
                  <li>• Set calendar reminders</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-indigo-900/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-400" />
              Email Search Pro Tips
            </h2>
            <p className="text-gray-300 mb-4">
              Most subscription confirmations live in your email. Use these advanced search queries:
            </p>
            <div className="space-y-2 font-mono text-sm">
              <div className="neu-card rounded-lg p-3 border border-blue-500/20 bg-blue-500/5">
                <code className="text-blue-300">subscription OR recurring OR billing after:2024/01/01</code>
              </div>
              <div className="neu-card rounded-lg p-3 border border-teal-500/20 bg-teal-500/5">
                <code className="text-teal-300">subject:(receipt OR invoice) after:2024/06/01</code>
              </div>
              <div className="neu-card rounded-lg p-3 border border-emerald-500/20 bg-emerald-500/5">
                <code className="text-emerald-300">&quot;trial ending&quot; OR &quot;trial expires&quot; -label:trash</code>
              </div>
              <div className="neu-card rounded-lg p-3 border border-indigo-500/20 bg-indigo-500/5">
                <code className="text-indigo-300">from:(paypal.com OR stripe.com) after:2024/01/01</code>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Works in Gmail, Outlook, and most email providers
            </p>
          </div>

          <div className="neu-card rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              The Easier Way: Let SubTracker Do It
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Manually hunting through emails and statements takes hours. SubTracker organizes everything automatically and alerts you to forgotten subscriptions, upcoming renewals, and price increases.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="neu-card rounded-xl p-4 border border-emerald-500/20 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white mb-1">One Dashboard</p>
                <p className="text-xs text-gray-400">All subscriptions tracked</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-teal-500/20 text-center">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white mb-1">Smart Alerts</p>
                <p className="text-xs text-gray-400">Never forget again</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-blue-500/20 text-center">
                <Receipt className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white mb-1">Savings Insights</p>
                <p className="text-xs text-gray-400">Cut unnecessary costs</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Find My Subscriptions Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-3">Free forever • Set up in 5 minutes • No credit card</p>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}
