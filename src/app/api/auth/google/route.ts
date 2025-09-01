import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt_decode from 'jwt-decode'

interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string // Google's unique user ID
}

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json()
    
    if (!credential) {
      return NextResponse.json({ error: 'No credential provided' }, { status: 400 })
    }

    // Decode the Google JWT token
    const googleUser = jwt_decode<GoogleUser>(credential)
    
    // Check if user exists in Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', googleUser.email)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user:', fetchError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // If user doesn't exist, create them
    if (!existingUser) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: googleUser.sub,
          email: googleUser.email,
          tier: 'free',
          created_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('Error creating user:', insertError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    }

    // Sign in the user with Supabase using their email
    // We'll use a service role key to create a custom session
    const { data: { user }, error: signInError } = await supabase.auth.admin.createUser({
      email: googleUser.email,
      email_confirm: true,
      user_metadata: {
        name: googleUser.name,
        avatar_url: googleUser.picture,
        provider: 'google'
      }
    })

    if (signInError && signInError.message !== 'User already registered') {
      console.error('Error signing in:', signInError)
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
    }

    // Generate a session for the user
    const { data: session, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: googleUser.email,
    })

    if (sessionError) {
      console.error('Error generating session:', sessionError)
      return NextResponse.json({ error: 'Session creation failed' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      user: googleUser,
      message: 'Authentication successful'
    })
  } catch (error) {
    console.error('Google auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}