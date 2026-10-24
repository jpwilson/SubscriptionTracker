/**
 * Single source of truth for the public site URL and the facts we publish about
 * SubTracker. Everything that needs an absolute URL (metadata, canonicals,
 * sitemap.xml, robots.txt, JSON-LD, /llms.txt) reads from here.
 *
 * To move the site to a different domain, set NEXT_PUBLIC_SITE_URL in the
 * hosting environment (e.g. https://subtracker.app once that domain resolves).
 * Nothing else needs to change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://subscription-tracker-vert.vercel.app'
).replace(/\/+$/, '')

export const SITE_NAME = 'SubTracker'

/** One-sentence answer to "what is it and who is it for". Reused in metadata and JSON-LD. */
export const SITE_DESCRIPTION =
  'SubTracker is a free web app for tracking subscriptions: you add your recurring payments once and see what they cost per month and per year, when the next payment is due, and which ones you have stopped using.'

/** Short description sized for a meta description tag (140-160 chars). */
export const SITE_META_DESCRIPTION =
  'SubTracker is a free web app for tracking subscriptions. See what your recurring payments cost per month and year, and spot the ones you no longer use.'

/** Visible "Last updated" stamp on comparison and pricing pages. Keep it true. */
export const LAST_UPDATED = 'October 2026'
export const LAST_UPDATED_ISO = '2026-10-21'

/** Build an absolute URL on the canonical host. */
export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export type PublicPage = {
  /** Path, e.g. "/faq". "/" for the home page. */
  path: string
  /** Short label used in navigation and in /llms.txt. */
  label: string
  /** One line describing the page, used in /llms.txt. */
  blurb: string
  /** Where the link belongs in the site chrome. */
  nav: 'primary' | 'compare' | 'guide' | 'none'
  priority: number
  changeFrequency: 'weekly' | 'monthly'
  /**
   * True for pages that exist for the app rather than for readers (the sign-in
   * page). They stay crawlable and stay in the sitemap, but the long-form
   * content checks in scripts/check-seo.mjs do not apply to them.
   */
  thin?: true
}

/**
 * Every public, indexable page. Drives the header, the footer, sitemap.xml,
 * /llms.txt and scripts/check-seo.mjs. Add new marketing pages here.
 */
export const PUBLIC_PAGES: PublicPage[] = [
  {
    path: '/',
    label: 'Home',
    blurb: 'What SubTracker is, what it tracks, how it works, and what the plans cost.',
    nav: 'none',
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    path: '/pricing',
    label: 'Pricing',
    blurb: 'Free plan and Premium prices, what is in each plan, and how billing works.',
    nav: 'primary',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/faq',
    label: 'FAQ',
    blurb: 'Answers to common questions: cost, sign-up, data export, privacy, platforms, bank connections.',
    nav: 'primary',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/alternatives',
    label: 'Alternatives',
    blurb: 'Honest comparison of subscription tracker apps, including which one to pick for which job.',
    nav: 'primary',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/vs-rocket-money',
    label: 'SubTracker vs Rocket Money',
    blurb: 'Manual subscription tracking versus a bank-connected app that cancels bills for you.',
    nav: 'compare',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/vs-bobby',
    label: 'SubTracker vs Bobby',
    blurb: 'Web app versus iOS-only app, both built around entering subscriptions by hand.',
    nav: 'compare',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/vs-ynab',
    label: 'SubTracker vs YNAB',
    blurb: 'A single-purpose subscription tracker versus a full zero-based budgeting system.',
    nav: 'compare',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/how-to-cancel-subscriptions',
    label: 'How to cancel subscriptions',
    blurb: 'Step-by-step guide to cancelling subscriptions on iPhone, Android, and the web.',
    nav: 'guide',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/find-forgotten-subscriptions',
    label: 'Find forgotten subscriptions',
    blurb: 'How to audit bank and app-store statements to find recurring charges you forgot about.',
    nav: 'guide',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/subscription-savings-guide',
    label: 'Subscription savings guide',
    blurb: 'Ways to cut recurring spending: annual billing, family plans, downgrades, rotation.',
    nav: 'guide',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/login',
    label: 'Sign in',
    blurb: 'Sign in or create a free SubTracker account.',
    nav: 'none',
    priority: 0.4,
    changeFrequency: 'monthly',
    thin: true,
  },
]

export const PRIMARY_NAV = PUBLIC_PAGES.filter((p) => p.nav === 'primary')
export const COMPARE_NAV = PUBLIC_PAGES.filter((p) => p.nav === 'compare')
export const GUIDE_NAV = PUBLIC_PAGES.filter((p) => p.nav === 'guide')
