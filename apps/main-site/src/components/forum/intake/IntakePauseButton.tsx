/**
 * IntakePauseButton - Psychosocial off-ramp
 * 
 * Human language. Visible. Calm.
 * No icons. No animation.
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useIntakeForm } from './IntakeFormContext';

interface IntakePauseButtonProps {
  className?: string;
}

const supportResources = [
  {
    name: 'Signal',
    nameGe: 'Signal',
    contact: 'CCG.95',
    url: 'https://signal.me/#eu/s5fLOAXoBqChwY13U_LhOvqcWDBfPfsjBe0suqv0yOYYfNDDz5FOuoyedcUkFrfO',
  },
  {
    name: 'Physicians for Human Rights',
    nameGe: 'ექიმები ადამიანის უფლებებისთვის',
    url: 'https://phr.org/',
  },
];

export function IntakePauseButton({ className }: IntakePauseButtonProps) {
  const { isGeorgian } = useLanguage();
  const { pauseAndSave } = useIntakeForm();
  
  const [isPaused, setIsPaused] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePause = async () => {
    setIsGenerating(true);
    try {
      const phrase = await pauseAndSave();
      setRecoveryPhrase(phrase);
      setIsPaused(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (recoveryPhrase) {
      await navigator.clipboard.writeText(recoveryPhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Paused state: Full-screen calm
  if (isPaused && recoveryPhrase) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-white flex items-center justify-center p-8"
      >
        <div className="max-w-md w-full">
          {/* Calm header */}
          <div className="text-center mb-12">
            <h2 className={cn(
              "font-serif text-2xl text-navy mb-4",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'თქვენი პროგრესი შენახულია' : 'Your progress is saved'}
            </h2>
            <p className={cn(
              "text-navy/50",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? 'დაისვენეთ. თქვენ შეგიძლიათ დაბრუნება 72 საათის განმავლობაში.'
                : 'Take your time. You can return within 72 hours.'}
            </p>
          </div>

          {/* Recovery phrase */}
          <div className="mb-12 py-8 border-t border-b border-navy/10 text-center">
            <p className={cn(
              "text-xs uppercase tracking-widest text-navy/40 mb-4",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'თქვენი აღდგენის ფრაზა' : 'Your recovery phrase'}
            </p>
            <p className="font-mono text-lg text-navy tracking-wide mb-6">
              {recoveryPhrase}
            </p>
            <button
              onClick={handleCopy}
              className="text-sm text-navy/50 hover:text-navy underline"
            >
              {copied 
                ? (isGeorgian ? 'კოპირებულია' : 'Copied')
                : (isGeorgian ? 'კოპირება' : 'Copy')
              }
            </button>
          </div>

          {/* Instructions */}
          <p className={cn(
            "text-sm text-navy/50 text-center mb-12",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian 
              ? 'ჩაწერეთ ეს ფრაზა. როდესაც მზად იქნებით, შეიყვანეთ ფორმის აღსადგენად.'
              : 'Write this phrase down. When ready, enter it to restore your form.'}
          </p>

          {/* Support resources - plain links */}
          <div className="text-center">
            <p className={cn(
              "text-xs uppercase tracking-widest text-navy/40 mb-4",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian ? 'მხარდაჭერა' : 'Support'}
            </p>
            <div className="space-y-2">
              {supportResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block text-sm text-navy/60 hover:text-navy underline",
                    isGeorgian && "font-georgian"
                  )}
                >
                  {isGeorgian ? resource.nameGe : resource.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Normal state: Simple text link
  return (
    <button
      type="button"
      onClick={handlePause}
      disabled={isGenerating}
      className={cn(
        "text-sm text-navy/40 hover:text-navy/60 transition-colors",
        className,
        isGeorgian && "font-georgian"
      )}
    >
      {isGenerating 
        ? (isGeorgian ? 'ინახება...' : 'Saving...')
        : (isGeorgian ? 'შესვენება მჭირდება' : 'I need a break')
      }
    </button>
  );
}

export default IntakePauseButton;
