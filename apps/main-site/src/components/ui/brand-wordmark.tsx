import React from 'react';
import { cn } from '@/lib/utils';

interface BrandWordmarkProps {
  variant?: 'navy' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Branded "CIVIC COUNCIL OF GEORGIA" wordmark component
 * Uses Domaine Display font with proper styling:
 * - Navy on white/parchment backgrounds
 * - Cream (with sepia filter like logo) on navy backgrounds
 */
export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  variant = 'navy',
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'text-brand-wordmark-sm',
    md: 'text-brand-wordmark',
    lg: 'text-brand-wordmark-lg'
  };

  const variantClasses = {
    navy: 'text-brand-navy',
    cream: 'text-brand-cream'
  };

  return (
    <span 
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      CIVIC COUNCIL OF GEORGIA
    </span>
  );
};

export default BrandWordmark;
