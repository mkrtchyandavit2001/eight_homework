"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_LOCALE = "en";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { locale } = useLanguage();


  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      router.replace(`/${DEFAULT_LOCALE}/home`);
    } else {
      router.replace(`${locale}/login`);
    }
  }, [isAuthenticated, loading, router, locale]);

  return null;
}