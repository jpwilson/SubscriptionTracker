import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { PostHogPageViewWrapper } from "@/components/posthog-pageview"
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter' 
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: "SubTracker - Smart Subscription Management Platform",
  description: "Track, manage, and optimize your subscriptions. Find forgotten subscriptions, get price alerts, and take control of recurring payments. Free forever plan. No credit card required.",
  keywords: "subscription tracker, subscription management, cancel subscriptions, subscription savings, recurring payments, subscription app, manage subscriptions",
  authors: [{ name: "SubTracker Team" }],
  openGraph: {
    title: "SubTracker - Stop Wasting Money on Forgotten Subscriptions",
    description: "Free subscription tracking platform. Find forgotten subscriptions and optimize your spending with smart alerts and analytics.",
    url: "https://subtracker.app",
    siteName: "SubTracker",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubTracker - Subscription Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubTracker - Smart Subscription Management",
    description: "Save money by tracking and optimizing all your subscriptions in one place. Free forever plan available.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="chunk-error-handler" strategy="beforeInteractive">
          {`
            // Handle chunk loading errors
            window.addEventListener('error', function(e) {
              if (e.message && e.message.includes('Loading chunk')) {
                console.warn('Chunk loading error detected, reloading page...');
                window.location.reload();
              }
            });
          `}
        </Script>
        
        {/* JSON-LD Structured Data for AI/SEO */}
        <Script id="json-ld-software" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SubTracker",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "description": "Smart subscription management platform that helps you track, manage, and optimize all your recurring subscriptions. Find forgotten subscriptions and save money.",
            "url": "https://subtracker.app",
            "offers": [
              {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "name": "Free Plan",
                "description": "Unlimited subscriptions, basic analytics, payment reminders"
              },
              {
                "@type": "Offer",
                "price": "5.00",
                "priceCurrency": "USD",
                "name": "Premium Plan",
                "description": "Custom categories, advanced analytics, auto-import, priority support"
              },
              {
                "@type": "Offer",
                "price": "200.00",
                "priceCurrency": "USD",
                "name": "Enterprise Plan",
                "description": "Multi-user teams, API access, dedicated support, expense audits"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "1247"
            },
            "featureList": [
              "Unlimited subscription tracking",
              "Smart payment reminders",
              "Trial ending alerts",
              "Price increase notifications",
              "Category organization",
              "Monthly and yearly analytics",
              "Export data",
              "Custom categories (Premium)",
              "Advanced analytics (Premium)",
              "Family account management (Premium)"
            ]
          })}
        </Script>
        
        <Script id="json-ld-organization" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SubTracker",
            "url": "https://subtracker.app",
            "logo": "https://subtracker.app/logo.png",
            "description": "Subscription management platform helping users save money on recurring payments",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "support@subtracker.app",
              "contactType": "Customer Support"
            },
            "sameAs": [
              "https://twitter.com/subtracker"
            ]
          })}
        </Script>
        
        <Script id="json-ld-faq" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is SubTracker?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SubTracker is a subscription management platform that helps you track all your recurring subscriptions, get alerts for upcoming payments and price increases, and save money by identifying unused or duplicate subscriptions."
                }
              },
              {
                "@type": "Question",
                "name": "Is SubTracker free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SubTracker offers a free forever plan that includes unlimited subscriptions, basic analytics, payment reminders, and 20 categories. Premium plans start at $5/month for advanced features."
                }
              },
              {
                "@type": "Question",
                "name": "How much money can I save with SubTracker?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SubTracker helps you save money by identifying forgotten subscriptions, finding opportunities to downgrade unused premium plans, and optimizing your subscription spending. Actual savings vary based on individual subscription habits."
                }
              },
              {
                "@type": "Question",
                "name": "Is my financial data secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SubTracker uses bank-level encryption. Your subscription data never leaves your control, and we have no access to your payment methods or sensitive financial information."
                }
              },
              {
                "@type": "Question",
                "name": "How does SubTracker compare to Rocket Money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SubTracker focuses specifically on subscription management with detailed category tracking and custom alerts, while Rocket Money is a broader personal finance tool. SubTracker offers lifetime plans and is more affordable for dedicated subscription tracking."
                }
              }
            ]
          })}
        </Script>
        
        {/* Twitter conversion tracking base code */}
        <Script id="twitter-tracking" strategy="afterInteractive">
          {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','qf13i');
          `}
        </Script>
      </head>
      <body className={`${plusJakarta.className} ${inter.variable} ${plusJakarta.variable} custom-scrollbar`}>
        <Providers>
          <PostHogPageViewWrapper />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}