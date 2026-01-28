import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, ArrowRight } from 'lucide-react';

interface CalloutLink {
  label: string;
  labelGe?: string;
  href: string;
}

interface SafetyCalloutProps {
  title: string;
  titleGe?: string;
  body: string;
  bodyGe?: string;
  links?: CalloutLink[];
}

const SafetyCallout: React.FC<SafetyCalloutProps> = ({
  title,
  titleGe,
  body,
  bodyGe,
  links = []
}) => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const displayTitle = isGeorgian && titleGe ? titleGe : title;
  const displayBody = isGeorgian && bodyGe ? bodyGe : body;

  return (
    <div className="bg-navy/5 dark:bg-navy-pale/10 border-l-4 border-navy dark:border-primary p-6 my-8">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-navy dark:text-primary shrink-0 mt-0.5" />
        <div>
          <h3 className={`text-sm font-semibold text-navy dark:text-primary mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
            {displayTitle}
          </h3>
          <p className={`text-sm text-foreground/80 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}>
            {displayBody}
          </p>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium text-navy dark:text-primary hover:underline underline-offset-2 ${isGeorgian ? 'font-georgian' : ''}`}
                >
                  {isGeorgian && link.labelGe ? link.labelGe : link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyCallout;
