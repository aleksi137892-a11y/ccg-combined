import { useState } from "react";
import { ChevronLeft, MessageCircle, Mail, Heart } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import { PullRefreshWrapper } from "@/components/PullRefreshWrapper";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACTS } from "@/lib/contacts";

type Screen = "main" | "thank-you";

const Tier4Urgent = () => {
  const { navigateLocalized } = useLocalizedNavigation();
  const haptic = useHaptic();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [screen, setScreen] = useState<Screen>("main");

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: "Refreshed", description: "Page content updated" });
  };

  const logTriageAction = async (actionType: string) => {
    try {
      const { getSessionToken } = await import('@/lib/session-token');
      await supabase.from("triage_logs").insert({
        action_type: actionType,
        tier: "tier_4",
        metadata: { timestamp: new Date().toISOString() },
        session_token: getSessionToken(),
      });
    } catch (error) {
      console.error("Failed to log triage action:", error);
    }
  };

  const handleContactClick = async (type: string, url: string) => {
    haptic.medium();
    await logTriageAction(`${type}_click`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleContinue = () => {
    haptic.medium();
    setScreen("thank-you");
  };

  return (
    <PageTransition>
      <PullRefreshWrapper onRefresh={handleRefresh} className="min-h-screen h-screen bg-[hsl(222,47%,11%)] flex flex-col overflow-hidden">
        <div className="h-[env(safe-area-inset-top)] flex-shrink-0" />

        <AnimatePresence mode="wait">
          {screen === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Minimal Header */}
              <header className="flex-shrink-0 px-4 py-3 flex items-center">
                <button
                  onClick={() => {
                    haptic.light();
                    navigateLocalized("/submit-evidence/portal");
                  }}
                  className="p-2 -ml-2 touch-manipulation active:scale-90 transition-transform"
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-5 w-5 text-white/60" />
                </button>
              </header>

              {/* Main Content - Centered */}
              <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
                <div className="max-w-md">
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mb-5"
                  >
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white/70" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="text-xl sm:text-2xl font-medium tracking-tight leading-tight mb-2 text-white"
                  >
                    {t.intake.urgentSubtitle || "There are people who can help."}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-sm text-white/50 leading-relaxed mb-6"
                  >
                    {t.intake.helpText || "Reach out directly. We respond within 24 hours."}
                  </motion.p>

                  {/* Contact Cards */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="space-y-2"
                  >
                    <button
                      onClick={() => handleContactClick("signal", CONTACTS.signal.url)}
                      className="w-full flex items-center gap-3 p-3 text-left border border-white/10 hover:border-white/20 hover:bg-white/5 active:bg-white active:text-[hsl(222,47%,11%)] transition-all touch-manipulation group rounded-sm"
                    >
                      <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/30 group-active:border-[hsl(222,47%,11%)]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5 text-white/60 group-active:text-[hsl(222,47%,11%)]/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium block text-white group-active:text-[hsl(222,47%,11%)]">{t.intake.signalContact || "Signal"}</span>
                        <span className="text-xs text-white/40 group-active:text-[hsl(222,47%,11%)]/50 truncate block">
                          {CONTACTS.signal.display}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleContactClick("protonmail", CONTACTS.protonmail.url)}
                      className="w-full flex items-center gap-3 p-3 text-left border border-white/10 hover:border-white/20 hover:bg-white/5 active:bg-white active:text-[hsl(222,47%,11%)] transition-all touch-manipulation group rounded-sm"
                    >
                      <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/30 group-active:border-[hsl(222,47%,11%)]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-white/60 group-active:text-[hsl(222,47%,11%)]/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium block text-white group-active:text-[hsl(222,47%,11%)]">{t.intake.emailContact || "ProtonMail"}</span>
                        <span className="text-xs text-white/40 group-active:text-[hsl(222,47%,11%)]/50 truncate block">
                          {CONTACTS.protonmail.display}
                        </span>
                      </div>
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="flex-shrink-0 px-6 md:px-12 pb-3"
              >
                <div className="max-w-md space-y-2">
                  <Button
                    onClick={() => {
                      haptic.medium();
                      navigateLocalized("/submit-evidence/testimony");
                    }}
                    variant="ghost"
                    className="w-full h-10 text-sm font-medium touch-manipulation hover:bg-white/5 active:scale-[0.99] transition-all text-white/50"
                  >
                    {t.intake.returnToStory || "Return to tell my story"}
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="w-full h-11 text-sm font-medium touch-manipulation rounded-sm bg-white text-[hsl(222,47%,11%)] hover:bg-white/90 active:scale-[0.99] transition-all"
                  >
                    {t.intake.continueThankYou || "Continue, thank you"}
                  </Button>
                </div>
              </motion.div>

              {/* Floating Attribution */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex-shrink-0 pb-2 text-center"
              >
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/30">
                  Archimedes Collective
                </p>
              </motion.div>
            </motion.div>
          )}

          {screen === "thank-you" && (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Centered Thank You */}
              <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="mb-5"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mx-auto">
                    <Heart className="w-4 h-4 text-white/70" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-xl sm:text-2xl font-medium tracking-tight mb-2 text-white"
                >
                  {t.intake.thankYouTitle || "Thank you"}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-sm text-white/50 leading-relaxed max-w-xs"
                >
                  {t.intake.thankYouMessage || "Your courage matters. Take care of yourself."}
                </motion.p>
              </div>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex-shrink-0 px-6 md:px-12 pb-3"
              >
                <div className="max-w-md mx-auto space-y-2">
                  <Button
                    onClick={() => {
                      haptic.medium();
                      navigateLocalized("/submit-evidence/testimony");
                    }}
                    variant="ghost"
                    className="w-full h-10 text-sm font-medium touch-manipulation hover:bg-white/5 active:scale-[0.99] transition-all text-white/50"
                  >
                    {t.intake.returnToStory || "Return to tell my story"}
                  </Button>
                  <Button
                    onClick={() => {
                      haptic.medium();
                      navigateLocalized("/");
                    }}
                    className="w-full h-11 text-sm font-medium touch-manipulation rounded-sm bg-white text-[hsl(222,47%,11%)] hover:bg-white/90 active:scale-[0.99] transition-all"
                  >
                    {t.intake.returnHome || "Return home"}
                  </Button>
                </div>
              </motion.div>

              {/* Floating Attribution */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex-shrink-0 pb-2 text-center"
              >
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/30">
                  Archimedes Collective
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-[env(safe-area-inset-bottom)] flex-shrink-0" />
      </PullRefreshWrapper>
    </PageTransition>
  );
};

export default Tier4Urgent;
