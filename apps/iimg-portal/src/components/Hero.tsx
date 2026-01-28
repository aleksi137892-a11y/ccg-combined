import { useLanguage } from "@/i18n/LanguageContext";

export const Hero = () => {
  const { t, language } = useLanguage();
  
  const renderTitle = () => {
    if (language === "en") {
      return t.hero.title;
    }
    // Bilingual title for non-English languages
    return (
      <>
        {t.hero.title}
        <span className="block text-lg md:text-xl lg:text-2xl mt-3 font-normal tracking-normal text-muted-foreground">
          The Independent Investigative Mechanism for Georgia
        </span>
      </>
    );
  };

  const renderSubtitle = () => {
    return (
      <>
        {t.hero.subtitle} <em>{t.hero.civicCouncil}</em> <strong><em>{t.hero.forumForJustice}</em></strong>.
      </>
    );
  };
  
  return (
    <section className="pt-16 pb-10 md:pt-20 md:pb-14">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-tight tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          {renderTitle()}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
          {renderSubtitle()}
        </p>
      </div>
    </section>
  );
};
