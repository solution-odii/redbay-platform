"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/svg Icons/Logo";
import MailBox from "@/components/svg Icons/MailBox";
import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  // const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Reset password mail response:", JSON.stringify(data, null, 2)); // Debug log
      if (res.ok && data.success) {
        alert("A password reset link has been sent to " + email + ". Please check your email."); // Replace with toast
        // No redirect; user will click the link in the email
      } else {
        setError(data.error || "Failed to send reset link");
      }
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      console.error("Reset password mail error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h1 className="text-2xl font-semibold text-primary">Forgot Password?</h1>
        <p className="text-sm text-center">
          Enter the email where the reset link will be sent to
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MailBox className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className="w-full h-12 bg-[#F8F8F8] border-0 pl-10 pr-4 rounded-lg focus:ring-2 transition-all duration-200 flex items-center"
            />
            <label
              htmlFor="email"
              className={`absolute left-10 text-gray-400 text-sm transition-all duration-200 pointer-events-none inline-block px-1 ${
                email || emailFocused
                  ? "top-[-1.5] text-xs text-gray-600 font-medium bg-card"
                  : "top-3.5"
              }`}
            >
              Email Address
            </label>
          </div>
        </div>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <Button
          type="submit"
          className={`w-full py-2 rounded-lg transition-colors duration-200 ${
            email && !isLoading ? "bg-[#C80000] hover:bg-red-700 text-white" : "bg-[#F8F8F8] hover:bg-gray-300 text-gray-600"
          }`}
          disabled={!email || isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
        <div className="text-center">
          <Link href="/login" className="text-sm text-[#C80000] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}