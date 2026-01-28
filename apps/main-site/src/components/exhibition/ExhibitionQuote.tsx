import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { textReveal, viewportConfig } from '@/lib/exhibitionAnimations';

interface ExhibitionQuoteProps {
  children: React.ReactNode;
  /** Attribution/source */
  attribution?: string;
  /** Position offset */
  position?: 'centered' | 'offset-left' | 'offset-right';
  /** Size variant */
  size?: 'large' | 'medium' | 'small';
  /** Additional classes */
  className?: string;
}

const ExhibitionQuote: React.FC<ExhibitionQuoteProps> = ({
  children,
  attribution,
  position = 'offset-left',
  size = 'medium',
  className
}) => {
  // Position classes - asymmetric by default
  const positionClasses = {
    centered: 'mx-auto text-center',
    'offset-left': 'mr-auto ml-0 md:ml-[8%] text-left',
    'offset-right': 'ml-auto mr-0 md:mr-[8%] text-right'
  };

  // Size classes
  const sizeClasses = {
    large: 'text-exhibition-quote-lg max-w-2xl',
    medium: 'text-exhibition-quote max-w-xl',
    small: 'text-exhibition-quote-sm max-w-lg'
  };

  return (
    <motion.blockquote
      initial={textReveal.initial}
      whileInView={textReveal.animate}
      viewport={viewportConfig}
      transition={textReveal.transition}
      className={cn(
        positionClasses[position],
        sizeClasses[size],
        'py-12 md:py-20',
        className
      )}
    >
      <p className="font-display italic text-navy/80 leading-relaxed">
        {children}
      </p>
      
      {attribution && (
        <footer className="mt-6 md:mt-8">
          <cite className="text-exhibition-caption not-italic block">
            <span className="inline-block w-8 h-px bg-navy/20 mr-3 align-middle" aria-hidden="true" />
            {attribution}
          </cite>
        </footer>
      )}
    </motion.blockquote>
  );
};

export default ExhibitionQuote;
