import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RemedyPathway {
  id: string;
  title: { en: string; ge: string };
  lead: { en: string; ge: string };
  secondary: { en: string; ge: string };
  jurisdictions: string[];
  href: string;
}

const PATHWAYS: RemedyPathway[] = [
  {
    id: 'sanctions',
    title: { en: 'Sanctions', ge: 'სანქციები' },
    lead: { en: 'Targeted measures against human rights violators and their enablers.', ge: 'მიზანმიმართული ზომები ადამიანის უფლებების დამრღვევთა და მათი ხელშემწყობთა წინააღმდეგ.' },
    secondary: { en: 'Magnitsky-style designations across US, UK, EU, Canada, Australia. Visa restrictions. Asset freezes. Unexplained Wealth Orders.', ge: 'მაგნიტსკის ტიპის აღნიშვნები აშშ-ს, გაერთიანებული სამეფოს, ევროკავშირის, კანადისა და ავსტრალიის მასშტაბით. სავიზო შეზღუდვები. აქტივების გაყინვა.' },
    jurisdictions: ['US', 'UK', 'EU', 'CA', 'AU'],
    href: '/remedy/sanctions'
  },
  {
    id: 'litigation',
    title: { en: 'Litigation', ge: 'სასამართლო დავა' },
    lead: { en: 'Civil and criminal proceedings in foreign jurisdictions.', ge: 'სამოქალაქო და სისხლის სამართლის საქმეები უცხოურ იურისდიქციებში.' },
    secondary: { en: 'Tort claims, property claims, asset recovery. Private prosecution where law allows.', ge: 'დელიქტური სარჩელები, ქონებრივი სარჩელები, აქტივების აღდგენა. კერძო სისხლისსამართლებრივი დევნა.' },
    jurisdictions: ['UK', 'US', 'FR', 'DE', 'CH'],
    href: '/remedy/litigation'
  },
  {
    id: 'criminal',
    title: { en: 'Criminal Referral', ge: 'სისხლისსამართლებრივი მიმართვა' },
    lead: { en: 'Prosecution referrals to competent authorities.', ge: 'სისხლისსამართლებრივი დევნის მიმართვები კომპეტენტურ ორგანოებში.' },
    secondary: { en: 'Universal jurisdiction for torture, enforced disappearance, crimes against humanity.', ge: 'უნივერსალური იურისდიქცია წამებაზე, იძულებით გაუჩინარებაზე, კაცობრიობის წინააღმდეგ ჩადენილ დანაშაულებზე.' },
    jurisdictions: ['DE', 'FR', 'SE', 'NL', 'CH'],
    href: '/remedy/criminal'
  },
  {
    id: 'international',
    title: { en: 'International Mechanisms', ge: 'საერთაშორისო მექანიზმები' },
    lead: { en: 'UN bodies, regional courts, treaty mechanisms.', ge: 'გაეროს ორგანოები, რეგიონული სასამართლოები, ხელშეკრულების მექანიზმები.' },
    secondary: { en: 'ECHR applications. UN Special Procedures. Treaty body complaints. Council of Europe mechanisms.', ge: 'ევროპის ადამიანის უფლებათა სასამართლოში განცხადებები. გაეროს სპეციალური პროცედურები.' },
    jurisdictions: ['ECHR', 'UN', 'CoE'],
    href: '/remedy/international'
  },
  {
    id: 'regulatory',
    title: { en: 'Regulatory & Compliance', ge: 'მარეგულირებელი და შესაბამისობა' },
    lead: { en: 'Notices to gatekeepers, regulators, professional bodies.', ge: 'შეტყობინებები მეკარეებისთვის, მარეგულირებლებისთვის, პროფესიულ ორგანოებისთვის.' },
    secondary: { en: 'Financial sector de-risking. Corporate due diligence triggers. Professional body complaints.', ge: 'ფინანსური სექტორის რისკების შემცირება. კორპორატიული სათანადო შემოწმების ტრიგერები.' },
    jurisdictions: ['FCA', 'SEC', 'BaFin'],
    href: '/remedy/regulatory'
  }
];

interface RemedyGalleryProps {
  className?: string;
}

export function RemedyGallery({ className }: RemedyGalleryProps) {
  const { language, isGeorgian, getLocalizedPath } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Navigation arrows - desktop */}
      <div className="hidden md:flex justify-end gap-2 mb-4">
        <button
          onClick={() => scroll('left')}
          disabled={scrollPosition <= 0}
          className={cn(
            "p-2 border border-white/20 transition-all duration-200",
            scrollPosition <= 0 
              ? "opacity-30 cursor-not-allowed" 
              : "hover:border-white/40 hover:bg-white/5"
          )}
        >
          <ChevronLeft className="w-4 h-4 text-white/60" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="p-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PATHWAYS.map((pathway, idx) => {
          const isExpanded = expandedCard === pathway.id;
          
          return (
            <motion.div
              key={pathway.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "flex-none w-[280px] md:w-[300px] snap-start border transition-all duration-300",
                isExpanded 
                  ? "bg-white/5 border-white/30" 
                  : "bg-transparent border-white/10 hover:border-white/20"
              )}
            >
              <button
                onClick={() => setExpandedCard(isExpanded ? null : pathway.id)}
                className="w-full text-left p-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className={cn(
                    "font-narrative text-lg text-white",
                    isGeorgian && "font-georgian"
                  )}>
                    {pathway.title[language]}
                  </h3>
                  <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-white/30 mt-1.5"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5"/>
                  </motion.svg>
                </div>

                {/* Lead */}
                <p className={cn(
                  "font-serif text-sm text-white/60 leading-relaxed mb-4",
                  isGeorgian && "font-georgian"
                )}>
                  {pathway.lead[language]}
                </p>

                {/* Jurisdiction tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pathway.jurisdictions.map(j => (
                    <span
                      key={j}
                      className="font-sans text-[9px] tracking-wide text-white/50 px-1.5 py-0.5 border border-white/10"
                    >
                      {j}
                    </span>
                  ))}
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className={cn(
                        "font-serif text-xs text-white/50 leading-relaxed mb-4 pt-3 border-t border-white/10",
                        isGeorgian && "font-georgian"
                      )}>
                        {pathway.secondary[language]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Always visible link */}
              <div className="px-5 pb-5 pt-0">
                <Link
                  to={getLocalizedPath(pathway.href)}
                  className="inline-flex items-center gap-2 group"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/50 border-b border-white/20 pb-0.5 group-hover:border-white/40 transition-colors">
                    {isGeorgian ? `${pathway.title.ge}-ს შესახებ` : `Explore ${pathway.title.en}`}
                  </span>
                  <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/50 transition-colors" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-1.5 mt-4">
        {PATHWAYS.map((pathway, idx) => {
          const isActive = Math.round(scrollPosition / 320) === idx;
          return (
            <button
              key={pathway.id}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({ left: idx * 320, behavior: 'smooth' });
                  setScrollPosition(idx * 320);
                }
              }}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                isActive ? "bg-white/60 w-4" : "bg-white/20 hover:bg-white/40"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RemedyGallery;
