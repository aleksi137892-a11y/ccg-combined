/**
 * WrongdoingIntake - Witness Appeal Form
 * 
 * Clean. Deliberate. No decoration.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  IntakeFormProvider, 
  useIntakeForm,
  IntakeStep,
  IntakeProgress,
  IntakeNavigation,
  RemedyMenu,
  ConsentMatrix,
  ActorInfo,
} from '@/components/forum/intake';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function WhatWitnessedStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const narrative = state.formData.narrative || '';

  return (
    <IntakeStep
      stepKey="what_witnessed"
      title="What did you witness?"
      titleGe="რისი მოწმე გახდით?"
      subtitle="Describe what you saw or learned about."
      subtitleGe="აღწერეთ რა ნახეთ ან შეიტყვეთ."
    >
      <Textarea
        value={narrative}
        onChange={(e) => updateFormData({ narrative: e.target.value })}
        placeholder={isGeorgian ? "მოგვიყევით..." : "Tell us..."}
        className={cn(
          "min-h-[240px] text-base leading-relaxed resize-none",
          "border-0 border-b border-navy/10 rounded-none px-0",
          "focus-visible:ring-0 focus-visible:border-navy/30",
          "placeholder:text-navy/30",
          isGeorgian && "font-georgian"
        )}
      />
    </IntakeStep>
  );
}

function WhenWhereStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const dateRange = state.formData.dateRange || { ongoing: false };
  const location = state.formData.location || '';

  return (
    <IntakeStep
      stepKey="when_where"
      title="When and where?"
      titleGe="როდის და სად?"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="text-xs text-navy/40 block mb-2">
              {isGeorgian ? 'დაწყება' : 'Start'}
            </span>
            <Input
              type="date"
              value={dateRange.start || ''}
              onChange={(e) => updateFormData({ 
                dateRange: { ...dateRange, start: e.target.value } 
              })}
              className="border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0"
            />
          </div>
          <div>
            <span className="text-xs text-navy/40 block mb-2">
              {isGeorgian ? 'დასასრული' : 'End'}
            </span>
            <Input
              type="date"
              value={dateRange.end || ''}
              onChange={(e) => updateFormData({ 
                dateRange: { ...dateRange, end: e.target.value } 
              })}
              className="border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm text-navy/50 mb-3 block">
            {isGeorgian ? 'სად მოხდა?' : 'Where?'}
          </Label>
          <Input
            value={location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder={isGeorgian ? 'ადგილმდებარეობა' : 'Location'}
            className="border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0 placeholder:text-navy/30"
          />
        </div>
      </div>
    </IntakeStep>
  );
}

function WhoInvolvedStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const actors = state.formData.actors || [];

  const addActor = () => {
    updateFormData({ actors: [...actors, { type: 'unknown' }] });
  };

  const updateActor = (index: number, updates: Partial<ActorInfo>) => {
    const newActors = [...actors];
    newActors[index] = { ...newActors[index], ...updates };
    updateFormData({ actors: newActors });
  };

  const removeActor = (index: number) => {
    updateFormData({ actors: actors.filter((_, i) => i !== index) });
  };

  return (
    <IntakeStep
      stepKey="who_involved"
      title="Who was involved?"
      titleGe="ვინ იყო ჩართული?"
    >
      <div className="space-y-6">
        {actors.map((actor, index) => (
          <div key={index} className="pb-6 border-b border-navy/10">
            <div className="flex justify-between mb-4">
              <span className="text-xs text-navy/40 uppercase tracking-wider">
                {isGeorgian ? `პირი ${index + 1}` : `Person ${index + 1}`}
              </span>
              <button type="button" onClick={() => removeActor(index)} className="text-sm text-navy/40 hover:text-navy">
                {isGeorgian ? 'წაშლა' : 'Remove'}
              </button>
            </div>
            <Input
              value={actor.name || ''}
              onChange={(e) => updateActor(index, { name: e.target.value })}
              placeholder={isGeorgian ? 'სახელი ან პოზიცია' : 'Name or position'}
              className="border-0 border-b border-navy/10 rounded-none px-0 mb-3 focus-visible:ring-0 placeholder:text-navy/30"
            />
            <Textarea
              value={actor.description || ''}
              onChange={(e) => updateActor(index, { description: e.target.value })}
              placeholder={isGeorgian ? 'მათი როლი' : 'Their role'}
              className="min-h-[60px] resize-none border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0 placeholder:text-navy/30"
            />
          </div>
        ))}
        
        <button
          type="button"
          onClick={addActor}
          className="w-full p-4 text-center text-sm text-navy/50 border border-dashed border-navy/20 hover:border-navy/40"
        >
          {isGeorgian ? 'პირის დამატება' : 'Add person'}
        </button>
      </div>
    </IntakeStep>
  );
}

function EvidenceStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const hasEvidence = state.formData.hasEvidence || false;
  const evidenceDescription = state.formData.evidenceDescription || '';

  return (
    <IntakeStep
      stepKey="evidence"
      title="Do you have evidence?"
      titleGe="გაქვთ მტკიცებულება?"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ hasEvidence: true })}
            className={cn(
              "p-5 text-left border",
              hasEvidence ? "border-navy bg-navy/[0.02]" : "border-navy/10 hover:border-navy/30"
            )}
          >
            {isGeorgian ? 'დიახ' : 'Yes'}
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ hasEvidence: false })}
            className={cn(
              "p-5 text-left border",
              !hasEvidence ? "border-navy bg-navy/[0.02]" : "border-navy/10 hover:border-navy/30"
            )}
          >
            {isGeorgian ? 'არა' : 'No'}
          </button>
        </div>
        
        {hasEvidence && (
          <Textarea
            value={evidenceDescription}
            onChange={(e) => updateFormData({ evidenceDescription: e.target.value })}
            placeholder={isGeorgian ? 'აღწერეთ...' : 'Describe...'}
            className="min-h-[120px] resize-none border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0 placeholder:text-navy/30"
          />
        )}
      </div>
    </IntakeStep>
  );
}

function DesiredOutcomeStep() {
  return (
    <IntakeStep
      stepKey="desired_outcome"
      title="What outcome do you seek?"
      titleGe="რა შედეგს ეძებთ?"
    >
      <RemedyMenu />
    </IntakeStep>
  );
}

function ConsentStep() {
  return (
    <IntakeStep
      stepKey="consent"
      title="Who may see your information?"
      titleGe="ვინ შეიძლება ნახოს თქვენი ინფორმაცია?"
    >
      <ConsentMatrix />
    </IntakeStep>
  );
}

function ReviewStep() {
  const { isGeorgian } = useLanguage();
  const { state } = useIntakeForm();
  const { formData } = state;

  return (
    <IntakeStep
      stepKey="review"
      title="Review"
      titleGe="მიმოხილვა"
    >
      <div className="space-y-4">
        <div className="pb-4 border-b border-navy/10">
          <span className="text-xs text-navy/40 uppercase tracking-wider block mb-2">
            {isGeorgian ? 'თქვენი ანგარიში' : 'Your account'}
          </span>
          <p className="text-sm text-navy/70 line-clamp-3">{formData.narrative || '—'}</p>
        </div>
        
        <p className="text-sm text-navy/50 pt-4">
          {isGeorgian 
            ? 'წარდგენით ადასტურებთ ინფორმაციის სიზუსტეს.'
            : 'By submitting, you confirm the accuracy of this information.'}
        </p>
      </div>
    </IntakeStep>
  );
}

function WrongdoingIntakeContent() {
  const { isGeorgian } = useLanguage();
  const navigate = useNavigate();
  const { state, submit } = useIntakeForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submit();
      if (result.success) setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center">
        <h2 className="font-serif text-2xl text-navy mb-4">
          {isGeorgian ? 'მოწმობა მიღებულია' : 'Report received'}
        </h2>
        <button
          onClick={() => navigate(isGeorgian ? '/ge/justice' : '/justice')}
          className="text-sm text-navy underline"
        >
          {isGeorgian ? 'დაბრუნება' : 'Return'}
        </button>
      </div>
    );
  }

  const stepComponents = [
    <WhatWitnessedStep key="0" />,
    <WhenWhereStep key="1" />,
    <WhoInvolvedStep key="2" />,
    <EvidenceStep key="3" />,
    <DesiredOutcomeStep key="4" />,
    <ConsentStep key="5" />,
    <ReviewStep key="6" />,
  ];

  return (
    <div className="max-w-xl mx-auto px-6">
      <IntakeProgress className="mb-8" />
      {stepComponents[state.currentStep]}
      <IntakeNavigation onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

export default function WrongdoingIntake() {
  return (
    <Layout>
      <article className="min-h-screen bg-white">
        <div className="h-[2px] bg-navy" />
        <div className="py-12 md:py-20">
          <IntakeFormProvider pathway="wrongdoing">
            <WrongdoingIntakeContent />
          </IntakeFormProvider>
        </div>
      </article>
    </Layout>
  );
}
