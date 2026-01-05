import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET attendance records
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get("employeeId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Get current user to check permissions
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { employee: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Build where clause
    const where: Record<string, unknown> = {};

    // If employeeId is provided and user is admin, allow viewing any employee's attendance
    // If employeeId is provided and user is employee, only allow viewing their own attendance
    // If no employeeId, show current user's attendance
    if (employeeId) {
      if (user.role === "ADMIN") {
        where.employeeId = employeeId;
      } else if (user.role === "EMPLOYEE" && user.employee?.id === employeeId) {
        where.employeeId = employeeId;
      } else {
        return NextResponse.json({ error: "Unauthorized to view this attendance" }, { status: 403 });
      }
    } else {
      // No employeeId provided, show current user's attendance
      if (!user.employee) {
        return NextResponse.json({ error: "Employee profile not found" }, { status: 404 });
      }
      where.employeeId = user.employee.id;
    }

    // Date range filtering
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where,
      include: {
        employee: {
          select: {
            id: true,
            fullName: true,
            employeeCode: true,
            department: true,
            designation: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({ attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({ error: "Failed to fetch attendance records" }, { status: 500 });
  }
}

// POST check-in or check-out
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { employeeId, type } = body; // type: "checkIn" or "checkOut"

    if (!employeeId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { employee: true },
    });

    if (!user?.employee) {
      return NextResponse.json({ error: "Employee profile not found" }, { status: 404 });
    }

    // Employees can only check in/out for themselves
    if (user.role === "EMPLOYEE" && user.employee.id !== employeeId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if attendance record exists for today
    let attendance = await prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
    });

    if (type === "checkIn") {
      if (attendance) {
        return NextResponse.json({ error: "Already checked in today" }, { status: 400 });
      }

      // Create new attendance record with check-in
      attendance = await prisma.attendance.create({
        data: {
          employeeId,
          date: today,
          status: "PRESENT",
          checkIn: now,
        },
      });
    } else if (type === "checkOut") {
      if (!attendance) {
        return NextResponse.json({ error: "Please check in first" }, { status: 400 });
      }

      if (attendance.checkOut) {
        return NextResponse.json({ error: "Already checked out today" }, { status: 400 });
      }

      // Update attendance record with check-out
      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          checkOut: now,
        },
      });
    } else {
      return NextResponse.json({ error: "Invalid type. Must be 'checkIn' or 'checkOut'" }, { status: 400 });
    }

    return NextResponse.json({
      message: `${type === "checkIn" ? "Checked in" : "Checked out"} successfully`,
      attendance,
      timestamp: now.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error("Error recording attendance:", error);
    return NextResponse.json({ error: "Failed to record attendance" }, { status: 500 });
  }
}
