'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Shield, ArrowLeft, Check, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InternalHeader } from '@/components/internal-header'
import { useAuth } from '@/providers/supabase-auth-provider'
import { supabase } from '@/lib/supabase'

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime'>('annual')
  const [isLoading, setIsLoading] = useState(false)
  
  const plans = {
    monthly: {
      name: 'Monthly',
      price: '$8',
      period: '/month',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || '',
      description: 'Flexible monthly billing',
      features: [
        'Unlimited subscriptions',
        'Custom categories',
        'Advanced analytics',
        'Price change alerts',
        'Export data',
        'Priority support'
      ],
      badge: null,
      color: 'from-purple-500 to-pink-500'
    },
    annual: {
      name: 'Annual',
      price: '$60',
      period: '/year',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL || '',
      description: 'Best value - Save 37%',
      features: [
        'Everything in Monthly',
        'Save $36 per year',
        'Same features, better price',
        'Cancel anytime'
      ],
      badge: 'BEST VALUE',
      color: 'from-green-500 to-emerald-500'
    },
    lifetime: {
      name: 'Lifetime',
      price: '$250',
      period: 'one-time',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_LIFETIME || '',
      description: 'Pay once, use forever',
      features: [
        'Everything in Premium',
        'Lifetime updates',
        'Early access to new features',
        'No recurring fees ever',
        'Priority feature requests'
      ],
      badge: 'LIMITED OFFER',
      color: 'from-yellow-500 to-orange-500'
    }
  }
  
  const currentPlan = plans[selectedPlan]

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      // Get the session token
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session token exists:', !!session?.access_token)
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
        },
        body: JSON.stringify({
          priceId: currentPlan.stripePriceId,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        alert('Error creating checkout session. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error creating checkout session. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <InternalHeader />
          <Button
            onClick={() => router.back()}
            className="neu-button px-4 py-2 rounded-xl text-white/70 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Plan Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gradient text-center mb-2">Choose Your Plan</h1>
          <p className="text-center text-muted-foreground mb-8">Save money. Track subscriptions. Take control.</p>
          
          {/* Plan Selector */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {Object.entries(plans).map(([key, plan]) => (
              <motion.button
                key={key}
                onClick={() => setSelectedPlan(key as 'monthly' | 'annual' | 'lifetime')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative neu-card rounded-2xl p-6 border transition-all duration-300 ${
                  selectedPlan === key 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${plan.color} text-white shadow-lg`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                
                {key === 'annual' && (
                  <p className="text-xs text-green-400 font-medium">
                    $5/mo billed annually
                  </p>
                )}
                
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Plan Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >            
            <div className="neu-card rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{currentPlan.name} Plan</h2>
                {currentPlan.badge && (
                  <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${currentPlan.color} text-white`}>
                    {currentPlan.badge}
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gradient">{currentPlan.price}</span>
                <span className="text-muted-foreground">{currentPlan.period}</span>
              </div>
              {selectedPlan === 'annual' && (
                <p className="text-sm text-green-400 font-medium mb-4">
                  $5/mo billed annually
                </p>
              )}
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">What&apos;s Included</h3>
                {currentPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>PCI compliant</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="neu-card rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-6">Payment Details</h2>
            
            {/* Stripe Checkout Info */}
            <div className="bg-slate-800/50 rounded-xl p-8 text-center mb-6">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure Checkout with Stripe</h3>
              <p className="text-muted-foreground text-sm">
                You&apos;ll be redirected to Stripe&apos;s secure checkout page
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={handleCheckout}
                className="w-full relative px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                disabled={isLoading}
              >
                <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Continue to Checkout
                    </>
                  )}
                </span>
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By purchasing, you agree to our Terms of Service and Privacy Policy
              </p>
              
              <div className="flex items-center justify-center gap-4 pt-4">
                <img src="https://cdn.brandfolder.io/KGT2DTA4/at/8vbr8k4mr5xjwk4hxq4t9vs/Powered_by_Stripe_-_blurple.svg" alt="Powered by Stripe" className="h-6" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* FAQ or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Questions? Contact us at{' '}
            <a href="mailto:support@subtracker.app" className="text-purple-400 hover:text-purple-300">
              support@subtracker.app
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}