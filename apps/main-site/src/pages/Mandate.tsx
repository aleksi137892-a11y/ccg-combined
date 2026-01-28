import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import BrandWordmark from '@/components/ui/brand-wordmark';
import JumpToNav from '@/components/institutional/JumpToNav';

const Mandate: React.FC = () => {
  const { isGeorgian } = useLanguage();

  const articles = [
    { 
      id: 'article-1',
      num: 'I', 
      title: isGeorgian ? 'დემოკრატიული წარმომადგენლობა' : 'Democratic Representation', 
      text: isGeorgian 
        ? 'ვემსახუროთ საქართველოს მოქალაქეების ლეგიტიმურ ხმას, როდესაც არჩეული ინსტიტუტები ვერ წარმოადგენენ ხალხის სუვერენულ ნებას.'
        : 'To serve as a legitimate voice of Georgian citizens when elected institutions fail to represent the sovereign will of the people.'
    },
    { 
      id: 'article-2',
      num: 'II', 
      title: isGeorgian ? 'სამოქალაქო ანგარიშვალდებულება' : 'Civic Accountability', 
      text: isGeorgian 
        ? 'დოკუმენტირება, გამოძიება და საჯაროდ მიმართვა ძალაუფლების ბოროტად გამოყენების, კორუფციისა და კონსტიტუციური წესრიგის დარღვევების შესახებ.'
        : 'To document, investigate, and publicly address abuses of power, corruption, and violations of constitutional order.'
    },
    { 
      id: 'article-3',
      num: 'III', 
      title: isGeorgian ? 'ინსტიტუციური მთლიანობა' : 'Institutional Integrity', 
      text: isGeorgian 
        ? 'შევთავაზოთ და მხარი დავუჭიროთ რეფორმებს, რომლებიც აღადგენს გამჭვირვალობას, დამოუკიდებლობას და დემოკრატიულ ფუნქციას საქართველოს ინსტიტუტებში.'
        : 'To propose and advocate for reforms that restore transparency, independence, and democratic function to Georgian institutions.'
    },
    { 
      id: 'article-4',
      num: 'IV', 
      title: isGeorgian ? 'კანონის უზენაესობა' : 'Rule of Law', 
      text: isGeorgian 
        ? 'დავიცვათ საქართველოს კონსტიტუცია და საერთაშორისო სამართლებრივი სტანდარტები, რომლებითაც საქართველო არის ვალდებული.'
        : 'To uphold and defend the Constitution of Georgia and international legal standards to which Georgia is bound.'
    },
    { 
      id: 'article-5',
      num: 'V', 
      title: isGeorgian ? 'მოქალაქეთა გაძლიერება' : 'Citizen Empowerment', 
      text: isGeorgian 
        ? 'უზრუნველვყოთ სამოქალაქო ჩართულობის, განათლებისა და ორგანიზებული დემოკრატიული მოქმედების პლატფორმა.'
        : 'To provide a platform for civic engagement, education, and organized democratic action.'
    },
  ];

  const jumpToItems = [
    { id: 'preamble', label: 'Preamble', labelGe: 'პრეამბულა' },
    ...articles.map((article) => ({
      id: article.id,
      label: article.num,
      labelGe: article.num,
    })),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-28 md:py-40 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <p className={`text-label text-white/50 mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
            {isGeorgian ? 'დამფუძნებელი დოკუმენტი' : 'The Founding Document'}
          </p>
          <h1 className={`text-display-xl font-display mb-10 ${isGeorgian ? 'font-georgian' : ''}`}>
            {isGeorgian ? 'ჩვენი მანდატი' : 'Our Mandate'}
          </h1>
          <p className={`quote-large text-white/80 max-w-xl mx-auto ${isGeorgian ? 'font-georgian' : ''}`}>
            "{isGeorgian ? 'მოწვეული აუცილებლობით, ვალდებული მოვალეობით' : 'Convened by necessity, bound by duty'}"
          </p>
        </div>
      </section>

      {/* Jump to navigation */}
      <JumpToNav items={jumpToItems} sticky />

      {/* Preamble */}
      <section id="preamble" className="py-24 md:py-32 scroll-mt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className={`text-label text-muted-foreground mb-10 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'პრეამბულა' : 'Preamble'}
            </p>
            <p className={`quote-hero text-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
              "{isGeorgian 
                ? 'ჩვენ, საქართველოს მოქალაქეები, ინსტიტუციური წარუმატებლობისა და დემოკრატიული ეროზიის პირისპირ, ვაარსებთ ამ საბჭოს როგორც სამოქალაქო ნების და კოლექტიური ანგარიშვალდებულების ინსტრუმენტს.'
                : 'We, the citizens of Georgia, in the face of institutional failure and democratic erosion, hereby establish this Council as an instrument of civic will and collective accountability.'
              }"
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-4">
        <span className="text-muted-foreground text-2xl">·</span>
      </div>

      {/* Articles */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-24">
              {articles.map((article) => (
                <article key={article.id} id={article.id} className="text-center scroll-mt-32">
                  <p className="text-numeral text-5xl md:text-6xl text-muted-foreground/25 mb-4">
                    {article.num}
                  </p>
                  <p className="text-label text-muted-foreground mb-6">
                    Article {article.num}
                  </p>
                  <h2 className={`font-display text-display-sm text-foreground mb-8 ${isGeorgian ? 'font-georgian' : ''}`}>
                    {article.title}
                  </h2>
                  <p className={`text-body-lg text-muted-foreground leading-relaxed max-w-lg mx-auto ${isGeorgian ? 'font-georgian' : ''}`}>
                    {article.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-28 md:py-36 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className={`quote-medium text-white/85 mb-12 ${isGeorgian ? 'font-georgian' : ''}`}>
              "{isGeorgian 
                ? 'მიღებული და გამოცხადებული საქართველოს სამოქალაქო საბჭოს დამფუძნებელი წევრების მიერ, დემოკრატიული მოვალეობისა და სამოქალაქო პასუხისმგებლობის სულისკვეთებით.'
                : <>Adopted and proclaimed by the founding members of <BrandWordmark variant="cream" size="sm" className="inline" />, in the spirit of democratic duty and civic responsibility.</>
              }"
            </p>
            <p className="text-label text-white/40">
              {isGeorgian ? 'თბილისი · 2024' : 'Tbilisi · MMXXIV'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Mandate;
