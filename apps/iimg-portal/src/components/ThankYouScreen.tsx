import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, MessageCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/hooks/use-haptic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS } from "@/lib/contacts";

interface ThankYouScreenProps {
  onReturn?: () => void;
}

export const ThankYouScreen = ({ onReturn }: ThankYouScreenProps) => {
  const haptic = useHaptic();
  const { language } = useLanguage();
  const { toast } = useToast();

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: "Submission Received",
        ka: "წარდგენა მიღებულია",
        ru: "Материалы получены",
        az: "Təqdimat qəbul edildi"
      },
      thankYou: {
        en: "Thank you for your courage in coming forward.",
        ka: "გმადლობთ თქვენი გამბედაობისთვის.",
        ru: "Благодарим вас за смелость.",
        az: "İrəli gəlmədəki cəsarətiniz üçün təşəkkür edirik."
      },
      message1: {
        en: "Your materials have been securely documented and preserved in accordance with international evidentiary standards. Each contribution strengthens the documentary record and supports the possibility of future accountability through appropriate legal mechanisms.",
        ka: "თქვენი მასალები უსაფრთხოდ დოკუმენტირებულია და შენახულია საერთაშორისო მტკიცებულებითი სტანდარტების შესაბამისად. თითოეული წვლილი აძლიერებს დოკუმენტურ ჩანაწერს და მხარს უჭერს მომავალი ანგარიშვალდებულების შესაძლებლობას.",
        ru: "Ваши материалы надёжно задокументированы и сохранены в соответствии с международными стандартами доказательств. Каждый вклад укрепляет документальную запись и поддерживает возможность будущей подотчётности.",
        az: "Materiallarınız beynəlxalq sübut standartlarına uyğun təhlükəsiz sənədləşdirildi. Hər töhfə sənədli qeydi gücləndirir və gələcək hesabatlılıq imkanını dəstəkləyir."
      },
      message2: {
        en: "This investigative mechanism will continue to receive and document evidence as long as circumstances require. You may return at any time with additional materials or information.",
        ka: "ეს საგამოძიებო მექანიზმი გააგრძელებს მტკიცებულებების მიღებას და დოკუმენტირებას, სანამ გარემოებები მოითხოვს. ნებისმიერ დროს შეგიძლიათ დაბრუნდეთ დამატებითი მასალებით.",
        ru: "Этот следственный механизм будет продолжать получать и документировать доказательства, пока того требуют обстоятельства. Вы можете вернуться в любое время с дополнительными материалами.",
        az: "Bu istintaq mexanizmi şərait tələb etdikcə sübutları qəbul etməyə davam edəcək. İstənilən vaxt əlavə materiallarla geri qayıda bilərsiniz."
      },
      securityNote: {
        en: "For your protection, we recommend clearing your browser history after this session.",
        ka: "თქვენი დაცვისთვის გირჩევთ გაასუფთავოთ ბრაუზერის ისტორია ამ სესიის შემდეგ.",
        ru: "Для вашей защиты рекомендуем очистить историю браузера после этого сеанса.",
        az: "Müdafiəniz üçün bu sessiyadan sonra brauzer tarixçənizi təmizləməyi tövsiyə edirik."
      },
      securityGuide: {
        en: "Security Guide",
        ka: "უსაფრთხოების სახელმძღვანელო",
        ru: "Руководство по безопасности",
        az: "Təhlükəsizlik bələdçisi"
      },
      contactTitle: {
        en: "Secure Communication",
        ka: "უსაფრთხო კომუნიკაცია",
        ru: "Защищённая связь",
        az: "Təhlükəsiz rabitə"
      },
      contactMessage: {
        en: "For follow-up inquiries or additional submissions:",
        ka: "შემდგომი მოთხოვნებისთვის ან დამატებითი წარდგენებისთვის:",
        ru: "Для последующих запросов или дополнительных материалов:",
        az: "Sonrakı sorğular və ya əlavə təqdimatlar üçün:"
      },
      returnHome: {
        en: "Return to mandate",
        ka: "დაბრუნდით მანდატზე",
        ru: "Вернуться к мандату",
        az: "Mandata qayıdın"
      },
      iimg: {
        en: "Independent Investigative Mechanism for Georgia",
        ka: "საქართველოს დამოუკიდებელი საგამოძიებო მექანიზმი",
        ru: "Независимый следственный механизм для Грузии",
        az: "Gürcüstan üçün Müstəqil İstintaq Mexanizmi"
      },
      support: {
        en: "Support the Civic Council of Georgia",
        ka: "მხარი დაუჭირეთ საქართველოს სამოქალაქო საბჭოს",
        ru: "Поддержите Гражданский совет Грузии",
        az: "Gürcüstan Vətəndaş Şurasını dəstəkləyin"
      },
      shareTitle: {
        en: "Share with a friend",
        ka: "გაუზიარეთ მეგობარს",
        ru: "Поделиться с другом",
        az: "Dostla paylaşın"
      },
      shareWhatsApp: {
        en: "WhatsApp",
        ka: "WhatsApp",
        ru: "WhatsApp",
        az: "WhatsApp"
      },
      copyLink: {
        en: "Copy link",
        ka: "ბმულის კოპირება",
        ru: "Скопировать ссылку",
        az: "Linki kopyala"
      },
      linkCopied: {
        en: "Link copied! Paste anywhere to share.",
        ka: "ბმული კოპირებულია! ჩასვით გასაზიარებლად.",
        ru: "Ссылка скопирована! Вставьте куда угодно.",
        az: "Link kopyalandı! Paylaşmaq üçün yapışdırın."
      },
      shareMessage: {
        en: "Help document what's happening in Georgia. Submit evidence securely:",
        ka: "დაეხმარეთ საქართველოში მიმდინარე მოვლენების დოკუმენტირებას. უსაფრთხოდ წარადგინეთ მტკიცებულება:",
        ru: "Помогите задокументировать происходящее в Грузии. Безопасно отправьте доказательства:",
        az: "Gürcüstanda baş verənləri sənədləşdirməyə kömək edin. Sübutları təhlükəsiz təqdim edin:"
      }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  const shareUrl = window.location.origin + "/submit-evidence";
  const shareMessage = `${getText("shareMessage")} ${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const handleCopyLink = () => {
    haptic.medium();
    navigator.clipboard.writeText(shareUrl);
    toast({ title: getText("linkCopied") });
  };

  const handleWhatsAppShare = () => {
    haptic.medium();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col min-h-full overflow-y-auto"
    >
      {/* Main Content */}
      <div className="flex-1 px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight mb-4">
              {getText("title")}
            </h1>
            <div className="w-24 h-px bg-foreground/30 mb-6" />
            <p className="text-lg text-foreground/80 italic">
              {getText("thankYou")}
            </p>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              {getText("message1")}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {getText("message2")}
            </p>
          </motion.div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-l-2 border-foreground/30 pl-6 py-4 mb-12"
          >
            <p className="text-sm text-muted-foreground mb-4">
              {getText("securityNote")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/security-guide"
                onClick={() => haptic.light()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-colors"
              >
                {getText("securityGuide")}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.torproject.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Tor
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://duckduckgo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                DuckDuckGo
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
              {getText("contactTitle")}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {getText("contactMessage")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a
                href={CONTACTS.signal.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="flex flex-col p-4 border border-border hover:border-foreground/30 transition-colors"
              >
                <span className="text-sm font-medium mb-1">Signal</span>
                <span className="text-xs text-muted-foreground">{CONTACTS.signal.display}</span>
              </a>
              <a
                href={CONTACTS.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="flex flex-col p-4 border border-border hover:border-foreground/30 transition-colors"
              >
                <span className="text-sm font-medium mb-1">WhatsApp</span>
                <span className="text-xs text-muted-foreground">{CONTACTS.whatsapp.display}</span>
              </a>
              <a
                href={CONTACTS.protonmail.url}
                onClick={() => haptic.light()}
                className="flex flex-col p-4 border border-border hover:border-foreground/30 transition-colors"
              >
                <span className="text-sm font-medium mb-1">ProtonMail</span>
                <span className="text-xs text-muted-foreground truncate">{CONTACTS.protonmail.display}</span>
              </a>
              <a
                href={CONTACTS.threema.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="flex flex-col p-4 border border-border hover:border-foreground/30 transition-colors"
              >
                <span className="text-sm font-medium mb-1">Threema</span>
                <span className="text-xs text-muted-foreground">{CONTACTS.threema.display}</span>
              </a>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
              {getText("shareTitle")}
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {getText("shareWhatsApp")}
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {getText("copyLink")}
              </button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <a
              href="https://donate.sabcho.org"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptic.light()}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {getText("support")}
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t border-border px-6 md:px-12 py-8"
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            {getText("iimg")}
          </p>

          {onReturn && (
            <Button
              onClick={() => {
                haptic.light();
                onReturn();
              }}
              variant="outline"
              className="h-10 px-5 rounded-none text-sm gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {getText("returnHome")}
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
