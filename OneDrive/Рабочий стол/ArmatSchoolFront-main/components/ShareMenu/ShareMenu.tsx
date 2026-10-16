"use client";

import React from "react";
import type { MenuItem } from "@/types/types";
import { FacebookIcon, InstagramIcon, LinkedInIcon, LinkIcon, MailIcon } from "../icons/Icons";

const MENU_ITEMS: MenuItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: <InstagramIcon />,
    href: "#",
    hasBottomBorder: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <FacebookIcon />,
    href: "#",
    hasBottomBorder: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    href: "#",
    hasBottomBorder: true,
  },
  {
    id: "email",
    label: "E-mail",
    icon: <MailIcon />,
    href: "#",
    hasBottomBorder: true,
  },
  {
    id: "copy-link",
    label: "Copy Link",
    icon: <LinkIcon />,
    hasBottomBorder: false,
  },
];

// ─── Component ───────────────────────────────────────────────────────────

export default function ShareMenu() {
  return (
    <div
      className="
        flex flex-col justify-center items-center
        w-[115px] h-[191px]
        bg-white
        border border-[#EDEDED]
        rounded-lg
        shadow-[0px_0px_18.1px_rgba(0,0,0,0.25)]
        overflow-hidden
      "
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {MENU_ITEMS.map((item) => {
        const rowClasses = `
          flex flex-row items-center
          px-[10px] py-[8px] gap-[8px]
          w-[113px]
          ${item.hasBottomBorder ? "border-b border-[#EDEDED]" : ""}
          ${item.hasBottomBorder ? "h-[38px]" : "h-[37px]"}
          bg-transparent
          transition-colors duration-100
          hover:bg-[#FAFAFA]
          cursor-pointer
          no-underline
        `;

        const content = (
          <>
            <span className="flex items-center justify-center w-4 h-4 shrink-0">
              {item.icon}
            </span>
            <span
              className="
                text-[14px] leading-[21px] font-medium
                text-[#666666]
                whitespace-nowrap
              "
            >
              {item.label}
            </span>
          </>
        );

        return item.href ? (
          <a
            key={item.id}
            href={item.href}
            className={rowClasses}
            aria-label={item.label}
          >
            {content}
          </a>
        ) : (
          <button
            key={item.id}
            type="button"
            className={`${rowClasses} text-left`}
            aria-label={item.label}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
