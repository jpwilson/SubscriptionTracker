import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export interface AnalyticsData {
  timeSeries: Array<{
    period: string
    amount: number
    categoryData?: { [category: string]: number }
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

export function useAnalytics(period: string = 'monthly', timeScale: string = '6months', categories: string[] = []) {
  return useQuery<AnalyticsData>({
    queryKey: ['analytics', period, timeScale, categories],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      const params = new URLSearchParams({
        period,
        timeScale,
      })
      
      if (categories.length > 0) {
        params.append('categories', categories.join(','))
      }
      
      const response = await fetch(`/api/subscriptions/analytics?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch analytics')
      return response.json()
    },
  })
}