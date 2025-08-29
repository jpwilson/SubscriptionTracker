'use client'

import Script from 'next/script'

interface TwitterConversionProps {
  eventType: 'signup' | 'purchase' | 'trial_start' | 'page_view'
  value?: number
  currency?: string
  email?: string
  status?: 'started' | 'completed'
  conversionId?: string
}

export function TwitterConversion({ 
  eventType, 
  value = null, 
  currency = 'USD',
  email = null,
  status = null,
  conversionId = null
}: TwitterConversionProps) {
  // Only run in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  // Map event types to more descriptive content
  const getContentType = () => {
    switch(eventType) {
      case 'signup':
        return 'user_registration'
      case 'purchase':
        return 'premium_upgrade'
      case 'trial_start':
        return 'trial_activation'
      case 'page_view':
        return 'landing_page_view'
      default:
        return eventType
    }
  }

  return (
    <Script
      id={`twitter-conversion-${eventType}`}
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Twitter conversion tracking event
          if (typeof twq !== 'undefined') {
            twq('event', 'tw-qf13i-qf13k', {
              value: ${value ? value : 'null'},
              currency: ${currency ? `'${currency}'` : 'null'},
              contents: [{
                content_type: '${getContentType()}',
                content_id: '${eventType}',
                content_name: '${eventType}_event',
                content_price: ${value ? value : 'null'},
                num_items: 1,
                content_group_id: 'subtracker'
              }],
              status: ${status ? `'${status}'` : 'null'},
              conversion_id: ${conversionId ? `'${conversionId}'` : 'null'},
              email_address: ${email ? `'${email}'` : 'null'},
              phone_number: null
            });
          }
        `
      }}
    />
  )
}