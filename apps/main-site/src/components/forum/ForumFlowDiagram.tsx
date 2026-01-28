import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { exhibitionEase } from '@/lib/exhibitionAnimations';
import { cn } from '@/lib/utils';

interface ForumFlowDiagramProps {
  className?: string;
}

const FLOW_STAGES = [
  {
    id: 'appeal',
    title: { en: 'APPEAL', ge: 'აპელაცია' },
    primary: { 
      en: 'The path to justice begins here.', 
      ge: 'სამართლიანობისკენ მიმავალი გზა აქ იწყება.' 
    },
    secondary: {
      en: `We shepherd every petition toward lawful consequence.`,
      ge: `ჩვენ მივყავართ ყოველ პეტიციას კანონიერი შედეგისკენ.`
    },
  },
  {
    id: 'record',
    title: { en: 'RECORD', ge: 'ჩანაწერი' },
    primary: { 
      en: 'The instrument of interim accountability.', 
      ge: 'დროებითი ანგარიშვალდებულების ინსტრუმენტი.' 
    },
    secondary: {
      en: `While we pursue recourse, there shall be no impunity.`,
      ge: `სანამ გადაწყვეტას ვეძებთ, დაუსჯელობა არ იქნება.`
    },
  },
  {
    id: 'remedy',
    title: { en: 'REMEDY', ge: 'გამოსწორება' },
    primary: { 
      en: 'Justice is always possible.', 
      ge: 'სამართლიანობა ყოველთვის შესაძლებელია.' 
    },
    secondary: {
      en: `We exhaust all channels.`,
      ge: `ჩვენ ყველა არხს ვამოწურავთ.`
    },
  }
];

export function ForumFlowDiagram({ className }: ForumFlowDiagramProps) {
  const { language } = useLanguage();

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-0">
        {FLOW_STAGES.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ 
              duration: 0.6, 
              ease: exhibitionEase,
              delay: index * 0.1
            }}
            className={cn(
              "py-6 border-b border-white/10",
              index === 0 && "border-t"
            )}
          >
            <div className="flex items-start gap-8">
              {/* Stage number */}
              <span className="font-sans text-xs text-white/30 pt-1 w-8 shrink-0">
                0{index + 1}
              </span>
              
              {/* Content */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                {/* Title */}
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 pt-1">
                  {stage.title[language]}
                </h3>
                
                {/* Primary + Secondary */}
                <div className="space-y-2">
                  <p className="font-serif text-lg md:text-xl text-white leading-snug">
                    {stage.primary[language]}
                  </p>
                  <p className="font-serif text-sm text-white/50 leading-relaxed pl-4 border-l border-white/10">
                    {stage.secondary[language]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ForumFlowDiagram;
