"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { MessagesTab } from "@/types/dashboard";

interface MessageTabsProps {
  active: MessagesTab;
  unreadUpdates: number;
  onChange: (tab: MessagesTab) => void;
}

export default function MessageTabs({ active, unreadUpdates, onChange }: MessageTabsProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.messages.tabs;

  const base = "flex h-[30px] items-center gap-1.5 rounded-lg px-3 text-xs font-medium leading-[18px]";
  const on = "bg-white text-[#2D2D2D] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]";
  const off = "text-[#999] hover:text-[#2D2D2D]";

  return (
    <div role="tablist" className="inline-flex items-center gap-1 rounded-xl bg-[#F7F7F7] p-1">
      <button
        type="button"
        role="tab"
        aria-selected={active === "teacher"}
        onClick={() => onChange("teacher")}
        className={`${base} ${active === "teacher" ? on : off}`}
      >
        {t.teacher}
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={active === "updates"}
        onClick={() => onChange("updates")}
        className={`${base} ${active === "updates" ? on : off}`}
      >
        {t.updates}
        {unreadUpdates > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F15A22] px-1 text-[9px] font-semibold leading-[14px] text-white">
            {unreadUpdates}
          </span>
        )}
      </button>
    </div>
  );
}