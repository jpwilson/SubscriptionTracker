import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/subscriptions/stats - Get subscription statistics
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    
    const subscriptions = await prisma.subscription.findMany({
      where: { 
        userId,
        status: 'active'
      },
    })
    
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
    
    subscriptions.forEach(sub => {
      if (sub.isTrial) activeTrials++
      
      if (sub.nextPaymentDate > today && sub.nextPaymentDate <= thirtyDaysFromNow) {
        upcomingRenewals++
      }
      
      switch (sub.billingCycle) {
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
      totalSubscriptions: subscriptions.length,
    })
  } catch (error) {
    console.error('Error calculating stats:', error)
    return NextResponse.json({ error: 'Failed to calculate statistics' }, { status: 500 })
  }
}