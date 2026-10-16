const time24 = (intlLocale: string) =>
  new Intl.DateTimeFormat(intlLocale, { hour: "2-digit", minute: "2-digit", hour12: false });

/** "18:00 – 19:00" */
export function lessonRange(startIso: string, minutes: number, intlLocale: string) {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + minutes * 60_000);
  const fmt = time24(intlLocale);
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/** Երկուշաբթի, հուլիսի 29 */
export function weekdayDate(iso: string, intlLocale: string, month: "long" | "short") {
  return new Intl.DateTimeFormat(intlLocale, { weekday: "long", month, day: "numeric" }).format(
    new Date(iso)
  );
}

/** "Sep 2026" */
export function monthYear(iso: string, intlLocale: string) {
  return new Intl.DateTimeFormat(intlLocale, { month: "short", year: "numeric" }).format(
    new Date(`${iso}T00:00`)
  );
}