# Canonical Interactions Specification

**Version:** 1.0  
**Last Updated:** January 2026  
**Scope:** Interaction patterns, micro-navigation, standard states, and accessibility constraints for the Civic Council of Georgia site.

---

## References

This document complements existing documentation:

- `/docs/visualizations.md` — Component-level breakdown of pathway visuals
- `/public/design-system.md` — CSS patterns for cards, tabs, buttons, links
- `/public/ccg-design-system.md` — Motion tokens and elevation system

---

## Scope

**In scope:**
- Standard interaction patterns (tabs, accordions, maps, galleries, matrices)
- Micro-navigation behavior (jump links, pagination, detail panels)
- State definitions (default, hover, active, selected, disabled)
- Keyboard and focus behavior
- Touch targets and responsive behavior
- Reduced motion support

**Out of scope:**
- Visual token values (see canonical-design.md)
- Page content and hierarchy (see canonical-content-ia.md)
- Form validation and submission flows (future document)

---

## 1. Core Interaction Patterns

### Tabs

**Component:** `PathwayTabs`, `CategoryTabs`

| State | Visual |
|-------|--------|
| Default | `color: rgba(255,255,255,0.5)` |
| Hover | `color: rgba(255,255,255,0.8)`, subtle bg tint |
| Active | `color: white`, `border-bottom: 2px solid white` |

**Behavior:**
- Single selection; clicking a tab immediately shows its panel
- No animated slide between panels (instant swap)
- Keyboard: Arrow keys navigate tabs; Enter/Space activates

---

### Accordions

**Component:** `CommitmentsAccordion`, `LedgerEntityRow`, `Accordion`

| State | Visual |
|-------|--------|
| Collapsed | Chevron points right/down; content hidden |
| Expanded | Chevron rotates; content revealed with slide animation |

**Behavior:**
- Single or multi-expand depending on context (configurable)
- Click header or chevron to toggle
- Animation: height auto with `0.35s ease`
- Keyboard: Enter/Space toggles; focus visible on header

---

### Maps (Jurisdiction)

**Component:** `SanctionsWorldMap`, `UniversalJurisdictionMap`

| State | Visual |
|-------|--------|
| Default (non-highlighted) | `fill: rgba(255,255,255,0.06)`, `stroke: rgba(255,255,255,0.12)` |
| Highlighted (inactive) | `stroke: rgba(255,255,255,0.25)`, cursor pointer |
| Hover | `stroke: rgba(255,255,255,0.55)`, strokeWidth increases |
| Selected | `fill: rgba(255,255,255,0.22)`, `stroke: rgba(255,255,255,0.75)`, glow filter |

**Behavior:**
- Hover: outline intensifies (instant, no transition)
- Click: fills region with subtle white glow; opens detail panel
- Click again or close button: deselects
- Detail panel animates in from bottom (`opacity + translateY`)
- Keyboard: focus not currently implemented on map regions (improvement area)

---

### Gallery / Carousel

**Component:** `RemedyGallery`

| Control | Behavior |
|---------|----------|
| Arrow buttons | Scroll gallery by one card width |
| Dot pagination | Click to jump to that card |
| Swipe (touch) | Horizontal scroll with momentum |

**Behavior:**
- Horizontal scroll with snap-to-card
- Arrows hidden if at start/end
- Active dot highlighted

---

### Matrix / Table

**Component:** `TriageMatrix`

| State | Visual |
|-------|--------|
| Row default | Background subtle |
| Row hover | Background lightens |
| Row expanded | Detail section visible below row |

**Behavior:**
- Click row to toggle detail expansion
- Only one row expanded at a time (optional)
- Keyboard: Tab to rows; Enter toggles

---

### Cards

**Component:** `FloatingCardStack`, pathway cards

| State | Visual |
|-------|--------|
| Default | Elevation 1 bg, subtle border |
| Hover | `translateY(-2px)`, deeper shadow, lighter bg |
| Active/Selected | Elevation 3 bg, visible border |

**Behavior:**
- Click navigates to target page or section
- Stacked cards: hover/click to foreground (desktop); stacked layout (mobile)

---

## 2. Micro-Navigation Patterns

### Jump-To Navigation

**Component:** `JumpToNav`

- Sticky on page; lists section anchors
- Active section highlighted based on scroll position
- Click smooth-scrolls to section

---

### Detail Panels (Overlays)

- Triggered by map click, card expansion, etc.
- Animate in with `opacity` and `translateY`
- Include close button (×)
- Keyboard: Escape closes; focus trapped while open

---

### Pagination / Load More

- Dot pagination for galleries
- "Load more" button for long lists
- Preserve scroll position on load-more

---

## 3. Standard States

| State | Definition |
|-------|------------|
| Default | Initial appearance; no interaction |
| Hover | Pointer over element (desktop) |
| Focus | Keyboard focus visible |
| Active | Currently pressed / selected |
| Selected | Persistent selection (e.g., tab, map region) |
| Disabled | Non-interactive; reduced opacity |

### Focus Visibility

- Use visible outline (not just color change)
- Outline offset: 2px
- Outline color: `rgba(255,255,255,0.6)` on dark, navy on light

---

## 4. Accessibility Constraints

### Touch Targets

- Minimum 44×44px for all interactive elements
- Ensure adequate spacing between adjacent targets

### Keyboard Navigation

| Pattern | Keys |
|---------|------|
| Tabs | Arrow L/R, Enter/Space |
| Accordions | Enter/Space |
| Modals/Panels | Tab (trap), Escape (close) |
| Galleries | Arrow L/R, Tab to controls |
| Links/Buttons | Enter, Space (buttons) |

### Screen Reader Support

- Use semantic HTML (`<button>`, `<nav>`, `<section>`, `<article>`)
- Add `aria-expanded` for accordions
- Add `aria-selected` for tabs
- Provide `aria-label` for icon-only buttons

### Reduced Motion

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Map glow filter and panel slide should be instant
- Hero/exhibition animations should be skipped

---

## 5. Responsive Behavior

### Breakpoint Adjustments

| Breakpoint | Adjustments |
|------------|-------------|
| < sm (640px) | Stack tabs vertically; full-width cards; hide gallery arrows (swipe only) |
| sm–md | Two-column layouts where applicable |
| md–lg | Standard layouts; hover interactions enabled |
| > lg | Full layouts; all controls visible |

### Touch vs. Pointer

- Touch devices: no hover state; tap to select/expand
- Pointer devices: hover previews, click confirms

---

## 6. Motion Guidelines

### Allowed Animations

| Animation | Duration | Easing |
|-----------|----------|--------|
| Hover color/bg | 0.25s | ease |
| Panel reveal | 0.35s | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Accordion expand | 0.35s | ease |
| Card lift | 0.4s | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Page section reveal | 0.6s | `cubic-bezier(0.16, 1, 0.3, 1)` |

### Disallowed

- Continuous pulsing or looping animations (except loading spinners)
- Parallax scroll effects
- Auto-advancing carousels

---

## 7. Error & Empty States

### Error State

- Display message with muted text
- Offer retry action where applicable

### Empty State

- "No results" message with contextual guidance
- Suggest clearing filters or broadening search

---

*For component CSS and token values, see `/public/design-system.md`. For page-specific behavior, see `/public/technical-manifest.md`.*
