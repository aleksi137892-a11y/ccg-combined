import { useState, useRef, useCallback } from "react";

interface UsePullRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  maxPull?: number;
}

export const usePullRefresh = ({
  onRefresh,
  threshold = 80,
  maxPull = 120,
}: UsePullRefreshOptions) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop <= 0 && !isRefreshing) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, [isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling.current || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    if (diff > 0) {
      // Apply resistance
      const resistance = 0.4;
      const distance = Math.min(diff * resistance, maxPull);
      setPullDistance(distance);
    }
  }, [isRefreshing, maxPull]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling.current) return;
    isPulling.current = false;

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  return {
    pullDistance,
    isRefreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
