import { Download, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { LedgerEntity, LedgerFiltersState } from '@/types/complicityLedger';

interface LedgerExportProps {
  entities: LedgerEntity[];
  filters: LedgerFiltersState;
}

export function LedgerExport({ entities, filters }: LedgerExportProps) {
  const [copied, setCopied] = useState(false);

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Name (Georgian)',
      'Sector',
      'Inclusion Reasons',
      'Profile Summary',
      'Total Donations (GEL)',
      'Donation Years',
      'Beneficial Owner',
      'Beneficial Owner (English)',
      'Has Allegations',
      'Allegation Summary',
      'Total Procurement (GEL)',
      'State Contracts Count',
      'Is Sanctioned',
      'Website',
      'Registry Verified',
    ];

    const rows = entities.map((e) => [
      e.name || '',
      e.name_ge || '',
      e.sector || '',
      (e.inclusion_reasons || []).join('; '),
      e.profile_summary || '',
      (e.total_donations_gel ?? 0).toString(),
      e.donation_years || '',
      e.beneficial_owner || '',
      e.beneficial_owner_english || '',
      e.has_allegations ? 'Yes' : 'No',
      e.allegation_summary || '',
      (e.total_procurement_gel ?? 0).toString(),
      (e.state_contracts_count ?? 0).toString(),
      e.is_sanctioned ? 'Yes' : 'No',
      e.website || '',
      e.registry_verified ? 'Yes' : 'No',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `complicity-ledger-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${entities.length} entities to CSV`);
  };

  const copyShareableLink = () => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('q', filters.search);
    if (filters.inclusionReasons.length < 5) {
      params.set('reasons', filters.inclusionReasons.join(','));
    }
    if (filters.sector !== 'all') params.set('sector', filters.sector);
    if (filters.hasAllegations === true) params.set('allegations', 'true');
    if (filters.sanctionedOnly) params.set('sanctioned', 'true');
    if (filters.donationMin > 0) params.set('donMin', filters.donationMin.toString());
    if (filters.donationMax < Infinity) params.set('donMax', filters.donationMax.toString());

    const url = `${window.location.origin}${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard');
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3 py-6 border-t border-navy/10">
      <Button
        variant="outline"
        onClick={exportToCSV}
        className="border-navy/20 text-navy hover:bg-navy/5"
      >
        <Download className="h-4 w-4 mr-2" />
        Download CSV
      </Button>
      
      <Button
        variant="outline"
        onClick={copyShareableLink}
        className="border-navy/20 text-navy hover:bg-navy/5"
      >
        {copied ? (
          <Check className="h-4 w-4 mr-2" />
        ) : (
          <Link2 className="h-4 w-4 mr-2" />
        )}
        {copied ? 'Copied!' : 'Share this view'}
      </Button>
    </div>
  );
}
