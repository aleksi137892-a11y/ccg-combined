import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { InstitutionalPageHeader, JumpToNav } from '@/components/institutional';
import { internationalMechanismsContent } from '@/data/internationalMechanismsContent';
import LegalSection from '@/components/legal/LegalSection';
import { AlertCircle } from 'lucide-react';

const InternationalMechanisms: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const content = internationalMechanismsContent;

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title={content.meta.title}
          titleGe={content.meta.titleGe}
          subtitle="Remedy"
          subtitleGe="სამართლებრივი დაცვა"
          description={content.meta.intro}
          descriptionGe={content.meta.introGe}
          breadcrumbs={[
            { label: 'Remedy', labelGe: 'სამართლებრივი დაცვა', href: '/remedy' }
          ]}
        />

        {/* Legal disclaimer callout */}
        <div className="border-b border-navy/10 bg-amber-50/50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className={`text-sm text-amber-800 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian 
                  ? 'ეს გვერდი უზრუნველყოფს ინფორმაციულ კონტექსტს. ეს არ არის იურიდიული რჩევა. გთხოვთ, მიმართოთ კვალიფიციურ იურიდიულ მრჩეველს.'
                  : 'This page provides informational context. It is not legal advice. Please consult qualified legal counsel.'}
              </p>
            </div>
          </div>
        </div>

        <JumpToNav items={content.jumpToItems} />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            {content.sections.map((section) => (
              <LegalSection
                key={section.id}
                id={section.id}
                heading={section.heading}
                headingGe={section.headingGe}
                body={section.body}
                bodyGe={section.bodyGe}
                bullets={section.bullets}
                bulletsGe={section.bulletsGe}
                links={section.links}
              />
            ))}

            {/* Last updated */}
            <footer className="pt-12 mt-12 border-t border-navy/10">
              <p className="font-mono text-xs text-navy/30">
                {isGeorgian ? content.meta.lastUpdatedGe : content.meta.lastUpdated}
              </p>
            </footer>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default InternationalMechanisms;
