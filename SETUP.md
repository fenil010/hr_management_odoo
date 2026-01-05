# 🚀 Setup Guide

Follow these steps to set up the DayFlow HR Management System on your local machine.

---

## Prerequisites

Make sure you have the following installed:

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | v18 or higher | [nodejs.org](https://nodejs.org/) |
| npm | v9 or higher | Comes with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| PostgreSQL | Any (or use Neon) | [Neon](https://neon.tech/) |

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/hr_management_sys.git
cd hr_management_sys
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- Prisma ORM
- NextAuth.js
- Radix UI components
- Recharts
- And more...

---

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```env
# Database Connection (PostgreSQL)
# For Neon: Get your connection string from https://console.neon.tech/
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"

# NextAuth.js Configuration
# Generate a secret: openssl rand -base64 32
AUTH_SECRET="your-super-secret-key-here"

# Application URL
NEXTAUTH_URL="http://localhost:3000"
```

### 📝 Environment Variables Explained

#### `DATABASE_URL`
Your PostgreSQL connection string.

**Using Neon (Recommended for quick setup):**
1. Go to [console.neon.tech](https://console.neon.tech/)
2. Create a new project
3. Go to **Connection Details**
4. Copy the connection string (it looks like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

**Using Local PostgreSQL:**
```
postgresql://postgres:your_password@localhost:5432/hr_management
```

#### `AUTH_SECRET`
A random secret key used by NextAuth.js to encrypt tokens.

Generate one using:
```bash
openssl rand -base64 32
```

Or use any random string generator.

#### `NEXTAUTH_URL`
The base URL of your application.
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

---

## Step 4: Generate Prisma Client

Generate the Prisma client to interact with your database:

```bash
npx prisma generate
```

---

## Step 5: Run Database Migrations

Create all necessary tables in your database:

```bash
npx prisma migrate deploy
```

> **First time setup?** If you're setting up a fresh database and want to create a new migration:
> ```bash
> npx prisma migrate dev --name init
> ```

---

## Step 6: Seed the Database

Populate the database with sample data (admin user, employees, attendance records, etc.):

```bash
npx tsx prisma/seed.ts
```

This creates:
- 1 Admin account
- 2 Employee accounts
- Sample attendance records
- Sample leave requests
- Sample payroll data

---

## Step 7: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Login Credentials

After seeding, you can log in with these accounts:

### Admin Account
| Email | Password |
|-------|----------|
| admin@dayflow.com | admin123 |

### Employee Accounts
| Email | Password |
|-------|----------|
| john@dayflow.com | employee123 |
| jane@dayflow.com | employee123 |

---

## 🛠️ Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Create new migration |
| `npx prisma migrate deploy` | Apply migrations |
| `npx prisma migrate reset` | Reset database (⚠️ deletes all data) |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema changes without migration |

---

## 🐛 Troubleshooting

### Database Connection Error

**Symptoms:** `Can't reach database server` or `Connection refused`

**Solutions:**
- Verify your `DATABASE_URL` is correct
- Ensure your database is running and accessible
- For Neon: Check if SSL is required (add `?sslmode=require`)
- Check your IP is whitelisted (if using cloud database)

### Prisma Client Not Found

**Symptoms:** `Cannot find module '@prisma/client'` or similar

**Solution:**
```bash
npx prisma generate
```

### Migration Errors

**Symptoms:** `Migration failed` or schema conflicts

**Solutions:**
- For fresh start: `npx prisma migrate reset` (⚠️ deletes all data)
- Check for pending migrations: `npx prisma migrate status`
- Ensure DATABASE_URL points to correct database

### Authentication Issues

**Symptoms:** Login fails or session errors

**Solutions:**
- Ensure `AUTH_SECRET` is set in `.env`
- Verify `NEXTAUTH_URL` matches your app URL
- Clear browser cookies and try again
- Check if the user exists in database

### Port Already in Use

**Symptoms:** `Port 3000 is already in use`

**Solution:**
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

---

## 📦 Production Deployment

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Environment Variables for Production

Make sure to set:
- `DATABASE_URL` - Your production database
- `AUTH_SECRET` - A strong, unique secret
- `NEXTAUTH_URL` - Your production URL (e.g., `https://dayflow.example.com`)

---

## Need Help?

If you encounter any issues not covered here, please:
1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Check the [Prisma Documentation](https://www.prisma.io/docs)
3. Open an issue on the repository
