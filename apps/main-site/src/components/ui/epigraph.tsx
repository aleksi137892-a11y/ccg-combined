import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeInUp, viewportOnce } from '@/lib/animations';

interface EpigraphProps {
  text: string;
  textGe?: string;
  className?: string;
  animate?: boolean;
}

/**
 * Epigraph - For opening statements and foundational declarations
 * Used at the top of charter, about, and other institutional pages
 */
export const Epigraph: React.FC<EpigraphProps> = ({
  text,
  textGe,
  className,
  animate = true,
}) => {
  const { isGeorgian } = useLanguage();
  
  const displayText = isGeorgian && textGe ? textGe : text;
  
  const content = (
    <p
      className={cn(
        'text-epigraph max-w-3xl',
        isGeorgian && 'font-georgian',
        className
      )}
    >
      "{displayText}"
    </p>
  );
  
  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeInUp}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
};

export default Epigraph;
