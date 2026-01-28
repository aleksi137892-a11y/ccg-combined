import { ExternalLink, MessageSquare, Mail } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";

interface FallbackOptionsProps {
  language?: string;
  className?: string;
  onTresoritClick?: () => void;
}

export const FallbackOptions = ({ language = "en", className = "", onTresoritClick }: FallbackOptionsProps) => {
  const altOptionTitle = language === "ka" 
    ? "ალტერნატიული გზები" 
    : "Alternative options";
  
  const handleTresoritClick = () => {
    if (onTresoritClick) {
      onTresoritClick();
    } else {
      window.open(CONTACTS.tresorit.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={`pt-4 border-t border-border/30 ${className}`}>
      <p className="text-xs text-muted-foreground mb-3">{altOptionTitle}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleTresoritClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Tresorit
        </button>
        <a
          href={CONTACTS.signal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
        >
          <MessageSquare className="w-3 h-3" />
          Signal
        </a>
        <a
          href={CONTACTS.protonmail.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
        >
          <Mail className="w-3 h-3" />
          ProtonMail
        </a>
        <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground">
          Threema: {CONTACTS.threema.display}
        </span>
      </div>
    </div>
  );
};

export default FallbackOptions;