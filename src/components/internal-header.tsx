'use client'

import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function InternalHeader() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
      </div>
      <span className="text-xl font-bold text-gradient">SubTracker</span>
    </Link>
  )
}