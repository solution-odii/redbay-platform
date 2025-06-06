
"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Logo from "@/components/svg Icons/Logo";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(4);
  const [canResend, setCanResend] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const from = searchParams.get("from"); // Check if coming from forgot-password

  // Redirect to /login if email is missing
  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  // Handle the countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Log to confirm route is hit
  console.log("Verify page loaded with email:", email, "from:", from);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length !== 6) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      console.log("Submitting OTP:", value, "for email:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      if (value === "123456") { // Mock OTP for testing
        console.log("OTP verified for email:", email);
        // Redirect based on where the user came from
        if (from === "forgot-password") {
          router.push(`/reset?email=${encodeURIComponent(email || "")}`);
        } else {
          console.log("User logged in with email:", email);
          router.push("/dashboard");
        }
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.log("Error verifying OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(4);
    setIsLoading(true);

    try {
      console.log("Resending OTP to:", email);
      alert("New OTP sent to " + email);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.log("Error resending OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // If email is missing, render nothing while redirecting
  if (!email) {
    return null;
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h1 className="text-2xl font-semibold text-primary">Verify it&apos;s you</h1>
        <p className="text-xs font-light">Enter 6-digit OTP code sent to {email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 flex flex-col items-center justify-center">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            disabled={isLoading}
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot index={0} className="w-[50px] h-[50px] border-0 rounded-lg bg-[#F8F8F8]" />
              <InputOTPSlot index={1} className="w-[50px] h-[50px] border-0 rounded-lg bg-[#F8F8F8]" />
              <InputOTPSlot index={2} className="w-[50px] h-[50px] border-0 rounded-lg bg-[#F8F8F8]" />
              <InputOTPSlot index={3} className="w-[50px] h-[50px] border-0 rounded-lg bg-[#F8F8F8]" />
              <InputOTPSlot index={4} className="w-[50px] h-[50px] border-0 rounded-lg bg-[#F8F8F8]" />
              <InputOTPSlot index={5} className="w-[50px] h-[50px] border-0 rounded-lg bg-[#F8F8F8]" />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex items-center justify-center text-sm">
          <span>Didn&apos;t receive a code?</span>
          {canResend ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResend}
              disabled={isLoading}
              className="text-red-600 hover:underline pl-1"
            >
              Resend code
            </Button>
          ) : (
            <span className="ml-1 text-gray-500">Resend in {timer}s</span>
          )}
        </div>
        <Button
          type="submit"
          className={`w-full py-2 rounded-lg transition-colors duration-200 ${
            value.length > 0 && !isLoading
              ? " hover:bg-red-700 text-white"
              : "bg-[#F8F8F8] hover:bg-gray-400 text-gray-600"
          }`}
          disabled={value.length !== 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "verify"}
        </Button>
      </form>
    </div>
  );
}