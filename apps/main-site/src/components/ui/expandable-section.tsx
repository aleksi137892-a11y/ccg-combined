import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ExpandableSectionProps {
  summary: string;
  summaryGe?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  summary,
  summaryGe,
  children,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isGeorgian } = useLanguage();

  const displaySummary = isGeorgian && summaryGe ? summaryGe : summary;

  return (
    <div className={cn('', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center gap-1 text-navy/60 hover:text-navy transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-sm',
          isGeorgian && 'font-georgian'
        )}
      >
        <span>{displaySummary}</span>
        <span 
          className="inline-flex items-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" 
          style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}
        >
          →
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableSection;
