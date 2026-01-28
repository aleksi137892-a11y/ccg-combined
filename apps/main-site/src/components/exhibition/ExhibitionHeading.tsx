import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { textReveal, heroEntrance, viewportConfig } from '@/lib/exhibitionAnimations';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExhibitionHeadingProps {
  children: React.ReactNode;
  /** Georgian translation */
  childrenGe?: React.ReactNode;
  /** Heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  /** Size variant */
  size?: 'display' | 'heading' | 'subheading' | 'section';
  /** Layout positioning */
  layout?: 'centered' | 'left' | 'offset-left';
  /** Optional eyebrow text */
  eyebrow?: string;
  eyebrowGe?: string;
  /** Additional classes */
  className?: string;
}

const ExhibitionHeading: React.FC<ExhibitionHeadingProps> = ({
  children,
  childrenGe,
  as: Tag = 'h2',
  size = 'heading',
  layout = 'left',
  eyebrow,
  eyebrowGe,
  className
}) => {
  const { isGeorgian } = useLanguage();
  
  const displayText = isGeorgian && childrenGe ? childrenGe : children;
  const displayEyebrow = isGeorgian && eyebrowGe ? eyebrowGe : eyebrow;

  // Size classes
  const sizeClasses = {
    display: 'text-exhibition-display',
    heading: 'text-exhibition-heading',
    subheading: 'text-exhibition-subheading',
    section: 'text-exhibition-section'
  };

  // Layout classes
  const layoutClasses = {
    centered: 'text-center mx-auto',
    left: 'text-left',
    'offset-left': 'text-left ml-[8%] md:ml-[12%]'
  };

  // Use hero entrance for display size, text reveal for others
  const animation = size === 'display' ? heroEntrance : textReveal;

  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.animate}
      viewport={viewportConfig}
      transition={animation.transition}
      className={cn(layoutClasses[layout], 'max-w-4xl', className)}
    >
      {displayEyebrow && (
        <span className="text-exhibition-eyebrow block mb-4 md:mb-6">
          {displayEyebrow}
        </span>
      )}
      <Tag 
        className={cn(
          sizeClasses[size],
          'text-navy',
          isGeorgian && 'font-georgian'
        )}
      >
        {displayText}
      </Tag>
    </motion.div>
  );
};

export default ExhibitionHeading;
