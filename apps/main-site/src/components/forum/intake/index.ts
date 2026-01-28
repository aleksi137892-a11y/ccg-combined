/**
 * Forum Intake Components
 * 
 * Multi-step form infrastructure for Forum for Justice appeals.
 * Implements UN Res 60/147 remedy menu, granular consent per OHCHR,
 * and Istanbul Protocol psychosocial off-ramp.
 */

export { IntakeFormProvider, useIntakeForm, PATHWAY_STEPS } from './IntakeFormContext';
export type { 
  IntakePathway, 
  RemedyType, 
  ConsentSettings, 
  ActorInfo, 
  DateRange, 
  IntakeFormData,
  IntakeFormState,
} from './IntakeFormContext';

export { IntakeStep } from './IntakeStep';
export { IntakeProgress } from './IntakeProgress';
export { IntakePauseButton } from './IntakePauseButton';
export { IntakeNavigation } from './IntakeNavigation';
export { ConsentMatrix } from './ConsentMatrix';
export { RemedyMenu } from './RemedyMenu';
