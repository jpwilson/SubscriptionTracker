import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/supabase-auth-provider'

export interface UserProfile {
  id: string
  email: string
  tier: 'free' | 'premium'
  created_at?: string
  updated_at?: string
}

export function useUserProfile() {
  const { user } = useAuth()
  
  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      if (!user) return null
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) {
        // If user doesn't exist in users table, create with default values
        if (error.code === 'PGRST116') {
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              tier: 'free',
            })
            .select()
            .single()
          
          if (insertError) throw insertError
          return newUser
        }
        throw error
      }
      
      return data
    },
    enabled: !!user,
  })
}