import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocalizedLink } from "@/components/LocalizedLink";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Printer } from "lucide-react";
import { ReactNode } from "react";
import { useTheme } from "next-themes";

const CivicNecessity = () => {
  const { language } = useLanguage();
  const { setTheme } = useTheme();
  
  // Set light theme as default for civic necessity page
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  
  const handlePrint = () => {
    window.print();
  };

  const renderBilingual = (native: string | ReactNode, english?: string) => {
    if (language === "en" || !english) return native;
    return (
      <>
        {native}
        <span className="block text-sm text-muted-foreground/70 mt-1 italic">{english}</span>
      </>
    );
  };

  const getContent = () => {
    const linkClass = "text-primary underline underline-offset-2 hover:text-primary/80";
    
    switch (language) {
      case "ka":
        return {
          legalFramework: "სამართლებრივი ჩარჩო",
          title: "სამოქალაქო აუცილებლობის დოქტრინა",
          subtitle: "სამართლებრივი და ეთიკური საფუძვლები",
          leadParagraph: "როდესაც სამართლიანობის სახელმწიფო მექანიზმები ვერ მუშაობს—ან როცა თავად სახელმწიფოა ზიანის წყარო—სამოქალაქო საზოგადოებას რჩება როგორც უფლება, ასევე პასუხისმგებლობა შეინარჩუნოს მტკიცებულებები, დააფიქსიროს დარღვევები და შეინარჩუნოს პირობები მომავალი სამართლებრივი დაცვისთვის.",
          leadParagraph2: "ეს დოქტრინა გამომდინარეობს ადამიანის უფლებათა საერთაშორისო სამართლის ფუნდამენტური პრინციპებიდან, რომლებიც აღიარებენ ყველა პირის უფლებას ეფექტურ დაცვაზე მათი უფლებების დარღვევის შემთხვევაში. სადაც სახელმწიფო ვერ უზრუნველყოფს ასეთ დაცვას, ანგარიშვალდებულების პირობების შენარჩუნების ვალდებულება გადადის სამოქალაქო საზოგადოებაზე.",
          historicalTitle: "ისტორიული და სამართლებრივი კონტექსტი",
          historicalText: "აუცილებლობის დოქტრინა საერთაშორისო სამართალში აღიარებს, რომ განსაკუთრებულმა გარემოებებმა შეიძლება გაამართლოს ჩვეულებრივი სამართლებრივი პროცესებიდან გადახვევა, სადაც ეს პროცესები თავად გახდა უსამართლობის ინსტრუმენტები ან შეწყვიტეს ფუნქციონირება.",
          peoplesTribunals: (
            <>
              <strong className="text-foreground">სახალხო ტრიბუნალები:</strong> <a href="https://en.wikipedia.org/wiki/Russell_Tribunal" target="_blank" rel="noopener noreferrer" className={linkClass}>რასელის ტრიბუნალმა (1966–1967)</a> დაამკვიდრა მოქალაქეთა მიერ შექმნილი ორგანოების ლეგიტიმურობა საერთაშორისო სამართლის დარღვევების ბრალდებების შესასწავლად, სადაც ოფიციალური მექანიზმები მიუწვდომელი იყო.
            </>
          ),
          truthCommissions: (
            <>
              <strong className="text-foreground">ჭეშმარიტების კომისიები:</strong> სამოქალაქო საზოგადოების დოკუმენტაციამ უზრუნველყო საფუძვლიანი მტკიცებულებები ოფიციალური <a href="https://www.usip.org/publications/2011/07/truth-commission-digital-collection" target="_blank" rel="noopener noreferrer" className={linkClass}>ჭეშმარიტების კომისიებისთვის</a>, აჩვენებს რა, რომ სახელმწიფო წარუმატებლობის პერიოდში შენახული მტკიცებულებები ინარჩუნებს თავის მნიშვნელობას შემდგომი წარმოებისთვის.
            </>
          ),
          unMechanisms: (
            <>
              <strong className="text-foreground">გაეროს საგამოძიებო მექანიზმები:</strong> <a href="https://www.ohchr.org/en/hr-bodies/hrc/special-sessions" target="_blank" rel="noopener noreferrer" className={linkClass}>ფაქტების დამდგენი მისიები და გამოძიების კომისიები</a> რეგულარულად ეყრდნობიან სამოქალაქო საზოგადოების აქტორების მიერ შენახულ დოკუმენტაციას, სადაც სახელმწიფო მექანიზმები მიუწვდომელი იყო.
            </>
          ),
          applicationTitle: "გამოყენება მიმდინარე კონტექსტში",
          applicationText1: "გარემოებები, რომლებიც წარმოშობენ ამ მექანიზმის მანდატს, წარმოადგენენ პირობებს, რომლებშიც დოქტრინა გამოიყენება: სისტემატური დარღვევების სანდო ბრალდებები, სახელმწიფო ინსტიტუტები, რომლებმაც აჩვენეს გამოძიების უნებლობა ან შეუძლებლობა, და გონივრული შეშფოთება, რომ მტკიცებულებები შეიძლება განადგურდეს ან დაიფაროს.",
          applicationText2: "ჩვენ არ ვაცხადებთ პრეტენზიას სასამართლოების ჩანაცვლებაზე. ჩვენ არ ვწყვეტთ დანაშაულს ან უდანაშაულობას. ჩვენ არ ვახორციელებთ სახელმწიფოსთვის დაცულ იძულებით უფლებამოსილებებს. ჩვენ ვინახავთ მტკიცებულებებს და დოკუმენტაციას იმ სტანდარტებით, რომლებიც ნებას რთავს მათ გამოყენებას, როცა ლეგიტიმური ანგარიშვალდებულების მექანიზმები ხელმისაწვდომი გახდება.",
          blockquote: "მტკიცებულებათა შენარჩუნება არ არის სამართლიანობის შემცვლელი—ეს არის სამართლიანობის წინაპირობა.",
          internationalTitle: "საერთაშორისო სამართლებრივი ჩარჩო",
          rightToRemedy: (
            <>
              <strong className="text-foreground">ეფექტური დაცვის უფლება (<a href="https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights" target="_blank" rel="noopener noreferrer" className={linkClass}>ICCPR მუხლი 2(3)</a>):</strong> სადაც სახელმწიფო მექანიზმები ვერ უზრუნველყოფენ დაცვას, მტკიცებულებათა შენარჩუნება მომავალი წარმოებისთვის ემსახურება ამ უფლებას.
            </>
          ),
          stateResponsibility: (
            <>
              <strong className="text-foreground">სახელმწიფო პასუხისმგებლობა:</strong> სახელმწიფოს გამოძიების წარუმატებლობა არ აუქმებს მის ვალდებულებებს—იგი მათ გადავადებს. სახელმწიფო წარუმატებლობის პერიოდში შენახული მტკიცებულებები ინარჩუნებს თავის რელევანტურობას <a href="https://legal.un.org/ilc/texts/instruments/english/draft_articles/9_6_2001.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>სახელმწიფო პასუხისმგებლობის მუხლების</a> მიხედვით.
            </>
          ),
          europeanFramework: (
            <>
              <strong className="text-foreground">ადამიანის უფლებათა ევროპული ჩარჩო:</strong> <a href="https://www.echr.coe.int/" target="_blank" rel="noopener noreferrer" className={linkClass}>ადამიანის უფლებათა ევროპული სასამართლო</a> თვლის, რომ სახელმწიფოებს აქვთ პოზიტიური ვალდებულებები გამოიძიონ სანდო ბრალდებები. სამოქალაქო საზოგადოების დოკუმენტაცია მხარს უჭერს ამ ვალდებულებების საბოლოო შესრულებას.
            </>
          ),
          romeStatute: (
            <>
              <strong className="text-foreground">ხანდაზმულობის ვადების არგამოყენება:</strong> ყველაზე სერიოზული დარღვევებისთვის შეზღუდვები არ გამოიყენება <a href="https://www.un.org/en/genocideprevention/documents/atrocity-crimes/Doc.27_convention%20statutory%20background.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>რომის სტატუტის</a> მიხედვით. სათანადოდ შენახული მტკიცებულებები შეიძლება გამოყენებულ იქნას მოვლენებიდან ათწლეულების შემდეგ.
            </>
          ),
          conclusionText1: "სამოქალაქო აუცილებლობის დოქტრინა უზრუნველყოფს სამართლებრივ და ეთიკურ საფუძველს სამოქალაქო საზოგადოების მოქმედებისთვის სახელმწიფო წარუმატებლობის გარემოებებში. ეს არ არის ექსტრა-სამართლებრივი მოქმედების ლიცენზია, არამედ აღიარება იმისა, რომ ანგარიშვალდებულების პირობების შენარჩუნება თავად არის კანონიერი და აუცილებელი ფუნქცია.",
          conclusionText2: "გადავადებული სამართლიანობა არ არის უარყოფილი სამართლიანობა—მაგრამ მხოლოდ იმ შემთხვევაში, თუ მტკიცებულებითი საფუძველი შენარჩუნებულია.",
          navReturn: "← ჩვენს მანდატზე დაბრუნება / Return to mandate",
          navSubmit: "მტკიცებულებების წარდგენა → / Submit evidence →",
          relatedMethodology: "ჩვენი მეთოდოლოგია →",
          relatedSecurity: "ციფრული უსაფრთხოების სახელმძღვანელო →",
          relatedSubmit: "მტკიცებულებების წარდგენა →"
        };
      case "ru":
        return {
          legalFramework: "Правовая основа",
          title: "Доктрина гражданской необходимости",
          subtitle: "Правовые и этические основы",
          leadParagraph: "Когда государственные механизмы правосудия не работают—или когда само государство является источником вреда—гражданское общество сохраняет как право, так и обязанность сохранять доказательства, документировать нарушения и поддерживать условия для будущего правового возмещения.",
          leadParagraph2: "Эта доктрина вытекает из фундаментальных принципов международного права в области прав человека, которые признают право всех лиц на эффективное средство правовой защиты в случае нарушения их прав. Там, где государство не обеспечивает такую защиту, обязанность сохранять условия для привлечения к ответственности переходит к гражданскому обществу.",
          historicalTitle: "Исторический и правовой контекст",
          historicalText: "Доктрина необходимости в международном праве признаёт, что чрезвычайные обстоятельства могут оправдать отступление от обычных правовых процедур, когда эти процедуры сами стали инструментами несправедливости или перестали функционировать.",
          peoplesTribunals: (
            <>
              <strong className="text-foreground">Народные трибуналы:</strong> <a href="https://en.wikipedia.org/wiki/Russell_Tribunal" target="_blank" rel="noopener noreferrer" className={linkClass}>Трибунал Рассела (1966–1967)</a> установил легитимность органов, созданных гражданами, для рассмотрения обвинений в нарушениях международного права, когда официальные механизмы были недоступны.
            </>
          ),
          truthCommissions: (
            <>
              <strong className="text-foreground">Комиссии по установлению истины:</strong> Документация гражданского общества обеспечила основополагающие доказательства для официальных <a href="https://www.usip.org/publications/2011/07/truth-commission-digital-collection" target="_blank" rel="noopener noreferrer" className={linkClass}>комиссий по установлению истины</a>, демонстрируя, что доказательства, сохранённые в периоды государственных неудач, сохраняют свою ценность для последующих разбирательств.
            </>
          ),
          unMechanisms: (
            <>
              <strong className="text-foreground">Следственные механизмы ООН:</strong> <a href="https://www.ohchr.org/en/hr-bodies/hrc/special-sessions" target="_blank" rel="noopener noreferrer" className={linkClass}>Миссии по установлению фактов и комиссии по расследованию</a> регулярно опираются на документацию, сохранённую представителями гражданского общества, действовавшими там, где государственные механизмы были недоступны.
            </>
          ),
          applicationTitle: "Применение к текущему контексту",
          applicationText1: "Обстоятельства, породившие мандат этого Механизма, представляют собой условия, при которых применяется доктрина: достоверные обвинения в систематических нарушениях, государственные институты, продемонстрировавшие нежелание или неспособность расследовать, и обоснованное опасение уничтожения или сокрытия доказательств.",
          applicationText2: "Мы не претендуем на замену судов. Мы не выносим решений о виновности или невиновности. Мы не осуществляем принудительные полномочия, зарезервированные за государством. Мы сохраняем доказательства и документацию по стандартам, позволяющим их использование, когда законные механизмы привлечения к ответственности станут доступны.",
          blockquote: "Сохранение доказательств — не замена правосудию, а предпосылка для правосудия.",
          internationalTitle: "Международно-правовая база",
          rightToRemedy: (
            <>
              <strong className="text-foreground">Право на эффективное средство защиты (<a href="https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights" target="_blank" rel="noopener noreferrer" className={linkClass}>МПГПП Статья 2(3)</a>):</strong> Когда государственные механизмы не обеспечивают защиту, сохранение доказательств для будущих разбирательств служит этому праву.
            </>
          ),
          stateResponsibility: (
            <>
              <strong className="text-foreground">Ответственность государства:</strong> Неспособность государства расследовать не прекращает его обязательств — она их откладывает. Доказательства, сохранённые в периоды государственных неудач, сохраняют свою актуальность согласно <a href="https://legal.un.org/ilc/texts/instruments/english/draft_articles/9_6_2001.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Статьям об ответственности государств</a>.
            </>
          ),
          europeanFramework: (
            <>
              <strong className="text-foreground">Европейская система защиты прав человека:</strong> <a href="https://www.echr.coe.int/" target="_blank" rel="noopener noreferrer" className={linkClass}>Европейский суд по правам человека</a> считает, что государства несут позитивные обязательства по расследованию достоверных обвинений. Документация гражданского общества поддерживает eventual выполнение этих обязательств.
            </>
          ),
          romeStatute: (
            <>
              <strong className="text-foreground">Неприменимость сроков давности:</strong> Для наиболее серьёзных нарушений сроки давности не применяются согласно <a href="https://www.un.org/en/genocideprevention/documents/atrocity-crimes/Doc.27_convention%20statutory%20background.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Римскому статуту</a>. Надлежащим образом сохранённые доказательства могут быть использованы спустя десятилетия после событий.
            </>
          ),
          conclusionText1: "Доктрина гражданской необходимости обеспечивает правовую и этическую основу для действий гражданского общества в условиях государственных неудач. Это не лицензия на внеправовые действия, а признание того, что сохранение условий для привлечения к ответственности само по себе является законной и необходимой функцией.",
          conclusionText2: "Отложенное правосудие — не отказ в правосудии, но лишь при условии сохранения доказательственной базы.",
          navReturn: "← Вернуться к мандату / Return to mandate",
          navSubmit: "Отправить доказательства → / Submit evidence →",
          relatedMethodology: "Наша методология →",
          relatedSecurity: "Руководство по цифровой безопасности →",
          relatedSubmit: "Отправить доказательства →"
        };
      case "az":
        return {
          legalFramework: "Hüquqi çərçivə",
          title: "Vətəndaş zərurəti doktrinası",
          subtitle: "Hüquqi və etik əsaslar",
          leadParagraph: "Ədalət üçün dövlət mexanizmləri işləmədikdə—və ya dövlətin özü zərərin mənbəyi olduqda—vətəndaş cəmiyyəti həm sübutları qorumaq, pozuntuları sənədləşdirmək, həm də gələcək hüquqi müdafiə üçün şəraiti saxlamaq hüququ və məsuliyyətini saxlayır.",
          leadParagraph2: "Bu doktrina beynəlxalq insan haqları hüququnun fundamental prinsiplərindən qaynaqlanır ki, bunlar bütün şəxslərin hüquqlarının pozulması halında effektiv müdafiə hüququnu tanıyır. Dövlətin belə müdafiəni təmin edə bilmədiyi yerlərdə hesabatlılıq üçün şəraiti qorumaq öhdəliyi vətəndaş cəmiyyətinə keçir.",
          historicalTitle: "Tarixi və hüquqi kontekst",
          historicalText: "Beynəlxalq hüquqda zərurət doktrinası tanıyır ki, fövqəladə hallar adi hüquqi proseslərdən kənara çıxmağı əsaslandıra bilər, əgər bu proseslər özləri ədalətsizlik alətlərinə çevrilibsə və ya fəaliyyətini dayandırıbsa.",
          peoplesTribunals: (
            <>
              <strong className="text-foreground">Xalq tribunalları:</strong> <a href="https://en.wikipedia.org/wiki/Russell_Tribunal" target="_blank" rel="noopener noreferrer" className={linkClass}>Rassel Tribunalı (1966–1967)</a> rəsmi mexanizmlərin əlçatan olmadığı yerlərdə beynəlxalq hüquq pozuntularının ittihamlarını araşdırmaq üçün vətəndaşlar tərəfindən yaradılmış orqanların legitimliyini müəyyən etdi.
            </>
          ),
          truthCommissions: (
            <>
              <strong className="text-foreground">Həqiqət komissiyaları:</strong> Vətəndaş cəmiyyətinin sənədləşdirməsi rəsmi <a href="https://www.usip.org/publications/2011/07/truth-commission-digital-collection" target="_blank" rel="noopener noreferrer" className={linkClass}>həqiqət komissiyaları</a> üçün əsas sübutlar təqdim etdi, göstərdi ki, dövlət uğursuzluğu dövrlərində qorunan sübutlar sonrakı icraatlar üçün dəyərini saxlayır.
            </>
          ),
          unMechanisms: (
            <>
              <strong className="text-foreground">BMT Araşdırma mexanizmləri:</strong> <a href="https://www.ohchr.org/en/hr-bodies/hrc/special-sessions" target="_blank" rel="noopener noreferrer" className={linkClass}>Faktları araşdıran missiyalar və istintaq komissiyaları</a> mütəmadi olaraq dövlət mexanizmlərinin əlçatan olmadığı yerlərdə fəaliyyət göstərən vətəndaş cəmiyyəti nümayəndələri tərəfindən qorunan sənədlərə əsaslanır.
            </>
          ),
          applicationTitle: "Cari kontekstə tətbiq",
          applicationText1: "Bu Mexanizmin mandatını yaradan hallar doktrinanın tətbiq olunduğu şərtləri təmsil edir: sistematik pozuntuların etibarlı ittihamları, araşdırmaq istəməyən və ya bacarmayan dövlət institutları və sübutların məhv edilə və ya gizlədilə biləcəyinə dair əsaslı narahatlıq.",
          applicationText2: "Biz məhkəmələri əvəz etmək iddiasında deyilik. Biz günahı və ya günahsızlığı müəyyən etmirik. Biz dövlətə ayrılmış məcburedici səlahiyyətləri həyata keçirmirik. Biz sübutları və sənədləri qanuni hesabatlılıq mexanizmləri əlçatan olduqda istifadəsinə imkan verən standartlara uyğun qoruyuruq.",
          blockquote: "Sübutların qorunması ədalətin əvəzi deyil—ədalət üçün önşərtdir.",
          internationalTitle: "Beynəlxalq hüquqi çərçivə",
          rightToRemedy: (
            <>
              <strong className="text-foreground">Effektiv müdafiə hüququ (<a href="https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights" target="_blank" rel="noopener noreferrer" className={linkClass}>MVCHS Maddə 2(3)</a>):</strong> Dövlət mexanizmləri müdafiə təmin edə bilmədikdə, gələcək icraatlar üçün sübutların qorunması bu hüquqa xidmət edir.
            </>
          ),
          stateResponsibility: (
            <>
              <strong className="text-foreground">Dövlət məsuliyyəti:</strong> Dövlətin araşdıra bilməməsi onun öhdəliklərini ləğv etmir—onları təxirə salır. Dövlət uğursuzluğu dövrlərində qorunan sübutlar <a href="https://legal.un.org/ilc/texts/instruments/english/draft_articles/9_6_2001.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Dövlət Məsuliyyəti Maddələrinə</a> əsasən aktuallığını saxlayır.
            </>
          ),
          europeanFramework: (
            <>
              <strong className="text-foreground">Avropa İnsan Haqları Çərçivəsi:</strong> <a href="https://www.echr.coe.int/" target="_blank" rel="noopener noreferrer" className={linkClass}>Avropa İnsan Haqları Məhkəməsi</a> hesab edir ki, dövlətlər etibarlı ittihamları araşdırmaq üçün pozitiv öhdəliklər daşıyır. Vətəndaş cəmiyyətinin sənədləşdirməsi bu öhdəliklərin eventual yerinə yetirilməsini dəstəkləyir.
            </>
          ),
          romeStatute: (
            <>
              <strong className="text-foreground">İddia müddətlərinin tətbiq olunmaması:</strong> Ən ciddi pozuntular üçün <a href="https://www.un.org/en/genocideprevention/documents/atrocity-crimes/Doc.27_convention%20statutory%20background.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Roma Statutuna</a> əsasən məhdudiyyətlər tətbiq olunmur. Lazımi qaydada qorunan sübutlar hadisələrdən onilliklər sonra istifadə oluna bilər.
            </>
          ),
          conclusionText1: "Vətəndaş zərurəti doktrinası dövlət uğursuzluğu şəraitində vətəndaş cəmiyyətinin fəaliyyəti üçün hüquqi və etik əsas təmin edir. Bu, qanundankənar fəaliyyət üçün lisenziya deyil, hesabatlılıq üçün şəraiti qorumağın özünün qanuni və zəruri funksiya olduğunun etirafıdır.",
          conclusionText2: "Təxirə salınmış ədalət rədd edilmiş ədalət deyil—lakin yalnız sübut bazası qorunarsa.",
          navReturn: "← Mandata qayıt / Return to mandate",
          navSubmit: "Sübut təqdim et → / Submit evidence →",
          relatedMethodology: "Metodologiyamız →",
          relatedSecurity: "Rəqəmsal təhlükəsizlik bələdçisi →",
          relatedSubmit: "Sübut təqdim et →"
        };
      default: // English
        return {
          legalFramework: "Legal Framework",
          title: "Doctrine of Civic Necessity",
          subtitle: "Legal and Ethical Foundations",
          leadParagraph: "When state mechanisms for justice fail—or when the state itself is the source of harm—civil society retains both the right and the responsibility to preserve evidence, document violations, and maintain the conditions necessary for future legal remedy.",
          leadParagraph2: "This doctrine derives from fundamental principles of international human rights law, which recognize the right of all persons to an effective remedy for violations of their rights. Where the state fails to provide such a remedy, the obligation to preserve the conditions for accountability devolves to civil society.",
          historicalTitle: "Historical and Legal Context",
          historicalText: "The doctrine of necessity in international law recognizes that extraordinary circumstances may justify departures from ordinary legal processes when those processes have themselves become instruments of injustice or have ceased to function.",
          peoplesTribunals: (
            <>
              <strong className="text-foreground">People's Tribunals:</strong> The <a href="https://en.wikipedia.org/wiki/Russell_Tribunal" target="_blank" rel="noopener noreferrer" className={linkClass}>Russell Tribunal (1966–1967)</a> established the legitimacy of citizen-constituted bodies examining allegations of international law violations where official mechanisms were unavailable.
            </>
          ),
          truthCommissions: (
            <>
              <strong className="text-foreground">Truth Commissions:</strong> Civil society documentation has provided foundational evidence for official <a href="https://www.usip.org/publications/2011/07/truth-commission-digital-collection" target="_blank" rel="noopener noreferrer" className={linkClass}>truth commissions</a>, demonstrating that evidence preserved during periods of state failure retains its value for subsequent proceedings.
            </>
          ),
          unMechanisms: (
            <>
              <strong className="text-foreground">UN Investigative Mechanisms:</strong> <a href="https://www.ohchr.org/en/hr-bodies/hrc/special-sessions" target="_blank" rel="noopener noreferrer" className={linkClass}>Fact-finding missions and commissions of inquiry</a> routinely rely on documentation preserved by civil society actors operating in contexts where state mechanisms were unavailable.
            </>
          ),
          applicationTitle: "Application to Current Context",
          applicationText1: "The circumstances giving rise to this Mechanism's mandate present the conditions under which the doctrine applies: credible allegations of systematic violations; state institutions that have demonstrated unwillingness or inability to investigate; and a reasonable risk that evidence may be destroyed, concealed, or suppressed.",
          applicationText2: "We do not purport to replace courts of law. We do not adjudicate guilt or innocence. We do not exercise coercive powers reserved to the state. We preserve evidence and documentation to standards that permit its use when legitimate accountability mechanisms become available.",
          blockquote: "The preservation of evidence is not a substitute for justice; it is a precondition for justice.",
          internationalTitle: "International Legal Framework",
          rightToRemedy: (
            <>
              <strong className="text-foreground">Right to an Effective Remedy (<a href="https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights" target="_blank" rel="noopener noreferrer" className={linkClass}>ICCPR Article 2(3)</a>):</strong> Where state mechanisms fail to provide a remedy, the preservation of evidence for future proceedings serves this right.
            </>
          ),
          stateResponsibility: (
            <>
              <strong className="text-foreground">State Responsibility:</strong> A state's failure to investigate does not extinguish its obligations—it defers them. Evidence preserved during periods of state failure retains its relevance under the <a href="https://legal.un.org/ilc/texts/instruments/english/draft_articles/9_6_2001.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Articles on Responsibility of States for Internationally Wrongful Acts</a>.
            </>
          ),
          europeanFramework: (
            <>
              <strong className="text-foreground">European Human Rights Framework:</strong> The <a href="https://www.echr.coe.int/" target="_blank" rel="noopener noreferrer" className={linkClass}>European Court of Human Rights</a> has held that states bear positive obligations to investigate credible allegations of serious violations. Civil society documentation supports the eventual discharge of these obligations.
            </>
          ),
          romeStatute: (
            <>
              <strong className="text-foreground">Non-Applicability of Statutes of Limitation:</strong> For the most serious violations, statutes of limitation do not apply under the <a href="https://www.un.org/en/genocideprevention/documents/atrocity-crimes/Doc.27_convention%20statutory%20background.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Rome Statute</a>. Evidence properly preserved may be used decades after the events in question.
            </>
          ),
          conclusionText1: "The doctrine of civic necessity provides the legal and ethical foundation for civil society action in circumstances of state failure. It is not a license for extra-legal action, but a recognition that preserving the conditions for accountability is itself a lawful and necessary function.",
          conclusionText2: "Justice deferred is not justice denied—but only if the evidentiary foundation is preserved.",
          navReturn: "← Return to mandate",
          navSubmit: "Submit evidence →",
          relatedMethodology: "Our Methodology →",
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
            {/* Print Header - Only visible in PDF */}
            <div className="hidden print:block print-header mb-8 pb-6 border-b-2 border-[#1e3a5f]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-serif font-bold text-[#1e3a5f]">Civic Council of Georgia</p>
                  <p className="text-sm text-[#1e3a5f]/80 italic">Forum for Justice</p>
                </div>
                <div className="text-right text-xs text-[#1e3a5f]/70">
                  <p>Independent Investigative Mechanism for Georgia</p>
                  <p>Legal Framework Document</p>
                </div>
              </div>
            </div>

            {/* Bilingual Navigation */}
            <nav className="mb-8 flex flex-wrap gap-4 text-sm print:hidden">
              <LocalizedLink to="/" className="text-primary underline underline-offset-2 hover:text-primary/80">
                {content.navReturn}
              </LocalizedLink>
              <LocalizedLink to="/submit-evidence" className="text-primary underline underline-offset-2 hover:text-primary/80 ml-auto">
                {content.navSubmit}
              </LocalizedLink>
            </nav>

            {/* Document Header */}
            <header className="mb-12 border-b border-border pb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-medium">
                  {content.legalFramework}
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
                  content.title,
                  language !== "en" ? "Doctrine of Civic Necessity" : undefined
                )}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif">
                {renderBilingual(
                  content.subtitle,
                  language !== "en" ? "Legal and Ethical Foundations" : undefined
                )}
              </p>
            </header>

            {/* Lead paragraph */}
            <section className="mb-12">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif mb-8">
                {content.leadParagraph}
              </p>
              <p className="text-lg text-foreground/85 leading-[1.8]">
                {content.leadParagraph2}
              </p>
            </section>

            {/* Historical and Legal Context */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.historicalTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.historicalText}
              </p>
              
              <div className="space-y-4 pl-4 md:pl-8 mb-6 text-base text-foreground/80 leading-[1.8]">
                <p>{content.peoplesTribunals}</p>
                <p>{content.truthCommissions}</p>
                <p>{content.unMechanisms}</p>
              </div>
            </section>

            {/* Application to Current Context */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.applicationTitle}
              </h2>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.applicationText1}
              </p>
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.applicationText2}
              </p>
              
              {/* Blockquote */}
              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8">
                <p className="text-foreground italic text-xl font-serif">
                  {content.blockquote}
                </p>
              </blockquote>
            </section>

            {/* International Legal Framework */}
            <section className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {content.internationalTitle}
              </h2>
              
              <div className="space-y-4 pl-4 md:pl-8 mb-6 text-base text-foreground/80 leading-[1.8]">
                <p>{content.rightToRemedy}</p>
                <p>{content.stateResponsibility}</p>
                <p>{content.europeanFramework}</p>
                <p>{content.romeStatute}</p>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-14">
              <p className="text-lg text-foreground/85 leading-[1.8] mb-6">
                {content.conclusionText1}
              </p>
              <p className="text-xl text-foreground font-serif leading-relaxed">
                {content.conclusionText2}
              </p>
            </section>

            {/* Related Links */}
            <section className="pt-6 border-t border-border">
              <div className="flex flex-wrap gap-4 text-sm">
                <LocalizedLink 
                  to="/methodology" 
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {content.relatedMethodology}
                </LocalizedLink>
                <LocalizedLink 
                  to="/security-guide" 
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {content.relatedSecurity}
                </LocalizedLink>
                <LocalizedLink 
                  to="/submit-evidence" 
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {content.relatedSubmit}
                </LocalizedLink>
              </div>
            </section>
          </article>
        </main>
        <Footer />

        {/* Print styles */}
        <style>{`
          @media print {
            nav, header, footer { display: none !important; }
            article { padding: 0 !important; }
          }
        `}</style>
      </div>
    </PageTransition>
  );
};

export default CivicNecessity;
