# Custom Email Verification System Setup

You now have a **custom email verification system** that works with any SMTP provider!

## 🎯 Features

- ✅ Works with any SMTP server (Gmail, Outlook, custom SMTP, etc.)
- ✅ No third-party services required (Resend, etc.)
- ✅ Full control over email sending
- ✅ Beautiful HTML email templates
- ✅ Fallback to console logging if SMTP not configured

## 📧 Setup Options

### Option 1: Gmail (Easiest - Free)

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password**:
   - Go to: Google Account → Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Add to `.env`**:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-character-app-password
   SMTP_FROM=your-email@gmail.com
   SMTP_FROM_NAME=DayFlow HRMS
   ```

### Option 2: Custom SMTP Server (Any Provider)

Works with **any SMTP provider**:
- Outlook/Hotmail
- Yahoo Mail
- Custom email server
- Corporate email
- Any SMTP service

**Add to `.env`**:
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@yourdomain.com
SMTP_FROM_NAME=DayFlow HRMS
```

**Common SMTP Settings:**

| Provider | SMTP_HOST | SMTP_PORT | SMTP_SECURE |
|----------|-----------|-----------|-------------|
| Gmail | smtp.gmail.com | 587 | false |
| Outlook | smtp-mail.outlook.com | 587 | false |
| Yahoo | smtp.mail.yahoo.com | 587 | false |
| Custom | smtp.yourdomain.com | 587 or 465 | false or true |

**Note**: 
- Port `587` = `SMTP_SECURE=false` (TLS)
- Port `465` = `SMTP_SECURE=true` (SSL)

### Option 3: Development Mode (No Email)

If no SMTP is configured:
- OTP will be logged to console
- Perfect for localhost testing
- No setup required

## 🚀 Quick Start

### Step 1: Choose Your Option

**For Gmail (Recommended for testing):**
```env
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=DayFlow HRMS
```

**For Custom SMTP:**
```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@yourdomain.com
SMTP_FROM_NAME=DayFlow HRMS
```

### Step 2: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 3: Test

1. Register a new user
2. Check your email inbox
3. Enter the OTP to verify

## 🧪 Test Email Configuration

Create a test file `test-email.js`:

```javascript
require('dotenv').config();
const { testEmailConfig } = require('./lib/email');

testEmailConfig().then(result => {
  if (result.success) {
    console.log('✅ Email configuration is working!');
  } else {
    console.log('❌ Email configuration error:', result.error);
  }
});
```

Run: `node test-email.js`

## 📝 Environment Variables Reference

### Required for Gmail:
- `SMTP_USER` - Your Gmail address
- `SMTP_PASSWORD` - Gmail App Password
- `SMTP_FROM` - Sender email (usually same as SMTP_USER)
- `SMTP_FROM_NAME` - Sender name (optional)

### Required for Custom SMTP:
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP port (587 or 465)
- `SMTP_SECURE` - true for SSL (465), false for TLS (587)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASSWORD` - SMTP password
- `SMTP_FROM` - Sender email address
- `SMTP_FROM_NAME` - Sender name (optional)

## 🔍 Troubleshooting

### "Connection timeout"
- Check `SMTP_HOST` and `SMTP_PORT`
- Verify firewall allows SMTP connections
- Try port 587 with `SMTP_SECURE=false`

### "Authentication failed"
- Verify `SMTP_USER` and `SMTP_PASSWORD` are correct
- For Gmail: Use App Password, not regular password
- Check if 2-Step Verification is enabled (Gmail)

### "Email not sending"
- Check server console for error messages
- Verify all SMTP variables are set correctly
- Test with `test-email.js` script

### "Emails going to spam"
- Use a verified sender email
- Add SPF/DKIM records to your domain (for custom SMTP)
- For Gmail: Emails from Gmail to Gmail usually don't go to spam

## ✅ Advantages of Custom System

1. **No Third-Party Dependencies** - Use your own email
2. **Full Control** - Customize email templates
3. **No Limits** - No daily email limits (depends on your provider)
4. **Privacy** - Emails sent through your own server
5. **Cost** - Free with Gmail/Outlook

## 🎨 Customize Email Template

Edit `lib/email.ts` to customize the email HTML template. The template includes:
- Beautiful gradient header
- Large, readable OTP display
- Professional styling
- Responsive design

## 📊 Email Providers Comparison

| Provider | Free Tier | Setup Difficulty | Best For |
|----------|-----------|------------------|----------|
| Gmail | Unlimited* | Easy | Testing, Small apps |
| Outlook | Unlimited* | Easy | Testing, Small apps |
| Custom SMTP | Depends | Medium | Production, Control |
| Resend | 100/day | Easy | Production, Reliability |

*Subject to provider's terms of service

## 🎯 Next Steps

1. Choose your SMTP provider
2. Add credentials to `.env`
3. Restart server
4. Test registration flow
5. Check email inbox for OTP

That's it! You now have a fully custom email verification system! 🎉

