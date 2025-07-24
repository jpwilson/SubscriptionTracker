import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// GET /api/subscriptions/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'monthly'
    const timeScale = searchParams.get('timeScale') || '6months'
    const categoriesFilter = searchParams.get('categories')?.split(',').filter(Boolean) || []
    
    // Create Supabase client with the user's token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    )

    // Get the user from the authenticated client
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch active subscriptions for the user
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')

    if (error) {
      console.error('Error fetching subscriptions:', error)
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
    }

    // Calculate time series data
    const now = new Date()
    const timeSeriesData = []
    const categoryData: Record<string, number> = {}
    
    // Calculate category totals first (outside the period loop)
    subscriptions?.forEach(sub => {
      // Convert to monthly amount
      let monthlyAmount = 0
      switch (sub.billing_cycle) {
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
    let startFromDate: Date | null = null
    
    switch (timeScale) {
      case '3months':
        periodCount = 3
        break
      case '6months':
        periodCount = 6
        break
      case 'ytd':
        // Year to date - from Jan 1 of current year
        startFromDate = new Date(now.getFullYear(), 0, 1)
        // Calculate periods based on interval type
        if (period === 'daily') {
          // For daily YTD, show last 30 days instead of all days since Jan 1
          periodCount = 30
          startFromDate = new Date(now)
          startFromDate.setDate(startFromDate.getDate() - 29)
        } else if (period === 'quarterly') {
          // Quarters from start of year
          periodCount = Math.floor(now.getMonth() / 3) + 1
        } else {
          // Default to months
          periodCount = now.getMonth() + 1
        }
        break
      case '1year':
        periodCount = 12
        break
      case '5years':
        periodCount = 60
        break
    }

    // Determine if we should iterate forward (YTD) or backward (other ranges)
    const isYTD = timeScale === 'ytd'
    
    for (let idx = 0; idx < periodCount; idx++) {
      const i = isYTD ? idx : periodCount - 1 - idx
      let date = new Date(now)
      let periodKey = ''
      let periodStart = new Date(now)
      let periodEnd = new Date(now)
      
      // Handle YTD specially
      if (isYTD && startFromDate) {
        // For YTD, start from January and go forward
        date.setFullYear(startFromDate.getFullYear())
        date.setMonth(idx)
        date.setDate(1)
      }
      
      switch (period) {
        case 'daily':
          if (!isYTD) {
            date.setDate(date.getDate() - i)
          } else {
            // For YTD daily, start from startFromDate and add days
            date = new Date(startFromDate!)
            date.setDate(date.getDate() + idx)
          }
          periodStart = new Date(date)
          periodEnd = new Date(date)
          periodEnd.setDate(periodEnd.getDate() + 1)
          periodKey = date.toLocaleDateString()
          break
        case 'monthly':
          if (!isYTD) {
            date.setMonth(date.getMonth() - i)
          }
          periodStart = new Date(date.getFullYear(), date.getMonth(), 1)
          periodEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
          periodKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
          break
        case 'quarterly':
          if (!isYTD) {
            date.setMonth(date.getMonth() - (i * 3))
          } else {
            // For YTD quarterly, calculate which quarter we're in
            const quarterIndex = Math.floor(idx / 3)
            date.setMonth(quarterIndex * 3)
          }
          const quarter = Math.floor(date.getMonth() / 3) + 1
          periodStart = new Date(date.getFullYear(), (quarter - 1) * 3, 1)
          periodEnd = new Date(date.getFullYear(), quarter * 3, 0)
          periodKey = `Q${quarter} ${date.getFullYear()}`
          break
        case 'yearly':
          if (!isYTD) {
            date.setFullYear(date.getFullYear() - i)
          }
          periodStart = new Date(date.getFullYear(), 0, 1)
          periodEnd = new Date(date.getFullYear(), 11, 31)
          periodKey = date.getFullYear().toString()
          break
      }
      
      // Calculate spending for this period
      let periodTotal = 0
      const periodCategoryData: Record<string, number> = {}
      
      subscriptions?.forEach(sub => {
        // Apply category filter if specified
        if (categoriesFilter.length > 0 && !categoriesFilter.includes(sub.category)) {
          return
        }
        
        // Check if subscription was active during this period
        const subStartDate = new Date(sub.start_date)
        const subEndDate = sub.end_date ? new Date(sub.end_date) : new Date('2099-12-31')
        
        // Skip if subscription wasn't active during this period
        if (subStartDate > periodEnd || subEndDate < periodStart) {
          return
        }
        
        // Convert to monthly amount
        let monthlyAmount = 0
        switch (sub.billing_cycle) {
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
        
        // Calculate period amount
        let periodAmount = 0
        switch (period) {
          case 'daily':
            periodAmount = monthlyAmount / 30
            break
          case 'monthly':
            periodAmount = monthlyAmount
            break
          case 'quarterly':
            periodAmount = monthlyAmount * 3
            break
          case 'yearly':
            periodAmount = monthlyAmount * 12
            break
        }
        
        // Add to totals
        periodTotal += periodAmount
        
        // Track by category if we're filtering
        if (categoriesFilter.length > 0) {
          if (!periodCategoryData[sub.category]) {
            periodCategoryData[sub.category] = 0
          }
          periodCategoryData[sub.category] += periodAmount
        }
      })
      
      const dataPoint: any = {
        period: periodKey,
        amount: Math.round(periodTotal * 100) / 100
      }
      
      // Include category breakdown if filtering
      if (categoriesFilter.length > 0) {
        dataPoint.categoryData = Object.fromEntries(
          Object.entries(periodCategoryData).map(([cat, amt]) => [cat, Math.round(amt * 100) / 100])
        )
      }
      
      timeSeriesData.push(dataPoint)
    }
    
    // Format category data
    const categories = Object.entries(categoryData).map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100
    }))
    
    // Calculate filtered totals if categories are selected
    let filteredMonthlyTotal = categories.reduce((sum, cat) => sum + cat.amount, 0)
    let filteredActiveCount = subscriptions?.length || 0
    
    if (categoriesFilter.length > 0) {
      filteredMonthlyTotal = categories
        .filter(cat => categoriesFilter.includes(cat.category))
        .reduce((sum, cat) => sum + cat.amount, 0)
      filteredActiveCount = subscriptions?.filter(sub => 
        categoriesFilter.includes(sub.category)
      ).length || 0
    }
    
    return NextResponse.json({
      timeSeries: timeSeriesData,
      categories: categories.sort((a, b) => b.amount - a.amount),
      summary: {
        totalMonthly: filteredMonthlyTotal,
        totalYearly: filteredMonthlyTotal * 12,
        activeSubscriptions: filteredActiveCount
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}