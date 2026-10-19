import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, XCircle, DollarSign, Users, Sparkles, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'SubTracker vs Rocket Money: Which Subscription Tracker is Better?',
  description: 'Compare SubTracker and Rocket Money for subscription management. Learn which tool saves you more money, offers better features, and fits your budget.',
  openGraph: {
    title: 'SubTracker vs Rocket Money: Detailed Comparison 2025',
    description: 'Compare subscription tracking features, pricing, and savings potential between SubTracker and Rocket Money.',
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
            <span className="text-gradient">SubTracker vs Rocket Money</span>
            <br />
            <span className="text-white">Which Subscription Tracker is Better?</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Both help you manage subscriptions, but they serve different needs. Here&apos;s an honest comparison to help you choose.
          </p>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-gradient">Quick Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="neu-card rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-4 text-emerald-400">Choose SubTracker if you want:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Dedicated subscription tracking with deep category organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Lower cost ($0-$5/month vs $6-$12/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Lifetime plan option ($250 one-time)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Privacy-first approach (your data stays private)</span>
                  </li>
                </ul>
              </div>
              
              <div className="neu-card rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Choose Rocket Money if you want:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>All-in-one personal finance management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Direct bank account integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Bill negotiation service (they call providers for you)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Broader financial tracking beyond subscriptions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-emerald-400" />
                Pricing Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 pr-4">Plan</th>
                      <th className="pb-4 pr-4">SubTracker</th>
                      <th className="pb-4">Rocket Money</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4 font-medium">Free Plan</td>
                      <td className="py-4 pr-4 text-emerald-400">$0/month (unlimited subs)</td>
                      <td className="py-4 text-gray-400">Limited features</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4 font-medium">Premium/Plus</td>
                      <td className="py-4 pr-4 text-emerald-400">$5/month</td>
                      <td className="py-4">$6-$12/month</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4 font-medium">Lifetime Option</td>
                      <td className="py-4 pr-4 text-emerald-400">$250 one-time</td>
                      <td className="py-4 text-gray-400">Not available</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-medium">Annual Cost</td>
                      <td className="py-4 pr-4 text-emerald-400">$0-$60</td>
                      <td className="py-4">$72-$144</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-teal-400" />
                Features Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 pr-4">Feature</th>
                      <th className="pb-4 pr-4 text-center">SubTracker</th>
                      <th className="pb-4 text-center">Rocket Money</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Subscription tracking</td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Custom categories</td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 text-center"><XCircle className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Payment reminders</td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Bank account linking</td>
                      <td className="py-4 text-center"><span className="text-gray-400 text-sm">Coming soon</span></td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Bill negotiation</td>
                      <td className="py-4 text-center"><XCircle className="w-5 h-5 text-gray-500 mx-auto" /></td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Budgeting tools</td>
                      <td className="py-4 text-center"><span className="text-gray-400 text-sm">Subscription focus</span></td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">Privacy-first design</td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 text-center"><span className="text-gray-400 text-sm">Bank data required</span></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 pr-4">API access</td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 text-center"><XCircle className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Team/Enterprise features</td>
                      <td className="py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 text-center"><XCircle className="w-5 h-5 text-gray-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                Privacy & Security
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-emerald-400">SubTracker</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>No bank account access required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Your data never leaves your control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Bank-level encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Export your data anytime</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Rocket Money</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span>Requires full bank access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span>Uses Plaid for connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span>Encrypted transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <span>Read-only bank access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Best For
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="neu-card rounded-xl p-6 border border-emerald-500/20">
                  <h3 className="text-lg font-semibold mb-3 text-emerald-400">SubTracker is Perfect For:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Privacy-conscious users</li>
                    <li>• Small businesses tracking SaaS tools</li>
                    <li>• Teams managing department subscriptions</li>
                    <li>• Users who want detailed category tracking</li>
                    <li>• Anyone preferring a one-time lifetime payment</li>
                    <li>• Developers needing API access</li>
                  </ul>
                </div>
                <div className="neu-card rounded-xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Rocket Money is Perfect For:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• All-in-one finance management</li>
                    <li>• Users wanting automatic detection</li>
                    <li>• People who need bill negotiation help</li>
                    <li>• Comprehensive budgeting beyond subs</li>
                    <li>• Users comfortable sharing bank data</li>
                    <li>• Monitoring overall spending habits</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="neu-card rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 text-center">
              <h2 className="text-3xl font-bold mb-4 text-gradient">
                Ready to Try SubTracker?
              </h2>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                Start with our free forever plan. No credit card required. Upgrade only if you need advanced features.
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
