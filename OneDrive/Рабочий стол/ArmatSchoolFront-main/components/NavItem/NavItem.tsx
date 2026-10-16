"use client";

import React from "react";
import Link from "next/link";
import type { NavItemProps } from "@/types/types";

type Props = NavItemProps & { fullWidth?: boolean };

export default function NavItem({
  href,
  label,
  isActive = false,
  fullWidth = false,
}: Props) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex items-center font-['Plus_Jakarta_Sans',sans-serif] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#F15A22] ${
        fullWidth
          ? "w-full justify-start rounded-none px-1 py-3.5 text-[16px] leading-[24px]"
          : "justify-center rounded-md px-1.5 py-1 text-[14px] leading-[21px]"
      } ${
        isActive
          ? "font-semibold text-[#F15A22]"
          : "font-medium text-[#666666] hover:text-[#F15A22]"
      }`}
    >
      <span className="inline-flex flex-col items-center justify-center">
        <span>{label}</span>
        {/* Թաքնված bold տարբերակ՝ լայնությունը չփոխվելու համար active-ի ժամանակ */}
        <span
          className="invisible h-0 overflow-hidden font-semibold"
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </Link>
  );
}