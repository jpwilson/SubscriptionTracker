import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/subscriptions/[id] - Get a single subscription
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user'
    
    const subscription = await prisma.subscription.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })
    
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }
    
    return NextResponse.json(subscription)
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 })
  }
}

// PUT /api/subscriptions/[id] - Update a subscription
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user'
    const data = await request.json()
    
    // Convert date strings to Date objects if present
    const updateData: any = { ...data }
    if (data.startDate) updateData.startDate = new Date(data.startDate)
    if (data.nextPaymentDate) updateData.nextPaymentDate = new Date(data.nextPaymentDate)
    if (data.trialEndDate) updateData.trialEndDate = new Date(data.trialEndDate)
    if (data.lastUsed) updateData.lastUsed = new Date(data.lastUsed)
    
    const subscription = await prisma.subscription.updateMany({
      where: {
        id: params.id,
        userId,
      },
      data: updateData,
    })
    
    if (subscription.count === 0) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }
    
    // Return the updated subscription
    const updated = await prisma.subscription.findUnique({ where: { id: params.id } })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating subscription:', error)
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
  }
}

// DELETE /api/subscriptions/[id] - Delete a subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user'
    
    const subscription = await prisma.subscription.deleteMany({
      where: {
        id: params.id,
        userId,
      },
    })
    
    if (subscription.count === 0) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Subscription deleted successfully' })
  } catch (error) {
    console.error('Error deleting subscription:', error)
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 })
  }
}