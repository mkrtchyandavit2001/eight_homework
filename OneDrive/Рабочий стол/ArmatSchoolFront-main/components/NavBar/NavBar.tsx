"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, Bell, Menu, X } from "lucide-react";
import NavMenu from "../NavMenu/NavMenu";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext"; // <-- Կարևոր է. ներմուծում ենք AuthContext-ը
import Container from "@/components/Container";
import LanguageModal from "../LanguageModal/LanguageModal";

import {
  setLocale,
  type LocaleCode,
} from "@/redux/slices/languageSlice/languageSlice";
import { useGetLanguagesQuery } from "@/redux/slices/languageSlice/languageApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// Կոճակների վրա ցուցադրվող կարճ տառերը
const LABELS: Record<LocaleCode, string> = { en: "EN", hy: "AM" };

// Fallback, եթե backend-ը դեռ չի պատասխանել կամ անհասանելի է
const FALLBACK_LANGUAGES = [
  { id: 2, code: "en" as LocaleCode, name: "English", native_name: "English" },
  { id: 1, code: "hy" as LocaleCode, name: "Armenian", native_name: "Հայերեն" },
];

export default function NavBar() {
  const { locale: contextLocale, dict } = useLanguage();
  const { user } = useAuth(); // <-- Ստանում ենք իրական user-ին AuthContext-ից
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Ստուգում ենք՝ արդյոք օգտատերը մուտք գործել է, թե ոչ
  const isLoggedIn = !!user;
  const userName = user?.name || "User";
  // Վերցնում ենք օգտատիրոջ անվան առաջին տառը կամ ֆոլբեք "U"
  const userInitial = userName.charAt(0).toUpperCase() || "U";

  // Ապահովագրում ենք Redux-ի locale-ը, որպեսզի երբեք undefined չլինի
  const reduxLocale = useAppSelector((s) => s.language.locale);
  const locale =
    reduxLocale && reduxLocale !== "undefined" ? reduxLocale : contextLocale;

  const { data: fetchedLanguages } = useGetLanguagesQuery();
  const languages =
    fetchedLanguages && fetchedLanguages.length > 0
      ? fetchedLanguages.filter((l) => l.code in LABELS)
      : FALLBACK_LANGUAGES;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Էջ փոխելիս փակել մոբայլ մենյուն
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Մենյուի բացված ժամանակ արգելել էջի scroll-ը
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Լեզվի փոփոխություն՝ Redux + URL-ի /hy ↔ /en փոխարինում
  const changeLocale = (code: LocaleCode) => {
    if (code === locale) return;
    dispatch(setLocale(code));
    router.push(pathname.replace(/^\/(hy|en)(?=\/|$)/, `/${code}`));
  };

  const langBtn = (active: boolean) =>
    `inline-flex items-center justify-center rounded-md px-1.5 py-1 font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[21px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A22] ${
      active
        ? "font-semibold text-[#F15A22]"
        : "font-medium text-[#666666] hover:text-[#F15A22]"
    }`;

  const badge =
    "absolute left-[18px] top-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#F15A22] px-1 text-[10px] font-semibold leading-[15px] text-white";

  const iconBtn =
    "relative flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200";

  return (
    <header className="fixed z-60 w-full border-b-[0.5px] border-[#EDEDED] bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      <Container className="grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:px-10">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className={`${iconBtn} md:hidden`}
        >
          {isMenuOpen ? (
            <X className="h-[20px] w-[20px] text-[#2D2D2D]" strokeWidth={1.5} />
          ) : (
            <Menu className="h-[20px] w-[20px] text-[#2D2D2D]" strokeWidth={1.5} />
          )}
        </button>

        {/* Logo */}
        <Link
          href={`/${locale}/home`}
          className="relative h-[71px] w-[120px] shrink-0 justify-self-start sm:w-[140px] lg:w-[164px]"
          aria-label="Armat Home"
        >
          <Image
            src="/images/Black_text+Orange_hat.png"
            alt="Armat Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden items-center justify-center md:flex">
          <NavMenu />
        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center justify-self-end gap-2 sm:gap-[14px]">
          {/* Language Switcher */}
          <nav aria-label="Language selection" className="flex items-center gap-0.5 sm:gap-1">
            {languages.map((l, i) => (
              <React.Fragment key={l.id}>
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
                  onClick={() => changeLocale(l.code)}
                  aria-label={`Switch to ${l.name}`}
                  aria-pressed={locale === l.code}
                  className={langBtn(locale === l.code)}
                >
                  <span className="inline-flex flex-col items-center justify-center">
                    <span>{LABELS[l.code]}</span>
                    <span
                      className="invisible h-0 overflow-hidden font-semibold"
                      aria-hidden="true"
                    >
                      {LABELS[l.code]}
                    </span>
                  </span>
                </button>
              </React.Fragment>
            ))}
          </nav>

          {!isLoggedIn ? (
            /* Logged Out State */
            <div className="flex items-center gap-2 sm:gap-[20px]">
              <Link
                href={`/${locale}/login`}
                className="rounded px-2 py-1 text-[14px] font-semibold leading-[21px] text-[#2D2D2D] transition-colors hover:text-[#F15A22] focus:outline-none focus:ring-1 focus:ring-[#F15A22]"
              >
                {dict.nav.login}
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden h-[40px] items-center justify-center rounded-[8px] border border-[#F15A22] px-4 text-[14px] font-semibold text-[#F15A22] transition-all hover:bg-[#F15A22] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F15A22] focus:ring-offset-2 sm:flex"
              >
                {dict.nav.freeTrial}
              </button>
            </div>
          ) : (
            /* Logged In State */
            <div className="flex h-[40px] items-center">
              {/* Messages & Notifications */}
              <div className="flex items-center">
                <button
                  type="button"
                  aria-label="Messages, 1 unread"
                  className={iconBtn}
                >
                  <MessageSquare
                    className="h-[18px] w-[18px] text-[#666666]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className={badge}>1</span>
                </button>

                <button
                  type="button"
                  aria-label="Notifications, 2 unread"
                  className={iconBtn}
                >
                  <Bell
                    className="h-[18px] w-[18px] text-[#666666]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className={badge}>2</span>
                </button>
              </div>

              {/* Divider */}
              <div className="hidden px-2 sm:flex" aria-hidden="true">
                <div className="h-[24px] w-[1px] bg-[#EDEDED]" />
              </div>

              {/* User Profile */}
              <div className="relative">
                <Link
                  href={`/${locale}/profile/lessons`}
                  aria-label={`${userName} profile`}
                  className="flex h-[40px] items-center gap-[10px] rounded-full py-[4px] pl-[4px] pr-[4px] transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:pr-[10px]"
                >
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#F15A22] text-[12px] font-semibold leading-[18px] text-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
                    {userInitial}
                  </div>
                  <span className="hidden text-[13px] font-semibold leading-[20px] text-[#2D2D2D] sm:inline-block">
                    {userName}
                  </span>
                </Link>
              </div>
            </div>
          )}

          <LanguageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </Container>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`absolute left-0 top-full w-full border-b border-[#EDEDED] bg-white shadow-md md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 py-4 sm:px-6">
          <NavMenu variant="mobile" />

          {!isLoggedIn && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="mt-4 flex h-[44px] w-full items-center justify-center rounded-[8px] border border-[#F15A22] px-4 text-[14px] font-semibold text-[#F15A22] transition-all hover:bg-[#F15A22] hover:text-white sm:hidden"
            >
              {dict.nav.freeTrial}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}