import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const OffRamp: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="Off-Ramp"
          titleGe="გამოსავალი"
          subtitle="Resolution"
          subtitleGe="გადაწყვეტა"
          description="A pathway for those seeking to demonstrate changed conduct and accountability—acknowledging past actions and committing to restitution."
          descriptionGe="გზა მათთვის, ვინც ცდილობს შეცვლილი ქცევისა და ანგარიშვალდებულების დემონსტრირებას — წარსული ქმედებების აღიარებით და რესტიტუციისადმი ვალდებულებით."
          breadcrumbs={[
            { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'გადაწყვეტის პროცესი' : 'Resolution Process'}
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

export default OffRamp;
