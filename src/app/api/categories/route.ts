import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Default categories for new users - comprehensive list
const DEFAULT_CATEGORIES = [
  { name: 'Entertainment', color: '#8B5CF6', icon: '🎬' },
  { name: 'Streaming', color: '#EC4899', icon: '📺' },
  { name: 'Music', color: '#F59E0B', icon: '🎵' },
  { name: 'Gaming', color: '#10B981', icon: '🎮' },
  { name: 'Software', color: '#3B82F6', icon: '💻' },
  { name: 'Productivity', color: '#14B8A6', icon: '📊' },
  { name: 'Cloud Storage', color: '#06B6D4', icon: '☁️' },
  { name: 'AI Tools', color: '#8B5CF6', icon: '🤖' },
  { name: 'Finance', color: '#10B981', icon: '💰' },
  { name: 'Insurance', color: '#F97316', icon: '🛡️' },
  { name: 'Health & Fitness', color: '#EF4444', icon: '❤️' },
  { name: 'Education', color: '#F59E0B', icon: '📚' },
  { name: 'Food & Dining', color: '#EC4899', icon: '🍔' },
  { name: 'Transportation', color: '#6366F1', icon: '🚗' },
  { name: 'Travel', color: '#0EA5E9', icon: '✈️' },
  { name: 'Shopping', color: '#14B8A6', icon: '🛍️' },
  { name: 'News & Media', color: '#9333EA', icon: '📰' },
  { name: 'Communication', color: '#F43F5E', icon: '💬' },
  { name: 'Home & Utilities', color: '#84CC16', icon: '🏠' },
  { name: 'Other', color: '#6B7280', icon: '📦' },
]

// GET /api/categories - Get all categories for the current user
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

    // Fetch categories for the user
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }

    // If user has no categories, create the defaults
    if (!categories || categories.length === 0) {
      const defaultCategories = DEFAULT_CATEGORIES.map(cat => ({
        ...cat,
        user_id: user.id,
        is_default: true,
        parent_id: null,
      }))
      
      const { error: createError } = await supabase
        .from('categories')
        .insert(defaultCategories)

      if (createError) {
        console.error('Error creating default categories:', createError)
        return NextResponse.json({ error: 'Failed to create default categories' }, { status: 500 })
      }

      // Fetch the newly created categories
      const { data: newCategories, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('name', { ascending: true })

      if (fetchError) {
        console.error('Error fetching new categories:', fetchError)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
      }

      // Convert snake_case to camelCase for frontend compatibility
      const formattedCategories = newCategories?.map(cat => ({
        id: cat.id,
        userId: cat.user_id,
        name: cat.name,
        color: cat.color,
        icon: cat.icon,
        isDefault: cat.is_default,
        parentId: cat.parent_id,
        createdAt: cat.created_at,
        updatedAt: cat.updated_at,
      })) || []

      return NextResponse.json(formattedCategories)
    }

    // Convert snake_case to camelCase for frontend compatibility
    const formattedCategories = categories.map(cat => ({
      id: cat.id,
      userId: cat.user_id,
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      isDefault: cat.is_default,
      parentId: cat.parent_id,
      createdAt: cat.created_at,
      updatedAt: cat.updated_at,
    }))

    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error('Error in GET /api/categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
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

    // Get user metadata to check tier
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('tier')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      // If user doesn't exist in users table, assume free tier
      const tier = 'free'
      if (tier !== 'premium') {
        return NextResponse.json({ 
          error: 'Custom categories are a premium feature. Upgrade to create your own categories!' 
        }, { status: 403 })
      }
    } else if (userData.tier !== 'premium') {
      return NextResponse.json({ 
        error: 'Custom categories are a premium feature. Upgrade to create your own categories!' 
      }, { status: 403 })
    }

    // Check if this is a subcategory
    if (data.parentId) {
      // Verify parent category exists and belongs to user
      const { data: parent, error: parentError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', data.parentId)
        .eq('user_id', user.id)
        .single()

      if (parentError || !parent) {
        return NextResponse.json({ error: 'Parent category not found' }, { status: 404 })
      }
    }

    // Check if category name already exists for this user at this level
    const { data: existing, error: existingError } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .eq('name', data.name)
      .eq('parent_id', data.parentId || null)
      .single()

    if (!existingError && existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
    }

    // Convert camelCase to snake_case for database
    const categoryData = {
      user_id: user.id,
      name: data.name,
      color: data.color,
      icon: data.icon,
      is_default: false,
      parent_id: data.parentId || null,
    }

    // Create the category
    const { data: category, error: createError } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single()

    if (createError) {
      console.error('Error creating category:', createError)
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }

    // Convert back to camelCase for frontend
    const formattedCategory = {
      id: category.id,
      userId: category.user_id,
      name: category.name,
      color: category.color,
      icon: category.icon,
      isDefault: category.is_default,
      parentId: category.parent_id,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
    }

    return NextResponse.json(formattedCategory, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}