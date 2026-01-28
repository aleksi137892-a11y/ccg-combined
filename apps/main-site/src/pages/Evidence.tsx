import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Evidence = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const categories = [
    {
      title: isGeorgian ? 'საკანონმდებლო დოკუმენტები' : 'Legislative Documents',
      count: 47,
      description: isGeorgian 
        ? 'კანონები, კანონპროექტები და საკანონმდებლო ინიციატივები, რომლებიც გავლენას ახდენენ დემოკრატიულ ინსტიტუტებზე.'
        : 'Laws, bills, and legislative initiatives affecting democratic institutions.'
    },
    {
      title: isGeorgian ? 'სასამართლო გადაწყვეტილებები' : 'Court Decisions',
      count: 128,
      description: isGeorgian 
        ? 'სასამართლო გადაწყვეტილებები, რომლებიც ადასტურებენ სასამართლო სისტემის პოლიტიზაციას.'
        : 'Court rulings demonstrating politicization of the judicial system.'
    },
    {
      title: isGeorgian ? 'საერთაშორისო ანგარიშები' : 'International Reports',
      count: 89,
      description: isGeorgian 
        ? 'EU, OSCE, ვენეციის კომისია და სხვა საერთაშორისო ორგანიზაციების შეფასებები.'
        : 'Assessments from EU, OSCE, Venice Commission, and other international organizations.'
    },
    {
      title: isGeorgian ? 'მედია მასალები' : 'Media Materials',
      count: 312,
      description: isGeorgian 
        ? 'ჟურნალისტური გამოძიებები, ინტერვიუები და დოკუმენტური მასალები.'
        : 'Journalistic investigations, interviews, and documentary materials.'
    },
    {
      title: isGeorgian ? 'მოწმეთა ჩვენებები' : 'Witness Testimonies',
      count: 56,
      description: isGeorgian 
        ? 'პირველადი წყაროებისგან მიღებული ჩვენებები, დაცული ანონიმურობის პროტოკოლებით.'
        : 'First-hand testimonies protected by anonymity protocols.'
    },
    {
      title: isGeorgian ? 'ფინანსური ჩანაწერები' : 'Financial Records',
      count: 73,
      description: isGeorgian 
        ? 'საჯარო ფინანსური დოკუმენტები, კონტრაქტები და აუდიტის ანგარიშები.'
        : 'Public financial documents, contracts, and audit reports.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <header className="mb-12">
            <h1 className={`text-4xl lg:text-5xl font-normal text-navy mb-4 ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'მტკიცებულებების ბიბლიოთეკა' : 'Evidence Library'}
            </h1>
            <p className={`text-lg text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'ბოლო განახლება: იანვარი 2026' : 'Last updated: January 2026'}
            </p>
          </header>

          <div className={`space-y-12 ${isGeorgian ? 'font-georgian' : ''}`}>
            {/* Lead paragraph */}
            <p className="text-xl leading-relaxed text-foreground/80">
              {isGeorgian 
                ? 'ცენტრალიზებული არქივი დოკუმენტური მტკიცებულებებისა, რომლებიც ადასტურებენ ხელყოფის მექანიზმებს და მათ გავლენას. ყველა მასალა გადის მრავალსაფეხურიან ვერიფიკაციას.'
                : 'A centralized archive of documentary evidence supporting capture mechanism claims and their impacts. All materials undergo multi-stage verification.'}
            </p>

            {/* Search placeholder */}
            <div className="bg-muted/30 border border-border rounded-sm p-8 text-center">
              <p className="text-muted-foreground italic mb-4">
                {isGeorgian 
                  ? 'მტკიცებულებების საძიებო სისტემა მალე დაემატება.'
                  : 'Evidence search system coming soon.'}
              </p>
              <div className="flex justify-center">
                <input 
                  disabled
                  type="text"
                  placeholder={isGeorgian ? 'ძებნა მტკიცებულებებში...' : 'Search evidence...'}
                  className="w-full max-w-md px-4 py-2 border border-border bg-background/50 text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            {/* Collection Categories */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'კოლექციის კატეგორიები' : 'Collection Categories'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {categories.map((category, index) => (
                  <div key={index} className="p-5 bg-muted/30 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-navy">
                        {category.title}
                      </h3>
                      <span className="text-sm text-muted-foreground font-mono">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                {isGeorgian 
                  ? `სულ: ${categories.reduce((sum, c) => sum + c.count, 0)} დოკუმენტი არქივში`
                  : `Total: ${categories.reduce((sum, c) => sum + c.count, 0)} documents in archive`}
              </p>
            </section>

            {/* Verification Process */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'ვერიფიკაციის პროცესი' : 'Verification Process'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 mb-6">
                {isGeorgian 
                  ? 'ყველა მტკიცებულება გადის მრავალსაფეხურიან ვერიფიკაციის პროცესს:'
                  : 'All evidence undergoes a multi-stage verification process:'}
              </p>
              <ol className="space-y-3 list-decimal list-inside text-foreground/80">
                <li>{isGeorgian ? 'წყაროს იდენტიფიკაცია და შეფასება' : 'Source identification and assessment'}</li>
                <li>{isGeorgian ? 'ავთენტურობის ტექნიკური შემოწმება' : 'Technical authenticity verification'}</li>
                <li>{isGeorgian ? 'ჯვარედინი რეფერენსინგი მრავალ წყაროსთან' : 'Cross-referencing with multiple sources'}</li>
                <li>{isGeorgian ? 'კონტექსტუალური ანალიზი' : 'Contextual analysis'}</li>
                <li>{isGeorgian ? 'სანდოობის ეტიკეტის მინიჭება' : 'Confidence label assignment'}</li>
              </ol>
              <Link 
                to="/methodology#verification" 
                className="inline-block mt-4 text-navy underline underline-offset-4 hover:text-navy/70 transition-colors"
              >
                {isGeorgian ? 'სრული ვერიფიკაციის პროტოკოლი →' : 'Full verification protocol →'}
              </Link>
            </section>

            {/* Access Policy */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'წვდომის პოლიტიკა' : 'Access Policy'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                {isGeorgian 
                  ? 'მტკიცებულებების ბიბლიოთეკა ხელმისაწვდომია მკვლევარებისთვის, ჟურნალისტებისთვის და საზოგადოებისთვის, შემდეგი პირობების დაცვით:'
                  : 'The evidence library is accessible to researchers, journalists, and the public, subject to:'}
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'პირადი ინფორმაციის დაცვის პრინციპები' : 'Privacy protection principles'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'წყაროს დაცვის პროტოკოლები' : 'Source protection protocols'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-navy">•</span>
                  <span>{isGeorgian ? 'მიმდინარე გამოძიებების კონფიდენციალურობა' : 'Ongoing investigation confidentiality'}</span>
                </li>
              </ul>
            </section>

            {/* Related Resources */}
            <section className="border-t border-border pt-12">
              <h2 className="text-xl font-normal text-navy mb-6">
                {isGeorgian ? 'დაკავშირებული რესურსები' : 'Related Resources'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link to="/methodology" className="block p-4 bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-navy mb-1">
                    {isGeorgian ? 'მეთოდოლოგია' : 'Methodology'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isGeorgian ? 'ვერიფიკაციის სტანდარტები' : 'Verification standards'}
                  </p>
                </Link>
                <Link to="/source-protection" className="block p-4 bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-navy mb-1">
                    {isGeorgian ? 'წყაროს დაცვა' : 'Source Protection'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isGeorgian ? 'კონფიდენციალურობის პოლიტიკა' : 'Confidentiality policy'}
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Evidence;
