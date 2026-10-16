"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowLeft, Mail, Loader2 } from "lucide-react";
import type { ResetPasswordCardProps } from "@/types/auth";
import { useLanguage } from "@/context/LanguageContext";

export default function ResetPasswordCard({
  initialEmail = "",
}: ResetPasswordCardProps) {
  const router = useRouter();
  const { locale, dict } = useLanguage();
  const t = dict.forgotPassword;

  const [email, setEmail] = useState(initialEmail);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.trim()) return t.errors.emailRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return t.errors.emailInvalid;
    return null;
  };

  const currentError = validateEmail(email);
  const isFormValid = !currentError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (currentError) {
      setEmailError(currentError);
      return;
    }

    setEmailError(null);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-[480px] flex-col items-center justify-center gap-[32px] font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header Section */}
        <header className="flex flex-col items-center gap-[16px] text-center">
          <div className="flex flex-col items-center gap-[6px]">
            <h1 className="text-[28px] font-semibold leading-[42px] text-[#2D2D2D]">
              {t.title}
            </h1>
            <p className="text-[15px] font-normal leading-[22px] text-[#777777]">
              {t.subtitle}
            </p>
          </div>
        </header>

        {/* Card Container */}
        <section className="box-border flex w-full flex-col items-start rounded-[28px] border border-[#EDEDED] bg-white p-[32px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex w-full flex-col gap-4"
              aria-label={t.formAria}
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label
                  htmlFor="email"
                  className="text-[14px] font-semibold text-[#2D2D2D]"
                >
                  {t.email} <span className="text-[#FB2C36]">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail
                    className="absolute left-3.5 h-5 w-5 text-[#9CA3AF] shrink-0"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched) {
                        setEmailError(validateEmail(e.target.value));
                      }
                    }}
                    onBlur={() => {
                      setTouched(true);
                      setEmailError(validateEmail(email));
                    }}
                    placeholder={t.emailPlaceholder}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    className={`h-[48px] w-full rounded-[16px] border bg-white pl-11 pr-4 text-[15px] text-[#2D2D2D] outline-none transition-all placeholder:text-[#9CA3AF] ${
                      emailError
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-200 focus:border-[#F15A22] focus:ring-1 focus:ring-[#F15A22]"
                    }`}
                  />
                </div>
                {emailError && (
                  <p id="email-error" role="alert" className="text-xs text-red-500">
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`mt-2 flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] text-[16px] font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#F15A22] focus:ring-offset-2 ${
                  isFormValid && !isLoading
                    ? "bg-[#F15A22] hover:bg-[#d94e1b] active:scale-[0.99] cursor-pointer"
                    : "bg-orange-300 opacity-80 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    <span>{t.submitting}</span>
                  </>
                ) : (
                  <span>{t.submit}</span>
                )}
              </button>
            </form>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="flex w-full flex-col items-center py-4 text-center"
            >
              <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FFF4EA]">
                <Check className="h-8 w-8 text-[#F15A22] stroke-[3]" aria-hidden="true" />
              </div>

              <h2 className="mt-4 text-[18px] font-semibold leading-[26px] text-[#2D2D2D]">
                {t.successTitle}
              </h2>
              <p className="mt-1 text-[14px] font-normal leading-[21px] text-[#777777]">
                {t.successText}
              </p>
            </div>
          )}
        </section>

        <button
          type="button"
          onClick={() => router.push(`/${locale}/login`)}
          className="flex items-center justify-center gap-2 text-[16px] font-semibold leading-[24px] text-[#F15A22] transition-opacity hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-[#F15A22] rounded-lg px-2 py-1 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 text-[#F15A22]" aria-hidden="true" />
          <span>{t.backToLogin}</span>
        </button>
      </div>
    </div>
  );
}