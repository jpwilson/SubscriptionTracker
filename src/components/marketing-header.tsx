import Link from 'next/link'
import { COMPARE_NAV, GUIDE_NAV, PRIMARY_NAV, SITE_NAME } from '@/lib/site'

/**
 * Header for the public marketing pages. Deliberately a server component with
 * plain links so every page link is present in the raw HTML for crawlers.
 */
export function MarketingHeader() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl neu-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="text-xl font-bold text-gradient">{SITE_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center gap-5 text-sm text-gray-300">
            {PRIMARY_NAV.map((page) => (
              <Link key={page.path} href={page.path} className="hover:text-white transition-colors">
                {page.label}
              </Link>
            ))}
            <Link href="/vs-rocket-money" className="hover:text-white transition-colors">
              Compare
            </Link>
            <Link href="/find-forgotten-subscriptions" className="hover:text-white transition-colors">
              Guides
            </Link>
          </div>

          <Link
            href="/login"
            className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          >
            Start free
          </Link>
        </div>
      </div>

      {/* Mobile: keep every link in the HTML rather than hiding it behind JS. */}
      <div className="md:hidden border-t border-white/10 overflow-x-auto">
        <div className="flex items-center gap-4 px-4 py-2 text-xs text-gray-400 whitespace-nowrap">
          {[...PRIMARY_NAV, ...COMPARE_NAV, ...GUIDE_NAV].map((page) => (
            <Link key={page.path} href={page.path} className="hover:text-white transition-colors">
              {page.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
