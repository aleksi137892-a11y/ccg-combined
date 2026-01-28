import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLocalizedNavigation } from "@/hooks/use-localized-navigation";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Printer, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { CONTACTS } from "@/lib/contacts";

const SecurityGuide = () => {
  const handlePrint = () => {
    window.print();
  };
  const { language } = useLanguage();
  const { navigateLocalized } = useLocalizedNavigation();
  const [clearHistoryOpen, setClearHistoryOpen] = useState(false);
  const location = useLocation();

  // Check if user came from the evidence portal
  const fromPortal = location.state?.fromPortal || 
    document.referrer.includes('/submit-evidence') ||
    sessionStorage.getItem('evidence_queue');

  const handleBackToPortal = () => {
    navigateLocalized('/submit-evidence/portal');
  };

  const renderBilingual = (native: string, english?: string) => {
    if (language === "en" || !english) return native;
    return (
      <>
        {native}
        <span className="block text-sm text-muted-foreground/70 mt-1 italic">{english}</span>
      </>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          <article className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
            {/* Print Header - Only visible in PDF */}
            <div className="hidden print:block print-header mb-8 pb-6 border-b-2 border-[#1e3a5f]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-serif font-bold text-[#1e3a5f]">Civic Council of Georgia</p>
                  <p className="text-sm text-[#1e3a5f]/80 italic">Forum for Justice</p>
                </div>
                <div className="text-right text-xs text-[#1e3a5f]/70">
                  <p>Independent Investigative Mechanism for Georgia</p>
                  <p>Technical Guidance Document</p>
                </div>
              </div>
            </div>

            {/* Back to Portal Button - shown when coming from evidence portal */}
            {fromPortal && (
              <button
                onClick={handleBackToPortal}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors print:hidden"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "ka" ? "პორტალზე დაბრუნება" : 
                 language === "ru" ? "Вернуться на портал" :
                 language === "az" ? "Portala qayıt" :
                 "Back to Portal"}
              </button>
            )}

            {/* Bilingual Navigation */}
            <nav className="mb-8 flex flex-wrap gap-4 text-sm print:hidden">
              <LocalizedLink to="/" className="text-primary hover:underline">
                ← ჩვენს მანდატზე დაბრუნება / Return to mandate
              </LocalizedLink>
              <LocalizedLink to="/submit-evidence" className="text-primary hover:underline ml-auto">
                მტკიცებულებების წარდგენა → / Submit evidence →
              </LocalizedLink>
            </nav>

            {/* Document Header */}
            <header className="mb-12 border-b border-border pb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-medium">
                  Technical Guidance
                </p>
                <button
                  onClick={handlePrint}
                  className="print:hidden flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  title="Print or save as PDF"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                {renderBilingual(
                  language === "ka" ? "ციფრული უსაფრთხოების სახელმძღვანელო" :
                  language === "ru" ? "Руководство по цифровой безопасности" :
                  language === "az" ? "Rəqəmsal Təhlükəsizlik Bələdçisi" :
                  "Digital Security Guidelines",
                  language !== "en" ? "Digital Security Guidelines" : undefined
                )}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif">
                {renderBilingual(
                  language === "ka" ? "კომუნიკაციების და მოწყობილობების დაცვა მტკიცებულებათა მთლიანობისა და პირადი უსაფრთხოებისთვის." :
                  language === "ru" ? "Защита коммуникаций и устройств для обеспечения целостности доказательств и личной безопасности." :
                  language === "az" ? "Sübut bütövlüyü və şəxsi təhlükəsizlik üçün kommunikasiyaların və cihazların qorunması." :
                  "Protecting communications and devices for evidentiary integrity and personal safety.",
                  language !== "en" ? "Protecting communications and devices for evidentiary integrity and personal safety." : undefined
                )}
              </p>
            </header>

            {/* Lead paragraph - Guardian style standfirst */}
            <section className="mb-12">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif mb-8">
                {renderBilingual(
                  language === "ka" ? "ციფრული უსაფრთხოება ფიზიკური უსაფრთხოების გაგრძელებაა. პირთათვის, რომლებიც აფიქსირებენ პოტენციურ დარღვევებს ან ინახავენ მტკიცებულებებს, კომუნიკაციებისა და მოწყობილობების მონაცემების დაცვა განუყოფელია როგორც პირადი უსაფრთხოებისთვის, ასევე მტკიცებულებითი მთლიანობისთვის." :
                  language === "ru" ? "Цифровая безопасность является продолжением физической безопасности. Для лиц, документирующих потенциальные нарушения или сохраняющих доказательства, защита коммуникаций и данных устройств является неотъемлемой частью как личной безопасности, так и целостности доказательств." :
                  language === "az" ? "Rəqəmsal təhlükəsizlik fiziki təhlükəsizliyin davamıdır. Potensial pozuntuları sənədləşdirən və ya sübutları qoruyan şəxslər üçün kommunikasiyaların və cihaz məlumatlarının qorunması həm şəxsi təhlükəsizlik, həm də sübut bütövlüyü üçün vacibdir." :
                  "Digital security is an extension of physical security. For individuals documenting potential violations or preserving evidence, protecting communications and device data is integral to both personal safety and evidentiary integrity.",
                  language !== "en" ? "Digital security is an extension of physical security." : undefined
                )}
              </p>
            </section>

            {/* Georgia-specific context - blockquote style */}
            <section className="mb-12 border-l-4 border-primary pl-6 py-2">
              <p className="text-lg text-foreground/90 leading-relaxed mb-4 font-medium">
                {renderBilingual(
                  language === "ka" ? "საქართველოში საგანგებო მდგომარეობა" :
                  language === "ru" ? "Ситуация в Грузии" :
                  language === "az" ? "Gürcüstandakı vəziyyət" :
                  "Note on the Georgian Context",
                  language !== "en" ? "Note on the Georgian Context" : undefined
                )}
              </p>
              <p className="text-base text-foreground/80 leading-relaxed mb-4">
                {renderBilingual(
                  language === "ka" ? "სამოქალაქო საზოგადოების წევრები, ჟურნალისტები და დემონსტრანტები საქართველოში მიზანმიმართული ციფრული თვალთვალის, ფიშინგის შეტევებისა და მოწყობილობების კონფისკაციის მზარდ საფრთხეს აწყდებიან. დოკუმენტირებული შემთხვევები მოიცავს ტელეფონების დაჰაკვას ჟურნალისტებისა და აქტივისტების წინააღმდეგ, სახელმწიფო აქტორების მიერ დაფინანსებული ფიშინგის კამპანიებს, და მოწყობილობების ჩამორთმევას დაკავებისას." :
                  language === "ru" ? "Члены гражданского общества, журналисты и демонстранты в Грузии сталкиваются с повышенными угрозами целенаправленной цифровой слежки, фишинговых атак и изъятия устройств. Документированные случаи включают взлом телефонов журналистов и активистов, финансируемые государством фишинговые кампании и изъятие устройств при задержании." :
                  language === "az" ? "Gürcüstanda vətəndaş cəmiyyəti üzvləri, jurnalistlər və nümayişçilər hədəfli rəqəmsal nəzarət, fişinq hücumları və cihaz müsadirəsi ilə artan təhdidlərlə üzləşirlər. Sənədləşdirilmiş hallar jurnalistlərin və fəalların telefonlarının sındırılmasını, dövlət maliyyələşdirməli fişinq kampaniyalarını və həbs zamanı cihaz müsadirəsini əhatə edir." :
                  "Civil society members, journalists, and demonstrators in Georgia face heightened threats of targeted digital surveillance, phishing attacks, and device seizure. Documented incidents include phone hacking targeting journalists and activists, state-sponsored phishing campaigns, and device confiscation during detention.",
                  language !== "en" ? "Civil society in Georgia faces heightened digital threats." : undefined
                )}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                {renderBilingual(
                  language === "ka" ? "ქვემოთ მოცემული რეკომენდაციები განსაკუთრებით რელევანტურია პირებისთვის, რომლებიც მოქმედებენ ამ გარემოში." :
                  language === "ru" ? "Приведённые ниже рекомендации особенно актуальны для лиц, действующих в этой среде." :
                  language === "az" ? "Aşağıdakı tövsiyələr bu mühitdə fəaliyyət göstərən şəxslər üçün xüsusilə aktualdır." :
                  "The recommendations below are particularly relevant for individuals operating in this environment.",
                  language !== "en" ? "These recommendations are particularly relevant for individuals in Georgia." : undefined
                )}
              </p>
            </section>

            {/* Preamble */}
            <section className="mb-10">
              <p className="text-base text-foreground/80 leading-[1.8] pl-0 md:pl-4">
                {renderBilingual(
                  language === "ka" ? "წინამდებარე დოკუმენტი მოიცავს პრაქტიკულ რეკომენდაციებს, რომლებიც ეფუძნება სამოქალაქო საზოგადოების ორგანიზაციების გამოცდილებას მთელი მსოფლიოში. ინდივიდუალური გარემოებები შეიძლება მოითხოვდეს დამატებით ზომებს; ეს არ წარმოადგენს იურიდიულ კონსულტაციას." :
                  language === "ru" ? "Настоящий документ содержит практические рекомендации, основанные на опыте организаций гражданского общества по всему миру. Индивидуальные обстоятельства могут требовать дополнительных мер; это не является юридической консультацией." :
                  language === "az" ? "Bu sənəd dünya üzrə vətəndaş cəmiyyəti təşkilatlarının təcrübəsinə əsaslanan praktik tövsiyələri ehtiva edir. Fərdi hallar əlavə tədbirlər tələb edə bilər; bu hüquqi məsləhət deyil." :
                  "This document provides practical recommendations drawing on the experience of civil society organizations worldwide. Individual circumstances may require additional measures; this does not constitute legal advice.",
                  language !== "en" ? "Individual circumstances may require additional measures." : undefined
                )}
              </p>
            </section>

            {/* Section: Network Security - NUMBER REMOVED */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {renderBilingual(
                  language === "ka" ? "ქსელის უსაფრთხოება" :
                  language === "ru" ? "Сетевая безопасность" :
                  language === "az" ? "Şəbəkə Təhlükəsizliyi" :
                  "Network Security",
                  language !== "en" ? "Network Security" : undefined
                )}
              </h2>
              
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {renderBilingual(
                  language === "ka" ? "ვირტუალური პირადი ქსელი (VPN) შიფრავს ინტერნეტ ტრაფიკს და მალავს IP მისამართს ინტერნეტ პროვაიდერებისა და ქსელის ადმინისტრატორებისგან. ეს განსაკუთრებით მნიშვნელოვანია საჯარო ქსელების გამოყენებისას ან რეგიონებში, სადაც ინტერნეტ მონიტორინგი ხორციელდება." :
                  language === "ru" ? "Виртуальная частная сеть (VPN) шифрует интернет-трафик и скрывает IP-адрес от интернет-провайдеров и сетевых администраторов. Это особенно важно при использовании публичных сетей или в регионах с интернет-мониторингом." :
                  language === "az" ? "Virtual Şəxsi Şəbəkə (VPN) internet trafikini şifrələyir və IP ünvanını internet provayderləri və şəbəkə administratorlarından gizlədir. Bu, ictimai şəbəkələrdən istifadə edərkən və ya internet monitorinqi olan regionlarda xüsusilə vacibdir." :
                  "A virtual private network (VPN) encrypts internet traffic and conceals IP addresses from internet service providers and network administrators. This is particularly important when using public networks or in regions where internet monitoring occurs.",
                  language !== "en" ? "A VPN encrypts internet traffic and conceals IP addresses from ISPs." : undefined
                )}
              </p>

              <div className="pl-4 md:pl-8 mb-6 text-base text-foreground/80 leading-[1.8]">
                <p className="mb-4">
                  {language === "en" ? (
                    <>
                      Reputable providers include{" "}
                      <a href="https://protonvpn.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ProtonVPN</a>{" "}
                      (Swiss jurisdiction, no-logs policy),{" "}
                      <a href="https://mullvad.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Mullvad VPN</a>{" "}
                      (anonymous accounts, no email required), and{" "}
                      <a href="https://ivpn.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">IVPN</a>{" "}
                      (independently audited).
                    </>
                  ) : (
                    <>
                      სანდო პროვაიდერები:{" "}
                      <a href="https://protonvpn.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ProtonVPN</a>,{" "}
                      <a href="https://mullvad.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Mullvad VPN</a>,{" "}
                      <a href="https://ivpn.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">IVPN</a>.
                    </>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? (
                    <>
                      For detailed guidance, see the Electronic Frontier Foundation's{" "}
                      <a href="https://ssd.eff.org/module/choosing-vpn-thats-right-you" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Surveillance Self-Defense guide
                      </a>.
                    </>
                  ) : (
                    <>
                      დეტალური რეკომენდაციებისთვის იხილეთ:{" "}
                      <a href="https://ssd.eff.org/module/choosing-vpn-thats-right-you" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        EFF Surveillance Self-Defense
                      </a>.
                    </>
                  )}
                </p>
              </div>
              
              <p className="text-base text-foreground/80 leading-[1.8] pl-0 md:pl-4">
                {renderBilingual(
                  language === "ka" ? "საჯარო უსადენო ქსელები — კაფეები, აეროპორტები, სასტუმროები — შეიძლება იყოს მონიტორინგის ქვეშ ან კონფიგურირებული ტრაფიკის ჩასაჭრელად. VPN გამოყენება ნებისმიერ საჯარო ქსელზე აუცილებელია. მაქსიმალური ანონიმურობისთვის გაითვალისწინეთ Tor-ის გამოყენება VPN-თან ერთად." :
                  language === "ru" ? "Публичные беспроводные сети — кафе, аэропорты, отели — могут находиться под наблюдением или быть настроены для перехвата трафика. Использование VPN в любой публичной сети обязательно. Для максимальной анонимности рассмотрите использование Tor в сочетании с VPN." :
                  language === "az" ? "İctimai simsiz şəbəkələr — kafelər, aeroportlar, otellər — izlənilə və ya trafiki kəsmək üçün konfiqurasiya edilə bilər. Hər hansı ictimai şəbəkədə VPN istifadəsi vacibdir. Maksimum anonimlik üçün Tor-u VPN ilə birlikdə istifadə etməyi düşünün." :
                  "Public wireless networks—cafes, airports, hotels—may be monitored or configured to intercept traffic. VPN use on any public network is essential. For maximum anonymity, consider using Tor in conjunction with a VPN.",
                  language !== "en" ? "Public networks may be monitored. VPN use is essential." : undefined
                )}
              </p>
            </section>

            {/* Section: Browser Security - NUMBER REMOVED, DuckDuckGo ADDED */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {renderBilingual(
                  language === "ka" ? "ბრაუზერის უსაფრთხოება" :
                  language === "ru" ? "Безопасность браузера" :
                  language === "az" ? "Brauzer Təhlükəsizliyi" :
                  "Browser Security",
                  language !== "en" ? "Browser Security" : undefined
                )}
              </h2>
              
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {renderBilingual(
                  language === "ka" ? "ბრაუზერები აგროვებენ ისტორიას, ქუქი-ფაილებს და ქეშირებულ მონაცემებს, რომლებიც შეიძლება გამოავლინოს ონლაინ აქტივობა." :
                  language === "ru" ? "Браузеры накапливают историю, файлы cookie и кэшированные данные, которые могут раскрыть онлайн-активность." :
                  language === "az" ? "Brauzerlər tarixçə, kukilər və keşlənmiş məlumatlar toplayır ki, bunlar onlayn fəaliyyəti aşkar edə bilər." :
                  "Browsers accumulate history, cookies, and cached data that may reveal online activity.",
                  language !== "en" ? "Browsers accumulate data that may reveal online activity." : undefined
                )}
              </p>

              <div className="pl-4 md:pl-8 mb-6 space-y-3 text-base text-foreground/80 leading-[1.8]">
                <p>
                  {language === "en" ? (
                    <>
                      The{" "}
                      <a href="https://www.torproject.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Tor Browser</a>{" "}
                      provides the highest anonymity by routing traffic through multiple relays.
                    </>
                  ) : (
                    <>
                      <a href="https://www.torproject.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Tor Browser</a>{" "}
                      უზრუნველყოფს ყველაზე მაღალ ანონიმურობას.
                    </>
                  )}
                </p>
                <p>
                  {language === "en" ? (
                    <>
                      <a href="https://duckduckgo.com/app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">DuckDuckGo Browser</a>{" "}
                      — Mobile-first browser with built-in tracker blocking, no browsing history stored.
                    </>
                  ) : (
                    <>
                      <a href="https://duckduckgo.com/app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">DuckDuckGo Browser</a>{" "}
                      — მობილური ბრაუზერი ჩაშენებული ტრეკერების დაბლოკვით.
                    </>
                  )}
                </p>
                <p>
                  {language === "en" ? (
                    <>
                      For everyday browsing,{" "}
                      <a href="https://brave.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Brave</a>{" "}
                      blocks trackers and ads by default, while{" "}
                      <a href="https://www.mozilla.org/firefox" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Firefox</a>{" "}
                      with Enhanced Tracking Protection set to "Strict" provides strong protection.
                    </>
                  ) : (
                    <>
                      ყოველდღიური ბრაუზინგისთვის:{" "}
                      <a href="https://brave.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Brave</a>,{" "}
                      <a href="https://www.mozilla.org/firefox" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Firefox</a>.
                    </>
                  )}
                </p>
              </div>

              <p className="text-base text-foreground/80 leading-[1.8] pl-0 md:pl-4">
                {renderBilingual(
                  language === "ka" ? "რეგულარულად გაასუფთავეთ ბრაუზერის მონაცემები, განსაკუთრებით სენსიტიურ მასალებზე წვდომის შემდეგ: Settings → Privacy → Clear browsing data." :
                  language === "ru" ? "Регулярно очищайте данные браузера, особенно после доступа к конфиденциальным материалам: Settings → Privacy → Clear browsing data." :
                  language === "az" ? "Brauzer məlumatlarını mütəmadi olaraq təmizləyin, xüsusilə həssas materiallara daxil olduqdan sonra: Settings → Privacy → Clear browsing data." :
                  "Clear browser data regularly, particularly after accessing sensitive materials: Settings → Privacy → Clear browsing data.",
                  language !== "en" ? "Clear browser data regularly." : undefined
                )}
              </p>
            </section>

            {/* NEW: Clear Your Browser History - Bilingual Collapsible Section */}
            <section className="mb-14 bg-muted/30 border border-border p-6 md:p-8 rounded-lg">
              <button 
                onClick={() => setClearHistoryOpen(!clearHistoryOpen)}
                className="w-full flex items-center justify-between text-left"
              >
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    ბრაუზერის ისტორიის გასუფთავება
                  </h3>
                  <p className="text-base text-muted-foreground mt-1">
                    Clear Your Browser History
                  </p>
                </div>
                {clearHistoryOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              
              {clearHistoryOpen && (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4">
                    <div className="bg-background p-4 rounded border border-border/50">
                      <p className="font-medium text-foreground mb-2">Chrome</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Ctrl+Shift+Delete → "All time" → Clear data
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Ctrl+Shift+Delete → "ყველა დრო" → მონაცემების გასუფთავება
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded border border-border/50">
                      <p className="font-medium text-foreground mb-2">Firefox</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Ctrl+Shift+Delete → "Everything" → Clear Now
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Ctrl+Shift+Delete → "ყველაფერი" → ახლავე გასუფთავება
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded border border-border/50">
                      <p className="font-medium text-foreground mb-2">Safari (iOS)</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Settings → Safari → Clear History and Website Data
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        პარამეტრები → Safari → ისტორიისა და ვებ-გვერდის მონაცემების გასუფთავება
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded border border-border/50">
                      <p className="font-medium text-foreground mb-2">Android Chrome</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Menu (⋮) → History → Clear browsing data
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        მენიუ (⋮) → ისტორია → დათვალიერების მონაცემების გასუფთავება
                      </p>
                    </div>
                    <div className="bg-background p-4 rounded border border-border/50">
                      <p className="font-medium text-foreground mb-2">DuckDuckGo</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        Fire Button (🔥) — clears everything instantly
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        ცეცხლის ღილაკი (🔥) — ყველაფერს მყისიერად ასუფთავებს
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Section: Secure Communications - NUMBER REMOVED */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {renderBilingual(
                  language === "ka" ? "უსაფრთხო კომუნიკაციები" :
                  language === "ru" ? "Безопасные коммуникации" :
                  language === "az" ? "Təhlükəsiz Kommunikasiyalar" :
                  "Secure Communications",
                  language !== "en" ? "Secure Communications" : undefined
                )}
              </h2>
              
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {renderBilingual(
                  language === "ka" ? "ბოლოდან ბოლომდე დაშიფვრა (E2EE) უზრუნველყოფს, რომ მხოლოდ საუბრის მონაწილეებს შეუძლიათ შეტყობინებების წაკითხვა; სერვისის პროვაიდერებს არ აქვთ წვდომა შინაარსზე." :
                  language === "ru" ? "Сквозное шифрование (E2EE) гарантирует, что только участники разговора могут читать сообщения; поставщики услуг не имеют доступа к содержимому." :
                  language === "az" ? "Uçdan-uca şifrələmə (E2EE) yalnız söhbət iştirakçılarının mesajları oxuya bilməsini təmin edir; xidmət təminatçılarının məzmuna girişi yoxdur." :
                  "End-to-end encryption (E2EE) ensures that only conversation participants can read messages; service providers cannot access content.",
                  language !== "en" ? "End-to-end encryption ensures only participants can read messages." : undefined
                )}
              </p>

              <div className="pl-4 md:pl-8 mb-6 text-base text-foreground/80 leading-[1.8]">
                <p className="font-medium text-foreground mb-3">
                  {language === "ka" ? "მესენჯერები:" : language === "ru" ? "Мессенджеры:" : language === "az" ? "Mesajlaşma:" : "Messaging"}
                </p>
                <ul className="space-y-2 mb-6">
                  <li>
                    <a href="https://signal.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Signal</a>
                    <span className="text-muted-foreground"> — {
                      language === "ka" ? "ღია კოდი, E2EE ნაგულისხმევად, გაქრობადი შეტყობინებები" :
                      language === "ru" ? "Открытый код, E2EE по умолчанию, исчезающие сообщения" :
                      language === "az" ? "Açıq mənbəli, standart olaraq E2EE, yox olan mesajlar" :
                      "Open-source, E2EE by default, disappearing messages"
                    }</span>
                  </li>
                  <li>
                    <a href="https://threema.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Threema</a>
                    <span className="text-muted-foreground"> — {
                      language === "ka" ? "შვეიცარიაში განთავსებული, ტელეფონის ნომერი არ არის საჭირო" :
                      language === "ru" ? "Швейцарский хостинг, номер телефона не требуется" :
                      language === "az" ? "İsveçrədə yerləşir, telefon nömrəsi tələb olunmur" :
                      "Swiss-hosted, no phone number required"
                    }</span>
                  </li>
                </ul>

                <p className="font-medium text-foreground mb-3">
                  {language === "ka" ? "ელფოსტა:" : language === "ru" ? "Электронная почта:" : language === "az" ? "E-poçt:" : "Email"}
                </p>
                <ul className="space-y-2 mb-6">
                  <li>
                    <a href="https://proton.me/mail" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ProtonMail</a>
                    <span className="text-muted-foreground"> — {
                      language === "ka" ? "შვეიცარიის იურისდიქცია, E2EE, პირადი ინფორმაცია არ არის საჭირო" :
                      language === "ru" ? "Швейцарская юрисдикция, E2EE, личная информация не требуется" :
                      language === "az" ? "İsveçrə yurisdiksiyası, E2EE, şəxsi məlumat tələb olunmur" :
                      "Swiss jurisdiction, E2EE, no personal information required"
                    }</span>
                  </li>
                  <li>
                    <a href="https://tutanota.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Tutanota</a>
                    <span className="text-muted-foreground"> — {
                      language === "ka" ? "გერმანიის იურისდიქცია, ღია კოდი" :
                      language === "ru" ? "Немецкая юрисдикция, открытый код" :
                      language === "az" ? "Almaniya yurisdiksiyası, açıq mənbəli" :
                      "German jurisdiction, open-source"
                    }</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed pl-0 md:pl-4">
                {language === "en" ? (
                  <>
                    For additional guidance on secure communications, see the Committee to Protect Journalists'{" "}
                    <a href="https://cpj.org/2019/07/digital-safety-kit-journalists/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Digital Safety Kit
                    </a>.
                  </>
                ) : (
                  <>
                    იხილეთ CPJ-ის{" "}
                    <a href="https://cpj.org/2019/07/digital-safety-kit-journalists/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      ციფრული უსაფრთხოების სახელმძღვანელო
                    </a>.
                  </>
                )}
              </p>
            </section>

            {/* Section: Device Security - NUMBER REMOVED */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {renderBilingual(
                  language === "ka" ? "მოწყობილობის უსაფრთხოება" :
                  language === "ru" ? "Безопасность устройства" :
                  language === "az" ? "Cihaz Təhlükəsizliyi" :
                  "Device Security",
                  language !== "en" ? "Device Security" : undefined
                )}
              </h2>
              
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {renderBilingual(
                  language === "ka" ? "მოწყობილობის სრული დაშიფვრა იცავს მონაცემებს მოწყობილობის დაკარგვის ან ჩამორთმევის შემთხვევაში." :
                  language === "ru" ? "Полное шифрование устройства защищает данные в случае потери или изъятия устройства." :
                  language === "az" ? "Tam cihaz şifrələməsi cihaz itirildiyi və ya müsadirə edildiyi halda məlumatları qoruyur." :
                  "Full device encryption protects data if a device is lost or seized.",
                  language !== "en" ? "Full device encryption protects data if a device is lost or seized." : undefined
                )}
              </p>

              <div className="pl-4 md:pl-8 mb-6 space-y-4 text-base text-foreground/80 leading-[1.8]">
                <p>
                  <span className="font-medium text-foreground">iOS:</span> {
                    language === "ka" ? "დაშიფვრა გააქტიურებულია პაროლის დაყენებისას." :
                    language === "ru" ? "Шифрование включается при установке пароля." :
                    language === "az" ? "Şifrələmə parol təyin edildikdə aktivləşir." :
                    "Encryption is enabled when a passcode is set."
                  }
                </p>
                <p>
                  <span className="font-medium text-foreground">Android:</span> {
                    language === "ka" ? "პარამეტრები → უსაფრთხოება → დაშიფვრა" :
                    language === "ru" ? "Настройки → Безопасность → Шифрование" :
                    language === "az" ? "Parametrlər → Təhlükəsizlik → Şifrələmə" :
                    "Settings → Security → Encryption"
                  }
                </p>
                <p>
                  <span className="font-medium text-foreground">{
                    language === "ka" ? "კომპიუტერები:" :
                    language === "ru" ? "Компьютеры:" :
                    language === "az" ? "Kompüterlər:" :
                    "Computers:"
                  }</span> {
                    language === "ka" ? "გამოიყენეთ BitLocker (Windows) ან FileVault (macOS)" :
                    language === "ru" ? "Используйте BitLocker (Windows) или FileVault (macOS)" :
                    language === "az" ? "BitLocker (Windows) və ya FileVault (macOS) istifadə edin" :
                    "Use BitLocker (Windows) or FileVault (macOS)"
                  }
                </p>
              </div>

              <div className="bg-muted/50 border-l-4 border-destructive/50 pl-6 py-4 mb-6">
                <p className="text-base text-foreground/90 leading-relaxed mb-4">
                  {renderBilingual(
                    language === "ka" ? "იძულების პირობებში, ბიომეტრიული ავთენტიფიკაცია შეიძლება იყოს უფრო დაუცველი, ვიდრე პაროლები." :
                    language === "ru" ? "В условиях принуждения биометрическая аутентификация может быть более уязвимой, чем пароли." :
                    language === "az" ? "Məcburiyyət şəraitində biometrik autentifikasiya parollardan daha həssas ola bilər." :
                    "Under duress, biometric authentication may be more vulnerable than passcodes.",
                    language !== "en" ? "Under duress, biometric authentication may be more vulnerable than passcodes." : undefined
                  )}
                </p>
                <ul className="space-y-2 text-base text-foreground/80 leading-relaxed pl-4">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span><span className="font-medium text-foreground">iOS:</span> {
                      language === "ka" ? "ხანგრძლივად დააჭირეთ გვერდით ღილაკს + ხმის ღილაკს Face ID / Touch ID-ის გამორთვისთვის" :
                      language === "ru" ? "Удерживайте боковую кнопку + кнопку громкости для отключения Face ID / Touch ID" :
                      language === "az" ? "Face ID / Touch ID-ni söndürmək üçün yan düyməni + səs düyməsini basıb saxlayın" :
                      "Hold the Side Button + Volume button to disable Face ID / Touch ID"
                    }</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span><span className="font-medium text-foreground">Android:</span> {
                      language === "ka" ? "გამოიყენეთ Lockdown ფუნქცია" :
                      language === "ru" ? "Используйте функцию Lockdown" :
                      language === "az" ? "Lockdown funksiyasından istifadə edin" :
                      "Use the Lockdown feature"
                    }</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section: Operational Security - NUMBER REMOVED */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {renderBilingual(
                  language === "ka" ? "ოპერაციული უსაფრთხოება" :
                  language === "ru" ? "Операционная безопасность" :
                  language === "az" ? "Əməliyyat Təhlükəsizliyi" :
                  "Operational Security",
                  language !== "en" ? "Operational Security" : undefined
                )}
              </h2>
              
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {renderBilingual(
                  language === "ka" ? "მეტამონაცემები — ვინ დაუკავშირდა ვის, როდის და საიდან — ხშირად ისეთივე საზიანოა, როგორც კომუნიკაციის შინაარსი." :
                  language === "ru" ? "Метаданные — кто с кем связывался, когда и откуда — часто так же компрометирующи, как и содержание сообщений." :
                  language === "az" ? "Metadata — kim kimlə, nə vaxt və haradan əlaqə saxladı — tez-tez kommunikasiya məzmunu qədər zərərlidir." :
                  "Metadata—who contacted whom, when, and from where—is often as compromising as the content of communications.",
                  language !== "en" ? "Metadata is often as compromising as content." : undefined
                )}
              </p>

              <div className="pl-4 md:pl-8 mb-6">
                <p className="font-medium text-foreground mb-3">
                  {language === "ka" ? "მოერიდეთ:" : language === "ru" ? "Избегайте:" : language === "az" ? "Qaçının:" : "Avoid:"}
                </p>
                <ul className="space-y-2 text-base text-foreground/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span>{
                      language === "ka" ? "სამსახურის მოწყობილობები ან დამსაქმებლის მიერ გაცემული მოწყობილობები" :
                      language === "ru" ? "Рабочие устройства или устройства, выданные работодателем" :
                      language === "az" ? "İş cihazları və ya işəgötürənin verdiyi cihazlar" :
                      "Work devices or devices issued by employers"
                    }</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span>{
                      language === "ka" ? "აპლიკაციები, რომლებიც ექვემდებარება მონაცემთა მოთხოვნებს (VK, Yandex, Mail.ru)" :
                      language === "ru" ? "Приложения, подлежащие запросам данных (VK, Yandex, Mail.ru)" :
                      language === "az" ? "Məlumat sorğularına tabe olan tətbiqlər (VK, Yandex, Mail.ru)" :
                      "Applications subject to data requests (VK, Yandex, Mail.ru)"
                    }</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span>{
                      language === "ka" ? "Telegram სენსიტიური კომუნიკაციებისთვის (საიდუმლო ჩატები საჭიროებს ხელით გააქტიურებას)" :
                      language === "ru" ? "Telegram для конфиденциальных сообщений (секретные чаты требуют ручной активации)" :
                      language === "az" ? "Həssas kommunikasiyalar üçün Telegram (gizli söhbətlər əl ilə aktivləşdirilməlidir)" :
                      "Telegram for sensitive communications (Secret Chats require manual activation)"
                    }</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">—</span>
                    <span>{
                      language === "ka" ? "სენსიტიური ინფორმაციის გაზიარება დაუშიფრავ არხებზე" :
                      language === "ru" ? "Обмен конфиденциальной информацией по незашифрованным каналам" :
                      language === "az" ? "Şifrələnməmiş kanallar üzərindən həssas məlumatların paylaşılması" :
                      "Sharing sensitive information over unencrypted channels"
                    }</span>
                  </li>
                </ul>
              </div>

              <p className="text-base text-foreground/80 leading-[1.8] pl-0 md:pl-4">
                {language === "en" ? (
                  <>
                    For network monitoring, applications such as{" "}
                    <a href="https://obdev.at/products/littlesnitch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Little Snitch</a>{" "}
                    (macOS) and{" "}
                    <a href="https://www.glasswire.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GlassWire</a>{" "}
                    (Windows) allow visibility into application connections.
                  </>
                ) : (
                  <>
                    ქსელის მონიტორინგისთვის:{" "}
                    <a href="https://obdev.at/products/littlesnitch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Little Snitch</a>{" "}
                    (macOS),{" "}
                    <a href="https://www.glasswire.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GlassWire</a>{" "}
                    (Windows).
                  </>
                )}
              </p>
            </section>

            {/* Section: Further Reading - NUMBER REMOVED */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {renderBilingual(
                  language === "ka" ? "დამატებითი რესურსები" :
                  language === "ru" ? "Дополнительные ресурсы" :
                  language === "az" ? "Əlavə Resurslar" :
                  "Further Reading",
                  language !== "en" ? "Further Reading" : undefined
                )}
              </h2>

              <div className="space-y-6 text-base text-foreground/80">
                <div className="pl-0 md:pl-4">
                  <p className="font-medium text-foreground mb-3 text-lg">
                    {language === "ka" ? "ყოვლისმომცველი სახელმძღვანელოები" :
                     language === "ru" ? "Комплексные руководства" :
                     language === "az" ? "Ətraflı Bələdçilər" :
                     "Comprehensive Guides"}
                  </p>
                  <ul className="space-y-3 pl-4">
                    <li>
                      <a href="https://ssd.eff.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Electronic Frontier Foundation — Surveillance Self-Defense
                      </a>
                    </li>
                    <li>
                      <a href="https://securityinabox.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Tactical Technology Collective — Security in a Box
                      </a>
                    </li>
                    <li>
                      <a href="https://cpj.org/2019/07/digital-safety-kit-journalists/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Committee to Protect Journalists — Digital Safety Kit
                      </a>
                    </li>
                    <li>
                      <a href="https://www.frontlinedefenders.org/en/digital-security-resources" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Front Line Defenders — Digital Protection Resources
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pl-0 md:pl-4">
                  <p className="font-medium text-foreground mb-3 text-lg">
                    {language === "ka" ? "საგანგებო დახმარება" :
                     language === "ru" ? "Экстренная помощь" :
                     language === "az" ? "Təcili Yardım" :
                     "Emergency Assistance"}
                  </p>
                  <ul className="space-y-3 pl-4">
                    <li>
                      <a href="https://www.accessnow.org/help" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        Access Now Digital Security Helpline
                      </a>
                      <span className="text-muted-foreground"> — {
                        language === "ka" ? "24/7 მხარდაჭერა სამოქალაქო საზოგადოებისთვის ციფრული საფრთხეების წინააღმდეგ" :
                        language === "ru" ? "Круглосуточная поддержка для гражданского общества, столкнувшегося с цифровыми угрозами" :
                        language === "az" ? "Rəqəmsal təhdidlərlə üzləşən vətəndaş cəmiyyəti üçün 24/7 dəstək" :
                        "24/7 support for civil society facing digital threats"
                      }</span>
                    </li>
                  </ul>
                </div>

                <div className="pl-0 md:pl-4">
                  <p className="font-medium text-foreground mb-3 text-lg">
                    {language === "ka" ? "მტკიცებულებათა დოკუმენტაცია" :
                     language === "ru" ? "Документация доказательств" :
                     language === "az" ? "Sübut Sənədləşdirilməsi" :
                     "Evidence Documentation"}
                  </p>
                  <ul className="space-y-3 pl-4">
                    <li>
                      <a href="https://vae.witness.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        WITNESS — Video as Evidence
                      </a>
                    </li>
                    <li>
                      <a href="https://www.ohchr.org/sites/default/files/2024-01/OHCHR_BerkeleyProtocol.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                        UN Human Rights Office — Berkeley Protocol
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>


            {/* Contact Section */}
            <section className="mb-12 bg-muted/30 border border-border p-6 md:p-8">
              <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">
                {renderBilingual(
                  language === "ka" ? "კითხვები?" :
                  language === "ru" ? "Вопросы?" :
                  language === "az" ? "Suallar?" :
                  "Questions?",
                  language !== "en" ? "Questions?" : undefined
                )}
              </h3>
              <p className="text-base text-foreground/80 leading-relaxed mb-4">
                {renderBilingual(
                  language === "ka" ? "ჩვენი გუნდი მზადაა დაეხმაროს უსაფრთხო მტკიცებულებათა შენახვასთან დაკავშირებულ საკითხებში. ჩვენ შეგვიძლია მოგაწოდოთ ინფორმაცია ჩვენი პროცესების შესახებ, განვმარტოთ შენახვის პროტოკოლები და უპასუხოთ შეკითხვებს კონფიდენციალობასთან დაკავშირებით." :
                  language === "ru" ? "Наша команда готова помочь с вопросами, связанными с безопасным сохранением доказательств. Мы можем предоставить информацию о наших процессах, разъяснить протоколы хранения и ответить на вопросы о конфиденциальности." :
                  language === "az" ? "Komandamız təhlükəsiz sübut qorunması ilə bağlı suallarla kömək etməyə hazırdır. Proseslərimiz haqqında məlumat verə, saxlama protokollarını izah edə və məxfilik suallarına cavab verə bilərik." :
                  "Our team is available to assist with questions related to secure evidence preservation. We can provide information about our processes, clarify storage protocols, and answer questions about confidentiality.",
                  language !== "en" ? "Our team is available to assist with questions related to secure evidence preservation." : undefined
                )}
              </p>
              <div className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-3">
                  {language === "ka" ? "დაგვიკავშირდით უსაფრთხო არხებით:" :
                   language === "ru" ? "Свяжитесь с нами через защищённые каналы:" :
                   language === "az" ? "Təhlükəsiz kanallar vasitəsilə bizimlə əlaqə saxlayın:" :
                   "Reach us through secure channels:"}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <a href={CONTACTS.signal.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    Signal: {CONTACTS.signal.display}
                  </a>
                  <a href={CONTACTS.protonmail.url} className="text-primary hover:underline font-medium">
                    ProtonMail: {CONTACTS.protonmail.display}
                  </a>
                  <a href={CONTACTS.whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    WhatsApp: {CONTACTS.whatsapp.display}
                  </a>
                  <a href={CONTACTS.threema.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    Threema: {CONTACTS.threema.display}
                  </a>
                </div>
              </div>
            </section>

            {/* Legal Notice */}
            <footer className="border-t border-border pt-8 mt-12">
              <h3 className="font-semibold text-sm text-foreground mb-2">
                {renderBilingual(
                  language === "ka" ? "სამართლებრივი შენიშვნა" :
                  language === "ru" ? "Правовое уведомление" :
                  language === "az" ? "Hüquqi Bildiriş" :
                  "Legal Notice",
                  language !== "en" ? "Legal Notice" : undefined
                )}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {renderBilingual(
                  language === "ka" ? "ეს სახელმძღვანელო მომზადებულია სამოქალაქო საზოგადოების ორგანიზაციების მიერ, რომლებიც მუშაობენ მტკიცებულებათა შეგროვებისა და შენახვის საერთაშორისო სტანდარტების შესაბამისად. იგი არ წარმოადგენს იურიდიულ კონსულტაციას და არ ცვლის პროფესიონალურ უსაფრთხოების შეფასებას. უსაფრთხოების მოთხოვნები განსხვავდება კონტექსტის მიხედვით." :
                  language === "ru" ? "Данное руководство подготовлено организациями гражданского общества, работающими в соответствии с международными стандартами сбора и сохранения доказательств. Оно не является юридической консультацией и не заменяет профессиональную оценку безопасности. Требования безопасности различаются в зависимости от контекста." :
                  language === "az" ? "Bu bələdçi sübutların toplanması və qorunması üzrə beynəlxalq standartlara uyğun işləyən vətəndaş cəmiyyəti təşkilatları tərəfindən hazırlanmışdır. Bu, hüquqi məsləhət deyil və peşəkar təhlükəsizlik qiymətləndirməsini əvəz etmir. Təhlükəsizlik tələbləri kontekstə görə dəyişir." :
                  "This guidance is prepared by civil society organizations working in accordance with international standards for evidence collection and preservation. It does not constitute legal advice and does not replace professional security assessment. Security requirements vary by context.",
                  language !== "en" ? "This guidance does not constitute legal advice." : undefined
                )}
              </p>
              
              {/* Bilingual Footer Links */}
              <div className="flex flex-wrap gap-4 text-xs">
                <LocalizedLink to="/submit-evidence" className="text-primary hover:underline">
                  მტკიცებულებების წარდგენა / Submit Evidence →
                </LocalizedLink>
                <LocalizedLink to="/methodology" className="text-muted-foreground hover:text-foreground">
                  მეთოდოლოგია / Methodology
                </LocalizedLink>
                <LocalizedLink to="/" className="text-muted-foreground hover:text-foreground">
                  მანდატზე დაბრუნება / Return to Mandate
                </LocalizedLink>
              </div>
            </footer>
          </article>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default SecurityGuide;
