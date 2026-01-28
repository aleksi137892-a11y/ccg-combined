import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Shield, ArrowRight, Camera, AlertTriangle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/hooks/use-haptic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSwipe } from "@/hooks/use-swipe";
import { CONTACTS } from "@/lib/contacts";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FlowStep = "overview" | "contactsoon" | "preservation" | "photograph" | "contact";

interface PhysicalEvidenceFlowProps {
  onComplete: () => void;
  onPhotographDigital: () => void;
}

export const PhysicalEvidenceFlow = ({ onComplete, onPhotographDigital }: PhysicalEvidenceFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("overview");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [copied, setCopied] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const haptic = useHaptic();
  const { language } = useLanguage();

  const steps: FlowStep[] = ["overview", "contactsoon", "preservation", "photograph", "contact"];
  const currentIndex = steps.indexOf(currentStep);

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
      // Step 1: Overview + Safety
      overviewTitle: {
        en: "Physical evidence requires care.",
        ka: "ფიზიკური მტკიცებულება მოითხოვს სიფრთხილეს.",
        ru: "Физические улики требуют осторожности.",
        az: "Fiziki sübutlar diqqət tələb edir."
      },
      overviewText: {
        en: "Physical items—clothing, objects, documents—can be critical evidence. How you handle them now affects their legal value later.",
        ka: "ფიზიკური ნივთები—ტანსაცმელი, საგნები, დოკუმენტები—შეიძლება იყოს კრიტიკული მტკიცებულება. როგორ მოექცევით მათ ახლა, გავლენას ახდენს მათ სამართლებრივ ღირებულებაზე.",
        ru: "Физические предметы—одежда, объекты, документы—могут быть критическими уликами. То, как вы обращаетесь с ними сейчас, влияет на их юридическую ценность.",
        az: "Fiziki əşyalar—geyim, obyektlər, sənədlər—kritik sübut ola bilər. Onlarla necə davranmağınız gələcək hüquqi dəyərinə təsir edir."
      },
      safetyTitle: {
        en: "Your safety comes first.",
        ka: "თქვენი უსაფრთხოება პირველ ადგილზეა.",
        ru: "Ваша безопасность превыше всего.",
        az: "Təhlükəsizliyiniz hər şeydən öncə gəlir."
      },
      safetyText: {
        en: "If you suspect chemical contamination or exposure to hazardous materials, do not handle items directly. Contact us first.",
        ka: "თუ ეჭვობთ ქიმიურ დაბინძურებას ან საშიშ მასალებთან კონტაქტს, არ შეეხოთ ნივთებს პირდაპირ. ჯერ დაგვიკავშირდით.",
        ru: "Если вы подозреваете химическое загрязнение или контакт с опасными материалами, не трогайте предметы напрямую. Сначала свяжитесь с нами.",
        az: "Kimyəvi çirklənmə və ya təhlükəli materiallarla təmas şübhəsi varsa, əşyalara birbaşa toxunmayın. Əvvəlcə bizimlə əlaqə saxlayın."
      },

      // Step 2: Contact Us Soon
      contactSoonTitle: {
        en: "Please contact us as soon as you're able.",
        ka: "გთხოვთ, დაგვიკავშირდეთ რაც შეიძლება მალე.",
        ru: "Пожалуйста, свяжитесь с нами, как только сможете.",
        az: "Zəhmət olmasa, imkan tapan kimi bizimlə əlaqə saxlayın."
      },
      contactSoonText: {
        en: "Physical evidence handling is extremely delicate. We need to coordinate with you directly to establish a secure chain of custody and provide guidance specific to your situation.",
        ka: "ფიზიკური მტკიცებულებების მოპყრობა უაღრესად დელიკატურია. პირდაპირ უნდა დავუკავშირდეთ თქვენ, რათა დავადგინოთ უსაფრთხო ქეინ ოფ ქასთოდი და მოგაწოდოთ თქვენი სიტუაციისთვის სპეციფიკური ინსტრუქციები.",
        ru: "Обращение с физическими уликами требует крайней осторожности. Нам нужно напрямую координировать с вами для установления безопасной цепочки хранения и предоставления рекомендаций для вашей ситуации.",
        az: "Fiziki sübutlarla davranış son dərəcə incədir. Təhlükəsiz mühafizə zənciri qurmaq və vəziyyətinizə uyğun təlimatlar vermək üçün sizinlə birbaşa əlaqə saxlamalıyıq."
      },
      contactSoonNote: {
        en: "Screenshot or save these contacts now.",
        ka: "ახლავე გადაიღეთ სკრინშოტი ან შეინახეთ ეს კონტაქტები.",
        ru: "Сделайте скриншот или сохраните эти контакты сейчас.",
        az: "İndi ekran şəkli çəkin və ya bu əlaqələri yadda saxlayın."
      },
      copyContacts: {
        en: "Copy all contacts",
        ka: "ყველა კონტაქტის კოპირება",
        ru: "Копировать все контакты",
        az: "Bütün əlaqələri kopyala"
      },

      // Step 3: Preservation Tips
      preservationTitle: {
        en: "In the meantime, a few preservation tips.",
        ka: "ამასობაში, რამდენიმე შენახვის რჩევა.",
        ru: "А пока несколько советов по сохранению.",
        az: "Bu arada, bir neçə qoruma məsləhəti."
      },
      preservationSubtext: {
        en: "Until we can coordinate directly, follow these guidelines to protect evidentiary integrity.",
        ka: "სანამ პირდაპირ დავუკავშირდებით, მიჰყევით ამ რეკომენდაციებს მტკიცებულების მთლიანობის დასაცავად.",
        ru: "Пока мы не сможем связаться напрямую, следуйте этим рекомендациям для защиты целостности улик.",
        az: "Birbaşa əlaqə saxlayana qədər sübut bütövlüyünü qorumaq üçün bu təlimatlara əməl edin."
      },
      documentBeforeTitle: {
        en: "Document in Real Time with Save App",
        ka: "რეალურ დროში დოკუმენტირება Save აპით",
        ru: "Документирование в реальном времени с Save App",
        az: "Save tətbiqi ilə real vaxtda sənədləşdirmə"
      },
      documentBeforeText: {
        en: "If possible, use the Save app to photograph evidence in place before touching or moving it. Include a scale reference (coin, ruler) and capture the surrounding area. Contact us immediately if you need guidance.",
        ka: "თუ შესაძლებელია, გამოიყენეთ Save აპი მტკიცებულების ადგილზე გადასაღებად, სანამ შეეხებით ან გადაადგილებთ. ჩართეთ მასშტაბის რეფერენსი (მონეტა, სახაზავი). დაგვიკავშირდით დაუყოვნებლივ თუ დახმარება გჭირდებათ.",
        ru: "Если возможно, используйте приложение Save для фотографирования улик на месте, прежде чем трогать или перемещать. Включите масштабный объект (монета, линейка). Свяжитесь с нами немедленно, если нужна помощь.",
        az: "Mümkünsə, toxunmadan və ya köçürməzdən əvvəl Save tətbiqi ilə sübutları yerində şəkillə çəkin. Miqyas referansı (sikkə, xətkeş) daxil edin. Kömək lazımdırsa, dərhal bizimlə əlaqə saxlayın."
      },
      clothingTitle: {
        en: "Clothing & Fabric",
        ka: "ტანსაცმელი და ქსოვილი",
        ru: "Одежда и ткани",
        az: "Geyim və parça"
      },
      clothingText: {
        en: "Place in a clean paper bag—not plastic. Do not wash, clean, or shake off debris. Label with date, time, and location if possible.",
        ka: "მოათავსეთ სუფთა ქაღალდის ჩანთაში—არა პლასტმასის. არ გარეცხოთ, არ გაასუფთაოთ. თუ შესაძლებელია, მონიშნეთ თარიღი, დრო და ადგილი.",
        ru: "Положите в чистый бумажный пакет—не пластиковый. Не стирайте, не чистите. Если возможно, маркируйте датой, временем и местом.",
        az: "Təmiz kağız torbaya qoyun—plastik deyil. Yumayın, təmizləməyin. Mümkünsə, tarix, vaxt və yeri qeyd edin."
      },
      liquidTitle: {
        en: "Liquid Samples",
        ka: "სითხის ნიმუშები",
        ru: "Жидкие образцы",
        az: "Maye nümunələri"
      },
      liquidText: {
        en: "Use a glass container with an airtight lid. Store upright in a cool, dark place. Refrigerate if possible—do not freeze.",
        ka: "გამოიყენეთ მინის კონტეინერი ჰერმეტული სახურავით. შეინახეთ გრილ, ბნელ ადგილას. თუ შესაძლებელია, მოათავსეთ მაცივარში—არ გაყინოთ.",
        ru: "Используйте стеклянный контейнер с герметичной крышкой. Храните в прохладном, тёмном месте. Если возможно, храните в холодильнике—не замораживайте.",
        az: "Hermetik qapaqlı şüşə qab istifadə edin. Sərin, qaranlıq yerdə saxlayın. Mümkünsə soyuducuda saxlayın—dondurmayın."
      },
      documentsTitle: {
        en: "Documents & Paper",
        ka: "დოკუმენტები და ქაღალდი",
        ru: "Документы и бумага",
        az: "Sənədlər və kağız"
      },
      documentsText: {
        en: "Handle by edges only. Place in a clean folder or envelope. Store flat in a cool, dry location away from direct sunlight.",
        ka: "შეეხეთ მხოლოდ კიდეებზე. მოათავსეთ სუფთა საქაღალდეში ან კონვერტში. შეინახეთ ბრტყელად გრილ, მშრალ ადგილას.",
        ru: "Берите только за края. Положите в чистую папку или конверт. Храните в прохладном, сухом месте вдали от солнечного света.",
        az: "Yalnız kənarlarından tutun. Təmiz qovluğa və ya zərfə qoyun. Sərin, quru yerdə düz saxlayın."
      },
      storageTitle: {
        en: "General Storage",
        ka: "ზოგადი შენახვა",
        ru: "Общее хранение",
        az: "Ümumi saxlama"
      },
      storageText: {
        en: "Keep all items away from direct sunlight, heat sources, and humidity. A cool, dark closet or drawer is ideal. Do not give items to anyone else until we coordinate.",
        ka: "შეინახეთ ყველა ნივთი მზის სხივებისგან, სითბოს წყაროებისგან და ტენიანობისგან მოშორებით. გრილი, ბნელი კარადა იდეალურია. არ მისცეთ ნივთები სხვას, სანამ არ დავუკავშირდებით.",
        ru: "Храните все предметы вдали от прямых солнечных лучей, источников тепла и влажности. Идеальный вариант—прохладный, тёмный шкаф. Не отдавайте предметы никому до нашей координации.",
        az: "Bütün əşyaları günəş işığından, istilik mənbələrindən və nəmlikdən uzaq saxlayın. Sərin, qaranlıq şkaf idealdır. Koordinasiya edənə qədər heç kimə verməyin."
      },

      // Step 4: Photograph with Save App
      photographTitle: {
        en: "Please photograph what you have.",
        ka: "გთხოვთ, გადაიღეთ რაც გაქვთ.",
        ru: "Пожалуйста, сфотографируйте то, что у вас есть.",
        az: "Zəhmət olmasa, əlinizdə olanı şəkillə çəkin."
      },
      photographText: {
        en: "Using the Save app to photograph evidence in your possession is the most forensically rigorous approach. The app embeds cryptographic verification automatically.",
        ka: "Save აპით თქვენს ხელთ არსებული მტკიცებულების ფოტოგრაფირება ყველაზე ფორენზიკულად მკაცრი მიდგომაა. აპლიკაცია ავტომატურად ჩაშენებს კრიპტოგრაფიულ ვერიფიკაციას.",
        ru: "Использование приложения Save для фотографирования улик в вашем распоряжении—наиболее криминалистически строгий подход. Приложение автоматически встраивает криптографическую верификацию.",
        az: "Əlinizdəki sübutları Save tətbiqi ilə şəkillə çəkmək ən ciddi məhkəmə yanaşmasıdır. Tətbiq avtomatik olaraq kriptoqrafik təsdiq daxil edir."
      },
      photographDetail: {
        en: "Include a reference object for scale (coin, ruler, pen). Capture multiple angles and any visible damage or markings.",
        ka: "ჩართეთ მასშტაბის ობიექტი (მონეტა, სახაზავი, კალამი). გადაიღეთ რამდენიმე კუთხით და ნებისმიერი ხილული დაზიანება ან მარკირება.",
        ru: "Включите объект для масштаба (монета, линейка, ручка). Снимите с нескольких ракурсов и любые видимые повреждения или маркировки.",
        az: "Miqyas üçün obyekt daxil edin (sikkə, xətkeş, qələm). Bir neçə bucaqdan və görünən zədələri və ya işarələri çəkin."
      },
      photographButton: {
        en: "Continue to Save App",
        ka: "გააგრძელეთ Save აპლიკაციაზე",
        ru: "Перейти к приложению Save",
        az: "Save tətbiqinə keçin"
      },

      // Step 5: Contact (final)
      contactTitle: {
        en: "Ready to coordinate.",
        ka: "მზად ვართ კოორდინაციისთვის.",
        ru: "Готовы к координации.",
        az: "Koordinasiyaya hazırıq."
      },
      contactSubtext: {
        en: "Contact us through secure channels. We will provide specific instructions for your material type and arrange secure handoff if needed.",
        ka: "დაგვიკავშირდით უსაფრთხო არხებით. ჩვენ მოგაწვდით კონკრეტულ ინსტრუქციებს თქვენი მასალის ტიპისთვის.",
        ru: "Свяжитесь с нами через защищённые каналы. Мы предоставим конкретные инструкции для вашего типа материала.",
        az: "Təhlükəsiz kanallar vasitəsilə bizimlə əlaqə saxlayın. Material növünüz üçün konkret təlimatlar verəcəyik."
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
      skip: {
        en: "Skip",
        ka: "გამოტოვება",
        ru: "Пропустить",
        az: "Keç"
      },
      skipDialogTitle: {
        en: "Skip documentation step?",
        ka: "გამოტოვოთ დოკუმენტაციის ეტაპი?",
        ru: "Пропустить этап документирования?",
        az: "Sənədləşdirmə addımını keçmək?"
      },
      skipDialogMessage: {
        en: "Photographing your evidence with the Save app provides cryptographic verification that international courts accept. This strengthens the evidentiary value of your materials. Are you sure you want to proceed without this step?",
        ka: "თქვენი მტკიცებულების ფოტოგრაფირება Save აპით უზრუნველყოფს კრიპტოგრაფიულ ვერიფიკაციას, რომელსაც საერთაშორისო სასამართლოები იღებენ. ეს აძლიერებს თქვენი მასალების მტკიცებულებით ღირებულებას. დარწმუნებული ხართ, რომ გსურთ ამ ეტაპის გამოტოვება?",
        ru: "Фотографирование улик через приложение Save обеспечивает криптографическую верификацию, принимаемую международными судами. Это укрепляет доказательную ценность ваших материалов. Вы уверены, что хотите пропустить этот шаг?",
        az: "Sübutlarınızı Save tətbiqi ilə şəkillə çəkmək beynəlxalq məhkəmələrin qəbul etdiyi kriptoqrafik təsdiq təmin edir. Bu materiallarınızın sübut dəyərini gücləndirir. Bu addımı keçmək istədiyinizə əminsiniz?"
      },
      skipDialogCancel: {
        en: "Go back",
        ka: "უკან დაბრუნება",
        ru: "Вернуться",
        az: "Geri qayıt"
      },
      skipDialogConfirm: {
        en: "Skip anyway",
        ka: "მაინც გამოტოვება",
        ru: "Всё равно пропустить",
        az: "Yenə də keç"
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
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6">
              {getText("overviewTitle")}
            </h2>
            <div className="space-y-6 max-w-md mx-auto">
              <p className="text-base text-muted-foreground text-center leading-relaxed">
                {getText("overviewText")}
              </p>
              
              <div className="bg-security/10 border border-security/30 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-security flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {getText("safetyTitle")}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getText("safetyText")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "contactsoon":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                {getText("contactSoonTitle")}
              </h2>
              <p className="text-base text-muted-foreground max-w-sm mx-auto mb-2">
                {getText("contactSoonText")}
              </p>
              <p className="text-sm text-muted-foreground/70 italic max-w-sm mx-auto">
                {getText("contactSoonNote")}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-4 max-w-md mx-auto w-full">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-4 bg-card border border-border">
                  <span className="font-medium text-sm text-foreground">Signal</span>
                  <span className="text-xs text-muted-foreground mt-1">{CONTACTS.signal.display}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-card border border-border">
                  <span className="font-medium text-sm text-foreground">WhatsApp</span>
                  <span className="text-xs text-muted-foreground mt-1">{CONTACTS.whatsapp.display}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-card border border-border">
                  <span className="font-medium text-sm text-foreground">ProtonMail</span>
                  <span className="text-xs text-muted-foreground mt-1 truncate max-w-full">{CONTACTS.protonmail.display}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-card border border-border">
                  <span className="font-medium text-sm text-foreground">Threema</span>
                  <span className="text-xs text-muted-foreground mt-1">{CONTACTS.threema.display}</span>
                </div>
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

      case "preservation":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                {getText("preservationTitle")}
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {getText("preservationSubtext")}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full space-y-4">
              {/* Highlighted Document Before Moving callout */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary/10 border-2 border-primary/30 p-4 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Camera className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {getText("documentBeforeTitle")}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getText("documentBeforeText")}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Other tips in accordion */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2 px-1">
                  {language === "ka" ? "დამატებითი რჩევები" : 
                   language === "ru" ? "Дополнительные советы" : 
                   language === "az" ? "Əlavə məsləhətlər" : 
                   "Additional Tips"}
                </p>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="clothing" className="border-border">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">
                      {getText("clothingTitle")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {getText("clothingText")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="liquid" className="border-border">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">
                      {getText("liquidTitle")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {getText("liquidText")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="documents" className="border-border">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">
                      {getText("documentsTitle")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {getText("documentsText")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="storage" className="border-border">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline">
                      {getText("storageTitle")}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {getText("storageText")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </motion.div>
        );

      case "photograph":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="flex justify-center mb-8">
              <Camera className="h-14 w-14 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6">
              {getText("photographTitle")}
            </h2>
            <div className="space-y-5 max-w-md mx-auto">
              <p className="text-base text-muted-foreground text-center leading-relaxed">
                {getText("photographText")}
              </p>
              <p className="text-sm text-muted-foreground/80 text-center">
                {getText("photographDetail")}
              </p>
              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => {
                    haptic.medium();
                    onPhotographDigital();
                  }}
                  className="gap-2"
                  size="lg"
                >
                  {getText("photographButton")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
                {getText("contactSubtext")}
              </p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
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
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderNavigation = () => {
    // Photograph step - main action goes to Save app, with skip option
    if (currentStep === "photograph") {
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
              onPhotographDigital();
            }}
            className="h-14 flex-1 touch-manipulation rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            {getText("photographButton")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              haptic.light();
              setShowSkipDialog(true);
            }}
            variant="outline"
            className="h-14 flex-shrink-0 touch-manipulation rounded-none px-4"
          >
            <span className="text-xs">{getText("skip")}</span>
          </Button>
        </div>
      );
    }

    // Contact step (final) - show pulsating confirmation button to complete flow
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

    // All other steps - show Next only (no skip option for physical evidence)
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
      key="physical-evidence-flow"
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
      <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-full flex flex-col"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {renderNavigation()}

      {/* Skip Confirmation Dialog */}
      <AlertDialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <AlertDialogContent className="rounded-none border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">{getText("skipDialogTitle")}</AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed">
              {getText("skipDialogMessage")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => haptic.light()}
              className="rounded-none"
            >
              {getText("skipDialogCancel")}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                haptic.medium();
                setShowSkipDialog(false);
                handleNext();
              }}
              className="rounded-none bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {getText("skipDialogConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
