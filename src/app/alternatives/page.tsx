import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { MarketingShell } from '@/components/marketing-shell'
import { ALTERNATIVES, COMPARISONS } from '@/content/comparisons'
import { breadcrumbSchema, buildMetadata, itemListSchema } from '@/lib/seo'
import { LAST_UPDATED, absoluteUrl } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Best Subscription Tracker Apps in 2026 | SubTracker',
  description:
    'A fair rundown of subscription tracker apps — SubTracker, Rocket Money, Bobby, YNAB, Monarch Money and spreadsheets — and which one fits which problem.',
  path: '/alternatives',
})

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Alternatives', path: '/alternatives' },
]

export default function AlternativesPage() {
  return (
    <MarketingShell breadcrumb={BREADCRUMB}>
      <JsonLd
        data={[
          breadcrumbSchema(BREADCRUMB),
          itemListSchema({
            name: 'Subscription tracker apps compared',
            description:
              'Subscription tracking tools worth considering, with what each one is best for.',
            path: '/alternatives',
            items: ALTERNATIVES.map((entry) => ({
              name: entry.name,
              url: entry.url,
              description: `Best for: ${entry.bestFor}`,
            })),
          }),
        ]}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-gradient">Best subscription tracker apps</span>
      </h1>

      <p className="text-lg text-gray-300 mb-4">
        A subscription tracker is an app that keeps a list of your recurring payments and tells you
        what they add up to. This page compares the options for anyone who has lost track of their
        streaming, software, AI and gym bills — including the cases where SubTracker, which is our
        own free web app, is the wrong answer.
      </p>
      <p className="text-gray-400 mb-4">
        The short version: if you cannot remember what you subscribe to, a bank-connected app like
        Rocket Money will find it faster than you will. If you already roughly know and want one
        clear list, totals and renewal reminders without handing over bank access, a manual tracker
        like SubTracker or Bobby is enough — and free. If the real problem is your whole budget
        rather than your subscriptions, pay for a budgeting app instead.
      </p>
      <p className="text-sm text-gray-500 mb-12">
        Last updated {LAST_UPDATED}. Competitor details come from each product&apos;s own website or
        App Store listing on that date and change often — check the source before you decide.
      </p>

      <h2 className="text-2xl font-bold text-white mb-6">How to pick in one minute</h2>
      <div className="neu-card rounded-3xl p-8 mb-12 border border-white/10">
        <dl className="space-y-5 text-gray-300">
          <div>
            <dt className="font-semibold text-white">
              &ldquo;I have no idea what is charging my card.&rdquo;
            </dt>
            <dd>
              Use something with bank connections — Rocket Money is the best-known. Or spend twenty
              minutes with three months of statements and then use a manual tracker.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-white">
              &ldquo;I know what I pay for, I just want the total and the dates.&rdquo;
            </dt>
            <dd>A manual tracker. SubTracker on the web, Bobby if you only use an iPhone.</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">
              &ldquo;I do not want any app near my bank login.&rdquo;
            </dt>
            <dd>A manual tracker, or a spreadsheet. None of them need financial credentials.</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">
              &ldquo;I want to budget everything, not just subscriptions.&rdquo;
            </dt>
            <dd>YNAB or Monarch Money. A subscription tracker will not scratch that itch.</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">
              &ldquo;I want someone else to do the cancelling.&rdquo;
            </dt>
            <dd>
              That is a paid service, not a tracker. Rocket Money offers it; SubTracker does not.
            </dd>
          </div>
        </dl>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">The options</h2>
      <div className="space-y-6 mb-12">
        {ALTERNATIVES.map((entry) => (
          <section key={entry.name} className="neu-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-1">{entry.name}</h3>
            <p className="text-sm text-emerald-400 mb-4">Best for: {entry.bestFor}</p>
            <p className="text-gray-300 mb-4">{entry.summary}</p>
            <p className="text-sm text-gray-400 mb-4">
              <span className="font-semibold text-gray-300">Watch out:</span> {entry.watchOut}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {entry.url.startsWith('http') ? (
                <a
                  href={entry.url}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  {entry.urlLabel}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <Link href={entry.url} className="text-emerald-400 hover:text-emerald-300">
                  {entry.urlLabel}
                </Link>
              )}
              {entry.comparisonPath && (
                <Link
                  href={entry.comparisonPath}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Full comparison with SubTracker
                </Link>
              )}
            </div>
          </section>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Where SubTracker fits</h2>
      <section className="neu-card rounded-3xl p-8 mb-12 border border-emerald-500/20">
        <p className="text-gray-300 mb-4">
          SubTracker is the free, unlimited, no-bank-access option. You add each subscription once
          and get monthly and yearly totals, twelve categories, trial and renewal badges, a payment
          calendar, category charts, insights about subscriptions you have stopped using, and CSV
          export. There is no cap on the free plan, which is the main thing that separates it from
          the trackers that limit free users to a handful of entries.
        </p>
        <p className="text-gray-400 mb-6">
          It is not the right tool if you want automatic discovery, cancellation on your behalf, a
          native mobile app or a full budget. We would rather you knew that before signing up than
          after.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/login"
            className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          >
            Try the free plan
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl px-6 py-3 font-semibold border border-white/20 text-white hover:bg-white/5"
          >
            See what Premium costs
          </Link>
        </div>
      </section>

      <h2 className="text-2xl font-bold text-white mb-6">Head-to-head comparisons</h2>
      <ul className="space-y-3 text-gray-300 mb-12">
        {COMPARISONS.map((comparison) => (
          <li key={comparison.path}>
            <Link href={comparison.path} className="text-emerald-400 hover:text-emerald-300 font-medium">
              {comparison.h1}
            </Link>{' '}
            — {comparison.description}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-white mb-6">Before you pick anything</h2>
      <p className="text-gray-300 mb-4">
        Whichever tool you choose, the first job is the same: find out what you are actually paying
        for. These guides walk through it.
      </p>
      <ul className="space-y-3 text-gray-300">
        <li>
          <Link href="/find-forgotten-subscriptions" className="text-emerald-400 hover:text-emerald-300">
            How to find forgotten subscriptions
          </Link>
        </li>
        <li>
          <Link href="/how-to-cancel-subscriptions" className="text-emerald-400 hover:text-emerald-300">
            How to cancel subscriptions
          </Link>
        </li>
        <li>
          <Link href="/subscription-savings-guide" className="text-emerald-400 hover:text-emerald-300">
            Subscription savings guide
          </Link>
        </li>
        <li>
          <a href={absoluteUrl('/llms-full.txt')} className="text-emerald-400 hover:text-emerald-300">
            Plain-text version of this site
          </a>
        </li>
      </ul>
    </MarketingShell>
  )
}
