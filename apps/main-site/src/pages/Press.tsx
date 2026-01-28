import React from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { pressContent } from '@/data/pressContent';
import { Mail } from 'lucide-react';
import { viewportOnce } from '@/lib/animations';
import { Link } from 'react-router-dom';
import FoundationSection from '@/components/layout/FoundationSection';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import { ExpandableSection } from '@/components/ui/expandable-section';

const Press: React.FC = () => {
  const { language, getLocalizedPath } = useLanguage();
  const isGeorgian = language === 'ge';
  const content = pressContent;

  const pageTitle = isGeorgian 
    ? 'პრესა — საქართველოს სამოქალაქო საბჭო' 
    : 'Press — Civic Council of Georgia';
  const pageDescription = isGeorgian 
    ? 'პრეს-რელიზები, მედია მოთხოვნები და ახალი ამბები.'
    : 'Press releases, media inquiries, and news coverage.';

  React.useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription]);

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
            className={`font-narrative text-xl text-navy/60 max-w-2xl leading-relaxed ${isGeorgian ? 'font-georgian' : ''}`}
          >
            {isGeorgian 
              ? 'თავისუფალი პრესა არ არის კომენტარი—ეს არის კითხვების დასმის დისციპლინა.'
              : 'A free press is not commentary—it is the discipline of asking questions.'}
          </motion.blockquote>
        </FoundationSection>

        {/* Photo placeholder */}
        <div className="container mx-auto px-4 -mt-8 mb-16">
          <div className="max-w-3xl">
            <PhotoPlaceholder 
              label="Press materials" 
              aspectRatio="2/1" 
            />
          </div>
        </div>

        {/* Contact Cards */}
        <FoundationSection variant="muted">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Press inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <h2 className={`font-narrative text-xl text-navy mb-3 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'პრესის მოთხოვნები' : 'Press inquiries'}
              </h2>
              <p className={`font-narrative text-base text-navy/60 mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian 
                  ? 'ინტერვიუს მოთხოვნები, ფონური ბრიფინგები, დოკუმენტებზე დაფუძნებული კითხვები.'
                  : 'Interview requests, background briefings, document-based questions.'}
              </p>
              <a 
                href="mailto:press@sabcho.org"
                className="inline-flex items-center gap-2 text-navy text-sm border-b border-navy/30 pb-0.5 hover:border-navy transition-colors"
              >
                <Mail className="w-4 h-4" />
                press@sabcho.org
              </a>
            </motion.div>

            {/* Support journalism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className={`font-narrative text-xl text-navy mb-3 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian ? 'საგამოძიებო ჟურნალისტიკა' : 'Investigative journalism'}
              </h2>
              <p className={`font-narrative text-base text-navy/60 mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
                {isGeorgian 
                  ? 'მხარი დაუჭირეთ დამოუკიდებელ გამოცემებს პირდაპირ.'
                  : 'Support independent outlets directly.'}
              </p>
              <Link 
                to={getLocalizedPath('/about/funding')}
                className={`inline-flex items-center text-sm text-navy border-b border-navy/30 pb-0.5 hover:border-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian ? 'დაფინანსება' : 'Funding & Independence'} →
              </Link>
            </motion.div>
          </div>
        </FoundationSection>

        {/* Attribution Guidelines */}
        <FoundationSection 
          variant="white"
          heading={isGeorgian ? 'ატრიბუციის წესები' : 'Attribution Guidelines'}
        >
          <p className={`font-narrative text-base text-navy/60 leading-relaxed mt-6 ${isGeorgian ? 'font-georgian' : ''}`}>
            {isGeorgian 
              ? 'როდესაც ციტირებთ CCG-ის მასალებს, გთხოვთ მიუთითოთ: "საქართველოს სამოქალაქო საბჭო (CCG)". ინტერვიუების ატრიბუცია დამოკიდებულია შეთანხმებაზე.'
              : 'When citing CCG materials, please attribute to: "Civic Council of Georgia (CCG)". Interview attribution depends on prior agreement.'}
          </p>
          
          <ExpandableSection 
            summary="Full media guidelines" 
            summaryGe="სრული მედია სახელმძღვანელო"
            className="mt-6"
          >
            <div className={`space-y-4 ${isGeorgian ? 'font-georgian' : ''}`}>
              <p className="font-narrative text-base text-navy/60 leading-relaxed">
                {isGeorgian 
                  ? 'CCG ხელმისაწვდომია ფონური ბრიფინგებისთვის კონკრეტულ თემებზე. ატრიბუციის პირობები უნდა შეთანხმდეს ინტერვიუმდე.'
                  : 'CCG is available for background briefings on specific topics. Attribution terms must be agreed before any interview.'}
              </p>
              <p className="font-narrative text-base text-navy/60 leading-relaxed">
                {isGeorgian 
                  ? 'ჩვენ არ ვაძლევთ კომენტარს მიმდინარე გამოძიებებზე. გამოქვეყნებული დასკვნები საჯაროა და შეიძლება ციტირება სათანადო ატრიბუციით.'
                  : 'We do not comment on ongoing investigations. Published findings are public record and may be quoted with proper attribution.'}
              </p>
            </div>
          </ExpandableSection>
        </FoundationSection>

        {/* FAQ Redirect */}
        <FoundationSection variant="muted" size="compact">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className={`font-narrative text-base text-navy/70 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian 
                ? 'კითხვები პრესასთან მუშაობაზე?' 
                : 'Questions about working with press?'}
            </p>
            <Link
              to={getLocalizedPath('/about/faq?category=press')}
              className={`inline-flex items-center text-sm text-navy border-b border-navy/30 hover:border-navy transition-colors ${isGeorgian ? 'font-georgian' : ''}`}
            >
              {isGeorgian ? 'იხილეთ FAQ' : 'See FAQ'} →
            </Link>
          </div>
        </FoundationSection>

        {/* Minimal footer */}
        <section className="py-12 text-center">
          <a
            href="mailto:press@sabcho.org"
            className="font-narrative text-lg text-navy hover:text-navy/70 transition-colors"
          >
            press@sabcho.org
          </a>
        </section>
      </article>
    </Layout>
  );
};

export default Press;
