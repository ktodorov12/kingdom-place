import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import bg, { type Dictionary } from "../locales/bg";
import en from "../locales/en";

export type Lang = "bg" | "en";

const dictionaries: Record<Lang, Dictionary> = { bg, en };

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLanguage: (lang: Lang) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "bg" || stored === "en") return stored;
  } catch {
    /* SSR / blocked storage — fall through */
  }
  return "bg";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLanguage = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("lang", newLang);
    } catch {
      /* storage full or blocked */
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === "bg" ? "en" : "bg");
  }, [lang, setLanguage]);

  return (
    <LanguageContext.Provider
      value={{ lang, t: dictionaries[lang], setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
