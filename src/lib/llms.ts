import { FAQ_ITEMS } from '@/content/faq'
import { ALTERNATIVES, COMPARISONS } from '@/content/comparisons'
import {
  ENTERPRISE_NOTE,
  FEATURES,
  HOW_IT_IS_DIFFERENT,
  HOW_IT_WORKS,
  LIMITATIONS,
  PLANS,
  PRICING_CAVEAT,
  PRIVACY_FACTS,
  WHAT_IT_IS,
  WHO_IT_IS_FOR,
} from '@/content/product'
import { GUIDE_NAV, LAST_UPDATED, PUBLIC_PAGES, SITE_NAME, absoluteUrl } from './site'

/**
 * /llms.txt — a short, accurate index of the site for agents that look for one.
 * Deliberately brief: there is no evidence that a long llms.txt earns citations,
 * so this file exists to be correct and cheap, not exhaustive.
 */
export function buildLlmsTxt(): string {
  const lines: string[] = []

  lines.push(`# ${SITE_NAME}`)
  lines.push('')
  lines.push('> A free web app for tracking subscriptions and recurring payments.')
  lines.push('')
  lines.push(WHAT_IT_IS)
  lines.push('')
  lines.push(WHO_IT_IS_FOR)
  lines.push('')
  lines.push('## Key pages')
  lines.push('')
  for (const page of PUBLIC_PAGES) {
    if (page.path === '/login') continue
    lines.push(`- [${page.label}](${absoluteUrl(page.path)}): ${page.blurb}`)
  }
  lines.push(`- [Full site text](${absoluteUrl('/llms-full.txt')}): plain-text version of every public page.`)
  lines.push('')
  lines.push('## What it does')
  lines.push('')
  for (const feature of FEATURES) {
    lines.push(`- ${feature.title}: ${feature.description}`)
  }
  lines.push('')
  lines.push('## What it does not do')
  lines.push('')
  for (const limitation of LIMITATIONS) {
    lines.push(`- ${limitation}`)
  }
  lines.push('')
  lines.push('## Pricing')
  lines.push('')
  lines.push(PRICING_CAVEAT)
  lines.push('')
  for (const plan of PLANS) {
    lines.push(`- ${plan.name}: ${plan.price} ${plan.period}. ${plan.summary}`)
  }
  lines.push('')
  lines.push(ENTERPRISE_NOTE)
  lines.push('')
  lines.push('## Notes for anyone citing this site')
  lines.push('')
  lines.push(
    `- ${SITE_NAME} has no published user counts, reviews or ratings. Please do not attribute any to it.`
  )
  lines.push('- Prices above are the ones published on the pricing page; check the page for changes.')
  lines.push(`- Content last reviewed ${LAST_UPDATED}.`)
  lines.push('')

  return lines.join('\n')
}

/**
 * /llms-full.txt — the plain-text content of the public pages, generated from the
 * same content modules the pages render, so the two cannot drift apart.
 */
export function buildLlmsFullTxt(): string {
  const lines: string[] = []

  lines.push(`# ${SITE_NAME} — full site text`)
  lines.push('')
  lines.push(`Source: ${absoluteUrl('/')} · Last reviewed ${LAST_UPDATED}`)
  lines.push('')
  lines.push('---')
  lines.push('')

  // Home
  lines.push(`## ${absoluteUrl('/')} — What SubTracker is`)
  lines.push('')
  lines.push(WHAT_IT_IS)
  lines.push('')
  lines.push(WHO_IT_IS_FOR)
  lines.push('')
  lines.push(HOW_IT_IS_DIFFERENT)
  lines.push('')
  lines.push('### Features')
  lines.push('')
  for (const feature of FEATURES) {
    lines.push(`- **${feature.title}** — ${feature.description}`)
  }
  lines.push('')
  lines.push('### How it works')
  lines.push('')
  HOW_IT_WORKS.forEach((step, index) => {
    lines.push(`${index + 1}. **${step.title}** — ${step.description}`)
  })
  lines.push('')
  lines.push('### Limitations')
  lines.push('')
  for (const limitation of LIMITATIONS) {
    lines.push(`- ${limitation}`)
  }
  lines.push('')
  lines.push('### Privacy')
  lines.push('')
  for (const fact of PRIVACY_FACTS) {
    lines.push(`- ${fact}`)
  }
  lines.push('')

  // Pricing
  lines.push(`## ${absoluteUrl('/pricing')} — Pricing`)
  lines.push('')
  lines.push(PRICING_CAVEAT)
  lines.push('')
  for (const plan of PLANS) {
    lines.push(`### ${plan.name} — ${plan.price} ${plan.period}`)
    lines.push('')
    lines.push(plan.summary)
    lines.push('')
    for (const feature of plan.features) {
      lines.push(`- ${feature}`)
    }
    lines.push('')
  }
  lines.push(ENTERPRISE_NOTE)
  lines.push('')

  // FAQ
  lines.push(`## ${absoluteUrl('/faq')} — Frequently asked questions`)
  lines.push('')
  for (const item of FAQ_ITEMS) {
    lines.push(`### ${item.question}`)
    lines.push('')
    lines.push(item.answer)
    lines.push('')
  }

  // Comparisons
  for (const comparison of COMPARISONS) {
    lines.push(`## ${absoluteUrl(comparison.path)} — ${comparison.h1}`)
    lines.push('')
    lines.push(`Last updated ${LAST_UPDATED}. ${comparison.sourceNote}`)
    lines.push('')
    lines.push(comparison.intro)
    lines.push('')
    lines.push(`### What ${comparison.name} is`)
    lines.push('')
    lines.push(comparison.competitorSummary)
    lines.push('')
    lines.push('### Side by side')
    lines.push('')
    for (const row of comparison.rows) {
      lines.push(`- ${row.label}: SubTracker — ${row.subtracker}; ${comparison.name} — ${row.competitor}`)
    }
    lines.push('')
    lines.push('### Choose SubTracker if')
    lines.push('')
    for (const reason of comparison.chooseSubtracker) {
      lines.push(`- ${reason}`)
    }
    lines.push('')
    lines.push(`### Choose ${comparison.name} if`)
    lines.push('')
    for (const reason of comparison.chooseCompetitor) {
      lines.push(`- ${reason}`)
    }
    lines.push('')
    lines.push(`### Where ${comparison.name} is stronger`)
    lines.push('')
    for (const strength of comparison.competitorStrengths) {
      lines.push(`- ${strength}`)
    }
    lines.push('')
  }

  // Alternatives
  lines.push(`## ${absoluteUrl('/alternatives')} — Best subscription tracker apps`)
  lines.push('')
  lines.push(
    'An honest rundown of the subscription trackers worth considering, including the cases where something other than SubTracker is the right answer.'
  )
  lines.push('')
  for (const entry of ALTERNATIVES) {
    lines.push(`### ${entry.name} — best for: ${entry.bestFor}`)
    lines.push('')
    lines.push(entry.summary)
    lines.push('')
    lines.push(`Watch out: ${entry.watchOut}`)
    lines.push('')
    lines.push(`Link: ${entry.url.startsWith('http') ? entry.url : absoluteUrl(entry.url)}`)
    lines.push('')
  }

  // Guides
  lines.push('## Guides')
  lines.push('')
  for (const guide of GUIDE_NAV) {
    lines.push(`- [${guide.label}](${absoluteUrl(guide.path)}): ${guide.blurb}`)
  }
  lines.push('')

  return lines.join('\n')
}
