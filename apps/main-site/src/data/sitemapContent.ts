// Internal Site Architecture Map
// Last audit: 2026-01-14

export type RouteStatus = 'active' | 'orphan' | 'dev' | 'duplicate' | 'external';

export interface RouteEntry {
  path: string;
  component: string;
  category: string;
  linkedInHeader: boolean;
  linkedInFooter: boolean;
  status: RouteStatus;
  notes?: string;
}

export interface ExternalLink {
  href: string;
  label: string;
  subdomain: string;
  linkedFrom: ('header' | 'footer' | 'page')[];
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal: boolean;
}

export interface Issue {
  type: 'orphan' | 'duplicate' | 'dev' | 'external-only' | 'missing-ge';
  severity: 'high' | 'medium' | 'low';
  paths: string[];
  description: string;
}

export const sitemapContent = {
  meta: {
    title: "Site Architecture",
    titleGe: "საიტის არქიტექტურა",
    lastAudit: "2026-01-14",
    description: "Internal map of all routes, navigation links, and architecture documentation.",
    descriptionGe: "ყველა მარშრუტის, ნავიგაციის ბმულების და არქიტექტურის დოკუმენტაციის შიდა რუკა."
  },

  // All internal routes from App.tsx
  routes: [
    // Core Pages
    { path: '/', component: 'Index', category: 'Core', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/about', component: 'About', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/mission', component: 'Mission', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/sitemap', component: 'Sitemap', category: 'Internal', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus, notes: 'Internal architecture map' },
    
    // Forum for Justice
    { path: '/justice', component: 'Justice', category: 'Forum for Justice', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/justice-docket', component: 'JusticeDocket', category: 'Forum for Justice', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/submit-petition', component: 'SubmitPetition', category: 'Forum for Justice', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/secure-channel', component: 'SecureChannel', category: 'Forum for Justice', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/dossier-desk', component: 'DossierDesk', category: 'Forum for Justice', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/international-pathways', component: 'InternationalPathways', category: 'Forum for Justice', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // Integrity / Accountability
    { path: '/the-list', component: 'TheList', category: 'Integrity', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/complicity-index', component: 'ComplicityIndex', category: 'Integrity', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/off-ramp', component: 'OffRamp', category: 'Integrity', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/compliance', component: 'Compliance', category: 'Integrity', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/sanctions', component: 'Sanctions', category: 'Integrity', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // State of Capture
    { path: '/engine', component: 'Engine', category: 'State of Capture', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/capture-map', component: 'CaptureMap', category: 'State of Capture', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/report', component: 'Report', category: 'State of Capture', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/evidence', component: 'Evidence', category: 'State of Capture', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // IIM-Georgia
    { path: '/iim-georgia', component: 'IIMGeorgia', category: 'IIM-Georgia', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/investigations', component: 'Investigations', category: 'IIM-Georgia', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // The Council (About)
    { path: '/governance', component: 'Governance', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/charter', component: 'Charter', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/mandate', component: 'Mandate', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/advisory', component: 'Advisory', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/contact', component: 'Contact', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/faq', component: 'Faq', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/press', component: 'Press', category: 'The Council', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // Standards & Trust
    { path: '/standards', component: 'Standards', category: 'Standards & Trust', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/methodology', component: 'Methodology', category: 'Standards & Trust', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/corrections', component: 'Corrections', category: 'Standards & Trust', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/right-of-reply', component: 'RightOfReply', category: 'Standards & Trust', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/source-protection', component: 'SourceProtection', category: 'Standards & Trust', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // Transparency
    { path: '/funding', component: 'Funding', category: 'Transparency', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/transparency', component: 'Transparency', category: 'Transparency', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // Safety
    { path: '/safety', component: 'Safety', category: 'Safety', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/report-error', component: 'ReportError', category: 'Safety', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // Legal & Access
    { path: '/privacy', component: 'Privacy', category: 'Legal', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/terms', component: 'Terms', category: 'Legal', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/accessibility', component: 'Accessibility', category: 'Legal', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/cookies', component: 'Cookies', category: 'Legal', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // The Rustaveli Project
    { path: '/rustaveli', component: 'Rustaveli', category: 'Rustaveli', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/canon', component: 'Canon', category: 'Rustaveli', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/dignity', component: 'Dignity', category: 'Rustaveli', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/heritage', component: 'Heritage', category: 'Rustaveli', linkedInHeader: true, linkedInFooter: true, status: 'active' as RouteStatus },
    { path: '/solidarity-pledge', component: 'SolidarityPledge', category: 'Rustaveli', linkedInHeader: false, linkedInFooter: true, status: 'active' as RouteStatus },
    
    // Other
    { path: '/search', component: 'Search', category: 'Core', linkedInHeader: true, linkedInFooter: false, status: 'active' as RouteStatus },
  ] as RouteEntry[],

  // No external subdomain links - all routes are now internal
  externalLinks: [] as ExternalLink[],

  // Navigation structure audit
  navigationStructure: {
    header: {
      categories: [
        {
          label: 'About (The Council)',
          links: [
            { label: 'Mission', href: '/mission', isExternal: false },
            { label: 'About', href: '/about', isExternal: false },
            { label: 'Governance', href: '/governance', isExternal: false },
            { label: 'Charter', href: '/charter', isExternal: false },
            { label: 'Mandate', href: '/mandate', isExternal: false },
            { label: 'Advisory', href: '/advisory', isExternal: false },
            { label: 'FAQ', href: '/faq', isExternal: false },
            { label: 'Press', href: '/press', isExternal: false },
            { label: 'Contact', href: '/contact', isExternal: false },
          ]
        },
        {
          label: 'Forum for Justice',
          links: [
            { label: 'Overview', href: '/justice', isExternal: false },
            { label: 'Submit Petition', href: '/submit-petition', isExternal: false },
            { label: 'Secure Channel', href: '/secure-channel', isExternal: false },
            { label: 'The Ledger (Docket)', href: '/justice-docket', isExternal: false },
            { label: 'Dossier Desk', href: '/dossier-desk', isExternal: false },
            { label: 'International Pathways', href: '/international-pathways', isExternal: false },
          ]
        },
        {
          label: 'State of Capture',
          links: [
            { label: 'The Engine', href: '/engine', isExternal: false },
            { label: 'Capture Map', href: '/capture-map', isExternal: false },
            { label: 'The Report', href: '/report', isExternal: false },
            { label: 'Evidence Library', href: '/evidence', isExternal: false },
            { label: 'The List', href: '/the-list', isExternal: false },
            { label: 'Complicity Index', href: '/complicity-index', isExternal: false },
          ]
        },
        {
          label: 'The Rustaveli Project',
          links: [
            { label: 'Overview', href: '/rustaveli', isExternal: false },
            { label: 'Civic Canon', href: '/canon', isExternal: false },
            { label: 'Movement of Dignity', href: '/dignity', isExternal: false },
            { label: 'Heritage & Language', href: '/heritage', isExternal: false },
          ]
        }
      ]
    },
    footer: {
      columns: [
        { label: 'Justice: Appeal', linkCount: 5 },
        { label: 'Justice: Accountability', linkCount: 6 },
        { label: 'Justice: Restitution', linkCount: 5 },
        { label: 'The Capture Engine', linkCount: 4 },
        { label: 'The Rustaveli Project', linkCount: 5 },
        { label: 'The Council', linkCount: 11 },
      ],
      trustBar: ['Standards', 'Confidence Labels', 'Right of Reply', 'Corrections', 'Transparency', 'Funding', 'Safety', 'Source Protection'],
      legalLinks: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility', 'Report an Issue', 'Site Map'],
    }
  },

  // No known issues - all routes are now internal and properly linked
  issues: [] as Issue[],

  // Summary statistics
  stats: {
    totalRoutes: 47,
    activeRoutes: 47,
    orphanRoutes: 0,
    devRoutes: 0,
    duplicateRoutes: 0,
    externalLinks: 0,
    subdomains: 0,
  },

  // Categories for filtering
  categories: [
    { id: 'core', label: 'Core', labelGe: 'ძირითადი', color: 'slate' },
    { id: 'forum', label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', color: 'blue' },
    { id: 'integrity', label: 'Integrity', labelGe: 'მთლიანობა', color: 'amber' },
    { id: 'capture', label: 'State of Capture', labelGe: 'ხელში ჩაგდების მდგომარეობა', color: 'red' },
    { id: 'iim', label: 'IIM-Georgia', labelGe: 'IIM-საქართველო', color: 'purple' },
    { id: 'council', label: 'The Council', labelGe: 'საბჭო', color: 'navy' },
    { id: 'standards', label: 'Standards & Trust', labelGe: 'სტანდარტები და ნდობა', color: 'green' },
    { id: 'transparency', label: 'Transparency', labelGe: 'გამჭვირვალობა', color: 'teal' },
    { id: 'safety', label: 'Safety', labelGe: 'უსაფრთხოება', color: 'orange' },
    { id: 'legal', label: 'Legal', labelGe: 'იურიდიული', color: 'gray' },
    { id: 'rustaveli', label: 'Rustaveli', labelGe: 'რუსთაველი', color: 'rose' },
    { id: 'internal', label: 'Internal', labelGe: 'შიდა', color: 'zinc' },
  ]
};
