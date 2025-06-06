
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/svg Icons/Logo";
import Lock from "@/components/svg Icons/Lock";
import { useState, useEffect } from "react";
import { Eye, EyeOff, X, Check } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  // Password validation states
  const [hasLength, setHasLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // Redirect to /login if email is missing
//   useEffect(() => {
//     if (!email) {
//       router.push("/login");
//     }
//   }, [email, router]);

  // Validate password rules on change
  useEffect(() => {
    setHasLength(password.length >= 8);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!hasLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setError("Password does not meet all requirements");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Password reset for email:", email, "New password:", password);
      alert("Password reset successfully!");
      router.push("/login"); // Redirect to login page
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  // If email is missing, render nothing while redirecting
//   if (!email) {
//     return null;
//   }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6">
      <div className="flex flex-col items-center space-y-4">
        <Logo  />
        <h1 className="text-2xl font-semibold text-primary">Reset Password</h1>
        <p className="text-sm text-center">Enter your new password for {email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="w-full h-12 bg-[#F8F8F8] border-0 pl-10 pr-10 rounded-lg focus:ring-2  transition-all duration-200 flex items-center"
            />
            <label
              htmlFor="password"
              className={`absolute left-10 text-gray-400 text-sm transition-all duration-200 pointer-events-none inline-block px-1 ${
                password || passwordFocused
                  ? "top-[-1.5] text-xs text-gray-600 font-medium bg-card"
                  : "top-3.5"
              }`}
            >
              New Password
            </label>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              className="w-full h-12 bg-[#F8F8F8] border-0 pl-10 pr-10 rounded-lg focus:ring-2  transition-all duration-200 flex items-center"
            />
            <label
              htmlFor="confirm-password"
              className={`absolute left-10 text-gray-400 text-sm transition-all duration-200 pointer-events-none inline-block px-1 ${
                confirmPassword || confirmPasswordFocused
                  ? "top-[-1.5] text-xs text-gray-600 font-medium bg-card"
                  : "top-3.5"
              }`}
            >
              Confirm New Password
            </label>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
            <div className="flex gap-2">
          <div className={`flex items-center space-x-2 p-1 rounded-full ${hasLength ? "bg-[#C80000] text-white" : "bg-gray-100 text-gray-600"}`}>
            {hasLength ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-xs">min 8 characters</span>
          </div>
          <div className={`flex items-center space-x-2 p-1 rounded-full ${hasUppercase ? "bg-[#C80000] text-white" : "bg-gray-100 text-gray-600"}`}>
            {hasUppercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-xs">at least 1 uppercase letter</span>
          </div>
          </div>
          <div className="flex gap-2">
          <div className={`flex items-center space-x-2 p-1 rounded-full ${hasLowercase ? "bg-[#C80000] text-white" : "bg-gray-100 text-gray-600"}`}>
            {hasLowercase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-xs">at least 1 lowercase letter</span>
          </div>
          <div className={`flex items-center space-x-2 p-1 rounded-full ${hasNumber ? "bg-[#C80000] text-white" : "bg-gray-100 text-gray-600"}`}>
            {hasNumber ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-xs">at least 1 number</span>
          </div>
          </div>
          <div className={`flex items-center space-x-2 p-1 rounded-full w-[50%] ${hasSpecialChar ? "bg-[#C80000] text-white" : "bg-gray-100 text-gray-600"}`}>
            {hasSpecialChar ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            <span className="text-xs">at least 1 special symbol &apos;$, #...&apos;</span>
          </div>
        </div>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <Button
          type="submit"
          className={`w-full py-2 rounded-lg transition-colors duration-200 ${
            password && confirmPassword && !isLoading
              ? " hover:bg-red-700 text-white"
              : "bg-[#F8F8F8] hover:bg-gray-300 text-gray-600"
          }`}
          disabled={!password || !confirmPassword || isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
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