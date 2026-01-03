import { PrismaClient } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import path from "path";

// Load environment variables from parent directory
config({ path: path.join(__dirname, "../.env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data (optional)
  await prisma.attendance.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.payroll.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing data");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@dayflow.com",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("👨‍💼 Created admin user: admin@dayflow.com");

  // Create employee users
  const employeePassword = await bcrypt.hash("employee123", 10);
  
  const johnUser = await prisma.user.create({
    data: {
      email: "john@dayflow.com",
      password: employeePassword,
      role: "EMPLOYEE",
      isActive: true,
    },
  });

  const janeUser = await prisma.user.create({
    data: {
      email: "jane@dayflow.com",
      password: employeePassword,
      role: "EMPLOYEE",
      isActive: true,
    },
  });

  console.log("👥 Created employee users");

  // Create employee profiles
  const john = await prisma.employee.create({
    data: {
      userId: johnUser.id,
      employeeCode: "EMP001",
      fullName: "John Doe",
      phone: "+1234567890",
      address: "123 Main St, New York, NY 10001",
      designation: "Senior Developer",
      department: "IT",
      joiningDate: new Date("2023-01-15"),
    },
  });

  const jane = await prisma.employee.create({
    data: {
      userId: janeUser.id,
      employeeCode: "EMP002",
      fullName: "Jane Smith",
      phone: "+1234567891",
      address: "456 Oak Ave, San Francisco, CA 94102",
      designation: "UI/UX Designer",
      department: "Design",
      joiningDate: new Date("2023-02-20"),
    },
  });

  console.log("📋 Created employee profiles");

  // Create payroll records
  await prisma.payroll.create({
    data: {
      employeeId: john.id,
      basicSalary: 60000,
      hra: 15000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 78000,
    },
  });

  await prisma.payroll.create({
    data: {
      employeeId: jane.id,
      basicSalary: 55000,
      hra: 13750,
      allowances: 4500,
      deductions: 1800,
      netSalary: 71450,
    },
  });

  console.log("💰 Created payroll records");

  // Create attendance records for the past week
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // John's attendance
    await prisma.attendance.create({
      data: {
        employeeId: john.id,
        date: date,
        status: i === 0 ? "PRESENT" : i === 5 ? "LEAVE" : "PRESENT",
        checkIn: i !== 5 ? new Date(date.setHours(9, 0, 0)) : null,
        checkOut: i !== 5 ? new Date(date.setHours(17, 30, 0)) : null,
      },
    });

    // Jane's attendance
    await prisma.attendance.create({
      data: {
        employeeId: jane.id,
        date: date,
        status: i === 3 ? "HALF_DAY" : "PRESENT",
        checkIn: new Date(date.setHours(9, 15, 0)),
        checkOut: i === 3 ? new Date(date.setHours(13, 0, 0)) : new Date(date.setHours(17, 45, 0)),
      },
    });
  }

  console.log("📅 Created attendance records");

  // Create leave requests
  await prisma.leaveRequest.create({
    data: {
      employeeId: john.id,
      type: "PAID",
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-01-17"),
      days: 3,
      reason: "Family vacation",
      status: "PENDING",
    },
  });

  await prisma.leaveRequest.create({
    data: {
      employeeId: jane.id,
      type: "SICK",
      startDate: new Date("2025-12-20"),
      endDate: new Date("2025-12-21"),
      days: 2,
      reason: "Medical appointment",
      status: "APPROVED",
      approvedBy: admin.id,
      approvedAt: new Date("2025-12-18"),
      adminComment: "Get well soon!",
    },
  });

  // Additional leave request for John (approved)
  await prisma.leaveRequest.create({
    data: {
      employeeId: john.id,
      type: "SICK",
      startDate: new Date("2025-12-10"),
      endDate: new Date("2025-12-10"),
      days: 1,
      reason: "Doctor appointment",
      status: "APPROVED",
      approvedBy: admin.id,
      approvedAt: new Date("2025-12-09"),
    },
  });

  console.log("🏖️  Created leave requests");

  console.log("\n✅ Database seed completed successfully!");
  console.log("\n📧 Login Credentials:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin:");
  console.log("  Email: admin@dayflow.com");
  console.log("  Password: admin123");
  console.log("\nEmployees:");
  console.log("  Email: john@dayflow.com");
  console.log("  Password: employee123");
  console.log("\n  Email: jane@dayflow.com");
  console.log("  Password: employee123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
