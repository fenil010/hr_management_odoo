"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
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
  Play,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20" 
          : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl blur opacity-30"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                DayFlow
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Features</a>
              <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">Pricing</a>
              <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium">FAQ</a>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="hidden sm:block">
                <Button className="font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              {/* Mobile menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      DayFlow
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <a 
                      href="#features" 
                      className="text-lg font-medium hover:text-primary transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Features
                    </a>
                    <a 
                      href="#pricing" 
                      className="text-lg font-medium hover:text-primary transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </a>
                    <a 
                      href="#faq" 
                      className="text-lg font-medium hover:text-primary transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </a>
                    <Separator className="my-2" />
                    <Link href="/login">
                      <Button variant="outline" className="w-full" size="lg">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full" size="lg">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 sm:mb-8 px-3 sm:px-4 py-2 text-xs sm:text-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 500+ companies worldwide
            </Badge>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-4">
              HR Management
              <span className="block mt-2 bg-gradient-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              The all-in-one platform to manage employees, track attendance, 
              process payroll, and streamline your HR operations.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground px-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-12 sm:mt-20 relative px-4">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 h-32 sm:h-40 bottom-0 top-auto"></div>
            <div className="relative mx-auto max-w-6xl">
              <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-2xl shadow-slate-900/50">
                <div className="bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden">
                  {/* Mock Browser Bar */}
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border-b border-slate-700">
                    <div className="flex gap-1 sm:gap-1.5">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
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
      <section className="py-12 sm:py-16 md:py-20 border-y">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 mb-4">
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
              Everything you need to
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                manage your workforce
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Streamline your HR operations with our comprehensive suite of tools designed for modern businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
              Plans that scale with
              <span className="block bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                your business
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <Card 
                key={i} 
                className={`relative transition-all duration-300 ${
                  plan.highlighted 
                    ? "border-primary shadow-2xl lg:scale-105 lg:-my-4" 
                    : "hover:shadow-lg"
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900">
                    {plan.badge}
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm sm:text-base text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <Link href="/register" className="block mb-6">
                    <Button 
                      size="lg"
                      variant={plan.highlighted ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-500" />
                        <span className="text-sm sm:text-base text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Everything you need to know about DayFlow
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-violet-600 border-none text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            <CardContent className="relative text-center max-w-3xl mx-auto py-12 sm:py-16 md:py-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Ready to transform your HR?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
                Join thousands of companies already using DayFlow to streamline their HR operations and boost productivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 group">
                    Start Your Free Trial
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 text-base sm:text-lg h-12 sm:h-14">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-slate-400 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
            <div className="sm:col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">DayFlow</span>
              </div>
              <p className="text-sm sm:text-base text-slate-400 mb-6 max-w-sm">
                Modern HR management solution designed to help businesses of all sizes streamline their workforce operations.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Features", "Pricing", "Integrations", "Changelog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition text-sm sm:text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition text-sm sm:text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition text-sm sm:text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
            <p className="text-xs sm:text-sm">© 2026 DayFlow HRMS. All rights reserved.</p>
            <p className="text-xs sm:text-sm">Made with ❤️ for modern businesses</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
