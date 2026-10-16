import React from "react";
import type { Metadata } from "next";
import VerifyEmailCard from "@/components/VerifyEmailCard/VerifyEmailCard";
import SignUpBanner from "@/components/SignUoBanner/SignUpBanner";
import { getDictionarySync } from "@/lib/dictionary";

type Locale = "en" | "hy";

function resolveLocale(value: string): Locale {
  return value === "hy" ? "hy" : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionarySync(locale).verifyEmail;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    // Verification pages should not be indexed by search engines
    robots: { index: false, follow: false },
  };
}

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionarySync(locale).verifyEmail;

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row bg-[#F9FAFB] font-['Plus_Jakarta_Sans',sans-serif]">
      <SignUpBanner />

      <section
        aria-label={t.sectionAria}
        className="flex w-full items-center justify-center p-6 lg:w-1/2"
      >
        <VerifyEmailCard />
      </section>
    </main>
  );
}