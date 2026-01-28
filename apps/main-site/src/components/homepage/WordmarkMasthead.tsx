import React, { useState, useEffect } from "react";

import logoWordmarkPng from "@/assets/logo-wordmark-full.png";

type WordmarkMastheadProps = {
  alt?: string;
  className?: string;
};

/**
 * Masthead-style wordmark that renders PNG fallback first,
 * then swaps to crisp inline SVG once fonts are ready.
 * Only ONE is visible at a time (no shadow/duplication).
 */
export function WordmarkMasthead({
  alt = "Civic Council of Georgia",
  className,
}: WordmarkMastheadProps) {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    // Wait for fonts to load before showing SVG text
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  }, []);

  return (
    <div className={className}>
      <div className="flex justify-center px-[4%]">
        {/* 92% masthead width */}
        <div className="w-[92%]">
          {fontsReady ? (
            /* Crisp inline SVG once fonts are loaded */
            <svg
              role="img"
              aria-label={alt}
              className="w-full h-auto text-navy"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1280 224.18"
              preserveAspectRatio="xMidYMid meet"
            >
              <g>
                <text
                  x="0"
                  y="71.65"
                  transform="scale(.97 1)"
                  fill="currentColor"
                  fontFamily="TestDomaineDisplay-Bold, 'Test Domaine Display', 'Domaine Display'"
                  fontSize="84.29"
                  fontWeight={700}
                >
                  C
                </text>
                <text
                  x="0"
                  y="135.63"
                  transform="scale(.97 1)"
                  fill="currentColor"
                  fontFamily="TestDomaineDisplay-Bold, 'Test Domaine Display', 'Domaine Display'"
                  fontSize="84.29"
                  fontWeight={700}
                >
                  G
                </text>
                <text
                  x="13.83"
                  y="102.55"
                  transform="scale(1.05 1)"
                  fill="currentColor"
                  fontFamily="TestDomaineDisplay-Semibold, 'Test Domaine Display', 'Domaine Display'"
                  fontSize="82.91"
                  fontWeight={600}
                  letterSpacing="0.02em"
                >
                  CIVIC COUNCIL OF GEORGIA
                </text>
              </g>
            </svg>
          ) : (
            /* PNG fallback while fonts load */
            <img
              src={logoWordmarkPng}
              alt={alt}
              className="w-full h-auto"
              decoding="async"
            />
          )}
        </div>
      </div>
    </div>
  );
}
