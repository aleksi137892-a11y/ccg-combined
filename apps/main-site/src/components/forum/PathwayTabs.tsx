import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PathwayData {
  id: string;
  title: { en: string; ge: string };
  quote: { en: string; ge: string };
  lead: { en: string; ge: string };
  eligibilityProse: { en: string; ge: string };
  href: string;
}

const PATHWAYS: PathwayData[] = [
  {
    id: 'victim',
    title: { en: 'I Have Been Harmed', ge: 'მე მიყენეს ზიანი' },
    quote: { en: 'For those who have suffered directly at the hands of a captured state.', ge: 'მათთვის, ვინც უშუალოდ დაზარალდა ტყვეობაში მყოფი სახელმწიფოს ხელით.' },
    lead: { en: 'Victims of political persecution, violence, expropriation, or institutional abuse may file a formal Appeal documenting their harm.', ge: 'პოლიტიკური დევნის, ძალადობის, ექსპროპრიაციის ან ინსტიტუციური ძალადობის მსხვერპლებს შეუძლიათ შეიტანონ ფორმალური აპელაცია, სადაც დოკუმენტირებულია მათი ზიანი.' },
    eligibilityProse: { 
      en: 'Eligible circumstances include political persecution—arrest, prosecution, detention, or imprisonment for exercising constitutional rights—as well as physical violence, torture, or cruel treatment by state actors. Those whose property has been expropriated, whose businesses have been destroyed by coordinated state action, or whose livelihoods have been targeted through selective tax, customs, or regulatory enforcement may petition. This includes harassment through judicial process, contract interference, commercial exclusion from public tenders, and reputational attacks through state-coordinated defamation. Families of political prisoners, the detained, or the disappeared are also eligible.',
      ge: 'დაშვებული გარემოებები მოიცავს პოლიტიკურ დევნას—დაკავებას, სისხლისსამართლებრივ დევნას, პატიმრობას ან დაპატიმრებას კონსტიტუციური უფლებების განხორციელებისთვის—ასევე ფიზიკურ ძალადობას, წამებას ან სასტიკ მოპყრობას სახელმწიფო აქტორების მხრიდან. პეტიციის შეტანა შეუძლიათ მათ, ვისი ქონებაც ჩამოართვეს, ვისი ბიზნესიც განადგურდა კოორდინირებული სახელმწიფო ქმედებით, ან ვისი საარსებო წყაროც მიზანმიმართულ იქნა შერჩევითი საგადასახადო, საბაჟო ან მარეგულირებელი აღსრულების გზით. ეს მოიცავს სასამართლო პროცესით შევიწროებას, კონტრაქტებში ჩარევას, საჯარო ტენდერებიდან კომერციულ გამორიცხვას და რეპუტაციულ თავდასხმებს სახელმწიფოს მიერ კოორდინირებული ცილისწამების გზით. პოლიტიკური პატიმრების, დაკავებულთა ან გაუჩინარებულთა ოჯახებიც უფლებამოსილია.'
    },
    href: '/appeal/harmed'
  },
  {
    id: 'witness',
    title: { en: 'I Witnessed Wrongdoing', ge: 'მე ვიყავი დანაშაულის მოწმე' },
    quote: { en: 'For those who saw what was not meant to be seen.', ge: 'მათთვის, ვინც იხილა ის, რაც არ უნდა ენახა.' },
    lead: { en: 'Witnesses to abuse, corruption, or institutional failure may submit testimony even without personal harm.', ge: 'ძალადობის, კორუფციის ან ინსტიტუციური მარცხის მოწმეებს შეუძლიათ ჩვენების წარდგენა პირადი ზიანის გარეშეც.' },
    eligibilityProse: { 
      en: 'Witnesses may testify to election fraud or manipulation, including falsification, voter intimidation, and vote-buying. Those with knowledge of judicial corruption, case-fixing, or interference with judicial independence are eligible, as are those who observed procurement fraud, rigged tenders, or state contract manipulation. Police brutality, unlawful use of force, and institutional complicity in persecution are within scope. Documentary evidence—orders, communications, or coordination proving wrongdoing—is particularly valuable.',
      ge: 'მოწმეებს შეუძლიათ ჩვენება მისცენ საარჩევნო გაყალბების ან მანიპულაციის შესახებ, მათ შორის ფალსიფიკაცია, ამომრჩეველთა დაშინება და ხმების ყიდვა. უფლებამოსილია ისინი, ვისაც აქვს ინფორმაცია სასამართლო კორუფციის, საქმეების გაყალბების ან სასამართლო დამოუკიდებლობაში ჩარევის შესახებ, ისევე როგორც ისინი, ვინც დააკვირდა შესყიდვების თაღლითობას, გაყალბებულ ტენდერებს ან სახელმწიფო კონტრაქტების მანიპულაციას. პოლიციის სისასტიკე, ძალის უკანონო გამოყენება და ინსტიტუციური თანამონაწილეობა დევნაში მოცულია. დოკუმენტური მტკიცებულება—ბრძანებები, კომუნიკაციები ან კოორდინაცია, რომელიც ამტკიცებს დარღვევას—განსაკუთრებით ღირებულია.'
    },
    href: '/appeal/witnessed'
  },
  {
    id: 'insider',
    title: { en: 'I Am Inside the System', ge: 'მე სისტემის შიგნით ვარ' },
    quote: { en: 'For those who carry evidence from within.', ge: 'მათთვის, ვინც შიგნიდან ატარებს მტკიცებულებას.' },
    lead: { en: 'Insiders with knowledge of wrongdoing receive the highest protection protocols. Your testimony may be the documentation that makes accountability possible.', ge: 'ინსაიდერები დარღვევის ცოდნით იღებენ უმაღლესი დაცვის პროტოკოლებს. თქვენი ჩვენება შეიძლება იყოს დოკუმენტაცია, რომელიც პასუხისმგებლობას შესაძლებელს ხდის.' },
    eligibilityProse: { 
      en: 'Civil servants aware of unlawful orders or practices may come forward, as may law enforcement officers witnessing abuse of authority. Judges or prosecutors with knowledge of case manipulation or interference are protected, as are private sector actors with information about state-linked corruption. Financial sector professionals aware of illicit flows, politically-motivated account closures, or credit denial are eligible. Corporate executives with knowledge of state-coerced transactions, tax officials aware of selective enforcement, and regulatory officials who have witnessed weaponized enforcement may all submit evidence. Anyone with documentary evidence from within institutions of capture is welcome.',
      ge: 'საჯარო მოხელეებს, რომლებმაც იციან უკანონო ბრძანებების ან პრაქტიკის შესახებ, შეუძლიათ წინ წამოდგომა, ისევე როგორც სამართალდამცავ ოფიცრებს, რომლებიც მოწმენი არიან უფლებამოსილების ბოროტად გამოყენების. მოსამართლეები ან პროკურორები საქმეების მანიპულაციის ან ჩარევის ცოდნით დაცულია, ისევე როგორც კერძო სექტორის აქტორები სახელმწიფოსთან დაკავშირებული კორუფციის ინფორმაციით. ფინანსური სექტორის პროფესიონალები, რომლებმაც იციან უკანონო ნაკადების, პოლიტიკურად მოტივირებული ანგარიშების დახურვის ან კრედიტის უარყოფის შესახებ, უფლებამოსილია. კორპორატიული აღმასრულებლები სახელმწიფოს მიერ იძულებითი ტრანზაქციების ცოდნით, საგადასახადო ჩინოვნიკები შერჩევითი აღსრულების ცოდნით და მარეგულირებელი თანამდებობის პირები, რომლებმაც ნახეს იარაღად გამოყენებული აღსრულება—ყველა მათგანს შეუძლია მტკიცებულების წარდგენა.'
    },
    href: '/appeal/insider'
  }
];

interface PathwayTabsProps {
  className?: string;
}

export function PathwayTabs({ className }: PathwayTabsProps) {
  const { language, isGeorgian, getLocalizedPath } = useLanguage();
  const [activeTab, setActiveTab] = useState(PATHWAYS[0].id);
  const [expandedEligibility, setExpandedEligibility] = useState(false);

  const activePathway = PATHWAYS.find(p => p.id === activeTab)!;

  return (
    <div className={cn("", className)}>
      {/* Tab navigation */}
      <div className="flex border-b border-white/10 mb-8">
        {PATHWAYS.map((pathway, idx) => (
          <button
            key={pathway.id}
            onClick={() => {
              setActiveTab(pathway.id);
              setExpandedEligibility(false);
            }}
            className={cn(
              "flex-1 py-4 px-4 text-left transition-all duration-300 relative",
              activeTab === pathway.id 
                ? "text-white" 
                : "text-white/50 hover:text-white/60"
            )}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.15em] block mb-1 text-white/30">
              0{idx + 1}
            </span>
            <span className={cn(
              "font-serif text-sm md:text-base block",
              isGeorgian && "font-georgian"
            )}>
              {pathway.title[language]}
            </span>
            
            {/* Active indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              initial={false}
              animate={{ scaleX: activeTab === pathway.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Quote */}
          <p className={cn(
            "font-serif text-xl md:text-2xl text-white/80 italic mb-6 max-w-[45ch]",
            isGeorgian && "font-georgian"
          )}>
            "{activePathway.quote[language]}"
          </p>

          {/* Lead */}
          <p className={cn(
            "font-serif text-base text-white/60 leading-relaxed mb-8 max-w-[55ch]",
            isGeorgian && "font-georgian"
          )}>
            {activePathway.lead[language]}
          </p>

          {/* Eligibility - prose paragraph */}
          <div className="mb-8">
            <button
              onClick={() => setExpandedEligibility(!expandedEligibility)}
              className="flex items-center gap-3 text-white/50 hover:text-white/70 transition-colors mb-4 group"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.15em]">
                {isGeorgian ? 'დაშვებული გარემოებები' : 'Eligible Circumstances'}
              </span>
              <motion.svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
                animate={{ rotate: expandedEligibility ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5"/>
              </motion.svg>
            </button>

            <AnimatePresence>
              {expandedEligibility && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className={cn(
                    "font-serif text-sm text-white/50 leading-[1.85] pl-4 border-l border-white/10 max-w-[60ch]",
                    isGeorgian && "font-georgian"
                  )}>
                    {activePathway.eligibilityProse[language]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <Link
            to={getLocalizedPath(activePathway.href)}
            className="inline-flex items-center gap-3 group"
          >
            <span className={cn(
              "font-sans text-xs uppercase tracking-[0.15em] text-white border-b border-white/30 pb-0.5 group-hover:border-white/60 transition-colors",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'აპელაციის დაწყება' : 'Begin Appeal'}
            </span>
            <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default PathwayTabs;
