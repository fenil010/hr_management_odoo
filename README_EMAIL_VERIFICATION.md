# Email Verification Setup

This application now includes **one-time email verification** for new user registrations. Users must verify their email address before they can login and access the dashboard.

## Features

- ✅ OTP-based email verification (6-digit code)
- ✅ One-time verification (once verified, user can always login)
- ✅ OTP expires after 10 minutes
- ✅ Resend OTP functionality
- ✅ Free email service options (Resend or Gmail SMTP)
- ✅ Login blocked until email is verified

## Setup Instructions

### Option 1: Resend (Recommended - Free 100 emails/day)

1. Sign up at [resend.com](https://resend.com) (free account)
2. Get your API key from the dashboard
3. Add to `.env`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=DayFlow HRMS <noreply@yourdomain.com>
   ```

### Option 2: Gmail SMTP (Free)

1. Enable 2-Step Verification on your Gmail account
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
3. Add to `.env`:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-character-app-password
   ```

### Option 3: Development Mode (No Setup Required)

- If no email service is configured, OTPs will be logged to the console
- Check server logs to get the OTP code for testing
- Useful for local development

## Database Migration

The migration has already been applied. If you need to re-run it:

```bash
npx prisma migrate dev
```

This adds the following fields to the `User` model:
- `emailVerified` (Boolean)
- `verificationToken` (String, nullable)
- `verificationTokenExpiry` (DateTime, nullable)

## How It Works

1. **Registration**: User signs up with name, email, and password
2. **OTP Generation**: System generates a 6-digit OTP and sends it via email
3. **Verification Page**: User is redirected to `/verify-email?email=...`
4. **Enter OTP**: User enters the 6-digit code
5. **Verification**: Upon successful verification, user can login
6. **Login Protection**: Login is blocked if email is not verified

## User Flow

```
Register → Email Sent → Verify OTP → Login → Dashboard
```

## Seeded Users

The seed data creates pre-verified test users:
- `admin@dayflow.com` / `admin123`
- `john@dayflow.com` / `employee123`
- `jane@dayflow.com` / `employee123`

These users can login immediately without verification (for testing purposes).

## API Endpoints

- `POST /api/auth/register` - Register new user and send OTP
- `POST /api/auth/verify-email` - Verify OTP and activate account
- `PUT /api/auth/verify-email` - Resend OTP

## Notes

- Email verification is **one-time only** - once verified, the user can always login
- OTP expires after 10 minutes
- If email service fails, user account is not created (registration is rolled back)
- Login will show an error if user tries to login with unverified email

