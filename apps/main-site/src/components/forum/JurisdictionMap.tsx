import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Jurisdiction {
  id: string;
  name: string;
  nameGe: string;
  code: string;
  types: ('sanctions' | 'litigation' | 'criminal' | 'treaty')[];
  x: number; // percentage position
  y: number;
  details: string;
  detailsGe: string;
}

const JURISDICTIONS: Jurisdiction[] = [
  { 
    id: 'us', name: 'United States', nameGe: 'აშშ', code: 'US',
    types: ['sanctions', 'litigation'],
    x: 22, y: 42,
    details: 'Global Magnitsky Act, FARA, Civil RICO',
    detailsGe: 'გლობალური მაგნიტსკის აქტი, FARA, სამოქალაქო RICO'
  },
  { 
    id: 'uk', name: 'United Kingdom', nameGe: 'გაერთიანებული სამეფო', code: 'UK',
    types: ['sanctions', 'criminal', 'litigation'],
    x: 48, y: 32,
    details: 'UK Magnitsky, Unexplained Wealth Orders, Universal Jurisdiction',
    detailsGe: 'UK მაგნიტსკი, აუხსნელი სიმდიდრის ორდერები'
  },
  { 
    id: 'eu', name: 'European Union', nameGe: 'ევროკავშირი', code: 'EU',
    types: ['sanctions', 'treaty'],
    x: 52, y: 38,
    details: 'EU Global Human Rights Sanctions, ECHR',
    detailsGe: 'EU გლობალური ადამიანის უფლებების სანქციები, ECHR'
  },
  { 
    id: 'de', name: 'Germany', nameGe: 'გერმანია', code: 'DE',
    types: ['criminal', 'litigation'],
    x: 51, y: 35,
    details: 'Universal Jurisdiction, Völkerstrafgesetzbuch',
    detailsGe: 'უნივერსალური იურისდიქცია'
  },
  { 
    id: 'fr', name: 'France', nameGe: 'საფრანგეთი', code: 'FR',
    types: ['criminal', 'litigation'],
    x: 48, y: 38,
    details: 'Universal Jurisdiction, Crimes Against Humanity',
    detailsGe: 'უნივერსალური იურისდიქცია'
  },
  { 
    id: 'nl', name: 'Netherlands', nameGe: 'ნიდერლანდები', code: 'NL',
    types: ['criminal', 'treaty'],
    x: 50, y: 34,
    details: 'ICC Host State, Universal Jurisdiction',
    detailsGe: 'ICC მასპინძელი სახელმწიფო'
  },
  { 
    id: 'se', name: 'Sweden', nameGe: 'შვედეთი', code: 'SE',
    types: ['criminal'],
    x: 53, y: 28,
    details: 'Universal Jurisdiction, Active Prosecutions',
    detailsGe: 'უნივერსალური იურისდიქცია, აქტიური დევნა'
  },
  { 
    id: 'ca', name: 'Canada', nameGe: 'კანადა', code: 'CA',
    types: ['sanctions'],
    x: 20, y: 32,
    details: 'Justice for Victims of Corrupt Foreign Officials Act',
    detailsGe: 'კორუმპირებული უცხოელი თანამდებობის პირების მსხვერპლთა სამართლიანობის აქტი'
  },
  { 
    id: 'au', name: 'Australia', nameGe: 'ავსტრალია', code: 'AU',
    types: ['sanctions'],
    x: 82, y: 72,
    details: 'Autonomous Sanctions Act',
    detailsGe: 'ავტონომიური სანქციების აქტი'
  },
  { 
    id: 'icc', name: 'ICC', nameGe: 'ICC', code: 'ICC',
    types: ['treaty'],
    x: 50, y: 36,
    details: 'International Criminal Court - Rome Statute',
    detailsGe: 'საერთაშორისო სისხლის სამართლის სასამართლო'
  },
];

const TYPE_COLORS: Record<string, { fill: string; label: string; labelGe: string }> = {
  sanctions: { fill: '#ffffff', label: 'Sanctions', labelGe: 'სანქციები' },
  litigation: { fill: '#a0a0a0', label: 'Litigation', labelGe: 'სამართალწარმოება' },
  criminal: { fill: '#d4d4d4', label: 'Criminal Referral', labelGe: 'სისხლის სამართალი' },
  treaty: { fill: '#e8e8e8', label: 'Treaty Bodies', labelGe: 'ხელშეკრულების ორგანოები' },
};

interface JurisdictionMapProps {
  className?: string;
}

export const JurisdictionMap: React.FC<JurisdictionMapProps> = ({ className }) => {
  const { isGeorgian } = useLanguage();
  const [activeJurisdiction, setActiveJurisdiction] = useState<Jurisdiction | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  const filteredJurisdictions = activeType 
    ? JURISDICTIONS.filter(j => j.types.includes(activeType as 'sanctions' | 'litigation' | 'criminal' | 'treaty'))
    : JURISDICTIONS;

  return (
    <div className={cn('relative', className)}>
      {/* Section Header */}
      <div className="mb-8">
        <h3 className={cn(
          'font-sans text-xs uppercase tracking-[0.25em] text-white/50 mb-4',
          isGeorgian && 'font-georgian'
        )}>
          {isGeorgian ? 'აქტიური იურისდიქციები' : 'Active Jurisdictions'}
        </h3>
      </div>

      {/* Legend / Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveType(null)}
          className={cn(
            'px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all',
            activeType === null 
              ? 'bg-white text-navy border-white' 
              : 'border-white/30 text-white/60 hover:border-white/60'
          )}
        >
          {isGeorgian ? 'ყველა' : 'All'}
        </button>
        {Object.entries(TYPE_COLORS).map(([type, config]) => (
          <button
            key={type}
            onClick={() => setActiveType(activeType === type ? null : type)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all',
              activeType === type 
                ? 'bg-white text-navy border-white' 
                : 'border-white/30 text-white/60 hover:border-white/60'
            )}
          >
            <span 
              className="w-2 h-2"
              style={{ backgroundColor: config.fill }}
            />
            {isGeorgian ? config.labelGe : config.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative aspect-[2/1] bg-white/5 border border-white/10 overflow-hidden">
        {/* Simplified World Map SVG */}
        <svg
          viewBox="0 0 100 50"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid lines for sophistication */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="50" fill="url(#grid)" />
          
          {/* Continents as simplified paths */}
          <g opacity="0.15" fill="white">
            {/* North America */}
            <ellipse cx="22" cy="38" rx="12" ry="8" />
            {/* South America */}
            <ellipse cx="28" cy="58" rx="6" ry="10" />
            {/* Europe */}
            <ellipse cx="50" cy="34" rx="8" ry="5" />
            {/* Africa */}
            <ellipse cx="52" cy="48" rx="7" ry="9" />
            {/* Asia */}
            <ellipse cx="72" cy="36" rx="14" ry="8" />
            {/* Australia */}
            <ellipse cx="82" cy="56" rx="6" ry="4" />
          </g>
        </svg>

        {/* Jurisdiction Points */}
        {filteredJurisdictions.map((jurisdiction) => (
          <motion.button
            key={jurisdiction.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveJurisdiction(
              activeJurisdiction?.id === jurisdiction.id ? null : jurisdiction
            )}
            className="absolute group"
            style={{
              left: `${jurisdiction.x}%`,
              top: `${jurisdiction.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Pulse ring */}
            <span className={cn(
              'absolute inset-0 rounded-full animate-ping',
              activeJurisdiction?.id === jurisdiction.id ? 'bg-white/40' : 'bg-white/20',
              'group-hover:bg-white/40'
            )} style={{ animationDuration: '2s' }} />
            
            {/* Point */}
            <span className={cn(
              'relative block w-3 h-3 rounded-full border-2 border-white transition-all',
              activeJurisdiction?.id === jurisdiction.id 
                ? 'bg-white scale-150' 
                : 'bg-navy group-hover:bg-white group-hover:scale-125'
            )} />

            {/* Label (show on hover/active) */}
            <span className={cn(
              'absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap',
              'font-sans text-[9px] tracking-widest uppercase text-white',
              'opacity-0 group-hover:opacity-100 transition-opacity',
              activeJurisdiction?.id === jurisdiction.id && 'opacity-100'
            )}>
              {jurisdiction.code}
            </span>
          </motion.button>
        ))}

        {/* Active Jurisdiction Detail Panel */}
        <AnimatePresence>
          {activeJurisdiction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-0 left-0 right-0 bg-navy/95 backdrop-blur border-t border-white/20 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className={cn(
                    'font-sans text-sm uppercase tracking-widest text-white mb-1',
                    isGeorgian && 'font-georgian'
                  )}>
                    {isGeorgian ? activeJurisdiction.nameGe : activeJurisdiction.name}
                  </h4>
                  <p className={cn(
                    'font-serif text-xs text-white/60',
                    isGeorgian && 'font-georgian'
                  )}>
                    {isGeorgian ? activeJurisdiction.detailsGe : activeJurisdiction.details}
                  </p>
                </div>
                <div className="flex gap-1">
                  {activeJurisdiction.types.map(type => (
                    <span
                      key={type}
                      className="px-2 py-0.5 text-[9px] uppercase tracking-widest"
                      style={{ 
                        backgroundColor: TYPE_COLORS[type].fill,
                        color: '#0a0f14'
                      }}
                    >
                      {isGeorgian ? TYPE_COLORS[type].labelGe : TYPE_COLORS[type].label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Jurisdiction List (compact, below map) */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {filteredJurisdictions.map((jurisdiction) => (
          <button
            key={jurisdiction.id}
            onClick={() => setActiveJurisdiction(
              activeJurisdiction?.id === jurisdiction.id ? null : jurisdiction
            )}
            className={cn(
              'px-3 py-2 text-left border transition-all',
              activeJurisdiction?.id === jurisdiction.id 
                ? 'bg-white text-navy border-white' 
                : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
            )}
          >
            <span className={cn(
              'block text-[10px] uppercase tracking-widest',
              isGeorgian && 'font-georgian'
            )}>
              {isGeorgian ? jurisdiction.nameGe : jurisdiction.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JurisdictionMap;
