import posthog from 'posthog-js'

// Check if PostHog is initialized
export const isPostHogInitialized = () => {
  return typeof window !== 'undefined' && posthog && posthog.__loaded
}

// Track an event (safe wrapper that handles uninitialized PostHog)
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!isPostHogInitialized()) {
    return
  }
  
  try {
    posthog.capture(eventName, properties)
  } catch (error) {
    // Silently fail - analytics should never break the app
    console.debug('PostHog tracking failed:', error)
  }
}

// Identify a user (use only non-PII identifiers)
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (!isPostHogInitialized()) {
    return
  }
  
  try {
    posthog.identify(userId, traits)
  } catch (error) {
    console.debug('PostHog identify failed:', error)
  }
}

// Reset user identity (on logout)
export const resetUser = () => {
  if (!isPostHogInitialized()) {
    return
  }
  
  try {
    posthog.reset()
  } catch (error) {
    console.debug('PostHog reset failed:', error)
  }
}

// Event constants
export const EVENTS = {
  // Authentication
  SIGN_UP_STARTED: 'sign_up_started',
  SIGN_UP_COMPLETED: 'sign_up_completed',
  SIGN_IN_COMPLETED: 'sign_in_completed',
  SIGN_OUT: 'sign_out',
  
  // Subscriptions
  SUBSCRIPTION_ADDED: 'subscription_added',
  SUBSCRIPTION_EDITED: 'subscription_edited',
  SUBSCRIPTION_DELETED: 'subscription_deleted',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  
  // Payments & Upgrades
  UPGRADE_CLICKED: 'upgrade_clicked',
  CHECKOUT_STARTED: 'checkout_started',
  PAYMENT_SUCCESS: 'payment_success',
  
  // Features
  REMINDER_TOGGLED: 'reminder_toggled',
  CATEGORY_CREATED: 'category_created',
  ANALYTICS_VIEWED: 'analytics_viewed',
} as const
