/**
 * InsideIntake - Insider/Whistleblower Form
 * 
 * Enhanced protections. Clean. Deliberate.
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
} from '@/components/forum/intake';
import { Textarea } from '@/components/ui/textarea';

function YourPositionStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const actors = state.formData.actors || [];
  const position = actors[0] || { type: 'state' };

  const positionCategories = [
    { id: 'judicial', en: 'Judiciary', ge: 'სასამართლო' },
    { id: 'law_enforcement', en: 'Law Enforcement', ge: 'სამართალდამცავი' },
    { id: 'civil_service', en: 'Civil Service', ge: 'საჯარო სამსახური' },
    { id: 'private_connected', en: 'Private Sector (state-connected)', ge: 'კერძო სექტორი' },
    { id: 'other', en: 'Other', ge: 'სხვა' },
  ];

  const handleCategoryChange = (categoryId: string) => {
    updateFormData({ actors: [{ ...position, role: categoryId }] });
  };

  return (
    <IntakeStep
      stepKey="your_position"
      title="Your position"
      titleGe="თქვენი პოზიცია"
      subtitle="Select a category. We do not need your exact title."
      subtitleGe="აირჩიეთ კატეგორია. ზუსტი თანამდებობა არ გვჭირდება."
    >
      <div className="space-y-3">
        {positionCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "w-full text-left p-5 border transition-colors",
              position.role === cat.id
                ? "border-navy bg-navy/[0.02]"
                : "border-navy/10 hover:border-navy/30",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian ? cat.ge : cat.en}
          </button>
        ))}
      </div>
    </IntakeStep>
  );
}

function WhatYouKnowStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const narrative = state.formData.narrative || '';

  return (
    <IntakeStep
      stepKey="what_you_know"
      title="What do you know?"
      titleGe="რა იცით?"
      subtitle="Describe the misconduct or abuse you have knowledge of."
      subtitleGe="აღწერეთ გადაცდომა ან ძალადობა, რომლის შესახებაც გაქვთ ცოდნა."
    >
      <Textarea
        value={narrative}
        onChange={(e) => updateFormData({ narrative: e.target.value })}
        placeholder={isGeorgian ? "მოგვიყევით..." : "Tell us..."}
        className={cn(
          "min-h-[240px] text-base leading-relaxed resize-none",
          "border-0 border-b border-navy/10 rounded-none px-0",
          "focus-visible:ring-0 placeholder:text-navy/30",
          isGeorgian && "font-georgian"
        )}
      />
    </IntakeStep>
  );
}

function EvidenceTypeStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const evidenceDescription = state.formData.evidenceDescription || '';

  const evidenceTypes = [
    { id: 'documents', en: 'Official documents', ge: 'ოფიციალური დოკუმენტები' },
    { id: 'communications', en: 'Internal communications', ge: 'შიდა კომუნიკაცია' },
    { id: 'financial', en: 'Financial records', ge: 'ფინანსური ჩანაწერები' },
    { id: 'orders', en: 'Written orders', ge: 'წერილობითი ბრძანებები' },
    { id: 'testimony', en: 'My testimony only', ge: 'მხოლოდ ჩემი ჩვენება' },
  ];

  const selectedTypes = evidenceDescription?.split(',').filter(Boolean) || [];

  const toggleType = (id: string) => {
    const current = selectedTypes;
    const updated = current.includes(id)
      ? current.filter(t => t !== id)
      : [...current, id];
    updateFormData({ 
      evidenceDescription: updated.join(','),
      hasEvidence: updated.length > 0 && !updated.includes('testimony'),
    });
  };

  return (
    <IntakeStep
      stepKey="evidence_type"
      title="What evidence do you have?"
      titleGe="რა მტკიცებულება გაქვთ?"
    >
      <div className="space-y-3">
        {evidenceTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => toggleType(type.id)}
            className={cn(
              "w-full text-left p-5 border transition-colors flex justify-between items-center",
              selectedTypes.includes(type.id)
                ? "border-navy bg-navy/[0.02]"
                : "border-navy/10 hover:border-navy/30",
              isGeorgian && "font-georgian"
            )}
          >
            <span>{isGeorgian ? type.ge : type.en}</span>
            {selectedTypes.includes(type.id) && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </IntakeStep>
  );
}

function ProtectionNeedsStep() {
  const { isGeorgian } = useLanguage();
  const { state, updateFormData } = useIntakeForm();
  const actors = state.formData.actors || [{ type: 'state' }];
  const protectionNeeds = (actors[0] as any)?.protectionNeeds || {};

  const updateProtection = (key: string, value: boolean) => {
    updateFormData({
      actors: [{
        ...actors[0],
        protectionNeeds: { ...protectionNeeds, [key]: value },
      }],
    });
  };

  const protectionOptions = [
    { id: 'identity', en: 'Full identity protection', ge: 'სრული ვინაობის დაცვა' },
    { id: 'family', en: 'Protection for family members', ge: 'ოჯახის წევრების დაცვა' },
    { id: 'employment', en: 'Employment must not be disclosed', ge: 'დასაქმება არ უნდა გამჟღავნდეს' },
  ];

  return (
    <IntakeStep
      stepKey="protection_needs"
      title="Protection needs"
      titleGe="დაცვის საჭიროებები"
      subtitle="Select all that apply."
      subtitleGe="აირჩიეთ ყველა, რომელიც გეხება."
    >
      <div className="space-y-3">
        {protectionOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => updateProtection(option.id, !protectionNeeds[option.id])}
            className={cn(
              "w-full text-left p-5 border transition-colors flex justify-between items-center",
              protectionNeeds[option.id]
                ? "border-navy bg-navy/[0.02]"
                : "border-navy/10 hover:border-navy/30",
              isGeorgian && "font-georgian"
            )}
          >
            <span>{isGeorgian ? option.ge : option.en}</span>
            {protectionNeeds[option.id] && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
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
            {isGeorgian ? 'თქვენი გამჟღავნება' : 'Your disclosure'}
          </span>
          <p className="text-sm text-navy/70 line-clamp-3">{formData.narrative || '—'}</p>
        </div>
        
        <p className="text-sm text-navy/50 pt-4">
          {isGeorgian 
            ? 'თქვენი გამჟღავნება განიხილება დაცული ანგარიშის სტანდარტებით.'
            : 'Your disclosure will be handled under protected reporting standards.'}
        </p>
      </div>
    </IntakeStep>
  );
}

function InsideIntakeContent() {
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
          {isGeorgian ? 'გამჟღავნება მიღებულია' : 'Disclosure received'}
        </h2>
        <p className="text-navy/50 mb-8">
          {isGeorgian ? 'დაცულად.' : 'Securely.'}
        </p>
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
    <YourPositionStep key="0" />,
    <WhatYouKnowStep key="1" />,
    <EvidenceTypeStep key="2" />,
    <ProtectionNeedsStep key="3" />,
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

export default function InsideIntake() {
  return (
    <Layout>
      <article className="min-h-screen bg-white">
        <div className="h-[2px] bg-navy" />
        <div className="py-12 md:py-20">
          <IntakeFormProvider pathway="inside">
            <InsideIntakeContent />
          </IntakeFormProvider>
        </div>
      </article>
    </Layout>
  );
}
