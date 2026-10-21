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
    'SubTracker is free with unlimited subscriptions and no credit card. Premium is $8 a month, $60 a year or $250 once. See exactly what each plan includes.',
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
        SubTracker is a free web app for tracking subscriptions, and the free plan is the whole
        product for most people: unlimited subscriptions, no credit card, no trial clock. Premium
        adds custom categories and deeper analytics for $8 a month, $60 a year or $250 as a one-off.
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

      <h2 className="text-2xl font-bold text-white mb-6 mt-14">Premium</h2>
      <p className="text-gray-300 mb-6">
        The same Premium feature set, billed three different ways. Checkout runs through Stripe, so
        your card details go to Stripe rather than to SubTracker.
      </p>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {paid.map((plan) => (
          <section key={plan.id} className="neu-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
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
            <dt className="font-semibold text-white mb-1">Can I cancel Premium?</dt>
            <dd className="text-gray-300">
              Monthly and annual Premium are ordinary Stripe subscriptions, so they can be
              cancelled, and the lifetime option has nothing to cancel. Your subscription list stays
              in your account either way.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-white mb-1">Is the annual plan the same as $5 a month?</dt>
            <dd className="text-gray-300">
              It works out that way: $60 once a year is $5 a month, against $8 if you pay month to
              month. You are billed the $60 in one charge.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-white mb-1">What happens to my data if I stop paying?</dt>
            <dd className="text-gray-300">
              Your subscription list stays, and you can always export the whole thing to CSV from
              your profile page.
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
