import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import { JumpToNav } from '@/components/institutional';
import { appealPathwaysContent } from '@/data/appealPathwaysContent';
import { LegalSection } from '@/components/legal';
import { Link } from 'react-router-dom';
import { ArrowRight, UserX, Eye, Building2 } from 'lucide-react';

const SubmitPetition: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const { meta, jumpToItems, sections } = appealPathwaysContent;

  const pathways = [
    {
      id: 'harm',
      icon: UserX,
      title: 'I Have Been Harmed',
      titleGe: 'ზიანი მიმადგა',
      description: 'For those who have directly experienced harm at the hands of state actors.',
      descriptionGe: 'მათთვის, ვინც პირდაპირ განიცადა ზიანი სახელმწიფო აქტორების მხრიდან.',
      href: '/appeal/harm'
    },
    {
      id: 'witness',
      icon: Eye,
      title: 'I Witnessed Wrongdoing',
      titleGe: 'დარღვევის მოწმე ვიყავი',
      description: 'For those who have observed misconduct or abuse of power.',
      descriptionGe: 'მათთვის, ვინც დააკვირდა ზნეობის დარღვევას ან ძალაუფლების ბოროტად გამოყენებას.',
      href: '/appeal/wrongdoing'
    },
    {
      id: 'insider',
      icon: Building2,
      title: 'I Am Inside the System',
      titleGe: 'სისტემის შიგნით ვარ',
      description: 'For officials or civil servants with documentary evidence.',
      descriptionGe: 'თანამდებობის პირებისთვის ან საჯარო მოხელეებისთვის დოკუმენტური მტკიცებულებით.',
      href: '/appeal/inside'
    }
  ];

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
            { label: 'Appeal', labelGe: 'მიმართვა', href: '/appeal' }
          ]}
        />

        <JumpToNav items={jumpToItems || []} sticky />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            {/* Pathway Cards */}
            <section id="pathways" className="mb-16">
              <h2 className={`font-display text-xl md:text-2xl text-navy mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'აირჩიეთ თქვენი გზა' : 'Choose Your Pathway'}
              </h2>
              
              <div className="grid gap-6">
                {pathways.map((pathway) => {
                  const Icon = pathway.icon;
                  return (
                    <Link
                      key={pathway.id}
                      to={pathway.href}
                      className="group border border-navy/10 bg-navy/[0.02] p-6 md:p-8 hover:border-navy/30 hover:bg-navy/[0.04] transition-all"
                    >
                      <div className="flex items-start gap-4 md:gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-navy/5 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-navy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-display text-lg md:text-xl text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                            {isGeorgian ? pathway.titleGe : pathway.title}
                          </h3>
                          <p className={`font-narrative text-navy/70 ${isGeorgian ? 'font-georgian' : ''}`}>
                            {isGeorgian ? pathway.descriptionGe : pathway.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-navy/40 group-hover:text-navy group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Remaining sections */}
            {sections.slice(1).map((section) => (
              <LegalSection
                key={section.id}
                id={section.id}
                heading={section.heading}
                headingGe={section.headingGe}
                body={section.body}
                bodyGe={section.bodyGe}
                bullets={section.bullets}
                bulletsGe={section.bulletsGe}
              />
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default SubmitPetition;
