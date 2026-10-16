"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavItem from "../NavItem/NavItem";
import { useLanguage } from "@/context/LanguageContext";
import type { NavMenuItem } from "@/types/types";

const NAV_ITEMS: NavMenuItem[] = [
  { href: "/home", key: "home" },
  { href: "/courses", key: "courses" },
  { href: "/blog", key: "blog" },
  { href: "/events", key: "events" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

type NavMenuProps = {
  variant?: "desktop" | "mobile";
};

export default function NavMenu({ variant = "desktop" }: NavMenuProps) {
  const pathname = usePathname();
  const { dict, locale } = useLanguage();
  const isMobile = variant === "mobile";

  const getLocalizedHref = (path: string) => {
    if (!locale) return path;

    if (path === "/") {
      return `/${locale}`;
    }

    return `/${locale}${path}`;
  };

  const isLinkActive = (itemHref: string) => {
    const localizedHref = getLocalizedHref(itemHref);

    if (itemHref === "/") {
      return pathname === localizedHref;
    }
    return pathname.startsWith(localizedHref);
  };

  return (
    <nav aria-label={isMobile ? "Mobile Navigation" : "Main Navigation"}>
      <ul
        className={
          isMobile
            ? "flex flex-col"
            : "flex items-center gap-4 lg:gap-6 xl:gap-8"
        }
      >
        {NAV_ITEMS.map((item) => {
          const localizedHref = getLocalizedHref(item.href);
          const active = isLinkActive(item.href);

          return (
            <li
              key={item.href}
              className={isMobile ? "border-b border-[#EDEDED] last:border-b-0" : ""}
            >
              <NavItem
                href={localizedHref}
                label={dict.nav[item.key]}
                isActive={active}
                fullWidth={isMobile}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}