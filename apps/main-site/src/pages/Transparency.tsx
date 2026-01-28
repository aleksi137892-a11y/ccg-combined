import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { transparencyContent } from '@/data/transparencyContent';
import { InstitutionalPageHeader } from '@/components/institutional';
import { LegalPageTOC, LegalSection, ContactCallout } from '@/components/legal';
import type { LegalSectionProps } from '@/components/legal/LegalSection';
import { Shield, Coins, ExternalLink } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

// Extended section type with optional fields from transparencyContent
type TransparencySection = {
  id: string;
  heading: string;
  headingGe?: string;
  body?: string[];
  bodyGe?: string[];
  bullets?: string[];
  bulletsGe?: string[];
  bodyAfterBullets?: string[];
  bodyAfterBulletsGe?: string[];
  links?: Array<{ label: string; labelGe?: string; href: string }>;
  subSections?: Array<{
    id: string;
    heading: string;
    headingGe?: string;
    body: string[];
    bodyGe?: string[];
    bullets?: string[];
    bulletsGe?: string[];
  }>;
  keyValueTable?: {
    title: string;
    titleGe?: string;
    rows: Array<{ key: string; keyGe?: string; value: string; valueGe?: string }>;
  };
  reference?: {
    en: string;
    ge: string;
    link: string;
    linkLabel: string;
    linkLabelGe: string;
  };
};

const Transparency: React.FC = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';
  const content = transparencyContent;

  // Build TOC items from sections
  const tocItems = content.sections.map(section => ({
    id: section.id,
    heading: section.heading,
    headingGe: section.headingGe
  }));

  const breadcrumbs = [
    { label: 'The Council', labelGe: 'საბჭო', href: 'https://sabcho.org/about' }
  ];

  // SEO meta tags
  const pageTitle = isGeorgian 
    ? 'გამჭვირვალობის ანგარიში — საქართველოს სამოქალაქო საბჭო' 
    : 'Transparency Report — Civic Council of Georgia';
  const pageDescription = isGeorgian 
    ? 'ჩვენი ოპერაციების, დაფინანსებისა და მმართველობის სრული გამჟღავნება.'
    : 'Full disclosure of our operations, funding, and governance.';

  useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription]);

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case 'principle':
        return <Shield className="w-5 h-5 text-navy mt-0.5 shrink-0" />;
      case 'funding':
        return <Coins className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />;
      default:
        return <Shield className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />

        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <InstitutionalPageHeader
            title={content.meta.title}
            titleGe={content.meta.titleGe}
            subtitle={isGeorgian ? content.meta.lastUpdatedGe : content.meta.lastUpdated}
            description={isGeorgian ? content.meta.introGe : content.meta.intro}
            breadcrumbs={breadcrumbs}
          />

          {/* Mobile TOC */}
          <div className="lg:hidden mt-8">
            <LegalPageTOC items={tocItems} />
          </div>

          {/* Main content with sidebar TOC */}
          <div className="flex gap-12 lg:gap-16 mt-8 lg:mt-12">
            {/* Desktop TOC */}
            <LegalPageTOC items={tocItems} />

            {/* Content */}
            <div className="flex-1 min-w-0 max-w-prose">
              {/* Callouts */}
              <motion.div 
                className="space-y-6 mb-12"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {content.callouts.map((callout, idx) => (
                  <motion.div 
                    key={idx}
                    className={`p-6 border-l-4 ${
                      callout.type === 'principle' 
                        ? 'bg-navy/5 border-navy' 
                        : 'bg-muted/30 border-muted-foreground/30'
                    }`}
                    variants={fadeInUp}
                  >
                    <div className="flex items-start gap-3">
                      {getCalloutIcon(callout.type)}
                      <div>
                        <h2 className={`font-medium text-foreground mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                          {isGeorgian ? callout.titleGe : callout.title}
                        </h2>
                        <p className={`text-sm text-muted-foreground leading-relaxed mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                          {isGeorgian ? callout.bodyGe : callout.body}
                        </p>
                        {callout.links && callout.links.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {callout.links.map((link, linkIdx) => (
                              <a
                                key={linkIdx}
                                href={link.href}
                                className={`inline-flex items-center gap-1.5 text-sm text-navy hover:underline ${isGeorgian ? 'font-georgian' : ''}`}
                              >
                                {isGeorgian && link.labelGe ? link.labelGe : link.label}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Sections */}
              <motion.div 
                className="space-y-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {(content.sections as TransparencySection[]).map((section, idx) => (
                  <motion.div key={section.id} variants={fadeInUp} custom={idx}>
                    <LegalSection 
                      id={section.id}
                      heading={section.heading}
                      headingGe={section.headingGe}
                      body={section.body}
                      bodyGe={section.bodyGe}
                      bullets={section.bullets}
                      bulletsGe={section.bulletsGe}
                      bodyAfterBullets={section.bodyAfterBullets}
                      bodyAfterBulletsGe={section.bodyAfterBulletsGe}
                      links={section.links}
                      subSections={section.subSections}
                      keyValueTable={section.keyValueTable}
                      reference={section.reference}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Callout */}
              <motion.div 
                className="mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5 }}
              >
                <ContactCallout
                  title="Questions?"
                  titleGe="კითხვები?"
                  body={[
                    'Questions about transparency, governance posture, or independence can be sent to:',
                    'Email: transparency@sabcho.org'
                  ]}
                  bodyGe={[
                    'კითხვები გამჭვირვალობის, მმართველობის პოზიციის ან დამოუკიდებლობის შესახებ შეიძლება გაიგზავნოს:',
                    'ელფოსტა: transparency@sabcho.org'
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transparency;
