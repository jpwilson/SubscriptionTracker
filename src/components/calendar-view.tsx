'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, DollarSign, Info, X } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths, getDate } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { type Subscription } from '@/lib/api-client'
import { useRouter } from 'next/navigation'

interface CalendarViewProps {
  subscriptions: Subscription[]
  userCurrency?: string
}

export function CalendarView({ subscriptions, userCurrency = 'USD' }: CalendarViewProps) {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [showDayModal, setShowDayModal] = useState(false)
  
  // Simple category info helper
  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { icon: string; color: string }> = {
      'Entertainment': { icon: '🎬', color: '#EC4899' },
      'Health & Fitness': { icon: '💪', color: '#10B981' },
      'Business': { icon: '💼', color: '#3B82F6' },
      'Food & Drink': { icon: '🍔', color: '#F59E0B' },
      'AI Tools': { icon: '🤖', color: '#8B5CF6' },
      'Education': { icon: '📚', color: '#06B6D4' },
      'News & Media': { icon: '📰', color: '#6366F1' },
      'Social Media': { icon: '👥', color: '#F97316' },
      'Utilities': { icon: '🔧', color: '#64748B' },
    }
    return categoryMap[category] || { icon: '📦', color: '#6B7280' }
  }

  // Get calendar days for the current month
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start, end })
    
    // Add padding days from previous month
    const startDayOfWeek = start.getDay()
    const previousMonthDays = []
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(start)
      day.setDate(day.getDate() - (i + 1))
      previousMonthDays.push(day)
    }
    
    // Add padding days from next month
    const endDayOfWeek = end.getDay()
    const nextMonthDays = []
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
      const day = new Date(end)
      day.setDate(day.getDate() + i)
      nextMonthDays.push(day)
    }
    
    return [...previousMonthDays, ...days, ...nextMonthDays]
  }, [currentMonth])

  // Group subscriptions by payment date in the current month
  const subscriptionsByDay = useMemo(() => {
    const grouped: Record<string, Subscription[]> = {}
    
    subscriptions.forEach(sub => {
      if (sub.status !== 'active' || !sub.nextPaymentDate) return
      
      // For monthly, weekly, quarterly subscriptions
      if (sub.billingCycle !== 'yearly') {
        const paymentDate = parseISO(sub.nextPaymentDate)
        const dayOfMonth = getDate(paymentDate)
        
        // Check if this subscription has a payment this month
        calendarDays.forEach(day => {
          if (getDate(day) === dayOfMonth && isSameMonth(day, currentMonth)) {
            const key = format(day, 'yyyy-MM-dd')
            if (!grouped[key]) grouped[key] = []
            grouped[key].push(sub)
          }
        })
      }
    })
    
    return grouped
  }, [subscriptions, calendarDays, currentMonth])

  // Get annual subscriptions
  const annualSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => 
      sub.status === 'active' && 
      sub.billingCycle === 'yearly'
    ).map(sub => ({
      ...sub,
      monthlyEquivalent: sub.amount / 12
    }))
  }, [subscriptions])

  // Get subscriptions for a specific day
  const getSubscriptionsForDay = (day: Date) => {
    const key = format(day, 'yyyy-MM-dd')
    return subscriptionsByDay[key] || []
  }

  // Calculate total for a specific day
  const getDayTotal = (day: Date) => {
    const subs = getSubscriptionsForDay(day)
    return subs.reduce((total, sub) => total + sub.amount, 0)
  }

  const handleDayClick = (day: Date) => {
    const subs = getSubscriptionsForDay(day)
    if (subs.length > 0) {
      setSelectedDay(day)
      setShowDayModal(true)
    }
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="calendar-view-container space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-xl neu-button hover:border-emerald-500/30 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-emerald-400" />
          </button>
          <h2 className="text-2xl font-bold text-gradient">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-xl neu-button hover:border-emerald-500/30 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-emerald-400" />
          </button>
        </div>
        <button
          onClick={() => setCurrentMonth(new Date())}
          className="px-4 py-2 rounded-xl neu-button text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="neu-card rounded-2xl p-4 sm:p-6 border border-white/10">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs sm:text-sm font-semibold text-muted-foreground py-2">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day[0]}</span>
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isToday = isSameDay(day, new Date())
            const subs = getSubscriptionsForDay(day)
            const dayTotal = getDayTotal(day)
            
            return (
              <motion.div
                key={index}
                whileHover={subs.length > 0 ? { scale: 1.02 } : {}}
                className={`
                  relative min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 rounded-xl
                  ${isCurrentMonth ? 'bg-white/5' : 'bg-white/2 opacity-50'}
                  ${isToday ? 'ring-2 ring-emerald-500' : ''}
                  ${subs.length > 0 ? 'cursor-pointer hover:bg-white/10' : ''}
                  transition-all
                `}
                onClick={() => handleDayClick(day)}
              >
                {/* Day number */}
                <div className={`text-xs sm:text-sm font-medium ${isToday ? 'text-emerald-400' : 'text-gray-400'}`}>
                  {format(day, 'd')}
                </div>
                
                {/* Desktop: Show subscription details */}
                <div className="hidden sm:block mt-1 space-y-1">
                  {subs.slice(0, 3).map((sub, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-xs"
                      style={{ color: getCategoryInfo(sub.category).color }}
                    >
                      <span className="text-[10px]">{getCategoryInfo(sub.category).icon}</span>
                      <span className="truncate">{sub.name.length > 10 ? sub.name.substring(0, 10) + '...' : sub.name}</span>
                    </div>
                  ))}
                  {subs.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{subs.length - 3} more
                    </div>
                  )}
                  {subs.length > 0 && (
                    <div className="text-xs font-semibold text-emerald-400">
                      {formatCurrency(dayTotal, userCurrency)}
                    </div>
                  )}
                </div>
                
                {/* Mobile: Show dots for subscriptions */}
                <div className="sm:hidden">
                  {subs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {subs.slice(0, 3).map((sub, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getCategoryInfo(sub.category).color }}
                        />
                      ))}
                      {subs.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">+{subs.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Annual Subscriptions Section */}
      {annualSubscriptions.length > 0 && (
        <div className="neu-card rounded-2xl p-4 sm:p-6 border border-white/10">
          <h3 className="text-lg font-bold text-gradient mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Annual Subscriptions
          </h3>
          <div className="space-y-3">
            {annualSubscriptions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => router.push(`/subscriptions/${sub.id}`)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: sub.color || getCategoryInfo(sub.category).color }}
                  >
                    {sub.icon || getCategoryInfo(sub.category).icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{sub.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Next payment: {format(parseISO(sub.nextPaymentDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{formatCurrency(sub.amount, userCurrency)}/yr</p>
                  <p className="text-sm text-emerald-400">{formatCurrency(sub.monthlyEquivalent, userCurrency)}/mo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day Details Modal */}
      <AnimatePresence>
        {showDayModal && selectedDay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDayModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md neu-card rounded-2xl p-6 border border-white/10"
            >
              <button
                onClick={() => setShowDayModal(false)}
                className="absolute right-4 top-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <h3 className="text-xl font-bold text-gradient mb-4">
                {format(selectedDay, 'MMMM d, yyyy')}
              </h3>

              <div className="space-y-3">
                {getSubscriptionsForDay(selectedDay).map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      router.push(`/subscriptions/${sub.id}`)
                      setShowDayModal(false)
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ backgroundColor: sub.color || getCategoryInfo(sub.category).color }}
                      >
                        {sub.icon || getCategoryInfo(sub.category).icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">{sub.billingCycle}</p>
                      </div>
                    </div>
                    <p className="font-bold text-white">
                      {formatCurrency(sub.amount, userCurrency)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Total for this day</p>
                  <p className="text-xl font-bold text-gradient">
                    {formatCurrency(getDayTotal(selectedDay), userCurrency)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}