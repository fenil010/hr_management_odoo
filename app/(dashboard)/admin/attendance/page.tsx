"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Clock, 
  Users, 
  UserCheck, 
  UserX, 
  Calendar,
  Search,
  RefreshCw,
  Download,
  AlertCircle
} from "lucide-react";

// Real-time attendance data
const initialAttendanceData = [
  { id: 1, name: "John Doe", email: "john@dayflow.com", department: "Engineering", checkIn: "09:00 AM", checkOut: "06:15 PM", status: "present", workHours: "9h 15m" },
  { id: 2, name: "Jane Smith", email: "jane@dayflow.com", department: "Design", checkIn: "09:30 AM", checkOut: null, status: "present", workHours: "Working..." },
  { id: 3, name: "Mike Davis", email: "mike@dayflow.com", department: "Marketing", checkIn: "08:45 AM", checkOut: "05:00 PM", status: "present", workHours: "8h 15m" },
  { id: 4, name: "Sarah Johnson", email: "sarah@dayflow.com", department: "HR", checkIn: null, checkOut: null, status: "leave", workHours: "-" },
  { id: 5, name: "Robert Brown", email: "robert@dayflow.com", department: "Engineering", checkIn: "10:15 AM", checkOut: null, status: "late", workHours: "Working..." },
  { id: 6, name: "Emily Wilson", email: "emily@dayflow.com", department: "Sales", checkIn: null, checkOut: null, status: "absent", workHours: "-" },
  { id: 7, name: "David Lee", email: "david@dayflow.com", department: "Engineering", checkIn: "09:05 AM", checkOut: null, status: "present", workHours: "Working..." },
  { id: 8, name: "Lisa Chen", email: "lisa@dayflow.com", department: "Finance", checkIn: "08:55 AM", checkOut: "06:00 PM", status: "present", workHours: "9h 05m" },
  { id: 9, name: "James Taylor", email: "james@dayflow.com", department: "Support", checkIn: "09:00 AM", checkOut: null, status: "present", workHours: "Working..." },
  { id: 10, name: "Amanda White", email: "amanda@dayflow.com", department: "Marketing", checkIn: null, checkOut: null, status: "absent", workHours: "-" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "present":
      return <Badge className="bg-green-500 hover:bg-green-600">Present</Badge>;
    case "absent":
      return <Badge variant="destructive">Absent</Badge>;
    case "late":
      return <Badge className="bg-amber-500 hover:bg-amber-600">Late</Badge>;
    case "leave":
      return <Badge className="bg-blue-500 hover:bg-blue-600">On Leave</Badge>;
    default:
      return <Badge variant="secondary">-</Badge>;
  }
};

export default function AdminAttendancePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate stats
  const totalEmployees = attendanceData.length;
  const presentCount = attendanceData.filter(e => e.status === "present" || e.status === "late").length;
  const absentCount = attendanceData.filter(e => e.status === "absent").length;
  const leaveCount = attendanceData.filter(e => e.status === "leave").length;
  const lateCount = attendanceData.filter(e => e.status === "late").length;
  const attendanceRate = ((presentCount / totalEmployees) * 100).toFixed(1);

  // Filter data
  const filteredData = attendanceData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(attendanceData.map(e => e.department))];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAttendanceData([...initialAttendanceData]);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
          <p className="text-muted-foreground">Monitor and manage employee attendance in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          {mounted && currentTime && (
            <Badge variant="outline" className="font-mono text-lg px-4 py-2">
              <Clock className="h-4 w-4 mr-2 animate-pulse" />
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </Badge>
          )}
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 dark:border-green-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{presentCount}</div>
            <p className="text-xs text-muted-foreground">{attendanceRate}% attendance rate</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{absentCount}</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On Leave</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{leaveCount}</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 dark:border-amber-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Late Arrivals</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{lateCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Attendance</CardTitle>
          <CardDescription>
            {mounted && currentTime && currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium">Employee</th>
                    <th className="text-left p-4 font-medium">Department</th>
                    <th className="text-left p-4 font-medium">Check In</th>
                    <th className="text-left p-4 font-medium">Check Out</th>
                    <th className="text-left p-4 font-medium">Work Hours</th>
                    <th className="text-left p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {employee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{employee.department}</Badge>
                      </td>
                      <td className="p-4">
                        <span className={employee.checkIn ? "text-green-600 font-medium" : "text-muted-foreground"}>
                          {employee.checkIn || "-"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={employee.checkOut ? "text-red-600 font-medium" : "text-muted-foreground"}>
                          {employee.checkOut || (employee.checkIn ? "Working" : "-")}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={employee.workHours === "Working..." ? "text-green-600 font-medium animate-pulse" : ""}>
                          {employee.workHours}
                        </span>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(employee.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No employees found matching your filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
