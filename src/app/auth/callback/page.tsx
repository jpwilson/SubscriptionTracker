'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have a session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          router.push('/login')
          return
        }

        if (session) {
          // User is authenticated, redirect to dashboard
          router.push('/dashboard')
        } else {
          // No session, check if we need to exchange a code
          const searchParams = new URLSearchParams(window.location.search)
          const code = searchParams.get('code')
          
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
            if (exchangeError) {
              console.error('Error exchanging code:', exchangeError)
              router.push('/login')
            } else {
              router.push('/dashboard')
            }
          } else {
            // No code and no session, redirect to login
            router.push('/login')
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/login')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <p className="text-gradient text-lg font-medium">Completing sign in...</p>
      </div>
    </div>
  )
}