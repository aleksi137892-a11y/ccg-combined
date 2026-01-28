import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ArchitectureStage {
  id: string;
  label: string;
  labelGe: string;
  tagline: string;
  taglineGe: string;
  description: string;
  descriptionGe: string;
}

const STAGES: ArchitectureStage[] = [
  {
    id: 'appeal',
    label: 'APPEAL',
    labelGe: 'აპელაცია',
    tagline: 'The path to justice begins here',
    taglineGe: 'სამართლიანობისკენ გზა აქ იწყება',
    description: 'We shepherd every petition toward lawful consequence.',
    descriptionGe: 'ჩვენ ვატარებთ ყველა პეტიციას კანონიერი შედეგისკენ.'
  },
  {
    id: 'record',
    label: 'RECORD',
    labelGe: 'ჩანაწერი',
    tagline: 'The instrument of interim accountability',
    taglineGe: 'დროებითი ანგარიშვალდებულების ინსტრუმენტი',
    description: 'While we pursue recourse, there shall be no impunity.',
    descriptionGe: 'სანამ ვეძებთ დაცვას, დაუსჯელობა არ იქნება.'
  },
  {
    id: 'remedy',
    label: 'REMEDY',
    labelGe: 'გამოსწორება',
    tagline: 'Justice is always possible',
    taglineGe: 'სამართლიანობა ყოველთვის შესაძლებელია',
    description: 'We exhaust all channels for lawful consequence.',
    descriptionGe: 'ჩვენ ამოვწურავთ ყველა არხს კანონიერი შედეგისთვის.'
  }
];

interface ForumArchitectureDiagramProps {
  className?: string;
  onStageClick?: (stageId: string) => void;
}

export const ForumArchitectureDiagram: React.FC<ForumArchitectureDiagramProps> = ({ 
  className,
  onStageClick 
}) => {
  const { isGeorgian } = useLanguage();
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<Record<string, boolean>>({
    appeal: false,
    record: false,
    remedy: false
  });

  // Track which sections are in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['appeal', 'record', 'remedy'];
      const newProgress: Record<string, boolean> = {};
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const inView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3;
          newProgress[sectionId] = inView;
        }
      });
      
      setScrollProgress(newProgress);
      
      // Set active based on which is most in view
      const activeSection = sections.find(id => newProgress[id]);
      setActiveStage(activeSection || null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (stageId: string) => {
    const element = document.getElementById(stageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onStageClick?.(stageId);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Horizontal flow container */}
      <div className="flex flex-col lg:flex-row items-stretch gap-0">
        {STAGES.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            {/* Stage Card */}
            <motion.button
              onClick={() => handleClick(stage.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'group relative flex-1 text-left transition-all duration-300',
                'border border-white/20 hover:border-white/40',
                'p-6 lg:p-8',
                activeStage === stage.id 
                  ? 'bg-white text-navy' 
                  : 'bg-white/5 hover:bg-white/10'
              )}
            >
              {/* Stage Number */}
              <div className={cn(
                'font-sans text-[10px] tracking-[0.3em] uppercase mb-4',
                activeStage === stage.id ? 'text-navy/40' : 'text-white/30'
              )}>
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Stage Label */}
              <h3 className={cn(
                'font-narrative text-2xl lg:text-3xl mb-3 transition-colors',
                activeStage === stage.id ? 'text-navy' : 'text-white',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian ? stage.labelGe : stage.label}
              </h3>

              {/* Tagline */}
              <p className={cn(
                'font-serif text-sm italic mb-4',
                activeStage === stage.id ? 'text-navy/60' : 'text-white/50',
                isGeorgian && 'font-georgian'
              )}>
                "{isGeorgian ? stage.taglineGe : stage.tagline}"
              </p>

              {/* Description */}
              <p className={cn(
                'font-serif text-sm leading-relaxed',
                activeStage === stage.id ? 'text-navy/70' : 'text-white/60',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian ? stage.descriptionGe : stage.description}
              </p>

              {/* Click indicator */}
              <div className={cn(
                'absolute bottom-4 right-4 font-sans text-[10px] tracking-widest uppercase transition-opacity',
                activeStage === stage.id ? 'text-navy/40' : 'text-white/30',
                'opacity-0 group-hover:opacity-100'
              )}>
                {isGeorgian ? 'გადასვლა' : 'Navigate'}
              </div>

              {/* Active indicator bar */}
              <div className={cn(
                'absolute bottom-0 left-0 right-0 h-1 transition-all duration-300',
                activeStage === stage.id ? 'bg-navy' : 'bg-transparent'
              )} />
            </motion.button>

            {/* Connector Arrow */}
            {idx < STAGES.length - 1 && (
              <div className="hidden lg:flex items-center justify-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-white/30" />
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    className="text-white/50"
                  >
                    <path 
                      d="M1 6H11M11 6L6 1M11 6L6 11" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Mobile connector */}
            {idx < STAGES.length - 1 && (
              <div className="lg:hidden flex items-center justify-center py-3">
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  className="text-white/30 rotate-90"
                >
                  <path 
                    d="M1 6H11M11 6L6 1M11 6L6 11" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress Indicator (subtle, below diagram) */}
      <div className="mt-8 flex justify-center gap-3">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => handleClick(stage.id)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              activeStage === stage.id 
                ? 'bg-white scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Navigate to ${stage.label}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ForumArchitectureDiagram;
