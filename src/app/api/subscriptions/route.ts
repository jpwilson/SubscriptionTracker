import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// GET /api/subscriptions - Get all subscriptions for the current user
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

    // Fetch subscriptions for the user
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('next_payment_date', { ascending: true })

    if (error) {
      console.error('Error fetching subscriptions:', error)
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
    }

    // Convert snake_case to camelCase for frontend compatibility
    const formattedSubscriptions = subscriptions?.map(sub => ({
      id: sub.id,
      userId: sub.user_id,
      name: sub.name,
      company: sub.company,
      product: sub.product,
      tier: sub.tier,
      amount: sub.amount,
      billingCycle: sub.billing_cycle,
      category: sub.category,
      startDate: sub.start_date,
      endDate: sub.end_date,
      nextPaymentDate: sub.next_payment_date,
      isTrial: sub.is_trial,
      trialEndDate: sub.trial_end_date,
      reminderDaysBefore: sub.reminder_days_before,
      notes: sub.notes,
      status: sub.status,
      createdAt: sub.created_at,
      updatedAt: sub.updated_at,
      color: sub.color,
      icon: sub.icon,
      url: sub.url,
      lastUsed: sub.last_used,
      usageFrequency: sub.usage_frequency,
    })) || []

    return NextResponse.json(formattedSubscriptions)
  } catch (error) {
    console.error('Error in GET /api/subscriptions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/subscriptions - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const data = await request.json()
    
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

    // Convert camelCase to snake_case for database
    const subscriptionData = {
      user_id: user.id,
      name: data.name,
      company: data.company || null,
      product: data.product || null,
      tier: data.tier || null,
      amount: data.amount,
      billing_cycle: data.billingCycle,
      category: data.category,
      start_date: data.startDate,
      end_date: data.endDate || null,
      next_payment_date: data.nextPaymentDate,
      is_trial: data.isTrial || false,
      trial_end_date: data.trialEndDate || null,
      reminder_days_before: data.reminderDaysBefore || 3,
      notes: data.notes || null,
      status: data.status || 'active',
      color: data.color || null,
      icon: data.icon || null,
      url: data.url || null,
      last_used: data.lastUsed || null,
      usage_frequency: data.usageFrequency || null,
    }

    // Create the subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single()

    if (error) {
      console.error('Error creating subscription:', error)
      // Check if it's an RLS policy violation
      if (error.code === '42501') {
        return NextResponse.json({ 
          error: 'Permission denied. Please make sure you are properly authenticated and try refreshing the page.' 
        }, { status: 403 })
      }
      return NextResponse.json({ 
        error: error.message || 'Failed to create subscription' 
      }, { status: 500 })
    }

    // Convert back to camelCase for frontend
    const formattedSubscription = {
      id: subscription.id,
      userId: subscription.user_id,
      name: subscription.name,
      company: subscription.company,
      product: subscription.product,
      tier: subscription.tier,
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
    console.error('Error in POST /api/subscriptions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}