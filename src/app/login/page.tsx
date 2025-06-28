'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, Sparkles, TrendingUp, Bell, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/mock-auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const router = useRouter()
  const { signIn, signUp } = useAuth()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setStep(1)

    try {
      if (isSignUp) {
        setStep(2)
        await signUp(email, password)
        setStep(3)
        setTimeout(() => router.push('/dashboard'), 500)
      } else {
        setStep(2)
        await signIn(email, password)
        setStep(3)
        setTimeout(() => router.push('/dashboard'), 500)
      }
    } catch (error: any) {
      setError(error.message)
      setStep(0)
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  const loginSteps = [
    { message: "Connecting to SubTracker...", icon: <TrendingUp className="w-5 h-5" /> },
    { message: "Verifying credentials...", icon: <Lock className="w-5 h-5" /> },
    { message: "Loading your subscriptions...", icon: <Sparkles className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full"
      >
        <div className="glass-dark rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to SubTracker</h1>
            <p className="text-gray-300">Your intelligent subscription manager</p>
            <p className="text-purple-400 text-sm mt-2">(Demo Mode - No real auth required)</p>
          </div>

          {isLoading && step > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-purple-600/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                <span className="text-white">{loginSteps[step - 1].message}</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="demo@example.com"
                  required
                />
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="any password works"
                  required
                />
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isSignUp ? 'Create Demo Account' : 'Sign In to Demo'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: <BarChart3 />, text: "Track Costs" },
            { icon: <Bell />, text: "Get Reminders" },
            { icon: <Sparkles />, text: "Smart Insights" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-2 text-purple-400">
                {feature.icon}
              </div>
              <p className="text-sm text-gray-300">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}