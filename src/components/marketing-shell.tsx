import Link from 'next/link'
import { MarketingFooter } from '@/components/marketing-footer'
import { MarketingHeader } from '@/components/marketing-header'

/**
 * Page shell shared by the public marketing pages: the site background, the
 * crawlable header and footer, and an optional visible breadcrumb trail.
 * Server-rendered throughout, so the full text of each page is in the raw HTML.
 */
export function MarketingShell({
  breadcrumb,
  children,
}: {
  breadcrumb?: { name: string; path: string }[]
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 gradient-mesh" aria-hidden="true" />
      <MarketingHeader />

      <main className="relative pt-28 md:pt-32 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumb.map((crumb, index) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {index === breadcrumb.length - 1 ? (
                      <span className="text-gray-400">{crumb.name}</span>
                    ) : (
                      <Link href={crumb.path} className="hover:text-white transition-colors">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {children}
        </div>
      </main>

      <div className="relative">
        <MarketingFooter />
      </div>
    </div>
  )
}
