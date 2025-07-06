import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    
    // Check if category exists and belongs to user
    const category = await prisma.category.findFirst({
      where: {
        id: params.id,
        userId,
      },
    })
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    
    // Don't allow deleting default categories
    if (category.isDefault) {
      return NextResponse.json({ error: 'Cannot delete default categories' }, { status: 400 })
    }
    
    // Update any subscriptions using this category to use "Other"
    await prisma.subscription.updateMany({
      where: {
        userId,
        category: category.name,
      },
      data: {
        category: 'Other',
      },
    })
    
    // Delete the category
    await prisma.category.delete({
      where: { id: params.id },
    })
    
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}