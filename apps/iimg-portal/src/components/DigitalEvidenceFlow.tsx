import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  ArrowRight, 
  Camera, 
  Smartphone, 
  Download, 
  Copy, 
  Check, 
  FileCheck,
  ExternalLink,
  Mail,
  MessageSquare,
  Settings,
  Server,
  User,
  Lock,
  FolderPlus,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/hooks/use-haptic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSwipe } from "@/hooks/use-swipe";
import { CONTACTS } from "@/lib/contacts";
import { toast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FlowStep = 
  | "overview" 
  | "whymatters" 
  | "options" 
  | "download" 
  | "open-settings"
  | "enter-server"
  | "enter-username"
  | "enter-password"
  | "create-folder"
  | "upload"
  | "contact";

const SAVE_APP_IOS_URL = "https://apps.apple.com/app/save-by-openarchive/id1462212414";
const SAVE_APP_ANDROID_URL = "https://play.google.com/store/apps/details?id=net.opendasharchive.openarchive.release";
const SAVE_APP_INFO_URL = "https://open-archive.org/save";
const BERKELEY_PROTOCOL_URL = "https://www.ohchr.org/en/publications/policy-and-methodological-publications/berkeley-protocol-digital-open-source";
const TRESORIT_URL = "https://web.tresorit.com/r#3COkGJ8lyQzeYmTk5C-X2A";

interface DigitalEvidenceFlowProps {
  onComplete: () => void;
  onTresorit: () => void;
  onBerkeley: () => void;
}

// Skip options component - shows at bottom of every step
const SkipOptions = ({ language, onTresoritClick }: { language: string; onTresoritClick: () => void }) => {
  const altOptionTitle = language === "ka" 
    ? "ან გამოიყენეთ ალტერნატიული გზა:" 
    : "Or use an alternative method:";
  
  return (
    <div className="mt-auto pt-4 border-t border-border/30">
      <p className="text-xs text-muted-foreground mb-3 text-center">{altOptionTitle}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={onTresoritClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Tresorit
        </button>
        <a
          href={CONTACTS.protonmail.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
        >
          <Mail className="w-3 h-3" />
          ProtonMail
        </a>
      </div>
    </div>
  );
};

// Copyable field component
const CopyableField = ({ 
  label, 
  value, 
  icon: Icon,
  onCopy,
  isCopied,
}: { 
  label: string; 
  value: string; 
  icon: React.ElementType;
  onCopy: () => void;
  isCopied: boolean;
}) => (
  <div className="w-full">
    <p className="text-sm text-muted-foreground mb-2">{label}</p>
    <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border/50">
      <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      <code className="text-base font-mono break-all flex-1">{value}</code>
      <button
        onClick={onCopy}
        className="p-3 bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation flex-shrink-0"
      >
        {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </button>
    </div>
  </div>
);

export const DigitalEvidenceFlow = ({ onComplete, onTresorit }: DigitalEvidenceFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("overview");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [copied, setCopied] = useState(false);
  const haptic = useHaptic();
  const { language } = useLanguage();

  // Credentials state for Save App configuration
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);
  const [credentials, setCredentials] = useState<{
    serverUrl: string;
    username: string;
    password: string;
  } | null>(null);

  // Detect mobile device
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const steps: FlowStep[] = [
    "overview", 
    "whymatters", 
    "options", 
    "download", 
    "open-settings",
    "enter-server",
    "enter-username",
    "enter-password",
    "create-folder",
    "upload",
    "contact"
  ];
  const currentIndex = steps.indexOf(currentStep);

  // Fetch credentials when entering the server step
  const fetchCredentials = useCallback(async () => {
    if (credentials) return;
    
    setIsLoadingCredentials(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-save-token');
      if (error) throw error;
      
      setCredentials({
        serverUrl: data.serverUrl,
        username: data.username,
        password: data.password,
      });
    } catch (err) {
      console.error('Failed to fetch credentials:', err);
      toast({
        title: "Connection Error",
        description: "Could not load credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCredentials(false);
    }
  }, [credentials]);

  useEffect(() => {
    if (currentStep === "enter-server" && !credentials && !isLoadingCredentials) {
      fetchCredentials();
    }
  }, [currentStep, credentials, isLoadingCredentials, fetchCredentials]);

  const handleTresoritClick = () => {
    haptic.light();
    window.open(TRESORIT_URL, "_blank", "noopener,noreferrer");
  };

  const copyContacts = async () => {
    const contactText = `IIMG Secure Contacts:
Signal: ${CONTACTS.signal.display}
WhatsApp: ${CONTACTS.whatsapp.display}
ProtonMail: ${CONTACTS.protonmail.display}
Threema: ${CONTACTS.threema.display}`;
    
    try {
      await navigator.clipboard.writeText(contactText);
      setCopied(true);
      haptic.success();
      toast({
        title: language === "ka" ? "კონტაქტები კოპირებულია" : 
               language === "ru" ? "Контакты скопированы" : 
               language === "az" ? "Əlaqələr kopyalandı" : 
               "Contacts copied",
        description: language === "ka" ? "შეინახეთ უსაფრთხო ადგილას" : 
                     language === "ru" ? "Сохраните в безопасном месте" : 
                     language === "az" ? "Təhlükəsiz yerdə saxlayın" : 
                     "Save them somewhere safe",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      haptic.error();
    }
  };

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      // Step 1: Overview
      overviewTitle: {
        en: "Digital evidence needs verification.",
        ka: "ციფრული მტკიცებულება საჭიროებს ვერიფიკაციას.",
        ru: "Цифровые улики требуют верификации.",
        az: "Rəqəmsal sübutlar təsdiq tələb edir."
      },
      overviewText: {
        en: "Photos, videos, documents, and other digital files can be critical evidence—but only if their authenticity can be proven.",
        ka: "ფოტოები, ვიდეოები, დოკუმენტები და სხვა ციფრული ფაილები შეიძლება იყოს კრიტიკული მტკიცებულება—მაგრამ მხოლოდ თუ მათი ავთენტურობა დადასტურებულია.",
        ru: "Фотографии, видео, документы и другие цифровые файлы могут быть критическими уликами—но только если их подлинность можно доказать.",
        az: "Şəkillər, videolar, sənədlər və digər rəqəmsal fayllar kritik sübut ola bilər—lakin yalnız əslliyini sübut etmək mümkün olduqda."
      },
      overviewNote: {
        en: "We'll walk you through the process step by step.",
        ka: "ნაბიჯ-ნაბიჯ გაგიძღვებით ამ პროცესში.",
        ru: "Мы проведём вас через этот процесс шаг за шагом.",
        az: "Sizi bu prosesdən addım-addım keçirəcəyik."
      },

      // Step 2: Why It Matters
      whyTitle: {
        en: "Why proper preservation matters.",
        ka: "რატომ არის მნიშვნელოვანი სწორი შენახვა.",
        ru: "Почему важно правильное сохранение.",
        az: "Düzgün qorumanın niyə vacib olduğu."
      },
      whyText: {
        en: "Courts require proof that digital evidence hasn't been altered. The Berkeley Protocol provides international standards for this verification.",
        ka: "სასამართლოები მოითხოვენ დასტურს, რომ ციფრული მტკიცებულება არ არის შეცვლილი. ბერკლის პროტოკოლი უზრუნველყოფს ამ ვერიფიკაციის საერთაშორისო სტანდარტებს.",
        ru: "Суды требуют доказательств того, что цифровые улики не были изменены. Беркли-протокол обеспечивает международные стандарты этой верификации.",
        az: "Məhkəmələr rəqəmsal sübutların dəyişdirilmədiyini sübut etməyi tələb edir. Berkeley Protokolu bu təsdiq üçün beynəlxalq standartlar təmin edir."
      },
      cryptoTitle: {
        en: "Cryptographic Verification",
        ka: "კრიპტოგრაფიული ვერიფიკაცია",
        ru: "Криптографическая верификация",
        az: "Kriptoqrafik Təsdiq"
      },
      cryptoText: {
        en: "Creates a unique digital fingerprint (hash) that proves the file is authentic and unaltered.",
        ka: "ქმნის უნიკალურ ციფრულ თითის ანაბეჭდს (ჰეშს), რომელიც ადასტურებს ფაილის ავთენტურობას.",
        ru: "Создаёт уникальный цифровой отпечаток (хеш), доказывающий подлинность файла.",
        az: "Faylın əsli olduğunu sübut edən unikal rəqəmsal barmaq izi (hash) yaradır."
      },
      timestampTitle: {
        en: "Timestamp & Location",
        ka: "დრო და ადგილმდებარეობა",
        ru: "Время и место",
        az: "Vaxt damğası və yer"
      },
      timestampText: {
        en: "Embeds when and where the file was captured, creating an unalterable record.",
        ka: "ჩაშენებს როდის და სად გადაიღეს ფაილი, ქმნის შეუცვლელ ჩანაწერს.",
        ru: "Встраивает когда и где был снят файл, создавая неизменяемую запись.",
        az: "Faylın nə vaxt və harada çəkildiyini daxil edir, dəyişdirilə bilməyən qeyd yaradır."
      },
      chainTitle: {
        en: "Chain of Custody",
        ka: "მტკიცებულების ჯაჭვი",
        ru: "Цепочка хранения",
        az: "Mühafizə zənciri"
      },
      chainText: {
        en: "Documents the complete handling history from capture to submission.",
        ka: "აფიქსირებს სრულ მოპყრობის ისტორიას გადაღებიდან წარდგენამდე.",
        ru: "Документирует полную историю обработки от съёмки до подачи.",
        az: "Çəkilişdən təqdimata qədər tam işləmə tarixini sənədləşdirir."
      },
      medicalTitle: {
        en: "Medical Documentation",
        ka: "სამედიცინო დოკუმენტაცია",
        ru: "Медицинская документация",
        az: "Tibbi sənədləşdirmə"
      },
      medicalText: {
        en: "Medical records, injury photos, and treatment documentation are critical evidence. Ensure dates, provider names, and patient identifiers are visible. Photograph documents in good lighting without flash.",
        ka: "სამედიცინო ჩანაწერები, დაზიანების ფოტოები და მკურნალობის დოკუმენტაცია კრიტიკული მტკიცებულებაა. დარწმუნდით, რომ თარიღები, პროვაიდერის სახელები და პაციენტის იდენტიფიკატორები ხილულია.",
        ru: "Медицинские записи, фото травм и документация лечения—критические улики. Убедитесь, что даты, имена врачей и идентификаторы пациента видны.",
        az: "Tibbi qeydlər, xəsarət fotoları və müalicə sənədləri kritik sübutdur. Tarixlər, təminatçı adları və xəstə identifikatorları görünür olmalıdır."
      },
      readBerkeley: {
        en: "Read the Berkeley Protocol",
        ka: "წაიკითხეთ ბერკლის პროტოკოლი",
        ru: "Читать Беркли-протокол",
        az: "Berkeley Protokolunu oxuyun"
      },

      // Step 3: Submission Options
      optionsTitle: {
        en: "Choose your submission method.",
        ka: "აირჩიეთ წარდგენის მეთოდი.",
        ru: "Выберите способ подачи.",
        az: "Təqdim etmə üsulunu seçin."
      },
      optionsSaveTitle: {
        en: "Save App (Berkeley Protocol Compliant)",
        ka: "Save აპი (ბერკლის პროტოკოლის შესაბამისი)",
        ru: "Save App (Соответствует Беркли-протоколу)",
        az: "Save Tətbiqi (Berkeley Protokoluna uyğun)"
      },
      optionsSaveDesc: {
        en: "The only method that provides full cryptographic verification for court admissibility.",
        ka: "ერთადერთი მეთოდი, რომელიც უზრუნველყოფს სრულ კრიპტოგრაფიულ ვერიფიკაციას სასამართლო დაშვებისთვის.",
        ru: "Единственный метод, обеспечивающий полную криптографическую верификацию для допустимости в суде.",
        az: "Məhkəmə qəbulu üçün tam kriptoqrafik təsdiq təmin edən yeganə üsul."
      },
      optionsTresoritTitle: {
        en: "Tresorit Encrypted Upload",
        ka: "Tresorit დაშიფრული ატვირთვა",
        ru: "Загрузка через Tresorit",
        az: "Tresorit şifrələnmiş yükləmə"
      },
      optionsTresoritDesc: {
        en: "End-to-end encrypted file transfer. Does not include cryptographic verification.",
        ka: "ბოლოდან ბოლომდე დაშიფრული ფაილის გადაცემა. არ მოიცავს კრიპტოგრაფიულ ვერიფიკაციას.",
        ru: "Сквозное шифрование передачи файлов. Не включает криптографическую верификацию.",
        az: "Uçdan uca şifrələnmiş fayl ötürülməsi. Kriptoqrafik təsdiq daxil deyil."
      },
      optionsProtonTitle: {
        en: "ProtonMail Attachment",
        ka: "ProtonMail დანართი",
        ru: "Вложение ProtonMail",
        az: "ProtonMail əlavəsi"
      },
      optionsProtonDesc: {
        en: "If you're having issues with other methods, you can always send files as attachments.",
        ka: "თუ სხვა მეთოდებთან პრობლემა გაქვთ, ყოველთვის შეგიძლიათ ფაილების გაგზავნა დანართებად.",
        ru: "Если у вас проблемы с другими методами, вы всегда можете отправить файлы как вложения.",
        az: "Digər üsullarla problem yaşayırsınızsa, həmişə faylları əlavə kimi göndərə bilərsiniz."
      },
      continueWithSave: {
        en: "Continue with Save App",
        ka: "გააგრძელეთ Save აპით",
        ru: "Продолжить с Save App",
        az: "Save tətbiqi ilə davam edin"
      },
      uploadTresorit: {
        en: "Upload to Tresorit",
        ka: "ატვირთეთ Tresorit-ში",
        ru: "Загрузить в Tresorit",
        az: "Tresorit-ə yüklə"
      },
      sendViaProton: {
        en: "Send via ProtonMail",
        ka: "გაგზავნეთ ProtonMail-ით",
        ru: "Отправить через ProtonMail",
        az: "ProtonMail ilə göndər"
      },

      // Download step
      downloadTitle: {
        en: "Download the Save app.",
        ka: "ჩამოტვირთეთ Save აპლიკაცია.",
        ru: "Скачайте приложение Save.",
        az: "Save tətbiqini yükləyin."
      },
      downloadText: {
        en: "The Save app by OpenArchive handles all verification automatically. It's free and takes just a few minutes to set up.",
        ka: "OpenArchive-ის Save აპლიკაცია ავტომატურად ასრულებს ყველა ვერიფიკაციას. ის უფასოა და დაყენებას რამდენიმე წუთი სჭირდება.",
        ru: "Приложение Save от OpenArchive автоматически выполняет всю верификацию. Оно бесплатное и занимает несколько минут для настройки.",
        az: "OpenArchive tərəfindən Save tətbiqi bütün təsdiqi avtomatik həyata keçirir. Pulsuzdur və qurmaq bir neçə dəqiqə çəkir."
      },
      mobileRequired: {
        en: "The Save app requires a mobile device",
        ka: "Save აპლიკაცია მობილურ მოწყობილობას საჭიროებს",
        ru: "Приложение Save требует мобильное устройство",
        az: "Save tətbiqi mobil cihaz tələb edir"
      },
      scanOrClick: {
        en: "Scan the QR code or click below:",
        ka: "სკანირეთ QR კოდი ან დააწკაპუნეთ ქვემოთ:",
        ru: "Отсканируйте QR-код или нажмите ниже:",
        az: "QR kodu skan edin və ya aşağıya klikləyin:"
      },
      appInstalled: {
        en: "I have the app installed",
        ka: "აპი დაინსტალირებულია",
        ru: "Приложение установлено",
        az: "Tətbiq quraşdırılıb"
      },

      // Contact step
      contactTitle: {
        en: "Need help?",
        ka: "გჭირდებათ დახმარება?",
        ru: "Нужна помощь?",
        az: "Köməyə ehtiyacınız var?"
      },
      contactText: {
        en: "If you're having trouble with the Save app or prefer to submit another way, contact us directly through secure channels.",
        ka: "თუ Save აპლიკაციასთან პრობლემა გაქვთ ან სხვა გზით გაგზავნას ამჯობინებთ, დაგვიკავშირდით პირდაპირ უსაფრთხო არხებით.",
        ru: "Если у вас проблемы с приложением Save или вы предпочитаете отправить другим способом, свяжитесь с нами напрямую через защищённые каналы.",
        az: "Save tətbiqi ilə problem yaşayırsınızsa və ya başqa yolla göndərməyi üstün tutursunuzsa, bizimlə birbaşa təhlükəsiz kanallar vasitəsilə əlaqə saxlayın."
      },
      copyContacts: {
        en: "Copy all contacts",
        ka: "ყველა კონტაქტის კოპირება",
        ru: "Копировать все контакты",
        az: "Bütün əlaqələri kopyala"
      },

      // Upload step (final)
      uploadTitle: {
        en: "You're Ready!",
        ka: "მზად ხართ!",
        ru: "Вы готовы!",
        az: "Hazırsınız!"
      },
      uploadText: {
        en: "Your Save app is connected. Photos and videos captured through Save will automatically upload with cryptographic verification.",
        ka: "თქვენი Save აპლიკაცია დაკავშირებულია. ფოტოები და ვიდეოები ავტომატურად აიტვირთება ვერიფიკაციით.",
        ru: "Ваше приложение Save подключено. Фото и видео автоматически загрузятся с криптографической верификацией.",
        az: "Save tətbiqiniz qoşulub. Fotoşəkillər və videolar avtomatik olaraq kriptoqrafik təsdiqlə yüklənəcək."
      },
      whatToCapture: {
        en: "What to capture:",
        ka: "რა გადაიღოთ:",
        ru: "Что снимать:",
        az: "Nəyi çəkməli:"
      },

      // Navigation
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
      continueReady: {
        en: "I understand, continue",
        ka: "გასაგებია, გაგრძელება",
        ru: "Понятно, продолжить",
        az: "Başa düşdüm, davam et"
      },
      finish: {
        en: "Finish",
        ka: "დასრულება",
        ru: "Завершить",
        az: "Bitir"
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

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handleBack,
  }, { threshold: 50 });

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "overview":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-8">
              <FileCheck className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6">
              {getText("overviewTitle")}
            </h2>
            <div className="space-y-4 max-w-md mx-auto">
              <p className="text-base text-muted-foreground text-center leading-relaxed">
                {getText("overviewText")}
              </p>
              <p className="text-sm text-muted-foreground/70 text-center italic">
                {getText("overviewNote")}
              </p>
            </div>
            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "whymatters":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                {getText("whyTitle")}
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-2">
                {getText("whyText")}
              </p>
              <a
                href={BERKELEY_PROTOCOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="text-xs text-primary hover:underline"
              >
                {getText("readBerkeley")} →
              </a>
            </div>

            <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full">
              <Accordion type="multiple" defaultValue={["crypto"]} className="w-full">
                <AccordionItem value="crypto" className="border-border">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {getText("cryptoTitle")}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {getText("cryptoText")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="timestamp" className="border-border">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {getText("timestampTitle")}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {getText("timestampText")}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="chain" className="border-border">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {getText("chainTitle")}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {getText("chainText")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medical" className="border-border">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {getText("medicalTitle")}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {getText("medicalText")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "options":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                {getText("optionsTitle")}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full space-y-4">
              {/* Save App - Primary/Compliant */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-primary/10 border-2 border-primary p-5 rounded-lg"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {getText("optionsSaveTitle")}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getText("optionsSaveDesc")}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleNext}
                  className="w-full gap-2"
                  size="lg"
                >
                  {getText("continueWithSave")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Tresorit - Secondary */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border p-4 rounded-lg"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {getText("optionsTresoritTitle")}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {getText("optionsTresoritDesc")}
                    </p>
                  </div>
                </div>
                <a
                  href={TRESORIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="block w-full text-center py-2.5 border border-border text-sm font-medium hover:bg-muted/50 transition-colors rounded"
                >
                  {getText("uploadTresorit")} →
                </a>
              </motion.div>

              {/* ProtonMail - Fallback at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-border/30"
              >
                <p className="text-xs text-muted-foreground text-center mb-2">
                  {getText("optionsProtonDesc")}
                </p>
                <a
                  href={CONTACTS.protonmail.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="block w-full text-center py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getText("sendViaProton")} ({CONTACTS.protonmail.display}) →
                </a>
              </motion.div>
            </div>
          </motion.div>
        );

      case "download":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-6">
              <Download className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4">
              {getText("downloadTitle")}
            </h2>
            <p className="text-base text-muted-foreground text-center leading-relaxed max-w-md mx-auto mb-6">
              {getText("downloadText")}
            </p>

            <div className="bg-muted/30 border border-border/30 p-5 max-w-md mx-auto w-full mb-4">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="flex-shrink-0">
                  <QRCodeSVG 
                    value={SAVE_APP_INFO_URL} 
                    size={100}
                    bgColor="transparent"
                    fgColor="currentColor"
                    className="text-foreground"
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{getText("mobileRequired")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {getText("scanOrClick")}
                  </p>
                  
                  <div className="flex gap-3 justify-center sm:justify-start">
                    <a 
                      href={SAVE_APP_IOS_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => haptic.light()}
                      className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation"
                    >
                      iOS
                    </a>
                    <a 
                      href={SAVE_APP_ANDROID_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => haptic.light()}
                      className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 active:scale-95 transition-all touch-manipulation"
                    >
                      Android
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "open-settings":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-6">
              {language === "ka" ? "გახსენით პარამეტრები" : "Open Settings"}
            </h2>
            
            <div className="space-y-4 max-w-md mx-auto w-full mb-4">
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <p className="text-base">{language === "ka" ? "გახსენით Save აპლიკაცია" : "Open the Save app"}</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <p className="text-base">{language === "ka" ? "დააჭირეთ ⚙️ Settings" : "Tap ⚙️ Settings"}</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <p className="text-base">{language === "ka" ? "დააჭირეთ \"Add Server\"" : "Tap \"Add Server\""}</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <p className="text-base">{language === "ka" ? "აირჩიეთ \"Private (WebDAV) Server\"" : "Choose \"Private (WebDAV) Server\""}</p>
              </div>
            </div>

            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "enter-server":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Server className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-2">
              {language === "ka" ? "ჩაწერეთ სერვერის URL" : "Enter Server URL"}
            </h2>
            
            <p className="text-sm text-muted-foreground text-center mb-6">
              {language === "ka" ? "დააკოპირეთ და ჩასვით Save აპში" : "Copy and paste into the Save app"}
            </p>

            <div className="max-w-md mx-auto w-full mb-4">
              {isLoadingCredentials ? (
                <div className="py-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : credentials ? (
                <CopyableField
                  label="Server URL"
                  value={credentials.serverUrl}
                  icon={Server}
                  onCopy={async () => {
                    haptic.light();
                    await navigator.clipboard.writeText(credentials.serverUrl);
                    toast({ title: "Copied!" });
                  }}
                  isCopied={false}
                />
              ) : (
                <p className="text-center text-muted-foreground">Failed to load credentials</p>
              )}
            </div>

            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "enter-username":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-2">
              {language === "ka" ? "ჩაწერეთ მომხმარებელი" : "Enter Username"}
            </h2>
            
            <p className="text-sm text-muted-foreground text-center mb-6">
              {language === "ka" ? "დააკოპირეთ და ჩასვით Save აპში" : "Copy and paste into the Save app"}
            </p>

            <div className="max-w-md mx-auto w-full mb-4">
              {credentials ? (
                <CopyableField
                  label="Username"
                  value={credentials.username}
                  icon={User}
                  onCopy={async () => {
                    haptic.light();
                    await navigator.clipboard.writeText(credentials.username);
                    toast({ title: "Copied!" });
                  }}
                  isCopied={false}
                />
              ) : (
                <p className="text-center text-muted-foreground">Failed to load credentials</p>
              )}
            </div>

            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "enter-password":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-2">
              {language === "ka" ? "ჩაწერეთ პაროლი" : "Enter Password"}
            </h2>
            
            <p className="text-sm text-muted-foreground text-center mb-6">
              {language === "ka" ? "დააკოპირეთ და ჩასვით Save აპში" : "Copy and paste into the Save app"}
            </p>

            <div className="max-w-md mx-auto w-full mb-4">
              {credentials ? (
                <CopyableField
                  label="Password"
                  value={credentials.password}
                  icon={Lock}
                  onCopy={async () => {
                    haptic.light();
                    await navigator.clipboard.writeText(credentials.password);
                    toast({ title: "Copied!" });
                  }}
                  isCopied={false}
                />
              ) : (
                <p className="text-center text-muted-foreground">Failed to load credentials</p>
              )}
            </div>

            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "create-folder":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderPlus className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-6">
              {language === "ka" ? "შექმენით საქაღალდე" : "Create a Folder"}
            </h2>
            
            <div className="space-y-4 max-w-md mx-auto w-full mb-4">
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <p className="text-base">{language === "ka" ? "დააჭირეთ + ღილაკს" : "Tap the + button"}</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <p className="text-base">{language === "ka" ? "შექმენით საქაღალდე თქვენი მტკიცებულებისთვის" : "Create a folder for your evidence"}</p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/30 border border-border/50">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <p className="text-base">{language === "ka" ? "მიეცით აღწერილობითი სახელი" : "Give it a descriptive name"}</p>
              </div>
            </div>

            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "upload":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-4">
              {getText("uploadTitle")}
            </h2>
            
            <p className="text-base text-muted-foreground leading-relaxed text-center mb-6 max-w-md mx-auto">
              {getText("uploadText")}
            </p>

            {/* ProofMode recommendation */}
            <div className="bg-primary/10 border border-primary/20 p-4 mb-4 max-w-md mx-auto w-full">
              <p className="text-sm text-foreground leading-relaxed mb-2">
                <Shield className="w-4 h-4 inline-block mr-2 text-primary" />
                {language === "ka" 
                  ? "მაღალი ხარისხის ვიდეოსთვის გამოიყენეთ SAVE აპი ProofMode-ით."
                  : "For high-integrity video, use SAVE with ProofMode enabled."}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href="https://proofmode.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  ProofMode
                </a>
                <a
                  href="https://www.open-archive.org/pdf/how_to_use_save_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Save Guide (PDF)
                </a>
              </div>
            </div>

            <div className="bg-muted/30 p-4 text-sm text-muted-foreground mb-4 max-w-md mx-auto w-full">
              <p className="font-medium text-foreground mb-2">{getText("whatToCapture")}</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>{language === "ka" ? "2024 წლის ნოემბრიდან მომხდარი მოვლენები" : "Events since November 2024"}</li>
                <li>{language === "ka" ? "ფიზიკური დაზიანებების ფოტოები" : "Photos of physical injuries"}</li>
                <li>{language === "ka" ? "ქონების დაზიანების ვიდეო" : "Video of property damage"}</li>
                <li>{language === "ka" ? "დოკუმენტები და მტკიცებულებები" : "Documents and evidence"}</li>
              </ul>
            </div>

            <SkipOptions language={language} onTresoritClick={handleTresoritClick} />
          </motion.div>
        );

      case "contact":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                {getText("contactTitle")}
              </h2>
              <p className="text-base text-muted-foreground max-w-sm mx-auto">
                {getText("contactText")}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-4 max-w-md mx-auto w-full">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={CONTACTS.signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="flex flex-col items-center justify-center p-4 bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium text-sm text-foreground">Signal</span>
                  <span className="text-xs text-muted-foreground mt-1">{CONTACTS.signal.display}</span>
                </a>
                <a
                  href={CONTACTS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="flex flex-col items-center justify-center p-4 bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium text-sm text-foreground">WhatsApp</span>
                  <span className="text-xs text-muted-foreground mt-1">{CONTACTS.whatsapp.display}</span>
                </a>
                <a
                  href={CONTACTS.protonmail.url}
                  onClick={() => haptic.light()}
                  className="flex flex-col items-center justify-center p-4 bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium text-sm text-foreground">ProtonMail</span>
                  <span className="text-xs text-muted-foreground mt-1 truncate max-w-full">{CONTACTS.protonmail.display}</span>
                </a>
                <a
                  href={CONTACTS.threema.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptic.light()}
                  className="flex flex-col items-center justify-center p-4 bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium text-sm text-foreground">Threema</span>
                  <span className="text-xs text-muted-foreground mt-1">{CONTACTS.threema.display}</span>
                </a>
              </div>
              
              <Button
                onClick={copyContacts}
                variant="outline"
                className="w-full h-12 gap-2 touch-manipulation"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{getText("copyContacts")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {getText("copyContacts")}
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderNavigation = () => {
    // Options step doesn't need a next button (handled by option selection)
    if (currentStep === "options") {
      return (
        <div className="pb-6 flex items-center gap-3">
          {currentIndex > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="h-14 flex-1 touch-manipulation rounded-none px-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {getText("back")}
            </Button>
          )}
        </div>
      );
    }

    // Contact step (final)
    if (currentStep === "contact") {
      return (
        <div className="pb-6 flex items-center gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-14 flex-shrink-0 touch-manipulation rounded-none px-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              haptic.medium();
              onComplete();
            }}
            className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90 animate-pulse shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
          >
            {getText("continueReady")}
          </Button>
        </div>
      );
    }

    // Upload step - has continue/finish button
    if (currentStep === "upload") {
      return (
        <div className="pb-6 flex items-center gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-14 flex-shrink-0 touch-manipulation rounded-none px-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            {getText("next")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    }

    // Download step - special button text
    if (currentStep === "download") {
      return (
        <div className="pb-6 flex items-center gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-14 flex-shrink-0 touch-manipulation rounded-none px-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            {getText("appInstalled")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    }

    // All other steps - standard navigation
    return (
      <div className="pb-6 flex items-center gap-3">
        {currentIndex > 0 && (
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-14 flex-shrink-0 touch-manipulation rounded-none px-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={currentStep === "enter-server" && !credentials}
          className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          {getText("next")}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <motion.div
      key="digital-evidence-flow"
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
  );
};
