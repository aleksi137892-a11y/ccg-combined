import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, FileText, Home, Users, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ForumForJustice = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="pt-12 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              {t.forumForJustice?.title || "Forum for Justice"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.forumForJustice?.subtitle || "Humanitarianism & Redress"}
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-6">
            {/* Introduction */}
            <div className="mb-10">
              <p className="article-text text-foreground">
                {t.forumForJustice?.intro || "This serves as the primary body of appeal for those harmed by state dereliction. We provide pathways to support, documentation, and future legal remedies."}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {/* Humanitarian Appeal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-primary" />
                    {t.forumForJustice?.humanitarianTitle || "Humanitarian Appeal"}
                  </CardTitle>
                  <CardDescription>
                    {t.forumForJustice?.humanitarianDesc || "Access to trauma-informed psychosocial support for survivors and witnesses of systemic violence."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.forumForJustice?.humanitarianText || "Our network includes mental health professionals experienced in conflict-related trauma. Support is available in multiple languages."}
                  </p>
                </CardContent>
              </Card>

              {/* Medical Archiving */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    {t.forumForJustice?.medicalTitle || "Medical Archiving"}
                  </CardTitle>
                  <CardDescription>
                    {t.forumForJustice?.medicalDesc || "Securely preserving medical records for future international claims."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.forumForJustice?.medicalText || "Documentation of injuries, treatments, and medical conditions is critical for future legal proceedings. We preserve these records with proper chain of custody."}
                  </p>
                </CardContent>
              </Card>

              {/* Restitution Initiative */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Home className="h-5 w-5 text-primary" />
                    {t.forumForJustice?.restitutionTitle || "The Restitution Initiative"}
                  </CardTitle>
                  <CardDescription>
                    {t.forumForJustice?.restitutionDesc || "A specialized platform for documenting property loss and civil disputes."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.forumForJustice?.restitutionText || "This initiative facilitates future legal remedies by creating a comprehensive record of losses and damages."}
                  </p>
                </CardContent>
              </Card>

              {/* Mutual Aid */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-primary" />
                    {t.forumForJustice?.mutualAidTitle || "Mutual Aid"}
                  </CardTitle>
                  <CardDescription>
                    {t.forumForJustice?.mutualAidDesc || "A community-led resource hub for those requiring immediate assistance."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t.forumForJustice?.mutualAidText || "Connecting those in need with community resources, emergency support, and solidarity networks."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Solidarity Pledge */}
            <Card className="bg-muted/30 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">
                  {t.forumForJustice?.solidarityTitle || "The Solidarity Pledge"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {t.forumForJustice?.solidarityText || "Join the Solidarity Pledge. This is a community commitment to mutual aid and the defense of fundamental rights. By sharing your contact information, you help us build a network of support that picks up the mantle of civic duty."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.forumForJustice?.solidarityNote || "Please note: Many of the Civic Council's broader projects are currently being established; joining the pledge ensures you will be notified as new initiatives for justice and restitution launch."}
                </p>
                <div className="pt-2">
                  <Button asChild>
                    <a href="mailto:submissions_iimg@proton.me?subject=Solidarity%20Pledge">
                      <Mail className="h-4 w-4 mr-2" />
                      {t.forumForJustice?.joinPledge || "Join the Solidarity Pledge"}
                    </a>
                  </Button>
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

export default ForumForJustice;
