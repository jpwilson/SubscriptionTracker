'use client'

import { useEffect, useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { TrendingUp, Bell, BarChart3, Sparkles, ArrowRight, CheckCircle2, Calendar, Tag, PieChart, Download, Shield, Zap, Home, AlertTriangle, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MarketingFooter } from '@/components/marketing-footer'
import { FAQ_ITEMS } from '@/content/faq'
import { COMPARISONS } from '@/content/comparisons'
import {
  FEATURES,
  LIMITATIONS,
  PRICING_CAVEAT,
  PRIVACY_FACTS,
  WHAT_IT_IS,
  WHO_IT_IS_FOR,
} from '@/content/product'

export default function LandingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [subscriptionCount, setSubscriptionCount] = useState(8)
  const [estimatedSavings, setEstimatedSavings] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<Record<string, number>>({
    'Entertainment': 2,
    'Productivity': 1,
    'Cloud Storage': 1,
    'AI Tools': 1,
    'Health & Fitness': 1,
    'News & Media': 1,
    'Music': 1,
    'Gaming': 0
  })
  
  const categoryPrices: Record<string, number> = {
    'Entertainment': 15.99,
    'Productivity': 12.99,
    'Cloud Storage': 9.99,
    'AI Tools': 20.00,
    'Health & Fitness': 19.99,
    'News & Media': 9.99,
    'Music': 10.99,
    'Gaming': 14.99
  }
  
  const categorySavings: Record<string, number> = {
    'Entertainment': 0.35, // 35% savings potential (sharing, downgrades)
    'Productivity': 0.25, // 25% savings (annual plans, alternatives)
    'Cloud Storage': 0.40, // 40% savings (consolidation)
    'AI Tools': 0.30, // 30% savings (usage optimization)
    'Health & Fitness': 0.45, // 45% savings (seasonal usage)
    'News & Media': 0.50, // 50% savings (bundling)
    'Music': 0.20, // 20% savings (family plans)
    'Gaming': 0.35 // 35% savings (rotation strategy)
  }
  
  useEffect(() => {
    // Calculate total subscriptions and estimated savings
    const totalSubs = Object.values(selectedCategories).reduce((sum, count) => sum + count, 0)
    setSubscriptionCount(totalSubs)
    
    // Calculate realistic savings based on categories
    let totalMonthlyCost = 0
    let potentialSavings = 0
    
    Object.entries(selectedCategories).forEach(([category, count]) => {
      const monthlySpend = categoryPrices[category] * count
      totalMonthlyCost += monthlySpend
      potentialSavings += monthlySpend * categorySavings[category]
    })
    
    setEstimatedSavings(Math.round(potentialSavings))
  }, [selectedCategories, categoryPrices, categorySavings])
  
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['calculator', 'features', 'how-it-works', 'pricing']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Height of sticky nav
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Track Costs",
      description: "Complete visibility into your subscription spending.",
      gradient: "from-blue-500 to-emerald-500",
      examples: [
        {
          type: "feature",
          title: "12 categories out of the box",
          message: "Entertainment, AI Tools, SaaS, Fitness, Housing and more",
          icon: <Tag className="w-4 h-4" />,
          color: "text-blue-400",
          bgColor: "bg-blue-400/10"
        },
        {
          type: "feature",
          title: "Payment calendar",
          message: "See which payments land on which day of the month",
          icon: <Home className="w-4 h-4" />,
          color: "text-emerald-400",
          bgColor: "bg-emerald-400/10"
        },
        {
          type: "feature",
          title: "Annual and monthly side by side",
          message: "A $120/year plan and a $10/month plan, compared properly",
          icon: <PieChart className="w-4 h-4" />,
          color: "text-indigo-400",
          bgColor: "bg-indigo-400/10"
        }
      ]
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "See What's Coming",
      description: "Open SubTracker and the next charges are already laid out. It does not email or push anything to you.",
      gradient: "from-emerald-500 to-teal-500",
      examples: [
        {
          type: "alert",
          title: "Trial ending badges",
          message: "A trial inside its last 7 days is flagged before it charges you",
          icon: <Calendar className="w-4 h-4" />,
          color: "text-teal-400",
          bgColor: "bg-teal-400/10"
        },
        {
          type: "alert",
          title: "Next payment dates",
          message: "Every subscription stores its next charge date and a reminder window you set",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-orange-400",
          bgColor: "bg-orange-400/10"
        },
        {
          type: "alert",
          title: "Service-ending badges",
          message: "Cancelled but still active? You can see when access stops",
          icon: <Shield className="w-4 h-4" />,
          color: "text-emerald-400",
          bgColor: "bg-emerald-400/10"
        }
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Your Data, Your Way",
      description: "No bank feed, no lock-in. The list is yours and it leaves in a format anything can read.",
      gradient: "from-teal-500 to-emerald-400",
      examples: [
        {
          type: "feature",
          title: "No bank connection",
          message: "SubTracker never asks for bank or card credentials",
          icon: <Shield className="w-4 h-4" />,
          color: "text-yellow-400",
          bgColor: "bg-yellow-400/10"
        },
        {
          type: "feature",
          title: "CSV export any time",
          message: "Download the whole list from your profile page",
          icon: <Download className="w-4 h-4" />,
          color: "text-emerald-400",
          bgColor: "bg-emerald-400/10"
        },
        {
          type: "feature",
          title: "Read-only MCP server",
          message: "Let an AI assistant you control read your list with your own token",
          icon: <Zap className="w-4 h-4" />,
          color: "text-green-400",
          bgColor: "bg-green-400/10"
        }
      ]
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Sign Up Free",
      description: "Create your account in seconds. No credit card required.",
      icon: <Shield className="w-5 h-5" />,
      features: [
        "No credit card needed",
        "5-minute setup",
        "Free forever plan"
      ]
    },
    {
      number: "02",
      title: "Add Subscriptions",
      description: "Type each recurring payment in once. Your card statement is the fastest source.",
      icon: <PieChart className="w-5 h-5" />,
      features: [
        "Name, amount and billing cycle",
        "Next payment date and reminder window",
        "Category, link and notes",
        "Mark trials and their end dates"
      ]
    },
    {
      number: "03",
      title: "Decide What To Cut",
      description: "Read the totals, then cancel, downgrade or switch to annual billing.",
      icon: <Zap className="w-5 h-5" />,
      features: [
        "Monthly and yearly totals",
        "Spending by category and over time",
        "Trial and cancellation status badges",
        "Payment calendar and CSV export"
      ]
    }
  ]

  const freeFeatures = [
    { text: "Unlimited subscriptions", icon: <CheckCircle2 className="w-4 h-4" /> },
    { text: "Monthly & yearly overview", icon: <Calendar className="w-4 h-4" /> },
    { text: "Next payment dates", icon: <Bell className="w-4 h-4" /> },
    { text: "Trial & cancellation badges", icon: <Sparkles className="w-4 h-4" /> },
    { text: "12 default categories", icon: <Tag className="w-4 h-4" /> },
    { text: "CSV export of your data", icon: <Download className="w-4 h-4" /> },
    { text: "Payment calendar", icon: <Calendar className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl neu-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-gradient">SubTracker</span>
            </button>
            <div className="hidden md:flex items-center gap-8">
              <LayoutGroup>
                <button 
                  onClick={() => scrollToSection('calculator')} 
                  className={`relative text-gray-300 hover:text-white transition-colors ${activeSection === 'calculator' ? 'text-white' : ''}`}
                >
                  Calculator
                  {activeSection === 'calculator' && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  )}
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className={`relative text-gray-300 hover:text-white transition-colors ${activeSection === 'features' ? 'text-white' : ''}`}
                >
                  Features
                  {activeSection === 'features' && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  )}
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className={`relative text-gray-300 hover:text-white transition-colors ${activeSection === 'how-it-works' ? 'text-white' : ''}`}
                >
                  How it Works
                  {activeSection === 'how-it-works' && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  )}
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className={`relative text-gray-300 hover:text-white transition-colors ${activeSection === 'pricing' ? 'text-white' : ''}`}
                >
                  Pricing
                  {activeSection === 'pricing' && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  )}
                </button>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Plans
                </Link>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
                <Link href="/alternatives" className="text-gray-300 hover:text-white transition-colors">
                  Compare
                </Link>
              </LayoutGroup>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neu-card border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">Free plan, unlimited subscriptions • No bank connection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">SubTracker</span>
              <br />
              <span className="text-white">A free subscription tracker</span>
            </h1>
            
            <div className="text-xl mb-12 max-w-3xl mx-auto space-y-4 text-left sm:text-center">
              <p className="text-gray-300">{WHAT_IT_IS}</p>
              <p className="text-gray-400 text-lg">{WHO_IT_IS_FOR}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Start Free - No Card Required
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white/20 hover:bg-white/10"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>5-minute setup</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="neu-card rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="neu-card rounded-xl p-6 border border-emerald-500/20">
                  <div className="text-3xl font-bold text-gradient mb-2">$47.93</div>
                  <div className="text-sm text-gray-400">Monthly Total</div>
                </div>
                <div className="neu-card rounded-xl p-6 border border-teal-500/20">
                  <div className="text-3xl font-bold text-gradient mb-2">12</div>
                  <div className="text-sm text-gray-400">Active Subscriptions</div>
                </div>
                <div className="neu-card rounded-xl p-6 border border-blue-500/20">
                  <div className="text-3xl font-bold text-gradient mb-2">$575.16</div>
                  <div className="text-sm text-gray-400">Yearly Total</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center">
                Example figures from a sample account, not an average or a promise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What it does and what it does not do */}
      <section id="calculator" className="py-16 px-4 bg-gradient-to-b from-transparent to-emerald-900/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-2">Straight answers before you sign up</h2>
            <p className="text-gray-400">
              SubTracker is a new product with no reviews to quote at you, so here is what it does
              and what it does not do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="neu-card rounded-2xl p-6 border border-emerald-500/20">
              <h3 className="text-lg font-bold text-white mb-4">What it does</h3>
              <ul className="space-y-3">
                {FEATURES.slice(0, 6).map((feature) => (
                  <li key={feature.title} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white font-medium">{feature.title}.</strong>{' '}
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="neu-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">What it does not do</h3>
              <ul className="space-y-3">
                {LIMITATIONS.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-2 text-sm text-gray-300">
                    <AlertTriangle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-400 mt-5">
                If you want automatic detection or cancellation handled for you, our{' '}
                <Link href="/vs-rocket-money" className="text-emerald-400 hover:text-emerald-300">
                  Rocket Money comparison
                </Link>{' '}
                and{' '}
                <Link href="/alternatives" className="text-emerald-400 hover:text-emerald-300">
                  alternatives page
                </Link>{' '}
                say so plainly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="neu-card rounded-3xl p-8 md:p-12 border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-teal-900/20"
          >
            <h3 className="text-3xl font-bold text-center mb-2">
              <span className="text-gradient">Calculate Your Savings</span>
            </h3>
            <p className="text-center text-gray-400 mb-8">
              Pick roughly what you subscribe to. The result is a rough illustration based on typical
              list prices and common savings tactics — not a prediction, and not based on anyone&apos;s
              account data.
            </p>
            
            <div className="space-y-8">
              {/* Category Selection Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(selectedCategories).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between p-4 neu-card rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {category === 'Entertainment' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                        {category === 'Productivity' && <Zap className="w-5 h-5 text-blue-400" />}
                        {category === 'Cloud Storage' && <Download className="w-5 h-5 text-green-400" />}
                        {category === 'AI Tools' && <Sparkles className="w-5 h-5 text-teal-400" />}
                        {category === 'Health & Fitness' && <Shield className="w-5 h-5 text-red-400" />}
                        {category === 'News & Media' && <Calendar className="w-5 h-5 text-yellow-400" />}
                        {category === 'Music' && <Bell className="w-5 h-5 text-indigo-400" />}
                        {category === 'Gaming' && <PieChart className="w-5 h-5 text-orange-400" />}
                        <div>
                          <p className="font-medium text-white">{category}</p>
                          <p className="text-xs text-gray-400">~${categoryPrices[category]}/mo each</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCategories({...selectedCategories, [category]: Math.max(0, count - 1)})}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                        disabled={count === 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-white">{count}</span>
                      <button
                        onClick={() => setSelectedCategories({...selectedCategories, [category]: Math.min(5, count + 1)})}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                        disabled={count === 5}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Subscriptions Display */}
              <div className="text-center">
                <p className="text-lg text-gray-300">
                  Total: <span className="text-2xl font-bold text-white">{subscriptionCount}</span> subscriptions
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Estimated monthly spend: ${Object.entries(selectedCategories).reduce((sum, [cat, count]) => sum + (categoryPrices[cat] * count), 0).toFixed(0)}
                </p>
              </div>
              
              {/* Savings Display */}
              <div className="text-center py-8 neu-card rounded-2xl border border-green-500/20">
                <p className="text-gray-400 mb-2">You could save approximately</p>
                <p className="text-5xl font-bold text-gradient">
                  ${estimatedSavings}
                  <span className="text-2xl text-gray-400">/month</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  That&apos;s ${estimatedSavings * 12} per year!
                </p>
                <div className="mt-4 text-xs text-gray-500 max-w-md mx-auto">
                  <p>Savings breakdown:</p>
                  <p className="text-gray-400">• Share family plans • Cancel unused subs • Switch to annual billing • Negotiate better rates</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/login">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    Start Saving Now →
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 mt-3 max-w-md mx-auto">
                  Illustrative estimate based on assumed costs and savings; actual results vary.
                  It assumes a typical price per subscription in each category (for example
                  ${categoryPrices['Entertainment']} for entertainment and ${categoryPrices['AI Tools']} for AI tools) and a
                  fixed savings rate per category (
                  {Math.round(Math.min(...Object.values(categorySavings)) * 100)}–
                  {Math.round(Math.max(...Object.values(categorySavings)) * 100)}%) from the
                  strategies above. It is not based on SubTracker user data — we have none to
                  publish. Your own numbers are whatever you enter in the app.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-relaxed py-2">
              Everything You Need to Save Money
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you track, manage, and optimize your subscriptions
            </p>
            <p className="text-sm text-gray-500 mt-2">
              🔐 No third-party access • Your financial insights stay private
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="relative group"
              >
                <div className="neu-card rounded-2xl p-8 h-full border border-white/10 transition-all duration-300 hover:border-emerald-500/30">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 transition-transform duration-300 ${hoveredFeature === index ? 'scale-110' : ''}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  
                  {/* Concrete examples under each feature heading */}
                  {feature.examples && (
                    <div className="space-y-3 mt-6">
                      {feature.examples.map((example, idx) => (
                        <div key={idx} className={`${example.bgColor} rounded-lg p-3 border border-white/5`}>
                          <div className="flex items-start gap-2">
                            <div className={`${example.color} mt-0.5`}>
                              {example.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-white">{example.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{example.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Free Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="neu-card rounded-3xl p-8 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-center mb-8">
                <span className="text-gradient">All This for Free</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      {feature.icon}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Three steps, and the only one that takes any real time is the first pass through your
              card statement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                )}
                <div className="neu-card rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-bold text-gradient opacity-50">{step.number}</div>
                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  
                  {/* Feature list */}
                  {step.features && (
                    <ul className="space-y-2 mb-4">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Privacy & Security Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="neu-card rounded-2xl p-6 max-w-3xl mx-auto border border-green-500/20 bg-gradient-to-br from-green-900/10 to-transparent">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-bold text-green-400">No bank connection, by design</h3>
                <Lock className="w-5 h-5 text-green-400" />
              </div>
              <ul className="space-y-2 text-sm text-gray-400 text-left max-w-xl mx-auto">
                {PRIVACY_FACTS.map((fact) => (
                  <li key={fact}>— {fact}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-relaxed py-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {PRICING_CAVEAT} Full detail on the{' '}
              <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">
                pricing page
              </Link>
              .
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="neu-card rounded-2xl p-6 border border-white/10"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-gray-400 text-sm mb-3">Personal use</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Unlimited subscriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>12 categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <Link href="/login">
                <Button className="w-full neu-button text-sm">Start Free</Button>
              </Link>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="neu-card rounded-3xl p-8 border-2 border-emerald-500/30 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-sm font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Not available yet
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-gray-400 mb-4">Published price, not yet switchable on</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gradient">$5</span>
                  <span className="text-gray-400">/month billed annually</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  $60 once a year, or $8 if you pay month to month. Nothing in the app moves an
                  account onto Premium today, so these features are planned rather than available.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Planned: custom categories</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Planned: advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Planned: cost projections, usage tracking and Smart Insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Planned: priority support</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                  See Premium pricing
                </Button>
              </Link>
            </motion.div>

            {/* Forever Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="neu-card rounded-2xl p-6 border border-yellow-500/30"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Forever</h3>
                <p className="text-gray-400 text-sm mb-3">Not available yet — published price</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-yellow-400">$250</span>
                  <span className="text-gray-400 text-sm">once</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span>All planned Premium features</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span>Lifetime updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span>No recurring fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span>One payment, not a subscription</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full neu-button border border-yellow-500/30 hover:bg-yellow-500/10 text-sm">
                  See the detail
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="neu-card rounded-2xl p-6 border border-teal-500/30"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400 text-sm mb-3">Not available yet — get in touch</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-teal-400">$200</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5" />
                  <span>Multi-user teams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5" />
                  <span>Expense audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5" />
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Link href="/pricing">
                <Button className="w-full neu-button border border-teal-500/30 hover:bg-teal-500/10 text-sm">
                  See the detail
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Common questions</h2>
          <p className="text-gray-400 mb-10">
            The questions people ask most often, answered in full on the{' '}
            <Link href="/faq" className="text-emerald-400 hover:text-emerald-300">
              SubTracker FAQ
            </Link>
            .
          </p>
          <div className="space-y-4">
            {FAQ_ITEMS.slice(0, 5).map((item) => (
              <div key={item.question} className="neu-card rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">{item.question}</h3>
                <p className="text-sm text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <div className="neu-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Compare SubTracker</h3>
              <ul className="space-y-2 text-sm">
                {COMPARISONS.map((comparison) => (
                  <li key={comparison.path}>
                    <Link href={comparison.path} className="text-emerald-400 hover:text-emerald-300">
                      {comparison.h1}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/alternatives" className="text-emerald-400 hover:text-emerald-300">
                    Best subscription tracker apps
                  </Link>
                </li>
              </ul>
            </div>
            <div className="neu-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Guides</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/find-forgotten-subscriptions" className="text-emerald-400 hover:text-emerald-300">
                    How to find forgotten subscriptions
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-cancel-subscriptions" className="text-emerald-400 hover:text-emerald-300">
                    How to cancel subscriptions
                  </Link>
                </li>
                <li>
                  <Link href="/subscription-savings-guide" className="text-emerald-400 hover:text-emerald-300">
                    Subscription savings guide
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300">
                    SubTracker pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="neu-card rounded-3xl p-12 text-center border border-emerald-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-relaxed py-2">
              See what your subscriptions actually cost
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              The free plan tracks unlimited subscriptions and never asks for a card, so finding out
              takes about ten minutes.
            </p>
            <Link href="/login">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  Start Your Free Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Free forever plan • 5-minute setup
            </p>
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}