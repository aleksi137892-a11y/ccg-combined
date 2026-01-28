import { ChevronLeft, ExternalLink, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/hooks/use-haptic";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import PageTransition from "@/components/PageTransition";
import { PullRefreshWrapper } from "@/components/PullRefreshWrapper";
import { motion } from "framer-motion";

const TRESORIT_URL = "https://web.tresorit.com/r#3COkGJ8lyQzeYmTk5C-X2A";

const TresoritUpload = () => {
  const { navigateLocalized } = useLocalizedNavigation();
  const haptic = useHaptic();
  const { toast } = useToast();

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: "Refreshed", description: "Page content updated" });
  };

  const handleOpenVault = () => {
    haptic.medium();
    window.open(TRESORIT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <PageTransition>
      <PullRefreshWrapper onRefresh={handleRefresh} className="min-h-screen flex flex-col bg-background overflow-x-hidden overflow-y-auto">
        {/* Safe area top */}
        <div className="h-[env(safe-area-inset-top)] flex-shrink-0" />

        {/* Header */}
        <header className="flex-shrink-0 px-4 py-3 flex items-center z-10">
          <button
            onClick={() => {
              haptic.light();
              navigateLocalized("/submit-evidence");
            }}
            className="p-2 -ml-2 touch-manipulation active:scale-90 transition-transform"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="flex-1 text-center text-sm font-medium pr-8 text-muted-foreground">
            Secure Upload
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col px-6 overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-8"
            >
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-muted-foreground" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-left mb-4">
                Secure document vault
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed text-left">
                You'll be redirected to our end-to-end encrypted Tresorit vault to upload your files.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-start gap-4 text-left">
                <Lock className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">No account required</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    You don't need to create an account or share your real email to upload.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <Shield className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">End-to-end encrypted</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Files are encrypted before leaving your device. Only the Commission can access them.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="border-l-2 border-foreground/20 pl-4 mb-8"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                After uploading, you can optionally return here to add testimony or context about your files.
              </p>
            </motion.div>
          </div>
        </main>

        {/* Bottom action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="flex-shrink-0 px-6 pb-6 space-y-3"
        >
          <Button 
            onClick={handleOpenVault}
            className="w-full h-14 text-base font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
          >
            Open secure vault
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Opens in a new tab • Tresorit by Proton
          </p>
        </motion.div>

        {/* Safe area bottom */}
        <div className="h-[env(safe-area-inset-bottom)] flex-shrink-0" />
      </PullRefreshWrapper>
    </PageTransition>
  );
};

export default TresoritUpload;
