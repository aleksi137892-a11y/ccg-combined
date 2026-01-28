import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, List } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TOCItem {
  id: string;
  heading: string;
  headingGe?: string;
}

interface LegalPageTOCProps {
  items: TOCItem[];
  title?: string;
  titleGe?: string;
}

const LegalPageTOC: React.FC<LegalPageTOCProps> = ({ 
  items, 
  title = "On this page",
  titleGe = "ამ გვერდზე"
}) => {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const isGeorgian = language === 'ge';

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const tocTitle = isGeorgian ? titleGe : title;

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <nav className="hidden lg:block sticky top-24 self-start w-64 shrink-0" aria-label="Table of contents">
        <p className={`text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
          {tocTitle}
        </p>
        <ul className="space-y-1 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left pl-4 py-1.5 text-sm transition-colors -ml-px border-l-2 ${
                  activeId === item.id
                    ? 'border-navy text-navy dark:border-primary dark:text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
                } ${isGeorgian ? 'font-georgian' : ''}`}
              >
                {isGeorgian && item.headingGe ? item.headingGe : item.heading}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: Collapsible */}
      <div className="lg:hidden mb-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 border border-border text-left">
            <span className={`flex items-center gap-2 text-sm font-medium ${isGeorgian ? 'font-georgian' : ''}`}>
              <List className="w-4 h-4" />
              {tocTitle}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="border border-t-0 border-border bg-background p-4" aria-label="Table of contents">
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left text-sm py-1 ${
                        activeId === item.id
                          ? 'text-navy dark:text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      } ${isGeorgian ? 'font-georgian' : ''}`}
                    >
                      {isGeorgian && item.headingGe ? item.headingGe : item.heading}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};

export default LegalPageTOC;
