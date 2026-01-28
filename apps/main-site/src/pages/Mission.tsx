import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { missionContent } from '@/data/missionContent';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Mission: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();

  const declaration = isGeorgian 
    ? missionContent.declaration.textGe 
    : missionContent.declaration.text;

  const title = isGeorgian 
    ? missionContent.meta.titleGe 
    : missionContent.meta.title;

  const subtitle = isGeorgian 
    ? missionContent.meta.subtitleGe 
    : missionContent.meta.subtitle;

  return (
    <Layout>
      {/* Foundation Style: 2px navy accent bar */}
      <div className="h-0.5 bg-navy w-full" />

      {/* Hero Declaration Section */}
      <section className="min-h-[70vh] flex items-center justify-center py-24 md:py-32 lg:py-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Label */}
            <p className={cn(
              "text-label text-muted-foreground mb-8 tracking-widest uppercase",
              isGeorgian && "font-georgian"
            )}>
              {subtitle}
            </p>

            {/* Title */}
            <h1 className={cn(
              "text-display-lg md:text-display-xl font-display text-foreground mb-16",
              isGeorgian && "font-georgian"
            )}>
              {title}
            </h1>

            {/* The Verbatim Declaration */}
            <blockquote className={cn(
              "font-narrative text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed",
              "text-foreground/90 max-w-3xl mx-auto",
              isGeorgian && "font-georgian"
            )}>
              {declaration}
            </blockquote>

            {/* Doctrine Reference */}
            <div className="mt-16">
              <Link
                to={getLocalizedPath(missionContent.doctrineReference.href)}
                className={cn(
                  "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  "border-b border-muted-foreground/30 hover:border-foreground/50 pb-0.5",
                  isGeorgian && "font-georgian"
                )}
              >
                {isGeorgian 
                  ? missionContent.doctrineReference.labelGe 
                  : missionContent.doctrineReference.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {missionContent.pillars.map((pillar, index) => (
                <div 
                  key={pillar.id} 
                  className="text-center md:text-left"
                >
                  {/* Numeral */}
                  <p className="text-numeral text-4xl text-muted-foreground/20 mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  
                  {/* Title */}
                  <h3 className={cn(
                    "font-display text-lg text-foreground mb-3",
                    isGeorgian && "font-georgian"
                  )}>
                    {isGeorgian ? pillar.titleGe : pillar.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={cn(
                    "text-sm text-muted-foreground leading-relaxed",
                    isGeorgian && "font-georgian"
                  )}>
                    {isGeorgian ? pillar.descriptionGe : pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {missionContent.relatedLinks.map((link, index) => (
                <Link
                  key={index}
                  to={getLocalizedPath(link.href)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-4 py-2 text-sm",
                    "text-muted-foreground hover:text-foreground transition-colors",
                    "border border-border hover:border-foreground/30 rounded-sm",
                    isGeorgian && "font-georgian"
                  )}
                >
                  {isGeorgian ? link.labelGe : link.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Timestamp */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <p className={cn(
            "text-center text-xs text-muted-foreground",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian 
              ? `ბოლო განახლება: ${missionContent.meta.lastUpdatedGe}` 
              : `Last updated: ${missionContent.meta.lastUpdated}`}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Mission;
