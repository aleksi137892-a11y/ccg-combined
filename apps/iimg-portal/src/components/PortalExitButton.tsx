import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocalizedLink } from "@/components/LocalizedLink";

export const PortalExitButton = () => {
  const { language } = useLanguage();

  const getExitText = () => {
    switch (language) {
      case "ka": return "გასვლა";
      case "ru": return "Выход";
      case "az": return "Çıxış";
      default: return "Exit";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed top-4 right-4 z-50"
    >
      <LocalizedLink
        to="/"
        className="flex items-center gap-2 px-4 py-2 bg-background border-2 border-foreground text-foreground font-semibold text-sm rounded-sm shadow-lg hover:bg-foreground hover:text-background transition-all duration-200 touch-manipulation"
      >
        <X className="h-4 w-4" />
        <span className="hidden sm:inline">{getExitText()}</span>
      </LocalizedLink>
    </motion.div>
  );
};