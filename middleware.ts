import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define route matchers for different types of routes
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);  
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);  

// Configure the middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(jpg|jpeg|gif|png|svg|ico|webp|js|css|mp4|webm)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
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