// Route Configuration - Centralized URL hierarchy and redirect mapping
// This file defines the new nested URL structure and provides redirect rules
// for backward compatibility with legacy flat URLs.

export type RouteCategory = 
  | 'appeal' 
  | 'record' 
  | 'remedy' 
  | 'state-of-capture' 
  | 'rustaveli' 
  | 'about' 
  | 'legal' 
  | 'root';

export interface RouteConfig {
  path: string;
  legacyPath?: string; // Old flat URL for redirects
  label: string;
  labelGe: string;
  category: RouteCategory;
  parent?: string; // Parent route path for breadcrumbs
  children?: string[]; // Child route paths
  anchors?: string[]; // Available anchors on this page
  isDynamic?: boolean; // Uses :param in path
}

// =============================================================================
// NEW NESTED ROUTE HIERARCHY
// =============================================================================

export const routeConfig: Record<string, RouteConfig> = {
  // ---------------------------------------------------------------------------
  // ROOT LEVEL
  // ---------------------------------------------------------------------------
  '/': {
    path: '/',
    label: 'Home',
    labelGe: 'მთავარი',
    category: 'root',
  },
  '/search': {
    path: '/search',
    label: 'Search',
    labelGe: 'ძიება',
    category: 'root',
  },
  '/contact': {
    path: '/contact',
    label: 'Contact',
    labelGe: 'კონტაქტი',
    category: 'root',
  },
  '/sitemap': {
    path: '/sitemap',
    label: 'Site Map',
    labelGe: 'საიტის რუკა',
    category: 'root',
  },

  // ---------------------------------------------------------------------------
  // APPEAL SECTION - /appeal/*
  // ---------------------------------------------------------------------------
  '/appeal': {
    path: '/appeal',
    legacyPath: '/submit-petition',
    label: 'Appeal',
    labelGe: 'აპელაცია',
    category: 'appeal',
    children: ['/appeal/harm', '/appeal/wrongdoing', '/appeal/inside', '/appeal/protections', '/appeal/how-handled'],
  },
  '/appeal/harm': {
    path: '/appeal/harm',
    label: 'Appeal Harm',
    labelGe: 'ზიანის აპელაცია',
    category: 'appeal',
    parent: '/appeal',
  },
  '/appeal/wrongdoing': {
    path: '/appeal/wrongdoing',
    label: 'Appeal Wrongdoing',
    labelGe: 'დარღვევის აპელაცია',
    category: 'appeal',
    parent: '/appeal',
  },
  '/appeal/inside': {
    path: '/appeal/inside',
    label: 'Appeal from Inside',
    labelGe: 'შიდა აპელაცია',
    category: 'appeal',
    parent: '/appeal',
  },
  '/appeal/protections': {
    path: '/appeal/protections',
    legacyPath: '/safety',
    label: 'Protections & Safety',
    labelGe: 'დაცვა და უსაფრთხოება',
    category: 'appeal',
    parent: '/appeal',
    anchors: ['channels', 'checklist', 'anonymity', 'source-protection'],
  },
  '/appeal/how-handled': {
    path: '/appeal/how-handled',
    label: 'How Appeals Are Handled',
    labelGe: 'როგორ განიხილება აპელაციები',
    category: 'appeal',
    parent: '/appeal',
  },

  // ---------------------------------------------------------------------------
  // RECORD SECTION - /record/*
  // ---------------------------------------------------------------------------
  '/record': {
    path: '/record',
    label: 'The Record',
    labelGe: 'ჩანაწერი',
    category: 'record',
    children: ['/record/ledger', '/record/registry'],
  },
  '/record/ledger': {
    path: '/record/ledger',
    legacyPath: '/justice-docket',
    label: 'The Ledger',
    labelGe: 'რეესტრი',
    category: 'record',
    parent: '/record',
    children: ['/record/ledger/political-prisoners', '/record/ledger/claims-archive'],
    anchors: ['search', 'downloads'],
  },
  '/record/ledger/:entryId': {
    path: '/record/ledger/:entryId',
    label: 'Ledger Entry',
    labelGe: 'რეესტრის ჩანაწერი',
    category: 'record',
    parent: '/record/ledger',
    isDynamic: true,
    anchors: ['evidence'],
  },
  '/record/ledger/political-prisoners': {
    path: '/record/ledger/political-prisoners',
    label: 'Political Prisoners',
    labelGe: 'პოლიტიკური პატიმრები',
    category: 'record',
    parent: '/record/ledger',
  },
  '/record/ledger/political-prisoners/:entryId': {
    path: '/record/ledger/political-prisoners/:entryId',
    label: 'Political Prisoner Profile',
    labelGe: 'პოლიტიკური პატიმრის პროფილი',
    category: 'record',
    parent: '/record/ledger/political-prisoners',
    isDynamic: true,
  },
  '/record/ledger/claims-archive': {
    path: '/record/ledger/claims-archive',
    label: 'Claims Archive',
    labelGe: 'მოთხოვნების არქივი',
    category: 'record',
    parent: '/record/ledger',
  },
  '/record/registry': {
    path: '/record/registry',
    legacyPath: '/complicity-index',
    label: 'Registry of Responsibility',
    labelGe: 'პასუხისმგებლობის რეესტრი',
    category: 'record',
    parent: '/record',
    children: ['/record/registry/the-list', '/record/registry/corporate-responsibility-index', '/record/registry/reply-corrections'],
  },
  '/record/registry/the-list': {
    path: '/record/registry/the-list',
    legacyPath: '/the-list',
    label: 'The List',
    labelGe: 'სია',
    category: 'record',
    parent: '/record/registry',
  },
  '/record/registry/the-list/:entryId': {
    path: '/record/registry/the-list/:entryId',
    label: 'Individual Entry',
    labelGe: 'ინდივიდუალური ჩანაწერი',
    category: 'record',
    parent: '/record/registry/the-list',
    isDynamic: true,
  },
  '/record/registry/corporate-responsibility-index': {
    path: '/record/registry/corporate-responsibility-index',
    label: 'Corporate Responsibility Index',
    labelGe: 'კორპორატიული პასუხისმგებლობის ინდექსი',
    category: 'record',
    parent: '/record/registry',
  },
  '/record/registry/corporate-responsibility-index/:entryId': {
    path: '/record/registry/corporate-responsibility-index/:entryId',
    label: 'Corporate Entry',
    labelGe: 'კორპორატიული ჩანაწერი',
    category: 'record',
    parent: '/record/registry/corporate-responsibility-index',
    isDynamic: true,
  },
  '/record/registry/reply-corrections': {
    path: '/record/registry/reply-corrections',
    legacyPath: '/right-of-reply',
    label: 'Reply & Corrections',
    labelGe: 'პასუხი და შესწორებები',
    category: 'record',
    parent: '/record/registry',
    anchors: ['corrections'],
  },

  // ---------------------------------------------------------------------------
  // REMEDY SECTION - /remedy/*
  // ---------------------------------------------------------------------------
  '/remedy': {
    path: '/remedy',
    legacyPath: '/off-ramp',
    label: 'Remedy',
    labelGe: 'გამოსწორება',
    category: 'remedy',
    children: ['/remedy/sanctions', '/remedy/litigation', '/remedy/criminal-dossiers', '/remedy/iimg', '/remedy/partners'],
    anchors: ['scope'],
  },
  '/remedy/sanctions': {
    path: '/remedy/sanctions',
    legacyPath: '/sanctions',
    label: 'Sanctions Submissions',
    labelGe: 'სანქციების წარდგენა',
    category: 'remedy',
    parent: '/remedy',
    anchors: ['compliance'],
  },
  '/remedy/litigation': {
    path: '/remedy/litigation',
    label: 'Strategic Litigation Support',
    labelGe: 'სტრატეგიული სამართალწარმოების მხარდაჭერა',
    category: 'remedy',
    parent: '/remedy',
  },
  '/remedy/criminal-dossiers': {
    path: '/remedy/criminal-dossiers',
    legacyPath: '/dossier-desk',
    label: 'Criminal Dossiers',
    labelGe: 'სისხლის სამართლის დოსიეები',
    category: 'remedy',
    parent: '/remedy',
  },
  '/remedy/iimg': {
    path: '/remedy/iimg',
    legacyPath: '/iim-georgia',
    label: 'IIM-Georgia',
    labelGe: 'IIM-საქართველო',
    category: 'remedy',
    parent: '/remedy',
  },
  '/remedy/partners': {
    path: '/remedy/partners',
    legacyPath: '/international-pathways',
    label: 'International Pathways',
    labelGe: 'საერთაშორისო გზები',
    category: 'remedy',
    parent: '/remedy',
    anchors: ['boundaries'],
  },

  // ---------------------------------------------------------------------------
  // STATE OF CAPTURE SECTION - /state-of-capture/*
  // ---------------------------------------------------------------------------
  '/state-of-capture': {
    path: '/state-of-capture',
    legacyPath: '/engine',
    label: 'State of Capture',
    labelGe: 'ხელში ჩაგდების მდგომარეობა',
    category: 'state-of-capture',
    children: ['/state-of-capture/anatomy', '/state-of-capture/findings', '/state-of-capture/track', '/state-of-capture/methods'],
  },
  '/state-of-capture/anatomy': {
    path: '/state-of-capture/anatomy',
    legacyPath: '/capture-map',
    label: 'Anatomy of Capture',
    labelGe: 'ხელში ჩაგდების ანატომია',
    category: 'state-of-capture',
    parent: '/state-of-capture',
    anchors: ['institutions', 'incentives', 'enforcement', 'propaganda'],
  },
  '/state-of-capture/findings': {
    path: '/state-of-capture/findings',
    legacyPath: '/report',
    label: 'Findings & Briefs',
    labelGe: 'დასკვნები და მოხსენებები',
    category: 'state-of-capture',
    parent: '/state-of-capture',
  },
  '/state-of-capture/findings/:briefId': {
    path: '/state-of-capture/findings/:briefId',
    label: 'Brief',
    labelGe: 'მოხსენება',
    category: 'state-of-capture',
    parent: '/state-of-capture/findings',
    isDynamic: true,
  },
  '/state-of-capture/track': {
    path: '/state-of-capture/track',
    label: 'What We Track',
    labelGe: 'რას ვადევნებთ თვალყურს',
    category: 'state-of-capture',
    parent: '/state-of-capture',
    anchors: ['indicators', 'cadence'],
  },
  '/state-of-capture/methods': {
    path: '/state-of-capture/methods',
    legacyPath: '/evidence',
    label: 'Methods Summary',
    labelGe: 'მეთოდების შეჯამება',
    category: 'state-of-capture',
    parent: '/state-of-capture',
    anchors: ['osint', 'limitations'],
  },

  // ---------------------------------------------------------------------------
  // RUSTAVELI SECTION - /rustaveli/*
  // ---------------------------------------------------------------------------
  '/rustaveli': {
    path: '/rustaveli',
    label: 'The Rustaveli Project',
    labelGe: 'რუსთაველის პროექტი',
    category: 'rustaveli',
    children: ['/rustaveli/movement', '/rustaveli/exhibition', '/rustaveli/acts', '/rustaveli/canon', '/rustaveli/join'],
  },
  '/rustaveli/movement': {
    path: '/rustaveli/movement',
    legacyPath: '/dignity',
    label: 'Movement of Dignity',
    labelGe: 'ღირსების მოძრაობა',
    category: 'rustaveli',
    parent: '/rustaveli',
    anchors: ['principles'],
  },
  '/rustaveli/exhibition': {
    path: '/rustaveli/exhibition',
    label: 'Exhibition of Moral Courage',
    labelGe: 'მორალური სიმამაცის გამოფენა',
    category: 'rustaveli',
    parent: '/rustaveli',
  },
  '/rustaveli/exhibition/:entryId': {
    path: '/rustaveli/exhibition/:entryId',
    label: 'Moral Courage Profile',
    labelGe: 'მორალური სიმამაცის პროფილი',
    category: 'rustaveli',
    parent: '/rustaveli/exhibition',
    isDynamic: true,
  },
  '/rustaveli/acts': {
    path: '/rustaveli/acts',
    label: 'Acts of Conscience',
    labelGe: 'სინდისის აქტები',
    category: 'rustaveli',
    parent: '/rustaveli',
  },
  '/rustaveli/acts/:entryId': {
    path: '/rustaveli/acts/:entryId',
    label: 'Act Entry',
    labelGe: 'აქტის ჩანაწერი',
    category: 'rustaveli',
    parent: '/rustaveli/acts',
    isDynamic: true,
  },
  '/rustaveli/canon': {
    path: '/rustaveli/canon',
    legacyPath: '/canon',
    label: 'The Civic Canon',
    labelGe: 'სამოქალაქო კანონი',
    category: 'rustaveli',
    parent: '/rustaveli',
    anchors: ['modules', 'curriculum'],
  },
  '/rustaveli/canon/:entryId': {
    path: '/rustaveli/canon/:entryId',
    label: 'Canon Entry',
    labelGe: 'კანონის ჩანაწერი',
    category: 'rustaveli',
    parent: '/rustaveli/canon',
    isDynamic: true,
  },
  '/rustaveli/join': {
    path: '/rustaveli/join',
    legacyPath: '/solidarity-pledge',
    label: 'Join the Movement',
    labelGe: 'შეუერთდი მოძრაობას',
    category: 'rustaveli',
    parent: '/rustaveli',
    anchors: ['pledge', 'volunteer', 'nominate', 'guidelines'],
  },

  // ---------------------------------------------------------------------------
  // ABOUT SECTION - /about/*
  // ---------------------------------------------------------------------------
  '/about': {
    path: '/about',
    label: 'About',
    labelGe: 'შესახებ',
    category: 'about',
    children: ['/about/mission', '/about/leadership', '/about/civic-necessity', '/about/right-to-remedy', '/about/governance', '/about/funding', '/about/privacy-security', '/about/press'],
  },
  '/about/leadership': {
    path: '/about/leadership',
    label: 'Leadership & Credentials',
    labelGe: 'ხელმძღვანელობა და კვალიფიკაცია',
    category: 'about',
    parent: '/about',
  },
  '/about/mission': {
    path: '/about/mission',
    legacyPath: '/mission',
    label: 'Mission & Mandate',
    labelGe: 'მისია და მანდატი',
    category: 'about',
    parent: '/about',
    anchors: ['boundaries'],
  },
  '/about/governance': {
    path: '/about/governance',
    legacyPath: '/governance',
    label: 'Governance',
    labelGe: 'მმართველობა',
    category: 'about',
    parent: '/about',
  },
  '/about/funding': {
    path: '/about/funding',
    legacyPath: '/funding',
    label: 'Funding Integrity',
    labelGe: 'დაფინანსების მთლიანობა',
    category: 'about',
    parent: '/about',
    anchors: ['conflicts'],
  },
  '/about/privacy-security': {
    path: '/about/privacy-security',
    label: 'Privacy & Security',
    labelGe: 'კონფიდენციალურობა და უსაფრთხოება',
    category: 'about',
    parent: '/about',
  },
  '/about/press': {
    path: '/about/press',
    legacyPath: '/press',
    label: 'Press',
    labelGe: 'პრესა',
    category: 'about',
    parent: '/about',
    anchors: ['reports', 'inquiries'],
  },
  '/about/civic-necessity': {
    path: '/about/civic-necessity',
    label: 'Doctrine of Civic Necessity',
    labelGe: 'სამოქალაქო აუცილებლობის დოქტრინა',
    category: 'about',
    parent: '/about',
  },
  '/about/right-to-remedy': {
    path: '/about/right-to-remedy',
    label: 'Right to Remedy',
    labelGe: 'გამოსწორების უფლება',
    category: 'about',
    parent: '/about',
  },

  // LEGAL SECTION (stays at root level per convention)
  // ---------------------------------------------------------------------------
  '/privacy': {
    path: '/privacy',
    label: 'Privacy Policy',
    labelGe: 'კონფიდენციალურობის პოლიტიკა',
    category: 'legal',
  },
  '/terms': {
    path: '/terms',
    label: 'Terms of Use',
    labelGe: 'მოხმარების პირობები',
    category: 'legal',
  },
  '/cookies': {
    path: '/cookies',
    label: 'Cookie Policy',
    labelGe: 'ქუქის პოლიტიკა',
    category: 'legal',
  },
  '/accessibility': {
    path: '/accessibility',
    label: 'Accessibility',
    labelGe: 'ხელმისაწვდომობა',
    category: 'legal',
  },
  '/standards': {
    path: '/standards',
    label: 'Standards & Safeguards',
    labelGe: 'სტანდარტები და გარანტიები',
    category: 'legal',
    anchors: ['evidence', 'source-protection', 'redaction', 'corrections', 'methods'],
  },
};

// =============================================================================
// REDIRECT MAP - Legacy flat URLs to new nested URLs
// =============================================================================

export const redirectMap: Record<string, string> = {
  // Appeal section
  '/submit-petition': '/appeal',
  '/safety': '/appeal/protections',
  '/secure-channel': '/appeal/protections#channels',
  '/source-protection': '/appeal/protections#source-protection',
  
  // Record section
  '/justice-docket': '/record/ledger',
  '/complicity-index': '/record/registry',
  '/the-list': '/record/registry/the-list',
  '/right-of-reply': '/record/registry/reply-corrections',
  '/corrections': '/record/registry/reply-corrections#corrections',
  
  // Remedy section
  '/off-ramp': '/remedy',
  '/sanctions': '/remedy/sanctions',
  '/compliance': '/remedy/sanctions#compliance',
  '/dossier-desk': '/remedy/criminal-dossiers',
  '/iim-georgia': '/remedy/iimg',
  '/international-pathways': '/remedy/partners',
  
  // State of Capture section
  '/engine': '/state-of-capture',
  '/capture-map': '/state-of-capture/anatomy',
  '/report': '/state-of-capture/findings',
  '/evidence': '/state-of-capture/methods',
  '/investigations': '/state-of-capture',
  
  // Rustaveli section
  '/canon': '/rustaveli/canon',
  '/dignity': '/rustaveli/movement',
  '/heritage': '/rustaveli',
  '/solidarity-pledge': '/rustaveli/join',
  
  // About section
  '/mission': '/about/mission',
  '/mandate': '/about/mission',
  '/governance': '/about/governance',
  '/funding': '/about/funding',
  '/press': '/about/press',
  '/advisory': '/about/governance',
  '/methodology': '/standards#methods',
  '/transparency': '/about/funding',
  '/charter': '/about/mission',
  '/faq': '/about',
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get the new path for a legacy URL, or return the original if no redirect exists
 */
export function getRedirectPath(legacyPath: string): string | null {
  return redirectMap[legacyPath] || null;
}

/**
 * Get breadcrumb trail for a given path
 */
export function getBreadcrumbs(path: string, isGeorgian: boolean = false): Array<{ label: string; href: string }> {
  const config = routeConfig[path];
  if (!config) return [];
  
  const breadcrumbs: Array<{ label: string; href: string }> = [];
  let currentPath = path;
  
  while (currentPath) {
    const current = routeConfig[currentPath];
    if (!current) break;
    
    const prefix = isGeorgian ? '/ge' : '';
    breadcrumbs.unshift({
      label: isGeorgian ? current.labelGe : current.label,
      href: `${prefix}${current.path}`,
    });
    
    currentPath = current.parent || '';
  }
  
  return breadcrumbs;
}

/**
 * Get all routes in a category
 */
export function getRoutesByCategory(category: RouteCategory): RouteConfig[] {
  return Object.values(routeConfig).filter(route => route.category === category);
}

/**
 * Check if a path requires dynamic routing
 */
export function isDynamicRoute(path: string): boolean {
  return path.includes(':');
}

/**
 * Get the section landing page for a category
 */
export function getSectionLanding(category: RouteCategory): RouteConfig | null {
  const routes = getRoutesByCategory(category);
  return routes.find(route => !route.parent) || null;
}
