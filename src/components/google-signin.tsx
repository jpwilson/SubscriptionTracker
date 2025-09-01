'use client'

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'

// You'll need to get this from Google Cloud Console
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!

export function GoogleSignIn() {
  const router = useRouter()
  const { signInWithGoogle } = useAuth()

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Sign in with Supabase using the email
        // This creates a session that works with your existing auth flow
        router.push('/dashboard')
      } else {
        console.error('Authentication failed:', data.error)
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error)
    }
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.error('Google Login Failed')
          }}
          useOneTap
          theme="filled_black"
          size="large"
          width="100%"
          text="continue_with"
          shape="rectangular"
        />
      </div>
    </GoogleOAuthProvider>
  )
}