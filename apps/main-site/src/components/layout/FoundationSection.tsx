import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface FoundationSectionProps {
  id?: string;
  heading?: string;
  headingGe?: string;
  lead?: string;
  leadGe?: string;
  variant?: 'white' | 'navy' | 'muted';
  size?: 'hero' | 'default' | 'compact';
  className?: string;
  children?: React.ReactNode;
}

const FoundationSection: React.FC<FoundationSectionProps> = ({
  id,
  heading,
  headingGe,
  lead,
  leadGe,
  variant = 'white',
  size = 'default',
  className = '',
  children,
}) => {
  const { isGeorgian } = useLanguage();

  const displayHeading = isGeorgian && headingGe ? headingGe : heading;
  const displayLead = isGeorgian && leadGe ? leadGe : lead;

  const bgClasses = {
    white: 'bg-white',
    navy: 'bg-navy text-white',
    muted: 'bg-navy/[0.02]',
  };

  const sizeClasses = {
    hero: 'py-24 md:py-40',
    default: 'py-16 md:py-24',
    compact: 'py-12 md:py-16',
  };

  const textColorClasses = variant === 'navy' 
    ? { heading: 'text-white', lead: 'text-white/70' }
    : { heading: 'text-navy', lead: 'text-navy/60' };

  return (
    <section 
      id={id}
      className={cn(bgClasses[variant], sizeClasses[size], 'scroll-mt-24', className)}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          {displayHeading && (
            <motion.h2
              className={cn(
                'font-narrative text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-6',
                textColorClasses.heading,
                isGeorgian && 'font-georgian'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {displayHeading}
            </motion.h2>
          )}

          {displayLead && (
            <motion.p
              className={cn(
                'font-narrative text-lg md:text-xl leading-relaxed',
                textColorClasses.lead,
                isGeorgian && 'font-georgian'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              {displayLead}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;
