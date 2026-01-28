import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocalizedLink } from "@/components/LocalizedLink";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Printer } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { useTheme } from "next-themes";

const Methodology = () => {
  const { language } = useLanguage();
  const { setTheme } = useTheme();
  
  // Set light theme as default for methodology page
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  
  const handlePrint = () => {
    window.print();
  };

  // Get translated content based on language
  const getContent = () => {
    switch (language) {
      case "ka":
        return {
          navBack: "← ჩვენს მანდატზე დაბრუნება",
          navSubmit: "მტკიცებულებების წარდგენა →",
          category: "საგამოძიებო სტანდარტები",
          title: "მეთოდოლოგია",
          subtitle: "გამოძიების სტანდარტები და პროცედურები",
          lead: "საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი იცავს საგამოძიებო სტანდარტებს, რომლებიც შეესაბამება საერთაშორისო საუკეთესო პრაქტიკას. ეს მეთოდოლოგია უზრუნველყოფს დოკუმენტაციას, რომელიც აკმაყოფილებს საერთაშორისო სისხლის სამართლის ტრიბუნალების, რეგიონული ადამიანის უფლებათა სასამართლოების და შიდასახელმწიფოებრივი სასამართლო ორგანოების მოთხოვნებს.",
          leadP2: "ჩვენ ვთანამშრომლობთ საერთაშორისო სასამართლო ექსპერტებთან და პრაქტიკოსებთან, რომლებსაც აქვთ გამოცდილება გარდამავალ სამართლიანობასა და ქიმიური იარაღის დოკუმენტირებაში.",
          standardsTitle: "სტანდარტები და პროტოკოლები",
          standardsP1: "ჩვენი მეთოდოლოგია ეფუძნება ბერკლის პროტოკოლს ციფრული ღია წყაროების გამოძიებების შესახებ (2022) — საერთაშორისოდ აღიარებულ სტანდარტს სამართლებრივი პროცესებისთვის ციფრული მტკიცებულებების შეგროვებისა და შენახვისთვის.",
          processTitle: "მტკიცებულებითი პროცესი",
          processLead: "დოკუმენტაციის ჩვენს სისტემაში შესვლის მომენტიდან ის ექვემდებარება განსაზღვრულ მტკიცებულებათა ჯაჭვს, რომელიც იცავს მის მთლიანობას სამართალწარმოებისთვის.",
          step1Title: "1. შეგროვება",
          step1: "დოკუმენტაცია შედის ჩვენს სისტემაში უსაფრთხო, დაშიფრული არხებით. მიღებისთანავე ჩვენ ვქმნით კრიპტოგრაფიულ ჰეშს (SHA-256).",
          step2Title: "2. შენახვა",
          step2: "მასალები ინახება სეგრეგირებულ, ბოლოდან ბოლომდე დაშიფრულ სისტემებში.",
          step3Title: "3. ვერიფიკაცია",
          step3: "წარდგენილი მასალები გადის ჯვარედინ შემოწმებას სხვა დოკუმენტაციასთან კორობორაციის დასადგენად.",
          step4Title: "4. ანალიზი",
          step4: "ვერიფიცირებული მასალები ხელს უწყობს უფრო ფართო საგამოძიებო ანალიზს.",
          ethicsTitle: "ეთიკური ჩარჩო",
          ethicsLead: "ჩვენი მუშაობა რეგულირდება პრინციპებით, რომლებიც აბალანსებენ საგამოძიებო აუცილებლობას ჰუმანიტარულ ვალდებულებასთან.",
          objectivityTitle: "ობიექტურობა",
          objectivity: "მტკიცებულებები გროვდება და ინახება წინასწარი განსჯის გარეშე.",
          dataMinTitle: "მონაცემთა მინიმიზაცია",
          dataMin: "ჩვენ ვაგროვებთ მხოლოდ იმას, რაც აუცილებელია მტკიცებულებითი მიზნებისთვის.",
          witnessTitle: "მოწმეთა დაცვა",
          witness: "ყველა მონაწილე ფსევდონიმიზირებულია.",
          securityTitle: "უსაფრთხოების არქიტექტურა",
          securityLead: "ტექნიკური უსაფრთხოება სავალდებულოა.",
          zeroKnowledge: "ნულოვანი ცოდნის დაშიფვრა: წვდომა დადგენილი პროცედურების გარეშე ტექნიკურად შეუძლებელია.",
          segregated: "სეგრეგირებული შენახვა: მტკიცებულებები ინახება იდენტიფიცირებადი ინფორმაციისგან ცალკე.",
          e2ee: "ბოლოდან ბოლომდე დაშიფვრა: ყველა გადაცემა დაშიფრულია.",
          portalTitle: "დოკუმენტაციის პორტალის სტრუქტურა",
          portalLead: "უსაფრთხო დოკუმენტაციის პორტალი აკომოდირებს მტკიცებულებების სხვადასხვა კატეგორიას.",
          testimonyTitle: "ჩვენებები და მოწმეთა ანგარიშები",
          testimony: "პირველი პირის ანგარიშები ადგენენ კონტექსტს და ამყარებენ ფიზიკურ მტკიცებულებებს.",
          digitalTitle: "ციფრული მტკიცებულებები",
          digital: "ვიზუალური და დოკუმენტური მტკიცებულებები საჭიროებენ სპეციფიკურ მოპყრობას მეტამონაცემების შესანარჩუნებლად.",
          medicalTitle: "სამედიცინო დოკუმენტაცია",
          medical: "სამედიცინო ჩანაწერები, დაზიანების ფოტოები, მკურნალობის ისტორიები.",
          physicalTitle: "ფიზიკური მტკიცებულებები",
          physical: "ტანსაცმელი, ნიადაგის ნიმუშები, გამოყენებული საბრძოლო მასალები.",
          contactTitle: "უსაფრთხო კომუნიკაციის არხები",
          contactLead: "მექანიზმთან პირდაპირი კომუნიკაციისთვის:",
          relatedCivic: "სამოქალაქო აუცილებლობის დოქტრინა →",
          relatedSecurity: "ციფრული უსაფრთხოების სახელმძღვანელო →",
          relatedSubmit: "მტკიცებულებების წარდგენა →"
        };
      case "ru":
        return {
          navBack: "← Вернуться к мандату",
          navSubmit: "Отправить доказательства →",
          category: "Стандарты расследования",
          title: "Методология",
          subtitle: "Стандарты и процедуры расследования",
          lead: "Независимый следственный механизм по Грузии придерживается стандартов расследования, соответствующих лучшей международной практике. Эта методология обеспечивает документацию, отвечающую требованиям международных уголовных трибуналов, региональных судов по правам человека и национальных судебных органов.",
          leadP2: "Мы сотрудничаем с международными судебными экспертами и практиками, имеющими опыт в переходном правосудии и документировании химического оружия.",
          standardsTitle: "Стандарты и протоколы",
          standardsP1: "Наша методология основана на Беркли-протоколе по цифровым расследованиям открытых источников (2022) — международно признанном стандарте сбора и сохранения цифровых доказательств для судебных разбирательств.",
          processTitle: "Процесс работы с доказательствами",
          processLead: "С момента поступления документации в нашу систему она подчиняется определённой цепочке хранения, обеспечивающей её целостность для разбирательств.",
          step1Title: "1. Сбор",
          step1: "Документация поступает в нашу систему через защищённые, зашифрованные каналы. При получении мы создаём криптографический хеш (SHA-256).",
          step2Title: "2. Хранение",
          step2: "Материалы хранятся в изолированных системах со сквозным шифрованием.",
          step3Title: "3. Верификация",
          step3: "Представленные материалы проходят перекрёстную проверку с другой документацией для установления подтверждения.",
          step4Title: "4. Анализ",
          step4: "Верифицированные материалы способствуют более широкому следственному анализу.",
          ethicsTitle: "Этическая основа",
          ethicsLead: "Наша работа регулируется принципами, балансирующими следственную необходимость с гуманитарными обязательствами.",
          objectivityTitle: "Объективность",
          objectivity: "Доказательства собираются и сохраняются без предвзятости.",
          dataMinTitle: "Минимизация данных",
          dataMin: "Мы собираем только то, что необходимо для доказательственных целей.",
          witnessTitle: "Защита свидетелей",
          witness: "Все участники псевдонимизированы.",
          securityTitle: "Архитектура безопасности",
          securityLead: "Техническая безопасность обязательна.",
          zeroKnowledge: "Шифрование с нулевым разглашением: доступ без установленных процедур технически невозможен.",
          segregated: "Изолированное хранение: доказательства хранятся отдельно от идентифицирующей информации.",
          e2ee: "Сквозное шифрование: все передачи зашифрованы.",
          portalTitle: "Структура портала документации",
          portalLead: "Защищённый портал документации поддерживает различные категории доказательств.",
          testimonyTitle: "Показания и свидетельские отчёты",
          testimony: "Свидетельские показания устанавливают контекст и подтверждают физические доказательства.",
          digitalTitle: "Цифровые доказательства",
          digital: "Визуальные и документальные доказательства требуют специальной обработки для сохранения метаданных.",
          medicalTitle: "Медицинская документация",
          medical: "Медицинские записи, фотографии травм, истории лечения.",
          physicalTitle: "Физические доказательства",
          physical: "Одежда, образцы почвы, использованные боеприпасы.",
          contactTitle: "Защищённые каналы связи",
          contactLead: "Для прямой связи с Механизмом:",
          relatedCivic: "Доктрина гражданской необходимости →",
          relatedSecurity: "Руководство по цифровой безопасности →",
          relatedSubmit: "Отправить доказательства →"
        };
      case "az":
        return {
          navBack: "← Mandata qayıt",
          navSubmit: "Sübut təqdim et →",
          category: "Araşdırma standartları",
          title: "Metodologiya",
          subtitle: "Araşdırma standartları və prosedurları",
          lead: "Gürcüstan üzrə Müstəqil Araşdırma Mexanizmi beynəlxalq ən yaxşı təcrübəyə uyğun araşdırma standartlarını qoruyur. Bu metodologiya beynəlxalq cinayət tribunalları, regional insan haqları məhkəmələri və daxili məhkəmə orqanları qarşısında icraatlar üçün tələb olunan sənədləşdirməni təmin edir.",
          leadP2: "Biz keçid ədaləti və kimyəvi silahların sənədləşdirilməsində təcrübəsi olan beynəlxalq məhkəmə ekspertləri və praktiklərlə işləyirik.",
          standardsTitle: "Standartlar və protokollar",
          standardsP1: "Metodologiyamız Rəqəmsal Açıq Mənbə Araşdırmaları üzrə Berkli Protokoluna (2022) əsaslanır — məhkəmə prosesləri üçün rəqəmsal sübutların toplanması və qorunması üçün beynəlxalq tanınmış standart.",
          processTitle: "Sübut prosesi",
          processLead: "Sənədləşdirmə sistemimizə daxil olan andan etibarən, bütövlüyünü qoruyan müəyyən saxlama zincirinə tabedir.",
          step1Title: "1. Toplama",
          step1: "Sənədləşdirmə təhlükəsiz, şifrələnmiş kanallar vasitəsilə sistemimizə daxil olur. Qəbul edildikdə kriptoqrafik hash (SHA-256) yaradırıq.",
          step2Title: "2. Saxlama",
          step2: "Materiallar ayrılmış, uçdan-uca şifrələnmiş sistemlərdə saxlanılır.",
          step3Title: "3. Doğrulama",
          step3: "Təqdim edilmiş materiallar təsdiqləmə üçün digər sənədlərlə çarpaz yoxlanılır.",
          step4Title: "4. Təhlil",
          step4: "Doğrulanmış materiallar daha geniş araşdırma təhlilinə kömək edir.",
          ethicsTitle: "Etik çərçivə",
          ethicsLead: "İşimiz araşdırma zərurəti ilə humanitar öhdəlikləri balanslaşdıran prinsiplərlə tənzimlənir.",
          objectivityTitle: "Obyektivlik",
          objectivity: "Sübutlar öncədən mühakimə olmadan toplanır və qorunur.",
          dataMinTitle: "Məlumat minimizasiyası",
          dataMin: "Yalnız sübut məqsədləri üçün lazım olanı toplayırıq.",
          witnessTitle: "Şahid qorunması",
          witness: "Bütün iştirakçılar psevdonimləşdirilir.",
          securityTitle: "Təhlükəsizlik arxitekturası",
          securityLead: "Texniki təhlükəsizlik məcburidir.",
          zeroKnowledge: "Sıfır bilik şifrələməsi: müəyyən edilmiş prosedurlar olmadan giriş texniki cəhətdən mümkün deyil.",
          segregated: "Ayrılmış saxlama: sübutlar identifikasiya məlumatlarından ayrı saxlanılır.",
          e2ee: "Uçdan-uca şifrələmə: bütün ötürmələr şifrələnir.",
          portalTitle: "Sənədləşdirmə portalının strukturu",
          portalLead: "Təhlükəsiz Sənədləşdirmə Portalı müxtəlif sübut kateqoriyalarını qəbul edir.",
          testimonyTitle: "İfadələr və şahid hesabatları",
          testimony: "Birinci şəxs hesabatları kontekst yaradır və fiziki sübutları təsdiqləyir.",
          digitalTitle: "Rəqəmsal sübutlar",
          digital: "Vizual və sənəd sübutları metaməlumatları qorumaq üçün xüsusi idarəetmə tələb edir.",
          medicalTitle: "Tibbi sənədləşdirmə",
          medical: "Tibbi qeydlər, xəsarət fotoları, müalicə tarixçələri.",
          physicalTitle: "Fiziki sübutlar",
          physical: "Geyim, torpaq nümunələri, istifadə edilmiş döyüş materialları.",
          contactTitle: "Təhlükəsiz əlaqə kanalları",
          contactLead: "Mexanizmlə birbaşa əlaqə üçün:",
          relatedCivic: "Vətəndaş zərurəti doktrinası →",
          relatedSecurity: "Rəqəmsal təhlükəsizlik bələdçisi →",
          relatedSubmit: "Sübut təqdim et →"
        };
      default: // English
        return {
          navBack: "← Return to mandate",
          navSubmit: "Submit evidence →",
          category: "Investigative Standards",
          title: "Methodology",
          subtitle: "Investigative Standards & Procedures",
          lead: "The Independent Investigative Mechanism for Georgia maintains investigative standards consistent with international best practice. This methodology produces documentation that meets the evidentiary threshold for proceedings before international criminal tribunals, regional human rights courts, and domestic judicial bodies.",
          leadP2: "We work with international forensic experts and practitioners with experience in transitional justice and chemical weapons documentation.",
          standardsTitle: "Standards & Protocols",
          standardsP1: "Our methodology adheres to the Berkeley Protocol on Digital Open Source Investigations (2022)—the internationally recognized standard for collecting and preserving digital evidence for legal proceedings.",
          processTitle: "The Evidentiary Process",
          processLead: "From the moment documentation enters our system, it is subject to a defined chain of custody that preserves its integrity for legal proceedings.",
          step1Title: "1. Collection",
          step1: "Documentation enters our system through secure, encrypted channels. Upon receipt, we generate a cryptographic hash (SHA-256).",
          step2Title: "2. Preservation",
          step2: "Materials are stored in segregated, end-to-end encrypted systems.",
          step3Title: "3. Verification",
          step3: "Submitted materials undergo cross-referencing with other documentation to establish corroboration.",
          step4Title: "4. Analysis",
          step4: "Verified materials contribute to broader investigative analysis.",
          ethicsTitle: "Ethical Framework",
          ethicsLead: "Our work is governed by principles that balance investigative necessity with humanitarian obligation.",
          objectivityTitle: "Objectivity",
          objectivity: "Evidence is collected and preserved without prejudgment.",
          dataMinTitle: "Data Minimization",
          dataMin: "We collect only what is necessary for evidentiary purposes.",
          witnessTitle: "Witness Protection",
          witness: "All participants are pseudonymized.",
          securityTitle: "Security Architecture",
          securityLead: "Robust technical security is mandatory.",
          zeroKnowledge: "Zero-Knowledge Encryption: access without established procedures is technically infeasible.",
          segregated: "Segregated Storage: evidence is stored separately from identifying information.",
          e2ee: "End-to-End Encryption: all transmissions are encrypted.",
          portalTitle: "Documentation Portal Structure",
          portalLead: "The Secure Documentation Portal accommodates different categories of evidence.",
          testimonyTitle: "Testimony & Witness Accounts",
          testimony: "First-person accounts establish context and corroborate physical evidence.",
          digitalTitle: "Digital Evidence",
          digital: "Visual and documentary evidence requires specific handling to preserve metadata.",
          medicalTitle: "Medical Documentation",
          medical: "Medical records, injury photographs, treatment histories.",
          physicalTitle: "Physical Evidence",
          physical: "Clothing, soil samples, spent munitions.",
          contactTitle: "Secure Communication Channels",
          contactLead: "For direct communication with the Mechanism:",
          relatedCivic: "Doctrine of Civic Necessity →",
          relatedSecurity: "Digital Security Guide →",
          relatedSubmit: "Submit Evidence →"
        };
    }
  };

  const content = getContent();
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          <article className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
            {/* Print Header */}
            <div className="hidden print:block print-header mb-8 pb-6 border-b-2 border-[#1e3a5f]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-serif font-bold text-[#1e3a5f]">Civic Council of Georgia</p>
                  <p className="text-sm text-[#1e3a5f]/80 italic">Forum for Justice</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mb-8 flex flex-wrap gap-4 text-sm print:hidden">
              <LocalizedLink to="/" onClick={() => window.scrollTo(0, 0)} className="text-primary underline underline-offset-2 hover:text-primary/80">
                {content.navBack}
              </LocalizedLink>
              <LocalizedLink to="/submit-evidence" onClick={() => window.scrollTo(0, 0)} className="text-primary underline underline-offset-2 hover:text-primary/80 ml-auto">
                {content.navSubmit}
              </LocalizedLink>
            </nav>

            {/* Header */}
            <header className="mb-12 border-b border-border pb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-medium">
                  {content.category}
                </p>
                <button
                  onClick={handlePrint}
                  className="print:hidden flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif">
                {content.subtitle}
              </p>
            </header>

            {/* Lead */}
            <section className="mb-12">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif mb-8">
                {content.lead}
              </p>
              <p className="text-lg text-foreground/85 leading-[1.8]">
                {content.leadP2}
              </p>
            </section>

            {/* Standards */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.standardsTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8]">
                {content.standardsP1}
              </p>
            </section>

            {/* Process */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.processTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.processLead}
              </p>
              
              <div className="space-y-6 pl-4 md:pl-8 text-base text-foreground/80 leading-[1.8]">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.step1Title}</h3>
                  <p>{content.step1}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.step2Title}</h3>
                  <p>{content.step2}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.step3Title}</h3>
                  <p>{content.step3}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.step4Title}</h3>
                  <p>{content.step4}</p>
                </div>
              </div>
            </section>

            {/* Ethics */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.ethicsTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.ethicsLead}
              </p>
              
              <div className="space-y-6 pl-4 md:pl-8 text-base text-foreground/80 leading-[1.8]">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.objectivityTitle}</h3>
                  <p>{content.objectivity}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.dataMinTitle}</h3>
                  <p>{content.dataMin}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.witnessTitle}</h3>
                  <p>{content.witness}</p>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.securityTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.securityLead}
              </p>
              
              <div className="pl-4 md:pl-8 text-base text-foreground/80 leading-[1.8] space-y-3">
                <p><strong className="text-foreground">{content.zeroKnowledge}</strong></p>
                <p><strong className="text-foreground">{content.segregated}</strong></p>
                <p><strong className="text-foreground">{content.e2ee}</strong></p>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6 pl-4 md:pl-8 border-l-2 border-primary/30">
                {language === "ka" 
                  ? "მტკიცებულებები ინახება Hetzner ინფრასტრუქტურაზე ევროკავშირში, რომელიც ექვემდებარება მონაცემთა დაცვის მკაცრ რეგულაციებს."
                  : language === "ru"
                  ? "Доказательства хранятся на инфраструктуре Hetzner в Европейском союзе, подчиняющейся строгим правилам защиты данных."
                  : language === "az"
                  ? "Sübutlar Avropa İttifaqında Hetzner infrastrukturunun ciddi məlumat qorunması qaydalarına tabe olaraq saxlanılır."
                  : "Evidence is stored on Hetzner infrastructure in the European Union, subject to strict data protection regulations."}
              </p>
            </section>

            {/* Portal Structure */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.portalTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.portalLead}
              </p>
              
              <div className="space-y-6 pl-4 md:pl-8 text-base text-foreground/80 leading-[1.8]">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.testimonyTitle}</h3>
                  <p>{content.testimony}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.digitalTitle}</h3>
                  <p>{content.digital}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.medicalTitle}</h3>
                  <p>{content.medical}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{content.physicalTitle}</h3>
                  <p>{content.physical}</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.contactTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.contactLead}
              </p>
              
              <div className="pl-4 md:pl-8 text-base text-foreground/80 leading-[1.8] space-y-3">
                <p><strong className="text-foreground">Signal:</strong> <a href={CONTACTS.signal.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">{CONTACTS.signal.display}</a></p>
                <p><strong className="text-foreground">WhatsApp:</strong> <a href={CONTACTS.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">{CONTACTS.whatsapp.display}</a></p>
                <p><strong className="text-foreground">ProtonMail:</strong> <a href={CONTACTS.protonmail.url} className="text-primary underline underline-offset-2 hover:text-primary/80">{CONTACTS.protonmail.display}</a></p>
                <p><strong className="text-foreground">Threema:</strong> <a href={CONTACTS.threema.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80">{CONTACTS.threema.display}</a></p>
              </div>
            </section>

            {/* Related Links */}
            <section className="pt-6 border-t border-border">
              <div className="flex flex-wrap gap-4 text-sm">
                <LocalizedLink to="/civic-necessity" onClick={() => window.scrollTo(0, 0)} className="text-primary underline underline-offset-2 hover:text-primary/80">
                  {content.relatedCivic}
                </LocalizedLink>
                <LocalizedLink to="/security-guide" onClick={() => window.scrollTo(0, 0)} className="text-primary underline underline-offset-2 hover:text-primary/80">
                  {content.relatedSecurity}
                </LocalizedLink>
                <LocalizedLink to="/submit-evidence" onClick={() => window.scrollTo(0, 0)} className="text-primary underline underline-offset-2 hover:text-primary/80">
                  {content.relatedSubmit}
                </LocalizedLink>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Methodology;
