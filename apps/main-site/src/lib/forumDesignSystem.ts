/**
 * Forum for Justice Design System
 * 
 * TypeScript constants and utilities for consistent styling
 * across all Forum components. Use these instead of ad-hoc values.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const forumColors = {
  // Background hierarchy (darkest to lightest)
  bg: {
    base: 'hsl(220 60% 10%)',
    elevated: 'hsl(220 55% 13%)',
    surface: 'hsl(220 50% 16%)',
    hover: 'hsl(220 45% 18%)',
    accent: 'hsl(45 20% 97%)', // Parchment
  },
  
  // Border hierarchy
  border: {
    quiet: 'hsl(0 0% 100% / 0.06)',
    subtle: 'hsl(0 0% 100% / 0.12)',
    visible: 'hsl(0 0% 100% / 0.2)',
    active: 'hsl(0 0% 100% / 0.35)',
  },
  
  // Text hierarchy
  text: {
    primary: 'hsl(0 0% 100%)',
    secondary: 'hsl(0 0% 100% / 0.7)',
    tertiary: 'hsl(0 0% 100% / 0.5)', // Increased from 0.45 for accessibility
    muted: 'hsl(0 0% 100% / 0.25)',
  },
} as const;

// =============================================================================
// TAILWIND CLASS MAPPINGS
// Use these for consistent className application
// =============================================================================

export const forumClasses = {
  // Background utilities
  bg: {
    base: 'bg-[hsl(220_60%_10%)]',
    elevated: 'bg-[hsl(220_55%_13%)]',
    surface: 'bg-[hsl(220_50%_16%)]',
  },
  
  // Text utilities
  text: {
    primary: 'text-white',
    secondary: 'text-white/70',
    tertiary: 'text-white/50', // Increased from 0.45 for accessibility
    muted: 'text-white/25',
  },
  
  // Border utilities
  border: {
    quiet: 'border-white/[0.06]',
    subtle: 'border-white/[0.12]',
    visible: 'border-white/20',
    active: 'border-white/35',
  },
  
  // Typography utilities (match CSS classes)
  typography: {
    display: 'text-forum-display',
    heading: 'text-forum-heading',
    subheading: 'text-forum-subheading',
    lead: 'text-forum-lead',
    body: 'text-forum-body',
    eyebrow: 'text-forum-eyebrow',
    label: 'text-forum-label',
    caption: 'text-forum-caption',
    number: 'text-forum-number',
  },
  
  // Component utilities
  card: 'forum-card',
  cardActive: 'forum-card forum-card--active',
  cardInteractive: 'forum-card forum-card--interactive',
  
  tabs: 'forum-tabs',
  tab: 'forum-tab',
  tabActive: 'forum-tab forum-tab--active',
  
  divider: 'forum-divider',
  dividerSolid: 'forum-divider--solid',
  
  // Spacing utilities
  section: {
    vast: 'forum-section-vast',
    generous: 'forum-section-generous',
    intimate: 'forum-section-intimate',
  },
  
  stack: 'forum-stack',
  stackTight: 'forum-stack-tight',
  stackLoose: 'forum-stack-loose',
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const forumSpacing = {
  // Section padding (vertical)
  sectionVast: 'clamp(5rem, 10vw, 8rem)',
  sectionGenerous: 'clamp(3rem, 6vw, 5rem)',
  sectionIntimate: 'clamp(2rem, 4vw, 3rem)',
  
  // Card padding
  cardPadding: 'clamp(1.25rem, 3vw, 2rem)',
  
  // Stack gaps
  stackDefault: '1.5rem',
  stackTight: '0.75rem',
  stackLoose: '2.5rem',
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const forumTypography = {
  fontFamily: {
    display: "'Tiempos Headline', Georgia, serif",
    body: "'Tiempos Text', Georgia, serif",
    ui: "'National 2', system-ui, sans-serif",
  },
  
  fontSize: {
    display: 'clamp(2rem, 5vw, 3.5rem)',
    heading: 'clamp(1.5rem, 3vw, 2.25rem)',
    subheading: 'clamp(1.125rem, 2vw, 1.5rem)',
    lead: 'clamp(1.125rem, 2vw, 1.375rem)',
    body: '1.0625rem',
    label: '0.8125rem',
    eyebrow: '0.6875rem',
    caption: '0.75rem',
  },
  
  letterSpacing: {
    tight: '-0.01em',
    normal: '0',
    wide: '0.04em',
    wider: '0.08em',
    widest: '0.18em',
  },
  
  lineHeight: {
    tight: '1.15',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.8',
    loose: '1.85',
  },
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

export const forumEasing = {
  default: [0.22, 1, 0.36, 1] as const,
  slow: [0.16, 1, 0.3, 1] as const,
};

export const forumDuration = {
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
};

// =============================================================================
// ELEVATION TOKENS
// =============================================================================

export const forumElevation = {
  0: {
    background: forumColors.bg.base,
    shadow: 'none',
  },
  1: {
    background: forumColors.bg.elevated,
    shadow: '0 1px 0 0 hsl(0 0% 100% / 0.04)',
  },
  2: {
    background: forumColors.bg.surface,
    shadow: '0 1px 0 0 hsl(0 0% 100% / 0.06), 0 8px 24px -8px hsl(220 60% 5% / 0.5)',
  },
  3: {
    background: 'hsl(220 45% 17%)',
    shadow: '0 1px 0 0 hsl(0 0% 100% / 0.08), 0 16px 48px -12px hsl(220 60% 5% / 0.7)',
  },
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Combines forum classes with optional additional classes
 */
export function forumCn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Returns appropriate Georgian font class if language is Georgian
 */
export function withGeorgian(isGeorgian: boolean): string {
  return isGeorgian ? 'font-georgian' : '';
}
