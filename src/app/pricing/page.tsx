import Link from 'next/link'
import { Check } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { MarketingShell } from '@/components/marketing-shell'
import { ENTERPRISE_NOTE, LIMITATIONS, PLANS, PRICING_CAVEAT } from '@/content/product'
import { breadcrumbSchema, buildMetadata } from '@/lib/seo'
import { LAST_UPDATED } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'SubTracker Pricing: Free Plan and Premium Costs',
  description:
    'SubTracker is free with unlimited subscriptions and no credit card. Premium is published at $8 a month, $60 a year or $250 once, but is not available yet. See what each plan includes.',
  path: '/pricing',
})

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
]

export default function PricingPage() {
  const free = PLANS[0]
  const paid = PLANS.slice(1)

  return (
    <MarketingShell breadcrumb={BREADCRUMB}>
      <JsonLd data={breadcrumbSchema(BREADCRUMB)} />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-gradient">SubTracker pricing</span>
      </h1>

      <p className="text-lg text-gray-300 mb-4">
        SubTracker is a free web app for tracking subscriptions, and right now the free plan is the
        whole product: unlimited subscriptions, no credit card, no trial clock. A Premium tier is
        published at $8 a month, $60 a year or $250 as a one-off, and it is not available yet —
        nothing in the app can move an account onto it, so no one has the Premium features.
      </p>
      <p className="text-gray-400 mb-4">{PRICING_CAVEAT}</p>
      <p className="text-sm text-gray-500 mb-12">Prices last checked {LAST_UPDATED}.</p>

      <section className="neu-card rounded-3xl p-8 mb-8 border border-emerald-500/20">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
          <h2 className="text-2xl font-bold text-white">{free.name}</h2>
          <p className="text-3xl font-bold text-gradient">
            {free.price}{' '}
            <span className="text-base font-normal text-gray-400">{free.period}</span>
          </p>
        </div>
        <p className="text-gray-300 mb-6">{free.summary}</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {free.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/login"
          className="inline-block mt-8 rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
        >
          Start free — no card required
        </Link>
      </section>

      <h2 className="text-2xl font-bold text-white mb-6 mt-14">Premium — not available yet</h2>
      <div className="neu-card rounded-2xl p-6 mb-6 border border-yellow-500/30">
        <p className="text-gray-200">
          <strong className="text-yellow-400">Please read this before you plan around Premium.</strong>{' '}
          These are published prices for a plan that cannot currently be switched on. Every account
          is created on the free tier and nothing in the app upgrades it, so the Premium-only
          features — custom categories, subcategories, advanced analytics, cost projections, usage
          tracking and the Smart Insights screen — are unavailable to everyone, paid or not. We are
          leaving the prices here so they are not a surprise later, and this page will say so
          plainly when that changes.
        </p>
      </div>
      <p className="text-gray-300 mb-6">
        The same planned Premium feature set, billed three different ways.
      </p>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {paid.map((plan) => (
          <section key={plan.id} className="neu-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
            {plan.status === 'planned' && (
              <p className="inline-block mb-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                Not available yet
              </p>
            )}
            <p className="text-2xl font-bold text-gradient mb-1">{plan.price}</p>
            <p className="text-xs text-gray-500 mb-4">{plan.period}</p>
            <p className="text-sm text-gray-400 mb-4">{plan.summary}</p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="neu-card rounded-2xl p-6 mb-10 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-3">Teams</h2>
        <p className="text-gray-300">{ENTERPRISE_NOTE}</p>
      </section>

      <section className="neu-card rounded-3xl p-8 mb-10 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">What you are not paying for</h2>
        <p className="text-gray-300 mb-4">
          Being straight about the limits saves everyone time. SubTracker does not do these things at
          any price:
        </p>
        <ul className="space-y-3">
          {LIMITATIONS.map((limitation) => (
            <li key={limitation} className="text-sm text-gray-300">
              — {limitation}
            </li>
          ))}
        </ul>
        <p className="text-gray-400 mt-6">
          If automatic detection or cancellation-on-your-behalf is what you actually want, our{' '}
          <Link href="/vs-rocket-money" className="text-emerald-400 hover:text-emerald-300">
            Rocket Money comparison
          </Link>{' '}
          and{' '}
          <Link href="/alternatives" className="text-emerald-400 hover:text-emerald-300">
            alternatives page
          </Link>{' '}
          say so plainly.
        </p>
      </section>

      <section className="neu-card rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Billing questions</h2>
        <dl className="space-y-5">
          <div>
            <dt className="font-semibold text-white mb-1">Do I need a credit card to start?</dt>
            <dd className="text-gray-300">
              No. The free plan does not ask for one, and it does not expire into a paid plan.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-white mb-1">Can I buy Premium today?</dt>
            <dd className="text-gray-300">
              No, and we would rather say so than take the money. There is no working path from a
              free account to a Premium one, so paying would not unlock anything. Stay on the free
              plan, which has no subscription limit.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-white mb-1">Is the annual plan the same as $5 a month?</dt>
            <dd className="text-gray-300">
              That is how the published price works out: $60 once a year is $5 a month, against $8
              if you pay month to month. Both are planned prices, not live ones.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-white mb-1">Can I export or delete my data?</dt>
            <dd className="text-gray-300">
              Your profile page exports the whole subscription list to CSV, and its Reset Account
              action deletes every subscription in the account. Removing the sign-in itself is not
              yet a button in the app.
            </dd>
          </div>
        </dl>
        <p className="text-gray-400 mt-6">
          More answers on the{' '}
          <Link href="/faq" className="text-emerald-400 hover:text-emerald-300">
            SubTracker FAQ
          </Link>
          .
        </p>
      </section>
    </MarketingShell>
  )
}
