"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLogoutMutation } from "@/redux/slices/authSlice/authApi";
import type { DashNavItem } from "@/types/dashboard";
import {
  DashBackIcon,
  DashCalendarIcon,
  DashCoursesIcon,
  DashHomeworkIcon,
  DashLessonsIcon,
  DashLogoutIcon,
  DashMaterialsIcon,
  DashMessagesIcon,
  DashProfileIcon,
  DashSettingsIcon,
} from "../icons/Icons";

const NAV: DashNavItem[] = [
  { key: "myLessons", path: "lessons", icon: DashLessonsIcon },
  { key: "calendar", path: "calendar", icon: DashCalendarIcon },
  { key: "homework", path: "homework", icon: DashHomeworkIcon },
  { key: "materials", path: "materials", icon: DashMaterialsIcon },
  { key: "messages", path: "messages", icon: DashMessagesIcon },
  { key: "courses", path: "courses", icon: DashCoursesIcon },
  { key: "profile", path: "profile", icon: DashProfileIcon },
  { key: "settings", path: "settings", icon: DashSettingsIcon },
];

export default function DashSidebar() {
  const { dict, locale } = useLanguage();
  const { user, logout: contextLogout } = useAuth();
  const [logoutApi] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();
  const t = dict.dashboard;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Հավաքում ենք full name-ը (first_name + last_name)
  const firstName = user?.first_name || (user as any)?.name || "";
  const lastName = user?.last_name || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || user?.email?.split("@")[0] || t.user.name;

  const userInitial = firstName.charAt(0).toUpperCase() || t.user.initial || "U";
  const userStatus = user?.phone ? user.phone : (t.user.status || "Student");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutApi().unwrap();
    } catch {
      // Handled silently
    } finally {
      try {
        contextLogout();
        await signOut({ redirect: false });
      } catch {
        // Handled silently
      } finally {
        router.replace(`/${locale}/login`);
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-[#EDEDED] bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="dash-sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#2D2D2D] hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <Link href={`/${locale}/home`} aria-label="Armat Home">
          <Image
            src="/images/Black_text+Orange_hat.png"
            alt="Armat"
            width={120}
            height={20}
            priority
          />
        </Link>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="dash-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 shrink-0 flex-col border-r border-[#EDEDED] bg-white font-['Plus_Jakarta_Sans',sans-serif] transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:w-60 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-[#EDEDED] p-5">
          <Link href={`/${locale}/home`} aria-label="Armat Home">
            <Image
              src="/images/Black_text+Orange_hat.png"
              alt="Armat"
              width={160}
              height={27}
              priority
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#666] hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          <p className="p-2 py-5 text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#999]">
            {t.nav.section}
          </p>

          {NAV.map(({ key, path, icon: Icon, hasDot }) => {
            const href = `/${locale}/profile/${path}`;
            const active = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 border-b border-[#EDEDED] px-3 py-3 text-[13px] leading-5 transition-colors lg:py-2.5 ${
                  active
                    ? "font-medium text-orange-500"
                    : "font-normal text-[#666] hover:text-orange-500"
                }`}
              >
                <Icon size={16} />
                <span>{t.nav[key]}</span>
                {hasDot && (
                  <span className="h-[7px] w-[7px] rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}

          <div className="pt-4">
            <Link
              href={`/${locale}/home`}
              className="flex items-center gap-3 rounded-[22px] px-3 py-2.5 text-[13px] leading-5 text-[#666] transition-colors hover:text-orange-500"
            >
              <DashBackIcon size={16} />
              <span>{t.nav.backToSite}</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-[#EDEDED] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[13px] font-semibold text-white">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold leading-[18px] text-[#2D2D2D]">
                {fullName}
              </p>
              <p className="truncate text-[10px] leading-[15px] text-[#AAA]">
                {userStatus}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label={t.user.logoutAria}
              title={t.user.logoutAria}
              className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-md text-[#CCC] transition-colors hover:text-orange-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <DashLogoutIcon size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}