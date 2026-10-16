"use client";

import { INITIAL_NOTIFICATIONS } from "@/data/settingsOptions";
import type { NotificationPrefs, SettingsText } from "@/types/settings";
import { useState } from "react";
import SettingsCard from "../SettingsCard/SettingsCard";
import SettingsRow from "../SettingsRow/SettingsRow";
import Toggle from "../Toggle/Toggle";
interface NotificationsTabProps {
  t: SettingsText;
  initialValues?: NotificationPrefs;
  /** Called on every toggle. Hook up your API here. */
  onChange?: (prefs: NotificationPrefs) => void;
}

export default function NotificationsTab({
  t,
  initialValues = INITIAL_NOTIFICATIONS,
  onChange,
}: NotificationsTabProps) {
  const n = t.notifications;
  const [prefs, setPrefs] = useState<NotificationPrefs>(initialValues);

  const update = (key: keyof NotificationPrefs, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    onChange?.(next);
  };

  return (
    <SettingsCard title={n.title}>
      <div className="-mt-6 pt-6">
        <SettingsRow
          title={n.emailTitle}
          description={n.emailDesc}
          action={
            <Toggle
              label={n.emailTitle}
              checked={prefs.email}
              onChange={(v) => update("email", v)}
            />
          }
        />
        <SettingsRow
          bordered={false}
          title={n.newsletterTitle}
          description={n.newsletterDesc}
          action={
            <Toggle
              label={n.newsletterTitle}
              checked={prefs.newsletter}
              onChange={(v) => update("newsletter", v)}
            />
          }
        />
      </div>
    </SettingsCard>
  );
}
