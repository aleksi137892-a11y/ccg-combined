import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';

const Cookies: React.FC = () => {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="Cookie Policy"
          titleGe="ქუქი პარამეტრები"
          subtitle="Legal"
          subtitleGe="იურიდიული"
          description="Manage your cookie preferences and learn about how we use cookies to improve your experience."
          descriptionGe="მართეთ თქვენი ქუქის პრეფერენციები და გაიგეთ, როგორ ვიყენებთ ქუქებს თქვენი გამოცდილების გასაუმჯობესებლად."
          breadcrumbs={[
            { label: 'Legal', labelGe: 'იურიდიული', href: '/privacy' }
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
              <p className={`font-narrative text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'ქუქი პრეფერენციები' : 'Cookie Preferences'}
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

export default Cookies;
