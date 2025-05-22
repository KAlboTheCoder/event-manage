"use client";

import { useState, useEffect } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "../../_components/Navbar";

export default function SignInPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded } = useSignIn();
  const { userId: existingUserId, isLoaded: authLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoaded && existingUserId) {
      // If user is already signed in, redirect to user dashboard
      router.replace("/user-dashboard");
    }
  }, [authLoaded, existingUserId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setError("");

      // Validate UA ID format
      if (!/^\d{10}$/.test(userId)) {
        throw new Error("User ID must be exactly 10 digits (numbers only)");
      }

      // For Clerk, we need to use the email as the identifier
      // In a real app, you would look up the email associated with the userId
      // For now, we'll construct a dummy email from the userId
      const emailToUse = email || `${userId}@ua.edu`;

      // Use the email as the identifier for Clerk
      const attemptSignIn = await signIn.create({
        strategy: "password",
        identifier: emailToUse,
        password,
      });

      if (attemptSignIn.status === "complete") {
        // Check user role in your database
        try {
          const response = await fetch(`/api/users/role?userId=${userId}`);
          const data = await response.json();
          
          if (data.role === 'admin') {
            router.push("/dashboard");
          } else {
            router.push("/user-dashboard");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/user-dashboard"); // Default to user dashboard if role check fails
        }
      } else {
        console.error("Sign in failed", attemptSignIn);
        setError("Sign in failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err?.errors?.[0]?.message || "Invalid User ID or password");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoaded && existingUserId) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p>You are already signed in. Redirecting to user dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img
              src="/Img/UA-Logo.png"
              alt="UA Logo"
              className="w-32 h-32"
            />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 text-center text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                UA ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your 10-digit UA ID"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label className="block text-black font-bold mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "LOGIN"}
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="font-bold">THE FORMATOR of</p>
            <p>
              <span className="font-bold">BIASA</span>{" "}
              <span className="text-sm">(ACADEMICALLY COMPETENT)</span>
            </p>
            <p>
              <span className="font-bold">MAGANACA</span>{" "}
              <span className="text-sm">(MORALLY UPRIGHT)</span>
            </p>
            <p>
              <span className="font-bold">MAYAP</span>{" "}
              <span className="text-sm">(SOCIALLY RESPONSIBLE)</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
