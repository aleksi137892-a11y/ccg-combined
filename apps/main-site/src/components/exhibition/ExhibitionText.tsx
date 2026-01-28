import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { textReveal, viewportConfig } from '@/lib/exhibitionAnimations';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExhibitionTextProps {
  children: React.ReactNode;
  /** Georgian translation */
  childrenGe?: React.ReactNode;
  /** Text variant */
  variant?: 'body' | 'lead' | 'caption' | 'wall-text';
  /** Maximum width constraint */
  maxWidth?: 'prose' | 'narrow' | 'wide' | 'none';
  /** Layout positioning */
  layout?: 'left' | 'offset-left' | 'offset-right' | 'centered';
  /** Additional classes */
  className?: string;
  /** Disable animation */
  noAnimation?: boolean;
}

const ExhibitionText: React.FC<ExhibitionTextProps> = ({
  children,
  childrenGe,
  variant = 'body',
  maxWidth = 'prose',
  layout = 'left',
  className,
  noAnimation = false
}) => {
  const { isGeorgian } = useLanguage();
  
  const displayContent = isGeorgian && childrenGe ? childrenGe : children;

  // Variant classes
  const variantClasses = {
    body: 'text-exhibition-body',
    lead: 'text-exhibition-lead',
    caption: 'text-exhibition-caption',
    'wall-text': 'text-exhibition-wall-text'
  };

  // Max width classes - controlling line length
  const maxWidthClasses = {
    prose: 'max-w-[44ch]',
    narrow: 'max-w-[36ch]',
    wide: 'max-w-2xl',
    none: ''
  };

  // Layout classes
  const layoutClasses = {
    left: '',
    'offset-left': 'ml-[8%] md:ml-[12%]',
    'offset-right': 'ml-auto mr-[8%] md:mr-[12%]',
    centered: 'mx-auto text-center'
  };

  const content = (
    <div
      className={cn(
        variantClasses[variant],
        maxWidthClasses[maxWidth],
        layoutClasses[layout],
        isGeorgian && 'font-georgian',
        className
      )}
    >
      {displayContent}
    </div>
  );

  if (noAnimation) {
    return content;
  }

  return (
    <motion.div
      initial={textReveal.initial}
      whileInView={textReveal.animate}
      viewport={viewportConfig}
      transition={textReveal.transition}
    >
      {content}
    </motion.div>
  );
};

export default ExhibitionText;
