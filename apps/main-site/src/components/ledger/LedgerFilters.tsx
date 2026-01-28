import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LedgerFiltersState, InclusionReason } from '@/types/complicityLedger';
import { INCLUSION_REASON_LABELS } from '@/types/complicityLedger';

interface LedgerFiltersProps {
  filters: LedgerFiltersState;
  onFiltersChange: (filters: LedgerFiltersState) => void;
  sectors: string[];
  maxDonation: number;
}

const ALL_REASONS: InclusionReason[] = [
  'DONOR',
  'POLITICAL_DONOR',
  'STATE_CONTRACTOR',
  'IVANISHVILI_SPHERE',
  'SERVICE_PROVIDER',
  'SANCTIONED_ENTITY',
  'FINANCIAL_INSTITUTION',
];

function formatGelShort(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K`;
  }
  return amount.toFixed(0);
}

export function LedgerFilters({ 
  filters, 
  onFiltersChange, 
  sectors, 
  maxDonation 
}: LedgerFiltersProps) {
  const { isGeorgian } = useLanguage();
  
  const labels = {
    search: isGeorgian ? 'ძებნა სახელით, მფლობელით ან სექტორით...' : 'Search by name, owner, or sector...',
    entanglement: isGeorgian ? 'თანამონაწილეობის რეჟიმი' : 'Mode of Entanglement',
    sector: isGeorgian ? 'სექტორი' : 'Sector',
    allSectors: isGeorgian ? 'ყველა სექტორი' : 'All sectors',
    allegations: isGeorgian ? 'დოკუმენტირებული ბრალდებებით' : 'With documented allegations',
    sanctioned: isGeorgian ? 'მხოლოდ სანქცირებული' : 'Sanctioned only',
    donationRange: isGeorgian ? 'შემოწირულობის დიაპაზონი' : 'Donation Range',
    clear: isGeorgian ? 'ფილტრების გასუფთავება' : 'Clear filters',
  };

  const updateFilter = <K extends keyof LedgerFiltersState>(
    key: K, 
    value: LedgerFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleReason = (reason: InclusionReason) => {
    const current = filters.inclusionReasons;
    const updated = current.includes(reason)
      ? current.filter(r => r !== reason)
      : [...current, reason];
    updateFilter('inclusionReasons', updated);
  };

  const hasActiveFilters = 
    filters.search ||
    filters.inclusionReasons.length < ALL_REASONS.length ||
    filters.sector !== 'all' ||
    filters.hasAllegations !== null ||
    filters.sanctionedOnly ||
    filters.donationMin > 0 ||
    filters.donationMax < maxDonation;

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      inclusionReasons: [...ALL_REASONS],
      sector: 'all',
      hasAllegations: null,
      sanctionedOnly: false,
      donationMin: 0,
      donationMax: maxDonation,
    });
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
        <Input
          type="text"
          placeholder={labels.search}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 bg-white border-navy/20 text-navy placeholder:text-navy/40 focus:border-navy/40"
        />
      </div>

      {/* Mode of Entanglement Checkboxes */}
      <div>
        <p className="font-sans text-xs uppercase tracking-wider text-navy/50 mb-3">
          {labels.entanglement}
        </p>
        <div className="flex flex-wrap gap-4">
          {ALL_REASONS.map((reason) => (
            <div key={reason} className="flex items-center gap-2">
              <Checkbox
                id={`reason-${reason}`}
                checked={filters.inclusionReasons.includes(reason)}
                onCheckedChange={() => toggleReason(reason)}
                className="border-navy/30 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
              />
              <Label 
                htmlFor={`reason-${reason}`}
                className="text-sm font-sans text-navy/70 cursor-pointer"
              >
                {INCLUSION_REASON_LABELS[reason]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Row of additional filters */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* Sector Dropdown */}
        <div className="w-48">
          <p className="font-sans text-xs uppercase tracking-wider text-navy/50 mb-2">
            {labels.sector}
          </p>
          <Select value={filters.sector} onValueChange={(v) => updateFilter('sector', v)}>
            <SelectTrigger className="bg-white border-navy/20 text-navy">
              <SelectValue placeholder={labels.allSectors} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{labels.allSectors}</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="allegations"
            checked={filters.hasAllegations === true}
            onCheckedChange={(checked) => 
              updateFilter('hasAllegations', checked ? true : null)
            }
            className="border-navy/30 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
          />
          <Label 
            htmlFor="allegations"
            className="text-sm font-sans text-navy/70 cursor-pointer"
          >
            {labels.allegations}
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="sanctioned"
            checked={filters.sanctionedOnly}
            onCheckedChange={(checked) => 
              updateFilter('sanctionedOnly', checked === true)
            }
            className="border-navy/30 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
          />
          <Label 
            htmlFor="sanctioned"
            className="text-sm font-sans text-navy/70 cursor-pointer"
          >
            {labels.sanctioned}
          </Label>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-navy/50 hover:text-navy hover:bg-navy/5"
          >
            <X className="h-4 w-4 mr-1" />
            {labels.clear}
          </Button>
        )}
      </div>

      {/* Donation Range Slider */}
      {maxDonation > 0 && (
        <div className="max-w-md">
          <p className="font-sans text-xs uppercase tracking-wider text-navy/50 mb-3">
            {labels.donationRange}: {formatGelShort(filters.donationMin)} – {formatGelShort(filters.donationMax)} GEL
          </p>
          <Slider
            min={0}
            max={maxDonation}
            step={Math.max(1000, maxDonation / 100)}
            value={[filters.donationMin, filters.donationMax]}
            onValueChange={([min, max]) => {
              onFiltersChange({ ...filters, donationMin: min, donationMax: max });
            }}
            className="[&_[role=slider]]:bg-navy [&_[role=slider]]:border-navy"
          />
        </div>
      )}
    </div>
  );
}
