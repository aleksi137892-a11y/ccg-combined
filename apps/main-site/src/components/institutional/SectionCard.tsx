import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  titleGe?: string;
  description: string;
  descriptionGe?: string;
  href?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'compact';
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  titleGe,
  description,
  descriptionGe,
  href,
  icon,
  variant = 'default',
}) => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const content = (
    <motion.div
      className={cn(
        'group relative border border-navy/10 bg-white',
        'transition-colors duration-300',
        href && 'cursor-pointer',
        variant === 'compact' ? 'p-4' : 'p-6 md:p-8'
      )}
      whileHover={href ? {
        borderColor: 'hsl(220 60% 10% / 0.25)',
        backgroundColor: 'hsl(220 60% 10% / 0.02)',
      } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="shrink-0 text-navy/40 transition-colors duration-300 group-hover:text-navy/60">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-narrative font-medium text-navy mb-2 transition-colors duration-300',
            variant === 'compact' ? 'text-base' : 'text-lg',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian && titleGe ? titleGe : title}
          </h3>
          <p className={cn(
            'font-narrative text-navy/60 leading-relaxed transition-colors duration-300',
            variant === 'compact' ? 'text-sm' : 'text-sm md:text-base',
            isGeorgian && 'font-georgian',
            href && 'group-hover:text-navy/70'
          )}>
            {isGeorgian && descriptionGe ? descriptionGe : description}
          </p>
        </div>
        {href && (
          <div className="shrink-0 self-center">
            <ArrowRight 
              className="w-5 h-5 text-navy/20 transition-all duration-300 group-hover:text-navy/60 group-hover:translate-x-1" 
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link to={getLocalizedPath(href)} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

export default SectionCard;
