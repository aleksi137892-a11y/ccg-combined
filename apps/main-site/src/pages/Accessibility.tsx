import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { accessibilityContent } from '@/data/accessibilityContent';
import { InstitutionalPageHeader } from '@/components/institutional';
import { LegalPageTOC, LegalSection, ContactCallout } from '@/components/legal';
import { Info } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const Accessibility: React.FC = () => {
  const { language, getLocalizedPath } = useLanguage();
  const isGeorgian = language === 'ge';
  const content = accessibilityContent;

  // Generate TOC items from sections
  const tocItems = content.sections.map(section => ({
    id: section.id,
    heading: section.heading,
    headingGe: section.headingGe
  }));

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

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Legal', labelGe: 'სამართლებრივი', href: getLocalizedPath('/terms') }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />

        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <InstitutionalPageHeader
                title={content.meta.title}
                titleGe={content.meta.titleGe}
                subtitle="WCAG 2.2 Compliance"
                subtitleGe="WCAG 2.2 შესაბამისობა"
                description={content.meta.intro}
                descriptionGe={content.meta.introGe}
                breadcrumbs={breadcrumbs}
              />
            </motion.div>

            {/* Last updated */}
            <motion.div variants={fadeInUp} className="max-w-4xl mt-4 mb-8">
              <p className={`text-sm text-navy/60 ${isGeorgian ? 'font-georgian' : 'font-mono'}`}>
                {isGeorgian ? content.meta.lastUpdatedGe : content.meta.lastUpdated}
              </p>
            </motion.div>
          </motion.div>

          {/* Callout */}
          {content.callouts && content.callouts.length > 0 && (
            <motion.div
              className="max-w-4xl mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
            >
              {content.callouts.map((callout, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-navy/5 border-l-2 border-navy p-6"
                >
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className={`font-medium text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? callout.titleGe : callout.title}
                      </h3>
                      <p className={`text-navy/80 text-sm ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? callout.bodyGe : callout.body}
                      </p>
                      {callout.links && callout.links.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-3">
                          {callout.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-navy underline underline-offset-2 hover:text-navy/70 transition-colors"
                            >
                              {isGeorgian ? link.labelGe : link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Main content with sidebar TOC */}
          <div className="flex gap-12 max-w-4xl">
            {/* Content */}
            <main className="flex-1">
              {/* TOC (handles both mobile and desktop) */}
              <LegalPageTOC items={tocItems} />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={staggerContainer}
              >
                {content.sections.map((section, index) => (
                  <motion.div key={section.id} variants={fadeInUp} custom={index}>
                    <LegalSection
                      id={section.id}
                      heading={section.heading}
                      headingGe={section.headingGe}
                      body={section.body}
                      bodyGe={section.bodyGe}
                      bullets={section.bullets}
                      bulletsGe={section.bulletsGe}
                      links={section.links}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact callout with defaults */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
              >
                <ContactCallout
                  title="Accessibility feedback"
                  titleGe="წვდომის გამოხმაურება"
                  body={[
                    'If you encounter an accessibility barrier, please let us know:',
                    'Email: accessibility@sabcho.org'
                  ]}
                  bodyGe={[
                    'თუ წააწყდებით წვდომის ბარიერს, გთხოვთ შეგვატყობინოთ:',
                    'ელფოსტა: accessibility@sabcho.org'
                  ]}
                />
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accessibility;
