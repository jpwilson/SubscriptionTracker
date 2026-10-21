import Link from 'next/link'
import { ArrowRight, CheckCircle2, TrendingUp, Calendar, Bell, Sparkles, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/json-ld'
import { MarketingFooter } from '@/components/marketing-footer'
import { MarketingHeader } from '@/components/marketing-header'
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo'
import { LAST_UPDATED_ISO } from '@/lib/site'

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'How to cancel subscriptions', path: '/how-to-cancel-subscriptions' },
]

export const metadata = buildMetadata({
  title: 'How to Cancel Subscriptions: Step-by-Step Guide',
  description: 'Step-by-step instructions for cancelling subscriptions on iPhone, Android and the web, including Netflix, Spotify, Adobe and Amazon Prime, plus what to check afterwards.',
  path: '/how-to-cancel-subscriptions',
  type: 'article',
})

export default function HowToCancelSubscriptions() {
  const services = [
    {
      name: 'Netflix',
      steps: [
        'Log in to Netflix.com',
        'Click your profile icon → Account',
        'Under "Membership & Billing" click "Cancel Membership"',
        'Confirm cancellation',
        'Access continues until end of billing period'
      ]
    },
    {
      name: 'Spotify',
      steps: [
        'Go to spotify.com/account',
        'Click "Change plan" under your Premium plan',
        'Click "Cancel Premium"',
        'Follow the prompts to confirm',
        'Premium continues until next billing date'
      ]
    },
    {
      name: 'Adobe Creative Cloud',
      steps: [
        'Sign in to account.adobe.com',
        'Go to Plans',
        'Click "Manage plan" → "Cancel plan"',
        'Follow cancellation steps',
        'Note: Early termination may incur fees'
      ]
    },
    {
      name: 'Amazon Prime',
      steps: [
        'Go to amazon.com → Account & Lists',
        'Click "Prime Membership"',
        'Click "Update, cancel and more"',
        'Choose "End Membership"',
        'Confirm your cancellation'
      ]
    },
    {
      name: 'Apple Subscriptions (iPhone)',
      steps: [
        'Open Settings → tap your name',
        'Tap Subscriptions',
        'Select the subscription to cancel',
        'Tap "Cancel Subscription"',
        'Confirm cancellation'
      ]
    },
    {
      name: 'Google Play Subscriptions',
      steps: [
        'Open Google Play Store app',
        'Tap Menu → Subscriptions',
        'Select subscription to cancel',
        'Tap "Cancel subscription"',
        'Follow instructions'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 gradient-mesh" />
      
      <JsonLd
        data={[
          breadcrumbSchema(BREADCRUMB),
          articleSchema({
            headline: 'How to Cancel Subscriptions: Step-by-Step Guide',
            description: 'Step-by-step instructions for cancelling subscriptions on iPhone, Android and the web, including Netflix, Spotify, Adobe and Amazon Prime, plus what to check afterwards.',
            path: '/how-to-cancel-subscriptions',
            datePublished: LAST_UPDATED_ISO,
            dateModified: LAST_UPDATED_ISO,
          }),
        ]}
      />
      <MarketingHeader />

      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-gradient">How to Cancel Subscriptions</span>
            <br />
            <span className="text-white">Complete Step-by-Step Guide</span>
          </h1>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Canceling subscriptions can be confusing. Here&apos;s exactly how to cancel the most popular services, plus tips to avoid unexpected charges.
          </p>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-yellow-400" />
              Important Reminders
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span><strong>Cancel before renewal:</strong> Most services let you use them until the end of your billing period</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span><strong>Check for fees:</strong> Some annual plans charge early termination fees (like Adobe)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span><strong>Free trials:</strong> Cancel at least 24 hours before trial ends to avoid charges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span><strong>Get confirmation:</strong> Always save your cancellation confirmation email</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span><strong>Check your bank:</strong> Verify the charge stops after your billing period ends</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8 mb-12">
            <h2 className="text-3xl font-bold text-gradient text-center mb-8">
              Popular Services: How to Cancel
            </h2>
            
            {services.map((service, index) => (
              <div key={index} className="neu-card rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  {service.name}
                </h3>
                <ol className="space-y-2">
                  {service.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center justify-center">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-300 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-400" />
              General Cancellation Tips
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="neu-card rounded-xl p-4 border border-emerald-500/20">
                <h3 className="font-semibold text-white mb-2">1. Find Your Billing Date</h3>
                <p>Check your email for subscription receipts or look at your bank statements. Cancel a few days before to ensure it processes in time.</p>
              </div>
              
              <div className="neu-card rounded-xl p-4 border border-teal-500/20">
                <h3 className="font-semibold text-white mb-2">2. Look for Account Settings</h3>
                <p>Most services hide cancellation under Account → Subscriptions → Manage → Cancel. They rarely put it in obvious places.</p>
              </div>
              
              <div className="neu-card rounded-xl p-4 border border-blue-500/20">
                <h3 className="font-semibold text-white mb-2">3. Contact Support as Last Resort</h3>
                <p>If you can&apos;t find the cancel button, use live chat or email support. Say &quot;I want to cancel my subscription&quot; clearly.</p>
              </div>
              
              <div className="neu-card rounded-xl p-4 border border-indigo-500/20">
                <h3 className="font-semibold text-white mb-2">4. For App Store Subscriptions</h3>
                <p>You must cancel through Apple App Store (iPhone) or Google Play Store (Android), not the app itself.</p>
              </div>
              
              <div className="neu-card rounded-xl p-4 border border-purple-500/20">
                <h3 className="font-semibold text-white mb-2">5. Watch for Retention Offers</h3>
                <p>Services may offer discounts to keep you. Consider if the reduced price makes sense, or stick to your cancellation.</p>
              </div>
            </div>
          </div>

          <div className="neu-card rounded-3xl p-8 mb-12 border border-red-500/20 bg-gradient-to-br from-red-900/10 to-pink-900/10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-400" />
              Difficult Cancellations: What to Do
            </h2>
            <p className="text-gray-300 mb-4">
              Some companies make cancellation intentionally difficult. Here&apos;s how to handle them:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Gym memberships:</strong> Often require in-person cancellation or certified mail. Check your contract and state laws.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Cable/Internet:</strong> Call during business hours. Don&apos;t accept &quot;save&quot; offers unless genuinely better.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Unknown charges:</strong> Contact your bank to dispute if you don&apos;t recognize the charge or can&apos;t cancel.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">No response:</strong> Send a formal cancellation email with &quot;Cancellation Request&quot; in subject. Keep proof.
                </div>
              </li>
            </ul>
          </div>

          <div className="neu-card rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              Never Miss a Cancellation Again
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              SubTracker sends you alerts before trials end and renewal dates arrive. Track all your subscriptions in one place and get reminded when it&apos;s time to cancel.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="neu-card rounded-xl p-4 border border-emerald-500/20 text-center">
                <Bell className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">7-day trial alerts</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-teal-500/20 text-center">
                <Calendar className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Renewal reminders</p>
              </div>
              <div className="neu-card rounded-xl p-4 border border-blue-500/20 text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Price change alerts</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Start Free - Never Forget to Cancel
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-3">Free forever • No credit card required</p>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}
