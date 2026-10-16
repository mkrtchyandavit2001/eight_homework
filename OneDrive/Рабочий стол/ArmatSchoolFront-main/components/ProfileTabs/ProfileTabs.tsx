"use client";

import { useLanguage } from "@/context/LanguageContext";

import type { DashIcon, ProfileTab } from "@/types/dashboard";
import { DashAwardIcon, DashCardIcon, DashHeartIcon, DashLessonsIcon } from "../icons/Icons";

const TABS: { key: ProfileTab; icon: DashIcon }[] = [
  { key: "learning", icon: DashLessonsIcon },
  { key: "certificates", icon: DashAwardIcon },
  { key: "payments", icon: DashCardIcon },
  { key: "favorites", icon: DashHeartIcon },
];

interface ProfileTabsProps {
  active: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}

export default function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.profile.tabs;

  return (
    <div
      role="tablist"
      className="flex items-center gap-[22px] overflow-x-auto rounded-xl border border-solid border-[#EDEDED] bg-white px-5 py-1.5"
    >
      {TABS.map(({ key, icon: Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className={`flex h-[54px] shrink-0 items-center gap-2 border-b-2 border-solid p-4 text-[13px] font-semibold leading-5 ${
              isActive
                ? "border-[#F15A22] text-[#F15A22]"
                : "border-transparent text-[#666] hover:text-[#2D2D2D]"
            }`}
          >
            <Icon size={14} />
            {t[key]}
          </button>
        );
      })}
    </div>
  );
}