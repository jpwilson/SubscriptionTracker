import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    
    // Get user to check tier, create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { id: userId },
    })
    
    // If user doesn't exist, create a default free user
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
    
    let categories = await prisma.category.findMany({
      where: { 
        userId,
      },
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' }
      ],
    })
    
    // If user has no categories, create the defaults
    if (categories.length === 0) {
      const defaultCategories = DEFAULT_CATEGORIES.map(cat => ({
        ...cat,
        userId,
        isDefault: true,
        parentId: null,
      }))
      
      await prisma.category.createMany({
        data: defaultCategories,
      })
      
      categories = await prisma.category.findMany({
        where: { 
          userId,
        },
        orderBy: [
          { isDefault: 'desc' },
          { name: 'asc' }
        ],
      })
    }
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'test-user-123'
    const data = await request.json()
    
    // Get user to check tier
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    
    // Check if user can create custom categories
    if (user?.tier !== 'premium') {
      return NextResponse.json({ 
        error: 'Custom categories are a premium feature. Upgrade to create your own categories!' 
      }, { status: 403 })
    }
    
    // Check if this is a subcategory
    if (data.parentId) {
      // Verify parent category exists and belongs to user
      const parent = await prisma.category.findFirst({
        where: {
          id: data.parentId,
          userId,
        },
      })
      
      if (!parent) {
        return NextResponse.json({ error: 'Parent category not found' }, { status: 404 })
      }
    }
    
    // Check if category name already exists for this user at this level
    const existing = await prisma.category.findFirst({
      where: {
        userId,
        name: data.name,
        parentId: data.parentId || null,
      },
    })
    
    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
    }
    
    const category = await prisma.category.create({
      data: {
        ...data,
        userId,
        isDefault: false,
      },
      include: {
        subcategories: true,
      },
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}