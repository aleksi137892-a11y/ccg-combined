import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { captionFade, viewportConfig } from '@/lib/exhibitionAnimations';

interface ExhibitionCaptionProps {
  children: React.ReactNode;
  /** Position variant */
  position?: 'left' | 'right' | 'below';
  /** Show separator line */
  separator?: boolean;
  /** Additional classes */
  className?: string;
}

const ExhibitionCaption: React.FC<ExhibitionCaptionProps> = ({
  children,
  position = 'left',
  separator = true,
  className
}) => {
  const positionClasses = {
    left: 'text-left',
    right: 'text-right ml-auto',
    below: 'text-left mt-4'
  };

  return (
    <motion.div
      initial={captionFade.initial}
      whileInView={captionFade.animate}
      viewport={viewportConfig}
      transition={captionFade.transition}
      className={cn(
        'text-exhibition-caption max-w-xs',
        positionClasses[position],
        className
      )}
    >
      {separator && (
        <span 
          className={cn(
            "block w-10 h-px bg-navy/20 mb-3",
            position === 'right' && 'ml-auto'
          )} 
          aria-hidden="true" 
        />
      )}
      {children}
    </motion.div>
  );
};

export default ExhibitionCaption;
