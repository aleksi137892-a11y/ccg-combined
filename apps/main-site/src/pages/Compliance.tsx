import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const Compliance: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="Compliance Guidance"
          titleGe="შესაბამისობის სახელმძღვანელო"
          subtitle="Institution"
          subtitleGe="ინსტიტუცია"
          description="Guidance for organizations and individuals on compliance with accountability standards and institutional expectations."
          descriptionGe="სახელმძღვანელო ორგანიზაციებისა და პირებისთვის ანგარიშვალდებულების სტანდარტებთან და ინსტიტუციურ მოლოდინებთან შესაბამისობის შესახებ."
          breadcrumbs={[
            { label: 'About', labelGe: 'შესახებ', href: '/about' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'შესაბამისობის რესურსები' : 'Compliance Resources'}
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

export default Compliance;
