import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-navy/10 dark:bg-white/10",
        className
      )}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
}

function SkeletonCard({ className, showImage = false }: SkeletonCardProps) {
  return (
    <div className={cn("border border-navy/10 p-4 space-y-4", className)}>
      {showImage && <Skeleton className="h-40 w-full" />}
      <Skeleton className="h-5 w-2/3" />
      <SkeletonText lines={2} />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

function SkeletonTable({ rows = 5, columns = 4, className }: SkeletonTableProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-navy/10">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={`header-${i}`}
            className={cn(
              "h-4",
              i === 0 ? "w-32" : "w-24"
            )}
          />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 py-3 border-b border-navy/5">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "h-4",
                colIndex === 0 ? "w-32" : "w-24"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface SkeletonLedgerCardProps {
  className?: string;
}

function SkeletonLedgerCard({ className }: SkeletonLedgerCardProps) {
  return (
    <div className={cn("border border-navy/10 p-5 space-y-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-6 w-16 shrink-0" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-navy/5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

interface SkeletonLedgerProps {
  count?: number;
  className?: string;
}

function SkeletonLedger({ count = 6, className }: SkeletonLedgerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Stats bar */}
      <div className="flex gap-6 py-4 border-b border-navy/10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonLedgerCard key={i} />
        ))}
      </div>
    </div>
  );
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonTable, 
  SkeletonLedgerCard,
  SkeletonLedger 
};
