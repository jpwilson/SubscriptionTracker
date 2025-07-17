import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// PUT /api/categories/[id] - Update a category
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

    // Check if category exists and belongs to user
    const { data: category, error: fetchError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Don't allow updating default categories
    if (category.is_default) {
      return NextResponse.json({ error: 'Cannot update default categories' }, { status: 400 })
    }

    // Convert camelCase to snake_case for database
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.color !== undefined) updateData.color = data.color
    if (data.icon !== undefined) updateData.icon = data.icon

    // Update the category
    const { data: updatedCategory, error: updateError } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating category:', updateError)
      return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
    }

    // Convert back to camelCase for frontend
    const formattedCategory = {
      id: updatedCategory.id,
      userId: updatedCategory.user_id,
      name: updatedCategory.name,
      color: updatedCategory.color,
      icon: updatedCategory.icon,
      isDefault: updatedCategory.is_default,
      parentId: updatedCategory.parent_id,
      createdAt: updatedCategory.created_at,
      updatedAt: updatedCategory.updated_at,
    }

    return NextResponse.json(formattedCategory)
  } catch (error) {
    console.error('Error in PUT /api/categories/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/categories/[id] - Delete a category
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

    // Check if category exists and belongs to user
    const { data: category, error: fetchError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Don't allow deleting default categories
    if (category.is_default) {
      return NextResponse.json({ error: 'Cannot delete default categories' }, { status: 400 })
    }

    // Update any subscriptions using this category to use "Other"
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ category: 'Other' })
      .eq('user_id', user.id)
      .eq('category', category.name)

    if (updateError) {
      console.error('Error updating subscriptions:', updateError)
      return NextResponse.json({ error: 'Failed to update subscriptions' }, { status: 500 })
    }

    // Delete the category
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Error deleting category:', deleteError)
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/categories/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}