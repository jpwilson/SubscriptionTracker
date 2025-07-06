'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  tier: 'free' | 'premium'
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

// Test accounts - only these will work
const TEST_ACCOUNTS = [
  {
    email: 'demo@subtracker.app',
    password: 'demo123',
    userId: 'test-user-123',
    tier: 'free' as const
  },
  {
    email: 'pro@subtracker.app',
    password: 'pro123',
    userId: 'premium-user-123',
    tier: 'premium' as const
  }
]

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('mockUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Check against both test accounts
    const account = TEST_ACCOUNTS.find(acc => acc.email === email && acc.password === password)
    
    if (!account) {
      throw new Error('Invalid credentials. Use demo@subtracker.app / demo123 or pro@subtracker.app / pro123')
    }
    
    const mockUser = { 
      id: account.userId, 
      email: account.email, 
      tier: account.tier 
    }
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
  }

  const signUp = async (email: string, password: string) => {
    // For demo, sign up is disabled
    throw new Error('Sign up disabled for demo. Use demo@subtracker.app / demo123 or pro@subtracker.app / pro123')
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('mockUser')
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)