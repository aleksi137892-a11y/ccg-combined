/**
 * RemedyMenu - UN Basic Principles remedy selection
 * 
 * Plain options. No icons. No chevrons.
 * Multi-select with simple checkmarks.
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useIntakeForm, RemedyType } from './IntakeFormContext';

interface RemedyOption {
  id: RemedyType;
  label: string;
  labelGe: string;
  description: string;
  descriptionGe: string;
}

const remedyOptions: RemedyOption[] = [
  {
    id: 'restitution',
    label: 'Restitution',
    labelGe: 'რესტიტუცია',
    description: 'I want my job, property, or status restored.',
    descriptionGe: 'მინდა ჩემი სამსახური, ქონება ან სტატუსი აღდგეს.',
  },
  {
    id: 'compensation',
    label: 'Compensation',
    labelGe: 'კომპენსაცია',
    description: 'I need financial damages for loss or injury.',
    descriptionGe: 'მჭირდება ფინანსური ზარალის ანაზღაურება.',
  },
  {
    id: 'rehabilitation',
    label: 'Rehabilitation',
    labelGe: 'რეაბილიტაცია',
    description: 'I need medical or psychological care.',
    descriptionGe: 'მჭირდება სამედიცინო ან ფსიქოლოგიური მოვლა.',
  },
  {
    id: 'satisfaction',
    label: 'Satisfaction',
    labelGe: 'სათანადობა',
    description: 'I want the truth published and an apology.',
    descriptionGe: 'მინდა სიმართლის გამოქვეყნება და ბოდიში.',
  },
  {
    id: 'guarantees',
    label: 'Guarantees of Non-Repetition',
    labelGe: 'არგანმეორების გარანტიები',
    description: 'I want systemic change so this stops happening.',
    descriptionGe: 'მინდა სისტემური ცვლილება, რომ ეს შეჩერდეს.',
  },
];

interface RemedyMenuProps {
  className?: string;
}

export function RemedyMenu({ className }: RemedyMenuProps) {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  
  const selectedRemedies = state.formData.remediesSought || [];
  const remedyDetails = state.formData.remedyDetails || {};

  const handleRemedyToggle = (id: RemedyType) => {
    const isSelected = selectedRemedies.includes(id);
    const newRemedies = isSelected
      ? selectedRemedies.filter(r => r !== id)
      : [...selectedRemedies, id];
    updateFormData({ remediesSought: newRemedies });
  };

  const handleDetailChange = (id: RemedyType, detail: string) => {
    updateFormData({
      remedyDetails: {
        ...remedyDetails,
        [id]: detail,
      },
    });
  };

  return (
    <div className={cn("", className)}>
      {/* Intro text */}
      <p className={cn(
        "text-sm text-navy/50 mb-8",
        isGeorgian && "font-georgian"
      )}>
        {isGeorgian 
          ? 'აირჩიეთ ყველა, რომელიც გეხება.'
          : 'Select all that apply.'}
      </p>

      {/* Options */}
      <div className="space-y-3">
        {remedyOptions.map((option) => {
          const isSelected = selectedRemedies.includes(option.id);
          
          return (
            <div key={option.id}>
              <button
                type="button"
                onClick={() => handleRemedyToggle(option.id)}
                className={cn(
                  "w-full text-left p-5 border transition-colors",
                  isSelected 
                    ? "border-navy bg-navy/[0.02]" 
                    : "border-navy/10 hover:border-navy/30"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className={cn(
                      "text-base text-navy",
                      isGeorgian && "font-georgian"
                    )}>
                      {isGeorgian ? option.labelGe : option.label}
                    </p>
                    <p className={cn(
                      "text-sm text-navy/50 mt-1",
                      isGeorgian && "font-georgian"
                    )}>
                      {isGeorgian ? option.descriptionGe : option.description}
                    </p>
                  </div>
                  
                  {/* Simple checkmark */}
                  <div className={cn(
                    "w-5 h-5 flex items-center justify-center flex-shrink-0",
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

              {/* Detail input when selected */}
              {isSelected && (
                <div className="mt-2 ml-5 mr-5">
                  <Textarea
                    value={remedyDetails[option.id] || ''}
                    onChange={(e) => handleDetailChange(option.id, e.target.value)}
                    placeholder={isGeorgian 
                      ? 'დამატებითი დეტალები (არჩევითი)'
                      : 'Additional details (optional)'}
                    className={cn(
                      "min-h-[60px] resize-none border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-navy/30 text-sm",
                      isGeorgian && "font-georgian"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RemedyMenu;
