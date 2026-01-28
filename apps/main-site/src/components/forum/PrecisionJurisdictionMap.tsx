import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface Jurisdiction {
  id: string;
  name: { en: string; ge: string };
  code: string;
  types: ('sanctions' | 'litigation' | 'criminal' | 'treaty')[];
  mechanisms: { en: string; ge: string };
  details: { en: string; ge: string };
  // SVG path coordinates for simplified map
  path: string;
  labelPos: { x: number; y: number };
}

// Geographically accurate positions based on Mercator projection (900x400 viewbox)
// Georgia is at approximately 42°N, 44°E - positioned in the Caucasus
const JURISDICTIONS: Jurisdiction[] = [
  {
    id: 'usa',
    name: { en: 'United States', ge: 'ამერიკის შეერთებული შტატები' },
    code: 'US',
    types: ['sanctions', 'litigation'],
    mechanisms: { en: 'Global Magnitsky Act, CAATSA', ge: 'გლობალური მაგნიტსკის აქტი, CAATSA' },
    details: { en: 'Asset freezes, visa bans, secondary sanctions on enablers', ge: 'აქტივების გაყინვა, სავიზო აკრძალვები, მეორადი სანქციები' },
    path: '',
    labelPos: { x: 150, y: 140 }  // Central USA
  },
  {
    id: 'uk',
    name: { en: 'United Kingdom', ge: 'გაერთიანებული სამეფო' },
    code: 'UK',
    types: ['sanctions', 'litigation'],
    mechanisms: { en: 'UK Magnitsky Sanctions, UWOs', ge: 'UK მაგნიტსკის სანქციები, UWO-ები' },
    details: { en: 'Unexplained Wealth Orders, private prosecution, civil claims', ge: 'აუხსნელი სიმდიდრის ბრძანებები, კერძო სისხლისსამართლებრივი დევნა' },
    path: '',
    labelPos: { x: 430, y: 95 }  // UK
  },
  {
    id: 'eu',
    name: { en: 'European Union', ge: 'ევროკავშირი' },
    code: 'EU',
    types: ['sanctions', 'criminal'],
    mechanisms: { en: 'EU Global Human Rights Sanctions', ge: 'ევროკავშირის გლობალური ადამიანის უფლებების სანქციები' },
    details: { en: 'Coordinated visa bans and asset freezes across 27 member states', ge: 'კოორდინირებული სავიზო აკრძალვები და აქტივების გაყინვა 27 წევრ სახელმწიფოში' },
    path: '',
    labelPos: { x: 460, y: 115 }  // Central Europe (Brussels area)
  },
  {
    id: 'de',
    name: { en: 'Germany', ge: 'გერმანია' },
    code: 'DE',
    types: ['criminal', 'litigation'],
    mechanisms: { en: 'Universal Jurisdiction (§ 6 VStGB)', ge: 'უნივერსალური იურისდიქცია (§ 6 VStGB)' },
    details: { en: 'War Crimes Unit, structural investigation capacity', ge: 'ომის დანაშაულების განყოფილება, სტრუქტურული გამოძიების შესაძლებლობა' },
    path: '',
    labelPos: { x: 465, y: 105 }  // Berlin area
  },
  {
    id: 'fr',
    name: { en: 'France', ge: 'საფრანგეთი' },
    code: 'FR',
    types: ['criminal', 'litigation'],
    mechanisms: { en: 'Pôle Crimes Against Humanity', ge: 'კაცობრიობის წინააღმდეგ დანაშაულების განყოფილება' },
    details: { en: 'Specialized prosecution unit, civil party claims', ge: 'სპეციალიზებული პროკურატურის განყოფილება, სამოქალაქო მხარის სარჩელები' },
    path: '',
    labelPos: { x: 445, y: 115 }  // Paris area
  },
  {
    id: 'ch',
    name: { en: 'Switzerland', ge: 'შვეიცარია' },
    code: 'CH',
    types: ['litigation', 'criminal'],
    mechanisms: { en: 'Office of the Attorney General', ge: 'გენერალური პროკურორის ოფისი' },
    details: { en: 'Asset recovery, mutual legal assistance', ge: 'აქტივების აღდგენა, ურთიერთსამართლებრივი დახმარება' },
    path: '',
    labelPos: { x: 455, y: 120 }  // Bern area
  },
  {
    id: 'nl',
    name: { en: 'Netherlands', ge: 'ნიდერლანდები' },
    code: 'NL',
    types: ['criminal', 'treaty'],
    mechanisms: { en: 'ICC Seat, War Crimes Team', ge: 'ICC-ის ადგილი, ომის დანაშაულების გუნდი' },
    details: { en: 'International Criminal Court, domestic universal jurisdiction', ge: 'საერთაშორისო სისხლის სამართლის სასამართლო, შიდა უნივერსალური იურისდიქცია' },
    path: '',
    labelPos: { x: 450, y: 100 }  // The Hague
  },
  {
    id: 'se',
    name: { en: 'Sweden', ge: 'შვედეთი' },
    code: 'SE',
    types: ['criminal'],
    mechanisms: { en: 'International Crimes Unit', ge: 'საერთაშორისო დანაშაულების განყოფილება' },
    details: { en: 'Structural investigations, universal jurisdiction prosecutions', ge: 'სტრუქტურული გამოძიებები, უნივერსალური იურისდიქციის დევნა' },
    path: '',
    labelPos: { x: 475, y: 70 }  // Stockholm
  },
  {
    id: 'echr',
    name: { en: 'ECHR (Strasbourg)', ge: 'ევროპის ადამიანის უფლებათა სასამართლო' },
    code: 'ECHR',
    types: ['treaty'],
    mechanisms: { en: 'European Court of Human Rights', ge: 'ევროპის ადამიანის უფლებათა სასამართლო' },
    details: { en: 'Binding judgments, just satisfaction, pilot judgments', ge: 'სავალდებულო გადაწყვეტილებები, სამართლიანი დაკმაყოფილება' },
    path: '',
    labelPos: { x: 452, y: 112 }  // Strasbourg
  },
  {
    id: 'icc',
    name: { en: 'ICC (The Hague)', ge: 'საერთაშორისო სისხლის სამართლის სასამართლო' },
    code: 'ICC',
    types: ['treaty', 'criminal'],
    mechanisms: { en: 'Rome Statute Jurisdiction', ge: 'რომის სტატუტის იურისდიქცია' },
    details: { en: 'Crimes against humanity, war crimes, genocide', ge: 'კაცობრიობის წინააღმდეგ დანაშაული, ომის დანაშაული, გენოციდი' },
    path: '',
    labelPos: { x: 448, y: 102 }  // The Hague
  },
  {
    id: 'ca',
    name: { en: 'Canada', ge: 'კანადა' },
    code: 'CA',
    types: ['sanctions'],
    mechanisms: { en: 'Justice for Victims of Corrupt Foreign Officials Act', ge: 'კორუმპირებული უცხოელი თანამდებობის პირების მსხვერპლთა სამართლიანობის აქტი' },
    details: { en: 'Magnitsky-style sanctions, asset freezes', ge: 'მაგნიტსკის ტიპის სანქციები, აქტივების გაყინვა' },
    path: '',
    labelPos: { x: 180, y: 85 }  // Ottawa area
  },
  {
    id: 'au',
    name: { en: 'Australia', ge: 'ავსტრალია' },
    code: 'AU',
    types: ['sanctions'],
    mechanisms: { en: 'Autonomous Sanctions Regulations', ge: 'ავტონომიური სანქციების რეგულაციები' },
    details: { en: 'Targeted financial sanctions and travel bans', ge: 'მიზანმიმართული ფინანსური სანქციები და მოგზაურობის აკრძალვები' },
    path: '',
    labelPos: { x: 760, y: 300 }  // Canberra area
  }
];

const TYPE_CONFIG = {
  sanctions: { 
    color: 'bg-blue-400', 
    label: { en: 'Sanctions', ge: 'სანქციები' },
    borderColor: 'border-blue-400/50'
  },
  litigation: { 
    color: 'bg-emerald-400', 
    label: { en: 'Litigation', ge: 'სასამართლო დავა' },
    borderColor: 'border-emerald-400/50'
  },
  criminal: { 
    color: 'bg-amber-400', 
    label: { en: 'Criminal', ge: 'სისხლის სამართალი' },
    borderColor: 'border-amber-400/50'
  },
  treaty: { 
    color: 'bg-purple-400', 
    label: { en: 'Treaty Body', ge: 'ხელშეკრულების ორგანო' },
    borderColor: 'border-purple-400/50'
  }
};

interface PrecisionJurisdictionMapProps {
  className?: string;
}

export function PrecisionJurisdictionMap({ className }: PrecisionJurisdictionMapProps) {
  const { language, isGeorgian } = useLanguage();
  const [activeType, setActiveType] = useState<keyof typeof TYPE_CONFIG | 'all'>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
  const [hoveredJurisdiction, setHoveredJurisdiction] = useState<string | null>(null);

  const filteredJurisdictions = activeType === 'all' 
    ? JURISDICTIONS 
    : JURISDICTIONS.filter(j => j.types.includes(activeType));

  return (
    <div className={cn("relative", className)}>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveType('all')}
          className={cn(
            "px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-sans border transition-all duration-200",
            activeType === 'all' 
              ? "bg-white text-navy border-white" 
              : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
          )}
        >
          {isGeorgian ? 'ყველა' : 'All'}
        </button>
        {(Object.keys(TYPE_CONFIG) as Array<keyof typeof TYPE_CONFIG>).map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={cn(
              "px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-sans border transition-all duration-200 flex items-center gap-2",
              activeType === type 
                ? "bg-white text-navy border-white" 
                : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
            )}
          >
            <span className={cn("w-2 h-2 rounded-full", TYPE_CONFIG[type].color)} />
            {TYPE_CONFIG[type].label[language]}
          </button>
        ))}
      </div>

      {/* Map container */}
      <div className="relative bg-navy/50 border border-white/10 overflow-hidden">
        <svg 
          viewBox="0 0 900 400" 
          className="w-full h-auto"
          style={{ minHeight: 300 }}
        >
          {/* World background - simplified continents */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="900" height="400" fill="url(#grid)" />
          
          {/* Simplified world map background shapes - more accurate geography */}
          <g opacity="0.12" fill="white">
            {/* North America */}
            <path d="M60,60 Q100,50 160,55 L260,60 Q290,75 270,110 L200,130 Q130,135 80,125 L50,105 Q45,80 60,60 Z" />
            {/* South America */}
            <path d="M180,200 L220,195 Q245,230 235,290 L210,340 Q175,355 165,320 L160,250 Q170,215 180,200 Z" />
            {/* Europe */}
            <path d="M420,70 Q460,55 500,65 L530,85 Q545,115 530,145 L495,155 Q455,150 435,130 L420,100 Z" />
            {/* Africa */}
            <path d="M440,160 L510,155 Q550,200 540,270 L510,330 Q470,350 440,320 L420,260 Q415,200 440,160 Z" />
            {/* Asia - including Caucasus region */}
            <path d="M530,60 L730,50 Q780,90 790,140 L770,190 Q710,210 630,200 L560,180 Q520,150 530,100 Z" />
            {/* Australia */}
            <path d="M720,260 L810,250 Q840,295 815,340 L750,355 Q705,335 720,290 Z" />
          </g>
          
          {/* Georgia marker - positioned in the Caucasus (approx 42°N, 44°E) */}
          {/* Between Black Sea and Caspian Sea, south of Russia, north of Turkey/Armenia */}
          <motion.g>
            <circle cx="555" cy="115" r="5" fill="#ef4444" />
            <motion.circle 
              cx="555" 
              cy="115" 
              r="10" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="1.5"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="567" y="119" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="500">GE</text>
          </motion.g>

          {/* Jurisdiction points */}
          {filteredJurisdictions.map((jurisdiction, idx) => {
            const isActive = selectedJurisdiction?.id === jurisdiction.id;
            const isHovered = hoveredJurisdiction === jurisdiction.id;
            const primaryType = jurisdiction.types[0];
            
            return (
              <motion.g
                key={jurisdiction.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedJurisdiction(isActive ? null : jurisdiction)}
                onMouseEnter={() => setHoveredJurisdiction(jurisdiction.id)}
                onMouseLeave={() => setHoveredJurisdiction(null)}
              >
                {/* Connection line to Georgia */}
                <motion.line
                  x1="555"
                  y1="115"
                  x2={jurisdiction.labelPos.x}
                  y2={jurisdiction.labelPos.y}
                  stroke="white"
                  strokeWidth="0.5"
                  strokeDasharray="3,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: isActive || isHovered ? 1 : 0,
                    opacity: isActive || isHovered ? 0.4 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Point */}
                <motion.circle
                  cx={jurisdiction.labelPos.x}
                  cy={jurisdiction.labelPos.y}
                  r={isActive ? 8 : isHovered ? 6 : 4}
                  className={cn(
                    "transition-colors duration-200",
                    primaryType === 'sanctions' && "fill-blue-400",
                    primaryType === 'litigation' && "fill-emerald-400",
                    primaryType === 'criminal' && "fill-amber-400",
                    primaryType === 'treaty' && "fill-purple-400"
                  )}
                />
                
                {/* Pulse ring for active */}
                {isActive && (
                  <motion.circle
                    cx={jurisdiction.labelPos.x}
                    cy={jurisdiction.labelPos.y}
                    r="12"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                
                {/* Country code label */}
                <text
                  x={jurisdiction.labelPos.x}
                  y={jurisdiction.labelPos.y - 10}
                  fill="white"
                  fontSize="8"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  opacity={isActive || isHovered ? 1 : 0.5}
                >
                  {jurisdiction.code}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedJurisdiction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-navy/95 backdrop-blur border-t border-white/20 p-5"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={cn(
                      "font-sans text-sm uppercase tracking-wide text-white",
                      isGeorgian && "font-georgian"
                    )}>
                      {selectedJurisdiction.name[language]}
                    </h4>
                    <div className="flex gap-1">
                      {selectedJurisdiction.types.map(type => (
                        <span 
                          key={type} 
                          className={cn("w-2 h-2 rounded-full", TYPE_CONFIG[type].color)}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={cn(
                    "font-serif text-sm text-white/70 mb-2",
                    isGeorgian && "font-georgian"
                  )}>
                    {selectedJurisdiction.mechanisms[language]}
                  </p>
                  <p className={cn(
                    "font-serif text-xs text-white/50",
                    isGeorgian && "font-georgian"
                  )}>
                    {selectedJurisdiction.details[language]}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJurisdiction(null)}
                  className="text-white/40 hover:text-white/70 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compact jurisdiction list */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        {filteredJurisdictions.map(jurisdiction => (
          <button
            key={jurisdiction.id}
            onClick={() => setSelectedJurisdiction(
              selectedJurisdiction?.id === jurisdiction.id ? null : jurisdiction
            )}
            className={cn(
              "text-left p-3 border transition-all duration-200",
              selectedJurisdiction?.id === jurisdiction.id
                ? "border-white/40 bg-white/5"
                : "border-white/10 hover:border-white/25"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans text-[10px] tracking-wide text-white/40">
                {jurisdiction.code}
              </span>
              <div className="flex gap-0.5">
                {jurisdiction.types.map(type => (
                  <span 
                    key={type} 
                    className={cn("w-1.5 h-1.5 rounded-full", TYPE_CONFIG[type].color)}
                  />
                ))}
              </div>
            </div>
            <span className={cn(
              "font-serif text-xs text-white/70 line-clamp-1",
              isGeorgian && "font-georgian"
            )}>
              {jurisdiction.name[language]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PrecisionJurisdictionMap;
