# Civic Council of Georgia — Design System

**Version:** 1.0  
**Last Updated:** January 2026  
**Download:** Right-click → Save As, or access at `/design-system.md`

---

## 1. Brand Overview

### Design Philosophy
Museum-grade, exhibitionary aesthetic with vast negative space and restrained elegance.

### Core Principles
- **No rounded corners** — All elements use sharp geometry
- **Vast negative space** — "Breathing room" between sections
- **Restrained palette** — Navy and parchment, no gold/bronze accents
- **Typography-first** — Content presented with editorial precision
- **Bilingual** — English and Georgian (ქართული) support

---

## 2. Color Palette

### Primary Brand Colors

| Token | HSL | Hex | RGB | Usage |
|-------|-----|-----|-----|-------|
| **Navy** (Primary) | `hsl(220 60% 10%)` | `#0d1520` | `13, 21, 32` | Primary brand, dark backgrounds, text |
| **Navy Light** | `hsl(220 50% 18%)` | `#1a2638` | `26, 38, 56` | Elevated surfaces, hover states |
| **Navy Pale** | `hsl(220 20% 97%)` | `#f5f6f8` | `245, 246, 248` | Light backgrounds |
| **Parchment** | `hsl(45 20% 97%)` | `#f9f8f6` | `249, 248, 246` | Warm light backgrounds |

### Forum (Dark UI) Background Hierarchy

| Level | Token | HSL | Usage |
|-------|-------|-----|-------|
| 0 | Base | `hsl(220 60% 10%)` | Deepest background layer |
| 1 | Elevated | `hsl(220 55% 13%)` | Cards, panels |
| 2 | Surface | `hsl(220 50% 16%)` | Interactive surfaces |
| 3 | Hover | `hsl(220 45% 18%)` | Hover states |
| 4 | Accent | `hsl(45 20% 97%)` | Parchment highlights |

### Text Hierarchy (On Dark Backgrounds)

| Token | Value | Opacity | Usage |
|-------|-------|---------|-------|
| Primary | `#FFFFFF` | 100% | Headlines, important text |
| Secondary | `rgba(255,255,255,0.7)` | 70% | Body text |
| Tertiary | `rgba(255,255,255,0.5)` | 50% | Supporting text, labels |
| Muted | `rgba(255,255,255,0.25)` | 25% | Disabled, decorative |

### Border Hierarchy (On Dark Backgrounds)

| Token | Opacity | CSS Value | Usage |
|-------|---------|-----------|-------|
| Quiet | 6% | `rgba(255,255,255,0.06)` | Subtle separators |
| Subtle | 12% | `rgba(255,255,255,0.12)` | Card borders |
| Visible | 20% | `rgba(255,255,255,0.2)` | Active states |
| Active | 35% | `rgba(255,255,255,0.35)` | Selected items, focus |

---

## 3. Typography System

### Font Families

| Purpose | Font Family | Weights | Format | Fallback |
|---------|-------------|---------|--------|----------|
| **Brand/Wordmark** | Domaine Display | 600 (Semibold) | OTF | Georgia, serif |
| **Headlines** | Tiempos Headline | 400, 400i | OTF | Georgia, serif |
| **Body/Editorial** | Tiempos Text | 400, 400i | OTF | Georgia, serif |
| **UI/Navigation** | National 2 | 400, 500, 700 | OTF | system-ui, sans-serif |
| **Georgian** | Noto Serif Georgian | 400-700 | Google Fonts | Georgia, serif |

### Typography Scale

#### Display XL (Hero Moments)
```
Font-family: Tiempos Headline
Font-size: clamp(2.75rem, 8vw, 5rem)  /* 44px → 80px */
Line-height: 1.12
Letter-spacing: -0.01em
Font-weight: 400
```

#### Display (Section Headers)
```
Font-family: Tiempos Headline
Font-size: clamp(2rem, 5vw, 3.5rem)  /* 32px → 56px */
Line-height: 1.15
Letter-spacing: -0.01em
Font-weight: 400
```

#### Heading (Page Titles)
```
Font-family: Tiempos Headline
Font-size: clamp(1.5rem, 3vw, 2.25rem)  /* 24px → 36px */
Line-height: 1.25
Letter-spacing: -0.01em
Font-weight: 400
```

#### Subheading
```
Font-family: Tiempos Headline
Font-size: clamp(1.125rem, 2vw, 1.5rem)  /* 18px → 24px */
Line-height: 1.3
Letter-spacing: normal
Font-weight: 400
```

#### Lead (Opening Paragraphs)
```
Font-family: Tiempos Text
Font-size: clamp(1.125rem, 2vw, 1.375rem)  /* 18px → 22px */
Line-height: 1.6
Font-weight: 400
```

#### Body
```
Font-family: Tiempos Text
Font-size: 1.0625rem  /* 17px */
Line-height: 1.75
Font-weight: 400
```

#### Eyebrow/Label
```
Font-family: National 2
Font-size: 0.6875rem  /* 11px */
Line-height: 1.4
Letter-spacing: 0.18em
Font-weight: 500
Text-transform: uppercase
```

#### Caption
```
Font-family: Tiempos Text
Font-size: 0.75rem  /* 12px */
Line-height: 1.6
Font-weight: 400
```

#### UI Label
```
Font-family: National 2
Font-size: 0.8125rem  /* 13px */
Line-height: 1.4
Letter-spacing: 0.04em
Font-weight: 500
Text-transform: uppercase
```

#### Navigation
```
Font-family: National 2
Font-size: 0.75rem  /* 12px */
Line-height: 1.4
Letter-spacing: 0.08em
Font-weight: 500
Text-transform: uppercase
```

---

## 4. Spacing System

### Section Spacing (Vertical Padding)

| Token | CSS Value | Pixels (approx) | Usage |
|-------|-----------|-----------------|-------|
| **Vast** | `clamp(8rem, 15vw, 16rem)` | 128px → 256px | Major exhibition transitions |
| **Generous** | `clamp(5rem, 10vw, 10rem)` | 80px → 160px | Section breaks |
| **Intimate** | `clamp(3rem, 6vw, 5rem)` | 48px → 80px | Related content groups |

### Stack Spacing (Between Elements)

| Token | Value | Usage |
|-------|-------|-------|
| Tight | `0.75rem` (12px) | Compact lists, labels |
| Default | `1.5rem` (24px) | Standard element spacing |
| Loose | `2.5rem` (40px) | Major content breaks |

### Card Padding
```
clamp(1.25rem, 3vw, 2rem)  /* 20px → 32px */
```

### Container Max-Widths

| Context | Max-Width | Usage |
|---------|-----------|-------|
| Prose/Reading | `44ch` | Body text columns |
| Content | `65ch` | Wide content areas |
| Container | `1400px` | Overall page container |

---

## 5. Geometry & Borders

### Border Radius
```css
--radius: 0
/* All corners are sharp — no rounded elements */
```

### Border Widths
```css
--border-default: 1px
--border-active: 1px  /* Color change, not width */
```

### Dividers

| Type | CSS |
|------|-----|
| Light bg | `1px solid rgba(13, 21, 32, 0.1)` |
| Dark bg | `1px solid rgba(255, 255, 255, 0.12)` |

---

## 6. Elevation System (Dark UI)

| Level | Background | Box-Shadow | Usage |
|-------|------------|------------|-------|
| **0** | `hsl(220 60% 10%)` | none | Page background |
| **1** | `hsl(220 55% 13%)` | `0 1px 0 0 rgba(255,255,255,0.04)` | Cards, panels |
| **2** | `hsl(220 50% 15%)` | `0 1px 0 0 rgba(255,255,255,0.06), 0 8px 24px -8px rgba(13,21,32,0.5)` | Modals, dropdowns |
| **3** | `hsl(220 45% 17%)` | `0 1px 0 0 rgba(255,255,255,0.08), 0 16px 48px -12px rgba(13,21,32,0.7)` | Overlays, mega-menus |

---

## 7. Animation Tokens

### Easing Curves

| Token | Cubic-Bezier | CSS | Usage |
|-------|--------------|-----|-------|
| **Default** | `0.22, 1, 0.36, 1` | `cubic-bezier(0.22, 1, 0.36, 1)` | Most transitions |
| **Slow** | `0.16, 1, 0.3, 1` | `cubic-bezier(0.16, 1, 0.3, 1)` | Dramatic reveals |
| **Exhibition** | `0.22, 1, 0.36, 1` | `cubic-bezier(0.22, 1, 0.36, 1)` | Page transitions |

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| Fast | `0.25s` / `250ms` | Micro-interactions, hover |
| Normal | `0.4s` / `400ms` | Standard transitions |
| Slow | `0.6s` / `600ms` | Section reveals |
| Slower | `0.8s` / `800ms` | Hero animations |
| Exhibition | `1.2s` - `1.8s` | Cinematic reveals |

### Stagger Delays
```
Standard: 100ms between items
Exhibition: 200-300ms between items
```

---

## 8. Component Patterns

### Cards (Forum Dark UI)
```css
.card {
  background: hsl(220 55% 13%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: clamp(1.25rem, 3vw, 2rem);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover {
  background: hsl(220 50% 15%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(13, 21, 32, 0.5);
}

.card:active,
.card--selected {
  background: hsl(220 45% 17%);
  border-color: rgba(255, 255, 255, 0.35);
}
```

### Tabs (Forum Dark UI)
```css
.tab {
  font-family: 'National 2', sans-serif;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.75rem 1rem;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.8);
}

.tab--active {
  color: white;
  border-bottom-color: white;
}
```

### Links
```css
.link {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid rgba(currentColor, 0.2);
  transition: border-color 0.3s ease;
}

.link:hover {
  border-bottom-color: currentColor;
}
```

### Buttons

#### Primary (Dark bg)
```css
.button-primary {
  font-family: 'National 2', sans-serif;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: white;
  color: hsl(220 60% 10%);
  padding: 0.875rem 1.5rem;
  border: none;
  transition: all 0.3s ease;
}

.button-primary:hover {
  background: rgba(255, 255, 255, 0.9);
}
```

#### Secondary (Dark bg)
```css
.button-secondary {
  font-family: 'National 2', sans-serif;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: white;
  padding: 0.875rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  transition: all 0.3s ease;
}

.button-secondary:hover {
  border-color: white;
  background: rgba(255, 255, 255, 0.05);
}
```

---

## 9. Logo Assets

### Variants

| Variant | Filename | Dimensions | Usage |
|---------|----------|------------|-------|
| Wordmark Full (SVG) | `logo-wordmark-full.svg` | Vector | Primary, scalable |
| Wordmark Full (PNG) | `logo-wordmark-full.png` | 800×200 | Fallback |
| Wordmark Navy | `logo-wordmark-navy.png` | — | Light backgrounds |
| Wordmark White | `logo-wordmark-white.png` | — | Dark backgrounds |
| Monogram Navy | `logo-monogram-navy.png` | 200×200 | Compact, favicon |
| Monogram White | `logo-monogram-white.png` | 200×200 | Dark backgrounds |
| CCG Wordmark Alt | `logo-ccg-wordmark-alt.png` | — | Alternate lockup |

### Usage Guidelines
- Minimum size: 120px width for wordmark
- Clear space: 1× the height of the "C" monogram
- Never distort, rotate, or add effects
- Use Navy variant on white/light backgrounds
- Use White variant on navy/dark backgrounds

---

## 10. Font Files

All fonts located in `/public/fonts/`:

### Domaine Display
```
DomaineDisplay-Semibold.otf
TestDomaineDisplay-Bold.otf
TestDomaineDisplay-Semibold.otf
```

### Tiempos Headline
```
TiemposHeadline-Regular.otf
TiemposHeadline-Italic.otf
```

### Tiempos Text
```
TiemposText-Regular.otf
TiemposText-Italic.otf
```

### National 2
```
National2-Regular.otf
National2-Medium.otf
National2-Bold.otf
```

### Georgian (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Georgian:wght@400;500;600;700&display=swap');
```

---

## 11. CSS Custom Properties Reference

```css
:root {
  /* Colors */
  --background: 220 20% 97%;
  --foreground: 220 60% 10%;
  --primary: 220 60% 10%;
  --primary-foreground: 220 20% 97%;
  --secondary: 220 20% 96%;
  --secondary-foreground: 220 60% 10%;
  --muted: 220 20% 96%;
  --muted-foreground: 220 20% 45%;
  --accent: 220 20% 96%;
  --accent-foreground: 220 60% 10%;
  --border: 220 20% 90%;
  --ring: 220 60% 10%;
  
  /* Navy palette */
  --navy: 220 60% 10%;
  --navy-light: 220 50% 18%;
  --navy-pale: 220 20% 97%;
  --parchment: 45 20% 97%;
  
  /* Geometry */
  --radius: 0;
}
```

---

## 12. Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1400px | Container max |

---

## 13. Accessibility Notes

- Contrast ratios meet WCAG AA (4.5:1 for body text)
- Focus states use visible outlines, not just color
- All interactive elements have minimum 44×44px touch targets
- Animation respects `prefers-reduced-motion`
- Georgian text uses appropriate font stack

---

## Contact

For questions about the design system or brand usage:
**design@ccg.ge**

---

*This document is generated from the live codebase. For the most current values, refer to:*
- `tailwind.config.ts`
- `src/index.css`
- `src/lib/forumDesignSystem.ts`
