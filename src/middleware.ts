import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import type { AuthObject } from "@clerk/nextjs/server";
import { Roles } from "@/types/globals";

// Define public routes that don't require authentication
const publicRoutes = ["/sign-in", "/sign-up", "/user-id"];

// Create route matchers for protected routes
const isAdminRoute = createRouteMatcher(['/admin-dashboard(.*)']);

// This function determines if a route is public
function isPublic(path: string) {
  return publicRoutes.some(publicRoute => 
    path.startsWith(publicRoute) || path === publicRoute
  );
}

// Middleware function to handle authentication and routing
const middleware = async (auth: AuthObject, req: NextRequest) => {
  const { userId, sessionClaims } = auth;
  const path = req.nextUrl.pathname;
  
  // Check for sign-up completion flag in URL
  const isNewSignUp = req.nextUrl.searchParams.get('new_signup') === 'true';
  
  // If the route is public, allow access
  if (isPublic(path)) {
    return NextResponse.next();
  }
  
  // If the user is not authenticated and the route is not public, redirect to sign-in
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Get user metadata from session claims with proper typing
  const userRole = sessionClaims?.metadata?.role as Roles;
  const hasUserId = sessionClaims?.metadata?.userId !== undefined;

  // If the user is not an admin and is trying to access an admin route, redirect to user dashboard
  if (isAdminRoute(req) && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/user-dashboard', req.url));
  }
  
  // If user just signed up or doesn't have a userId set, redirect to user-id page
  // unless they're already on that page
  if (isNewSignUp || (!hasUserId && path !== '/user-id' && !path.startsWith('/api/'))) {
    return NextResponse.redirect(new URL('/user-id', req.url));
  }

  // If the user is on the home page, redirect to the appropriate dashboard
  if (path === "/") {
    return NextResponse.redirect(new URL(
      userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard', 
      req.url
    ));
  }

  return NextResponse.next();
};

// Apply Clerk middleware
export default clerkMiddleware(middleware);

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", 
    "/", 
    "/(api|trpc)(.*)"
  ],
};
