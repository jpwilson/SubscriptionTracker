import type { MetadataRoute } from 'next'
import { LAST_UPDATED_ISO, PUBLIC_PAGES, absoluteUrl } from '@/lib/site'

/**
 * Every public canonical URL, generated from PUBLIC_PAGES so a new marketing
 * page only has to be registered in one place. lastmod uses the date the
 * content was last reviewed rather than the build time, so it stays honest.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED_ISO)

  return PUBLIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
