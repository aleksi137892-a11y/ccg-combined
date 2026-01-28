import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocalizedLink } from "@/components/LocalizedLink";

const TRESORIT_URL = "https://web.tresorit.com/r#3COkGJ8lyQzeYmTk5C-X2A";
const REDIRECT_DELAY = 3000;

const TresoritRedirect = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const returnPath = searchParams.get("return") || "/submit-evidence/documents";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.open(TRESORIT_URL, "_blank", "noopener,noreferrer");
    }, REDIRECT_DELAY);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <LocalizedLink 
            to={returnPath} 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.intake.backToTriage}
          </LocalizedLink>

          <div className="border border-border rounded-lg p-8">
            <h1 className="text-lg font-semibold mb-2">
              {t.intake.redirectTitle || "Redirecting to Secure Vault"}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              {t.intake.redirectDesc || "You are being redirected to our end-to-end encrypted document vault."}
            </p>

            <p className="text-2xl font-mono mb-6">
              {countdown > 0 ? countdown : "—"}
            </p>

            <a
              href={TRESORIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              {t.intake.clickIfNotRedirected || "Click here if not redirected"}
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TresoritRedirect;
