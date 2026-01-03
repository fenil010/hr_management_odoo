"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  LogIn, 
  LogOut, 
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer
} from "lucide-react";

const monthlyAttendance = [
  { date: "2026-01-03", day: "Friday", checkIn: "09:15 AM", checkOut: null, status: "present", hours: "4h 30m" },
  { date: "2026-01-02", day: "Thursday", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", hours: "9h 00m" },
  { date: "2026-01-01", day: "Wednesday", checkIn: null, checkOut: null, status: "holiday", hours: "-" },
  { date: "2025-12-31", day: "Tuesday", checkIn: "09:30 AM", checkOut: "06:30 PM", status: "present", hours: "9h 00m" },
  { date: "2025-12-30", day: "Monday", checkIn: "09:00 AM", checkOut: "01:00 PM", status: "half-day", hours: "4h 00m" },
  { date: "2025-12-29", day: "Sunday", checkIn: null, checkOut: null, status: "weekend", hours: "-" },
  { date: "2025-12-28", day: "Saturday", checkIn: null, checkOut: null, status: "weekend", hours: "-" },
  { date: "2025-12-27", day: "Friday", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", hours: "9h 00m" },
  { date: "2025-12-26", day: "Thursday", checkIn: null, checkOut: null, status: "leave", hours: "-" },
  { date: "2025-12-25", day: "Wednesday", checkIn: null, checkOut: null, status: "holiday", hours: "-" },
];

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
    case "holiday":
      return <Badge variant="secondary">Holiday</Badge>;
    case "weekend":
      return <Badge variant="outline">Weekend</Badge>;
    case "checked-out":
      return <Badge className="bg-slate-500">Checked Out</Badge>;
    default:
      return <Badge variant="secondary">-</Badge>;
  }
};

export default function EmployeeAttendancePage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const [mounted, setMounted] = useState(false);

  // Initialize and update current time
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate elapsed time when checked in
  useEffect(() => {
    if (checkInTime && !isCheckedOut && currentTime) {
      const diff = currentTime.getTime() - checkInTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setElapsedTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
  }, [currentTime, checkInTime, isCheckedOut]);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
    setIsCheckedOut(false);
    setCheckOutTime(null);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setIsCheckedOut(true);
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getTodayStatus = () => {
    if (isCheckedOut) return "checked-out";
    if (isCheckedIn) return "present";
    return "not-marked";
  };

  const todayDate = mounted && currentTime 
    ? currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : "Loading...";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Attendance</h1>
        <p className="text-muted-foreground">Track your daily attendance and work hours</p>
      </div>

      {/* Today's Attendance Card */}
      <Card className="border-2 border-blue-200 dark:border-blue-900 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today&apos;s Attendance
              </CardTitle>
              <CardDescription className="mt-1">{todayDate}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {mounted && currentTime && (
                <Badge variant="outline" className="font-mono text-lg px-3 py-1">
                  <Clock className="h-4 w-4 mr-2" />
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </Badge>
              )}
              {getStatusBadge(getTodayStatus())}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Check In */}
            <div className="bg-card dark:bg-card/80 rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Check In</span>
                <LogIn className="h-4 w-4 text-green-500" />
              </div>
              {isCheckedIn ? (
                <div>
                  <p className="text-2xl font-bold text-green-600">{formatTime(checkInTime)}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Checked in successfully
                  </p>
                </div>
              ) : (
                <Button 
                  onClick={handleCheckIn} 
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={isCheckedIn}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Check In
                </Button>
              )}
            </div>

            {/* Check Out */}
            <div className="bg-card dark:bg-card/80 rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Check Out</span>
                <LogOut className="h-4 w-4 text-red-500" />
              </div>
              {isCheckedOut ? (
                <div>
                  <p className="text-2xl font-bold text-red-600">{formatTime(checkOutTime)}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-red-500" />
                    Checked out successfully
                  </p>
                </div>
              ) : isCheckedIn ? (
                <Button 
                  onClick={handleCheckOut} 
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Check Out
                </Button>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">--:--</p>
                  <p className="text-xs text-muted-foreground mt-1">Check in first</p>
                </div>
              )}
            </div>

            {/* Work Hours - Live Timer */}
            <div className="bg-card dark:bg-card/80 rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Work Hours</span>
                <Timer className={`h-4 w-4 ${isCheckedIn && !isCheckedOut ? "text-green-500 animate-pulse" : "text-blue-500"}`} />
              </div>
              <p className={`text-2xl font-bold font-mono ${isCheckedIn && !isCheckedOut ? "text-green-600" : "text-blue-600"}`}>
                {isCheckedIn ? elapsedTime : "00:00:00"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isCheckedIn && !isCheckedOut ? (
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Working...
                  </span>
                ) : isCheckedOut ? (
                  "Day completed"
                ) : (
                  "Not started"
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Your recent attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyAttendance.map((record, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      record.status === "weekend" || record.status === "holiday" 
                        ? "bg-muted/30" 
                        : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-15">
                        <p className="text-lg font-bold">{new Date(record.date).getDate()}</p>
                        <p className="text-xs text-muted-foreground">{record.day.slice(0, 3)}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(record.status)}
                        </div>
                        {record.checkIn && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {record.checkIn} - {record.checkOut || "Working..."}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{record.hours}</p>
                      <p className="text-xs text-muted-foreground">Hours</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary - January 2026</CardTitle>
              <CardDescription>Your attendance overview for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-600">22</p>
                  <p className="text-sm text-green-600">Present Days</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-xl">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-red-600">1</p>
                  <p className="text-sm text-red-600">Absent Days</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-amber-600">1</p>
                  <p className="text-sm text-amber-600">Half Days</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-blue-600">Leave Days</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Work Hours</span>
                  <span className="text-2xl font-bold">176h 30m</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                  <span>Expected Hours</span>
                  <span>184h 00m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Important Notice</h4>
              <p className="text-sm text-amber-700 mt-1">
                You cannot edit past attendance records. If you have any discrepancies, 
                please contact your manager or HR department for corrections.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
