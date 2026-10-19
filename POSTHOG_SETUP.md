# PostHog Analytics Setup Guide

SubTracker uses PostHog for privacy-focused product analytics. Analytics are **completely optional** - the app works perfectly without them.

## Quick Start

### 1. Get PostHog Credentials

1. Go to [PostHog Cloud (US)](https://app.posthog.com/signup)
2. Create a free account (or sign in)
3. Create a new project or use an existing one
4. Navigate to **Project Settings** → **Project API Key**
5. Copy your Project API Key (starts with `phc_`)

### 2. Configure Environment Variables

Add to your `.env.local` file:

```bash
# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Important**: If these variables are not set, analytics will be disabled and the app will work normally.

### 3. Deploy to Production

For Vercel, Netlify, or other hosting platforms:

1. Go to your project settings
2. Add environment variables:
   - `NEXT_PUBLIC_POSTHOG_KEY` = your PostHog project API key
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com`
3. Redeploy your application

## What We Track

SubTracker tracks user behavior to understand product usage and improve the experience. **We never track PII or financial details.**

### Events Tracked

| Event | Description | Properties |
|-------|-------------|------------|
| `$pageview` | Automatic page views | URL, referrer |
| `sign_up_started` | User starts sign-up flow | auth_method (google/email) |
| `sign_up_completed` | User completes sign-up | auth_method |
| `sign_in_completed` | User signs in | auth_method |
| `sign_out` | User signs out | - |
| `subscription_added` | User adds a subscription | billing_cycle, category, is_trial |
| `checkout_started` | User starts upgrade checkout | plan, plan_name |
| `payment_success` | User completes payment | - |

### What We DON'T Track

- ❌ Email addresses
- ❌ Names or personal information
- ❌ Subscription amounts or financial data
- ❌ Credit card information
- ❌ IP addresses (can be disabled in PostHog settings)

### User Identification

We identify users using only their Supabase user ID (a UUID), which is already anonymous. This allows us to:
- Track user journeys without knowing who they are
- Calculate conversion rates
- Understand feature adoption
- Debug issues

## Privacy Configuration

### Disable IP Tracking (Recommended)

1. Go to your PostHog project settings
2. Navigate to **Data Management** → **Privacy**
3. Enable **Mask IP addresses**

### GDPR Compliance

PostHog is GDPR-compliant. To enable:

1. In PostHog, go to **Project Settings** → **Privacy**
2. Enable **"Respect Do Not Track" browser setting**
3. Add a cookie consent banner to your site if required

## Viewing Analytics

1. Log into [PostHog](https://app.posthog.com)
2. Select your project
3. View dashboards:
   - **Insights**: Custom analytics queries
   - **Funnels**: Sign-up → Subscription → Upgrade flows
   - **Retention**: How often users return
   - **User Paths**: Where users go in the app

### Recommended Dashboards

Create these insights in PostHog:

1. **Sign-up Conversion**: `sign_up_started` → `sign_up_completed`
2. **Free to Paid**: `sign_in_completed` → `payment_success`
3. **Subscription Activity**: Count of `subscription_added` events
4. **Referrer Sources**: Pageview referrers (including chatgpt.com, perplexity.ai)

## Troubleshooting

### Analytics Not Working

1. **Check environment variables**: Ensure `NEXT_PUBLIC_POSTHOG_KEY` is set
2. **Check browser console**: Look for PostHog errors
3. **Verify PostHog key**: Make sure it starts with `phc_`
4. **Clear cache**: PostHog client is cached, try clearing browser cache
5. **Check ad blockers**: Some ad blockers block analytics

### Testing Analytics Locally

1. Set environment variables in `.env.local`
2. Restart your dev server: `npm run dev`
3. Open browser console
4. Perform actions (sign in, add subscription)
5. Check PostHog dashboard (events appear within ~30 seconds)

### Debug Mode

To enable debug logging (development only):

In `/src/providers/posthog-provider.tsx`, change:
```typescript
posthog.debug(false) // Change to true
```

## Cost & Limits

PostHog Cloud Free Tier includes:
- **1 million events/month** (plenty for most startups)
- **Unlimited projects**
- **1 year data retention**

Paid plans start at $0.00031/event after the free tier.

## Support

- PostHog Docs: https://posthog.com/docs
- PostHog Community: https://posthog.com/community
- SubTracker Support: support@subtracker.app

## Security Notes

- PostHog API keys are **public** (safe to expose in frontend)
- No sensitive data is sent to PostHog
- All data is encrypted in transit (HTTPS)
- Data stored in US region (us.i.posthog.com)
- Can self-host PostHog if needed for compliance

---

**Remember**: Analytics are optional. The app works perfectly without PostHog configured.
