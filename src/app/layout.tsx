import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
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
  title: "SubTracker - Smart Subscription Management",
  description: "Track, manage, and optimize your subscriptions with intelligent insights",
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
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}