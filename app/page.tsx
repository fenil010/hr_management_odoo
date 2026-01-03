"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  ChevronDown, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Award,
  Globe,
  Play
} from "lucide-react";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      id: 1,
      question: "What is DayFlow HRMS?",
      answer: "DayFlow HRMS is a comprehensive Human Resource Management System designed to streamline HR operations. It helps manage employee data, track attendance, process payroll, handle leave requests, and maintain organizational efficiency."
    },
    {
      id: 2,
      question: "How do I get started with DayFlow?",
      answer: "Getting started is simple! Click 'Get Started' to create an admin account. Once registered, you can start adding employees, setting up payroll, and managing HR operations immediately."
    },
    {
      id: 3,
      question: "Can multiple admins manage the system?",
      answer: "Yes! DayFlow supports multiple admin accounts. Each admin can have full access to manage employees, approve leaves, process payroll, and generate reports."
    },
    {
      id: 4,
      question: "Is my employee data secure?",
      answer: "Absolutely! DayFlow uses industry-standard security protocols including encrypted databases, secure authentication, and role-based access control to protect your sensitive HR data."
    },
    {
      id: 5,
      question: "Can employees access their own information?",
      answer: "Yes! Employees can log in to view their profiles, attendance records, leave requests, payroll information, and other personal details through their dashboard."
    },
    {
      id: 6,
      question: "Does DayFlow support multiple departments?",
      answer: "Yes! You can organize employees into multiple departments and manage them separately. The system supports complex organizational structures."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      description: "Perfect for small teams just getting started",
      features: [
        "Up to 25 Employees",
        "Basic Attendance Tracking",
        "Leave Management",
        "Simple Payroll",
        "Email Support",
        "Monthly Reports"
      ],
      cta: "Start Free Trial",
      highlighted: false
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "/month",
      description: "Best for growing businesses",
      features: [
        "Up to 100 Employees",
        "Advanced Attendance",
        "Full Leave Management",
        "Complete Payroll",
        "Priority Support",
        "Weekly Reports",
        "Custom Fields",
        "Multi-Department",
        "API Access"
      ],
      cta: "Start Free Trial",
      highlighted: true,
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited Employees",
        "All Pro Features",
        "Advanced Analytics",
        "Full API Access",
        "24/7 Phone Support",
        "Custom Integrations",
        "Dedicated Manager",
        "SLA Guarantee",
        "On-premise Option"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  const features = [
    { 
      icon: Users, 
      title: "Employee Management", 
      desc: "Centralized employee database with complete profile management, documents, and org charts.",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Clock, 
      title: "Smart Attendance", 
      desc: "Real-time check-in/out with geolocation, work hour tracking, and overtime calculations.",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: Calendar, 
      title: "Leave Management", 
      desc: "Streamlined leave requests, approval workflows, and automatic balance tracking.",
      color: "from-orange-500 to-red-500"
    },
    { 
      icon: CreditCard, 
      title: "Payroll Processing", 
      desc: "Automated salary calculations with tax deductions, allowances, and payment processing.",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: BarChart3, 
      title: "Analytics & Reports", 
      desc: "Comprehensive dashboards with actionable insights and exportable reports.",
      color: "from-indigo-500 to-violet-500"
    },
    { 
      icon: Shield, 
      title: "Enterprise Security", 
      desc: "Bank-grade encryption, role-based access, and complete audit trails.",
      color: "from-slate-500 to-zinc-500"
    }
  ];

  const stats = [
    { value: "500+", label: "Companies Trust Us", icon: Award },
    { value: "50,000+", label: "Active Employees", icon: Users },
    { value: "99.9%", label: "Uptime Guaranteed", icon: TrendingUp },
    { value: "24/7", label: "Support Available", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl blur opacity-30"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                DayFlow
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Features</a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Pricing</a>
              <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">FAQ</a>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-full border border-blue-100 dark:border-blue-900">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                Trusted by 500+ companies worldwide
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              HR Management
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform to manage employees, track attendance, 
              process payroll, and streamline your HR operations.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-8 py-7 h-auto shadow-xl shadow-blue-500/25 group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-7 h-auto border-2 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 h-40 bottom-0 top-auto"></div>
            <div className="relative mx-auto max-w-6xl">
              <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-2 shadow-2xl shadow-slate-900/50">
                <div className="bg-slate-800 rounded-xl overflow-hidden">
                  {/* Mock Browser Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-slate-700 rounded-md px-4 py-1.5 text-slate-400 text-sm max-w-md mx-auto">
                        dayflow.com/dashboard
                      </div>
                    </div>
                  </div>
                  {/* Mock Dashboard */}
                  <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {[
                        { label: "Total Employees", value: "248", change: "+12%", color: "blue" },
                        { label: "Present Today", value: "231", change: "93%", color: "green" },
                        { label: "On Leave", value: "17", change: "-3", color: "orange" },
                        { label: "Pending Requests", value: "8", change: "4 new", color: "purple" }
                      ].map((stat, i) => (
                        <div key={i} className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
                          <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <p className={`text-xs mt-1 ${stat.color === 'blue' ? 'text-blue-400' : stat.color === 'green' ? 'text-green-400' : stat.color === 'orange' ? 'text-orange-400' : 'text-purple-400'}`}>{stat.change}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 h-48">
                        <p className="text-slate-400 text-sm mb-4">Attendance Overview</p>
                        <div className="flex items-end gap-2 h-32">
                          {[65, 80, 75, 90, 85, 95, 88].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 h-48">
                        <p className="text-slate-400 text-sm mb-4">Departments</p>
                        <div className="space-y-3">
                          {[
                            { name: "Engineering", count: 84 },
                            { name: "Design", count: 32 },
                            { name: "Marketing", count: 28 },
                            { name: "HR", count: 12 }
                          ].map((dept, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-slate-300 text-sm">{dept.name}</span>
                              <span className="text-slate-400 text-sm">{dept.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Everything you need to
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                manage your workforce
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Streamline your HR operations with our comprehensive suite of tools designed for modern businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group relative bg-white dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-green-50 dark:bg-green-950/50 rounded-full text-green-600 dark:text-green-400 text-sm font-medium">
              <CreditCard className="w-4 h-4" />
              Simple Pricing
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Plans that scale with
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                your business
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlighted 
                    ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-2xl shadow-blue-500/25 md:scale-105 md:-my-4" 
                    : "bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${!plan.highlighted && "text-slate-900 dark:text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.highlighted ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className={`text-5xl font-bold ${!plan.highlighted && "text-slate-900 dark:text-white"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}>
                      {plan.period}
                    </span>
                  )}
                </div>

                <Link href="/register" className="block mb-8">
                  <Button 
                    size="lg"
                    className={`w-full h-auto py-4 font-semibold ${
                      plan.highlighted
                        ? "bg-white text-blue-600 hover:bg-slate-100 shadow-xl"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <div className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? "text-blue-200" : "text-green-500"}`} />
                      <span className={plan.highlighted ? "text-blue-50" : "text-slate-600 dark:text-slate-300"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-50 dark:bg-purple-950/50 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to know about DayFlow
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className={`bg-white dark:bg-slate-800/50 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFAQ === faq.id 
                    ? "border-blue-300 dark:border-blue-700 shadow-lg shadow-blue-500/10" 
                    : "border-slate-200 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800"
                }`}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    openFAQ === faq.id 
                      ? "bg-blue-100 dark:bg-blue-900 rotate-180" 
                      : "bg-slate-100 dark:bg-slate-700"
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-colors ${
                      openFAQ === faq.id 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-slate-600 dark:text-slate-400"
                    }`} />
                  </div>
                </button>
                
                <div className={`transition-all duration-300 ${openFAQ === faq.id ? "max-h-96" : "max-h-0"} overflow-hidden`}>
                  <div className="px-6 pb-5">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-12 md:p-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Ready to transform your HR?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join thousands of companies already using DayFlow to streamline their HR operations and boost productivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-7 h-auto font-semibold shadow-xl group">
                    Start Your Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button size="lg" variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 text-lg px-8 py-7 h-auto font-semibold backdrop-blur">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">DayFlow</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                Modern HR management solution designed to help businesses of all sizes streamline their workforce operations.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "Integrations", "Changelog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2026 DayFlow HRMS. All rights reserved.</p>
            <p className="text-sm">Made with ❤️ for modern businesses</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
