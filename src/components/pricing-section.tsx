'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

const FREE_FEATURES = [
  'Track unlimited subscriptions',
  'Monthly & yearly cost overview',
  'Next payment dates & payment calendar',
  'Trial & cancellation status badges',
  'Basic analytics & graphs',
  'Export subscription data',
  'Dark mode',
  '12 default categories',
]

// Premium cannot be activated yet: src/lib/feature-gates.ts always reports the
// user as free and there is no webhook that grants an entitlement. Keep these
// labelled as planned until that is wired up. See src/content/product.ts.
const PREMIUM_FEATURES = [
  'Everything in Free',
  'Planned: custom categories',
  'Planned: subcategories',
  'Planned: advanced analytics',
  'Planned: usage tracking & Smart Insights',
  'Planned: cost projections',
  'Planned: priority support',
]

const ENTERPRISE_FEATURES = [
  'Everything in Premium',
  'Multi-user team accounts',
  'Expense approval workflows',
  'Monthly audit reports',
  'Auto-flag unclaimed expenses',
  'Department budgeting',
  'API access',
  'Dedicated account manager',
  'Custom integrations',
  'SSO authentication',
]

export function PricingSection() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free is the only plan you can be on today. The Premium and Enterprise prices below are
            published plans that cannot be switched on yet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neu-card p-8 relative"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-muted-foreground mb-4">
                Perfect for personal use
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 mt-0.5">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="neu-button w-full">
              Get Started Free
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neu-card p-8 relative border-2 border-emerald-500/20"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-muted-foreground text-sm font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Not available yet
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Premium
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </h3>
              <p className="text-muted-foreground mb-4">
                Published price, not yet switchable on
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gradient">$5</span>
                <span className="text-muted-foreground">/month billed annually</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                $60 once a year, or $8 month to month
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {PREMIUM_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing" className="block w-full">
              <button className="neu-button w-full border-2 border-emerald-500/20 hover:bg-emerald-500/10">
                See Premium pricing
              </button>
            </Link>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="neu-card p-8 relative border-2 border-gradient-to-r from-emerald-500 to-teal-500"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Enterprise
                <span className="text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1 rounded-full">
                  For Teams
                </span>
              </h3>
              <p className="text-muted-foreground mb-4">
                Not available yet &mdash; get in touch
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gradient">$200</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per organization</p>
            </div>

            <ul className="space-y-4 mb-8">
              {ENTERPRISE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing" className="block w-full">
              <button className="neu-button w-full border-2 border-emerald-500/20 hover:bg-emerald-500/10">
                See the detail
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            No credit card required for the free plan, and no subscription limit on it either.
          </p>
          <p className="text-xs text-muted-foreground">
            Full detail, including what SubTracker deliberately does not do, on the{' '}
            <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">
              pricing page
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}