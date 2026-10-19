# SubTracker - Intelligent Subscription Management Platform

Take control of your subscriptions and stop wasting money on forgotten services. SubTracker helps you track, manage, and optimize all your subscriptions in one beautiful, intuitive dashboard.

![SubTracker](https://img.shields.io/badge/version-1.0.0-purple.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

### Free Forever
- ✅ **Unlimited Subscriptions** - Track as many as you need
- 📊 **Analytics & Insights** - See where your money goes
- 🔔 **Smart Reminders** - Never miss a payment or trial ending
- 📈 **Cost Overview** - Monthly and yearly spending breakdown
- 🏷️ **20 Categories** - Organize your subscriptions
- 🌙 **Dark Mode** - Easy on the eyes
- 📥 **Export Data** - Your data, always accessible

### Premium Features ($5/month)
- 🎨 **Custom Categories** - Create your own categories and subcategories
- 📊 **Advanced Analytics** - Deep insights and projections
- 🔮 **Cost Projections** - See future spending trends
- 🎯 **Usage Tracking** - Monitor actual usage vs. cost
- ⚡ **Priority Support** - Get help when you need it
- 🆕 **Early Access** - Be first to try new features

### Enterprise ($200/month)
- 👥 **Multi-user Teams** - Manage company subscriptions
- 📋 **Expense Audits** - Monthly audit reports
- 🔄 **Approval Workflows** - Control spending
- 🏢 **Department Budgeting** - Track by department
- 🔌 **API Access** - Integrate with your tools
- 🤝 **Dedicated Support** - Your success manager

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: SQLite (development), PostgreSQL/Supabase (production)
- **ORM**: Prisma
- **State Management**: React Query, Zustand
- **UI Components**: Radix UI, Framer Motion
- **Charts**: Recharts
- **Analytics**: PostHog (optional, privacy-focused)
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SubTracker.git
   cd SubTracker/substracker-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Accounts
Try SubTracker with our demo accounts:
- **Free Account**: `demo@subtracker.app` / `demo123`
- **Premium Account**: `pro@subtracker.app` / `pro123`

## 📦 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Environment Variables**
   For production with Supabase, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   DATABASE_URL=your-database-url
   ```
   
   **Optional: Analytics**
   To enable PostHog analytics (completely optional):
   ```
   NEXT_PUBLIC_POSTHOG_KEY=your-posthog-api-key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```
   See [POSTHOG_SETUP.md](./POSTHOG_SETUP.md) for detailed setup instructions.

### Important Notes
- SQLite is used for local development only
- For production, migrate to PostgreSQL (Supabase recommended)
- All API routes work as serverless functions on Vercel
- PostHog analytics is optional - app works without it (see [POSTHOG_SETUP.md](./POSTHOG_SETUP.md))

## 🗂️ Project Structure

```
substracker-next/
├── src/
│   ├── app/              # Next.js 14 app directory
│   │   ├── api/         # API routes (serverless functions)
│   │   ├── dashboard/   # Main dashboard
│   │   ├── analytics/   # Analytics page
│   │   └── ...         # Other pages
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and configurations
│   └── types/          # TypeScript types
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── ...                # Config files
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database
```

## 🎨 Design Principles

- **Neumorphic Design**: Modern, soft UI with depth
- **Purple/Pink Gradient**: Consistent brand colors
- **Dark Theme**: Default dark mode for better UX
- **Responsive**: Works on all devices
- **Accessible**: WCAG compliant

## 🔐 Security

- Mock authentication for demo purposes
- Ready for production auth (Supabase Auth recommended)
- All data stored locally in development
- No sensitive data in repository

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Support

- **Documentation**: [docs.subtracker.app](https://docs.subtracker.app)
- **Email**: support@subtracker.app
- **Twitter**: [@subtracker](https://twitter.com/subtracker)

---

<p align="center">Made with ❤️ by the SubTracker Team</p>