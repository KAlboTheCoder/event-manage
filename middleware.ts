import { NextResponse, type NextRequest } from "next/server";

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

// Middleware to handle root path redirection
export default function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;

  // If it's the root path, redirect to sign-in
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // For all other paths, continue as normal
  return NextResponse.next();
}