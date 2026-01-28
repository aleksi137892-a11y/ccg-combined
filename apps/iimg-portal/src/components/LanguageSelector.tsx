import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";

const languages: { code: Language; name: string; native: string }[] = [
  { code: "en", name: "English", native: "English" },
  { code: "ka", name: "Georgian", native: "Georgian" },
  { code: "ru", name: "Russian", native: "Russian" },
  { code: "az", name: "Azerbaijani", native: "Azerbaijani" },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
        <Globe className="h-4 w-4" />
        <span>{currentLang.native}</span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="cursor-pointer font-body"
          >
            <span className="mr-2">{lang.native}</span>
            <span className="text-muted-foreground text-xs">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
