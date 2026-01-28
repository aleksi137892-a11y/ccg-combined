import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Breadcrumb {
  label: string;
  labelGe?: string;
  href?: string;
}

interface InstitutionalPageHeaderProps {
  title: string;
  titleGe?: string;
  subtitle?: string;
  subtitleGe?: string;
  description?: React.ReactNode;
  descriptionGe?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

const InstitutionalPageHeader: React.FC<InstitutionalPageHeaderProps> = ({
  title,
  titleGe,
  subtitle,
  subtitleGe,
  description,
  descriptionGe,
  breadcrumbs = [],
}) => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const defaultBreadcrumbs: Breadcrumb[] = [
    { label: 'Home', labelGe: 'მთავარი', href: '/' },
  ];

  const allBreadcrumbs = [...defaultBreadcrumbs, ...breadcrumbs, { label: isGeorgian && titleGe ? titleGe : title }];

  return (
    <header className="border-b border-navy/10">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-ui">
            {allBreadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="text-navy/30">/</span>
                )}
                {crumb.href ? (
                  <Link 
                    to={getLocalizedPath(crumb.href)} 
                    className="text-navy/40 hover:text-navy transition-colors"
                  >
                    {isGeorgian && crumb.labelGe ? crumb.labelGe : crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy/60">
                    {isGeorgian && crumb.labelGe ? crumb.labelGe : crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Split layout: Title left, Description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            {subtitle && (
              <p className="font-ui text-xs uppercase tracking-widest text-navy/40 mb-3">
                {isGeorgian && subtitleGe ? subtitleGe : subtitle}
              </p>
            )}
            <h1 className={`font-narrative text-3xl md:text-4xl lg:text-5xl text-navy leading-tight tracking-tight ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian && titleGe ? titleGe : title}
            </h1>
          </div>
          
          {(description || descriptionGe) && (
            <div className={`font-narrative text-lg md:text-xl text-navy/70 leading-relaxed lg:pt-8 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian && descriptionGe ? descriptionGe : description}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default InstitutionalPageHeader;
