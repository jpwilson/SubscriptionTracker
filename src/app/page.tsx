'use client'

import { useEffect, useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { TrendingUp, Bell, BarChart3, Sparkles, ArrowRight, CheckCircle2, CreditCard, Calendar, Tag, PieChart, Download, Moon, Shield, Zap, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/supabase-auth-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LandingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  
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
      description: "Monitor all your subscriptions in one place. See exactly where your money goes each month.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Get Reminders",
      description: "Never miss a payment or forget to cancel. Get notified before renewals and free trials end.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Insights",
      description: "Get personalized recommendations like 'You're paying 2x more than average' and 'Cancel these 3 unused subscriptions'.",
      gradient: "from-pink-500 to-orange-500"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Sign Up Free",
      description: "Create your account in seconds. No credit card required.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      number: "02",
      title: "Add Subscriptions",
      description: "Quickly add all your subscriptions with our smart entry system.",
      icon: <PieChart className="w-5 h-5" />
    },
    {
      number: "03",
      title: "Save Money",
      description: "Get insights, reminders, and discover unused subscriptions.",
      icon: <Zap className="w-5 h-5" />
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
              <span className="text-sm text-purple-300">Save 30% on average with smart tracking</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Take Control</span>
              <br />
              <span className="text-white">of Your Subscriptions</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              The average person wastes <span className="text-purple-400 font-semibold">$273/month</span> on forgotten subscriptions. 
              SubTracker helps you track, manage, and optimize all your subscriptions in one place.
            </p>

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
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Everything You Need to Save Money
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you track, manage, and optimize your subscriptions
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
                  <p className="text-gray-400">{feature.description}</p>
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
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
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
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>3 insights</span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
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
          <p>&copy; 2025 SubTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}