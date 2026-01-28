import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { exhibitionReveal, imageSettle, staggerContainer, staggerItem } from '@/lib/exhibitionAnimations';

interface ProgramBlockProps {
  /** Layout variant - now includes 'takeover' for 100vh and 'artifact' for reverent small image */
  layout: 'split-photo-right' | 'split-photo-left' | 'full-bleed-overlay' | 'takeover' | 'artifact';
  background: 'navy' | 'white' | 'parchment' | 'black';
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description?: string;
  link: { href: string; label: string };
  language: string;
  imageStyle?: 'default' | 'cinematic';
  /** Override cinematic crop/zoom for split layouts (e.g. "44% 12%", 1.14) */
  imageObjectPosition?: string;
  imageScale?: number;
  /** For takeover: height of the section */
  height?: string;
}

const ProgramBlock: React.FC<ProgramBlockProps> = ({
  layout,
  background,
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  description,
  link,
  language,
  imageStyle = 'default',
  imageObjectPosition,
  imageScale,
  height,
}) => {
  const isGeorgian = language === 'ge';
  
  const bgClass = {
    navy: 'bg-navy',
    white: 'bg-white',
    parchment: 'bg-parchment',
    black: 'bg-black',
  }[background];

  const textColor = background === 'navy' || background === 'black' ? 'text-parchment' : 'text-navy';
  const textMuted = background === 'navy' || background === 'black' ? 'text-parchment/60' : 'text-navy/60';
  const textSubtle = background === 'navy' || background === 'black' ? 'text-parchment/40' : 'text-navy/40';
  
  const isCinematic = imageStyle === 'cinematic';
  const isBlackBg = background === 'black';

  // Takeover layout - 100vh cinematic with text overlay at bottom
  if (layout === 'takeover') {
    const sectionHeight = height || '100vh';
    return (
      <section 
        className={`relative overflow-hidden ${bgClass}`}
        style={{ minHeight: sectionHeight }}
      >
        {/* Full-bleed image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt}
            className="w-full h-full object-cover"
            style={isCinematic ? { objectPosition: imageObjectPosition ?? '50% 30%', transform: `scale(${imageScale ?? 1.1})` } : undefined}
          />
          {/* Gradient overlay - dramatic from bottom */}
          <div className={`absolute inset-0 ${isBlackBg 
            ? 'bg-gradient-to-t from-black via-black/40 to-transparent' 
            : 'bg-gradient-to-t from-navy/90 via-navy/30 to-transparent'
          }`} />
        </motion.div>
        
        {/* Text positioned bottom-left */}
        <div className="relative z-10 h-full flex items-end" style={{ minHeight: sectionHeight }}>
          <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20 pb-16 md:pb-20 lg:pb-24">
            <motion.div 
              className="max-w-2xl"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
            >
              <motion.span 
                className="block text-parchment/40 text-xs tracking-[0.3em] uppercase mb-6"
                variants={staggerItem}
              >
                {eyebrow}
              </motion.span>
              
              <motion.h2 
                className={`text-parchment font-narrative text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-4 ${isGeorgian ? 'font-georgian' : ''}`}
                variants={staggerItem}
              >
                {title}
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`text-parchment/60 text-lg md:text-xl lg:text-2xl font-narrative italic mb-8 ${isGeorgian ? 'font-georgian' : ''}`}
                  variants={staggerItem}
                >
                  {subtitle}
                </motion.p>
              )}
              
              <motion.div variants={staggerItem}>
                <Link 
                  to={link.href}
                  className="inline-block text-parchment/50 hover:text-parchment text-sm tracking-widest uppercase transition-colors duration-500 border-b border-parchment/20 hover:border-parchment/40 pb-1"
                >
                  {link.label}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Artifact layout - reverent small image centered in vast white space
  if (layout === 'artifact') {
    return (
      <section className={`${bgClass} py-32 md:py-48 lg:py-64`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          {/* Centered small image with vast margins */}
          <motion.div 
            className="w-full max-w-2xl mx-auto md:ml-[8%] md:mr-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[4/3] overflow-hidden mb-12 md:mb-16">
              <motion.img 
                src={imageSrc} 
                alt={imageAlt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            
            {/* Text below image */}
            <motion.div 
              className="text-center md:text-left"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
            >
              <motion.span 
                className={`block ${textSubtle} text-xs tracking-[0.3em] uppercase mb-4`}
                variants={staggerItem}
              >
                {eyebrow}
              </motion.span>
              
              <motion.h2 
                className={`${textColor} font-narrative text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight mb-3 ${isGeorgian ? 'font-georgian' : ''}`}
                variants={staggerItem}
              >
                {title}
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`${textMuted} text-base md:text-lg font-narrative italic mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
                  variants={staggerItem}
                >
                  {subtitle}
                </motion.p>
              )}
              
              <motion.div variants={staggerItem}>
                <Link 
                  to={link.href}
                  className={`inline-block ${textMuted} hover:${textColor} text-sm tracking-widest uppercase transition-colors duration-500 border-b ${background === 'navy' || background === 'black' ? 'border-parchment/20 hover:border-parchment/50' : 'border-navy/20 hover:border-navy/50'} pb-1`}
                >
                  {link.label}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Full-bleed overlay layout
  if (layout === 'full-bleed-overlay') {
    return (
      <section className="relative min-h-screen">
        {/* Full-bleed image */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          {...imageSettle}
          viewport={{ once: true, margin: "-10%" }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt}
            className={`w-full h-full object-cover ${isCinematic ? 'scale-[1.15]' : ''}`}
          />
          {/* Gradient overlay for text legibility */}
          <div className={`absolute inset-0 ${isBlackBg 
            ? 'bg-gradient-to-t from-black/90 via-black/50 to-black/30' 
            : 'bg-gradient-to-t from-navy/80 via-navy/40 to-navy/20'
          }`} />
        </motion.div>
        
        {/* Text overlay - offset left */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full px-8 md:px-16 lg:px-20 xl:px-24 py-24">
            <motion.div 
              className="max-w-2xl ml-0 md:ml-[8%]"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-15%" }}
            >
              <motion.span 
                className="block text-parchment/50 text-xs tracking-[0.3em] uppercase mb-8"
                variants={staggerItem}
              >
                {eyebrow}
              </motion.span>
              
              <motion.h2 
                className={`text-parchment font-narrative text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
                variants={staggerItem}
              >
                {title}
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className={`text-parchment/70 text-lg md:text-xl lg:text-2xl font-narrative italic mb-8 ${isGeorgian ? 'font-georgian' : ''}`}
                  variants={staggerItem}
                >
                  {subtitle}
                </motion.p>
              )}
              
              <motion.div variants={staggerItem}>
                <Link 
                  to={link.href}
                  className="inline-block text-parchment/60 hover:text-parchment text-sm tracking-widest uppercase transition-colors duration-500 border-b border-parchment/20 hover:border-parchment/50 pb-1"
                >
                  {link.label}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Split layouts
  const isPhotoRight = layout === 'split-photo-right';

  return (
    <section className={`${bgClass} flex flex-col lg:flex-row ${isCinematic ? '' : 'min-h-screen'}`}>
      {/* Photo side */}
      <motion.div 
        className={`w-full lg:w-[55%] xl:w-[60%] relative overflow-hidden ${isPhotoRight ? 'order-2' : 'order-1 lg:order-1'} ${isCinematic ? 'aspect-[16/7]' : 'min-h-[50vh] lg:min-h-screen'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-full h-full object-cover absolute inset-0"
          style={isCinematic ? { objectPosition: imageObjectPosition ?? '50% 12%', transform: `scale(${imageScale ?? 1.1})` } : undefined}
        />
        {/* Subtle shadow on inner edge */}
        <div className={`absolute inset-y-0 w-24 ${isPhotoRight ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} ${isBlackBg ? 'from-black/40' : 'from-black/10'} to-transparent pointer-events-none hidden lg:block`} />
      </motion.div>
      
      {/* Text side */}
      <div className={`w-full lg:w-[45%] xl:w-[40%] flex items-center ${isPhotoRight ? 'order-1' : 'order-2'}`}>
        <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 lg:py-0">
          <motion.div 
            className="max-w-lg"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-15%" }}
          >
            <motion.span 
              className={`block ${textSubtle} text-xs tracking-[0.3em] uppercase mb-8`}
              variants={staggerItem}
            >
              {eyebrow}
            </motion.span>
            
            <motion.h2 
              className={`${textColor} font-narrative text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
              variants={staggerItem}
            >
              {title}
            </motion.h2>
            
            {subtitle && (
              <motion.p 
                className={`${textMuted} text-lg md:text-xl font-narrative italic mb-6 ${isGeorgian ? 'font-georgian' : ''}`}
                variants={staggerItem}
              >
                {subtitle}
              </motion.p>
            )}
            
            {description && (
              <motion.p 
                className={`${textMuted} text-base md:text-lg leading-relaxed mb-10 max-w-md ${isGeorgian ? 'font-georgian' : ''}`}
                variants={staggerItem}
              >
                {description}
              </motion.p>
            )}
            
            <motion.div variants={staggerItem}>
              <Link 
                to={link.href}
                className={`inline-block ${textMuted} hover:${textColor} text-sm tracking-widest uppercase transition-colors duration-500 border-b ${background === 'navy' ? 'border-parchment/20 hover:border-parchment/50' : 'border-navy/20 hover:border-navy/50'} pb-1`}
              >
                {link.label}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramBlock;
