import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface FloatingIIMGBlockProps {
  imageSrc: string;
  className?: string;
}

const IIMG_EXTERNAL_URL = 'https://iimg.sabcho.org';

export function FloatingIIMGBlock({ imageSrc, className }: FloatingIIMGBlockProps) {
  const { language, isGeorgian } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const frameOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const frameScale = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1]);

  return (
    <motion.div 
      ref={containerRef}
      className={cn("relative", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col lg:flex-row gap-0 border border-white/10 overflow-hidden">
        {/* Image section with parallax */}
        <motion.div 
          className="w-full lg:w-1/2 relative overflow-hidden"
          style={{ y: imageY }}
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative">
            <img 
              src={imageSrc}
              alt="Independent Investigative Mechanism - documenting evidence"
              className="w-full h-full object-cover"
            />
            
            {/* Forensic corner brackets */}
            <motion.div 
              className="absolute inset-4 pointer-events-none"
              style={{ opacity: frameOpacity, scale: frameScale }}
            >
              {/* Top left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/40" />
              {/* Top right */}
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/40" />
              {/* Bottom left */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/40" />
              {/* Bottom right */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/40" />
            </motion.div>

            {/* Subtle scanline effect */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)'
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy/60 hidden lg:block" />
          </div>
        </motion.div>
        
        {/* Content section with parallax */}
        <motion.div 
          className="w-full lg:w-1/2 flex items-center bg-navy"
          style={{ y: contentY }}
        >
          <div className="px-8 md:px-12 lg:px-16 py-12 lg:py-16">
            {/* Eyebrow */}
            <motion.span 
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 mb-6 block"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {isGeorgian 
                ? 'საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი (IIMG)' 
                : 'Independent Investigative Mechanism for Georgia (IIMG)'}
            </motion.span>
            
            {/* Headline */}
            <motion.h2 
              className={cn(
                "font-narrative text-2xl md:text-3xl text-white mb-6 max-w-[22ch]",
                isGeorgian && "font-georgian"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {isGeorgian 
                ? 'სისტემატური მტკიცებულებების შეგროვება ანგარიშვალდებულებისთვის' 
                : 'Systematic evidence collection for accountability'}
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              className={cn(
                "font-serif text-base text-white/60 leading-[1.85] mb-8 max-w-[44ch]",
                isGeorgian && "font-georgian"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {isGeorgian 
                ? 'დამოუკიდებელი საგამოძიებო მექანიზმი აგროვებს, ამოწმებს და ინახავს მტკიცებულებებს სერიოზული დანაშაულების შესახებ საერთაშორისო სასამართლოებისა და ეროვნული იურისდიქციების მომავალი გამოყენებისთვის.' 
                : 'The Independent Investigative Mechanism collects, verifies, and preserves evidence of serious crimes for future use by international courts and national jurisdictions.'}
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href={IIMG_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-navy font-sans text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:bg-white/90 transition-colors group"
              >
                {isGeorgian ? 'მტკიცებულების წარდგენა' : 'Submit Evidence'}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              
              <a 
                href={IIMG_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-white/30 text-white font-sans text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:border-white/60 transition-colors group"
              >
                {isGeorgian ? 'IIMG საიტი' : 'Visit IIMG Site'}
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FloatingIIMGBlock;
