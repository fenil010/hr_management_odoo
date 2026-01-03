# Deployment Checklist

## ✅ Fixed Issues

1. **Next.js Config** - Removed invalid `proxyResolution` option
2. **Nodemailer Warning** - Added override to suppress peer dependency warning
3. **Middleware** - Still functional (deprecation warning is informational only)

## 🚀 Pre-Deployment Steps

### 1. Environment Variables

Make sure all required environment variables are set in your production environment:

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Email (SMTP)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_FROM_NAME=DayFlow HRMS

# Optional: Custom SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
```

### 2. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 3. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### 4. Production Considerations

- [ ] Set `NODE_ENV=production` in production environment
- [ ] Use strong `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Configure CORS if needed
- [ ] Set up SSL/HTTPS
- [ ] Configure email service (SMTP credentials)
- [ ] Set up database backups
- [ ] Configure error monitoring (Sentry, etc.)
- [ ] Set up logging service

### 5. Security Checklist

- [ ] All secrets in environment variables (not in code)
- [ ] Database credentials secured
- [ ] Email credentials secured
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting considered
- [ ] Input validation in place

## 📝 Notes

### Middleware Warning
The middleware deprecation warning is informational. Middleware still works in Next.js 16.1.1 and is safe for production. Future Next.js versions will use a proxy pattern, but migration can be done later.

### Nodemailer Warning
The nodemailer peer dependency warning is harmless. The override in package.json ensures compatibility. The application will work correctly.

## 🎯 Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Ensure Node.js 18+ is available
- Set build command: `npm run build`
- Set start command: `npm start`
- Configure environment variables

## ✅ Ready to Deploy

After completing the checklist above, your application is ready for production deployment!

