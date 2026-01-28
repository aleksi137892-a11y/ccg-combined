import { useState, useCallback } from "react";
import { ChevronLeft, ChevronDown, Check, RefreshCw, Copy } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHaptic } from "@/hooks/use-haptic";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import PageTransition from "@/components/PageTransition";
import { PullRefreshWrapper } from "@/components/PullRefreshWrapper";
import { supabase } from "@/integrations/supabase/client";
import { getSessionToken } from "@/lib/session-token";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

const SAVE_APP_IOS_URL = "https://apps.apple.com/app/save-by-openarchive/id1462212414";
const SAVE_APP_ANDROID_URL = "https://play.google.com/store/apps/details?id=net.opendasharchive.openarchive.release";
const SAVE_APP_INFO_URL = "https://open-archive.org/save";

type CaptchaType = "math" | "visual";

interface MathCaptcha {
  a: number;
  b: number;
  answer: number;
}

interface VisualCaptcha {
  shapes: { type: "circle" | "square" | "triangle"; color: string }[];
  question: string;
  answer: string;
}

const SHAPE_COLORS = ["red", "blue", "green", "yellow", "purple"];
const SHAPE_TYPES: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

function generateMathCaptcha(): MathCaptcha {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

function generateVisualCaptcha(): VisualCaptcha {
  const numShapes = Math.floor(Math.random() * 3) + 3;
  const shapes: VisualCaptcha["shapes"] = [];
  
  for (let i = 0; i < numShapes; i++) {
    shapes.push({
      type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      color: SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)],
    });
  }
  
  const targetType = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
  const count = shapes.filter(s => s.type === targetType).length;
  const shapeNames = { circle: "circles", square: "squares", triangle: "triangles" };
  
  return {
    shapes,
    question: `How many ${shapeNames[targetType]}?`,
    answer: count.toString(),
  };
}

function ShapeDisplay({ type, color }: { type: "circle" | "square" | "triangle"; color: string }) {
  const colorMap: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
  };
  
  const baseClasses = `w-6 h-6 ${colorMap[color]}`;
  
  if (type === "circle") {
    return <div className={`${baseClasses} rounded-full`} />;
  }
  if (type === "square") {
    return <div className={baseClasses} />;
  }
  return (
    <div 
      className="w-0 h-0"
      style={{
        borderLeft: "12px solid transparent",
        borderRight: "12px solid transparent",
        borderBottom: `20px solid ${color}`,
      }}
    />
  );
}

const Tier3Berkeley = () => {
  const { t, language } = useLanguage();
  const { navigateLocalized } = useLocalizedNavigation();
  const haptic = useHaptic();
  const { toast } = useToast();

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({ title: "Refreshed", description: "Page content updated" });
  };

  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordExpiry, setPasswordExpiry] = useState<Date | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaType, setCaptchaType] = useState<CaptchaType>("math");
  const [mathCaptcha, setMathCaptcha] = useState<MathCaptcha>(generateMathCaptcha);
  const [visualCaptcha, setVisualCaptcha] = useState<VisualCaptcha>(generateVisualCaptcha);

  const refreshCaptcha = useCallback(() => {
    setCaptchaAnswer("");
    setCaptchaError(false);
    if (captchaType === "math") {
      setMathCaptcha(generateMathCaptcha());
    } else {
      setVisualCaptcha(generateVisualCaptcha());
    }
    haptic.light();
  }, [captchaType, haptic]);

  const switchCaptchaType = (type: CaptchaType) => {
    setCaptchaType(type);
    setCaptchaAnswer("");
    setCaptchaError(false);
    haptic.light();
  };

  const getCurrentAnswer = () => {
    return captchaType === "math" ? mathCaptcha.answer.toString() : visualCaptcha.answer;
  };

  const generateToken = useCallback(async () => {
    // Validate captcha first
    if (captchaAnswer.trim() !== getCurrentAnswer()) {
      setCaptchaError(true);
      haptic.light();
      refreshCaptcha();
      return null;
    }
    setCaptchaError(false);

    setIsGeneratingToken(true);
    try {
      const sessionToken = getSessionToken();
      const { data, error } = await supabase.functions.invoke('generate-save-token', {
        body: { session_token: sessionToken },
      });

      if (error) throw error;

      setPassword(data.password);
      // Password valid for 10 minutes
      setPasswordExpiry(new Date(Date.now() + 10 * 60 * 1000));
      return data.password;
    } catch (err) {
      console.error('Failed to generate token:', err);
      toast({
        title: "Connection Error",
        description: "Could not generate secure link. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGeneratingToken(false);
    }
  }, [toast, captchaAnswer, captchaType, mathCaptcha, visualCaptcha, haptic, refreshCaptcha]);

  const handleGetPassword = useCallback(async () => {
    haptic.medium();
    await generateToken();
  }, [haptic, generateToken]);

  // Check if password is expired
  const isPasswordExpired = passwordExpiry ? passwordExpiry < new Date() : true;
  const displayPassword = !isPasswordExpired && password ? password : null;

  return (
    <PageTransition>
    <PullRefreshWrapper onRefresh={handleRefresh} className="min-h-screen bg-background flex flex-col">
      <div className="h-[env(safe-area-inset-top)]" />

      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 px-4 py-3 flex items-center">
        <button
          onClick={() => navigateLocalized("/submit-evidence")}
          className="p-2 -ml-2 touch-manipulation active:scale-90 transition-transform"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="flex-1 text-center text-sm font-medium pr-8">
          Berkeley Protocol
        </span>
      </header>

      <main className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            Continue with Save by Open Archive
          </h2>
          <p className="text-muted-foreground mb-4">
            The Save app embeds timestamps and cryptographic verification directly into your files, proving they are authentic and unaltered. This is essential for legal admissibility.
          </p>
          
          <div className="bg-muted/30 border border-border/30 p-6 mb-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <QRCodeSVG 
                  value={SAVE_APP_INFO_URL} 
                  size={120}
                  bgColor="transparent"
                  fgColor="currentColor"
                  className="text-foreground"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm font-medium mb-2">The Save app requires a mobile device</p>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're not already on one, scan the QR code to download.
                </p>
                
                <div className="flex gap-3 justify-center md:justify-start">
                  <a 
                    href={SAVE_APP_IOS_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation"
                    onClick={() => haptic.light()}
                  >
                    iOS App Store
                  </a>
                  <a 
                    href={SAVE_APP_ANDROID_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation"
                    onClick={() => haptic.light()}
                  >
                    Google Play
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic border-l-2 border-muted-foreground/30 pl-4 py-2">
            This may take a couple of minutes. Thank you for taking the time to do this properly.
          </p>
        </div>

        {/* Connect App Section */}
        <div className="space-y-6 flex-1">
          <div className="bg-muted/30 border border-border/30 p-5">
            <h3 className="text-sm font-semibold mb-2">Already have the app installed?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Open Save and manually add our server with these details:
            </p>

            <div className="space-y-3 mb-3">
              <CopyableField 
                label="Server" 
                value="nx86146.your-storageshare.de" 
                haptic={haptic}
              />
              <CopyableField 
                label="Path" 
                value="/remote.php/dav/files/iimg_intake" 
                haptic={haptic}
              />
              <CopyableField 
                label="User" 
                value="iimg_intake" 
                haptic={haptic}
              />
            </div>

            <CopyAllCredentials 
              password={displayPassword} 
              haptic={haptic} 
            />

            {/* Captcha */}
            <div className="mb-4 p-3 bg-background/50 border border-border/20">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => switchCaptchaType("math")}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    captchaType === "math" 
                      ? "bg-foreground text-background" 
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  Math
                </button>
                <button
                  onClick={() => switchCaptchaType("visual")}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    captchaType === "visual" 
                      ? "bg-foreground text-background" 
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  Visual
                </button>
              </div>

              {captchaType === "math" ? (
                <label className="text-sm text-muted-foreground mb-2 block">
                  What is {mathCaptcha.a} + {mathCaptcha.b}?
                </label>
              ) : (
                <div className="mb-3">
                  <div className="flex gap-2 justify-center flex-wrap p-3 bg-muted/50 mb-2">
                    {visualCaptcha.shapes.map((shape, i) => (
                      <ShapeDisplay key={i} type={shape.type} color={shape.color} />
                    ))}
                  </div>
                  <label className="text-sm text-muted-foreground block text-center">
                    {visualCaptcha.question}
                  </label>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter answer"
                  value={captchaAnswer}
                  onChange={(e) => {
                    setCaptchaAnswer(e.target.value);
                    setCaptchaError(false);
                  }}
                  className={`rounded-none flex-1 ${captchaError ? 'border-destructive' : ''}`}
                />
                <button
                  onClick={refreshCaptcha}
                  className="p-2 hover:bg-muted/50 transition-colors"
                  title="New captcha"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              {captchaError && (
                <p className="text-xs text-destructive mt-1">Incorrect answer. Please try again.</p>
              )}
            </div>

            <Button
              onClick={handleGetPassword}
              disabled={isGeneratingToken || !captchaAnswer}
              variant="outline"
              className="w-full h-12 text-base font-semibold touch-manipulation rounded-none"
            >
              {isGeneratingToken ? 'Generating...' : 'Get Password'}
            </Button>

            {displayPassword && (
              <div className="mt-4 p-3 bg-primary/5 border border-primary/20">
                <CopyableField 
                  label="Password" 
                  value={displayPassword} 
                  haptic={haptic}
                  highlight
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Expires: {passwordExpiry?.toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>

          {/* Step-by-Step Workflow */}
          <SaveAppWalkthrough haptic={haptic} />

          {/* Need Help Section */}
          <NeedHelpSection haptic={haptic} />
        </div>
      </main>

      <div className="px-6 pb-6 pt-2">
        <Button 
          onClick={() => {
            haptic.medium();
            navigateLocalized("/submit-evidence/documents");
          }}
          variant="outline"
          className="w-full h-14 rounded-none text-base font-semibold touch-manipulation active:scale-[0.98] transition-transform"
        >
          Skip for now
        </Button>
      </div>

      <div className="h-[env(safe-area-inset-bottom)]" />
    </PullRefreshWrapper>
    </PageTransition>
  );
};

// Step-by-Step Walkthrough
const SaveAppWalkthrough = ({ haptic }: { haptic: ReturnType<typeof useHaptic> }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      number: 1,
      title: "Open Save App",
      instruction: "Launch the Save app on your phone. Tap the menu icon in the top-left corner.",
      tip: "Make sure you've downloaded the app first using the links above."
    },
    {
      number: 2,
      title: "Add New Server",
      instruction: "Tap 'Servers', then tap the '+' button to add a new server. Select 'Nextcloud' as the server type.",
      tip: "Make sure you have the latest version of Save."
    },
    {
      number: 3,
      title: "Enter Server Details",
      instruction: "Copy the Server, Path, and User from above and paste them into the corresponding fields.",
      tip: "Use the copy buttons above to easily copy each field."
    },
    {
      number: 4,
      title: "Enter Password",
      instruction: "Solve the captcha and click 'Get Password' above, then paste the generated password into Save. Tap 'Connect' to finish.",
      tip: "The password expires after a few minutes. Generate a new one if needed."
    },
    {
      number: 5,
      title: "Upload Evidence",
      instruction: "Take photos or videos with Save, or import existing files. Save will automatically hash and upload them to our secure server.",
      tip: "Keep location services enabled for GPS metadata—this strengthens your evidence."
    }
  ];

  const handleStepClick = (stepIndex: number) => {
    haptic.light();
    setCurrentStep(stepIndex);
  };

  const markComplete = (stepIndex: number) => {
    haptic.medium();
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  return (
    <div className="bg-muted/30 border border-border/30 p-5">
      <h3 className="text-sm font-semibold mb-4">Step-by-Step Setup</h3>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.number} className="border border-border/20">
            <button
              onClick={() => handleStepClick(index)}
              className={`w-full flex items-center gap-3 p-3 text-left transition-all touch-manipulation ${
                currentStep === index ? 'bg-primary/5' : 'hover:bg-muted/50'
              }`}
            >
              <motion.div 
                animate={{ 
                  backgroundColor: completedSteps.includes(index) 
                    ? 'hsl(var(--primary))' 
                    : currentStep === index 
                      ? 'hsl(var(--foreground))' 
                      : 'hsl(var(--muted-foreground) / 0.3)'
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
              >
                {completedSteps.includes(index) ? (
                  <Check className="h-3 w-3 text-primary-foreground" />
                ) : (
                  <span className={currentStep === index ? 'text-background' : 'text-muted-foreground'}>
                    {step.number}
                  </span>
                )}
              </motion.div>
              <span className={`text-sm font-medium flex-1 ${
                completedSteps.includes(index) ? 'text-muted-foreground line-through' : ''
              }`}>
                {step.title}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${
                currentStep === index ? 'rotate-180' : ''
              }`} />
            </button>
            
            <AnimatePresence>
              {currentStep === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 border-t border-border/20">
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                      {step.instruction}
                    </p>
                    <p className="text-xs text-muted-foreground italic mb-3">
                      Tip: {step.tip}
                    </p>
                    <button
                      onClick={() => markComplete(index)}
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors touch-manipulation"
                    >
                      {completedSteps.includes(index) ? 'Completed' : 'Mark as done'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {completedSteps.length === steps.length && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-primary/10 border border-primary/20 text-center"
        >
          <p className="text-sm font-medium text-primary">
            Setup complete! Your evidence will now be securely uploaded.
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Copyable Field Component
const CopyableField = ({ 
  label, 
  value, 
  haptic, 
  highlight = false 
}: { 
  label: string; 
  value: string; 
  haptic: ReturnType<typeof useHaptic>; 
  highlight?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    haptic.light();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`flex items-center gap-3 p-3 border ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-background/50 border-border/20'}`}>
      <span className="text-xs text-muted-foreground w-16 flex-shrink-0">{label}</span>
      <code className="text-sm font-mono break-all flex-1">{value}</code>
      <button
        onClick={handleCopy}
        className="px-2 py-1 text-xs hover:bg-muted/50 active:scale-90 transition-all touch-manipulation flex-shrink-0"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

// Copy All Credentials Component
const CopyAllCredentials = ({ 
  password, 
  haptic 
}: { 
  password: string | null; 
  haptic: ReturnType<typeof useHaptic>;
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyAll = () => {
    const credentials = [
      `Server: nx86146.your-storageshare.de`,
      `Path: /remote.php/dav/files/iimg_intake`,
      `User: iimg_intake`,
      password ? `Password: ${password}` : null,
    ].filter(Boolean).join('\n');
    
    navigator.clipboard.writeText(credentials);
    haptic.medium();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopyAll}
      className="w-full flex items-center justify-center gap-2 p-3 mb-4 border border-border/30 bg-background/50 hover:bg-muted/50 active:scale-[0.98] transition-all touch-manipulation text-sm font-medium"
    >
      <Copy className="h-4 w-4" />
      {copied ? 'All credentials copied!' : `Copy all credentials${password ? ' (incl. password)' : ''}`}
    </button>
  );
};

// Need Help Expandable Section
const NeedHelpSection = ({ haptic }: { haptic: ReturnType<typeof useHaptic> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const troubleshootingItems = [
    {
      id: "download",
      question: "The app won't download",
      answer: "Make sure you have enough storage space on your device. Try downloading over WiFi instead of mobile data. If using Android, you may need to enable 'Install from unknown sources' in your settings."
    },
    {
      id: "qr",
      question: "QR code won't scan",
      answer: "Ensure your camera has permission to scan QR codes. Try moving closer or further from the screen. Make sure there's adequate lighting. You can also tap the QR code to open the link directly."
    },
    {
      id: "connect",
      question: "App won't connect to the server",
      answer: "Check your internet connection. Try generating a new password. Make sure you're using the latest version of the Save app."
    },
    {
      id: "upload",
      question: "Files won't upload",
      answer: "Large files may take longer—please be patient. Check that you have a stable internet connection. Try uploading one file at a time. If the issue persists, try restarting the app."
    },
    {
      id: "hash",
      question: "What is a cryptographic hash?",
      answer: "A cryptographic hash is a unique digital fingerprint of your file. It proves the file hasn't been altered since it was captured. Think of it like a tamper-evident seal that courts can verify."
    }
  ];

  const toggleItem = (id: string) => {
    haptic.light();
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="border border-border/30">
      <button
        onClick={() => {
          haptic.light();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors touch-manipulation"
      >
        <span className="text-sm font-semibold">Need help?</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/30">
              {troubleshootingItems.map((item) => (
                <div key={item.id} className="border-b border-border/20 last:border-b-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors touch-manipulation"
                  >
                    <span className="text-sm font-medium pr-4">{item.question}</span>
                    <motion.div
                      animate={{ rotate: openItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="p-4 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Still having trouble?</p>
                <a
                  href={CONTACTS.signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Contact us via Signal
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tier3Berkeley;
