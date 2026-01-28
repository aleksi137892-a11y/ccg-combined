/**
 * EmptyState - Informative empty state component
 * 
 * No decorative icons. Text-only.
 */

import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type EmptyStateVariant = 'search' | 'filter' | 'no-data' | 'error' | 'not-found';

interface EmptyStateProps {
  variant: EmptyStateVariant;
  title?: string;
  titleGe?: string;
  description?: string;
  descriptionGe?: string;
  guidance?: string;
  guidanceGe?: string;
  action?: React.ReactNode;
  className?: string;
}

const defaultContent: Record<EmptyStateVariant, {
  title: string;
  titleGe: string;
  description: string;
  descriptionGe: string;
  guidance: string;
  guidanceGe: string;
}> = {
  search: {
    title: 'No results found',
    titleGe: 'შედეგები ვერ მოიძებნა',
    description: 'Your search did not match any records in the database.',
    descriptionGe: 'თქვენი ძებნა ვერ ემთხვევა მონაცემთა ბაზაში არსებულ ჩანაწერებს.',
    guidance: 'Try adjusting your search terms or using broader keywords.',
    guidanceGe: 'სცადეთ საძიებო ტერმინების შეცვლა ან უფრო ფართო საკვანძო სიტყვების გამოყენება.',
  },
  filter: {
    title: 'No matches for current filters',
    titleGe: 'მიმდინარე ფილტრებით შედეგები ვერ მოიძებნა',
    description: 'The applied filters have excluded all entries from view.',
    descriptionGe: 'გამოყენებულმა ფილტრებმა გამორიცხა ყველა ჩანაწერი.',
    guidance: 'Remove some filters to see more results.',
    guidanceGe: 'მოხსენით ზოგიერთი ფილტრი მეტი შედეგის სანახავად.',
  },
  'no-data': {
    title: 'No data available',
    titleGe: 'მონაცემები მიუწვდომელია',
    description: 'This section does not yet contain any entries.',
    descriptionGe: 'ეს განყოფილება ჯერ არ შეიცავს ჩანაწერებს.',
    guidance: 'Data will appear here as it is documented and verified.',
    guidanceGe: 'მონაცემები აქ გამოჩნდება მათი დოკუმენტირებისა და ვერიფიკაციის შემდეგ.',
  },
  error: {
    title: 'Unable to load data',
    titleGe: 'მონაცემების ჩატვირთვა ვერ მოხერხდა',
    description: 'An error occurred while retrieving the requested information.',
    descriptionGe: 'შეცდომა მოხდა მოთხოვნილი ინფორმაციის მიღებისას.',
    guidance: 'Refresh the page. If the problem persists, contact us.',
    guidanceGe: 'განაახლეთ გვერდი. თუ პრობლემა გაგრძელდება, დაგვიკავშირდით.',
  },
  'not-found': {
    title: 'Record not found',
    titleGe: 'ჩანაწერი ვერ მოიძებნა',
    description: 'The requested record does not exist or may have been removed.',
    descriptionGe: 'მოთხოვნილი ჩანაწერი არ არსებობს ან შესაძლოა წაშლილია.',
    guidance: 'Verify the identifier or return to the main listing.',
    guidanceGe: 'გადაამოწმეთ იდენტიფიკატორი ან დაბრუნდით მთავარ სიაში.',
  },
};

export function EmptyState({
  variant,
  title,
  titleGe,
  description,
  descriptionGe,
  guidance,
  guidanceGe,
  action,
  className,
}: EmptyStateProps) {
  const { isGeorgian } = useLanguage();
  const defaults = defaultContent[variant];

  const displayTitle = isGeorgian 
    ? (titleGe || defaults.titleGe) 
    : (title || defaults.title);
  const displayDescription = isGeorgian 
    ? (descriptionGe || defaults.descriptionGe) 
    : (description || defaults.description);
  const displayGuidance = isGeorgian 
    ? (guidanceGe || defaults.guidanceGe) 
    : (guidance || defaults.guidance);

  return (
    <div 
      className={cn(
        "py-16 px-6 text-center border border-navy/10",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="max-w-sm mx-auto">
        {/* Title */}
        <h3 className={cn(
          "font-serif text-lg text-navy mb-3",
          isGeorgian && "font-georgian"
        )}>
          {displayTitle}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-sm text-navy/60 mb-2",
          isGeorgian && "font-georgian"
        )}>
          {displayDescription}
        </p>

        {/* Guidance */}
        <p className={cn(
          "text-xs text-navy/40",
          isGeorgian && "font-georgian"
        )}>
          {displayGuidance}
        </p>

        {/* Action */}
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
