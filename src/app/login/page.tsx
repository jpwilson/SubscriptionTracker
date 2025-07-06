'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, Sparkles, TrendingUp, Bell, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/mock-auth'
import { PricingSection } from '@/components/pricing-section'
import Link from 'next/link'

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
    <div className="min-h-screen bg-background relative">
      {/* Modern animated background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-glow" />
      </div>
      
      {/* SubTracker Logo */}
      <Link href="/" className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold text-gradient">SubTracker</span>
        </div>
      </Link>

      {/* Login Section */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md w-full"
        >
        <div className="neu-card rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative inline-flex items-center justify-center w-20 h-20 mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-70 animate-glow" />
              <div className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome to SubTracker</h1>
            <p className="text-muted-foreground">Your intelligent subscription manager</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3 neu-card rounded-xl border border-purple-500/20">
                <p className="text-purple-400 text-xs font-semibold mb-1">Free Account</p>
                <p className="text-purple-300 text-xs">demo@subtracker.app</p>
                <p className="text-purple-300 text-xs">demo123</p>
              </div>
              <div className="p-3 neu-card rounded-xl border border-pink-500/20">
                <p className="text-pink-400 text-xs font-semibold mb-1">Premium Account</p>
                <p className="text-pink-300 text-xs">pro@subtracker.app</p>
                <p className="text-pink-300 text-xs">pro123</p>
              </div>
            </div>
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
                  className="w-full px-4 py-3 pl-10 neu-card rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  placeholder="demo@subtracker.app"
                  required
                />
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 neu-card rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  placeholder="demo123"
                  required
                />
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
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
              className="w-full relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  isSignUp ? 'Sign Up (Disabled)' : 'Sign In'
                )}
              </span>
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: <BarChart3 />, text: "Track Costs", href: "/#features" },
            { icon: <Bell />, text: "Get Reminders", href: "/#features" },
            { icon: <Sparkles />, text: "Smart Insights", href: "/#features" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link href={feature.href} className="block text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 neu-card rounded-xl mb-3 text-purple-400 group-hover:text-purple-300 transition-all duration-300">
                  {feature.icon}
                </div>
                <p className="text-sm text-muted-foreground font-medium">{feature.text}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
      
      {/* Pricing Section */}
      <div className="relative">
        <PricingSection />
      </div>
    </div>
  )
}