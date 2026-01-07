"use client";

import { useState, useEffect, useCallback } from "react";
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
  Banknote,
  Loader2
} from "lucide-react";

interface LeaveRequest {
  id: string;
  employee: { fullName: string };
  type: string;
  days: number;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Real-time stats
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    monthlyPayroll: 0,
  });

  const [recentLeaveRequests, setRecentLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ FIX: Fetch all dashboard data in PARALLEL (not sequential)
  const fetchDashboardData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // ✅ PARALLEL FETCHING: All 3 requests execute simultaneously
      const [employeesData, attendanceData, leaveData] = await Promise.all([
        fetch("/api/employees?includePayroll=true").then(res => res.json()),
        fetch(`/api/attendance?startDate=${today.toISOString()}&endDate=${tomorrow.toISOString()}`).then(res => res.json()),
        fetch("/api/leave").then(res => res.json()),
      ]);

      const employees = employeesData.employees || [];
      const totalEmployees = employees.length;

      // Calculate total monthly payroll from the included data
      const monthlyPayroll = employees.reduce((sum: number, emp: any) => {
        return sum + (emp.payroll?.netSalary || 0);
      }, 0);

      const presentToday = attendanceData.attendanceRecords?.filter((a: any) => 
        a.status === "PRESENT" || a.status === "HALF_DAY"
      ).length || 0;

      const allLeaves = leaveData.leaveRequests || [];
      const pendingLeaves = allLeaves.filter((lr: any) => lr.status === "PENDING").length;
      
      // Get recent leave requests (latest 5)
      const recentLeaves = allLeaves
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      setStats({
        totalEmployees,
        presentToday,
        pendingLeaves,
        monthlyPayroll,
      });

      setRecentLeaveRequests(recentLeaves);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    fetchDashboardData();
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
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Welcome back! Here&apos;s an overview of your organization.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {mounted && currentTime && (
            <>
              <Badge variant="outline" className="text-xs sm:text-sm font-mono px-2 sm:px-3 py-1">
                <Clock className="mr-1 sm:mr-2 h-3 w-3 animate-pulse" />
                <span className="hidden sm:inline">
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </span>
                <span className="sm:hidden">
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </span>
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                <Calendar className="mr-1 h-3 w-3" />
                <span className="hidden sm:inline">
                  {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="sm:hidden">
                  {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </Badge>
            </>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 sm:mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.lightColor} p-1.5 sm:p-2 rounded-lg`}>
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center text-[10px] sm:text-xs mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1 hidden sm:inline">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="attendance" className="text-xs sm:text-sm">Attendance</TabsTrigger>
          <TabsTrigger value="payroll" className="text-xs sm:text-sm">Payroll</TabsTrigger>
          <TabsTrigger value="departments" className="text-xs sm:text-sm">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Attendance Trends</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Monthly attendance and leave patterns</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Today&apos;s Attendance</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Real-time attendance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <AttendancePieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Yearly Attendance Overview</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Attendance vs Leaves percentage</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Attendance Distribution</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Current workforce status</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <AttendancePieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Payroll & Compensation</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly payroll trends with bonuses</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <PayrollChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Department Distribution</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Employee count by department</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              <DepartmentChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Leave Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg">Recent Leave Requests</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Latest employee leave applications</CardDescription>
              </div>
              <Badge variant="secondary" className="w-fit text-xs">{recentLeaveRequests.filter(r => r.status === "pending").length} Pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentLeaveRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No leave requests</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {recentLeaveRequests.map((request) => (
                  <div key={request.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                        <AvatarFallback className="text-xs">
                          {request.employee.fullName.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">{request.employee.fullName}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          {request.type} • {request.days} day{request.days > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-11 sm:ml-0">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <Badge
                        variant={
                          request.status === "APPROVED"
                            ? "default"
                            : request.status === "REJECTED"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize text-[10px] sm:text-xs"
                      >
                        {request.status === "APPROVED" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {request.status.toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Manage your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm" asChild>
                <a href="/admin/employees">
                  <Users className="h-4 w-4 mr-2" />
                  View All Employees
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm" asChild>
                <a href="/admin/attendance">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Manage Attendance
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm" asChild>
                <a href="/admin/leave-requests">
                  <Calendar className="h-4 w-4 mr-2" />
                  Review Leave Requests
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm" asChild>
                <a href="/admin/payroll">
                  <IndianRupee className="h-4 w-4 mr-2" />
                  Process Payroll
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
