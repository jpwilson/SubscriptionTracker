import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/subscriptions/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'monthly'
    const timeScale = searchParams.get('timeScale') || '6months'
    
    const subscriptions = await prisma.subscription.findMany({
      where: { 
        userId,
        status: 'active'
      },
    })
    
    // Calculate time series data
    const now = new Date()
    const timeSeriesData = []
    const categoryData: Record<string, number> = {}
    
    // Calculate category totals first (outside the period loop)
    subscriptions.forEach(sub => {
      // Convert to monthly amount
      let monthlyAmount = 0
      switch (sub.billingCycle) {
        case 'monthly':
          monthlyAmount = sub.amount
          break
        case 'yearly':
          monthlyAmount = sub.amount / 12
          break
        case 'weekly':
          monthlyAmount = sub.amount * 4.33
          break
        case 'quarterly':
          monthlyAmount = sub.amount / 3
          break
      }
      
      // Add to category totals (monthly basis)
      if (!categoryData[sub.category]) {
        categoryData[sub.category] = 0
      }
      categoryData[sub.category] += monthlyAmount
    })
    
    // Generate periods based on timeScale
    let periodCount = 12
    switch (timeScale) {
      case '3months':
        periodCount = 3
        break
      case '6months':
        periodCount = 6
        break
      case '1year':
        periodCount = 12
        break
      case '5years':
        periodCount = 60
        break
    }
    for (let i = periodCount - 1; i >= 0; i--) {
      const date = new Date(now)
      let periodKey = ''
      
      switch (period) {
        case 'daily':
          date.setDate(date.getDate() - i)
          periodKey = date.toLocaleDateString()
          break
        case 'monthly':
          date.setMonth(date.getMonth() - i)
          periodKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
          break
        case 'quarterly':
          date.setMonth(date.getMonth() - (i * 3))
          const quarter = Math.floor(date.getMonth() / 3) + 1
          periodKey = `Q${quarter} ${date.getFullYear()}`
          break
        case 'yearly':
          date.setFullYear(date.getFullYear() - i)
          periodKey = date.getFullYear().toString()
          break
      }
      
      // Calculate spending for this period
      let periodTotal = 0
      subscriptions.forEach(sub => {
        // Convert to monthly amount
        let monthlyAmount = 0
        switch (sub.billingCycle) {
          case 'monthly':
            monthlyAmount = sub.amount
            break
          case 'yearly':
            monthlyAmount = sub.amount / 12
            break
          case 'weekly':
            monthlyAmount = sub.amount * 4.33
            break
          case 'quarterly':
            monthlyAmount = sub.amount / 3
            break
        }
        
        // Add to period total based on period type
        switch (period) {
          case 'daily':
            periodTotal += monthlyAmount / 30
            break
          case 'monthly':
            periodTotal += monthlyAmount
            break
          case 'quarterly':
            periodTotal += monthlyAmount * 3
            break
          case 'yearly':
            periodTotal += monthlyAmount * 12
            break
        }
      })
      
      timeSeriesData.push({
        period: periodKey,
        amount: Math.round(periodTotal * 100) / 100
      })
    }
    
    // Format category data
    const categories = Object.entries(categoryData).map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100
    }))
    
    return NextResponse.json({
      timeSeries: timeSeriesData,
      categories: categories.sort((a, b) => b.amount - a.amount),
      summary: {
        totalMonthly: categories.reduce((sum, cat) => sum + cat.amount, 0),
        totalYearly: categories.reduce((sum, cat) => sum + cat.amount * 12, 0),
        activeSubscriptions: subscriptions.length
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}