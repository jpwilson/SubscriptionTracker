'use client'

import { useEffect } from 'react'
import { X, Info, AlertCircle, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SubscriptionGlossaryProps {
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionGlossary({ isOpen, onClose }: SubscriptionGlossaryProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const badges = [
    {
      name: 'FREE TRIAL',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
      description: 'Free trial period is active',
      details: `You're currently in a free trial. You won't be charged until the trial ends.`,
      example: 'A 30-day free trial for a streaming service'
    },
    {
      name: 'Trial Ending Soon',
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      description: 'Free trial ends within 7 days',
      details: `Your trial is about to expire and you'll be charged for the first time. Cancel now if you don't want to continue.`,
      example: `Trial ends in 3 days - you'll be charged $9.99/month`
    },
    {
      name: 'Service Ending',
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      description: 'Cancelled service ends within 7 days',
      details: `You've cancelled this subscription and will lose access soon. You can still use the service until the end date.`,
      example: 'You cancelled Netflix but have access until July 30th'
    },
    {
      name: 'Unsubscribed',
      icon: <Info className="w-4 h-4" />,
      color: 'bg-red-500/20 text-red-400 border border-red-500/30',
      description: 'Cancelled but still have access',
      details: `You've cancelled this subscription but have more than 7 days of access remaining. You won't be charged again.`,
      example: 'Cancelled on July 2nd but paid through July 30th'
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] my-8 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-gradient">Subscription Status Guide</h2>
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <p className="text-white/70 mb-6">
            SubTracker uses visual badges to help you quickly understand the status of your subscriptions. 
            Here&apos;s what each badge means:
          </p>
          
          <div className="space-y-6">
            {badges.map((badge) => (
              <div 
                key={badge.name}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${badge.color}`}>
                    {badge.icon}
                    <span>{badge.name}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {badge.description}
                    </h3>
                    <p className="text-white/70 text-sm mb-2">
                      {badge.details}
                    </p>
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-purple-400 font-medium">Example:</span>
                      <span className="text-xs text-white/60">{badge.example}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              How Status Changes Work
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>• <strong className="text-white">Regular subscriptions:</strong> No badges - they renew automatically</p>
              <p>• <strong className="text-white">Trial periods:</strong> Start with &quot;FREE TRIAL&quot;, change to &quot;Trial Ending Soon&quot; in the last 7 days</p>
              <p>• <strong className="text-white">Cancelled subscriptions:</strong> Show &quot;Unsubscribed&quot;, then &quot;Service Ending&quot; in the last 7 days</p>
              <p>• <strong className="text-white">After end date:</strong> Subscriptions are automatically removed from your list</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}