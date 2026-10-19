'use client'

import { Suspense } from 'react'
import { PostHogPageView } from '@/providers/posthog-provider'

export function PostHogPageViewWrapper() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
