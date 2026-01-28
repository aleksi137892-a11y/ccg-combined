import { cn } from '@/lib/utils';
import type { InclusionReason } from '@/types/complicityLedger';

interface LedgerInclusionTagProps {
  reason: InclusionReason;
  className?: string;
}

export function LedgerInclusionTag({ reason, className }: LedgerInclusionTagProps) {
  const isSanctioned = reason === 'SANCTIONED_ENTITY';
  const isFinancial = reason === 'FINANCIAL_INSTITUTION';
  const isPoliticalDonor = reason === 'POLITICAL_DONOR';
  const isIvanishviliSphere = reason === 'IVANISHVILI_SPHERE';
  
  const label = {
    DONOR: 'Donor',
    POLITICAL_DONOR: 'Political Donor',
    STATE_CONTRACTOR: 'State Contractor',
    IVANISHVILI_SPHERE: 'Ivanishvili Sphere',
    SERVICE_PROVIDER: 'Service Provider',
    SANCTIONED_ENTITY: 'Sanctioned',
    FINANCIAL_INSTITUTION: 'Financial Institution',
  }[reason] || reason;

  const colorClass = isSanctioned
    ? 'bg-red-50 text-red-800 border border-red-200'
    : isFinancial
      ? 'bg-blue-50 text-blue-800 border border-blue-200'
      : isPoliticalDonor
        ? 'bg-amber-50 text-amber-800 border border-amber-200'
        : isIvanishviliSphere
          ? 'bg-purple-50 text-purple-800 border border-purple-200'
          : 'bg-navy/5 text-navy/70 border border-navy/10';

  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-[10px] font-sans uppercase tracking-wider',
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
