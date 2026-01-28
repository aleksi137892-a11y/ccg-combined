import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CommitmentItem {
  id: string;
  title: { en: string; ge: string };
  content: { en: string; ge: string };
  closing?: { en: string; ge: string };
  href?: string;
  isSpecial?: boolean;
  specialContent?: { en: string; ge: string };
}

const COMMITMENTS: CommitmentItem[] = [
  {
    id: 'preservation',
    title: { en: 'Preservation', ge: 'შენარჩუნება' },
    content: { 
      en: 'Evidence is maintained with cryptographic integrity and chain of custody documentation. Not every case is immediately actionable, but every case is preserved for the moment when circumstances change—whether in a foreign court, a restored Georgian judiciary, or the processes of transitional justice.',
      ge: 'მტკიცებულება ინახება კრიპტოგრაფიული მთლიანობით და მფლობელობის ჯაჭვის დოკუმენტაციით. ყველა საქმე არ არის დაუყოვნებლივ ქმედითი, მაგრამ ყველა საქმე ინახება იმ მომენტისთვის, როდესაც გარემოებები შეიცვლება.'
    }
  },
  {
    id: 'reply',
    title: { en: 'Right of Reply', ge: 'პასუხის უფლება' },
    content: { 
      en: 'Before any individual or entity is named publicly, they receive written notice and a minimum of fourteen days to respond. Their response is included in the record, unedited. This is not courtesy—it is a requirement of legitimacy.',
      ge: 'სანამ რომელიმე პირი ან სუბიექტი საჯაროდ დასახელდება, ისინი იღებენ წერილობით შეტყობინებას და მინიმუმ თოთხმეტი დღის ვადას პასუხის გასაცემად. მათი პასუხი შეტანილია ჩანაწერში, რედაქტირების გარეშე.'
    },
    href: '/about/right-of-reply'
  },
  {
    id: 'methodology',
    title: { en: 'Methodology', ge: 'მეთოდოლოგია' },
    content: { 
      en: 'We meet evidentiary standards at least as rigorous as the institutions we parallel. Evidence is verified. Sources are protected. Errors are corrected publicly. The record is built to survive legal scrutiny.',
      ge: 'ჩვენ ვაკმაყოფილებთ მტკიცებულების სტანდარტებს, რომლებიც მინიმუმ ისევე მკაცრია, როგორც იმ ინსტიტუტებისა, რომლებსაც ვპარალელობთ. მტკიცებულება ვერიფიცირებულია. წყაროები დაცულია. შეცდომები საჯაროდ სწორდება.'
    },
    href: '/methodology'
  },
  {
    id: 'those-who-stand',
    title: { en: 'To Those Who Stand Within', ge: 'მათთვის, ვინც შიგნიდან დგას' },
    content: { 
      en: 'We recognize that within captured systems, there are judges, prosecutors, civil servants, police officers, and professionals who continue to uphold their oaths despite institutional pressure. Your position is precarious. Your courage is noted.',
      ge: 'ჩვენ აღვიარებთ, რომ ტყვეობაში მყოფ სისტემებში არიან მოსამართლეები, პროკურორები, საჯარო მოხელეები, პოლიციელები და პროფესიონალები, რომლებიც აგრძელებენ თავიანთი ფიცის შესრულებას ინსტიტუციური ზეწოლის მიუხედავად. თქვენი პოზიცია არასტაბილურია. თქვენი გამბედაობა აღნიშნულია.'
    },
    isSpecial: true,
    specialContent: {
      en: 'The Forum welcomes those who stand for the rule of law even when the system around them facilitates capture. But we offer more than acknowledgment—we offer community.\n\nThe Rustaveli Project exists for those who choose conscience over complicity. It is a network of moral conviction: a place where those who refuse to participate in institutional betrayal can find solidarity, support, and the knowledge that their courage serves something larger than themselves.\n\nYour integrity matters. You are not alone.',
      ge: 'ფორუმი მიესალმება მათ, ვინც იცავს კანონის უზენაესობას მაშინაც კი, როდესაც მათ გარშემო სისტემა ხელს უწყობს ტყვეობას. მაგრამ ჩვენ გთავაზობთ მეტს ვიდრე აღიარებას—ჩვენ გთავაზობთ საზოგადოებას.\n\nრუსთაველის პროექტი არსებობს მათთვის, ვინც ირჩევს სინდისს თანამონაწილეობის ნაცვლად. ეს არის მორალური რწმენის ქსელი: ადგილი, სადაც მათ, ვინც უარს ამბობს ინსტიტუციურ ღალატში მონაწილეობაზე, შეუძლიათ იპოვონ სოლიდარობა, მხარდაჭერა და ცოდნა, რომ მათი გამბედაობა ემსახურება რაღაც უფრო დიდს, ვიდრე საკუთარი თავი.\n\nთქვენი კეთილსინდისიერება მნიშვნელოვანია. თქვენ მარტო არ ხართ.'
    },
    href: '/rustaveli'
  },
  {
    id: 'international',
    title: { en: 'To the International Community', ge: 'საერთაშორისო საზოგადოებას' },
    content: { 
      en: 'We call upon democratic governments, international institutions, and civil society to recognize that Georgia\'s crisis is not a domestic matter. When a state persecutes its own citizens, the international legal order exists precisely to respond. We ask for your engagement—through sanctions, through diplomatic pressure, through the activation of every mechanism designed to protect human rights when domestic protections fail.',
      ge: 'ჩვენ მოვუწოდებთ დემოკრატიულ მთავრობებს, საერთაშორისო ინსტიტუტებს და სამოქალაქო საზოგადოებას აღიარონ, რომ საქართველოს კრიზისი არ არის შიდა საქმე. როდესაც სახელმწიფო დევნის საკუთარ მოქალაქეებს, საერთაშორისო სამართლებრივი წესრიგი არსებობს სწორედ პასუხის გასაცემად.'
    }
  },
  {
    id: 'principle',
    title: { en: 'The Fundamental Principle', ge: 'ფუნდამენტური პრინციპი' },
    content: { 
      en: 'No one is above the law. Everyone should enjoy its protection. These are not aspirations—they are the constitutional obligations of every republic. When the state fails to uphold them, the duty falls to the citizenry. When the citizenry cannot act safely, the duty falls to those beyond the state\'s reach.',
      ge: 'არავინ არის კანონზე მაღლა. ყველამ უნდა ისარგებლოს მისი დაცვით. ეს არ არის მისწრაფებები—ეს არის ყველა რესპუბლიკის კონსტიტუციური ვალდებულებები. როდესაც სახელმწიფო ვერ იცავს მათ, მოვალეობა ეკისრება მოქალაქეობას.'
    },
    closing: {
      en: 'This is the architecture of civic necessity.\nThis is the Forum for Justice.',
      ge: 'ეს არის სამოქალაქო აუცილებლობის არქიტექტურა.\nეს არის სამართლიანობის ფორუმი.'
    }
  }
];

interface CommitmentsAccordionProps {
  className?: string;
}

export function CommitmentsAccordion({ className }: CommitmentsAccordionProps) {
  const { language, isGeorgian, getLocalizedPath } = useLanguage();
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className={cn("", className)}>
      {COMMITMENTS.map((item, idx) => {
        const isOpen = openItem === item.id;
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="border-b border-white/10"
          >
            <button
              onClick={() => setOpenItem(isOpen ? null : item.id)}
              className="w-full py-5 flex items-start justify-between gap-4 text-left group"
            >
              <div className="flex items-start gap-4">
                <span className="font-sans text-[10px] tracking-[0.15em] text-white/30 pt-1.5">
                  0{idx + 1}
                </span>
                <h4 className={cn(
                  "font-narrative text-lg transition-colors duration-200",
                  isGeorgian && "font-georgian",
                  isOpen ? "text-white" : "text-white/70 group-hover:text-white/90"
                )}>
                  {item.title[language]}
                </h4>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="pt-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path 
                    d="M3 5L7 9L11 5" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    className={cn(
                      "transition-colors",
                      isOpen ? "text-white/60" : "text-white/30"
                    )}
                  />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pl-10 pb-6">
                    <p className={cn(
                      "font-serif text-base text-white/60 leading-[1.85] max-w-[55ch]",
                      isGeorgian && "font-georgian"
                    )}>
                      {item.content[language]}
                    </p>

                    {/* Special expanded content for "Those Who Stand" */}
                    {item.isSpecial && item.specialContent && (
                      <div className="mt-6 pl-4 border-l border-white/20">
                        <p className={cn(
                          "font-serif text-sm text-white/50 leading-[1.85] whitespace-pre-line max-w-[50ch]",
                          isGeorgian && "font-georgian"
                        )}>
                          {item.specialContent[language]}
                        </p>
                        
                        {/* Rustaveli Project CTA */}
                        <Link
                          to={getLocalizedPath('/rustaveli')}
                          className="inline-flex items-center gap-3 mt-6 group"
                        >
                          <span className={cn(
                            "font-sans text-xs uppercase tracking-[0.12em] text-white/70 border-b border-white/30 pb-0.5 group-hover:border-white/60 transition-colors",
                            isGeorgian && "font-georgian"
                          )}>
                            {isGeorgian ? 'რუსთაველის პროექტი' : 'The Rustaveli Project'}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}

                    {/* Closing declaration */}
                    {item.closing && (
                      <p className={cn(
                        "font-serif text-sm text-white/50 italic whitespace-pre-line mt-6 pl-4 border-l border-white/10",
                        isGeorgian && "font-georgian"
                      )}>
                        {item.closing[language]}
                      </p>
                    )}

                    {/* Link if not special */}
                    {item.href && !item.isSpecial && (
                      <Link
                        to={getLocalizedPath(item.href)}
                        className="inline-flex items-center gap-2 mt-4 group"
                      >
                        <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/50 border-b border-white/20 pb-0.5 group-hover:border-white/40 transition-colors">
                          {isGeorgian ? 'წაიკითხე მეტი' : 'Read More'}
                        </span>
                        <ArrowRight className="w-3 h-3 text-white/50 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default CommitmentsAccordion;
