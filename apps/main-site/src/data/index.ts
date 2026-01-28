// Master Content Index - Barrel export for all institutional content
// This file aggregates all content modules for unified access and JSON export

export { aboutContent } from './aboutContent';
export { charterContent } from './charterContent';
export { methodologyContent } from './methodologyContent';
export { standardsContent } from './standardsContent';
export { transparencyContent } from './transparencyContent';
export { fundingIndependenceContent } from './fundingContent';
export { pressContent } from './pressContent';
export { privacyPolicyContent } from './privacyContent';
export { accessibilityContent } from './accessibilityContent';
export { termsOfUseContent } from './termsContent';
export { triageContent } from './triageContent';
export { sitemapContent } from './sitemapContent';
export { missionContent } from './missionContent';
export { engineContent } from './engineContent';
export { reportContent } from './reportContent';
export { evidenceContent } from './evidenceContent';
export { rustaweliContent } from './rustaweliContent';
export { canonContent } from './canonContent';
export { dignityContent } from './dignityContent';
export { heritageContent } from './heritageContent';
export { civicNecessityContent } from './civicNecessityContent';
export { rightToRemedyContent } from './rightToRemedyContent';
export { captureMapContent } from './captureMapContent';
export { investigationsContent } from './investigationsContent';
export { partnersContent } from './partnersContent';
export { faqContent } from './faqContent';

// Import for master object
import { aboutContent } from './aboutContent';
import { charterContent } from './charterContent';
import { methodologyContent } from './methodologyContent';
import { standardsContent } from './standardsContent';
import { transparencyContent } from './transparencyContent';
import { fundingIndependenceContent } from './fundingContent';
import { pressContent } from './pressContent';
import { privacyPolicyContent } from './privacyContent';
import { accessibilityContent } from './accessibilityContent';
import { termsOfUseContent } from './termsContent';
import { triageContent } from './triageContent';
import { sitemapContent } from './sitemapContent';
import { missionContent } from './missionContent';
import { engineContent } from './engineContent';
import { reportContent } from './reportContent';
import { evidenceContent } from './evidenceContent';
import { rustaweliContent } from './rustaweliContent';
import { canonContent } from './canonContent';
import { dignityContent } from './dignityContent';
import { heritageContent } from './heritageContent';
import { civicNecessityContent } from './civicNecessityContent';
import { rightToRemedyContent } from './rightToRemedyContent';
import { captureMapContent } from './captureMapContent';
import { investigationsContent } from './investigationsContent';
import { partnersContent } from './partnersContent';
import { faqContent } from './faqContent';

// Master content object - complete institutional record
export const masterContent = {
  version: '1.0.0',
  exportDate: new Date().toISOString(),
  institution: {
    name: 'Civic Council of Georgia',
    nameGe: 'საქართველოს სამოქალაქო საბჭო',
    domain: 'sabcho.org'
  },
  languages: ['en', 'ge'] as const,
  content: {
    about: aboutContent,
    charter: charterContent,
    methodology: methodologyContent,
    standards: standardsContent,
    transparency: transparencyContent,
    funding: fundingIndependenceContent,
    press: pressContent,
    privacy: privacyPolicyContent,
    accessibility: accessibilityContent,
    terms: termsOfUseContent,
    triage: triageContent,
    sitemap: sitemapContent,
    mission: missionContent,
    engine: engineContent,
    report: reportContent,
    evidence: evidenceContent,
    rustaveli: rustaweliContent,
    canon: canonContent,
    dignity: dignityContent,
    heritage: heritageContent,
    civicNecessity: civicNecessityContent,
    rightToRemedy: rightToRemedyContent,
    captureMap: captureMapContent,
    investigations: investigationsContent,
    partners: partnersContent,
    faq: faqContent
  }
};

export type MasterContent = typeof masterContent;
export type ContentSection = keyof typeof masterContent.content;
