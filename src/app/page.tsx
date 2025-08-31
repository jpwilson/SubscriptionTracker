'use client'

import { useEffect, useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { TrendingUp, Bell, BarChart3, Sparkles, ArrowRight, CheckCircle2, CreditCard, Calendar, Tag, PieChart, Download, Moon, Shield, Zap, Home, AlertTriangle, DollarSign, Star, Lock, Mail, ImageIcon, Building2, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
      const sections = ['features', 'how-it-works', 'pricing']
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
      gradient: "from-blue-500 to-purple-500",
      examples: [
        {
          type: "feature",
          title: "12 spending categories with subcategories",
          message: "Entertainment → Streaming, Gaming, Sports",
          icon: <Tag className="w-4 h-4" />,
          color: "text-blue-400",
          bgColor: "bg-blue-400/10"
        },
        {
          type: "feature",
          title: "Family account management",
          message: "Track who uses what and split costs fairly",
          icon: <Home className="w-4 h-4" />,
          color: "text-purple-400",
          bgColor: "bg-purple-400/10"
        },
        {
          type: "feature",
          title: "Annual vs monthly comparison",
          message: "See exactly how much you'd save by switching",
          icon: <PieChart className="w-4 h-4" />,
          color: "text-indigo-400",
          bgColor: "bg-indigo-400/10"
        }
      ]
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Get Reminders",
      description: "Never get caught off-guard by subscription changes.",
      gradient: "from-purple-500 to-pink-500",
      examples: [
        {
          type: "alert",
          title: "7-day trial ending alerts",
          message: "Cancel before Netflix charges you tomorrow",
          icon: <Calendar className="w-4 h-4" />,
          color: "text-pink-400",
          bgColor: "bg-pink-400/10"
        },
        {
          type: "alert",
          title: "Price increase notifications",
          message: "Disney+ increasing by $3 next month - act now",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-orange-400",
          bgColor: "bg-orange-400/10"
        },
        {
          type: "alert",
          title: "Cancellation confirmations",
          message: "HBO Max access ends in 3 days - download content",
          icon: <Shield className="w-4 h-4" />,
          color: "text-purple-400",
          bgColor: "bg-purple-400/10"
        }
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Insights",
      description: "Get actionable alerts that save you money instantly.",
      gradient: "from-pink-500 to-orange-500",
      examples: [
        {
          type: "warning",
          title: "Price hike detected on Spotify",
          message: "+$1/mo increase — switch to family plan to save $12/year",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-yellow-400",
          bgColor: "bg-yellow-400/10"
        },
        {
          type: "alert",
          title: "Adobe Creative Cloud unused for 60 days",
          message: "Cancel to save $54.99/mo or downgrade to Photography plan",
          icon: <AlertTriangle className="w-4 h-4" />,
          color: "text-red-400",
          bgColor: "bg-red-400/10"
        },
        {
          type: "savings",
          title: "You're overpaying for Netflix",
          message: "Premium at $22.99 vs average $15.99 — share or downgrade?",
          icon: <DollarSign className="w-4 h-4" />,
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
      description: "Multiple ways to add your subscriptions instantly.",
      icon: <PieChart className="w-5 h-5" />,
      features: [
        "Manual quick entry",
        "Email scanning (Pro)",
        "Screenshot import (Pro)",
        "Bank sync coming soon"
      ],
      proFeatures: [
        { icon: <Mail className="w-3 h-3" />, text: "Email scanning" },
        { icon: <ImageIcon className="w-3 h-3" />, text: "Image import" },
        { icon: <CreditCard className="w-3 h-3" />, text: "Bank connections" }
      ]
    },
    {
      number: "03",
      title: "Save Money",
      description: "Get actionable insights that cut costs immediately.",
      icon: <Zap className="w-5 h-5" />,
      features: [
        "Unused subscription alerts",
        "Price hike notifications",
        "Duplicate service detection",
        "Family sharing opportunities"
      ],
      proFeatures: [
        { icon: <Users className="w-3 h-3" />, text: "Manage family costs" },
        { icon: <Building2 className="w-3 h-3" />, text: "Business expenses" },
        { icon: <Tag className="w-3 h-3" />, text: "Custom aliases" }
      ]
    }
  ]

  const testimonials = [
    {
      quote: "I had no idea I was paying for 3 streaming services I never used! SubTracker found $147 in monthly savings in under 5 minutes. It's like getting a raise without asking my boss!",
      author: "Sarah Mitchell",
      role: "Marketing Manager",
      location: "San Francisco",
      savings: "$147/mo",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      quote: "Got an alert that Disney+ was raising prices BEFORE it happened. Switched my whole family to a bundle and saved $89/month. This app pays for itself 20x over.",
      author: "James Kim",
      role: "Software Engineer",
      location: "New York",
      savings: "$89/mo",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      quote: "My 'subscription creep' was out of control - $426/month! Now I'm down to $198 and haven't missed a single service. Wish I'd found this years ago.",
      author: "Alexandra Rivera",
      role: "Small Business Owner",
      location: "Austin",
      savings: "$228/mo",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=5"
    }
  ]

  const freeFeatures = [
    { text: "Unlimited subscriptions", icon: <CheckCircle2 className="w-4 h-4" /> },
    { text: "Monthly & yearly overview", icon: <Calendar className="w-4 h-4" /> },
    { text: "Smart insights (3 free)", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Payment reminders", icon: <Bell className="w-4 h-4" /> },
    { text: "9 default categories", icon: <Tag className="w-4 h-4" /> },
    { text: "Export your data", icon: <Download className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 gradient-mesh" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-gradient">SubTracker</span>
            </button>
            <div className="hidden md:flex items-center gap-8">
              <LayoutGroup>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className={`relative text-gray-300 hover:text-white transition-colors ${activeSection === 'features' ? 'text-white' : ''}`}
                >
                  Features
                  {activeSection === 'features' && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
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
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
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
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  )}
                </button>
              </LayoutGroup>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neu-card border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Save 30% on average • Bank-level security</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Take Control</span>
              <br />
              <span className="text-white">of Your Subscriptions</span>
            </h1>
            
            <div className="text-xl mb-12 max-w-3xl mx-auto space-y-2">
              <p className="text-gray-300">
                <span className="text-2xl font-bold text-orange-400">2–5 subscriptions</span> you&apos;ve forgotten.
              </p>
              <p className="text-gray-300">
                <span className="text-2xl font-bold text-red-400">$40–$300/month</span> slipping away.
              </p>
              <p className="text-white font-semibold text-2xl mt-4">
                SubTracker puts you back in control.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
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
                <div className="neu-card rounded-xl p-6 border border-purple-500/20">
                  <div className="text-3xl font-bold text-gradient mb-2">$47.93</div>
                  <div className="text-sm text-gray-400">Monthly Total</div>
                </div>
                <div className="neu-card rounded-xl p-6 border border-pink-500/20">
                  <div className="text-3xl font-bold text-gradient mb-2">12</div>
                  <div className="text-sm text-gray-400">Active Subscriptions</div>
                </div>
                <div className="neu-card rounded-xl p-6 border border-blue-500/20">
                  <div className="text-3xl font-bold text-gradient mb-2">$126</div>
                  <div className="text-sm text-gray-400">Saved This Year</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gradient mb-2">Real People, Real Savings</h2>
            <p className="text-gray-400">Join thousands who&apos;ve taken control of their subscriptions</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="neu-card rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm mb-3 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                        <p className="text-xs text-gray-400">{testimonial.role} • {testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Saves</p>
                        <p className="font-bold text-green-400 text-sm">{testimonial.savings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            className="neu-card rounded-3xl p-8 md:p-12 border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
          >
            <h3 className="text-3xl font-bold text-center mb-2">
              <span className="text-gradient">Calculate Your Savings</span>
            </h3>
            <p className="text-center text-gray-400 mb-8">Select your subscription categories below</p>
            
            <div className="space-y-8">
              {/* Category Selection Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(selectedCategories).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between p-4 neu-card rounded-xl border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {category === 'Entertainment' && <TrendingUp className="w-5 h-5 text-purple-400" />}
                        {category === 'Productivity' && <Zap className="w-5 h-5 text-blue-400" />}
                        {category === 'Cloud Storage' && <Download className="w-5 h-5 text-green-400" />}
                        {category === 'AI Tools' && <Sparkles className="w-5 h-5 text-pink-400" />}
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
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Start Saving Now →
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 mt-3">
                  Based on real user data and optimization strategies
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
                <div className="neu-card rounded-2xl p-8 h-full border border-white/10 transition-all duration-300 hover:border-purple-500/30">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 transition-transform duration-300 ${hoveredFeature === index ? 'scale-110' : ''}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  
                  {/* Show concrete examples for Smart Insights */}
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
            <div className="neu-card rounded-3xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-center mb-8">
                <span className="text-gradient">All This for Free</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                      {feature.icon}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
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
              Join thousands who are already saving money by taking control over their subscriptions
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
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
                <div className="neu-card rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-bold text-gradient opacity-50">{step.number}</div>
                    <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
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
                  
                  {/* Pro features badge */}
                  {step.proFeatures && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-purple-400 mb-2 font-semibold">PRO FEATURES</p>
                      <div className="flex flex-wrap gap-2">
                        {step.proFeatures.map((feature, idx) => (
                          <div key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            {feature.icon}
                            <span className="text-xs text-purple-300">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                <h3 className="text-lg font-bold text-green-400">Your Privacy is Our Priority</h3>
                <Lock className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-gray-300 mb-2">
                🔐 <strong>Bank-level encryption</strong> • We can&apos;t see your financial data
              </p>
              <p className="text-sm text-gray-400">
                Your subscription details are encrypted end-to-end. We have zero knowledge of your spending habits, 
                payment methods, or personal financial information. Only you can see your data.
              </p>
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
              Start with our generous free plan. Upgrade when you need more power.
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
                  <span>20 categories</span>
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
              className="neu-card rounded-3xl p-8 border-2 border-purple-500/30 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-gray-400 mb-4">For power users</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gradient">$5</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Custom categories</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Auto import subscriptions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Priority support</span>
                </li>
              </ul>
              <Link href="/payment?plan=premium">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  Start Free Trial
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
                <p className="text-gray-400 text-sm mb-3">Lifetime access</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-yellow-400">$250</span>
                  <span className="text-gray-400 text-sm">once</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span>All Premium features</span>
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
                  <span>Early access</span>
                </li>
              </ul>
              <Link href="/payment?plan=forever">
                <Button className="w-full neu-button border border-yellow-500/30 hover:bg-yellow-500/10 text-sm">
                  Buy Forever
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="neu-card rounded-2xl p-6 border border-pink-500/30"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-400 text-sm mb-3">Stop unchecked expenses</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-pink-400">$200</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5" />
                  <span>Multi-user teams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5" />
                  <span>Expense audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5" />
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Link href="/payment?plan=enterprise">
                <Button className="w-full neu-button border border-pink-500/30 hover:bg-pink-500/10 text-sm">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
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
            className="neu-card rounded-3xl p-12 text-center border border-purple-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-relaxed py-2">
              Ready to Save Money?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands who are already tracking their subscriptions and saving hundreds every month.
            </p>
            <Link href="/login">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
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

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 SubTracker. Privacy-first subscription tracking.</p>
          <p className="text-xs mt-2 text-gray-500">Your spending data never leaves your control</p>
        </div>
      </footer>
    </div>
  )
}