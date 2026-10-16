export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const ACCEPT_ATTR = ".jpg,.jpeg,.png,.pdf";

/** "{days}d {hours}h" տիպի template-ների լրացում */
export function fillTemplate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

/** Մնացած ժամանակը մինչև deadline. null՝ եթե արդեն անցել է */
export function timeLeft(deadlineIso: string, nowIso: string) {
  const ms = new Date(deadlineIso).getTime() - new Date(nowIso).getTime();
  if (ms <= 0) return null;
  const totalHours = Math.floor(ms / 36e5);
  return { days: Math.floor(totalHours / 24), hours: totalHours % 24 };
}

export const isOnTime = (submittedAt: string, deadlineAt: string) =>
  new Date(submittedAt).getTime() <= new Date(deadlineAt).getTime();