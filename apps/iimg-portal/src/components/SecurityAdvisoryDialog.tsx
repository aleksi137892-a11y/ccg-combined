import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Globe, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface SecurityAdvisoryDialogProps {
  trigger: React.ReactNode;
}

type LanguageOption = "en" | "ka" | "ru" | "az";

const languageLabels: Record<LanguageOption, { portal: string; mandate: string; mandateRoute: string }> = {
  en: { portal: "Secure Evidence Portal", mandate: "Read Our Mandate", mandateRoute: "/en" },
  ka: { portal: "უსაფრთხო დოკუმენტაციის პორტალი", mandate: "წაიკითხეთ ჩვენი მანდატი", mandateRoute: "/" },
  ru: { portal: "Защищённый портал документации", mandate: "Читать наш мандат", mandateRoute: "/ru" },
  az: { portal: "Təhlükəsiz Sənəd Portalı", mandate: "Mandatımızı oxuyun", mandateRoute: "/az" },
};

export const SecurityAdvisoryDialog = ({ trigger }: SecurityAdvisoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
  const [isNavigating, setIsNavigating] = useState<"portal" | "mandate" | null>(null);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageSelect = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setLanguage(lang);
  };

  const handleClose = () => {
    setOpen(false);
    setIsNavigating(null);
  };

  const handleNavigateToPortal = () => {
    if (!selectedLanguage) return;
    setIsNavigating("portal");
    setTimeout(() => {
      navigate(`/${selectedLanguage}/submit-evidence`);
      handleClose();
    }, 400);
  };

  const handleNavigateToMandate = () => {
    if (!selectedLanguage) return;
    setIsNavigating("mandate");
    setTimeout(() => {
      navigate(languageLabels[selectedLanguage].mandateRoute);
      handleClose();
    }, 400);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[hsl(220,45%,8%)] text-white border-[hsl(220,30%,18%)] p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {isNavigating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-8 w-8 text-white" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-300"
              >
                {isNavigating === "portal" 
                  ? (selectedLanguage === "ka" ? "პორტალი იტვირთება..." : "Loading secure portal...")
                  : (selectedLanguage === "ka" ? "იტვირთება..." : "Loading...")}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg text-white">
                  <Shield className="h-5 w-5" />
                  Security Advisory
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                {/* English Section */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Lock className="h-4 w-4" />
                    In English
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Your safety is our priority. If you are accessing this site from a shared or monitored device, 
                    consider using a private browser window. You may clear your browser history after visiting. 
                    All submissions are encrypted and pseudonymized to protect your identity.
                  </p>
                </div>

                {/* Georgian Section */}
                <div className="space-y-2 sm:space-y-3 border-t border-white/20 pt-3 sm:pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Lock className="h-4 w-4" />
                    ქართულად
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    თქვენი უსაფრთხოება ჩვენი პრიორიტეტია. თუ ამ საიტს საჯარო ან მონიტორინგის ქვეშ მყოფი 
                    მოწყობილობიდან შედიხართ, გამოიყენეთ პირადი ბრაუზერის ფანჯარა. შეგიძლიათ წაშალოთ 
                    ბრაუზერის ისტორია ვიზიტის შემდეგ. ყველა წარდგენა დაშიფრული და ფსევდონიმიზებულია 
                    თქვენი ვინაობის დასაცავად.
                  </p>
                </div>

                {/* Language Selection */}
                <div className="border-t border-white/20 pt-3 sm:pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                    <Globe className="h-4 w-4" />
                    აირჩიეთ ენა გასაგრძელებლად / Select a language to continue
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className={`justify-start text-xs sm:text-sm h-9 sm:h-10 ${
                        selectedLanguage === "ka" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100 hover:text-[hsl(220,45%,8%)]" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => handleLanguageSelect("ka")}
                    >
                      ქართულად
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`justify-start text-xs sm:text-sm h-9 sm:h-10 ${
                        selectedLanguage === "en" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100 hover:text-[hsl(220,45%,8%)]" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => handleLanguageSelect("en")}
                    >
                      English
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`justify-start text-xs sm:text-sm h-9 sm:h-10 ${
                        selectedLanguage === "ru" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100 hover:text-[hsl(220,45%,8%)]" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => handleLanguageSelect("ru")}
                    >
                      По-русски
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`justify-start text-xs sm:text-sm h-9 sm:h-10 ${
                        selectedLanguage === "az" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100 hover:text-[hsl(220,45%,8%)]" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => handleLanguageSelect("az")}
                    >
                      Azərbaycanca
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 italic">
                    We are committed to language inclusivity. If you need assistance in Armenian (Հայdelays) 
                    or another language, please contact us directly via Signal—we are here to help.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-white/20 pt-3 sm:pt-4 space-y-2">
                  {!selectedLanguage && (
                    <p className="text-xs text-center text-gray-400 mb-2">
                      აირჩიეთ ენა ზემოთ გასაგრძელებლად / Select a language above to continue
                    </p>
                  )}
                  <Button 
                    onClick={handleNavigateToPortal}
                    className={`w-full justify-between ${
                      selectedLanguage 
                        ? "bg-white text-[hsl(220,45%,8%)] hover:bg-gray-100" 
                        : "bg-white/30 text-white/50 cursor-not-allowed"
                    }`} 
                    size="lg"
                    disabled={!selectedLanguage}
                  >
                    {selectedLanguage ? languageLabels[selectedLanguage].portal : "Secure Evidence Portal / უსაფრთხო პორტალი"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleNavigateToMandate}
                    variant="ghost" 
                    className={`w-full justify-between ${
                      selectedLanguage 
                        ? "text-white hover:bg-white/10 hover:text-white" 
                        : "text-white/50 cursor-not-allowed hover:bg-transparent"
                    }`} 
                    size="lg"
                    disabled={!selectedLanguage}
                  >
                    {selectedLanguage ? languageLabels[selectedLanguage].mandate : "Read Our Mandate / წაიკითხეთ მანდატი"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};