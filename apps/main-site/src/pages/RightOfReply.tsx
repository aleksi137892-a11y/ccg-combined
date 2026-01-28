import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import { JumpToNav } from '@/components/institutional';
import { replyCorrectionsContent } from '@/data/replyCorrectionsContent';
import { LegalSection } from '@/components/legal';

const RightOfReply: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const { meta, jumpToItems, sections } = replyCorrectionsContent;

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title={meta.title}
          titleGe={meta.titleGe}
          subtitle="Forum for Justice"
          subtitleGe="სამართლიანობის ფორუმი"
          description={meta.intro}
          descriptionGe={meta.introGe}
          breadcrumbs={[
            { label: 'About', labelGe: 'შესახებ', href: '/about' },
            { label: 'Transparency', labelGe: 'გამჭვირვალეობა', href: '/transparency' }
          ]}
        />

        <JumpToNav items={jumpToItems || []} sticky />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            {sections.map((section) => (
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
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default RightOfReply;
