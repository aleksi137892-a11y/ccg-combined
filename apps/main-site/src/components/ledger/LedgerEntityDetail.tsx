import { ExternalLink, Building2, User, FileText, AlertTriangle, Scale, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { LedgerStatusBadge } from './LedgerStatusBadge';
import { INCLUSION_REASON_LABELS, INCLUSION_REASON_DESCRIPTIONS } from '@/types/complicityLedger';
import { useRelatedEntities } from '@/hooks/useRelatedEntities';
import type { LedgerEntity, InclusionReason } from '@/types/complicityLedger';

interface LedgerEntityDetailProps {
  entity: LedgerEntity;
}

function formatGel(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `₾${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `₾${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `₾${(amount / 1_000).toFixed(0)}K`;
  }
  return `₾${amount.toLocaleString()}`;
}

// Boilerplate content by entity type
const entryBoilerplate = {
  company: {
    en: 'This company is documented in this ledger because its financial or commercial relationships intersect with a regime under international scrutiny. Inclusion is not accusation. It is the civic record of relationships that citizens, investors, and regulators have the right to know.',
    ge: 'ეს კომპანია დოკუმენტირებულია ამ რეესტრში, რადგან მისი ფინანსური ან კომერციული ურთიერთობები იკვეთება საერთაშორისო ყურადღების ქვეშ მყოფ რეჟიმთან. ჩართვა არ არის ბრალდება. ეს არის ურთიერთობების სამოქალაქო ჩანაწერი, რომლის ცოდნის უფლებაც აქვთ მოქალაქეებს, ინვესტორებს და მარეგულირებლებს.',
  },
  individual: {
    en: 'This individual is documented in this ledger because of their documented role in or financial relationship with a regime under international scrutiny. Documentation is not judgment. It is the preservation of facts for accountability.',
    ge: 'ეს პირი დოკუმენტირებულია ამ რეესტრში მათი დოკუმენტირებული როლის ან ფინანსური ურთიერთობის გამო საერთაშორისო ყურადღების ქვეშ მყოფ რეჟიმთან. დოკუმენტაცია არ არის განსჯა. ეს არის ფაქტების შენარჩუნება ანგარიშვალდებულებისთვის.',
  },
  institution: {
    en: 'This institution is documented in this ledger because its operations intersect with a regime under international scrutiny. Institutional accountability begins with institutional transparency.',
    ge: 'ეს ინსტიტუცია დოკუმენტირებულია ამ რეესტრში, რადგან მისი ოპერაციები იკვეთება საერთაშორისო ყურადღების ქვეშ მყოფ რეჟიმთან. ინსტიტუციური ანგარიშვალდებულება იწყება ინსტიტუციური გამჭვირვალობით.',
  },
};

const responsibilityFooter = {
  en: {
    heading: 'On Responsibility',
    body: 'Commercial relationships are choices. In contexts of institutional capture, the question extends beyond legality to moral agency: those who enable violations share in the violation; those who could prevent harm but choose not to bear responsibility. This ledger does not assign guilt—that is the work of courts. It establishes the factual substrate upon which citizens, investors, historians, and future institutions may make their own judgments.',
  },
  ge: {
    heading: 'პასუხისმგებლობის შესახებ',
    body: 'კომერციული ურთიერთობები არჩევანია. ინსტიტუციური ხელში ჩაგდების კონტექსტში, საკითხი სცდება კანონიერებას მორალურ მოქმედებამდე: ისინი, ვინც დარღვევებს შესაძლებელს ხდიან, იზიარებენ დარღვევას; ისინი, ვისაც შეეძლო ზიანის თავიდან აცილება, მაგრამ ამჯობინეს არჩევანი, პასუხისმგებლობას იზიარებენ. ეს რეესტრი დანაშაულს არ ანიჭებს—ეს სასამართლოების საქმეა. ის ადგენს ფაქტობრივ სუბსტრატს, რომელზეც მოქალაქეებმა, ინვესტორებმა, ისტორიკოსებმა და მომავალმა ინსტიტუციებმა საკუთარი განსჯა უნდა გააკეთონ.',
  },
};

const sanctionsCallout = {
  en: 'This entity has been designated by international bodies or Ukraine\'s National Agency on Corruption Prevention. Sanctions designation carries legal consequences distinct from civic documentation.',
  ge: 'ეს სუბიექტი დადგენილია საერთაშორისო ორგანოების ან უკრაინის კორუფციის პრევენციის ეროვნული სააგენტოს მიერ. სანქციების დანიშვნას აქვს სამართლებრივი შედეგები, განსხვავებული სამოქალაქო დოკუმენტაციისგან.',
};

export function LedgerEntityDetail({ entity }: LedgerEntityDetailProps) {
  const { isGeorgian } = useLanguage();
  const hasDonations = (entity.total_donations_gel ?? 0) > 0;
  const hasProcurement = (entity.total_procurement_gel ?? 0) > 0;
  const hasOwner = entity.beneficial_owner || entity.beneficial_owner_english;

  // Fetch related entities from Supabase
  const { relatedEntities, loading: relatedLoading } = useRelatedEntities({
    entityId: entity.id,
    beneficialOwnerEnglish: entity.beneficial_owner_english,
    sector: entity.sector,
    limit: 5,
  });

  const displaySummary = isGeorgian && entity.profile_summary_ge 
    ? entity.profile_summary_ge 
    : entity.profile_summary;

  // Get boilerplate based on entity type
  const boilerplate = entryBoilerplate[entity.entity_type] || entryBoilerplate.company;
  const boilerplateText = isGeorgian ? boilerplate.ge : boilerplate.en;
  
  const footer = isGeorgian ? responsibilityFooter.ge : responsibilityFooter.en;
  const sanctionText = isGeorgian ? sanctionsCallout.ge : sanctionsCallout.en;

  const labels = {
    onThisEntry: isGeorgian ? 'ამ ჩანაწერის შესახებ' : 'On This Entry',
    profile: isGeorgian ? 'პროფილი' : 'Profile',
    entanglement: isGeorgian ? 'თანამონაწილეობის რეჟიმები' : 'Modes of Entanglement',
    beneficialOwner: isGeorgian ? 'ბენეფიციარი მფლობელი' : 'Beneficial Owner',
    verified: isGeorgian ? '(დადასტურებული)' : '(Verified)',
    donations: isGeorgian ? 'პოლიტიკური შემოწირულობები' : 'Political Donations',
    years: isGeorgian ? 'წლები' : 'Years',
    procurement: isGeorgian ? 'სახელმწიფო შესყიდვები' : 'State Procurement',
    contracts: isGeorgian ? 'კონტრაქტი' : 'contract',
    contractsPlural: isGeorgian ? 'კონტრაქტი' : 'contracts',
    status: isGeorgian ? 'სტატუსი' : 'Status',
    position: isGeorgian ? 'პოზიცია' : 'Position',
    sources: isGeorgian ? 'წყაროები' : 'Sources',
    notes: isGeorgian ? 'შენიშვნები' : 'Notes',
    sanctioned: isGeorgian ? 'სანქცირებული სუბიექტი' : 'Sanctioned Entity',
    related: isGeorgian ? 'მსგავსი ჩანაწერები' : 'See also',
  };

  return (
    <div className="border-t border-navy/10 pt-6 space-y-6">
      {/* On This Entry - Contextual Boilerplate */}
      <div className="bg-navy/[0.03] border-l-2 border-navy/20 p-4">
        <h4 className={cn(
          'text-xs font-sans uppercase tracking-wider text-navy/50 mb-2',
          isGeorgian && 'font-georgian'
        )}>
          {labels.onThisEntry}
        </h4>
        <p className={cn(
          'font-serif text-sm text-navy/70 leading-relaxed italic',
          isGeorgian && 'font-georgian'
        )}>
          {boilerplateText}
        </p>
      </div>

      {/* Profile Summary - Hero content */}
      {displaySummary && (
        <div>
          <h4 className={cn(
            'text-xs font-sans uppercase tracking-wider text-navy/40 mb-3',
            isGeorgian && 'font-georgian'
          )}>
            {labels.profile}
          </h4>
          <p className={cn(
            'font-serif text-lg text-navy leading-relaxed max-w-[60ch]',
            isGeorgian && entity.profile_summary_ge && 'font-georgian'
          )}>
            {displaySummary}
          </p>
        </div>
      )}

      {/* Modes of Entanglement - Explained */}
      {entity.inclusion_reasons && entity.inclusion_reasons.length > 0 && (
        <div>
          <h4 className={cn(
            'text-xs font-sans uppercase tracking-wider text-navy/40 mb-3',
            isGeorgian && 'font-georgian'
          )}>
            {labels.entanglement}
          </h4>
          <div className="space-y-2">
            {entity.inclusion_reasons.map((reason) => (
              <div key={reason} className="flex gap-2 items-start text-sm">
                <span className="text-navy/30 mt-0.5">—</span>
                <div className="text-navy/70">
                  <span className="font-sans font-medium text-navy">
                    {INCLUSION_REASON_LABELS[reason as InclusionReason]}:
                  </span>{' '}
                  <span className="font-serif">
                    {INCLUSION_REASON_DESCRIPTIONS[reason as InclusionReason]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Beneficial Owner */}
      {hasOwner && (
        <div className="flex items-start gap-3">
          <User className="h-4 w-4 text-navy/40 mt-0.5" />
          <div>
            <p className={cn(
              'text-xs font-sans uppercase tracking-wider text-navy/40 mb-1',
              isGeorgian && 'font-georgian'
            )}>
              {labels.beneficialOwner}
              {entity.beneficial_owner_verified && (
                <span className="ml-2 text-green-700">{labels.verified}</span>
              )}
            </p>
            <p className="font-serif text-navy">
              {entity.beneficial_owner_english || entity.beneficial_owner}
              {entity.beneficial_owner_english && entity.beneficial_owner && (
                <span className="text-navy/50 ml-2">({entity.beneficial_owner})</span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Financial Data Grid */}
      {(hasDonations || hasProcurement) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Donations */}
          {hasDonations && (
            <div className="border border-navy/10 p-4">
              <h4 className={cn(
                'text-xs font-sans uppercase tracking-wider text-navy/40 mb-3',
                isGeorgian && 'font-georgian'
              )}>
                {labels.donations}
              </h4>
              <p className="font-narrative text-2xl text-navy mb-1">
                {formatGel(entity.total_donations_gel)}
              </p>
              {entity.donation_years && (
                <p className={cn(
                  'text-sm font-sans text-navy/50',
                  isGeorgian && 'font-georgian'
                )}>
                  {labels.years}: {entity.donation_years}
                </p>
              )}
            </div>
          )}

          {/* Procurement */}
          {hasProcurement && (
            <div className="border border-navy/10 p-4">
              <h4 className={cn(
                'text-xs font-sans uppercase tracking-wider text-navy/40 mb-3',
                isGeorgian && 'font-georgian'
              )}>
                {labels.procurement}
              </h4>
              <p className="font-narrative text-2xl text-navy mb-1">
                {formatGel(entity.total_procurement_gel)}
              </p>
              {(entity.state_contracts_count ?? 0) > 0 && (
                <p className={cn(
                  'text-sm font-sans text-navy/50',
                  isGeorgian && 'font-georgian'
                )}>
                  {entity.state_contracts_count} {(entity.state_contracts_count ?? 0) !== 1 ? labels.contractsPlural : labels.contracts}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sanctioned Entity Callout */}
      {entity.is_sanctioned && (
        <div className="bg-red-50 border border-red-200 p-4">
          <div className="flex items-center gap-2 text-red-800 mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span className={cn(
              'text-sm font-sans font-medium uppercase tracking-wider',
              isGeorgian && 'font-georgian'
            )}>
              {labels.sanctioned}
            </span>
          </div>
          <p className={cn(
            'text-sm font-serif text-red-700/80 leading-relaxed',
            isGeorgian && 'font-georgian'
          )}>
            {sanctionText}
          </p>
        </div>
      )}

      {/* Status Badge */}
      <div>
        <h4 className={cn(
          'text-xs font-sans uppercase tracking-wider text-navy/40 mb-3',
          isGeorgian && 'font-georgian'
        )}>
          {labels.status}
        </h4>
        <LedgerStatusBadge 
          hasAllegations={entity.has_allegations} 
          allegationSummary={entity.allegation_summary}
        />
      </div>

      {/* Organization/Position if individual */}
      {entity.entity_type === 'individual' && entity.organization && (
        <div className="flex items-start gap-3">
          <Building2 className="h-4 w-4 text-navy/40 mt-0.5" />
          <div>
            <p className={cn(
              'text-xs font-sans uppercase tracking-wider text-navy/40 mb-1',
              isGeorgian && 'font-georgian'
            )}>
              {labels.position}
            </p>
            <p className="font-serif text-navy">
              {entity.position && `${entity.position}, `}{entity.organization}
            </p>
          </div>
        </div>
      )}

      {/* Sources */}
      {entity.sources && entity.sources.length > 0 && (
        <div>
          <h4 className={cn(
            'text-xs font-sans uppercase tracking-wider text-navy/40 mb-2',
            isGeorgian && 'font-georgian'
          )}>
            {labels.sources}
          </h4>
          <ul className="space-y-1">
            {entity.sources.map((source, i) => (
              <li key={i}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-sans text-navy/70 hover:text-navy flex items-center gap-1.5 group"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {source.title}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notes */}
      {entity.notes && (
        <div className="border-t border-navy/10 pt-4">
          <p className={cn(
            'text-xs font-sans uppercase tracking-wider text-navy/40 mb-2',
            isGeorgian && 'font-georgian'
          )}>
            {labels.notes}
          </p>
          <p className="text-sm font-serif text-navy/60 italic">
            {entity.notes}
          </p>
        </div>
      )}

      {/* Responsibility Framework Footer */}
      <div className="border-t border-navy/10 pt-6 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="h-4 w-4 text-navy/30" />
          <h4 className={cn(
            'text-xs font-sans uppercase tracking-wider text-navy/40',
            isGeorgian && 'font-georgian'
          )}>
            {footer.heading}
          </h4>
        </div>
        <p className={cn(
          'font-serif text-sm text-navy/50 leading-relaxed max-w-[70ch]',
          isGeorgian && 'font-georgian'
        )}>
          {footer.body}
        </p>
      </div>

      {/* Website */}
      {entity.website && (
        <div className="pt-2">
          <a
            href={entity.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans text-navy/50 hover:text-navy flex items-center gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {entity.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        </div>
      )}

      {/* Related Entities - Breadcrumb style */}
      {(relatedEntities.length > 0 || relatedLoading) && (
        <div className="border-t border-navy/10 pt-4 mt-4">
          <span className={cn(
            'text-xs font-sans text-navy/40 mr-2',
            isGeorgian && 'font-georgian'
          )}>
            {labels.related}:
          </span>
          {relatedLoading ? (
            <span className="text-xs font-sans text-navy/30 italic">…</span>
          ) : (
            <span className="text-xs font-sans text-navy/60">
              {relatedEntities.map((related, idx) => (
                <span key={related.id}>
                  {idx > 0 && <ChevronRight className="inline h-3 w-3 text-navy/30 mx-1" />}
                  <span className="hover:text-navy cursor-pointer">
                    {isGeorgian && related.name_ge ? related.name_ge : related.name}
                  </span>
                </span>
              ))}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
