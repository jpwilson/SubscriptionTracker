/**
 * Competitor facts used by the /vs-* pages, /alternatives and /llms-full.txt.
 *
 * Rules for this file:
 *  - Only general, well-known facts taken from the competitor's own website or
 *    App Store listing, with the date they were checked.
 *  - If a detail could not be confirmed, it is left out rather than guessed.
 *  - Every competitor gets a fair "where they are stronger" section.
 */

export type ComparisonRow = { label: string; subtracker: string; competitor: string }

export type Comparison = {
  /** URL path, e.g. "/vs-rocket-money". */
  path: string
  /** Competitor display name. */
  name: string
  /** Link to the competitor's own site or store listing. */
  url: string
  /** Label for the link. */
  urlLabel: string
  title: string
  description: string
  h1: string
  /** First paragraph: what this comparison is and who should read it. */
  intro: string
  /** What the competitor is, in their own general terms. */
  competitorSummary: string
  rows: ComparisonRow[]
  /** Honest "choose SubTracker if" / "choose them if" guidance. */
  chooseSubtracker: string[]
  chooseCompetitor: string[]
  /** Where the competitor is genuinely stronger. */
  competitorStrengths: string[]
  /** Source note shown on the page. */
  sourceNote: string
}

export const COMPARISONS: Comparison[] = [
  {
    path: '/vs-rocket-money',
    name: 'Rocket Money',
    url: 'https://www.rocketmoney.com/',
    urlLabel: 'rocketmoney.com',
    title: 'SubTracker vs Rocket Money: Manual Tracking vs Bank Sync',
    description:
      'An honest comparison of SubTracker and Rocket Money for tracking subscriptions: bank connection, cancellations, pricing and privacy, checked October 2026.',
    h1: 'SubTracker vs Rocket Money',
    intro:
      'Both apps exist to stop you paying for subscriptions you forgot about, but they take opposite routes. Rocket Money connects to your bank accounts and finds the recurring charges for you, then offers to cancel services and negotiate bills on your behalf. SubTracker is a free web app with no bank connection at all: you enter the subscriptions yourself and it does the arithmetic, the reminders and the category breakdown. This page is for someone deciding whether the automatic route is worth handing over bank access.',
    competitorSummary:
      'Rocket Money is a personal-finance app from Rocket Companies, and it is the product formerly known as Truebill — Truebill was renamed Rocket Money in 2022, so the two names refer to the same service. As of October 2026 its own site describes finding and tracking your subscriptions automatically, cancelling services for you, breaking down everyday spending, automated saving, and an AI assistant called Rowan, and states that it has more than 10 million members. It has mobile apps and a web app, is built around linking your financial accounts, and has a free tier plus a paid Premium tier (check their site for the current Premium price, which they set within a range).',
    rows: [
      {
        label: 'Finds subscriptions automatically',
        subtracker: 'No — you add each one yourself',
        competitor: 'Yes, by reading linked bank and card accounts',
      },
      {
        label: 'Needs your bank credentials',
        subtracker: 'No. There is no bank connection',
        competitor: 'Yes, account linking is how it works',
      },
      {
        label: 'Cancels on your behalf',
        subtracker: 'No. It links you to the service and tracks the cancellation',
        competitor: 'Yes, cancellation is a headline feature',
      },
      {
        label: 'Bill negotiation',
        subtracker: 'No',
        competitor: 'Yes, offered as a service',
      },
      {
        label: 'Free tier',
        subtracker: '$0/month, unlimited subscriptions, no card required',
        competitor: 'Yes, with paid Premium features above it',
      },
      {
        label: 'Paid plan',
        subtracker: '$8/month, $60/year or $250 once',
        competitor: 'Premium, priced on their site',
      },
      {
        label: 'Platforms',
        subtracker: 'Web app, works in a phone browser',
        competitor: 'iOS, Android and web',
      },
      {
        label: 'Scope',
        subtracker: 'Subscriptions only',
        competitor: 'Subscriptions plus budgeting, spending and savings',
      },
    ],
    chooseSubtracker: [
      'You do not want to give any app your online banking login.',
      'You already roughly know what you subscribe to and want one clear list and total.',
      'You want unlimited tracking without paying anything.',
      'You want to export your list and keep it, rather than have it live inside a bank feed.',
    ],
    chooseCompetitor: [
      'You have no idea what is charging your card and want software to go and find it.',
      'You would rather pay someone to sit through a cancellation phone queue for you.',
      'You want subscriptions handled inside a broader budgeting and savings app.',
    ],
    competitorStrengths: [
      'Automatic discovery is genuinely more thorough than memory — it catches charges you would never think to add.',
      'Cancellation-as-a-service and bill negotiation are things SubTracker does not attempt.',
      'It is a much larger, better-resourced product with native mobile apps and a long track record.',
    ],
    sourceNote:
      'Rocket Money details taken from rocketmoney.com in October 2026. Prices and features change; check their site before deciding.',
  },
  {
    path: '/vs-bobby',
    name: 'Bobby',
    url: 'https://apps.apple.com/us/app/bobby-track-subscriptions/id1059152023',
    urlLabel: 'Bobby on the App Store',
    title: 'SubTracker vs Bobby: Subscription Trackers Compared',
    description:
      'SubTracker and Bobby both track subscriptions you enter by hand. Compare platforms, categories, analytics and export, checked October 2026.',
    h1: 'SubTracker vs Bobby',
    intro:
      'SubTracker and Bobby are the two sides of the same idea: a list of your subscriptions that you maintain yourself, with no bank connection. The practical difference is where it runs. Bobby is an iPhone app; SubTracker is a web app you open in any browser. This page is for someone choosing between a polished iOS-only tracker and something they can also use on a laptop.',
    competitorSummary:
      'Bobby is a subscription tracker for iOS made by the design studio Yummygum. According to its App Store listing in October 2026 it is a free download, it lets you pick from hundreds of preset services or create custom ones, it shows an overview of all your subscriptions and upcoming bills with a monthly total, and it notifies you when a bill is due. It requires iOS 14 or later and there is no Android or browser version.',
    rows: [
      {
        label: 'Where it runs',
        subtracker: 'Any browser — desktop, tablet or phone',
        competitor: 'iPhone and iPad (iOS 14+)',
      },
      {
        label: 'Android',
        subtracker: 'Yes, via the mobile browser',
        competitor: 'No',
      },
      {
        label: 'Desktop use',
        subtracker: 'Yes, it is a web app',
        competitor: 'No',
      },
      {
        label: 'How subscriptions get in',
        subtracker: 'You type them in',
        competitor: 'You type them in, with presets for common services',
      },
      {
        label: 'Bank connection',
        subtracker: 'None',
        competitor: 'None',
      },
      {
        label: 'Cost',
        subtracker: 'Free plan with unlimited subscriptions; Premium from $5/month billed annually',
        competitor: 'Free to download; check the listing for in-app purchases',
      },
      {
        label: 'Reminders',
        subtracker: 'Per-subscription reminder window and next payment date',
        competitor: 'Notifies you when a bill is due',
      },
      {
        label: 'Analytics',
        subtracker: 'Category charts, spending over time, payment calendar, insights',
        competitor: 'Overview of subscriptions and upcoming bills',
      },
      {
        label: 'Data export',
        subtracker: 'CSV export from your profile',
        competitor: 'Not documented on the App Store listing',
      },
    ],
    chooseSubtracker: [
      'You want the same list on your laptop and your phone.',
      'You are on Android, or you share the list with someone who is.',
      'You want charts, a payment calendar and CSV export rather than just a list.',
    ],
    chooseCompetitor: [
      'You live entirely on an iPhone and want a native app with native notifications.',
      'You like the preset service catalogue and want adding a subscription to take two taps.',
      'You would rather have no account at all than one more login.',
    ],
    competitorStrengths: [
      'A native iOS app feels faster than a web app and gets proper system notifications and widgets.',
      'The preset catalogue of common services makes data entry quicker than typing names in.',
      'Bobby has been around for years and is a well-regarded, carefully designed app.',
    ],
    sourceNote:
      'Bobby details taken from its App Store listing in October 2026. Check the listing for the current feature set and any in-app purchases.',
  },
  {
    path: '/vs-ynab',
    name: 'YNAB',
    url: 'https://www.ynab.com/',
    urlLabel: 'ynab.com',
    title: 'SubTracker vs YNAB: Subscription Tracker vs Budgeting App',
    description:
      'SubTracker tracks recurring payments; YNAB is a full zero-based budgeting system. Compare scope, price and effort, checked October 2026.',
    h1: 'SubTracker vs YNAB',
    intro:
      'These two are not really competitors, and anyone comparing them should know that before they pay for either. YNAB (You Need A Budget) is a complete budgeting system for every dollar you earn and spend. SubTracker only deals with recurring payments. If the problem you are trying to solve is "I have no idea what my subscriptions add up to", SubTracker is the smaller, free answer; if it is "I have no idea where my money goes", YNAB is the bigger, paid one.',
    competitorSummary:
      'YNAB is a budgeting app built around the zero-based budgeting method: you give every dollar a job before you spend it. As published on ynab.com in October 2026, it costs $14.99 per month or $109 per year (which they present as $9.08 per month), with a 34-day free trial that does not ask for a credit card. It connects to your bank accounts to import transactions, runs on iOS, Android and the web, and has a large body of teaching material and live workshops behind the method.',
    rows: [
      {
        label: 'What it is for',
        subtracker: 'Tracking recurring subscriptions',
        competitor: 'Budgeting your entire income and spending',
      },
      {
        label: 'Free option',
        subtracker: 'Yes — free plan, unlimited subscriptions, no card',
        competitor: 'No permanent free plan; 34-day free trial',
      },
      {
        label: 'Price',
        subtracker: '$0, or Premium at $8/month, $60/year or $250 once',
        competitor: '$14.99/month or $109/year',
      },
      {
        label: 'Bank connection',
        subtracker: 'None',
        competitor: 'Yes, transactions import from linked accounts',
      },
      {
        label: 'Effort to keep up to date',
        subtracker: 'Minutes a month — only changes to subscriptions',
        competitor: 'Regular, ongoing — the method depends on it',
      },
      {
        label: 'Subscription-specific features',
        subtracker: 'Trial badges, renewal reminders, unused-subscription insights, payment calendar',
        competitor: 'Recurring spending appears as budget categories and scheduled transactions',
      },
      {
        label: 'Platforms',
        subtracker: 'Web app',
        competitor: 'iOS, Android and web',
      },
    ],
    chooseSubtracker: [
      'Subscriptions are the specific problem and you do not want to budget your whole life to fix it.',
      'You want to spend nothing.',
      'You want to see the subscription total and the renewal dates in one screen.',
    ],
    chooseCompetitor: [
      'You want control of all your spending, not just the recurring part.',
      'You want a method and a community to follow, not just a list.',
      'You are happy to pay for it and to put in the ongoing effort it asks for.',
    ],
    competitorStrengths: [
      'YNAB solves a much bigger problem and solves it well, with a method that has a long record behind it.',
      'Bank imports mean recurring charges show up whether or not you remembered them.',
      'Native mobile apps, shared household access and extensive teaching material.',
    ],
    sourceNote:
      'YNAB prices and features taken from ynab.com in October 2026. Check their pricing page before subscribing.',
  },
]

export function getComparison(path: string): Comparison {
  const match = COMPARISONS.find((c) => c.path === path)
  if (!match) throw new Error(`Unknown comparison: ${path}`)
  return match
}

/** Other tools covered on /alternatives, where we are not writing a full comparison page. */
export type AlternativeEntry = {
  name: string
  url: string
  urlLabel: string
  bestFor: string
  summary: string
  watchOut: string
  comparisonPath?: string
}

export const ALTERNATIVES: AlternativeEntry[] = [
  {
    name: 'SubTracker',
    url: '/',
    urlLabel: 'this site',
    bestFor: 'A free, unlimited, manual list of your subscriptions with no bank access',
    summary:
      'A web app where you enter each recurring payment and get monthly and yearly totals, category charts, a payment calendar, trial and renewal reminders and CSV export. The free plan has no subscription limit and no credit card requirement.',
    watchOut:
      'It will not find anything for you. If you cannot remember what you subscribe to, you have to go through your statements first. There is also no native mobile app.',
  },
  {
    name: 'Rocket Money',
    url: 'https://www.rocketmoney.com/',
    urlLabel: 'rocketmoney.com',
    bestFor: 'Finding charges you have completely forgotten, and getting someone else to cancel them',
    summary:
      'Formerly Truebill. Connects to your bank and card accounts, detects recurring charges automatically, and offers cancellation and bill negotiation as a service alongside budgeting and savings tools. Free tier plus paid Premium.',
    watchOut:
      'It needs access to your financial accounts, and the features most people want it for sit behind the paid tier.',
    comparisonPath: '/vs-rocket-money',
  },
  {
    name: 'Bobby',
    url: 'https://apps.apple.com/us/app/bobby-track-subscriptions/id1059152023',
    urlLabel: 'App Store listing',
    bestFor: 'iPhone owners who want a native, no-account subscription list',
    summary:
      'A long-standing iOS subscription tracker by Yummygum. Free to download, manual entry with presets for hundreds of common services, an overview of upcoming bills and notifications when one is due.',
    watchOut: 'iOS only — no Android app and no browser version, so there is nothing to open on a laptop.',
    comparisonPath: '/vs-bobby',
  },
  {
    name: 'YNAB',
    url: 'https://www.ynab.com/',
    urlLabel: 'ynab.com',
    bestFor: 'People who want to budget everything, not just subscriptions',
    summary:
      'A zero-based budgeting app with bank imports, apps on every platform and a well-known method behind it. $14.99/month or $109/year as published in October 2026, after a 34-day free trial.',
    watchOut:
      'There is no free plan, and it asks for real ongoing effort. It is overkill if subscriptions are your only problem.',
    comparisonPath: '/vs-ynab',
  },
  {
    name: 'Monarch Money',
    url: 'https://www.monarchmoney.com/',
    urlLabel: 'monarchmoney.com',
    bestFor: 'Households that want one paid, ad-free personal finance dashboard',
    summary:
      'A subscription-funded personal finance app covering accounts, budgets and goals, with recurring expenses as one part of a wider picture. Its pricing page in October 2026 offers a free first week and no permanently free tier; check the site for current plan prices.',
    watchOut:
      'You are paying for a full finance app. If you only want a subscription list, most of what you are paying for will go unused.',
  },
  {
    name: 'A spreadsheet',
    url: 'https://www.google.com/sheets/about/',
    urlLabel: 'Google Sheets',
    bestFor: 'People who want total control and do not mind maintaining it',
    summary:
      'Free, infinitely flexible, and genuinely fine for ten subscriptions. One row per subscription, a column for the monthly equivalent, and a SUM at the bottom.',
    watchOut:
      'Nothing reminds you about a trial ending, nothing normalises annual to monthly unless you write the formula, and in practice spreadsheets like this stop being updated after a few months.',
  },
]
