import en from "../locales/en/common.json";
import hy from "../locales/hy/common.json";

const dictionaries: Record<string, any> = { en, hy};

export async function getDictionary(locale: string): Promise<any> {
  if (!locale || !dictionaries[locale]) {
    console.warn(
      `⚠️ Dictionary not found for locale: ${locale}, using default (hy)`,
    );
    return dictionaries.hy;
  }
  return dictionaries[locale];
}

// ✅ Սինքրոն տարբերակ (Navbar-ի և այլ client component-երի համար)
export function getDictionarySync(locale: string): any {
  if (!locale || !dictionaries[locale]) {
    return dictionaries.hy;
  }
  return dictionaries[locale];
}

export default dictionaries;
