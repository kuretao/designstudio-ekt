"use client";

import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { resources, type SiteLocale } from "./resources";

const storageKey = "site-locale";

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
  });
}

export default function SiteI18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(storageKey) as SiteLocale | null;
    const locale = savedLocale === "en" ? "en" : "ru";

    i18next.changeLanguage(locale).finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const syncLang = (locale: string) => {
      document.documentElement.lang = locale;
      window.localStorage.setItem(storageKey, locale);
    };

    syncLang(i18next.language);
    i18next.on("languageChanged", syncLang);

    return () => {
      i18next.off("languageChanged", syncLang);
    };
  }, []);

  const value = useMemo(() => i18next, []);

  if (!ready) return <I18nextProvider i18n={value}>{children}</I18nextProvider>;

  return <I18nextProvider i18n={value}>{children}</I18nextProvider>;
}
