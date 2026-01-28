import React from 'react';
import { motion, Variants } from 'motion/react';
import { fadeInUp, settleIn, viewportOnce } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeInUp' | 'settleIn';
  delay?: number;
  id?: string;
}

const variants: Record<string, Variants> = {
  fadeInUp,
  settleIn,
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  variant = 'fadeInUp',
  delay = 0,
  id,
}) => {
  const selectedVariant = variants[variant];
  
  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: selectedVariant.hidden,
        visible: {
          ...selectedVariant.visible,
          transition: {
            ...((selectedVariant.visible as { transition?: object })?.transition ?? {}),
            delay,
          }
        }
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
