import React from "react";
import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
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
  const t = getDictionarySync(locale).signup;
  const url = `https://armatschool.com/${locale}/signup`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        en: "https://armatschool.com/en/signup",
        hy: "https://armatschool.com/hy/signup",
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

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionarySync(locale).signup;

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row bg-[#F9FAFB] font-['Plus_Jakarta_Sans',sans-serif]">
      <SignUpBanner/>

      <section
        aria-label={locale === "hy" ? "Գրանցման բաժին" : "User Registration Section"}
        className="flex min-h-screen w-full items-center justify-center p-4 lg:w-1/2"
      >
        <SignUpForm />
      </section>
    </main>
  );
}