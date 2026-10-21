/**
 * The visible FAQ on /faq. The same array feeds the FAQPage JSON-LD and
 * /llms-full.txt, so the structured data always mirrors the visible text.
 * Answers must be verifiable from the app or this repository.
 */
export type FaqItem = { question: string; answer: string }

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is SubTracker?',
    answer:
      'SubTracker is a free web app for tracking subscriptions. You add each recurring payment — the name, the amount, how often it bills, the category and the next payment date — and SubTracker turns that list into a monthly and yearly total, a payment calendar, category charts and status badges that flag trials about to end.',
  },
  {
    question: 'Is SubTracker free?',
    answer:
      'Yes, and at the moment free is the only option. The free plan costs $0 per month, does not expire and does not ask for a credit card. It includes unlimited subscriptions, 12 built-in categories, monthly and yearly totals, next payment dates, trial and cancellation badges, the analytics charts, the payment calendar and CSV export. A Premium plan is published with prices and would add custom categories, subcategories, cost projections, usage tracking and the Smart Insights screen, but nothing in the app can put an account on it yet, so no one has those features today.',
  },
  {
    question: 'How much does SubTracker Premium cost?',
    answer:
      'The prices published on the pricing page in October 2026 are $8 per month billed monthly, $60 per year (which works out to $5 per month), or $250 as a one-time lifetime payment. Those are planned prices: the app cannot currently move an account onto Premium, so there is no point paying for it yet and nothing on this site should be read as saying the Premium features are available. Use the free plan, which has no subscription limit.',
  },
  {
    question: 'Does SubTracker connect to my bank account?',
    answer:
      'No. SubTracker never asks for bank or card credentials and has no bank connection, so it cannot discover charges on its own. You add subscriptions by hand. The trade-off is deliberate: SubTracker only knows what you tell it, and it never sees your transactions.',
  },
  {
    question: 'Can SubTracker cancel subscriptions for me?',
    answer:
      'No. SubTracker shows you what you are paying for, and it stores the link to each service so you can get to the cancellation page quickly, but you do the cancelling yourself. Our guide to cancelling subscriptions walks through how to do it on iPhone, Android and the web.',
  },
  {
    question: 'How do I find subscriptions I have forgotten about?',
    answer:
      'Work through three places: the last three months of card and bank statements, your App Store subscriptions (Settings, your name, Subscriptions on iPhone) and your Google Play subscriptions, and your email inbox searched for words like "receipt", "your subscription" and "renews". Add each one you find to SubTracker so it stays visible from then on.',
  },
  {
    question: 'Is there an iPhone or Android app?',
    answer:
      'Not yet. SubTracker is a web app. It is built to work on a phone browser and you can add it to your home screen, but there is no native app in the App Store or on Google Play today.',
  },
  {
    question: 'Can I get my data out?',
    answer:
      'Yes. Your profile page exports the full subscription list to a CSV file that any spreadsheet can open. The same page has a Reset Account action that deletes every subscription in the account and keeps your settings. Deleting the sign-in itself is not yet a button in the app.',
  },
  {
    question: 'Can I delete my SubTracker account?',
    answer:
      'Not with a single button yet. Your profile page has a Reset Account action that deletes all the subscriptions in your account, and a CSV export so you can take the data with you first, but removing the login and profile record is not automated in the app today. Export, reset, and ask if you want the account itself removed.',
  },
  {
    question: 'Does SubTracker email me before a subscription renews?',
    answer:
      'No. SubTracker does not send email, push or text notifications, and it does not watch for price increases. Each subscription stores a next payment date and a reminder window (three days by default), and those show up in the app and on the payment calendar — but you have to open SubTracker to see them. If you want a nudge, put the renewal date in your own calendar as well.',
  },
  {
    question: 'How many subscriptions can I track on the free plan?',
    answer:
      'As many as you want. There is no cap on the free plan, which is unusual — several subscription trackers limit the free tier to a handful of entries and charge to unlock the rest.',
  },
  {
    question: 'What categories does SubTracker come with?',
    answer:
      'Twelve: Entertainment, AI Tools, SaaS Products, Finance, Health & Fitness, Education, Shopping, News & Media, Auto & Transport, Housing, Utilities and Other. Creating your own categories and subcategories is marked as a Premium feature, and because Premium cannot be activated yet, the twelve built-in categories are what every account has.',
  },
  {
    question: 'How does SubTracker handle free trials?',
    answer:
      'Mark a subscription as a trial and give it a trial end date. It then carries a TRIAL badge and switches to a "trial ending soon" warning inside the last seven days, and the trial end date shows up on the payment calendar. You have to open SubTracker to see it — nothing is emailed or pushed to you.',
  },
  {
    question: 'What happens when I cancel a subscription I am tracking?',
    answer:
      'Set its status to cancelled and keep the end date. SubTracker shows it as unsubscribed while you still have access, switches to "service ending" in the final seven days, and takes it out of your active monthly total so the figure stays accurate.',
  },
  {
    question: 'How is SubTracker different from Rocket Money?',
    answer:
      'Rocket Money connects to your bank accounts, finds recurring charges automatically and will cancel services and negotiate bills for you, as a paid service around a broader personal-finance app. SubTracker does none of that: it is a manual list with no bank connection, which makes it less automatic and more private, and it is free. See our Rocket Money comparison for the detail.',
  },
  {
    question: 'Can an AI assistant read my subscriptions?',
    answer:
      'Optionally, yes. SubTracker ships a read-only Model Context Protocol (MCP) server that an assistant you control can use to list your subscriptions, spending stats, category breakdown and upcoming renewals. It needs your personal token and cannot change anything.',
  },
  {
    question: 'Which currencies does SubTracker support?',
    answer:
      'You set a display currency in your profile preferences and amounts are formatted in it. SubTracker does not convert between currencies, so enter each subscription in the currency you chose.',
  },
]
