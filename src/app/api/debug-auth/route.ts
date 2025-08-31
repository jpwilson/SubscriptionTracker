import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { origin, hostname } = new URL(request.url)
  
  const debugInfo = {
    currentOrigin: origin,
    hostname: hostname,
    expectedRedirectUri: `${origin}/auth/callback`,
    envVars: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***REDACTED***' : 'NOT SET',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT SET',
      VERCEL_URL: process.env.VERCEL_URL || 'NOT SET',
    },
    headers: {
      host: request.headers.get('host'),
      'x-forwarded-host': request.headers.get('x-forwarded-host'),
      'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
    }
  }
  
  return NextResponse.json(debugInfo, { status: 200 })
}