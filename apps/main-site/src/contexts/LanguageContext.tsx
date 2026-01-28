import React, { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'en' | 'ge';

interface LanguageContextType {
  language: Language;
  isGeorgian: boolean;
  getLocalizedPath: (path: string) => string;
  getAlternateLanguagePath: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Detect language from URL path
  const isGeorgianPath = location.pathname.startsWith('/ge');
  const language: Language = isGeorgianPath ? 'ge' : 'en';
  const isGeorgian = language === 'ge';

  // Get localized path for a given English path
  const getLocalizedPath = (path: string): string => {
    if (isGeorgian) {
      return `/ge${path}`;
    }
    return path;
  };

  // Get the alternate language version of the current path
  const getAlternateLanguagePath = (): string => {
    if (isGeorgian) {
      // Remove /ge prefix
      return location.pathname.replace(/^\/ge/, '') || '/';
    }
    // Add /ge prefix
    return `/ge${location.pathname}`;
  };

  return (
    <LanguageContext.Provider value={{ language, isGeorgian, getLocalizedPath, getAlternateLanguagePath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
