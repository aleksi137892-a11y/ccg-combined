import React from 'react';
import Layout from '@/components/layout/Layout';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { civicNecessityContent } from '@/data/civicNecessityContent';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CivicNecessity: React.FC = () => {
  const { language, isGeorgian, getLocalizedPath } = useLanguage();

  const content = civicNecessityContent;
  const meta = content.meta;
  const declaration = content.declaration;

  return (
    <Layout>
      {/* Navy accent bar */}
      <div className="h-0.5 bg-navy w-full" />

      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header */}
          <InstitutionalPageHeader
            title={meta.title}
            titleGe={meta.titleGe}
            subtitle={meta.subtitle}
            subtitleGe={meta.subtitleGe}
            breadcrumbs={[
              { label: 'About', labelGe: 'შესახებ', href: '/about' },
            ]}
          />

          {/* Declaration */}
          <div className="mt-12 mb-16">
            <blockquote className={cn(
              'text-xl sm:text-2xl leading-relaxed text-navy font-light',
              'border-l-4 border-navy pl-6 py-4',
              isGeorgian ? 'font-georgian' : 'font-serif italic'
            )}>
              {isGeorgian ? declaration.textGe : declaration.text}
            </blockquote>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className={cn(
                  'text-2xl font-semibold text-navy mb-4',
                  isGeorgian && 'font-georgian'
                )}>
                  {isGeorgian ? section.titleGe : section.title}
                </h2>
                <p className={cn(
                  'text-foreground/80 leading-relaxed text-lg',
                  isGeorgian && 'font-georgian'
                )}>
                  {isGeorgian ? section.contentGe : section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className={cn(
              'text-lg font-semibold text-navy mb-4',
              isGeorgian && 'font-georgian'
            )}>
              {isGeorgian ? 'დაკავშირებული გვერდები' : 'Related Pages'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {content.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={getLocalizedPath(link.href)}
                  className={cn(
                    'text-navy underline underline-offset-4 hover:text-navy/70 transition-colors',
                    isGeorgian && 'font-georgian'
                  )}
                >
                  {isGeorgian ? link.labelGe : link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-sm text-muted-foreground">
            <span className={isGeorgian ? 'font-georgian' : ''}>
              {isGeorgian ? 'ბოლო განახლება:' : 'Last updated:'}{' '}
              {isGeorgian ? meta.lastUpdatedGe : meta.lastUpdated}
            </span>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CivicNecessity;
