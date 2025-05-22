"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
