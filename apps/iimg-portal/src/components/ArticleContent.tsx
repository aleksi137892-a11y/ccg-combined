import { useLanguage } from "@/i18n/LanguageContext";

export const ArticleContent = () => {
  const { t } = useLanguage();
  
  return (
    <article className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border pt-8 space-y-8">
          <p className="article-text text-foreground">
            {t.article.paragraph1}
          </p>
          <p className="article-text text-foreground">
            {t.article.paragraph2}
          </p>
          <p className="article-text text-foreground">
            {t.article.paragraph3}
          </p>
        </div>
      </div>
    </article>
  );
};
