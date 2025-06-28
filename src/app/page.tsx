'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/mock-auth'

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [user, isLoading, router])
  
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="animate-pulse text-white">Loading...</div>
    </div>
  )
}