import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  translate,
} from "../i18n/translate";

const LanguageContext = createContext(undefined);
const STORAGE_KEY = "portfolio-language";

function getInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // Never trust stored values blindly: only accept whitelisted languages.
    if (isSupportedLanguage(stored)) return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
  }

  const browserLanguage = window.navigator?.language?.slice(0, 2).toLowerCase();
  return isSupportedLanguage(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children, initialLanguage }) {
  const [language, setLanguageState] = useState(() =>
    isSupportedLanguage(initialLanguage) ? initialLanguage : getInitialLanguage()
  );

  const t = useCallback((key, values) => translate(language, key, values), [language]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.title = t("meta.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("meta.description"));

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      return;
    }
  }, [language, t]);

  const setLanguage = useCallback((next) => {
    if (isSupportedLanguage(next)) setLanguageState(next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === "es" ? "en" : "es"));
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
