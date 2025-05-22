import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define route matchers for different types of routes
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);  
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);  

// Configure the middleware matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*',
  ],
};

// Use the middleware from Clerk
export default clerkMiddleware(async (auth, req) => {
  // Get the pathname from the URL
  const path = req.nextUrl.pathname;
  
  // Get authentication data from auth()
  const { userId } = await auth();
  
  // If the user is authenticated and trying to access auth routes (sign-in, sign-up),
  // redirect them to the dashboard
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }
  
  // For all non-public routes, protect them with auth.protect()
  // This will automatically redirect to sign-in if not authenticated
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  
  // Allow the request to continue
  return NextResponse.next();
});