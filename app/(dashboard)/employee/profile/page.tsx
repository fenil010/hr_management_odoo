"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Briefcase, 
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Shield
} from "lucide-react";

// Mock employee data - In production, fetch from API
const employeeData = {
  id: "EMP-001",
  fullName: "John Doe",
  email: "john@dayflow.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, New York, NY 10001",
  department: "Engineering",
  designation: "Software Developer",
  joiningDate: "2024-03-15",
  role: "EMPLOYEE",
  profilePhoto: null,
};

export default function EmployeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: employeeData.phone,
    address: employeeData.address,
  });

  const handleSave = () => {
    // In production, save to API
    console.log("Saving:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      phone: employeeData.phone,
      address: employeeData.address,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and manage your personal information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="mt-4 md:mt-0">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={employeeData.profilePhoto || ""} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {employeeData.fullName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold">{employeeData.fullName}</h2>
              <p className="text-muted-foreground">{employeeData.designation}</p>
              <Badge className="mt-2" variant="secondary">
                <Shield className="h-3 w-3 mr-1" />
                {employeeData.role}
              </Badge>
              
              <div className="w-full mt-6 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{employeeData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(employeeData.joiningDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              {isEditing 
                ? "You can edit your phone number and address" 
                : "Your personal and professional details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Read-only fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Employee ID
                </label>
                <div className="p-3 bg-muted rounded-lg font-mono">
                  {employeeData.id}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  {employeeData.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  {employeeData.email}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Department
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  {employeeData.department}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Designation
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  {employeeData.designation}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joining Date
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  {new Date(employeeData.joiningDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-4">
                Editable Information
                {isEditing && <span className="text-sm font-normal text-muted-foreground ml-2">(Currently editing)</span>}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg">
                      {employeeData.phone}
                    </div>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg">
                      {employeeData.address}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Information Notice</h4>
              <p className="text-sm text-amber-700 mt-1">
                For changes to your name, email, department, designation, or salary, please contact the HR department. 
                You can only update your phone number and address from this page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
