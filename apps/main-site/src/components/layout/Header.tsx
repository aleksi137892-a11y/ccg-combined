import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import CommandPalette from '@/components/CommandPalette';
import logoMonogramNavy from '@/assets/logo-monogram-navy.png';
import logoWordmarkPng from '@/assets/logo-wordmark-full.png';
import iimgPhoto from '@/assets/forum-user-photo-alt.jpg';

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════

const HEADER_HEIGHT = 64;
const LOGO_HEIGHT = 32;

// ═══════════════════════════════════════════════════════════════════════════════
// DATA STRUCTURES
// ═══════════════════════════════════════════════════════════════════════════════

interface NavLink {
  label: string;
  labelGe?: string;
  href: string;
  microcopy?: string;
  microcopyGe?: string;
}

interface NavSection {
  heading: string;
  headingGe?: string;
  links: NavLink[];
}

interface FeaturedCard {
  title: string;
  titleGe?: string;
  description?: string;
  descriptionGe?: string;
  href: string;
  isExternal?: boolean;
  hasPhoto?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  labelGe: string;
  href?: string;
  intro: string;
  introGe: string;
  sections: NavSection[];
  featured: FeaturedCard;
  isTabbed?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION DATA
// ═══════════════════════════════════════════════════════════════════════════════

const NAV_DATA: NavItem[] = [
  {
    id: 'council',
    label: 'About',
    labelGe: 'საბჭო',
    href: '/about',
    intro: 'CCG is a civic institution of petition, proof, and public memory—built so the right to appeal and the right to remedy do not collapse when institutions are captured.',
    introGe: 'სამოქალაქო საბჭო არის პეტიციის, მტკიცებულების და საჯარო მეხსიერების სამოქალაქო ინსტიტუცია — შექმნილი იმისთვის, რომ გასაჩივრებისა და დაცვის უფლება არ დაიშალოს, როცა ინსტიტუტები ხელყოფილია.',
    sections: [
      {
        heading: 'The Institution',
        headingGe: 'ინსტიტუცია',
        links: [
          { label: 'About Us', labelGe: 'ჩვენს შესახებ', href: '/about' },
          { label: 'Mission & Mandate', labelGe: 'მისია და მანდატი', href: '/about/mission' },
          { label: 'Charter', labelGe: 'წესდება', href: '/charter' },
          { label: 'FAQ', labelGe: 'ხშირი კითხვები', href: '/faq' },
        ],
      },
      {
        heading: 'Governance',
        headingGe: 'მმართველობა',
        links: [
          { label: 'Governance Overview', labelGe: 'მმართველობის მიმოხილვა', href: '/about/governance' },
          { label: 'Advisory Council', labelGe: 'სამრჩევლო საბჭო', href: '/about/advisory' },
          { label: 'Transparency', labelGe: 'გამჭვირვალობა', href: '/transparency' },
        ],
      },
      {
        heading: 'Trust & Standards',
        headingGe: 'ნდობა და სტანდარტები',
        links: [
          { label: 'Standards', labelGe: 'სტანდარტები', href: '/standards' },
          { label: 'Methodology', labelGe: 'მეთოდოლოგია', href: '/methodology' },
          { label: 'Funding & Independence', labelGe: 'დაფინანსება', href: '/about/funding' },
        ],
      },
      {
        heading: 'Connect',
        headingGe: 'კავშირი',
        links: [
          { label: 'Contact', labelGe: 'კონტაქტი', href: '/contact' },
          { label: 'Press & Media', labelGe: 'პრესა და მედია', href: '/about/press' },
        ],
      },
    ],
    featured: {
      title: 'Message from the Founder',
      titleGe: 'მესიჯი დამფუძნებლისგან',
      description: 'Why this institution exists and what it asks of the public.',
      descriptionGe: 'რატომ არსებობს ეს ინსტიტუცია და რას ითხოვს საზოგადოებისგან.',
      href: '/about#founder-video',
    },
  },
  {
    id: 'capture',
    label: 'State of Capture',
    labelGe: 'ხელყოფის ძრავა',
    href: '/state-of-capture',
    intro: 'Capture is engineered. It is built to produce impunity, obedience, and profit. We explain the mechanism with evidence.',
    introGe: 'ხელყოფა არის ინჟინერირებული. ის აშენებულია დაუსჯელობის, მორჩილების და მოგების წარმოებისთვის.',
    sections: [
      {
        heading: 'The Engine',
        headingGe: 'ძრავა',
        links: [
          { label: 'Open the Engine', labelGe: 'გახსენით ძრავი', href: '/state-of-capture' },
          { label: 'Methodology', labelGe: 'მეთოდოლოგია', href: '/state-of-capture/methods' },
        ],
      },
      {
        heading: 'Investigations',
        headingGe: 'გამოძიებები',
        links: [
          { label: 'IIM-Georgia', labelGe: 'IIM საქართველო', href: '/remedy/iimg' },
          { label: 'Complicity Index', labelGe: 'თანამონაწილეობის ინდექსი', href: '/state-of-capture/complicity' },
        ],
      },
    ],
    featured: {
      title: 'The Capture Map',
      titleGe: 'ხელყოფის რუკა',
      description: 'Visual mapping of institutional control.',
      descriptionGe: 'ინსტიტუციური კონტროლის ვიზუალური რუკა.',
      href: '/state-of-capture/map',
    },
  },
  {
    id: 'justice',
    label: 'Forum for Justice',
    labelGe: 'სამართლიანობის ფორუმი',
    href: '/justice',
    intro: 'CCG keeps the right to appeal and the right to remedy alive—by turning petitions into usable files for lawful consequence.',
    introGe: 'CCG ინარჩუნებს გასაჩივრების და გამოსწორების უფლებას ცოცხალს — პეტიციების კანონიერი შედეგისთვის გამოსადეგ ფაილებად გადაქცევით.',
    isTabbed: true,
    sections: [
      {
        heading: 'Foundations',
        headingGe: 'საფუძვლები',
        links: [
          { label: 'Doctrine of Civic Necessity', labelGe: 'სამოქალაქო აუცილებლობის დოქტრინა', href: '/about/civic-necessity', microcopy: 'Why this institution exists', microcopyGe: 'რატომ არსებობს ეს ინსტიტუცია' },
          { label: 'Right to Remedy', labelGe: 'გამოსწორების უფლება', href: '/about/right-to-remedy', microcopy: 'Our absolute commitment to victims', microcopyGe: 'ჩვენი აბსოლუტური ვალდებულება მსხვერპლთა მიმართ' },
        ],
      },
      {
        heading: 'Appeal',
        headingGe: 'გასაჩივრება',
        links: [
          { label: 'Make an Appeal', labelGe: 'მიმართვის გაკეთება', href: '/appeal', microcopy: 'Report harm, wrongdoing, or violations', microcopyGe: 'მოხსენება ზიანის, დარღვევების შესახებ' },
          { label: 'Protections & Safety', labelGe: 'დაცვა და უსაფრთხოება', href: '/appeal/protections', microcopy: 'How we protect sources and witnesses', microcopyGe: 'როგორ ვიცავთ წყაროებს და მოწმეებს' },
        ],
      },
      {
        heading: 'Record',
        headingGe: 'ჩანაწერი',
        links: [
          { label: 'The Ledger', labelGe: 'რეესტრი', href: '/record/ledger', microcopy: 'Financial complicity database', microcopyGe: 'ფინანსური თანამონაწილეობის მონაცემთა ბაზა' },
          { label: 'The List', labelGe: 'სია', href: '/record/registry/the-list', microcopy: 'Individual responsibility registry', microcopyGe: 'ინდივიდუალური პასუხისმგებლობის რეესტრი' },
          { label: 'Reply & Corrections', labelGe: 'პასუხი და შესწორებები', href: '/record/registry/reply-corrections', microcopy: 'Right of reply log', microcopyGe: 'პასუხის უფლების ჟურნალი' },
        ],
      },
      {
        heading: 'Remedy',
        headingGe: 'გამოსწორება',
        links: [
          { label: 'Sanctions Submissions', labelGe: 'სანქციების წარდგენა', href: '/remedy/sanctions', microcopy: 'Magnitsky and EU sanctions', microcopyGe: 'მაგნიტსკი და EU სანქციები' },
          { label: 'Strategic Litigation', labelGe: 'სტრატეგიული სამართალწარმოება', href: '/remedy/litigation', microcopy: 'ECHR, civil claims, asset recovery', microcopyGe: 'ადამიანის უფლებათა სასამართლო, სამოქალაქო სარჩელები' },
          { label: 'Criminal Dossiers', labelGe: 'სისხლის სამართლის დოსიეები', href: '/remedy/criminal-dossiers', microcopy: 'Prosecutor-ready case files', microcopyGe: 'პროკურორისთვის მზა საქმის ფაილები' },
          { label: 'International Mechanisms', labelGe: 'საერთაშორისო მექანიზმები', href: '/remedy/international', microcopy: 'UN, ICC, Council of Europe, OSCE', microcopyGe: 'გაერო, ICC, ევროპის საბჭო, ეუთო' },
        ],
      },
    ],
    featured: {
      title: 'IIMG — Submit Evidence',
      titleGe: 'IIMG — მტკიცებულების წარდგენა',
      description: 'Independent Investigative Mechanism for Georgia. Submit evidence of serious violations.',
      descriptionGe: 'საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი. წარადგინეთ მტკიცებულებები.',
      href: 'https://iimg.sabcho.org',
      isExternal: true,
      hasPhoto: true,
    },
  },
  {
    id: 'rustaveli',
    label: 'Rustaveli Project',
    labelGe: 'რუსთაველის პროექტი',
    href: '/rustaveli',
    intro: 'Safeguarding civic inheritance — memory, language, dignity.',
    introGe: 'სამოქალაქო მემკვიდრეობის დაცვა — მეხსიერება, ენა, ღირსება.',
    sections: [
      {
        heading: 'Heritage',
        headingGe: 'მემკვიდრეობა',
        links: [
          { label: 'The Project', labelGe: 'პროექტი', href: '/rustaveli' },
          { label: 'Heritage Canon', labelGe: 'მემკვიდრეობის კანონი', href: '/rustaveli/canon' },
        ],
      },
      {
        heading: 'Movement',
        headingGe: 'მოძრაობა',
        links: [
          { label: 'Join the Movement', labelGe: 'შეუერთდი მოძრაობას', href: '/rustaveli/join' },
          { label: 'Solidarity Pledge', labelGe: 'სოლიდარობის აღთქმა', href: '/rustaveli/pledge' },
        ],
      },
    ],
    featured: {
      title: 'The Canon',
      titleGe: 'კანონი',
      description: 'Essential texts of Georgian civic identity.',
      descriptionGe: 'ქართული სამოქალაქო იდენტობის აუცილებელი ტექსტები.',
      href: '/rustaveli/canon',
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT PROPS
// ═══════════════════════════════════════════════════════════════════════════════

interface HeaderProps {
  forceHidden?: boolean;
  animateIn?: boolean;
  interactive?: boolean;
  lightMode?: boolean;
  logoMode?: 'none' | 'wordmark';
}

// ═══════════════════════════════════════════════════════════════════════════════
// HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const Header: React.FC<HeaderProps> = ({
  forceHidden = false,
  animateIn = false,
  interactive = true,
  lightMode = false,
  logoMode = 'wordmark',
}) => {
  const { language, getAlternateLanguagePath } = useLanguage();
  const langPrefix = language === 'ge' ? '/ge' : '';
  
  // Scroll state - simple boolean
  const [scrolled, setScrolled] = useState(false);
  
  // Menu state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  
  // Triage / Command Palette
  const [triageOpen, setTriageOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  
  // Animation
  const [hasAnimatedIn, setHasAnimatedIn] = useState(!animateIn);
  
  // Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Focus trap for mobile menu
  useFocusTrap(mobileMenuRef, mobileMenuOpen);

  // Handle animate-in
  useEffect(() => {
    if (animateIn && !hasAnimatedIn) {
      const timer = setTimeout(() => setHasAnimatedIn(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animateIn, hasAnimatedIn]);

  // Simple scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
        setTriageOpen(false);
      }
    };
    const handleOpenCommandPalette = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      if (customEvent.detail?.query) {
        setInitialQuery(customEvent.detail.query);
      }
      setTriageOpen(true);
    };
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommandPalette', handleOpenCommandPalette);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommandPalette', handleOpenCommandPalette);
    };
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Menu handlers
  const handleMenuEnter = useCallback((id: string) => {
    if (!interactive) return;
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(id);
  }, [interactive]);

  const handleMenuLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const handleMegaMenuEnter = useCallback(() => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  }, []);

  const toggleLanguage = () => {
    window.location.href = getAlternateLanguagePath();
  };

  const toggleMobileItem = (id: string) => {
    setExpandedMobileItem(expandedMobileItem === id ? null : id);
  };

  const getLabel = (item: NavItem | NavLink | NavSection | FeaturedCard, field: 'label' | 'heading' | 'title' | 'intro' | 'description' = 'label'): string => {
    const geField = `${field}Ge`;
    const itemRecord = item as unknown as Record<string, string | undefined>;
    if (language === 'ge' && itemRecord[geField]) {
      return itemRecord[geField] as string;
    }
    return itemRecord[field] as string || '';
  };

  const isMegaMenuOpen = activeMenu !== null;

  // Derived styling
  const isNavy = isMegaMenuOpen || mobileMenuOpen;
  const showBackground = scrolled && !isNavy;

  // ═════════════════════════════════════════════════════════════════════════════
  // MEGA MENU RENDERER
  // ═════════════════════════════════════════════════════════════════════════════

  const renderMegaMenu = (item: NavItem) => {
    return (
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <p className={cn(
            'text-[15px] text-white/70 leading-relaxed',
            language === 'ge' ? 'font-georgian' : ''
          )}>
            {getLabel(item, 'intro')}
          </p>
        </div>

        <div className="col-span-6">
          <div className="grid grid-cols-2 gap-8">
            {item.sections.map((section, idx) => (
              <div key={idx}>
                <h4 className={cn(
                  'text-eyebrow text-white/50 mb-3',
                  language === 'ge' ? 'font-georgian' : ''
                )}>
                  {getLabel(section, 'heading')}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="block group/link"
                      >
                        <span className={cn(
                          'block text-[14px] text-white/80 group-hover/link:text-white transition-colors duration-150',
                          language === 'ge' ? 'font-georgian' : ''
                        )}>
                          {getLabel(link)}
                        </span>
                        {link.microcopy && (
                          <span className={cn(
                            'block text-caption text-white/50 mt-0.5',
                            language === 'ge' ? 'font-georgian' : ''
                          )}>
                            {language === 'ge' && link.microcopyGe ? link.microcopyGe : link.microcopy}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3">
          {item.featured.hasPhoto ? (
            // IIMG Featured with Photo
            <a
              href={item.featured.href}
              target={item.featured.isExternal ? '_blank' : undefined}
              rel={item.featured.isExternal ? 'noopener noreferrer' : undefined}
              className="block group"
            >
              <div className="relative overflow-hidden border border-white/10">
                <img 
                  src={iimgPhoto} 
                  alt="IIMG Evidence Submission" 
                  className="w-full h-28 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 text-eyebrow text-white/50 mb-1">
                    <span>{language === 'en' ? 'Featured' : 'გამორჩეული'}</span>
                    {item.featured.isExternal && <ExternalLink className="w-2.5 h-2.5" />}
                  </div>
                  <h4 className={cn(
                    'text-sm font-medium text-white mb-0.5',
                    language === 'ge' ? 'font-georgian' : ''
                  )}>
                    {getLabel(item.featured, 'title')}
                  </h4>
                </div>
              </div>
              <div className="mt-2 p-3 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                <p className={cn(
                  'text-xs text-white/60',
                  language === 'ge' ? 'font-georgian' : ''
                )}>
                  {getLabel(item.featured, 'description')}
                </p>
              </div>
            </a>
          ) : (
            // Standard Featured Card
            <a
              href={item.featured.href}
              target={item.featured.isExternal ? '_blank' : undefined}
              rel={item.featured.isExternal ? 'noopener noreferrer' : undefined}
              className="block p-5 bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                <span>{language === 'en' ? 'Featured' : 'გამორჩეული'}</span>
                {item.featured.isExternal && <ExternalLink className="w-3 h-3" />}
              </div>
              <h4 className={cn(
                'text-base font-medium text-white mb-1',
                language === 'ge' ? 'font-georgian' : ''
              )}>
                {getLabel(item.featured, 'title')}
              </h4>
              {item.featured.description && (
                <p className={cn(
                  'text-sm text-white/50 mt-1',
                  language === 'ge' ? 'font-georgian' : ''
                )}>
                  {getLabel(item.featured, 'description')}
                </p>
              )}
            </a>
          )}
        </div>
      </div>
    );
  };

  // ═════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════════════════

  if (forceHidden) return null;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isNavy ? 'bg-navy' : showBackground ? 'bg-white shadow-sm' : 'bg-transparent',
          hasAnimatedIn && animateIn && 'animate-[headerSlideIn_600ms_ease-out]'
        )}
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        {/* ═══════════════════════════════════════════════════════════════════════
            DESKTOP (>= 768px): Simple 3-column layout
            ═══════════════════════════════════════════════════════════════════════ */}
        <div 
          className="hidden md:flex items-center justify-between h-full max-w-[1600px] mx-auto px-6 lg:px-10"
        >
          {/* LEFT: Language + Nav */}
          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={cn(
                "flex items-center text-eyebrow font-sans transition-colors duration-200",
                isNavy ? "text-white" : "text-navy"
              )}
              aria-label={language === 'en' ? 'Switch to Georgian' : 'Switch to English'}
            >
              <span className={language === 'en' ? 'font-medium' : 'opacity-40'}>En</span>
              <span className="opacity-30 mx-0.5">/</span>
              <span className={cn('font-georgian', language === 'ge' ? 'font-medium' : 'opacity-40')}>ქა</span>
            </button>

            {/* Left Nav (About, State of Capture) */}
            <nav
              className={cn("flex items-center gap-6", !interactive && "pointer-events-none")}
              role="navigation"
              aria-label="Primary navigation"
            >
              {NAV_DATA.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMenuEnter(item.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    to={langPrefix + (item.href || '/')}
                    onMouseEnter={() => handleMenuEnter(item.id)}
                    className={cn(
                      'py-2 text-nav font-sans transition-colors duration-200 flex items-center gap-1',
                      isNavy
                        ? (activeMenu === item.id ? 'text-white font-semibold' : 'text-white/80 hover:text-white font-medium')
                        : (activeMenu === item.id ? 'text-navy font-semibold' : 'text-navy hover:text-navy/70 font-medium'),
                      language === 'ge' ? 'font-georgian' : ''
                    )}
                  >
                    {getLabel(item)}
                    <ChevronRight className="h-3 w-3 opacity-40 -rotate-90" />
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* CENTER: Logo */}
          <Link 
            to="/" 
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <img 
              src={logoMonogramNavy} 
              alt="Civic Council of Georgia" 
              className="transition-all duration-300"
              style={{
                height: `${LOGO_HEIGHT}px`,
                ...(isNavy ? { filter: 'brightness(0) invert(1)' } : {})
              }}
            />
          </Link>

          {/* RIGHT: Nav */}
          <nav
            className={cn("flex items-center gap-6", !interactive && "pointer-events-none")}
            role="navigation"
            aria-label="Secondary navigation"
          >
            {NAV_DATA.slice(2).map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => handleMenuEnter(item.id)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  to={langPrefix + (item.href || '/')}
                  onMouseEnter={() => handleMenuEnter(item.id)}
                  className={cn(
                    'py-2 text-nav font-sans transition-colors duration-200 flex items-center gap-1',
                    isNavy
                      ? (activeMenu === item.id ? 'text-white font-semibold' : 'text-white/80 hover:text-white font-medium')
                      : (activeMenu === item.id ? 'text-navy font-semibold' : 'text-navy hover:text-navy/70 font-medium'),
                    language === 'ge' ? 'font-georgian' : ''
                  )}
                >
                  {getLabel(item)}
                  <ChevronRight className="h-3 w-3 opacity-40 -rotate-90" />
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            MOBILE (< 768px): 3-column grid
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="md:hidden flex items-center justify-between h-full px-4">
          {/* Left: Language */}
          <button
            onClick={toggleLanguage}
            className={cn(
              "flex items-center text-eyebrow font-sans",
              isNavy ? "text-white" : "text-navy"
            )}
            aria-label={language === 'en' ? 'Switch to Georgian' : 'Switch to English'}
          >
            <span className={language === 'en' ? 'font-medium' : 'opacity-40'}>En</span>
            <span className="opacity-30 mx-0.5">/</span>
            <span className={cn('font-georgian', language === 'ge' ? 'font-medium' : 'opacity-40')}>ქა</span>
          </button>

          {/* Center: Logo */}
          <Link to="/">
            <img 
              src={logoMonogramNavy} 
              alt="Civic Council of Georgia" 
              className="h-8"
              style={{
                ...(isNavy ? { filter: 'brightness(0) invert(1)' } : {})
              }}
            />
          </Link>

          {/* Right: Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={cn("p-3 min-h-[44px] min-w-[44px] flex items-center justify-center", isNavy ? "text-white" : "text-navy")}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            MEGA MENU DROPDOWN (Desktop)
            ═══════════════════════════════════════════════════════════════════════ */}
        {activeMenu && (
          <div
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMenuLeave}
            className="hidden md:block absolute left-0 right-0 top-full bg-navy border-t border-white/10 animate-[megaMenuEnter_200ms_ease-out]"
          >
            <div className="max-w-[1400px] mx-auto px-8 py-8">
              {renderMegaMenu(NAV_DATA.find(item => item.id === activeMenu)!)}
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE MENU OVERLAY
          ═══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={mobileMenuRef}
        className={cn(
          'fixed inset-0 z-[60] bg-navy transition-all duration-300 md:hidden',
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-x-0' 
            : 'opacity-0 pointer-events-none translate-x-full'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="h-full overflow-y-auto">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img 
                src={logoMonogramNavy} 
                alt="Civic Council of Georgia" 
                className="h-8"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center px-3 py-2 min-h-[44px] text-xs uppercase tracking-wider text-white"
              >
                <span className={language === 'en' ? 'font-medium' : 'opacity-40'}>En</span>
                <span className="opacity-30 mx-1">/</span>
                <span className={cn('font-georgian', language === 'ge' ? 'font-medium' : 'opacity-40')}>ქა</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile CTA buttons */}
          <div className="p-4 border-b border-white/10 space-y-2">
            <a
              href="https://forum.sabcho.org/petition"
              className={cn(
                'block w-full px-4 py-3 text-center text-sm font-medium bg-white text-navy',
                language === 'ge' ? 'font-georgian' : ''
              )}
            >
              {language === 'en' ? 'Submit a Petition' : 'პეტიციის წარდგენა'}
            </a>
            <a
              href="https://forum.sabcho.org/secure"
              className={cn(
                'block w-full px-4 py-3 text-center text-sm font-medium border border-white/30 text-white/80 hover:bg-white/10 transition-colors',
                language === 'ge' ? 'font-georgian' : ''
              )}
            >
              {language === 'en' ? 'Secure Channel' : 'უსაფრთხო არხი'}
            </a>
          </div>

          {/* Mobile navigation accordion */}
          <nav className="p-4" role="navigation" aria-label="Mobile navigation">
            {NAV_DATA.map((item) => (
              <div key={item.id} className="border-b border-white/10 last:border-0">
                <button
                  onClick={() => toggleMobileItem(item.id)}
                  aria-expanded={expandedMobileItem === item.id}
                  className={cn(
                    'flex items-center justify-between w-full py-4 text-left',
                    language === 'ge' ? 'font-georgian' : ''
                  )}
                >
                  <span className="text-sm font-medium uppercase tracking-wider text-white">
                    {getLabel(item)}
                  </span>
                  <ChevronRight className={cn(
                    'h-4 w-4 text-white/50 transition-transform duration-200',
                    expandedMobileItem === item.id && 'rotate-90'
                  )} />
                </button>
                
                {expandedMobileItem === item.id && (
                  <div className="pb-4 animate-fade-in">
                    <p className={cn(
                      'text-sm text-white/60 mb-4 leading-relaxed',
                      language === 'ge' ? 'font-georgian' : ''
                    )}>
                      {getLabel(item, 'intro')}
                    </p>
                    
                    {item.sections.map((section, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        <h4 className={cn(
                          'text-xs font-semibold uppercase tracking-wider text-white/50 mb-2',
                          language === 'ge' ? 'font-georgian' : ''
                        )}>
                          {getLabel(section, 'heading')}
                        </h4>
                        <ul className="space-y-2">
                          {section.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <a
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  'flex items-center gap-2 py-1.5 text-white/70 hover:text-white transition-colors',
                                  language === 'ge' ? 'font-georgian' : ''
                                )}
                              >
                                <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                                {getLabel(link)}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Featured in mobile */}
                    <a
                      href={item.featured.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block p-4 mt-4 bg-white/5 border border-white/10',
                        language === 'ge' ? 'font-georgian' : ''
                      )}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                        {language === 'en' ? 'Featured' : 'გამორჩეული'}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {getLabel(item.featured, 'title')}
                      </span>
                      {item.featured.description && (
                        <p className="text-xs text-white/50 mt-1">
                          {getLabel(item.featured, 'description')}
                        </p>
                      )}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes headerSlideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes megaMenuEnter {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Command Palette Modal */}
      <CommandPalette 
        open={triageOpen} 
        onOpenChange={(open) => {
          setTriageOpen(open);
          if (!open) setInitialQuery('');
        }}
        initialQuery={initialQuery}
      />
    </>
  );
};

export default Header;
