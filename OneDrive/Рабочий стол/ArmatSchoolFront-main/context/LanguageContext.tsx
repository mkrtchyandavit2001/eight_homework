"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDictionarySync } from "@/lib/dictionary";

export type Locale = "en" | "hy";

const SUPPORTED_LOCALES: Locale[] = ["en", "hy"];
const DEFAULT_LOCALE: Locale = "en";

interface LanguageContextValue {
  locale: Locale;
  dict: any;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

function extractLocale(pathname: string): Locale {
  const firstSegment = pathname.split("/")[1];

  if (!firstSegment || firstSegment === "undefined") {
    return DEFAULT_LOCALE;
  }

  return SUPPORTED_LOCALES.includes(firstSegment as Locale)
    ? (firstSegment as Locale)
    : DEFAULT_LOCALE;
}

function replaceLocaleInPath(
  pathname: string,
  newLocale: Locale
): string {
  const segments = pathname.split("/");

  // Եթե արդեն կա locale prefix կամ սխալմամբ գրված է "undefined"
  if (SUPPORTED_LOCALES.includes(segments[1] as Locale) || segments[1] === "undefined") {
    segments[1] = newLocale;
  } else {
    // Եթե locale prefix չկա, ավելացնում ենք այն
    segments.splice(1, 0, newLocale);
  }

  // Մաքրում ենք ցանկացած պատահական "undefined" սեգմենտ
  const cleanSegments = segments.filter(seg => seg !== "undefined");

  return cleanSegments.join("/") || `/${newLocale}`;
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const locale = useMemo(
    () => extractLocale(pathname),
    [pathname]
  );

  const dict = useMemo(
    () => getDictionarySync(locale),
    [locale]
  );

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    const newPath = replaceLocaleInPath(pathname, newLocale);

    router.replace(newPath, {
      scroll: false,
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dict,
        setLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider"
    );
  }
  return ctx;
}