/**
 * IntakeStep - Step wrapper for intake forms
 * 
 * Deliberately slow transitions. No decorative elements.
 * Each step is a complete moment.
 */

import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface IntakeStepProps {
  children: React.ReactNode;
  stepKey: string | number;
  title: string;
  titleGe: string;
  subtitle?: string;
  subtitleGe?: string;
  className?: string;
}

// Deliberate, considered timing - signals "we have time for you"
const stepTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // Apple "emphasized" curve
};

export function IntakeStep({
  children,
  stepKey,
  title,
  titleGe,
  subtitle,
  subtitleGe,
  className,
}: IntakeStepProps) {
  const { isGeorgian } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={stepTransition}
        className={cn("", className)}
      >
        {/* Step Header - generous top spacing */}
        <div className="pt-8 md:pt-16 mb-12">
          <h2 className={cn(
            "font-serif text-[2rem] md:text-[2.5rem] text-navy leading-[1.1] tracking-[-0.02em]",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? titleGe : title}
          </h2>
          {(subtitle || subtitleGe) && (
            <p className={cn(
              "mt-3 text-lg text-navy/50 leading-relaxed",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? subtitleGe : subtitle}
            </p>
          )}
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default IntakeStep;
