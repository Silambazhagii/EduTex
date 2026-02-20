import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage = req.nextUrl.pathname === "/login";

  // Check for our mock auth cookie
  const isAuthenticated = req.cookies.has("mock-auth");

  if (isDashboardRoute && !isAuthenticated) {
    // If trying to access dashboard without auth, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginPage && isAuthenticated) {
    // If logged in and trying to access login page, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
