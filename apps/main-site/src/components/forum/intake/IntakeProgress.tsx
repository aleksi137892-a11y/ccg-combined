/**
 * IntakeProgress - Minimal progress indicator
 * 
 * Single horizontal line that fills. No numbers, no steps listed.
 * The user doesn't need to know there are 7 steps.
 */

import { useIntakeForm } from './IntakeFormContext';
import { cn } from '@/lib/utils';

interface IntakeProgressProps {
  className?: string;
}

export function IntakeProgress({ className }: IntakeProgressProps) {
  const { state } = useIntakeForm();
  const { currentStep, totalSteps } = state;
  
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div 
      className={cn("h-[2px] bg-navy/10 w-full", className)}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      <div 
        className="h-full bg-navy transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default IntakeProgress;
