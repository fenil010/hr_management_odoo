"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CalendarCheck, 
  CalendarPlus, 
  User, 
  Clock, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell
} from "lucide-react";

// Mock data - In production, this would come from API/session
const employeeData = {
  name: "John Doe",
  email: "john@dayflow.com",
  department: "Engineering",
  designation: "Software Developer",
  employeeId: "EMP-001",
};

const todayAttendance = {
  status: "present", // present, absent, half-day, leave, not-marked
  checkIn: "09:15 AM",
  checkOut: null,
};

const leaveStats = {
  pending: 1,
  approved: 5,
  remaining: 12,
  total: 20,
};

const recentNotifications = [
  { id: 1, message: "Your leave request has been approved", time: "2 hours ago", type: "success" },
  { id: 2, message: "Payroll for December has been processed", time: "1 day ago", type: "info" },
  { id: 3, message: "Please complete your profile", time: "3 days ago", type: "warning" },
];

export default function EmployeePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      case "half-day":
        return <Badge className="bg-amber-500">Half Day</Badge>;
      case "leave":
        return <Badge className="bg-blue-500">On Leave</Badge>;
      default:
        return <Badge variant="secondary">Not Marked</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-xl">
              {employeeData.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {employeeData.name.split(" ")[0]}!</h1>
            <p className="text-blue-100">{employeeData.designation} • {employeeData.department}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-3xl font-bold">
            {mounted && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}
          </p>
          <p className="text-blue-100">
            {mounted && currentTime 
              ? currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
              : "Loading..."}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today&apos;s Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {getStatusBadge(todayAttendance.status)}
            </div>
            {todayAttendance.checkIn && (
              <p className="text-xs text-muted-foreground mt-2">
                Check-in: {todayAttendance.checkIn}
                {todayAttendance.checkOut && ` • Check-out: ${todayAttendance.checkOut}`}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Leaves</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leaveStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leaves Remaining</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leaveStats.remaining}</div>
            <p className="text-xs text-muted-foreground">Out of {leaveStats.total} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Leaves</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leaveStats.approved}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Notifications */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks at your fingertips</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/employee/attendance">
              <Button className="w-full justify-start gap-3" variant="outline">
                <CalendarCheck className="h-5 w-5 text-green-500" />
                Mark Attendance
              </Button>
            </Link>
            <Link href="/employee/leave">
              <Button className="w-full justify-start gap-3" variant="outline">
                <CalendarPlus className="h-5 w-5 text-blue-500" />
                Apply for Leave
              </Button>
            </Link>
            <Link href="/employee/profile">
              <Button className="w-full justify-start gap-3" variant="outline">
                <User className="h-5 w-5 text-purple-500" />
                View Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent updates and alerts</CardDescription>
              </div>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  {notification.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />}
                  {notification.type === "info" && <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
                  {notification.type === "warning" && <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Month&apos;s Attendance</CardTitle>
          <CardDescription>Your attendance summary for January 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">22</div>
              <p className="text-sm text-green-600">Present</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <p className="text-sm text-red-600">Absent</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">0</div>
              <p className="text-sm text-amber-600">Half Day</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <p className="text-sm text-blue-600">On Leave</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
