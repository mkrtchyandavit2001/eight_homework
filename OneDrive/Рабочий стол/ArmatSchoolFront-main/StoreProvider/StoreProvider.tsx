"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/redux/store";
import {
  setLocale,
  type LocaleCode,
} from "@/redux/slices/languageSlice/languageSlice";

export default function StoreProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: LocaleCode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setLocale(initialLocale));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}