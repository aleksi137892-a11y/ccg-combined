/**
 * HarmIntake - Direct Victim Appeal Form
 * 
 * Clean. Deliberate. No decoration.
 * Each step is a complete moment.
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

// =============================================================================
// STEP COMPONENTS - No icons, minimal UI
// =============================================================================

function WhatHappenedStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const narrative = state.formData.narrative || '';

  return (
    <IntakeStep
      stepKey="what_happened"
      title="What happened to you?"
      titleGe="რა მოგივიდათ?"
      subtitle="Describe the harm you experienced. We are looking for facts."
      subtitleGe="აღწერეთ თქვენი გამოცდილი ზიანი. ჩვენ ვეძებთ ფაქტებს."
    >
      <Textarea
        value={narrative}
        onChange={(e) => updateFormData({ narrative: e.target.value })}
        placeholder={isGeorgian 
          ? "მოგვიყევით თქვენი ისტორია..."
          : "Tell us your story..."}
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
      subtitle="Help us place your experience in time and space."
      subtitleGe="დაგვეხმარეთ თქვენი გამოცდილების დროსა და სივრცეში განთავსებაში."
    >
      <div className="space-y-8">
        {/* When */}
        <div>
          <Label className={cn(
            "text-sm text-navy/50 mb-3 block",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? 'როდის მოხდა?' : 'When did this happen?'}
          </Label>
          
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
                disabled={dateRange.ongoing}
                className="border-0 border-b border-navy/10 rounded-none px-0 focus-visible:ring-0"
              />
            </div>
          </div>
          
          <label className="flex items-center gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={dateRange.ongoing}
              onChange={(e) => updateFormData({ 
                dateRange: { ...dateRange, ongoing: e.target.checked, end: undefined } 
              })}
              className="w-4 h-4 border-navy/30 rounded-none"
            />
            <span className={cn(
              "text-sm text-navy/60",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'მიმდინარეა' : 'Ongoing'}
            </span>
          </label>
        </div>

        {/* Where */}
        <div>
          <Label className={cn(
            "text-sm text-navy/50 mb-3 block",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? 'სად მოხდა?' : 'Where did this happen?'}
          </Label>
          <Input
            value={location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder={isGeorgian ? 'ქალაქი, რეგიონი, ადგილი' : 'City, region, location'}
            className={cn(
              "border-0 border-b border-navy/10 rounded-none px-0",
              "focus-visible:ring-0 focus-visible:border-navy/30",
              "placeholder:text-navy/30",
              isGeorgian && "font-georgian"
            )}
          />
        </div>
      </div>
    </IntakeStep>
  );
}

function WhoCausedStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const actors = state.formData.actors || [];

  const addActor = () => {
    updateFormData({
      actors: [...actors, { type: 'unknown' }],
    });
  };

  const updateActor = (index: number, updates: Partial<ActorInfo>) => {
    const newActors = [...actors];
    newActors[index] = { ...newActors[index], ...updates };
    updateFormData({ actors: newActors });
  };

  const removeActor = (index: number) => {
    updateFormData({
      actors: actors.filter((_, i) => i !== index),
    });
  };

  const actorTypes = [
    { value: 'state', en: 'State Official', ge: 'სახელმწიფო თანამდებობის პირი' },
    { value: 'agent', en: 'Agent of State', ge: 'სახელმწიფოს აგენტი' },
    { value: 'private', en: 'Private Actor', ge: 'კერძო აქტორი' },
    { value: 'unknown', en: 'Unknown', ge: 'უცნობი' },
  ];

  return (
    <IntakeStep
      stepKey="who_caused"
      title="Who caused this?"
      titleGe="ვინ გამოიწვია ეს?"
      subtitle="Identify those responsible to the best of your knowledge."
      subtitleGe="დაადგინეთ პასუხისმგებელი პირები თქვენი ცოდნის მიხედვით."
    >
      <div className="space-y-6">
        {actors.map((actor, index) => (
          <div key={index} className="pb-6 border-b border-navy/10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-navy/40 uppercase tracking-wider">
                {isGeorgian ? `პირი ${index + 1}` : `Person ${index + 1}`}
              </span>
              <button
                type="button"
                onClick={() => removeActor(index)}
                className="text-sm text-navy/40 hover:text-navy"
              >
                {isGeorgian ? 'წაშლა' : 'Remove'}
              </button>
            </div>
            
            {/* Type selection */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {actorTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateActor(index, { type: type.value as ActorInfo['type'] })}
                  className={cn(
                    "p-3 text-left text-sm border transition-colors",
                    actor.type === type.value
                      ? "border-navy bg-navy/[0.02]"
                      : "border-navy/10 hover:border-navy/30",
                    isGeorgian && "font-georgian"
                  )}
                >
                  {isGeorgian ? type.ge : type.en}
                </button>
              ))}
            </div>
            
            {/* Name/description */}
            <Input
              value={actor.name || ''}
              onChange={(e) => updateActor(index, { name: e.target.value })}
              placeholder={isGeorgian ? 'სახელი ან თანამდებობა (თუ ცნობილია)' : 'Name or position (if known)'}
              className={cn(
                "border-0 border-b border-navy/10 rounded-none px-0 mb-3",
                "focus-visible:ring-0 placeholder:text-navy/30",
                isGeorgian && "font-georgian"
              )}
            />
            <Textarea
              value={actor.description || ''}
              onChange={(e) => updateActor(index, { description: e.target.value })}
              placeholder={isGeorgian ? 'მათი როლი' : 'Their role in what happened'}
              className={cn(
                "min-h-[60px] resize-none border-0 border-b border-navy/10 rounded-none px-0",
                "focus-visible:ring-0 placeholder:text-navy/30",
                isGeorgian && "font-georgian"
              )}
            />
          </div>
        ))}
        
        <button
          type="button"
          onClick={addActor}
          className={cn(
            "w-full p-4 text-center text-sm text-navy/50 border border-dashed border-navy/20 hover:border-navy/40 transition-colors",
            isGeorgian && "font-georgian"
          )}
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
      subtitle="This is optional. You can submit without evidence."
      subtitleGe="ეს არჩევითია. შეგიძლიათ წარადგინოთ მტკიცებულების გარეშე."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ hasEvidence: true })}
            className={cn(
              "p-5 text-left border transition-colors",
              hasEvidence 
                ? "border-navy bg-navy/[0.02]" 
                : "border-navy/10 hover:border-navy/30",
              isGeorgian && "font-georgian"
            )}
          >
            <span className="text-base text-navy">
              {isGeorgian ? 'დიახ' : 'Yes'}
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => updateFormData({ hasEvidence: false, evidenceDescription: '' })}
            className={cn(
              "p-5 text-left border transition-colors",
              !hasEvidence 
                ? "border-navy bg-navy/[0.02]" 
                : "border-navy/10 hover:border-navy/30",
              isGeorgian && "font-georgian"
            )}
          >
            <span className="text-base text-navy">
              {isGeorgian ? 'არა' : 'No'}
            </span>
          </button>
        </div>
        
        {hasEvidence && (
          <Textarea
            value={evidenceDescription}
            onChange={(e) => updateFormData({ evidenceDescription: e.target.value })}
            placeholder={isGeorgian 
              ? 'აღწერეთ თქვენი მტკიცებულება...'
              : 'Describe your evidence...'}
            className={cn(
              "min-h-[120px] resize-none border-0 border-b border-navy/10 rounded-none px-0",
              "focus-visible:ring-0 placeholder:text-navy/30",
              isGeorgian && "font-georgian"
            )}
          />
        )}
      </div>
    </IntakeStep>
  );
}

function RemedyMenuStep() {
  return (
    <IntakeStep
      stepKey="remedy_menu"
      title="What outcome do you seek?"
      titleGe="რა შედეგს ეძებთ?"
      subtitle="Tell us what you want to happen."
      subtitleGe="გვითხარით რა გსურთ რომ მოხდეს."
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
      subtitle="You control how your case is used."
      subtitleGe="თქვენ აკონტროლებთ როგორ გამოიყენება თქვენი საქმე."
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
      subtitle="Please verify before submitting."
      subtitleGe="გთხოვთ გადაამოწმოთ წარდგენამდე."
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="space-y-4">
          <div className="pb-4 border-b border-navy/10">
            <span className="text-xs text-navy/40 uppercase tracking-wider block mb-2">
              {isGeorgian ? 'თქვენი ისტორია' : 'Your account'}
            </span>
            <p className="text-sm text-navy/70 line-clamp-3">
              {formData.narrative || '—'}
            </p>
          </div>
          
          <div className="pb-4 border-b border-navy/10">
            <span className="text-xs text-navy/40 uppercase tracking-wider block mb-2">
              {isGeorgian ? 'ადგილმდებარეობა' : 'Location'}
            </span>
            <p className="text-sm text-navy/70">
              {formData.location || '—'}
            </p>
          </div>
          
          <div className="pb-4 border-b border-navy/10">
            <span className="text-xs text-navy/40 uppercase tracking-wider block mb-2">
              {isGeorgian ? 'მოთხოვნილი შედეგები' : 'Outcomes sought'}
            </span>
            <p className="text-sm text-navy/70">
              {formData.remediesSought?.join(', ') || '—'}
            </p>
          </div>
        </div>
        
        {/* Disclaimer */}
        <p className={cn(
          "text-sm text-navy/50 pt-4",
          isGeorgian && "font-georgian"
        )}>
          {isGeorgian 
            ? 'წარდგენით თქვენ ადასტურებთ, რომ მოწოდებული ინფორმაცია ზუსტია თქვენი საუკეთესო ცოდნით.'
            : 'By submitting, you confirm the information provided is accurate to the best of your knowledge.'}
        </p>
      </div>
    </IntakeStep>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function HarmIntakeContent() {
  const { isGeorgian } = useLanguage();
  const navigate = useNavigate();
  const { state, submit } = useIntakeForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submit();
      if (result.success) {
        setSubmitSuccess(true);
        setSubmissionId(result.id || null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state - clean, no animation
  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center">
        <h2 className={cn(
          "font-serif text-2xl text-navy mb-4",
          isGeorgian && "font-georgian"
        )}>
          {isGeorgian ? 'მიმართვა მიღებულია' : 'Appeal received'}
        </h2>
        <p className={cn(
          "text-navy/50 mb-8",
          isGeorgian && "font-georgian"
        )}>
          {isGeorgian 
            ? 'თქვენი მიმართვა განიხილება.'
            : 'Your appeal will be reviewed.'}
        </p>
        {submissionId && (
          <p className="text-xs text-navy/30 font-mono mb-8">
            {submissionId}
          </p>
        )}
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
    <WhatHappenedStep key="0" />,
    <WhenWhereStep key="1" />,
    <WhoCausedStep key="2" />,
    <EvidenceStep key="3" />,
    <RemedyMenuStep key="4" />,
    <ConsentStep key="5" />,
    <ReviewStep key="6" />,
  ];

  return (
    <div className="max-w-xl mx-auto px-6">
      {/* Minimal progress bar at top */}
      <IntakeProgress className="mb-8" />
      
      {stepComponents[state.currentStep]}
      
      <IntakeNavigation 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default function HarmIntake() {
  const { isGeorgian } = useLanguage();

  return (
    <Layout>
      <article className="min-h-screen bg-white">
        {/* Minimal header - just a line */}
        <div className="h-[2px] bg-navy" />
        
        <div className="py-12 md:py-20">
          <IntakeFormProvider pathway="harm">
            <HarmIntakeContent />
          </IntakeFormProvider>
        </div>
      </article>
    </Layout>
  );
}
