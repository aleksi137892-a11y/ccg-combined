import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionLink {
  label: string;
  labelGe?: string;
  href: string;
}

interface SectionReference {
  en: string;
  ge: string;
  link: string;
  linkLabel: string;
  linkLabelGe: string;
}

interface SubSection {
  id: string;
  heading: string;
  headingGe?: string;
  body: string[];
  bodyGe?: string[];
  bullets?: string[];
  bulletsGe?: string[];
}

interface KeyValueTableRow {
  key: string;
  keyGe?: string;
  value: string;
  valueGe?: string;
}

interface KeyValueTable {
  title: string;
  titleGe?: string;
  rows: KeyValueTableRow[];
}

export interface LegalSectionProps {
  id: string;
  heading: string;
  headingGe?: string;
  body?: string[];
  bodyGe?: string[];
  bullets?: string[];
  bulletsGe?: string[];
  bodyAfterBullets?: string[];
  bodyAfterBulletsGe?: string[];
  links?: SectionLink[];
  subSections?: SubSection[];
  keyValueTable?: KeyValueTable;
  reference?: SectionReference;
}

const LegalSection: React.FC<LegalSectionProps> = ({
  id,
  heading,
  headingGe,
  body = [],
  bodyGe,
  bullets,
  bulletsGe,
  bodyAfterBullets,
  bodyAfterBulletsGe,
  links,
  subSections,
  keyValueTable,
  reference
}) => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const displayHeading = isGeorgian && headingGe ? headingGe : heading;
  const displayBody = isGeorgian && bodyGe ? bodyGe : body;
  const displayBullets = isGeorgian && bulletsGe ? bulletsGe : bullets;
  const displayBodyAfterBullets = isGeorgian && bodyAfterBulletsGe ? bodyAfterBulletsGe : bodyAfterBullets;

  return (
    <section id={id} className="scroll-mt-28 mb-12">
      <h2 className={`text-lg font-semibold text-foreground mb-4 ${isGeorgian ? 'font-georgian' : 'font-display'}`}>
        {displayHeading}
      </h2>
      
      <div className={`space-y-4 text-sm text-foreground/80 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}>
        {displayBody.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        
        {displayBullets && displayBullets.length > 0 && (
          <ul className="list-disc list-outside ml-5 space-y-2">
            {displayBullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        )}

        {displayBodyAfterBullets && displayBodyAfterBullets.length > 0 && (
          displayBodyAfterBullets.map((paragraph, index) => (
            <p key={`after-${index}`}>{paragraph}</p>
          ))
        )}

        {/* Key-Value Table */}
        {keyValueTable && (
          <div className="mt-6">
            <h3 className={`text-sm font-medium text-foreground mb-3 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian && keyValueTable.titleGe ? keyValueTable.titleGe : keyValueTable.title}
            </h3>
            <div className="border border-border divide-y divide-border">
              {keyValueTable.rows.map((row, index) => (
                <div key={index} className="flex">
                  <div className={`w-1/2 px-4 py-3 bg-muted/30 text-sm font-medium text-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
                    {isGeorgian && row.keyGe ? row.keyGe : row.key}
                  </div>
                  <div className={`w-1/2 px-4 py-3 text-sm text-foreground/80 ${isGeorgian ? 'font-georgian' : ''}`}>
                    {isGeorgian && row.valueGe ? row.valueGe : row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reference callout */}
        {reference && (
          <div className="mt-6 p-5 border border-navy/10 bg-navy/[0.02]">
            <p className={`text-sm text-foreground/70 leading-relaxed mb-3 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? reference.ge : reference.en}
            </p>
            <Link
              to={reference.link}
              className={`group inline-flex items-center gap-2 px-4 py-2 border border-navy/20 rounded text-sm text-navy hover:border-navy/40 hover:text-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? reference.linkLabelGe : reference.linkLabel}
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        )}
        
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2">
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

      {subSections && subSections.length > 0 && (
        <div className="mt-6 space-y-6 pl-4 border-l border-border/50">
          {subSections.map((sub) => {
            const subBody = isGeorgian && sub.bodyGe ? sub.bodyGe : sub.body;
            const subBullets = isGeorgian && sub.bulletsGe ? sub.bulletsGe : sub.bullets;
            return (
              <div key={sub.id} id={sub.id} className="scroll-mt-28">
                <h3 className={`text-base font-medium text-foreground mb-3 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian && sub.headingGe ? sub.headingGe : sub.heading}
                </h3>
                <div className={`space-y-3 text-sm text-foreground/80 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}>
                  {subBody.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {subBullets && subBullets.length > 0 && (
                    <ul className="list-disc list-outside ml-5 space-y-2">
                      {subBullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LegalSection;
