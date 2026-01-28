import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { translations, Language, TranslationKeys } from "./translations";

const STORAGE_KEY = "iimg_language";
const LANGUAGE_SELECTED_KEY = "iimg_language_selected";

const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "ka";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && ["en", "ka", "ru", "az"].includes(stored)) {
    return stored as Language;
  }
  return "ka";
};

const hasSelectedLanguage = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LANGUAGE_SELECTED_KEY) === "true";
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  languageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
LanguageContext.displayName = "LanguageContext";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);
  const [languageSelected, setLanguageSelected] = useState<boolean>(hasSelectedLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    localStorage.setItem(LANGUAGE_SELECTED_KEY, "true");
    setLanguageSelected(true);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language] as TranslationKeys,
    languageSelected,
  }), [language, languageSelected]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
