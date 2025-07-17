import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// GET /api/subscriptions/stats - Get subscription statistics
export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    
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

    // Calculate statistics
    let monthlyTotal = 0
    let yearlyTotal = 0
    let weeklyTotal = 0
    let quarterlyTotal = 0
    let activeTrials = 0
    let upcomingRenewals = 0
    
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    
    subscriptions?.forEach(sub => {
      if (sub.is_trial) activeTrials++
      
      const nextPaymentDate = new Date(sub.next_payment_date)
      if (nextPaymentDate > today && nextPaymentDate <= thirtyDaysFromNow) {
        upcomingRenewals++
      }
      
      switch (sub.billing_cycle) {
        case 'monthly':
          monthlyTotal += sub.amount
          break
        case 'yearly':
          yearlyTotal += sub.amount
          break
        case 'weekly':
          weeklyTotal += sub.amount
          break
        case 'quarterly':
          quarterlyTotal += sub.amount
          break
      }
    })
    
    // Calculate total monthly cost
    const totalMonthly = monthlyTotal + (weeklyTotal * 4.33) + (quarterlyTotal / 3) + (yearlyTotal / 12)
    const totalAnnual = totalMonthly * 12
    
    return NextResponse.json({
      monthlyTotal: totalMonthly,
      yearlyTotal: totalAnnual,
      upcomingRenewals,
      activeTrials,
      totalSubscriptions: subscriptions?.length || 0,
    })
  } catch (error) {
    console.error('Error calculating stats:', error)
    return NextResponse.json({ error: 'Failed to calculate statistics' }, { status: 500 })
  }
}