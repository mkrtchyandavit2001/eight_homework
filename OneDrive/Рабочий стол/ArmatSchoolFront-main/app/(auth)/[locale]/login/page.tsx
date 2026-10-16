import React from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm/LoginForm";
import SignUpBanner from "@/components/SignUoBanner/SignUpBanner";
import { getDictionarySync } from "@/lib/dictionary";

type Locale = "en" | "hy";

const OG_LOCALES: Record<Locale, string> = { en: "en_US", hy: "hy_AM" };

function resolveLocale(value: string): Locale {
  return value === "hy" ? "hy" : "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionarySync(locale).login;
  const url = `https://armatschool.com/${locale}/login`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        en: "https://armatschool.com/en/login",
        hy: "https://armatschool.com/hy/login",
      },
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url,
      siteName: locale === "hy" ? "Արմատ դպրոց" : "Armat School",
      locale: OG_LOCALES[locale],
      type: "website",
    },
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionarySync(locale).login;

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row bg-[#F9FAFB] font-['Plus_Jakarta_Sans',sans-serif]">
      <SignUpBanner />

      <section
        aria-label={t.sectionAria}
        className="flex w-full items-center justify-center p-6 lg:w-1/2"
      >
        <LoginForm />
      </section>
    </main>
  );
}