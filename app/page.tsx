import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">DayFlow HRMS</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Modern HR Management
            <span className="block text-blue-600 mt-2">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Streamline your human resources operations with our comprehensive 
            HRMS solution. Manage employees, track attendance, process payroll, 
            and handle leave requests all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
            <p className="text-muted-foreground">
              Manage employee records, profiles, and organizational structure efficiently.
            </p>
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
            <p className="text-muted-foreground">
              Real-time attendance monitoring with check-in/check-out capabilities.
            </p>
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
            <div className="text-4xl mb-4">🏖️</div>
            <h3 className="text-xl font-semibold mb-2">Leave Management</h3>
            <p className="text-muted-foreground">
              Simplified leave request submission and approval workflow.
            </p>
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Payroll Processing</h3>
            <p className="text-muted-foreground">
              Automated payroll calculation and salary disbursement management.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2026 DayFlow HRMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
