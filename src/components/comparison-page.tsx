import Link from 'next/link'
import { Check, ExternalLink } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'
import { MarketingShell } from '@/components/marketing-shell'
import type { Comparison } from '@/content/comparisons'
import { COMPARISONS } from '@/content/comparisons'
import { articleSchema, breadcrumbSchema } from '@/lib/seo'
import { LAST_UPDATED, LAST_UPDATED_ISO } from '@/lib/site'

/**
 * Shared layout for the "SubTracker vs X" pages. All of the facts come from
 * src/content/comparisons.ts, which also feeds /llms-full.txt.
 */
export function ComparisonPage({ comparison }: { comparison: Comparison }) {
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Alternatives', path: '/alternatives' },
    { name: comparison.h1, path: comparison.path },
  ]
  const others = COMPARISONS.filter((c) => c.path !== comparison.path)

  return (
    <MarketingShell breadcrumb={breadcrumb}>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumb),
          articleSchema({
            headline: comparison.h1,
            description: comparison.description,
            path: comparison.path,
            datePublished: LAST_UPDATED_ISO,
            dateModified: LAST_UPDATED_ISO,
          }),
        ]}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-gradient">{comparison.h1}</span>
      </h1>

      <p className="text-lg text-gray-300 mb-4">{comparison.intro}</p>
      <p className="text-sm text-gray-500 mb-12">
        Last updated {LAST_UPDATED}. {comparison.sourceNote}
      </p>

      <section className="neu-card rounded-3xl p-8 mb-10 border border-white/10">
        <h2 className="text-2xl font-bold text-gradient mb-4">What {comparison.name} is</h2>
        <p className="text-gray-300 leading-relaxed mb-6">{comparison.competitorSummary}</p>
        <a
          href={comparison.url}
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
          rel="nofollow noopener"
          target="_blank"
        >
          {comparison.urlLabel}
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </section>

      <section className="neu-card rounded-3xl p-8 mb-10 border border-white/10 overflow-x-auto">
        <h2 className="text-2xl font-bold text-gradient mb-6">
          SubTracker and {comparison.name}, side by side
        </h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th scope="col" className="py-3 pr-4 font-medium"></th>
              <th scope="col" className="py-3 pr-4 font-medium text-white">
                SubTracker
              </th>
              <th scope="col" className="py-3 font-medium text-white">
                {comparison.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-white/5 align-top">
                <th scope="row" className="py-4 pr-4 font-medium text-gray-300 text-left">
                  {row.label}
                </th>
                <td className="py-4 pr-4 text-emerald-300">{row.subtracker}</td>
                <td className="py-4 text-gray-300">{row.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <section className="neu-card rounded-2xl p-6 border border-emerald-500/20">
          <h2 className="text-xl font-bold text-white mb-4">Choose SubTracker if</h2>
          <ul className="space-y-3">
            {comparison.chooseSubtracker.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="neu-card rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Choose {comparison.name} if</h2>
          <ul className="space-y-3">
            {comparison.chooseCompetitor.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="neu-card rounded-3xl p-8 mb-10 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">
          Where {comparison.name} is stronger
        </h2>
        <p className="text-gray-400 mb-4">
          A comparison page that only flatters its own product is not worth reading, so here is the
          honest side of it.
        </p>
        <ul className="space-y-3">
          {comparison.competitorStrengths.map((strength) => (
            <li key={strength} className="text-sm text-gray-300">
              — {strength}
            </li>
          ))}
        </ul>
      </section>

      <section className="neu-card rounded-3xl p-8 border border-emerald-500/20">
        <h2 className="text-2xl font-bold text-gradient mb-4">Try SubTracker, or keep looking</h2>
        <p className="text-gray-300 mb-6">
          SubTracker&apos;s free plan tracks unlimited subscriptions and does not ask for a card, so
          finding out whether a manual list is enough for you takes about ten minutes.
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/login"
            className="rounded-xl px-6 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl px-6 py-3 font-semibold border border-white/20 text-white hover:bg-white/5"
          >
            See pricing
          </Link>
        </div>
        <h3 className="text-sm font-semibold text-white mb-3">Other comparisons</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          {others.map((other) => (
            <li key={other.path}>
              <Link href={other.path} className="text-emerald-400 hover:text-emerald-300">
                {other.h1}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/alternatives" className="text-emerald-400 hover:text-emerald-300">
              Best subscription tracker apps
            </Link>
          </li>
          <li>
            <Link href="/faq" className="text-emerald-400 hover:text-emerald-300">
              SubTracker FAQ
            </Link>
          </li>
        </ul>
      </section>
    </MarketingShell>
  )
}
