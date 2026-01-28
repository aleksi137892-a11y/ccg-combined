import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Heart, Shield, MessageCircle, ArrowLeft, ExternalLink, Copy, Lock, Phone, Mail, Key, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/hooks/use-haptic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSwipe } from "@/hooks/use-swipe";
import { CONTACTS } from "@/lib/contacts";
import { LocalizedLink } from "@/components/LocalizedLink";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import resource icons
import iconMsf from "@/assets/icon-msf.png";
import iconDart from "@/assets/icon-dart.png";
import iconPhr from "@/assets/icon-phr.png";
import iconIrct from "@/assets/icon-irct.png";

// Redesigned flow: safety → medical → emotional → affirming → resources → security → ready
type FlowStep = "safety" | "medical" | "emotional" | "affirming" | "resources" | "security" | "ready";

interface MentalHealthFlowProps {
  onContinue: () => void;
}

export const MentalHealthFlow = ({ onContinue }: MentalHealthFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("safety");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showMedicalDialog, setShowMedicalDialog] = useState(false);
  const haptic = useHaptic();
  const { language, setLanguage } = useLanguage();

  const steps: FlowStep[] = ["safety", "medical", "emotional", "affirming", "resources", "security", "ready"];
  const currentIndex = steps.indexOf(currentStep);

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      safetyQuestion: {
        en: "Documentation with Dignity",
        ka: "დოკუმენტაცია ღირსებით",
        ru: "Документирование с достоинством",
        az: "Ləyaqətlə sənədləşdirmə"
      },
      safetySubtext: {
        en: "This portal balances our forensic duty to accountability with our duty of care to you. Your wellbeing is as important as the evidence you provide.",
        ka: "ეს პორტალი აბალანსებს ჩვენს სასამართლო მოვალეობას ანგარიშვალდებულების და თქვენზე ზრუნვის მოვალეობას შორის. თქვენი კეთილდღეობა ისევე მნიშვნელოვანია, როგორც თქვენ მიერ მოწოდებული მტკიცებულება.",
        ru: "Этот портал уравновешивает нашу правовую обязанность по обеспечению подотчётности с нашей обязанностью заботиться о вас. Ваше благополучие так же важно, как и предоставляемые вами доказательства.",
        az: "Bu portal hesabatlılıq üzrə məhkəmə vəzifəmizi sizə qayğı vəzifəmizlə tarazlayır. Sizin rifahınız təqdim etdiyiniz sübutlar qədər vacibdir."
      },
      legalDisclaimer: {
        en: "By proceeding, you consent to your information being collected and preserved in accordance with international humanitarian law standards. Evidence may be shared with international accountability mechanisms. Your identity will be protected to the fullest extent possible under applicable law.",
        ka: "გაგრძელებით, თქვენ თანხმობას აცხადებთ თქვენი ინფორმაციის შეგროვებასა და შენახვაზე საერთაშორისო ჰუმანიტარული სამართლის სტანდარტების შესაბამისად. მტკიცებულებები შეიძლება გაზიარდეს საერთაშორისო ანგარიშვალდებულების მექანიზმებთან. თქვენი ვინაობა დაცული იქნება მოქმედი კანონმდებლობით მაქსიმალურად.",
        ru: "Продолжая, вы даёте согласие на сбор и хранение вашей информации в соответствии с нормами международного гуманитарного права. Доказательства могут быть переданы международным механизмам подотчётности. Ваша личность будет защищена в максимально возможной степени в соответствии с применимым законодательством.",
        az: "Davam etməklə, məlumatlarınızın beynəlxalq humanitar hüquq standartlarına uyğun toplanmasına və qorunmasına razılıq verirsiniz. Sübutlar beynəlxalq hesabatlılıq mexanizmləri ilə paylaşıla bilər. Şəxsiyyətiniz tətbiq olunan qanunvericiliyə uyğun olaraq maksimum dərəcədə qorunacaq."
      },
      medicalQuestion: {
        en: "Do you need medical attention?",
        ka: "გჭირდებათ სამედიცინო დახმარება?",
        ru: "Вам нужна медицинская помощь?",
        az: "Tibbi yardıma ehtiyacınız var?"
      },
      medicalIncludeInTestimony: {
        en: "If you have ongoing symptoms or injuries, please share them in your testimony—this can be important for documentation.",
        ka: "თუ გაქვთ მიმდინარე სიმპტომები ან დაზიანებები, გთხოვთ გააზიაროთ ისინი თქვენს ჩვენებაში—ეს შეიძლება მნიშვნელოვანი იყოს დოკუმენტაციისთვის.",
        ru: "Если у вас есть симптомы или травмы, пожалуйста, укажите их в своих показаниях—это может быть важно для документации.",
        az: "Davam edən simptomlarınız və ya xəsarətləriniz varsa, lütfən onları ifadənizdə paylaşın—bu sənədləşdirmə üçün vacib ola bilər."
      },
      medicalCareCommitment: {
        en: "We are committed to ensuring everyone has access to adequate care. If you need medical support, reach out via Signal so we can help coordinate.",
        ka: "ჩვენ ვალდებული ვართ უზრუნველვყოთ ყველას ადეკვატურ მოვლაზე წვდომა. თუ გჭირდებათ სამედიცინო მხარდაჭერა, დაგვიკავშირდით Signal-ით, რათა დაგეხმაროთ კოორდინაციაში.",
        ru: "Мы стремимся обеспечить каждому доступ к надлежащей помощи. Если вам нужна медицинская поддержка, свяжитесь с нами через Signal, чтобы мы могли помочь.",
        az: "Hər kəsin adekvat qayğıya çıxışını təmin etməyə sadiqik. Tibbi dəstəyə ehtiyacınız varsa, koordinasiyaya kömək edə bilməyimiz üçün Signal vasitəsilə əlaqə saxlayın."
      },
      yesNeedHelp: {
        en: "Yes, I need help",
        ka: "დიახ, მჭირდება დახმარება",
        ru: "Да, мне нужна помощь",
        az: "Bəli, kömək lazımdır"
      },
      emotionalQuestion: {
        en: "Would you like to speak with someone first?",
        ka: "გსურთ ჯერ ვინმესთან საუბარი?",
        ru: "Хотите сначала поговорить с кем-нибудь?",
        az: "Əvvəlcə kimsə ilə danışmaq istərdiniz?"
      },
      emotionalSubtext: {
        en: "You do not have to carry this alone. Our team is available to listen and provide support before you begin documentation.",
        ka: "თქვენ არ გჭირდებათ ამის მარტო ტარება. ჩვენი გუნდი ხელმისაწვდომია მოსასმენად და მხარდაჭერისთვის.",
        ru: "Вам не нужно нести это в одиночку. Наша команда готова выслушать и поддержать вас.",
        az: "Bunu tək daşımağa ehtiyacınız yoxdur. Komandamız sizi dinləməyə və dəstək verməyə hazırdır."
      },
      yes: {
        en: "Yes",
        ka: "დიახ",
        ru: "Да",
        az: "Bəli"
      },
      imOkay: {
        en: "I'm okay",
        ka: "კარგად ვარ",
        ru: "Всё хорошо",
        az: "Yaxşıyam"
      },
      // Affirming page (first after emotional - more humanitarian)
      affirmingTitle: {
        en: "We're here for you.",
        ka: "ჩვენ აქ ვართ თქვენთვის.",
        ru: "Мы рядом.",
        az: "Biz sizin yanınızdayıq."
      },
      affirmingSubtext: {
        en: "Whatever you have witnessed or experienced, you do not have to carry it alone.",
        ka: "რაც არ უნდა გინახავთ ან განგიცდიათ, თქვენ არ გჭირდებათ მარტო ატაროთ.",
        ru: "Что бы вы ни видели или пережили, вам не нужно нести это в одиночку.",
        az: "Nəyə şahid olmusunuz və ya yaşamısınız, bunu tək daşımağa ehtiyacınız yoxdur."
      },
      affirmingMessage1: {
        en: "Your story matters. Your voice matters.",
        ka: "თქვენი ისტორია მნიშვნელოვანია. თქვენი ხმა მნიშვნელოვანია.",
        ru: "Ваша история важна. Ваш голос важен.",
        az: "Sizin hekayəniz vacibdir. Səsiniz vacibdir."
      },
      affirmingMessage2: {
        en: "We are here to listen, to document with care, and to ensure what you share is preserved with the dignity it deserves.",
        ka: "ჩვენ აქ ვართ მოსასმენად, გულისყურით დოკუმენტირებისთვის და იმის უზრუნველსაყოფად, რომ თქვენი გაზიარებული შენარჩუნდეს იმ ღირსებით, რასაც იმსახურებს.",
        ru: "Мы здесь, чтобы слушать, документировать с заботой и сохранить то, чем вы делитесь, с достоинством, которого это заслуживает.",
        az: "Biz dinləmək, diqqətlə sənədləşdirmək və paylaşdıqlarınızı layiq olduğu ləyaqətlə qorumaq üçün buradayıq."
      },
      affirmingMessage3: {
        en: "Take your time. There is no rush.",
        ka: "დაუთმეთ დრო. აჩქარება არ არის.",
        ru: "Не торопитесь. Спешить некуда.",
        az: "Vaxtınızı ayırın. Tələsmə yoxdur."
      },
      // Resources page
      resourcesTitle: {
        en: "There are people who can help.",
        ka: "არიან ადამიანები, ვინც დაგეხმარებიან.",
        ru: "Есть люди, которые могут помочь.",
        az: "Kömək edə biləcək insanlar var."
      },
      resourcesSubtext: {
        en: "These organizations provide specialized support for those who have experienced trauma, violence, or persecution. You may find their resources helpful now or in the future.",
        ka: "ეს ორგანიზაციები სპეციალიზებულ მხარდაჭერას უწევენ მათ, ვინც ტრავმა, ძალადობა ან დევნა განიცადა. მათი რესურსები შეიძლება გამოგადგეთ ახლა ან მომავალში.",
        ru: "Эти организации оказывают специализированную поддержку тем, кто пережил травму, насилие или преследование. Их ресурсы могут быть полезны сейчас или в будущем.",
        az: "Bu təşkilatlar travma, zorakılıq və ya təqib yaşayanlara ixtisaslaşmış dəstək göstərirlər. Onların resursları indi və ya gələcəkdə sizə faydalı ola bilər."
      },
      learnMore: {
        en: "Learn more",
        ka: "გაიგე მეტი",
        ru: "Узнать больше",
        az: "Daha ətraflı"
      },
      // Security page
      securityTitle: {
        en: "We want to hear from you—securely.",
        ka: "ჩვენ გვინდა მოგისმინოთ—უსაფრთხოდ.",
        ru: "Мы хотим услышать вас—безопасно.",
        az: "Sizdən eşitmək istəyirik—təhlükəsiz şəkildə."
      },
      securitySubtext: {
        en: "Your safety is our priority. Before reaching out, please take a moment to review these guidelines.",
        ka: "თქვენი უსაფრთხოება ჩვენი პრიორიტეტია. დაკავშირებამდე, გთხოვთ, გადახედოთ ამ გზამკვლევს.",
        ru: "Ваша безопасность — наш приоритет. Прежде чем связаться с нами, ознакомьтесь с этими рекомендациями.",
        az: "Təhlükəsizliyiniz prioritetimizdir. Əlaqə saxlamazdan əvvəl bu təlimatlara nəzər salın."
      },
      viewSecurityGuide: {
        en: "Read Security Guidelines",
        ka: "წაიკითხეთ უსაფრთხოების გზამკვლევი",
        ru: "Прочитать руководство по безопасности",
        az: "Təhlükəsizlik Təlimatlarını Oxuyun"
      },
      contactUsSecurely: {
        en: "Reach us through these secure channels:",
        ka: "დაგვიკავშირდით ამ უსაფრთხო არხებით:",
        ru: "Свяжитесь с нами через защищённые каналы:",
        az: "Bu təhlükəsiz kanallar vasitəsilə bizimlə əlaqə saxlayın:"
      },
      // Ready page (conclusion)
      readyTitle: {
        en: "When you're ready, we're ready.",
        ka: "როცა მზად ხართ, ჩვენც მზად ვართ.",
        ru: "Когда вы готовы, мы готовы.",
        az: "Hazır olduğunuzda, biz də hazırıq."
      },
      readySubtext: {
        en: "You do not need to know what happens next. That is our responsibility. Your role is simply to share what you witnessed or experienced.",
        ka: "თქვენ არ გჭირდებათ იცოდეთ რა ხდება შემდეგ. ეს ჩვენი პასუხისმგებლობაა. თქვენი როლი მხოლოდ გაზიარებაა, რაც ინახეთ ან განიცადეთ.",
        ru: "Вам не нужно знать, что будет дальше. Это наша ответственность. Ваша роль — просто рассказать о том, что вы видели или пережили.",
        az: "Bundan sonra nə olacağını bilməyinizə ehtiyac yoxdur. Bu bizim məsuliyyətimizdir. Sizin rolunuz sadəcə şahid olduğunuz və ya yaşadığınızı paylaşmaqdır."
      },
      readyMessage: {
        en: "Everything you share is encrypted, handled with care, and preserved to the highest evidentiary standards.",
        ka: "ყველაფერი, რასაც გაგვიზიარებთ, დაშიფრულია, სიფრთხილით იმართება და შენარჩუნებულია უმაღლესი მტკიცებულებითი სტანდარტებით.",
        ru: "Всё, чем вы делитесь, зашифровано, обрабатывается с заботой и сохраняется по высшим доказательным стандартам.",
        az: "Paylaşdığınız hər şey şifrələnir, diqqətlə idarə olunur və ən yüksək sübut standartlarına uyğun qorunur."
      },
      continueReady: {
        en: "I'm ready to share my story",
        ka: "მზად ვარ გავუზიარო ჩემი ისტორია",
        ru: "Я готов(а) рассказать свою историю",
        az: "Hekayəmi paylaşmağa hazıram"
      },
      next: {
        en: "Next",
        ka: "შემდეგი",
        ru: "Далее",
        az: "Növbəti"
      },
      back: {
        en: "Back",
        ka: "უკან",
        ru: "Назад",
        az: "Geri"
      },
      medicalDialogTitle: {
        en: "How would you like to proceed?",
        ka: "როგორ გსურთ გაგრძელება?",
        ru: "Как вы хотите продолжить?",
        az: "Necə davam etmək istərdiniz?"
      },
      reachOutNow: {
        en: "Reach out to our team now via Signal",
        ka: "დაუკავშირდით ჩვენს გუნდს ახლავე Signal-ით",
        ru: "Связаться с нашей командой сейчас через Signal",
        az: "İndi Signal vasitəsilə komandamızla əlaqə saxlayın"
      },
      reachOutNowSubtext: {
        en: "We can help coordinate medical support",
        ka: "ჩვენ შეგვიძლია დაგეხმაროთ სამედიცინო დახმარების კოორდინაციაში",
        ru: "Мы можем помочь координировать медицинскую поддержку",
        az: "Tibbi dəstəyi koordinasiya etməyə kömək edə bilərik"
      },
      returnToIntake: {
        en: "Return to documentation intake",
        ka: "დოკუმენტაციის მიღებაზე დაბრუნება",
        ru: "Вернуться к приему документации",
        az: "Sənədləşdirmə qəbuluna qayıdın"
      },
      returnToIntakeSubtext: {
        en: "Continue with your submission first",
        ka: "ჯერ გააგრძელეთ თქვენი წარდგენა",
        ru: "Сначала продолжите подачу документов",
        az: "Əvvəlcə təqdimatınıza davam edin"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  const handleNext = () => {
    haptic.medium();
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setDirection(1);
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    haptic.light();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setDirection(-1);
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleImOkay = () => {
    haptic.medium();
    onContinue();
  };

  const handleYesSpeakFirst = () => {
    haptic.medium();
    setDirection(1);
    setCurrentStep("affirming");
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handleBack,
  }, { threshold: 50 });

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const healthResources = [
    {
      name: "Médecins Sans Frontières",
      shortName: "MSF",
      url: "https://www.msf.org/mental-health",
      icon: iconMsf,
      description: {
        en: "Mental health programs for crisis-affected populations",
        ka: "ფსიქიკური ჯანმრთელობის პროგრამები კრიზისით დაზარალებულთათვის",
        ru: "Программы психического здоровья для пострадавших от кризиса",
        az: "Böhran təsirinə məruz qalanlar üçün psixi sağlamlıq proqramları"
      }
    },
    {
      name: "DART Center",
      shortName: "DART",
      url: "https://dartcenter.org/resources/self-care",
      icon: iconDart,
      description: {
        en: "Self-care resources for documenters and witnesses",
        ka: "თვითმოვლის რესურსები დოკუმენტატორებისთვის",
        ru: "Ресурсы по самопомощи для документалистов",
        az: "Sənədləşdiricilər üçün özünəqayğı resursları"
      }
    },
    {
      name: "Physicians for Human Rights",
      shortName: "PHR",
      url: "https://phr.org/issues/persecution-of-health-workers/",
      icon: iconPhr,
      description: {
        en: "Medical documentation and survivor support",
        ka: "სამედიცინო დოკუმენტაცია და გადარჩენილთა მხარდაჭერა",
        ru: "Медицинская документация и поддержка выживших",
        az: "Tibbi sənədləşdirmə və sağ qalanların dəstəyi"
      }
    },
    {
      name: "Int'l Rehabilitation Council",
      shortName: "IRCT",
      url: "https://irct.org/what-we-do/rehabilitation",
      icon: iconIrct,
      description: {
        en: "Rehabilitation services for survivors of torture",
        ka: "რეაბილიტაციის სერვისები წამების გადარჩენილთათვის",
        ru: "Реабилитационные услуги для выживших после пыток",
        az: "İşgəncədən sağ qalanlar üçün reabilitasiya xidmətləri"
      }
    }
  ];

  const securityTips = [
    {
      en: "Use a VPN when possible",
      ka: "გამოიყენეთ VPN, როცა შესაძლებელია",
      ru: "По возможности используйте VPN",
      az: "Mümkün olduqda VPN istifadə edin"
    },
    {
      en: "Clear your browser history after visiting",
      ka: "ვიზიტის შემდეგ გაასუფთავეთ ბრაუზერის ისტორია",
      ru: "Очистите историю браузера после посещения",
      az: "Ziyarətdən sonra brauzer tarixçəsini silin"
    },
    {
      en: "Use encrypted messaging apps",
      ka: "გამოიყენეთ დაშიფრული მესენჯერები",
      ru: "Используйте зашифрованные мессенджеры",
      az: "Şifrəli mesajlaşma tətbiqlərini istifadə edin"
    }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case "safety":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center overflow-y-auto py-4"
          >
            <div className="flex justify-center mb-6">
              <Heart className="h-14 w-14 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4">
              {getText("safetyQuestion")}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed max-w-md mx-auto mb-6">
              {getText("safetySubtext")}
            </p>
            <div className="max-w-lg mx-auto px-4">
              <div className="border-l-2 border-primary/30 pl-4 py-3 bg-muted/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground/80">Informed Consent: </span>
                  {getText("legalDisclaimer")}
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "medical":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-6">
              <Heart className="h-12 w-12 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4">
              {getText("medicalQuestion")}
            </h2>
            <div className="space-y-4 max-w-md mx-auto">
              <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">
                {getText("medicalIncludeInTestimony")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">
                {getText("medicalCareCommitment")}
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  haptic.medium();
                  setShowMedicalDialog(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors touch-manipulation"
              >
                {getText("yesNeedHelp")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        );

      case "emotional":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-8">
              <Heart className="h-16 w-16 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6">
              {getText("emotionalQuestion")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground text-center leading-relaxed max-w-md mx-auto">
              {getText("emotionalSubtext")}
            </p>
          </motion.div>
        );

      case "affirming":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-8">
              <Heart className="h-16 w-16 text-primary" fill="currentColor" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6">
              {getText("affirmingTitle")}
            </h2>
            <div className="space-y-5 max-w-md mx-auto">
              <p className="text-base md:text-lg text-muted-foreground text-center leading-relaxed">
                {getText("affirmingSubtext")}
              </p>
              <p className="text-base text-foreground text-center leading-relaxed font-medium">
                {getText("affirmingMessage1")}
              </p>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {getText("affirmingMessage2")}
              </p>
              <p className="text-sm text-muted-foreground/80 text-center italic">
                {getText("affirmingMessage3")}
              </p>
            </div>
          </motion.div>
        );

      case "resources":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full"
          >
            {/* Minimal Header */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {getText("resourcesTitle")}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-11">
                {getText("resourcesSubtext")}
              </p>
            </div>

            {/* Resources grid - redesigned minimal cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
              {healthResources.map((resource, index) => (
                <motion.a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic.medium()}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 25 }}
                  className="group flex flex-col p-3 sm:p-4 border border-border/40 hover:border-border rounded-sm bg-muted/20 hover:bg-muted/40 transition-all duration-200"
                >
                  {/* Icon and title row */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-background border border-border/50 p-1.5 flex-shrink-0">
                      <img 
                        src={resource.icon} 
                        alt={resource.shortName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs sm:text-sm text-foreground leading-tight line-clamp-2">
                        {resource.shortName}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight line-clamp-2 flex-1">
                    {resource.description[language as keyof typeof resource.description] || resource.description.en}
                  </p>
                  
                  {/* Learn more */}
                  <div className="flex items-center gap-1 mt-2 text-[9px] sm:text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                    <span className="uppercase tracking-wider">{getText("learnMore")}</span>
                    <ChevronRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Floating Archimedes Attribution */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pt-4 text-center"
            >
              <a
                href="https://archimedescollective.org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="inline-block text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                Archimedes Collective
              </a>
            </motion.div>
          </motion.div>
        );

      case "security":
        const contactMethods = [
          {
            name: "Signal",
            icon: Lock,
            url: CONTACTS.signal.url,
            display: CONTACTS.signal.display,
            description: {
              en: "End-to-end encrypted. Best for sensitive conversations.",
              ka: "ბოლოდან ბოლომდე დაშიფრული. საუკეთესო მგრძნობიარე საუბრებისთვის.",
              ru: "Сквозное шифрование. Лучше для конфиденциальных разговоров.",
              az: "Uçdan-uca şifrələnmiş. Həssas söhbətlər üçün ən yaxşı."
            },
            securityLevel: "highest",
            accentColor: "text-emerald-500",
            borderColor: "border-emerald-500/30 hover:border-emerald-500/60"
          },
          {
            name: "ProtonMail",
            icon: Mail,
            url: CONTACTS.protonmail.url,
            display: CONTACTS.protonmail.display,
            description: {
              en: "Encrypted email. Best for detailed written submissions.",
              ka: "დაშიფრული ელფოსტა. საუკეთესო დეტალური წერილობითი წარდგენისთვის.",
              ru: "Зашифрованная почта. Лучше для подробных письменных заявлений.",
              az: "Şifrələnmiş e-poçt. Ətraflı yazılı təqdimatlar üçün ən yaxşı."
            },
            securityLevel: "high",
            accentColor: "text-purple-500",
            borderColor: "border-purple-500/30 hover:border-purple-500/60"
          },
          {
            name: "Threema",
            icon: Key,
            url: CONTACTS.threema.url,
            display: CONTACTS.threema.display,
            description: {
              en: "Anonymous messaging. No phone number required.",
              ka: "ანონიმური შეტყობინებები. ტელეფონის ნომერი არ არის საჭირო.",
              ru: "Анонимные сообщения. Номер телефона не требуется.",
              az: "Anonim mesajlaşma. Telefon nömrəsi tələb olunmur."
            },
            securityLevel: "high",
            accentColor: "text-green-500",
            borderColor: "border-green-500/30 hover:border-green-500/60"
          },
          {
            name: "WhatsApp",
            icon: Phone,
            url: CONTACTS.whatsapp.url,
            display: CONTACTS.whatsapp.display,
            description: {
              en: "Widely accessible. Good for initial contact.",
              ka: "ფართოდ ხელმისაწვდომი. კარგი საწყისი კონტაქტისთვის.",
              ru: "Широко доступен. Хорошо для первого контакта.",
              az: "Geniş əlçatan. İlkin əlaqə üçün yaxşı."
            },
            securityLevel: "standard",
            accentColor: "text-green-600",
            borderColor: "border-green-600/30 hover:border-green-600/60"
          }
        ];

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 bg-security/10 rounded-full"
                >
                  <Shield className="h-10 w-10 text-security" />
                </motion.div>
              </div>
              <motion.h2 
                className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {getText("securityTitle")}
              </motion.h2>
              <motion.p 
                className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {getText("securitySubtext")}
              </motion.p>
            </div>

            {/* Why Secure Channels Matter */}
            <motion.div 
              className="bg-security/5 border border-security/20 p-4 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-start gap-3">
                <Wifi className="h-5 w-5 text-security flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {language === "ka" ? "რატომ უსაფრთხო არხები?" : 
                     language === "ru" ? "Почему безопасные каналы?" :
                     language === "az" ? "Niyə təhlükəsiz kanallar?" :
                     "Why secure channels?"}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === "ka" ? "ეს პლატფორმები იყენებენ ბოლოდან ბოლომდე დაშიფვრას, რაც ნიშნავს რომ მხოლოდ თქვენ და ჩვენს გუნდს შეუძლია შეტყობინებების წაკითხვა—არცერთ სხვა მხარეს, მათ შორის თავად პლატფორმას." : 
                     language === "ru" ? "Эти платформы используют сквозное шифрование, что означает, что только вы и наша команда можете читать сообщения—ни один другой участник, включая саму платформу." :
                     language === "az" ? "Bu platformlar uçdan-uca şifrələmədən istifadə edir, yəni yalnız siz və komandamız mesajları oxuya bilər—platformun özü daxil olmaqla başqa heç kim." :
                     "These platforms use end-to-end encryption, meaning only you and our team can read messages—no other party, including the platform itself."}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Methods - Rich Cards */}
            <div className="flex-1 space-y-3">
              <motion.p 
                className="text-xs text-muted-foreground text-center mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {getText("contactUsSecurely")}
              </motion.p>
              
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.a
                    key={method.name}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptic.medium()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.08 }}
                    className={`group flex items-center gap-4 p-4 bg-card border-2 ${method.borderColor} hover:bg-accent/30 transition-all`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center bg-muted/50 rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <IconComponent className={`h-6 w-6 ${method.accentColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-semibold text-sm sm:text-base text-foreground group-hover:${method.accentColor} transition-colors`}>
                          {method.name}
                        </span>
                        {method.securityLevel === "highest" && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-600 font-medium rounded">
                            {language === "ka" ? "რეკომენდებული" : 
                             language === "ru" ? "Рекомендуется" :
                             language === "az" ? "Tövsiyə olunur" :
                             "Recommended"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                        {method.description[language as keyof typeof method.description] || method.description.en}
                      </p>
                      <p className={`text-xs ${method.accentColor} font-medium`}>
                        {method.display}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  </motion.a>
                );
              })}
            </div>

            {/* Quick Tips */}
            <motion.div 
              className="bg-muted/20 border border-border/50 p-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-security" />
                <p className="text-sm font-medium text-foreground">
                  {language === "ka" ? "სწრაფი რჩევები" : 
                   language === "ru" ? "Быстрые советы" :
                   language === "az" ? "Sürətli məsləhətlər" :
                   "Quick Tips"}
                </p>
              </div>
              <ul className="space-y-2">
                {securityTips.slice(0, 3).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-security mt-0.5">•</span>
                    {tip[language as keyof typeof tip] || tip.en}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Full Security Guide Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <LocalizedLink
                to="/security-guide"
                state={{ fromPortal: true }}
                onClick={() => haptic.light()}
                className="flex items-center justify-between p-4 mt-3 border-2 border-security/30 hover:border-security/50 hover:bg-security/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-security" />
                  <span className="font-medium text-foreground text-sm">{getText("viewSecurityGuide")}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </LocalizedLink>
            </motion.div>
                
            {/* Copy All Contacts Button */}
            <motion.button
              onClick={() => {
                haptic.medium();
                const allContacts = `IIMG Secure Contacts:\n\nSignal: ${CONTACTS.signal.display}\n${CONTACTS.signal.url}\n\nWhatsApp: ${CONTACTS.whatsapp.display}\n${CONTACTS.whatsapp.url}\n\nProtonMail: ${CONTACTS.protonmail.display}\n${CONTACTS.protonmail.url}\n\nThreema: ${CONTACTS.threema.display}\n${CONTACTS.threema.url}`;
                navigator.clipboard.writeText(allContacts).then(() => {
                  toast({
                    title: language === "ka" ? "კონტაქტები დაკოპირდა" : 
                           language === "ru" ? "Контакты скопированы" :
                           language === "az" ? "Kontaktlar kopyalandı" :
                           "Contacts copied",
                    description: language === "ka" ? "ყველა კონტაქტი დაკოპირდა ბუფერში" : 
                                 language === "ru" ? "Все контакты скопированы в буфер" :
                                 language === "az" ? "Bütün kontaktlar buferə kopyalandı" :
                                 "All contacts copied to clipboard",
                  });
                });
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-3 w-full flex items-center justify-center gap-2 p-3 bg-foreground text-background hover:bg-foreground/90 active:scale-[0.99] transition-all text-sm font-medium"
            >
              <Copy className="h-4 w-4" />
              {language === "ka" ? "ყველა კონტაქტის კოპირება" : 
               language === "ru" ? "Копировать все контакты" :
               language === "az" ? "Bütün kontaktları kopyala" :
               "Copy All Contacts"}
            </motion.button>
          </motion.div>
        );

      case "ready":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Heart className="h-16 w-16 text-primary" fill="currentColor" />
              </motion.div>
            </div>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {getText("readyTitle")}
            </motion.h2>
            <div className="space-y-5 max-w-md mx-auto">
              <motion.p 
                className="text-base text-muted-foreground text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {getText("readySubtext")}
              </motion.p>
              <motion.p 
                className="text-sm text-muted-foreground/80 text-center leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                {getText("readyMessage")}
              </motion.p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderNavigation = () => {
    // Emotional step: special handling with Yes/I'm okay buttons
    if (currentStep === "emotional") {
      return (
        <div className="pb-6 flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              onClick={handleBack}
              variant="outline"
              className="h-14 flex-1 touch-manipulation rounded-none"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {getText("back")}
            </Button>
            <Button
              onClick={handleYesSpeakFirst}
              className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90"
            >
              {getText("yes")}
            </Button>
          </div>
          <Button
            onClick={handleImOkay}
            variant="outline"
            className="h-12 w-full touch-manipulation rounded-none border-primary/50 text-primary hover:bg-primary/10"
          >
            {getText("imOkay")}
          </Button>
        </div>
      );
    }

    // All steps after emotional (affirming, resources, security, ready): show "I'm ready" button
    if (["affirming", "resources", "security", "ready"].includes(currentStep)) {
      return (
        <div className="pb-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleBack}
              variant="outline"
              className="h-14 flex-shrink-0 touch-manipulation rounded-none px-4"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {currentStep !== "ready" && (
              <Button
                onClick={handleNext}
                variant="outline"
                className="h-14 flex-1 touch-manipulation rounded-none"
              >
                {getText("next")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === "ready" && (
              <Button
                onClick={onContinue}
                className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 text-sm animate-pulse shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
              >
                {getText("continueReady")}
              </Button>
            )}
          </div>
          {currentStep !== "ready" && (
            <Button
              onClick={onContinue}
              variant="ghost"
              className="h-12 w-full touch-manipulation rounded-none text-primary hover:bg-primary/10 text-sm"
            >
              {getText("continueReady")}
            </Button>
          )}
        </div>
      );
    }

    // Default navigation for safety and medical
    return (
      <div className="pb-6 flex items-center gap-3">
        {currentIndex > 0 && (
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-14 flex-1 touch-manipulation rounded-none"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {getText("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          {getText("next")}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <>
      <motion.div
        key="mental-health-flow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 flex flex-col px-6 md:px-12"
        {...swipeHandlers}
      >
        {/* Progress indicator */}
        <div className="flex items-center gap-1.5 py-4 mb-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index <= currentIndex ? "bg-primary" : "bg-muted"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.03 }}
            />
          ))}
        </div>

        {/* Step content with swipe animations */}
        <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden min-h-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full flex flex-col"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {renderNavigation()}
      </motion.div>

      {/* Medical Help Dialog */}
      <Dialog open={showMedicalDialog} onOpenChange={setShowMedicalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              {getText("medicalDialogTitle")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <a
              href={CONTACTS.signal.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptic.medium()}
              className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors touch-manipulation"
            >
              <div className="p-3 rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{getText("reachOutNow")}</p>
                <p className="text-sm text-muted-foreground">{getText("reachOutNowSubtext")}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </a>
            
            <button
              onClick={() => {
                haptic.medium();
                setShowMedicalDialog(false);
                handleNext();
              }}
              className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors touch-manipulation"
            >
              <div className="p-3 rounded-full bg-muted">
                <ArrowLeft className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">{getText("returnToIntake")}</p>
                <p className="text-sm text-muted-foreground">{getText("returnToIntakeSubtext")}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
