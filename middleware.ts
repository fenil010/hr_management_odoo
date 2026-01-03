import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token from the session
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isLoggedIn = !!token;
  const isOnAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isOnProtectedRoute = pathname.startsWith("/admin") || pathname.startsWith("/employee");

  // Redirect to login if trying to access protected routes without authentication
  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if trying to access auth routes while authenticated
  if (isOnAuthPage && isLoggedIn) {
    const role = token?.role as string;
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (role === "EMPLOYEE") {
      return NextResponse.redirect(new URL("/employee", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

