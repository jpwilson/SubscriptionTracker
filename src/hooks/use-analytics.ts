import { useQuery } from '@tanstack/react-query'
import { getUserId } from '@/lib/auth-utils'

export interface AnalyticsData {
  timeSeries: Array<{
    period: string
    amount: number
  }>
  categories: Array<{
    category: string
    amount: number
  }>
  summary: {
    totalMonthly: number
    totalYearly: number
    activeSubscriptions: number
  }
}

export function useAnalytics(period: string = 'monthly', timeScale: string = '6months') {
  return useQuery<AnalyticsData>({
    queryKey: ['analytics', period, timeScale],
    queryFn: async () => {
      const response = await fetch(`/api/subscriptions/analytics?period=${period}&timeScale=${timeScale}`, {
        headers: {
          'x-user-id': getUserId(),
        },
      })
      if (!response.ok) throw new Error('Failed to fetch analytics')
      return response.json()
    },
  })
}