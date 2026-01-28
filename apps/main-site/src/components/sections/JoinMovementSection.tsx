import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import iimgPhoto from '@/assets/forum-user-photo-alt.jpg';

const JoinMovementSection = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-background text-foreground py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
          
          {/* Council in Development Notice */}
          <ScrollReveal>
            <div className="text-center space-y-8">
              <div className="inline-block">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {language === 'ge' ? 'განვითარების პროცესში' : 'In Development'}
                </span>
              </div>
              
              <h2 className={`font-display leading-tight ${language === 'ge' ? 'font-georgian text-2xl md:text-4xl' : 'text-3xl md:text-5xl'}`}>
                {language === 'ge' 
                  ? 'სამოქალაქო საბჭო ფორმირების პროცესშია'
                  : 'The Civic Council is Forming'}
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {language === 'ge'
                  ? 'ჩვენ ვაშენებთ რაღაცას ერთად: საფუძველს მოქალაქეთა ანგარიშვალდებულებისა და ღირსების აღდგენისთვის. შემოუერთდით მოძრაობას.'
                  : 'We are building something together: a foundation for citizen-led accountability and the restoration of dignity. Join the movement.'}
              </p>
              
              <p className="text-sm text-muted-foreground/70 italic">
                {language === 'ge' 
                  ? 'მეტი ინფორმაცია მალე'
                  : 'More information forthcoming'}
              </p>
            </div>
          </ScrollReveal>

          {/* Join the Movement */}
          <ScrollReveal delay={0.1}>
            <div className="bg-card/30 border border-border/30 p-8 md:p-12 lg:p-16 space-y-8">
              <div className="text-center space-y-4">
                <h3 className={`font-display ${language === 'ge' ? 'font-georgian text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                  {language === 'ge' 
                    ? 'შემოუერთდით ღირსების მოძრაობას'
                    : 'Join the Movement of Dignity'}
                </h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {language === 'ge'
                    ? 'დაგვიკავშირდით უსაფრთხო არხებით. თქვენი ხმა მნიშვნელოვანია.'
                    : 'Reach out through secure channels. Your voice matters.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-foreground/20 hover:bg-foreground/5"
                  asChild
                >
                  <a href="https://signal.me/#eu/CCG.95" target="_blank" rel="noopener noreferrer">
                    Signal: CCG.95
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-foreground/20 hover:bg-foreground/5"
                  asChild
                >
                  <a href="mailto:georgia@sabcho.org">
                    georgia@sabcho.org
                  </a>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* IIMG Feature Card */}
          <ScrollReveal delay={0.2}>
            <div className="bg-primary text-primary-foreground overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <img 
                    src={iimgPhoto} 
                    alt="Independent Investigative Mechanism of Georgia"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-8 md:p-12 lg:p-16 space-y-8 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
                        {language === 'ge' ? 'პარტნიორი ინიციატივა' : 'Partner Initiative'}
                      </span>
                      <h3 className={`font-display ${language === 'ge' ? 'font-georgian text-xl md:text-3xl' : 'text-2xl md:text-4xl'}`}>
                        IIMG
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className={`text-lg md:text-xl leading-relaxed text-primary-foreground/90 ${language === 'ge' ? 'font-georgian' : ''}`}>
                      {language === 'ge'
                        ? 'საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი'
                        : 'Independent Investigative Mechanism of Georgia'}
                    </p>
                    <p className="text-primary-foreground/70 leading-relaxed">
                      {language === 'ge'
                        ? 'სამოქალაქო ინიციატივა, რომელიც დოკუმენტირებას უკეთებს და ინახავს უახლესი მოვლენებით დაზარალებულთა ისტორიებს. სახელმწიფო დანაშაულები, სისტემური ძალადობა, ქიმიური აგენტები.'
                        : 'A civic initiative documenting and preserving the stories of those affected by recent events. State crimes, systemic violence, chemical agents.'}
                    </p>
                  </div>
                  
                  <Button 
                    variant="secondary"
                    size="lg"
                    className="w-fit"
                    asChild
                  >
                    <a href="https://iimg.sabcho.org/en" target="_blank" rel="noopener noreferrer">
                      {language === 'ge' ? 'ეწვიეთ IIMG-ს' : 'Visit IIMG'}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Donation Section */}
          <ScrollReveal delay={0.3}>
            <div className="text-center space-y-8 py-8">
              <div className="space-y-4">
                <h3 className={`font-display ${language === 'ge' ? 'font-georgian text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                  {language === 'ge' 
                    ? 'მხარი დაუჭირეთ მოძრაობას'
                    : 'Support the Movement'}
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {language === 'ge'
                    ? 'თქვენი შემოწირულობა აძლიერებს დოკუმენტაციას, გამოძიებებს და სამოქალაქო ორგანიზებას. ყველა წვლილი მნიშვნელოვანია სამართლიანობისა და ანგარიშვალდებულების საქმისთვის.'
                    : 'Your contribution strengthens documentation, investigations, and civic organizing. Every contribution matters in the pursuit of justice and accountability.'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  asChild
                >
                  <a href="mailto:donate@civiccounsel.org?subject=Donation%20Inquiry">
                    {language === 'ge' ? 'შემოწირულობის შესახებ' : 'Inquire About Donating'}
                  </a>
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground/60">
                {language === 'ge' 
                  ? 'სრული გადახდის ვარიანტები მალე იქნება ხელმისაწვდომი'
                  : 'Full payment options coming soon'}
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default JoinMovementSection;
