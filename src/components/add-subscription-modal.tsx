'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MockDataStore } from '@/lib/mock-data'

interface AddSubscriptionModalProps {
  onClose: () => void
  onSave: () => void
}

export function AddSubscriptionModal({ onClose, onSave }: AddSubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    billingCycle: 'monthly' as 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off',
    category: 'Other',
    startDate: new Date().toISOString().split('T')[0],
    isTrial: false,
    trialDays: '7',
  })

  const handleSubmit = (e: React.FormEvent) => {
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
    
    MockDataStore.saveSubscription({
      name: formData.name,
      amount: parseFloat(formData.amount),
      billingCycle: formData.billingCycle,
      category: formData.category,
      startDate: formData.startDate,
      nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
      isTrial: formData.isTrial,
      status: 'active',
    })
    
    onSave()
  }

  const categories = ['Entertainment', 'Software', 'Finance', 'Health', 'Education', 'Other']
  const billingCycles = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'one-off', label: 'One-time' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Add Subscription</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="9.99"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isTrial"
                checked={formData.isTrial}
                onChange={(e) => setFormData({ ...formData, isTrial: e.target.checked })}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="isTrial" className="text-sm text-gray-300">
                This is a free trial
              </label>
              {formData.isTrial && (
                <input
                  type="number"
                  value={formData.trialDays}
                  onChange={(e) => setFormData({ ...formData, trialDays: e.target.value })}
                  className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                  placeholder="7"
                  min="1"
                />
              )}
              {formData.isTrial && (
                <span className="text-sm text-gray-400">days</span>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Add Subscription
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}