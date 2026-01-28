/**
 * Shared type definitions for institutional content structures.
 * Used across all institutional, legal, and policy pages to ensure consistency.
 */

// Base link type used in callouts and sections
export interface ContentLink {
  label: string;
  labelGe?: string;
  href: string;
}

// Callout types for highlighted content boxes
export interface ContentCallout {
  type: string;
  title: string;
  titleGe?: string;
  body: string;
  bodyGe?: string;
  links?: ContentLink[];
}

// Key-value table row
export interface KeyValueRow {
  key: string;
  keyGe?: string;
  value: string;
  valueGe?: string;
}

// Key-value table structure
export interface KeyValueTable {
  title: string;
  titleGe?: string;
  rows: KeyValueRow[];
}

// Sub-section for nested content (e.g., Privacy Policy subsections)
export interface ContentSubSection {
  id: string;
  heading: string;
  headingGe?: string;
  body: string[];
  bodyGe?: string[];
  bullets?: string[];
  bulletsGe?: string[];
}

// Main section structure used across all institutional pages
export interface ContentSection {
  id: string;
  heading: string;
  headingGe?: string;
  body?: string[];
  bodyGe?: string[];
  bullets?: string[];
  bulletsGe?: string[];
  bodyAfterBullets?: string[];
  bodyAfterBulletsGe?: string[];
  subSections?: ContentSubSection[];
  links?: ContentLink[];
  keyValueTable?: KeyValueTable;
}

// Meta information for page headers
export interface ContentMeta {
  title: string;
  titleGe: string;
  lastUpdated?: string;
  lastUpdatedGe?: string;
  intro: string;
  introGe: string;
  // Optional special mandate fields for IIMG
  mandateTitle?: string;
  mandateTitleGe?: string;
  mandateDescription?: string;
  mandateDescriptionGe?: string;
}

// Jump navigation item for table of contents
export interface JumpToItem {
  id: string;
  label: string;
  labelGe?: string;
}

// Hero section for pages with CTAs
export interface ContentHero {
  emphasisLine: string;
  emphasisLineGe: string;
  primaryCta?: ContentLink & { label: string; labelGe: string };
  secondaryCta?: ContentLink & { label: string; labelGe: string };
}

// Card structure for "What we build" type sections
export interface ContentCard {
  title: string;
  titleGe: string;
  body: string;
  bodyGe: string;
  outputs?: string;
  outputsGe?: string;
  href?: string;
}

// Full institutional page content structure
export interface InstitutionalContent {
  meta: ContentMeta;
  callouts?: ContentCallout[];
  sections: ContentSection[];
  hero?: ContentHero;
  jumpToItems?: JumpToItem[];
  footerLinks?: ContentLink[];
}

// Legal page content (Privacy, Terms, Accessibility)
export interface LegalPageContent {
  meta: ContentMeta;
  callouts?: ContentCallout[];
  sections: ContentSection[];
}
