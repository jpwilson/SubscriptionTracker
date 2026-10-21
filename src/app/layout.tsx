import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { PostHogPageViewWrapper } from "@/components/posthog-pageview"
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"
import { JsonLd } from "@/components/json-ld"
import { organizationSchema, webApplicationSchema, websiteSchema } from "@/lib/seo"
import { SITE_META_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site"

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
  // metadataBase makes every relative canonical / OG URL resolve against the
  // production host. Change NEXT_PUBLIC_SITE_URL to move domains.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SubTracker — Free Subscription Tracker App",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_META_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "SubTracker — Free Subscription Tracker App",
    description: SITE_META_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "SubTracker — subscription tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SubTracker — Free Subscription Tracker App",
    description: SITE_META_DESCRIPTION,
    images: [absoluteUrl("/og-image.png")],
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
      { url: '/favicon.ico', sizes: 'any' },
    ],
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
        
        {/*
          Site-wide structured data. Organization + WebSite + WebApplication,
          mirroring what the pages actually say. No aggregateRating: there are
          no published reviews to aggregate. Page-specific schema (FAQPage,
          BreadcrumbList, Article) lives on the individual pages.
        */}
        <JsonLd data={[organizationSchema(), websiteSchema(), webApplicationSchema()]} />

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