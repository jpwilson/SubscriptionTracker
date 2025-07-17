import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// GET /api/subscriptions/[id] - Get a single subscription
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Fetch the subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (error || !subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Convert snake_case to camelCase for frontend compatibility
    const formattedSubscription = {
      id: subscription.id,
      userId: subscription.user_id,
      name: subscription.name,
      amount: subscription.amount,
      billingCycle: subscription.billing_cycle,
      category: subscription.category,
      startDate: subscription.start_date,
      endDate: subscription.end_date,
      nextPaymentDate: subscription.next_payment_date,
      isTrial: subscription.is_trial,
      trialEndDate: subscription.trial_end_date,
      reminderDaysBefore: subscription.reminder_days_before,
      notes: subscription.notes,
      status: subscription.status,
      createdAt: subscription.created_at,
      updatedAt: subscription.updated_at,
      color: subscription.color,
      icon: subscription.icon,
      url: subscription.url,
      lastUsed: subscription.last_used,
      usageFrequency: subscription.usage_frequency,
    }

    return NextResponse.json(formattedSubscription)
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
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const data = await request.json()
    
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get the user from the token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Convert camelCase to snake_case for database
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.amount !== undefined) updateData.amount = data.amount
    if (data.billingCycle !== undefined) updateData.billing_cycle = data.billingCycle
    if (data.category !== undefined) updateData.category = data.category
    if (data.startDate !== undefined) updateData.start_date = data.startDate
    if (data.endDate !== undefined) updateData.end_date = data.endDate
    if (data.nextPaymentDate !== undefined) updateData.next_payment_date = data.nextPaymentDate
    if (data.isTrial !== undefined) updateData.is_trial = data.isTrial
    if (data.trialEndDate !== undefined) updateData.trial_end_date = data.trialEndDate
    if (data.reminderDaysBefore !== undefined) updateData.reminder_days_before = data.reminderDaysBefore
    if (data.notes !== undefined) updateData.notes = data.notes
    if (data.status !== undefined) updateData.status = data.status
    if (data.color !== undefined) updateData.color = data.color
    if (data.icon !== undefined) updateData.icon = data.icon
    if (data.url !== undefined) updateData.url = data.url
    if (data.lastUsed !== undefined) updateData.last_used = data.lastUsed
    if (data.usageFrequency !== undefined) updateData.usage_frequency = data.usageFrequency

    // Update the subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error || !subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Convert back to camelCase for frontend
    const formattedSubscription = {
      id: subscription.id,
      userId: subscription.user_id,
      name: subscription.name,
      amount: subscription.amount,
      billingCycle: subscription.billing_cycle,
      category: subscription.category,
      startDate: subscription.start_date,
      endDate: subscription.end_date,
      nextPaymentDate: subscription.next_payment_date,
      isTrial: subscription.is_trial,
      trialEndDate: subscription.trial_end_date,
      reminderDaysBefore: subscription.reminder_days_before,
      notes: subscription.notes,
      status: subscription.status,
      createdAt: subscription.created_at,
      updatedAt: subscription.updated_at,
      color: subscription.color,
      icon: subscription.icon,
      url: subscription.url,
      lastUsed: subscription.last_used,
      usageFrequency: subscription.usage_frequency,
    }

    return NextResponse.json(formattedSubscription)
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

    // Delete the subscription
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Subscription deleted successfully' })
  } catch (error) {
    console.error('Error deleting subscription:', error)
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 })
  }
}