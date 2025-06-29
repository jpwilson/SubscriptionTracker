import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { subscriptionApi, type Subscription, type SubscriptionStats } from '@/lib/api-client'
import { useToast } from '@/components/ui/use-toast'

// Hook to fetch all subscriptions
export function useSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: subscriptionApi.getAll,
  })
}

// Hook to fetch subscription stats
export function useSubscriptionStats() {
  return useQuery({
    queryKey: ['subscription-stats'],
    queryFn: subscriptionApi.getStats,
  })
}

// Hook to create a subscription
export function useCreateSubscription() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: subscriptionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      queryClient.invalidateQueries({ queryKey: ['subscription-stats'] })
      toast({
        title: 'Success',
        description: 'Subscription added successfully',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add subscription',
        variant: 'destructive',
      })
    },
  })
}

// Hook to update a subscription
export function useUpdateSubscription() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Subscription> }) =>
      subscriptionApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      queryClient.invalidateQueries({ queryKey: ['subscription-stats'] })
      toast({
        title: 'Success',
        description: 'Subscription updated successfully',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update subscription',
        variant: 'destructive',
      })
    },
  })
}

// Hook to delete a subscription
export function useDeleteSubscription() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: subscriptionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      queryClient.invalidateQueries({ queryKey: ['subscription-stats'] })
      toast({
        title: 'Success',
        description: 'Subscription deleted successfully',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete subscription',
        variant: 'destructive',
      })
    },
  })
}