"use client";

import { useState, useEffect } from "react";
import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "../../_components/Navbar";
import { api } from "~/trpc/react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const { userId: existingUserId, isLoaded: authLoaded } = useAuth();
  const router = useRouter();

  const createUser = api.user.create.useMutation({
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (authLoaded && existingUserId) {
      // If user is already signed in, redirect to dashboard
      router.replace("/user-dashboard");
    }
  }, [authLoaded, existingUserId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setError("");

      // Generate a random username
      const randomId = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
      const username = `u_${randomId}`; // 'u_' prefix followed by a random ID
      
      // First check if a sign up exists and if so, continue with that
      const signUpAttempt = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        username
      });

      if (signUpAttempt.status === "complete") {
        // Sign up is already complete, redirect to dashboard
        router.replace("/user-dashboard");
        return;
      }

      // Prepare and start email verification
      const prepareVerification = await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      
      if (prepareVerification.status === "missing_requirements") {
        throw new Error("Unable to start verification process. Please try again.");
      }
      
      setPendingVerification(true);
      setVerificationStarted(true);
      
      // Store the current verification attempt
      sessionStorage.setItem('currentSignUpAttempt', JSON.stringify({
        email,
        firstName,
        lastName
      }));
      
    } catch (err: any) {
      console.error("Sign up error:", err);
      if (err.message.includes("identifier")) {
        setError("This email or username is already registered");
      } else {
        setError(err.message || "Something went wrong during sign up");
      }
      setPendingVerification(false);
      setVerificationStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setError("");

      // Check if we have an active sign-up attempt
      const savedAttempt = sessionStorage.getItem('currentSignUpAttempt');
      if (!savedAttempt || !verificationStarted) {
        setError("No active sign-up attempt found. Please start the sign-up process again.");
        setPendingVerification(false);
        return;
      }

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete" && completeSignUp.createdUserId) {
        try {
          // Create user in our database after successful verification
          await createUser.mutateAsync({
            clerkId: completeSignUp.createdUserId,
            email,
            firstName,
            lastName,
          });
          
          // Set the user's role in Clerk's metadata
          await fetch('/api/users/set-metadata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: completeSignUp.createdUserId,
              publicMetadata: {
                role: 'user' // Default role for new users
              }
            }),
          });
          
          if (completeSignUp.createdSessionId) {
            // First set the active session
            await setActive({ session: completeSignUp.createdSessionId });
            
            // Wait for the session to be fully established
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Clear any existing auth data
            sessionStorage.removeItem('currentSignUpAttempt');
            
            try {
              // Try to verify the session is actually established
              const response = await fetch('/api/auth/session');
              const session = await response.json();
              
              if (session && session.userId) {
                // Session is confirmed, redirect to user dashboard
                window.location.href = "/user-dashboard";
              } else {
                // If no session, wait a bit longer and try one more time
                await new Promise(resolve => setTimeout(resolve, 1000));
                window.location.href = "/user-dashboard";
              }
            } catch (error) {
              // If we can't verify the session, try the redirect anyway
              window.location.href = "/user-dashboard";
            }
          } else {
            throw new Error("No session was created during sign up");
          }
        } catch (error: any) {
          if (error.message.includes("Email already exists")) {
            setError("This email is already registered");
          } else {
            console.error("Error during sign up completion:", error);
            setError("Failed to complete registration. Please try again.");
          }
        }
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already signed in, redirect to dashboard immediately
  useEffect(() => {
    if (authLoaded && existingUserId) {
      window.location.href = "/user-dashboard";
    }
  }, [authLoaded, existingUserId]);

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

          {!pendingVerification ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-black font-bold mb-2">FIRST NAME</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black font-bold mb-2">LAST NAME</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>



              <div>
                <label className="block text-black font-bold mb-2">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerification} className="space-y-4">
              <div>
                <label className="block text-black font-bold mb-2">VERIFICATION CODE</label>
                <p className="text-sm text-gray-600 mb-2">
                  Please check your email for the verification code.
                </p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                {isLoading ? "Verifying..." : "VERIFY EMAIL"}
              </button>
            </form>
          )}

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
