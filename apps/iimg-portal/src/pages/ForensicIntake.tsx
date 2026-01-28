import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocalizedLink } from "@/components/LocalizedLink";
import { Shield, FileCheck, Hash, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ForensicIntake = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              {t.forensicIntake?.title || "Forensic Intake"}
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              {t.forensicIntake?.subtitle || "Digital Evidence Submission"}
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-6">
            {/* Purpose */}
            <div className="mb-10">
              <h2 className="text-xl font-medium text-foreground mb-4">
                {t.forensicIntake?.purposeTitle || "Purpose"}
              </h2>
              <p className="article-text text-foreground mb-4">
                {t.forensicIntake?.purposeText || "This gateway is designed for the high-security collection of \"Crime-Based Evidence\" (the act) and \"Linkage Evidence\" (the chain of command). Every submission is preserved to meet the threshold for international criminal referrals."}
              </p>
            </div>

            {/* Integrity Instructions */}
            <Card className="mb-10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  {t.forensicIntake?.integrityTitle || "Impeccable Instructions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{t.forensicIntake?.nativeFormat || "Native Format"}</p>
                    <p className="text-sm text-muted-foreground">{t.forensicIntake?.nativeFormatDesc || "Upload original, unedited photos or videos. Do not rename or modify metadata."}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Hash className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{t.forensicIntake?.integrityProtection || "Integrity Protection"}</p>
                    <p className="text-sm text-muted-foreground">{t.forensicIntake?.integrityProtectionDesc || "Upon upload, the IIMG automatically generates a unique SHA-256 Hash Value for every file. This creates a tamper-proof digital fingerprint verifying the file is unchanged since the moment of capture."}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{t.forensicIntake?.provenance || "Provenance"}</p>
                    <p className="text-sm text-muted-foreground">{t.forensicIntake?.provenanceDesc || "Clearly indicate if you are the creator of the material or if it was acquired from an external source."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Options */}
            <div className="mb-10">
              <h2 className="text-xl font-medium text-foreground mb-6">
                {t.forensicIntake?.submissionOptions || "Submission Options"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{t.intake?.saveAppTitle || "Save App (Berkeley Protocol)"}</CardTitle>
                    <CardDescription>{t.intake?.saveAppDesc || "Captures evidence that meets Berkeley Protocol standards directly from your phone."}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t.intake?.saveAppBest || "Best for: Photos & videos at events, field documentation"}</p>
                    <Button asChild className="w-full">
                      <LocalizedLink to="/submit-evidence/berkeley">{t.intake?.chooseBerkeley || "Use Berkeley Protocol"}</LocalizedLink>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{t.directSubmission?.tresoritTitle || "Encrypted Document Vault"}</CardTitle>
                    <CardDescription>{t.directSubmission?.tresoritDesc || "Upload documents directly to our end-to-end encrypted Tresorit vault."}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t.directSubmission?.tresoritBest || "Best for: Medical records, official documents, repeat submissions"}</p>
                    <Button asChild variant="outline" className="w-full">
                      <LocalizedLink to="/submit-evidence/tresorit">{t.intake?.chooseDirectUpload || "Encrypted Upload"}</LocalizedLink>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Full Guided Portal Link */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">{t.forensicIntake?.needGuidance || "Need step-by-step guidance?"}</p>
              <Button asChild variant="secondary">
                <LocalizedLink to="/submit-evidence">{t.directSubmission?.guidedTitle || "Full Guided Portal"}</LocalizedLink>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForensicIntake;
