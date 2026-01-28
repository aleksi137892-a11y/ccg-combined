import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LocalizedLink } from "@/components/LocalizedLink";
import { ChevronRight, RefreshCw, Check, Share2, Download, Smartphone, Camera } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { usePullRefresh } from "@/hooks/use-pull-refresh";
import { useHaptic } from "@/hooks/use-haptic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { CONTACTS } from "@/lib/contacts";
import { PreservationAccordion } from "@/components/PreservationAccordion";
import { PhysicalEvidenceFlow } from "@/components/PhysicalEvidenceFlow";
import { MentalHealthFlow } from "@/components/MentalHealthFlow";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { DigitalEvidenceFlow } from "@/components/DigitalEvidenceFlow";

type Step = "acknowledge" | "support-choice" | "support-resources" | "welcome" | "intro" | "select" | "story-intro" | "digital-intro" | "digital-options" | "physical-intro" | "physical-flow" | "physical-contact" | "direct-contact" | "other-info" | "complete";

export const SubmitEvidenceLanding = () => {
  const { navigateLocalized } = useLocalizedNavigation();
  const location = useLocation();
  const haptic = useHaptic();
  const { t, language } = useLanguage();
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [step, setStep] = useState<Step>("acknowledge");
  const [visibleWords, setVisibleWords] = useState(0);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [evidenceQueue, setEvidenceQueue] = useState<string[]>([]);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "back">("forward");

  // Tier transition animation variants
  const tierTransitionVariants = {
    enter: (direction: "forward" | "back") => ({
      x: direction === "forward" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "forward" | "back") => ({
      x: direction === "forward" ? -300 : 300,
      opacity: 0,
    }),
  };

  const tierTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  };

  const introWords = [t.intake.whatAreYouSubmitting?.split(" ") || ["We", "need", "to", "understand", "what", "you", "have."]].flat();

  const evidenceTypes = [
    {
      id: "story",
      title: t.intake.tier1Title,
      description: t.intake.tier1Desc,
      route: "/submit-evidence/testimony",
    },
    {
      id: "digital",
      title: t.intake.digitalEvidence,
      description: t.intake.digitalEvidenceDesc,
      route: "/submit-evidence/documents",
    },
    {
      id: "physical",
      title: t.intake.physicalEvidence,
      description: t.intake.physicalEvidenceDesc,
      route: "/submit-evidence/physical",
    },
    {
      id: "talk",
      title: t.intake.directContactTitle || "Connect with our team",
      description: t.intake.directContactDesc || "For direct communication via secure channels",
      route: "/submit-evidence/urgent",
    },
  ];

  // Handle incoming state from other pages
  useEffect(() => {
    const state = location.state as { startStep?: Step } | null;
    if (state?.startStep) {
      setStep(state.startStep);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRefresh = useCallback(async () => {
    haptic.medium();
    await new Promise((r) => setTimeout(r, 600));
    setLastRefresh(Date.now());
    haptic.success();
  }, [haptic]);

  const { pullDistance, isRefreshing, handlers } = usePullRefresh({
    onRefresh: handleRefresh,
  });

  // Word-by-word animation
  useEffect(() => {
    if (step === "intro" && visibleWords < introWords.length) {
      const timer = setTimeout(() => {
        setVisibleWords(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step, visibleWords, introWords.length]);

  // Auto-advance after all words shown
  useEffect(() => {
    if (step === "intro" && visibleWords === introWords.length) {
      const timer = setTimeout(() => {
        setStep("select");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [step, visibleWords, introWords.length]);

  const handleTypeClick = (typeId: string) => {
    haptic.medium();
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleTypeHover = () => {
    haptic.light();
  };

  const processQueue = (queue: string[], index: number) => {
    const currentType = queue[index];
    
    if (!currentType) {
      return;
    }

    switch (currentType) {
      case "story":
        setStep("story-intro");
        break;
      case "digital":
        setStep("digital-intro");
        break;
      case "physical":
        setStep("physical-flow");
        break;
      case "talk":
        setStep("direct-contact");
        break;
      default:
        break;
    }
  };

  const handleContinue = () => {
    haptic.medium();
    
    const orderedQueue = ["story", "physical", "digital", "talk"].filter(id => 
      selectedTypes.includes(id)
    );
    
    setEvidenceQueue(orderedQueue);
    sessionStorage.setItem('evidence_queue', JSON.stringify(orderedQueue));
    
    if (orderedQueue.length > 0) {
      setCurrentQueueIndex(0);
      processQueue(orderedQueue, 0);
    }
  };

  const advanceQueue = () => {
    haptic.medium();
    setTransitionDirection("forward");
    const nextIndex = currentQueueIndex + 1;
    setCurrentQueueIndex(nextIndex);
    
    if (nextIndex < evidenceQueue.length) {
      processQueue(evidenceQueue, nextIndex);
    } else {
      // Queue complete - show thank you screen
      setStep("complete");
    }
  };

  const navigateToRoute = (route: string) => {
    haptic.medium();
    const remainingQueue = evidenceQueue.slice(currentQueueIndex + 1);
    sessionStorage.setItem('evidence_queue', JSON.stringify(remainingQueue));
    navigateLocalized(route);
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen flex flex-col bg-background overflow-x-hidden overflow-y-auto"
        {...handlers}
      >
        {/* Pull to refresh indicator */}
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center overflow-hidden transition-all duration-200 pointer-events-none z-50"
          style={{ height: pullDistance }}
        >
          <RefreshCw 
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              isRefreshing ? "animate-spin" : ""
            }`}
            style={{ 
              transform: `rotate(${pullDistance * 3}deg)`,
              opacity: Math.min(pullDistance / 60, 1)
            }}
          />
        </div>

        {/* Safe area top */}
        <div className="h-[env(safe-area-inset-top)] flex-shrink-0" />

        {/* Header with high-contrast exit button */}
        <header className="flex-shrink-0 px-4 py-3 flex items-center justify-between z-10">
          <LocalizedLink
            to="/"
            className="text-[10px] tracking-[0.3em] text-muted-foreground/60 hover:text-foreground uppercase font-medium touch-manipulation"
          >
            ← IIMG
          </LocalizedLink>
          <LocalizedLink
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-background border-2 border-foreground text-foreground font-semibold text-xs rounded-sm shadow-md hover:bg-foreground hover:text-background transition-all duration-200 touch-manipulation"
          >
            {language === "ka" ? "გასვლა" : language === "ru" ? "Выход" : language === "az" ? "Çıxış" : "Exit"}
          </LocalizedLink>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden min-h-0" key={lastRefresh}>
          <AnimatePresence mode="wait">
            {step === "acknowledge" && (
              <MentalHealthFlow
                onContinue={() => {
                  haptic.medium();
                  setStep("welcome");
                }} 
              />
            )}

            {step === "support-choice" && (
              <AcknowledgeScreen 
                t={t}
                onContinue={() => {
                  haptic.medium();
                  setStep("welcome");
                }} 
              />
            )}

            {step === "support-resources" && (
              <AcknowledgeScreen 
                t={t}
                onContinue={() => {
                  haptic.medium();
                  setStep("welcome");
                }} 
              />
            )}

            {step === "welcome" && (
              <WelcomeScreen 
                t={t}
                onUnderstand={() => {
                  haptic.medium();
                  setStep("intro");
                }} 
              />
            )}

            {step === "intro" && (
              <IntroScreen visibleWords={visibleWords} introWords={introWords} />
            )}
            
            {step === "select" && (
              <SelectScreen
                t={t}
                evidenceTypes={evidenceTypes}
                selectedTypes={selectedTypes}
                onTypeClick={handleTypeClick}
                onTypeHover={handleTypeHover}
                onContinue={handleContinue}
              />
            )}

            {step === "story-intro" && (
              <motion.div
                key="story-intro"
                custom={transitionDirection}
                variants={tierTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tierTransition}
                className="flex-1 flex flex-col"
              >
                <StoryIntroScreen
                  t={t}
                  onContinue={() => navigateToRoute("/submit-evidence/testimony")}
                  hasMore={currentQueueIndex < evidenceQueue.length - 1}
                />
              </motion.div>
            )}

            {step === "digital-intro" && (
              <motion.div
                key="digital-intro"
                custom={transitionDirection}
                variants={tierTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tierTransition}
                className="flex-1 flex flex-col"
              >
                <DigitalEvidenceFlow
                  onComplete={advanceQueue}
                  onTresorit={() => navigateToRoute("/submit-evidence/tresorit")}
                  onBerkeley={() => navigateToRoute("/submit-evidence/berkeley")}
                />
              </motion.div>
            )}

            {step === "physical-flow" && (
              <motion.div
                key="physical-flow"
                custom={transitionDirection}
                variants={tierTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tierTransition}
                className="flex-1 flex flex-col"
              >
                <PhysicalEvidenceFlow
                  onComplete={advanceQueue}
                  onPhotographDigital={() => {
                    haptic.medium();
                    setStep("digital-intro");
                  }}
                />
              </motion.div>
            )}

            {step === "physical-intro" && (
              <motion.div
                key="physical-intro"
                custom={transitionDirection}
                variants={tierTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tierTransition}
                className="flex-1 flex flex-col"
              >
                <PhysicalIntroScreen
                  t={t}
                  onContinue={() => setStep("physical-flow")}
                  onPhotographDigital={() => {
                    haptic.medium();
                    setStep("digital-intro");
                  }}
                />
              </motion.div>
            )}

            {step === "physical-contact" && (
              <motion.div
                key="physical-contact"
                custom={transitionDirection}
                variants={tierTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tierTransition}
                className="flex-1 flex flex-col"
              >
                <PhysicalContactScreen
                  t={t}
                  onSignal={() => window.open(CONTACTS.signal.url, "_blank")}
                  onWhatsApp={() => window.open(CONTACTS.whatsapp.url, "_blank")}
                  onProtonMail={() => window.open(CONTACTS.protonmail.url, "_blank")}
                  onThreema={() => window.open(CONTACTS.threema.url, "_blank")}
                  onSkip={advanceQueue}
                  hasMore={currentQueueIndex < evidenceQueue.length - 1}
                />
              </motion.div>
            )}

            {step === "direct-contact" && (
              <motion.div
                key="direct-contact"
                custom={transitionDirection}
                variants={tierTransitionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tierTransition}
                className="flex-1 flex flex-col"
              >
                <DirectContactScreen
                  t={t}
                  onContinue={advanceQueue}
                  hasMore={currentQueueIndex < evidenceQueue.length - 1}
                />
              </motion.div>
            )}

            {step === "other-info" && (
              <OtherInfoScreen 
                t={t}
                onContinue={() => {
                  haptic.medium();
                  setStep("complete");
                }} 
              />
            )}

            {step === "complete" && (
              <ThankYouScreen onReturn={() => navigateLocalized("/")} />
            )}
          </AnimatePresence>
        </main>

        {/* Safe area bottom */}
        <div className="h-[env(safe-area-inset-bottom)] flex-shrink-0" />
      </div>
    </PageTransition>
  );
};

interface ScreenProps {
  t: any;
}

// Combined Acknowledge + Support Choice Screen - Humanitarian framing
const AcknowledgeScreen = ({ t, onContinue }: ScreenProps & { onContinue: () => void }) => {
  const [showResources, setShowResources] = useState(false);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);
  const haptic = useHaptic();
  const { language } = useLanguage();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      resourcesTitle: {
        en: "You don't have to carry this alone.",
        ka: "თქვენ არ გჭირდებათ ამის მარტო ტარება.",
        ru: "Вам не нужно нести это в одиночку.",
        az: "Bunu tək daşımağa ehtiyacınız yoxdur."
      },
      resourcesSubtitle: {
        en: "Take a moment. Read through some of these resources. And reach out to us directly, any time—we can help you get the care you deserve.",
        ka: "დაუთმეთ ერთი წუთი. გადახედეთ ამ რესურსებს. და დაგვიკავშირდით პირდაპირ, ნებისმიერ დროს—ჩვენ დაგეხმარებით მიიღოთ ის ზრუნვა, რომელიც იმსახურებთ.",
        ru: "Найдите минутку. Ознакомьтесь с этими ресурсами. И обращайтесь к нам напрямую в любое время—мы поможем вам получить помощь, которую вы заслуживаете.",
        az: "Bir dəqiqə ayırın. Bu resurslara nəzər salın. Və hər zaman bizimlə birbaşa əlaqə saxlayın—sizə layiq olduğunuz qayğını almağa kömək edə bilərik."
      },
      weAreHere: {
        en: "We are here for you",
        ka: "ჩვენ აქ ვართ თქვენთვის",
        ru: "Мы здесь для вас",
        az: "Biz sizin üçün buradayıq"
      },
      weAreHereDesc: {
        en: "Whatever you're going through, you deserve support. Our team is available around the clock through secure channels.",
        ka: "რასაც არ უნდა გადიოდეთ, თქვენ იმსახურებთ მხარდაჭერას. ჩვენი გუნდი ხელმისაწვდომია მთელი საათის განმავლობაში უსაფრთხო არხებით.",
        ru: "Что бы вы ни переживали, вы заслуживаете поддержки. Наша команда доступна круглосуточно через защищённые каналы.",
        az: "Nə yaşasanız da, dəstəyə layiqsiniz. Komandamız təhlükəsiz kanallar vasitəsilə gecə-gündüz əlçatandır."
      },
      continueDocumentation: {
        en: "Continue to documentation",
        ka: "გააგრძელეთ დოკუმენტაცია",
        ru: "Продолжить документирование",
        az: "Sənədləşdirməyə davam edin"
      },
      reachOut: {
        en: "Reach out anytime",
        ka: "დაგვიკავშირდით ნებისმიერ დროს",
        ru: "Обращайтесь в любое время",
        az: "İstənilən vaxt əlaqə saxlayın"
      },
      emergencyNote: {
        en: "If you are in immediate danger, please contact local emergency services first.",
        ka: "თუ უშუალო საფრთხეში ხართ, ჯერ დაუკავშირდით ადგილობრივ გადაუდებელ სამსახურებს.",
        ru: "Если вы в непосредственной опасности, сначала обратитесь в местные экстренные службы.",
        az: "Ani təhlükədəsinizsə, əvvəlcə yerli təcili xidmətlərlə əlaqə saxlayın."
      },
      exploreResources: {
        en: "Explore these resources",
        ka: "გადახედეთ ამ რესურსებს",
        ru: "Изучите эти ресурсы",
        az: "Bu resurslara baxın"
      },
      learnMore: {
        en: "Learn more",
        ka: "გაიგეთ მეტი",
        ru: "Узнать больше",
        az: "Ətraflı"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  if (showResources) {
    const healthResources = [
      {
        name: "Médecins Sans Frontières",
        url: "https://www.msf.org/mental-health",
        description: {
          en: "Mental health programs for crisis-affected populations",
          ka: "ფსიქიკური ჯანმრთელობის პროგრამები კრიზისით დაზარალებული მოსახლეობისთვის",
          ru: "Программы психического здоровья для пострадавших от кризиса",
          az: "Böhran təsirinə məruz qalan əhali üçün psixi sağlamlıq proqramları"
        },
        details: {
          en: "MSF provides free mental health support in crisis zones worldwide. Their teams include psychologists, psychiatrists, and counselors who understand trauma.",
          ka: "MSF უზრუნველყოფს უფასო ფსიქიკური ჯანმრთელობის მხარდაჭერას კრიზისულ ზონებში მთელ მსოფლიოში.",
          ru: "MSF предоставляет бесплатную психологическую поддержку в кризисных зонах по всему миру.",
          az: "MSF dünya üzrə böhran zonalarında pulsuz psixi sağlamlıq dəstəyi təqdim edir."
        },
        icon: "🏥"
      },
      {
        name: "DART Center for Journalism and Trauma",
        url: "https://dartcenter.org/resources/self-care",
        description: {
          en: "Self-care resources for journalists and documenters",
          ka: "თვითმოვლის რესურსები ჟურნალისტებისა და დოკუმენტატორებისთვის",
          ru: "Ресурсы по самопомощи для журналистов и документалистов",
          az: "Jurnalistlər və sənədləşdiricilər üçün özünəqayğı resursları"
        },
        details: {
          en: "Specialized resources for those who document difficult events. Includes guides on managing secondary trauma and maintaining wellbeing while doing important work.",
          ka: "სპეციალიზებული რესურსები მათთვის, ვინც რთულ მოვლენებს დოკუმენტირებს.",
          ru: "Специализированные ресурсы для тех, кто документирует сложные события.",
          az: "Çətin hadisələri sənədləşdirənlər üçün xüsusi resurslar."
        },
        icon: "📝"
      },
      {
        name: "Physicians for Human Rights",
        url: "https://phr.org/issues/persecution-of-health-workers/",
        description: {
          en: "Medical documentation and survivor support",
          ka: "სამედიცინო დოკუმენტაცია და გადარჩენილთა მხარდაჭერა",
          ru: "Медицинская документация и поддержка выживших",
          az: "Tibbi sənədləşdirmə və sağ qalanların dəstəyi"
        },
        details: {
          en: "PHR uses medicine and science to document human rights violations. They can help connect you with medical professionals who understand your situation.",
          ka: "PHR იყენებს მედიცინას და მეცნიერებას ადამიანის უფლებების დარღვევების დოკუმენტირებისთვის.",
          ru: "PHR использует медицину и науку для документирования нарушений прав человека.",
          az: "PHR insan hüquqlarının pozulmasını sənədləşdirmək üçün tibb və elmdən istifadə edir."
        },
        icon: "⚕️"
      },
      {
        name: "International Rehabilitation Council for Torture Victims",
        url: "https://irct.org/what-we-do/rehabilitation",
        description: {
          en: "Rehabilitation services for survivors of torture",
          ka: "რეაბილიტაციის სერვისები წამების გადარჩენილთათვის",
          ru: "Реабилитационные услуги для выживших после пыток",
          az: "İşgəncədən sağ qalanlar üçün reabilitasiya xidmətləri"
        },
        details: {
          en: "IRCT is a global network providing specialized rehabilitation for survivors of torture and organized violence. They offer both physical and psychological support.",
          ka: "IRCT არის გლობალური ქსელი, რომელიც უზრუნველყოფს სპეციალიზებულ რეაბილიტაციას წამების და ორგანიზებული ძალადობის გადარჩენილთათვის.",
          ru: "IRCT — глобальная сеть, предоставляющая специализированную реабилитацию для выживших после пыток и организованного насилия.",
          az: "IRCT işgəncə və mütəşəkkil zorakılıqdan sağ qalanlar üçün xüsusi reabilitasiya təqdim edən qlobal şəbəkədir."
        },
        icon: "💚"
      }
    ];

    return (
      <motion.div
        key="support-resources"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
      >
        <div className="flex-1 py-4 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-3">
              {getText("resourcesTitle")}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {getText("resourcesSubtitle")}
            </p>
          </motion.div>

          {/* We are here banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-primary/5 border border-primary/20 p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💙</span>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">{getText("weAreHere")}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getText("weAreHereDesc")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact us section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">
              {getText("reachOut")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={CONTACTS.signal.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="flex items-center gap-3 p-3 border border-border/30 hover:bg-muted/40 hover:border-primary/30 active:bg-foreground active:text-background transition-all touch-manipulation group"
              >
                <span className="text-lg">💬</span>
                <div className="min-w-0">
                  <span className="font-semibold text-sm block">Signal</span>
                  <span className="text-[10px] text-muted-foreground group-active:text-background/60 truncate block">{CONTACTS.signal.display}</span>
                </div>
              </a>
              <a
                href={CONTACTS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="flex items-center gap-3 p-3 border border-border/30 hover:bg-muted/40 hover:border-primary/30 active:bg-foreground active:text-background transition-all touch-manipulation group"
              >
                <span className="text-lg">📱</span>
                <div className="min-w-0">
                  <span className="font-semibold text-sm block">WhatsApp</span>
                  <span className="text-[10px] text-muted-foreground group-active:text-background/60 truncate block">{CONTACTS.whatsapp.display}</span>
                </div>
              </a>
              <a
                href={CONTACTS.protonmail.url}
                onClick={() => haptic.light()}
                className="flex items-center gap-3 p-3 border border-border/30 hover:bg-muted/40 hover:border-primary/30 active:bg-foreground active:text-background transition-all touch-manipulation group"
              >
                <span className="text-lg">✉️</span>
                <div className="min-w-0">
                  <span className="font-semibold text-sm block">ProtonMail</span>
                  <span className="text-[10px] text-muted-foreground group-active:text-background/60 truncate block">{CONTACTS.protonmail.display}</span>
                </div>
              </a>
              <a
                href={CONTACTS.threema.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="flex items-center gap-3 p-3 border border-border/30 hover:bg-muted/40 hover:border-primary/30 active:bg-foreground active:text-background transition-all touch-manipulation group"
              >
                <span className="text-lg">🔒</span>
                <div className="min-w-0">
                  <span className="font-semibold text-sm block">Threema</span>
                  <span className="text-[10px] text-muted-foreground group-active:text-background/60 truncate block">{CONTACTS.threema.display}</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Resources section - Interactive expandable */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3">
              {getText("exploreResources")}
            </p>
            <div className="space-y-2">
              {healthResources.map((resource, index) => (
                <motion.div
                  key={resource.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      haptic.light();
                      setExpandedResource(expandedResource === index ? null : index);
                    }}
                    className="w-full flex items-start gap-3 p-3 text-left border border-border/30 hover:bg-muted/40 hover:border-primary/30 transition-all touch-manipulation"
                  >
                    <span className="text-xl">{resource.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm block">{resource.name}</span>
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        {resource.description[language as keyof typeof resource.description] || resource.description.en}
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${expandedResource === index ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedResource === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 bg-muted/30 border-x border-b border-border/30">
                          <p className="text-sm text-muted-foreground mb-3">
                            {resource.details[language as keyof typeof resource.details] || resource.details.en}
                          </p>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => haptic.medium()}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            {getText("learnMore")}
                            <ChevronRight className="h-4 w-4" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Emergency note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-xs text-muted-foreground mt-6 border-l-2 border-amber-500/50 pl-3 py-1"
          >
            {getText("emergencyNote")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.3 }}
          className="pb-4 flex-shrink-0"
        >
          <Button
            onClick={onContinue}
            className="w-full h-12 text-base font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
          >
            {getText("continueDocumentation")}
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="acknowledge"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
    >
      <div className="flex-1 flex flex-col justify-center max-w-xl py-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6"
        >
          {t.intake.acknowledgeTitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
        >
          {t.intake.acknowledgeText}
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="pb-6 space-y-3 flex-shrink-0"
      >
        <button
          onClick={() => setShowResources(true)}
          className="w-full flex flex-col p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <span className="font-semibold text-base md:text-lg">{t.intake.needSupport}</span>
          <span className="text-sm text-muted-foreground group-active:text-background/60 mt-1">
            {t.intake.needSupportSubtext}
          </span>
        </button>
        <button
          onClick={onContinue}
          className="w-full flex flex-col p-4 text-left bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all touch-manipulation"
        >
          <span className="font-semibold text-base md:text-lg">{t.intake.okayToContinue}</span>
          <span className="text-sm text-background/60 mt-1">
            {t.intake.okayToContinueSubtext}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};

// Removed SupportResourcesScreen - now integrated into AcknowledgeScreen

// Welcome Screen Component - Streamlined with active advocacy
const WelcomeScreen = ({ t, onUnderstand }: ScreenProps & { onUnderstand: () => void }) => (
  <motion.div
    key="welcome"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
  >
    <div className="flex-1 py-8 max-w-xl flex flex-col justify-center">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-left mb-6"
      >
        {t.intake.welcomeTitle}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-base md:text-lg text-muted-foreground leading-relaxed text-left mb-4"
      >
        {t.intake.welcomeText}
      </motion.p>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-base md:text-lg text-muted-foreground leading-relaxed text-left mb-6"
      >
        {t.intake.welcomeSubtext}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="border-l-2 border-muted-foreground/30 pl-4 py-2"
      >
        <p className="text-sm font-medium mb-1">{t.intake.welcomeWhyTitle}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.intake.welcomeWhyText}
        </p>
      </motion.div>
    </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="pb-6 flex-shrink-0"
    >
      <Button 
        onClick={onUnderstand}
        className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
      >
        {t.intake.welcomeContinue}
      </Button>
    </motion.div>
  </motion.div>
);

// Other Information Screen
const OtherInfoScreen = ({ t, onContinue }: ScreenProps & { onContinue: () => void }) => (
  <motion.div
    key="other-info"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
  >
    <div className="flex-1 py-8 max-w-xl">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4"
      >
        {t.intake.otherInfoTitle}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6"
      >
        {t.intake.otherInfoText}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="space-y-3 mb-8"
      >
        <a
          href={CONTACTS.signal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <span className="font-semibold">{t.intake.signalContact}</span>
          <span className="text-sm text-muted-foreground group-active:text-background/60">@{CONTACTS.signal.display}</span>
        </a>
        <a
          href="mailto:submissions_iimg@proton.me"
          className="w-full flex items-center justify-between p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <span className="font-semibold">{t.intake.emailContact}</span>
          <span className="text-sm text-muted-foreground group-active:text-background/60">submissions_iimg@proton.me</span>
        </a>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.3 }}
      className="pb-6 flex-shrink-0"
    >
      <Button
        onClick={onContinue}
        className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
      >
        {t.intake.finishSubmission}
      </Button>
    </motion.div>
  </motion.div>
);

// Final Completion Screen
const CompleteScreen = ({ t }: ScreenProps) => {
  const handleShare = async () => {
    const shareData = {
      title: "Submit Evidence",
      text: "Secure evidence submission for the Independent Investigative Mechanism for Georgia",
      url: window.location.origin + "/submit-evidence",
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData.url);
      toast({
        title: t.intake.linkCopied,
      });
    }
  };

  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
    >
      <div className="flex-1 flex flex-col justify-center max-w-xl py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-6"
        >
          <Check className="h-6 w-6 text-foreground" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4"
        >
          {t.intake.completeTitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
        >
          {t.intake.completeText}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="pb-6 space-y-3 flex-shrink-0"
      >
        <button
          onClick={handleShare}
          className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none border-2 border-border/50 hover:bg-muted/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="h-5 w-5" />
          {t.intake.completeShare}
        </button>
        <a
          href="/"
          className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all flex items-center justify-center"
        >
          {t.intake.completeReturn}
        </a>
      </motion.div>
    </motion.div>
  );
};

// Intro Screen Component
const IntroScreen = ({ visibleWords, introWords }: { visibleWords: number; introWords: string[] }) => (
  <motion.div
    key="intro"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex items-center justify-center px-6 md:px-12"
  >
    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed text-center tracking-tight max-w-2xl">
      {introWords.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ 
            opacity: index < visibleWords ? 1 : 0,
            y: index < visibleWords ? 0 : 8
          }}
          transition={{ 
            duration: 0.15,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  </motion.div>
);

// Select Screen Component
const SelectScreen = ({
  t,
  evidenceTypes,
  selectedTypes,
  onTypeClick,
  onTypeHover,
  onContinue,
}: ScreenProps & {
  evidenceTypes: { id: string; title: string; description: string; route: string }[];
  selectedTypes: string[];
  onTypeClick: (id: string) => void;
  onTypeHover: () => void;
  onContinue: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && selectedTypes.length > 0) {
        e.preventDefault();
        onContinue();
      }
      if (e.key >= "1" && e.key <= "4") {
        const index = parseInt(e.key) - 1;
        if (evidenceTypes[index]) {
          onTypeClick(evidenceTypes[index].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTypes, onContinue, onTypeClick, evidenceTypes]);

  return (
  <motion.div
    key="select"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col"
  >
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="px-6 md:px-12 pt-2 pb-4"
    >
      <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-medium mb-2">
        {t.intake.whatAreYouSubmitting}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground">
        {t.intake.selectAllThatApply || "Select all that apply."}
      </p>
    </motion.div>

    <div className="flex-1 flex flex-col">
      {evidenceTypes.map((type, index) => {
        const isSelected = selectedTypes.includes(type.id);
        return (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.15 + index * 0.04,
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onClick={() => onTypeClick(type.id)}
            onMouseEnter={onTypeHover}
            className={`flex-1 relative flex items-center justify-between px-6 md:px-12 text-left transition-all duration-150 ease-out touch-manipulation border-b border-border/20 ${
              isSelected
                ? "bg-foreground text-background"
                : "bg-background hover:bg-muted/40 active:bg-foreground active:text-background"
            }`}
          >
            <div className="flex-1 py-4 md:py-6">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-tight block">
                {type.title}
              </span>
              <span className={`text-sm md:text-base mt-1 md:mt-2 block leading-relaxed ${
                isSelected ? "text-background/60" : "text-muted-foreground"
              }`}>
                {type.description}
              </span>
            </div>
            
            <motion.div
              initial={false}
              animate={{ 
                scale: isSelected ? 1 : 0,
                opacity: isSelected ? 1 : 0
              }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0 ml-4"
            >
              <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        );
      })}
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: selectedTypes.length > 0 ? 1 : 0,
        y: selectedTypes.length > 0 ? 0 : 20
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex-shrink-0 px-6 md:px-12 py-6 ${
        selectedTypes.length === 0 ? "pointer-events-none" : ""
      }`}
    >
      <Button 
        onClick={onContinue}
        disabled={selectedTypes.length === 0}
        className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
      >
        {t.evidence.continue}
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  </motion.div>
  );
};

// Story Intro Screen
const StoryIntroScreen = ({
  t,
  onContinue,
  hasMore,
}: ScreenProps & {
  onContinue: () => void;
  hasMore: boolean;
}) => (
  <motion.div
    key="story-intro"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col px-6 md:px-12"
  >
    <div className="flex-1 flex flex-col justify-center max-w-xl">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4"
      >
        {t.intake.testimony}
      </motion.p>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-left mb-6"
      >
        {t.intake.tier1Title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-base md:text-lg text-muted-foreground leading-relaxed text-left"
      >
        {t.intake.tier1Desc}
      </motion.p>
    </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.3 }}
      className="pb-6"
    >
      <Button 
        onClick={onContinue}
        className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
      >
        {t.evidence.continue}
      </Button>
    </motion.div>
  </motion.div>
);

// Digital Intro Screen - Consolidated with Save App download
const SAVE_APP_IOS_URL = "https://apps.apple.com/app/save-by-openarchive/id1462212414";
const SAVE_APP_ANDROID_URL = "https://play.google.com/store/apps/details?id=net.opendasharchive.openarchive.release";
const SAVE_APP_INFO_URL = "https://open-archive.org/save";

const DigitalIntroScreen = ({
  t,
  onContinue,
}: ScreenProps & {
  onContinue: () => void;
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const haptic = useHaptic();

  const steps = [
    {
      number: 1,
      title: "Download",
      description: "Get the Save app",
      details: "Install the free Save app by OpenArchive on your phone. It's available for iOS and Android."
    },
    {
      number: 2,
      title: "Capture",
      description: "Take or import files",
      details: "Use Save to photograph or video evidence, or import existing files. The app creates a cryptographic fingerprint automatically."
    },
    {
      number: 3,
      title: "Submit",
      description: "Send to the Commission",
      details: "Scan our QR code to configure Save, then send your verified files directly to our secure server."
    }
  ];

  const handleStepClick = (stepNumber: number) => {
    haptic.light();
    setActiveStep(activeStep === stepNumber ? null : stepNumber);
  };

  return (
    <motion.div
      key="digital-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
    >
      <div className="flex-1 max-w-xl py-6">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4"
        >
          {t.intake.digitalIntroTitle}
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-left mb-4"
        >
          Continue with Save App
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-base text-muted-foreground leading-relaxed mb-6"
        >
          The Save app embeds timestamps and cryptographic verification directly into your files, proving they are authentic and unaltered. This is essential for legal admissibility.
        </motion.p>

        {/* Download Section with QR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="bg-muted/30 border border-border/30 p-5 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex-shrink-0">
              <QRCodeSVG 
                value={SAVE_APP_INFO_URL} 
                size={120}
                bgColor="transparent"
                fgColor="currentColor"
                className="text-foreground"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">The Save app requires a mobile device</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                If you're not already on one, scan the QR code. Or click below:
              </p>
              
              <div className="flex gap-3 justify-center sm:justify-start">
                <a 
                  href={SAVE_APP_IOS_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation"
                >
                  <Download className="h-4 w-4" />
                  iOS
                </a>
                <a 
                  href={SAVE_APP_ANDROID_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation"
                >
                  <Download className="h-4 w-4" />
                  Android
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Encouragement note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="border-l-2 border-muted-foreground/30 pl-4 py-2 mb-6"
        >
          <p className="text-sm text-muted-foreground italic">
            This may take a couple of minutes. Thank you for taking the time to do this properly.
          </p>
        </motion.div>

        {/* Interactive 3-Step Process Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between relative mb-4">
            {/* Connecting line */}
            <div className="absolute top-5 left-[calc(16.67%-8px)] right-[calc(16.67%-8px)] h-px bg-border" />
            
            {steps.map((step, index) => (
              <motion.button
                key={step.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                onClick={() => handleStepClick(step.number)}
                className="flex flex-col items-center text-center flex-1 relative z-10 touch-manipulation group"
              >
                <motion.div 
                  animate={{ 
                    scale: activeStep === step.number ? 1.1 : 1,
                    backgroundColor: activeStep === step.number ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
                  }}
                  transition={{ duration: 0.15 }}
                  className="w-10 h-10 rounded-full text-background flex items-center justify-center text-sm font-semibold mb-3 group-hover:ring-2 group-hover:ring-foreground/20 group-hover:ring-offset-2 transition-all"
                >
                  {step.number}
                </motion.div>
                <span className={`text-sm font-semibold mb-1 transition-colors ${activeStep === step.number ? 'text-foreground' : ''}`}>
                  {step.title}
                </span>
                <span className="text-xs text-muted-foreground">{step.description}</span>
              </motion.button>
            ))}
          </div>

          {/* Expandable details panel */}
          <AnimatePresence mode="wait">
            {activeStep && (
              <motion.div
                key={`step-details-${activeStep}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="bg-muted/50 border border-border/30 p-4 mt-2">
                  <p className="text-sm text-foreground leading-relaxed">
                    {steps.find(s => s.number === activeStep)?.details}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="pb-6 flex-shrink-0"
      >
        <Button 
          onClick={onContinue}
          className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
        >
          {t.evidence.continue}
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Digital Options Screen
const DigitalOptionsScreen = ({
  t,
  onSelectOption,
  onSkip,
  hasMore,
}: ScreenProps & {
  onSelectOption: (option: "tresorit" | "berkeley" | "signal") => void;
  onSkip: () => void;
  hasMore: boolean;
}) => {
  const [showRedirect, setShowRedirect] = useState<"berkeley" | "tresorit" | null>(null);

  if (showRedirect) {
    return (
      <motion.div
        key="redirect-confirm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col px-6 md:px-12"
      >
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6"
          >
            {t.intake.completeTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4"
          >
            {showRedirect === "berkeley" 
              ? t.intake.berkeleyDesc
              : t.intake.tier2WhyDesc}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="pb-6 space-y-3 flex-shrink-0"
        >
          <Button
            onClick={() => {
              onSelectOption(showRedirect);
            }}
            className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
          >
            {t.evidence.continue}
          </Button>
          <button
            onClick={() => setShowRedirect(null)}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-3"
          >
            {t.evidence.back}
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
  <motion.div
    key="digital-options"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col overflow-y-auto"
  >
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="px-6 md:px-12 pt-4 pb-4"
    >
      <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
        {t.intake.digitalIntroTitle}
      </p>
    </motion.div>

    <div className="flex-1 flex flex-col px-6 md:px-12">
      {/* Primary option: Save App */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        onClick={() => setShowRedirect("berkeley")}
        className="flex flex-col py-6 md:py-8 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 group-active:bg-background/20 group-active:text-background">
            {t.intake.berkeleyCompliant}
          </span>
        </div>
        <span className="text-lg sm:text-xl md:text-2xl font-semibold block mb-2">
          {t.intake.chooseBerkeley}
        </span>
        <span className="text-sm md:text-base text-muted-foreground group-active:text-background/60 block leading-relaxed">
          {t.intake.digitalIntroRecommendedDesc}
        </span>
      </motion.button>

      {/* Alternative options header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="pt-6 pb-3"
      >
        <p className="text-sm text-muted-foreground">
          {t.intake.digitalIntroAlternative}
        </p>
      </motion.div>

      {/* Alternative: Upload via Tresorit */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        onClick={() => setShowRedirect("tresorit")}
        className="flex items-center justify-between py-4 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-base md:text-lg font-medium">
          Upload via Tresorit
        </span>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background" />
      </motion.button>

      {/* Alternative: Signal */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        href={CONTACTS.signal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-4 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-base md:text-lg font-medium">
          Send directly via Signal
        </span>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background" />
      </motion.a>

      {/* Alternative: WhatsApp */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        href={CONTACTS.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-4 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-base md:text-lg font-medium">
          Send directly via WhatsApp
        </span>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background" />
      </motion.a>

      {/* Alternative: ProtonMail */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        href={CONTACTS.protonmail.url}
        className="flex items-center justify-between py-4 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-base md:text-lg font-medium">
          Send directly via ProtonMail
        </span>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background" />
      </motion.a>

      {/* Alternative: Threema */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        href={CONTACTS.threema.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-4 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-base md:text-lg font-medium">
          Send directly via Threema
        </span>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background" />
      </motion.a>
    </div>

    {hasMore && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        className="flex-shrink-0 px-6 md:px-12 py-6"
      >
        <button
          onClick={onSkip}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-2"
        >
          {t.evidence.continue}
        </button>
      </motion.div>
    )}
  </motion.div>
  );
};

// Physical Intro Screen - Updated with chemical/munitions protocol and photo guidance
const PhysicalIntroScreen = ({
  t,
  onContinue,
  onPhotographDigital,
}: ScreenProps & {
  onContinue: () => void;
  onPhotographDigital: () => void;
}) => {
  const haptic = useHaptic();
  
  return (
  <motion.div
    key="physical-intro"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col px-6 md:px-12 overflow-y-auto"
  >
    <div className="flex-1 max-w-xl py-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4"
      >
        {t.intake.physicalIntroTitle}
      </motion.p>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-left mb-6"
      >
        {t.intake.physicalHandlingTitle || "Physical Evidence Protocol"}
      </motion.h2>
      
      {/* Critical Warning - Chemical/Munitions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-destructive/10 border-l-2 border-destructive pl-4 py-3 mb-6"
      >
        <p className="text-sm font-semibold text-destructive mb-2">
          {t.intake.physicalProtocolTitle || "Physical Evidence Protocol"}
        </p>
        <p className="text-sm text-destructive/90 leading-relaxed">
          {t.intake.physicalProtocolText || "Evidence of chemical exposure or physical munitions requires expert handling. For your safety, do not attempt to transport these materials or send them via conventional mail."}
        </p>
      </motion.div>

      {/* Secure contact instruction */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="bg-muted/30 border border-border/30 p-4 mb-6"
      >
        <p className="text-sm text-foreground leading-relaxed">
          {t.intake.physicalContactInstruction || "Please notify us via our secure, end-to-end encrypted Signal or Proton channels. Our partners will provide discrete, safe instructions for retrieval and the establishment of a professional chain of custody."}
        </p>
      </motion.div>

      {/* Recommended: Photo first via Save App - Primary CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="bg-primary/5 border border-primary/30 p-4 mb-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Camera className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              {t.intake.physicalPhotoTitle || "Photograph Your Evidence with Save App"}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.intake.physicalPhotoGuidanceSaveApp || "Use the Save app to photograph physical items directly. Save embeds GPS coordinates, timestamps, and cryptographic verification into each photo—making them court-admissible. Photograph from multiple angles, include a scale reference (coin, ruler), and keep location services enabled."}
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            haptic.medium();
            onPhotographDigital();
          }}
          className="w-full h-12 text-sm font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
        >
          <Camera className="mr-2 h-4 w-4" />
          {t.intake.physicalPhotoButton || "Photograph & Submit as Digital Evidence"}
        </Button>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          {t.intake.physicalPhotoAfter || "After photographing, you'll be guided back here to coordinate physical handoff"}
        </p>
      </motion.div>

      {/* Preservation Protocol Accordion */}
      <PreservationAccordion />

      {/* Alternative: Contact directly */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-3"
      >
        Or contact us directly
      </motion.p>

      {/* Maintain possession advisory */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="border-l-2 border-muted-foreground/30 pl-4 py-2 mb-4"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-2">
          {t.intake.importantAdvisory || "Important Advisory"}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.intake.physicalMaintainPossession || "Please remain calm. Maintain personal possession of all materials until you have established a specific course of action in coordination with our team."}
        </p>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="text-sm text-muted-foreground leading-relaxed"
      >
        {t.intake.physicalNextStep || "On the next screen, you will find secure contact options to reach our team."}
      </motion.p>
    </div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.3 }}
      className="pb-6 flex-shrink-0"
    >
      <Button 
        onClick={onContinue}
        className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
      >
        {t.intake.physicalIntroContinue || "Contact Our Team"}
      </Button>
    </motion.div>
  </motion.div>
  );
};

// Physical Contact Screen
const PhysicalContactScreen = ({
  t,
  onSignal,
  onWhatsApp,
  onProtonMail,
  onThreema,
  onSkip,
  hasMore,
}: ScreenProps & {
  onSignal: () => void;
  onWhatsApp: () => void;
  onProtonMail: () => void;
  onThreema: () => void;
  onSkip: () => void;
  hasMore: boolean;
}) => (
  <motion.div
    key="physical-contact"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col overflow-y-auto"
  >
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="px-6 md:px-12 pt-4 pb-2"
    >
      <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
        {t.intake.otherInfoContact}
      </p>
      <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">
        {t.intake.contactForPickup}
      </p>
    </motion.div>

    <div className="flex-1 flex flex-col pt-4">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        onClick={onSignal}
        className="flex flex-col px-6 md:px-12 py-5 md:py-6 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold block mb-1">{t.intake.signalContact}</span>
        <span className="text-sm md:text-base text-muted-foreground group-active:text-background/60 block">
          {CONTACTS.signal.display}
        </span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        onClick={onWhatsApp}
        className="flex flex-col px-6 md:px-12 py-5 md:py-6 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold block mb-1">WhatsApp</span>
        <span className="text-sm md:text-base text-muted-foreground group-active:text-background/60 block">
          {CONTACTS.whatsapp.display}
        </span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        onClick={onProtonMail}
        className="flex flex-col px-6 md:px-12 py-5 md:py-6 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold block mb-1">{t.intake.emailContact}</span>
        <span className="text-sm md:text-base text-muted-foreground group-active:text-background/60 block">
          {CONTACTS.protonmail.display}
        </span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        onClick={onThreema}
        className="flex flex-col px-6 md:px-12 py-5 md:py-6 text-left border-b border-border/20 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold block mb-1">{t.intake.threema}</span>
        <span className="text-sm md:text-base text-muted-foreground group-active:text-background/60 block">
          {CONTACTS.threema.display}
        </span>
      </motion.button>
    </div>

    {hasMore && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex-shrink-0 px-6 md:px-12 py-6"
      >
        <button
          onClick={onSkip}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-2"
        >
          {t.evidence.continue}
        </button>
      </motion.div>
    )}
  </motion.div>
);

// Direct Contact Screen - For users wanting to speak with legal/forensic team
const DirectContactScreen = ({
  t,
  onContinue,
  hasMore,
}: ScreenProps & {
  onContinue: () => void;
  hasMore: boolean;
}) => (
  <motion.div
    key="direct-contact"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="flex-1 flex flex-col overflow-y-auto"
  >
    <div className="flex-1 px-6 md:px-12 py-6">

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4"
      >
        {t.intake.directContactHeader || "Direct Contact"}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-4"
      >
        {t.intake.directContactInstructions || "To connect directly with a member of our legal or forensic team, please contact us via one of the following secure channels:"}
      </motion.h2>

      {/* Secure contact options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="space-y-2 mb-6"
      >
        <a
          href={CONTACTS.signal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <div>
            <span className="font-semibold text-base block">{t.intake.signalContact}</span>
            <span className="text-sm text-muted-foreground group-active:text-background/60">{CONTACTS.signal.display}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background flex-shrink-0" />
        </a>

        <a
          href={CONTACTS.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <div>
            <span className="font-semibold text-base block">WhatsApp</span>
            <span className="text-sm text-muted-foreground group-active:text-background/60">{CONTACTS.whatsapp.display}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background flex-shrink-0" />
        </a>

        <a
          href={CONTACTS.protonmail.url}
          className="w-full flex items-center justify-between p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <div>
            <span className="font-semibold text-base block">{t.intake.emailContact}</span>
            <span className="text-sm text-muted-foreground group-active:text-background/60">{CONTACTS.protonmail.display}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background flex-shrink-0" />
        </a>

        <a
          href={CONTACTS.threema.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between p-4 text-left border border-border/30 hover:bg-muted/40 active:bg-foreground active:text-background transition-all touch-manipulation group"
        >
          <div>
            <span className="font-semibold text-base block">{t.intake.threema}</span>
            <span className="text-sm text-muted-foreground group-active:text-background/60">{CONTACTS.threema.display}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-active:text-background flex-shrink-0" />
        </a>
      </motion.div>

      {/* Security guidelines link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="border-l-2 border-muted-foreground/30 pl-4 py-2"
      >
        <p className="text-sm text-muted-foreground">
          {t.intake.securityGuidelinesPrompt || "Please follow our"}{" "}
          <LocalizedLink to="/security-guide" className="underline hover:text-foreground transition-colors">
            {t.intake.securityGuidelinesLink || "security guidelines"}
          </LocalizedLink>{" "}
          {t.intake.securityGuidelinesSuffix || "to protect yourself and ensure secure communication."}
        </p>
      </motion.div>
    </div>

    {hasMore && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex-shrink-0 px-6 md:px-12 py-6"
      >
        <Button
          onClick={onContinue}
          className="w-full h-14 md:h-16 text-base md:text-lg font-semibold touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all"
        >
          {t.evidence.continue}
        </Button>
      </motion.div>
    )}
  </motion.div>
);

export default SubmitEvidenceLanding;
