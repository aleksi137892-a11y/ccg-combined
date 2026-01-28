# Canonical Design Specification

**Version:** 1.0  
**Last Updated:** January 2026  
**Scope:** Visual design tokens, spacing, typography, color, surfaces, borders, and motion rules for the Civic Council of Georgia site.

---

## References

This document provides a bounded, actionable subset of design rules. For exhaustive token tables and implementation details, see:

- `/public/design-system.md` — Full token tables and component CSS
- `/public/ccg-design-system.md` — Brand philosophy and detailed type scale
- `tailwind.config.ts` — Source of truth for Tailwind tokens
- `src/lib/forumDesignSystem.ts` — Forum (dark UI) elevation and motion utilities

---

## Scope

**In scope:**
- Color palette (brand colors, surfaces, text, borders)
- Typography hierarchy (font families, scale, weights)
- Spacing system (section padding, stack spacing, card padding)
- Border and geometry rules (radius, dividers)
- Elevation system (dark UI surfaces and shadows)
- Motion rules (duration, easing, stagger)
- Responsive breakpoints

**Out of scope:**
- Full component implementation code (see design-system.md)
- Logo usage guidelines (see design-system.md §9)
- Font file paths and licensing (see design-system.md §10)
- Accessibility compliance details (see canonical-interactions.md)

---

## 1. Color Palette

### Brand Colors

| Token | HSL | Usage |
|-------|-----|-------|
| `navy` | `220 60% 10%` | Primary brand, dark backgrounds |
| `navy-light` | `220 50% 18%` | Elevated surfaces, hover |
| `navy-pale` | `220 20% 97%` | Light backgrounds |
| `parchment` | `45 20% 97%` | Warm authority background |

### Surface Hierarchy (Forum Dark UI)

| Level | HSL | Usage |
|-------|-----|-------|
| 0 — Base | `220 60% 10%` | Deepest background |
| 1 — Elevated | `220 55% 13%` | Cards, panels |
| 2 — Surface | `220 50% 16%` | Interactive surfaces |
| 3 — Hover | `220 45% 18%` | Hover states |

### Text on Dark Backgrounds

| Token | Opacity | Usage |
|-------|---------|-------|
| Primary | 100% | Headlines |
| Secondary | 70% | Body text |
| Tertiary | 45% | Labels, supporting |
| Muted | 25% | Disabled, decorative |

### Border Opacity Scale

| Token | Opacity | Usage |
|-------|---------|-------|
| Quiet | 6% | Subtle separators |
| Subtle | 12% | Card borders |
| Visible | 20% | Active states |
| Active | 35% | Selected, focus |

---

## 2. Typography

### Font Stack

| Purpose | Family | Fallback |
|---------|--------|----------|
| Brand/Wordmark | Domaine Display | Georgia, serif |
| Headlines | Tiempos Headline | Georgia, serif |
| Body | Tiempos Text | Georgia, serif |
| UI/Navigation | National 2 | system-ui, sans-serif |
| Georgian | Noto Serif Georgian | Georgia, serif |

### Scale Summary

| Style | Family | Size | Line-height | Letter-spacing |
|-------|--------|------|-------------|----------------|
| Display XL | Tiempos Headline | clamp(2.75rem, 8vw, 5rem) | 1.12 | -0.01em |
| Display | Tiempos Headline | clamp(2rem, 5vw, 3.5rem) | 1.15 | -0.01em |
| Heading | Tiempos Headline | clamp(1.5rem, 3vw, 2.25rem) | 1.25 | -0.01em |
| Lead | Tiempos Text | clamp(1.125rem, 2vw, 1.375rem) | 1.6 | — |
| Body | Tiempos Text | 1.0625rem (17px) | 1.75 | — |
| Label | National 2 | 0.8125rem (13px) | 1.4 | 0.04em |
| Eyebrow | National 2 | 0.6875rem (11px) | 1.4 | 0.18em |
| Navigation | National 2 | 0.75rem (12px) | 1.4 | 0.08em |

### Georgian Adjustments

- `letter-spacing: 0.01em` for body, `0.02em` for headings
- `line-height: 1.85` for body, `1.45` for headings
- Use `font-georgian` utility class

---

## 3. Spacing

### Section Vertical Padding

| Token | Value | Usage |
|-------|-------|-------|
| Vast | `clamp(8rem, 15vw, 16rem)` | Major transitions |
| Generous | `clamp(5rem, 10vw, 10rem)` | Section breaks |
| Intimate | `clamp(3rem, 6vw, 5rem)` | Related groups |

### Stack Spacing (Between Elements)

| Token | Value |
|-------|-------|
| Tight | 0.75rem (12px) |
| Default | 1.5rem (24px) |
| Loose | 2.5rem (40px) |

### Container Max-Widths

| Context | Value |
|---------|-------|
| Prose | 44ch |
| Content | 65ch |
| Container | 1400px |

### Card Padding

```
clamp(1.25rem, 3vw, 2rem)
```

---

## 4. Borders & Geometry

### Border Radius

```
--radius: 0
```

All corners are sharp — no rounded elements.

### Border Width

- Default: `1px`
- Active state changes color, not width

### Dividers

| Context | CSS |
|---------|-----|
| Light bg | `1px solid rgba(13, 21, 32, 0.1)` |
| Dark bg | `1px solid rgba(255, 255, 255, 0.12)` |

---

## 5. Elevation (Dark UI)

| Level | Background | Shadow | Usage |
|-------|------------|--------|-------|
| 0 | `hsl(220 60% 10%)` | none | Page bg |
| 1 | `hsl(220 55% 13%)` | `0 1px 0 0 rgba(255,255,255,0.04)` | Cards |
| 2 | `hsl(220 50% 15%)` | `0 1px 0 0 rgba(255,255,255,0.06), 0 8px 24px -8px rgba(13,21,32,0.5)` | Modals |
| 3 | `hsl(220 45% 17%)` | `0 1px 0 0 rgba(255,255,255,0.08), 0 16px 48px -12px rgba(13,21,32,0.7)` | Overlays |

---

## 6. Motion

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| Fast | 0.25s | Hover, micro-interactions |
| Normal | 0.4s | Standard transitions |
| Slow | 0.6s | Section reveals |
| Slower | 0.8s | Hero animations |
| Exhibition | 1.2s–1.8s | Cinematic reveals |

### Easing

| Token | Curve | Usage |
|-------|-------|-------|
| Default | `cubic-bezier(0.22, 1, 0.36, 1)` | Most transitions |
| Slow | `cubic-bezier(0.16, 1, 0.3, 1)` | Dramatic reveals |

### Stagger

- Standard: 100ms between items
- Exhibition: 200–300ms between items

---

## 7. Responsive Breakpoints

| Token | Width |
|-------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1400px |

---

## Quick Reference: Token Naming

| Domain | Prefix |
|--------|--------|
| Color | `--navy`, `--parchment`, `--border-*` |
| Spacing | `space-*`, `section-*` |
| Typography | `font-*`, `text-*` |
| Motion | `duration-*`, `ease-*` |

---

*For implementation details, see `/public/design-system.md` and `tailwind.config.ts`.*
