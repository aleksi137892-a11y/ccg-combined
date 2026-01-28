import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LedgerStatusBadgeProps {
  hasAllegations: boolean;
  allegationSummary?: string;
  isCompact?: boolean;
}

const clarifyingText = {
  en: 'Inclusion reflects financial or commercial relationships, not allegations of wrongdoing.',
  ge: 'ჩართვა ასახავს ფინანსურ ან კომერციულ ურთიერთობებს, არა ბრალდებებს.',
};

const statusLabels = {
  noMisconduct: {
    en: 'No documented misconduct',
    ge: 'დოკუმენტირებული გადაცდომა არ არის',
  },
  documentedConcerns: {
    en: 'Documented concerns',
    ge: 'დოკუმენტირებული შეშფოთება',
  },
};

export function LedgerStatusBadge({ 
  hasAllegations, 
  allegationSummary,
  isCompact = false 
}: LedgerStatusBadgeProps) {
  const { isGeorgian } = useLanguage();
  const clarifying = isGeorgian ? clarifyingText.ge : clarifyingText.en;
  const labels = isGeorgian ? {
    noMisconduct: statusLabels.noMisconduct.ge,
    documented: statusLabels.documentedConcerns.ge,
  } : {
    noMisconduct: statusLabels.noMisconduct.en,
    documented: statusLabels.documentedConcerns.en,
  };

  if (!hasAllegations) {
    return (
      <div className="text-navy/50">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span className={cn(
            'text-sm font-sans',
            isGeorgian && 'font-georgian'
          )}>
            {labels.noMisconduct}
          </span>
        </div>
        <p className={cn(
          'text-xs text-navy/40 mt-1 pl-6',
          isGeorgian && 'font-georgian'
        )}>
          {clarifying}
        </p>
      </div>
    );
  }

  if (isCompact) {
    return (
      <div className="flex items-center gap-2 text-red-700">
        <AlertTriangle className="h-4 w-4" />
        <span className={cn(
          'text-sm font-sans',
          isGeorgian && 'font-georgian'
        )}>
          {labels.documented}
        </span>
      </div>
    );
  }

  return (
    <div className="border-l-2 border-red-300 pl-4 py-1">
      <div className="flex items-center gap-2 text-red-800 mb-1">
        <AlertTriangle className="h-4 w-4" />
        <span className={cn(
          'text-sm font-sans font-medium',
          isGeorgian && 'font-georgian'
        )}>
          {labels.documented}
        </span>
      </div>
      {allegationSummary && (
        <p className="text-sm font-serif text-navy/70 leading-relaxed">
          {allegationSummary}
        </p>
      )}
    </div>
  );
}
