import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PullQuoteProps {
  quote: string;
  quoteGe?: string;
  attribution?: string;
  attributionGe?: string;
  className?: string;
  variant?: 'default' | 'large' | 'bordered';
}

export const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  quoteGe,
  attribution,
  attributionGe,
  className,
  variant = 'default',
}) => {
  const { isGeorgian } = useLanguage();
  
  const displayQuote = isGeorgian && quoteGe ? quoteGe : quote;
  const displayAttribution = isGeorgian && attributionGe ? attributionGe : attribution;
  
  return (
    <blockquote
      className={cn(
        'relative my-8',
        variant === 'bordered' && 'border-l-2 border-navy/20 pl-6 py-2',
        variant === 'large' && 'my-12',
        className
      )}
    >
      <p
        className={cn(
          'font-display italic text-navy',
          variant === 'default' && 'text-xl md:text-2xl leading-relaxed',
          variant === 'large' && 'text-2xl md:text-3xl leading-relaxed',
          variant === 'bordered' && 'text-lg md:text-xl leading-relaxed',
          isGeorgian && 'font-georgian'
        )}
      >
        {variant !== 'bordered' && (
          <span className="text-navy/30 mr-1">"</span>
        )}
        {displayQuote}
        {variant !== 'bordered' && (
          <span className="text-navy/30 ml-1">"</span>
        )}
      </p>
      {displayAttribution && (
        <cite
          className={cn(
            'block mt-4 font-body text-sm text-navy/50 not-italic',
            isGeorgian && 'font-georgian'
          )}
        >
          — {displayAttribution}
        </cite>
      )}
    </blockquote>
  );
};

export default PullQuote;
