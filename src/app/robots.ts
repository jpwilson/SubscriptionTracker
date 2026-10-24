import type { MetadataRoute } from 'next'
import { SITE_URL, absoluteUrl } from '@/lib/site'

/**
 * Private areas only. Everything public — including every marketing page — is
 * crawlable by everyone, and the AI crawlers get explicit Allow groups so there
 * is no ambiguity about whether they may read and cite the site.
 */
const DISALLOW = [
  '/api/',
  '/dashboard',
  '/subscriptions',
  '/analytics',
  '/insights',
  '/profile',
  '/payment',
  '/auth/',
  '/test',
]

const ALLOW_ALL_BOTS = [
  // Answer engines that retrieve pages to cite them
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Googlebot',
  'bingbot',
  'Applebot',
  'DuckAssistBot',
  // Crawlers that also feed model training. Allowing them helps the models
  // know the brand exists; this is a business choice, not a requirement.
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...ALLOW_ALL_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
