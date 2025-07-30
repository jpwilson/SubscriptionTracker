'use client'

import { useEffect, useState, useRef } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import { HelpCircle, BookOpen, Route } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubscriptionGlossary } from './subscription-glossary'

interface OnboardingTourProps {
  run?: boolean
  onComplete?: () => void
}

export function OnboardingTour({ run = false, onComplete }: OnboardingTourProps) {
  const [runTour, setRunTour] = useState(run)
  const [showMenu, setShowMenu] = useState(false)
  const [showGlossary, setShowGlossary] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('subtracker_tour_completed')
    if (!hasSeenTour && !run) {
      // Auto-start tour for first-time users after a short delay
      const timer = setTimeout(() => setRunTour(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [run])

  useEffect(() => {
    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Welcome to SubTracker! 🎉</h2>
          <p>Let me show you around your new subscription management tool.</p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.stats-grid',
      content: (
        <div>
          <h3 className="font-bold mb-2">Your Financial Overview</h3>
          <p>These cards show your subscription costs at a glance:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><strong>Monthly Cost</strong>: Total monthly spending</li>
            <li><strong>Annual Cost</strong>: Projected yearly spending</li>
            <li><strong>Upcoming Renewals</strong>: Due in next 30 days</li>
            <li><strong>Active Trials</strong>: Free trials you&apos;re tracking</li>
          </ul>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
      },
    },
    {
      target: '.add-subscription-btn',
      content: (
        <div>
          <h3 className="font-bold mb-2">Add Your Subscriptions</h3>
          <p>Click here to add a new subscription. You can track:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Service name and cost</li>
            <li>Billing cycle (weekly, monthly, yearly, etc.)</li>
            <li>Categories (Entertainment, Software, etc.)</li>
            <li>Free trial periods</li>
          </ul>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
      },
    },
    {
      target: '.subscription-list',
      content: (
        <div>
          <h3 className="font-bold mb-2">Your Subscriptions</h3>
          <p>All your subscriptions appear here. You can:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>See upcoming payment dates</li>
            <li>Spot expiring trials with warning badges</li>
            <li>Delete subscriptions you no longer need</li>
            <li>View costs per billing period</li>
          </ul>
        </div>
      ),
      placement: 'auto',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
        autoOpen: true,
      },
      styles: {
        options: {
          width: typeof window !== 'undefined' && window.innerWidth < 500 ? 280 : 360,
        },
      },
    },
    {
      target: '.help-button',
      content: (
        <div>
          <h3 className="font-bold mb-2">One More Thing!</h3>
          <p>Visit your Profile to select your preferred currency.</p>
          <p className="mt-2 text-sm text-gray-400">We support over 30 currencies including USD, EUR, GBP, CAD, and more!</p>
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
        hideArrow: false,
        offset: 20,
      },
    },
    {
      target: '.help-button',
      content: (
        <div>
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p>Click the help button anytime to see this tour again!</p>
          <p className="mt-2">Ready to start tracking your subscriptions? 🚀</p>
        </div>
      ),
      placement: 'top',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
        hideArrow: false,
        offset: 20,
      },
    },
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      localStorage.setItem('subtracker_tour_completed', 'true')
      setRunTour(false)
      onComplete?.()
    }
  }

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            arrowColor: '#6366f1',
            backgroundColor: '#1e293b',
            primaryColor: '#6366f1',
            textColor: '#ffffff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            width: typeof window !== 'undefined' && window.innerWidth < 500 ? 300 : 380,
            zIndex: 10000,
          },
          tooltip: {
            fontSize: 15,
            padding: 20,
            maxHeight: typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600,
            overflow: 'auto',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipContent: {
            padding: '8px 0',
          },
          buttonNext: {
            backgroundColor: '#6366f1',
            fontSize: 14,
            borderRadius: 4,
            padding: '8px 16px',
          },
          buttonBack: {
            color: '#94a3b8',
            fontSize: 14,
            marginRight: 10,
          },
          buttonSkip: {
            color: '#94a3b8',
            fontSize: 14,
          },
        }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Get Started',
          next: 'Next',
          skip: 'Skip Tour',
        }}
        disableOverlayClose
        disableCloseOnEsc
        hideCloseButton
        scrollToFirstStep
        spotlightClicks
        floaterProps={{
          disableFlip: false,
          autoOpen: true,
          styles: {
            floater: {
              filter: 'none',
              maxHeight: '80vh',
            },
          },
          options: {
            preventOverflow: {
              enabled: true,
              boundariesElement: 'viewport',
            },
            flip: {
              enabled: true,
            },
          },
        }}
      />
      
      {/* Help Button and Menu */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Menu */}
        {showMenu && (
          <div 
            ref={menuRef}
            className="absolute bottom-full right-0 mb-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <button
              onClick={() => {
                setRunTour(true)
                setShowMenu(false)
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-slate-700 transition-colors duration-200 flex items-center gap-3"
            >
              <Route className="w-4 h-4 text-purple-400" />
              <span>Take a Tour</span>
            </button>
            <button
              onClick={() => {
                setShowGlossary(true)
                setShowMenu(false)
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-slate-700 transition-colors duration-200 flex items-center gap-3 border-t border-white/10"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Status Guide</span>
            </button>
          </div>
        )}
        
        {/* Help Button */}
        <Button
          ref={buttonRef}
          onClick={() => {
            if (runTour) {
              setRunTour(false)
            }
            setShowMenu(!showMenu)
          }}
          size="icon"
          variant="ghost"
          className="help-button bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg"
          title="Help menu"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Glossary Modal */}
      <SubscriptionGlossary 
        isOpen={showGlossary} 
        onClose={() => setShowGlossary(false)} 
      />
    </>
  )
}