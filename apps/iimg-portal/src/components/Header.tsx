import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";

const languageOptions = [
  { code: "ka", label: "ქართულად" },
  { code: "ru", label: "По-русски" },
  { code: "az", label: "Azərbaycanca" },
  { code: "en", label: "In English" },
];

export const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { getHomePath } = useLocalizedNavigation();

  const handleLanguageClick = (langCode: string) => {
    setLanguage(langCode as "en" | "ka" | "ru" | "az");
  };

  return (
    <header className="w-full border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link to={getHomePath()} className="text-xs sm:text-sm font-semibold text-foreground tracking-[0.15em] uppercase">
            IIMG
          </Link>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
          {languageOptions.map((lang) => (
            <Link
              key={lang.code}
              to={`/${lang.code}`}
              onClick={() => handleLanguageClick(lang.code)}
              className={`text-xs sm:text-sm font-body transition-colors ${
                language === lang.code
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
