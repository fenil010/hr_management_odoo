"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AttendanceChart } from "@/components/charts/attendance-chart";
import { DepartmentChart } from "@/components/charts/department-chart";
import { AttendancePieChart } from "@/components/charts/attendance-pie-chart";
import { PayrollChart } from "@/components/charts/payroll-chart";
import { 
  Users, 
  UserCheck, 
  Clock, 
  IndianRupee, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  XCircle,
  Banknote
} from "lucide-react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Real-time stats
  const [stats, setStats] = useState({
    totalEmployees: 170,
    presentToday: 142,
    pendingLeaves: 8,
    monthlyPayroll: 7800000, // 78 Lakhs
  });

  const [recentLeaveRequests, setRecentLeaveRequests] = useState([
    { id: 1, name: "John Smith", type: "Sick Leave", days: 2, status: "pending", date: "Jan 3, 2026" },
    { id: 2, name: "Sarah Johnson", type: "Vacation", days: 5, status: "approved", date: "Jan 2, 2026" },
    { id: 3, name: "Mike Davis", type: "Personal", days: 1, status: "pending", date: "Jan 2, 2026" },
    { id: 4, name: "Emily Brown", type: "Vacation", days: 3, status: "rejected", date: "Jan 1, 2026" },
    { id: 5, name: "James Wilson", type: "Sick Leave", days: 1, status: "approved", date: "Dec 31, 2025" },
  ]);

  const [topPerformers] = useState([
    { name: "Alice Chen", department: "Engineering", score: 98, avatar: "AC" },
    { name: "Bob Martinez", department: "Sales", score: 96, avatar: "BM" },
    { name: "Carol White", department: "Marketing", score: 94, avatar: "CW" },
    { name: "David Lee", department: "Support", score: 92, avatar: "DL" },
    { name: "Eva Garcia", department: "HR", score: 90, avatar: "EG" },
  ]);

  const [upcomingEvents] = useState([
    { title: "Team Meeting", date: "Jan 4, 2026", time: "10:00 AM", type: "meeting" },
    { title: "Payroll Processing", date: "Jan 5, 2026", time: "9:00 AM", type: "payroll" },
    { title: "Performance Reviews", date: "Jan 10, 2026", time: "2:00 PM", type: "review" },
    { title: "Company Holiday", date: "Jan 26, 2026", time: "All Day", type: "holiday" },
  ]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate data refresh with slight variations
      setStats({
        totalEmployees: 170 + Math.floor(Math.random() * 3),
        presentToday: 140 + Math.floor(Math.random() * 10),
        pendingLeaves: 5 + Math.floor(Math.random() * 6),
        monthlyPayroll: 7800000 + Math.floor(Math.random() * 100000),
      });
      setIsRefreshing(false);
    }, 500);
  };

  const handleLeaveAction = (id: number, action: "approve" | "reject") => {
    setRecentLeaveRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: action === "approve" ? "approved" : "rejected" } : req
      )
    );
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const attendanceRate = ((stats.presentToday / stats.totalEmployees) * 100).toFixed(1);

  const statsCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees.toString(),
      change: "+12%",
      trend: "up",
      icon: Users,
      lightColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Present Today",
      value: stats.presentToday.toString(),
      change: `${attendanceRate}%`,
      trend: "up",
      icon: UserCheck,
      lightColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Pending Leaves",
      value: stats.pendingLeaves.toString(),
      change: "-3",
      trend: "down",
      icon: Clock,
      lightColor: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Monthly Payroll",
      value: formatCurrency(stats.monthlyPayroll),
      change: "+5.2%",
      trend: "up",
      icon: IndianRupee,
      lightColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {mounted && currentTime && (
            <Badge variant="outline" className="text-sm font-mono px-3 py-1">
              <Clock className="mr-2 h-3 w-3 animate-pulse" />
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </Badge>
          )}
          {mounted && currentTime && (
            <Badge variant="outline" className="text-sm">
              <Calendar className="mr-1 h-3 w-3" />
              {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.lightColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Monthly attendance and leave patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Today&apos;s Attendance</CardTitle>
                <CardDescription>Real-time attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendancePieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Attendance Overview</CardTitle>
                <CardDescription>Attendance vs Leaves percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
                <CardDescription>Current workforce status</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendancePieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll & Compensation</CardTitle>
              <CardDescription>Monthly payroll trends with bonuses</CardDescription>
            </CardHeader>
            <CardContent>
              <PayrollChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>Employee count by department</CardDescription>
            </CardHeader>
            <CardContent>
              <DepartmentChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Leave Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leave Requests</CardTitle>
                <CardDescription>Latest employee leave applications</CardDescription>
              </div>
              <Badge variant="secondary">{recentLeaveRequests.filter(r => r.status === "pending").length} Pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeaveRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">
                        {request.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{request.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.type} • {request.days} day{request.days > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{request.date}</span>
                    {request.status === "pending" ? (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-100"
                          onClick={() => handleLeaveAction(request.id, "approve")}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleLeaveAction(request.id, "reject")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {request.status === "approved" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {request.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>This month&apos;s best employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{performer.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{performer.name}</p>
                    <p className="text-xs text-muted-foreground">{performer.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{performer.score}%</p>
                    <Progress value={performer.score} className="w-16 h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Important dates and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`p-2 rounded-lg ${
                  event.type === "meeting" ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" :
                  event.type === "payroll" ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" :
                  event.type === "review" ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400" :
                  "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400"
                }`}>
                  {event.type === "meeting" ? <Users className="h-4 w-4" /> :
                   event.type === "payroll" ? <Banknote className="h-4 w-4" /> :
                   event.type === "review" ? <FileText className="h-4 w-4" /> :
                   <Calendar className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
