import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ForumPathwayCardProps {
  id: string;
  quote: { en: string; ge: string };
  title: { en: string; ge: string };
  lead: { en: string; ge: string };
  eligibility: { en: string[]; ge: string[] };
  variant?: 'light' | 'dark';
  className?: string;
}

export function ForumPathwayCard({
  id,
  quote,
  title,
  lead,
  eligibility,
  variant = 'dark',
  className
}: ForumPathwayCardProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = variant === 'dark';

  return (
    <div className={cn("space-y-4", className)}>
      {/* Title with pathway label */}
      <h4 className={cn(
        "font-sans text-xs uppercase tracking-[0.2em]",
        isDark ? "text-white/50" : "text-navy/40"
      )}>
        {title[language]}
      </h4>
      
      {/* Quote - italic, prominent */}
      <p className={cn(
        "font-serif italic text-lg",
        isDark ? "text-white/90" : "text-navy/80"
      )}>
        "{quote[language]}"
      </p>
      
      {/* Lead description */}
      <p className={cn(
        "font-serif text-base leading-relaxed max-w-[50ch]",
        isDark ? "text-white/60" : "text-navy/70"
      )}>
        {lead[language]}
      </p>
      
      {/* Expandable eligibility section */}
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "inline-flex items-center gap-2 text-sm transition-colors duration-200",
            isDark 
              ? "text-white/50 hover:text-white/80" 
              : "text-navy/50 hover:text-navy/80"
          )}
        >
          <span 
            className="inline-block transition-transform duration-200" 
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}
          >
            →
          </span>
          <span>{language === 'ge' ? 'ვინ არის უფლებამოსილი' : 'Who is eligible'}</span>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <ul className={cn(
                "pt-4 space-y-2 pl-4 border-l",
                isDark ? "border-white/10" : "border-navy/10"
              )}>
                {eligibility[language].map((item, index) => (
                  <li 
                    key={index} 
                    className={cn(
                      "font-serif text-sm leading-relaxed",
                      isDark ? "text-white/50" : "text-navy/60"
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ForumPathwayCard;
