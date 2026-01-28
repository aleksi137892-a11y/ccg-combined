# CCG Internal Audit Board Review

**Subject:** UX Enhancement Plan — Mobile, Tables, Animations, Pull Quotes  
**Date:** 2026-01-27  
**Framework:** Internal Audit Board v2.0 (Doctrine-Calibrated)  
**Status:** ✅ APPROVED WITH CONDITIONS

---

## Change Summary

Implementation of 10 interconnected UX improvements affecting victim access to remedy pathways, evidence presentation, and Georgian parity:

1. Animation token system
2. `useMediaQuery` hook
3. Responsive table wrapper with scroll shadows
4. Table row hover states (left accent)
5. Accordion animation enhancement
6. Pull quote component (bilingual)
7. Sortable table header component
8. Ledger sorting integration
9. Jump-to nav mobile horizontal scroll
10. Map mobile slide-up panel

**Forum for Justice Context:** These changes affect how victims navigate remedy pathways, how the Ledger presents documented harm, and how mobile users under surveillance access the Forum.

---

## Director Assessments

### 1. Systems Director — Evidentiary Integrity

**Decision:** ✅ APPROVE WITH CONDITIONS

**Doctrine Application:**

These changes do not affect evidence handling, chain of custody, or preserved files. They are presentation-layer improvements. However, the Ledger sorting functionality requires scrutiny.

| CCG-Specific Concern | Assessment |
|---------------------|------------|
| Evidence Chain | ✓ Not affected — sorting is display-only |
| Data Integrity | ✓ Sorting does not modify underlying records |
| Source Protection | ✓ No new data exposure vectors |
| Mechanism Formatting | N/A — not affecting output formats |

**Adversary Test:**
- Could sorting be manipulated to misrepresent data? → No, client-side only
- Could animation bugs corrupt displayed evidence? → Low risk, monitor

**Conditions:**
1. `useMediaQuery` must include cleanup in `useEffect` return to prevent memory leaks
2. Scroll handlers must use `requestAnimationFrame` to prevent layout thrashing
3. Sorting must never modify underlying Supabase records — verify read-only implementation

**Key Test Result:** ✓ *"UK Serious Fraud Office would have no procedural objection."*

---

### 2. Creative Director — Institutional Gravitas

**Decision:** ✅ APPROVE

**Doctrine Application:**

These changes reinforce CCG's institutional aesthetic. The proposals avoid NGO/startup patterns and maintain constitutional document sensibility.

| CCG-Specific Concern | Assessment |
|---------------------|------------|
| ECHR-Level Seriousness | ✓ Table enhancements add clarity without decoration |
| Method Over Personality | ✓ Animation tokens create system, not flourish |
| Document-Like Quality | ✓ Pull quotes follow blockquote convention |
| Mobile Under Surveillance | ✓ Slide-up panel reduces screen exposure time |

**Visual Doctrine Check:**
- Sharp geometry: ✓ Left-accent hover maintains linear aesthetic
- Serif/sans hierarchy: ✓ Pull quotes use proper Tiempos treatment
- Vast spacing: ✓ Scroll shadows don't clutter
- No decoration: ✓ All motion serves comprehension

**Adversary Test:**
- Could the animation be characterized as "AI-glow" or frivolous? → No, easing is subtle
- Could screenshot of UI be mocked for unprofessionalism? → No, maintains gravitas

**Recommendation (non-blocking):**
- Mobile scroll shadows should use navy tint on dark backgrounds (visual consistency)

**Key Test Result:** ✓ *"Atlantic Council design team would approve. Appropriate alongside ECHR filings."*

---

### 3. Editorial Director — Doctrinal Voice

**Decision:** ✅ APPROVE WITH CONDITIONS

**Doctrine Application:**

Pull quote component will present Charter language and doctrinal statements. Must preserve the voice of civic necessity.

| CCG-Specific Concern | Assessment |
|---------------------|------------|
| Charter Voice | ✓ Pull quote styling is appropriately solemn |
| Georgian Equivalence | ✓ Component includes `quoteGe`, `attributionGe` props |
| Precision | N/A — component, not content |
| Confidence Language | N/A — not affecting claims |

**Bilingual Audit:**
- Pull quote component: ✓ Georgian props are mandatory equivalents, not optional
- Sort headers: ⚠️ Must include `labelGe` for all sortable columns
- ARIA labels: ⚠️ Must be bilingual (`aria-label` in both languages based on context)

**Adversary Test:**
- Could poor Georgian implementation suggest foreign-controlled operation? → Not if parity is maintained
- Could accessibility failure suggest institutional incompetence? → Addressed by conditions

**Conditions:**
1. All sortable column headers must have `labelGe` Georgian equivalents
2. Screen reader announcements must be bilingual (sort state, panel state)
3. Pull quote attribution format: em dash (—), not hyphen (-)

**Key Test Result:** ✓ *"Applebaum/Snyder would find nothing to object to. Bellingcat fact-check would pass."*

---

### 4. Governance Director — Procedural Legitimacy

**Decision:** ✅ APPROVE

**Doctrine Application:**

These changes do not affect corrections process, right of reply, confidence labels, or methodology documentation. They are UX improvements, not process changes.

| CCG-Specific Concern | Assessment |
|---------------------|------------|
| Auditability | N/A — not affecting how conclusions are reached |
| Right of Reply | N/A — not affecting reply mechanisms |
| Corrections Log | N/A — not affected |
| Funding Independence | ✓ No pay-for-outcome risk |

**Transparency Check:**
- Sorting: ✓ Does not alter underlying data, merely presentation order
- Animation: ✓ Does not obscure information
- Mobile panel: ✓ Same information, different viewport treatment

**Adversary Test:**
- Could changes be characterized as hiding information? → No, information access is improved
- Could changes suggest arbitrary process? → No, systematic implementation

**Key Test Result:** ✓ *"Hostile parliamentary inquiry would find nothing to exploit."*

---

### 5. Citizen Director — Georgian Parity & Access to Remedy

**Decision:** ✅ APPROVE WITH CONDITIONS

**Doctrine Application:**

This is the most critical assessment. These changes directly affect how a victim in Kutaisi, on her phone, under time pressure, navigates the Forum.

| CCG-Specific Concern | Assessment |
|---------------------|------------|
| Georgian Parity | ⚠️ Must verify all new components have Georgian props |
| Victim Access | ✓ Mobile improvements aid access under difficult conditions |
| Under Surveillance | ✓ Slide-up panel reduces screen exposure time |
| Low Bandwidth | ⚠️ Must verify animation performance on 3G |
| Screen Reader | ⚠️ Must add ARIA labels and announcements |

**The Teacher in Kutaisi Test:**

*Can a teacher in Kutaisi, on her phone, under time pressure, successfully document harm and understand what remedies exist?*

| Aspect | Before | After |
|--------|--------|-------|
| Map Jurisdiction Details | Overlay obscures map | Slide-up panel, clearer access |
| Data Table Navigation | Horizontal overflow hidden | Scroll indicators visible |
| Section Navigation | May wrap confusingly | Horizontal scroll with indicators |
| Loading State | Text "Loading..." | Skeleton communicates structure |

**Verdict:** These changes **improve** the Kutaisi teacher's experience.

**Adversary Test:**
- Could poor mobile experience suggest CCG doesn't care about Georgian users? → Addressed by improvements
- Could accessibility failure exclude vulnerable victims? → Addressed by conditions

**Conditions:**
1. `prefers-reduced-motion` must be respected (some victims may have vestibular conditions)
2. Mobile panel focus management: focus must move to panel when opened
3. Touch targets must be verified at 44px minimum
4. 3G performance test before deployment
5. All ARIA labels must have Georgian equivalents

**Key Test Result:** ✓ *"A teacher in Kutaisi could complete this process safely. Access to remedy is improved."*

---

## Adversary Ammunition Review

**Hostile Actor Scenarios:**

| Attack Vector | Ammunition Found? | Mitigation |
|---------------|-------------------|------------|
| Factual error | No — presentation changes, not claims | N/A |
| Overreach | No — UX improvement, not assertion | N/A |
| Amateurism | No — systematic implementation with tokens | N/A |
| Accessibility failure | ⚠️ Possible if conditions not met | Conditions address |
| Georgian inferiority | ⚠️ Possible if bilingual parity not maintained | Conditions address |
| Foreign influence | No — Georgian parity is explicitly prioritized | N/A |

**Conclusion:** No adversary ammunition identified if conditions are met.

---

## Quorum Status

| Director | Decision | Doctrine Alignment |
|----------|----------|-------------------|
| Systems | ✅ APPROVE | Evidentiary integrity preserved |
| Creative | ✅ APPROVE | Institutional gravitas maintained |
| Editorial | ✅ APPROVE | Doctrinal voice respected |
| Governance | ✅ APPROVE | Procedural legitimacy unchanged |
| Citizen | ✅ APPROVE | Georgian parity and access improved |

**Quorum:** 5 of 5 APPROVE ✅  
**Veto Triggers:** None  
**Adversary Ammunition:** None (if conditions met)

---

## Consolidated Conditions

### Must-Have (Blocks Deployment)

| # | Condition | Director | Rationale |
|---|-----------|----------|-----------|
| 1 | `useMediaQuery` cleanup in useEffect | Systems | Memory leak prevention |
| 2 | Throttle scroll handlers | Systems | Performance stability |
| 3 | `prefers-reduced-motion` support | Citizen | Vestibular accessibility |
| 4 | Focus management for mobile panel | Citizen | Screen reader usability |
| 5 | Bilingual ARIA labels | Editorial + Citizen | Georgian parity |
| 6 | Sortable headers have `labelGe` | Editorial | Georgian parity |

### Should-Have (Complete Within Sprint)

| # | Condition | Director | Rationale |
|---|-----------|----------|-----------|
| 7 | 3G performance verification | Citizen | Rural Georgian access |
| 8 | 44px touch target verification | Citizen | Mobile usability |
| 9 | Navy-tint scroll shadows on dark | Creative | Visual consistency |
| 10 | Em dash in pull quote attribution | Editorial | Typographic standards |

---

## Charter Test

> *"Does this change honor the epigraph of our Charter?"*

**Test:** Do these changes keep CCG grounded in method, not mood?

**Result:** ✅ PASS

- Animation tokens = systematic method, not ad-hoc decoration
- Bilingual parity requirements = institution belonging to citizens it serves
- Accessibility requirements = credibility through discipline
- No personality-driven elements introduced

---

## Final Recommendation

### ✅ APPROVED FOR IMPLEMENTATION

The UX Enhancement Plan aligns with CCG doctrine and improves victim access to remedy pathways. All Directors approve.

**Implementation may proceed** once the 6 Must-Have conditions are incorporated into the technical plan.

---

## Sign-Off

```
Systems Director:    [APPROVED] — Evidentiary integrity preserved
Creative Director:   [APPROVED] — Institutional gravitas maintained  
Editorial Director:  [APPROVED] — Doctrinal voice respected
Governance Director: [APPROVED] — Procedural legitimacy unchanged
Citizen Director:    [APPROVED] — Georgian parity and access improved

Date: 2026-01-27
Framework: Internal Audit Board v2.0
```

---

*Audit conducted per CCG Internal Audit Board Framework v2.0 (Doctrine-Calibrated)*
