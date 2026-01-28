# Civic Council of Georgia — Design System

**Version:** 1.0.0  
**Generated:** 2026-01-26  
**Source:** Extracted from `tailwind.config.ts`, `src/index.css`, `src/lib/forumDesignSystem.ts`

---

## Brand Philosophy

Museum-grade, exhibitionary aesthetic with vast negative space and restrained elegance. The design prioritizes spatial composition over standard grids, using asymmetrical balance and generous vertical spacing.

### Core Principles

- No rounded corners — all elements use sharp geometry
- Vast negative space — "breathing room" between sections
- Restrained palette — navy and parchment, no gold/bronze accents
- Typography-first — content presented with editorial precision
- Bilingual — English and Georgian (ქართული) support

---

## Color System

### Brand Colors

| Token | HSL | Usage |
|-------|-----|-------|
| `navy` | `220 60% 10%` | Primary brand, dark backgrounds, text |
| `navy-light` | `220 50% 18%` | Elevated surfaces, hover states |
| `navy-pale` | `220 20% 97%` | Light backgrounds |
| `parchment` | `45 20% 97%` | Warm authority background |

### Surface Colors (Forum Dark UI)

| Level | Token | HSL | Usage |
|-------|-------|-----|-------|
| 0 | `base` | `220 60% 10%` | Deepest background layer |
| 1 | `elevated` | `220 55% 13%` | Cards, panels |
| 2 | `surface` | `220 50% 16%` | Interactive surfaces |
| 3 | `hover` | `220 45% 18%` | Hover states |
| 4 | `accent` | `45 20% 97%` | Parchment highlights |

### Text Colors (Light Backgrounds)

| Token | HSL | Usage |
|-------|-----|-------|
| `foreground` | `220 60% 10%` | Primary text |
| `muted-foreground` | `220 15% 45%` | Muted text |

### Text Colors (Dark Backgrounds)

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `hsl(0 0% 100%)` | Headlines, important text |
| `secondary` | `hsl(0 0% 100% / 0.7)` | Body text |
| `tertiary` | `hsl(0 0% 100% / 0.5)` | Supporting text, labels |
| `muted` | `hsl(0 0% 100% / 0.25)` | Disabled, decorative |

### Border Colors (Dark Backgrounds)

| Token | Opacity | Usage |
|-------|---------|-------|
| `quiet` | `0.06` | Subtle separators |
| `subtle` | `0.12` | Card borders |
| `visible` | `0.2` | Active states |
| `active` | `0.35` | Selected items, focus |

### Semantic Colors

| Token | HSL | Usage |
|-------|-----|-------|
| `primary` | `220 60% 15%` | Primary action |
| `primary-foreground` | `0 0% 100%` | Text on primary |
| `secondary` | `220 20% 97%` | Secondary action |
| `secondary-foreground` | `220 60% 15%` | Text on secondary |
| `accent` | `220 60% 15%` | Accent color |
| `accent-foreground` | `0 0% 100%` | Text on accent |
| `destructive` | `0 84.2% 60.2%` | Destructive action |
| `destructive-foreground` | `210 40% 98%` | Text on destructive |

---

## Typography System

### Font Families

| Purpose | Font Family | Weights | Usage |
|---------|-------------|---------|-------|
| Brand/Wordmark | Domaine Display | 600 | "CIVIC COUNCIL OF GEORGIA" |
| Headlines | Tiempos Headline | 400, 400i | Display, headings, quotes |
| Body/Editorial | Tiempos Text | 400, 400i | Body prose, captions |
| UI/Navigation | National 2 | 400, 500, 700 | Labels, buttons, nav |
| Georgian | Noto Serif Georgian | 400-700 | Georgian language text |

### Type Scale

#### Display XL

```
font-family: Tiempos Headline
font-size: clamp(2.75rem, 8vw, 5rem)
line-height: 1.12
letter-spacing: -0.01em
font-weight: 400
```

#### Display

```
font-family: Tiempos Headline
font-size: clamp(2rem, 5vw, 3.5rem)
line-height: 1.15
letter-spacing: -0.01em
font-weight: 400
```

#### Display SM

```
font-family: Tiempos Headline
font-size: clamp(1.5rem, 4vw, 2.5rem)
line-height: 1.15
letter-spacing: -0.015em
font-weight: 400
```

#### Heading

```
font-family: Tiempos Headline
font-size: clamp(1.5rem, 3vw, 2.25rem)
line-height: 1.2
letter-spacing: -0.01em
font-weight: 400
```

#### Subheading

```
font-family: Tiempos Headline
font-size: clamp(1.125rem, 2vw, 1.5rem)
line-height: 1.3
letter-spacing: 0
font-weight: 400
```

#### Lead

```
font-family: Tiempos Text
font-size: clamp(1.125rem, 2vw, 1.375rem)
line-height: 1.6
font-weight: 400
```

#### Body

```
font-family: Tiempos Text
font-size: 1.0625rem
line-height: 1.75
font-weight: 400
```

#### Body Large

```
font-family: Tiempos Text
font-size: 1.25rem
line-height: 1.7
font-weight: 400
```

#### Label

```
font-family: National 2
font-size: 0.8125rem
letter-spacing: 0.04em
font-weight: 500
text-transform: uppercase
```

#### Label Large

```
font-family: National 2
font-size: 0.875rem
letter-spacing: 0.06em
font-weight: 500
text-transform: uppercase
```

#### Eyebrow

```
font-family: National 2
font-size: 0.6875rem
letter-spacing: 0.18em
font-weight: 500
text-transform: uppercase
```

#### Caption

```
font-family: Tiempos Text
font-size: 0.75rem
line-height: 1.6
font-weight: 400
```

#### Navigation

```
font-family: National 2
font-size: 0.875rem
letter-spacing: 0.01em
font-weight: 500
text-transform: uppercase
```

#### Brand Wordmark

```
font-family: Domaine Display
font-size: 0.75rem
letter-spacing: 0.08em
font-weight: 600
text-transform: uppercase
```

### Georgian Typography

```
font-family: Noto Serif Georgian
letter-spacing: 0.01em
word-spacing: 0.05em
line-height: 1.85
```

Georgian headings:
```
letter-spacing: 0.02em
word-spacing: 0.08em
line-height: 1.45
```

---

## Spacing System

### Section Spacing (Vertical Padding)

| Token | Value | Usage |
|-------|-------|-------|
| `vast` | `clamp(8rem, 15vw, 16rem)` | Major exhibition transitions |
| `generous` | `clamp(5rem, 10vw, 10rem)` | Section breaks |
| `intimate` | `clamp(3rem, 6vw, 5rem)` | Related content groups |
| `forum-vast` | `clamp(5rem, 10vw, 8rem)` | Forum section vast |
| `forum-generous` | `clamp(3rem, 6vw, 5rem)` | Forum section generous |
| `forum-intimate` | `clamp(2rem, 4vw, 3rem)` | Forum section intimate |
| `museum-section` | `clamp(4rem, 10vw, 8rem)` | Museum section padding |

### Stack Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | `0.75rem` | Compact lists, labels |
| `default` | `1.5rem` | Standard element spacing |
| `loose` | `2.5rem` | Major content breaks |

### Card Padding

```
clamp(1.25rem, 3vw, 2rem)
```

### Container Max-Widths

| Context | Value | Usage |
|---------|-------|-------|
| `prose` | `44ch` | Body text columns |
| `content` | `65ch` | Wide content areas |
| `max` | `1400px` | Overall page container |

### Space Scale

| Token | Value |
|-------|-------|
| `0` | `0` |
| `1` | `0.25rem` |
| `2` | `0.5rem` |
| `3` | `0.75rem` |
| `4` | `1rem` |
| `5` | `1.25rem` |
| `6` | `1.5rem` |
| `8` | `2rem` |
| `10` | `2.5rem` |
| `12` | `3rem` |
| `16` | `4rem` |
| `20` | `5rem` |
| `24` | `6rem` |
| `32` | `8rem` |
| `40` | `10rem` |
| `48` | `12rem` |
| `64` | `16rem` |

---

## Elevation System

| Level | Background | Shadow | Usage |
|-------|------------|--------|-------|
| 0 | `hsl(220 60% 10%)` | none | Page background |
| 1 | `hsl(220 55% 13%)` | `0 1px 0 0 hsl(0 0% 100% / 0.04)` | Cards, panels |
| 2 | `hsl(220 50% 15%)` | `0 1px 0 0 hsl(0 0% 100% / 0.06), 0 8px 24px -8px hsl(220 60% 5% / 0.5)` | Modals, dropdowns |
| 3 | `hsl(220 45% 17%)` | `0 1px 0 0 hsl(0 0% 100% / 0.08), 0 16px 48px -12px hsl(220 60% 5% / 0.7)` | Overlays, mega-menus |

### Interactive Elevations

| State | Shadow |
|-------|--------|
| Card hover | `0 8px 32px -8px hsl(220 60% 5% / 0.6)` |
| Card active | `0 12px 40px -8px hsl(220 60% 5% / 0.7)` |

---

## Motion System

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `fast` | `0.25s` | Micro-interactions, hover |
| `normal` | `0.4s` | Standard transitions |
| `slow` | `0.6s` | Section reveals |
| `slower` | `0.8s` | Hero animations |
| `settle` | `0.7s` | Weighted settling animation |
| `exhibition` | `1.2s` | Cinematic reveals |
| `exhibition-slow` | `1.8s` | Slow cinematic reveals |
| `ken-burns` | `18s` | Ken Burns effect |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `default` | `cubic-bezier(0.22, 1, 0.36, 1)` | Most transitions |
| `slow` | `cubic-bezier(0.16, 1, 0.3, 1)` | Dramatic reveals |
| `standard` | `ease` | Simple transitions |
| `ease-out` | `ease-out` | Fade animations |

### Stagger Delays

| Token | Value | Usage |
|-------|-------|-------|
| `standard` | `100ms` | Standard stagger |
| `exhibition` | `200ms` | Exhibition stagger |

---

## Border & Radius

### Border Width

| Token | Value |
|-------|-------|
| `default` | `1px` |
| `active` | `1px` |

### Border Radius

```
--radius: 0
```

All corners are sharp — no rounded elements.

---

## Component Patterns

### Card (Forum Dark UI)

```css
.forum-card {
  padding: clamp(1.25rem, 3vw, 2rem);
  background: hsl(220 55% 13%);
  border: 1px solid hsl(0 0% 100% / 0.08);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.forum-card:hover {
  background: hsl(220 50% 15%);
  border-color: hsl(0 0% 100% / 0.15);
  box-shadow: 0 8px 32px -8px hsl(220 60% 5% / 0.6);
}

.forum-card--active {
  background: hsl(220 45% 17%);
  border-color: hsl(0 0% 100% / 0.25);
  box-shadow: 0 12px 40px -8px hsl(220 60% 5% / 0.7);
}

.forum-card--interactive:hover {
  transform: translateY(-2px);
}
```

### Tabs (Forum Dark UI)

```css
.forum-tab {
  font-family: 'National 2', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: hsl(0 0% 100% / 0.5);
  padding: 1rem 1.5rem;
  border-bottom: 2px solid transparent;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.forum-tab:hover {
  color: hsl(0 0% 100% / 0.8);
  background: hsl(0 0% 100% / 0.02);
}

.forum-tab--active {
  color: hsl(0 0% 100%);
  border-bottom-color: hsl(0 0% 100%);
}
```

### Links

```css
.exhibition-link-standalone {
  color: hsl(var(--navy));
  font-family: 'Tiempos Text', Georgia, serif;
  font-size: 1rem;
  letter-spacing: 0.01em;
  padding-bottom: 3px;
  border-bottom: 1px solid hsl(var(--navy) / 0.2);
  transition: border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.exhibition-link-standalone:hover {
  border-color: hsl(var(--navy) / 0.6);
}

.forum-link {
  color: hsl(0 0% 100% / 0.7);
  border-bottom: 1px solid hsl(0 0% 100% / 0.2);
  transition: all 0.3s ease;
}

.forum-link:hover {
  color: hsl(0 0% 100%);
  border-bottom-color: hsl(0 0% 100% / 0.5);
}
```

### Buttons

#### Primary (Dark Background)

```css
.btn-primary {
  font-family: 'National 2', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: hsl(var(--navy));
  color: hsl(var(--primary-foreground));
  padding: 1rem 2rem;
  transition: opacity 0.3s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}
```

#### Outline

```css
.btn-outline {
  font-family: 'National 2', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid currentColor;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: currentColor;
  color: hsl(var(--background));
}
```

### Dividers

```css
.forum-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsl(0 0% 100% / 0.1) 20%,
    hsl(0 0% 100% / 0.1) 80%,
    transparent 100%
  );
}

.forum-divider--solid {
  background: hsl(0 0% 100% / 0.1);
}
```

---

## Contextual Token Layer

### context.institutional

Governance, records, system UI surfaces. Applied to administrative interfaces, data tables, and system-level components.

### context.appeal

Human-facing, rights-bearing, remedy-related surfaces. Applied to Forum for Justice components, remedy pathways, and appeal interfaces.

---

## Accessibility

- Contrast ratios meet WCAG AA (4.5:1 for body text)
- Focus states use visible outlines
- All interactive elements have minimum 44×44px touch targets
- Animation respects `prefers-reduced-motion`
- Georgian text uses appropriate font stack with enhanced line-height

---

## Breakpoints

| Token | Width | Usage |
|-------|-------|-------|
| `sm` | `640px` | Mobile landscape |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Desktop |
| `xl` | `1280px` | Large desktop |
| `2xl` | `1400px` | Container max |

---

## Font Files

Located in `/public/fonts/`:

### Domaine Display
- `DomaineDisplay-Semibold.otf`
- `TestDomaineDisplay-Bold.otf`
- `TestDomaineDisplay-Semibold.otf`

### Tiempos Headline
- `TiemposHeadline-Regular.otf`
- `TiemposHeadline-Italic.otf`

### Tiempos Text
- `TiemposText-Regular.otf`
- `TiemposText-Italic.otf`

### National 2
- `National2-Regular.otf`
- `National2-Medium.otf`
- `National2-Bold.otf`

### Georgian (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Georgian:wght@400;500;600;700&display=swap');
```

---

*This document is the authoritative design system reference. Source files: `tailwind.config.ts`, `src/index.css`, `src/lib/forumDesignSystem.ts`*
