'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

declare global {
  interface Window {
    google: any
    handleCredentialResponse: (response: any) => void
  }
}

export function GoogleSignInButton() {
  const router = useRouter()

  useEffect(() => {
    const handleCredentialResponse = async (response: any) => {
      try {
        // Decode the JWT token from Google
        const base64Url = response.credential.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join('')
        )
        const payload = JSON.parse(jsonPayload)

        // Sign in with Supabase using the Google user's email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: payload.email,
          password: `google_${payload.sub}`, // Use Google's user ID as password
        })

        if (error) {
          // User doesn't exist, create them
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: payload.email,
            password: `google_${payload.sub}`,
            options: {
              data: {
                name: payload.name,
                avatar_url: payload.picture,
                provider: 'google',
              }
            }
          })

          if (signUpError) {
            console.error('Error creating user:', signUpError)
            return
          }
        }

        // Redirect to dashboard
        router.push('/dashboard')
      } catch (error) {
        console.error('Error handling Google sign-in:', error)
      }
    }

    // Make the function available globally for Google's callback
    window.handleCredentialResponse = handleCredentialResponse

    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      // Render the button
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        {
          theme: 'filled_black',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          logo_alignment: 'left',
          width: '100%',
        }
      )
    }
  }, [router])

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="beforeInteractive"
      />
      <div id="googleSignInDiv" className="w-full" />
    </>
  )
}