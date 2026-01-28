import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { LocalizedLink } from "@/components/LocalizedLink";
import { Shield, ArrowRight, Upload, Smartphone, Copy, Check, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SecurityAdvisoryAutoDialog } from "@/components/SecurityAdvisoryAutoDialog";
import { motion } from "framer-motion";
import { CONTACTS } from "@/lib/contacts";
import { useTheme } from "next-themes";
const SAVE_APP_IOS_URL = "https://apps.apple.com/app/save-by-openarchive/id1462212414";
const SAVE_APP_ANDROID_URL = "https://play.google.com/store/apps/details?id=net.opendasharchive.openarchive.release";
const SERVER_URL = "nx86146.your-storageshare.de/remote.php/dav/files/iimg_intake/";
const USERNAME = "iimg_intake";

// Save App Section Component
const SaveAppSection = ({
  language
}: {
  language: string;
}) => {
  const [copiedServer, setCopiedServer] = useState(false);
  const [copiedUsername, setCopiedUsername] = useState(false);
  const handleCopy = async (text: string, type: 'server' | 'username') => {
    await navigator.clipboard.writeText(text);
    if (type === 'server') {
      setCopiedServer(true);
      setTimeout(() => setCopiedServer(false), 2000);
    } else {
      setCopiedUsername(true);
      setTimeout(() => setCopiedUsername(false), 2000);
    }
  };
  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: "Connect via Save App",
        ka: "დაკავშირება Save აპით",
        ru: "Подключение через Save App",
        az: "Save App ilə qoşulma"
      },
      description: {
        en: "The Save app provides cryptographic verification for court-admissible evidence. Download the app and configure it to connect to our secure server.",
        ka: "Save აპი უზრუნველყოფს კრიპტოგრაფიულ ვერიფიკაციას სასამართლოში დასაშვები მტკიცებულებისთვის. ჩამოტვირთეთ აპი და დააკონფიგურირეთ ჩვენს უსაფრთხო სერვერთან დასაკავშირებლად.",
        ru: "Приложение Save обеспечивает криптографическую верификацию для судебно допустимых доказательств. Загрузите приложение и настройте его для подключения к нашему защищённому серверу.",
        az: "Save tətbiqi məhkəmədə qəbul edilən sübutlar üçün kriptoqrafik təsdiq təmin edir. Tətbiqi yükləyin və təhlükəsiz serverimizə qoşulmaq üçün konfiqurasiya edin."
      },
      downloadApp: {
        en: "Download Save App",
        ka: "ჩამოტვირთეთ Save აპი",
        ru: "Скачать Save App",
        az: "Save tətbiqini yükləyin"
      },
      setupSteps: {
        en: "Configuration steps:",
        ka: "კონფიგურაციის ნაბიჯები:",
        ru: "Шаги настройки:",
        az: "Quraşdırma addımları:"
      },
      step1: {
        en: "Open Settings → Add Server",
        ka: "გახსენით Settings → Add Server",
        ru: "Откройте Settings → Add Server",
        az: "Settings → Add Server açın"
      },
      step2: {
        en: "Select \"Private (WebDAV) Server\"",
        ka: "აირჩიეთ \"Private (WebDAV) Server\"",
        ru: "Выберите \"Private (WebDAV) Server\"",
        az: "\"Private (WebDAV) Server\" seçin"
      },
      step3: {
        en: "Enter credentials:",
        ka: "შეიყვანეთ მონაცემები:",
        ru: "Введите данные:",
        az: "Məlumatları daxil edin:"
      },
      passwordNote: {
        en: "Get password via guided portal",
        ka: "პაროლი მიიღეთ პორტალში",
        ru: "Получите пароль через портал",
        az: "Portaldan parol alın"
      },
      fullGuide: {
        en: "Full guided setup",
        ka: "სრული სახელმძღვანელო",
        ru: "Полное руководство",
        az: "Tam bələdçi"
      },
      hostedNote: {
        en: "Hosted on Hetzner in the EU",
        ka: "ჰოსტირებულია Hetzner-ზე ევროკავშირში",
        ru: "Размещено на Hetzner в ЕС",
        az: "Hetzner-də Aİ-də yerləşdirilir"
      },
      berkeleyNote: {
        en: "Evidence captured through Save embeds SHA-256 cryptographic hashes and GPS-verified timestamps per the Berkeley Protocol, establishing court-admissible chain of custody.",
        ka: "Save-ით გადაღებული მტკიცებულება შეიცავს SHA-256 კრიპტოგრაფიულ ჰეშებს და GPS-ით ვერიფიცირებულ დროის ნიშნულებს ბერკლის პროტოკოლის შესაბამისად.",
        ru: "Доказательства через Save содержат SHA-256 хеши и GPS-верифицированные метки времени согласно Беркли-протоколу.",
        az: "Save vasitəsilə sübutlar Berkeley Protokoluna uyğun SHA-256 hashləri və GPS-təsdiqlənmiş vaxt möhürləri ilə daxil edilir."
      },
      securityGuide: {
        en: "Review security guidelines before reaching out",
        ka: "უსაფრთხოების გზამკვლევი დაკავშირებამდე",
        ru: "Руководство по безопасности перед обращением",
        az: "Əlaqə saxlamadan əvvəl təhlükəsizlik bələdçisi"
      },
      directContact: {
        en: "Want to reach us directly or amend your earlier submission?",
        ka: "გსურთ პირდაპირი კონტაქტი ან წინა წარდგენის შესწორება?",
        ru: "Хотите связаться напрямую или изменить предыдущую отправку?",
        az: "Birbaşa əlaqə saxlamaq və ya əvvəlki təqdimatı düzəltmək istəyirsiniz?"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };
  return <div className="text-left">
      <div className="flex items-center gap-2 mb-3">
        <Smartphone className="h-5 w-5 text-primary" />
        <h4 className="font-medium text-foreground" style={{
        fontFamily: "'Georgia', 'Times New Roman', serif"
      }}>
          {getText("title")}
        </h4>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {getText("description")}
      </p>

      {/* Download buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <a href={SAVE_APP_IOS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors">
          <Download className="h-3.5 w-3.5" />
          iOS
        </a>
        <a href={SAVE_APP_ANDROID_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors">
          <Download className="h-3.5 w-3.5" />
          Android
        </a>
      </div>
      
      {/* Berkeley Protocol note */}
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed border-l-2 border-primary/30 pl-3">
        {getText("berkeleyNote")}
      </p>
      
      {/* Manual setup steps */}
      <div className="text-xs text-muted-foreground space-y-2 mb-4">
        <p className="font-medium text-foreground mb-2">
          {getText("setupSteps")}
        </p>
        <div className="space-y-1.5 pl-1">
          <p>1. {getText("step1")}</p>
          <p>2. {getText("step2")}</p>
          <p>3. {getText("step3")}</p>
          <div className="pl-3 space-y-1.5 mt-2">
            {/* Server URL with copy button */}
            <div className="flex items-center gap-2">
              <span>• Server:</span>
              <code className="font-mono text-foreground text-[10px] bg-muted/50 px-1.5 py-0.5 flex-1 truncate">
                {SERVER_URL}
              </code>
              <button onClick={() => handleCopy(SERVER_URL, 'server')} className="p-1 hover:bg-muted/50 transition-colors flex-shrink-0" title="Copy">
                {copiedServer ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            {/* Username with copy button */}
            <div className="flex items-center gap-2">
              <span>• Username:</span>
              <code className="font-mono text-foreground bg-muted/50 px-1.5 py-0.5">
                {USERNAME}
              </code>
              <button onClick={() => handleCopy(USERNAME, 'username')} className="p-1 hover:bg-muted/50 transition-colors flex-shrink-0" title="Copy">
                {copiedUsername ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            {/* Password note */}
            <p>• Password: <span className="italic">{getText("passwordNote")}</span></p>
          </div>
        </div>
        <p className="text-muted-foreground/70 italic mt-2">
          {getText("hostedNote")}
        </p>
      </div>

      {/* Link to full Berkeley Protocol guide */}
      <LocalizedLink to="/submit-evidence/berkeley" className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 mb-4 border-b border-primary/30 pb-0.5">
        <ExternalLink className="h-3 w-3" />
        {getText("fullGuide")} →
      </LocalizedLink>
      
      {/* Contact for amendments */}
      <div className="border-t border-border pt-4 mt-4">
        {/* Security Guidelines Link */}
        <LocalizedLink to="/security-guide" className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 mb-3 border-b border-primary/30 pb-0.5">
          <Shield className="h-3 w-3" />
          {getText("securityGuide")}
        </LocalizedLink>
        <p className="text-sm text-muted-foreground mb-2">
          {getText("directContact")}
        </p>
        <div className="flex flex-col gap-1">
          <a href={CONTACTS.signal.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium">
            Signal: {CONTACTS.signal.display}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href={CONTACTS.protonmail.url} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium">
            Email: {CONTACTS.protonmail.display}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>;
};
const Index = () => {
  const location = useLocation();
  const {
    t,
    language,
    setLanguage
  } = useLanguage();
  const {
    setTheme
  } = useTheme();

  // Set light theme as default for mandate page
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  // Sync language to route
  useEffect(() => {
    const pathLang = location.pathname.replace("/", "");
    if (pathLang === "en" && language !== "en") {
      setLanguage("en");
    } else if (pathLang === "ka" && language !== "ka") {
      setLanguage("ka");
    } else if (pathLang === "ru" && language !== "ru") {
      setLanguage("ru");
    } else if (pathLang === "az" && language !== "az") {
      setLanguage("az");
    }
  }, [location.pathname, language, setLanguage]);
  const getFurtherReadingText = () => {
    switch (language) {
      case "ka":
        return "დამატებითი ინფორმაცია";
      case "ru":
        return "Дополнительная информация";
      case "az":
        return "Əlavə məlumat";
      default:
        return "Further Reading";
    }
  };
  const getMethodologyText = () => {
    switch (language) {
      case "ka":
        return {
          title: "მეთოდოლოგია",
          desc: "გამოძიების სტანდარტები და პროცედურები"
        };
      case "ru":
        return {
          title: "Методология",
          desc: "Стандарты и процедуры расследования"
        };
      case "az":
        return {
          title: "Metodologiya",
          desc: "Araşdırma standartları və prosedurları"
        };
      default:
        return {
          title: "Methodology",
          desc: "Investigative standards and procedures"
        };
    }
  };
  const getCivicNecessityText = () => {
    switch (language) {
      case "ka":
        return {
          title: "სამოქალაქო აუცილებლობის დოქტრინა",
          desc: "სამართლებრივი საფუძველი დამოუკიდებელი დოკუმენტაციისთვის"
        };
      case "ru":
        return {
          title: "Доктрина гражданской необходимости",
          desc: "Правовая основа для независимого документирования"
        };
      case "az":
        return {
          title: "Vətəndaş zərurəti doktrinası",
          desc: "Müstəqil sənədləşdirmə üçün hüquqi əsas"
        };
      default:
        return {
          title: "Doctrine of Civic Necessity",
          desc: "Legal basis for independent documentation"
        };
    }
  };
  const getSecurityGuideText = () => {
    switch (language) {
      case "ka":
        return {
          title: "ციფრული უსაფრთხოების სახელმძღვანელო",
          desc: "დაიცავით თქვენი მონაცემები და კომუნიკაცია"
        };
      case "ru":
        return {
          title: "Руководство по цифровой безопасности",
          desc: "Защитите свои данные и коммуникации"
        };
      case "az":
        return {
          title: "Rəqəmsal təhlükəsizlik bələdçisi",
          desc: "Məlumatlarınızı və kommunikasiyalarınızı qoruyun"
        };
      default:
        return {
          title: "Digital Security Guide",
          desc: "Protect your data and communications"
        };
    }
  };
  const getSubmitEvidenceText = () => {
    switch (language) {
      case "ka":
        return {
          title: "მზად ხართ დოკუმენტაციისთვის?",
          desc: "წარადგინეთ მტკიცებულება ჩვენი უსაფრთხო პორტალის მეშვეობით.",
          button: "შედით დოკუმენტაციის პორტალში"
        };
      case "ru":
        return {
          title: "Готовы задокументировать?",
          desc: "Отправьте доказательства через наш защищённый портал.",
          button: "Войти в портал документации"
        };
      case "az":
        return {
          title: "Sənədləşdirməyə hazırsınız?",
          desc: "Sübutları təhlükəsiz portalımız vasitəsilə təqdim edin.",
          button: "Sənədləşdirmə portalına daxil olun"
        };
      default:
        return {
          title: "Ready to document?",
          desc: "Submit evidence through our secure portal.",
          button: "Enter Documentation Portal"
        };
    }
  };
  const getHeroCTAText = () => {
    switch (language) {
      case "ka":
        return "წარადგინეთ მტკიცებულება ჩვენი უსაფრთხო დოკუმენტაციის პორტალის მეშვეობით";
      case "ru":
        return "Отправьте доказательства через наш защищённый портал документации";
      case "az":
        return "Sübutları təhlükəsiz sənədləşdirmə portalımız vasitəsilə təqdim edin";
      default:
        return "Submit evidence through our secure documentation portal";
    }
  };
  const getTellYourStoryText = () => {
    switch (language) {
      case "ka":
        return "მოგვიყევით თქვენი ისტორია";
      case "ru":
        return "Расскажите свою историю";
      case "az":
        return "Hekayənizi danışın";
      default:
        return "Tell your story";
    }
  };
  const getSecureIntakePortalText = () => {
    switch (language) {
      case "ka":
        return {
          title: "უსაფრთხო მტკიცებულებების მიღების პორტალი",
          tresoritTitle: "ფაილების ატვირთვა Tresorit-ში",
          tresoritDesc: "ბოლოდან ბოლომდე დაშიფრული ფაილების ატვირთვა ანგარიშის შექმნის გარეშე. ფაილები დაშიფრული რჩება ჩვენი გუნდის მიერ განხილვამდე. იდეალურია დოკუმენტებისთვის, სამედიცინო ჩანაწერებისთვის და დამატებითი მტკიცებულებებისთვის.",
          tresoritButton: "ატვირთვა Tresorit-ში",
          saveTitle: "ფაილების ატვირთვა Save by Open Archive-ით",
          saveDesc: "მტკიცებულებებისთვის, რომლებიც საჭიროებენ კრიპტოგრაფიულ ვერიფიკაციას Berkeley პროტოკოლის მიხედვით. ჩაშენებული დროის ნიშნულები და ჩექსუმები სასამართლოსთვის მისაღები მტკიცებულებების ჯაჭვისთვის.",
          saveButtonIOS: "iOS-ისთვის ჩამოტვირთვა",
          saveButtonAndroid: "Android-ისთვის ჩამოტვირთვა"
        };
      case "ru":
        return {
          title: "Портал приёма доказательств",
          tresoritTitle: "Загрузить файлы в Tresorit",
          tresoritDesc: "Сквозное шифрование файлов без создания аккаунта. Файлы остаются зашифрованными до проверки нашей командой. Идеально для документов, медицинских записей и дополнительных доказательств.",
          tresoritButton: "Загрузить в Tresorit",
          saveTitle: "Загрузить файлы через Save by Open Archive",
          saveDesc: "Для доказательств, требующих криптографической верификации по Беркли-протоколу. Встроенные временные метки и контрольные суммы для судебно приемлемой цепочки хранения.",
          saveButtonIOS: "Скачать для iOS",
          saveButtonAndroid: "Скачать для Android"
        };
      case "az":
        return {
          title: "Təhlükəsiz sübut qəbulu portalı",
          tresoritTitle: "Faylları Tresorit-ə yükləyin",
          tresoritDesc: "Hesab yaratmadan uçdan-uca şifrələnmiş fayl yükləmə. Fayllar komandamız tərəfindən nəzərdən keçirilənə qədər şifrəli qalır. Sənədlər, tibbi qeydlər və əlavə sübutlar üçün idealdır.",
          tresoritButton: "Tresorit-ə yüklə",
          saveTitle: "Save by Open Archive ilə faylları yükləyin",
          saveDesc: "Berkeley protokoluna uyğun kriptoqrafik doğrulama tələb edən sübutlar üçün. Məhkəmədə qəbul edilən zəncir üçün daxili vaxt möhürləri və yoxlama cəmləri.",
          saveButtonIOS: "iOS üçün yüklə",
          saveButtonAndroid: "Android üçün yüklə"
        };
      default:
        return {
          title: "Secure Evidence Intake Portal",
          tresoritTitle: "Upload additional files to Tresorit",
          tresoritDesc: "For end-to-end encrypted file uploads without account creation. Files remain encrypted until reviewed by our team. Ideal for documents, medical records, and supplementary evidence.",
          tresoritButton: "Upload to Tresorit",
          saveTitle: "Upload files through Save by Open Archive",
          saveDesc: "For evidence that requires cryptographic verification per the Berkeley Protocol. Embeds timestamps and checksums for court-admissible chain of custody. Download Save for iOS or Android.",
          saveButtonIOS: "Download for iOS",
          saveButtonAndroid: "Download for Android"
        };
    }
  };
  const renderMandateText = () => {
    if (language === "en") {
      return <>
          {/* Mission Statement */}
          <motion.section className="mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <p className="article-text text-foreground text-lg leading-relaxed">
              The <em>Independent Investigative Mechanism for Georgia</em> (IIMG) documents events in Georgia during November–December 2024 and the period that followed. We collect, preserve, and analyze evidence to the standards required for proceedings before international criminal tribunals, regional human rights courts, and domestic judicial bodies.
            </p>
          </motion.section>

          {/* The Crisis */}
          <motion.section className="mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }}>
            <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              The Crisis
            </h3>
            <p className="article-text text-foreground mb-4">
              On 28 November 2024, the Georgian government announced the suspension of EU accession negotiations. Mass protests followed across the country. Police and security services responded with documented excessive force, including torture and ill-treatment in custody.
            </p>
            <p className="article-text text-foreground">
              <a href="https://www.amnesty.org/en/documents/eur56/0549/2025/en/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>Amnesty International</em></a>, in its report <em>"They Tear-Gassed Him Right in the Face"</em>, documented injuries consistent with exposure to chemical agents beyond standard riot control compounds. The <a href="https://www.bbc.com/news/articles/c33dv70kjkeo" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>BBC</em> investigation <em>"When Water Burns"</em></a> documented witness accounts and medical evidence consistent with the deployment of prohibited chemical agents against civilians.
            </p>
          </motion.section>

          {/* International Recognition */}
          <motion.section className="mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              International Recognition
            </h3>
            <p className="article-text text-foreground mb-4">
              The <a href="https://www.europarl.europa.eu/doceo/document/RC-10-2024-0179_EN.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>European Parliament</em></a> condemned the violence and called for an independent international investigation. The <a href="https://rm.coe.int/memorandum-on-the-human-rights-situation-in-georgia-by-michael-o-flahe/1680b4ba41" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>Council of Europe Commissioner for Human Rights</em></a> documented systematic violations of assembly rights. <a href="https://www.ohchr.org/en/press-releases/2025/01/georgia-must-investigate-use-force-police-during-demonstrations-experts" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>UN human rights experts</em></a> called on Georgia to investigate the use of force. <a href="https://www.osce.org/odihr/581962" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>OSCE/ODIHR</em></a> expressed grave concern over the treatment of protesters.
            </p>
            <p className="article-text text-foreground">
              <a href="https://www.hrw.org/news/2024/12/23/georgia-brutal-police-violence-against-protesters" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>Human Rights Watch</em></a> documented "brutal police violence against largely peaceful protesters" and called for EU sanctions on officials responsible for violent abuses.
            </p>
          </motion.section>

          {/* The Inadequacy of Domestic Remedies */}
          <motion.section className="mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              The Inadequacy of Domestic Remedies
            </h3>
            <p className="article-text text-foreground mb-4">
              International human rights law requires states to investigate credible allegations of serious violations. The <a href="https://hudoc.echr.coe.int/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>European Court of Human Rights</em></a> has consistently held that investigations which are merely formal—lacking genuine will to identify perpetrators—fail to discharge the state's procedural obligations.
            </p>
            <p className="article-text text-foreground mb-4">
              The <a href="https://enlargement.ec.europa.eu/document/download/7b6ed47c-ecde-41a2-99ea-41683dc2d1bd_en?filename=Georgia%20Report%202024.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>European Commission's</em> 2024 report</a> raised concerns regarding prosecutorial independence. <a href="https://ohrh.law.ox.ac.uk/judicial-capture-in-georgia/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">Academic observers</a> have documented patterns of judicial capture—the systematic weakening of institutional independence through political influence.
            </p>
            <p className="article-text text-foreground">
              This Mechanism proceeds from the recognition that domestic investigative processes do not satisfy the requirements of independence and effectiveness mandated by international law.
            </p>
          </motion.section>

          {/* Accountability */}
          <motion.section className="mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              Accountability
            </h3>
            <p className="article-text text-foreground mb-4">
              This Mechanism exists to build the evidentiary foundation for accountability. We are actively pursuing referrals to the <a href="https://www.icc-cpi.int/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>International Criminal Court</em></a>, the <a href="https://www.echr.coe.int/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>European Court of Human Rights</em></a>, <a href="https://www.ohchr.org/en/treaty-bodies" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">UN treaty bodies</a>, and specialized mechanisms addressing the use of chemical weapons.
            </p>
            <p className="article-text text-foreground mb-4">
              We coordinate with governments maintaining <a href="https://home.treasury.gov/policy-issues/financial-sanctions/sanctions-programs-and-country-information/global-magnitsky-sanctions" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">Magnitsky-style sanctions regimes</a> to ensure documented perpetrators face consequences. We support the <a href="https://www.europarl.europa.eu/doceo/document/RC-10-2024-0179_EN.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>European Parliament's</em></a> call for targeted sanctions against individuals responsible for documented violations.
            </p>
            <p className="article-text text-foreground">
              Documentation is not an end in itself—it is the foundation for justice. Accountability is the purpose of this work.
            </p>
          </motion.section>

          {/* Our Methodology */}
          <motion.section className="mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.5
        }}>
            <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              Our Methodology
            </h3>
            <p className="article-text text-foreground mb-4">
              We work with international forensic experts and practitioners with experience in transitional justice and chemical weapons documentation. Our documentation protocols adhere to the <a href="https://www.ohchr.org/sites/default/files/2024-01/OHCHR_BerkeleyProtocol.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>Berkeley Protocol on Digital Open Source Investigations</em></a>—the authoritative framework established by the <a href="https://www.ohchr.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>UN OHCHR</em></a> and <a href="https://humanrights.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>UC Berkeley's Human Rights Center</em></a>.
            </p>
            <p className="article-text text-foreground">
              We operate under the <LocalizedLink to="/civic-necessity" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"><em>Doctrine of Civic Necessity</em></LocalizedLink>—the principle that when domestic mechanisms cannot provide adequate accountability, citizens retain the right to document events for appropriate international channels.
            </p>
          </motion.section>

          {/* Further Reading */}
          <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.6
        }}>
            <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              Further Reading
            </h3>
            <ul className="article-text text-foreground space-y-2 list-disc list-inside">
              <li>
                <LocalizedLink to="/methodology" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">Methodology</LocalizedLink>
                <span className="text-muted-foreground"> — Investigative standards and procedures</span>
              </li>
              <li>
                <LocalizedLink to="/security-guide" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">Digital Security Guide</LocalizedLink>
                <span className="text-muted-foreground"> — Protect your data and communications</span>
              </li>
              <li>
                <LocalizedLink to="/civic-necessity" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">Doctrine of Civic Necessity</LocalizedLink>
                <span className="text-muted-foreground"> — Legal basis for independent documentation</span>
              </li>
            </ul>
          </motion.section>
        </>;
    }
    // Georgian, Russian, Azerbaijani - expanded mandate text
    const getMandateSections = () => {
      if (language === "ka") {
        return {
          missionStatement: "საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი (IIMG) აფიქსირებს მოვლენებს საქართველოში 2024 წლის ნოემბერ-დეკემბერში და მომდევნო პერიოდში. ჩვენ ვაგროვებთ, ვინახავთ და ვაანალიზებთ მტკიცებულებებს საერთაშორისო სისხლის სამართლის ტრიბუნალების, რეგიონული ადამიანის უფლებათა სასამართლოების და შიდასახელმწიფოებრივი სასამართლო ორგანოების წინაშე წარმოებისთვის საჭირო სტანდარტებით.",
          crisisTitle: "კრიზისი",
          crisisText1: "2024 წლის 28 ნოემბერს საქართველოს მთავრობამ გამოაცხადა ევროკავშირთან მოლაპარაკებების შეჩერება. მასობრივი პროტესტები მოჰყვა ქვეყნის მასშტაბით. პოლიციამ და უსაფრთხოების სამსახურებმა უპასუხეს დოკუმენტირებული გადაჭარბებული ძალით, მათ შორის წამებითა და არასათანადო მოპყრობით პატიმრობაში.",
          crisisText2: "Amnesty International-მა თავის ანგარიშში დააფიქსირა დაზიანებები, რომლებიც შეესაბამება ქიმიური აგენტების ზემოქმედებას სტანდარტული მასობრივი არეულობის საწინააღმდეგო ნაერთების მიღმა. BBC-ის გამოძიებამ დაადასტურა მოწმეთა ჩვენებები და სამედიცინო მტკიცებულებები აკრძალული ქიმიური აგენტების მოქალაქეებზე გამოყენების შესახებ.",
          internationalTitle: "საერთაშორისო აღიარება",
          internationalText: "ევროპარლამენტმა დაგმო ძალადობა და მოითხოვა დამოუკიდებელი საერთაშორისო გამოძიება. ევროპის საბჭოს ადამიანის უფლებათა კომისარმა დააფიქსირა შეკრების უფლებების სისტემატური დარღვევები. გაეროს ადამიანის უფლებათა ექსპერტებმა მოუწოდეს საქართველოს გამოიძიოს ძალის გამოყენება. OSCE/ODIHR-მა გამოხატა ღრმა შეშფოთება მომიტინგეთა მიმართ მოპყრობის გამო.",
          inadequacyTitle: "შიდა საშუალებების არაადეკვატურობა",
          inadequacyText: "საერთაშორისო ადამიანის უფლებათა სამართალი მოითხოვს სახელმწიფოებისგან სერიოზული დარღვევების სანდო ბრალდებების გამოძიებას. ევროპული კომისიის 2024 წლის ანგარიშმა გამოხატა შეშფოთება პროკურატურის დამოუკიდებლობის თაობაზე. აკადემიურმა დამკვირვებლებმა დააფიქსირეს სასამართლოს ხელში ჩაგდების შაბლონები.",
          accountabilityTitle: "ანგარიშვალდებულება",
          accountabilityText: "ეს მექანიზმი არსებობს ანგარიშვალდებულების სამტკიცებულო საფუძვლის შესაქმნელად. ჩვენ აქტიურად ვმუშაობთ მიმართვებზე საერთაშორისო სისხლის სამართლის სასამართლოში, ადამიანის უფლებათა ევროპულ სასამართლოში, გაეროს საკონვენციო ორგანოებში და ქიმიური იარაღის გამოყენების სპეციალიზებულ მექანიზმებში.",
          methodologyTitle: "ჩვენი მეთოდოლოგია",
          methodologyText: "ჩვენ ვმუშაობთ საერთაშორისო სასამართლო ექსპერტებთან და პრაქტიკოსებთან, რომლებსაც აქვთ გამოცდილება გარდამავალ მართლმსაჯულებასა და ქიმიური იარაღის დოკუმენტირებაში. ჩვენი დოკუმენტირების პროტოკოლები შეესაბამება ბერკლის პროტოკოლს ციფრული ღია წყაროების გამოძიების შესახებ."
        };
      }
      if (language === "ru") {
        return {
          missionStatement: "Независимый следственный механизм по Грузии (IIMG) документирует события в Грузии в ноябре-декабре 2024 года и в последующий период. Мы собираем, сохраняем и анализируем доказательства в соответствии со стандартами, необходимыми для разбирательств в международных уголовных трибуналах, региональных судах по правам человека и национальных судебных органах.",
          crisisTitle: "Кризис",
          crisisText1: "28 ноября 2024 года правительство Грузии объявило о приостановке переговоров о вступлении в ЕС. По всей стране прошли массовые протесты. Полиция и силы безопасности ответили задокументированным чрезмерным применением силы, включая пытки и жестокое обращение под стражей.",
          crisisText2: "Amnesty International зафиксировала травмы, соответствующие воздействию химических агентов, выходящих за рамки стандартных средств для разгона массовых беспорядков. Расследование BBC подтвердило показания свидетелей и медицинские доказательства применения запрещённых химических агентов против мирных граждан.",
          internationalTitle: "Международное признание",
          internationalText: "Европейский парламент осудил насилие и призвал к независимому международному расследованию. Комиссар Совета Европы по правам человека зафиксировал систематические нарушения права на собрания. Эксперты ООН по правам человека призвали Грузию расследовать применение силы. ОБСЕ/БДИПЧ выразило серьёзную обеспокоенность обращением с протестующими.",
          inadequacyTitle: "Неадекватность внутренних средств",
          inadequacyText: "Международное право в области прав человека требует от государств расследования достоверных обвинений в серьёзных нарушениях. Доклад Европейской комиссии 2024 года выразил обеспокоенность независимостью прокуратуры. Академические наблюдатели зафиксировали модели судебного захвата.",
          accountabilityTitle: "Подотчётность",
          accountabilityText: "Этот механизм существует для создания доказательной базы для подотчётности. Мы активно работаем над обращениями в Международный уголовный суд, Европейский суд по правам человека, договорные органы ООН и специализированные механизмы по химическому оружию.",
          methodologyTitle: "Наша методология",
          methodologyText: "Мы работаем с международными судебными экспертами и практиками, имеющими опыт в переходном правосудии и документировании химического оружия. Наши протоколы документирования соответствуют Беркли-протоколу по цифровым расследованиям открытых источников."
        };
      }
      // Azerbaijani
      return {
        missionStatement: "Gürcüstan üzrə Müstəqil Araşdırma Mexanizmi (IIMG) 2024-cü ilin noyabr-dekabr aylarında və sonrakı dövrdə Gürcüstandakı hadisələri sənədləşdirir. Biz beynəlxalq cinayət tribunalları, regional insan haqları məhkəmələri və milli məhkəmə orqanları qarşısında tələb olunan standartlara uyğun sübutlar toplayır, qoruyur və təhlil edirik.",
        crisisTitle: "Böhran",
        crisisText1: "28 noyabr 2024-cü ildə Gürcüstan hökuməti Aİ-yə qoşulma danışıqlarının dayandırıldığını elan etdi. Ölkə boyu kütləvi etirazlar başladı. Polis və təhlükəsizlik qüvvələri sənədləşdirilmiş həddindən artıq güc tətbiqi ilə, o cümlədən həbsxanada işgəncə və pis rəftarla cavab verdilər.",
        crisisText2: "Amnesty International \"Onun üzünə birbaşa gözyaşardıcı qaz atdılar\" adlı hesabatında standart kütləvi iğtişaşlara qarşı birləşmələrdən kənar kimyəvi agentlərin təsirinə uyğun xəsarətlər qeyd etdi. BBC-nin \"Su yandığında\" araşdırması mülki vətəndaşlara qarşı qadağan olunmuş kimyəvi agentlərin istifadəsinə dair şahid ifadələrini və tibbi sübutları təsdiqlədi.",
        internationalTitle: "Beynəlxalq tanınma",
        internationalText: "Avropa Parlamenti zorakılığı pislədi və müstəqil beynəlxalq araşdırma çağırışı etdi. Avropa Şurasının İnsan Hüquqları Komissarı toplaşma hüquqlarının sistemli pozuntularını sənədləşdirdi. BMT insan haqları mütəxəssisləri Gürcüstanı güc tətbiqini araşdırmağa çağırdı. ATƏT/DİTİB etirazçılara münasibətdən dərin narahatlıq ifadə etdi.",
        inadequacyTitle: "Daxili vasitələrin qeyri-adekvatlığı",
        inadequacyText: "Beynəlxalq insan haqları qanunu dövlətlərdən ciddi pozuntularla bağlı etibarlı ittihamları araşdırmağı tələb edir. Avropa Komissiyasının 2024-cü il hesabatı prokurorluğun müstəqilliyi ilə bağlı narahatlıq ifadə etdi. Akademik müşahidəçilər məhkəmə ələ keçirmə modellərini sənədləşdirdi.",
        accountabilityTitle: "Hesabatlılıq",
        accountabilityText: "Bu mexanizm hesabatlılıq üçün sübut bazası yaratmaq məqsədilə mövcuddur. Biz Beynəlxalq Cinayət Məhkəməsinə, Avropa İnsan Haqları Məhkəməsinə, BMT müqavilə orqanlarına və kimyəvi silah üzrə ixtisaslaşmış mexanizmlərə müraciətlər üzərində fəal işləyirik.",
        methodologyTitle: "Metodologiyamız",
        methodologyText: "Biz keçid ədaləti və kimyəvi silahların sənədləşdirilməsi sahəsində təcrübəsi olan beynəlxalq məhkəmə ekspertləri və praktiklərlə işləyirik. Sənədləşdirmə protokollarımız Rəqəmsal Açıq Mənbə Araşdırmaları üzrə Berkeley Protokoluna uyğundur."
      };
    };
    const sections = getMandateSections();
    return <>
        {/* Mission Statement */}
        <motion.section className="mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <p className="article-text text-foreground text-lg leading-relaxed">
            {sections.missionStatement}
          </p>
        </motion.section>

        {/* The Crisis */}
        <motion.section className="mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }}>
          <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
          fontFamily: "'Georgia', 'Times New Roman', serif"
        }}>
            {sections.crisisTitle}
          </h3>
          <p className="article-text text-foreground mb-4">
            {sections.crisisText1}
          </p>
          <p className="article-text text-foreground">
            {sections.crisisText2}
          </p>
        </motion.section>

        {/* International Recognition */}
        <motion.section className="mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }}>
          <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
          fontFamily: "'Georgia', 'Times New Roman', serif"
        }}>
            {sections.internationalTitle}
          </h3>
          <p className="article-text text-foreground">
            {sections.internationalText}
          </p>
        </motion.section>

        {/* The Inadequacy of Domestic Remedies */}
        <motion.section className="mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }}>
          <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
          fontFamily: "'Georgia', 'Times New Roman', serif"
        }}>
            {sections.inadequacyTitle}
          </h3>
          <p className="article-text text-foreground">
            {sections.inadequacyText}
          </p>
        </motion.section>

        {/* Accountability */}
        <motion.section className="mb-8" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }}>
          <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
          fontFamily: "'Georgia', 'Times New Roman', serif"
        }}>
            {sections.accountabilityTitle}
          </h3>
          <p className="article-text text-foreground">
            {sections.accountabilityText}
          </p>
        </motion.section>

        {/* Our Methodology */}
        <motion.section initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }}>
          <h3 className="text-xl font-medium text-foreground mb-3 border-l-4 border-primary pl-4" style={{
          fontFamily: "'Georgia', 'Times New Roman', serif"
        }}>
            {sections.methodologyTitle}
          </h3>
          <p className="article-text text-foreground mb-4">
            {sections.methodologyText}
          </p>
          <p className="article-text text-foreground">
            <Link to="/methodology" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              {language === "ka" ? "ჩვენი დოკუმენტირების პროტოკოლები" : language === "ru" ? "Наши протоколы документирования" : "Sənədləşdirmə protokollarımız"}
            </Link>
            {" | "}
            <Link to="/civic-necessity" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              {language === "ka" ? "სამოქალაქო აუცილებლობის დოქტრინა" : language === "ru" ? "Доктрина гражданской необходимости" : "Vətəndaş zərurəti doktrinası"}
            </Link>
          </p>
        </motion.section>
      </>;
  };
  const cardHoverClass = "group block p-4 border border-border rounded-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 bg-background";
  return <div className="min-h-screen flex flex-col bg-background">
      <SecurityAdvisoryAutoDialog />
      <Header />
      <main className="flex-1">
        {/* Hero Section - Two Column Layout */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">
              {/* Left Column - Title and Mandate */}
              <div className="lg:w-3/5 mb-8 lg:mb-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 leading-tight tracking-tight" style={{
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}>
                  {t.hero.title}
                  {language !== "en" && <span className="block text-lg md:text-xl lg:text-2xl mt-3 font-normal tracking-normal text-muted-foreground">
                      The Independent Investigative Mechanism for Georgia
                    </span>}
                </h1>
                {/* Special Mandate - Translated */}
                <p className="text-base md:text-lg text-primary/90 font-medium" style={{
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}>
                  {language === "ka" ? "სახელმწიფო დანაშაულების, სისტემური ძალადობისა და ქიმიური აგენტების გამოყენების სპეციალური მანდატი" : language === "ru" ? "Специальный мандат по государственным преступлениям, системному насилию и применению химических агентов" : language === "az" ? "Dövlət Cinayətləri, Sistemli Zorakılıq və Kimyəvi Agentlərin İstifadəsi üzrə Xüsusi Mandat" : "Special Mandate on State Crimes, Systemic Violence, and the Use of Chemical Agents"}
                </p>
              </div>

              {/* Right Column - CTA Blocks */}
              <div className="lg:w-2/5 flex flex-col gap-4">
                {/* Submit Evidence Block */}
                <LocalizedLink to="/submit-evidence" className="block bg-card p-6 hover:bg-card/80 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-lg font-medium text-card-foreground group-hover:text-primary transition-colors" style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif"
                  }}>
                      {language === "ka" ? "მტკიცებულებების წარდგენა" : language === "ru" ? "ОТПРАВИТЬ ДОКАЗАТЕЛЬСТВА" : language === "az" ? "SÜBUT TƏQDİM EDİN" : "SUBMIT EVIDENCE"}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getHeroCTAText()}
                  </p>
                </LocalizedLink>

                {/* Tell Your Story Block */}
                <LocalizedLink to="/submit-evidence?tier=testimony" className="block bg-primary p-6 hover:bg-primary/90 transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-medium text-primary-foreground" style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif"
                  }}>
                      {getTellYourStoryText()}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-auto text-primary-foreground/70 group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-sm text-primary-foreground/80">
                    {language === "ka" ? "გაუზიარეთ თქვენი გამოცდილება უსაფრთხოდ" : language === "ru" ? "Поделитесь своим опытом безопасно" : language === "az" ? "Təcrübənizi təhlükəsiz paylaşın" : "Share your experience securely"}
                  </p>
                </LocalizedLink>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-6 md:py-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="border-t border-border pt-6">
              {renderMandateText()}
            </div>
          </div>
        </article>

        {/* Further Reading Section with Hover Cards */}
        <motion.section className="py-6 border-t border-border" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }}>
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-lg font-medium text-foreground mb-4" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              {getFurtherReadingText()}
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <LocalizedLink to="/methodology" className={cardHoverClass}>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1" style={{
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}>
                  {getMethodologyText().title}
                </h4>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                  {getMethodologyText().desc}
                </p>
              </LocalizedLink>

              <LocalizedLink to="/security-guide" className={cardHoverClass}>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1" style={{
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}>
                  {getSecurityGuideText().title}
                </h4>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                  {getSecurityGuideText().desc}
                </p>
              </LocalizedLink>

              <LocalizedLink to="/civic-necessity" className={cardHoverClass}>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1" style={{
                fontFamily: "'Georgia', 'Times New Roman', serif"
              }}>
                  {getCivicNecessityText().title}
                </h4>
                <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                  {getCivicNecessityText().desc}
                </p>
              </LocalizedLink>
            </div>
          </div>
        </motion.section>

        {/* Secure Documentation Portal Section - Centered */}
        <motion.section className="mt-8 md:mt-12 bg-card" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.7
      }}>
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 text-center">
          <h3 className="text-xl md:text-2xl font-medium text-card-foreground mb-4 tracking-wide" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              {language === "ka" ? "უსაფრთხო დოკუმენტაციის პორტალი" : language === "ru" ? "ПОРТАЛ БЕЗОПАСНОЙ ДОКУМЕНТАЦИИ" : language === "az" ? "TƏHLÜKƏSİZ SƏNƏDLƏŞDİRMƏ PORTALI" : "SECURE DOCUMENTATION PORTAL"}
            </h3>
            <p className="text-muted-foreground mb-8 text-base max-w-xl mx-auto leading-relaxed">
              {language === "ka" ? "ჩვენი მეთოდოლოგია შეესაბამება საერთაშორისო სტანდარტებს სამართლებრივი დასაშვებობისთვის. ჩვენ ვალდებული ვართ ზრუნვის მოვალეობით ყველა პირის მიმართ, ვინც გვანდობს თავის ჩვენებას." : language === "ru" ? "Наша методология соответствует международным стандартам юридической допустимости. Мы обязуемся проявлять должную заботу о каждом, кто доверяет нам свои показания." : language === "az" ? "Metodologiyamız hüquqi məqbulluq üçün beynəlxalq standartlara uyğundur. İfadələrini bizə etibar edən hər kəsə qarşı qayğı öhdəliyi daşıyırıq." : "Our methodology adheres to international standards for legal admissibility. We are bound by a duty of care to every person who entrusts us with their testimony."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Button asChild size="lg" className="gap-3">
                  <LocalizedLink to="/submit-evidence">
                    <Shield className="h-5 w-5" />
                    {language === "ka" ? "მტკიცებულებების წარდგენა" : language === "ru" ? "ОТПРАВИТЬ ДОКАЗАТЕЛЬСТВА" : language === "az" ? "SÜBUT TƏQDİM EDİN" : "SUBMIT EVIDENCE"}
                    <ArrowRight className="h-4 w-4" />
                  </LocalizedLink>
                </Button>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Button asChild size="lg" variant="outline" className="gap-3">
                  <LocalizedLink to="/submit-evidence?tier=testimony">
                    {language === "ka" ? "მოგვიყევით თქვენი ისტორია" : language === "ru" ? "РАССКАЖИТЕ ИСТОРИЮ" : language === "az" ? "HEKAYƏNİZİ DANIŞIN" : "TELL YOUR STORY"}
                    <ArrowRight className="h-4 w-4" />
                  </LocalizedLink>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Secure Evidence Intake Portal Section */}
        <motion.section className="py-8 md:py-12 border-t border-border" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.8
      }}>
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-xl md:text-2xl font-medium text-foreground mb-6" style={{
            fontFamily: "'Georgia', 'Times New Roman', serif"
          }}>
              {language === "ka" ? "მეტი გასაზიარებელი" : language === "ru" ? "Больше для обмена" : language === "az" ? "Daha çox paylaşmaq" : "More to share"}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Tresorit Column */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-foreground" style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif"
                }}>
                    {getSecureIntakePortalText().tresoritTitle}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {language === "en" ? "For end-to-end encrypted file uploads consistent with United Nations document retention standards. Files remain encrypted until reviewed by our team." : getSecureIntakePortalText().tresoritDesc}
                </p>
                <a href={CONTACTS.tresorit.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium border-b border-primary/50 hover:border-primary pb-0.5 transition-colors">
                  {getSecureIntakePortalText().tresoritButton}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Save by Open Archive Column */}
              <SaveAppSection language={language} />
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>;
};
export default Index;