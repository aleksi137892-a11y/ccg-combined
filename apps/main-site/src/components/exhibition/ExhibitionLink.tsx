import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExhibitionLinkProps {
  to: string;
  children: React.ReactNode;
  /** Georgian translation */
  childrenGe?: React.ReactNode;
  /** Visual variant */
  variant?: 'inline' | 'standalone' | 'quiet';
  /** External link */
  external?: boolean;
  /** Additional classes */
  className?: string;
}

const ExhibitionLink: React.FC<ExhibitionLinkProps> = ({
  to,
  children,
  childrenGe,
  variant = 'inline',
  external = false,
  className
}) => {
  const { isGeorgian } = useLanguage();
  
  const displayText = isGeorgian && childrenGe ? childrenGe : children;

  // Variant styles - no arrows, just underline behavior
  const variantClasses = {
    inline: 'exhibition-link-inline',
    standalone: 'exhibition-link-standalone',
    quiet: 'exhibition-link-quiet'
  };

  const linkContent = (
    <span className={cn(variantClasses[variant], isGeorgian && 'font-georgian')}>
      {displayText}
    </span>
  );

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('transition-opacity duration-500', className)}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={cn('transition-opacity duration-500', className)}
    >
      {linkContent}
    </Link>
  );
};

export default ExhibitionLink;
