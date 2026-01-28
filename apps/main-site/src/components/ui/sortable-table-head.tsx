import * as React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { TableHead } from './table';

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

interface SortableTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** English label */
  label: string;
  /** Georgian label - required for bilingual parity */
  labelGe: string;
  /** Key used for sorting */
  sortKey: string;
  /** Current sort state */
  currentSort: SortState | null;
  /** Callback when sort is triggered */
  onSort: (key: string) => void;
}

/**
 * Sortable Table Header
 * 
 * Accessible, bilingual column header with sort functionality.
 * - Keyboard accessible (Enter/Space to sort)
 * - Screen reader announcements in both languages
 * - Visual feedback for sort state
 */
export const SortableTableHead = React.forwardRef<
  HTMLTableCellElement,
  SortableTableHeadProps
>(({ 
  label, 
  labelGe, 
  sortKey, 
  currentSort, 
  onSort, 
  className,
  ...props 
}, ref) => {
  const { isGeorgian } = useLanguage();
  const displayLabel = isGeorgian ? labelGe : label;
  
  const isActive = currentSort?.key === sortKey;
  const isAsc = isActive && currentSort.direction === 'asc';
  const isDesc = isActive && currentSort.direction === 'desc';

  // Bilingual aria-sort values
  const ariaSortValue = isActive 
    ? (isAsc ? 'ascending' : 'descending') 
    : 'none';

  // Bilingual screen reader announcement
  const getAriaLabel = (): string => {
    if (isGeorgian) {
      if (isAsc) return `${labelGe}: დალაგებულია ზრდადობით. დააწკაპუნეთ კლებადობით დასალაგებლად.`;
      if (isDesc) return `${labelGe}: დალაგებულია კლებადობით. დააწკაპუნეთ დალაგების მოსახსნელად.`;
      return `${labelGe}: დააწკაპუნეთ დასალაგებლად.`;
    } else {
      if (isAsc) return `${label}: sorted ascending. Click to sort descending.`;
      if (isDesc) return `${label}: sorted descending. Click to remove sort.`;
      return `${label}: click to sort.`;
    }
  };

  const handleClick = () => {
    onSort(sortKey);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSort(sortKey);
    }
  };

  return (
    <TableHead
      ref={ref}
      className={cn(
        "cursor-pointer select-none group",
        "transition-colors hover:bg-navy/5",
        isActive && "bg-navy/5",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="columnheader"
      aria-sort={ariaSortValue}
      aria-label={getAriaLabel()}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className={cn(isGeorgian && "font-georgian")}>
          {displayLabel}
        </span>
        <div 
          className={cn(
            "transition-opacity",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
          )}
          aria-hidden="true"
        >
          {isAsc && <ChevronUp size={14} />}
          {isDesc && <ChevronDown size={14} />}
          {!isActive && <ChevronsUpDown size={14} />}
        </div>
      </div>
    </TableHead>
  );
});

SortableTableHead.displayName = 'SortableTableHead';

export default SortableTableHead;
