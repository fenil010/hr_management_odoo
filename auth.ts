import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Don't use adapter with Credentials provider - it's incompatible
  session: {
    strategy: "jwt", // Use JWT sessions for Credentials provider
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          throw new Error("Missing credentials");
        }

        try {
          const email = credentials.email as string;
          const password = credentials.password as string;

          console.log("🔍 Attempting to find user:", email);

          const user = await prisma.user.findUnique({
            where: { email },
            include: { employee: true },
          }).catch((err: unknown) => {
            console.error("💥 Database error finding user:", err);
            console.error("💥 Full error details:", JSON.stringify(err, null, 2));
            throw new Error("Database connection failed. Please try again.");
          });

          console.log("👤 User found:", user ? "Yes" : "No");
          if (user) {
            console.log("👤 User details:", { email: user.email, role: user.role, isActive: user.isActive, emailVerified: user.emailVerified });
          }

          if (!user || !user.isActive) {
            console.log("❌ User not found or inactive");
            throw new Error("Invalid credentials");
          }

          // Check if email is verified
          if (!user.emailVerified) {
            console.log("❌ Email not verified");
            throw new Error("Please verify your email address before logging in. Check your inbox for the verification code.");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log("🔑 Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("❌ Invalid password");
            throw new Error("Invalid credentials");
          }

          console.log("✅ Authentication successful!");
          
          return {
            id: user.id,
            email: user.email,
            name: user.employee?.fullName || user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("💥 Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
