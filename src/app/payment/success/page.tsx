'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/supabase-auth-provider'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    let interval: any

    // Dynamically import confetti to avoid SSR issues
    import('canvas-confetti').then((confettiModule) => {
      const confetti = confettiModule.default
      
      interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
        })
      }, 250)
    })

    // Simulate loading while we process the payment
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-4" />
            <h1 className="text-2xl font-bold text-white">Processing your upgrade...</h1>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative inline-flex items-center justify-center w-24 h-24 mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-glow" />
              <div className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gradient mb-4"
            >
              Welcome to Premium!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Your account has been upgraded successfully. Get ready to save money!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="neu-card rounded-2xl p-6 border border-white/10 mb-8"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Your Premium Benefits
              </h2>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">Unlimited subscription tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">Custom categories to organize better</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">Advanced analytics & insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">Price change alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">Priority support</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Button
                onClick={() => router.push('/dashboard')}
                className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </Button>

              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{' '}
                <a href="mailto:support@subtracker.app" className="text-purple-400 hover:text-purple-300">
                  support@subtracker.app
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}