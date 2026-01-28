import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Report = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const keyFindings = [
    {
      title: isGeorgian ? 'სასამართლო დამოუკიდებლობის ეროზია' : 'Erosion of Judicial Independence',
      finding: isGeorgian 
        ? 'სასამართლო სისტემა განიცდის სისტემატურ პოლიტიზაციას, რაც გამოიხატება მოსამართლეთა პოლიტიკურად მოტივირებულ დანიშვნებსა და გადაწყვეტილებებში.'
        : 'The judicial system experiences systematic politicization, manifested in politically motivated appointments and decisions.'
    },
    {
      title: isGeorgian ? 'მედია პლურალიზმის შემცირება' : 'Decline in Media Pluralism',
      finding: isGeorgian 
        ? 'კრიტიკული მედია საშუალებები განიცდიან ეკონომიკურ ზეწოლას და სამართლებრივ შევიწროებას, რაც ზღუდავს ინფორმაციის თავისუფლებას.'
        : 'Critical media outlets face economic pressure and legal harassment, limiting freedom of information.'
    },
    {
      title: isGeorgian ? 'საარჩევნო პროცესების მანიპულაცია' : 'Manipulation of Electoral Processes',
      finding: isGeorgian 
        ? 'საარჩევნო ადმინისტრაციის პოლიტიზაცია და ამომრჩეველთა დაშინება არღვევს არჩევნების სამართლიანობას.'
        : 'Politicization of electoral administration and voter intimidation undermine election integrity.'
    },
    {
      title: isGeorgian ? 'სამოქალაქო საზოგადოების შეზღუდვა' : 'Restrictions on Civil Society',
      finding: isGeorgian 
        ? 'არასამთავრობო ორგანიზაციები და აქტივისტები ექვემდებარებიან საკანონმდებლო შეზღუდვებს და ადმინისტრაციულ ბარიერებს.'
        : 'NGOs and activists face legislative restrictions and administrative barriers.'
    },
    {
      title: isGeorgian ? 'ეკონომიკური ზეწოლის მექანიზმები' : 'Economic Pressure Mechanisms',
      finding: isGeorgian 
        ? 'სახელმწიფო რესურსები გამოიყენება პოლიტიკური ლოიალობის უზრუნველსაყოფად და ოპოზიციის დასასჯელად.'
        : 'State resources are used to ensure political loyalty and punish opposition.'
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
              {isGeorgian ? 'ხელყოფის ანგარიში' : 'The Capture Report'}
            </h1>
            <p className={`text-lg text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'ბოლო განახლება: იანვარი 2026' : 'Last updated: January 2026'}
            </p>
          </header>

          <div className={`space-y-12 ${isGeorgian ? 'font-georgian' : ''}`}>
            {/* Lead paragraph */}
            <p className="text-xl leading-relaxed text-foreground/80">
              {isGeorgian 
                ? 'ყოვლისმომცველი ანალიზი საქართველოში სახელმწიფო ხელყოფის მექანიზმებისა და მისი გავლენის შესახებ დემოკრატიულ ინსტიტუტებზე. ეს ანგარიში ეფუძნება დოკუმენტურ მტკიცებულებებს, საერთაშორისო შეფასებებს და პირველადი წყაროების ანალიზს.'
                : 'A comprehensive analysis of state capture mechanisms in Georgia and their impact on democratic institutions. This report is based on documentary evidence, international assessments, and primary source analysis.'}
            </p>

            {/* Report download placeholder */}
            <div className="bg-muted/30 border border-border rounded-sm p-8 text-center">
              <p className="text-muted-foreground italic mb-4">
                {isGeorgian 
                  ? 'სრული ანგარიშის PDF ვერსია მალე ხელმისაწვდომი იქნება.'
                  : 'Full report PDF coming soon.'}
              </p>
              <button 
                disabled 
                className="inline-flex items-center px-6 py-3 bg-navy/50 text-white/70 cursor-not-allowed"
              >
                {isGeorgian ? 'ჩამოტვირთეთ ანგარიში (PDF)' : 'Download Report (PDF)'}
              </button>
            </div>

            {/* Executive Summary */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'აღმასრულებელი შეჯამება' : 'Executive Summary'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80">
                {isGeorgian 
                  ? 'ეს ანგარიში აფასებს საქართველოში სახელმწიფო ხელყოფის მასშტაბს და სიღრმეს. კვლევა ადასტურებს, რომ ხელყოფა არ არის ერთჯერადი მოვლენა, არამედ სისტემატური პროცესი, რომელიც მიზანმიმართულად ანგრევს დემოკრატიულ ინსტიტუტებს და ქმნის დაუსჯელობის კულტურას.'
                  : 'This report assesses the scale and depth of state capture in Georgia. The research confirms that capture is not a one-time event but a systematic process that deliberately degrades democratic institutions and creates a culture of impunity.'}
              </p>
            </section>

            {/* Key Findings */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'ძირითადი დასკვნები' : 'Key Findings'}
              </h2>
              <div className="space-y-6">
                {keyFindings.map((item, index) => (
                  <div key={index} className="border-l-2 border-navy/20 pl-6 py-2">
                    <h3 className="text-lg font-medium text-navy mb-2">
                      {index + 1}. {item.title}
                    </h3>
                    <p className="text-foreground/70">
                      {item.finding}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Methodology */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'მეთოდოლოგია' : 'Methodology'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 mb-4">
                {isGeorgian 
                  ? 'ანგარიში ეფუძნება პირველადი წყაროების ანალიზს, საჯარო დოკუმენტებს, მოწმეთა ჩვენებებს და საერთაშორისო ორგანიზაციების შეფასებებს. ჩვენ ვიყენებთ მრავალწყაროებრივ ვერიფიკაციას და ვიცავთ საერთაშორისო სტანდარტებს.'
                  : 'The report is based on primary source analysis, public documents, witness testimonies, and assessments by international organizations. We employ multi-source verification and adhere to international standards.'}
              </p>
              <Link 
                to="/methodology" 
                className="text-navy underline underline-offset-4 hover:text-navy/70 transition-colors"
              >
                {isGeorgian ? 'დეტალური მეთოდოლოგია →' : 'Detailed methodology →'}
              </Link>
            </section>

            {/* Related Resources */}
            <section className="border-t border-border pt-12">
              <h2 className="text-xl font-normal text-navy mb-6">
                {isGeorgian ? 'დაკავშირებული რესურსები' : 'Related Resources'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link to="/engine" className="block p-4 bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-navy mb-1">
                    {isGeorgian ? 'ხელყოფის ძრავა' : 'The Capture Engine'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isGeorgian ? 'ინტერაქტიული ვიზუალიზაცია' : 'Interactive visualization'}
                  </p>
                </Link>
                <Link to="/evidence" className="block p-4 bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium text-navy mb-1">
                    {isGeorgian ? 'მტკიცებულებების ბიბლიოთეკა' : 'Evidence Library'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isGeorgian ? 'დოკუმენტური არქივი' : 'Documentary archive'}
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

export default Report;
