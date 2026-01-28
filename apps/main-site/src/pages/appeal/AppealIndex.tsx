// Appeal Section Landing Page
// Visual triage navigator with three intake pathway cards (Harm, Wrongdoing, Inside)

import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Eye,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProgramNav } from '@/components/layout/ProgramNav';

interface PathwayCardProps {
  title: string;
  titleGe: string;
  subtitle: string;
  subtitleGe: string;
  description: string;
  descriptionGe: string;
  icon: React.ElementType;
  href: string;
  eligibility: string[];
  eligibilityGe: string[];
  accentColor: string;
  isGeorgian: boolean;
}

function PathwayCard({ 
  title, 
  titleGe, 
  subtitle,
  subtitleGe,
  description, 
  descriptionGe, 
  icon: Icon, 
  href, 
  eligibility,
  eligibilityGe,
  accentColor,
  isGeorgian 
}: PathwayCardProps) {
  const langPrefix = isGeorgian ? '/ge' : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`${langPrefix}${href}`}
        className={cn(
          'group block h-full border-l-2 transition-all duration-300',
          'bg-card hover:bg-muted/30',
          'border-border hover:border-primary',
          accentColor
        )}
      >
        <div className="p-6 md:p-8">
          {/* Subtitle / Category */}
          <p className={cn(
            'text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? subtitleGe : subtitle}
          </p>

          {/* Title */}
          <h3 className={cn(
            'text-xl md:text-2xl font-display text-foreground mb-4',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? titleGe : title}
          </h3>

          {/* Description */}
          <p className={cn(
            'text-muted-foreground mb-6 leading-relaxed text-body',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? descriptionGe : description}
          </p>

          {/* Eligibility criteria */}
          <div className="mb-6 border-t border-border pt-4">
            <p className={cn(
              'text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-3',
              isGeorgian && 'font-georgian'
            )}>
              {isGeorgian ? 'ვინ შეიძლება მიმართოს' : 'Who This Is For'}
            </p>
            <ul className="space-y-2">
              {(isGeorgian ? eligibilityGe : eligibility).map((item, idx) => (
                <li 
                  key={idx}
                  className={cn(
                    'flex items-start gap-3 text-sm text-foreground/80',
                    isGeorgian && 'font-georgian'
                  )}
                >
                  <span className="w-1 h-1 bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className={cn(
            'flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all text-sm',
            isGeorgian && 'font-georgian'
          )}>
            {isGeorgian ? 'დაიწყე მიმართვა' : 'Begin Appeal'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const AppealIndex: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const langPrefix = isGeorgian ? '/ge' : '';

  const pathways = [
    {
      title: 'I Have Been Harmed',
      titleGe: 'მე დაზარალდი',
      subtitle: 'Direct Victim',
      subtitleGe: 'პირდაპირი მსხვერპლი',
      description: 'You or someone you represent has suffered personal harm as a direct result of state capture, abuse of power, or targeted action by authorities or their agents.',
      descriptionGe: 'თქვენ ან ვინმე, ვისაც წარმოადგენთ, განიცადა პირადი ზიანი უშუალოდ სახელმწიფოს ხელში ჩაგდების, ძალაუფლების ბოროტად გამოყენების ან ხელისუფლების ან მათი აგენტების მიზანმიმართული მოქმედების შედეგად.',
      icon: AlertTriangle,
      href: '/appeal/harm',
      eligibility: [
        'Victims of political persecution or detention',
        'Those who lost employment due to political views',
        'Individuals targeted by violence or threats',
        'Families of political prisoners',
      ],
      eligibilityGe: [
        'პოლიტიკური დევნის ან დაკავების მსხვერპლები',
        'ვინც სამსახური დაკარგა პოლიტიკური შეხედულებების გამო',
        'ძალადობის ან მუქარის სამიზნე პირები',
        'პოლიტპატიმართა ოჯახები',
      ],
      accentColor: 'border-l-primary',
    },
    {
      title: 'I Witnessed Wrongdoing',
      titleGe: 'მე ვიყავი დარღვევის მოწმე',
      subtitle: 'Witness',
      subtitleGe: 'მოწმე',
      description: 'You have witnessed or possess evidence of systemic corruption, abuse, or official misconduct—whether or not you were personally affected by these actions.',
      descriptionGe: 'თქვენ იყავით მოწმე ან გაქვთ მტკიცებულება სისტემური კორუფციის, ძალადობის ან ოფიციალური გადაცდომის შესახებ—მიუხედავად იმისა, პირადად დაზარალდით თუ არა ამ ქმედებებით.',
      icon: Eye,
      href: '/appeal/wrongdoing',
      eligibility: [
        'Witnesses to election fraud or manipulation',
        'Those with evidence of judicial corruption',
        'Observers of procurement fraud or embezzlement',
        'Anyone with documented proof of official abuse',
      ],
      eligibilityGe: [
        'არჩევნების გაყალბების ან მანიპულაციის მოწმეები',
        'ვისაც აქვს სასამართლო კორუფციის მტკიცებულება',
        'შესყიდვების თაღლითობის ან გაფლანგვის მოწმეები',
        'ვისაც აქვს ოფიციალური ძალადობის დოკუმენტირებული მტკიცებულება',
      ],
      accentColor: 'border-l-primary/60',
    },
    {
      title: 'I Am Inside the System',
      titleGe: 'მე სისტემის შიგნით ვარ',
      subtitle: 'Protected Disclosure',
      subtitleGe: 'დაცული გამჟღავნება',
      description: 'You work within government, law enforcement, judiciary, or private entities connected to state capture—and you have inside knowledge of misconduct you wish to disclose.',
      descriptionGe: 'თქვენ მუშაობთ მთავრობაში, სამართალდამცველ ორგანოებში, სასამართლოში ან სახელმწიფოს ხელში ჩაგდებასთან დაკავშირებულ კერძო სტრუქტურებში—და გაქვთ შიდა ინფორმაცია გადაცდომის შესახებ, რომლის გამჟღავნებაც გსურთ.',
      icon: ShieldAlert,
      href: '/appeal/inside',
      eligibility: [
        'Civil servants ordered to act unlawfully',
        'Law enforcement pressured to target individuals',
        'Judges or prosecutors facing interference',
        'Private sector with knowledge of state-linked corruption',
      ],
      eligibilityGe: [
        'საჯარო მოხელეები, რომლებსაც უკანონო მოქმედება უბრძანეს',
        'სამართალდამცავები, რომლებზეც ზეწოლა იყო ინდივიდების სამიზნედ გადაქცევაზე',
        'მოსამართლეები ან პროკურორები, რომლებიც ჩარევას აწყდებიან',
        'კერძო სექტორი, რომელსაც აქვს ცოდნა სახელმწიფოსთან დაკავშირებულ კორუფციაზე',
      ],
      accentColor: 'border-l-primary',
    },
  ];

  return (
    <Layout>
      <article className="min-h-screen bg-background border-t-2 border-primary">
        <InstitutionalPageHeader
          title="Make an Appeal"
          titleGe="მიმართვის გაკეთება"
          subtitle="Forum for Justice"
          subtitleGe="სამართლიანობის ფორუმი"
          description="The Forum for Justice receives appeals from those harmed by state capture and those with evidence of wrongdoing. Choose the pathway that best describes your situation."
          descriptionGe="სამართლიანობის ფორუმი იღებს მიმართვებს მათგან, ვინც დაზარალდა სახელმწიფოს ხელში ჩაგდებით და მათგან, ვისაც აქვს დარღვევის მტკიცებულება. აირჩიეთ გზა, რომელიც საუკეთესოდ აღწერს თქვენს სიტუაციას."
          breadcrumbs={[]}
        />

        {/* Pathway Cards */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pathways.map((pathway, idx) => (
              <PathwayCard
                key={idx}
                {...pathway}
                isGeorgian={isGeorgian}
              />
            ))}
          </div>
        </section>

        {/* Program Navigation */}
        <ProgramNav />
      </article>
    </Layout>
  );
};

export default AppealIndex;
