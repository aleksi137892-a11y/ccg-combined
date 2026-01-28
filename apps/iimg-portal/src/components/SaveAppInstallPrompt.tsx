import { useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

interface SaveAppInstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

const IOS_STORE_URL = "https://apps.apple.com/app/save-by-openarchive/id1462212414";
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=net.opendasharchive.openarchive.release";

export const SaveAppInstallPrompt = ({ isOpen, onClose }: SaveAppInstallPromptProps) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpenStore = (store: "ios" | "android") => {
    const url = store === "ios" ? IOS_STORE_URL : ANDROID_STORE_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-background border-t border-border p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Save by Open Archive required</h3>
                  <p className="text-sm text-muted-foreground">Install the app to continue</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 touch-manipulation active:scale-90 transition-transform"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t.intake.saveAppInstallDesc}
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => handleOpenStore("ios")}
                variant="outline"
                className="w-full h-14 justify-center gap-3 text-base font-medium rounded-none"
              >
                <Download className="h-5 w-5" />
                {t.intake.downloadForIos}
              </Button>
              <Button
                onClick={() => handleOpenStore("android")}
                variant="outline"
                className="w-full h-14 justify-center gap-3 text-base font-medium rounded-none"
              >
                <Download className="h-5 w-5" />
                {t.intake.downloadForAndroid}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              {t.intake.saveAppAfterInstall}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveAppInstallPrompt;
