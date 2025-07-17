import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function getSupabaseUser(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Get the access token from the Authorization header
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'No authorization header' }
  }

  const token = authHeader.replace('Bearer ', '')
  
  // Get the user from the token
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  return { user, error }
}