import { ChevronLeft } from "lucide-react";
import { useHaptic } from "@/hooks/use-haptic";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import PageTransition from "@/components/PageTransition";
import { PhysicalEvidenceFlow } from "@/components/PhysicalEvidenceFlow";
import { PullRefreshWrapper } from "@/components/PullRefreshWrapper";

const Tier3Physical = () => {
  const { navigateLocalized, getHomePath } = useLocalizedNavigation();
  const haptic = useHaptic();
  const { toast } = useToast();

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: "Refreshed", description: "Page content updated" });
  };

  // Get evidence queue from session storage
  const getEvidenceQueue = (): string[] => {
    try {
      const queue = sessionStorage.getItem('evidence_queue');
      return queue ? JSON.parse(queue) : [];
    } catch {
      return [];
    }
  };

  const navigateToNextInQueue = () => {
    haptic.medium();
    const queue = getEvidenceQueue();
    if (queue.length > 0) {
      const next = queue[0];
      const remaining = queue.slice(1);
      sessionStorage.setItem('evidence_queue', JSON.stringify(remaining));
      
      switch (next) {
        case "story":
          navigateLocalized("/submit-evidence/testimony");
          break;
        case "digital":
          navigateLocalized("/submit-evidence/berkeley");
          break;
        case "talk":
          navigateLocalized("/submit-evidence/urgent");
          break;
        default:
          navigateLocalized("/");
      }
    } else {
      // No more items - go home
      navigateLocalized("/");
    }
  };

  return (
    <PageTransition>
      <PullRefreshWrapper onRefresh={handleRefresh} className="min-h-screen bg-background flex flex-col overflow-x-hidden overflow-y-auto">
        {/* Safe area top */}
        <div className="h-[env(safe-area-inset-top)] flex-shrink-0" />

        {/* Header */}
        <header className="flex-shrink-0 bg-background/95 backdrop-blur-sm z-40 px-4 py-3">
          <button
            onClick={() => navigateLocalized("/submit-evidence")}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted active:scale-90 transition-all touch-manipulation cursor-pointer"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </header>

        {/* Physical Evidence Flow */}
        <PhysicalEvidenceFlow
          onComplete={navigateToNextInQueue}
          onPhotographDigital={() => {
            haptic.medium();
            navigateLocalized("/submit-evidence/berkeley");
          }}
        />

        {/* Safe area bottom */}
        <div className="h-[env(safe-area-inset-bottom)] flex-shrink-0" />
      </PullRefreshWrapper>
    </PageTransition>
  );
};

export default Tier3Physical;
