// ISO կոդ → երկրի հիմնական (ամենաբնակեցված / մայրաքաղաքի) IANA ժամային գոտի
const COUNTRY_TZ: Record<string, string> = {
  // Կովկաս և Մերձավոր Արևելք
  AM: "Asia/Yerevan", AZ: "Asia/Baku", GE: "Asia/Tbilisi",
  AE: "Asia/Dubai", OM: "Asia/Muscat", SA: "Asia/Riyadh", IQ: "Asia/Baghdad",
  KW: "Asia/Kuwait", QA: "Asia/Qatar", BH: "Asia/Bahrain", YE: "Asia/Aden",
  JO: "Asia/Amman", SY: "Asia/Damascus", LB: "Asia/Beirut", IL: "Asia/Jerusalem",
  IR: "Asia/Tehran", TR: "Europe/Istanbul", EG: "Africa/Cairo",

  // Արևելյան Եվրոպա / ԱՊՀ
  RU: "Europe/Moscow", BY: "Europe/Minsk", UA: "Europe/Kyiv", MD: "Europe/Chisinau",
  KZ: "Asia/Almaty", UZ: "Asia/Tashkent", KG: "Asia/Bishkek", TJ: "Asia/Dushanbe",
  TM: "Asia/Ashgabat",
  CY: "Asia/Nicosia", GR: "Europe/Athens", BG: "Europe/Sofia", RO: "Europe/Bucharest",
  FI: "Europe/Helsinki", EE: "Europe/Tallinn", LV: "Europe/Riga", LT: "Europe/Vilnius",

  // Կենտրոնական / Արևմտյան Եվրոպա
  DE: "Europe/Berlin", FR: "Europe/Paris", ES: "Europe/Madrid", IT: "Europe/Rome",
  NL: "Europe/Amsterdam", BE: "Europe/Brussels", AT: "Europe/Vienna",
  CH: "Europe/Zurich", SE: "Europe/Stockholm", NO: "Europe/Oslo",
  DK: "Europe/Copenhagen", PL: "Europe/Warsaw", CZ: "Europe/Prague",
  SK: "Europe/Bratislava", HU: "Europe/Budapest", HR: "Europe/Zagreb",
  SI: "Europe/Ljubljana", RS: "Europe/Belgrade", BA: "Europe/Sarajevo",
  ME: "Europe/Podgorica", MK: "Europe/Skopje", AL: "Europe/Tirane",
  LU: "Europe/Luxembourg", MT: "Europe/Malta", LI: "Europe/Vaduz",
  MC: "Europe/Monaco", SM: "Europe/San_Marino", VA: "Europe/Vatican",
  AD: "Europe/Andorra",
  GB: "Europe/London", IE: "Europe/Dublin", PT: "Europe/Lisbon", IS: "Atlantic/Reykjavik",

  // Հյուսիսային և Հարավային Ամերիկա
  US: "America/New_York", CA: "America/Toronto", MX: "America/Mexico_City",
  BR: "America/Sao_Paulo", AR: "America/Argentina/Buenos_Aires", CL: "America/Santiago",
  CO: "America/Bogota", PE: "America/Lima", VE: "America/Caracas", CU: "America/Havana",
  DO: "America/Santo_Domingo", PA: "America/Panama", EC: "America/Guayaquil",
  UY: "America/Montevideo",

  // Ասիա / Օվկիանիա / Աֆրիկա
  IN: "Asia/Kolkata", CN: "Asia/Shanghai", JP: "Asia/Tokyo", KR: "Asia/Seoul",
  TH: "Asia/Bangkok", SG: "Asia/Singapore", AU: "Australia/Sydney",
  NZ: "Pacific/Auckland", ZA: "Africa/Johannesburg", NG: "Africa/Lagos",
};

/** Վերադարձնում է երկրի հիմնական IANA գոտին կամ null։ */
export function getIanaForCountry(country: string): string | null {
  return COUNTRY_TZ[country.trim().toUpperCase()] ?? null;
}

/** Ընթացիկ UTC offset-ը րոպեներով (հաշվի է առնում DST-ն)։ */
function getOffsetMinutes(timeZone: string, date = new Date()): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset",
    }).formatToParts(date);
    const raw = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
    const m = raw.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
    if (!m) return 0; // «GMT»
    const sign = m[1] === "-" ? -1 : 1;
    return sign * (Number(m[2]) * 60 + Number(m[3] ?? 0));
  } catch {
    return 0;
  }
}

function formatOffset(minutes: number): string {
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `UTC${sign}${hh}:${mm}`;
}

/** Օր.՝ "(UTC+04:00) Asia/Yerevan" */
export function formatTimezoneLabel(iana: string, date = new Date()): string {
  return `(${formatOffset(getOffsetMinutes(iana, date))}) ${iana}`;
}

/** Ընտրանիների ցուցակը՝ կարգավորված ըստ offset-ի, առանց կրկնությունների։ */
export function getTimezoneOptions(): string[] {
  const now = new Date();
  return Array.from(new Set(Object.values(COUNTRY_TZ)))
    .map((iana) => ({ iana, offset: getOffsetMinutes(iana, now) }))
    .sort((a, b) => a.offset - b.offset || a.iana.localeCompare(b.iana))
    .map(({ iana }) => formatTimezoneLabel(iana, now));
}

/** Երկրին համապատասխան ընտրանու տողը կամ null։ */
export function getTimezoneForCountry(country: string): string | null {
  const iana = getIanaForCountry(country);
  return iana ? formatTimezoneLabel(iana) : null;
}

/** "(UTC+04:00) Asia/Yerevan" → "Asia/Yerevan" (backend-ին ուղարկելու համար) */
export function extractIana(label: string): string {
  return label.replace(/^\([^)]*\)\s*/, "").trim();
}

/** Օգտատիրոջ բրաուզերի իրական գոտին որպես ընտրանի (կամ null)։ */
export function getBrowserTimezoneLabel(): string | null {
  try {
    const iana = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return iana ? formatTimezoneLabel(iana) : null;
  } catch {
    return null;
  }
}