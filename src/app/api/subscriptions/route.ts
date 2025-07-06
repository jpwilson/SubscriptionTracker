import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/subscriptions - Get all subscriptions for the current user
export async function GET(request: NextRequest) {
  try {
    // For MVP, we'll use our test user ID
    // In production with Supabase, we'll get this from the auth session
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      orderBy: { nextPaymentDate: 'asc' },
    })
    
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

// POST /api/subscriptions - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    const data = await request.json()
    
    // Check if user exists, create if doesn't exist
    let user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      const email = userId === 'test-user-123' ? 'demo@subtracker.app' : 
                   userId === 'premium-user-123' ? 'pro@subtracker.app' : 
                   'user@subtracker.app'
      const tier = userId === 'premium-user-123' ? 'premium' : 'free'
      
      user = await prisma.user.create({
        data: {
          id: userId,
          email,
          password: 'demo123', // In production, this would be hashed
          tier,
        },
      })
    }
    
    const subscription = await prisma.subscription.create({
      data: {
        ...data,
        userId,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        nextPaymentDate: new Date(data.nextPaymentDate),
        trialEndDate: data.trialEndDate ? new Date(data.trialEndDate) : null,
        lastUsed: data.lastUsed ? new Date(data.lastUsed) : null,
      },
    })
    
    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}