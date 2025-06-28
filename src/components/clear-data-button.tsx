'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MockDataStore } from '@/lib/mock-data'

interface ClearDataButtonProps {
  onClear: () => void
}

export function ClearDataButton({ onClear }: ClearDataButtonProps) {
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all subscriptions? This will delete all your data.')) {
      // Get all subscriptions and delete them
      const subscriptions = MockDataStore.getSubscriptions()
      subscriptions.forEach(sub => {
        MockDataStore.deleteSubscription(sub.id)
      })
      
      // Clear tour completion flag to show tour again
      localStorage.removeItem('subtracker_tour_completed')
      
      onClear()
    }
  }
  
  return (
    <Button
      onClick={handleClearData}
      variant="ghost"
      size="sm"
      className="text-gray-500 hover:text-red-400"
      title="Clear all data"
    >
      <Trash2 className="w-4 h-4 mr-2" />
      Clear Demo Data
    </Button>
  )
}