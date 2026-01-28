import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink, Smartphone, FileText, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

// NOTE: The Save App integration requires users to configure their own credentials
// in the Save App settings. The deep link only provides the host endpoint.
const SAVE_APP_INFO_LINK = "https://safebox.app";
const TRESORIT_LINK = "https://web.tresorit.com/r#3COkGJ8lyQzeYmTk5C-X2A";

export const DirectSubmission = () => {
  const { t } = useLanguage();
  const direct = t.directSubmission;

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {direct.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {direct.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Tresorit Vault */}
          <a
            href={TRESORIT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {direct.tresoritTitle}
                  <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {direct.tresoritDesc}
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {direct.tresoritBest}
              </span>
            </div>
          </a>

          {/* Save App - Now links to info page instead of deep link */}
          <a
            href={SAVE_APP_INFO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Smartphone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {direct.saveAppTitle}
                  <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {direct.saveAppDesc}
                </p>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {direct.saveAppBest}
              </span>
            </div>
          </a>
        </div>

        {/* Guided Portal Link */}
        <div className="text-center">
          <Link
            to="/submit-evidence"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Shield className="h-5 w-5" />
            {direct.guidedTitle}
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            {direct.guidedDesc}
          </p>
        </div>
      </div>
    </section>
  );
};
