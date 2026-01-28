import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const SecureChannel: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        {/* Safety Callout */}
        <div className="border-b border-navy/10 bg-navy/[0.02]">
          <div className="container mx-auto px-4 py-4">
            <div className={`flex items-start gap-3 max-w-4xl ${isGeorgian ? 'font-georgian' : ''}`}>
              <div className="w-1 h-full bg-navy/20 flex-shrink-0 self-stretch" />
              <p className="font-narrative text-sm text-navy/70 italic">
                {isGeorgian
                  ? 'ვითხოვთ მხოლოდ იმას, რაც საჭიროა. თქვენი ვინაობა შეიძლება დარჩეს ანონიმური. იხილეთ ჩვენი მონაცემების მინიმიზაციის პოლიტიკა.'
                  : 'We ask only what is needed. Your identity can remain anonymous. See our data minimization policy.'}
              </p>
            </div>
          </div>
        </div>

        <InstitutionalPageHeader
          title="Secure Channel"
          titleGe="დაცული არხი"
          subtitle="Confidential Communication"
          subtitleGe="კონფიდენციალური კომუნიკაცია"
          description="For sensitive communications requiring enhanced security. End-to-end encrypted messaging for whistleblowers and sources."
          descriptionGe="მგრძნობიარე კომუნიკაციებისთვის, რომელიც მოითხოვს გაძლიერებულ უსაფრთხოებას. ბოლოდან ბოლომდე დაშიფრული შეტყობინებები მამხილებლებისა და წყაროებისთვის."
          breadcrumbs={[
            { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'დაშიფრული კომუნიკაციის პორტალი' : 'Encrypted Communication Portal'}
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

export default SecureChannel;
