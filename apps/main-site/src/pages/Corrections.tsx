import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const Corrections: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="Corrections Log"
          titleGe="შესწორებების ჟურნალი"
          subtitle="Transparency"
          subtitleGe="გამჭვირვალობა"
          description="A transparent record of corrections and updates to our published materials, maintaining integrity in our documentation."
          descriptionGe="ჩვენი გამოქვეყნებული მასალების შესწორებებისა და განახლებების გამჭვირვალე ჩანაწერი, რომელიც ინარჩუნებს ჩვენი დოკუმენტაციის მთლიანობას."
          breadcrumbs={[
            { label: 'About', labelGe: 'შესახებ', href: '/about' },
            { label: 'Transparency', labelGe: 'გამჭვირვალობა', href: '/transparency' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'შესწორებების არქივი' : 'Corrections Archive'}
              </p>
              <p className={`font-narrative text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'ამ დროისთვის შესწორებები არ არის' : 'No corrections to date'}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Corrections;
