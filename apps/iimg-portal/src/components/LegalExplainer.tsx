import { useLanguage } from "@/i18n/LanguageContext";
import { Scale, Link as LinkIcon, Shield, FileCheck, AlertTriangle } from "lucide-react";

export const LegalExplainer = () => {
  const { t } = useLanguage();
  const legal = t.legalExplainer;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Why Every Detail Matters */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {legal.whyMattersTitle}
            </h2>
          </div>
          
          <p className="text-foreground mb-6 leading-relaxed">
            {legal.whyMattersIntro}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-muted/30 rounded-xl">
              <h3 className="font-semibold mb-2">{legal.avenueIntl}</h3>
              <p className="text-sm text-muted-foreground">{legal.avenueIntlDesc}</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl">
              <h3 className="font-semibold mb-2">{legal.avenueDomestic}</h3>
              <p className="text-sm text-muted-foreground">{legal.avenueDomesticDesc}</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl">
              <h3 className="font-semibold mb-2">{legal.avenueFuture}</h3>
              <p className="text-sm text-muted-foreground">{legal.avenueFutureDesc}</p>
            </div>
          </div>
        </div>

        {/* What Admissibility Means */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileCheck className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">{legal.admissibilityTitle}</h3>
          </div>
          
          <p className="text-foreground mb-6 leading-relaxed">
            {legal.admissibilityIntro}
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg">
              <LinkIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">{legal.chainTitle}</h4>
                <p className="text-sm text-muted-foreground">{legal.chainDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">{legal.cryptoTitle}</h4>
                <p className="text-sm text-muted-foreground">{legal.cryptoDesc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matters For You */}
        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h3 className="text-lg font-semibold mb-3">{legal.whyYouTitle}</h3>
          <p className="text-foreground leading-relaxed">
            {legal.whyYouDesc}
          </p>
        </div>

        {/* Disclaimers */}
        <div className="mt-12 space-y-4">
          <div className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl border border-border">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">{legal.disclaimerPrivilegeTitle}</h4>
              <p className="text-sm text-muted-foreground">
                {legal.disclaimerPrivilegeText}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl border border-border">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">{legal.disclaimerPurposeTitle}</h4>
              <p className="text-sm text-muted-foreground">
                {legal.disclaimerPurposeText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
