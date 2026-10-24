import Link from 'next/link'
import { COMPARE_NAV, GUIDE_NAV, LAST_UPDATED, PRIMARY_NAV, SITE_NAME } from '@/lib/site'

/**
 * Footer for the public marketing pages. Links to every public page so each one
 * is reachable from every other one, with descriptive anchor text.
 */
export function MarketingFooter() {
  return (
    <footer className="relative border-t border-white/10 mt-20 px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-bold text-gradient">{SITE_NAME}</span>
            <p className="mt-3 text-sm text-gray-400 max-w-xs">
              A free web app for tracking subscriptions. Add your recurring payments once and see
              what they cost per month and per year.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white mb-3">Product</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  What SubTracker is
                </Link>
              </li>
              {PRIMARY_NAV.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="hover:text-white transition-colors">
                    {page.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign in or create an account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white mb-3">Compare</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {COMPARE_NAV.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="hover:text-white transition-colors">
                    {page.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/alternatives" className="hover:text-white transition-colors">
                  Best subscription tracker apps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white mb-3">Guides</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {GUIDE_NAV.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="hover:text-white transition-colors">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-2 justify-between">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. Subscription tracking without a bank
            connection.
          </span>
          <span>Site content last reviewed {LAST_UPDATED}.</span>
        </div>
      </div>
    </footer>
  )
}
