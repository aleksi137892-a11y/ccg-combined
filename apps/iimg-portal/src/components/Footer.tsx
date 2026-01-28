import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { CONTACTS } from "@/lib/contacts";

export const Footer = () => {
  const { t, language } = useLanguage();

  const renderDisclaimer = () => {
    if (language === "en") {
      return (
        <>
          This investigative mechanism, and the <em>Civic Council of Georgia's</em> <strong><em>Forum for Justice</em></strong>, of which it is part, operates as a civic and documentary body. It does not replace courts, law enforcement, or regulatory authorities, nor does it adjudicate disputes or determine criminal or civil liability.
        </>
      );
    }
    if (language === "ka") {
      return "ეს საგამოძიებო მექანიზმი და საქართველოს სამოქალაქო საბჭოს სამართლიანობის ფორუმი, რომლის ნაწილიცაა იგი, მოქმედებს როგორც სამოქალაქო და დოკუმენტური ორგანო. ის არ ცვლის სასამართლოებს, სამართალდამცავ ან მარეგულირებელ ორგანოებს და არ განსაზღვრავს სისხლის სამართლებრივ ან სამოქალაქო პასუხისმგებლობას.";
    }
    if (language === "ru") {
      return "Данный следственный механизм и Форум справедливости Гражданского совета Грузии, частью которого он является, действует как гражданский и документальный орган. Он не заменяет суды, правоохранительные или регулирующие органы и не определяет уголовную или гражданскую ответственность.";
    }
    if (language === "az") {
      return "Bu araşdırma mexanizmi və onun bir hissəsi olan Gürcüstan Vətəndaş Şurasının Ədalət Forumu vətəndaş və sənədləşdirmə orqanı kimi fəaliyyət göstərir. O, məhkəmələri, hüquq-mühafizə və ya tənzimləyici orqanları əvəz etmir və cinayət və ya mülki məsuliyyəti müəyyən etmir.";
    }
    return t.footer.disclaimer;
  };

  const getLegalNoteText = () => {
    switch (language) {
      case "ka":
        return "ყველა მონაცემი ფსევდონიმიზებულია მოწმეთა ღირსების დასაცავად და არაუფლებამოსილი პირების მიერ იდენტიფიკაციის თავიდან ასაცილებლად.";
      case "ru":
        return "Все данные псевдонимизированы для защиты достоинства свидетелей и предотвращения идентификации неуполномоченными лицами.";
      case "az":
        return "Bütün məlumatlar şahidlərin ləyaqətini qorumaq və icazəsiz şəxslər tərəfindən tanınmasının qarşısını almaq üçün psevdonimləşdirilmişdir.";
      default:
        return "All data is pseudonymized to protect witness dignity and prevent identification by unauthorized actors.";
    }
  };

  const getEmailLabel = () => {
    switch (language) {
      case "ka": return "ელფოსტა";
      case "ru": return "Эл. почта";
      case "az": return "E-poçt";
      default: return "Email";
    }
  };

  const getDonateText = () => {
    switch (language) {
      case "ka": return "შემოწირულობა Civic Council of Georgia, Inc.-ს";
      case "ru": return "Пожертвовать Civic Council of Georgia, Inc.";
      case "az": return "Civic Council of Georgia, Inc.-ə ianə edin";
      default: return "Donate to the Civic Council of Georgia, Inc.";
    }
  };

  
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Organization Info & Legal */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6 sm:gap-8">
          {/* Left Side - Organization & Contact */}
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-foreground">
                <em>Civic Council of Georgia</em>
              </span>
            </div>
            <div>
              <Link 
                to={`/${language}/donate`}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <em>{getDonateText()}</em>
              </Link>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>
                <span className="text-muted-foreground/70">{getEmailLabel()}:</span>{" "}
                <a href="mailto:georgia@sabcho.org" className="hover:text-foreground transition-colors">georgia@sabcho.org</a>
              </p>
              <p>
                <span className="text-muted-foreground/70">ProtonMail:</span>{" "}
                <a href={CONTACTS.protonmail.url} className="hover:text-foreground transition-colors">{CONTACTS.protonmail.display}</a>
              </p>
              <p>
                <span className="text-muted-foreground/70">Signal:</span>{" "}
                <a href={CONTACTS.signal.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{CONTACTS.signal.display}</a>
              </p>
              <p>
                <span className="text-muted-foreground/70">WhatsApp:</span>{" "}
                <a href={CONTACTS.whatsapp.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{CONTACTS.whatsapp.display}</a>
              </p>
              <p>
                <span className="text-muted-foreground/70">Threema:</span>{" "}
                <a href={CONTACTS.threema.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{CONTACTS.threema.display}</a>
              </p>
            </div>
          </div>
          
          {/* Right Side - Legal Disclaimer */}
          <div className="md:max-w-md md:text-right">
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{renderDisclaimer()}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed mt-2 sm:mt-3">
              {getLegalNoteText()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};