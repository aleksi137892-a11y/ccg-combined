# Canonical Content & Information Architecture

**Version:** 1.0  
**Last Updated:** January 2026  
**Scope:** Naming conventions, page hierarchy, section patterns, copy rules, and bilingual guidelines for the Civic Council of Georgia site.

---

## References

This document provides bounded content and IA rules. For full route configuration and page-level detail, see:

- `/public/technical-manifest.md` — Complete route hierarchy, golden copy anchors, and data architecture
- `src/config/routes.ts` — Source of truth for routing
- `src/App.tsx` — Route mounting and redirects

---

## Scope

**In scope:**
- Site hierarchy and primary sections
- Page naming conventions
- Golden copy anchor format
- Section heading patterns
- Copy tone and terminology rules
- Bilingual (EN/GE) content guidelines

**Out of scope:**
- Individual page content (see technical-manifest.md)
- Full route redirect map (see technical-manifest.md §Legacy Redirect Map)
- Database schema and fields (see technical-manifest.md §11)
- Interaction/component patterns (see canonical-interactions.md)

---

## 1. Site Hierarchy

### Primary Programs

| Program | Route | Purpose |
|---------|-------|---------|
| Forum for Justice | `/justice` | Operational headquarters for appeals, record, and remedy |
| State of Capture | `/state-of-capture` | Diagnostic framework on capture dynamics |
| The Rustaveli Project | `/rustaveli` | Cultural heritage and civic inheritance |
| About | `/about` | Institutional identity and governance |

### Section Structure Pattern

```
/program                     → Hub (index) page
/program/section             → Section detail or intake
/program/section/:id         → Individual entry (where applicable)
```

### Canonical Sections (Forum for Justice)

| Section | Route |
|---------|-------|
| Appeal | `/appeal`, `/appeal/harm`, `/appeal/wrongdoing`, `/appeal/inside` |
| Record | `/record`, `/record/ledger`, `/record/registry/the-list` |
| Remedy | `/remedy`, `/remedy/sanctions`, `/remedy/litigation`, `/remedy/criminal-dossiers`, `/remedy/iimg`, `/remedy/partners` |

---

## 2. Naming Conventions

### Route Naming

- Use lowercase, hyphen-separated slugs: `/state-of-capture`, `/right-of-reply`
- Avoid abbreviations unless widely recognized (e.g., `/iimg`)
- Prefer nouns over verbs: `/appeal` not `/submit`

### Page Titles

- H1 matches the canonical name in technical-manifest.md (Golden Copy Anchor)
- Use sentence case for subtitles and leads
- Examples:
  - H1: "Forum for Justice"
  - H1: "The Complicity Ledger"
  - Subtitle: "Financial Flows to a Regime Under Sanction"

### Section Headings

| Level | Format | Example |
|-------|--------|---------|
| H1 | Page title | "Forum for Justice" |
| H2 | Major section | "The Right to Remedy" |
| H3 | Subsection | "Doctrine of Civic Necessity" |
| Eyebrow | Uppercase label | "FOUNDATIONS" |

---

## 3. Golden Copy Anchors

Each page has a canonical **H1** and **Lead** or **Body** text defined in technical-manifest.md. These phrases are authoritative and should not be paraphrased without review.

**Format:**
- **H1:** Short, declarative title
- **Lead:** 1–2 sentences establishing purpose
- **Declaration:** (where applicable) Formal doctrinal statement

**Example (Forum Hub):**
> **H1:** Forum for Justice  
> **Lead:** Justice is always possible. We exhaust all lawful channels.  
> **Declaration:** Where domestic remedy is foreclosed, citizens are entitled to seek justice beyond their borders.

---

## 4. Section Patterns

### Hub Page

- H1 + Lead paragraph
- Visual overview (pipeline diagram, pathway cards)
- Jump-to navigation (JumpToNav component) for long pages
- Cross-program navigation (ProgramNav) at bottom

### Detail Page

- H1 + Body paragraph
- Table of Contents (if multi-section)
- Content sections with H2/H3 hierarchy
- CTA or form at end

### Index / List Page

- H1 + Subtitle
- Filter or search controls (if applicable)
- Card or row list of entries
- Pagination or load-more

---

## 5. Copy Tone & Terminology

### Tone

| Attribute | Guideline |
|-----------|-----------|
| Formal | Legal precision; avoid colloquialisms |
| Restrained | No exclamation marks; avoid superlatives |
| Declarative | Lead with statements, not questions |
| Accessible | Explain jargon on first use |

### Terminology (Canonical Terms)

| Preferred | Avoid |
|-----------|-------|
| Appeal | Complaint, submission (for intake) |
| Record | Archive (except in specific "Public Archive" context) |
| Remedy | Punishment, revenge |
| State capture | Corruption (too narrow) |
| Doctrine of Civic Necessity | Citizen's duty (imprecise) |
| Complicity Ledger | Blacklist |
| Registry of Responsibility | The List (informal context only) |

### Legal Disclaimers

- Include "This is not legal advice" on guidance pages (`/remedy/partners`, `/appeal/protections`)
- Use "alleged" for unproven claims
- Reference "right of reply" for listed individuals

---

## 6. Bilingual Guidelines

### Supported Languages

| Code | Language |
|------|----------|
| EN | English (default) |
| GE | Georgian (ქართული) |

### Content Parity

- All H1, Lead, and Declaration text must exist in both languages
- Body content should be equivalent, not literal translation
- Georgian uses Noto Serif Georgian font stack

### Implementation

- Store localized strings in `*Content.ts` files (e.g., `forumArchitectureContent.ts`)
- Use `useLanguage()` hook to access `language` and `isGeorgian`
- Apply `font-georgian` class for Georgian typography

### Georgian-Specific Rules

| Rule | Guideline |
|------|-----------|
| Line-height | 1.85 for body, 1.45 for headings |
| Letter-spacing | 0.01em body, 0.02em headings |
| Word-spacing | 0.05em body, 0.08em headings |

---

## 7. URL Parameters & Filters

Certain pages use URL-synced state for filters:

| Page | Parameters |
|------|------------|
| `/record/ledger` | `q`, `reasons`, `sector`, `allegations`, `sanctioned`, `donMin`, `donMax` |
| `/about/faq` | `category` |

Preserve these parameters when linking internally.

---

## 8. Metadata & SEO

- Each page should have a unique `<title>` matching H1 + " — Civic Council of Georgia"
- Meta description should summarize the Lead text (150–160 chars)
- Use semantic HTML headings (H1 once per page, H2/H3 for sections)

---

*For full page specifications, see `/public/technical-manifest.md`.*
