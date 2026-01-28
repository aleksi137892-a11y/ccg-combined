import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MuseumSectionProps {
  number?: string;
  heading: string;
  headingGe?: string;
  eyebrow?: string;
  eyebrowGe?: string;
  body?: string[];
  bodyGe?: string[];
  pullQuote?: string;
  pullQuoteGe?: string;
  alignment?: 'left' | 'center' | 'offset';
  size?: 'default' | 'hero' | 'compact';
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const MuseumSection: React.FC<MuseumSectionProps> = ({
  number,
  heading,
  headingGe,
  eyebrow,
  eyebrowGe,
  body,
  bodyGe,
  pullQuote,
  pullQuoteGe,
  alignment = 'left',
  size = 'default',
  className = '',
  id,
  children,
}) => {
  const { isGeorgian } = useLanguage();
  
  const displayHeading = isGeorgian && headingGe ? headingGe : heading;
  const displayEyebrow = isGeorgian && eyebrowGe ? eyebrowGe : eyebrow;
  const displayBody = isGeorgian && bodyGe ? bodyGe : body;
  const displayPullQuote = isGeorgian && pullQuoteGe ? pullQuoteGe : pullQuote;

  const sizeClasses = {
    hero: 'museum-section',
    default: 'py-16 md:py-24',
    compact: 'py-10 md:py-16',
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    offset: 'text-left md:ml-[10%]',
  };

  const headingClasses = {
    hero: 'text-museum-display',
    default: 'text-museum-heading',
    compact: 'text-museum-subheading',
  };

  return (
    <section 
      id={id}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      <div className={`container mx-auto px-4 ${alignmentClasses[alignment]}`}>
        <div className="relative max-w-4xl">
          {/* Floating section number */}
          {number && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-museum-number absolute -left-4 md:-left-16 -top-8 md:-top-16 select-none pointer-events-none"
            >
              {number}
            </motion.span>
          )}

          {/* Eyebrow */}
          {displayEyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-museum-eyebrow mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {displayEyebrow}
            </motion.p>
          )}

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${headingClasses[size]} text-navy ${isGeorgian ? 'font-georgian' : ''}`}
          >
            {displayHeading}
          </motion.h2>

          {/* Pull quote */}
          {displayPullQuote && (
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-pullquote mt-8 max-w-2xl ${isGeorgian ? 'font-georgian' : ''}`}
            >
              "{displayPullQuote}"
            </motion.blockquote>
          )}

          {/* Body paragraphs - minimal, max 2 */}
          {displayBody && displayBody.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`mt-8 space-y-4 max-w-2xl ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {displayBody.slice(0, 2).map((paragraph, idx) => (
                <p key={idx} className="text-museum-body">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          )}

          {/* Children for custom content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MuseumSection;
