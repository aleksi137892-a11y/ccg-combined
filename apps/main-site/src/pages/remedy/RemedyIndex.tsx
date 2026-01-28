// Remedy Section Landing Page
// Museum-grade exhibition design - curated navigation hub

import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { 
  ExhibitionSection, 
  ExhibitionHeading, 
  ExhibitionText 
} from '@/components/exhibition';
import { 
  exhibitionReveal, 
  staggerContainer, 
  staggerItem,
  viewportConfig 
} from '@/lib/exhibitionAnimations';

// Exhibition-style pathway component - typographic, no cards
interface PathwayProps {
  title: string;
  titleGe: string;
  description: string;
  descriptionGe: string;
  href: string;
  isGeorgian: boolean;
  index: number;
}

function RemedyPathway({ 
  title, 
  titleGe, 
  description, 
  descriptionGe, 
  href, 
  isGeorgian,
  index
}: PathwayProps) {
  const langPrefix = isGeorgian ? '/ge' : '';
  
  return (
    <motion.div
      variants={staggerItem}
      className="group"
    >
      <Link
        to={`${langPrefix}${href}`}
        className="block py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-3xl">
          {/* Section number - subtle, not decorative */}
          <span className="text-exhibition-caption block mb-4 opacity-40">
            {String(index + 1).padStart(2, '0')}
          </span>
          
          {/* Title - exhibition heading scale */}
          <h3 className={cn(
            'text-exhibition-heading mb-6 md:mb-8 group-hover:opacity-70 transition-opacity duration-500',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? titleGe : title}
          </h3>
          
          {/* Description - wall text style */}
          <p className={cn(
            'text-exhibition-body max-w-[50ch]',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? descriptionGe : description}
          </p>
          
          {/* Subtle underline on hover */}
          <span className="inline-block mt-8 text-exhibition-caption opacity-50 group-hover:opacity-80 transition-opacity duration-500 border-b border-navy/20 pb-1">
            {isGeorgian ? 'გაიგეთ მეტი' : 'Learn more'}
          </span>
        </div>
      </Link>
      
      {/* Separator line */}
      <div className="w-full h-px bg-navy/8" />
    </motion.div>
  );
}

const RemedyIndex: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const langPrefix = isGeorgian ? '/ge' : '';

  const pathways = [
    {
      title: 'Sanctions Submissions',
      titleGe: 'სანქციების წარდგენა',
      description: 'We prepare and submit evidence packages to sanctions authorities—Magnitsky, Global Human Rights, and EU frameworks—documenting individuals and entities enabling state capture.',
      descriptionGe: 'ჩვენ ვამზადებთ და წარვადგენთ მტკიცებულებების პაკეტებს სანქციების ორგანოებში—მაგნიტსკი, გლობალური ადამიანის უფლებები და EU ჩარჩოები—ინდივიდებისა და ერთეულების დოკუმენტირებით, რომლებიც ხელს უწყობენ სახელმწიფოს ხელში ჩაგდებას.',
      href: '/remedy/sanctions',
    },
    {
      title: 'Strategic Litigation',
      titleGe: 'სტრატეგიული სამართალწარმოება',
      description: 'We support strategic litigation before international and domestic courts—ECHR, civil claims, asset recovery—providing evidence and coordination with legal partners.',
      descriptionGe: 'ჩვენ ვუჭერთ მხარს სტრატეგიულ სამართალწარმოებას საერთაშორისო და შიდა სასამართლოებში—ადამიანის უფლებათა ევროპული სასამართლო, სამოქალაქო სარჩელები, აქტივების აღდგენა—მტკიცებულებებისა და იურიდიულ პარტნიორებთან კოორდინაციის უზრუნველყოფით.',
      href: '/remedy/litigation',
    },
    {
      title: 'Criminal Dossiers',
      titleGe: 'სისხლის სამართლის დოსიეები',
      description: 'We build structured dossiers for use by prosecutors and investigators—organizing evidence, mapping command structures, and establishing timelines for potential criminal proceedings.',
      descriptionGe: 'ჩვენ ვაშენებთ სტრუქტურირებულ დოსიეებს პროკურორებისა და გამომძიებლების გამოყენებისთვის—მტკიცებულებების ორგანიზება, ბრძანებათა სტრუქტურების მაპინგი და პოტენციური სისხლის სამართლის საქმეების ვადების დადგენა.',
      href: '/remedy/criminal-dossiers',
    },
    {
      title: 'International Mechanisms',
      titleGe: 'საერთაშორისო მექანიზმები',
      description: 'We engage with UN bodies, treaty organizations, the ICC, and OSCE to ensure documented violations reach appropriate forums for review and action.',
      descriptionGe: 'ჩვენ ვთანამშრომლობთ გაეროს ორგანოებთან, ხელშეკრულების ორგანიზაციებთან, ICC-თან და ეუთოსთან, რათა დოკუმენტირებული დარღვევები მიაღწიოს შესაბამის ფორუმებს განხილვისა და მოქმედებისთვის.',
      href: '/remedy/international',
    },
  ];

  return (
    <Layout>
      <article className="min-h-screen bg-background">
        
        {/* Hero Section - Exhibition Style */}
        <ExhibitionSection 
          spacing="vast" 
          layout="offset-left"
          className="border-t-2 border-navy"
        >
          <motion.div
            initial={exhibitionReveal.initial}
            animate={exhibitionReveal.animate}
            transition={exhibitionReveal.transition}
          >
            {/* Eyebrow */}
            <span className={cn(
              "text-exhibition-eyebrow block mb-8",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'ფორუმი სამართლიანობისთვის' : 'Forum for Justice'}
            </span>
            
            {/* Title */}
            <h1 className={cn(
              "text-exhibition-display mb-10 md:mb-12",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'გამოსწორება' : 'Remedy'}
            </h1>
            
            {/* Subtitle as quiet declaration */}
            <p className={cn(
              "text-exhibition-subheading text-navy/60 mb-12 md:mb-16",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'ჩანაწერიდან შედეგამდე' : 'From Record to Consequence'}
            </p>
            
            {/* Lead text */}
            <ExhibitionText 
              variant="lead" 
              maxWidth="prose"
              childrenGe="სამართლიანობის ფორუმი მხოლოდ არ იღებს და არ ასახავს—ის მტკიცებულებებს კანონიერი შედეგისკენ მიმართავს. ჩვენ ვმუშაობთ პარტნიორებთან იურისდიქციებში, რათა უზრუნველვყოთ, რომ დოკუმენტირებული ზიანი და დარღვევა ანგარიშვალდებულებას წარმოშობს."
              noAnimation
            >
              The Forum for Justice does not only receive and document—it routes evidence toward lawful consequence. We work with partners across jurisdictions to ensure that documented harm and wrongdoing produce accountability.
            </ExhibitionText>
          </motion.div>
        </ExhibitionSection>

        {/* Visual pause */}
        <div className="h-px w-full bg-navy/8" />

        {/* Pathways Section - Prose-based navigation */}
        <ExhibitionSection 
          spacing="generous" 
          layout="offset-left"
        >
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            {pathways.map((pathway, idx) => (
              <RemedyPathway
                key={idx}
                {...pathway}
                isGeorgian={isGeorgian}
                index={idx}
              />
            ))}
          </motion.div>
        </ExhibitionSection>

        {/* Editorial pause - vast spacing */}
        <div className="h-24 md:h-40" />

        {/* Partner Network & IIM - Asymmetric two-column */}
        <ExhibitionSection 
          spacing="generous" 
          layout="full-width"
          background="parchment"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
              
              {/* Partner Network */}
              <motion.div
                initial={exhibitionReveal.initial}
                whileInView={exhibitionReveal.animate}
                viewport={viewportConfig}
                transition={exhibitionReveal.transition}
                className="lg:pt-12"
              >
                <span className={cn(
                  "text-exhibition-eyebrow block mb-6",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian ? 'რესურსები და ინფორმაცია' : 'Resources & Information'}
                </span>
                
                <h2 className={cn(
                  "text-exhibition-heading mb-8",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian 
                    ? 'საერთაშორისო ანგარიშვალდებულების გზამკვლევი' 
                    : 'Guide to International Accountability'}
                </h2>
                
                <p className={cn(
                  "text-exhibition-body mb-10 max-w-[44ch]",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian 
                    ? 'ინფორმაციული კონტექსტი მაგნიტსკის სანქციებზე, უნივერსალურ იურისდიქციაზე და საერთაშორისო ანგარიშვალდებულების მექანიზმებზე. ეს არ არის იურიდიული რჩევა.' 
                    : 'Informational context on Magnitsky sanctions, universal jurisdiction, and international accountability mechanisms. This is not legal advice.'}
                </p>
                
                <Link
                  to={`${langPrefix}/remedy/partners`}
                  className="exhibition-link-standalone"
                >
                  <span className={isGeorgian ? 'font-georgian' : ''}>
                    {isGeorgian ? 'გზამკვლევის ნახვა' : 'View the guide'}
                  </span>
                </Link>
              </motion.div>
              
              {/* IIM-Georgia */}
              <motion.div
                initial={exhibitionReveal.initial}
                whileInView={exhibitionReveal.animate}
                viewport={viewportConfig}
                transition={{ ...exhibitionReveal.transition, delay: 0.2 }}
              >
                <span className={cn(
                  "text-exhibition-eyebrow block mb-6",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian ? 'აქტიური გამოძიება' : 'Active Investigation'}
                </span>
                
                <h2 className="text-exhibition-heading mb-8">
                  IIM‑Georgia
                </h2>
                
                <p className={cn(
                  "text-exhibition-body mb-10 max-w-[44ch]",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian 
                    ? 'დამოუკიდებელი საერთაშორისო მექანიზმი მძიმე დარღვევებისთვის: დაცული ჩვენება, სამედიცინო დოკუმენტაცია, ბრძანებათა ჯაჭვის მუშაობა.' 
                    : 'Independent International Mechanism for grave violations: protected testimony, medical documentation, chain-of-command work.'}
                </p>
                
                <Link
                  to={`${langPrefix}/remedy/iimg`}
                  className="exhibition-link-standalone"
                >
                  <span className={isGeorgian ? 'font-georgian' : ''}>
                    {isGeorgian ? 'გაიგეთ მეტი IIM-Georgia-ზე' : 'Learn about IIM-Georgia'}
                  </span>
                </Link>
              </motion.div>
              
            </div>
          </div>
        </ExhibitionSection>

        {/* Related Links - Quiet footer navigation */}
        <ExhibitionSection 
          spacing="intimate" 
          layout="centered"
        >
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 1.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              { label: 'Make an Appeal', labelGe: 'მიმართვის გაკეთება', href: '/appeal' },
              { label: 'The Public Record', labelGe: 'საჯარო ჩანაწერი', href: '/record' },
              { label: 'Standards & Safeguards', labelGe: 'სტანდარტები და გარანტიები', href: '/standards' },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={`${langPrefix}${link.href}`}
                className="exhibition-link-quiet"
              >
                <span className={cn(
                  "text-exhibition-caption",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian ? link.labelGe : link.label}
                </span>
              </Link>
            ))}
          </motion.nav>
        </ExhibitionSection>
        
      </article>
    </Layout>
  );
};

export default RemedyIndex;