"use client";

import React from "react";
import { useLanguage, Locale } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { DashBellIcon, DashChevronDownIcon } from "../icons/Icons";

interface DashTopbarProps {
  title: string;
}

// Լեզուների կարճ անվանումները՝ NavBar-ի նման
const LABELS: Record<Locale, string> = { en: "EN", hy: "AM" };
const SUPPORTED_LOCALES: Locale[] = ["en", "hy"];

export default function DashTopbar({ title }: DashTopbarProps) {
  const { locale, setLocale, dict } = useLanguage();
  const { user } = useAuth(); // <-- Ստանում ենք իրական user-ին AuthContext-ից
  const t = dict.dashboard;

  // Դինամիկ օգտատիրոջ տվյալներ (ստուգում ենք first_name-ը, name-ը կամ email-ը)
  const userName =
    user?.first_name ||
    (user as any)?.name ||
    user?.email?.split("@")[0] ||
    t.user.short ||
    "User";

  const userInitial = userName.charAt(0).toUpperCase() || t.user.initial || "U";

  const changeLocale = (code: Locale) => {
    if (code === locale) return;
    setLocale(code);
  };

  // NavBar-ի լեզվի կոճակի ոճերը
  const langBtn = (active: boolean) =>
    `inline-flex items-center justify-center rounded-md px-1.5 py-1 font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[21px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A22] ${
      active
        ? "font-semibold text-[#F15A22]"
        : "font-medium text-[#666666] hover:text-[#F15A22]"
    }`;

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#EDEDED] bg-white px-8 py-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <h1 className="text-lg font-semibold leading-[27px] text-[#2D2D2D]">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Language Switcher — NavBar-ի ոճով (EN | AM) */}
        <nav aria-label="Language selection" className="flex items-center gap-0.5 sm:gap-1 mr-2">
          {SUPPORTED_LOCALES.map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && (
                <span
                  className="text-[14px] font-semibold leading-[21px] text-[#DDDDDD]"
                  aria-hidden="true"
                >
                  |
                </span>
              )}
              <button
                type="button"
                onClick={() => changeLocale(l)}
                aria-label={`Switch to ${l}`}
                aria-pressed={locale === l}
                className={langBtn(locale === l)}
              >
                <span className="inline-flex flex-col items-center justify-center">
                  <span>{LABELS[l]}</span>
                  {/* Թաքնված bold տարբերակ՝ լայնությունը չփոխվելու համար active-ի ժամանակ */}
                  <span
                    className="invisible h-0 overflow-hidden font-semibold"
                    aria-hidden="true"
                  >
                    {LABELS[l]}
                  </span>
                </span>
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Notifications Button */}
        <button
          type="button"
          aria-label={t.user.notificationsAria}
          className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#999] hover:bg-[#F7F7F7]"
        >
          <DashBellIcon size={18} />
          <span className="absolute left-5 top-1.5 h-2 w-2 rounded-full bg-[#F15A22]" />
        </button>

        {/* User Menu Trigger */}
        <button
          type="button"
          className="flex h-10 items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 hover:bg-[#F7F7F7]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F15A22] text-xs font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
            {userInitial}
          </span>
          <span className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">
            {userName}
          </span>
          <DashChevronDownIcon size={13} className="text-[#999]" />
        </button>
      </div>
    </header>
  );
}