require('dotenv').config();

// Import email functions (using dynamic import for ES modules)
async function runTest() {
  const { sendOTPEmail, testEmailConfig } = await import('./lib/email.js');

  async function test() {
    console.log('\n🧪 Testing Email Configuration...\n');
    
    // First test the configuration
    console.log('Step 1: Testing email configuration...');
    const configTest = await testEmailConfig();
    
    if (!configTest.success) {
      console.log('\n❌ Configuration test failed:', configTest.error);
      console.log('\n💡 Make sure you have set in .env:');
      console.log('   - SMTP_USER=your-email@gmail.com');
      console.log('   - SMTP_PASSWORD=your-app-password');
      console.log('   - SMTP_FROM=your-email@gmail.com');
      console.log('   - SMTP_FROM_NAME=DayFlow HRMS');
      process.exit(1);
    }
    
    console.log('✅ Configuration test passed!\n');
    
    // Then test sending an email
    console.log('Step 2: Testing email sending...');
    const testEmail = process.env.TEST_EMAIL || 'your-email@gmail.com';
    const testOTP = '123456';
    const testName = 'Test User';
    
    console.log(`   Sending test email to: ${testEmail}`);
    const sendTest = await sendOTPEmail(testEmail, testOTP, testName);
    
    if (sendTest.success) {
      console.log('\n✅ Email sent successfully!');
      console.log(`   Check your inbox at: ${testEmail}`);
      console.log(`   Test OTP: ${testOTP}`);
    } else {
      console.log('\n❌ Failed to send email:', sendTest.error);
    }
  }

  test().catch(console.error);
}

runTest().catch(console.error);

