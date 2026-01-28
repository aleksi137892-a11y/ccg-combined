import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExpandableSearchProps {
  position: 'header' | 'footer';
}

export const ExpandableSearch: React.FC<ExpandableSearchProps> = ({ position }) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (document.activeElement !== inputRef.current) {
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    // Small delay to allow click events to fire
    setTimeout(() => {
      if (!containerRef.current?.matches(':hover')) {
        setIsExpanded(false);
      }
    }, 100);
  };

  const openCommandPalette = () => {
    // Dispatch custom event with the current input value
    window.dispatchEvent(new CustomEvent('openCommandPalette', { 
      detail: { query: inputValue } 
    }));
    setInputValue('');
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      openCommandPalette();
    }
    if (e.key === 'Escape') {
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const isHeader = position === 'header';
  const isFooter = position === 'footer';

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex items-center gap-2 transition-all duration-300 ease-out",
        isHeader && "flex-row",
        isFooter && "flex-row-reverse"
      )}
    >
      {/* Search text/icon trigger */}
      <button
        onClick={openCommandPalette}
        className={cn(
          "flex items-center gap-1.5 transition-colors whitespace-nowrap group/search",
          isHeader && "text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground",
          isFooter && "text-sm text-white/50 hover:text-white group",
          language === 'ge' && 'font-georgian'
        )}
        aria-label={language === 'en' ? 'Open search' : 'ძებნის გახსნა'}
      >
        {isHeader && <Search className="h-3.5 w-3.5 animate-subtle-pulse" />}
        <span className={cn(
          isFooter && "relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-white/50 after:origin-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left"
        )}>
          {language === 'en' ? 'search' : 'ძებნა'}
        </span>
      </button>

      {/* Expandable input */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "w-56 opacity-100" : "w-0 opacity-0"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={language === 'en' ? 'Type to search...' : 'ძიება...'}
          className={cn(
            "w-full px-3 py-1.5 text-sm rounded-md border transition-colors outline-none",
            isHeader && "bg-background/80 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background",
            isFooter && "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15",
            language === 'ge' && 'font-georgian'
          )}
        />
      </div>
    </div>
  );
};
