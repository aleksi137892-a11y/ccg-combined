import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ProgramNavProps {
  current?: 'justice' | 'capture' | 'rustaveli';
  variant?: 'light' | 'dark';
  className?: string;
}

const PROGRAMS = [
  {
    id: 'justice',
    label: 'Forum for Justice',
    labelGe: 'სამართლიანობის ფორუმი',
    href: '/justice',
  },
  {
    id: 'capture',
    label: 'State of Capture',
    labelGe: 'ხელში ჩაგდების მდგომარეობა',
    href: '/state-of-capture',
  },
  {
    id: 'rustaveli',
    label: 'The Rustaveli Project',
    labelGe: 'რუსთაველის პროექტი',
    href: '/rustaveli',
  },
];

export const ProgramNav: React.FC<ProgramNavProps> = ({ 
  current, 
  variant = 'light',
  className 
}) => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const isDark = variant === 'dark';

  return (
    <nav 
      className={cn(
        'py-6 border-t',
        isDark ? 'border-white/10' : 'border-navy/10',
        className
      )}
      aria-label="Related programs"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl flex flex-wrap items-center gap-4">
          <span className={cn(
            'text-xs uppercase tracking-widest',
            isDark ? 'text-white/50' : 'text-navy/40',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? 'პროგრამები' : 'Programs'}
          </span>
          {PROGRAMS.map((program) => {
            const isCurrent = program.id === current;
            return (
              <Link
                key={program.id}
                to={getLocalizedPath(program.href)}
                className={cn(
                  'text-sm transition-colors',
                  isGeorgian && 'font-georgian',
                  isCurrent
                    ? isDark
                      ? 'text-white/60 cursor-default'
                      : 'text-navy/60 cursor-default'
                    : isDark
                      ? 'text-white/70 hover:text-white border-b border-white/30 hover:border-white'
                      : 'text-navy/70 hover:text-navy border-b border-navy/30 hover:border-navy'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {isGeorgian ? program.labelGe : program.label}
                {!isCurrent && ' →'}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ProgramNav;
