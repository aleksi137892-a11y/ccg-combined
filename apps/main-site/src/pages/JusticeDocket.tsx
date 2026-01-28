import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const JusticeDocket: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="The Ledger"
          titleGe="ლეჯერი"
          subtitle="Public Docket"
          subtitleGe="საჯარო რეესტრი"
          description="A public record against erasure—updated, corrected, and citable. Maintained for accountability and historical memory."
          descriptionGe="საჯარო ჩანაწერი წაშლის წინააღმდეგ — განახლებული, შესწორებული და ციტირებადი. შენახულია ანგარიშვალდებულებისა და ისტორიული მეხსიერებისთვის."
          breadcrumbs={[
            { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center mb-16">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'საჯარო ჩანაწერი' : 'Public Record'}
              </p>
              <p className={`font-narrative text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'მალე' : 'Coming Soon'}
              </p>
            </div>

            {/* Political Prisoners Section */}
            <section id="political-prisoners" className="scroll-mt-24">
              <div className={`mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                <h2 className="font-narrative text-2xl text-navy mb-4">
                  {isGeorgian ? 'პოლიტიკური პატიმრები' : 'Political Prisoners'}
                </h2>
                <p className="font-narrative text-navy/70 mb-6">
                  {isGeorgian
                    ? 'პოლიტიკური მიზეზებით დაკავებული პირების სპეციალური ჩანაწერი, რომელიც ინახება ანგარიშვალდებულებისა და ადვოკატირების მიზნებისთვის.'
                    : 'A dedicated record of individuals detained for political reasons, maintained for accountability and advocacy purposes.'}
                </p>
              </div>
              <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
                <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? 'პოლიტიკური პატიმრების რეესტრი' : 'Political Prisoners Registry'}
                </p>
                <p className={`font-narrative text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? 'მალე' : 'Coming Soon'}
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default JusticeDocket;
