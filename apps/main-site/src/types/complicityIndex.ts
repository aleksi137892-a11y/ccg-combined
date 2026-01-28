export interface DonationRecipient {
  party: string;
  amount: number;
  year: number;
}

export interface ProcurementContract {
  agency: string;
  amount: number;
  year: number;
  description?: string;
}

export interface OwnershipLink {
  entity: string;
  percentage: number;
  type: string;
}

export interface Allegation {
  type: string;
  description: string;
  sources: string[];
}

export interface EntitySource {
  title: string;
  url: string;
}

export interface ComplicityEntity {
  id: string;
  external_id: string;
  name: string;
  name_ge?: string;
  entity_type: 'individual' | 'company' | 'institution';
  position?: string;
  organization?: string;
  total_donations_gel: number;
  donation_recipients: DonationRecipient[];
  total_procurement_gel: number;
  procurement_contracts: ProcurementContract[];
  beneficial_owner?: string;
  beneficial_owner_verified: boolean;
  ownership_chain: OwnershipLink[];
  allegations: Allegation[];
  severity: 'high' | 'medium' | 'low';
  sources: EntitySource[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplicityUploadData {
  metadata: {
    version: string;
    exportDate: string;
    source?: string;
  };
  statistics: {
    total_entities: number;
    with_allegations: number;
    with_beneficial_owner: number;
  };
  entities: Array<{
    id: string;
    name: string;
    name_ge?: string;
    entity_type: 'individual' | 'company' | 'institution';
    position?: string;
    organization?: string;
    donations?: {
      total_gel: number;
      recipients: DonationRecipient[];
    };
    procurement?: {
      total_gel: number;
      contracts: ProcurementContract[];
    };
    beneficial_owner?: {
      name: string;
      verified: boolean;
      chain?: OwnershipLink[];
    };
    severity: 'high' | 'medium' | 'low';
    allegations?: Allegation[];
    sources?: EntitySource[];
    notes?: string;
  }>;
}

export interface ComplicityUploadStats {
  entities: number;
  donations: string;
  procurement: string;
  verified: string;
}
