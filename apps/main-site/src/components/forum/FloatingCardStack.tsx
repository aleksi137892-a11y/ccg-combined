import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DatabaseCard {
  id: string;
  title: { en: string; ge: string };
  lead: { en: string; ge: string };
  secondary?: { en: string; ge: string };
  subcollections?: Array<{ label: { en: string; ge: string } }>;
  href: string;
}

const DATABASES: DatabaseCard[] = [
  {
    id: 'ledger',
    title: { en: 'The Ledger of Harm', ge: 'ზიანის რეესტრი' },
    lead: { 
      en: 'The master record of documented harm. Every verified case of abuse, persecution, or institutional failure—preserved with evidentiary rigor for future proceedings.',
      ge: 'დოკუმენტირებული ზიანის მთავარი ჩანაწერი. ყველა ვერიფიცირებული ძალადობის, დევნის ან ინსტიტუციური მარცხის შემთხვევა—შენახული მტკიცებულებითი სიმკაცრით.'
    },
    subcollections: [
      { label: { en: 'Individual Cases', ge: 'ინდივიდუალური საქმეები' } },
      { label: { en: 'Pattern Documentation', ge: 'პატერნების დოკუმენტაცია' } },
      { label: { en: 'Institutional Findings', ge: 'ინსტიტუციური დასკვნები' } }
    ],
    href: '/record/ledger'
  },
  {
    id: 'list',
    title: { en: 'The List', ge: 'სია' },
    lead: { 
      en: 'The registry of individual responsibility. Named individuals whose conduct has enabled or perpetrated state capture.',
      ge: 'ინდივიდუალური პასუხისმგებლობის რეესტრი. დასახელებული პირები, რომელთა ქცევამ ხელი შეუწყო ან განახორციელა სახელმწიფოს ტყვეობა.'
    },
    secondary: { 
      en: 'The Ledger documents harm. The List assigns responsibility.',
      ge: 'რეესტრი აფიქსირებს ზიანს. სია ანაწილებს პასუხისმგებლობას.'
    },
    href: '/record/list'
  },
  {
    id: 'index',
    title: { en: 'The Complicity Index', ge: 'თანამონაწილეობის ინდექსი' },
    lead: { 
      en: 'The registry of institutional and corporate complicity. Organizations that benefit from or contribute to state capture.',
      ge: 'ინსტიტუციური და კორპორატიული თანამონაწილეობის რეესტრი. ორგანიზაციები, რომლებიც სარგებლობენ სახელმწიფოს ტყვეობით ან ხელს უწყობენ მას.'
    },
    subcollections: [
      { label: { en: 'State Contractors', ge: 'სახელმწიფო კონტრაქტორები' } },
      { label: { en: 'Financial Sector', ge: 'ფინანსური სექტორი' } },
      { label: { en: 'Media Entities', ge: 'მედია სუბიექტები' } }
    ],
    href: '/record/index'
  },
  {
    id: 'corrections',
    title: { en: 'Corrections Log', ge: 'შესწორებების ჟურნალი' },
    lead: { 
      en: 'Public record of our errors and their correction. An institution that never corrects itself is either infallible or dishonest. We are neither.',
      ge: 'ჩვენი შეცდომებისა და მათი გასწორების საჯარო ჩანაწერი. ინსტიტუცია, რომელიც არასოდეს ასწორებს თავს, ან უშეცდომოა, ან არაკეთილსინდისიერი.'
    },
    href: '/record/corrections'
  }
];

interface FloatingCardStackProps {
  className?: string;
}

export function FloatingCardStack({ className }: FloatingCardStackProps) {
  const { language, isGeorgian, getLocalizedPath } = useLanguage();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      {/* Stacked cards - desktop */}
      <div className="hidden md:block relative" style={{ height: 380 }}>
        {DATABASES.map((card, idx) => {
          const isActive = activeCard === card.id;
          const isHovered = hoveredCard === card.id;
          const offset = idx * 20;
          const zIndex = isActive ? 50 : (isHovered ? 40 : DATABASES.length - idx);
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveCard(isActive ? null : card.id)}
              style={{ 
                zIndex,
                position: 'absolute',
                top: offset,
                left: offset,
                right: -offset,
              }}
              animate={{
                y: isActive ? -20 : (isHovered ? -10 : 0),
                scale: isActive ? 1.02 : (isHovered ? 1.01 : 1),
                boxShadow: isActive 
                  ? '0 25px 50px -12px rgba(0,0,0,0.5)' 
                  : (isHovered 
                    ? '0 20px 40px -15px rgba(0,0,0,0.4)' 
                    : '0 10px 30px -15px rgba(0,0,0,0.3)')
              }}
              className={cn(
                "cursor-pointer transition-colors duration-300 border",
                isActive 
                  ? "bg-white/10 border-white/30" 
                  : "bg-navy border-white/10 hover:border-white/20"
              )}
            >
              <div className="p-6 md:p-8">
                {/* Card number */}
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                  0{idx + 1} / 0{DATABASES.length}
                </span>
                
                {/* Title */}
                <h3 className={cn(
                  "font-narrative text-xl md:text-2xl text-white mb-4",
                  isGeorgian && "font-georgian"
                )}>
                  {card.title[language]}
                </h3>
                
                {/* Lead */}
                <p className={cn(
                  "font-serif text-sm text-white/60 leading-relaxed mb-4 max-w-[50ch]",
                  isGeorgian && "font-georgian"
                )}>
                  {card.lead[language]}
                </p>

                {/* Expanded content */}
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {/* Secondary text */}
                      {card.secondary && (
                        <p className={cn(
                          "font-serif text-xs text-white/50 italic whitespace-pre-line mb-4 pl-4 border-l border-white/10",
                          isGeorgian && "font-georgian"
                        )}>
                          {card.secondary[language]}
                        </p>
                      )}
                      
                      {/* Subcollections */}
                      {card.subcollections && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {card.subcollections.map((sub, i) => (
                            <span
                              key={i}
                              className={cn(
                                "font-sans text-[10px] uppercase tracking-wide text-white/50 px-2 py-1 border border-white/10",
                                isGeorgian && "font-georgian"
                              )}
                            >
                              {sub.label[language]}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Link */}
                      <Link
                        to={getLocalizedPath(card.href)}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 group"
                      >
                        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/60 border-b border-white/20 pb-0.5 group-hover:border-white/40 transition-colors">
                          {isGeorgian ? 'ნახვა' : 'Browse'}
                        </span>
                        <ArrowRight className="w-3 h-3 text-white/50 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Simple stack */}
      <div className="md:hidden space-y-3">
        {DATABASES.map((card, idx) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
            className={cn(
              "w-full text-left p-5 border transition-all duration-200",
              activeCard === card.id
                ? "bg-white/5 border-white/30"
                : "bg-transparent border-white/10"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-white/30 block mb-2">
                  0{idx + 1}
                </span>
                <h3 className={cn(
                  "font-serif text-base text-white mb-2",
                  isGeorgian && "font-georgian"
                )}>
                  {card.title[language]}
                </h3>
                
                <AnimatePresence>
                  {activeCard === card.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className={cn(
                        "font-serif text-sm text-white/50 leading-relaxed mb-3",
                        isGeorgian && "font-georgian"
                      )}>
                        {card.lead[language]}
                      </p>
                      <Link
                        to={getLocalizedPath(card.href)}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-white/60"
                      >
                        <span className="font-sans text-[10px] uppercase tracking-wide">
                          {isGeorgian ? 'ნახვა' : 'Browse'}
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                animate={{ rotate: activeCard === card.id ? 180 : 0 }}
                className="text-white/30 mt-1"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5"/>
              </motion.svg>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default FloatingCardStack;
