import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  /** Additional class names */
  className?: string;
  /** Color variant */
  variant?: "navy" | "primary" | "subtle";
  /** Height of the progress bar */
  height?: "thin" | "default";
}

/**
 * Scroll progress indicator that shows reading progress.
 * Displays as a thin bar at the top of the viewport, below the header.
 * Respects prefers-reduced-motion.
 */
export function ScrollProgress({ 
  className,
  variant = "navy",
  height = "thin",
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Calculate scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(scrollPercent);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const variantStyles = {
    navy: "bg-navy",
    primary: "bg-primary",
    subtle: "bg-navy/30",
  };

  const heightStyles = {
    thin: "h-0.5",
    default: "h-1",
  };

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 z-20",
        "pointer-events-none",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn(
          heightStyles[height],
          variantStyles[variant],
          !prefersReducedMotion && "transition-[width] duration-100 ease-out"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;
