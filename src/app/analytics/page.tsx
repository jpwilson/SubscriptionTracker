'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, LineChart, LogOut, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/mock-auth'
import { useAnalytics } from '@/hooks/use-analytics'
import { formatCurrency } from '@/lib/utils'
import { InternalHeader } from '@/components/internal-header'
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

type TimePeriod = 'daily' | 'monthly' | 'quarterly' | 'yearly'
type TimeScale = '3months' | '6months' | '1year' | '5years'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#f43f5e', '#84cc16']

export default function AnalyticsPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly')
  const [timeScale, setTimeScale] = useState<TimeScale>('6months')
  const [showCategorySection, setShowCategorySection] = useState(true)
  
  const { data: analytics, isLoading } = useAnalytics(timePeriod, timeScale)

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  // Use data from API
  const spendingData = analytics?.timeSeries || []
  const categoryData = analytics?.categories || []

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <p className="text-gradient text-lg font-medium">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Modern animated background */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <InternalHeader />
            <div className="ml-8">
              <h1 className="text-4xl font-bold text-gradient">Analytics</h1>
              <p className="text-muted-foreground">Track your subscription spending</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            className="neu-button px-3 py-2 rounded-xl border-0 text-white/70 hover:text-white transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Summary Stats */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            <div 
              onClick={() => router.push('/subscriptions')}
              className="neu-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-muted-foreground text-sm mb-2 font-medium">Active Subscriptions</p>
                <p className="text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300">{analytics.summary.activeSubscriptions}</p>
                <p className="text-xs text-purple-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view all</p>
              </div>
            </div>
            <div className="neu-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-muted-foreground text-sm mb-2 font-medium">Monthly Total</p>
                <p className="text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300">{formatCurrency(analytics.summary.totalMonthly)}</p>
              </div>
            </div>
            <div className="neu-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-muted-foreground text-sm mb-2 font-medium">Yearly Total</p>
                <p className="text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300">{formatCurrency(analytics.summary.totalYearly)}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Time Scale Toggle */}
          <div className="flex neu-card rounded-xl p-1 border border-white/10">
            <Button
              onClick={() => setTimeScale('3months')}
              variant={timeScale === '3months' ? 'default' : 'ghost'}
              className={timeScale === '3months' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-white/70 hover:text-white neu-button'}
              size="sm"
            >
              3 Months
            </Button>
            <Button
              onClick={() => setTimeScale('6months')}
              variant={timeScale === '6months' ? 'default' : 'ghost'}
              className={timeScale === '6months' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-white/70 hover:text-white neu-button'}
              size="sm"
            >
              6 Months
            </Button>
            <Button
              onClick={() => setTimeScale('1year')}
              variant={timeScale === '1year' ? 'default' : 'ghost'}
              className={timeScale === '1year' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-white/70 hover:text-white neu-button'}
              size="sm"
            >
              1 Year
            </Button>
            <Button
              onClick={() => setTimeScale('5years')}
              variant={timeScale === '5years' ? 'default' : 'ghost'}
              className={timeScale === '5years' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-white/70 hover:text-white neu-button'}
              size="sm"
            >
              5 Years
            </Button>
          </div>

          {/* Time Period Filter */}
          <div className="flex neu-card rounded-xl p-1 border border-white/10">
            {(['daily', 'monthly', 'quarterly', 'yearly'] as TimePeriod[]).map((period) => (
              <Button
                key={period}
                onClick={() => setTimePeriod(period)}
                variant={timePeriod === period ? 'default' : 'ghost'}
                className={timePeriod === period ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-white/70 hover:text-white neu-button'}
                size="sm"
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neu-card rounded-2xl p-6 mb-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-gradient mb-6">Spending Over Time</h2>
          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="period" 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(12px)'
                  }}
                  labelStyle={{ color: '#e5e7eb' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6, fill: '#ec4899' }}
                  connectNulls
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
          )}
        </motion.div>

        {/* Category Breakdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neu-card rounded-2xl p-6 border border-white/10"
        >
          <div 
            className="flex items-center justify-between mb-6 cursor-pointer"
            onClick={() => setShowCategorySection(!showCategorySection)}
          >
            <h2 className="text-2xl font-bold text-gradient">Category Analysis</h2>
            <Button variant="ghost" size="icon" className="text-purple-400">
              {showCategorySection ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>
          
          {showCategorySection && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="neu-card rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-gradient mb-6">Category Distribution</h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => formatCurrency(value)}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category List */}
                <div className="neu-card rounded-2xl p-6 border border-white/10">
                  <h2 className="text-2xl font-bold text-gradient mb-6">Monthly Spending by Category</h2>
                  <div className="space-y-4">
                    {categoryData
                      .sort((a, b) => b.amount - a.amount)
                      .map((category, index) => (
                        <motion.div 
                          key={category.category} 
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-5 h-5 rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-white font-medium">{category.category}</span>
                          </div>
                          <span className="text-white font-bold text-lg group-hover:text-gradient transition-all duration-300">{formatCurrency(category.amount)}/mo</span>
                        </motion.div>
                      ))}
                    {categoryData.length === 0 && (
                      <p className="text-muted-foreground text-center py-8">No active subscriptions to analyze</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Category Bar Chart */}
              {categoryData.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gradient mb-4">Category Comparison</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="category"
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)' }}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)' }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(12px)'
                          }}
                          labelStyle={{ color: '#e5e7eb' }}
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 8, 8]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}