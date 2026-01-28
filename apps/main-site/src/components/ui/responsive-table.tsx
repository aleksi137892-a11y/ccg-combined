import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
  /** Use navy-tinted shadows for dark backgrounds */
  darkMode?: boolean;
}

type ScrollState = 'start' | 'middle' | 'end';

/**
 * Responsive table wrapper with horizontal scroll and shadow indicators
 * Includes throttled scroll handling for performance
 */
export function ResponsiveTable({ 
  children, 
  className,
  darkMode = false 
}: ResponsiveTableProps) {
  const { isGeorgian } = useLanguage();
  const [scrollState, setScrollState] = useState<ScrollState>('start');
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      // No scrolling needed
      setScrollState('start');
    } else if (scrollLeft <= 1) {
      setScrollState('start');
    } else if (scrollLeft >= maxScroll - 1) {
      setScrollState('end');
    } else {
      setScrollState('middle');
    }
  }, []);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      updateScrollState();
      rafRef.current = null;
    });
  }, [updateScrollState]);

  // Initial check and cleanup
  useEffect(() => {
    updateScrollState();
    
    // Cleanup RAF on unmount
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollState]);

  // Check on resize
  useEffect(() => {
    const handleResize = () => {
      updateScrollState();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollState]);

  // Shadow colors based on mode
  const shadowFrom = darkMode ? 'from-navy' : 'from-white';
  const shadowTo = 'to-transparent';

  return (
    <div 
      className={cn("relative", className)}
      role="region"
      aria-label={isGeorgian ? 'გადასაადგილებელი ცხრილი' : 'Scrollable table'}
    >
      {/* Left shadow - visible when scrolled right */}
      <div 
        className={cn(
          "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r z-10 pointer-events-none transition-opacity duration-200",
          shadowFrom,
          shadowTo,
          scrollState === 'start' ? 'opacity-0' : 'opacity-100'
        )} 
        aria-hidden="true"
      />
      
      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        onScroll={handleScroll}
      >
        {children}
      </div>
      
      {/* Right shadow - visible when more to scroll */}
      <div 
        className={cn(
          "absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l z-10 pointer-events-none transition-opacity duration-200",
          shadowFrom,
          shadowTo,
          scrollState === 'end' ? 'opacity-0' : 'opacity-100'
        )} 
        aria-hidden="true"
      />
    </div>
  );
}

export default ResponsiveTable;
