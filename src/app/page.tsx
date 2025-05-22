"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function HomePage() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    // Wait for auth to be loaded before redirecting
    if (isLoaded) {
      if (userId) {
        // If user is already signed in, redirect to dashboard
        router.replace("/user-dashboard");
      } else {
        // If not signed in, redirect to sign-in page
        router.replace("/sign-in");
      }
    }
  }, [isLoaded, userId, router]);

  // Show a simple loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
        <p className="text-gray-700">Redirecting...</p>
      </div>
    </div>
  );
}
