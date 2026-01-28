import { useLanguage } from "@/i18n/LanguageContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hook that provides language-aware path generation for navigation.
 * All internal navigation should use this to preserve language context.
 */
export const useLocalizedNavigation = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  /**
   * Generate a localized path that includes the current language prefix.
   * All routes are prefixed with /:lang (e.g., /en/submit-evidence, /ka/security-guide)
   * 
   * @param path - The base path (e.g., "/submit-evidence", "/security-guide", "/")
   * @returns The path with language prefix
   */
  const getLocalizedPath = useCallback((path: string): string => {
    // Clean the path - remove any existing language prefix
    let cleanPath = path;
    const langPrefixMatch = path.match(/^\/(en|ka|ru|az)(\/|$)/);
    if (langPrefixMatch) {
      cleanPath = path.slice(langPrefixMatch[0].length - 1) || "/";
    }
    
    // Homepage
    if (cleanPath === "/" || cleanPath === "") {
      return `/${language}`;
    }
    
    // Ensure path starts with /
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }
    
    return `/${language}${cleanPath}`;
  }, [language]);

  /**
   * Get the localized homepage path for the current language
   */
  const getHomePath = useCallback((): string => {
    return `/${language}`;
  }, [language]);

  /**
   * Navigate to a localized path
   */
  const navigateLocalized = useCallback((path: string) => {
    navigate(getLocalizedPath(path));
  }, [navigate, getLocalizedPath]);

  return { getLocalizedPath, getHomePath, navigateLocalized, language };
};
