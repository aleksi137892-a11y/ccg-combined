import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { iimgContent } from '@/data/iimgContent';
import iimgPhoto from '@/assets/forum-user-photo-alt.jpg';

interface IIMGFeatureBlockProps {
  language: 'en' | 'ge';
  embedded?: boolean;
}

const IIMG_EXTERNAL_URL = 'https://iimg.sabcho.org';

export function IIMGFeatureBlock({ language, embedded = false }: IIMGFeatureBlockProps) {
  const isGeorgian = language === 'ge';
  
  const content = {
    eyebrow: isGeorgian ? 'საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი (IIMG)' : 'Independent Investigative Mechanism for Georgia (IIMG)',
    title: isGeorgian 
      ? iimgContent.meta.mandateTitleGe 
      : iimgContent.meta.mandateTitle,
    description: isGeorgian 
      ? iimgContent.meta.mandateDescriptionGe 
      : iimgContent.meta.mandateDescription,
    cta: isGeorgian ? 'მტკიცებულების წარდგენა' : 'Submit Evidence',
    learnMore: isGeorgian ? 'IIMG საიტზე გადასვლა' : 'Visit IIMG Site',
  };

  return (
    <section className="bg-navy text-primary-foreground">
      <motion.div 
        className="flex flex-col lg:flex-row"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image section - fixed aspect ratio */}
        <div className="w-full lg:w-2/5 relative">
          <div className="aspect-[4/3] lg:aspect-[3/4] relative">
            <img 
              src={iimgPhoto}
              alt="Independent Investigative Mechanism - documenting evidence"
              className="w-full h-full object-cover absolute inset-0"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy/30 hidden lg:block" />
          </div>
        </div>
        
        {/* Content section */}
        <div className="w-full lg:w-3/5 flex items-center">
          <motion.div 
            className="px-8 md:px-12 lg:px-20 py-10 lg:py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <span className="font-sans text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-primary-foreground/70 mb-6 block leading-[1.4]">
              {content.eyebrow}
            </span>
            
            {/* Title */}
            <h2 className="font-headline text-[1.35rem] md:text-[1.625rem] lg:text-[1.875rem] text-primary-foreground mb-6 leading-[1.25] tracking-[0.02em] max-w-[22ch]">
              {content.title}
            </h2>
            
            {/* Description */}
            <p className="font-serif text-[15px] md:text-[17px] text-primary-foreground/80 leading-[1.85] mb-10 max-w-[44ch] tracking-[0.015em]">
              {content.description}
            </p>
            
            {/* CTAs - all external to IIMG */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={IIMG_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-primary-foreground text-navy font-sans text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {content.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              
              <a 
                href={IIMG_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-primary-foreground/30 text-primary-foreground font-sans text-[11px] tracking-[0.15em] uppercase px-6 py-3 hover:border-primary-foreground/60 transition-colors"
              >
                {content.learnMore}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
