import React from 'react';
import { motion } from 'motion/react';
import { exhibitionReveal, viewportConfig } from '@/lib/exhibitionAnimations';
import { cn } from '@/lib/utils';

interface ExhibitionRoomProps {
  /** Layout variant defining the spatial character */
  variant: 'monument' | 'artifact' | 'takeover' | 'breath';
  /** Background color theme */
  background?: 'white' | 'navy' | 'parchment' | 'black';
  /** Optional custom className */
  className?: string;
  /** Content */
  children: React.ReactNode;
  /** Disable animation */
  noAnimation?: boolean;
}

/**
 * ExhibitionRoom - A wrapper that enforces exhibition-grade spacing and rhythm
 * 
 * Variants:
 * - monument: Full-height typographic display (min-h-[80vh])
 * - artifact: Reverent presentation with vast margins
 * - takeover: Full-bleed cinematic (min-h-screen)
 * - breath: Intentional pause with minimal content
 */
const ExhibitionRoom: React.FC<ExhibitionRoomProps> = ({
  variant,
  background = 'white',
  className,
  children,
  noAnimation = false,
}) => {
  const bgClasses = {
    white: 'bg-white',
    navy: 'bg-navy',
    parchment: 'bg-parchment',
    black: 'bg-black',
  };

  const variantClasses = {
    monument: 'min-h-[80vh] flex items-center py-32 md:py-40 lg:py-48',
    artifact: 'py-32 md:py-48 lg:py-64',
    takeover: 'min-h-screen relative',
    breath: 'py-20 md:py-28 lg:py-36',
  };

  const content = (
    <section
      className={cn(
        bgClasses[background],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </section>
  );

  if (noAnimation) {
    return content;
  }

  return (
    <motion.div
      initial={exhibitionReveal.initial}
      whileInView={exhibitionReveal.animate}
      viewport={viewportConfig}
      transition={exhibitionReveal.transition}
    >
      {content}
    </motion.div>
  );
};

export default ExhibitionRoom;

/**
 * VisualBreath - A thin vertical rule used between exhibition rooms
 */
export const VisualBreath: React.FC<{ 
  type?: 'rule' | 'space';
  background?: 'white' | 'navy' | 'parchment';
}> = ({ type = 'rule', background = 'white' }) => {
  const bgClass = {
    white: 'bg-white',
    navy: 'bg-navy',
    parchment: 'bg-parchment',
  }[background];

  const ruleColor = background === 'navy' ? 'bg-parchment/10' : 'bg-navy/10';

  if (type === 'space') {
    return <div className={cn('py-16 md:py-24 lg:py-32', bgClass)} />;
  }

  return (
    <div className={cn('py-16 md:py-24 lg:py-32', bgClass)}>
      <motion.div 
        className={cn('w-px h-20 md:h-28 lg:h-36 mx-auto', ruleColor)}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};
