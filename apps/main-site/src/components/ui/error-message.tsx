/**
 * ErrorMessage - Error display component
 * 
 * No decorative icons. Clear cause and remedy.
 */

import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type ErrorType = 'network' | 'not-found' | 'permission' | 'validation' | 'server' | 'generic';

interface ErrorMessageProps {
  type?: ErrorType;
  title?: string;
  titleGe?: string;
  cause?: string;
  causeGe?: string;
  remedy?: string;
  remedyGe?: string;
  onRetry?: () => void;
  onBack?: () => void;
  showContact?: boolean;
  className?: string;
}

const defaultMessages: Record<ErrorType, {
  title: string;
  titleGe: string;
  cause: string;
  causeGe: string;
  remedy: string;
  remedyGe: string;
}> = {
  network: {
    title: 'Connection Error',
    titleGe: 'კავშირის შეცდომა',
    cause: 'Unable to reach the server. This may be due to your internet connection or a temporary service disruption.',
    causeGe: 'სერვერთან დაკავშირება ვერ მოხერხდა. ეს შეიძლება გამოწვეული იყოს თქვენი ინტერნეტ კავშირით ან დროებითი სერვისის შეფერხებით.',
    remedy: 'Check your internet connection and try again.',
    remedyGe: 'შეამოწმეთ თქვენი ინტერნეტ კავშირი და სცადეთ ხელახლა.',
  },
  'not-found': {
    title: 'Not Found',
    titleGe: 'ვერ მოიძებნა',
    cause: 'The requested page or resource does not exist.',
    causeGe: 'მოთხოვნილი გვერდი ან რესურსი არ არსებობს.',
    remedy: 'Verify the URL or navigate from the homepage.',
    remedyGe: 'დარწმუნდით რომ URL სწორია ან გადადით მთავარი გვერდიდან.',
  },
  permission: {
    title: 'Access Denied',
    titleGe: 'წვდომა აკრძალულია',
    cause: 'You do not have permission to view this resource.',
    causeGe: 'თქვენ არ გაქვთ ამ რესურსის ნახვის უფლება.',
    remedy: 'Contact us if you believe you should have access.',
    remedyGe: 'დაგვიკავშირდით თუ მიგაჩნიათ რომ უნდა გქონდეთ წვდომა.',
  },
  validation: {
    title: 'Invalid Input',
    titleGe: 'არასწორი შეყვანა',
    cause: 'One or more fields contain invalid data.',
    causeGe: 'ერთი ან მეტი ველი შეიცავს არასწორ მონაცემებს.',
    remedy: 'Review the highlighted fields and correct any errors.',
    remedyGe: 'განიხილეთ გამოყოფილი ველები და გაასწორეთ შეცდომები.',
  },
  server: {
    title: 'Server Error',
    titleGe: 'სერვერის შეცდომა',
    cause: 'An unexpected error occurred while processing your request.',
    causeGe: 'თქვენი მოთხოვნის დამუშავებისას მოულოდნელი შეცდომა მოხდა.',
    remedy: 'Try again in a few minutes. If the problem persists, contact us.',
    remedyGe: 'სცადეთ რამდენიმე წუთში. თუ პრობლემა გაგრძელდება, დაგვიკავშირდით.',
  },
  generic: {
    title: 'Something Went Wrong',
    titleGe: 'რაღაც არასწორია',
    cause: 'An error occurred while processing your request.',
    causeGe: 'თქვენი მოთხოვნის დამუშავებისას შეცდომა მოხდა.',
    remedy: 'Try again. If the problem continues, contact us.',
    remedyGe: 'სცადეთ ხელახლა. თუ პრობლემა გაგრძელდება, დაგვიკავშირდით.',
  },
};

export function ErrorMessage({
  type = 'generic',
  title,
  titleGe,
  cause,
  causeGe,
  remedy,
  remedyGe,
  onRetry,
  onBack,
  showContact = true,
  className,
}: ErrorMessageProps) {
  const { isGeorgian } = useLanguage();
  const defaults = defaultMessages[type];

  const displayTitle = isGeorgian 
    ? (titleGe || defaults.titleGe) 
    : (title || defaults.title);
  const displayCause = isGeorgian 
    ? (causeGe || defaults.causeGe) 
    : (cause || defaults.cause);
  const displayRemedy = isGeorgian 
    ? (remedyGe || defaults.remedyGe) 
    : (remedy || defaults.remedy);

  return (
    <div 
      className={cn(
        "py-16 px-6 border border-navy/20",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md mx-auto text-center">
        {/* Title */}
        <h3 className={cn(
          "font-serif text-lg text-navy mb-4",
          isGeorgian && "font-georgian"
        )}>
          {displayTitle}
        </h3>

        {/* Cause */}
        <div className="mb-4">
          <p className={cn(
            "text-xs uppercase tracking-wider text-navy/40 mb-1",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? 'მიზეზი' : 'What happened'}
          </p>
          <p className={cn(
            "text-sm text-navy/60",
            isGeorgian && "font-georgian"
          )}>
            {displayCause}
          </p>
        </div>

        {/* Remedy */}
        <div className="mb-8">
          <p className={cn(
            "text-xs uppercase tracking-wider text-navy/40 mb-1",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? 'გამოსავალი' : 'What you can do'}
          </p>
          <p className={cn(
            "text-sm text-navy/60",
            isGeorgian && "font-georgian"
          )}>
            {displayRemedy}
          </p>
        </div>

        {/* Actions - text links only */}
        <div className="flex items-center justify-center gap-6 text-sm">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="text-navy/50 hover:text-navy underline"
            >
              {isGeorgian ? 'სცადეთ ხელახლა' : 'Try again'}
            </button>
          )}
          {onBack && (
            <button 
              onClick={onBack}
              className="text-navy/50 hover:text-navy underline"
            >
              {isGeorgian ? 'უკან' : 'Go back'}
            </button>
          )}
          {showContact && (
            <a 
              href="/contact"
              className="text-navy/50 hover:text-navy underline"
            >
              {isGeorgian ? 'კონტაქტი' : 'Contact'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
