"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Mail,
  ArrowLeft,
  Check,
  ShieldCheck,
  LogIn,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import type { VerifyEmailCardProps } from "@/types/types";
import { useResendVerificationMutation, useVerifyEmailMutation } from "@/redux/slices/verifyEmailSlice/verifyEmailApi";
import { useLazyGetCsrfTokenQuery } from "@/redux/slices/authSlice/authApi";


function VerifyEmailContent({
  email: initialEmail,
  userName: initialUserName,
}: VerifyEmailCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { locale, dict } = useLanguage();
  const t = dict.verifyEmail;

  const [email, setEmail] = useState<string>(initialEmail || "");
  const [userName, setUserName] = useState<string>(initialUserName || "");

  // States
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Timer States
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // RTK Query hooks
  const [verifyEmailMutation] = useVerifyEmailMutation();
  const [resendVerification, { isLoading: isSending }] = useResendVerificationMutation();
  const [getCsrfToken] = useLazyGetCsrfTokenQuery();

  // 1. Տվյալների ստացում
  useEffect(() => {
    const currentEmail =
      user?.email || searchParams?.get("email") || initialEmail;

    const currentName =
      user?.name ||
      searchParams?.get("name") ||
      searchParams?.get("firstName") ||
      initialUserName;

    if (currentEmail) setEmail(currentEmail);

    if (currentName) {
      setUserName(currentName);
    } else if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("registeredUserName");
      if (storedName) setUserName(storedName);
    }
  }, [searchParams, initialEmail, initialUserName, user]);

  // 2. Token-ի / Signature-ի ավտոմատ ստուգում բեքենդում
  const verifyToken = useCallback(
    async () => {
      const id = searchParams?.get("id");
      const hash = searchParams?.get("hash");
      const expires = searchParams?.get("expires");
      const signature = searchParams?.get("signature");

      if (!id || !hash) return;

      setIsVerifying(true);
      setErrorMessage(null);

      try {
        const verifyUrl = `/auth/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`;
        await verifyEmailMutation({ verifyUrl }).unwrap();

        setIsVerified(true);
        if (typeof window !== "undefined") {
          localStorage.removeItem("registeredUserName");
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        setErrorMessage(err?.data?.message || t.errors.verifyFailed);
      } finally {
        setIsVerifying(false);
      }
    },
    [searchParams, verifyEmailMutation, t.errors.verifyFailed]
  );

  useEffect(() => {
    const idParam = searchParams?.get("id");
    const verifiedParam = searchParams?.get("verified");

    if (verifiedParam === "true") {
      setIsVerified(true);
    } else if (idParam) {
      verifyToken();
    }
  }, [searchParams, verifyToken]);

  // 3. Հետհաշվարկի տրամաբանություն
  useEffect(() => {
    if (countdown > 0 && !isVerified) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown <= 0) {
      setCanResend(true);
    }
  }, [countdown, isVerified]);

  // 4. Նամակի վերաուղարկում
  const handleResend = async () => {
    if (!canResend || isSending) return;
    setErrorMessage(null);

    try {
      await getCsrfToken().unwrap();
      await resendVerification().unwrap();

      setCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      console.error("Resend error:", err);
      setErrorMessage(err?.data?.message || t.errors.resendFailed);
    }
  };

  return (
    <div className="m-auto flex justify-center p-4">
      <article
        itemScope
        itemType={
          isVerified
            ? "https://schema.org/ActivateAction"
            : "https://schema.org/UserCheckinAction"
        }
        className="box-border flex w-full max-w-[448px] min-h-[519px] flex-col items-center justify-start gap-[24px] rounded-[24px] border border-black/10 bg-white p-[24px] sm:p-[32px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.05),0px_8px_10px_-6px_rgba(0,0,0,0.05)] font-['Plus_Jakarta_Sans',sans-serif]"
      >
        {isVerifying ? (
          /* VERIFYING LOADING STATE */
          <div className="flex flex-col items-center justify-center my-auto gap-4" role="status" aria-live="polite">
            <RefreshCw className="h-10 w-10 text-[#F15A22] animate-spin" aria-hidden="true" />
            <p className="text-[16px] font-medium text-[#2D2D2D]">
              {t.verifying}
            </p>
          </div>
        ) : isVerified ? (
          /* SUCCESS STATE */
          <>
            <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FFF7ED] shrink-0">
              <Check className="h-9 w-9 text-[#F15A22] stroke-[3]" aria-hidden="true" />
            </div>

            <header className="flex w-full flex-col items-center text-center">
              <h1 className="text-[24px] font-semibold leading-[32px] text-[#2D2D2D]">
                {t.successTitle}
              </h1>

              <p className="mt-[12px] text-[16px] font-normal leading-[26px] text-[#6B7280]">
                {t.successLine}
                <br />
                {t.accountBefore}{" "}
                <span className="font-semibold text-orange-600">{t.accountActive}</span>
                {t.accountAfter}
              </p>

              <div className="mt-[16px] flex w-full items-start gap-3 rounded-[16px] bg-[#F0FDF4] p-4 text-left border border-[#DCFCE7]">
                <ShieldCheck className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-xs font-semibold text-orange-600">
                    {t.activatedTitle}
                  </h2>
                  <p className="text-[11px] leading-relaxed text-orange-600">
                    {t.activatedText}
                  </p>
                </div>
              </div>
            </header>

            <div className="flex w-full flex-col items-center gap-[16px]">
              <button
                type="button"
                onClick={() => router.push(`/${locale}/login`)}
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#F15A22] text-[16px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F15A22] focus:ring-offset-2"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span>{t.continueToLogin}</span>
              </button>
            </div>
          </>
        ) : (
          /* PENDING / ERROR STATE */
          <>
            <div className="relative flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full bg-[#FFF7ED]">
              <Mail className="h-[36px] w-[36px] text-[#F15A22]" aria-hidden="true" />
              <div className="absolute left-[56px] top-[56px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#FFB900] shadow-sm">
                <span className="text-[12px] font-semibold leading-[16px] text-white">
                  !
                </span>
              </div>
            </div>

            <header className="flex w-full flex-col items-center text-center">
              <h1 className="text-[24px] font-semibold leading-[32px] text-[#2D2D2D]">
                {t.title}
              </h1>

              {errorMessage && (
                <div role="alert" className="mt-3 flex w-full items-center gap-2 rounded-xl bg-red-50 p-3 text-left border border-red-200">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0" aria-hidden="true" />
                  <p className="text-xs font-medium text-red-600">
                    {errorMessage}
                  </p>
                </div>
              )}

              <p className="mt-[12px] text-[16px] font-normal leading-[26px] text-[#6B7280]">
                {userName
                  ? (t.thanksWithName as string).replace("{name}", userName)
                  : t.thanks}
              </p>

              <p className="mt-[8px] text-[14px] font-normal leading-[23px] text-[#6B7280]">
                {t.sentTo}
              </p>

              <div className="mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[16px] border border-[#FFEDD4] bg-[#FFF7ED] px-[16px] py-[10px]">
                <span className="truncate text-[16px] font-medium leading-[24px] text-[#2D2D2D]">
                  {email || t.emailFallback}
                </span>
              </div>

              <p className="mt-[12px] text-[14px] font-normal leading-[23px] text-[#6B7280]">
                {t.checkInbox}
              </p>

              <p className="mt-[8px] text-[12px] font-normal leading-[16px] text-[#6B7280]">
                {t.spamBefore}{" "}
                <strong className="font-semibold text-[#6B7280]">{t.spamStrong}</strong>{" "}
                {t.spamAfter}
              </p>
            </header>

            <div className="flex w-full flex-col items-center gap-[16px]">
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isSending}
                aria-label={t.resend}
                className={`flex h-[48px] w-full items-center justify-center gap-[8px] rounded-[16px] py-[12px] transition-all ${
                  canResend && !isSending
                    ? "opacity-100 hover:opacity-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <RefreshCw
                  className={`h-[16px] w-[16px] text-[#F97316] ${
                    isSending || (countdown > 0 && !canResend)
                      ? "animate-spin"
                      : ""
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[16px] font-semibold leading-[24px] text-[#F97316]">
                  {isSending ? t.resending : t.resend}
                </span>
                {!canResend && (
                  <span className="text-[14px] font-normal leading-[20px] text-[#6B7280]">
                    ({countdown}{t.secondsShort})
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="flex h-[24px] w-full items-center justify-center gap-1.5 transition-opacity hover:opacity-80 cursor-pointer focus:outline-none"
              >
                <ArrowLeft className="h-[16px] w-[16px] text-[#F97316]" aria-hidden="true" />
                <span className="text-[16px] font-medium leading-[24px] text-[#F97316]">
                  {t.goBack}
                </span>
              </button>
            </div>
          </>
        )}
      </article>
    </div>
  );
}

function VerifyEmailFallback() {
  const { dict } = useLanguage();
  return (
    <div className="flex min-h-[519px] w-full max-w-[448px] items-center justify-center text-[14px] text-[#6B7280]">
      {dict.verifyEmail.loading}
    </div>
  );
}

export default function VerifyEmailCard(props: VerifyEmailCardProps) {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent {...props} />
    </Suspense>
  );
}