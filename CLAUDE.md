# SubTracker Project Context

## Development Guidelines

### IMPORTANT: Development Server
- **NEVER run `npm run dev` yourself** - Always ask the user to run it
- If you need to test something, ask: "Please run `npm run dev` so we can test the changes"
- The user manages the development server, not the assistant

## Business Goals & Priorities

### Primary Objective: Make Money 💰
This MVP is designed to generate revenue through a freemium SaaS model. Every decision should be evaluated against its impact on conversions and revenue.

### User Acquisition Strategy
1. **Phase 1 (Current)**: Get users - Focus on free tier adoption
2. **Phase 2**: Convert to paid - Once we have users, optimize for premium upgrades ($5/month)

### Conversion Optimization Guidelines
- **Always consider**: Will this feature/design increase or decrease conversions?
- **Prioritize**: Features that drive sign-ups and upgrades
- **Avoid**: Anything that creates friction in the sign-up or upgrade process
- **Test**: A/B test major changes when we have enough users

### Key Metrics to Track
- Free user sign-ups
- Free to paid conversion rate
- Churn rate
- Monthly Recurring Revenue (MRR)
- Customer Lifetime Value (CLV)

### Design Principles
- **Free tier must be valuable** - Users need to see immediate value
- **Premium features must be compelling** - Clear reasons to upgrade
- **Reduce friction** - Easy sign-up, no credit card for free tier
- **Build trust** - Transparent pricing, easy cancellation

### Feature Development Priority
1. Features that help acquire free users
2. Features that showcase premium value
3. Features that reduce churn
4. Features that increase engagement

### Messaging Strategy
- Lead with value, not features
- Emphasize savings and control
- Use social proof when available
- Create urgency (wasted money stats)
- Always have clear CTAs

## Technical Context

### Current Stack
- Next.js 14 with TypeScript
- SQLite for local development (Prisma ORM)
- Tailwind CSS with custom neumorphic design
- Mock authentication with two demo accounts
- Ready for Supabase migration for production

### Demo Accounts
- **Free**: demo@subtracker.app / demo123
- **Premium**: pro@subtracker.app / pro123

### Key Features Implemented
- Subscription tracking and management
- Categories (custom categories are premium-only)
- Analytics with time period filters
- Modern UI with purple/pink/black theme
- Freemium model with feature gating
- Compelling landing page
- Pricing section with clear tiers

### Future Monetization Opportunities
- Annual billing discount (e.g., $50/year instead of $60)
- Team/family plans
- API access for power users
- White-label solutions for businesses
- Affiliate partnerships with subscription services