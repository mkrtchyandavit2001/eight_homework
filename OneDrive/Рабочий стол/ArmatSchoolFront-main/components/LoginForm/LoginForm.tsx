"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLoginMutation } from "@/redux/slices/authSlice/authApi";
import { GoogleIcon } from "../icons/Icons";

export default function LoginForm() {
  const router = useRouter();
  const { login: contextLogin } = useAuth();
  const { locale } = useLanguage();
  const [loginApi, { isLoading: isApiLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.trim().length > 0;
  const isFormValid = isEmailValid && isPasswordValid && Object.keys(errors).length === 0;

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: `/${locale}/home` });
    } catch {
      // Handled silently
    }
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isEmailValid) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setErrors({});
    let isSuccess = false;

    try {
      const result = await loginApi({ email, password }).unwrap();
      const userData = result?.data || { email, first_name: email.split("@")[0], last_name: "" };
      
      contextLogin(userData, result?.token || "sanctum-cookie-session");
      isSuccess = true;
    } catch (err: any) {
      if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
        return;
      }

      if (err?.data?.errors) {
        const serverErrors: { email?: string; password?: string; general?: string } = {};
        if (err.data.errors.email) {
          serverErrors.email = err.data.errors.email[0];
        }
        if (err.data.errors.password) {
          serverErrors.password = err.data.errors.password[0];
        }
        setErrors(serverErrors);
      } else if (err?.data?.message) {
        setErrors({ general: err.data.message });
      } else {
        setErrors({ general: "Invalid credentials or server error. Please try again." });
      }
    }

    if (isSuccess) {
      router.push(`/${locale}/home`);
    }
  };

  return (
    <div className="w-full max-w-[448px] rounded-[24px] border border-black/10 bg-white p-6 sm:p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.1)] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Section */}
      <header className="mb-6">
        <h2 className="text-[24px] font-semibold leading-8 text-[#1A1A1A]">
          Sign in to Armat
        </h2>
        <p className="mt-1 text-[14px] leading-5 text-[#6B7280]">
          Welcome back! Please enter your details.
        </p>
      </header>

      {errors.general && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
          {errors.general}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Sign in form"
        className="flex flex-col gap-4"
      >
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-[13px] font-semibold leading-5 text-[#2D2D2D]"
          >
            Email Address <span className="text-[#FB2C36]">*</span>
          </label>
          <div
            className={`flex h-[48.5px] items-center gap-3 rounded-[16px] border px-4 transition-colors focus-within:ring-2 focus-within:ring-orange-200 ${
              errors.email
                ? "border-red-400"
                : "border-[#E5E5E7] focus-within:border-[#F15A22]"
            }`}
          >
            <Mail className="h-4 w-4 text-[#999999] shrink-0" aria-hidden="true" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="emma@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full text-[15px] text-[#1A1A1A] placeholder-[#C0C0C0] outline-none bg-transparent"
            />
          </div>
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-[13px] font-semibold leading-5 text-[#2D2D2D]"
          >
            Password <span className="text-[#FB2C36]">*</span>
          </label>
          <div
            className={`flex h-[48.5px] items-center gap-3 rounded-[16px] border px-4 transition-colors focus-within:ring-2 focus-within:ring-orange-200 ${
              errors.password
                ? "border-red-400"
                : "border-[#E5E5E7] focus-within:border-[#F15A22]"
            }`}
          >
            <Lock className="h-4 w-4 text-[#999999] shrink-0" aria-hidden="true" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="w-full text-[15px] text-[#1A1A1A] placeholder-[#C0C0C0] outline-none bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className="text-xs text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end pt-1">
          <Link
            href={`/${locale}/forgot-password`}
            className="text-[13px] font-semibold text-[#F15A22] hover:underline focus:outline-none focus:ring-1 focus:ring-[#F15A22]"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isApiLoading}
          className={`flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] text-white text-[16px] font-semibold transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#F15A22] focus:ring-offset-2 ${
            isFormValid
              ? "bg-[#F15A22] hover:bg-[#d94e1b]"
              : "bg-orange-300"
          }`}
        >
          {isApiLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="h-[1px] flex-1 bg-[#E5E5E7]" />
          <span className="text-[12px] text-[#999999]">or</span>
          <div className="h-[1px] flex-1 bg-[#E5E5E7]" />
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          aria-label="Continue with Google"
          className="flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-[#E5E5E7] bg-white text-[16px] font-semibold text-[#2D2D2D] hover:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <GoogleIcon className="h-6 w-6 shrink-0" />
          <span>Continue with Google</span>
        </button>

        {/* Sign Up Link */}
        <div className="flex items-center justify-center gap-1.5 pt-2 text-[14px]">
          <span className="text-[#6B7280]">Don’t have an account?</span>
          <Link
            href={`/${locale}/signup`}
            className="font-semibold text-[#F15A22] hover:underline focus:outline-none focus:ring-1 focus:ring-[#F15A22]"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}