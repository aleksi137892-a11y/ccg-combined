/**
 * CCG Animation Token System
 * 
 * Canonical animation constants ensuring behavioral consistency
 * across all components. Respects user motion preferences.
 */

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base timing tokens
const baseDurations = {
  instant: 0.1,
  standard: 0.2,
  emphasized: 0.35,
  spatial: 0.4,
} as const;

// Reduced motion durations (near-instant)
const reducedDurations = {
  instant: 0.01,
  standard: 0.01,
  emphasized: 0.01,
  spatial: 0.01,
} as const;

// Easing curves
const easings = {
  // Standard easing for most UI
  standard: [0.25, 0.1, 0.25, 1] as const,
  // Emphasized easing for accordions, modals
  emphasized: [0.22, 1, 0.36, 1] as const,
  // Spatial easing for slide-ups, panels
  spatial: [0.32, 0.72, 0, 1] as const,
} as const;

/**
 * Get duration respecting motion preferences
 */
export const getDuration = (type: keyof typeof baseDurations): number => {
  return prefersReducedMotion() ? reducedDurations[type] : baseDurations[type];
};

/**
 * Transition presets for Framer Motion
 * These automatically respect prefers-reduced-motion
 */
export const transitions = {
  /** Micro-interactions: instant feedback (hovers, focus) */
  instant: () => ({
    duration: getDuration('instant'),
    ease: easings.standard,
  }),
  
  /** Standard UI: buttons, toggles, state changes */
  standard: () => ({
    duration: getDuration('standard'),
    ease: easings.standard,
  }),
  
  /** Emphasized: accordions, modals, reveals */
  emphasized: () => ({
    duration: getDuration('emphasized'),
    ease: easings.emphasized,
  }),
  
  /** Spatial: slide-ups, panels, large movements */
  spatial: () => ({
    duration: getDuration('spatial'),
    ease: easings.spatial,
  }),
} as const;

/**
 * Static transition objects (for cases where function call is awkward)
 * Note: These don't dynamically check reduced motion - use functions when possible
 */
export const staticTransitions = {
  instant: { duration: 0.1, ease: easings.standard },
  standard: { duration: 0.2, ease: easings.standard },
  emphasized: { duration: 0.35, ease: easings.emphasized },
  spatial: { duration: 0.4, ease: easings.spatial },
} as const;

/**
 * CSS transition strings for Tailwind/inline styles
 */
export const cssTransitions = {
  instant: 'transition-all duration-100 ease-out',
  standard: 'transition-all duration-200 ease-out',
  emphasized: 'transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]',
  spatial: 'transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
} as const;

/**
 * Mobile breakpoints and constants
 */
export const mobile = {
  breakpoint: 768,
  panelHeight: '65vh',
  touchTarget: 44, // WCAG minimum in pixels
  safeAreaBottom: 'env(safe-area-inset-bottom, 0px)',
} as const;

/**
 * Hook to check reduced motion preference reactively
 */
export const useReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // This is a simple check - for reactive updates, 
  // components should use the full useMediaQuery hook
  return prefersReducedMotion();
};

export type TransitionType = keyof typeof transitions;
export type EasingType = keyof typeof easings;
