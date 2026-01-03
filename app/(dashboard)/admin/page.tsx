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

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Fetch employees
      const employeesRes = await fetch("/api/employees");
      const employeesData = await employeesRes.json();
      const totalEmployees = employeesData.employees?.length || 0;

      // Fetch today's attendance
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const attendanceRes = await fetch(
        `/api/attendance?startDate=${today.toISOString()}&endDate=${tomorrow.toISOString()}`
      );
      const attendanceData = await attendanceRes.json();
      const presentToday = attendanceData.attendanceRecords?.filter((a: any) => 
        a.status === "PRESENT" || a.status === "HALF_DAY"
      ).length || 0;

      // Fetch leave requests
      const leaveRes = await fetch("/api/leave");
      const leaveData = await leaveRes.json();
      const allLeaves = leaveData.leaveRequests || [];
      const pendingLeaves = allLeaves.filter((lr: any) => lr.status === "PENDING").length;
      
      // Get recent leave requests (latest 5)
      const recentLeaves = allLeaves
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      // Fetch payroll - calculate total monthly payroll
      let monthlyPayroll = 0;
      if (employeesData.employees) {
        for (const emp of employeesData.employees) {
          try {
            const payrollRes = await fetch(`/api/payroll?employeeId=${emp.id}`);
            const payrollData = await payrollRes.json();
            if (payrollData.payroll) {
              monthlyPayroll += payrollData.payroll.netSalary || 0;
            }
          } catch (error) {
            console.error(`Error fetching payroll for ${emp.id}:`, error);
          }
        }
      }

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
              <div className="space-y-4">
                {recentLeaveRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs">
                          {request.employee.fullName.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{request.employee.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.type} • {request.days} day{request.days > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
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
                        className="capitalize"
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/employees">
                  <Users className="h-4 w-4 mr-2" />
                  View All Employees
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/attendance">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Manage Attendance
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/leave-requests">
                  <Calendar className="h-4 w-4 mr-2" />
                  Review Leave Requests
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
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
