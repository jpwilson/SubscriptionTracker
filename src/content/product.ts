/**
 * Facts about the product, written once and reused by the marketing pages,
 * the JSON-LD helpers, /llms.txt and /llms-full.txt.
 *
 * Everything in this file must be verifiable from the app itself. Do not add
 * user counts, testimonials, ratings, awards or savings claims here.
 */

export const WHAT_IT_IS =
  'SubTracker is a free web app for tracking subscriptions. You add each recurring payment once — name, amount, billing cycle, category and next payment date — and SubTracker shows what you are spending per month and per year, what is due next, and which subscriptions you appear to have stopped using.'

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
      'New accounts get Entertainment, AI Tools, SaaS Products, Finance, Health & Fitness, Education, Shopping, News & Media, Auto & Transport, Housing, Utilities and Other. Creating your own categories is a Premium feature.',
  },
  {
    title: 'Status badges for trials and cancellations',
    description:
      'Subscriptions are marked active, trial, trial ending soon, unsubscribed, service ending, paused or expired, so you can see at a glance what is about to charge you and what you have already cancelled.',
  },
  {
    title: 'Payment reminders',
    description:
      'Each subscription has a reminder window (three days before renewal by default) and a next payment date, so trials and renewals do not arrive unannounced.',
  },
  {
    title: 'Analytics and a payment calendar',
    description:
      'Charts break spending down by category and over time, and a calendar view lays out which payments land on which day of the month.',
  },
  {
    title: 'Smart insights',
    description:
      'SubTracker flags subscriptions you have not marked as used in a while, trials that are about to end, and services priced well above the average of your other subscriptions. The insights are calculated from the data you entered, not from your bank feed.',
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
      'Look at the monthly and yearly totals, the category breakdown and the insights, then cancel, downgrade or switch to annual billing on the ones that are not worth it. Mark cancellations in SubTracker so you keep a record.',
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
}

/**
 * Prices as published on the site. Free plan: src/components/pricing-section.tsx
 * and the home page. Premium prices: src/app/payment/page.tsx, which is what the
 * Stripe checkout actually charges.
 */
export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'per month, forever',
    schemaPrice: '0',
    schemaPeriod: 'P1M',
    summary:
      'The plan every account starts on. No credit card, no subscription limit, no trial clock.',
    features: [
      'Unlimited subscriptions',
      'Monthly and yearly cost totals',
      '12 built-in categories',
      'Payment and trial reminders',
      'Analytics charts and payment calendar',
      'Smart insights',
      'CSV export of your data',
      'Dark interface',
    ],
  },
  {
    id: 'premium-monthly',
    name: 'Premium, monthly',
    price: '$8',
    period: 'per month',
    schemaPrice: '8.00',
    schemaPeriod: 'P1M',
    summary: 'Month-to-month billing, cancel whenever you like.',
    features: [
      'Everything in Free',
      'Custom categories and subcategories',
      'Advanced analytics',
      'Cost projections',
      'Usage tracking',
      'Priority support',
    ],
  },
  {
    id: 'premium-annual',
    name: 'Premium, annual',
    price: '$60',
    period: 'per year (works out to $5 per month)',
    schemaPrice: '60.00',
    schemaPeriod: 'P1Y',
    summary: 'The same Premium features billed once a year instead of monthly.',
    features: ['Everything in Premium, monthly', 'Billed once a year'],
  },
  {
    id: 'premium-lifetime',
    name: 'Premium, lifetime',
    price: '$250',
    period: 'one-time payment',
    schemaPrice: '250.00',
    schemaPeriod: null,
    summary: 'A single payment instead of a recurring one.',
    features: ['Everything in Premium', 'No recurring charge'],
  },
]

/**
 * Honest caveat that belongs anywhere we describe the paid tiers. Every account
 * is created on the free tier (see src/hooks/use-user-profile.ts), and the free
 * tier is what the rest of this site describes.
 */
export const PRICING_CAVEAT =
  'SubTracker is free to use today. Every new account is created on the free plan, and everything described on this site is available there unless it is explicitly marked as a Premium feature.'

export const ENTERPRISE_NOTE =
  'A Teams plan is listed at $200 per month per organisation and is arranged by getting in touch. Multi-user team accounts are not yet available in the app, so treat that tier as a waiting list rather than something you can switch on today.'

/** Things SubTracker deliberately does not do. Useful for answer engines and honest comparisons. */
export const LIMITATIONS: string[] = [
  'No bank or card connection, so subscriptions are not detected automatically — you add them yourself.',
  'No cancelling or bill negotiation on your behalf. SubTracker shows you what to cancel and links out; you do the cancelling.',
  'No native iOS or Android app. It is a web app that works in a mobile browser.',
  'Not a budgeting tool. It covers recurring payments, not your whole income and spending.',
  'Email and screenshot import are shown in the interface as Premium features and are not available yet.',
]

export const PRIVACY_FACTS: string[] = [
  'SubTracker never asks for bank or card credentials, because it does not connect to financial accounts.',
  'Your subscription list is data you typed in, and you can export all of it to CSV or delete your account.',
  'Payments for Premium are handled by Stripe; card details go to Stripe, not to SubTracker.',
  'Product analytics (PostHog and Vercel Analytics) are used to count page views and feature use. They are optional in the codebase and carry no subscription amounts.',
]
