/**
 * IntakeFormContext - Multi-step form state management for Forum intake
 * 
 * Provides centralized state for all three intake pathways (harm, wrongdoing, inside),
 * with automatic draft saving and recovery phrase generation.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// =============================================================================
// TYPES
// =============================================================================

export type IntakePathway = 'harm' | 'wrongdoing' | 'inside';

export type RemedyType = 
  | 'restitution'    // "I want my job/property back"
  | 'compensation'   // "I need financial damages"
  | 'rehabilitation' // "I need medical/psychological care"
  | 'satisfaction'   // "I want truth published and apology"
  | 'guarantees';    // "I want the law changed"

export interface ConsentSettings {
  internal_archive: boolean;
  legal_referral: boolean;
  public_record: boolean;
  consent_timestamp?: string;
}

export interface ActorInfo {
  type: 'state' | 'agent' | 'private' | 'unknown';
  name?: string;
  role?: string;
  description?: string;
}

export interface DateRange {
  start?: string;
  end?: string;
  ongoing: boolean;
  approximate?: boolean;
}

export interface IntakeFormData {
  // Step 1: What happened
  narrative: string;
  
  // Step 2: When and where
  dateRange: DateRange;
  location: string;
  locationDetails?: string;
  
  // Step 3: Who caused this
  actors: ActorInfo[];
  
  // Step 4: Evidence (optional)
  hasEvidence: boolean;
  evidenceDescription?: string;
  evidenceFiles?: string[]; // File references
  
  // Step 5: Remedy Menu
  remediesSought: RemedyType[];
  remedyDetails?: Record<RemedyType, string>;
  
  // Step 6: Consent
  consent: ConsentSettings;
  
  // Metadata
  contactInfo?: string;
  preferredContact?: 'email' | 'signal' | 'protonmail' | 'none';
}

export interface IntakeFormState {
  pathway: IntakePathway;
  currentStep: number;
  totalSteps: number;
  formData: Partial<IntakeFormData>;
  isDraft: boolean;
  isPaused: boolean;
  recoveryPhrase?: string;
  sessionId?: string;
}

interface IntakeFormContextValue {
  state: IntakeFormState;
  
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  
  // Data updates
  updateFormData: (updates: Partial<IntakeFormData>) => void;
  
  // Pause/Save
  pauseAndSave: () => Promise<string>; // Returns recovery phrase
  resumeFromPhrase: (phrase: string) => Promise<boolean>;
  clearDraft: () => void;
  
  // Submission
  submit: () => Promise<{ success: boolean; id?: string; error?: string }>;
  
  // Validation
  isStepValid: (step: number) => boolean;
  canProceed: boolean;
}

// =============================================================================
// CONTEXT
// =============================================================================

const IntakeFormContext = createContext<IntakeFormContextValue | undefined>(undefined);
IntakeFormContext.displayName = 'IntakeFormContext';

// =============================================================================
// BIP39 WORD LIST (Subset for recovery phrases)
// =============================================================================

const WORD_LIST = [
  'ocean', 'timber', 'crystal', 'garden', 'flame', 'shelter', 'bridge', 'mountain',
  'river', 'forest', 'meadow', 'canyon', 'desert', 'island', 'valley', 'summit',
  'horizon', 'compass', 'anchor', 'beacon', 'harbor', 'voyage', 'journey', 'pathway',
  'gateway', 'threshold', 'lantern', 'mirror', 'window', 'doorway', 'archive', 'witness',
  'justice', 'remedy', 'refuge', 'sanctuary', 'haven', 'shelter', 'fortress', 'bastion',
  'guardian', 'sentinel', 'watcher', 'keeper', 'steward', 'advocate', 'defender', 'protector',
  'memory', 'record', 'chronicle', 'testament', 'evidence', 'truth', 'dignity', 'courage',
  'resolve', 'strength', 'wisdom', 'clarity', 'purpose', 'mission', 'mandate', 'charter',
];

function generateRecoveryPhrase(): string {
  const words: string[] = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    words.push(WORD_LIST[randomIndex]);
  }
  return words.join(' ');
}

// =============================================================================
// STEP CONFIGURATION
// =============================================================================

const PATHWAY_STEPS: Record<IntakePathway, string[]> = {
  harm: [
    'what_happened',
    'when_where',
    'who_caused',
    'evidence',
    'remedy_menu',
    'consent',
    'review',
  ],
  wrongdoing: [
    'what_witnessed',
    'when_where',
    'who_involved',
    'evidence',
    'desired_outcome',
    'consent',
    'review',
  ],
  inside: [
    'your_position',
    'what_you_know',
    'evidence_type',
    'protection_needs',
    'desired_outcome',
    'consent',
    'review',
  ],
};

// =============================================================================
// PROVIDER
// =============================================================================

interface IntakeFormProviderProps {
  children: React.ReactNode;
  pathway: IntakePathway;
}

export function IntakeFormProvider({ children, pathway }: IntakeFormProviderProps) {
  const { language } = useLanguage();
  
  const steps = PATHWAY_STEPS[pathway];
  
  const [state, setState] = useState<IntakeFormState>(() => ({
    pathway,
    currentStep: 0,
    totalSteps: steps.length,
    formData: {
      narrative: '',
      dateRange: { ongoing: false },
      location: '',
      actors: [],
      hasEvidence: false,
      remediesSought: [],
      consent: {
        internal_archive: true, // Required by default
        legal_referral: false,
        public_record: false,
      },
    },
    isDraft: false,
    isPaused: false,
  }));

  // Auto-save to localStorage
  useEffect(() => {
    const key = `forum_intake_draft_${pathway}`;
    localStorage.setItem(key, JSON.stringify(state.formData));
  }, [state.formData, pathway]);

  // Load draft on mount
  useEffect(() => {
    const key = `forum_intake_draft_${pathway}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          formData: { ...prev.formData, ...parsed },
          isDraft: true,
        }));
      } catch {
        // Invalid saved data, ignore
      }
    }
  }, [pathway]);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, prev.totalSteps - 1)),
    }));
  }, []);

  const updateFormData = useCallback((updates: Partial<IntakeFormData>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }, []);

  const pauseAndSave = useCallback(async (): Promise<string> => {
    const phrase = generateRecoveryPhrase();
    const sessionId = crypto.randomUUID();
    
    // In production, this would call a Supabase edge function to:
    // 1. Hash the phrase with SHA-256
    // 2. Encrypt the form data with AES-256
    // 3. Store in draft_sessions table
    
    // For now, store in localStorage with the phrase as key
    const draftData = {
      pathway,
      formData: state.formData,
      currentStep: state.currentStep,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 72 hours
    };
    
    localStorage.setItem(`forum_draft_${phrase.replace(/\s/g, '_')}`, JSON.stringify(draftData));
    
    setState(prev => ({
      ...prev,
      isPaused: true,
      recoveryPhrase: phrase,
      sessionId,
    }));
    
    return phrase;
  }, [pathway, state.formData, state.currentStep]);

  const resumeFromPhrase = useCallback(async (phrase: string): Promise<boolean> => {
    const key = `forum_draft_${phrase.replace(/\s/g, '_')}`;
    const saved = localStorage.getItem(key);
    
    if (!saved) {
      return false;
    }
    
    try {
      const draftData = JSON.parse(saved);
      
      // Check expiry
      if (new Date(draftData.expiresAt) < new Date()) {
        localStorage.removeItem(key);
        return false;
      }
      
      setState(prev => ({
        ...prev,
        formData: draftData.formData,
        currentStep: draftData.currentStep,
        isDraft: true,
        isPaused: false,
        recoveryPhrase: undefined,
      }));
      
      // Clean up the stored draft
      localStorage.removeItem(key);
      
      return true;
    } catch {
      return false;
    }
  }, []);

  const clearDraft = useCallback(() => {
    const key = `forum_intake_draft_${pathway}`;
    localStorage.removeItem(key);
    setState(prev => ({
      ...prev,
      formData: {
        narrative: '',
        dateRange: { ongoing: false },
        location: '',
        actors: [],
        hasEvidence: false,
        remediesSought: [],
        consent: {
          internal_archive: true,
          legal_referral: false,
          public_record: false,
        },
      },
      currentStep: 0,
      isDraft: false,
    }));
  }, [pathway]);

  const isStepValid = useCallback((step: number): boolean => {
    const { formData } = state;
    const stepName = steps[step];
    
    switch (stepName) {
      case 'what_happened':
      case 'what_witnessed':
      case 'what_you_know':
        return Boolean(formData.narrative && formData.narrative.length >= 20);
        
      case 'when_where':
        return Boolean(formData.location);
        
      case 'who_caused':
      case 'who_involved':
        return Boolean(formData.actors && formData.actors.length > 0);
        
      case 'your_position':
        // Insider pathway: position is encoded in actors
        return Boolean(formData.actors && formData.actors.length > 0);
        
      case 'evidence':
      case 'evidence_type':
        return true; // Optional step
        
      case 'protection_needs':
        return true; // Optional step
        
      case 'remedy_menu':
      case 'desired_outcome':
        return Boolean(formData.remediesSought && formData.remediesSought.length > 0);
        
      case 'consent':
        return formData.consent?.internal_archive === true;
        
      case 'review':
        return true;
        
      default:
        return true;
    }
  }, [state, steps]);

  const canProceed = useMemo(() => {
    return isStepValid(state.currentStep);
  }, [isStepValid, state.currentStep]);

  const submit = useCallback(async (): Promise<{ success: boolean; id?: string; error?: string }> => {
    const { formData } = state;
    
    // Compute SHA-256 hash of the submission
    const submissionData = JSON.stringify({
      ...formData,
      submittedAt: new Date().toISOString(),
      language,
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(submissionData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // In production, this would call a Supabase edge function
    // For now, log and return success
    console.log('Forum Appeal Submission:', {
      pathway,
      formData,
      sha256_hash: hashHex,
    });
    
    // Clear draft after successful submission
    clearDraft();
    
    return {
      success: true,
      id: crypto.randomUUID(),
    };
  }, [state, pathway, language, clearDraft]);

  const value: IntakeFormContextValue = useMemo(() => ({
    state,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    pauseAndSave,
    resumeFromPhrase,
    clearDraft,
    submit,
    isStepValid,
    canProceed,
  }), [
    state,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    pauseAndSave,
    resumeFromPhrase,
    clearDraft,
    submit,
    isStepValid,
    canProceed,
  ]);

  return (
    <IntakeFormContext.Provider value={value}>
      {children}
    </IntakeFormContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useIntakeForm() {
  const context = useContext(IntakeFormContext);
  if (context === undefined) {
    throw new Error('useIntakeForm must be used within an IntakeFormProvider');
  }
  return context;
}

export { PATHWAY_STEPS };
