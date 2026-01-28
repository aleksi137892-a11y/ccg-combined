import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface TriageCriterion {
  id: string;
  label: { en: string; ge: string };
  description: { en: string; ge: string };
  weight: number; // 1-5 for visual bar
  detail: { en: string; ge: string };
}

const CRITERIA: TriageCriterion[] = [
  {
    id: 'severity',
    label: { en: 'Severity of Harm', ge: 'ზიანის სიმძიმე' },
    description: { en: 'Physical violence, torture, unlawful detention receive highest priority', ge: 'ფიზიკური ძალადობა, წამება, უკანონო დაკავება იღებს უმაღლეს პრიორიტეტს' },
    weight: 5,
    detail: { en: 'Cases involving immediate threats to life or physical integrity are expedited. Torture allegations, violent detentions, and credible death threats move directly to emergency protocols.', ge: 'საქმეები, რომლებიც მოიცავს უშუალო საფრთხეს სიცოცხლისთვის ან ფიზიკური მთლიანობისთვის, დაჩქარებულია. წამების ბრალდებები, ძალადობრივი დაკავებები და სანდო სიკვდილით დამუქრება გადადის პირდაპირ საგანგებო პროტოკოლებზე.' }
  },
  {
    id: 'evidence',
    label: { en: 'Evidentiary Strength', ge: 'მტკიცებულების სიძლიერე' },
    description: { en: 'Cases with strong documentation are more actionable', ge: 'ძლიერი დოკუმენტაციის მქონე საქმეები უფრო ქმედითია' },
    weight: 4,
    detail: { en: 'Documentary evidence, corroborated testimony, and materials meeting Berkeley Protocol standards strengthen actionability across all remedy pathways.', ge: 'დოკუმენტური მტკიცებულება, დადასტურებული ჩვენება და ბერკლის პროტოკოლის სტანდარტების შესაბამისი მასალები აძლიერებს ქმედითობას ყველა გამოსწორების გზაზე.' }
  },
  {
    id: 'vulnerability',
    label: { en: 'Vulnerability', ge: 'მოწყვლადობა' },
    description: { en: 'Protection of those at continued risk', ge: 'იმ პირების დაცვა, რომლებიც მუდმივი რისკის ქვეშ არიან' },
    weight: 5,
    detail: { en: 'Petitioners facing ongoing persecution, those without means of escape, and particularly exposed sources receive prioritized handling and enhanced security protocols.', ge: 'პეტიციონერები, რომლებსაც ემუქრებათ მიმდინარე დევნა, ისინი, ვისაც არ აქვთ გაქცევის საშუალება, და განსაკუთრებით მოწყვლადი წყაროები იღებენ პრიორიტეტულ მოპყრობას და გაძლიერებულ უსაფრთხოების პროტოკოლებს.' }
  },
  {
    id: 'systemic',
    label: { en: 'Systemic Impact', ge: 'სისტემური ზემოქმედება' },
    description: { en: 'Cases that reveal patterns or enable broader accountability', ge: 'საქმეები, რომლებიც ავლენენ პატერნებს ან იძლევა უფრო ფართო ანგარიშვალდებულების საშუალებას' },
    weight: 4,
    detail: { en: 'Cases that illuminate systemic patterns, implicate institutional actors, or could establish accountability precedents receive strategic prioritization.', ge: 'საქმეები, რომლებიც ანათებენ სისტემურ პატერნებს, აკავშირებენ ინსტიტუციურ აქტორებს ან შეუძლიათ დაადგინონ ანგარიშვალდებულების პრეცედენტები, იღებენ სტრატეგიულ პრიორიტიზაციას.' }
  },
  {
    id: 'precedent',
    label: { en: 'Precedent Value', ge: 'პრეცედენტის ღირებულება' },
    description: { en: 'Potential to establish legal or procedural precedents', ge: 'სამართლებრივი ან პროცედურული პრეცედენტების დადგენის პოტენციალი' },
    weight: 3,
    detail: { en: 'Cases that could create binding legal precedent, trigger new designation categories, or establish investigative methodologies receive additional consideration.', ge: 'საქმეები, რომლებსაც შეუძლიათ შექმნან სავალდებულო სამართლებრივი პრეცედენტი, გამოიწვიონ ახალი აღნიშვნის კატეგორიები ან დაადგინონ საგამოძიებო მეთოდოლოგიები, იღებენ დამატებით განხილვას.' }
  },
  {
    id: 'actionability',
    label: { en: 'Actionability', ge: 'ქმედითობა' },
    description: { en: 'Availability of remedy pathways in current circumstances', ge: 'გამოსწორების გზების ხელმისაწვდომობა მიმდინარე გარემოებებში' },
    weight: 4,
    detail: { en: 'Cases with clear pathways to consequence—whether through active sanctions regimes, available litigation venues, or receptive international mechanisms—can proceed more rapidly.', ge: 'საქმეები მკაფიო გზებით შედეგისკენ—აქტიური სანქციების რეჟიმებით, ხელმისაწვდომი სასამართლო ადგილებით ან მიმღები საერთაშორისო მექანიზმებით—შეუძლიათ უფრო სწრაფად წინსვლა.' }
  }
];

interface TriageMatrixProps {
  className?: string;
}

export function TriageMatrix({ className }: TriageMatrixProps) {
  const { language, isGeorgian } = useLanguage();
  const [hoveredCriterion, setHoveredCriterion] = useState<string | null>(null);
  const [selectedCriterion, setSelectedCriterion] = useState<string | null>(null);

  return (
    <div className={cn("", className)}>
      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CRITERIA.map((criterion, idx) => {
          const isHovered = hoveredCriterion === criterion.id;
          const isSelected = selectedCriterion === criterion.id;
          const isActive = isHovered || isSelected;
          
          return (
            <motion.button
              key={criterion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredCriterion(criterion.id)}
              onMouseLeave={() => setHoveredCriterion(null)}
              onClick={() => setSelectedCriterion(isSelected ? null : criterion.id)}
              className={cn(
                "text-left p-5 border transition-all duration-300",
                isActive 
                  ? "bg-navy/80 border-navy/60" 
                  : "bg-transparent border-navy/20 hover:border-navy/40"
              )}
            >
              {/* Label */}
              <h4 className={cn(
                "font-sans text-xs uppercase tracking-[0.15em] mb-3 transition-colors",
                isGeorgian && "font-georgian",
                isActive ? "text-navy" : "text-navy/60"
              )}>
                {criterion.label[language]}
              </h4>

              {/* Weight bar */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    className={cn(
                      "h-1 flex-1 transition-colors duration-300",
                      i <= criterion.weight 
                        ? (isActive ? "bg-navy" : "bg-navy/40") 
                        : "bg-navy/10"
                    )}
                    initial={false}
                    animate={{ 
                      scaleY: isActive && i <= criterion.weight ? 1.5 : 1 
                    }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                  />
                ))}
              </div>

              {/* Description */}
              <p className={cn(
                "font-serif text-sm leading-relaxed transition-colors",
                isGeorgian && "font-georgian",
                isActive ? "text-navy/80" : "text-navy/50"
              )}>
                {criterion.description[language]}
              </p>

              {/* Expanded detail */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className={cn(
                      "font-serif text-xs text-navy/60 leading-relaxed mt-3 pt-3 border-t border-navy/10",
                      isGeorgian && "font-georgian"
                    )}>
                      {criterion.detail[language]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default TriageMatrix;
