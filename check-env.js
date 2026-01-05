require('dotenv').config();

console.log('\n🔍 Checking Environment Variables...\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Required
const DATABASE_URL = process.env.DATABASE_URL;
console.log('DATABASE_URL:', DATABASE_URL ? '✅ Set' : '❌ MISSING (REQUIRED)');
if (DATABASE_URL) {
  console.log('   (starts with:', DATABASE_URL.substring(0, 20) + '...)');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Email Configuration (Resend):\n');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
console.log('RESEND_API_KEY:', RESEND_API_KEY ? '✅ Set' : '⚠️  Not set (emails won\'t send)');
if (RESEND_API_KEY) {
  const isValid = RESEND_API_KEY.startsWith('re_');
  console.log('   Format:', isValid ? '✅ Valid (starts with re_)' : '❌ Invalid (should start with re_)');
  console.log('   Length:', RESEND_API_KEY.length, 'characters');
}

const FROM_EMAIL = process.env.FROM_EMAIL;
console.log('\nFROM_EMAIL:', FROM_EMAIL ? '✅ Set' : '⚠️  Not set (will use default)');
if (FROM_EMAIL) {
  const isTestDomain = FROM_EMAIL.includes('onboarding@resend.dev');
  const hasCustomDomain = FROM_EMAIL.includes('@') && !isTestDomain;
  console.log('   Value:', FROM_EMAIL);
  if (isTestDomain) {
    console.log('   Status: ✅ Using test domain (good for testing)');
  } else if (hasCustomDomain) {
    console.log('   Status: ⚠️  Using custom domain (must be verified in Resend)');
  }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Email Configuration (Gmail SMTP - Alternative):\n');

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
console.log('SMTP_USER:', SMTP_USER ? '✅ Set' : '⚠️  Not set');
console.log('SMTP_PASSWORD:', SMTP_PASSWORD ? '✅ Set' : '⚠️  Not set');

if (SMTP_USER && SMTP_PASSWORD) {
  console.log('   Status: ✅ Gmail SMTP configured (will be used if Resend fails)');
} else if (SMTP_USER || SMTP_PASSWORD) {
  console.log('   Status: ❌ Both SMTP_USER and SMTP_PASSWORD must be set');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Summary:\n');

const issues = [];
if (!DATABASE_URL) issues.push('❌ DATABASE_URL is missing (REQUIRED)');
if (!RESEND_API_KEY && !SMTP_USER) {
  issues.push('⚠️  No email service configured (OTP will be in console logs)');
}
if (RESEND_API_KEY && !RESEND_API_KEY.startsWith('re_')) {
  issues.push('❌ RESEND_API_KEY format is invalid (should start with re_)');
}
if (RESEND_API_KEY && FROM_EMAIL && !FROM_EMAIL.includes('onboarding@resend.dev') && !FROM_EMAIL.includes('@')) {
  issues.push('⚠️  FROM_EMAIL might not be verified in Resend (use onboarding@resend.dev for testing)');
}

if (issues.length === 0) {
  console.log('✅ All environment variables look good!\n');
  console.log('💡 If emails still don\'t send:');
  console.log('   1. Restart your server after changing .env');
  console.log('   2. Check server console for error messages');
  console.log('   3. For testing, use: FROM_EMAIL=DayFlow HRMS <onboarding@resend.dev>');
} else {
  console.log('Issues found:\n');
  issues.forEach(issue => console.log('  ' + issue));
  console.log('\n💡 Quick fixes:');
  if (!RESEND_API_KEY) {
    console.log('   - Add RESEND_API_KEY=re_xxxxxxxxx to .env');
    console.log('   - Or use: FROM_EMAIL=DayFlow HRMS <onboarding@resend.dev> for testing');
  }
  if (RESEND_API_KEY && !FROM_EMAIL) {
    console.log('   - Add FROM_EMAIL=DayFlow HRMS <onboarding@resend.dev> to .env');
  }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

