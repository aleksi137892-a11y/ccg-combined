import React from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface PhotoPlaceholderProps {
  label?: string;
  aspectRatio?: '4/3' | '16/9' | '1/1' | '3/4' | '2/1';
  variant?: 'light' | 'dark';
  className?: string;
}

export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  label,
  aspectRatio = '16/9',
  variant = 'light',
  className,
}) => {
  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '2/1': 'aspect-[2/1]',
  };

  const variantClasses = {
    light: 'border-navy/10 bg-navy/[0.02] text-navy/20',
    dark: 'border-white/10 bg-white/[0.02] text-white/20',
  };

  return (
    <div
      className={cn(
        'border border-dashed flex flex-col items-center justify-center gap-3',
        aspectClasses[aspectRatio],
        variantClasses[variant],
        className
      )}
    >
      <ImageIcon className="w-8 h-8" strokeWidth={1} />
      {label && (
        <span className="font-mono text-xs uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

export default PhotoPlaceholder;
