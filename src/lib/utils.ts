import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: string | Date) {
  const dateObj = typeof date === 'string' ? parseLocalDate(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj)
}

export function getDaysUntil(date: string | Date) {
  const today = new Date()
  const target = typeof date === 'string' ? parseLocalDate(date) : date
  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function getMonthlyEquivalent(amount: number, billingCycle: string): number {
  switch (billingCycle) {
    case 'weekly':
      return amount * 4.33 // average weeks per month
    case 'monthly':
      return amount
    case 'quarterly':
      return amount / 3
    case 'yearly':
      return amount / 12
    default:
      return 0
  }
}

export function formatDateForInput(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function parseLocalDate(dateString: string): Date {
  // Parse date string as local date, not UTC
  const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10))
  return new Date(year, month - 1, day)
}