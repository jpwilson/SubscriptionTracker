'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit2, AlertCircle, Loader2, Info, Search, ChevronDown, ArrowUp, ArrowDown, Filter } from 'lucide-react'
import { useSubscriptions, useDeleteSubscription } from '@/hooks/use-subscriptions'
import { useCategories } from '@/hooks/use-categories'
import { formatCurrency, formatDate, getDaysUntil } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { AddSubscriptionModal } from '@/components/add-subscription-modal'

type SortOption = 'name' | 'price' | 'nextPayment' | 'category' | 'billingCycle'
type SortDirection = 'asc' | 'desc'
type FilterOption = 'all' | 'active' | 'cancelled' | 'monthly' | 'yearly'

export function SubscriptionList() {
  const { data: subscriptions, isLoading } = useSubscriptions()
  const { data: categories = [] } = useCategories()
  const deleteSubscription = useDeleteSubscription()
  const router = useRouter()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('nextPayment')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterBy, setFilterBy] = useState<FilterOption>('active')
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      deleteSubscription.mutate(id)
    }
  }

  const getCategoryInfo = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName)
    if (category) {
      return {
        icon: category.icon,
        color: category.color,
      }
    }
    // Fallback for categories not found
    return {
      icon: '📦',
      color: '#6B7280',
    }
  }

  // Calculate monthly cost for sorting
  const getMonthlyAmount = (sub: any) => {
    switch (sub.billingCycle) {
      case 'yearly':
        return sub.amount / 12
      case 'quarterly':
        return sub.amount / 3
      case 'weekly':
        return sub.amount * 4.33
      default:
        return sub.amount
    }
  }

  // Filter and sort subscriptions
  const filteredAndSortedSubscriptions = useMemo(() => {
    if (!subscriptions) return []
    
    // Filter by search term
    let filtered = subscriptions.filter(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    // Filter by status or billing cycle
    filtered = filtered.filter(sub => {
      const isActive = sub.status === 'active' || (sub.status !== 'active' && sub.endDate && new Date(sub.endDate) > new Date())
      
      switch (filterBy) {
        case 'active':
          return isActive
        case 'cancelled':
          return !isActive || (sub.status !== 'active' && sub.endDate && new Date(sub.endDate) <= new Date())
        case 'monthly':
          return sub.billingCycle === 'monthly' && isActive
        case 'yearly':
          return sub.billingCycle === 'yearly' && isActive
        case 'all':
        default:
          return true
      }
    })
    
    // Sort subscriptions
    const sorted = [...filtered].sort((a, b) => {
      let result = 0
      
      switch (sortBy) {
        case 'name':
          result = a.name.localeCompare(b.name)
          break
        case 'price':
          result = getMonthlyAmount(a) - getMonthlyAmount(b)
          break
        case 'nextPayment':
          result = new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime()
          break
        case 'category':
          result = a.category.localeCompare(b.category)
          break
        case 'billingCycle':
          const cycleOrder = { 'weekly': 0, 'monthly': 1, 'quarterly': 2, 'yearly': 3, 'one-off': 4 }
          result = (cycleOrder[a.billingCycle as keyof typeof cycleOrder] || 999) - 
                   (cycleOrder[b.billingCycle as keyof typeof cycleOrder] || 999)
          break
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? result : -result
    })
    
    return sorted
  }, [subscriptions, searchTerm, sortBy, sortDirection])

  // Handle sort option click
  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle direction if clicking the same option
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new option with default direction
      setSortBy(option)
      setSortDirection(option === 'price' ? 'desc' : 'asc') // Price defaults to high-to-low
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-glow" />
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>
      </div>
    )
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="neu-card rounded-2xl p-12 text-center border border-white/10"
        >
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
            <div className="relative inline-flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <Plus className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-2">No subscriptions yet</h3>
          <p className="text-muted-foreground mb-6">Start tracking your subscriptions to see insights and save money</p>
          <Button
            onClick={() => setShowAddModal(true)}
            className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl" />
            <span className="relative flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Subscription
            </span>
          </Button>
        </motion.div>
        
        {showAddModal && (
          <AddSubscriptionModal
            onClose={() => setShowAddModal(false)}
            onSave={() => setShowAddModal(false)}
          />
        )}
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gradient">Your Subscriptions</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subscriptions..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors w-full sm:w-auto justify-between sm:justify-center">
              <span className="text-sm">
                Sort: {sortBy === 'nextPayment' ? 'Next Payment' : 
                       sortBy === 'name' ? 'Name' : 
                       sortBy === 'price' ? 'Price' : 
                       sortBy === 'category' ? 'Category' : 'Billing Cycle'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 overflow-hidden">
              <button
                onClick={() => handleSort('nextPayment')}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${sortBy === 'nextPayment' ? 'text-purple-400' : 'text-white'}`}
              >
                <span>Next Payment</span>
                <div className="flex items-center gap-1">
                  <ArrowUp className={`w-4 h-4 ${sortBy === 'nextPayment' && sortDirection === 'asc' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <ArrowDown className={`w-4 h-4 ${sortBy === 'nextPayment' && sortDirection === 'desc' ? 'text-purple-400' : 'text-gray-400'}`} />
                </div>
              </button>
              <button
                onClick={() => handleSort('name')}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${sortBy === 'name' ? 'text-purple-400' : 'text-white'}`}
              >
                <span>Name</span>
                <div className="flex items-center gap-1">
                  <ArrowUp className={`w-4 h-4 ${sortBy === 'name' && sortDirection === 'asc' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <ArrowDown className={`w-4 h-4 ${sortBy === 'name' && sortDirection === 'desc' ? 'text-purple-400' : 'text-gray-400'}`} />
                </div>
              </button>
              <button
                onClick={() => handleSort('price')}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${sortBy === 'price' ? 'text-purple-400' : 'text-white'}`}
              >
                <span>Price</span>
                <div className="flex items-center gap-1">
                  <ArrowUp className={`w-4 h-4 ${sortBy === 'price' && sortDirection === 'asc' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <ArrowDown className={`w-4 h-4 ${sortBy === 'price' && sortDirection === 'desc' ? 'text-purple-400' : 'text-gray-400'}`} />
                </div>
              </button>
              <button
                onClick={() => handleSort('category')}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${sortBy === 'category' ? 'text-purple-400' : 'text-white'}`}
              >
                <span>Category</span>
                <div className="flex items-center gap-1">
                  <ArrowUp className={`w-4 h-4 ${sortBy === 'category' && sortDirection === 'asc' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <ArrowDown className={`w-4 h-4 ${sortBy === 'category' && sortDirection === 'desc' ? 'text-purple-400' : 'text-gray-400'}`} />
                </div>
              </button>
              <button
                onClick={() => handleSort('billingCycle')}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${sortBy === 'billingCycle' ? 'text-purple-400' : 'text-white'}`}
              >
                <span>Billing Cycle</span>
                <div className="flex items-center gap-1">
                  <ArrowUp className={`w-4 h-4 ${sortBy === 'billingCycle' && sortDirection === 'asc' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <ArrowDown className={`w-4 h-4 ${sortBy === 'billingCycle' && sortDirection === 'desc' ? 'text-purple-400' : 'text-gray-400'}`} />
                </div>
              </button>
            </div>
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors">
              <Filter className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 overflow-hidden">
              <div className="text-xs font-semibold text-gray-400 px-4 pt-3 pb-1 uppercase tracking-wider">Status</div>
              <button
                onClick={() => setFilterBy('active')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${filterBy === 'active' ? 'text-purple-400 bg-slate-700/50' : 'text-white'}`}
              >
                Active Only
              </button>
              <button
                onClick={() => setFilterBy('cancelled')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${filterBy === 'cancelled' ? 'text-purple-400 bg-slate-700/50' : 'text-white'}`}
              >
                Cancelled Only
              </button>
              <button
                onClick={() => setFilterBy('all')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${filterBy === 'all' ? 'text-purple-400 bg-slate-700/50' : 'text-white'} mb-2`}
              >
                Show All
              </button>
              
              <div className="border-t border-slate-700"></div>
              <div className="text-xs font-semibold text-gray-400 px-4 pt-3 pb-1 uppercase tracking-wider">Billing Cycle</div>
              <button
                onClick={() => setFilterBy('monthly')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${filterBy === 'monthly' ? 'text-purple-400 bg-slate-700/50' : 'text-white'}`}
              >
                Monthly Only
              </button>
              <button
                onClick={() => setFilterBy('yearly')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors ${filterBy === 'yearly' ? 'text-purple-400 bg-slate-700/50' : 'text-white'}`}
              >
                Yearly Only
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredAndSortedSubscriptions.map((sub, i) => {
          const daysUntilRenewal = getDaysUntil(sub.nextPaymentDate)
          const isTrialEndingSoon = sub.isTrial && daysUntilRenewal <= 7 && daysUntilRenewal >= 0
          const isUnsubscribed = sub.status !== 'active' && sub.endDate && new Date(sub.endDate) > new Date()
          const daysUntilEnd = sub.endDate ? getDaysUntil(sub.endDate) : null
          const isServiceEndingSoon = isUnsubscribed && daysUntilEnd !== null && daysUntilEnd <= 7 && daysUntilEnd >= 0
          
          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="neu-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 border border-white/10 group cursor-pointer"
              onClick={() => router.push(`/subscriptions/${sub.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-all duration-300">{sub.name}</h3>
                    {sub.isTrial && !isTrialEndingSoon && (
                      <div className="relative group/badge">
                        <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md cursor-help">
                          TRIAL
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 whitespace-nowrap z-50">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                          Free trial ends on {sub.nextPaymentDate ? format(new Date(sub.nextPaymentDate), 'MMM d, yyyy') : 'Unknown'}
                        </div>
                      </div>
                    )}
                    {isTrialEndingSoon && (
                      <div className="relative group/badge">
                        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 cursor-help">
                          <AlertCircle className="w-3 h-3" />
                          Trial Ending Soon
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 whitespace-nowrap z-50">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                          {daysUntilRenewal === 0 ? 'Trial ends today - you will be charged' : `Trial ends in ${daysUntilRenewal} day${daysUntilRenewal !== 1 ? 's' : ''} - you will be charged`}
                        </div>
                      </div>
                    )}
                    {isServiceEndingSoon && (
                      <div className="relative group/badge">
                        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/30 cursor-help">
                          <AlertCircle className="w-3 h-3" />
                          Service Ending
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 whitespace-nowrap z-50">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                          {daysUntilEnd === 0 ? 'Service ends today' : `Service ends in ${daysUntilEnd} day${daysUntilEnd !== 1 ? 's' : ''}`}
                        </div>
                      </div>
                    )}
                    {isUnsubscribed && !isServiceEndingSoon && (
                      <div className="relative group/badge">
                        <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 cursor-help">
                          <Info className="w-3 h-3" />
                          Unsubscribed
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-200 whitespace-nowrap z-50">
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                          Service active until {sub.endDate ? format(new Date(sub.endDate), 'MMM d, yyyy') : 'Unknown'}
                          {daysUntilEnd !== null && daysUntilEnd >= 0 && ` (${daysUntilEnd} day${daysUntilEnd !== 1 ? 's' : ''} left)`}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span 
                      className="px-3 py-1 rounded-lg flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: `${getCategoryInfo(sub.category).color}20`,
                        color: getCategoryInfo(sub.category).color 
                      }}
                    >
                      <span>{getCategoryInfo(sub.category).icon}</span>
                      {sub.category}
                    </span>
                    <span>{sub.billingCycle}</span>
                    {sub.status === 'active' ? (
                      <span>Next payment: {formatDate(sub.nextPaymentDate)}</span>
                    ) : (
                      sub.endDate && <span className="text-red-400">Ended: {formatDate(sub.endDate)}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">{formatCurrency(sub.amount)}</p>
                    <p className="text-sm text-muted-foreground">per {sub.billingCycle.replace('ly', '')}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      className="neu-button p-2 rounded-lg text-white/70 hover:text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        /* TODO: Add edit functionality */
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="neu-button p-2 rounded-lg text-white/70 hover:text-red-400 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(sub.id)
                      }}
                      disabled={deleteSubscription.isPending}
                    >
                      {deleteSubscription.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* No results message */}
      {filteredAndSortedSubscriptions.length === 0 && searchTerm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-muted-foreground">No subscriptions found matching "{searchTerm}"</p>
        </motion.div>
      )}
      
      {/* Add Subscription Modal */}
      {showAddModal && (
        <AddSubscriptionModal
          onClose={() => setShowAddModal(false)}
          onSave={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}