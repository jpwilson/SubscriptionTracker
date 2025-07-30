import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/providers/supabase-auth-provider'
import { supabase } from '@/lib/supabase'

export interface UserPreferences {
  id: string
  userId: string
  currency: string
  usageCheckFrequency: string
  notificationEmail: boolean
  notificationPush: boolean
  notificationSms: boolean
  theme: string
}

// Popular currencies for the selector
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/' },
]

export function useUserPreferences() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user) return null
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (error) {
        // If preferences don't exist, create default ones
        if (error.code === 'PGRST116') {
          const { data: newPrefs } = await supabase
            .from('user_preferences')
            .insert({
              user_id: user.id,
              currency: 'USD',
              usage_check_frequency: 'weekly',
              notification_email: true,
              notification_push: true,
              notification_sms: false,
              theme: 'system'
            })
            .select()
            .single()
          
          return newPrefs
        }
        throw error
      }
      
      return data
    },
    enabled: !!user,
  })
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  
  return useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      if (!user) throw new Error('No user')
      
      const { data, error } = await supabase
        .from('user_preferences')
        .update({
          currency: updates.currency,
          usage_check_frequency: updates.usageCheckFrequency,
          notification_email: updates.notificationEmail,
          notification_push: updates.notificationPush,
          notification_sms: updates.notificationSms,
          theme: updates.theme,
        })
        .eq('user_id', user.id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] })
    },
  })
}