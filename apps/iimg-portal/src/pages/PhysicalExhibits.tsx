import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle, Mail, Shield, Camera, Droplet, Sun, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACTS } from "@/lib/contacts";

const PhysicalExhibits = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              {t.physicalExhibits?.title || "Physical Exhibits"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.physicalExhibits?.subtitle || "Secure Retrieval & Chain of Custody"}
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-6">
            {/* Introduction */}
            <div className="mb-10">
              <p className="article-text text-foreground mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Physical evidence—including clothing, environmental samples, and materials potentially contaminated with chemical agents—requires specialized handling to preserve forensic integrity. Our protocols align with international standards for the collection and preservation of materials that may be relevant to proceedings before international tribunals.
              </p>
              <p className="article-text text-foreground mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Do not attempt to transport materials yourself or send them via conventional mail. Contact us through secure channels below. Our forensic partners will provide discrete instructions for retrieval and chain of custody documentation.
              </p>
            </div>

            {/* Contact Channels */}
            <div className="mb-10">
              <h2 className="text-xl font-medium text-foreground mb-6">
                {t.physicalExhibits?.secureChannels || "Secure Communication Channels"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <a 
                  href={CONTACTS.signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MessageCircle className="h-5 w-5" />
                        {t.intake?.signalContact || "Signal"}
                      </CardTitle>
                      <CardDescription>{t.intake?.signalDesc || "End-to-end encrypted messaging"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-mono text-foreground">{CONTACTS.signal.display}</p>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href={CONTACTS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp
                      </CardTitle>
                      <CardDescription>End-to-end encrypted messaging</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-mono text-foreground">{CONTACTS.whatsapp.display}</p>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href={CONTACTS.protonmail.url}
                  className="block"
                >
                  <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Mail className="h-5 w-5" />
                        {t.intake?.protonmail || "ProtonMail"}
                      </CardTitle>
                      <CardDescription>{t.intake?.protonDesc || "Encrypted email (E2EE with ProtonMail users)"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-mono text-foreground">{CONTACTS.protonmail.display}</p>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href={CONTACTS.threema.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Shield className="h-5 w-5" />
                        Threema
                      </CardTitle>
                      <CardDescription>Swiss-hosted, anonymous—no phone number required</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-mono text-foreground">{CONTACTS.threema.display}</p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>

            {/* Preservation Guidelines */}
            <div className="mb-10">
              <h2 className="text-xl font-medium text-foreground mb-6">
                {t.intake?.preservationSteps || "Preservation Guidelines"}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Package className="h-4 w-4" />
                      {t.intake?.dryEvidence || "Dry Items (Clothing/Soil)"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t.intake?.dryEvidenceDesc || "Use a clean glass jar or heavy-duty sealable bag. Label with date, time, and location."}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Droplet className="h-4 w-4" />
                      {t.intake?.liquidEvidence || "Liquid Samples"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t.intake?.liquidEvidenceDesc || "Glass container with secure lid. Store upright in a cool, dark place."}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sun className="h-4 w-4" />
                      {t.intake?.avoidSunlight || "Keep Away from Light"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t.intake?.avoidSunlightDesc || "Sunlight and heat degrade forensic evidence. Store in darkness."}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Camera className="h-4 w-4" />
                      {t.intake?.shadowPhoto || "Document Before Moving"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t.intake?.shadowPhotoDesc || "Photograph items in place BEFORE moving them. The Save app captures GPS coordinates."}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Safety Note */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.intake?.safetyFirst || "Your Safety First"}</p>
                    <p className="text-sm text-muted-foreground">{t.intake?.safetyFirstDesc || "Wear gloves if possible. Store items in a ventilated area away from where you sleep."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PhysicalExhibits;