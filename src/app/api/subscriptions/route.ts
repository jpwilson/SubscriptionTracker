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
    
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: 'User not found. Please run npm run reset-db' }, { status: 404 })
    }
    
    const subscription = await prisma.subscription.create({
      data: {
        ...data,
        userId,
        startDate: new Date(data.startDate),
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