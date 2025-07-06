import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { getUserId } from '@/lib/auth-utils'

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  isDefault: boolean
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export const categoryApi = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    const response = await fetch('/api/categories', {
      headers: {
        'x-user-id': getUserId(),
      },
    })
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
  },

  // Create a new category
  async create(category: Omit<Category, 'id' | 'isDefault' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': getUserId(),
      },
      body: JSON.stringify(category),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create category')
    }
    return response.json()
  },

  // Delete a category
  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': getUserId(),
      },
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete category')
    }
  },
}

// Hook to fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  })
}

// Hook to create a category
export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({
        title: 'Success',
        description: 'Category created successfully',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create category',
        variant: 'destructive',
      })
    },
  })
}

// Hook to delete a category
export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete category',
        variant: 'destructive',
      })
    },
  })
}