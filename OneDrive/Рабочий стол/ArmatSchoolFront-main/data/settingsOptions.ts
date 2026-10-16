import type { LanguagePrefs, LocalizedOption, NotificationPrefs, ProfileFormValues, SelectOption, SettingsLocale } from "@/types/settings";

export const INITIAL_PROFILE: ProfileFormValues = {
  fullName: "Emma Petrosyan",
  email: "emma@example.com",
  phone: "+1 555 123 4567",
  country: "us",
  city: "los-angeles",
  timezone: "America/Los_Angeles",
  dob: "2012-06-15",
  gender: "female",
  learningGoal: "Fluency for my family heritage",
  aboutMe:
    "I am learning Armenian to connect with my roots and speak with my family.",
};

export const INITIAL_NOTIFICATIONS: NotificationPrefs = {
  email: true,
  newsletter: false,
};

export const INITIAL_LANGUAGE: Omit<LanguagePrefs, "interfaceLocale"> = {
  dialect: "readWrite",
};

/* ───────────── Constraints ───────────── */

export const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
export const AVATAR_ACCEPT = "image/jpeg,image/png,image/gif";

/* ───────────── Options ───────────── */

export const COUNTRIES: LocalizedOption[] = [
  { value: "us", labels: { en: "United States", hy: "Միացյալ Նահանգներ" } },
  { value: "am", labels: { en: "Armenia", hy: "Հայաստան" } },
  { value: "ca", labels: { en: "Canada", hy: "Կանադա" } },
  { value: "fr", labels: { en: "France", hy: "Ֆրանսիա" } },
  { value: "de", labels: { en: "Germany", hy: "Գերմանիա" } },
  { value: "gb", labels: { en: "United Kingdom", hy: "Մեծ Բրիտանիա" } },
  { value: "ru", labels: { en: "Russia", hy: "Ռուսաստան" } },
];

export const CITIES_BY_COUNTRY: Record<string, LocalizedOption[]> = {
  us: [
    { value: "los-angeles", labels: { en: "Los Angeles", hy: "Լոս Անջելես" } },
    { value: "new-york", labels: { en: "New York", hy: "Նյու Յորք" } },
    { value: "boston", labels: { en: "Boston", hy: "Բոստոն" } },
    { value: "glendale", labels: { en: "Glendale", hy: "Գլենդել" } },
  ],
  am: [
    { value: "yerevan", labels: { en: "Yerevan", hy: "Երևան" } },
    { value: "gyumri", labels: { en: "Gyumri", hy: "Գյումրի" } },
    { value: "vanadzor", labels: { en: "Vanadzor", hy: "Վանաձոր" } },
  ],
  ca: [
    { value: "toronto", labels: { en: "Toronto", hy: "Տորոնտո" } },
    { value: "montreal", labels: { en: "Montreal", hy: "Մոնրեալ" } },
  ],
  fr: [
    { value: "paris", labels: { en: "Paris", hy: "Փարիզ" } },
    { value: "marseille", labels: { en: "Marseille", hy: "Մարսել" } },
  ],
  de: [
    { value: "berlin", labels: { en: "Berlin", hy: "Բեռլին" } },
    { value: "munich", labels: { en: "Munich", hy: "Մյունխեն" } },
  ],
  gb: [{ value: "london", labels: { en: "London", hy: "Լոնդոն" } }],
  ru: [
    { value: "moscow", labels: { en: "Moscow", hy: "Մոսկվա" } },
    { value: "sochi", labels: { en: "Sochi", hy: "Սոչի" } },
  ],
};

export const TIMEZONES: LocalizedOption[] = [
  {
    value: "America/Los_Angeles",
    labels: {
      en: "(GMT-8:00) Pacific Time — Los Angeles",
      hy: "(GMT-8:00) Խաղաղօվկիանոսյան ժամանակ — Լոս Անջելես",
    },
  },
  {
    value: "America/New_York",
    labels: {
      en: "(GMT-5:00) Eastern Time — New York",
      hy: "(GMT-5:00) Արևելյան ժամանակ — Նյու Յորք",
    },
  },
  {
    value: "Europe/London",
    labels: {
      en: "(GMT+0:00) Greenwich Mean Time — London",
      hy: "(GMT+0:00) Գրինվիչի ժամանակ — Լոնդոն",
    },
  },
  {
    value: "Europe/Paris",
    labels: {
      en: "(GMT+1:00) Central European Time — Paris",
      hy: "(GMT+1:00) Կենտրոնաեվրոպական ժամանակ — Փարիզ",
    },
  },
  {
    value: "Europe/Moscow",
    labels: {
      en: "(GMT+3:00) Moscow Time — Moscow",
      hy: "(GMT+3:00) Մոսկվայի ժամանակ — Մոսկվա",
    },
  },
  {
    value: "Asia/Yerevan",
    labels: {
      en: "(GMT+4:00) Armenia Time — Yerevan",
      hy: "(GMT+4:00) Հայաստանի ժամանակ — Երևան",
    },
  },
];

/* ───────────── Helpers ───────────── */

export function toSelectOptions(
  options: LocalizedOption[],
  locale: SettingsLocale
): SelectOption[] {
  return options.map((o) => ({ value: o.value, label: o.labels[locale] }));
}
