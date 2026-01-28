import React from 'react';
import { ExternalLink, Building2, User, Landmark, AlertTriangle } from 'lucide-react';
import { ComplicityEntity } from '@/types/complicityIndex';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComplicityEntityCardProps {
  entity: ComplicityEntity;
}

const formatGel = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)}B GEL`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M GEL`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}K GEL`;
  }
  return `${amount.toLocaleString()} GEL`;
};

const EntityTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'individual':
      return <User className="h-4 w-4" />;
    case 'company':
      return <Building2 className="h-4 w-4" />;
    case 'institution':
      return <Landmark className="h-4 w-4" />;
    default:
      return null;
  }
};

const SeverityBadge: React.FC<{ severity: string }> = ({ severity }) => {
  const colors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-sans uppercase tracking-wider border ${
        colors[severity as keyof typeof colors] || colors.low
      }`}
    >
      {severity}
    </span>
  );
};

const ComplicityEntityCard: React.FC<ComplicityEntityCardProps> = ({ entity }) => {
  const { isGeorgian } = useLanguage();
  const displayName = isGeorgian && entity.name_ge ? entity.name_ge : entity.name;

  return (
    <div className="py-6 space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-navy/50">
          <EntityTypeIcon type={entity.entity_type} />
          <span className="text-sm font-sans capitalize">{entity.entity_type}</span>
        </div>
        <SeverityBadge severity={entity.severity} />
      </div>

      {/* Position & Organization */}
      {(entity.position || entity.organization) && (
        <div className="text-sm text-navy/70 font-sans">
          {entity.position && <span>{entity.position}</span>}
          {entity.position && entity.organization && <span> · </span>}
          {entity.organization && <span>{entity.organization}</span>}
        </div>
      )}

      {/* Financial data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-navy/10">
        {/* Donations */}
        <div>
          <h4 className="text-xs font-sans uppercase tracking-wider text-navy/50 mb-2">
            {isGeorgian ? 'პოლიტიკური დაფინანსება' : 'Political Finance'}
          </h4>
          <p className="font-serif text-lg text-navy">
            {formatGel(entity.total_donations_gel)}
          </p>
          {entity.donation_recipients?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {entity.donation_recipients.slice(0, 3).map((d, i) => (
                <li key={i} className="text-sm text-navy/60 font-sans">
                  {d.party} ({d.year}): {formatGel(d.amount)}
                </li>
              ))}
              {entity.donation_recipients.length > 3 && (
                <li className="text-sm text-navy/40 font-sans italic">
                  +{entity.donation_recipients.length - 3} more
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Procurement */}
        <div>
          <h4 className="text-xs font-sans uppercase tracking-wider text-navy/50 mb-2">
            {isGeorgian ? 'სახელმწიფო შესყიდვები' : 'State Procurement'}
          </h4>
          <p className="font-serif text-lg text-navy">
            {formatGel(entity.total_procurement_gel)}
          </p>
          {entity.procurement_contracts?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {entity.procurement_contracts.slice(0, 3).map((c, i) => (
                <li key={i} className="text-sm text-navy/60 font-sans">
                  {c.agency} ({c.year}): {formatGel(c.amount)}
                </li>
              ))}
              {entity.procurement_contracts.length > 3 && (
                <li className="text-sm text-navy/40 font-sans italic">
                  +{entity.procurement_contracts.length - 3} more
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Beneficial Owner */}
      {entity.beneficial_owner && (
        <div>
          <h4 className="text-xs font-sans uppercase tracking-wider text-navy/50 mb-1">
            {isGeorgian ? 'ბენეფიციარი მესაკუთრე' : 'Beneficial Owner'}
          </h4>
          <p className="text-sm font-sans text-navy">
            {entity.beneficial_owner}
            {entity.beneficial_owner_verified && (
              <span className="ml-2 text-green-600 text-xs">(Verified)</span>
            )}
          </p>
        </div>
      )}

      {/* Allegations */}
      {entity.allegations?.length > 0 && (
        <div>
          <h4 className="text-xs font-sans uppercase tracking-wider text-navy/50 mb-2 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {isGeorgian ? 'ბრალდებები' : 'Allegations'}
          </h4>
          <ul className="space-y-2">
            {entity.allegations.map((allegation, i) => (
              <li key={i} className="text-sm text-navy/70 font-sans">
                <span className="font-medium capitalize">
                  {allegation.type.replace(/_/g, ' ')}:
                </span>{' '}
                {allegation.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sources */}
      {entity.sources?.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-sans uppercase tracking-wider text-navy/50 mb-2">
            {isGeorgian ? 'წყაროები' : 'Sources'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {entity.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-navy/60 hover:text-navy underline underline-offset-2 font-sans"
              >
                {source.title}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {entity.notes && (
        <p className="text-sm text-navy/50 font-serif italic pt-2 border-t border-navy/10">
          {entity.notes}
        </p>
      )}
    </div>
  );
};

export default ComplicityEntityCard;
