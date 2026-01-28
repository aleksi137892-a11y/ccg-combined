/**
 * ConsentMatrix - Granular consent selection
 * 
 * Plain white cards. No colors. No icons.
 * Selected state is clear without decoration.
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useIntakeForm, ConsentSettings } from './IntakeFormContext';

interface ConsentOption {
  id: keyof ConsentSettings;
  label: string;
  labelGe: string;
  description: string;
  descriptionGe: string;
  required?: boolean;
}

const consentOptions: ConsentOption[] = [
  {
    id: 'internal_archive',
    label: 'Internal Archive',
    labelGe: 'შიდა არქივი',
    description: 'Keep my identity protected. Count my case in aggregate statistics.',
    descriptionGe: 'დაიცავი ჩემი ვინაობა. ჩათვალე ჩემი საქმე აგრეგირებულ სტატისტიკაში.',
    required: true,
  },
  {
    id: 'legal_referral',
    label: 'Legal Referral',
    labelGe: 'იურიდიული მიმართვა',
    description: 'Share with international courts or prosecutors if relevant to accountability proceedings.',
    descriptionGe: 'გაუზიარე საერთაშორისო სასამართლოებს ან პროკურორებს, თუ რელევანტურია ანგარიშვალდებულების პროცესებისთვის.',
  },
  {
    id: 'public_record',
    label: 'Public Record',
    labelGe: 'საჯარო ჩანაწერი',
    description: 'Publish my account in the Ledger. I understand this creates a permanent public record.',
    descriptionGe: 'გამოაქვეყნე ჩემი ანგარიში რეესტრში. მე მესმის, რომ ეს ქმნის მუდმივ საჯარო ჩანაწერს.',
  },
];

interface ConsentMatrixProps {
  className?: string;
}

export function ConsentMatrix({ className }: ConsentMatrixProps) {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const consent = state.formData.consent || {
    internal_archive: true,
    legal_referral: false,
    public_record: false,
  };

  const handleConsentChange = (id: keyof ConsentSettings) => {
    // Cannot uncheck required consent
    if (id === 'internal_archive') return;
    
    updateFormData({
      consent: {
        ...consent,
        [id]: !consent[id],
        consent_timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {consentOptions.map((option) => {
        const isSelected = consent[option.id] === true;
        
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleConsentChange(option.id)}
            disabled={option.required}
            className={cn(
              "w-full text-left p-6 border transition-colors",
              isSelected 
                ? "border-navy bg-navy/[0.02]" 
                : "border-navy/10 hover:border-navy/30",
              option.required && "cursor-default"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className={cn(
                  "text-base text-navy mb-1",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian ? option.labelGe : option.label}
                  {option.required && (
                    <span className="ml-2 text-xs text-navy/40">
                      {isGeorgian ? '(სავალდებულო)' : '(required)'}
                    </span>
                  )}
                </p>
                <p className={cn(
                  "text-sm text-navy/50",
                  isGeorgian && "font-georgian"
                )}>
                  {isGeorgian ? option.descriptionGe : option.description}
                </p>
              </div>
              
              {/* Simple checkmark - no box */}
              <div className={cn(
                "w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5",
                isSelected ? "text-navy" : "text-transparent"
              )}>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </button>
        );
      })}

      {/* Warning for public record - plain text, no colored box */}
      {consent.public_record && (
        <p className={cn(
          "text-sm text-navy/50 pt-4 border-t border-navy/10",
          isGeorgian && "font-georgian"
        )}>
          {isGeorgian 
            ? 'თქვენ აირჩიეთ საჯარო გამოქვეყნება. გთხოვთ დარწმუნდეთ, რომ გაითვალისწინეთ შედეგები თქვენთვის და თქვენი ოჯახისთვის.'
            : 'You have chosen public publication. Please ensure you have considered consequences for yourself and your family.'}
        </p>
      )}
    </div>
  );
}

export default ConsentMatrix;
