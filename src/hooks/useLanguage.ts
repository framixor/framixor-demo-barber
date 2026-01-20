import { Language, translations, Translations } from "@/lib/translations";
import { useCallback, useState } from "react";

const STORAGE_KEY = "marriel-lang";

function getInitialLanguage(): Language {
  // 1. Check URL override
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");
  if (langParam === "en" || langParam === "pt") {
    localStorage.setItem(STORAGE_KEY, langParam);
    return langParam;
  }

  // 2. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "pt") {
    return stored;
  }

  // 3. Browser language detection
  const nav = navigator as Navigator & { userLanguage?: string };
  const browserLang = nav.language || nav.userLanguage || "en";
  if (browserLang.toLowerCase().startsWith("pt")) {
    return "pt";
  }

  return "en";
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  }, []);

  const t: Translations = translations[language];

  return { language, setLanguage, t };
}
