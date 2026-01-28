import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Canon = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const canonSections = [
    {
      title: isGeorgian ? 'ისტორიული კონსტიტუციური დოკუმენტები' : 'Historical Constitutional Documents',
      items: [
        isGeorgian ? '1921 წლის საქართველოს კონსტიტუცია' : 'Georgian Constitution of 1921',
        isGeorgian ? 'საქართველოს დამოუკიდებლობის აქტი (1918)' : 'Georgian Declaration of Independence (1918)',
        isGeorgian ? '1991 წლის დამოუკიდებლობის აღდგენის აქტი' : 'Act of Restoration of Independence (1991)'
      ]
    },
    {
      title: isGeorgian ? 'სამოქალაქო მოძრაობის მანიფესტები' : 'Civic Movement Manifestos',
      items: [
        isGeorgian ? '9 აპრილის მოძრაობის დეკლარაცია' : 'April 9th Movement Declaration',
        isGeorgian ? 'ვარდების რევოლუციის პრინციპები' : 'Rose Revolution Principles',
        isGeorgian ? '2024 წლის სამოქალაქო წინააღმდეგობის მანიფესტი' : '2024 Civil Resistance Manifesto'
      ]
    },
    {
      title: isGeorgian ? 'ფილოსოფიური ტექსტები' : 'Philosophical Texts',
      items: [
        isGeorgian ? 'ილია ჭავჭავაძე: "ქართველ ერს"' : 'Ilia Chavchavadze: "To the Georgian Nation"',
        isGeorgian ? 'მერაბ მამარდაშვილი: ცნობიერება და ცივილიზაცია' : 'Merab Mamardashvili: Consciousness and Civilization',
        isGeorgian ? 'თავისუფლების თეორია და პრაქტიკა' : 'Theory and Practice of Freedom'
      ]
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
              {isGeorgian ? 'სამოქალაქო კანონი' : 'Civic Canon'}
            </h1>
            <p className={`text-lg text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'ქართული სამოქალაქო ტრადიციის ძირითადი ტექსტები' : 'Core Texts of Georgian Civic Tradition'}
            </p>
          </header>

          <div className={`space-y-12 ${isGeorgian ? 'font-georgian' : ''}`}>
            {/* Lead paragraph */}
            <p className="text-xl leading-relaxed text-foreground/80">
              {isGeorgian 
                ? 'სამოქალაქო კანონი აერთიანებს იმ ტექსტებს, იდეებს და პრინციპებს, რომლებიც აყალიბებენ ქართულ სამოქალაქო ცნობიერებას და რესპუბლიკურ ტრადიციას. ეს არის ცოცხალი არქივი, რომელიც განაგრძობს ზრდას და განვითარებას.'
                : 'The Civic Canon brings together texts, ideas, and principles that shape Georgian civic consciousness and republican tradition. It is a living archive that continues to grow and evolve.'}
            </p>

            {/* Purpose callout */}
            <div className="bg-navy/5 border-l-4 border-navy p-6">
              <p className="text-lg font-medium text-navy">
                {isGeorgian 
                  ? 'მიზანი: საერთო საცნობარო ჩარჩოს შექმნა — არა დოგმატური სახელმძღვანელო, არამედ ცოცხალი ტრადიცია.'
                  : 'Purpose: To create a shared reference framework—not a dogmatic guide, but a living tradition.'}
              </p>
            </div>

            {/* Text collection placeholder */}
            <div className="bg-muted/30 border border-border rounded-sm p-8 text-center">
              <p className="text-muted-foreground italic mb-4">
                {isGeorgian 
                  ? 'ტექსტების სრული კოლექცია მალე დაემატება.'
                  : 'Full text collection coming soon.'}
              </p>
            </div>

            {/* Canon Sections */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'კანონის სექციები' : 'Canon Sections'}
              </h2>
              <div className="space-y-8">
                {canonSections.map((section, index) => (
                  <div key={index} className="border-l-2 border-navy/20 pl-6">
                    <h3 className="text-lg font-medium text-navy mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-foreground/70 flex gap-2">
                          <span className="text-navy/50">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Selection Criteria */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'შერჩევის კრიტერიუმები' : 'Selection Criteria'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                {isGeorgian 
                  ? 'კანონში ტექსტის შესატანად საჭიროა შემდეგი კრიტერიუმების დაკმაყოფილება:'
                  : 'Texts included in the Canon must meet the following criteria:'}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-navy font-medium">1.</span>
                  <span>{isGeorgian ? 'ისტორიული მნიშვნელობა ქართული სამოქალაქო ტრადიციისთვის' : 'Historical significance for Georgian civic tradition'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy font-medium">2.</span>
                  <span>{isGeorgian ? 'პრინციპული ღირებულება თანამედროვე კონტექსტში' : 'Principled value in contemporary context'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy font-medium">3.</span>
                  <span>{isGeorgian ? 'საყოველთაო ხელმისაწვდომობა და გასაგებობა' : 'Universal accessibility and comprehensibility'}</span>
                </li>
              </ul>
            </section>

            {/* Participation */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'მონაწილეობა' : 'Participation'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80">
                {isGeorgian 
                  ? 'ვიწვევთ მეცნიერებს, მწერლებს და მოქალაქეებს მონაწილეობა მიიღონ კანონის განვითარებაში. თქვენი წინადადებები და კრიტიკული განხილვა ხელს უწყობს ცოცხალი ტრადიციის გაძლიერებას.'
                  : 'We invite scholars, writers, and citizens to participate in developing the Canon. Your proposals and critical discussion help strengthen a living tradition.'}
              </p>
            </section>

            {/* Back to Rustaveli */}
            <section className="border-t border-border pt-12">
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

export default Canon;
