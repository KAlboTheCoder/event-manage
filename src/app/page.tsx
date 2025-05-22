"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "./_components/Navbar";

export default function HomePage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

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

      const attemptSignIn = await signIn.create({
        identifier: userId, // Use the UA ID directly as the identifier
        password,
      });

      if (attemptSignIn.status === "complete") {
        router.push("/user-dashboard");
      } else {
        console.error("Sign in failed", attemptSignIn);
        setError("Sign in failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err?.errors?.[0]?.message || "Invalid UA ID or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src="/Img/UA-Logo.png" alt="UA Logo" className="w-32 h-32" />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 text-center text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-black font-bold mb-2">USER ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                disabled={isLoading}
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
