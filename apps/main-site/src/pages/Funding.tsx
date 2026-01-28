import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import FoundationSection from '@/components/layout/FoundationSection';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import { ArrowRight, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Funding: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const pageTitle = isGeorgian 
    ? 'დაფინანსება და დამოუკიდებლობა — საქართველოს სამოქალაქო საბჭო' 
    : 'Funding & Independence — Civic Council of Georgia';
  const pageDescription = isGeorgian 
    ? 'როგორ ფინანსდება CCG და როგორ ვიცავთ დამოუკიდებლობას.'
    : 'How CCG is funded and how we protect independence.';

  useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription]);

  const getText = (en: string, ge: string) => isGeorgian ? ge : en;

  return (
    <Layout>
      <article className="min-h-screen bg-white">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />

        {/* Hero Section */}
        <FoundationSection size="hero" variant="white">
          <motion.span
            className="font-mono text-xs uppercase tracking-[0.2em] text-navy/40 block mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {getText('Institutional Posture', 'ინსტიტუციური პოზიცია')}
          </motion.span>
          
          <motion.h1
            className={cn(
              'font-narrative text-4xl md:text-5xl lg:text-6xl tracking-tight text-navy leading-[1.1] mb-8',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {getText('Funding & Independence', 'დაფინანსება და დამოუკიდებლობა')}
          </motion.h1>

          <motion.p
            className={cn(
              'font-narrative text-xl md:text-2xl text-navy/60 leading-relaxed max-w-2xl mb-10',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {getText(
              'An institution that can be captured through its purse is no institution at all.',
              'ინსტიტუცია, რომელიც შეიძლება ხელში ჩაიგდონ მისი საფულის მეშვეობით, საერთოდ არ არის ინსტიტუცია.'
            )}
          </motion.p>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PhotoPlaceholder 
              label={getText('Documentary photography', 'დოკუმენტური ფოტოგრაფია')}
              aspectRatio="2/1"
              className="max-w-xl"
            />
          </motion.div>
        </FoundationSection>

        {/* Core Position - Muted background */}
        <FoundationSection 
          variant="muted"
          heading={getText('Our Position', 'ჩვენი პოზიცია')}
          headingGe="ჩვენი პოზიცია"
        >
          <div className={cn(
            'font-narrative text-lg text-navy/70 leading-relaxed space-y-6 mt-6',
            isGeorgian && 'font-georgian'
          )}>
            <p>
              {getText(
                'We do not accept funding from foreign governments. This prohibition is categorical—not because all government funding is corrupt, but because the symbolic clarity of refusal is essential.',
                'ჩვენ არ ვიღებთ დაფინანსებას უცხო მთავრობებისგან. ეს აკრძალვა კატეგორიულია—არა იმიტომ, რომ მთავრობის ყველა დაფინანსება კორუმპირებულია, არამედ იმიტომ, რომ უარყოფის სიმბოლური სიცხადე აუცილებელია.'
              )}
            </p>
            <p>
              {getText(
                'Donors do not buy findings. Donors do not buy silence. Donors do not buy removal from The List. This principle admits no exception.',
                'დონორები არ ყიდულობენ დასკვნებს. დონორები არ ყიდულობენ სიჩუმეს. დონორები არ ყიდულობენ სიიდან წაშლას. ეს პრინციპი არ უშვებს გამონაკლისს.'
              )}
            </p>
          </div>

          <motion.div 
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to={getLocalizedPath('/faq?category=funding')}
              className={cn(
                'inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors',
                isGeorgian && 'font-georgian'
              )}
            >
              <span className="text-sm underline underline-offset-4">
                {getText('See detailed funding policies in FAQ', 'იხილეთ დაფინანსების დეტალური პოლიტიკა FAQ-ში')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </FoundationSection>

        {/* Support the Work - White */}
        <FoundationSection 
          variant="white"
          heading={getText('Support the Work', 'მხარი დაუჭირეთ მუშაობას')}
          headingGe="მხარი დაუჭირეთ მუშაობას"
        >
          <div className={cn(
            'font-narrative text-lg text-navy/70 leading-relaxed space-y-6 mt-6',
            isGeorgian && 'font-georgian'
          )}>
            <p>
              {getText(
                'If you choose to support the Council, we ask that you support the work as infrastructure: the systems that protect witnesses, the protocols that preserve evidence, the capacity that enables documentation at scale.',
                'თუ გადაწყვეტთ საბჭოს მხარდაჭერას, გთხოვთ, მხარი დაუჭიროთ მუშაობას როგორც ინფრასტრუქტურას: სისტემებს, რომლებიც იცავენ მოწმეებს, პროტოკოლებს, რომლებიც ინახავენ მტკიცებულებებს, შესაძლებლობას, რომელიც უზრუნველყოფს დოკუმენტაციას.'
              )}
            </p>
            <p className="text-navy/50">
              {getText(
                'You are not purchasing outcomes—you are investing in the architecture of accountability itself.',
                'თქვენ არ ყიდულობთ შედეგებს—თქვენ ინვესტირებას აკეთებთ თავად ანგარიშვალდებულების არქიტექტურაში.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <PhotoPlaceholder 
              label={getText('Team at work', 'გუნდი სამუშაოზე')}
              aspectRatio="4/3"
            />
            <div className="flex flex-col justify-center">
              <a
                href="mailto:funding@sabcho.org"
                className={cn(
                  'inline-flex items-center gap-3 px-6 py-4 bg-navy text-white hover:bg-navy/90 transition-colors',
                  isGeorgian && 'font-georgian'
                )}
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">{getText('Contact about supporting', 'დაგვიკავშირდით მხარდაჭერასთან დაკავშირებით')}</span>
              </a>
              <p className="font-mono text-xs text-navy/40 mt-4">
                funding@sabcho.org
              </p>
            </div>
          </div>
        </FoundationSection>

        {/* Transparency - Navy background */}
        <FoundationSection 
          variant="navy"
          size="compact"
          heading={getText('Transparency', 'გამჭვირვალობა')}
          headingGe="გამჭვირვალობა"
        >
          <p className={cn(
            'font-narrative text-lg text-white/70 leading-relaxed mt-6',
            isGeorgian && 'font-georgian'
          )}>
            {getText(
              'We publish an annual transparency report with revenue categories, major expenditure categories, governance disclosures, and required public filings.',
              'ჩვენ ვაქვეყნებთ ყოველწლიურ გამჭვირვალობის ანგარიშს შემოსავლების კატეგორიებით, ძირითადი ხარჯების კატეგორიებით, მმართველობის გამჟღავნებებითა და საჯარო დეკლარაციებით.'
            )}
          </p>
        </FoundationSection>

        {/* FAQ Redirect - Muted */}
        <FoundationSection variant="muted" size="compact">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className={cn(
                'font-narrative text-2xl text-navy mb-2',
                isGeorgian && 'font-georgian'
              )}>
                {getText('Questions about funding?', 'კითხვები დაფინანსების შესახებ?')}
              </h3>
              <p className={cn(
                'text-navy/60',
                isGeorgian && 'font-georgian'
              )}>
                {getText(
                  'Find detailed answers in our FAQ section.',
                  'იპოვეთ დეტალური პასუხები ჩვენს FAQ განყოფილებაში.'
                )}
              </p>
            </div>
            <Link
              to={getLocalizedPath('/faq?category=funding')}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy hover:bg-navy hover:text-white transition-colors',
                isGeorgian && 'font-georgian'
              )}
            >
              <span>{getText('View Funding FAQ', 'იხილეთ დაფინანსების FAQ')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FoundationSection>

        {/* Last updated */}
        <div className="container mx-auto px-4 py-8">
          <p className="font-mono text-xs text-navy/30">
            {getText('Last updated: January 2026', 'ბოლო განახლება: იანვარი 2026')}
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default Funding;
