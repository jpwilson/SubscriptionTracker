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
  const [currentStep, setCurrentStep] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('subtracker_tour_completed')
    if (!hasSeenTour && !run) {
      // Auto-start tour for first-time users after a short delay
      const timer = setTimeout(() => setRunTour(true), 2000)
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
          <h2 className="text-xl font-bold mb-2" style={{ color: '#a78bfa' }}>Welcome to SubTracker! 💰</h2>
          <p>Start saving money by taking control of your subscriptions.</p>
          <p className="text-sm text-purple-400 mt-2">Studies show tracking cuts costs by 10-30%</p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.stats-grid',
      content: (
        <div>
          <h3 className="font-bold mb-2" style={{ color: '#60a5fa' }}>Your Money Dashboard</h3>
          <p>Get a quick overview:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><strong>Monthly Cost</strong>: Total monthly spending</li>
            <li><strong>Annual Cost</strong>: What you&apos;ll spend this year</li>
            <li><strong>Subscription Breakdown</strong>: Count by billing cycle</li>
            <li><strong>Active Trials</strong>: Never miss a cancellation</li>
          </ul>
        </div>
      ),
      placement: 'auto',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
      },
    },
    {
      target: '.subscription-list h2',
      content: (
        <div>
          <h3 className="font-bold mb-2" style={{ color: '#ec4899' }}>The Heart of the App</h3>
          <p>This is your subscription dashboard where you can:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Click any subscription to <strong>view/edit</strong> details</li>
            <li>View all subscriptions in a <strong className="text-yellow-400 text-base">List</strong> or <strong className="text-yellow-400 text-base">Calendar</strong></li>
            <li>Search and filter your subscriptions</li>
            <li>Sort by price, date, or category</li>
            <li>See upcoming payments at a glance</li>
          </ul>
          <p className="text-xs text-purple-400 mt-2">💡 Try switching between List and Calendar views!</p>
        </div>
      ),
      placement: 'auto',
      disableBeacon: true,
    },
    {
      target: '.add-subscription-btn',
      content: (
        <div>
          <h3 className="font-bold mb-2" style={{ color: '#10b981' }}>Add Subscription</h3>
          <p>Add all your subscriptions in seconds:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Netflix, Spotify, gym memberships</li>
            <li>SaaS tools, AI services, cloud storage</li>
            <li>Free trials you might forget to cancel</li>
            <li>Any recurring payment you have</li>
          </ul>
          <p className="text-xs text-purple-400 mt-2">💡 Tip: Start with your biggest expenses</p>
        </div>
      ),
      placement: 'auto',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
      },
    },
    {
      target: '[title="Profile"]',
      content: (
        <div>
          <h3 className="font-bold mb-2" style={{ color: '#8b5cf6' }}>Customize Your Experience</h3>
          <p>Visit your Profile to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Select your preferred <span className="text-purple-400 font-bold">currency</span> (30+ supported)</li>
            <li>Export all your data anytime</li>
            <li>Manage your account settings</li>
          </ul>
          <p className="text-xs text-gray-400 mt-2">Your data is always yours to keep!</p>
        </div>
      ),
      placement: 'auto',
      disableBeacon: true,
      floaterProps: {
        disableFlip: false,
      },
    },
    {
      target: '.help-button',
      content: (
        <div>
          <h3 className="font-bold mb-2" style={{ color: '#06b6d4' }}>Need Help?</h3>
          <p>Click the help button anytime to see this tour again!</p>
          <p className="mt-2">Ready to start tracking your subscriptions? 🚀</p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, action } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    // Update current step
    if (action === 'next' || action === 'prev') {
      setCurrentStep(index)
    }

    // When we reach the subscription list step (index 2), trigger calendar view
    if (index === 2 && (action === 'next' || action === 'start')) {
      // Switch to calendar view
      setTimeout(() => {
        const calendarButtons = document.querySelectorAll('button')
        calendarButtons.forEach(button => {
          if (button.textContent?.includes('Calendar') || button.querySelector('[title*="Calendar"]')) {
            button.click()
          }
        })
      }, 100)
    }
    
    // When we move to step 4 (index 3), switch back to list view
    if (index === 3 && action === 'next') {
      // Switch back to list view
      setTimeout(() => {
        const listButtons = document.querySelectorAll('button')
        listButtons.forEach(button => {
          if (button.textContent?.includes('List') || button.querySelector('[title*="List"]')) {
            button.click()
          }
        })
      }, 100)
    }

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
        showProgress={false}
        showSkipButton
        disableScrolling
        disableOverlay
        callback={handleJoyrideCallback}
        styles={{
          options: {
            arrowColor: '#8b5cf6',
            backgroundColor: '#2d3748',
            primaryColor: '#8b5cf6',
            textColor: '#ffffff',
            overlayColor: 'rgba(0, 0, 0, 0.7)',
            width: typeof window !== 'undefined' && window.innerWidth < 500 ? 300 : 380,
            zIndex: 10000,
          },
          tooltip: {
            fontSize: 15,
            padding: 20,
            maxHeight: typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600,
            overflow: 'auto',
            borderRadius: 12,
            boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15), 0 0 80px rgba(255, 255, 255, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipContent: {
            padding: '8px 0',
          },
          tooltipFooter: {
            marginTop: '15px',
          },
          buttonNext: {
            backgroundColor: '#8b5cf6',
            fontSize: 14,
            borderRadius: 8,
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
        spotlightClicks={false}
        scrollDuration={400}
        tooltipComponent={({ continuous, index, step, backProps, closeProps, primaryProps, skipProps, tooltipProps, isLastStep }) => (
          <div {...tooltipProps} style={{ backgroundColor: '#2d3748', color: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15), 0 0 80px rgba(255, 255, 255, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <div>{step.content}</div>
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button {...skipProps} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Skip Tour</button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {index > 0 && <button {...backProps} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Back</button>}
                  <button {...primaryProps} style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}>{isLastStep ? 'Get Started' : 'Next'}</button>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#94a3b8' }}>
                {index + 1} of {steps.length}
              </div>
            </div>
          </div>
        )}
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