// Shared animation variants for Framer Motion
// These provide institutional gravitas through considered motion

import { Variants } from 'motion/react';

// Fade in with subtle upward movement
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom ease for weight
    }
  }
};

// Fade in with subtle scale - for emphasis elements
export const fadeInScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.97,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Settle animation - institutional weight, slower reveal
export const settleIn: Variants = {
  hidden: { 
    opacity: 0, 
    y: 24,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Stagger container for lists and grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

// Stagger container - slower for more gravitas
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    }
  }
};

// Stagger child item
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Card hover animation
export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  hover: {
    scale: 1.01,
    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Reveal from left with fade
export const revealLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Line draw animation (for decorative borders)
export const lineReveal: Variants = {
  hidden: { 
    scaleX: 0,
    originX: 0,
  },
  visible: { 
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Page transition wrapper variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    }
  }
};

// Accordion content variants
export const accordionContent: Variants = {
  collapsed: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  expanded: { 
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Viewport options for scroll-triggered animations
export const viewportOnce = { once: true, margin: '-50px' };
export const viewportAlways = { once: false, margin: '-50px' };

// Utility to create delayed variants
export const withDelay = (variants: Variants, delay: number): Variants => {
  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...((variants.visible as { transition?: object })?.transition ?? {}),
        delay,
      }
    }
  };
};
