/**
 * Exhibition-Grade Animation System
 * 
 * Slower, more intentional animations that feel human and considered
 * rather than animated for novelty. These are designed to guide the viewer
 * the way a physical exhibition guides a visitor through rooms.
 */

// Museum-grade easing curve - feels hand-crafted, not algorithmic
export const exhibitionEase = [0.22, 1, 0.36, 1] as const;

// Slower, contemplative easing
export const slowEase = [0.16, 1, 0.3, 1] as const;

// Exhibition reveal - the primary entrance animation
export const exhibitionReveal = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 1.2, 
    ease: exhibitionEase 
  }
};

// Slow fade - for images and artifacts
export const slowFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: 1.8, 
    ease: [0.16, 1, 0.3, 1] as const
  }
};

// Image settle - photographs entering with reverence
export const imageSettle = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 1.4, 
    ease: exhibitionEase 
  }
};

// Text reveal - typography appearing like wall text
export const textReveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 1.0, 
    ease: exhibitionEase 
  }
};

// Quiet entrance - subtle, almost imperceptible
export const quietEntrance = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: 2.0, 
    ease: [0.16, 1, 0.3, 1] as const
  }
};

// Caption fade - even quieter for supporting text
export const captionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: 1.2, 
    delay: 0.3,
    ease: [0.16, 1, 0.3, 1] as const
  }
};

// Stagger container - for sequential reveals
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.25, // Slower stagger than typical
      delayChildren: 0.1
    }
  }
};

// Stagger item - individual items in a stagger sequence
export const staggerItem = {
  initial: { opacity: 0, y: 25 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.0,
      ease: exhibitionEase
    }
  }
};

// Hero entrance - for major display moments
export const heroEntrance = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 1.6, 
    ease: slowEase 
  }
};

// Section transition - moving between exhibition rooms
export const sectionTransition = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-10%" },
  transition: { 
    duration: 1.4, 
    ease: [0.16, 1, 0.3, 1] as const
  }
};

// Image hover - subtle, respectful interaction
export const imageHover = {
  whileHover: { 
    scale: 1.01,
    transition: { duration: 0.6, ease: exhibitionEase }
  }
};

// Link underline animation (CSS-based, exported as reference)
export const linkUnderlineStyles = `
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    opacity: 0.3;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

// Scroll-triggered variants for framer-motion
export const scrollRevealVariants = {
  offscreen: {
    opacity: 0,
    y: 30
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: exhibitionEase
    }
  }
};

// For use with motion components
export const viewportConfig = {
  once: true,
  margin: "-15%",
  amount: 0.2
};

/* ==========================================================================
   FORUM FOR JUSTICE ANIMATIONS
   Slightly faster for operational UI, but still intentional
   ========================================================================== */

// Forum card reveal - enters with subtle lift
export const forumCardReveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.5, 
    ease: exhibitionEase 
  }
};

// Forum stagger - tighter timing for operational feel
export const forumStagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

// Forum stagger item
export const forumStaggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: exhibitionEase
    }
  }
};

// Forum expand/collapse
export const forumExpand = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: 'auto', 
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: exhibitionEase },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: exhibitionEase },
      opacity: { duration: 0.15 }
    }
  }
};

// Forum hover state
export const forumHoverLift = {
  y: -4,
  transition: { duration: 0.35, ease: exhibitionEase }
};

// Forum section reveal - slower for major sections
export const forumSectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { 
    duration: 0.8, 
    ease: exhibitionEase 
  }
};

// Forum tab content transition
export const forumTabContent = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
  transition: { duration: 0.25, ease: exhibitionEase }
};

// Forum progress line animation
export const forumProgressLine = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: { scaleX: 1 },
  transition: { duration: 0.8, ease: exhibitionEase }
};

// Forum viewport config - less aggressive margins
export const forumViewportConfig = {
  once: true,
  margin: "-5%",
  amount: 0.15
};
