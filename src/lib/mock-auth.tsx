'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

// Test credentials - only these will work
const TEST_EMAIL = 'demo@subtracker.app'
const TEST_PASSWORD = 'demo123'
const TEST_USER_ID = 'test-user-123'

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
    // Only accept the test credentials
    if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
      throw new Error('Invalid credentials. Use demo@subtracker.app / demo123')
    }
    
    const mockUser = { id: TEST_USER_ID, email: TEST_EMAIL }
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
  }

  const signUp = async (email: string, password: string) => {
    // For demo, sign up is the same as sign in
    throw new Error('Sign up disabled for demo. Use demo@subtracker.app / demo123')
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