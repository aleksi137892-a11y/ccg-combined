import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Dignity = () => {
  const { language } = useLanguage();
  const isGeorgian = language === 'ge';

  const principles = [
    {
      title: isGeorgian ? 'არაძალადობრივი წინააღმდეგობა' : 'Nonviolent Resistance',
      description: isGeorgian 
        ? 'ძალადობა არ არის გამოსავალი. სამოქალაქო წინააღმდეგობა ეფუძნება მორალურ ძალას, არა ფიზიკურს.'
        : 'Violence is not the answer. Civil resistance is built on moral force, not physical.'
    },
    {
      title: isGeorgian ? 'მოქალაქეობრივი სოლიდარობა' : 'Civic Solidarity',
      description: isGeorgian 
        ? 'ერთი მოქალაქის უფლებების დარღვევა არის ყველას უფლებების დარღვევა. ჩვენ ერთად ვდგავართ.'
        : 'The violation of one citizen\'s rights is a violation of everyone\'s rights. We stand together.'
    },
    {
      title: isGeorgian ? 'ინსტიტუციური მეხსიერება' : 'Institutional Memory',
      description: isGeorgian 
        ? 'არ დავივიწყებთ. ვინც ღირსებას არღვევს, პასუხს აგებს — დღეს ან ხვალ.'
        : 'We will not forget. Those who violate dignity will be held accountable—today or tomorrow.'
    },
    {
      title: isGeorgian ? 'ღირსების უპირობო დაცვა' : 'Unconditional Defense of Dignity',
      description: isGeorgian 
        ? 'არანაირი პოლიტიკური მიზანი არ ამართლებს ადამიანის ღირსების დარღვევას. ეს უპირობოა.'
        : 'No political aim justifies the violation of human dignity. This is unconditional.'
    },
    {
      title: isGeorgian ? 'დემოკრატიული მონაწილეობა' : 'Democratic Participation',
      description: isGeorgian 
        ? 'დემოკრატია არ არის სპექტაკლი საყურებლად. თითოეული მოქალაქე აქტიური მონაწილეა.'
        : 'Democracy is not a spectator sport. Every citizen is an active participant.'
    }
  ];

  const activities = [
    {
      title: isGeorgian ? 'საგანმანათლებლო პროგრამები' : 'Educational Programs',
      description: isGeorgian 
        ? 'ვორქშოფები და ტრენინგები არაძალადობრივ წინააღმდეგობასა და მოქალაქეობრივ უფლებებზე.'
        : 'Workshops and trainings on nonviolent resistance and civic rights.'
    },
    {
      title: isGeorgian ? 'იურიდიული დახმარება' : 'Legal Support',
      description: isGeorgian 
        ? 'უფლებადამცველთა და აქტივისტთა იურიდიული მხარდაჭერა.'
        : 'Legal support for rights defenders and activists.'
    },
    {
      title: isGeorgian ? 'დოკუმენტაცია' : 'Documentation',
      description: isGeorgian 
        ? 'ადამიანის უფლებების დარღვევების სისტემატური დოკუმენტაცია.'
        : 'Systematic documentation of human rights violations.'
    },
    {
      title: isGeorgian ? 'საერთაშორისო ადვოკატირება' : 'International Advocacy',
      description: isGeorgian 
        ? 'საერთაშორისო ორგანიზაციებთან და პარტნიორებთან თანამშრომლობა.'
        : 'Collaboration with international organizations and partners.'
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
              {isGeorgian ? 'ღირსების მოძრაობა' : 'Movement of Dignity'}
            </h1>
            <p className={`text-lg text-muted-foreground ${isGeorgian ? 'font-georgian' : ''}`}>
              {isGeorgian ? 'სამოქალაქო წინააღმდეგობა და ღირსების დაცვა' : 'Civic Resistance and Dignity Preservation'}
            </p>
          </header>

          <div className={`space-y-12 ${isGeorgian ? 'font-georgian' : ''}`}>
            {/* Lead paragraph */}
            <p className="text-xl leading-relaxed text-foreground/80">
              {isGeorgian 
                ? 'ღირსების მოძრაობა აერთიანებს ინიციატივებს, რომლებიც მიზნად ისახავენ მოქალაქეობრივი ღირსების დაცვას და სამოქალაქო წინააღმდეგობის კულტურის განვითარებას. ჩვენ გვჯერა, რომ თითოეული ადამიანის ღირსება ხელშეუხებელია.'
                : 'The Movement of Dignity unites initiatives aimed at protecting civic dignity and developing a culture of civil resistance. We believe that every person\'s dignity is inviolable.'}
            </p>

            {/* Core callout */}
            <div className="bg-navy/5 border-l-4 border-navy p-6">
              <p className="text-lg font-medium text-navy">
                {isGeorgian 
                  ? '"რა ვარ მე და რა ხარ შენ?" — თითოეული ჩვენგანი არის რესპუბლიკა.'
                  : '"What am I and what are you?" — Each of us is a republic.'}
              </p>
            </div>

            {/* Principles */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'ძირითადი პრინციპები' : 'Core Principles'}
              </h2>
              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <div key={index} className="border-l-2 border-navy/20 pl-6 py-2">
                    <h3 className="text-lg font-medium text-navy mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-foreground/70">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Activities */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-8">
                {isGeorgian ? 'აქტივობები' : 'Activities'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {activities.map((activity, index) => (
                  <div key={index} className="p-5 bg-muted/30 border border-border">
                    <h3 className="font-medium text-navy mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* History */}
            <section>
              <h2 className="text-2xl font-normal text-navy mb-6">
                {isGeorgian ? 'ისტორია' : 'History'}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80">
                {isGeorgian 
                  ? 'ღირსების მოძრაობა სათავეს იღებს საქართველოს დამოუკიდებლობის მოძრაობიდან და აგრძელებს სამოქალაქო ტრადიციას, რომელიც ემყარება თავისუფლებისა და ადამიანის ღირსების პატივისცემას. 9 აპრილის ტრაგედიიდან დღევანდელ დემოკრატიულ წინააღმდეგობამდე — ჩვენ ვართ იმ ხალხის მემკვიდრეები, რომლებმაც თავისუფლებისთვის სიცოცხლე გაწირეს.'
                  : 'The Movement of Dignity traces its roots to Georgia\'s independence movement and continues a civic tradition based on respect for freedom and human dignity. From the tragedy of April 9th to today\'s democratic resistance—we are the inheritors of those who gave their lives for freedom.'}
              </p>
            </section>

            {/* Join */}
            <section className="bg-navy text-white p-8 -mx-4 sm:mx-0 sm:rounded-sm">
              <h2 className="text-2xl font-normal mb-4">
                {isGeorgian ? 'შემოგვიერთდით' : 'Join Us'}
              </h2>
              <p className="text-white/80 mb-6">
                {isGeorgian 
                  ? 'ღირსების მოძრაობა ღიაა ყველა მოქალაქისთვის, ვინც იზიარებს დემოკრატიულ ღირებულებებს და მზად არის იმოქმედოს მათ დასაცავად.'
                  : 'The Movement of Dignity is open to all citizens who share democratic values and are ready to act in their defense.'}
              </p>
              <Link 
                to="/solidarity-pledge"
                className="inline-flex items-center px-6 py-3 bg-white text-navy hover:bg-white/90 transition-colors"
              >
                {isGeorgian ? 'ხელი მოაწერეთ სოლიდარობის აღთქმას' : 'Sign the Solidarity Pledge'}
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

export default Dignity;
