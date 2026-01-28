import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { settleIn, viewportOnce } from '@/lib/animations';

interface FormalDeclarationProps {
  children: React.ReactNode;
  sectionNumber?: string;
  className?: string;
  animate?: boolean;
}

/**
 * FormalDeclaration - For formal legal/institutional statements
 * Provides visual weight and gravitas to important passages
 */
export const FormalDeclaration: React.FC<FormalDeclarationProps> = ({
  children,
  sectionNumber,
  className,
  animate = true,
}) => {
  const { isGeorgian } = useLanguage();
  
  const content = (
    <div
      className={cn(
        'relative pl-6 border-l-2 border-navy/15 py-1',
        className
      )}
    >
      {sectionNumber && (
        <span className="absolute -left-3 top-0 font-mono text-[10px] text-navy/25 bg-white px-1">
          {sectionNumber}
        </span>
      )}
      <div
        className={cn(
          'text-declaration',
          isGeorgian && 'font-georgian'
        )}
      >
        {children}
      </div>
    </div>
  );
  
  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={settleIn}
      >
        {content}
      </motion.div>
    );
  }
  
  return content;
};

export default FormalDeclaration;
