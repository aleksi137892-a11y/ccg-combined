import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { viewportOnce } from '@/lib/animations';
import FoundationSection from '@/components/layout/FoundationSection';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import { ExpandableSection } from '@/components/ui/expandable-section';
import { cn } from '@/lib/utils';
import { ProgramNav } from '@/components/layout/ProgramNav';

const Rustaveli = () => {
  const { language, getLocalizedPath } = useLanguage();
  const isGeorgian = language === 'ge';

  useEffect(() => {
    document.title = isGeorgian 
      ? 'რუსთაველის პროექტი | საბჭო' 
      : 'The Rustaveli Project | Sabcho';
  }, [isGeorgian]);

  const programs = [
    {
      title: isGeorgian ? 'სამოქალაქო კანონი' : 'Civic Canon',
      description: isGeorgian 
        ? 'ქართული სამოქალაქო ტრადიციის ძირითადი ტექსტები.'
        : 'Core texts of Georgian civic tradition.',
      href: '/canon'
    },
    {
      title: isGeorgian ? 'ღირსების მოძრაობა' : 'Movement of Dignity',
      description: isGeorgian 
        ? 'არაძალადობრივი წინააღმდეგობის პრინციპები.'
        : 'Principles of nonviolent resistance.',
      href: '/dignity'
    },
    {
      title: isGeorgian ? 'მემკვიდრეობა და ენა' : 'Heritage & Language',
      description: isGeorgian 
        ? 'კულტურული მემკვიდრეობის შენარჩუნება.'
        : 'Preservation of cultural heritage.',
      href: '/heritage'
    }
  ];

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        {/* Hero */}
        <FoundationSection size="hero" variant="white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "font-narrative text-4xl md:text-5xl lg:text-6xl text-navy mb-4",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian ? 'რუსთაველის პროექტი' : 'The Rustaveli Project'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={cn(
              "font-narrative text-lg text-navy/50 mb-8",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian ? 'სამოქალაქო მემკვიდრეობის დაცვა' : 'Safeguarding Civic Inheritance'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "font-narrative text-xl text-navy/70 max-w-2xl leading-relaxed",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian 
              ? 'ერი მეტია, ვიდრე მისი მტაცებლები. ჩვენ ვიცავთ სამოქალაქო მემკვიდრეობას—მეხსიერებას, ენას, ღირსებას.'
              : 'A nation is more than its captors. We safeguard civic inheritance—memory, language, dignity.'}
          </motion.p>
        </FoundationSection>

        {/* Photo */}
        <div className="container mx-auto px-4 -mt-8 mb-16">
          <div className="max-w-3xl">
            <PhotoPlaceholder 
              label="Georgian heritage" 
              aspectRatio="2/1" 
            />
          </div>
        </div>

        {/* Mission */}
        <FoundationSection variant="muted">
          <div className="border-l-2 border-navy pl-6">
            <p className={cn(
              "font-narrative text-lg text-navy",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? 'მისია: კულტურული იდენტობა არის სამოქალაქო წინააღმდეგობის ფორმა.'
                : 'Mission: Cultural identity is a form of civic resistance.'}
            </p>
          </div>
        </FoundationSection>

        {/* Why Rustaveli */}
        <FoundationSection 
          variant="white"
          heading={isGeorgian ? 'რატომ რუსთაველი?' : 'Why Rustaveli?'}
        >
          <p className={cn(
            "font-narrative text-base text-navy/70 leading-relaxed mt-6",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian 
              ? 'შოთა რუსთაველი განასახიერებს ქართულ კულტურულ იდენტობას და სამოქალაქო სათნოებას. მისი მემკვიდრეობა გვახსენებს, რომ ცივილიზაცია ეფუძნება არა მხოლოდ კანონებს, არამედ ღირებულებებს.'
              : 'Shota Rustaveli embodies Georgian cultural identity and civic virtue. His legacy reminds us that civilization is built not only on laws but on values.'}
          </p>
          
          <ExpandableSection 
            summary="Read more" 
            summaryGe="მეტის წაკითხვა"
            className="mt-6"
          >
            <p className={cn(
              "font-narrative text-base text-navy/60 leading-relaxed",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? '"ვეფხისტყაოსანი" არ არის მხოლოდ ეპოსი—ეს არის ეთიკური კოდექსი, რომელიც ასწავლის მეგობრობას, ლოიალობას და ღირსებას. ეს ღირებულებები რჩება აქტუალური ხელყოფის ეპოქაში.'
                : 'The Knight in the Panther\'s Skin is not merely an epic—it is an ethical code teaching friendship, loyalty, and dignity. These values remain vital in an era of capture.'}
            </p>
          </ExpandableSection>
        </FoundationSection>

        {/* Programs */}
        <FoundationSection 
          variant="navy"
          heading={isGeorgian ? 'პროგრამები' : 'Programs'}
        >
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={getLocalizedPath(program.href)}
                  className="block border border-white/20 p-6 hover:bg-white/5 transition-colors h-full"
                >
                  <h3 className={cn(
                    "font-narrative text-lg text-white mb-2",
                    isGeorgian && "font-georgian"
                  )}>
                    {program.title}
                  </h3>
                  <p className={cn(
                    "font-narrative text-sm text-white/60",
                    isGeorgian && "font-georgian"
                  )}>
                    {program.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </FoundationSection>

        {/* Solidarity Pledge */}
        <FoundationSection variant="white">
          <h2 className={cn(
            "font-narrative text-xl text-navy mb-4",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? 'სოლიდარობის აღთქმა' : 'Solidarity Pledge'}
          </h2>
          <p className={cn(
            "font-narrative text-base text-navy/60 mb-6",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian 
              ? 'შემოგვიერთდით ღირსების მოძრაობას.'
              : 'Join the Movement of Dignity.'}
          </p>
          <Link 
            to={getLocalizedPath('/solidarity-pledge')}
            className={cn(
              "inline-flex items-center px-6 py-3 bg-navy text-white text-sm hover:bg-navy/90 transition-colors",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian ? 'ხელი მოაწერეთ აღთქმას' : 'Sign the Pledge'}
          </Link>
        </FoundationSection>

        {/* Program Navigation */}
        <ProgramNav current="rustaveli" />
      </article>
    </Layout>
  );
};

export default Rustaveli;
