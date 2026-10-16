// lib/useDictionary.ts (or wherever useDictionary is defined)

import { useLanguage } from "@/context/LanguageContext";

export function useDictionary() {
  const { dict, locale, setLocale } = useLanguage();
  
  // Return the dictionary and safely expose 'about'
  return {
    ...dict,
    locale,
    setLocale,
  };
}