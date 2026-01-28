import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { imageSettle, captionFade, viewportConfig } from '@/lib/exhibitionAnimations';

interface ExhibitionImageProps {
  src: string;
  alt: string;
  /** Presentation mode - controls spatial treatment */
  presentation?: 'full-bleed' | 'framed' | 'offset' | 'reverent';
  /** Optional caption - displayed with curatorial restraint */
  caption?: string;
  /** Caption position */
  captionPosition?: 'below-left' | 'offset-right' | 'floating';
  /** Aspect ratio hint */
  aspectRatio?: 'auto' | 'landscape' | 'portrait' | 'square' | 'cinematic';
  /** Additional classes */
  className?: string;
  /** Container classes */
  containerClassName?: string;
}

const ExhibitionImage: React.FC<ExhibitionImageProps> = ({
  src,
  alt,
  presentation = 'framed',
  caption,
  captionPosition = 'below-left',
  aspectRatio = 'auto',
  className,
  containerClassName
}) => {
  // Presentation-specific container styles
  const presentationContainerStyles = {
    'full-bleed': 'w-full -mx-6 md:-mx-8 lg:mx-0 lg:w-screen lg:relative lg:-left-1/2 lg:translate-x-0 lg:ml-[calc(-50vw+50%)]',
    'framed': 'w-full max-w-3xl mx-auto my-16 md:my-24',
    'offset': 'w-[85%] md:w-[70%] ml-[8%] md:ml-[15%] my-12 md:my-20',
    'reverent': 'w-[60%] md:w-[45%] mx-auto my-20 md:my-32'
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    auto: '',
    landscape: 'aspect-[16/10]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    cinematic: 'aspect-[21/9]'
  };

  // Caption position styles
  const captionPositionStyles = {
    'below-left': 'mt-4 md:mt-6 text-left max-w-md',
    'offset-right': 'mt-4 md:mt-6 ml-auto text-right max-w-sm',
    'floating': 'absolute -bottom-12 left-0 max-w-xs'
  };

  return (
    <figure 
      className={cn(
        'relative',
        presentationContainerStyles[presentation],
        containerClassName
      )}
    >
      <motion.div
        initial={imageSettle.initial}
        whileInView={imageSettle.animate}
        viewport={viewportConfig}
        transition={imageSettle.transition}
        className="overflow-hidden"
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-auto object-cover',
            aspectRatioClasses[aspectRatio],
            presentation === 'full-bleed' && 'min-h-[50vh] md:min-h-[60vh]',
            presentation === 'reverent' && 'shadow-sm',
            className
          )}
          loading="lazy"
        />
      </motion.div>
      
      {caption && (
        <motion.figcaption
          initial={captionFade.initial}
          whileInView={captionFade.animate}
          viewport={viewportConfig}
          transition={captionFade.transition}
          className={cn(
            'text-exhibition-caption',
            captionPositionStyles[captionPosition]
          )}
        >
          {/* Subtle separator line */}
          <span className="block w-10 h-px bg-navy/20 mb-3" aria-hidden="true" />
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
};

export default ExhibitionImage;
