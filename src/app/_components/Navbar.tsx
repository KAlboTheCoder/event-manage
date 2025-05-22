"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/Img/UA-Logo.png"
                alt="UA Logo"
                width={45}
                height={45}
                className="h-11 w-auto"
                priority
              />
              <span className="font-semibold text-lg text-gray-800">Event Manager</span>
            </Link>

            {/* Navigation links removed as requested */}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded-md bg-blue-800 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}