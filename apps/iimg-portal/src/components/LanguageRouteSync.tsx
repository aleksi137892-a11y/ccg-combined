import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";

const VALID_LANGUAGES = ["en", "ka", "ru", "az"];

/**
 * Component that syncs the URL language parameter with the LanguageContext.
 * Place this inside Router but wrap around route content.
 */
export const LanguageRouteSync = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we have a valid language in URL, sync it to context
    if (lang && VALID_LANGUAGES.includes(lang)) {
      if (lang !== language) {
        setLanguage(lang as Language);
      }
    }
  }, [lang, language, setLanguage]);

  // Redirect root to default language
  useEffect(() => {
    if (location.pathname === "/") {
      navigate(`/${language}`, { replace: true });
    }
  }, [location.pathname, language, navigate]);

  return <>{children}</>;
};
