import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { sectionTransition, viewportConfig } from '@/lib/exhibitionAnimations';

interface ExhibitionSectionProps {
  children: React.ReactNode;
  /** Layout positioning - asymmetric compositions feel hand-placed */
  layout?: 'centered' | 'offset-left' | 'offset-right' | 'full-width';
  /** Vertical breathing room - vast for room transitions, intimate for connected content */
  spacing?: 'vast' | 'generous' | 'intimate' | 'none';
  /** Background treatment */
  background?: 'white' | 'parchment' | 'navy';
  /** Rhythm hint for editorial pacing */
  rhythm?: 'pause' | 'flow' | 'anchor';
  /** Optional section ID for navigation */
  id?: string;
  /** Additional classes */
  className?: string;
  /** Disable scroll animation */
  noAnimation?: boolean;
}

const ExhibitionSection: React.FC<ExhibitionSectionProps> = ({
  children,
  layout = 'centered',
  spacing = 'generous',
  background = 'white',
  rhythm,
  id,
  className,
  noAnimation = false
}) => {
  // Spacing classes - exhibition-grade vertical rhythm
  const spacingClasses = {
    vast: 'py-32 md:py-48 lg:py-64', // Exhibition room transitions
    generous: 'py-20 md:py-32 lg:py-40', // Standard section breathing
    intimate: 'py-12 md:py-16 lg:py-20', // Connected content
    none: 'py-0'
  };

  // Background classes
  const backgroundClasses = {
    white: 'bg-white',
    parchment: 'bg-parchment',
    navy: 'bg-navy text-parchment'
  };

  // Layout/offset classes - asymmetric positioning
  const layoutClasses = {
    centered: 'mx-auto max-w-4xl px-6 md:px-8',
    'offset-left': 'ml-[8%] mr-[4%] md:ml-[12%] md:mr-[8%] max-w-4xl',
    'offset-right': 'ml-[4%] mr-[8%] md:ml-[8%] md:mr-[12%] max-w-4xl',
    'full-width': 'w-full'
  };

  // Rhythm-based additional spacing
  const rhythmClasses = {
    pause: 'relative before:content-[""] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-16 before:bg-navy/10',
    flow: '',
    anchor: ''
  };

  const content = (
    <div className={cn(layoutClasses[layout])}>
      {children}
    </div>
  );

  const sectionElement = (
    <section
      id={id}
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        rhythm && rhythmClasses[rhythm],
        className
      )}
    >
      {noAnimation ? (
        content
      ) : (
        <motion.div
          initial={sectionTransition.initial}
          whileInView={sectionTransition.whileInView}
          viewport={viewportConfig}
          transition={sectionTransition.transition}
        >
          {content}
        </motion.div>
      )}
    </section>
  );

  return sectionElement;
};

export default ExhibitionSection;
