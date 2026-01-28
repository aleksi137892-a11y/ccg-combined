import React, { useState, useCallback, useRef } from 'react';
import {
  Upload,
  FileJson,
  CheckCircle,
  AlertCircle,
  Loader2,
  ClipboardPaste,
  Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ComplicityUploadData, ComplicityUploadStats } from '@/types/complicityIndex';

interface ComplicityUploaderProps {
  onUploadComplete?: () => void;
}

const formatGel = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)}B GEL`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M GEL`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K GEL`;
  }
  return `${amount.toLocaleString()} GEL`;
};

const logUploadStart = (version: string, stats: ComplicityUploadStats) => {
  console.log(`
  ╔═══════════════════════════════════════════════════════════════╗
  ║  📊 COMPLICITY INDEX ${version.padEnd(42)}║
  ║  ─────────────────────────────────────────────────────────────║
  ║  ${String(stats.entities).padEnd(3)} entities • ${stats.donations.padEnd(14)} donations • ${stats.procurement.padEnd(14)} procurement ║
  ║  ${stats.verified} registry verified • Complete beneficial ownership        ║
  ╚═══════════════════════════════════════════════════════════════╝
  `);
};

type NormalizedEntityType = 'individual' | 'company' | 'institution';
type NormalizedSeverity = 'high' | 'medium' | 'low';

type UploadIssue = {
  index: number;
  external_id?: string;
  field: string;
  message: string;
  fix?: string;
};

type ImportReport = {
  imported: number;
  skipped: number;
  fixed: number;
  issues: UploadIssue[];
};

const normalizeEntityType = (value: unknown): NormalizedEntityType | null => {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (v === 'individual' || v === 'person' || v === 'natural_person') return 'individual';
  if (v === 'company' || v === 'corporate' || v === 'legal_entity' || v === 'llc') return 'company';
  if (v === 'institution' || v === 'state' || v === 'agency' || v === 'government') return 'institution';
  return null;
};

const normalizeSeverity = (value: unknown): NormalizedSeverity | null => {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (v === 'high' || v === 'h') return 'high';
  if (v === 'medium' || v === 'med' || v === 'm') return 'medium';
  if (v === 'low' || v === 'l') return 'low';
  return null;
};

const humanizeExternalId = (externalId: string) => {
  const cleaned = externalId
    .replace(/^entity[-_]/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  if (!cleaned) return 'Unknown entity';

  const words = cleaned.split(' ').filter(Boolean);
  const titled = words
    .map((w) => {
      const lw = w.toLowerCase();
      if (lw === 'llc') return 'LLC';
      if (lw === 'ltd') return 'LTD';
      if (lw === 'jsc') return 'JSC';
      if (lw.length <= 2) return lw.toUpperCase();
      return lw.charAt(0).toUpperCase() + lw.slice(1);
    })
    .join(' ');

  return titled;
};

const safeArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

interface RawEntity {
  id?: string;
  external_id?: string;
  externalId?: string;
  externalID?: string;
  name?: string;
  entity_name?: string;
  title?: string;
  display_name?: string;
  name_ge?: string;
  entity_type?: string;
  type?: string;
  entityType?: string;
  position?: string;
  organization?: string;
  donations?: {
    total_gel?: number;
    recipients?: unknown[];
  };
  total_donations_gel?: number;
  donation_recipients?: unknown[];
  procurement?: {
    total_gel?: number;
    contracts?: unknown[];
  };
  total_procurement_gel?: number;
  procurement_contracts?: unknown[];
  beneficial_owner?: {
    name?: string;
    verified?: boolean;
    chain?: unknown[];
  } | string;
  beneficial_owner_verified?: boolean;
  ownership_chain?: unknown[];
  allegations?: unknown[];
  severity?: string;
  sources?: unknown[];
  notes?: string;
}

interface PreparedRow {
  external_id: string;
  name: string;
  name_ge: string | null;
  entity_type: NormalizedEntityType;
  position: string | null;
  organization: string | null;
  total_donations_gel: number;
  donation_recipients: unknown[];
  total_procurement_gel: number;
  procurement_contracts: unknown[];
  beneficial_owner: string | null;
  beneficial_owner_verified: boolean;
  ownership_chain: unknown[];
  allegations: unknown[];
  severity: NormalizedSeverity | null;
  sources: unknown[];
  notes: string | null;
}

const prepareEntitiesForUpsert = (rawEntities: RawEntity[]): { rows: PreparedRow[]; report: ImportReport } => {
  const issues: UploadIssue[] = [];
  const rows: PreparedRow[] = [];
  let fixed = 0;
  let skipped = 0;

  rawEntities.forEach((entity, index) => {
    const rawExternalId =
      entity?.id ?? entity?.external_id ?? entity?.externalId ?? entity?.externalID ?? null;
    const external_id = rawExternalId ? String(rawExternalId).trim() : '';

    if (!external_id) {
      skipped += 1;
      issues.push({ index, field: 'external_id', message: 'Missing entity id/external_id; row skipped.' });
      return;
    }

    // name: required in DB, so we always produce a fallback.
    const rawName = entity?.name ?? entity?.entity_name ?? entity?.title ?? entity?.display_name ?? null;
    let name = rawName ? String(rawName).trim() : '';
    if (!name) {
      name = humanizeExternalId(external_id);
      fixed += 1;
      issues.push({
        index,
        external_id,
        field: 'name',
        message: 'Missing name; generated from external_id.',
        fix: `name="${name}"`,
      });
    }

    const rawType = entity?.entity_type ?? entity?.type ?? entity?.entityType ?? null;
    const entity_type = normalizeEntityType(rawType);
    if (!entity_type) {
      skipped += 1;
      issues.push({
        index,
        external_id,
        field: 'entity_type',
        message: `Invalid or missing entity_type (${rawType ?? 'null'}); must be individual/company/institution. Row skipped.`,
      });
      return;
    }

    const severity = normalizeSeverity(entity?.severity) ?? null;

    rows.push({
      external_id,
      name,
      name_ge: entity?.name_ge ? String(entity.name_ge) : null,
      entity_type,
      position: entity?.position ? String(entity.position) : null,
      organization: entity?.organization ? String(entity.organization) : null,
      total_donations_gel: Number(entity?.donations?.total_gel ?? entity?.total_donations_gel ?? 0) || 0,
      donation_recipients: JSON.parse(
        JSON.stringify(safeArray(entity?.donations?.recipients ?? entity?.donation_recipients))
      ),
      total_procurement_gel: Number(entity?.procurement?.total_gel ?? entity?.total_procurement_gel ?? 0) || 0,
      procurement_contracts: JSON.parse(
        JSON.stringify(safeArray(entity?.procurement?.contracts ?? entity?.procurement_contracts))
      ),
      beneficial_owner: typeof entity?.beneficial_owner === 'object' 
        ? (entity.beneficial_owner as { name?: string })?.name ?? null 
        : (entity?.beneficial_owner as string) ?? null,
      beneficial_owner_verified: Boolean(
        (typeof entity?.beneficial_owner === 'object' 
          ? (entity.beneficial_owner as { verified?: boolean })?.verified 
          : false) ?? entity?.beneficial_owner_verified ?? false
      ),
      ownership_chain: JSON.parse(
        JSON.stringify(safeArray(
          (typeof entity?.beneficial_owner === 'object' 
            ? (entity.beneficial_owner as { chain?: unknown[] })?.chain 
            : undefined) ?? entity?.ownership_chain
        ))
      ),
      allegations: JSON.parse(JSON.stringify(safeArray(entity?.allegations))),
      severity,
      sources: JSON.parse(JSON.stringify(safeArray(entity?.sources))),
      notes: entity?.notes ? String(entity.notes) : null,
    });
  });

  return {
    rows,
    report: {
      imported: rows.length,
      skipped,
      fixed,
      issues,
    },
  };
};

const chunk = <T,>(arr: T[], size: number) => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const ComplicityUploader = React.forwardRef<HTMLDivElement, ComplicityUploaderProps>(
  ({ onUploadComplete }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [lastFileName, setLastFileName] = useState<string>('');
    const [mode, setMode] = useState<'file' | 'paste' | 'url'>('file');
    const [pastedJson, setPastedJson] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [report, setReport] = useState<ImportReport | null>(null);
    const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const importData = async (payload: RawEntity[] | { entities?: RawEntity[]; metadata?: { version?: string }; statistics?: { with_allegations?: string } }) => {
    const entities: RawEntity[] = Array.isArray(payload) ? payload : payload?.entities ?? [];

    if (!entities || !Array.isArray(entities)) {
      throw new Error('Invalid JSON: expected an array or an object with an entities array');
    }

    const metadata = !Array.isArray(payload) ? payload?.metadata : undefined;
    const statistics = !Array.isArray(payload) ? payload?.statistics : undefined;

    // Calculate stats (best-effort across formats)
    const totalDonations = entities.reduce(
      (sum, e) => sum + (Number(e?.donations?.total_gel ?? e?.total_donations_gel ?? 0) || 0),
      0
    );
    const totalProcurement = entities.reduce(
      (sum, e) => sum + (Number(e?.procurement?.total_gel ?? e?.total_procurement_gel ?? 0) || 0),
      0
    );
    const withBeneficialOwner = entities.filter((e) =>
      Boolean(e?.beneficial_owner?.verified ?? e?.beneficial_owner_verified)
    ).length;
    const verifiedPercent = entities.length
      ? Math.round((withBeneficialOwner / entities.length) * 100)
      : 0;

    const stats: ComplicityUploadStats = {
      entities: entities.length,
      donations: formatGel(totalDonations),
      procurement: formatGel(totalProcurement),
      verified: `${verifiedPercent}%`,
    };

    logUploadStart(metadata?.version || 'UNKNOWN', stats);

    console.log(`✓ Loaded ${entities.length} entities`);
    console.log(`✓ ${statistics?.with_allegations ?? '—'} with allegations`);
    console.log(`✓ ${withBeneficialOwner} with named UBO`);

    // Prepare + normalize for database format (best-effort; skips irreparable rows)
    const prepared = prepareEntitiesForUpsert(entities);
    setReport(prepared.report);

    if (prepared.rows.length === 0) {
      const first = prepared.report.issues[0];
      throw new Error(
        `No valid rows to import. First issue: ${first?.field ?? 'unknown'} – ${first?.message ?? 'unknown error'}`
      );
    }

    // Chunk uploads so a single huge import can't fail the entire request.
    const batches = chunk(prepared.rows, 200);
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const { error } = await supabase
        .from('complicity_entities')
        .upsert(batch, { onConflict: 'external_id' });
      if (error) throw error;
    }

    console.log(`✓ Successfully uploaded ${prepared.rows.length} entities to database`);

    setUploadStatus('success');
    const extra =
      prepared.report.skipped || prepared.report.fixed
        ? ` (fixed ${prepared.report.fixed}, skipped ${prepared.report.skipped})`
        : '';
    setStatusMessage(`Imported ${prepared.rows.length} entities${extra}`);

    toast({
      title: 'Upload Complete',
      description: `Imported ${prepared.rows.length} entities${extra}`,
    });

    onUploadComplete?.();
  };

  const processText = async (text: string) => {
    const parsed = JSON.parse(text);
    await importData(parsed);
  };

  const processFile = async (file: File) => {
    try {
      const text = await file.text();
      await processText(text);
    } catch (err) {
      // This happens in some environments even when the picker works.
      const name = err && typeof err === 'object' && 'name' in err ? String((err as { name: string }).name) : '';
      if (name === 'NotReadableError') {
        throw new Error(
          "Your browser couldn't read this file (NotReadableError). Use the “Paste JSON” tab instead."
        );
      }
      throw err;
    }
  };

  const processUpload = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('idle');
    setStatusMessage('');
    setReport(null);

    try {
      await processFile(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Upload failed');

      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const importFromPaste = async () => {
    setIsUploading(true);
    setUploadStatus('idle');
    setStatusMessage('');
    setReport(null);

    try {
      await processText(pastedJson);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Upload failed');

      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const importFromUrl = async () => {
    setIsUploading(true);
    setUploadStatus('idle');
    setStatusMessage('');
    setReport(null);

    try {
      if (!sourceUrl.trim()) throw new Error('Please paste a URL');

      const res = await fetch(sourceUrl.trim(), { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

      const text = await res.text();
      await processText(text);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Upload failed');

      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      const looksLikeJson =
        !!file &&
        (file.type === 'application/json' ||
          file.name.toLowerCase().endsWith('.json') ||
          file.type === 'text/json');

      console.log('[ComplicityUploader] drop:', {
        name: file?.name,
        type: file?.type,
        size: file?.size,
        looksLikeJson,
      });

      if (file && looksLikeJson) {
        setLastFileName(file.name);
        processUpload(file);
      } else {
        toast({
          title: 'Invalid File',
          description: 'Please upload a .json file',
          variant: 'destructive',
        });
      }
    },
    [toast, processUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('[ComplicityUploader] file select:', {
      name: file?.name,
      type: file?.type,
      size: file?.size,
    });

    // Allow selecting the same file again
    e.target.value = '';

    if (file) {
      setLastFileName(file.name);
      processUpload(file);
    }
  };

    return (
      <div ref={ref} className="border border-navy/10 bg-navy/[0.02] p-6">
        <div className="flex items-center gap-2 mb-4">
        <FileJson className="h-5 w-5 text-navy/60" />
        <h3 className="font-sans text-sm font-medium tracking-wide uppercase text-navy/60">
          Data Upload
        </h3>
      </div>

      <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
        <TabsList className="bg-transparent p-0 gap-2">
          <TabsTrigger value="file" className="font-sans text-xs uppercase tracking-wider">
            File
          </TabsTrigger>
          <TabsTrigger value="paste" className="font-sans text-xs uppercase tracking-wider">
            Paste JSON
          </TabsTrigger>
          <TabsTrigger value="url" className="font-sans text-xs uppercase tracking-wider">
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="sr-only"
            disabled={isUploading}
          />

          <div
            className={`relative border-2 border-dashed transition-colors p-8 cursor-pointer outline-none focus:ring-2 focus:ring-navy/20 ${
              isDragging ? 'border-navy bg-navy/5' : 'border-navy/20 hover:border-navy/40'
            }`}
            onClick={openFilePicker}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFilePicker();
              }
            }}
            role="button"
            tabIndex={0}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            aria-label="Upload Complicity Index JSON file"
          >
            <div className="flex flex-col items-center justify-center text-center">
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-navy animate-spin mb-3" />
                  <p className="font-serif text-navy">Processing upload...</p>
                </>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle className="h-8 w-8 text-navy/70 mb-3" />
                  <p className="font-serif text-navy">{statusMessage}</p>
                </>
              ) : uploadStatus === 'error' ? (
                <>
                  <AlertCircle className="h-8 w-8 text-navy/70 mb-3" />
                  <p className="font-serif text-navy">{statusMessage}</p>
                  <p className="text-sm text-navy/50 mt-2">Try “Paste JSON” if file reading fails.</p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-navy/40 mb-3" />
                  <p className="font-serif text-navy mb-1">Drop JSON file here or click to upload</p>
                  <p className="text-sm text-navy/50">CCG Complicity Index format (.json)</p>

                  {lastFileName ? (
                    <p className="text-xs text-navy/50 mt-3 font-sans">
                      Selected: <span className="text-navy/70">{lastFileName}</span>
                    </p>
                  ) : null}

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      openFilePicker();
                    }}
                  >
                    Choose file
                  </Button>
                </>
              )}
            </div>
          </div>

          <p className="text-xs text-navy/40 mt-3 font-sans">
            Upload overwrites existing entries with matching IDs. New entries are added.
          </p>
        </TabsContent>

        <TabsContent value="paste" className="mt-4">
          <div className="border border-navy/10 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardPaste className="h-4 w-4 text-navy/50" />
              <p className="font-sans text-xs uppercase tracking-wider text-navy/50">Paste JSON</p>
            </div>

            <Textarea
              value={pastedJson}
              onChange={(e) => setPastedJson(e.target.value)}
              placeholder="Paste the full Complicity Index JSON here…"
              className="min-h-[220px] font-mono text-xs border-navy/20"
              disabled={isUploading}
            />

            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-navy/40 font-sans">
                If your browser throws NotReadableError, this is the most reliable import method.
              </p>
              <Button
                type="button"
                onClick={importFromPaste}
                disabled={isUploading || !pastedJson.trim()}
              >
                {isUploading ? 'Importing…' : 'Import pasted JSON'}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="url" className="mt-4">
          <div className="border border-navy/10 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="h-4 w-4 text-navy/50" />
              <p className="font-sans text-xs uppercase tracking-wider text-navy/50">Import from URL</p>
            </div>

            <Input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://example.com/CCG_Complicity_Index_UPLOAD.json"
              className="border-navy/20 font-sans"
              disabled={isUploading}
            />

            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-navy/40 font-sans">
                URL must be publicly accessible and allow cross-origin requests.
              </p>
              <Button type="button" onClick={importFromUrl} disabled={isUploading || !sourceUrl.trim()}>
                {isUploading ? 'Fetching…' : 'Fetch & Import'}
              </Button>
            </div>
          </div>
        </TabsContent>

        {report && report.issues.length > 0 ? (
          <div className="mt-4 border border-navy/10 bg-white p-4">
            <p className="font-sans text-xs uppercase tracking-wider text-navy/50">
              Import report
            </p>
            <p className="text-xs text-navy/60 font-sans mt-1">
              Imported {report.imported}, fixed {report.fixed}, skipped {report.skipped}.
            </p>
            <ul className="mt-3 space-y-2 text-xs text-navy/70 font-sans">
              {report.issues.slice(0, 10).map((i) => (
                <li key={`${i.index}-${i.field}`} className="border-l-2 border-navy/10 pl-3">
                  <span className="text-navy/50">#{i.index + 1}</span> {i.external_id ? (
                    <span className="text-navy/60">[{i.external_id}]</span>
                  ) : null}{' '}
                  <span className="font-medium">{i.field}:</span> {i.message}
                  {i.fix ? <span className="text-navy/50"> — {i.fix}</span> : null}
                </li>
              ))}
            </ul>
            {report.issues.length > 10 ? (
              <p className="mt-3 text-xs text-navy/40 font-sans">
                Showing first 10 issues.
              </p>
            ) : null}
          </div>
        ) : null}
      </Tabs>
    </div>
  );
  }
);

ComplicityUploader.displayName = 'ComplicityUploader';

export default ComplicityUploader;
