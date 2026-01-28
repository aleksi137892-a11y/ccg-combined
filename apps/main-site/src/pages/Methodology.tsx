import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import JumpToNav from '@/components/institutional/JumpToNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { methodologyContent } from '@/data/methodologyContent';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const Methodology: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();
  const content = methodologyContent;

  useEffect(() => {
    document.title = isGeorgian 
      ? 'კვლევის მეთოდოლოგია | CCG' 
      : 'Research Methodology | CCG';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', isGeorgian 
        ? content.header.descriptionGe 
        : content.header.description
      );
    }
  }, [isGeorgian, content.header.description, content.header.descriptionGe]);

  const getLabelColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'blue': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'amber': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'gray': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'red': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title={content.header.title}
          titleGe={content.header.titleGe}
          subtitle={content.header.subtitle}
          subtitleGe={content.header.subtitleGe}
          description={content.header.description}
          descriptionGe={content.header.descriptionGe}
          breadcrumbs={[
            { label: 'Institution', labelGe: 'ინსტიტუცია', href: '/about' },
            { label: 'Standards', labelGe: 'სტანდარტები', href: '/standards' },
          ]}
        />

        <JumpToNav items={content.jumpToItems} />

        <div className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto space-y-20">

              {/* Section: Methods Boilerplate */}
              <AnimatedSection id={content.sections.boilerplate.id} className="scroll-mt-32" variant="settleIn">
                <h2 className={`text-2xl font-medium text-navy mb-6 ${isGeorgian ? 'font-georgian' : 'font-serif'}`}>
                  {isGeorgian ? content.sections.boilerplate.titleGe : content.sections.boilerplate.title}
                </h2>
                <div className="border-l-2 border-navy/20 pl-6 space-y-6">
                  {content.sections.boilerplate.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className={`text-navy/80 leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}>
                      {isGeorgian ? paragraph.ge : paragraph.en}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {/* Section: Evidence Standards */}
              <AnimatedSection id={content.sections.evidenceStandards.id} className="scroll-mt-32" variant="fadeInUp" delay={0.1}>
                <h2 className={`text-2xl font-medium text-navy mb-6 ${isGeorgian ? 'font-georgian' : 'font-serif'}`}>
                  {isGeorgian ? content.sections.evidenceStandards.titleGe : content.sections.evidenceStandards.title}
                </h2>

                <p className={`text-navy/70 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.evidenceStandards.intro.ge : content.sections.evidenceStandards.intro.en}
                </p>

                {/* International Protocols */}
                <motion.div 
                  className="grid md:grid-cols-3 gap-6 mb-10"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {content.sections.evidenceStandards.protocols.map((protocol, idx) => (
                    <motion.div key={idx} className="border-t-2 border-navy/20 pt-4" variants={fadeInUp}>
                      <h4 className={`font-medium text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? protocol.nameGe : protocol.name}
                      </h4>
                      <p className={`text-sm text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? protocol.descriptionGe : protocol.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Evidence Categories */}
                <h3 className={`text-lg font-medium text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.evidenceStandards.categories.titleGe : content.sections.evidenceStandards.categories.title}
                </h3>
                <motion.div 
                  className="space-y-3 mb-10"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {content.sections.evidenceStandards.categories.items.map((category, idx) => (
                    <motion.div 
                      key={idx} 
                      className="py-3 border-b border-navy/10 last:border-0"
                      variants={fadeInUp}
                    >
                      <span className={`font-medium text-navy ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? category.nameGe : category.name}
                      </span>
                      <span className={`text-navy/60 ml-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                        — {isGeorgian ? category.examplesGe : category.examples}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Integrity Requirements */}
                <h3 className={`text-lg font-medium text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.evidenceStandards.integrity.titleGe : content.sections.evidenceStandards.integrity.title}
                </h3>
                <ul className="space-y-2">
                  {content.sections.evidenceStandards.integrity.items.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-3 text-navy/70 ${isGeorgian ? 'font-georgian' : ''}`}>
                      <span className="text-navy/30">•</span>
                      {isGeorgian ? item.ge : item.en}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Section: Source Hierarchy */}
              <AnimatedSection id={content.sections.sourceHierarchy.id} className="scroll-mt-32" variant="settleIn" delay={0.1}>
                <h2 className={`text-2xl font-medium text-navy mb-6 ${isGeorgian ? 'font-georgian' : 'font-serif'}`}>
                  {isGeorgian ? content.sections.sourceHierarchy.titleGe : content.sections.sourceHierarchy.title}
                </h2>

                <p className={`text-navy/70 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.sourceHierarchy.intro.ge : content.sections.sourceHierarchy.intro.en}
                </p>

                <motion.div 
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {content.sections.sourceHierarchy.tiers.map((tier) => (
                    <motion.div key={tier.level} className="border-l-2 border-navy/20 pl-6" variants={fadeInUp}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium text-navy ${isGeorgian ? 'font-georgian' : ''}`}>
                          {isGeorgian ? tier.nameGe : tier.name}
                        </h4>
                        <span className={`text-xs uppercase tracking-wider text-navy/50`}>
                          {isGeorgian ? tier.weightGe : tier.weight}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {tier.examples.map((example, idx) => (
                          <li key={idx} className={`flex items-start gap-3 text-navy/70 text-sm ${isGeorgian ? 'font-georgian' : ''}`}>
                            <span className="text-navy/30">•</span>
                            {isGeorgian ? example.ge : example.en}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>

              {/* Section: Verification Protocol */}
              <AnimatedSection id={content.sections.verificationProtocol.id} className="scroll-mt-32" variant="fadeInUp" delay={0.1}>
                <h2 className={`text-2xl font-medium text-navy mb-6 ${isGeorgian ? 'font-georgian' : 'font-serif'}`}>
                  {isGeorgian ? content.sections.verificationProtocol.titleGe : content.sections.verificationProtocol.title}
                </h2>

                <p className={`text-navy/70 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.verificationProtocol.intro.ge : content.sections.verificationProtocol.intro.en}
                </p>

                <motion.div 
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {content.sections.verificationProtocol.stages.map((stage) => (
                    <motion.div key={stage.number} className="border-t border-navy/10 pt-6" variants={fadeInUp}>
                      <h4 className={`font-medium text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? stage.nameGe : stage.name}
                      </h4>
                      <ul className="space-y-2">
                        {stage.steps.map((step, idx) => (
                          <li key={idx} className={`flex items-start gap-3 text-navy/70 text-sm ${isGeorgian ? 'font-georgian' : ''}`}>
                            <span className="text-navy/30">→</span>
                            {isGeorgian ? step.ge : step.en}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>

              {/* Section: Confidence Labels */}
              <AnimatedSection id={content.sections.confidenceLabels.id} className="scroll-mt-32" variant="settleIn" delay={0.1}>
                <h2 className={`text-2xl font-medium text-navy mb-6 ${isGeorgian ? 'font-georgian' : 'font-serif'}`}>
                  {isGeorgian ? content.sections.confidenceLabels.titleGe : content.sections.confidenceLabels.title}
                </h2>

                <p className={`text-navy/70 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.confidenceLabels.intro.ge : content.sections.confidenceLabels.intro.en}
                </p>

                <motion.div 
                  className="space-y-6 mb-10"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {content.sections.confidenceLabels.labels.map((label) => (
                    <motion.div key={label.label} className="border-b border-navy/10 pb-6 last:border-0" variants={fadeInUp}>
                      <div className="flex items-start gap-4 mb-2">
                        <span className={`px-3 py-1 border text-sm font-medium ${getLabelColor(label.color)}`}>
                          {isGeorgian ? label.labelGe : label.label}
                        </span>
                        <p className={`text-navy/70 flex-1 ${isGeorgian ? 'font-georgian' : ''}`}>
                          {isGeorgian ? label.definitionGe : label.definition}
                        </p>
                      </div>
                      <div className="pl-0 text-sm">
                        <span className="text-navy/40 uppercase tracking-wider text-xs mr-2">
                          {isGeorgian ? 'მოთხოვნები:' : 'Requirements:'}
                        </span>
                        <span className={`text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                          {isGeorgian ? label.requirementsGe : label.requirements}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Label Rules */}
                <div className="border-l-2 border-navy/20 pl-6">
                  <h4 className={`font-medium text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                    {isGeorgian ? content.sections.confidenceLabels.rules.titleGe : content.sections.confidenceLabels.rules.title}
                  </h4>
                  <ul className="space-y-2">
                    {content.sections.confidenceLabels.rules.items.map((rule, idx) => (
                      <li key={idx} className={`flex items-start gap-3 text-navy/70 text-sm ${isGeorgian ? 'font-georgian' : ''}`}>
                        <span className="text-navy/30">•</span>
                        {isGeorgian ? rule.ge : rule.en}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Section: Publication Criteria */}
              <AnimatedSection id={content.sections.publicationCriteria.id} className="scroll-mt-32" variant="fadeInUp" delay={0.1}>
                <h2 className={`text-2xl font-medium text-navy mb-6 ${isGeorgian ? 'font-georgian' : 'font-serif'}`}>
                  {isGeorgian ? content.sections.publicationCriteria.titleGe : content.sections.publicationCriteria.title}
                </h2>

                <p className={`text-navy/70 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? content.sections.publicationCriteria.intro.ge : content.sections.publicationCriteria.intro.en}
                </p>

                <motion.div 
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {content.sections.publicationCriteria.criteria.map((criterion, idx) => (
                    <motion.div key={idx} className="border-t border-navy/10 pt-6" variants={fadeInUp}>
                      <h4 className={`font-medium text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {isGeorgian ? criterion.nameGe : criterion.name}
                      </h4>
                      <ul className="space-y-2">
                        {criterion.requirements.map((req, ridx) => (
                          <li key={ridx} className={`flex items-start gap-3 text-navy/70 text-sm ${isGeorgian ? 'font-georgian' : ''}`}>
                            <span className="text-navy/40">✓</span>
                            {isGeorgian ? req.ge : req.en}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>

              {/* Footer Links */}
              <motion.footer 
                className="pt-12 border-t border-navy/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5 }}
              >
                <p className={`text-sm text-navy/50 mb-6 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {isGeorgian ? 'დაკავშირებული დოკუმენტები' : 'Related Documents'}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {content.footerLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={getLocalizedPath(link.path)}
                      className={`text-sm text-navy/70 hover:text-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
                    >
                      {isGeorgian ? link.labelGe : link.label} →
                    </Link>
                  ))}
                </div>
              </motion.footer>

            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Methodology;
