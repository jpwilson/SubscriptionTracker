/**
 * Facts about the product, written once and reused by the marketing pages,
 * the JSON-LD helpers, /llms.txt and /llms-full.txt.
 *
 * Everything in this file must be verifiable from the app itself. Do not add
 * user counts, testimonials, ratings, awards or savings claims here.
 */

export const WHAT_IT_IS =
  'SubTracker is a free web app for tracking subscriptions. You add each recurring payment once — name, amount, billing cycle, category and next payment date — and SubTracker shows what you are spending per month and per year, what is due next, and how the total breaks down by category.'

export const WHO_IT_IS_FOR =
  'It is for people who pay for a pile of streaming, software, AI and gym subscriptions and have lost track of the total. It runs in the browser on desktop and mobile, it does not connect to your bank, and the free plan has no subscription limit and needs no credit card.'

export const HOW_IT_IS_DIFFERENT =
  'SubTracker does not ask for bank credentials. Nothing is imported automatically, which means it cannot find a charge you do not tell it about — but it also means SubTracker never sees your bank account, your card numbers or your transaction history. You type in what you pay for, and you own the list.'

export type Feature = {
  title: string
  description: string
}

/** Features that exist in the app today, on the free plan. */
export const FEATURES: Feature[] = [
  {
    title: 'One list of every subscription',
    description:
      'Add unlimited subscriptions with the amount, billing cycle (weekly, monthly, quarterly, yearly or one-off), start date, next payment date and an optional link and note.',
  },
  {
    title: 'Monthly and yearly totals',
    description:
      'Every amount is normalised to a monthly and a yearly figure, so a $120/year plan and a $10/month plan can be compared side by side and summed into one total.',
  },
  {
    title: 'Twelve categories out of the box',
    description:
      'New accounts get Entertainment, AI Tools, SaaS Products, Finance, Health & Fitness, Education, Shopping, News & Media, Auto & Transport, Housing, Utilities and Other. Creating your own categories is marked as a Premium feature, and Premium is not available yet, so the twelve are what everyone has.',
  },
  {
    title: 'Status badges for trials and cancellations',
    description:
      'Subscriptions are marked active, trial, trial ending soon, unsubscribed, service ending, paused or expired, so you can see at a glance what is about to charge you and what you have already cancelled.',
  },
  {
    title: 'Next payment dates on every subscription',
    description:
      'Each subscription carries its next payment date and a reminder window (three days before renewal by default). Both are stored with the subscription and shown in the app — SubTracker does not send emails, push notifications or texts.',
  },
  {
    title: 'Analytics and a payment calendar',
    description:
      'Charts break spending down by category and over time, and a calendar view lays out which payments land on which day of the month, so you can see what is due next without being notified about it.',
  },
  {
    title: 'CSV export',
    description:
      'Export your whole subscription list to CSV from your profile at any time. The data is yours and it leaves in a format any spreadsheet can read.',
  },
  {
    title: 'Dark interface by default',
    description:
      'The app ships with a dark theme and works on phone screens as well as desktop.',
  },
  {
    title: 'Read-only MCP server for AI assistants',
    description:
      'An optional Model Context Protocol server lets an AI assistant you control read your own subscription list, spending stats, category breakdown and upcoming renewals. It is read-only and requires your personal token.',
  },
]

export type Step = { title: string; description: string }

export const HOW_IT_WORKS: Step[] = [
  {
    title: 'Create a free account',
    description:
      'Sign up with an email address or a Google account. No credit card, and the free plan does not expire.',
  },
  {
    title: 'Add your subscriptions',
    description:
      'Enter each recurring payment with its amount, billing cycle and next payment date. Checking your card statement and your App Store or Google Play subscription list is the fastest way to catch the ones you have forgotten.',
  },
  {
    title: 'Review the totals and act',
    description:
      'Look at the monthly and yearly totals, the category breakdown and the payment calendar, then cancel, downgrade or switch to annual billing on the ones that are not worth it. Mark cancellations in SubTracker so you keep a record.',
  },
]

export type Plan = {
  id: string
  name: string
  price: string
  period: string
  /** Numeric price for JSON-LD, or null to leave the plan out of structured data. */
  schemaPrice: string | null
  /** Billing period for JSON-LD offers (ISO 8601 duration), when applicable. */
  schemaPeriod?: 'P1M' | 'P1Y' | null
  summary: string
  features: string[]
  /**
   * 'available' = you can be on this plan today. 'planned' = the price is
   * published but nothing in the app can put an account on it, so it must not
   * be described as purchasable (and must stay out of structured data).
   */
  status: 'available' | 'planned'
}

/**
 * Prices as published on the site. Free plan: src/components/pricing-section.tsx
 * and the home page. Premium prices: src/app/payment/page.tsx.
 *
 * Only the free plan is marked 'available'. The Premium tiers are 'planned':
 * src/lib/feature-gates.ts always reports the signed-in user as free, there is
 * no Stripe webhook route to grant an entitlement, and src/app/payment/success
 * only simulates processing. Until paying actually unlocks something, Premium
 * is a published price list and nothing more — which is why every Premium plan
 * has schemaPrice: null and so never becomes an InStock Offer in JSON-LD.
 */
export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'per month, forever',
    schemaPrice: '0',
    schemaPeriod: 'P1M',
    status: 'available',
    summary:
      'The plan every account starts on, and currently the only plan you can be on. No credit card, no subscription limit, no trial clock.',
    features: [
      'Unlimited subscriptions',
      'Monthly and yearly cost totals',
      '12 built-in categories',
      'Next payment date and reminder window on every subscription',
      'Trial, cancellation and expiry status badges',
      'Analytics charts and payment calendar',
      'CSV export of your data',
      'Dark interface',
    ],
  },
  {
    id: 'premium-monthly',
    name: 'Premium, monthly',
    price: '$8',
    period: 'per month',
    schemaPrice: null,
    schemaPeriod: 'P1M',
    status: 'planned',
    summary:
      'The published month-to-month price. Not available yet — see the note above; there is currently no way to move an account onto Premium.',
    features: [
      'Everything in Free',
      'Planned: custom categories and subcategories',
      'Planned: advanced analytics',
      'Planned: cost projections',
      'Planned: usage tracking and the Smart Insights screen',
      'Planned: priority support',
    ],
  },
  {
    id: 'premium-annual',
    name: 'Premium, annual',
    price: '$60',
    period: 'per year (works out to $5 per month)',
    schemaPrice: null,
    schemaPeriod: 'P1Y',
    status: 'planned',
    summary:
      'The same planned Premium feature set billed once a year instead of monthly. Not available yet.',
    features: ['Everything in Premium, monthly', 'Billed once a year'],
  },
  {
    id: 'premium-lifetime',
    name: 'Premium, lifetime',
    price: '$250',
    period: 'one-time payment',
    schemaPrice: null,
    schemaPeriod: null,
    status: 'planned',
    summary: 'A single payment instead of a recurring one. Not available yet.',
    features: ['Everything in Premium', 'No recurring charge'],
  },
]

/**
 * Honest caveat that belongs anywhere we describe the paid tiers. Every account
 * is created on the free tier (see src/hooks/use-user-profile.ts) and nothing in
 * the app moves it off, so the free tier is the whole product today.
 */
export const PRICING_CAVEAT =
  'SubTracker is free today, and the free plan is the only plan you can actually be on. Every account is created on it, and nothing in the app upgrades an account, so the Premium prices below are a published plan rather than something you can buy. The features marked Premium — custom categories, subcategories, advanced analytics, cost projections, usage tracking and the Smart Insights screen — are not available to anyone yet. Everything else described on this site works on the free plan.'

export const ENTERPRISE_NOTE =
  'A Teams plan is listed at $200 per month per organisation and is arranged by getting in touch. Multi-user team accounts are not yet available in the app, so treat that tier — like Premium — as a waiting list rather than something you can switch on today.'

/** Things SubTracker deliberately does not do. Useful for answer engines and honest comparisons. */
export const LIMITATIONS: string[] = [
  'No bank or card connection, so subscriptions are not detected automatically — you add them yourself.',
  'No cancelling or bill negotiation on your behalf. SubTracker shows you what to cancel and links out; you do the cancelling.',
  'No native iOS or Android app. It is a web app that works in a mobile browser.',
  'Not a budgeting tool. It covers recurring payments, not your whole income and spending.',
  'No notifications of any kind. You set a reminder window and a next payment date on each subscription and SubTracker shows them in the app and on the payment calendar, but it does not email, push or text you, and it does not watch for price increases.',
  'No Premium accounts yet. The Premium prices are published and the app shows Premium locks, but nothing upgrades an account, so custom categories, subcategories, advanced analytics, cost projections, usage tracking and the Smart Insights screen are unavailable to everyone.',
  'Email and screenshot import are shown in the interface as Premium features and are not available yet.',
  'No one-click account deletion. You can export everything to CSV and you can reset the account, which deletes every subscription in it, but removing the sign-in itself is not something the app does yet.',
]

export const PRIVACY_FACTS: string[] = [
  'SubTracker never asks for bank or card credentials, because it does not connect to financial accounts.',
  'Your subscription list is data you typed in. You can export all of it to CSV from your profile page, and the same page can reset the account, which deletes every subscription in it. Removing the sign-in itself is not yet automated — ask and it is done by hand.',
  'Payments for Premium are handled by Stripe; card details go to Stripe, not to SubTracker.',
  'Product analytics (PostHog and Vercel Analytics) are used to count page views and feature use. They are optional in the codebase and carry no subscription amounts.',
]
