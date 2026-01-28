// Centralized Navigation Data for Graph Generation
// This file extracts navigation structures from components for programmatic analysis

export type EdgeType = 
  | 'header'
  | 'footer-column'
  | 'footer-trust'
  | 'footer-legal'
  | 'footer-action'
  | 'breadcrumb'
  | 'sibling'
  | 'program-nav'
  | 'in-page-cta'
  | 'external';

export interface NavigationLink {
  label: string;
  labelGe: string;
  href: string;
  microcopy?: string;
  microcopyGe?: string;
}

export interface NavigationSection {
  heading: string;
  headingGe: string;
  links: NavigationLink[];
}

export interface NavigationCategory {
  id: string;
  label: string;
  labelGe: string;
  href?: string; // Landing page for the category
  sections: NavigationSection[];
}

// ============================================================================
// HEADER NAVIGATION DATA (from Header.tsx NAV_DATA)
// ============================================================================

export const HEADER_NAV_DATA: NavigationCategory[] = [
  {
    id: 'council',
    label: 'About',
    labelGe: 'საბჭო',
    href: '/about',
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
  },
  {
    id: 'capture',
    label: 'State of Capture',
    labelGe: 'ხელყოფის ძრავა',
    href: '/state-of-capture',
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
  },
  {
    id: 'justice',
    label: 'Forum for Justice',
    labelGe: 'სამართლიანობის ფორუმი',
    href: '/justice',
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
  },
  {
    id: 'rustaveli',
    label: 'Rustaveli Project',
    labelGe: 'რუსთაველის პროექტი',
    href: '/rustaveli',
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
  },
];

// ============================================================================
// FOOTER NAVIGATION DATA (from Footer.tsx FOOTER_DATA)
// ============================================================================

export const FOOTER_ACTION_STRIP = {
  primary: {
    label: 'Make an Appeal',
    labelGe: 'მიმართვის გაკეთება',
    href: '/appeal'
  },
  secondary: [
    { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' },
    { label: 'Protections & Safety', labelGe: 'დაცვა და უსაფრთხოება', href: '/appeal/protections' },
    { label: 'Read Our Mission', labelGe: 'მისიის წაკითხვა', href: '/about/mission' }
  ],
  link: {
    label: 'Report an Error',
    labelGe: 'შეცდომის მოხსენება',
    href: '/record/registry/reply-corrections'
  },
};

export const FOOTER_TRUST_BAR: NavigationLink[] = [
  { label: 'Standards', labelGe: 'სტანდარტები', href: '/standards' },
  { label: 'Confidence Labels', labelGe: 'სანდოობის ეტიკეტები', href: '/standards#confidence-labels' },
  { label: 'Right of Reply', labelGe: 'პასუხის უფლება', href: '/record/registry/reply-corrections' },
  { label: 'Corrections Log', labelGe: 'შესწორებების ჟურნალი', href: '/record/registry/reply-corrections#corrections' },
  { label: 'Funding & Independence', labelGe: 'დაფინანსება და დამოუკიდებლობა', href: '/about/funding' },
  { label: 'Safety', labelGe: 'უსაფრთხოება', href: '/appeal/protections' },
  { label: 'Source Protection', labelGe: 'წყაროს დაცვა', href: '/appeal/protections#source-protection' }
];

export const FOOTER_MAIN_COLUMNS: NavigationSection[] = [
  {
    heading: 'Appeal',
    headingGe: 'აპელაცია',
    links: [
      { label: 'Make an Appeal', labelGe: 'მიმართვის გაკეთება', href: '/appeal' },
      { label: 'I Have Been Harmed', labelGe: 'მე დაზარალდი', href: '/appeal/harm' },
      { label: 'I Witnessed Wrongdoing', labelGe: 'მე ვიყავი დარღვევის მოწმე', href: '/appeal/wrongdoing' },
      { label: 'I Am Inside the System', labelGe: 'მე სისტემის შიგნით ვარ', href: '/appeal/inside' },
      { label: 'How Appeals Are Handled', labelGe: 'როგორ განიხილება', href: '/appeal/how-handled' },
      { label: 'Protections & Safety', labelGe: 'დაცვა და უსაფრთხოება', href: '/appeal/protections' }
    ]
  },
  {
    heading: 'The Record',
    headingGe: 'ჩანაწერი',
    links: [
      { label: 'The Ledger of Harm', labelGe: 'ზიანის რეესტრი', href: '/record/ledger' },
      { label: 'Political Prisoners', labelGe: 'პოლიტიკური პატიმრები', href: '/record/ledger/political-prisoners' },
      { label: 'Registry of Responsibility', labelGe: 'პასუხისმგებლობის რეესტრი', href: '/record/registry' },
      { label: 'The List', labelGe: 'სია', href: '/record/registry/the-list' },
      { label: 'Corporate Index', labelGe: 'კორპორატიული ინდექსი', href: '/record/registry/corporate-responsibility-index' },
      { label: 'Reply & Corrections', labelGe: 'პასუხი და შესწორებები', href: '/record/registry/reply-corrections' }
    ]
  },
  {
    heading: 'Remedy',
    headingGe: 'გამოსწორება',
    links: [
      { label: 'Remedy Overview', labelGe: 'გამოსწორების მიმოხილვა', href: '/remedy' },
      { label: 'Sanctions Submissions', labelGe: 'სანქციების წარდგენა', href: '/remedy/sanctions' },
      { label: 'Strategic Litigation', labelGe: 'სტრატეგიული სამართალწარმოება', href: '/remedy/litigation' },
      { label: 'Criminal Dossiers', labelGe: 'სისხლის სამართლის დოსიეები', href: '/remedy/criminal-dossiers' },
      { label: 'IIM‑Georgia', labelGe: 'IIM-საქართველო', href: '/remedy/iimg' },
      { label: 'International Pathways', labelGe: 'საერთაშორისო გზები', href: '/remedy/partners' }
    ]
  },
  {
    heading: 'State of Capture',
    headingGe: 'ხელში ჩაგდების მდგომარეობა',
    links: [
      { label: 'The Engine', labelGe: 'ძრავა', href: '/state-of-capture' },
      { label: 'Evidence Library', labelGe: 'მტკიცებულებების ბიბლიოთეკა', href: '/state-of-capture/evidence' },
      { label: 'Investigations', labelGe: 'გამოძიებები', href: '/state-of-capture/investigations' },
      { label: 'The Report', labelGe: 'ანგარიში', href: '/state-of-capture/findings' },
      { label: 'Methods Summary', labelGe: 'მეთოდების შეჯამება', href: '/state-of-capture/methods' },
      { label: 'Complicity Index', labelGe: 'თანამონაწილეობის ინდექსი', href: '/record/registry' }
    ]
  },
  {
    heading: 'The Rustaveli Project',
    headingGe: 'რუსთაველის პროექტი',
    links: [
      { label: 'The Rustaveli Project', labelGe: 'რუსთაველის პროექტი', href: '/rustaveli' },
      { label: 'Civic Canon', labelGe: 'სამოქალაქო კანონი', href: '/rustaveli/canon' },
      { label: 'Movement of Dignity', labelGe: 'ღირსების მოძრაობა', href: '/rustaveli/movement' },
      { label: 'Heritage & Language', labelGe: 'მემკვიდრეობა და ენა', href: '/rustaveli/heritage' },
      { label: 'Join the Movement', labelGe: 'შეუერთდი მოძრაობას', href: '/rustaveli/join' }
    ]
  },
  {
    heading: 'The Council',
    headingGe: 'საბჭო',
    links: [
      { label: 'About Us', labelGe: 'ჩვენს შესახებ', href: '/about' },
      { label: 'Mission & Mandate', labelGe: 'მისია და მანდატი', href: '/about/mission' },
      { label: 'Civic Necessity', labelGe: 'სამოქალაქო აუცილებლობა', href: '/about/civic-necessity' },
      { label: 'Right to Remedy', labelGe: 'გამოსწორების უფლება', href: '/about/right-to-remedy' },
      { label: 'Governance', labelGe: 'მმართველობა', href: '/about/governance' },
      { label: 'Advisory Council', labelGe: 'სამრჩევლო საბჭო', href: '/about/governance#advisory' },
      { label: 'Standards & Methodology', labelGe: 'სტანდარტები და მეთოდოლოგია', href: '/standards' },
      { label: 'Funding & Transparency', labelGe: 'დაფინანსება და გამჭვირვალობა', href: '/about/funding' },
      { label: 'Press', labelGe: 'პრესა', href: '/about/press' },
      { label: 'FAQ', labelGe: 'ხშირი კითხვები', href: '/about/faq' },
      { label: 'Contact', labelGe: 'კონტაქტი', href: '/contact' }
    ]
  }
];

export const FOOTER_LEGAL_LINKS: NavigationLink[] = [
  { label: 'Privacy Policy', labelGe: 'კონფიდენციალურობის პოლიტიკა', href: '/privacy' },
  { label: 'Terms of Use', labelGe: 'მოხმარების პირობები', href: '/terms' },
  { label: 'Cookie Policy', labelGe: 'ქუქი-ფაილების პოლიტიკა', href: '/cookies' },
  { label: 'Accessibility', labelGe: 'ხელმისაწვდომობა', href: '/accessibility' },
  { label: 'Report an Issue', labelGe: 'პრობლემის შეტყობინება', href: '/report-error' },
  { label: 'Site Map', labelGe: 'საიტის რუკა', href: '/sitemap' }
];

// ============================================================================
// PROGRAM NAV DATA (from ProgramNav.tsx)
// ============================================================================

export const PROGRAM_NAV_LINKS: NavigationLink[] = [
  { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' },
  { label: 'State of Capture', labelGe: 'ხელში ჩაგდების მდგომარეობა', href: '/state-of-capture' },
  { label: 'The Rustaveli Project', labelGe: 'რუსთაველის პროექტი', href: '/rustaveli' },
];

// ============================================================================
// EXTERNAL LINKS
// ============================================================================

export const EXTERNAL_LINKS: Array<{ label: string; labelGe: string; href: string; context: string }> = [
  { 
    label: 'IIMG — Submit Evidence', 
    labelGe: 'IIMG — მტკიცებულების წარდგენა', 
    href: 'https://iimg.sabcho.org',
    context: 'Forum for Justice header featured card'
  },
];

// ============================================================================
// KNOWN IN-PAGE CTAs (significant internal linking from page content)
// ============================================================================

export interface InPageCTA {
  fromPage: string;
  toPage: string;
  label: string;
  labelGe: string;
  context: string;
}

export const IN_PAGE_CTAS: InPageCTA[] = [
  // Homepage CTAs
  { fromPage: '/', toPage: '/appeal', label: 'Make an Appeal', labelGe: 'მიმართვის გაკეთება', context: 'Homepage hero' },
  { fromPage: '/', toPage: '/justice', label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', context: 'Homepage program block' },
  { fromPage: '/', toPage: '/state-of-capture', label: 'State of Capture', labelGe: 'ხელში ჩაგდების მდგომარეობა', context: 'Homepage program block' },
  { fromPage: '/', toPage: '/rustaveli', label: 'Rustaveli Project', labelGe: 'რუსთაველის პროექტი', context: 'Homepage program block' },
  { fromPage: '/', toPage: '/about/mission', label: 'Read the Mission', labelGe: 'მისიის წაკითხვა', context: 'Homepage mission section' },
  
  // Justice hub CTAs
  { fromPage: '/justice', toPage: '/appeal', label: 'Make an Appeal', labelGe: 'მიმართვის გაკეთება', context: 'Justice page hero' },
  { fromPage: '/justice', toPage: '/appeal/harm', label: 'I Have Been Harmed', labelGe: 'მე დაზარალდი', context: 'Justice intake pathways' },
  { fromPage: '/justice', toPage: '/appeal/wrongdoing', label: 'I Witnessed Wrongdoing', labelGe: 'მე ვიყავი მოწმე', context: 'Justice intake pathways' },
  { fromPage: '/justice', toPage: '/appeal/inside', label: 'I Am Inside the System', labelGe: 'მე სისტემის შიგნით ვარ', context: 'Justice intake pathways' },
  { fromPage: '/justice', toPage: '/record/ledger', label: 'The Ledger', labelGe: 'რეესტრი', context: 'Justice record section' },
  { fromPage: '/justice', toPage: '/remedy', label: 'Remedy Pathways', labelGe: 'გამოსწორების გზები', context: 'Justice remedy section' },
  
  // Appeal page CTAs
  { fromPage: '/appeal', toPage: '/appeal/protections', label: 'Safety Information', labelGe: 'უსაფრთხოების ინფორმაცია', context: 'Appeal page safety banner' },
  { fromPage: '/appeal', toPage: '/appeal/how-handled', label: 'How We Handle Appeals', labelGe: 'როგორ ვმუშაობთ', context: 'Appeal process section' },
  
  // Remedy page CTAs
  { fromPage: '/remedy', toPage: '/remedy/sanctions', label: 'Sanctions', labelGe: 'სანქციები', context: 'Remedy pathways' },
  { fromPage: '/remedy', toPage: '/remedy/litigation', label: 'Strategic Litigation', labelGe: 'სტრატეგიული სამართალწარმოება', context: 'Remedy pathways' },
  { fromPage: '/remedy', toPage: '/remedy/criminal-dossiers', label: 'Criminal Dossiers', labelGe: 'სისხლის საქმეები', context: 'Remedy pathways' },
  { fromPage: '/remedy', toPage: '/remedy/iimg', label: 'IIM-Georgia', labelGe: 'IIM-საქართველო', context: 'Remedy IIMG section' },
  
  // About page CTAs  
  { fromPage: '/about', toPage: '/about/mission', label: 'Mission & Mandate', labelGe: 'მისია და მანდატი', context: 'About overview' },
  { fromPage: '/about', toPage: '/about/governance', label: 'Governance', labelGe: 'მმართველობა', context: 'About overview' },
  { fromPage: '/about', toPage: '/about/funding', label: 'Funding', labelGe: 'დაფინანსება', context: 'About overview' },
  { fromPage: '/about', toPage: '/about/civic-necessity', label: 'Civic Necessity', labelGe: 'სამოქალაქო აუცილებლობა', context: 'About foundations' },
  { fromPage: '/about', toPage: '/about/right-to-remedy', label: 'Right to Remedy', labelGe: 'გამოსწორების უფლება', context: 'About foundations' },
];
