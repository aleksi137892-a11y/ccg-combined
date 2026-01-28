import { useState, useEffect, useCallback } from 'react';

type Phase = 'quote' | 'video' | 'split';
type SplitTrigger = 'scroll' | 'video-end' | null;

interface UseAutoDissolveOptions {
  delay?: number; // milliseconds before auto-dissolve to video
  onPhaseChange?: (phase: Phase) => void;
}

interface UseAutoDissolveReturn {
  phase: Phase;
  showNav: boolean;
  navInteractive: boolean;
  splitTrigger: SplitTrigger;
  triggerVideoPhase: () => void;
  triggerSplitPhase: (trigger?: 'scroll' | 'video-end') => void;
  hideNav: () => void;
}

/**
 * Hook for managing the three-phase cinematic experience:
 * 1. Quote phase: Full-screen navy with white quote text, no nav (header completely hidden)
 * 2. Video phase: Full-screen video, nav animates in
 * 3. Split phase: Permanent split layout (1/3 quote, 2/3 video), nav visible
 * 
 * Transitions:
 * - Quote → Video: auto after delay (timer starts on user interaction), or on scroll
 * - Video → Split: on scroll, or when video ends
 */
export function useAutoDissolve({
  delay = 3000,
  onPhaseChange
}: UseAutoDissolveOptions = {}): UseAutoDissolveReturn {
  const [phase, setPhase] = useState<Phase>('quote');
  const [showNav, setShowNav] = useState(false);
  const [navInteractive, setNavInteractive] = useState(false);
  const [splitTrigger, setSplitTrigger] = useState<SplitTrigger>(null);
  const [userEntered, setUserEntered] = useState(false); // Timer only starts after user enters

  const triggerVideoPhase = useCallback(() => {
    if (phase === 'quote') {
      // Reset scroll position to prevent carryover
      window.scrollTo(0, 0);
      setPhase('video');
      // Nav is NOT shown automatically - only revealed on scroll during video phase
      onPhaseChange?.('video');
    }
  }, [phase, onPhaseChange]);

  const triggerSplitPhase = useCallback((trigger: 'scroll' | 'video-end' = 'scroll') => {
    if (phase === 'video') {
      // Reset scroll position for split phase
      window.scrollTo(0, 0);
      
      // Lock scrolling during transition
      document.body.style.overflow = 'hidden';
      
      setSplitTrigger(trigger);
      setPhase('split');
      onPhaseChange?.('split');
      
      // Unlock scrolling after transition settles
      const unlockDelay = trigger === 'video-end' ? 2500 : 1500;
      setTimeout(() => {
        document.body.style.overflow = '';
      }, unlockDelay);
    }
  }, [phase, onPhaseChange]);

  const hideNav = useCallback(() => {
    setShowNav(false);
  }, []);

  // Auto-dissolve timer: quote → video after delay
  // Timer only starts once user has "entered" (interacted with the page)
  useEffect(() => {
    if (phase !== 'quote' || !userEntered) return;

    const timer = setTimeout(() => {
      triggerVideoPhase();
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, delay, userEntered, triggerVideoPhase]);

  // Wheel listener ONLY: triggers video phase on scroll wheel during quote phase
  // Touch/mouse movement only reveals nav (handled separately), does NOT trigger phase change
  useEffect(() => {
    if (phase !== 'quote') return;

    let scrollEnabled = false;
    let accumulatedDelta = 0;
    const SCROLL_THRESHOLD = 100;
    
    // Delay enabling scroll detection to prevent immediate trigger
    const enableTimer = setTimeout(() => {
      scrollEnabled = true;
    }, 100);

    const handleWheel = (e: WheelEvent) => {
      if (!scrollEnabled) return;
      
      if (e.deltaY > 0) {
        accumulatedDelta += e.deltaY;
        if (accumulatedDelta > SCROLL_THRESHOLD) {
          triggerVideoPhase();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      clearTimeout(enableTimer);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [phase, triggerVideoPhase]);

  // Mouse/touch listener: marks user as "entered" and reveals nav
  // Nav interactions are disabled for 1 second after reveal to prevent accidental menu opens
  // The 3-second timer only starts once userEntered is true
  useEffect(() => {
    if (phase !== 'quote') return;

    let interactiveTimer: ReturnType<typeof setTimeout> | null = null;

    const handleInteraction = () => {
      // Mark user as having entered the site (starts the 3-second timer)
      if (!userEntered) {
        setUserEntered(true);
      }
      
      if (!showNav) {
        setShowNav(true);
        // Disable nav interactions for 1 second after reveal
        interactiveTimer = setTimeout(() => {
          setNavInteractive(true);
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    
    return () => {
      if (interactiveTimer) clearTimeout(interactiveTimer);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [phase, showNav, userEntered]);

  // Wheel + touch swipe listener: reveals nav and triggers split phase during video phase
  // The page is fixed during video phase, so we detect wheel/swipe events instead of scroll position
  useEffect(() => {
    if (phase !== 'video') return;

    let canTriggerSplit = false;
    let accumulatedDelta = 0;
    let touchStartY = 0;
    const SCROLL_THRESHOLD = 150;
    const SWIPE_THRESHOLD = 80;
    const NAV_REVEAL_THRESHOLD = 20; // Much smaller threshold just to reveal nav
    
    // Wait 1.5 seconds before allowing scroll to trigger split phase
    const enableTimer = setTimeout(() => {
      canTriggerSplit = true;
    }, 1500);

    const handleWheel = (e: WheelEvent) => {
      // Only trigger on downward scroll (positive deltaY)
      if (e.deltaY > 0) {
        // Reveal nav on any scroll attempt
        if (e.deltaY > NAV_REVEAL_THRESHOLD && !showNav) {
          setShowNav(true);
        }
        
        if (!canTriggerSplit) return;
        
        accumulatedDelta += e.deltaY;
        if (accumulatedDelta > SCROLL_THRESHOLD) {
          triggerSplitPhase('scroll');
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      
      // Reveal nav on any swipe up attempt
      if (deltaY > NAV_REVEAL_THRESHOLD && !showNav) {
        setShowNav(true);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!canTriggerSplit) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY; // Positive = swipe up (scroll down intent)
      
      if (deltaY > SWIPE_THRESHOLD) {
        triggerSplitPhase('scroll');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      clearTimeout(enableTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [phase, showNav, triggerSplitPhase]);

  return {
    phase,
    showNav,
    navInteractive: navInteractive || phase !== 'quote',
    splitTrigger,
    triggerVideoPhase,
    triggerSplitPhase,
    hideNav
  };
}
