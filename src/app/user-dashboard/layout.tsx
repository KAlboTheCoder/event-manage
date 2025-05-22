"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Brand */}
            <div className="flex items-center">
              <Link href="/user-dashboard" className="flex items-center space-x-3">
                <img src="/Img/UA-Logo.png" alt="UA Logo" className="h-8 w-auto" />
                <span className="text-xl font-semibold text-gray-900">UA Events</span>
              </Link>
            </div>

            {/* Right side - Navigation */}
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="/user-dashboard"
                  className={`${
                    pathname === "/user-dashboard"
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150`}
                >
                  Events
                </Link>
                <Link
                  href="/user-dashboard/profile"
                  className={`${
                    pathname === "/user-dashboard/profile"
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150`}
                >
                  Profile
                </Link>
              </nav>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              {/* User Menu */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full ring-2 ring-white hover:ring-blue-100 transition-all duration-200",
                    userButtonPopoverCard: "shadow-xl border border-gray-100",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
