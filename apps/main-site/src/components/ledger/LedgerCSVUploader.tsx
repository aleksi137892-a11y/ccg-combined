import { useState, useCallback, useRef } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { InclusionReason } from '@/types/complicityLedger';

interface LedgerCSVUploaderProps {
  onUploadComplete?: () => void;
}

interface ColumnMapping {
  [csvHeader: string]: string;
}

interface ParsedRow {
  [key: string]: string;
}

type UploadError = {
  rowNumber: number; // 1-based CSV line number (including header)
  name?: string;
  external_id?: string;
  message: string;
};

const DB_FIELDS = [
  { key: 'name', label: 'Name', required: true },
  { key: 'external_id', label: 'External ID / Registry ID' },
  { key: 'name_ge', label: 'Name (Georgian)' },
  { key: 'sector', label: 'Sector' },
  { key: 'inclusion_reasons', label: 'Inclusion Reasons' },
  { key: 'profile_summary', label: 'Profile Summary' },
  { key: 'profile_summary_ge', label: 'Profile Summary (Georgian)' },
  { key: 'total_donations_gel', label: 'Total Donations (GEL)' },
  { key: 'donation_years', label: 'Donation Years' },
  { key: 'first_donation_date', label: 'First Donation Date (→ donation_years)' },
  { key: 'last_donation_date', label: 'Last Donation Date (→ donation_years)' },
  { key: 'beneficial_owner', label: 'Beneficial Owner' },
  { key: 'beneficial_owner_english', label: 'Beneficial Owner (English)' },
  { key: 'has_allegations', label: 'Has Allegations' },
  { key: 'allegation_summary', label: 'Allegation Summary' },
  { key: 'allegation_types', label: 'Allegation Types' },
  { key: 'total_procurement_gel', label: 'State Procurement (GEL)' },
  { key: 'state_contracts_count', label: 'State Contracts Count' },
  { key: 'is_sanctioned', label: 'Is Sanctioned' },
  { key: 'website', label: 'Website' },
  { key: 'registry_verified', label: 'Registry Verified' },
  { key: 'entity_type', label: 'Entity Type' },
  { key: 'severity', label: 'Severity' },
  { key: 'notes', label: 'Notes' },
  { key: 'position', label: 'Position' },
  { key: 'organization', label: 'Organization' },
];

const VALID_INCLUSION_REASONS: InclusionReason[] = [
  'DONOR',
  'POLITICAL_DONOR',
  'STATE_CONTRACTOR',
  'IVANISHVILI_SPHERE',
  'SERVICE_PROVIDER',
  'SANCTIONED_ENTITY',
  'FINANCIAL_INSTITUTION',
];

// Synonym mapping for inclusion reasons (maps various CSV values to valid schema values)
const INCLUSION_REASON_SYNONYMS: Record<string, InclusionReason> = {
  'POLITICAL_DONOR': 'POLITICAL_DONOR',
  'PARTY_DONOR': 'POLITICAL_DONOR',
  'GD_DONOR': 'POLITICAL_DONOR',
  'RULING_PARTY_DONOR': 'POLITICAL_DONOR',
  'GEORGIAN_DREAM_DONOR': 'POLITICAL_DONOR',
  'DONOR': 'DONOR',
  'STATE_CONTRACTOR': 'STATE_CONTRACTOR',
  'CONTRACTOR': 'STATE_CONTRACTOR',
  'IVANISHVILI_SPHERE': 'IVANISHVILI_SPHERE',
  'IVANISHVILI': 'IVANISHVILI_SPHERE',
  'SERVICE_PROVIDER': 'SERVICE_PROVIDER',
  'PROVIDER': 'SERVICE_PROVIDER',
  'SANCTIONED_ENTITY': 'SANCTIONED_ENTITY',
  'SANCTIONED': 'SANCTIONED_ENTITY',
  'FINANCIAL_INSTITUTION': 'FINANCIAL_INSTITUTION',
  'BANK': 'FINANCIAL_INSTITUTION',
};

// Explicit CSV header -> DB field mappings (lowercase keys for case-insensitive matching)
const CSV_TO_DB_MAPPINGS: Record<string, string> = {
  // Core identity fields
  'canonical_name': 'name',
  'name': 'name',
  'registry_id': 'external_id',
  'external_id': 'external_id',
  'registry_official_name': 'name_ge',
  'name_ge': 'name_ge',
  'aliases': 'notes', // Store aliases in notes for now
  
  // Classification
  'sector': 'sector',
  'entity_type': 'entity_type',
  'inclusion_reasons': 'inclusion_reasons',
  'severity': 'severity',
  
  // Profile
  'profile_summary': 'profile_summary',
  'profile_summary_ge': 'profile_summary_ge',
  
  // Donations
  'total_donations_gel': 'total_donations_gel',
  'first_donation_date': 'first_donation_date',
  'last_donation_date': 'last_donation_date',
  'donation_years': 'donation_years',
  'donation_count': 'skip', // Not in DB schema
  'donation_details': 'skip', // Not in DB schema
  
  // Ownership
  'beneficial_owner': 'beneficial_owner',
  'beneficial_owner_english': 'beneficial_owner_english',
  'ownership_chain': 'skip', // Would need JSON parsing
  
  // Registry info
  'registry_status': 'skip', // Not in DB schema
  'registry_address': 'skip', // Not in DB schema
  'registry_verified': 'registry_verified',
  
  // Allegations
  'has_allegations': 'has_allegations',
  'allegation_count': 'skip', // Not in DB schema
  'allegation_types': 'allegation_types',
  'allegation_details': 'allegation_summary',
  'allegation_summary': 'allegation_summary',
  'allegation_sources': 'skip', // Not in DB schema
  
  // Procurement
  'state_procurement_gel': 'total_procurement_gel',
  'total_procurement_gel': 'total_procurement_gel',
  'state_contracts_count': 'state_contracts_count',
  'state_benefit_details': 'skip', // Not in DB schema
  
  // Other
  'website': 'website',
  'sanctions': 'skip', // Not in DB schema
  'nazk_war_sponsor': 'is_sanctioned',
  'is_sanctioned': 'is_sanctioned',
  'sources': 'skip', // Would need JSON parsing
  'notes': 'notes',
  'position': 'position',
  'organization': 'organization',
};

function parseCSV(text: string): { headers: string[]; rows: ParsedRow[] } {
  const lines = text.split(/\r?\n/).filter(line => line.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  // Parse header
  const headers = parseCSVLine(lines[0]);
  
  // Parse rows
  const rows: ParsedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: ParsedRow = {};
    headers.forEach((header, j) => {
      row[header] = values[j] || '';
    });
    rows.push(row);
  }

  return { headers, rows };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

function normalizeInclusionReasons(value: string): InclusionReason[] {
  if (!value) return [];
  
  const parts = value.split(/[;,|]/).map(s => s.trim().toUpperCase());
  const valid: InclusionReason[] = [];
  
  for (const part of parts) {
    const normalized = part.replace(/\s+/g, '_');
    
    // Check synonym mapping first
    if (INCLUSION_REASON_SYNONYMS[normalized]) {
      valid.push(INCLUSION_REASON_SYNONYMS[normalized]);
      continue;
    }
    
    // Then check if directly valid
    if (VALID_INCLUSION_REASONS.includes(normalized as InclusionReason)) {
      valid.push(normalized as InclusionReason);
    } else if (normalized.length > 0) {
      console.warn(`Unknown inclusion reason dropped: "${normalized}"`);
    }
  }
  
  return [...new Set(valid)]; // Deduplicate
}

function normalizeEntityType(value: string): 'individual' | 'company' | 'institution' {
  const lower = (value || '').toLowerCase().trim();
  if (lower.includes('individual') || lower.includes('person')) return 'individual';
  if (lower.includes('institution') || lower.includes('government') || lower.includes('state')) return 'institution';
  return 'company';
}

function normalizeSeverity(value: string): 'high' | 'medium' | 'low' {
  const lower = (value || '').toLowerCase().trim();
  if (lower.includes('high')) return 'high';
  if (lower.includes('low')) return 'low';
  return 'medium';
}

function parseBoolean(value: string): boolean {
  const lower = (value || '').toLowerCase().trim();
  return ['true', 'yes', '1', 'y'].includes(lower);
}

function parseNumber(value: string): number {
  const cleaned = (value || '').replace(/[^0-9.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function generateExternalId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

export function LedgerCSVUploader({ onUploadComplete }: LedgerCSVUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [csvData, setCsvData] = useState<{ headers: string[]; rows: ParsedRow[] } | null>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: number; failed: number; invalid: number; deduped: number } | null>(null);
  const [uploadErrors, setUploadErrors] = useState<UploadError[]>([]);
  const [clearBeforeImport, setClearBeforeImport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target?.result as string;
      // Strip BOM if present
      if (text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
      }
      const parsed = parseCSV(text);
      setCsvData(parsed);
      
      // Auto-map columns: first check explicit mappings (case-insensitive), then fuzzy match
      const autoMapping: ColumnMapping = {};
      parsed.headers.forEach(header => {
        // Check explicit mapping first (case-insensitive)
        const normalizedHeader = header.toLowerCase().trim();
        const explicitMapping = CSV_TO_DB_MAPPINGS[normalizedHeader];
        
        if (explicitMapping) {
          // Only add if not 'skip'
          if (explicitMapping !== 'skip') {
            autoMapping[header] = explicitMapping;
          }
          return;
        }
        
        // Fuzzy match fallback for unknown columns
        const cleanedHeader = normalizedHeader.replace(/[^a-z0-9]/g, '');
        for (const field of DB_FIELDS) {
          const normalizedField = field.key.toLowerCase().replace(/_/g, '');
          if (cleanedHeader === normalizedField || 
              (cleanedHeader.length > 3 && normalizedField.includes(cleanedHeader)) ||
              (normalizedField.length > 3 && cleanedHeader.includes(normalizedField))) {
            autoMapping[header] = field.key;
            break;
          }
        }
      });
      setColumnMapping(autoMapping);
      setUploadResult(null);
      setUploadErrors([]);
    };
    reader.readAsText(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const updateMapping = (csvHeader: string, dbField: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [csvHeader]: dbField === 'skip' ? '' : dbField,
    }));
  };

  const processUpload = async () => {
    if (!csvData) return;

    const nameColumn = Object.entries(columnMapping).find(([, v]) => v === 'name')?.[0];
    if (!nameColumn) {
      toast.error('Please map the "Name" column');
      return;
    }

    setIsUploading(true);

    // Clear existing data if requested
    if (clearBeforeImport) {
      const { error: deleteError } = await supabase
        .from('complicity_entities')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
      
      if (deleteError) {
        toast.error('Failed to clear existing data: ' + deleteError.message);
        setIsUploading(false);
        return;
      }
      toast.success('Cleared existing data');
    }

    let success = 0;
    let failed = 0;
    let invalid = 0;
    let deduped = 0;
    const nextErrors: UploadError[] = [];

    // Find date columns for donation_years derivation
    const firstDateCol = Object.entries(columnMapping).find(([, v]) => v === 'first_donation_date')?.[0];
    const lastDateCol = Object.entries(columnMapping).find(([, v]) => v === 'last_donation_date')?.[0];
    const allegationTypesCol = Object.entries(columnMapping).find(([, v]) => v === 'allegation_types')?.[0];
    const allegationSummaryCol = Object.entries(columnMapping).find(([, v]) => v === 'allegation_summary')?.[0];

    // Process in batches of 50
    const batchSize = 50;
    for (let i = 0; i < csvData.rows.length; i += batchSize) {
      const batch = csvData.rows.slice(i, i + batchSize);

      const recordsWithMeta = batch.map((row, idxInBatch) => {
        const record: Record<string, unknown> & { __rowNumber: number } = {
          // CSV line number: header is line 1, first data row is line 2
          __rowNumber: i + idxInBatch + 2,
        };
        
        for (const [csvHeader, dbField] of Object.entries(columnMapping)) {
          if (!dbField) continue;
          
          const value = row[csvHeader];
          
          switch (dbField) {
            case 'name':
              record.name = value?.trim() || null;
              break;
            case 'external_id':
              // Use registry_id if provided
              record.external_id = value?.trim() || null;
              break;
            case 'inclusion_reasons':
              record.inclusion_reasons = normalizeInclusionReasons(value);
              break;
            case 'entity_type':
              record.entity_type = normalizeEntityType(value);
              break;
            case 'severity':
              record.severity = normalizeSeverity(value);
              break;
            case 'has_allegations':
            case 'is_sanctioned':
            case 'registry_verified':
            case 'beneficial_owner_verified':
              record[dbField] = parseBoolean(value);
              break;
            case 'total_donations_gel':
            case 'total_procurement_gel':
            case 'state_contracts_count':
              record[dbField] = parseNumber(value);
              break;
            case 'first_donation_date':
            case 'last_donation_date':
            case 'allegation_types':
              // Skip - handled separately
              break;
            default:
              record[dbField] = value?.trim() || null;
          }
        }

        // Derive external_id from name if not provided
        if (!record.external_id && record.name) {
          record.external_id = generateExternalId(record.name as string);
        }

        // Validate required fields
        if (!record.name || typeof record.name !== 'string' || record.name.trim().length === 0) {
          invalid += 1;
          nextErrors.push({
            rowNumber: record.__rowNumber,
            message: 'Missing required field: name',
          });
          return null;
        }

        if (!record.external_id || typeof record.external_id !== 'string' || record.external_id.trim().length === 0) {
          invalid += 1;
          nextErrors.push({
            rowNumber: record.__rowNumber,
            name: record.name as string,
            message: 'Missing required field: external_id (registry_id)',
          });
          return null;
        }

        // Derive donation_years from date range
        if (firstDateCol && lastDateCol) {
          const firstDate = row[firstDateCol];
          const lastDate = row[lastDateCol];
          if (firstDate || lastDate) {
            const firstYear = firstDate ? firstDate.split('-')[0] : '';
            const lastYear = lastDate ? lastDate.split('-')[0] : '';
            if (firstYear && lastYear && firstYear !== lastYear) {
              record.donation_years = `${firstYear}–${lastYear}`;
            } else if (firstYear || lastYear) {
              record.donation_years = firstYear || lastYear;
            }
          }
        }

        // Parse allegations into JSON array
        if (allegationTypesCol || allegationSummaryCol) {
          const types = allegationTypesCol ? (row[allegationTypesCol] || '') : '';
          const details = allegationSummaryCol ? (row[allegationSummaryCol] || '') : '';
          
          if (types || details) {
            const typeList = types.split(/[;|]/).map((t: string) => t.trim()).filter(Boolean);
            const detailParts = details.split(' | ').filter(Boolean);
            
            const allegations = typeList.map((type: string, idx: number) => ({
              type,
              description: detailParts[idx] || detailParts[0] || '',
              sources: []
            }));
            
            if (allegations.length > 0) {
              record.allegations = allegations;
              record.has_allegations = true;
            }
          }
        }

        // Auto-derive has_allegations if not already set
        if (record.has_allegations === undefined) {
          record.has_allegations = !!(record.allegation_summary || (record.allegations as unknown[])?.length > 0);
        }

        // Ensure required fields have defaults
        if (!record.entity_type) record.entity_type = 'company';
        if (!record.severity) record.severity = 'medium';
        if (!record.inclusion_reasons) record.inclusion_reasons = [];

        return record;
      }).filter(Boolean) as Array<Record<string, unknown> & { __rowNumber: number }>;

      // Handle duplicate external_ids by generating unique suffixes
      const externalIdCounts = new Map<string, number>();
      for (const record of recordsWithMeta) {
        const baseId = (record.external_id as string).trim();
        const count = externalIdCounts.get(baseId) || 0;
        externalIdCounts.set(baseId, count + 1);
        
        if (count > 0) {
          const newId = `${baseId}_${count}`;
          console.log(`Duplicate ID detected: ${baseId} → ${newId}`);
          record.external_id = newId;
          deduped += 1;
        }
      }
      
      // Now deduplicate by the (now unique) external_id within batch
      const dedupedMap = new Map<string, Record<string, unknown> & { __rowNumber: number }>();
      for (const record of recordsWithMeta) {
        const extId = (record.external_id as string).trim();
        dedupedMap.set(extId, record);
      }
      const uniqueRecordsWithMeta = Array.from(dedupedMap.values());

      if (uniqueRecordsWithMeta.length === 0) continue;

      const uniqueRecords = uniqueRecordsWithMeta.map(({ __rowNumber, ...rest }) => rest);

      // Try batch upsert first; on failure, fall back to row-by-row to isolate bad records
      const { error } = await supabase
        .from('complicity_entities')
        .upsert(uniqueRecords as Record<string, unknown>[], {
          onConflict: 'external_id',
          ignoreDuplicates: false,
        });

      if (!error) {
        success += uniqueRecords.length;
        continue;
      }

      console.error('Batch upload error:', error);

      // Row-by-row fallback
      for (const recordWithMeta of uniqueRecordsWithMeta) {
        const { __rowNumber, ...dbRecord } = recordWithMeta;
        const { error: rowError } = await supabase
          .from('complicity_entities')
          .upsert([dbRecord] as Record<string, unknown>[], {
            onConflict: 'external_id',
            ignoreDuplicates: false,
          });

        if (rowError) {
          failed += 1;
          nextErrors.push({
            rowNumber: __rowNumber,
            name: (dbRecord.name as string) || undefined,
            external_id: (dbRecord.external_id as string) || undefined,
            message: rowError.message,
          });
        } else {
          success += 1;
        }
      }
    }

    setIsUploading(false);
    setUploadResult({ success, failed, invalid, deduped });
    setUploadErrors(nextErrors.slice(0, 50));

    if (failed === 0) {
      toast.success(`Successfully imported ${success} entities`);
      onUploadComplete?.();
    } else {
      toast.error(`Imported ${success}, failed ${failed}`);
    }
  };

  const reset = () => {
    setCsvData(null);
    setColumnMapping({});
    setUploadResult(null);
    setUploadErrors([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-t border-navy/10 mt-8 pt-6">
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-sans text-navy/50 hover:text-navy transition-colors">
        <Upload className="h-4 w-4" />
        Data Import (Admin)
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-4">
        {!csvData ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded p-8 text-center transition-colors ${
              isDragging ? 'border-navy bg-navy/5' : 'border-navy/20'
            }`}
          >
            <FileSpreadsheet className="h-8 w-8 mx-auto text-navy/30 mb-3" />
            <p className="font-sans text-navy/60 mb-2">
              Drop a CSV file here, or click to select
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="csv-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="border-navy/20 text-navy"
            >
              Select CSV
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-sans text-sm text-navy/60">
                {csvData.rows.length} rows detected
              </p>
              <Button variant="ghost" size="sm" onClick={reset} className="text-navy/50">
                Clear
              </Button>
            </div>

            {/* Column Mapping */}
            <div className="border border-navy/10 p-4 space-y-3">
              <p className="font-sans text-xs uppercase tracking-wider text-navy/50 mb-2">
                Column Mapping
              </p>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {csvData.headers.map(header => (
                  <div key={header} className="flex items-center gap-3">
                    <span className="font-mono text-sm text-navy/70 w-40 truncate">
                      {header}
                    </span>
                    <span className="text-navy/30">→</span>
                    <Select
                      value={columnMapping[header] || 'skip'}
                      onValueChange={(v) => updateMapping(header, v)}
                    >
                      <SelectTrigger className="w-48 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skip">Skip</SelectItem>
                        {DB_FIELDS.map(field => (
                          <SelectItem key={field.key} value={field.key}>
                            {field.label} {field.required && '*'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="border border-navy/10 p-4">
              <p className="font-sans text-xs uppercase tracking-wider text-navy/50 mb-2">
                Preview (first 3 rows)
              </p>
              <div className="overflow-x-auto">
                <table className="text-xs font-mono">
                  <thead>
                    <tr>
                      {csvData.headers.slice(0, 5).map(h => (
                        <th key={h} className="text-left p-1 text-navy/50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.rows.slice(0, 3).map((row, i) => (
                      <tr key={i}>
                        {csvData.headers.slice(0, 5).map(h => (
                          <td key={h} className="p-1 text-navy/70 max-w-[150px] truncate">
                            {row[h]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upload Result */}
            {uploadResult && (
              <div className="space-y-3">
                <div className={`p-4 rounded flex items-center gap-3 ${
                  uploadResult.failed > 0 ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                }`}>
                  {uploadResult.failed > 0 ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  <div className="space-y-1">
                    <div>
                      Imported {uploadResult.success} entities
                      {uploadResult.failed > 0 && `, ${uploadResult.failed} failed`}
                    </div>
                    <div className="text-xs font-sans opacity-80">
                      {uploadResult.invalid > 0 && `Skipped ${uploadResult.invalid} invalid rows. `}
                      {uploadResult.deduped > 0 && `Merged ${uploadResult.deduped} duplicates (same external_id).`}
                    </div>
                  </div>
                </div>

                {uploadErrors.length > 0 && (
                  <div className="border border-navy/10 p-4">
                    <p className="font-sans text-xs uppercase tracking-wider text-navy/50 mb-2">
                      Import errors (first {uploadErrors.length})
                    </p>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {uploadErrors.map((err) => (
                        <div key={`${err.rowNumber}-${err.external_id ?? ''}`} className="text-xs font-mono text-navy/70">
                          <span className="text-navy/50">Row {err.rowNumber}:</span>{' '}
                          {err.external_id ? <span className="text-navy/60">[{err.external_id}] </span> : null}
                          {err.name ? <span className="text-navy">{err.name} — </span> : null}
                          <span className="text-navy/70">{err.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Clear Data Option */}
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                id="clear-before-import"
                checked={clearBeforeImport}
                onCheckedChange={(checked) => setClearBeforeImport(!!checked)}
              />
              <label htmlFor="clear-before-import" className="text-sm font-sans text-navy/70 flex items-center gap-2 cursor-pointer">
                <Trash2 className="h-3 w-3" />
                Clear all existing data before import
              </label>
            </div>

            {/* Upload Button */}
            <Button
              onClick={processUpload}
              disabled={isUploading || !columnMapping[Object.keys(columnMapping).find(k => columnMapping[k] === 'name') || '']}
              className="bg-navy text-white hover:bg-navy/90"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Import {csvData.rows.length} Entities
                </>
              )}
            </Button>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
