import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { faqContent } from '@/data/faqContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const Faq: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = faqContent.categories;

  const filteredFaqs = activeCategory 
    ? faqContent.items.filter(item => item.category === activeCategory)
    : faqContent.items;

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        {/* Simple header */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className={cn(
                'font-serif text-3xl md:text-4xl text-navy mb-4',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian ? 'ხშირად დასმული კითხვები' : 'Frequently Asked Questions'}
              </h1>
              <p className={cn(
                'text-navy/50 text-base',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian 
                  ? 'პასუხები ჩვენს მისიაზე, მეთოდებზე და მუშაობაზე.'
                  : 'Answers on our mission, methods, and work.'}
              </p>
            </div>
          </div>
        </section>

        {/* Category filters */}
        <div className="border-y border-navy/10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 py-3 overflow-x-auto">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'text-sm whitespace-nowrap px-3 py-1 transition-colors',
                  activeCategory === null
                    ? 'text-navy border-b border-navy'
                    : 'text-navy/40 hover:text-navy/60',
                  isGeorgian && 'font-georgian'
                )}
              >
                {isGeorgian ? 'ყველა' : 'All'}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'text-sm whitespace-nowrap px-3 py-1 transition-colors',
                    activeCategory === category.id
                      ? 'text-navy border-b border-navy'
                      : 'text-navy/40 hover:text-navy/60',
                    isGeorgian && 'font-georgian'
                  )}
                >
                  {isGeorgian ? category.labelGe : category.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Questions */}
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="divide-y divide-navy/10">
              {filteredFaqs.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-0 py-0"
                >
                  <AccordionTrigger className="py-5 hover:no-underline text-left">
                    <span className={cn(
                      'text-base text-navy pr-4',
                      isGeorgian && 'font-georgian'
                    )}>
                      {isGeorgian ? item.questionGe : item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className={cn(
                      'text-base text-navy/60 leading-relaxed',
                      isGeorgian && 'font-georgian'
                    )}>
                      {isGeorgian ? item.answerGe : item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still have questions */}
            <section className="mt-12 pt-8 border-t border-navy/10">
              <p className={cn(
                'text-navy/60 mb-4',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian 
                  ? 'ვერ იპოვეთ პასუხი? დაგვიკავშირდით ან წარადგინეთ შეკითხვა ' 
                  : "Can't find an answer? Contact us or submit a question through the "}
                <Link 
                  to={getLocalizedPath('/justice')} 
                  className="text-navy underline underline-offset-2 hover:text-navy/70"
                >
                  {isGeorgian ? 'სამართლიანობის ფორუმით' : 'Forum for Justice'}
                </Link>.
              </p>
              <Link 
                to={getLocalizedPath('/contact')} 
                className={cn(
                  'text-sm text-navy border-b border-navy/30 pb-0.5 hover:border-navy transition-colors',
                  isGeorgian && 'font-georgian'
                )}
              >
                {isGeorgian ? 'კონტაქტი' : 'Contact us'} →
              </Link>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Faq;
