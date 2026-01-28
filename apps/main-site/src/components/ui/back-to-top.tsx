import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

interface BackToTopProps {
  /** Scroll threshold before button appears (default: 400px) */
  threshold?: number;
  /** Additional class names */
  className?: string;
}

/**
 * Back-to-top button that appears after scrolling past threshold.
 * Provides quick return to top of page.
 * Respects prefers-reduced-motion for animations.
 */
export function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Handle scroll visibility
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        // Base styles
        "fixed bottom-6 right-6 z-30",
        "flex items-center justify-center",
        "w-12 h-12 min-h-[44px] min-w-[44px]",
        // Visual styling - minimal, institutional
        "bg-navy text-white",
        "border border-white/20",
        "shadow-lg",
        // Hover state
        "hover:bg-navy-light hover:shadow-xl",
        "active:scale-95",
        // Transitions
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        // Visibility
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        // Focus state
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
