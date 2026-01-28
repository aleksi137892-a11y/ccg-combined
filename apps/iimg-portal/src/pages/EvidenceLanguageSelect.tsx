import { useLanguage } from "@/i18n/LanguageContext";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONTACTS } from "@/lib/contacts";

const languages = [
  { code: "ka", label: "ქართულად", englishLabel: "Georgian" },
  { code: "ru", label: "По-русски", englishLabel: "Russian" },
  { code: "az", label: "Azərbaycanca", englishLabel: "Azerbaijani" },
  { code: "en", label: "English", englishLabel: "English" },
];

const EvidenceLanguageSelect = () => {
  const { setLanguage } = useLanguage();
  const { navigateLocalized } = useLocalizedNavigation();

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as "en" | "ka" | "ru" | "az");
    navigateLocalized("/submit-evidence/portal");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          {/* Bilingual Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl text-foreground mb-4 leading-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Secure Documentation Portal
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              უსაფრთხო დოკუმენტაციის პორტალი
            </p>
          </div>

          {/* Why This Portal - Brief Explainer */}
          <div className="mb-8 p-4 border border-border/50 rounded-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This portal is designed to preserve your documentation following international standards. It guides you through proper chain of custody requirements so that what you submit may be used in future accountability proceedings.
            </p>
          </div>

          {/* Language Selection */}
          <div className="space-y-3 mb-10">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="w-full text-left p-4 border border-border rounded-sm hover:bg-muted/50 hover:border-primary/40 transition-all group"
              >
                <span className="text-lg text-foreground group-hover:text-primary transition-colors">
                  {lang.label}
                </span>
                {lang.code !== "en" && (
                  <span className="block text-sm text-muted-foreground mt-0.5">
                    {lang.englishLabel}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Inclusivity Message - Bilingual */}
          <Card className="bg-muted/30 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground mb-2">
                    <strong>We want this to be accessible to everyone.</strong>
                  </p>
                  <p className="text-sm text-foreground mb-2">
                    <strong>ჩვენ გვინდა, რომ ეს ყველასთვის ხელმისაწვდომი იყოს.</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    If your language is not listed, or if you need assistance, please contact us directly via Signal. We are here to help.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    თუ თქვენი ენა არ არის ჩამოთვლილი, ან თუ გჭირდებათ დახმარება, გთხოვთ დაგვიკავშირდეთ პირდაპირ Signal-ით. ჩვენ აქ ვართ დასახმარებლად.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a 
                      href={CONTACTS.signal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      @{CONTACTS.signal.display}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EvidenceLanguageSelect;