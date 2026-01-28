import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PullQuoteProps {
  /** English quote text */
  quote: string;
  /** Georgian quote text */
  quoteGe: string;
  /** English attribution (optional) */
  attribution?: string;
  /** Georgian attribution (optional) */
  attributionGe?: string;
  /** Visual variant */
  variant?: 'default' | 'large' | 'sidebar';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Pull Quote Component
 * 
 * For presenting key statements with appropriate institutional weight.
 * Bilingual support is mandatory - both quote and quoteGe are required.
 * 
 * Variants:
 * - default: Left border accent, inline with content
 * - large: Full-width with background, for major declarations
 * - sidebar: Float right, for document-style layout
 */
export function PullQuote({ 
  quote, 
  quoteGe, 
  attribution, 
  attributionGe, 
  variant = 'default',
  className 
}: PullQuoteProps) {
  const { isGeorgian } = useLanguage();
  const displayQuote = isGeorgian ? quoteGe : quote;
  const displayAttribution = isGeorgian ? attributionGe : attribution;

  return (
    <blockquote 
      className={cn(
        "relative",
        // Variant-specific styling
        variant === 'default' && "my-8 pl-6 border-l-2 border-navy",
        variant === 'large' && "my-12 px-8 py-6 bg-navy/[0.02] border-t border-b border-navy/10",
        variant === 'sidebar' && "float-right w-1/3 ml-8 mb-4 pl-4 border-l-2 border-navy/30 hidden md:block",
        className
      )}
    >
      {/* Opening quote mark for large variant */}
      {variant === 'large' && (
        <span 
          className="absolute -top-4 left-4 text-6xl text-navy/10 font-serif leading-none select-none"
          aria-hidden="true"
        >
          "
        </span>
      )}
      
      <p 
        className={cn(
          "font-serif italic text-navy",
          variant === 'large' && "text-xl md:text-2xl leading-relaxed",
          variant === 'default' && "text-lg leading-relaxed",
          variant === 'sidebar' && "text-sm leading-relaxed",
          isGeorgian && "font-georgian"
        )}
      >
        {displayQuote}
      </p>
      
      {displayAttribution && (
        <cite 
          className={cn(
            "block mt-3 font-ui text-sm text-navy/60 not-italic",
            isGeorgian && "font-georgian"
          )}
        >
          {/* Use em dash, not hyphen, per Editorial Director */}
          — {displayAttribution}
        </cite>
      )}
    </blockquote>
  );
}

export default PullQuote;
