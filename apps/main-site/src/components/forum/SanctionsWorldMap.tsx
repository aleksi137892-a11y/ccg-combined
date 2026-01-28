import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { transitions } from "@/lib/animationTokens";
import worldTopology from "@/data/maps/world-countries.topojson";
import { buildWorldMap } from "@/lib/maps/worldMap";
import { sanctionsMapData, type MapJurisdiction } from "@/data/sanctionsMapData";

const VIEWBOX_WIDTH = 960;
const VIEWBOX_HEIGHT = 520;

interface SanctionsWorldMapProps {
  className?: string;
}

export const SanctionsWorldMap = ({ className }: SanctionsWorldMapProps) => {
  const { language, isGeorgian } = useLanguage();
  const [selected, setSelected] = useState<MapJurisdiction | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management: move focus to panel when it opens
  useEffect(() => {
    if (selected && closeButtonRef.current) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  const { features, path } = useMemo(
    () =>
      buildWorldMap(
        worldTopology as unknown as Parameters<typeof buildWorldMap>[0],
        VIEWBOX_WIDTH,
        VIEWBOX_HEIGHT
      ),
    []
  );

  const jurisdictionByCountry = useMemo(() => {
    return new Map(
      sanctionsMapData.jurisdictions.map((jurisdiction) => [
        jurisdiction.countryName,
        jurisdiction
      ])
    );
  }, []);

  const caption = useMemo(
    () =>
      sanctionsMapData.jurisdictions
        .map((jurisdiction) => jurisdiction.name[language])
        .join(" · "),
    [language]
  );

  return (
    <div className={cn("relative", className)}>
      <div className="relative bg-navy/50 border border-white/10 overflow-hidden">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="w-full h-auto"
          style={{ minHeight: 320 }}
          role="img"
          aria-label={isGeorgian ? 'სანქციების მსოფლიო რუკა - აირჩიეთ ქვეყანა დეტალებისთვის' : 'Sanctions world map - select a country for details'}
        >
          <defs>
            <pattern
              id="sanctions-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.6"
              />
            </pattern>
            <filter id="sanctions-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="rgba(255,255,255,0.6)"
              />
            </filter>
          </defs>

          <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="url(#sanctions-grid)" />

          <g>
            {features.map((feature, index) => {
              const name = feature.properties?.name ?? "";
              const jurisdiction = jurisdictionByCountry.get(name);
              const isHighlighted = Boolean(jurisdiction);
              const isSelected = Boolean(jurisdiction && selected?.id === jurisdiction.id);
              const isHovered = hovered === name;

              return (
                <path
                  key={`${name}-${index}`}
                  d={path(feature) || undefined}
                  onClick={() =>
                    jurisdiction &&
                    setSelected((current) =>
                      current?.id === jurisdiction.id ? null : jurisdiction
                    )
                  }
                  onMouseEnter={() => isHighlighted && setHovered(name)}
                  onMouseLeave={() => setHovered(null)}
                  onKeyDown={(e) => {
                    if (jurisdiction && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setSelected((current) =>
                        current?.id === jurisdiction.id ? null : jurisdiction
                      );
                    }
                  }}
                  tabIndex={isHighlighted ? 0 : -1}
                  role={isHighlighted ? "button" : undefined}
                  aria-label={jurisdiction ? `${jurisdiction.name[language]}: ${jurisdiction.mechanism[language]}` : name}
                  aria-pressed={isSelected}
                  className={cn(
                    isHighlighted && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  )}
                  fill={
                    isSelected ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)"
                  }
                  stroke={
                    isSelected
                      ? "rgba(255,255,255,0.75)"
                      : isHovered
                        ? "rgba(255,255,255,0.55)"
                        : isHighlighted
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(255,255,255,0.12)"
                  }
                  strokeWidth={isSelected ? 1.2 : isHovered ? 1.05 : 0.6}
                  filter={isSelected ? "url(#sanctions-glow)" : undefined}
                />
              );
            })}
          </g>
        </svg>

        <AnimatePresence>
          {selected && (
            <motion.div
              ref={panelRef}
              initial={{ 
                opacity: prefersReducedMotion ? 1 : 0, 
                y: isMobile ? '100%' : 16 
              }}
              animate={{ 
                opacity: 1, 
                y: 0 
              }}
              exit={{ 
                opacity: prefersReducedMotion ? 1 : 0, 
                y: isMobile ? '100%' : 16 
              }}
              transition={prefersReducedMotion ? { duration: 0.01 } : transitions.spatial()}
              className={cn(
                "bg-navy/95 backdrop-blur border-t border-white/20 px-5 py-4",
                isMobile 
                  ? "fixed bottom-0 left-0 right-0 max-h-[65vh] overflow-y-auto z-50 pb-safe rounded-t-xl" 
                  : "absolute bottom-0 left-0 right-0"
              )}
              role="dialog"
              aria-modal={isMobile}
              aria-label={isGeorgian ? 'იურისდიქციის დეტალები' : 'Jurisdiction details'}
            >
              {/* Mobile drag handle */}
              {isMobile && (
                <div 
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/30 rounded-full"
                  aria-label={isGeorgian ? 'გადაათრიეთ დასახურად' : 'Drag to dismiss'}
                />
              )}
              
              <div className={cn("flex items-start justify-between gap-4", isMobile && "mt-3")}>
                <div>
                  <h4
                    className={cn(
                      "font-sans text-xs uppercase tracking-[0.18em] text-white/70 mb-2",
                      isGeorgian && "font-georgian"
                    )}
                  >
                    {selected.name[language]}
                  </h4>
                  <p
                    className={cn(
                      "font-serif text-sm text-white/70",
                      isGeorgian && "font-georgian"
                    )}
                  >
                    {selected.mechanism[language]}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-white/50 hover:text-white/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
                  aria-label={isGeorgian ? 'დახურვა' : 'Close details'}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p
        className={cn(
          "mt-4 text-[10px] uppercase tracking-[0.2em] text-white/50 whitespace-nowrap overflow-hidden text-ellipsis",
          isGeorgian && "font-georgian"
        )}
        title={caption}
      >
        {caption}
      </p>
    </div>
  );
};

export default SanctionsWorldMap;
