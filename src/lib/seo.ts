import type { Metadata } from 'next'
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './site'
import { FEATURES, PLANS, WHAT_IT_IS } from '@/content/product'
import type { FaqItem } from '@/content/faq'

/**
 * Per-page metadata: unique title and description, absolute self-referencing
 * canonical on the production host, Open Graph and Twitter card tags.
 */
export function buildMetadata(opts: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
}): Metadata {
  const url = absoluteUrl(opts.path)
  return {
    // Absolute so the page title is exactly what we wrote, with no template suffix
    // duplicating the brand name that most of these titles already contain.
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: opts.type ?? 'website',
      images: [
        {
          url: absoluteUrl('/og-image.png'),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — subscription tracker`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [absoluteUrl('/og-image.png')],
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/favicon.svg'),
    description:
      'SubTracker builds a free web app for tracking subscriptions and recurring payments.',
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

/**
 * WebApplication schema. Offers come from PLANS, which carry the prices that
 * are actually published on the site and charged by Stripe checkout. No
 * aggregateRating: SubTracker has no published reviews to aggregate.
 */
export function webApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/#webapp`,
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: 'FinanceApplication',
    applicationSubCategory: 'Subscription tracker',
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    description: WHAT_IT_IS,
    isAccessibleForFree: true,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
    featureList: FEATURES.map((f) => f.title),
    offers: PLANS.filter((p) => p.schemaPrice !== null).map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.schemaPrice,
      priceCurrency: 'USD',
      description: plan.summary,
      url: absoluteUrl('/pricing'),
      availability: 'https://schema.org/InStock',
    })),
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl('/faq')}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function articleSchema(opts: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(opts.path) },
    url: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }
}

export function itemListSchema(opts: {
  name: string
  description: string
  path: string
  items: { name: string; url: string; description: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    itemListElement: opts.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : absoluteUrl(item.url),
      description: item.description,
    })),
  }
}
