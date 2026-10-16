"use client";

import { SettingsBellIcon, SettingsChevronDownIcon } from "../icons/Icons";


interface SettingsHeaderProps {
  title: string;
  initial: string;
  shortName: string;
  notificationsAria: string;
  hasUnread?: boolean;
}

/**
 * Top bar of the page. If you already have a shared dashboard header
 * component (used by Messages / Lessons), use it instead and delete this file.
 */
export default function SettingsHeader({
  title,
  initial,
  shortName,
  notificationsAria,
  hasUnread = true,
}: SettingsHeaderProps) {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-[#EDEDED] bg-white px-8 py-4">
      <h1 className="text-[18px] font-semibold leading-[27px] text-[#2D2D2D]">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={notificationsAria}
          className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#999999] transition-colors hover:bg-[#F7F7F7]"
        >
          <SettingsBellIcon size={18} />
          {hasUnread && (
            <span className="absolute left-5 top-[6px] h-2 w-2 rounded-full bg-[#F15A22]" />
          )}
        </button>

        <button
          type="button"
          className="flex h-10 items-center gap-[10px] rounded-full py-1 pl-1 pr-[10px] transition-colors hover:bg-[#F7F7F7]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F15A22] text-[12px] font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
            {initial}
          </span>
          <span className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">
            {shortName}
          </span>
          <SettingsChevronDownIcon size={13} className="text-[#999999]" />
        </button>
      </div>
    </header>
  );
}
