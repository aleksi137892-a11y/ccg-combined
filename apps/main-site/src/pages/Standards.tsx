import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { standardsContent } from '@/data/standardsContent';
import { viewportOnce } from '@/lib/animations';
import FoundationSection from '@/components/layout/FoundationSection';
import { ExpandableSection } from '@/components/ui/expandable-section';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import JumpToNav from '@/components/institutional/JumpToNav';

const Standards: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();
  const content = standardsContent;

  const jumpToItems = [
    { id: 'principles', label: 'Principles', labelGe: 'პრინციპები' },
    { id: 'evidence', label: 'Evidence', labelGe: 'მტკიცებულება' },
    { id: 'triage', label: 'Triage', labelGe: 'ტრიაჟი' },
    { id: 'protection', label: 'Protection', labelGe: 'დაცვა' },
  ];

  useEffect(() => {
    document.title = isGeorgian 
      ? 'სტანდარტები | CCG' 
      : 'Standards | CCG';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', isGeorgian 
        ? content.meta.descriptionGe 
        : content.meta.description
      );
    }
  }, [isGeorgian, content.meta.description, content.meta.descriptionGe]);

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        {/* Hero */}
        <FoundationSection size="hero" variant="white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-narrative text-4xl md:text-5xl lg:text-6xl text-navy mb-8 ${isGeorgian ? 'font-georgian' : ''}`}
          >
            {isGeorgian ? content.meta.titleGe : content.meta.title}
          </motion.h1>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-narrative text-xl md:text-2xl text-navy/60 max-w-2xl leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}
          >
            "{isGeorgian ? content.preamble.ge : content.preamble.en}"
          </motion.blockquote>
        </FoundationSection>

        {/* Photo placeholder */}
        <div className="container mx-auto px-4 -mt-8 mb-16">
          <div className="max-w-3xl">
            <PhotoPlaceholder 
              label="Evidence review process" 
              aspectRatio="2/1" 
            />
          </div>
        </div>

        {/* Jump to navigation */}
        <JumpToNav items={jumpToItems} sticky />

        {/* Core Principles */}
        <FoundationSection 
          id="principles"
          variant="muted" 
          heading={isGeorgian ? 'ძირითადი პრინციპები' : 'Core Principles'}
        >
          <div className="space-y-4 mt-8">
            {content.sections.principles.items.slice(0, 4).map((item, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.05 }}
                className={`font-narrative text-base text-navy/70 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian ? item.ge : item.en}
              </motion.p>
            ))}
          </div>
          
          <ExpandableSection 
            summary="Read all principles" 
            summaryGe="ყველა პრინციპის ნახვა"
            className="mt-6"
          >
            <div className="space-y-4">
              {content.sections.principles.items.slice(4).map((item, idx) => (
                <p 
                  key={idx}
                  className={`font-narrative text-base text-navy/70 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}
                >
                  {isGeorgian ? item.ge : item.en}
                </p>
              ))}
            </div>
          </ExpandableSection>
        </FoundationSection>

        {/* Evidence & Verification */}
        <FoundationSection 
          id="evidence"
          variant="white"
          heading={isGeorgian ? 'მტკიცებულება და დადასტურება' : 'Evidence & Verification'}
        >
          <div className={`space-y-5 mt-6 ${isGeorgian ? 'font-georgian' : ''}`}>
            {content.sections.evidenceIntegrity.paragraphs.slice(0, 2).map((p, idx) => (
              <p key={idx} className="font-narrative text-base text-navy/70 leading-relaxed">
                {isGeorgian ? p.ge : p.en}
              </p>
            ))}
          </div>
          
          <div className="mt-8">
            <Link
              to={getLocalizedPath('/about/methodology')}
              className={`inline-flex items-center text-sm text-navy border-b border-navy/30 hover:border-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'მეთოდოლოგია' : 'Full methodology'} →
            </Link>
          </div>
        </FoundationSection>

        {/* Triage System */}
        <FoundationSection 
          id="triage"
          variant="navy"
          heading={isGeorgian ? 'ტრიაჟის სისტემა' : 'Triage System'}
        >
          <p className={`font-narrative text-base text-white/70 leading-relaxed mt-6 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
            {isGeorgian ? content.sections.triage.intro.ge : content.sections.triage.intro.en}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.sections.triage.lanes.map((lane, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.1 }}
                className="border border-white/20 p-6"
              >
                <h3 className={`font-narrative text-lg text-white mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? lane.nameGe : lane.name}
                </h3>
                <p className={`font-narrative text-sm text-white/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? lane.descriptionGe : lane.description}
                </p>
              </motion.div>
            ))}
          </div>
        </FoundationSection>

        {/* Protection & Reply */}
        <FoundationSection 
          id="protection"
          variant="white"
          heading={isGeorgian ? 'დაცვა და პასუხის უფლება' : 'Protection & Right of Reply'}
        >
          <div className="grid md:grid-cols-2 gap-12 mt-8">
            <div>
              <h3 className={`font-narrative text-lg text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'წყაროს დაცვა' : 'Source Protection'}
              </h3>
              <p className={`font-narrative text-base text-navy/60 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian 
                  ? content.sections.protection.paragraphs[0]?.ge 
                  : content.sections.protection.paragraphs[0]?.en}
              </p>
            </div>
            <div>
              <h3 className={`font-narrative text-lg text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'პასუხის უფლება' : 'Right of Reply'}
              </h3>
              <p className={`font-narrative text-base text-navy/60 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian 
                  ? content.sections.rightOfReply.paragraphs[0]?.ge 
                  : content.sections.rightOfReply.paragraphs[0]?.en}
              </p>
            </div>
          </div>
        </FoundationSection>

        {/* FAQ Redirect */}
        <FoundationSection variant="muted" size="compact">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className={`font-narrative text-base text-navy/70 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian 
                ? 'დამატებითი კითხვები სტანდარტებზე?' 
                : 'More questions about standards?'}
            </p>
            <Link
              to={getLocalizedPath('/about/faq?category=methods')}
              className={`inline-flex items-center text-sm text-navy border-b border-navy/30 hover:border-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'იხილეთ FAQ' : 'See FAQ'} →
            </Link>
          </div>
        </FoundationSection>

        {/* Footer links */}
        <section className="py-12 border-t border-navy/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl flex flex-wrap gap-4">
              {content.footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={getLocalizedPath(link.path)}
                  className={`text-sm text-navy/50 hover:text-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
                >
                  {isGeorgian ? link.labelGe : link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Standards;
