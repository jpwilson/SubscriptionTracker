'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, Sparkles, TrendingUp, Bell, BarChart3, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { PricingSection } from '@/components/pricing-section'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const router = useRouter()
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setStep(1)

    try {
      let result
      if (isSignUp) {
        setStep(2)
        result = await signUpWithEmail(email, password)
        if (result.error) {
          setError(result.error)
          setStep(0)
          return
        }
        setStep(3)
        setError('Check your email to confirm your account!')
      } else {
        setStep(2)
        result = await signInWithEmail(email, password)
        if (result.error) {
          setError(result.error)
          setStep(0)
          return
        }
        setStep(3)
        // Navigation handled by auth provider
      }
    } catch (error: any) {
      setError(error.message)
      setStep(0)
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signInWithGoogle()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
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
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-glow" />
      </div>
      
      {/* SubTracker Logo */}
      <Link href="/" className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-xl">
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
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-70 animate-glow" />
              <div className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl shadow-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome to SubTracker</h1>
            <p className="text-muted-foreground">Your intelligent subscription manager</p>
          </div>

          {isLoading && step > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-emerald-600/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                <span className="text-white">{loginSteps[step - 1].message}</span>
              </div>
            </motion.div>
          )}

          {/* Google Sign In - Primary */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full relative px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <span className="relative flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </span>
          </Button>

          {/* Collapsible Email Sign In */}
          <div className="mt-6">
            <button
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-sm font-medium transition-all duration-300 py-3"
            >
              <span>Or sign {isSignUp ? 'up' : 'in'} with email</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showEmailForm ? 'rotate-180' : ''}`} />
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: showEmailForm ? 'auto' : 0, opacity: showEmailForm ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAuth} className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pl-10 neu-card rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="your@email.com"
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
                      className="w-full px-4 py-3 pl-10 neu-card rounded-xl text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      placeholder="••••••••"
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
                  className="w-full relative px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border border-white/20 hover:bg-white/20"
                >
                  <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      isSignUp ? 'Sign Up' : 'Sign In'
                    )}
                  </span>
                </Button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors duration-300"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </form>
            </motion.div>
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
                <div className="inline-flex items-center justify-center w-14 h-14 neu-card rounded-xl mb-3 text-emerald-400 group-hover:text-emerald-300 transition-all duration-300">
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