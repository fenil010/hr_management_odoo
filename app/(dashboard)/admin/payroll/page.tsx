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
  IndianRupee,
  Search,
  RefreshCw,
  Download,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Banknote,
  FileText
} from "lucide-react";

// Payroll data
const initialPayrollData = [
  { id: 1, name: "John Doe", email: "john@dayflow.com", department: "Engineering", baseSalary: 75000, bonus: 7500, deductions: 5000, netSalary: 77500, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 2, name: "Jane Smith", email: "jane@dayflow.com", department: "Design", baseSalary: 65000, bonus: 5000, deductions: 4500, netSalary: 65500, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 3, name: "Mike Davis", email: "mike@dayflow.com", department: "Marketing", baseSalary: 70000, bonus: 10000, deductions: 5200, netSalary: 74800, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 4, name: "Sarah Johnson", email: "sarah@dayflow.com", department: "HR", baseSalary: 68000, bonus: 6000, deductions: 4800, netSalary: 69200, status: "pending", paidDate: null },
  { id: 5, name: "Robert Brown", email: "robert@dayflow.com", department: "Engineering", baseSalary: 60000, bonus: 4000, deductions: 4200, netSalary: 59800, status: "pending", paidDate: null },
  { id: 6, name: "Emily Wilson", email: "emily@dayflow.com", department: "Sales", baseSalary: 55000, bonus: 12000, deductions: 4000, netSalary: 63000, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 7, name: "David Lee", email: "david@dayflow.com", department: "Engineering", baseSalary: 72000, bonus: 8000, deductions: 5100, netSalary: 74900, status: "pending", paidDate: null },
  { id: 8, name: "Lisa Chen", email: "lisa@dayflow.com", department: "Finance", baseSalary: 62000, bonus: 5500, deductions: 4400, netSalary: 63100, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 9, name: "James Taylor", email: "james@dayflow.com", department: "Support", baseSalary: 50000, bonus: 3000, deductions: 3500, netSalary: 49500, status: "pending", paidDate: null },
  { id: 10, name: "Amanda White", email: "amanda@dayflow.com", department: "Marketing", baseSalary: 45000, bonus: 2500, deductions: 3200, netSalary: 44300, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 11, name: "Chris Martin", email: "chris@dayflow.com", department: "Engineering", baseSalary: 80000, bonus: 10000, deductions: 5800, netSalary: 84200, status: "paid", paidDate: "Jan 1, 2026" },
  { id: 12, name: "Rachel Green", email: "rachel@dayflow.com", department: "Design", baseSalary: 52000, bonus: 4000, deductions: 3700, netSalary: 52300, status: "processing", paidDate: null },
];

const months = [
  "January 2026", "December 2025", "November 2025", "October 2025",
  "September 2025", "August 2025", "July 2025", "June 2025"
];

export default function AdminPayrollPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("January 2026");
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate stats
  const totalBaseSalary = payrollData.reduce((sum, e) => sum + e.baseSalary, 0);
  const totalBonus = payrollData.reduce((sum, e) => sum + e.bonus, 0);
  const totalDeductions = payrollData.reduce((sum, e) => sum + e.deductions, 0);
  const totalNetSalary = payrollData.reduce((sum, e) => sum + e.netSalary, 0);
  const paidCount = payrollData.filter(e => e.status === "paid").length;
  const pendingCount = payrollData.filter(e => e.status === "pending").length;
  const processingCount = payrollData.filter(e => e.status === "processing").length;

  const departments = [...new Set(payrollData.map(e => e.department))];

  // Filter data
  const filteredData = payrollData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPayrollData([...initialPayrollData]);
      setIsRefreshing(false);
    }, 500);
  };

  const handleProcessPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPayrollData(prev => prev.map(e => 
        e.status === "pending" ? { ...e, status: "processing" } : e
      ));
      setIsProcessing(false);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />Paid</Badge>;
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Processing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">Process and manage employee salaries</p>
        </div>
        <div className="flex items-center gap-2">
          {mounted && currentTime && (
            <Badge variant="outline" className="font-mono px-3 py-1">
              <Calendar className="h-4 w-4 mr-2" />
              {currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Badge>
          )}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Payroll</CardTitle>
            <IndianRupee className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalNetSalary)}</div>
            <p className="text-xs text-muted-foreground">{payrollData.length} employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Base Salary</CardTitle>
            <Banknote className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBaseSalary)}</div>
            <p className="text-xs text-muted-foreground">Monthly total</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 dark:border-green-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bonuses</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalBonus)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Deductions</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalDeductions)}</div>
            <p className="text-xs text-muted-foreground">Tax & benefits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Status</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge className="bg-green-500">{paidCount} Paid</Badge>
              <Badge className="bg-amber-500">{pendingCount} Pending</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedMonth}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Payslips
              </Button>
              <Button 
                onClick={handleProcessPayroll} 
                disabled={isProcessing || pendingCount === 0}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Process Pending ({pendingCount})
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Details</CardTitle>
          <CardDescription>Employee salary breakdown for {selectedMonth}</CardDescription>
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
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
                    <th className="text-right p-4 font-medium">Base Salary</th>
                    <th className="text-right p-4 font-medium">Bonus</th>
                    <th className="text-right p-4 font-medium">Deductions</th>
                    <th className="text-right p-4 font-medium">Net Salary</th>
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
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(employee.baseSalary)}
                      </td>
                      <td className="p-4 text-right text-green-600 font-medium">
                        +{formatCurrency(employee.bonus)}
                      </td>
                      <td className="p-4 text-right text-red-600 font-medium">
                        -{formatCurrency(employee.deductions)}
                      </td>
                      <td className="p-4 text-right font-bold text-lg">
                        {formatCurrency(employee.netSalary)}
                      </td>
                      <td className="p-4">
                        {getStatusBadge(employee.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 font-bold">
                    <td className="p-4" colSpan={2}>Total ({filteredData.length} employees)</td>
                    <td className="p-4 text-right">{formatCurrency(filteredData.reduce((sum, e) => sum + e.baseSalary, 0))}</td>
                    <td className="p-4 text-right text-green-600">+{formatCurrency(filteredData.reduce((sum, e) => sum + e.bonus, 0))}</td>
                    <td className="p-4 text-right text-red-600">-{formatCurrency(filteredData.reduce((sum, e) => sum + e.deductions, 0))}</td>
                    <td className="p-4 text-right text-lg">{formatCurrency(filteredData.reduce((sum, e) => sum + e.netSalary, 0))}</td>
                    <td className="p-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No payroll records found matching your filters
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
