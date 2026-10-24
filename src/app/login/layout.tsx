import { buildMetadata } from '@/lib/seo'

/**
 * The login page is a client component, so its metadata lives here. It stays
 * crawlable (nothing secret on it) and carries a self-referencing canonical.
 */
export const metadata = buildMetadata({
  title: 'Sign in to SubTracker',
  description:
    'Sign in to SubTracker or create a free account to start tracking your subscriptions. The free plan has no subscription limit and does not ask for a card.',
  path: '/login',
})

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
