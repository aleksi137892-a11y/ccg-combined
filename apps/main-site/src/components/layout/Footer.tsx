import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ExpandableSearch } from '@/components/ExpandableSearch';
import BrandWordmark from '@/components/ui/brand-wordmark';
// ============================================================================
// FOOTER DATA STRUCTURE
// ============================================================================

const FOOTER_DATA = {
  actionStrip: {
    primary: {
      label: 'Make an Appeal',
      labelGe: 'მიმართვის გაკეთება',
      href: '/appeal'
    },
    secondary: [
      {
        label: 'Forum for Justice',
        labelGe: 'სამართლიანობის ფორუმი',
        href: '/justice'
      },
      {
        label: 'Protections & Safety',
        labelGe: 'დაცვა და უსაფრთხოება',
        href: '/appeal/protections'
      },
      {
        label: 'Read Our Mission',
        labelGe: 'მისიის წაკითხვა',
        href: '/about/mission'
      }
    ],
    link: {
      label: 'Report an Error',
      labelGe: 'შეცდომის მოხსენება',
      href: '/record/registry/reply-corrections'
    },
    safetyNote: {
      en: 'If you are at risk, do not email sensitive material. Use Secure Channel.',
      ge: 'თუ რისკის ქვეშ ხართ, არ გაგზავნოთ სენსიტიური მასალა ელფოსტით. გამოიყენეთ უსაფრთხო არხი.'
    }
  },
  trustBar: [
    { label: 'Standards', labelGe: 'სტანდარტები', href: '/standards' },
    { label: 'Confidence Labels', labelGe: 'სანდოობის ეტიკეტები', href: '/standards#confidence-labels' },
    { label: 'Right of Reply', labelGe: 'პასუხის უფლება', href: '/record/registry/reply-corrections' },
    { label: 'Corrections Log', labelGe: 'შესწორებების ჟურნალი', href: '/record/registry/reply-corrections#corrections' },
    { label: 'Funding & Independence', labelGe: 'დაფინანსება და დამოუკიდებლობა', href: '/about/funding' },
    { label: 'Safety', labelGe: 'უსაფრთხოება', href: '/appeal/protections' },
    { label: 'Source Protection', labelGe: 'წყაროს დაცვა', href: '/appeal/protections#source-protection' }
  ],
  mainColumns: [
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
        { label: 'Evidence Library', labelGe: 'მტკიცებულებების ბიბლიოთეკა', href: '/state-of-capture/methods' },
        { label: 'Investigations', labelGe: 'გამოძიებები', href: '/state-of-capture' },
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
        { label: 'Heritage & Language', labelGe: 'მემკვიდრეობა და ენა', href: '/rustaveli' },
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
  ],
  institutionalStatement: {
    en: 'The Civic Council of Georgia operates as an independent, nonpartisan institution. CCG is not a court of law and does not provide legal counsel. All published materials serve accountability and public-interest documentation purposes, subject to published standards, corrections, and the right of reply. CCG accepts no funding from foreign governments.',
    ge: 'საქართველოს სამოქალაქო საბჭო მოქმედებს როგორც დამოუკიდებელი, არაპარტიული ინსტიტუცია. CCG არ არის სასამართლო და არ იძლევა იურიდიულ კონსულტაციას. ყველა გამოქვეყნებული მასალა ემსახურება ანგარიშვალდებულებასა და საზოგადოებრივი ინტერესის დოკუმენტაციას, გამოქვეყნებული სტანდარტების, შესწორებებისა და პასუხის უფლების შესაბამისად. CCG არ იღებს დაფინანსებას უცხო მთავრობებისგან.'
  },
  administrationStatement: {
    en: "Administered by Civic Council of Georgia, Inc., a U.S. 501(c)(3) nonprofit organization serving as the institutional steward for CCG's affiliated programs and initiatives worldwide.",
    ge: 'ადმინისტრირებულია Civic Council of Georgia, Inc.-ის მიერ, აშშ-ს 501(c)(3) არაკომერციული ორგანიზაცია, რომელიც წარმოადგენს ინსტიტუციურ სტიუარდს CCG-ს აფილირებული პროგრამებისა და ინიციატივებისთვის მსოფლიოში.'
  },
  legalLinks: [
    { label: 'Privacy Policy', labelGe: 'კონფიდენციალურობის პოლიტიკა', href: '/privacy' },
    { label: 'Terms of Use', labelGe: 'მოხმარების პირობები', href: '/terms' },
    { label: 'Cookie Policy', labelGe: 'ქუქი-ფაილების პოლიტიკა', href: '/cookies' },
    { label: 'Accessibility', labelGe: 'ხელმისაწვდომობა', href: '/accessibility' },
    { label: 'Report an Issue', labelGe: 'პრობლემის შეტყობინება', href: '/report-error' },
    { label: 'Site Map', labelGe: 'საიტის რუკა', href: '/sitemap' }
  ],
  copyright: {
    en: '© Civic Council of Georgia, Inc. All rights reserved.',
    ge: '© Civic Council of Georgia, Inc. ყველა უფლება დაცულია.'
  }
};

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const [mobileAccordionValue, setMobileAccordionValue] = useState<string>('');

  const getLabel = (item: { label: string; labelGe: string }) => 
    language === 'en' ? item.label : item.labelGe;

  const getHeading = (item: { heading: string; headingGe: string }) => 
    language === 'en' ? item.heading : item.headingGe;

  const getText = (item: { en: string; ge: string }) => 
    language === 'en' ? item.en : item.ge;

  return (
    <footer className="bg-navy text-white">
      {/* ================================================================== */}
      {/* A) ACTION STRIP */}
      {/* ================================================================== */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
            {/* Primary CTA */}
            <Link
              to={FOOTER_DATA.actionStrip.primary.href}
              className={cn(
                'inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium',
                'bg-white text-navy rounded-sm',
                'hover:bg-white/90 transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                language === 'ge' ? 'font-georgian' : ''
              )}
            >
              {getLabel(FOOTER_DATA.actionStrip.primary)}
            </Link>

            {/* Secondary CTAs */}
            {FOOTER_DATA.actionStrip.secondary.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className={cn(
                  'inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium',
                  'border border-white/30 rounded-sm',
                  'text-white/90 hover:text-white hover:border-white/50 hover:bg-white/10 transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                  language === 'ge' ? 'font-georgian' : ''
                )}
              >
                {getLabel(item)}
              </Link>
            ))}

            {/* Text link */}
            <Link
              to={FOOTER_DATA.actionStrip.link.href}
              className={cn(
                'text-sm text-white/60 hover:text-white/80 underline underline-offset-2 transition-colors',
                language === 'ge' ? 'font-georgian' : ''
              )}
            >
              {getLabel(FOOTER_DATA.actionStrip.link)}
            </Link>
          </div>

          {/* Safety note */}
          <p className={cn(
            'text-center text-xs text-white/50',
            language === 'ge' ? 'font-georgian' : ''
          )}>
            {getText(FOOTER_DATA.actionStrip.safetyNote)}
          </p>
        </div>
      </div>

      {/* ================================================================== */}
      {/* B) TRUST BAR */}
      {/* ================================================================== */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-xs">
            {FOOTER_DATA.trustBar.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="text-white/20 hidden sm:inline">|</span>
                )}
                <Link
                  to={item.href}
                  className={cn(
                    'relative px-2 py-1 text-white/60 hover:text-white/80 transition-colors',
                    'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-px after:bg-white/40',
                    'after:scale-x-0 after:origin-right after:transition-transform after:duration-300',
                    'hover:after:scale-x-100 hover:after:origin-left',
                    language === 'ge' ? 'font-georgian' : ''
                  )}
                >
                  {getLabel(item)}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* C) MAIN GRID */}
      {/* ================================================================== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Desktop Grid (lg+): 6 main columns */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-6 xl:gap-8">
          {FOOTER_DATA.mainColumns.map((column, colIdx) => (
            <div key={colIdx} className="space-y-3">
              <h3 className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50 pb-1 border-b border-white/10',
                language === 'ge' ? 'font-georgian' : ''
              )}>
                {getHeading(column)}
              </h3>
              <ul className="space-y-1.5">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className={cn(
                        'relative text-[12px] text-white/70 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/50',
                        'after:scale-x-0 after:origin-right after:transition-transform after:duration-300',
                        'hover:after:scale-x-100 hover:after:origin-left',
                        language === 'ge' ? 'font-georgian' : ''
                      )}
                    >
                      {getLabel(link)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tablet Grid (md) */}
        <div className="hidden md:grid md:grid-cols-3 lg:hidden gap-x-6 gap-y-8">
          {FOOTER_DATA.mainColumns.map((column, colIdx) => (
            <div key={colIdx} className="space-y-3">
              <h3 className={cn(
                'text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50 pb-1 border-b border-white/10',
                language === 'ge' ? 'font-georgian' : ''
              )}>
                {getHeading(column)}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className={cn(
                        'relative text-sm text-white/70 hover:text-white transition-colors',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/50',
                        'after:scale-x-0 after:origin-right after:transition-transform after:duration-300',
                        'hover:after:scale-x-100 hover:after:origin-left',
                        language === 'ge' ? 'font-georgian' : ''
                      )}
                    >
                      {getLabel(link)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden">
          <Accordion
            type="single"
            collapsible
            value={mobileAccordionValue}
            onValueChange={setMobileAccordionValue}
            className="space-y-0"
          >
            {FOOTER_DATA.mainColumns.map((column, colIdx) => (
              <AccordionItem
                key={colIdx}
                value={`column-${colIdx}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className={cn(
                  'py-3 text-sm font-medium text-white/80 hover:text-white hover:no-underline',
                  '[&[data-state=open]>svg]:rotate-180',
                  language === 'ge' ? 'font-georgian' : ''
                )}>
                  {getHeading(column)}
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <ul className="space-y-2">
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          to={link.href}
                          className={cn(
                            'relative text-sm text-white/60 hover:text-white transition-colors',
                            'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/50',
                            'after:scale-x-0 after:origin-right after:transition-transform after:duration-300',
                            'hover:after:scale-x-100 hover:after:origin-left',
                            language === 'ge' ? 'font-georgian' : ''
                          )}
                        >
                          {getLabel(link)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* ================================================================== */}
      {/* D) BOTTOM SECTION: Disclaimers & Legal */}
      {/* ================================================================== */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">

          {/* Two-column layout: Disclaimers left, Legal right */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Left: Institutional Statements */}
            <div className="lg:w-[50%] space-y-3">
              <p className={cn(
                'text-[11px] leading-relaxed text-white/50',
                language === 'ge' ? 'font-georgian' : ''
              )}>
                {language === 'ge' ? (
                  getText(FOOTER_DATA.institutionalStatement)
                ) : (
                  <>
                    <BrandWordmark variant="cream" size="sm" className="inline" /> operates as an independent, nonpartisan institution. CCG is not a court of law and does not provide legal counsel. All published materials serve accountability and public-interest documentation purposes, subject to published standards, corrections, and the right of reply. CCG accepts no funding from foreign governments.
                  </>
                )}
              </p>
              
              <p className={cn(
                'text-[11px] leading-relaxed text-white/35',
                language === 'ge' ? 'font-georgian' : ''
              )}>
                {language === 'ge' ? (
                  getText(FOOTER_DATA.administrationStatement)
                ) : (
                  <>
                    Administered by <BrandWordmark variant="cream" size="sm" className="inline" />, Inc., a U.S. 501(c)(3) nonprofit organization serving as the institutional steward for CCG's affiliated programs and initiatives worldwide.
                  </>
                )}
              </p>
            </div>

            {/* Right: Search above Legal Links - stacked vertically */}
            <div className="lg:w-[50%] flex flex-col items-end gap-2">
              {/* Expandable Search */}
              <ExpandableSearch position="footer" />
              
              {/* Legal Links */}
              <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 justify-end">
                {FOOTER_DATA.legalLinks.map((link, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && (
                      <span className="text-white/20">|</span>
                    )}
                    <li>
                      <Link
                        to={link.href}
                        className={cn(
                          'relative px-1 text-[11px] text-white/50 hover:text-white/60 transition-colors',
                          'after:absolute after:bottom-0 after:left-1 after:right-1 after:h-px after:bg-white/40',
                          'after:scale-x-0 after:origin-right after:transition-transform after:duration-300',
                          'hover:after:scale-x-100 hover:after:origin-left',
                          language === 'ge' ? 'font-georgian' : ''
                        )}
                      >
                        {getLabel(link)}
                      </Link>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
