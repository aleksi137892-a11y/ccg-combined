# Civic Council of Georgia — Technical Manifest

**Version:** 1.0  
**Generated:** January 2026  
**Purpose:** Structural sitemap synchronization and architectural blueprint  
**Download:** Right-click → Save As, or access at `/technical-manifest.md`

---

## Table of Contents

1. [Root Level Pages](#1-root-level-pages)
2. [Forum for Justice — /justice](#2-forum-for-justice)
3. [Appeal Section — /appeal/*](#3-appeal-section)
4. [Record Section — /record/*](#4-record-section)
5. [Remedy Section — /remedy/*](#5-remedy-section)
6. [State of Capture — /state-of-capture/*](#6-state-of-capture-section)
7. [The Rustaveli Project — /rustaveli/*](#7-rustaveli-section)
8. [About Section — /about/*](#8-about-section)
9. [Legal & Compliance Pages](#9-legal--compliance-pages)
10. [Major Modals](#10-major-modals)
11. [Data Architecture Summary](#11-data-architecture-summary)

---

## 1. Root Level Pages

### 1.1 Homepage — `/`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/` — Site root, accessible via header logo |
| **Core Narrative Purpose** | Cinematic institutional introduction presenting the Civic Council as custodian of democratic resilience and infrastructure for justice. |
| **Golden Copy Anchor** | **H1:** (Video Hero, no visible H1) / **Lead Text:** "We are building the infrastructure for justice — and forging a new covenant of solidarity." |
| **Interaction Design** | **CTA 1:** "Enter the Forum" → `/justice` (Internal) / **CTA 2:** "Learn About IIMG" → IIMG Modal (Internal overlay) |
| **Data & State** | **Tables:** None / **Logic:** `useAutoDissolve` hook manages 3-phase cinematic experience (quote → video → split) |
| **Component Dependencies** | `VideoHero`, `MissionStatement`, `ProgramBlock`, `ClosingSection`, `IIMGFeatureBlock`, `IIMGModal`, `WordmarkMasthead`, `ExhibitionRoom`, `VisualBreath` |

---

### 1.2 Search — `/search`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/search` — Root utility, accessible via header search icon |
| **Core Narrative Purpose** | Global search interface for navigating the full Civic Council archive of pages, records, and documentation. |
| **Golden Copy Anchor** | **H1:** "Search" / **Body:** "Find specific entries, individuals, incidents, or institutional content." |
| **Interaction Design** | **CTA:** Search input field → Internal page results |
| **Data & State** | **Tables:** `complicity_entities` (for ledger search) / **Logic:** Client-side filtering across route config and entity data |
| **Component Dependencies** | `Layout`, `ExpandableSearch`, `AnimatedSection` |

---

### 1.3 Contact — `/contact`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/contact` — Root utility, footer-linked |
| **Core Narrative Purpose** | Secure communication channels and institutional contact pathways for press, legal partners, and the public. |
| **Golden Copy Anchor** | **H1:** "Contact" / **Body:** "For secure communications, we recommend Signal or encrypted email." |
| **Interaction Design** | **CTA 1:** "Signal" → External secure channel / **CTA 2:** "Encrypted Email" → `mailto:` link |
| **Data & State** | **Tables:** None / **Logic:** Static content rendering |
| **Component Dependencies** | `Layout`, `FoundationSection`, `SafetyCallout` |

---

### 1.4 Sitemap — `/sitemap`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/sitemap` — Internal architecture audit, footer-linked |
| **Core Narrative Purpose** | Visual route hierarchy for developers and content auditors to verify site structure integrity. |
| **Golden Copy Anchor** | **H1:** "Site Architecture" / **Body:** "Complete route hierarchy and metadata." |
| **Interaction Design** | **CTA:** Interactive route tree with expand/collapse |
| **Data & State** | **Tables:** None / **Logic:** Parses `routeConfig` object from `src/config/routes.ts` |
| **Component Dependencies** | `Layout`, `RouteTree` |

---

## 2. Forum for Justice

### 2.1 Forum Hub — `/justice`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/justice` — Primary program hub, header "Forum for Justice" link |
| **Core Narrative Purpose** | The Forum for Justice serves as the operational headquarters for receiving appeals, maintaining the public record, and routing evidence toward lawful consequence. |
| **Golden Copy Anchor** | **H1:** "Forum for Justice" / **Lead:** "Justice is always possible. We exhaust all lawful channels." / **Declaration:** "Where domestic remedy is foreclosed, citizens are entitled to seek justice beyond their borders." |
| **Interaction Design** | **CTA 1:** "Make an Appeal" → `/appeal` / **CTA 2:** "View the Record" → `/record` / **CTA 3:** "Explore Remedies" → `/remedy` |
| **Data & State** | **Tables:** None (hub page) / **Logic:** Static content from `forumArchitectureContent.ts` |
| **Component Dependencies** | `Layout`, `JumpToNav`, `ForumPipelineDiagram`, `PathwayTabs`, `FloatingIIMGBlock`, `FloatingCardStack`, `PrecisionJurisdictionMap`, `RemedyGallery`, `TriageMatrix`, `CommitmentsAccordion`, `ProgramNav`, `ExpandableSection` |

**Jump-To Sections:**
- `#foundations` — Right to Remedy, Doctrine of Civic Necessity
- `#architecture` — Interactive Pipeline Diagram
- `#appeal` — Intake pathway tabs (Harmed, Witnessed, Inside)
- `#iimg` — Independent Investigative Mechanism
- `#record` — Floating card stack visualization
- `#remedy` — Jurisdiction map + pathway gallery
- `#triage` — Severity/viability matrix
- `#commitments` — Operational commitments accordion

---

## 3. Appeal Section

### 3.1 Appeal Hub — `/appeal`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/appeal` — Section index under "Forum for Justice" mega-menu |
| **Core Narrative Purpose** | Visual triage navigator for intake pathways—those harmed by state capture, witnesses to wrongdoing, or insiders with protected disclosure. |
| **Golden Copy Anchor** | **H1:** "Make an Appeal" / **Lead:** "The Forum for Justice receives appeals from those harmed by state capture and those with evidence of wrongdoing. Choose the pathway that best describes your situation." |
| **Interaction Design** | **CTA 1:** "I Have Been Harmed" → `/appeal/harm` / **CTA 2:** "I Witnessed Wrongdoing" → `/appeal/wrongdoing` / **CTA 3:** "I Am Inside the System" → `/appeal/inside` |
| **Data & State** | **Tables:** None / **Logic:** Static pathway card routing |
| **Component Dependencies** | `Layout`, `InstitutionalPageHeader`, `PathwayCard`, `ProgramNav` |

---

### 3.2 Appeal Harm — `/appeal/harm`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/appeal/harm` — Child of `/appeal` |
| **Core Narrative Purpose** | Intake form for direct victims of state capture, political persecution, or targeted harm by authorities. |
| **Golden Copy Anchor** | **H1:** "I Have Been Harmed" / **Body:** "You or someone you represent has suffered personal harm as a direct result of state capture, abuse of power, or targeted action by authorities or their agents." |
| **Interaction Design** | **CTA:** "Begin Appeal" → Form submission (future implementation) |
| **Data & State** | **Tables:** `triage_analytics` (session tracking) / **Logic:** Future: `Submit_Appeal_Flow` |
| **Component Dependencies** | `SubmitPetition` component (shared) |

---

### 3.3 Appeal Wrongdoing — `/appeal/wrongdoing`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/appeal/wrongdoing` — Child of `/appeal` |
| **Core Narrative Purpose** | Intake form for witnesses with evidence of systemic corruption, abuse, or official misconduct. |
| **Golden Copy Anchor** | **H1:** "I Witnessed Wrongdoing" / **Body:** "You have witnessed or possess evidence of systemic corruption, abuse, or official misconduct—whether or not you were personally affected." |
| **Interaction Design** | **CTA:** "Submit Evidence" → Form submission |
| **Data & State** | **Tables:** `triage_analytics` / **Logic:** Evidence categorization |
| **Component Dependencies** | `SubmitPetition` component (shared) |

---

### 3.4 Appeal Inside — `/appeal/inside`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/appeal/inside` — Child of `/appeal` |
| **Core Narrative Purpose** | Protected disclosure pathway for government, law enforcement, judiciary, or private sector insiders with knowledge of misconduct. |
| **Golden Copy Anchor** | **H1:** "I Am Inside the System" / **Body:** "You work within government, law enforcement, judiciary, or private entities connected to state capture—and you have inside knowledge of misconduct you wish to disclose." |
| **Interaction Design** | **CTA:** "Begin Protected Disclosure" → Secure submission channel |
| **Data & State** | **Tables:** `triage_analytics` / **Logic:** Whistleblower protection protocols |
| **Component Dependencies** | `SubmitPetition` component (shared), `SafetyCallout` |

---

### 3.5 Protections & Safety — `/appeal/protections`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/appeal/protections` — Child of `/appeal`, legacy `/safety` redirects here |
| **Core Narrative Purpose** | Comprehensive security guidance for sources, witnesses, and appellants—digital safety, anonymity options, and source protection commitments. |
| **Golden Copy Anchor** | **H1:** "Protections & Safety" / **Body:** "Your security is foundational to our mission. We implement rigorous protocols to protect sources and witnesses." |
| **Interaction Design** | **CTA 1:** "Security Checklist" → `#checklist` anchor / **CTA 2:** "Source Protection Policy" → `#source-protection` anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `safetyContent.ts` |
| **Component Dependencies** | `Safety` page component, `LegalSection`, `LegalPageTOC`, `SafetyCallout` |

---

## 4. Record Section

### 4.1 Record Hub — `/record`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/record` — Section index under "Forum for Justice" mega-menu |
| **Core Narrative Purpose** | The Record maintains the public archive of harm and responsibility—evidence-linked, correctable, and durable—as an instrument of interim accountability. |
| **Golden Copy Anchor** | **H1:** "The Public Record" / **Lead:** "The Record maintains the public archive of harm and responsibility—evidence-linked, correctable, and durable. We preserve the truth so that justice becomes possible." |
| **Interaction Design** | **CTA 1:** "The Complicity Ledger" → `/record/ledger` / **CTA 2:** "The Ledger of Harm" → `/record/harm` / **CTA 3:** "Registry of Responsibility" → `/record/registry` |
| **Data & State** | **Tables:** `complicity_entities` (live count query) / **Logic:** `fetchStats()` for real-time entity count |
| **Component Dependencies** | `Layout`, `InstitutionalPageHeader`, `SubsectionCard`, `supabase` client |

---

### 4.2 The Complicity Ledger — `/record/ledger`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/record/ledger` — Primary database, child of `/record` |
| **Core Narrative Purpose** | The Complicity Ledger documents the financial architecture of state capture—donors, contractors, and enablers mapped with documentary evidence and mode of entanglement. |
| **Golden Copy Anchor** | **H1:** "The Complicity Ledger" / **Subtitle:** "Financial Flows to a Regime Under Sanction" |
| **Interaction Design** | **CTA 1:** Search/Filter interface / **CTA 2:** "Export CSV" → Download filtered data / **CTA 3:** Individual entity accordion expansion |
| **Data & State** | **Tables:** `complicity_entities` (full CRUD) / **Logic:** URL-synced filter state, `useMemo` for derived statistics |
| **Component Dependencies** | `Layout`, `InstitutionalPageHeader`, `LedgerDisclaimer`, `LedgerStats`, `LedgerFilters`, `LedgerEntityRow`, `LedgerExport`, `LedgerCSVUploader` (dev only), `Accordion` |

**Filter Parameters (URL-synced):**
- `q` — Search query
- `reasons` — Comma-separated inclusion reasons
- `sector` — Sector filter
- `allegations` — Boolean for has_allegations
- `sanctioned` — Boolean for is_sanctioned
- `donMin/donMax` — Donation range

---

### 4.3 The List — `/record/registry/the-list`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/record/registry/the-list` — Individual accountability, child of `/record/registry` |
| **Core Narrative Purpose** | Named individuals documented for their role in state capture, with evidence-linked entries and right of reply. |
| **Golden Copy Anchor** | **H1:** "The List" / **Body:** "Individual actors documented for their role in the dismantling of democratic institutions." |
| **Interaction Design** | **CTA 1:** Individual profile view → `/record/registry/the-list/:entryId` / **CTA 2:** "Reply & Corrections" → `/record/registry/reply-corrections` |
| **Data & State** | **Tables:** `complicity_entities` (filtered by entity_type) / **Logic:** Individual profile rendering |
| **Component Dependencies** | `TheList` page, `RegistryCard`, `RegistryDetailPage`, `InitialsAvatar` |

---

### 4.4 Reply & Corrections — `/record/registry/reply-corrections`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/record/registry/reply-corrections` — Legacy `/right-of-reply` redirects here |
| **Core Narrative Purpose** | Formal mechanism for listed individuals and entities to dispute, correct, or provide context for their record entries. |
| **Golden Copy Anchor** | **H1:** "Reply & Corrections" / **Body:** "We maintain a public log of corrections and responses. Listed parties may submit formal replies." |
| **Interaction Design** | **CTA:** "Submit a Reply" → Secure submission form |
| **Data & State** | **Tables:** None (submission goes to review) / **Logic:** Form validation |
| **Component Dependencies** | `RightOfReply` page, `LegalSection`, `ContactCallout` |

---

## 5. Remedy Section

### 5.1 Remedy Hub — `/remedy`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/remedy` — Section index under "Forum for Justice" mega-menu |
| **Core Narrative Purpose** | The Forum routes evidence toward lawful consequence across multiple jurisdictions—sanctions, litigation, criminal referral, and international mechanisms. |
| **Golden Copy Anchor** | **H1:** "Remedy" / **Subtitle:** "From Record to Consequence" / **Lead:** "The Forum for Justice does not only receive and document—it routes evidence toward lawful consequence." |
| **Interaction Design** | **CTA 1:** "Sanctions Submissions" → `/remedy/sanctions` / **CTA 2:** "Strategic Litigation" → `/remedy/litigation` / **CTA 3:** "Criminal Dossiers" → `/remedy/criminal-dossiers` / **CTA 4:** "International Mechanisms" → `/remedy/international` |
| **Data & State** | **Tables:** None / **Logic:** Static content |
| **Component Dependencies** | `Layout`, `ExhibitionSection`, `ExhibitionHeading`, `ExhibitionText`, `RemedyPathway` (custom) |

---

### 5.2 Sanctions Submissions — `/remedy/sanctions`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/remedy/sanctions` — Child of `/remedy`, legacy `/sanctions` redirects here |
| **Core Narrative Purpose** | Evidence packages prepared for Magnitsky, Global Human Rights, and EU sanctions frameworks targeting individuals and entities enabling state capture. |
| **Golden Copy Anchor** | **H1:** "Sanctions Submissions" / **Body:** "We prepare and submit evidence packages to sanctions authorities—documenting individuals and entities enabling state capture." |
| **Interaction Design** | **CTA 1:** "View Submission Standards" → `#compliance` anchor / **CTA 2:** "Sanctions Tracker" (future) |
| **Data & State** | **Tables:** None / **Logic:** Static content from `sanctionsContent.ts` |
| **Component Dependencies** | `Sanctions` page, `LegalSection`, `LegalPageTOC` |

---

### 5.3 Strategic Litigation — `/remedy/litigation`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/remedy/litigation` — Child of `/remedy` |
| **Core Narrative Purpose** | Evidentiary and coordination support for strategic litigation before ECHR, civil claims, and asset recovery proceedings. |
| **Golden Copy Anchor** | **H1:** "Strategic Litigation Support" / **Body:** "We support strategic litigation before international and domestic courts—providing evidence and coordination with legal partners." |
| **Interaction Design** | **CTA:** "Partner Inquiry" → `/contact` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `litigationContent.ts` |
| **Component Dependencies** | `StrategicLitigation` page, `LegalSection` |

---

### 5.4 Criminal Dossiers — `/remedy/criminal-dossiers`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/remedy/criminal-dossiers` — Child of `/remedy`, legacy `/dossier-desk` redirects here |
| **Core Narrative Purpose** | Structured dossiers for prosecutors and investigators—organized evidence, command structure mapping, and criminal proceeding timelines. |
| **Golden Copy Anchor** | **H1:** "Criminal Dossiers" / **Body:** "We build structured dossiers for use by prosecutors and investigators—organizing evidence, mapping command structures, and establishing timelines." |
| **Interaction Design** | **CTA:** "Dossier Standards" → Internal anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `dossierContent.ts` |
| **Component Dependencies** | `DossierDesk` page, `LegalSection` |

---

### 5.5 IIM-Georgia — `/remedy/iimg`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/remedy/iimg` — Child of `/remedy`, legacy `/iim-georgia` redirects here |
| **Core Narrative Purpose** | The Independent Investigative Mechanism for Georgia—special mandate on state crimes, systemic violence, and chemical agents use. |
| **Golden Copy Anchor** | **H1:** "IIM-Georgia" / **Subtitle:** "Independent Investigative Mechanism for Georgia" / **Body:** "Special Mandate on State Crimes, Systemic Violence, and the Use of Chemical Agents" |
| **Interaction Design** | **CTA 1:** "Submit Evidence" → External `https://iimg.sabcho.org` / **CTA 2:** "About the Mandate" → Internal content |
| **Data & State** | **Tables:** None / **Logic:** External link handling |
| **Component Dependencies** | `IIMGeorgia` page, `iimgContent.ts` |

---

### 5.6 International Pathways — `/remedy/partners`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/remedy/partners` — Child of `/remedy`, legacy `/international-pathways` redirects here |
| **Core Narrative Purpose** | Informational guide to Magnitsky sanctions, universal jurisdiction, and international accountability mechanisms. |
| **Golden Copy Anchor** | **H1:** "Guide to International Accountability" / **Body:** "Informational context on Magnitsky sanctions, universal jurisdiction, and international accountability mechanisms. This is not legal advice." |
| **Interaction Design** | **CTA:** "View Jurisdictional Boundaries" → `#boundaries` anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `internationalMechanismsContent.ts` |
| **Component Dependencies** | `InternationalPathways` page, `LegalSection`, `PrecisionJurisdictionMap` |

---

## 6. State of Capture Section

### 6.1 State of Capture Hub — `/state-of-capture`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/state-of-capture` — Primary program hub, header "State of Capture" link |
| **Core Narrative Purpose** | Diagnostic framework documenting how Georgia's democratic institutions have been systematically subverted to produce impunity, obedience, and profit. |
| **Golden Copy Anchor** | **H1:** "State of Capture" / **Lead:** "Capture is engineered. It is built to produce impunity, obedience, and profit." / **Principle:** "Capture is not accident—it is system." |
| **Interaction Design** | **CTA 1:** "The Report" → `/state-of-capture/findings` / **CTA 2:** "Evidence Library" → `/state-of-capture/methods` / **CTA 3:** "The List" → `/record/registry/the-list` / **CTA 4:** "Capture Map" → `/state-of-capture/anatomy` |
| **Data & State** | **Tables:** None / **Logic:** Static content with expandable layers |
| **Component Dependencies** | `Layout`, `FoundationSection`, `PhotoPlaceholder`, `ExpandableSection`, `ProgramNav` |

**Capture Layers Documented:**
1. Judicial System Capture
2. Media Space Control
3. Electoral Infrastructure
4. Economic Leverage
5. Civil Society Restrictions

---

### 6.2 Anatomy of Capture — `/state-of-capture/anatomy`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/state-of-capture/anatomy` — Child of `/state-of-capture`, legacy `/capture-map` redirects here |
| **Core Narrative Purpose** | Visual mapping of institutional capture vectors—judiciary, media, elections, economy, civil society. |
| **Golden Copy Anchor** | **H1:** "Anatomy of Capture" / **Body:** "Interactive visualization of capture vectors across Georgian institutions." |
| **Interaction Design** | **CTA:** Interactive capture map with expandable sectors |
| **Data & State** | **Tables:** None / **Logic:** Static content from `captureMapContent.ts` |
| **Component Dependencies** | `CaptureMap` page, interactive diagram component |

---

### 6.3 Findings & Briefs — `/state-of-capture/findings`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/state-of-capture/findings` — Child of `/state-of-capture`, legacy `/report` redirects here |
| **Core Narrative Purpose** | Published research, briefs, and analytical reports documenting capture dynamics and evidentiary findings. |
| **Golden Copy Anchor** | **H1:** "Findings & Briefs" / **Body:** "Full analytical reports and research publications." |
| **Interaction Design** | **CTA:** Individual brief view → `/state-of-capture/findings/:briefId` |
| **Data & State** | **Tables:** None (future: publications table) / **Logic:** Static content from `reportContent.ts` |
| **Component Dependencies** | `Report` page, `LegalSection` |

---

### 6.4 Methods Summary — `/state-of-capture/methods`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/state-of-capture/methods` — Child of `/state-of-capture`, legacy `/evidence` redirects here |
| **Core Narrative Purpose** | Documentary methodology—OSINT techniques, evidence standards, source verification, and analytical limitations. |
| **Golden Copy Anchor** | **H1:** "Methods Summary" / **Body:** "Our evidence gathering and verification methodology." |
| **Interaction Design** | **CTA 1:** "OSINT Framework" → `#osint` anchor / **CTA 2:** "Limitations" → `#limitations` anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `evidenceContent.ts` |
| **Component Dependencies** | `Evidence` page, `LegalSection`, `LegalPageTOC` |

---

## 7. Rustaveli Section

### 7.1 Rustaveli Hub — `/rustaveli`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/rustaveli` — Primary program hub, header "Rustaveli Project" link |
| **Core Narrative Purpose** | The Rustaveli Project safeguards civic inheritance—memory, language, and dignity—affirming that a nation is more than its captors. |
| **Golden Copy Anchor** | **H1:** "The Rustaveli Project" / **Subtitle:** "Safeguarding Civic Inheritance" / **Lead:** "A nation is more than its captors. We safeguard civic inheritance—memory, language, dignity." / **Mission:** "Cultural identity is a form of civic resistance." |
| **Interaction Design** | **CTA 1:** "Civic Canon" → `/rustaveli/canon` / **CTA 2:** "Movement of Dignity" → `/rustaveli/movement` / **CTA 3:** "Sign the Pledge" → `/rustaveli/join` |
| **Data & State** | **Tables:** None / **Logic:** Static content |
| **Component Dependencies** | `Layout`, `FoundationSection`, `PhotoPlaceholder`, `ExpandableSection`, `ProgramNav` |

---

### 7.2 Movement of Dignity — `/rustaveli/movement`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/rustaveli/movement` — Child of `/rustaveli`, legacy `/dignity` redirects here |
| **Core Narrative Purpose** | Principles and philosophy of nonviolent resistance in the Georgian civic context. |
| **Golden Copy Anchor** | **H1:** "Movement of Dignity" / **Body:** "Principles of nonviolent resistance grounded in Georgian civic tradition." |
| **Interaction Design** | **CTA:** "Join the Movement" → `/rustaveli/join` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `dignityContent.ts` |
| **Component Dependencies** | `Dignity` page, `LegalSection` |

---

### 7.3 The Civic Canon — `/rustaveli/canon`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/rustaveli/canon` — Child of `/rustaveli`, legacy `/canon` redirects here |
| **Core Narrative Purpose** | Core texts of Georgian civic tradition—historical documents, philosophical foundations, and constitutional heritage. |
| **Golden Copy Anchor** | **H1:** "The Civic Canon" / **Body:** "Core texts of Georgian civic tradition." |
| **Interaction Design** | **CTA:** Individual text view → `/rustaveli/canon/:entryId` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `canonContent.ts` |
| **Component Dependencies** | `Canon` page, `LegalSection` |

---

### 7.4 Join the Movement — `/rustaveli/join`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/rustaveli/join` — Child of `/rustaveli`, legacy `/solidarity-pledge` redirects here |
| **Core Narrative Purpose** | Solidarity pledge and volunteer opportunities for civic participation in the movement. |
| **Golden Copy Anchor** | **H1:** "Join the Movement" / **Body:** "Stand with Georgia's democracy movement." |
| **Interaction Design** | **CTA 1:** "Sign the Pledge" → `#pledge` anchor / **CTA 2:** "Volunteer" → `#volunteer` anchor / **CTA 3:** "Nominate a Profile" → `#nominate` anchor |
| **Data & State** | **Tables:** None (future: pledges table) / **Logic:** Form submission |
| **Component Dependencies** | `SolidarityPledge` page, form components |

---

## 8. About Section

### 8.1 About Hub — `/about`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about` — Section index, header "About" link |
| **Core Narrative Purpose** | Institutional statement of mission and origin—the Civic Council's role as custodian of democratic resilience. |
| **Golden Copy Anchor** | **H1:** "Mission & Origin" / **Lead:** "When the apparatus of state is weaponized against the people it is meant to serve, citizens are entitled to build instruments of remedy, record, and accountability." |
| **Interaction Design** | **CTA 1:** "Forum for Justice" → `/justice` / **CTA 2:** "View FAQ" → `/about/faq` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `aboutContent.ts` |
| **Component Dependencies** | `Layout`, `FoundationSection`, `PhotoPlaceholder`, `ExpandableSection` |

---

### 8.2 Mission & Mandate — `/about/mission`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/mission` — Child of `/about`, legacy `/mission` redirects here |
| **Core Narrative Purpose** | Authoritative declaration of purpose—the Civic Council as custodian of Georgia's democratic heritage. |
| **Golden Copy Anchor** | **H1:** "Mission & Mandate" / **Declaration:** "The Civic Council of Georgia serves as the custodian of Georgia's democratic heritage and the architect of its restoration." |
| **Interaction Design** | **CTA 1:** "Doctrine of Civic Necessity" → `/about/civic-necessity` / **CTA 2:** "Right to Remedy" → `/about/right-to-remedy` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `missionContent.ts` |
| **Component Dependencies** | `Mission` page, `LegalSection`, cross-reference links |

---

### 8.3 Doctrine of Civic Necessity — `/about/civic-necessity`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/civic-necessity` — Canonical doctrine page, child of `/about` |
| **Core Narrative Purpose** | The philosophical foundation explaining why the Civic Council exists—the doctrine that legitimizes civic action when state institutions fail. |
| **Golden Copy Anchor** | **H1:** "Doctrine of Civic Necessity" / **Body:** "When the apparatus of state is weaponized against the people it is meant to serve, citizens are entitled to seek remedy through instruments of their own creation." |
| **Interaction Design** | **CTA:** "Explore the Forum" → `/justice` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `civicNecessityContent.ts` |
| **Component Dependencies** | `CivicNecessity` page, `LegalSection`, `FormalDeclaration` |

---

### 8.4 Right to Remedy — `/about/right-to-remedy`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/right-to-remedy` — Canonical doctrine page, child of `/about` |
| **Core Narrative Purpose** | The operational goal—affirming that justice is always possible and victims are entitled to seek remedy beyond failed domestic institutions. |
| **Golden Copy Anchor** | **H1:** "Right to Remedy" / **Declaration:** "Where domestic remedy is foreclosed, citizens are entitled to seek justice beyond their borders. Justice is always possible." |
| **Interaction Design** | **CTA:** "View Remedy Pathways" → `/remedy` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `rightToRemedyContent.ts` |
| **Component Dependencies** | `RightToRemedy` page, `LegalSection`, `FormalDeclaration` |

---

### 8.5 Funding Integrity — `/about/funding`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/funding` — Child of `/about`, legacy `/funding` redirects here |
| **Core Narrative Purpose** | Financial discipline and independence—the Council's refusal of foreign government funding and pay-to-de-list protocols. |
| **Golden Copy Anchor** | **H1:** "Funding & Independence" / **Core Rule:** "Donors do not buy findings or silence." |
| **Interaction Design** | **CTA:** "Independence Firewalls" → `#conflicts` anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `fundingContent.ts` |
| **Component Dependencies** | `Funding` page, `LegalSection`, `LegalPageTOC` |

---

### 8.6 Governance — `/about/governance`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/governance` — Child of `/about`, legacy `/governance` redirects here |
| **Core Narrative Purpose** | Governance structure and leadership anonymity—operational security considerations. |
| **Golden Copy Anchor** | **H1:** "Governance" / **Body:** "Leadership anonymity is maintained for safety. External operations and advisory functions are documented here." |
| **Interaction Design** | **CTA:** None (informational) |
| **Data & State** | **Tables:** None / **Logic:** Static content |
| **Component Dependencies** | `Governance` page, `LegalSection` |

---

### 8.7 Press — `/about/press`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/press` — Child of `/about`, legacy `/press` redirects here |
| **Core Narrative Purpose** | Media resources, press inquiries, and published reports for journalists and researchers. |
| **Golden Copy Anchor** | **H1:** "Press & Media" / **Body:** "For press inquiries, contact our media team." |
| **Interaction Design** | **CTA 1:** "Published Reports" → `#reports` anchor / **CTA 2:** "Press Inquiries" → `#inquiries` anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `pressContent.ts` |
| **Component Dependencies** | `Press` page, `LegalSection`, `ContactCallout` |

---

### 8.8 FAQ — `/about/faq`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/about/faq` — Centralized knowledge hub, legacy `/faq` redirects here |
| **Core Narrative Purpose** | Comprehensive answers organized by category—mission, intake, safety, methodology, legal. |
| **Golden Copy Anchor** | **H1:** "Frequently Asked Questions" / **Body:** "Find detailed answers about our mission and methods." |
| **Interaction Design** | **CTA:** Category filter tabs + accordion expansion |
| **Data & State** | **Tables:** None / **Logic:** Static content from `faqContent.ts`, URL param `?category=` |
| **Component Dependencies** | `Faq` page, `Accordion`, category tabs |

---

## 9. Legal & Compliance Pages

### 9.1 Privacy Policy — `/privacy`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/privacy` — Root legal page, footer-linked |
| **Core Narrative Purpose** | Data protection commitments, collection practices, and user rights under applicable law. |
| **Golden Copy Anchor** | **H1:** "Privacy Policy" / **Body:** "Your privacy is foundational to our mission. We implement rigorous data protection protocols." |
| **Interaction Design** | **CTA:** Cookie settings → `#cookies-and-analytics` anchor |
| **Data & State** | **Tables:** None / **Logic:** Static content from `privacyContent.ts` |
| **Component Dependencies** | `Privacy` page, `LegalSection`, `LegalPageTOC` |

---

### 9.2 Terms of Use — `/terms`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/terms` — Root legal page, footer-linked |
| **Core Narrative Purpose** | Usage terms, intellectual property, disclaimers, and limitation of liability. |
| **Golden Copy Anchor** | **H1:** "Terms of Use" / **Body:** "By accessing this site, you agree to these terms." |
| **Interaction Design** | **CTA:** None (informational) |
| **Data & State** | **Tables:** None / **Logic:** Static content from `termsContent.ts` |
| **Component Dependencies** | `Terms` page, `LegalSection`, `LegalPageTOC` |

---

### 9.3 Standards & Safeguards — `/standards`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/standards` — Root legal page, footer-linked |
| **Core Narrative Purpose** | Editorial standards, evidence handling, source protection, and correction policies. |
| **Golden Copy Anchor** | **H1:** "Standards & Safeguards" / **Body:** "Our commitment to accuracy, fairness, and due process." |
| **Interaction Design** | **CTA 1:** "Evidence Standards" → `#evidence` / **CTA 2:** "Source Protection" → `#source-protection` / **CTA 3:** "Corrections Policy" → `#corrections` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `standardsContent.ts` |
| **Component Dependencies** | `Standards` page, `LegalSection`, `LegalPageTOC` |

---

### 9.4 Accessibility — `/accessibility`

| Field | Value |
|-------|-------|
| **Route & Hierarchy** | `/accessibility` — Root legal page, footer-linked |
| **Core Narrative Purpose** | Accessibility commitment, WCAG compliance status, and accommodation requests. |
| **Golden Copy Anchor** | **H1:** "Accessibility Statement" / **Body:** "We are committed to ensuring digital accessibility for people with disabilities." |
| **Interaction Design** | **CTA:** "Report Accessibility Issue" → `/report-error` |
| **Data & State** | **Tables:** None / **Logic:** Static content from `accessibilityContent.ts` |
| **Component Dependencies** | `Accessibility` page, `LegalSection`, `LegalPageTOC` |

---

## 10. Major Modals

### 10.1 IIMG Modal

| Field | Value |
|-------|-------|
| **Trigger** | Auto-opens on first homepage visit (controlled by localStorage `ccg-iimg-seen`) |
| **Core Narrative Purpose** | Entry gateway highlighting the Independent Investigative Mechanism for Georgia—the urgent mandate for documenting state crimes and chemical agents use. |
| **Golden Copy Anchor** | **H1:** "IIMG" / **Subtitle:** "Independent Investigative Mechanism for Georgia" / **Mandate:** "Special Mandate on State Crimes, Systemic Violence, and the Use of Chemical Agents" |
| **Interaction Design** | **CTA 1:** "Submit Evidence" → External `https://iimg.sabcho.org` / **CTA 2:** "Enter (ქართული)" → `/ge` / **CTA 3:** "Enter (English)" → `/` |
| **Data & State** | **Tables:** None / **Logic:** localStorage check, language routing |
| **Component Dependencies** | `Dialog`, `BrandWordmark`, `AnimatePresence`, `motion` |

---

## 11. Data Architecture Summary

### Database Tables

| Table | Purpose | Primary Operations |
|-------|---------|-------------------|
| `complicity_entities` | Complicity Ledger records—donors, contractors, enablers | SELECT (public), INSERT/UPDATE (admin via CSV uploader) |
| `triage_analytics` | Session and intake tracking | INSERT (anonymous), SELECT (service role) |

### Key Data Fields — `complicity_entities`

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `external_id` | Text | Source reference ID |
| `name` | Text | Entity name (English) |
| `name_ge` | Text | Entity name (Georgian) |
| `entity_type` | Text | INDIVIDUAL, COMPANY, etc. |
| `sector` | Text | Business sector |
| `inclusion_reasons` | Array | DONOR, STATE_CONTRACTOR, etc. |
| `total_donations_gel` | Numeric | Total political donations |
| `total_procurement_gel` | Numeric | Total state contracts |
| `profile_summary` | Text | Narrative summary (EN) |
| `profile_summary_ge` | Text | Narrative summary (GE) |
| `has_allegations` | Boolean | Flag for documented allegations |
| `is_sanctioned` | Boolean | Flag for sanctioned entities |
| `sources` | JSONB | Source citations |

### Backend Functions

| Function/Edge Function | Purpose |
|------------------------|---------|
| `triage-assistant` | AI-powered intake triage |
| `triage-analytics` | Analytics aggregation |
| `wikimedia-search` | Photo discovery |
| `photo-import` | Registry photo processing |
| `image-proxy` | External image proxying |

### Storage Buckets

| Bucket | Purpose | Public |
|--------|---------|--------|
| `registry-photos` | Official photos for registry entries | Yes |

---

## Route Category Legend

| Category | Color Code | Description |
|----------|------------|-------------|
| `root` | — | Site utilities (search, contact, sitemap) |
| `appeal` | Blue | Intake and triage pathways |
| `record` | Navy | Documentation and archives |
| `remedy` | Green | Consequence and accountability |
| `state-of-capture` | Red | Diagnostic framework |
| `rustaveli` | Gold | Cultural heritage program |
| `about` | Gray | Institutional information |
| `legal` | White | Legal and compliance |

---

## Legacy Redirect Map

All legacy flat URLs are permanently redirected (301) to their new nested locations:

| Legacy URL | New URL |
|------------|---------|
| `/submit-petition` | `/appeal` |
| `/safety` | `/appeal/protections` |
| `/justice-docket` | `/record/harm` |
| `/complicity-index` | `/record/registry` |
| `/the-list` | `/record/registry/the-list` |
| `/right-of-reply` | `/record/registry/reply-corrections` |
| `/off-ramp` | `/remedy` |
| `/sanctions` | `/remedy/sanctions` |
| `/dossier-desk` | `/remedy/criminal-dossiers` |
| `/iim-georgia` | `/remedy/iimg` |
| `/international-pathways` | `/remedy/partners` |
| `/engine` | `/state-of-capture` |
| `/capture-map` | `/state-of-capture/anatomy` |
| `/report` | `/state-of-capture/findings` |
| `/evidence` | `/state-of-capture/methods` |
| `/canon` | `/rustaveli/canon` |
| `/dignity` | `/rustaveli/movement` |
| `/solidarity-pledge` | `/rustaveli/join` |
| `/mission` | `/about/mission` |
| `/funding` | `/about/funding` |
| `/governance` | `/about/governance` |
| `/press` | `/about/press` |
| `/faq` | `/about/faq` |

---

*This manifest is generated from the live codebase. For the most current route configuration, see `src/config/routes.ts` and `src/App.tsx`.*

**Document End**
