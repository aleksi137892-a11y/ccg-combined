import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ForumCommitmentBlockProps {
  id: string;
  title: { en: string; ge: string };
  content: { en: string; ge: string };
  closing?: { en: string; ge: string };
  details?: { en: string[]; ge: string[] };
  variant?: 'light' | 'dark';
  className?: string;
}

export function ForumCommitmentBlock({
  id,
  title,
  content,
  closing,
  details,
  variant = 'dark',
  className
}: ForumCommitmentBlockProps) {
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
      
      {/* Content */}
      <p className={cn(
        "font-serif text-base leading-relaxed max-w-[55ch]",
        isDark ? "text-white/70" : "text-navy/70"
      )}>
        {content[language]}
      </p>
      
      {/* Expandable details */}
      {details && details[language].length > 0 && (
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
            <span>{language === 'ge' ? 'დეტალები' : 'Details'}</span>
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
                  {details[language].map((item, index) => (
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
      )}
      
      {/* Closing declaration - emphasized */}
      {closing && (
        <p className={cn(
          "font-serif text-sm pl-4 leading-relaxed border-l italic",
          isDark 
            ? "text-white/80 border-white/20" 
            : "text-navy/80 border-navy/20"
        )}>
          {closing[language]}
        </p>
      )}
    </div>
  );
}

export default ForumCommitmentBlock;
