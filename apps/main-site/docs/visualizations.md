# Visualizations and Micro-Navigation

This document summarizes the pathway visualizations and micro-navigation patterns used across the site. It is meant as a quick guide for design and UX consistency.

## Justice Page (Forum for Justice)

**Section navigation**
- `JumpToNav` (`src/components/institutional/JumpToNav.tsx`)
  - Sticky, in-page section jump links (Foundations, Architecture, Appeal, IIMG, Record, Remedy, Triage, Commitments).
  - Highlights the active section and supports smooth scrolling.
- `ProgramNav` (`src/components/layout/ProgramNav.tsx`)
  - Cross-program navigation at the bottom of the page.

**Pathway and process visuals**
- `ForumPipelineDiagram` (`src/components/forum/ForumPipelineDiagram.tsx`)
  - Horizontal pipeline that links Appeal → Record → Remedy.
  - Cards are clickable to jump to sections; the line visually anchors the flow.
- `PathwayTabs` (`src/components/forum/PathwayTabs.tsx`)
  - Three intake pathways with tab switching and contextual copy.
  - Tabs act as micro-navigation between entry-point personas.
- `FloatingCardStack` (`src/components/forum/FloatingCardStack.tsx`)
  - Stacked card visual for Record artifacts.
  - Desktop uses hover/click to foreground cards; mobile uses stacked layout.
- `SanctionsWorldMap` (`src/components/forum/SanctionsWorldMap.tsx`)
  - World map of sanctions jurisdictions.
  - Hover outlines and click fills drive a detail panel for mechanisms.
- `UniversalJurisdictionMap` (`src/components/forum/UniversalJurisdictionMap.tsx`)
  - World map of universal jurisdiction states.
  - Same interaction model as the sanctions map.
- `RemedyGallery` (`src/components/forum/RemedyGallery.tsx`)
  - Horizontal scroll gallery for remedy pathways (sanctions, litigation, criminal referral, international mechanisms, regulatory).
  - Arrow buttons and dot pagination provide micro-navigation.
- `TriageMatrix` (`src/components/forum/TriageMatrix.tsx`)
  - Multi-criteria matrix with interactive rows and detail toggles.
  - Supports quick scanning plus deeper inspection per criterion.
- `CommitmentsAccordion` (`src/components/forum/CommitmentsAccordion.tsx`)
  - Accordion used for commitments; each panel expands in-place.

## Appeal Index Page

- Pathway cards embedded in `src/pages/appeal/AppealIndex.tsx`
  - Three intake pathways shown as cards.
  - Each card links to the respective appeal form and displays eligibility cues.

## Remedy Index Page

- Remedy pathway list in `src/pages/remedy/RemedyIndex.tsx`
  - Typographic, numbered pathway list.
  - Each entry links to the corresponding remedy detail page.

## Supporting / Alternate Diagrams

These are included as alternate or supplementary pathway visuals (used where referenced by pages):
- `ForumFlowDiagram` (`src/components/forum/ForumFlowDiagram.tsx`)
  - Vertical flow variant for the Appeal → Record → Remedy pipeline.
- `ForumArchitectureDiagram` (`src/components/forum/ForumArchitectureDiagram.tsx`)
  - Architecture layout variant with stage emphasis.

## Interaction Principles

- **Micro-navigation should be obvious but minimal**: hover outlines, subtle fills on click, and lightweight labels.
- **Always pair visuals with a clear destination**: tabs switch content; cards jump to sections; maps open detail panels.
- **Keep repetition consistent**: navigation patterns (tabs, arrows, dots, accordions) should behave the same across pages.
