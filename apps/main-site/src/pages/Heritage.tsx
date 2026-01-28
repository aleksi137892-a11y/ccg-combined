import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Heritage = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const focusAreas = [
    {
      title: isGeorgian ? 'ქართული ენის განვითარება და დაცვა' : 'Georgian Language Development & Protection',
      description: isGeorgian 
        ? 'თანამედროვე გამოყენების სტანდარტები, ტერმინოლოგიის განვითარება და ენობრივი რესურსების შექმნა.'
        : 'Contemporary usage standards, terminology development, and creation of linguistic resources.'
    },
    {
      title: isGeorgian ? 'ლიტერატურული მემკვიდრეობის ციფრული არქივი' : 'Digital Archive of Literary Heritage',
      description: isGeorgian 
        ? 'კლასიკური და თანამედროვე ქართული ლიტერატურის ციფრულ ფორმატში შენარჩუნება და ხელმისაწვდომობა.'
        : 'Digital preservation and accessibility of classical and contemporary Georgian literature.'
    },
    {
      title: isGeorgian ? 'კულტურული ტრადიციების დოკუმენტაცია' : 'Documentation of Cultural Traditions',
      description: isGeorgian 
        ? 'ზეპირი ტრადიციების, ფოლკლორისა და კულტურული პრაქტიკების სისტემატური ჩაწერა.'
        : 'Systematic recording of oral traditions, folklore, and cultural practices.'
    },
    {
      title: isGeorgian ? 'საგანმანათლებლო რესურსები' : 'Educational Resources',
      description: isGeorgian 
        ? 'სასწავლო მასალები ქართული ენისა და კულტურის შესასწავლად ყველა ასაკისთვის.'
        : 'Learning materials for studying Georgian language and culture for all ages.'
    },
    {
      title: isGeorgian ? 'თარგმანი და ლოკალიზაცია' : 'Translation & Localization',
      description: isGeorgian 
        ? 'მსოფლიო ლიტერატურის თარგმნა ქართულად და ქართული მემკვიდრეობის საერთაშორისო გავრცელება.'
        : 'Translation of world literature into Georgian and international dissemination of Georgian heritage.'
    }
  ];

  const projects = [
    {
      title: isGeorgian ? 'ციფრული ლექსიკონი' : 'Digital Dictionary',
      status: isGeorgian ? 'მიმდინარე' : 'In progress',
      description: isGeorgian 
        ? 'ყოვლისმომცველი ქართული ონლაინ ლექსიკონი ეტიმოლოგიით და გამოყენების მაგალითებით.'
        : 'Comprehensive Georgian online dictionary with etymology and usage examples.'
    },
    {
      title: isGeorgian ? 'მხატვრული ტექსტების კორპუსი' : 'Literary Text Corpus',
      status: isGeorgian ? 'დაგეგმილი' : 'Planned',
      description: isGeorgian 
        ? 'ქართული მხატვრული ლიტერატურის მასშტაბური ციფრული კორპუსი.'
        : 'Large-scale digital corpus of Georgian literary texts.'
    },
    {
      title: isGeorgian ? 'ენის სწავლების პლატფორმა' : 'Language Learning Platform',
      status: isGeorgian ? 'დაგეგმილი' : 'Planned',
      description: isGeorgian 
        ? 'ინტერაქტიული პლატფორმა ქართული ენის შესასწავლად დიასპორისა და უცხოელებისთვის.'
        : 'Interactive platform for learning Georgian for diaspora and foreigners.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <header className="mb-12">
            <p className={`text-sm uppercase tracking-widest text-muted-foreground mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'რუსთაველის პროექტი' : 'The Rustaveli Project'}
            </p>
            <h1 className={`text-4xl lg:text-5xl font-normal text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'მემკვიდრეობისა და ენის სტუდია' : 'Heritage & Language Studio'}
            </h1>
            <p className={`text-lg text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'ქართული ენისა და კულტურის შენარჩუნება' : 'Preserving Georgian Language and Culture'}
            </p>
          </header>

          <div className={`space-y-12 ${isGeorgian ? 'font-georgian' : ''}`}>
            {/* Lead paragraph */}
            <p className="text-xl leading-relaxed text-foreground/80">
              {isGeorgian 
                ? 'მემკვიდრეობისა და ენის სტუდია ეძღვნება ქართული ენის, ლიტერატურის და კულტურული მემკვიდრეობის შენარჩუნებას და თანამედროვე კონტექსტში გააზრებას. ენა არის ერის სული — მისი დაცვა არის თავისუფლების დაცვა.'
                : 'The Heritage & Language Studio is dedicated to preserving Georgian language, literature, and cultural heritage while contextualizing them for contemporary understanding. Language is the soul of a nation—protecting it is protecting freedom.'}
            </p>

            {/* Mission callout */}
            <div className="bg-navy/5 border-l-4 border-navy p-6">
              <p className="text-lg font-medium text-navy">
                {isGeorgian 
                  ? 'მისია: ენა და კულტურა არის წინააღმდეგობის ფორმა ასიმილაციისა და დავიწყების წინააღმდეგ.'
                  : 'Mission: Language and culture are forms of resistance against assimilation and oblivion.'}
              </p>
            </div>

            {/* Focus Areas */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'მიმართულებები' : 'Focus Areas'}
              </h2>
              <div className="space-y-6">
                {focusAreas.map((area, index) => (
                  <div key={index} className="border-l-2 border-navy/20 pl-6 py-2">
                    <h3 className="text-lg font-medium text-navy mb-2">
                      {area.title}
                    </h3>
                    <p className="text-foreground/70">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Current Projects */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'პროექტები' : 'Projects'}
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="p-5 bg-muted/30 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-navy">
                        {project.title}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Collaboration */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'თანამშრომლობა' : 'Collaboration'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                {isGeorgian 
                  ? 'სტუდია თანამშრომლობს უნივერსიტეტებთან, მუზეუმებთან, ბიბლიოთეკებთან და სხვა კულტურულ ინსტიტუციებთან საქართველოსა და მსოფლიოში. ჩვენ ვეძებთ პარტნიორებს შემდეგ სფეროებში:'
                  : 'The studio collaborates with universities, museums, libraries, and other cultural institutions in Georgia and worldwide. We seek partners in the following areas:'}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'აკადემიური კვლევა და პუბლიკაციები' : 'Academic research and publications'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'ციფრული არქივაცია და ტექნოლოგიები' : 'Digital archiving and technologies'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'თარგმანი და საერთაშორისო გავრცელება' : 'Translation and international dissemination'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'საგანმანათლებლო პროგრამების განვითარება' : 'Educational program development'}</span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section className="border-t border-border pt-12">
              <h2 className="text-xl font-normal text-navy mb-4">
                {isGeorgian ? 'დაგვიკავშირდით' : 'Get in Touch'}
              </h2>
              <p className="text-foreground/70 mb-4">
                {isGeorgian 
                  ? 'დაინტერესებული ხართ თანამშრომლობით ან გაქვთ წინადადებები? დაგვიკავშირდით.'
                  : 'Interested in collaboration or have suggestions? Get in touch.'}
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center text-navy underline underline-offset-4 hover:text-navy/70 transition-colors"
              >
                {isGeorgian ? 'კონტაქტის გვერდი →' : 'Contact page →'}
              </Link>
            </section>

            {/* Back to Rustaveli */}
            <section className="pt-8">
              <Link 
                to="/rustaveli" 
                className="inline-flex items-center text-navy hover:text-navy/70 transition-colors"
              >
                ← {isGeorgian ? 'რუსთაველის პროექტი' : 'The Rustaveli Project'}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Heritage;
