import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import FoundationSection from '@/components/layout/FoundationSection';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import { ExpandableSection } from '@/components/ui/expandable-section';
import { aboutContent } from '@/data/aboutContent';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const About: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const getText = (en: string, ge: string) => isGeorgian ? ge : en;
  const getArray = (en: string[], ge: string[]) => isGeorgian ? ge : en;

  return (
    <Layout>
      <article className="min-h-screen bg-white">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />

        {/* Hero Section */}
        <FoundationSection size="hero" variant="white">
          <motion.span
            className="text-xs uppercase tracking-[0.2em] text-navy/40 block mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {getText('Institutional Statement', 'ინსტიტუციური განცხადება')}
          </motion.span>
          
          <motion.h1
            className={cn(
              'font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-navy leading-[1.1] mb-8',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {getText('Mission & Origin', 'მისია და წარმოშობა')}
          </motion.h1>

          <motion.p
            className={cn(
              'text-xl md:text-2xl text-navy/60 leading-relaxed max-w-2xl',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {getText(aboutContent.meta.intro, aboutContent.meta.introGe)}
          </motion.p>
        </FoundationSection>

        {/* Emphasis Quote - Muted */}
        <FoundationSection variant="muted" size="compact">
          <motion.blockquote
            className={cn(
              'font-serif text-2xl md:text-3xl text-navy leading-snug',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {getText(aboutContent.hero.emphasisLine, aboutContent.hero.emphasisLineGe)}
          </motion.blockquote>

          <motion.div 
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={aboutContent.hero.primaryCta.href}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 bg-navy text-white hover:bg-navy/90 transition-colors',
                isGeorgian && 'font-georgian'
              )}
            >
              {getText(aboutContent.hero.primaryCta.label, aboutContent.hero.primaryCta.labelGe)}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={aboutContent.hero.secondaryCta.href}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy hover:bg-navy/5 transition-colors',
                isGeorgian && 'font-georgian'
              )}
            >
              {getText(aboutContent.hero.secondaryCta.label, aboutContent.hero.secondaryCta.labelGe)}
            </a>
          </motion.div>
        </FoundationSection>

        {/* Photo placeholder section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <PhotoPlaceholder 
                label={getText('Documentary image', 'დოკუმენტური გამოსახულება')}
                aspectRatio="16/9"
              />
            </div>
          </div>
        </section>

        {/* Core sections with expandables */}
        {aboutContent.sections.map((section, idx) => (
          <FoundationSection 
            key={section.id}
            id={section.id}
            variant={idx % 2 === 0 ? 'white' : 'muted'}
            heading={getText(section.heading, section.headingGe)}
            headingGe={section.headingGe}
          >
            <div className={cn(
              'text-lg text-navy/70 leading-relaxed space-y-6 mt-6',
              isGeorgian && 'font-georgian'
            )}>
              {/* Show first 2 paragraphs */}
              {getArray(section.body, section.bodyGe).slice(0, 2).map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
              
              {/* Expandable for remaining content if more than 2 paragraphs */}
              {getArray(section.body, section.bodyGe).length > 2 && (
                <ExpandableSection
                  summary={getText('Read more', 'წაიკითხეთ მეტი')}
                  summaryGe="წაიკითხეთ მეტი"
                >
                  <div className="space-y-6">
                    {getArray(section.body, section.bodyGe).slice(2).map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </ExpandableSection>
              )}
            </div>
          </FoundationSection>
        ))}

        {/* What We Build - Grid */}
        <FoundationSection 
          id="what-we-build"
          variant="navy"
          heading={getText(aboutContent.whatWeBuild.heading, aboutContent.whatWeBuild.headingGe)}
          headingGe={aboutContent.whatWeBuild.headingGe}
        >
          <p className={cn(
            'text-lg text-white/70 leading-relaxed mt-6 mb-12',
            isGeorgian && 'font-georgian'
          )}>
            {getText(aboutContent.whatWeBuild.intro, aboutContent.whatWeBuild.introGe)}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {aboutContent.whatWeBuild.cards.slice(0, 4).map((card, idx) => (
              <motion.a
                key={idx}
                href={card.href}
                className="group block p-6 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className={cn(
                  'text-lg text-white mb-3',
                  isGeorgian && 'font-georgian'
                )}>
                  {getText(card.title, card.titleGe)}
                </h3>
                <p className={cn(
                  'text-sm text-white/50 leading-relaxed',
                  isGeorgian && 'font-georgian'
                )}>
                  {getText(card.body, card.bodyGe)}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Expandable for additional cards if more than 4 */}
          {aboutContent.whatWeBuild.cards.length > 4 && (
            <div className="mt-8">
              <ExpandableSection
                summary={getText('View all programs', 'იხილეთ ყველა პროგრამა')}
                summaryGe="იხილეთ ყველა პროგრამა"
                className="text-white/60"
              >
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {aboutContent.whatWeBuild.cards.slice(4).map((card, idx) => (
                    <a
                      key={idx}
                      href={card.href}
                      className="group block p-6 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                    >
                      <h3 className={cn(
                        'text-lg text-white mb-3',
                        isGeorgian && 'font-georgian'
                      )}>
                        {getText(card.title, card.titleGe)}
                      </h3>
                      <p className={cn(
                        'text-sm text-white/50 leading-relaxed',
                        isGeorgian && 'font-georgian'
                      )}>
                        {getText(card.body, card.bodyGe)}
                      </p>
                    </a>
                  ))}
                </div>
              </ExpandableSection>
            </div>
          )}
        </FoundationSection>

        {/* Closing vow */}
        <FoundationSection 
          id="closing"
          variant="white"
          heading={getText(aboutContent.closing.heading, aboutContent.closing.headingGe)}
          headingGe={aboutContent.closing.headingGe}
        >
          <div className={cn(
            'space-y-4 mt-6 mb-8',
            isGeorgian && 'font-georgian'
          )}>
            {/* Show first 2 vows */}
            {aboutContent.closing.vows.slice(0, 2).map((vow, idx) => (
              <p key={idx} className="text-lg text-navy/70 leading-relaxed">
                <span className="font-medium text-navy">{getText(vow.to, vow.toGe)}</span>{' '}
                {getText(vow.message, vow.messageGe)}
              </p>
            ))}
            
            {/* Expandable for additional vows */}
            {aboutContent.closing.vows.length > 2 && (
              <ExpandableSection
                summary={getText('Read all vows', 'წაიკითხეთ ყველა აღთქმა')}
                summaryGe="წაიკითხეთ ყველა აღთქმა"
              >
                <div className="space-y-4">
                  {aboutContent.closing.vows.slice(2).map((vow, idx) => (
                    <p key={idx} className="text-lg text-navy/70 leading-relaxed">
                      <span className="font-medium text-navy">{getText(vow.to, vow.toGe)}</span>{' '}
                      {getText(vow.message, vow.messageGe)}
                    </p>
                  ))}
                </div>
              </ExpandableSection>
            )}
          </div>
          
          <motion.p 
            className={cn(
              'text-xl text-navy leading-relaxed border-l-2 border-navy/20 pl-6 py-2',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {getText(aboutContent.closing.finalStatement, aboutContent.closing.finalStatementGe)}
          </motion.p>
        </FoundationSection>

        {/* FAQ redirect */}
        <FoundationSection variant="muted" size="compact">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className={cn(
                'text-2xl text-navy mb-2',
                isGeorgian && 'font-georgian'
              )}>
                {getText('Questions?', 'კითხვები?')}
              </h3>
              <p className={cn(
                'text-navy/60',
                isGeorgian && 'font-georgian'
              )}>
                {getText('Find detailed answers about our mission and methods.', 'იპოვეთ დეტალური პასუხები ჩვენი მისიისა და მეთოდების შესახებ.')}
              </p>
            </div>
            <Link
              to={getLocalizedPath('/faq?category=mission')}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy hover:bg-navy hover:text-white transition-colors',
                isGeorgian && 'font-georgian'
              )}
            >
              <span>{getText('View FAQ', 'იხილეთ FAQ')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FoundationSection>

        {/* Last updated */}
        <div className="container mx-auto px-4 py-8">
          <p className="text-xs text-navy/30">
            {getText(aboutContent.meta.lastUpdated, aboutContent.meta.lastUpdatedGe)}
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default About;
