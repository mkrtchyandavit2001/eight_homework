import type { CalendarCell, LessonView } from "@/types/dashboard";

export const pad = (n: number) => String(n).padStart(2, "0");

/** month — 0-based (0 = January) */
export const toKey = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

/** Ամսվա ցանցը՝ կիրակիով սկսվող շաբաթով. սկզբում `null` դատարկ վանդակներ */
export function buildMonth(year: number, month: number): (CalendarCell | null)[] {
  const leading = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (CalendarCell | null)[] = Array(leading).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, key: toKey(year, month, day) });
  }
  return cells;
}

/** Կիր, Երկ, Երք ... ըստ locale-ի */
export function weekdayLabels(intlLocale: string): string[] {
  const fmt = new Intl.DateTimeFormat(intlLocale, { weekday: "short" });
  // 2023-01-01-ը կիրակի է
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2023, 0, 1 + i)));
}

export function groupByDay(lessons: LessonView[]): Record<string, LessonView[]> {
  const map: Record<string, LessonView[]> = {};
  [...lessons]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .forEach((l) => {
      const key = l.startsAt.slice(0, 10);
      (map[key] ??= []).push(l);
    });
  return map;
}

export const intlLocaleOf = (locale: string) => (locale === "hy" ? "hy-AM" : "en-US");