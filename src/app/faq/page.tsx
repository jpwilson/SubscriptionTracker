import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { MarketingShell } from '@/components/marketing-shell'
import { FAQ_ITEMS } from '@/content/faq'
import { breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo'
import { LAST_UPDATED } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'SubTracker FAQ: Cost, Privacy and Data Export',
  description:
    'Answers to the questions people ask about SubTracker: what it costs, whether it connects to your bank, how to export your data, and which platforms it runs on.',
  path: '/faq',
})

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
]

export default function FaqPage() {
  return (
    <MarketingShell breadcrumb={BREADCRUMB}>
      <JsonLd data={[faqSchema(FAQ_ITEMS), breadcrumbSchema(BREADCRUMB)]} />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-gradient">SubTracker FAQ</span>
      </h1>

      <p className="text-lg text-gray-300 mb-4">
        SubTracker is a free web app for tracking subscriptions, and this page answers the questions
        people ask before they sign up: what it costs, what it will and will not do, and what happens
        to the data you put in. Every answer here describes the app as it actually works today.
      </p>
      <p className="text-sm text-gray-500 mb-12">Last updated {LAST_UPDATED}.</p>

      <div className="space-y-6">
        {FAQ_ITEMS.map((item) => (
          <section key={item.question} className="neu-card rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-3">{item.question}</h2>
            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
          </section>
        ))}
      </div>

      <section className="neu-card rounded-3xl p-8 mt-12 border border-emerald-500/20">
        <h2 className="text-2xl font-bold text-gradient mb-4">Still deciding?</h2>
        <p className="text-gray-300 mb-6">
          If you are weighing SubTracker against something else, these pages lay out the differences
          without the sales pitch.
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>
            <Link href="/alternatives" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Best subscription tracker apps
            </Link>{' '}
            — the honest rundown, including when something else is the better pick.
          </li>
          <li>
            <Link href="/vs-rocket-money" className="text-emerald-400 hover:text-emerald-300 font-medium">
              SubTracker vs Rocket Money
            </Link>{' '}
            — manual tracking versus bank-connected automatic detection.
          </li>
          <li>
            <Link href="/vs-bobby" className="text-emerald-400 hover:text-emerald-300 font-medium">
              SubTracker vs Bobby
            </Link>{' '}
            — a web app versus an iOS-only tracker.
          </li>
          <li>
            <Link href="/vs-ynab" className="text-emerald-400 hover:text-emerald-300 font-medium">
              SubTracker vs YNAB
            </Link>{' '}
            — a subscription tracker versus a full budgeting system.
          </li>
          <li>
            <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Pricing
            </Link>{' '}
            — what the free plan covers and what Premium costs.
          </li>
        </ul>
        <Link
          href="/login"
          className="inline-block mt-8 rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
        >
          Create a free account
        </Link>
      </section>
    </MarketingShell>
  )
}
