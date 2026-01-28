/**
 * Shared types for CCG Platform
 */

// Remedy types per UN Resolution 60/147
export type RemedyType = 
  | 'restitution'
  | 'compensation'
  | 'rehabilitation'
  | 'satisfaction'
  | 'guarantees';

// Consent settings per OHCHR
export interface ConsentSettings {
  internal_archive: boolean;
  legal_referral: boolean;
  public_record: boolean;
  consent_timestamp?: string;
}

// Actor types for perpetrator identification
export interface ActorInfo {
  type: 'state' | 'agent' | 'private' | 'unknown';
  name?: string;
  role?: string;
  description?: string;
}

// Date range for incidents
export interface DateRange {
  start?: string;
  end?: string;
  ongoing: boolean;
  approximate?: boolean;
}

// Intake pathways
export type IntakePathway = 'harm' | 'wrongdoing' | 'inside';

// Triage status
export type TriageStatus = 'pending' | 'in_review' | 'routed' | 'closed' | 'referred';

// Evidence tier (Berkeley Protocol)
export type EvidenceTier = 
  | 'testimony'      // Tier 1
  | 'documents'      // Tier 2
  | 'digital'        // Tier 3
  | 'physical'       // Tier 4
  | 'direct';        // Tier 5

// Confidence labels for verification
export type ConfidenceLevel = 
  | 'verified'       // Multiple independent sources
  | 'documented'     // Primary source material
  | 'credible'       // Named journalistic sources
  | 'allegation'     // Under assessment
  | 'disputed';      // Subject has contested

// Language support
export type SupportedLanguage = 'en' | 'ge' | 'ru' | 'az';
