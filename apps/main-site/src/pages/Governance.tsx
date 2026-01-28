import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import FoundationSection from '@/components/layout/FoundationSection';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Governance: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const getText = (en: string, ge: string) => isGeorgian ? ge : en;

  const governanceBodies = [
    {
      title: 'Board',
      titleGe: 'საბჭო',
      desc: 'Oversees fiduciary duty, compliance, and institutional independence.',
      descGe: 'ზედამხედველობს ფიდუციარულ მოვალეობას, შესაბამისობას და ინსტიტუციურ დამოუკიდებლობას.',
    },
    {
      title: 'International Advisory Council',
      titleGe: 'საერთაშორისო საკონსულტაციო საბჭო',
      desc: 'Strengthens rigor across rule of law, investigations, and transitional justice.',
      descGe: 'აძლიერებს სიზუსტეს კანონის უზენაესობის, გამოძიებებისა და გარდამავალი მართლმსაჯულების სფეროებში.',
    },
    {
      title: 'Protected Georgian Civic Panel',
      titleGe: 'დაცული ქართული სამოქალაქო პანელი',
      desc: 'Jurists and investigators who cannot be publicly named due to safety concerns.',
      descGe: 'იურისტები და გამომძიებლები, რომლებიც საჯაროდ ვერ დასახელდებიან უსაფრთხოების გამო.',
    },
  ];

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
            {getText('Institutional Governance', 'ინსტიტუციური მმართველობა')}
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
            {getText('Governance', 'მმართველობა')}
          </motion.h1>

          <motion.p
            className={cn(
              'font-narrative text-xl md:text-2xl text-navy/60 leading-relaxed max-w-2xl',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {getText(
              'Public standards. Protected people. Accountable procedures.',
              'საჯარო სტანდარტები. დაცული ადამიანები. ანგარიშვალდებული პროცედურები.'
            )}
          </motion.p>
        </FoundationSection>

        {/* Pull quote - Muted */}
        <FoundationSection variant="muted" size="compact">
          <motion.blockquote
            className={cn(
              'font-narrative text-2xl md:text-3xl text-navy leading-snug max-w-3xl',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {getText(
              'Legitimacy must be earned, not claimed. We earn it through structure: independence rules, review gates, corrections discipline.',
              'ლეგიტიმურობა უნდა მოიპოვო, არა მოითხოვო. ჩვენ ვიძენთ მას სტრუქტურით: დამოუკიდებლობის წესები, განხილვის კარები, გამოსწორების დისციპლინა.'
            )}
          </motion.blockquote>
        </FoundationSection>

        {/* Photo placeholder */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <PhotoPlaceholder 
                label={getText('Governance structure', 'მმართველობის სტრუქტურა')}
                aspectRatio="16/9"
              />
            </div>
          </div>
        </section>

        {/* Governance Structure */}
        <FoundationSection 
          id="structure"
          variant="white"
          heading={getText('Structure', 'სტრუქტურა')}
          headingGe="სტრუქტურა"
        >
          <div className="mt-8 space-y-4">
            {governanceBodies.map((body, idx) => (
              <motion.div 
                key={idx}
                className="p-6 border border-navy/10 hover:border-navy/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className={cn(
                  'font-narrative text-lg text-navy mb-2',
                  isGeorgian && 'font-georgian'
                )}>
                  {getText(body.title, body.titleGe)}
                </h3>
                <p className={cn(
                  'font-narrative text-navy/60 leading-relaxed',
                  isGeorgian && 'font-georgian'
                )}>
                  {getText(body.desc, body.descGe)}
                </p>
              </motion.div>
            ))}
          </div>
        </FoundationSection>

        {/* Transparency - Navy */}
        <FoundationSection 
          variant="navy"
          size="compact"
          heading={getText('Independence', 'დამოუკიდებლობა')}
          headingGe="დამოუკიდებლობა"
        >
          <div className={cn(
            'font-narrative text-lg text-white/70 leading-relaxed space-y-4 mt-6',
            isGeorgian && 'font-georgian'
          )}>
            <p>
              {getText(
                'CCG does not accept funding from foreign governments. We do not accept funding that conditions findings, listings, or editorial decisions.',
                'CCG არ იღებს დაფინანსებას უცხო მთავრობებისგან. ჩვენ არ ვიღებთ დაფინანსებას, რომელიც პირობებით უკავშირდება დასკვნებს, ჩამონათვალებს ან სარედაქციო გადაწყვეტილებებს.'
              )}
            </p>
          </div>

          <Link
            to={getLocalizedPath('/funding')}
            className="inline-flex items-center gap-2 mt-8 text-white/70 hover:text-white transition-colors"
          >
            <span className={cn('text-sm underline underline-offset-4', isGeorgian && 'font-georgian')}>
              {getText('Read our funding policy', 'წაიკითხეთ ჩვენი დაფინანსების პოლიტიკა')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FoundationSection>

        {/* Nonpartisan note */}
        <FoundationSection variant="muted" size="compact">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className={cn(
                'font-narrative text-2xl text-navy mb-4',
                isGeorgian && 'font-georgian'
              )}>
                {getText('Nonpartisan Institution', 'არაპარტიული ინსტიტუცია')}
              </h3>
              <p className={cn(
                'font-narrative text-navy/70 leading-relaxed',
                isGeorgian && 'font-georgian'
              )}>
                {getText(
                  'CCG is not a political party, opposition bloc, or campaign organ. Nonpartisanship is structural, not rhetorical.',
                  'CCG არ არის პოლიტიკური პარტია, ოპოზიციური ბლოკი ან საკამპანიო ორგანო. არაპარტიულობა სტრუქტურულია, არა რიტორიკული.'
                )}
              </p>
            </div>
            <Link
              to={getLocalizedPath('/faq?category=nonpartisanship')}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy hover:bg-navy hover:text-white transition-colors shrink-0',
                isGeorgian && 'font-georgian'
              )}
            >
              <span>{getText('Learn more in FAQ', 'გაიგეთ მეტი FAQ-ში')}</span>
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

export default Governance;
