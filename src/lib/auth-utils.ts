// Shared auth utilities for API calls
// Get user ID from localStorage (matches what's stored by mock-auth)
// In production, this will come from Supabase Auth
export const getUserId = () => {
  if (typeof window === 'undefined') {
    // Server-side: return fallback
    return 'test-user-123'
  }
  
  const savedUser = localStorage.getItem('mockUser')
  if (savedUser) {
    const user = JSON.parse(savedUser)
    return user.id
  }
  return 'test-user-123' // fallback
}