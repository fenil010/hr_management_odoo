"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
    },
    {
      id: 7,
      question: "What kind of reports can I generate?",
      answer: "DayFlow provides comprehensive reporting including attendance reports, payroll summaries, leave analytics, employee performance metrics, and departmental statistics."
    },
    {
      id: 8,
      question: "Is there a mobile app?",
      answer: "DayFlow is fully responsive and works on all devices including mobile phones. Employees can check in/out and view information from anywhere."
    }
  ];

  const plans = [
    {
      name: "Startup",
      price: "₹999",
      period: "/month",
      description: "Perfect for small teams",
      features: [
        "Up to 25 Employees",
        "Basic Attendance Tracking",
        "Leave Management",
        "Simple Payroll",
        "Email Support",
        "Monthly Reports"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Up to 100 Employees",
        "Advanced Attendance Tracking",
        "Comprehensive Leave Management",
        "Full Payroll Processing",
        "Priority Email Support",
        "Weekly Reports",
        "Custom Fields",
        "Multi-Department Support",
        "Bulk Import/Export"
      ],
      cta: "Try Free",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "Unlimited Employees",
        "All Professional Features",
        "Advanced Analytics",
        "API Access",
        "24/7 Phone Support",
        "Real-time Reports",
        "Custom Integrations",
        "Dedicated Account Manager",
        "Advanced Security Features"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DF</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DayFlow</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Pricing</a>
              <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">FAQ</a>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">✨ Welcome to Modern HR Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Streamline Your HR Operations
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              With DayFlow
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            All-in-one HR management solution for managing employees, tracking attendance, processing payroll, 
            and handling leave requests. Built for modern businesses of all sizes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="text-gray-600 dark:text-gray-400 text-sm">
            No credit card required • Free for first 14 days
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 md:mt-32">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</p>
            <p className="text-gray-600 dark:text-gray-300">Companies Trust Us</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50K+</p>
            <p className="text-gray-600 dark:text-gray-300">Active Employees</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">99.9%</p>
            <p className="text-gray-600 dark:text-gray-300">Uptime Guarantee</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 dark:bg-slate-800 py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage HR operations efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "👥", title: "Employee Management", desc: "Manage employee records, profiles, and org structure" },
              { icon: "📅", title: "Attendance Tracking", desc: "Real-time check-in/out with work hour calculation" },
              { icon: "🏖️", title: "Leave Management", desc: "Streamlined leave requests and approvals" },
              { icon: "💰", title: "Payroll Processing", desc: "Automated salary calculation and disbursement" },
              { icon: "📊", title: "Analytics & Reports", desc: "Comprehensive dashboards and reports" },
              { icon: "🔒", title: "Security", desc: "Enterprise-grade data protection" },
              { icon: "📱", title: "Mobile Friendly", desc: "Access from any device, anywhere" },
              { icon: "⚙️", title: "Easy Integration", desc: "Seamless setup with existing systems" }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your organization
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`rounded-2xl p-8 transition-all ${
                plan.highlighted 
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl md:scale-105" 
                  : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${!plan.highlighted && "text-gray-900 dark:text-white"}`}>
                {plan.name}
              </h3>
              <p className={`mb-6 ${plan.highlighted ? "text-blue-100" : "text-gray-600 dark:text-gray-300"}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-5xl font-bold ${!plan.highlighted && "text-gray-900 dark:text-white"}`}>
                  {plan.price}
                </span>
                <span className={plan.highlighted ? "text-blue-100" : "text-gray-600 dark:text-gray-300"}>
                  {plan.period}
                </span>
              </div>

              <Link href="/register" className="w-full block mb-8">
                <Button 
                  size="lg"
                  className={`w-full h-auto py-3 ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>

              <div className={`space-y-4 ${plan.highlighted ? "text-blue-50" : "text-gray-600 dark:text-gray-300"}`}>
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <span className="text-lg">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 dark:bg-slate-800 py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find answers to common questions about DayFlow
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-white dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-600 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your HR?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ companies already using DayFlow to streamline their HR operations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="#faq">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700 text-lg px-8 py-6 h-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">DayFlow</h4>
              <p className="text-sm">Modern HR management solution for every business.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="text-sm space-y-2">
                <li><a href="mailto:support@dayflow.com" className="hover:text-white transition">support@dayflow.com</a></li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 DayFlow HRMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
