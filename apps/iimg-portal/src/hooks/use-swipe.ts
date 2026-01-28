import { useRef, useCallback } from "react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeOptions {
  threshold?: number;
  preventScrollOnSwipe?: boolean;
}

export const useSwipe = (
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) => {
  const { threshold = 50, preventScrollOnSwipe = false } = options;
  
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };

    if (preventScrollOnSwipe && touchStart.current) {
      const diffX = Math.abs(touchStart.current.x - e.targetTouches[0].clientX);
      const diffY = Math.abs(touchStart.current.y - e.targetTouches[0].clientY);
      
      // If horizontal swipe is dominant, prevent vertical scroll
      if (diffX > diffY && diffX > 10) {
        e.preventDefault();
      }
    }
  }, [preventScrollOnSwipe]);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const diffX = touchStart.current.x - touchEnd.current.x;
    const diffY = touchStart.current.y - touchEnd.current.y;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    // Only trigger if horizontal swipe is dominant
    if (absDiffX > absDiffY) {
      if (absDiffX > threshold) {
        if (diffX > 0) {
          handlers.onSwipeLeft?.();
        } else {
          handlers.onSwipeRight?.();
        }
      }
    } else {
      if (absDiffY > threshold) {
        if (diffY > 0) {
          handlers.onSwipeUp?.();
        } else {
          handlers.onSwipeDown?.();
        }
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  }, [handlers, threshold]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
