'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/80'
          : 'bg-white/40 backdrop-blur-sm'
      }`}
      style={{
        WebkitBackdropFilter: 'blur(8px)',
        backgroundImage: scrolled 
          ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))'
          : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-xl transform transition-all duration-300 hover:shadow-lg">
                <Image
                  src="/Img/UA-Logo.png"
                  alt="UA Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto transform transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  UA Events
                </span>
                <span className="text-sm bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-medium">
                  Event Management System
                </span>
              </div>
            </Link>

            {/* Navigation Links - Only shown when logged in */}
            {userId && (
              <div className="hidden md:flex space-x-1">
                <Link
                  href="/dashboard"
                  className="relative group px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  <span className="relative z-10">Dashboard</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link
                  href="/events"
                  className="relative group px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  <span className="relative z-10">Events</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link
                  href="/calendar"
                  className="relative group px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  <span className="relative z-10">Calendar</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link
                  href="/profile"
                  className="relative group px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  <span className="relative z-10">Profile</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>

            {!userId ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hidden md:block relative group"
                >
                  <span>Sign In</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <Link
                  href="/sign-up"
                  className="relative px-5 py-2.5 rounded-lg text-sm font-semibold text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:bg-gradient-to-l"></span>
                  <span className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-out opacity-0 bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 group-hover:opacity-100"></span>
                  <span className="relative">Sign Up</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  href="/notifications"
                  className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                >
                  <span className="absolute inset-0 w-full h-full rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </Link>
                <div className="h-8 w-px bg-gradient-to-b from-gray-200 to-gray-100 rounded-full"></div>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full ring-2 ring-white hover:ring-blue-100 transition-all duration-200 shadow-md hover:shadow-lg",
                      userButtonPopoverCard: "shadow-xl border border-gray-100",
                      userButtonPopoverFooter: "hidden"
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <div 
            className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-lg transform transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
          >
            <div className="px-4 py-3 space-y-1">
              {userId ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/events" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors duration-200"
                  >
                    Events
                  </Link>
                  <Link 
                    href="/calendar" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors duration-200"
                  >
                    Calendar
                  </Link>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors duration-200"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/sign-in" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/sign-up" 
                    className="block px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;