import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const Advisory: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="Advisory Council"
          titleGe="სამეთვალყურეო საბჭო"
          subtitle="Governance"
          subtitleGe="მმართველობა"
          description="Independent advisors providing oversight and strategic guidance to ensure institutional integrity and mission alignment."
          descriptionGe="დამოუკიდებელი მრჩევლები, რომლებიც უზრუნველყოფენ ზედამხედველობას და სტრატეგიულ ხელმძღვანელობას ინსტიტუციური მთლიანობისა და მისიის შესაბამისობის უზრუნველსაყოფად."
          breadcrumbs={[
            { label: 'About', labelGe: 'შესახებ', href: '/about' },
            { label: 'Governance', labelGe: 'მმართველობა', href: '/governance' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'საბჭოს წევრები' : 'Council Members'}
              </p>
              <p className={`font-narrative text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'მალე' : 'Coming Soon'}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Advisory;
