import { useState, useCallback, useEffect, useMemo } from "react";
import { ChevronLeft, ArrowRight, ExternalLink, Check, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHaptic } from "@/hooks/use-haptic";
import { useSwipe } from "@/hooks/use-swipe";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import { PullRefreshWrapper } from "@/components/PullRefreshWrapper";
import { FallbackOptions } from "@/components/FallbackOptions";

type Step = 1 | 2 | 3 | 4 | 5;

const getDocumentTypes = (t: any) => [
  { id: "medical", label: t.intake?.docTypeMedical || "Medical Records", short: "MED" },
  { id: "legal", label: t.intake?.docTypeLegal || "Legal Documents", short: "LEG" },
  { id: "official", label: t.intake?.docTypeOfficial || "Official Correspondence", short: "OFF" },
  { id: "financial", label: t.intake?.docTypeFinancial || "Financial Records", short: "FIN" },
  { id: "identity", label: t.intake?.docTypeIdentity || "Identity Documents", short: "ID" },
  { id: "other", label: t.intake?.docTypeOther || "Other Documents", short: "DOC" },
];

// Generate a stable unique ID for this session
const generateSessionId = () => {
  const stored = sessionStorage.getItem('doc_session_id');
  if (stored) return stored;
  const newId = Math.random().toString(36).substring(2, 6).toUpperCase();
  sessionStorage.setItem('doc_session_id', newId);
  return newId;
};

const Tier2Documents = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { navigateLocalized, getLocalizedPath } = useLocalizedNavigation();
  const haptic = useHaptic();
  const intake = t.intake;

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: "Refreshed", description: "Page content updated" });
  };

  const [step, setStep] = useState<Step>(1);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [location, setLocation] = useState("");
  
  // Stable session ID for this user
  const [sessionId] = useState(() => generateSessionId());

  // Detect keyboard open/close
  useEffect(() => {
    const initialHeight = window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      setKeyboardOpen(currentHeight < initialHeight - 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate automatic filename from user inputs
  const generatedFilename = useMemo(() => {
    // Use provided date or today's date
    const dateStr = documentDate.trim() 
      ? documentDate.trim().replace(/[^0-9-]/g, "").substring(0, 10)
      : new Date().toISOString().split('T')[0];
    
    // Get doc type codes
    const typeCode = selectedTypes.length > 0 
      ? selectedTypes.map(id => DOCUMENT_TYPES.find(t => t.id === id)?.short).filter(Boolean).join("-")
      : "DOC";
    
    // Location code (first 8 chars, alphanumeric only)
    const locationCode = location.trim() 
      ? location.trim().substring(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, "")
      : "GEO";
    
    return `${dateStr}_${typeCode}_${locationCode}_${sessionId}`;
  }, [selectedTypes, location, documentDate, sessionId]);

  const logTriageAction = async (actionType: string, metadata?: { [key: string]: string | boolean | string[] }) => {
    try {
      const { getSessionToken } = await import('@/lib/session-token');
      await supabase.from("triage_logs").insert([{
        action_type: actionType,
        tier: "tier_2",
        metadata: metadata ?? null,
        session_token: getSessionToken(),
      }]);
    } catch (error) {
      console.error("Failed to log triage action:", error);
    }
  };

  const toggleType = (typeId: string) => {
    haptic.light();
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const DOCUMENT_TYPES = getDocumentTypes(t);

  const copyFilename = async () => {
    try {
      await navigator.clipboard.writeText(generatedFilename);
      haptic.success();
      setCopied(true);
      toast({
        title: intake.docCopied || "Copied!",
        description: intake.docCopiedDesc || "Filename copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      haptic.error();
      toast({
        title: intake.docCopyFailed || "Copy failed",
        description: intake.docCopyFailedDesc || "Please manually select and copy the filename",
        variant: "destructive",
      });
    }
  };

  const canGoNext = useCallback(() => {
    return step < 5;
  }, [step]);

  const canGoPrev = useCallback(() => {
    return step > 1;
  }, [step]);

  const goNext = useCallback(() => {
    if (step < 5 && canGoNext()) {
      haptic.light();
      setSlideDirection("left");
      setTimeout(() => {
        setStep((prev) => (prev + 1) as Step);
        setSlideDirection(null);
      }, 150);
    }
  }, [step, canGoNext, haptic]);

  const goPrev = useCallback(() => {
    if (canGoPrev()) {
      haptic.light();
      setSlideDirection("right");
      setTimeout(() => {
        setStep((prev) => (prev - 1) as Step);
        setSlideDirection(null);
      }, 150);
    }
  }, [canGoPrev, haptic]);

  const goToStep = useCallback((targetStep: Step) => {
    if (targetStep === step) return;
    if (targetStep < step || (targetStep === step + 1 && canGoNext())) {
      haptic.light();
      setSlideDirection(targetStep > step ? "left" : "right");
      setTimeout(() => {
        setStep(targetStep);
        setSlideDirection(null);
      }, 150);
    }
  }, [step, canGoNext, haptic]);

  const swipeHandlers = useSwipe(
    {
      onSwipeLeft: goNext,
      onSwipeRight: goPrev,
    },
    { threshold: 60 }
  );

  const handleUploadClick = () => {
    if (!documentDescription.trim()) {
      haptic.error();
      toast({
        title: intake.docDescRequired || "Description required",
        description: intake.docDescRequiredDesc || "Please describe the documents before uploading.",
        variant: "destructive",
      });
      return;
    }

    haptic.medium();

    void logTriageAction("tresorit_click", {
      document_types: selectedTypes,
      has_description: true,
      filename_convention: generatedFilename,
      location: location,
      document_date: documentDate,
    });

    navigateLocalized("/submit-evidence/vault-redirect?return=/submit-evidence/documents");
  };

  const getSlideClass = () => {
    if (!slideDirection) return "translate-x-0 opacity-100";
    if (slideDirection === "left") return "-translate-x-8 opacity-0";
    if (slideDirection === "right") return "translate-x-8 opacity-0";
    return "";
  };

  // Dynamic height for textareas
  const getTextareaHeight = (text: string) => {
    const lineCount = text.split('\n').length + Math.floor(text.length / 40);
    if (lineCount <= 3) return "min-h-[240px]";
    if (lineCount <= 6) return "min-h-[180px]";
    if (lineCount <= 10) return "min-h-[140px]";
    return "min-h-[100px]";
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-8 overflow-x-hidden overflow-y-auto">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {intake.docTypeTitle || "What kind of documents?"}
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              {intake.docTypeSelectAll || "Select all that apply."}
            </p>
            <div className={`space-y-3 overflow-y-auto flex-1 ${keyboardOpen ? 'max-h-[40vh]' : ''}`}>
              {DOCUMENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all touch-manipulation active:scale-[0.98] ${
                    selectedTypes.includes(type.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      selectedTypes.includes(type.id)
                        ? "bg-primary-foreground border-primary-foreground"
                        : "border-muted-foreground/50"
                    }`}>
                      {selectedTypes.includes(type.id) && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-semibold">{type.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <FallbackOptions language={language} className="mt-4" />
          </div>
        );

      case 2:
        return (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {intake.docDescribeTitle || "Describe your documents"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {intake.docDescribeSubtitle || "What do they show? Why are they important?"}
            </p>
            <Textarea
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
              placeholder={intake.docDescPlaceholder}
              className={`flex-1 ${getTextareaHeight(documentDescription)} resize-none text-lg bg-muted/30 border-0 rounded-2xl p-5 focus-visible:ring-1 focus-visible:ring-ring transition-all duration-300`}
              autoFocus
            />
            <FallbackOptions language={language} className="mt-4" />
          </div>
        );

      case 3:
        return (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {intake.docWhenWhereTitle || "When and where?"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {intake.docWhenWhereSubtitle || "This helps us organize and verify your documents."}
            </p>
            
            <div className="space-y-5 flex-1">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  {intake.docDateLabel || "Date of document(s)"}
                </label>
                <Input
                  value={documentDate}
                  onChange={(e) => setDocumentDate(e.target.value)}
                  placeholder={intake.docDatePlaceholder || "e.g., 2024-11-28 or December 2024"}
                  className="h-16 text-lg bg-muted/30 border-0 rounded-2xl px-5 focus-visible:ring-1 focus-visible:ring-ring"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  {intake.docLocationLabel || "Location / Source"}
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={intake.docLocationPlaceholder || "e.g., Tbilisi, Rustavi"}
                  className="h-16 text-lg bg-muted/30 border-0 rounded-2xl px-5 focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <FallbackOptions language={language} className="mt-4" />
          </div>
        );

      case 4:
        return (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {intake.docFilenameTitle || "Your filename"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {intake.docFilenameSubtitle || "Copy this and rename your file before uploading."}
            </p>
            
            <div 
              onClick={copyFilename}
              className="bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-5 cursor-pointer hover:bg-primary/20 active:scale-[0.99] transition-all touch-manipulation mb-6"
            >
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-lg sm:text-xl break-all flex-1 text-foreground font-semibold">
                  {generatedFilename}
                </code>
                <button className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  {copied ? (
                    <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                  ) : (
                    <Copy className="h-6 w-6 text-primary-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-muted/30 rounded-2xl p-5 flex-1">
              <h4 className="text-base font-semibold mb-4">{intake.docMultipleFiles || "Multiple files?"}</h4>
              <p className="text-base text-muted-foreground mb-4">
                {intake.docMultipleFilesDesc || "Add"} <code className="bg-background px-2 py-1 rounded font-mono">_1</code>, <code className="bg-background px-2 py-1 rounded font-mono">_2</code>, <code className="bg-background px-2 py-1 rounded font-mono">_3</code>:
              </p>
              <div className="space-y-2 font-mono text-sm">
                <div className="bg-background/50 rounded-xl p-3">
                  {generatedFilename}_1.pdf
                </div>
                <div className="bg-background/50 rounded-xl p-3">
                  {generatedFilename}_2.pdf
                </div>
                <div className="bg-background/50 rounded-xl p-3 text-muted-foreground">
                  {generatedFilename}_3.pdf ...
                </div>
              </div>
            </div>
            <FallbackOptions language={language} className="mt-4" />
          </div>
        );

      case 5:
        return (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-8">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {intake.docReadyTitle || "Ready to upload"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {intake.docReadySubtitle || "Encrypted end-to-end. Only you control access."}
            </p>

            <div className="bg-muted/30 rounded-2xl p-5 mb-4">
              <h4 className="text-base font-semibold mb-4">{intake.docSummary || "Summary"}</h4>
              <div className="text-base space-y-3">
                <div className="flex">
                  <span className="w-24 text-muted-foreground flex-shrink-0">{intake.docTypes || "Types"}</span>
                  <span className="text-foreground">
                    {selectedTypes.length > 0 
                      ? selectedTypes.map(id => DOCUMENT_TYPES.find(t => t.id === id)?.label).join(", ")
                      : intake.docNotSpecified || "Not specified"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-muted-foreground flex-shrink-0">{intake.docDate || "Date"}</span>
                  <span className="text-foreground">{documentDate || intake.docNotSpecified || "Not specified"}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-muted-foreground flex-shrink-0">{intake.docLocation || "Location"}</span>
                  <span className="text-foreground">{location || intake.docNotSpecified || "Not specified"}</span>
                </div>
              </div>
            </div>

            <div 
              onClick={copyFilename}
              className="bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-4 cursor-pointer hover:bg-primary/20 active:scale-[0.99] transition-all touch-manipulation mb-4"
            >
              <div className="text-xs font-semibold text-primary mb-1">
                {intake.docTapToCopy || "Your filename (tap to copy)"}
              </div>
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-sm break-all flex-1 text-foreground">
                  {generatedFilename}
                </code>
                {copied ? (
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <Copy className="h-5 w-5 text-primary flex-shrink-0" />
                )}
              </div>
            </div>

            <div className="flex-1 bg-muted/30 rounded-2xl p-5">
              <h4 className="text-base font-semibold mb-3">{intake.docAfterUploading || "After uploading:"}</h4>
              <ol className="space-y-2 text-base text-muted-foreground">
                {[intake.afterUpload1, intake.afterUpload2, intake.afterUpload3].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
    }
  };

  return (
    <PageTransition>
      <PullRefreshWrapper onRefresh={handleRefresh} className={`min-h-screen bg-background flex flex-col overflow-x-hidden overflow-y-auto ${keyboardOpen ? 'h-auto' : ''}`}>
        {/* Safe area top */}
        <div className="h-[env(safe-area-inset-top)] flex-shrink-0" />

        {/* Minimal Header - just back button */}
        <header className={`flex-shrink-0 bg-background/95 backdrop-blur-sm z-40 px-4 py-3 ${keyboardOpen ? 'py-2' : ''}`}>
          <button
            onClick={() => step === 1 ? navigateLocalized("/submit-evidence") : goPrev()}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted active:scale-90 transition-all touch-manipulation cursor-pointer"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </header>

        {/* Content */}
        <main 
          className={`flex-1 flex flex-col transition-all duration-150 ease-out overflow-x-hidden ${getSlideClass()}`}
          {...swipeHandlers}
        >
          {renderStep()}
        </main>

        {/* Bottom Navigation Bar */}
        {!keyboardOpen && (
          <footer className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left Arrow */}
              <button
                onClick={goPrev}
                disabled={step === 1}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted active:scale-90 transition-all touch-manipulation cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous step"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              {/* Step Indicators */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => goToStep(s as Step)}
                    disabled={s > step + 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all touch-manipulation cursor-pointer ${
                      s === step 
                        ? "bg-primary text-primary-foreground" 
                        : s < step 
                          ? "bg-muted text-foreground hover:bg-muted/80 active:scale-95" 
                          : "bg-muted/30 text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Right Arrow / Upload Button */}
              {step < 5 ? (
                <button
                  onClick={goNext}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-90 transition-all touch-manipulation cursor-pointer"
                  aria-label="Next step"
                >
                  <ArrowRight className="h-7 w-7" />
                </button>
              ) : (
                <Button 
                  className="h-14 px-6 rounded-full text-base font-semibold touch-manipulation active:scale-[0.98] transition-transform"
                  onClick={handleUploadClick}
                  disabled={!documentDescription.trim()}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  {intake.docUploadButton || "Upload"}
                </Button>
              )}
            </div>
          </footer>
        )}

        {/* Safe area bottom */}
        <div className="h-[env(safe-area-inset-bottom)] flex-shrink-0" />
      </PullRefreshWrapper>
    </PageTransition>
  );
};

export default Tier2Documents;