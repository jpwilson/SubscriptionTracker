export interface Subscription {
  id: string
  name: string
  amount: number
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly' | 'one-off'
  category: string
  startDate: string
  nextPaymentDate: string
  isTrial: boolean
  status: 'active' | 'cancelled' | 'paused' | 'expired'
  color?: string
  icon?: string
  url?: string
  notes?: string
}

export class MockDataStore {
  private static STORAGE_KEY = 'subtracker_subscriptions'

  static getSubscriptions(): Subscription[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  static saveSubscription(subscription: Omit<Subscription, 'id'>): Subscription {
    const subscriptions = this.getSubscriptions()
    const newSubscription = {
      ...subscription,
      id: Date.now().toString(),
    }
    subscriptions.push(newSubscription)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscriptions))
    return newSubscription
  }

  static updateSubscription(id: string, updates: Partial<Subscription>): Subscription | null {
    const subscriptions = this.getSubscriptions()
    const index = subscriptions.findIndex(sub => sub.id === id)
    if (index === -1) return null
    
    subscriptions[index] = { ...subscriptions[index], ...updates }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscriptions))
    return subscriptions[index]
  }

  static deleteSubscription(id: string): boolean {
    const subscriptions = this.getSubscriptions()
    const filtered = subscriptions.filter(sub => sub.id !== id)
    if (filtered.length === subscriptions.length) return false
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    return true
  }

  static getStats() {
    const subscriptions = this.getSubscriptions()
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active')
    
    const monthlyTotal = activeSubscriptions
      .filter(s => s.billingCycle === 'monthly')
      .reduce((sum, s) => sum + s.amount, 0)
    
    const yearlyTotal = activeSubscriptions
      .filter(s => s.billingCycle === 'yearly')
      .reduce((sum, s) => sum + s.amount, 0)
    
    const weeklyTotal = activeSubscriptions
      .filter(s => s.billingCycle === 'weekly')
      .reduce((sum, s) => sum + s.amount, 0)
    
    const quarterlyTotal = activeSubscriptions
      .filter(s => s.billingCycle === 'quarterly')
      .reduce((sum, s) => sum + s.amount, 0)
    
    const totalMonthly = monthlyTotal + (weeklyTotal * 4.33) + (quarterlyTotal / 3) + (yearlyTotal / 12)
    const totalAnnual = totalMonthly * 12
    
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    const upcomingRenewals = activeSubscriptions.filter(s => {
      const nextPayment = new Date(s.nextPaymentDate)
      return nextPayment > today && nextPayment <= thirtyDaysFromNow
    }).length
    
    const activeTrials = activeSubscriptions.filter(s => s.isTrial).length
    
    return {
      monthlyTotal: totalMonthly,
      yearlyTotal: totalAnnual,
      upcomingRenewals,
      activeTrials,
      totalSubscriptions: activeSubscriptions.length
    }
  }
}