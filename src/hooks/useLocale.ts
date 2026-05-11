"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n";

const STORAGE_KEY = "medipic_locale";
const CHANGE_EVENT = "medipic-locale-change";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ja" || value === "ko";
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const locale = useSyncExternalStore<Locale>(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener(CHANGE_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(CHANGE_EVENT, onStoreChange);
      };
    },
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return isLocale(saved) ? saved : "en";
    },
    () => "en",
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(l: Locale) {
    localStorage.setItem(STORAGE_KEY, l);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return [locale, setLocale];
}
