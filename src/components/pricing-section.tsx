'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

const FREE_FEATURES = [
  'Track unlimited subscriptions',
  'Monthly & yearly cost overview',
  'Payment reminders',
  'Basic analytics & graphs',
  'Export subscription data',
  'Dark mode',
  '20 default categories',
]

const PREMIUM_FEATURES = [
  'Everything in Free',
  'Create custom categories',
  'Add subcategories',
  'Advanced analytics',
  'Usage tracking & insights',
  'Cost projections',
  'Priority support',
  'Early access to new features',
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
            Start free and upgrade when you need more powerful features
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
              <div className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Most Popular
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                Premium
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </h3>
              <p className="text-muted-foreground mb-4">
                For power users who want more control
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gradient">$5</span>
                <span className="text-muted-foreground">/month</span>
              </div>
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

            <Link href="/payment?plan=premium" className="block w-full">
              <button className="neu-button w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-500/25">
                Upgrade to Premium
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
                Stop unchecked expenses in your company
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

            <Link href="/payment?plan=enterprise" className="block w-full">
              <button className="neu-button w-full border-2 border-emerald-500/20 hover:bg-emerald-500/10">
                Contact Sales
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
            Cancel anytime. No credit card required for free plan.
          </p>
          <p className="text-xs text-emerald-400 font-medium">
            &ldquo;So many dumb tiny expenses go 100% unchecked&rdquo; - Enterprise customers save thousands monthly
          </p>
        </motion.div>
      </div>
    </section>
  )
}