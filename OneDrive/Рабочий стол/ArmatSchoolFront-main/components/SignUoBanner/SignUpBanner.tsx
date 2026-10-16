"use client";

import React from "react";
import Image from "next/image";
import { useLanguage, type Locale } from "@/context/LanguageContext";

const LANGUAGES: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "hy", label: "HY", name: "Հայերեն" },
];

export default function SignUpBanner() {
  const { dict, locale, setLocale } = useLanguage();
  const t = dict?.signup?.banner;

  if (!t) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Missing dictionary key: signup.banner");
    }
    return null;
  }

  return (
    <aside
      aria-label={t.aria}
      className="relative flex w-full flex-col items-center justify-center bg-[#FDF8F3] px-6 py-12 lg:w-1/2 lg:py-16"
    >
      {/* Language switcher */}
      <div
        role="group"
        aria-label={t.languageLabel ?? "Language"}
        className="absolute right-4 top-4 flex items-center rounded-full border border-[#EDEDED] bg-white p-1 shadow-sm sm:right-6 sm:top-6"
      >
        {LANGUAGES.map(({ code, label, name }) => {
          const isActive = code === locale;
          return (
            <button
              key={code}
              type="button"
              lang={code}
              title={name}
              aria-label={name}
              aria-pressed={isActive}
              onClick={() => setLocale(code)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#F15A22] ${
                isActive
                  ? "bg-[#F15A22] text-white"
                  : "cursor-pointer text-[#6B7280] hover:text-[#2D2D2D]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-10 lg:gap-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 h-28 w-64 sm:h-36 sm:w-80">
            <Image
              src="/images/Orange_text+Black_hat_1.png"
              alt={t.logoAlt}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 256px, 320px"
            />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#F15A22] sm:text-3xl lg:text-4xl">
            {t.heading}{" "}
            <span className="mt-1 block text-xl font-medium text-[#2D2D2D] sm:text-2xl lg:text-3xl">
              {t.subheading}
            </span>
          </h2>

          <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-[#6B7280]">
            {t.hashtags}
          </p>
        </div>
      </div>
    </aside>
  );
}