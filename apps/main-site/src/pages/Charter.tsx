import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { charterContent } from '@/data/charterContent';
import { viewportOnce } from '@/lib/animations';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import JumpToNav from '@/components/institutional/JumpToNav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Charter: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();
  const content = charterContent;

  // Generate jump-to items from articles
  const jumpToItems = content.articles.map((article) => ({
    id: article.id,
    label: `${article.numeral}`,
    labelGe: `${article.numeral}`,
  }));

  useEffect(() => {
    document.title = isGeorgian 
      ? 'ქარტია | CCG' 
      : 'The Charter | CCG';
    
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`font-narrative text-4xl md:text-5xl text-navy mb-8 ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian ? content.meta.titleGe : content.meta.title}
              </motion.h1>
              
              {/* Epigraph */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`font-narrative text-lg md:text-xl text-navy/60 italic border-l-2 border-navy/20 pl-6 ${isGeorgian ? 'font-georgian' : ''}`}
              >
                "{isGeorgian ? content.epigraph.ge : content.epigraph.en}"
              </motion.blockquote>
            </div>
          </div>
        </section>

        {/* Photo placeholder */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl">
            <PhotoPlaceholder 
              label="Founding document" 
              aspectRatio="16/9" 
            />
          </div>
        </div>

        {/* Jump to navigation for articles */}
        <JumpToNav items={jumpToItems} sticky />

        {/* Articles Accordion */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl">
            <Accordion type="single" collapsible defaultValue="preamble">
              {content.articles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  <AccordionItem
                    id={article.id}
                    value={article.id}
                    className="border-b border-navy/10 first:border-t scroll-mt-32"
                  >
                    <AccordionTrigger className="py-5 hover:no-underline group text-left">
                      <div className="flex items-baseline gap-4">
                        {/* Article numeral - prominent styling */}
                        <span 
                          className="font-serif text-2xl text-navy/30 group-hover:text-navy/50 transition-colors min-w-[2.5rem] text-right"
                          aria-hidden="true"
                        >
                          {article.numeral}
                        </span>
                        <span className={`font-narrative text-base text-navy group-hover:text-navy/70 transition-colors ${isGeorgian ? 'font-georgian' : ''}`}>
                          {isGeorgian ? article.titleGe : article.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      {/* Indented to align with title, not numeral */}
                      <div className={`ml-[3.5rem] font-narrative text-base text-navy/60 leading-relaxed space-y-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                        {(isGeorgian ? article.contentGe : article.content).map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>

        {/* FAQ Redirect */}
        <section className="py-12 bg-navy/[0.02]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className={`font-narrative text-base text-navy/70 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian 
                  ? 'კითხვები ქარტიაზე?' 
                  : 'Questions about the Charter?'}
              </p>
              <Link
                to={getLocalizedPath('/about/faq')}
                className={`inline-flex items-center text-sm text-navy border-b border-navy/30 hover:border-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian ? 'იხილეთ FAQ' : 'See FAQ'} →
              </Link>
            </div>
          </div>
        </section>

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

export default Charter;
