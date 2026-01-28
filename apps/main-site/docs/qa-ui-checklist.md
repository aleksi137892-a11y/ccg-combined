# QA & UI Design Review Checklist

**Version:** 1.0  
**Last Updated:** January 2026  
**Purpose:** Manual QA steps and optional tooling recommendations for reviewing visual consistency, interaction behavior, accessibility, and responsiveness.

---

## References

- `/docs/canonical-design.md` — Design tokens, spacing, typography, color
- `/docs/canonical-interactions.md` — Interaction patterns and states
- `/docs/canonical-content-ia.md` — Content hierarchy and naming
- `/public/design-system.md` — Full token reference

---

## 1. Visual Consistency

### Colors

| Check | Pass Criteria |
|-------|---------------|
| Navy backgrounds | HSL `220 60% 10%` or close variant |
| Parchment surfaces | HSL `45 20% 97%` |
| Text on dark | White at 100%, 70%, 45%, 25% opacities |
| Borders on dark | 6%, 12%, 20%, 35% white opacities |
| No rogue colors | No amber, blue, or other brand-off colors |

### Typography

| Check | Pass Criteria |
|-------|---------------|
| Headlines | Tiempos Headline; correct clamp sizes |
| Body text | Tiempos Text 17px; line-height 1.75 |
| Labels/Eyebrows | National 2; uppercase with correct letter-spacing |
| Georgian text | Noto Serif Georgian; adjusted line-height |
| No font fallback visible | Custom fonts loaded without FOUT |

### Spacing

| Check | Pass Criteria |
|-------|---------------|
| Section padding | Matches vast/generous/intimate tokens |
| Stack spacing | Consistent tight/default/loose gaps |
| Card padding | clamp(1.25rem, 3vw, 2rem) |
| Container max-width | ≤ 1400px centered |

### Borders & Geometry

| Check | Pass Criteria |
|-------|---------------|
| No rounded corners | All elements sharp (border-radius: 0) |
| Dividers | 1px, correct opacity |
| Border width | 1px consistent; no 2px+ borders except underlines |

---

## 2. Interaction Behavior

### Tabs

| Check | Pass Criteria |
|-------|---------------|
| Single selection | Only one tab active at a time |
| Instant panel swap | No slide animation |
| Hover state | Lightens text color |
| Active indicator | White underline present |

### Accordions

| Check | Pass Criteria |
|-------|---------------|
| Toggle on click | Header and chevron both work |
| Chevron rotation | Animates on expand/collapse |
| Content reveal | Smooth height animation |

### Maps (Jurisdiction)

| Check | Pass Criteria |
|-------|---------------|
| Hover outline | Stroke intensifies instantly |
| Click fill | Region fills with white glow |
| Detail panel | Slides in from bottom with content |
| Deselect | Click again or close button deselects |

### Gallery / Carousel

| Check | Pass Criteria |
|-------|---------------|
| Arrow navigation | Scrolls by one card |
| Dot pagination | Jumps to correct card |
| Snap behavior | Cards snap to edge |
| Touch swipe | Works on mobile |

### Cards

| Check | Pass Criteria |
|-------|---------------|
| Hover lift | translateY(-2px) + deeper shadow |
| Click navigation | Navigates to correct destination |

### Detail Panels / Modals

| Check | Pass Criteria |
|-------|---------------|
| Animate in | Opacity + translateY |
| Close button | Visible and functional |
| Escape key | Closes panel |

---

## 3. Accessibility

### Contrast

| Check | Pass Criteria |
|-------|---------------|
| Body text on navy | ≥ 4.5:1 contrast ratio |
| Labels on dark | ≥ 3:1 for large text / UI |
| Interactive elements | Distinguishable from static |

### Focus States

| Check | Pass Criteria |
|-------|---------------|
| Focus visible | Outline or ring visible on keyboard focus |
| Tab order | Logical left-to-right, top-to-bottom |
| Skip links | (If applicable) Skip to main content |

### Touch Targets

| Check | Pass Criteria |
|-------|---------------|
| Minimum size | 44×44px hit area |
| Spacing | No overlapping targets |

### Screen Reader

| Check | Pass Criteria |
|-------|---------------|
| Semantic HTML | `<button>`, `<nav>`, `<section>`, `<article>` |
| ARIA attributes | `aria-expanded`, `aria-selected` on accordions/tabs |
| Alt text | Images have descriptive alt (or empty for decorative) |

### Reduced Motion

| Check | Pass Criteria |
|-------|---------------|
| `prefers-reduced-motion` | Animations skipped or instant |
| No auto-play | Carousels do not auto-advance |

---

## 4. Responsive Breakpoints

Test at each breakpoint:

| Breakpoint | Width | Key Checks |
|------------|-------|------------|
| xs | < 640px | Stacked layouts, hidden gallery arrows, touch swipe |
| sm | 640px | Two-column starts |
| md | 768px | Tablet view, hover interactions |
| lg | 1024px | Full desktop layout |
| xl | 1280px | Wide desktop |
| 2xl | 1400px | Container max reached |

### Responsive Checks

| Check | Pass Criteria |
|-------|---------------|
| No horizontal scroll | Content fits viewport |
| Text readable | No clipping or overflow |
| Touch targets | Still 44px on mobile |
| Navigation | Mobile nav works, mega-menu hidden |

---

## 5. Sample Page Set

Run the checklist against these representative pages:

| Page | Route | Covers |
|------|-------|--------|
| Forum Hub | `/justice` | Jump nav, pipeline, tabs, maps, gallery, accordion |
| Appeal Index | `/appeal` | Pathway cards, section layout |
| Complicity Ledger | `/record/ledger` | Filters, accordion rows, stats |
| Anatomy of Capture | `/state-of-capture/anatomy` | Diagram, expandable sections |

---

## 6. Optional Tooling

### Free / Built-In

| Tool | Purpose | How to Use |
|------|---------|------------|
| **Lighthouse** | Performance, accessibility, SEO audit | Chrome DevTools → Lighthouse tab |
| **axe DevTools** | Accessibility scanning | Browser extension, run on page |
| **Playwright** | Automated UI smoke tests | Write scripts for critical flows |
| **eslint / stylelint** | Code linting | `npm run lint` (if configured) |
| **Chrome Responsive Mode** | Breakpoint testing | DevTools → Toggle device toolbar |

### Visual Regression (Budgeted)

| Tool | Purpose | Notes |
|------|---------|-------|
| **Percy** | Snapshot comparison | Integrates with CI; requires subscription |
| **Chromatic** | Storybook visual testing | Free tier available |
| **Playwright Screenshots** | DIY snapshots | Compare against baseline images |

### Design QA

| Method | Purpose |
|--------|---------|
| **Figma Compare** | Overlay screenshots on Figma mocks |
| **Manual Screenshot Diff** | Side-by-side comparison in image editor |

---

## 7. Reporting Template

Use this format for QA findings:

```markdown
## QA Report — [Page/Component]

**Date:** YYYY-MM-DD  
**Reviewer:** [Name]  
**Breakpoint:** [xs / sm / md / lg / xl]

### Findings

| ID | Category | Issue | Severity | Recommendation |
|----|----------|-------|----------|----------------|
| 1  | Visual   | Border opacity too high on card | Low | Change to 12% |
| 2  | A11y     | Missing aria-expanded on accordion | Medium | Add attribute |
| 3  | Responsive | Text clips on xs | High | Reduce font size |

### Summary

- Total issues: X
- Critical: X | High: X | Medium: X | Low: X
```

---

## 8. QA Workflow

1. **Scope:** Identify pages/components to review
2. **Environment:** Use production build (`npm run build && npm run preview`)
3. **Run Checklist:** Work through sections 1–4
4. **Document Findings:** Use template in section 7
5. **Fix & Verify:** Address issues, re-test affected areas
6. **Archive Report:** Save to `/docs/qa-reports/` (if desired)

---

*For design token values, see `/docs/canonical-design.md`. For interaction specifications, see `/docs/canonical-interactions.md`.*
