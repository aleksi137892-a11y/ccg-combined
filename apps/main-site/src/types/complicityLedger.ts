export type InclusionReason = 
  | 'DONOR' 
  | 'POLITICAL_DONOR'
  | 'STATE_CONTRACTOR' 
  | 'IVANISHVILI_SPHERE' 
  | 'SERVICE_PROVIDER' 
  | 'SANCTIONED_ENTITY'
  | 'FINANCIAL_INSTITUTION';

export interface LedgerEntity {
  id: string;
  external_id: string;
  name: string;
  name_ge?: string;
  sector?: string;
  inclusion_reasons: InclusionReason[];
  profile_summary?: string;
  profile_summary_ge?: string;
  total_donations_gel: number;
  donation_years?: string;
  beneficial_owner?: string;
  beneficial_owner_english?: string;
  beneficial_owner_verified: boolean;
  has_allegations: boolean;
  allegation_summary?: string;
  allegations: Array<{
    type: string;
    description: string;
    sources: string[];
  }>;
  total_procurement_gel: number;
  state_contracts_count: number;
  procurement_contracts: Array<{
    agency: string;
    amount: number;
    year: number;
    description?: string;
  }>;
  website?: string;
  registry_verified: boolean;
  is_sanctioned: boolean;
  sources: Array<{
    title: string;
    url: string;
  }>;
  entity_type: 'individual' | 'company' | 'institution';
  position?: string;
  organization?: string;
  severity: 'high' | 'medium' | 'low';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LedgerFiltersState {
  search: string;
  inclusionReasons: InclusionReason[];
  sector: string;
  hasAllegations: boolean | null;
  sanctionedOnly: boolean;
  donationMin: number;
  donationMax: number;
}

export interface LedgerStats {
  totalEntities: number;
  totalDonations: number;
  withAllegations: number;
  totalProcurement: number;
}

export const INCLUSION_REASON_LABELS: Record<InclusionReason, string> = {
  DONOR: 'Donor',
  POLITICAL_DONOR: 'Political Donor',
  STATE_CONTRACTOR: 'State Contractor',
  IVANISHVILI_SPHERE: 'Ivanishvili Sphere',
  SERVICE_PROVIDER: 'Service Provider',
  SANCTIONED_ENTITY: 'Sanctioned Entity',
  FINANCIAL_INSTITUTION: 'Financial Institution',
};

export const INCLUSION_REASON_DESCRIPTIONS: Record<InclusionReason, string> = {
  DONOR: 'Direct financial contribution to the ruling party',
  POLITICAL_DONOR: 'Direct financial contribution to Georgian Dream or affiliated political entities',
  STATE_CONTRACTOR: 'Beneficiary of government procurement correlating with political donations',
  IVANISHVILI_SPHERE: 'Controlled by or commercially linked to the oligarch at the system\'s center',
  SERVICE_PROVIDER: 'Legal, audit, or consulting firms whose professional work enables regime operations',
  SANCTIONED_ENTITY: 'Designated by international bodies or Ukraine\'s NACP',
  FINANCIAL_INSTITUTION: 'Banks or financial entities that facilitate regime financial operations',
};
