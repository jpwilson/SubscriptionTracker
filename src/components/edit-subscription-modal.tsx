'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUpdateSubscription } from '@/hooks/use-subscriptions'
import { useCategories } from '@/hooks/use-categories'
import { ManageCategoriesModal } from './manage-categories-modal'
import { Subscription } from '@/lib/api-client'

interface EditSubscriptionModalProps {
  subscription: Subscription
  onClose: () => void
  onSave: () => void
}

export function EditSubscriptionModal({ subscription, onClose, onSave }: EditSubscriptionModalProps) {
  const updateSubscription = useUpdateSubscription()
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  
  const [formData, setFormData] = useState({
    name: subscription.name,
    amount: subscription.amount.toString(),
    billingCycle: subscription.billingCycle as 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off',
    category: subscription.category,
    startDate: new Date(subscription.startDate).toISOString().split('T')[0],
    isActive: subscription.status === 'active',
    endDate: subscription.endDate ? new Date(subscription.endDate).toISOString().split('T')[0] : '',
    isTrial: subscription.isTrial,
    trialDays: '7',
    creditCardAdded: false,
    creditCardDate: new Date().toISOString().split('T')[0],
    reminderEnabled: true,
    url: subscription.url || '',
    notes: subscription.notes || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const startDate = new Date(formData.startDate)
    let nextPaymentDate = new Date(startDate)
    
    if (formData.isTrial) {
      nextPaymentDate.setDate(nextPaymentDate.getDate() + parseInt(formData.trialDays))
    } else {
      switch (formData.billingCycle) {
        case 'weekly':
          nextPaymentDate.setDate(nextPaymentDate.getDate() + 7)
          break
        case 'monthly':
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1)
          break
        case 'quarterly':
          nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 3)
          break
        case 'yearly':
          nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1)
          break
      }
    }
    
    await updateSubscription.mutateAsync({
      id: subscription.id,
      updates: {
        name: formData.name,
        amount: parseFloat(formData.amount),
        billingCycle: formData.billingCycle,
        category: formData.category,
        startDate: formData.startDate,
        endDate: !formData.isActive && formData.endDate ? formData.endDate : null,
        nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
        isTrial: formData.isTrial,
        status: formData.isActive ? 'active' : 'cancelled',
        url: formData.url || null,
        notes: formData.notes || null,
      }
    })
    
    onSave()
  }

  const billingCycles = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'one-off', label: 'One-time' },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="neu-card rounded-3xl shadow-2xl w-full max-w-md border border-white/10 backdrop-blur-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gradient">Edit Subscription</h2>
            <button
              onClick={onClose}
              className="neu-button p-2 rounded-xl text-white/70 hover:text-white transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Service Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Netflix, Spotify"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-8 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="9.99"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Billing Cycle
                </label>
                <select
                  value={formData.billingCycle}
                  onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {billingCycles.map((cycle) => (
                    <option key={cycle.value} value={cycle.value}>
                      {cycle.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  Category
                </label>
                <button
                  type="button"
                  onClick={() => setShowCategoriesModal(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add new category
                </button>
              </div>
              {categoriesLoading ? (
                <div className="w-full px-4 py-3 neu-card rounded-xl flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full pl-10 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="text-lg">
                      {categories.find(c => c.name === formData.category)?.icon || ''}
                    </span>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isActive" className="text-sm text-muted-foreground font-medium">
                  This is an active subscription
                </label>
              </div>

              {!formData.isActive && (
                <div className="ml-7">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required={!formData.isActive}
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isTrial"
                  checked={formData.isTrial}
                  onChange={(e) => setFormData({ ...formData, isTrial: e.target.checked })}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isTrial" className="text-sm text-muted-foreground font-medium">
                  This is a free trial
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Billing Page URL (optional)
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://netflix.com/account"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Add the URL where you manage this subscription for quick access
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Add any notes about this subscription..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 neu-button px-4 py-3 rounded-xl text-white/70 hover:text-white transition-all duration-300"
                disabled={updateSubscription.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                disabled={updateSubscription.isPending}
              >
                <span className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center">
                  {updateSubscription.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
      
      {showCategoriesModal && (
        <ManageCategoriesModal onClose={() => setShowCategoriesModal(false)} />
      )}
    </div>
  )
}