/**
 * IntakeNavigation - Form navigation
 * 
 * Subtle, not pushy. Text-only buttons.
 * Continue appears when ready.
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useIntakeForm } from './IntakeFormContext';
import { IntakePauseButton } from './IntakePauseButton';

interface IntakeNavigationProps {
  className?: string;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export function IntakeNavigation({ 
  className, 
  onSubmit,
  isSubmitting = false,
}: IntakeNavigationProps) {
  const { isGeorgian } = useLanguage();
  const { state, nextStep, prevStep, canProceed } = useIntakeForm();
  const { currentStep, totalSteps } = state;
  
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className={cn("pt-12 mt-12 border-t border-navy/10", className)}>
      {/* Primary action row */}
      <div className="flex items-center justify-between">
        {/* Back - text only */}
        <div>
          {!isFirstStep && (
            <button
              type="button"
              onClick={prevStep}
              className={cn(
                "text-navy/50 hover:text-navy transition-colors text-base",
                isGeorgian && "font-georgian"
              )}
            >
              {isGeorgian ? 'უკან' : 'Back'}
            </button>
          )}
        </div>

        {/* Forward action */}
        <div>
          {isLastStep ? (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting}
              className={cn(
                "px-8 py-3 bg-navy text-white text-base transition-opacity",
                (!canProceed || isSubmitting) && "opacity-30 cursor-not-allowed",
                isGeorgian && "font-georgian"
              )}
            >
              {isSubmitting 
                ? (isGeorgian ? 'იგზავნება...' : 'Submitting...')
                : (isGeorgian ? 'გაგზავნა' : 'Submit')
              }
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed}
              className={cn(
                "px-8 py-3 bg-navy text-white text-base transition-opacity",
                !canProceed && "opacity-30 cursor-not-allowed",
                isGeorgian && "font-georgian"
              )}
            >
              {isGeorgian ? 'გაგრძელება' : 'Continue'}
            </button>
          )}
        </div>
      </div>

      {/* Pause option - separate, calm */}
      <div className="mt-8 text-center">
        <IntakePauseButton />
      </div>
    </div>
  );
}

export default IntakeNavigation;
