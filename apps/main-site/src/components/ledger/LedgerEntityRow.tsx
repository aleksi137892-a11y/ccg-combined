import { ChevronDown } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { LedgerInclusionTag } from './LedgerInclusionTag';
import { LedgerEntityDetail } from './LedgerEntityDetail';
import type { LedgerEntity } from '@/types/complicityLedger';

interface LedgerEntityRowProps {
  entity: LedgerEntity;
}

function formatGel(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `₾${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `₾${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `₾${(amount / 1_000).toFixed(0)}K`;
  }
  if (amount > 0) {
    return `₾${amount.toLocaleString()}`;
  }
  return '—';
}

export function LedgerEntityRow({ entity }: LedgerEntityRowProps) {
  const { isGeorgian } = useLanguage();
  const hasDonations = entity.total_donations_gel > 0;
  const hasProcurement = entity.total_procurement_gel > 0;

  const displayName = isGeorgian && entity.name_ge ? entity.name_ge : entity.name;
  
  const labels = {
    donations: isGeorgian ? 'შემოწირულობები' : 'donations',
    contracts: isGeorgian ? 'სახელმწიფო კონტრაქტები' : 'state contracts',
    noData: isGeorgian ? 'ფინანსური მონაცემები არ არის დოკუმენტირებული' : 'No financial data documented',
  };

  return (
    <AccordionItem 
      value={entity.id} 
      className="border border-navy/10 bg-white hover:bg-navy/[0.01] transition-colors mb-3"
    >
      <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
        <div className="flex-1 text-left pr-4">
          {/* Name and sector */}
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className={cn(
              'font-narrative text-lg text-navy',
              isGeorgian && entity.name_ge && 'font-georgian'
            )}>
              {displayName}
            </h3>
            {entity.sector && (
              <span className="text-sm font-sans text-navy/40">
                {entity.sector}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entity.inclusion_reasons?.map((reason) => (
              <LedgerInclusionTag key={reason} reason={reason} />
            ))}
          </div>

          {/* Financial summary */}
          <div className={cn(
            'flex flex-wrap gap-x-6 gap-y-1 text-sm font-sans text-navy/60',
            isGeorgian && 'font-georgian'
          )}>
            {hasDonations && (
              <span>{formatGel(entity.total_donations_gel)} {labels.donations}</span>
            )}
            {hasProcurement && (
              <span>{formatGel(entity.total_procurement_gel)} {labels.contracts}</span>
            )}
            {!hasDonations && !hasProcurement && (
              <span className="text-navy/40">{labels.noData}</span>
            )}
          </div>
        </div>
        <ChevronDown className="h-5 w-5 text-navy/40 shrink-0 transition-transform duration-200" />
      </AccordionTrigger>
      
      <AccordionContent className="px-6 pb-6">
        <LedgerEntityDetail entity={entity} />
      </AccordionContent>
    </AccordionItem>
  );
}
