import { NextResponse } from "next/server";
import { auth } from "./auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const user = req.auth?.user as any; 

  // Public/Auth routes
  const isPublicRoute = 
    nextUrl.pathname === "/login" || 
    nextUrl.pathname.startsWith("/register"); 

  // If not authenticated AND trying to access a protected route, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // If authenticated, we must strictly isolate based on role
  if (isAuthenticated) {
    const role = user?.role;
    
    // Determine the user's ONLY allowed base path
    let allowedPath = "";
    if (role === "SUPERADMIN") allowedPath = "/superadmin";
    else if (role === "HOD") allowedPath = "/admin";
    else if (role === "FACULTY") allowedPath = "/faculty";
    else if (role === "STUDENT") allowedPath = "/student";

    // 1. If hitting a public route (like login or /), bounce them to their allowed path
    if (isPublicRoute) {
      return NextResponse.redirect(new URL(allowedPath, nextUrl));
    }

    // 2. If hitting the generic /dashboard, bounce them to their allowed path
    if (nextUrl.pathname === "/dashboard") {
      return NextResponse.redirect(new URL(allowedPath, nextUrl));
    }

    // 3. Strict Enclaving: If the pathname DOES NOT start with their allowed path, block it
    if (!nextUrl.pathname.startsWith(allowedPath)) {
      return NextResponse.redirect(new URL(allowedPath, nextUrl));
    }
  }

  return NextResponse.next();
});
