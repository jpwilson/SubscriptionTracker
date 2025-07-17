import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

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

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
  }
}

export const categoryApi = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    const headers = await getAuthHeaders()
    const response = await fetch('/api/categories', {
      headers,
    })
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
  },

  // Create a new category
  async create(category: Omit<Category, 'id' | 'isDefault' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const headers = await getAuthHeaders()
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers,
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
    const headers = await getAuthHeaders()
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers,
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