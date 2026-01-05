import 'dotenv/config';
import { prisma } from './lib/prisma.ts';

async function testPerformance() {
  console.log('🚀 Testing Database Performance Improvements...\n');

  // Test 1: Employee List Query
  console.log('📊 Test 1: Employee List Query');
  const start1 = Date.now();
  const employees = await prisma.employee.findMany({
    include: {
      user: {
        select: {
          email: true,
          role: true,
          isActive: true,
        },
      },
    },
    orderBy: { fullName: 'asc' },
    take: 100,
  });
  const end1 = Date.now();
  console.log(`   ✅ Found ${employees.length} employees in ${end1 - start1}ms\n`);

  // Test 2: Leave Requests Query
  console.log('📊 Test 2: Leave Requests Query');
  const start2 = Date.now();
  const leaveRequests = await prisma.leaveRequest.findMany({
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
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  const end2 = Date.now();
  console.log(`   ✅ Found ${leaveRequests.length} leave requests in ${end2 - start2}ms\n`);

  // Test 3: Attendance Query with Date Filter
  console.log('📊 Test 3: Attendance Query (Last 30 days)');
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const start3 = Date.now();
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      date: {
        gte: thirtyDaysAgo,
      },
    },
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
    orderBy: { date: 'desc' },
    take: 100,
  });
  const end3 = Date.now();
  console.log(`   ✅ Found ${attendanceRecords.length} attendance records in ${end3 - start3}ms\n`);

  // Test 4: Indexed Query Performance
  console.log('📊 Test 4: Indexed Query (Find by Employee ID)');
  const start4 = Date.now();
  const employee = await prisma.employee.findUnique({
    where: { id: employees[0]?.id },
    include: {
      user: true,
      attendance: { take: 10 },
      leaves: { take: 5 },
    },
  });
  const end4 = Date.now();
  console.log(`   ✅ Employee lookup completed in ${end4 - start4}ms\n`);

  console.log('🎉 Performance Testing Complete!');
  console.log('\n💡 Performance Improvements Applied:');
  console.log('   • Database indexes on frequently queried fields');
  console.log('   • Query result limits (pagination)');
  console.log('   • Connection pooling optimization');
  console.log('   • In-memory caching for repeated queries');
  console.log('   • Cache invalidation on data changes');

  await prisma.$disconnect();
}

testPerformance().catch(console.error);