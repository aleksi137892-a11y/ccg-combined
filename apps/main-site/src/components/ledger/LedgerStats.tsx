import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { LedgerStats as LedgerStatsType } from '@/types/complicityLedger';

interface LedgerStatsProps {
  stats: LedgerStatsType;
  filteredCount?: number;
}

function formatGel(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K`;
  }
  return amount.toFixed(0);
}

export function LedgerStats({ stats, filteredCount }: LedgerStatsProps) {
  const { isGeorgian } = useLanguage();
  const showFiltered = filteredCount !== undefined && filteredCount !== stats.totalEntities;

  const labels = {
    entities: isGeorgian ? 'სუბიექტები აღწერილი' : 'entities mapped',
    of: isGeorgian ? '-დან' : 'of',
    donations: isGeorgian ? 'GEL შემოწირულობებში' : 'GEL in donations',
    allegations: isGeorgian ? 'ბრალდებები დოკუმენტირებული' : 'allegations documented',
    procurement: isGeorgian ? 'GEL შესყიდვებში' : 'GEL in procurement',
  };

  return (
    <div className="border-y border-navy/10 py-8 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <p className="font-narrative text-3xl md:text-4xl text-navy">
            {showFiltered ? filteredCount : stats.totalEntities}
          </p>
          <p className={cn(
            'font-sans text-xs uppercase tracking-wider text-navy/50 mt-1',
            isGeorgian && 'font-georgian'
          )}>
            {showFiltered ? `${stats.totalEntities}${labels.of} ` : ''}{labels.entities}
          </p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="font-narrative text-3xl md:text-4xl text-navy">
            {formatGel(stats.totalDonations)}
          </p>
          <p className={cn(
            'font-sans text-xs uppercase tracking-wider text-navy/50 mt-1',
            isGeorgian && 'font-georgian'
          )}>
            {labels.donations}
          </p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="font-narrative text-3xl md:text-4xl text-navy">
            {stats.withAllegations}
          </p>
          <p className={cn(
            'font-sans text-xs uppercase tracking-wider text-navy/50 mt-1',
            isGeorgian && 'font-georgian'
          )}>
            {labels.allegations}
          </p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="font-narrative text-3xl md:text-4xl text-navy">
            {formatGel(stats.totalProcurement)}
          </p>
          <p className={cn(
            'font-sans text-xs uppercase tracking-wider text-navy/50 mt-1',
            isGeorgian && 'font-georgian'
          )}>
            {labels.procurement}
          </p>
        </div>
      </div>
    </div>
  );
}
