import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { InstitutionalPageHeader, JumpToNav } from '@/components/institutional';
import { captureMapContent } from '@/data/captureMapContent';
import LegalSection from '@/components/legal/LegalSection';

const CaptureMap: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const content = captureMapContent;

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title={content.meta.title}
          titleGe={content.meta.titleGe}
          subtitle="State of Capture"
          subtitleGe="ხელში ჩაგდების მდგომარეობა"
          description={content.meta.intro}
          descriptionGe={content.meta.introGe}
          breadcrumbs={[
            { label: 'State of Capture', labelGe: 'ხელში ჩაგდების მდგომარეობა', href: '/engine' }
          ]}
        />

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

export default CaptureMap;
