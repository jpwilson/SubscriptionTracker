'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Shield, ArrowLeft, Check, Zap, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InternalHeader } from '@/components/internal-header'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get('plan') || 'premium'
  
  const plans = {
    premium: {
      name: 'Premium',
      price: '$5',
      period: '/month',
      description: 'Perfect for individuals tracking multiple subscriptions',
      features: [
        'Unlimited subscriptions',
        'Custom categories',
        'Advanced analytics',
        'Price change alerts',
        'Export data',
        'Priority support'
      ],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    forever: {
      name: 'Forever',
      price: '$250',
      period: 'one-time',
      description: 'Lifetime access with all premium features',
      features: [
        'Everything in Premium',
        'Lifetime updates',
        'Early access to new features',
        'No recurring fees ever',
        'Priority feature requests',
        'Exclusive badge'
      ],
      icon: <Shield className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500'
    },
    enterprise: {
      name: 'Enterprise',
      price: '$200',
      period: '/month',
      description: 'For teams and businesses managing subscriptions',
      features: [
        'Everything in Premium',
        'Unlimited team members',
        'Admin dashboard',
        'SSO authentication',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee'
      ],
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    }
  }
  
  const selectedPlan = plans[plan as keyof typeof plans] || plans.premium

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

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Plan Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-gradient mb-6">Complete Your Purchase</h1>
            
            <div className="neu-card rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedPlan.color} text-white`}>
                  {selectedPlan.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedPlan.name} Plan</h2>
                  <p className="text-muted-foreground">{selectedPlan.description}</p>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-gradient">{selectedPlan.price}</span>
                <span className="text-muted-foreground">{selectedPlan.period}</span>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">What&apos;s Included</h3>
                {selectedPlan.features.map((feature, i) => (
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
            
            {/* Stripe Placeholder */}
            <div className="bg-slate-800/50 rounded-xl p-12 border-2 border-dashed border-slate-600 text-center">
              <CreditCard className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Stripe Payment Form</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Secure payment processing will be embedded here
              </p>
              
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
                <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
                  <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
                </div>
                <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                className="w-full relative px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                disabled
              >
                <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">
                  Complete Purchase
                </span>
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                By purchasing, you agree to our Terms of Service and Privacy Policy
              </p>
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