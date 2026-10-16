import { pad } from "@/lib/calendar";

export function formatClock(date: Date, timeZone: string, intlLocale: string, hour12: boolean) {
  return new Intl.DateTimeFormat(intlLocale, {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12,
  }).format(date);
}

/** "GMT+4", "GMT-4" */
export function gmtLabel(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

/** Ընթացիկ տեղական ժամը որպես "YYYY-MM-DDTHH:mm" */
export function nowLocalIso() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}