import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Globe, ArrowRight, Trash2, ChevronDown, ChevronUp, Loader2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

type LanguageOption = "en" | "ka" | "ru" | "az";

const languageLabels: Record<LanguageOption, { portal: string; mandate: string; mandateRoute: string; donate: string }> = {
  en: { portal: "Secure Evidence Portal", mandate: "Read Our Mandate", mandateRoute: "/en", donate: "Support Our Work" },
  ka: { portal: "უსაფრთხო დოკუმენტაციის პორტალი", mandate: "წაიკითხეთ ჩვენი მანდატი", mandateRoute: "/", donate: "მხარი დაუჭირეთ" },
  ru: { portal: "Защищённый портал документации", mandate: "Читать наш мандат", mandateRoute: "/ru", donate: "Поддержать" },
  az: { portal: "Təhlükəsiz Sənəd Portalı", mandate: "Mandatımızı oxuyun", mandateRoute: "/az", donate: "Dəstək olun" },
};

export const SecurityAdvisoryAutoDialog = () => {
  const [open, setOpen] = useState(true);
  const [showClearGuide, setShowClearGuide] = useState(false);
  const [isNavigating, setIsNavigating] = useState<"portal" | "mandate" | null>(null);
  const { setLanguage, language } = useLanguage();
  const navigate = useNavigate();
  
  // Pre-select language from context immediately
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(
    language && ["en", "ka", "ru", "az"].includes(language) ? language as LanguageOption : null
  );

  // Keep selectedLanguage in sync with context language
  useEffect(() => {
    if (language && ["en", "ka", "ru", "az"].includes(language)) {
      setSelectedLanguage(language as LanguageOption);
    }
  }, [language]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageSelect = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setLanguage(lang);
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
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
      else setOpen(true);
    }}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[hsl(220,45%,8%)] text-white border-[hsl(220,30%,18%)] p-4 sm:p-6 data-[state=open]:animate-none">
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
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg text-white">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <Shield className="h-5 w-5" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    Security Advisory / უსაფრთხოების შეტყობინება
                  </motion.span>
                </DialogTitle>
              </DialogHeader>
              
              <motion.div 
                className="space-y-4 sm:space-y-5 py-2 sm:py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                {/* Georgian Section - First */}
                <div className="space-y-2 sm:space-y-3">
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

                {/* English Section */}
                <div className="space-y-2 sm:space-y-3 border-t border-white/20 pt-3 sm:pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Lock className="h-4 w-4" />
                    In English
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Your safety is our priority. If you are accessing this site from a shared or monitored device, 
                    consider using a private browser window. All submissions are encrypted and pseudonymized. 
                    We recommend clearing your browser history after visiting.
                  </p>
                </div>

                {/* Clear My Visit - Expandable Guide */}
                <div className="border-t border-white/20 pt-3 sm:pt-4">
                  <button
                    onClick={() => setShowClearGuide(!showClearGuide)}
                    className="w-full flex items-center justify-between text-left p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-white">Clear My Visit / ვიზიტის წაშლა</span>
                    </div>
                    {showClearGuide ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  
                  {showClearGuide && (
                    <div className="mt-3 p-3 bg-white/5 border border-white/10 text-xs text-gray-300 space-y-3">
                      <div>
                        <p className="font-medium text-white mb-1">Chrome / Edge</p>
                        <p>Ctrl+Shift+Delete (Windows) or ⌘+Shift+Delete (Mac) → Select "Browsing history" → Clear data</p>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">Safari</p>
                        <p>History → Clear History → Select time range → Clear History</p>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">Firefox</p>
                        <p>Ctrl+Shift+Delete (Windows) or ⌘+Shift+Delete (Mac) → Select "Browsing & Download History" → Clear Now</p>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">iPhone / iPad (Safari)</p>
                        <p>Settings → Safari → Clear History and Website Data</p>
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">Android (Chrome)</p>
                        <p>⋮ Menu → History → Clear browsing data</p>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-gray-400 italic">
                          Tip: Use private/incognito mode for future visits to avoid leaving traces.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Language Selection */}
                <div className="border-t border-white/20 pt-3 sm:pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                    <Globe className="h-4 w-4" />
                    აირჩიეთ ენა გასაგრძელებლად / Select a language to continue
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className={`flex items-center justify-start text-xs sm:text-sm h-9 sm:h-10 px-4 border cursor-pointer transition-colors ${
                        selectedLanguage === "ka" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLanguageSelect("ka");
                      }}
                    >
                      ქართულად
                    </button>
                    <button
                      type="button"
                      className={`flex items-center justify-start text-xs sm:text-sm h-9 sm:h-10 px-4 border cursor-pointer transition-colors ${
                        selectedLanguage === "en" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLanguageSelect("en");
                      }}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`flex items-center justify-start text-xs sm:text-sm h-9 sm:h-10 px-4 border cursor-pointer transition-colors ${
                        selectedLanguage === "ru" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLanguageSelect("ru");
                      }}
                    >
                      По-русски
                    </button>
                    <button
                      type="button"
                      className={`flex items-center justify-start text-xs sm:text-sm h-9 sm:h-10 px-4 border cursor-pointer transition-colors ${
                        selectedLanguage === "az" 
                          ? "bg-white text-[hsl(220,45%,8%)] border-white hover:bg-gray-100" 
                          : "bg-transparent border-white/30 text-white hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLanguageSelect("az");
                      }}
                    >
                      Azərbaycanca
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 italic">
                    Need assistance in Armenian (Հայdelays) or another language? Contact us via Signal.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-white/20 pt-3 sm:pt-4 space-y-2">
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
                    className="w-full justify-between text-white hover:bg-white/10 hover:text-white" 
                    size="lg"
                  >
                    {selectedLanguage ? languageLabels[selectedLanguage].mandate : "Read Our Mandate / წაიკითხეთ მანდატი"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        const lang = selectedLanguage || language || "en";
                        navigate(`/${lang}/donate`);
                        handleClose();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors py-2"
                    >
                      <Heart className="h-3 w-3" />
                      {selectedLanguage ? languageLabels[selectedLanguage].donate : "Support Our Work / მხარი დაუჭირეთ"}
                    </button>
                    <span className="text-gray-600">|</span>
                    <button
                      onClick={handleClose}
                      className="flex-1 text-center text-xs text-gray-500 hover:text-gray-300 transition-colors py-2"
                    >
                      Skip / გამოტოვება
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};