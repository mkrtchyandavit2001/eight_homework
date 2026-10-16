import type { ReactElement, SVGProps } from "react";

/* ───────────── Base types ───────────── */

export type SettingsLocale = "en" | "hy";

export type SettingsTabId =
  | "account"
  | "notifications"
  | "security"
  | "language";

export const SETTINGS_TABS: SettingsTabId[] = [
  "account",
  "notifications",
  "security",
  "language",
];

/* ───────────── Icons ───────────── */

export type SettingsIconProps = SVGProps<SVGSVGElement> & { size?: number };
export type SettingsIcon = (props: SettingsIconProps) => ReactElement;

/* ───────────── Form values ───────────── */

export type Gender = "female" | "male" | "other" | "preferNot";

export interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  /** ISO format: YYYY-MM-DD */
  dob: string;
  gender: Gender;
  learningGoal: string;
  aboutMe: string;
}

export interface NotificationPrefs {
  email: boolean;
  newsletter: boolean;
}

export type DialectPreference = "readWrite" | "speak" | "understand" | "none";

export interface LanguagePrefs {
  interfaceLocale: SettingsLocale;
  dialect: DialectPreference;
}

/* ───────────── Select options ───────────── */

export interface SelectOption {
  value: string;
  label: string;
}

export interface LocalizedOption {
  value: string;
  labels: Record<SettingsLocale, string>;
}

/* ───────────── Dictionary (dashboard.settings) ───────────── */

export interface SettingsText {
  title: string;
  tabs: Record<SettingsTabId, string>;
  account: {
    title: string;
    subtitle: string;
    photoTitle: string;
    photoHint: string;
    uploadPhoto: string;
    photoTooBig: string;
    photoBadType: string;
    fields: {
      fullName: string;
      email: string;
      phone: string;
      country: string;
      city: string;
      timezone: string;
      dob: string;
      gender: string;
    };
    genders: Record<Gender, string>;
    learningGoal: string;
    learningGoalPlaceholder: string;
    aboutMe: string;
    aboutPlaceholder: string;
    cancel: string;
    save: string;
    saved: string;
  };
  notifications: {
    title: string;
    emailTitle: string;
    emailDesc: string;
    newsletterTitle: string;
    newsletterDesc: string;
  };
  security: {
    title: string;
    changePassword: string;
    /** uses {days} */
    lastChanged: string;
    change: string;
    changeEmail: string;
    newEmail: string;
    newEmailPlaceholder: string;
    activeSessions: string;
    /** uses {count} and {browser} */
    sessionsDesc: string;
    signOutOthers: string;
    dangerZone: string;
    dangerDesc: string;
    deleteAccount: string;
    deleteConfirm: string;
  };
  language: {
    title: string;
    interfaceLanguage: string;
    english: string;
    armenian: string;
    dialect: string;
    dialectOptions: Record<DialectPreference, string>;
    savePreferences: string;
    saved: string;
  };
}
