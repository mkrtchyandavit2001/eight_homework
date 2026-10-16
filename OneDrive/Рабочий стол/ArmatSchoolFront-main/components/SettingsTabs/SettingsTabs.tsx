"use client";

import { SETTINGS_TABS, type SettingsIcon, type SettingsTabId, type SettingsText } from "@/types/settings";
import { SettingsBellIcon, SettingsLanguageIcon, SettingsShieldIcon, SettingsUserIcon } from "../icons/Icons";


const TAB_ICONS: Record<SettingsTabId, SettingsIcon> = {
  account: SettingsUserIcon,
  notifications: SettingsBellIcon,
  security: SettingsShieldIcon,
  language: SettingsLanguageIcon,
};

interface SettingsTabsProps {
  active: SettingsTabId;
  labels: SettingsText["tabs"];
  onChange: (tab: SettingsTabId) => void;
}

export default function SettingsTabs({
  active,
  labels,
  onChange,
}: SettingsTabsProps) {
  return (
    <div
      role="tablist"
      className="flex w-full items-center overflow-x-auto rounded-[20px] border border-[#EDEDED] bg-white"
    >
      {SETTINGS_TABS.map((tab) => {
        const Icon = TAB_ICONS[tab];
        const isActive = tab === active;

        return (
          <button
            key={tab}
            id={`settings-tab-${tab}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`settings-panel-${tab}`}
            onClick={() => onChange(tab)}
            className={`flex h-[52px] min-w-[140px] flex-1 items-center justify-center gap-3 rounded-[22px] px-4 text-[13px] font-medium leading-5 transition-colors ${
              isActive
                ? "text-[#F15A22]"
                : "text-[#666666] hover:text-[#2D2D2D]"
            }`}
          >
            <Icon size={16} />
            <span>{labels[tab]}</span>
          </button>
        );
      })}
    </div>
  );
}
