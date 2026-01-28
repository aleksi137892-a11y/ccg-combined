import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { InstitutionalPageHeader } from '@/components/institutional';
import { Accordion } from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';
import {
  LedgerDisclaimer,
  LedgerStats,
  LedgerFilters,
  LedgerEntityRow,
  LedgerExport,
  LedgerCSVUploader,
} from '@/components/ledger';
import { SkeletonLedger } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { LedgerEntity, LedgerFiltersState, InclusionReason } from '@/types/complicityLedger';

type SortKey = 'name' | 'total_donations_gel' | 'sector';
type SortDirection = 'asc' | 'desc';

interface SortState {
  key: SortKey;
  direction: SortDirection;
}

const ALL_REASONS: InclusionReason[] = [
  'DONOR', 'POLITICAL_DONOR', 'STATE_CONTRACTOR', 'IVANISHVILI_SPHERE', 
  'SERVICE_PROVIDER', 'SANCTIONED_ENTITY', 'FINANCIAL_INSTITUTION'
];

export default function ComplicityLedger() {
  const { isGeorgian } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [entities, setEntities] = useState<LedgerEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortState | null>(null);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<LedgerFiltersState>(() => ({
    search: searchParams.get('q') || '',
    inclusionReasons: searchParams.get('reasons')?.split(',').filter(Boolean) as InclusionReason[] || [...ALL_REASONS],
    sector: searchParams.get('sector') || 'all',
    hasAllegations: searchParams.get('allegations') === 'true' ? true : null,
    sanctionedOnly: searchParams.get('sanctioned') === 'true',
    donationMin: parseInt(searchParams.get('donMin') || '0') || 0,
    donationMax: parseInt(searchParams.get('donMax') || '0') || Infinity,
  }));

  const fetchEntities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('complicity_entities')
      .select('*')
      .order('total_donations_gel', { ascending: false });

    if (!error && data) {
      setEntities(data as unknown as LedgerEntity[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.inclusionReasons.length < ALL_REASONS.length) {
      params.set('reasons', filters.inclusionReasons.join(','));
    }
    if (filters.sector !== 'all') params.set('sector', filters.sector);
    if (filters.hasAllegations === true) params.set('allegations', 'true');
    if (filters.sanctionedOnly) params.set('sanctioned', 'true');
    if (filters.donationMin > 0) params.set('donMin', filters.donationMin.toString());
    if (filters.donationMax < maxDonation && filters.donationMax !== Infinity) {
      params.set('donMax', filters.donationMax.toString());
    }
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentional: only sync URL when filters change, not when maxDonation/setSearchParams change
  }, [filters]);

  // Derived data
  const sectors = useMemo(() => 
    [...new Set(entities.map(e => e.sector).filter(Boolean) as string[])].sort(),
    [entities]
  );

  const maxDonation = useMemo(() => 
    Math.max(...entities.map(e => e.total_donations_gel || 0), 0),
    [entities]
  );

  // Initialize max donation filter once loaded
  useEffect(() => {
    if (maxDonation > 0 && filters.donationMax === Infinity) {
      setFilters(f => ({ ...f, donationMax: maxDonation }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentional: only initialize once when maxDonation first becomes available
  }, [maxDonation]);

  const stats = useMemo(() => ({
    totalEntities: entities.length,
    totalDonations: entities.reduce((sum, e) => sum + (e.total_donations_gel || 0), 0),
    withAllegations: entities.filter(e => e.has_allegations).length,
    totalProcurement: entities.reduce((sum, e) => sum + (e.total_procurement_gel || 0), 0),
  }), [entities]);

  // Filter entities
  const filteredEntities = useMemo(() => {
    return entities.filter(entity => {
      // Search
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matches = 
          entity.name?.toLowerCase().includes(search) ||
          entity.beneficial_owner?.toLowerCase().includes(search) ||
          entity.beneficial_owner_english?.toLowerCase().includes(search) ||
          entity.sector?.toLowerCase().includes(search) ||
          entity.profile_summary?.toLowerCase().includes(search);
        if (!matches) return false;
      }

      // Inclusion reasons
      if (filters.inclusionReasons.length < ALL_REASONS.length) {
        const entityReasons = entity.inclusion_reasons || [];
        const hasMatch = entityReasons.some(r => filters.inclusionReasons.includes(r));
        if (!hasMatch && entityReasons.length > 0) return false;
      }

      // Sector
      if (filters.sector !== 'all' && entity.sector !== filters.sector) return false;

      // Allegations
      if (filters.hasAllegations === true && !entity.has_allegations) return false;

      // Sanctioned
      if (filters.sanctionedOnly && !entity.is_sanctioned) return false;

      // Donation range
      const donations = entity.total_donations_gel || 0;
      if (donations < filters.donationMin) return false;
      if (filters.donationMax !== Infinity && donations > filters.donationMax) return false;

      return true;
    });
  }, [entities, filters]);

  // Sort filtered entities (display-only, does not modify underlying data)
  const sortedEntities = useMemo(() => {
    if (!sort) return filteredEntities;
    
    return [...filteredEntities].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      
      switch (sort.key) {
        case 'name':
          aVal = (a.name || '').toLowerCase();
          bVal = (b.name || '').toLowerCase();
          break;
        case 'total_donations_gel':
          aVal = a.total_donations_gel || 0;
          bVal = b.total_donations_gel || 0;
          break;
        case 'sector':
          aVal = (a.sector || '').toLowerCase();
          bVal = (b.sector || '').toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const comparison = String(aVal).localeCompare(String(bVal));
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredEntities, sort]);

  // Handle sort toggle
  const handleSort = (key: SortKey) => {
    setSort(current => {
      if (current?.key === key) {
        // Cycle: asc -> desc -> none
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null; // Remove sort
      }
      // New sort: start with descending (highest first for numbers, Z-A for text)
      return { key, direction: 'desc' };
    });
  };

  // Sort header component
  const SortButton = ({ 
    sortKey, 
    label, 
    labelGe 
  }: { 
    sortKey: SortKey; 
    label: string; 
    labelGe: string;
  }) => {
    const isActive = sort?.key === sortKey;
    const isAsc = isActive && sort.direction === 'asc';
    const isDesc = isActive && sort.direction === 'desc';
    
    const ariaLabel = isGeorgian
      ? isAsc ? `${labelGe}: ზრდადობით` : isDesc ? `${labelGe}: კლებადობით` : `${labelGe}: დალაგება`
      : isAsc ? `${label}: ascending` : isDesc ? `${label}: descending` : `${label}: click to sort`;

    return (
      <button
        onClick={() => handleSort(sortKey)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSort(sortKey);
          }
        }}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-ui transition-colors",
          isActive ? "bg-navy/10 text-navy" : "text-navy/60 hover:text-navy hover:bg-navy/5"
        )}
        aria-label={ariaLabel}
        aria-pressed={isActive}
      >
        <span className={cn(isGeorgian && "font-georgian")}>
          {isGeorgian ? labelGe : label}
        </span>
        <span className="opacity-60">
          {isAsc && <ChevronUp size={14} />}
          {isDesc && <ChevronDown size={14} />}
          {!isActive && <ChevronsUpDown size={14} />}
        </span>
      </button>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="border-t-2 border-navy" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <InstitutionalPageHeader
            title="The Complicity Ledger"
            titleGe="თანამონაწილეობის რეესტრი"
            subtitle="Financial Flows to a Regime Under Sanction"
            subtitleGe="ფინანსური ნაკადები სანქცირებული რეჟიმისკენ"
            breadcrumbs={[
              { label: 'The Record', labelGe: 'ჩანაწერი', href: '/record' },
              { label: 'Ledger', labelGe: 'რეესტრი', href: '/record/ledger' },
            ]}
          />

          <LedgerDisclaimer />

          <LedgerStats stats={stats} filteredCount={filteredEntities.length} />

          <LedgerFilters
            filters={filters}
            onFiltersChange={setFilters}
            sectors={sectors}
            maxDonation={maxDonation}
          />

          {/* Sort controls */}
          {!loading && filteredEntities.length > 1 && (
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-navy/10">
              <span className="text-xs font-ui text-navy/50 uppercase tracking-wider">
                {isGeorgian ? 'დალაგება:' : 'Sort by:'}
              </span>
              <SortButton sortKey="name" label="Name" labelGe="სახელი" />
              <SortButton sortKey="total_donations_gel" label="Donations" labelGe="შემოწირულობები" />
              <SortButton sortKey="sector" label="Sector" labelGe="სექტორი" />
            </div>
          )}

          {loading ? (
            <div className="py-8">
              <SkeletonLedger count={6} />
            </div>
          ) : sortedEntities.length === 0 ? (
            <EmptyState 
              variant={filters.search ? 'search' : 'filter'}
              action={
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFilters({
                    search: '',
                    inclusionReasons: [...ALL_REASONS],
                    sector: 'all',
                    hasAllegations: null,
                    sanctionedOnly: false,
                    donationMin: 0,
                    donationMax: maxDonation || Infinity,
                  })}
                >
                  {isGeorgian ? 'ფილტრების გასუფთავება' : 'Clear all filters'}
                </Button>
              }
            />
          ) : (
            <Accordion type="single" collapsible className="space-y-0">
              {sortedEntities.map(entity => (
                <LedgerEntityRow key={entity.id} entity={entity} />
              ))}
            </Accordion>
          )}

          <LedgerExport entities={sortedEntities} filters={filters} />

          {import.meta.env.DEV && (
            <LedgerCSVUploader onUploadComplete={fetchEntities} />
          )}
        </div>
      </div>
    </Layout>
  );
}
