import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface PipelineStage {
  id: string;
  sectionId: string;
  title: { en: string; ge: string };
  tagline: { en: string; ge: string };
  description: { en: string; ge: string };
}

const STAGES: PipelineStage[] = [
  {
    id: 'appeal',
    sectionId: 'appeal',
    title: { en: 'APPEAL', ge: 'აპელაცია' },
    tagline: { en: 'The threshold where testimony is received.', ge: 'ზღურბლი, სადაც ჩვენება მიიღება.' },
    description: { 
      en: 'Victims, witnesses, and insiders enter here. Every petition is received with gravity, verified against international standards, and prepared for consequence.',
      ge: 'მსხვერპლები, მოწმეები და ინსაიდერები აქ შემოდიან. ყველა პეტიცია მიიღება სერიოზულობით, მოწმდება საერთაშორისო სტანდარტების მიხედვით და მზადდება შედეგისთვის.'
    }
  },
  {
    id: 'record',
    sectionId: 'record',
    title: { en: 'RECORD', ge: 'ჩანაწერი' },
    tagline: { en: 'The instrument of interim accountability.', ge: 'დროებითი ანგარიშვალდებულების ინსტრუმენტი.' },
    description: { 
      en: 'Responsibility is assigned. Complicity is mapped. Harm is preserved with cryptographic integrity for the moment when circumstances change.',
      ge: 'პასუხისმგებლობა განსაზღვრულია. თანამონაწილეობა დახატულია. ზიანი ინახება კრიპტოგრაფიული მთლიანობით იმ მომენტისთვის, როდესაც გარემოებები შეიცვლება.'
    }
  },
  {
    id: 'remedy',
    sectionId: 'remedy',
    title: { en: 'REMEDY', ge: 'გამოსწორება' },
    tagline: { en: 'Justice is always possible.', ge: 'სამართლიანობა ყოველთვის შესაძლებელია.' },
    description: { 
      en: 'Sanctions, litigation, criminal referral, international mechanisms. We exhaust every lawful channel across every available jurisdiction.',
      ge: 'სანქციები, სასამართლო დავა, სისხლისსამართლებრივი მიმართვა, საერთაშორისო მექანიზმები. ჩვენ ვამოწურავთ ყველა კანონიერ არხს ყველა ხელმისაწვდომ იურისდიქციაში.'
    }
  }
];

interface ForumPipelineDiagramProps {
  className?: string;
}

export function ForumPipelineDiagram({ className }: ForumPipelineDiagramProps) {
  const { language, isGeorgian } = useLanguage();
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const handleStageClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveStage(sectionId);
  };

  // Track which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = STAGES.map(s => document.getElementById(s.sectionId));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveStage(STAGES[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Desktop: Horizontal flow */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connecting line background */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
          
          {/* Animated progress line */}
          <motion.div 
            className="absolute top-1/2 left-0 h-px bg-white/40 -translate-y-1/2 z-0 origin-left"
            style={{ scaleX: lineProgress }}
          />
          
          {/* Stage cards */}
          <div className="relative z-10 flex justify-between items-stretch gap-6">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === stage.id;
              const isHovered = hoveredStage === stage.id;
              
              return (
                <motion.button
                  key={stage.id}
                  onClick={() => handleStageClick(stage.sectionId)}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className={cn(
                    "flex-1 text-left group relative",
                    "border transition-all duration-500",
                    isActive 
                      ? "border-white/40 bg-white/5" 
                      : "border-white/10 bg-transparent hover:border-white/25 hover:bg-white/[0.02]"
                  )}
                >
                  {/* Stage number indicator */}
                  <div className={cn(
                    "absolute -top-3 left-6 px-2 bg-navy font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-300",
                    isActive ? "text-white/60" : "text-white/30"
                  )}>
                    0{idx + 1}
                  </div>
                  
                  <div className="p-6 pt-8">
                    {/* Title */}
                    <h3 className={cn(
                      "font-sans text-xs uppercase tracking-[0.25em] mb-3 transition-colors duration-300",
                      isActive ? "text-white" : "text-white/50 group-hover:text-white/70"
                    )}>
                      {stage.title[language]}
                    </h3>
                    
                    {/* Tagline */}
                    <p className={cn(
                      "font-serif text-lg leading-snug mb-4 transition-colors duration-300",
                      isGeorgian && "font-georgian",
                      isActive ? "text-white/90" : "text-white/60 group-hover:text-white/75"
                    )}>
                      {stage.tagline[language]}
                    </p>
                    
                    {/* Description - reveals on hover/active */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isHovered || isActive ? 'auto' : 0,
                        opacity: isHovered || isActive ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={cn(
                        "font-serif text-sm text-white/50 leading-relaxed pt-2 border-t border-white/10",
                        isGeorgian && "font-georgian"
                      )}>
                        {stage.description[language]}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Active indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/60"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Connector arrow */}
                  {idx < STAGES.length - 1 && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                      <motion.svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none"
                        animate={{ x: isActive ? 2 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path 
                          d="M6 4L10 8L6 12" 
                          stroke="currentColor" 
                          strokeWidth="1.5"
                          className={cn(
                            "transition-colors duration-300",
                            isActive ? "text-white/60" : "text-white/20"
                          )}
                        />
                      </motion.svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Mobile: Vertical stack */}
      <div className="md:hidden space-y-4">
        {STAGES.map((stage, idx) => {
          const isActive = activeStage === stage.id;
          
          return (
            <motion.button
              key={stage.id}
              onClick={() => handleStageClick(stage.sectionId)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "w-full text-left p-5 border transition-all duration-300",
                isActive 
                  ? "border-white/40 bg-white/5" 
                  : "border-white/10 bg-transparent"
              )}
            >
              <div className="flex items-start gap-4">
                <span className={cn(
                  "font-sans text-[10px] tracking-[0.2em] uppercase pt-1 transition-colors",
                  isActive ? "text-white/60" : "text-white/30"
                )}>
                  0{idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-sans text-xs uppercase tracking-[0.2em] mb-2 transition-colors",
                    isActive ? "text-white" : "text-white/50"
                  )}>
                    {stage.title[language]}
                  </h3>
                  <p className={cn(
                    "font-serif text-base leading-snug",
                    isGeorgian && "font-georgian",
                    isActive ? "text-white/80" : "text-white/50"
                  )}>
                    {stage.tagline[language]}
                  </p>
                </div>
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none"
                  className={cn(
                    "mt-1 transition-colors",
                    isActive ? "text-white/60" : "text-white/20"
                  )}
                >
                  <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default ForumPipelineDiagram;
