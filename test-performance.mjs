// Performance test script
import { performance } from 'perf_hooks';

const API_BASE = 'http://localhost:3000/api';

async function testAPI(endpoint, description) {
  console.log(`\n🔍 Testing: ${description}`);
  console.log(`   Endpoint: ${endpoint}`);
  
  const start = performance.now();
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    
    if (!response.ok) {
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    const size = JSON.stringify(data).length;
    
    console.log(`   ✅ Success: ${duration}ms`);
    console.log(`   📦 Response size: ${(size / 1024).toFixed(2)}KB`);
    
    return { duration: parseFloat(duration), size };
  } catch (error) {
    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log(`   ❌ Error: ${error.message} (${duration}ms)`);
    return null;
  }
}

async function runTests() {
  console.log('⚡ HR Management System - API Performance Test');
  console.log('═══════════════════════════════════════════════\n');
  
  const tests = [
    { 
      endpoint: '/employees?includePayroll=true', 
      description: 'Get all employees with payroll (optimized with indexes)' 
    },
    { 
      endpoint: '/employees', 
      description: 'Get all employees (basic)' 
    },
    { 
      endpoint: '/leave?status=PENDING', 
      description: 'Get pending leave requests (indexed status)' 
    },
    { 
      endpoint: '/leave', 
      description: 'Get all leave requests' 
    },
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await testAPI(test.endpoint, test.description);
    if (result) {
      results.push({ ...test, ...result });
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between requests
  }
  
  console.log('\n\n📊 Performance Summary');
  console.log('═══════════════════════════════════════════════');
  
  results.forEach((r, i) => {
    console.log(`\n${i + 1}. ${r.description}`);
    console.log(`   ⏱️  ${r.duration}ms`);
    console.log(`   📦 ${(r.size / 1024).toFixed(2)}KB`);
  });
  
  const avgDuration = (results.reduce((sum, r) => sum + r.duration, 0) / results.length).toFixed(2);
  console.log(`\n⚡ Average Response Time: ${avgDuration}ms`);
  
  console.log('\n✅ Performance test completed!');
}

runTests();
