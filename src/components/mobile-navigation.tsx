'use client'

import { Plus, BarChart3, Lightbulb, User, Tags, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MobileNavigationProps {
  onAddClick: () => void
  onCategoriesClick: () => void
}

export function MobileNavigation({ onAddClick, onCategoriesClick }: MobileNavigationProps) {
  const router = useRouter()

  return (
    <>
      {/* Fixed bottom navigation for mobile and tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
          <div className="grid grid-cols-5 items-center">
            {/* Insights */}
            <button
              onClick={() => router.push('/insights')}
              className="flex flex-col items-center gap-1 py-3 px-2 text-white/70 hover:text-emerald-400 transition-colors"
            >
              <Lightbulb className="w-5 h-5" />
              <span className="text-xs">Insights</span>
            </button>

            {/* Analytics */}
            <button
              onClick={() => router.push('/analytics')}
              className="flex flex-col items-center gap-1 py-3 px-2 text-white/70 hover:text-emerald-400 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Analytics</span>
            </button>

            {/* Add Subscription - Center with special styling */}
            <div className="relative">
              <button
                onClick={onAddClick}
                className="relative -mt-4 mx-auto block group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-3 shadow-xl transform group-hover:scale-105 transition-transform">
                  <div className="flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </button>
            </div>

            {/* Categories */}
            <button
              onClick={onCategoriesClick}
              className="flex flex-col items-center gap-1 py-3 px-2 text-white/70 hover:text-emerald-400 transition-colors"
            >
              <Tags className="w-5 h-5" />
              <span className="text-xs">Categories</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => router.push('/profile')}
              className="flex flex-col items-center gap-1 py-3 px-2 text-white/70 hover:text-emerald-400 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}