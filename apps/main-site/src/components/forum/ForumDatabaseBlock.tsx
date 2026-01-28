import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Subcollection {
  label: { en: string; ge: string };
  description?: { en: string; ge: string };
}

interface ForumDatabaseBlockProps {
  id: string;
  title: { en: string; ge: string };
  lead: { en: string; ge: string };
  secondary?: { en: string; ge: string };
  subcollections?: Subcollection[];
  variant?: 'light' | 'dark';
  className?: string;
}

export function ForumDatabaseBlock({
  id,
  title,
  lead,
  secondary,
  subcollections,
  variant = 'dark',
  className
}: ForumDatabaseBlockProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = variant === 'dark';

  return (
    <div className={cn("space-y-4", className)}>
      {/* Title */}
      <h4 className={cn(
        "font-sans text-sm uppercase tracking-[0.15em]",
        isDark ? "text-white" : "text-navy"
      )}>
        {title[language]}
      </h4>
      
      {/* Lead description */}
      <p className={cn(
        "font-serif text-base leading-relaxed max-w-[55ch]",
        isDark ? "text-white/70" : "text-navy/70"
      )}>
        {lead[language]}
      </p>
      
      {/* Secondary text - indented */}
      {secondary && (
        <p className={cn(
          "font-serif text-sm pl-4 leading-relaxed border-l",
          isDark 
            ? "text-white/50 border-white/10" 
            : "text-navy/55 border-navy/10"
        )}>
          {secondary[language]}
        </p>
      )}
      
      {/* Expandable subcollections */}
      {subcollections && subcollections.length > 0 && (
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
            <span>{language === 'ge' ? 'სტრუქტურა' : 'Structure'}</span>
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
                  "pt-4 space-y-3 pl-4 border-l",
                  isDark ? "border-white/10" : "border-navy/10"
                )}>
                  {subcollections.map((sub, index) => (
                    <li key={index} className="space-y-1">
                      <span className={cn(
                        "font-sans text-xs uppercase tracking-wider",
                        isDark ? "text-white/60" : "text-navy/60"
                      )}>
                        {sub.label[language]}
                      </span>
                      {sub.description && (
                        <p className={cn(
                          "font-serif text-sm leading-relaxed",
                          isDark ? "text-white/50" : "text-navy/50"
                        )}>
                          {sub.description[language]}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default ForumDatabaseBlock;
