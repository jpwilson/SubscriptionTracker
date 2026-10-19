import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'SubTracker vs Other Subscription Trackers: Comparison Guide',
  description: 'Compare SubTracker with other subscription management tools. Learn what makes SubTracker different and which features matter for tracking subscriptions.',
  openGraph: {
    title: 'SubTracker vs Other Subscription Trackers: What Makes Us Different',
    description: 'Compare subscription tracking approaches. Learn what SubTracker offers and how to choose the right tool for your needs.',
  },
}

export default function VsRocketMoney() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 gradient-mesh" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl neu-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-bold text-gradient">SubTracker</span>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Try SubTracker Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">SubTracker vs Other Tools</span>
            <br />
            <span className="text-white">What Makes SubTracker Different?</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            There are several ways to track subscriptions. Here&apos;s what SubTracker offers and how to decide if it&apos;s right for you.
          </p>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-gradient">SubTracker&apos;s Approach</h2>
            <div className="space-y-4">
              <div className="neu-card rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">What SubTracker Offers:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Free forever plan with unlimited subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Premium plan at $5/month for advanced features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Lifetime plan option ($250 one-time payment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Custom categories for detailed organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Privacy-first: your data stays in your control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>API access for integrations (Enterprise plan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Team features for managing company subscriptions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">SubTracker Pricing</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 pr-4">Plan</th>
                      <th className="pb-4 pr-4">Price</th>
                      <th className="pb-4">Key Features</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4 font-medium">Free</td>
                      <td className="py-4 pr-4 text-emerald-400">$0/month</td>
                      <td className="py-4">Unlimited subscriptions, 20 categories, basic analytics</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4 font-medium">Premium</td>
                      <td className="py-4 pr-4 text-emerald-400">$5/month</td>
                      <td className="py-4">Custom categories, advanced analytics, priority support</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4 font-medium">Lifetime</td>
                      <td className="py-4 pr-4 text-emerald-400">$250 one-time</td>
                      <td className="py-4">All premium features, lifetime access, no recurring fees</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-medium">Enterprise</td>
                      <td className="py-4 pr-4 text-emerald-400">$200/month</td>
                      <td className="py-4">Multi-user teams, API access, dedicated support</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-teal-400" />
                Core Features
              </h2>
              <div className="space-y-4">
                <div className="neu-card rounded-xl p-4 border border-emerald-500/20">
                  <h3 className="font-semibold text-white mb-2">Subscription Tracking</h3>
                  <p className="text-gray-300 text-sm">
                    Track unlimited subscriptions with custom categories, tags, and notes. Organize by type, priority, or any way that makes sense for you.
                  </p>
                </div>
                <div className="neu-card rounded-xl p-4 border border-teal-500/20">
                  <h3 className="font-semibold text-white mb-2">Payment Reminders</h3>
                  <p className="text-gray-300 text-sm">
                    Get alerts for upcoming payments, trial endings, and renewal dates. Never get surprised by unexpected charges.
                  </p>
                </div>
                <div className="neu-card rounded-xl p-4 border border-blue-500/20">
                  <h3 className="font-semibold text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-300 text-sm">
                    View your spending by month, year, or category. Identify trends and see where your money goes.
                  </p>
                </div>
                <div className="neu-card rounded-xl p-4 border border-indigo-500/20">
                  <h3 className="font-semibold text-white mb-2">Privacy & Security</h3>
                  <p className="text-gray-300 text-sm">
                    Your data stays in your control. Bank-level encryption. No third-party access to your financial information.
                  </p>
                </div>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                Choosing the Right Tool
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Different subscription trackers take different approaches. Some focus on:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong className="text-white">All-in-one personal finance</strong> - Budgeting, bank connections, bill negotiation, and subscription tracking combined</li>
                  <li>• <strong className="text-white">Dedicated subscription management</strong> - Deep focus on tracking and organizing recurring payments (SubTracker&apos;s approach)</li>
                  <li>• <strong className="text-white">Manual spreadsheets</strong> - Free but time-consuming, no automation or alerts</li>
                </ul>
                <p>
                  SubTracker is designed specifically for subscription tracking with features like custom categories, team management, and API access that broader finance tools may not offer.
                </p>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Questions to Ask</h2>
              <div className="space-y-4">
                <div className="neu-card rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Do you need comprehensive financial management?</h3>
                  <p className="text-gray-300 text-sm">
                    If you want budgeting, bank connections, and bill negotiation in addition to subscription tracking, consider an all-in-one personal finance app.
                  </p>
                </div>
                <div className="neu-card rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Do you want dedicated subscription features?</h3>
                  <p className="text-gray-300 text-sm">
                    If you specifically need deep category organization, custom tags, team management, or API access for subscriptions, SubTracker is built for that.
                  </p>
                </div>
                <div className="neu-card rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">How important is privacy?</h3>
                  <p className="text-gray-300 text-sm">
                    SubTracker doesn&apos;t require bank account access. Your subscription data stays private. Tools with bank integration see your full financial activity.
                  </p>
                </div>
                <div className="neu-card rounded-xl p-4 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">What&apos;s your budget?</h3>
                  <p className="text-gray-300 text-sm">
                    SubTracker offers a free forever plan. If you need advanced features, premium is $5/month or $250 lifetime. Compare this to alternatives&apos; pricing.
                  </p>
                </div>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 text-center">
              <h2 className="text-3xl font-bold mb-4 text-gradient">
                Try SubTracker Free
              </h2>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                Start with our free forever plan. No credit card required. See if SubTracker fits your needs.
              </p>
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Start Free Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 px-4 relative">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 SubTracker. Privacy-first subscription tracking.</p>
        </div>
      </footer>
    </div>
  )
}
