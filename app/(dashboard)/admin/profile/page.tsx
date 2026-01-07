"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!session?.user?.email) return;
        
        const res = await fetch(`/api/employees?email=${session.user.email}`);
        const data = await res.json();
        
        if (data.employee) {
          setEmployee(data.employee);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your personal information and settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-blue-100">
                <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-500 text-white text-2xl sm:text-3xl font-medium">
                  {getInitials(employee?.fullName || session?.user?.name || "User")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl sm:text-2xl">{employee?.fullName || session?.user?.name}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{session?.user?.email}</CardDescription>
            <div className="flex flex-wrap justify-center gap-2 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                ADMIN
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground break-all">{session?.user?.email}</span>
              </div>
              {employee?.phone && (
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
              )}
              {employee?.designation && (
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{employee.designation}</span>
                </div>
              )}
              {employee?.department && (
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{employee.department}</span>
                </div>
              )}
              {employee?.joiningDate && (
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    Joined {new Date(employee.joiningDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <CardHeader className="p-4 sm:p-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal" className="text-xs sm:text-sm">Personal Info</TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6">
              <TabsContent value="personal" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Personal Information</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Update your personal details</p>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="w-full sm:w-auto">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" className="flex-1 sm:flex-none">
                        <X className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Cancel</span>
                      </Button>
                      <Button size="sm" className="flex-1 sm:flex-none">
                        <Save className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Save</span>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs sm:text-sm">Full Name</Label>
                    <Input
                      id="fullName"
                      value={employee?.fullName || ""}
                      disabled={!isEditing}
                      className={cn(!isEditing && "bg-muted", "text-sm")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                      className="bg-muted text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">Phone</Label>
                    <Input
                      id="phone"
                      value={employee?.phone || ""}
                      disabled={!isEditing}
                      className={cn(!isEditing && "bg-muted", "text-sm")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCode" className="text-xs sm:text-sm">Employee Code</Label>
                    <Input
                      id="employeeCode"
                      value={employee?.employeeCode || ""}
                      disabled
                      className="bg-muted text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-xs sm:text-sm">Designation</Label>
                    <Input
                      id="designation"
                      value={employee?.designation || ""}
                      disabled
                      className="bg-muted text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-xs sm:text-sm">Department</Label>
                    <Input
                      id="department"
                      value={employee?.department || ""}
                      disabled
                      className="bg-muted text-sm"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address" className="text-xs sm:text-sm">Address</Label>
                    <Input
                      id="address"
                      value={employee?.address || ""}
                      disabled={!isEditing}
                      className={cn(!isEditing && "bg-muted", "text-sm")}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold">Security Settings</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manage your password and security preferences</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-xs sm:text-sm">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-xs sm:text-sm">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="text-sm" />
                  </div>
                  <Button className="w-full text-sm">
                    Update Password
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
