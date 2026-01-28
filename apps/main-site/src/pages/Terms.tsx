import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { termsOfUseContent } from '@/data/termsContent';
import { LegalPageTOC, SafetyCallout, ContactCallout, LegalSection } from '@/components/legal';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const Terms: React.FC = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';
  const content = termsOfUseContent;

  const tocItems = content.sections.map(section => ({
    id: section.id,
    heading: section.heading,
    headingGe: section.headingGe
  }));

  const safetyCallout = content.callouts.find(c => c.type === 'safety');
  const contactSection = content.sections.find(s => s.id === 'contact');

  // SEO
  const pageTitle = isGeorgian ? content.meta.titleGe : content.meta.title;
  const pageDescription = isGeorgian ? content.meta.introGe : content.meta.intro;

  useEffect(() => {
    document.title = `${pageTitle} | CCG`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription.slice(0, 160));
    }
  }, [pageTitle, pageDescription]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />
        
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.header 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-2xl md:text-3xl font-display font-semibold text-foreground mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? content.meta.titleGe : content.meta.title}
              </h1>
              <p className={`text-sm text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? content.meta.lastUpdatedGe : content.meta.lastUpdated}
              </p>
            </motion.header>

            {/* Intro paragraph */}
            <motion.p 
              className={`text-base text-foreground/80 leading-relaxed mb-8 max-w-prose ${isGeorgian ? 'font-georgian' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {isGeorgian ? content.meta.introGe : content.meta.intro}
            </motion.p>

            {/* Safety callout */}
            {safetyCallout && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <SafetyCallout
                  title={safetyCallout.title}
                  titleGe={safetyCallout.titleGe}
                  body={safetyCallout.body}
                  bodyGe={safetyCallout.bodyGe}
                  links={safetyCallout.links}
                />
              </motion.div>
            )}

            {/* Mobile TOC */}
            <div className="lg:hidden">
              <LegalPageTOC items={tocItems} />
            </div>

            {/* Main content with sidebar */}
            <div className="flex gap-12">
              {/* Desktop TOC */}
              <div className="hidden lg:block">
                <LegalPageTOC items={tocItems} />
              </div>

              {/* Content */}
              <main className="flex-1 min-w-0">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {content.sections.map((section, idx) => (
                    <motion.div key={section.id} variants={fadeInUp} custom={idx}>
                      <LegalSection
                        id={section.id}
                        heading={section.heading}
                        headingGe={section.headingGe}
                        body={section.body}
                        bullets={section.bullets}
                        links={section.links}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Contact callout at bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5 }}
                >
                  {contactSection ? (
                    <ContactCallout
                      title={contactSection.heading}
                      titleGe={contactSection.headingGe}
                      body={contactSection.body}
                    />
                  ) : (
                    <ContactCallout />
                  )}
                </motion.div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
