"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import type { SettingsTabId, SettingsText } from "@/types/settings";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import SettingsTabs from "../SettingsTabs/SettingsTabs";
import AccountTab from "../AccountTab/AccountTab";
import NotificationsTab from "../NotificationsTab/NotificationsTab";
import SecurityTab from "../SecurityTab/SecurityTab";
import LanguageTab from "../LanguageTab/LanguageTab";

export default function SettingsView() {
  const { locale, dict, setLocale } = useLanguage();
  const { user } = useAuth(); // <-- Ներմուծում ենք իրական user-ին
  const [tab, setTab] = useState<SettingsTabId>("account");

  const t: SettingsText = dict.dashboard.settings;

  // Հավաքում ենք իրական անունը և առաջին տառը (first_name + last_name)
  const firstName = user?.first_name || (user as any)?.name || "";
  const lastName = user?.last_name || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || user?.email?.split("@")[0] || "User";
  const userInitial = firstName.charAt(0).toUpperCase() || fullName.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex w-full flex-col items-center gap-5 pb-20">
      <SettingsHeader
        title={dict.dashboard.nav.settings}
        initial={userInitial}
        shortName={firstName}
        notificationsAria={dict.dashboard.user.notificationsAria}
      />

      <div className="flex w-full flex-col gap-14 rounded-[24px] bg-white p-4 sm:p-7">
        <SettingsTabs active={tab} labels={t.tabs} onChange={setTab} />

        <div
          role="tabpanel"
          id={`settings-panel-${tab}`}
          aria-labelledby={`settings-tab-${tab}`}
        >
          {tab === "account" && <AccountTab t={t} locale={locale} />}
          {tab === "notifications" && <NotificationsTab t={t} />}
          {tab === "security" && <SecurityTab t={t} />}
          {tab === "language" && (
            <LanguageTab t={t} locale={locale} onLocaleChange={setLocale} />
          )}
        </div>
      </div>
    </div>
  );
}