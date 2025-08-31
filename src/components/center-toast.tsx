'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Trash2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'

interface CenterToastProps {
  title: string
  description: string
  type?: 'success' | 'delete'
  duration?: number
  onClose: () => void
}

export function CenterToast({ 
  title, 
  description, 
  type = 'success', 
  duration = 10000,
  onClose 
}: CenterToastProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    // Trigger confetti for deletion
    if (type === 'delete') {
      // Fire confetti from the center
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#14b8a6', '#f59e0b', '#8b5cf6']
      })
    }

    // Start countdown
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      
      if (remaining === 0) {
        clearInterval(timer)
        onClose()
      }
    }, 50)

    // Auto close after duration
    const autoCloseTimer = setTimeout(onClose, duration)

    return () => {
      clearInterval(timer)
      clearTimeout(autoCloseTimer)
    }
  }, [duration, onClose, type])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="pointer-events-auto"
        >
          <div className="relative max-w-md mx-4">
            {/* Background card with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
            
            <div className="relative neu-card rounded-2xl p-6 border-2 border-transparent bg-clip-padding overflow-hidden">
              {/* Animated border progress */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, 
                    #10b981 0deg, 
                    #14b8a6 ${360 * (1 - progress / 100)}deg, 
                    transparent ${360 * (1 - progress / 100)}deg, 
                    transparent 360deg)`,
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    type === 'delete' 
                      ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  } shadow-lg`}>
                    {type === 'delete' ? (
                      <Trash2 className="w-6 h-6 text-white" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                    <p className="text-gray-400">{description}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  {/* Progress bar */}
                  <div className="flex-1 mr-4">
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        initial={{ width: '100%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-closing in {Math.ceil((progress / 100) * (duration / 1000))}s
                    </p>
                  </div>
                  
                  {/* OK Button */}
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}