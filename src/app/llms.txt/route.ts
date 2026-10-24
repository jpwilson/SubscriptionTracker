import { buildLlmsTxt } from '@/lib/llms'

/** Served as a real text/plain file at /llms.txt, never the app shell. */
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
