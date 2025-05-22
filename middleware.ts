import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};

export default clerkMiddleware((req: NextRequest) => {
  const { userId } = getAuth(req);
  const isPublic = req.nextUrl.pathname === "/";
  const isAuthRoute = 
    req.nextUrl.pathname === "/sign-in" || 
    req.nextUrl.pathname === "/sign-up";

  // If user is authenticated and on auth pages, redirect to dashboard
  if (userId && isAuthRoute) {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  // If user is not authenticated and not on public/auth pages, redirect to sign-in
  if (!userId && !isPublic && !isAuthRoute) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});