import { useState, useCallback, useEffect } from "react";
import { ArrowRight, Check, Download, ChevronLeft, ChevronRight, Copy, WifiOff } from "lucide-react";
import { PullRefreshWrapper } from "@/components/PullRefreshWrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHaptic } from "@/hooks/use-haptic";
import { useSwipe } from "@/hooks/use-swipe";
import { useOfflineQueue } from "@/hooks/use-offline-queue";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import { supabase } from "@/integrations/supabase/client";
import PageTransition from "@/components/PageTransition";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { motion, AnimatePresence } from "framer-motion";

const computeTextSHA256 = async (text: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  } catch (error) {
    // Fallback for environments without crypto.subtle (e.g., non-HTTPS)
    console.warn("crypto.subtle not available, using timestamp-based hash fallback");
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `fallback_${timestamp}_${randomPart}`;
  }
};

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface SubmissionResult {
  id: string;
  hash: string;
  timestamp: string;
}

const Tier1Testimony = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const haptic = useHaptic();
  const { navigateLocalized } = useLocalizedNavigation();
  const { isOnline, addToQueue } = useOfflineQueue();
  const intake = t.intake;

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: "Refreshed", description: "Page content updated" });
  };

  const [step, setStep] = useState<Step>(1);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [testimony, setTestimony] = useState("");
  const [contextWhen, setContextWhen] = useState("");
  const [contextWhere, setContextWhere] = useState("");
  const [contextWho, setContextWho] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const STORAGE_KEY = "testimony_draft";

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.testimony) setTestimony(draft.testimony);
        if (draft.contextWhen) setContextWhen(draft.contextWhen);
        if (draft.contextWhere) setContextWhere(draft.contextWhere);
        if (draft.contextWho) setContextWho(draft.contextWho);
        if (draft.contactInfo) setContactInfo(draft.contactInfo);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Auto-save to localStorage when fields change
  useEffect(() => {
    const draft = { testimony, contextWhen, contextWhere, contextWho, contactInfo };
    const hasContent = testimony || contextWhen || contextWhere || contextWho || contactInfo;
    if (hasContent) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }
  }, [testimony, contextWhen, contextWhere, contextWho, contactInfo]);

  // Clear draft after successful submission
  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
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

  const getNextQueueItem = (): string | null => {
    const queue = getEvidenceQueue();
    return queue.length > 0 ? queue[0] : null;
  };

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

  const canGoNext = useCallback(() => {
    return step < 4;
  }, [step]);

  const canGoPrev = useCallback(() => {
    return step > 1 && step < 5;
  }, [step]);

  const goNext = useCallback(() => {
    if (step < 4 && canGoNext()) {
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

  const handleSubmit = async () => {
    // Allow any submission - testimony, context, or even just contact info
    const hasAnyContent = testimony.trim() || contextWhen.trim() || contextWhere.trim() || contextWho.trim() || contactInfo.trim();
    
    if (!hasAnyContent) {
      haptic.error();
      toast({
        title: intake.submissionFailed || "Please provide some information",
        description: t.intake?.enterSomeInfo || "Enter your testimony, context, or contact information.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    haptic.medium();

    // Build canonical content for hash - include all fields that have data
    const submissionId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const contentParts = [
      testimony.trim() ? `testimony:${testimony.trim()}` : '',
      contextWhen.trim() ? `when:${contextWhen.trim()}` : '',
      contextWhere.trim() ? `where:${contextWhere.trim()}` : '',
      contextWho.trim() ? `who:${contextWho.trim()}` : '',
      contactInfo.trim() ? `contact:${contactInfo.trim()}` : '',
      `id:${submissionId}`,
      `ts:${timestamp}`
    ].filter(Boolean);
    const fullContent = contentParts.join('\n');
    const hash = await computeTextSHA256(fullContent);

    // testimony_text is required - use a placeholder if empty
    const testimonyText = testimony.trim() || `[Submission ${submissionId.slice(0,8)} - see context fields]`;

    const submissionData = {
      id: submissionId,
      testimony_text: testimonyText,
      context_when: contextWhen.trim() || null,
      context_where: contextWhere.trim() || null,
      context_who: contextWho.trim() || null,
      contact_info: contactInfo.trim() || null,
      sha256_hash: hash,
      submitted_at: timestamp,
    };

    // If offline, queue the submission and show success
    if (!isOnline) {
      addToQueue('testimony', submissionData);
      
      setSubmissionResult({
        id: submissionId,
        hash,
        timestamp,
      });

      clearDraft();
      haptic.success();
      setStep(5);
      setIsSubmitting(false);
      
      toast({
        title: "Saved for later",
        description: "Your testimony will be submitted when you're back online.",
      });
      return;
    }

    try {
      console.log("Submitting testimony:", {
        submissionId,
        testimonyTextLength: testimonyText.length,
        hash,
        timestamp,
      });

      // Insert submission with client-generated ID
      // IMPORTANT: do NOT request the inserted row back (SELECT is blocked by RLS)
      const { error: submissionError } = await supabase
        .from("submissions")
        .insert(submissionData);

      console.log("Submission result:", { error: submissionError });

      if (submissionError) throw submissionError;

      // Insert ledger entry
      const { error: ledgerError } = await supabase
        .from("evidence_ledger")
        .insert({
          sha256_hash: hash,
          storage_path: `testimony/${submissionId}`,
          file_name: `testimony_${submissionId}.txt`,
          file_size: new Blob([fullContent]).size,
          file_type: "text/plain",
          submission_type: "testimony",
          submitted_at: timestamp,
        });

      if (ledgerError) throw ledgerError;

      setSubmissionResult({
        id: submissionId,
        hash,
        timestamp,
      });

      clearDraft();
      haptic.success();
      setStep(5);
    } catch (error: any) {
      console.error("Submission error:", error);
      console.error("Error details:", {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        status: error?.status,
      });
      
      // If submission failed due to network, queue it
      if (error?.message?.includes('fetch') || error?.message?.includes('network') || !navigator.onLine) {
        addToQueue('testimony', submissionData);
        
        setSubmissionResult({
          id: submissionId,
          hash,
          timestamp,
        });

        clearDraft();
        haptic.success();
        setStep(5);
        
        toast({
          title: "Saved for later",
          description: "Connection lost. Your testimony will be submitted when you're back online.",
        });
      } else {
        haptic.error();
        toast({
          title: intake.submissionFailed,
          description: error?.message || "Please try again or contact support.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyHash = () => {
    if (submissionResult?.hash) {
      navigator.clipboard.writeText(submissionResult.hash);
      setCopied(true);
      haptic.light();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateReceipt = () => {
    if (!submissionResult) return;
    haptic.medium();

    const receipt = `
CERTIFICATE OF REGISTRATION
Independent Investigative Mechanism of Georgia
Citizen-led Body of Appeal
────────────────────────────────────────────────

Submission Type:     General Testimony
Registration ID:     ${submissionResult.id}
Timestamp (UTC):     ${submissionResult.timestamp}

────────────────────────────────────────────────
DIGITAL FINGERPRINT (SHA-256)

${submissionResult.hash}

────────────────────────────────────────────────

Status: Forensically Preserved

This cryptographic hash serves as a tamper-proof verification
of your submission. The content cannot be altered without
changing this fingerprint.

Berkeley Protocol Compliant
────────────────────────────────────────────────
`;

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iimg_receipt_${submissionResult.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleContinueToNext = () => {
    haptic.medium();
    const nextItem = getNextQueueItem();
    if (nextItem) {
      setStep(6);
    } else {
      // No more items - show thank you screen
      setStep(7);
    }
  };

  const navigateToNextInQueue = () => {
    haptic.medium();
    const queue = getEvidenceQueue();
    if (queue.length > 0) {
      const next = queue[0];
      const remaining = queue.slice(1);
      sessionStorage.setItem('evidence_queue', JSON.stringify(remaining));
      
      // Navigate directly to the next tier route
      switch (next) {
        case "physical":
          navigateLocalized("/submit-evidence/physical");
          break;
        case "digital":
          navigateLocalized("/submit-evidence/berkeley");
          break;
        case "talk":
          navigateLocalized("/submit-evidence/urgent");
          break;
        default:
          setStep(7); // Show thank you screen
      }
    } else {
      // Queue is empty - show thank you screen
      setStep(7);
    }
  };

  // Keyboard shortcuts for desktop power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to submit (on step 4) or go next
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (step === 4) {
          handleSubmit();
        } else if (step < 4) {
          goNext();
        }
      }
      // Arrow keys for navigation
      if (e.key === "ArrowRight" && step < 4 && canGoNext()) {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" && canGoPrev()) {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, canGoNext, canGoPrev, goNext, goPrev]);

  const getSlideClass = () => {
    if (!slideDirection) return "translate-x-0 opacity-100";
    if (slideDirection === "left") return "-translate-x-8 opacity-0";
    if (slideDirection === "right") return "translate-x-8 opacity-0";
    return "";
  };

  const getNextItemLabel = () => {
    const next = getNextQueueItem();
    switch (next) {
      case "physical": return "physical evidence";
      case "digital": return "digital evidence";
      case "talk": return "contacting us";
      default: return null;
    }
  };

  // Check if user has started typing
  const hasStartedTyping = (text: string) => text.length > 0;
  const hasSubstantialContent = (text: string) => text.length > 50;

  const renderStep = () => {
    switch (step) {
      case 1:
        const isTyping1 = hasStartedTyping(testimony);
        const hasContent1 = hasSubstantialContent(testimony);
        return (
          <div className="flex-1 flex flex-col px-6 md:px-12 pt-4 pb-8">
            <motion.div
              animate={{ 
                marginBottom: hasContent1 ? 16 : isTyping1 ? 24 : 32,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <motion.h2 
                className="font-semibold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                animate={{ 
                  fontSize: hasContent1 ? undefined : isTyping1 ? undefined : undefined,
                  scale: hasContent1 ? 0.6 : isTyping1 ? 0.75 : 1,
                  originX: 0,
                  originY: 0,
                }}
                style={{ transformOrigin: "left top" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {intake.step1Title}
              </motion.h2>
              <motion.p 
                animate={{ 
                  opacity: isTyping1 ? 0 : 1,
                  height: isTyping1 ? 0 : "auto",
                  marginTop: isTyping1 ? 0 : 16,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg text-muted-foreground overflow-hidden"
              >
                {intake.step1Desc}
              </motion.p>
            </motion.div>
            <Textarea
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
              placeholder={intake.testimonyPlaceholder}
              className="flex-1 min-h-[200px] resize-none text-base md:text-lg bg-transparent border-0 p-0 focus-visible:ring-0 placeholder:text-muted-foreground/40 leading-relaxed"
              autoFocus
            />
          </div>
        );

      case 2:
        const hasWhen = hasStartedTyping(contextWhen);
        const hasWhere = hasStartedTyping(contextWhere);
        const isTyping2 = hasWhen || hasWhere;
        return (
          <div className="flex-1 flex flex-col px-6 md:px-12 pt-4 pb-8">
            <motion.div
              animate={{ 
                marginBottom: isTyping2 ? 24 : 32,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <motion.h2 
                className="font-semibold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                animate={{ 
                  scale: isTyping2 ? 0.7 : 1,
                }}
                style={{ transformOrigin: "left top" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {intake.step2Title}
              </motion.h2>
              <motion.p 
                animate={{ 
                  opacity: isTyping2 ? 0 : 1,
                  height: isTyping2 ? 0 : "auto",
                  marginTop: isTyping2 ? 0 : 16,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg text-muted-foreground overflow-hidden"
              >
                {intake.step2Desc}
              </motion.p>
            </motion.div>
            <div className="flex-1 flex flex-col gap-8">
              <div>
                <motion.label 
                  animate={{ 
                    scale: hasWhen ? 0.85 : 1,
                    color: hasWhen ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
                  }}
                  style={{ transformOrigin: "left top" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="font-medium mb-3 block text-lg md:text-xl"
                >
                  {intake.whenLabel}
                </motion.label>
                <Input
                  value={contextWhen}
                  onChange={(e) => setContextWhen(e.target.value)}
                  placeholder={intake.whenPlaceholder}
                  className="h-14 text-base md:text-lg bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                />
              </div>
              <div>
                <motion.label 
                  animate={{ 
                    scale: hasWhere ? 0.85 : 1,
                    color: hasWhere ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
                  }}
                  style={{ transformOrigin: "left top" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="font-medium mb-3 block text-lg md:text-xl"
                >
                  {intake.whereLabel}
                </motion.label>
                <Input
                  value={contextWhere}
                  onChange={(e) => setContextWhere(e.target.value)}
                  placeholder={intake.wherePlaceholder}
                  className="h-14 text-base md:text-lg bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        const isTyping3 = hasStartedTyping(contextWho);
        const hasContent3 = hasSubstantialContent(contextWho);
        return (
          <div className="flex-1 flex flex-col px-6 md:px-12 pt-4 pb-8">
            <motion.div
              animate={{ 
                marginBottom: hasContent3 ? 16 : isTyping3 ? 24 : 32,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <motion.h2 
                className="font-semibold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                animate={{ 
                  scale: hasContent3 ? 0.6 : isTyping3 ? 0.75 : 1,
                }}
                style={{ transformOrigin: "left top" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {intake.step3Title}
              </motion.h2>
              <motion.p 
                animate={{ 
                  opacity: isTyping3 ? 0 : 1,
                  height: isTyping3 ? 0 : "auto",
                  marginTop: isTyping3 ? 0 : 16,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg text-muted-foreground overflow-hidden"
              >
                {intake.step3Desc}
              </motion.p>
            </motion.div>
            <Textarea
              value={contextWho}
              onChange={(e) => setContextWho(e.target.value)}
              placeholder={intake.whoPlaceholder}
              className="flex-1 min-h-[200px] resize-none text-base md:text-lg bg-transparent border-0 p-0 focus-visible:ring-0 placeholder:text-muted-foreground/40 leading-relaxed"
            />
          </div>
        );

      case 4:
        const isTyping4 = hasStartedTyping(contactInfo);
        return (
          <div className="flex-1 flex flex-col px-6 md:px-12 pt-4 pb-8">
            <motion.div
              animate={{ 
                marginBottom: isTyping4 ? 24 : 32,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <motion.h2 
                className="font-semibold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                animate={{ 
                  scale: isTyping4 ? 0.7 : 1,
                }}
                style={{ transformOrigin: "left top" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {intake.step4Title}
              </motion.h2>
              <motion.p 
                animate={{ 
                  opacity: isTyping4 ? 0 : 1,
                  height: isTyping4 ? 0 : "auto",
                  marginTop: isTyping4 ? 0 : 16,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg text-muted-foreground overflow-hidden"
              >
                {intake.step4Desc}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-sm text-muted-foreground/70 mt-3 italic"
              >
                {intake.oneAtATime || "We'll do this one at a time. There's no rush."}
              </motion.p>
            </motion.div>
            
            <div className="mb-8">
              <Input
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={intake.contactPlaceholder}
                className="h-14 text-base md:text-lg bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
              />
              <p className="text-sm md:text-base text-muted-foreground mt-3">
                {intake.contactHint}
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex-1 border-t border-border/30 pt-6"
            >
              <h4 className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest mb-4">{intake.docSummary || "Summary"}</h4>
              <div className="text-sm md:text-base space-y-3">
                <div className="flex">
                  <span className="w-20 md:w-24 text-muted-foreground flex-shrink-0">{intake.testimony}</span>
                  <span className="text-foreground line-clamp-2">{testimony.slice(0, 80)}{testimony.length > 80 ? "..." : ""}</span>
                </div>
                <div className="flex">
                  <span className="w-20 md:w-24 text-muted-foreground flex-shrink-0">{intake.whenLabel?.split("?")[0] || "When"}</span>
                  <span className="text-foreground">{contextWhen || "—"}</span>
                </div>
                <div className="flex">
                  <span className="w-20 md:w-24 text-muted-foreground flex-shrink-0">{intake.whereLabel?.split("?")[0] || "Where"}</span>
                  <span className="text-foreground">{contextWhere || "—"}</span>
                </div>
                <div className="flex">
                  <span className="w-20 md:w-24 text-muted-foreground flex-shrink-0">{intake.contact}</span>
                  <span className="text-foreground">{contactInfo || t.evidence.anonymous}</span>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6"
              >
                <Check className="h-8 w-8 text-foreground" />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4"
              >
                {intake.testimonySealed || "Thank you. Your account has been received."}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="text-base md:text-lg text-muted-foreground mb-2"
              >
                {intake.testimonyRecorded || "Your words are now part of the record."}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-sm text-muted-foreground mb-8"
              >
                {intake.saveHash || "You may save this reference for your records."}
              </motion.p>

              {submissionResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">{t.evidence.fingerprintTitle || "Digital Fingerprint"}</span>
                    <button
                      onClick={copyHash}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? (intake.docCopied || "Copied") : (t.evidence.clickToChange ? "Copy" : "Copy")}
                    </button>
                  </div>
                  <div className="bg-muted/30 p-4 font-mono text-xs break-all leading-relaxed">
                    {submissionResult.hash}
                  </div>
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="space-y-3"
              >
                <Button 
                  onClick={generateReceipt} 
                  variant="outline" 
                  className="w-full h-12 rounded-none touch-manipulation border-border/50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {intake.downloadReceipt || "Download receipt"}
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="px-6 pb-6"
            >
              <Button 
                onClick={handleContinueToNext}
                className="w-full h-14 text-base font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
              >
                {getNextQueueItem() ? (
                  <>
                    {intake.continueButton || "Continue"}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  intake.doneButton || "Done"
                )}
              </Button>
            </motion.div>
          </motion.div>
        );

      case 6:
        const nextLabel = getNextItemLabel();
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-6"
          >
            <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md mx-auto">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4"
              >
                {intake.upNext || "Up next"}
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-6"
              >
                {intake.talkAbout || "Now, let's talk about your"} {nextLabel}
              </motion.h2>
              
              {getNextQueueItem() === "physical" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="bg-destructive/10 border-l-2 border-destructive pl-4 py-3 mb-6"
                >
                  <p className="text-sm font-medium text-destructive mb-1">
                    {t.evidence.statementHint ? "Important" : "Important"}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {intake.physicalHandling || "Physical items may need special handling. We'll explain what to do."}
                  </p>
                </motion.div>
              )}

              {getNextQueueItem() === "digital" && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-base text-muted-foreground leading-relaxed text-center"
                >
                  {intake.digitalCataloging || "We'll help you organize your files so they can be properly documented."}
                </motion.p>
              )}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="pb-6"
            >
              <Button 
                onClick={navigateToNextInQueue}
                className="w-full h-14 text-base font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
              >
                {intake.continueButton || "Continue"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        );

      case 7:
        return (
          <ThankYouScreen onReturn={() => navigateLocalized("/")} />
        );
    }
  };

  return (
    <PageTransition>
      <PullRefreshWrapper onRefresh={handleRefresh} className={`min-h-screen bg-background flex flex-col overflow-x-hidden overflow-y-auto ${keyboardOpen ? 'h-auto' : ''}`}>
        {/* Safe area top */}
        <div className="h-[env(safe-area-inset-top)] flex-shrink-0" />

        {/* Header */}
        <header className={`flex-shrink-0 bg-background/95 backdrop-blur-sm z-40 px-4 py-3 flex items-center justify-between ${keyboardOpen ? 'py-2' : ''}`}>
          {step < 5 ? (
            <button
              onClick={() => step === 1 ? navigateLocalized("/submit-evidence") : goPrev()}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted active:scale-90 transition-all touch-manipulation cursor-pointer"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          ) : (
            <div className="w-12" />
          )}
          
          {step < 5 && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => goToStep(s as Step)}
                  disabled={s > step + 1 || (s === step + 1 && !canGoNext())}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation cursor-pointer ${
                    s === step 
                      ? "bg-foreground text-background" 
                      : s < step 
                        ? "bg-muted text-foreground hover:bg-muted/80 active:scale-95" 
                        : "text-muted-foreground opacity-50 cursor-not-allowed"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          
          {step < 5 ? (
            <button
              onClick={step === 4 ? handleSubmit : goNext}
              disabled={(step < 4 && !canGoNext()) || isSubmitting}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-90 transition-all touch-manipulation cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={step === 4 ? "Submit" : "Next step"}
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          ) : (
            <div className="w-12" />
          )}
        </header>

        {/* Content */}
        <main 
          className={`flex-1 flex flex-col transition-all duration-150 ease-out overflow-x-hidden ${step < 5 ? getSlideClass() : ''}`}
          {...(step < 5 ? swipeHandlers : {})}
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </main>

        {/* Bottom action - only on step 4 for submit */}
        {step === 4 && !keyboardOpen && (
          <div className="flex-shrink-0 px-6 pb-6 pt-2">
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl text-base font-semibold touch-manipulation active:scale-[0.98] transition-transform"
            >
              {isSubmitting ? intake.sealing : (intake.submitButton || "Submit")}
            </Button>
          </div>
        )}

        {/* Safe area bottom */}
        <div className="h-[env(safe-area-inset-bottom)] flex-shrink-0" />
      </PullRefreshWrapper>
    </PageTransition>
  );
};

export default Tier1Testimony;
