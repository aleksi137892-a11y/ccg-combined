import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface JumpToItem {
  id: string;
  label: string;
  labelGe?: string;
}

interface JumpToNavProps {
  items: JumpToItem[];
  sticky?: boolean;
}

type ScrollPosition = 'start' | 'middle' | 'end';

const JumpToNav: React.FC<JumpToNavProps> = ({ items, sticky = true }) => {
  const { isGeorgian } = useLanguage();
  const [activeId, setActiveId] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>('start');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Track horizontal scroll position for gradient indicators
  const updateScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setScrollPosition('start');
    } else if (scrollLeft <= 1) {
      setScrollPosition('start');
    } else if (scrollLeft >= maxScroll - 1) {
      setScrollPosition('end');
    } else {
      setScrollPosition('middle');
    }
  }, []);

  // Scroll active item into view
  const scrollActiveIntoView = useCallback(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Check if button is outside visible area
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, []);

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      const nav = document.getElementById('jump-to-nav');
      if (nav) {
        const rect = nav.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }

      // Update active section based on scroll position
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, sticky]);

  // Scroll active item into view when it changes
  useEffect(() => {
    scrollActiveIntoView();
  }, [activeId, scrollActiveIntoView]);

  // Update scroll position on mount and resize
  useEffect(() => {
    updateScrollPosition();
    window.addEventListener('resize', updateScrollPosition);
    return () => window.removeEventListener('resize', updateScrollPosition);
  }, [updateScrollPosition]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div 
      id="jump-to-nav"
      className={cn(
        "border-b border-navy/10 bg-white transition-all",
        isSticky && sticky && "sticky top-0 z-40 shadow-md border-l-4 border-l-navy"
      )}
    >
      <div className="container mx-auto px-4">
        <nav 
          className="flex items-center gap-3 py-4"
          role="navigation"
          aria-label={isGeorgian ? 'გვერდის ნავიგაცია' : 'Page navigation'}
          aria-live="polite"
        >
          <span className="font-ui text-xs text-navy/60 uppercase tracking-[0.15em] shrink-0 mr-1 font-medium">
            {isGeorgian ? 'გადასვლა' : 'Jump to'}
          </span>
          <div className="h-4 w-px bg-navy/20 shrink-0" aria-hidden="true" />
          
          {/* Scrollable container with gradient indicators */}
          <div className="relative flex-1 min-w-0">
            {/* Left gradient - visible when scrolled right */}
            <div 
              className={cn(
                "absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity md:hidden",
                scrollPosition === 'start' ? 'opacity-0' : 'opacity-100'
              )}
              aria-hidden="true"
            />
            
            <div 
              ref={scrollContainerRef}
              className="flex items-center gap-1 overflow-x-auto scrollbar-hide"
              onScroll={updateScrollPosition}
            >
              {items.map((item, idx) => {
                const isActive = activeId === item.id;
                return (
                  <React.Fragment key={item.id}>
                    {idx > 0 && (
                      <span className="text-navy/15 mx-1 shrink-0" aria-hidden="true">·</span>
                    )}
                    <button
                      ref={isActive ? activeButtonRef : null}
                      onClick={() => scrollToSection(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        "font-ui text-sm whitespace-nowrap px-3 py-1.5 transition-all shrink-0 min-h-[44px] flex items-center",
                        isActive
                          ? 'text-navy bg-navy/8 font-medium border-b-2 border-navy'
                          : 'text-navy/50 hover:text-navy hover:bg-navy/5',
                        isGeorgian && 'font-georgian'
                      )}
                    >
                      {isGeorgian && item.labelGe ? item.labelGe : item.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            
            {/* Right gradient - visible when more to scroll */}
            <div 
              className={cn(
                "absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity md:hidden",
                scrollPosition === 'end' ? 'opacity-0' : 'opacity-100'
              )}
              aria-hidden="true"
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default JumpToNav;
