import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/exhibitionAnimations';
import { cn } from '@/lib/utils';

interface ClosingSectionProps {
  className?: string;
}

/**
 * ClosingSection - A quiet institutional coda
 * 
 * Parchment background with centered typographic quote
 * and minimal navigation links. The final "room" of the homepage.
 */
const ClosingSection: React.FC<ClosingSectionProps> = ({ className }) => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const links = [
    { href: '/about', label: isGeorgian ? 'ჩვენს შესახებ' : 'About' },
    { href: '/charter', label: isGeorgian ? 'ქარტია' : 'Charter' },
    { href: '/contact', label: isGeorgian ? 'კონტაქტი' : 'Contact' },
  ];

  return (
    <motion.section 
      className={cn(
        'min-h-[50vh] md:min-h-[60vh] bg-parchment flex items-center justify-center',
        className
      )}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
    >
      <div className="text-center px-6 md:px-12">
        {/* Quote */}
        <motion.p 
          className={cn(
            'font-narrative italic text-navy/50 text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16',
            isGeorgian && 'font-georgian'
          )}
          variants={staggerItem}
        >
          {isGeorgian 
            ? 'სამართლიანობა ყოველთვის შესაძლებელია.'
            : 'Justice is always possible.'
          }
        </motion.p>

        {/* Minimal navigation links */}
        <motion.div 
          className="flex gap-6 md:gap-10 justify-center"
          variants={staggerItem}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm md:text-base text-navy/40 hover:text-navy transition-colors duration-500 tracking-wide',
                isGeorgian && 'font-georgian'
              )}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ClosingSection;
