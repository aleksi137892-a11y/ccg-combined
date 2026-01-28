import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const content = {
  en: {
    title: 'On Inclusion',
    p1: 'This ledger documents financial and commercial relationships with a regime facing international sanctions for democratic backsliding. Inclusion is not accusation. Many listed entities have no documented misconduct — their presence reflects the civic imperative to map political finance transparently.',
    p2: 'In contexts of institutional capture, the question is not only "who broke the law" but "who sustained the system." Complicity exists on a spectrum: from active participation to passive benefit to willful ignorance. This record does not assign guilt. It establishes facts. What citizens, investors, regulators, and historians do with those facts is the work of accountability.',
    closing: 'Transparency is not punishment. It is the precondition for moral clarity.',
  },
  ge: {
    title: 'ჩართვის შესახებ',
    p1: 'ეს რეესტრი აღწერს ფინანსურ და კომერციულ ურთიერთობებს რეჟიმთან, რომელიც საერთაშორისო სანქციების ქვეშაა დემოკრატიული რეგრესიის გამო. ჩართვა არ არის ბრალდება. მრავალ ჩამოთვლილ სუბიექტს არ აქვს დოკუმენტირებული გადაცდომა — მათი არსებობა ასახავს სამოქალაქო აუცილებლობას პოლიტიკური ფინანსების გამჭვირვალედ აღწერისა.',
    p2: 'ინსტიტუციური ხელში ჩაგდების კონტექსტში, საკითხი არა მხოლოდ არის "ვინ დაარღვია კანონი", არამედ "ვინ შეინარჩუნა სისტემა." თანამონაწილეობა არსებობს სპექტრზე: აქტიური მონაწილეობიდან პასიურ სარგებლობამდე და განზრახ უგულებელყოფამდე. ეს ჩანაწერი არ ანიჭებს დანაშაულს. ის ადგენს ფაქტებს.',
    closing: 'გამჭვირვალობა სასჯელი არ არის. ეს მორალური სიცხადის წინაპირობაა.',
  }
};

export function LedgerDisclaimer() {
  const [isOpen, setIsOpen] = useState(true);
  const { isGeorgian } = useLanguage();
  const t = isGeorgian ? content.ge : content.en;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-8">
      <div className="border border-navy/10 bg-navy/[0.02]">
        <CollapsibleTrigger className="w-full px-6 py-4 flex justify-between items-center hover:bg-navy/[0.03] transition-colors">
          <h3 className={cn(
            'font-sans text-sm uppercase tracking-wider text-navy/60',
            isGeorgian && 'font-georgian'
          )}>
            {t.title}
          </h3>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-navy/40" />
          ) : (
            <ChevronDown className="h-4 w-4 text-navy/40" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-6 pb-6">
            <div className={cn(
              'font-serif text-navy/70 leading-relaxed space-y-4 max-w-prose',
              isGeorgian && 'font-georgian'
            )}>
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p className="italic text-navy/60">{t.closing}</p>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
