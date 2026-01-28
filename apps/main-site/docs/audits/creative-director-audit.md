# Creative Director Audit — UX & Visual Design

**Date:** 2026-01-27  
**Reviewer:** Creative Director Review  
**Framework:** Institutional design principles informed by Atlantic Council, Applebaum/Snyder urgency, and visual hierarchy theory  
**Scope:** Site-wide UX evaluation with page-level observations

---

## Executive Assessment

CCG achieves a **museum-grade institutional aesthetic** that distinguishes it from typical NGO design patterns. The navy-and-parchment palette, sharp geometry, and Tiempos typography create appropriate gravitas. However, several opportunities exist to strengthen visual hierarchy, improve user orientation, and better leverage the "hook" principle—drawing attention to the most consequential elements first.

**Overall Grade: B+**
- Visual identity: A
- Typography system: A
- Visual hierarchy: B
- User orientation: B-
- Interactive feedback: B
- Mobile experience: B
- Edge states: C+

---

## Part I: Visual Hierarchy Analysis

### The "Hook" Principle

Visual hierarchy creates an intentional viewing sequence: what viewers notice first, second, third. Effective hierarchy uses five levers: **scale, white space, content format, color contrast, and position**.

### Homepage Hook Sequence

| Order | Element | Technique Used | Effectiveness |
|-------|---------|----------------|---------------|
| 1 | Opening quote | Scale (7rem), position (centered), color contrast (parchment on navy) | ✓ Excellent — immediate emotional hook |
| 2 | Video hero | Motion (auto-play), full-bleed scale | ✓ Excellent — cinematic progression |
| 3 | Mission statement | Typography weight, generous spacing | ✓ Good |
| 4 | Program blocks | Grid layout, images | ○ Adequate — could use stronger differentiation |

**Finding:** The homepage opening sequence (quote → video → split-panel) is cinematically effective and unlike typical NGO "donate now" patterns. This aligns with Applebaum's historical-to-present progression.

**Recommendation:** Consider adding subtle visual "breadcrumbs" during the cinematic sequence so users understand the progression is intentional, not frozen.

---

### Forum for Justice Hook Sequence

| Order | Element | Technique Used | Effectiveness |
|-------|---------|----------------|---------------|
| 1 | Page title | Scale, position | ✓ Good |
| 2 | Eyebrow label | Uppercase, tracking | ○ Low contrast — 40% opacity may be too subtle |
| 3 | Intro paragraph | Lead typography | ✓ Good |
| 4 | Pipeline diagram | Full-width visual | ✓ Excellent — immediately communicates process |
| 5 | Jump-to nav | Compact, position | ○ Easily missed — low visual weight |

**Finding:** The pipeline diagram is an excellent "architecture made visible" element that follows Snyder's instructional clarity. However, the jump-to navigation has insufficient visual weight to serve as an orientation device.

**Recommendation:** Increase visual prominence of jump-to nav through scale or contrast. Consider sticky behavior with active state highlighting.

---

## Part II: Typography Observations

### Strengths

| Element | Implementation | Assessment |
|---------|----------------|------------|
| Headline hierarchy | Tiempos Headline with clamp() scaling | ✓ Elegant and responsive |
| Body prose | Tiempos Text at 17px/1.75 line-height | ✓ Excellent readability |
| UI labels | National 2 uppercase with tracking | ✓ Clear differentiation from prose |
| Georgian support | Noto Serif Georgian with adjusted line-height | ✓ Appropriate cultural adaptation |

### Opportunities

| Issue | Location | Recommendation |
|-------|----------|----------------|
| Eyebrow text opacity | Site-wide | Increase from 40% to 50-60% for better legibility |
| Label consistency | Various | Some labels use 0.04em tracking, others 0.08em — standardize |
| Quote attribution | Charter epigraph | Add visible attribution styling for quotes |
| Georgian heading spacing | Throughout | Georgian requires ~10% more line-height than English; verify all headings |

---

## Part III: Spacing & Composition

### Strengths

The "vast negative space" principle is well-executed:
- Section spacing uses `clamp(5rem, 10vw, 10rem)` — appropriate breathing room
- Container max-width of 1400px prevents over-wide lines
- Prose columns constrained to 44ch — optimal measure

### Opportunities

| Issue | Location | Recommendation |
|-------|----------|----------------|
| Inconsistent section breaks | Between program blocks | Some use `py-16`, others `py-24` — standardize rhythm |
| Dense information cards | Complicity Index cards | Add 8-12px more internal padding |
| Mobile spacing reduction | All pages | Verify mobile spacing doesn't become cramped |
| Map component isolation | Justice page | World maps need more separation from surrounding content |

---

## Part IV: Color & Contrast

### Palette Audit

| Token | Usage | WCAG Compliance | Notes |
|-------|-------|-----------------|-------|
| Navy (#0d1520) on parchment | Text | ✓ AAA (16:1) | Excellent |
| White on navy | Headlines | ✓ AAA (16:1) | Excellent |
| White/70% on navy | Body text | ✓ AA (8.3:1) | Good |
| White/45% on navy | Tertiary text | ○ AA (4.7:1) | Borderline — consider 50% |
| White/25% on navy | Muted text | ✗ Fails AA | Only for decorative use |

**Finding:** The border hierarchy (6%, 12%, 20%, 35%) is well-considered but the lowest opacities may be too subtle on some displays.

**Recommendation:** Increase minimum interactive border opacity from 12% to 15% for visibility on varied monitors.

---

## Part V: Interaction Design

### Affordances & Feedback

| Pattern | Implementation | Assessment |
|---------|----------------|------------|
| Cards | Hover elevation + border highlight | ✓ Clear affordance |
| Buttons | Opacity/background change | ✓ Adequate feedback |
| Links | Underline reveal on hover | ✓ Subtle but appropriate |
| Map regions | White glow on click | ✓ Good — instant feedback as requested |
| Tabs | Border + color state | ✓ Clear active state |

### Opportunities

| Issue | Location | Recommendation |
|-------|----------|----------------|
| Accordion expand icon | Charter, Commitments | Arrow rotation animation would reinforce state change |
| Table row hover | Complicity Ledger | Add subtle hover state to data rows |
| Loading states | Data-dependent components | Add skeleton screens instead of spinners |
| Click target size | Some mobile nav items | Verify 44px minimum touch targets |

---

## Part VI: Page-Level Observations

### Homepage (Index)

**Strengths:**
- Cinematic opening sequence creates emotional entry
- Phase transitions (quote → video → split) are well-timed
- "Duty...does not surrender" quote is Snyder-level urgent clarity

**Opportunities:**
- Sound invitation icon could be larger for accessibility
- Consider progress indicator during video for orientation
- Program blocks could use more visual differentiation

---

### Forum for Justice

**Strengths:**
- Pipeline diagram immediately clarifies process architecture
- World maps successfully visualize international pathways
- Section anchors enable non-linear navigation

**Opportunities:**
- Hero could benefit from a visual anchor (subtle pattern or image)
- Expandable sections lack visual preview of content weight
- Map detail panels need better mobile adaptation

---

### Charter

**Strengths:**
- Numbered article structure (§, I, II, III) creates document legitimacy
- Epigraph sets philosophical frame
- Prose maintains Applebaum-level density without overwhelming

**Opportunities:**
- Article numerals could be more prominent (larger or different color)
- Georgian text line-height may need verification
- Consider pull-quotes for key statements

---

### Complicity Ledger

**Strengths:**
- Filter system is comprehensive
- Data density appropriate for institutional audience
- Card design balances information with scannability

**Opportunities:**
- Column sorting lacks visual feedback
- Donation amount formatting could use visual hierarchy (bold totals)
- Search/filter state not persisted in URL consistently
- Empty state ("no results") could be more informative

---

### Transparency Report

**Strengths:**
- Table of contents enables orientation
- Callout boxes differentiate principles from funding
- Tone achieves institutional credibility without marketing

**Opportunities:**
- Section depth (many sub-sections) may benefit from visual cues
- Links section could use icon treatment for external links
- Consider summary box at top for quick assessment

---

## Part VII: Mobile Experience

### Audit Results

| Area | Assessment | Notes |
|------|------------|-------|
| Navigation | ✓ Good | Hamburger menu, proper drawer |
| Typography scaling | ✓ Good | clamp() functions work well |
| Touch targets | ○ Adequate | Some items need verification |
| Horizontal overflow | ○ Adequate | Tables need horizontal scroll treatment |
| Map interaction | ○ Adequate | Country selection works but detail panel crowded |

### Priority Mobile Fixes

1. **World maps**: Detail panel should slide up from bottom on mobile, not overlay
2. **Data tables**: Add horizontal scroll wrapper with shadow indicators
3. **Accordion triggers**: Ensure full-width tap target, not just text
4. **Jump-to nav**: Consider horizontal scroll on mobile rather than wrapping

---

## Part VIII: Edge States

### Current Implementation

| State | Treatment | Assessment |
|-------|-----------|------------|
| Loading | Spinner | ○ Adequate — skeleton screens preferred |
| Empty (no data) | Text message | ○ Minimal — add guidance |
| Error | Toast notification | ✓ Good |
| 404 | Custom page | ✓ Good |
| Offline | None observed | ✗ Missing — add offline indicator |

### Recommendations

1. **Add skeleton screens** for data-dependent components (Ledger, Index)
2. **Design empty states** with guidance text and suggested actions
3. **Create offline state** with cached content indication
4. **Add error recovery** suggestions in error states

---

## Part IX: Institutional Design Alignment

### Atlantic Council Benchmark

| Principle | CCG Implementation | Assessment |
|-----------|-------------------|------------|
| Mission-first hierarchy | Homepage quote + mission statement | ✓ Excellent |
| Clear sector organization | Record/Appeal/Remedy/State-of-Capture | ✓ Well-structured |
| Research quality signaling | Methodology, Standards pages | ✓ Present |
| Transparency | Funding, Governance pages | ✓ Comprehensive |
| Credibility indicators | Corrections log, Right of Reply | ✓ Distinctive |

### Applebaum/Snyder Voice (Visual Translation)

| Principle | Visual Expression | Assessment |
|-----------|-------------------|------------|
| Historical rigor | Document-like typography, sharp geometry | ✓ Achieved |
| Urgent clarity | High-contrast headlines, direct statements | ✓ Achieved |
| Institutional weight | Navy palette, Tiempos serif, vast spacing | ✓ Achieved |
| Accessible seriousness | Readable body text, clear hierarchy | ✓ Achieved |
| Avoidance of hype | No gradients, no AI-glow, no marketing widgets | ✓ Achieved |

---

## Summary: Priority Actions

### Critical (Fix Immediately)

| # | Issue | Impact |
|---|-------|--------|
| 1 | Increase tertiary text opacity from 45% to 50% | Accessibility |
| 2 | Add skeleton screens for data components | Perceived performance |

### High Priority

| # | Issue | Impact |
|---|-------|--------|
| 3 | Improve mobile map detail panel | Mobile usability |
| 4 | Strengthen jump-to nav visual weight | User orientation |
| 5 | Standardize section spacing rhythm | Visual consistency |

### Medium Priority

| # | Issue | Impact |
|---|-------|--------|
| 6 | Add table row hover states | Data scannability |
| 7 | Design informative empty states | User guidance |
| 8 | Add accordion expand animation | Interaction feedback |

### Lower Priority (Polish)

| # | Issue | Impact |
|---|-------|--------|
| 9 | Add horizontal scroll indicators for tables | Mobile polish |
| 10 | Create offline state handling | Edge case |

---

## Appendix: Visual Hierarchy Reference

### Hook Principles Applied

1. **Scale**: Larger elements noticed first
2. **White space**: Isolation increases attention
3. **Content format**: Video > Image > Icon > Text
4. **Color contrast**: Higher luminance difference = more weight
5. **Position**: Top-left (F-pattern) or top-center (Z-pattern) noticed first

### Institutional Design Signals

- **Sharp geometry** → Legal/governmental authority
- **Serif headlines** → Historical continuity
- **Sans-serif UI** → Modern competence
- **Navy palette** → Institutional stability
- **Vast spacing** → Confidence, nothing to hide
- **Bilingual** → Legitimacy in both worlds

---

*This audit follows principles from Anthropic's guidance on clarity, Atlantic Council's institutional communication model, and Applebaum/Snyder's approach to urgent but measured democratic discourse.*
