import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PRESET_AMOUNTS = [25, 50, 100, 250];

// Crypto wallet addresses for anonymous support
const CRYPTO_WALLETS = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  USDT: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
};

export default function Donate() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  const getText = () => {
    switch (language) {
      case "ka":
        return {
          headline: "შეინარჩუნე ჩანაწერი",
          body: "პროპაგანდის მაქანა კარგად არის დაფინანსებული. სიმართლის მაქანა თქვენზეა დამოკიდებული. თქვენი წვლილი მხარს უჭერს უსაფრთხო სერვერებს, სასამართლო ექსპერტიზას და იურიდიულ დახმარებას, რომელიც წინააღმდეგობას ცოცხლად ინარჩუნებს.",
          selectAmount: "თანხის არჩევა",
          customPlaceholder: "სხვა თანხა",
          email: "ელფოსტა (არასავალდებულო)",
          contribute: "წვლილის შეტანა",
          processing: "მუშავდება...",
          successTitle: "მადლობა.",
          successMessage: "თქვენი წვლილი მიღებულია. ჩანაწერი გადარჩება.",
          canceledTitle: "გაუქმებულია",
          canceledMessage: "თქვენი ტრანზაქცია გაუქმდა.",
          tryAgain: "ხელახლა ცდა",
          currency: "₾",
          securityNote: "ყველა ტრანზაქცია მუშავდება უსაფრთხო, დაშიფრული არხებით. ჩვენ არ ვაქვეყნებთ დონორთა სიებს.",
          cryptoTitle: "ანონიმური მხარდაჭერა",
          cryptoBody: "მაქსიმალური კონფიდენციალურობისთვის, ჩვენ ვიღებთ კრიპტოვალუტას პირდაპირ ქვემოთ მოცემულ საფულეებზე.",
          copyAddress: "კოპირება",
          copied: "კოპირებულია",
        };
      case "ru":
        return {
          headline: "Сохрани запись",
          body: "Машина пропаганды хорошо финансируется. Машина правды зависит от вас. Ваш вклад поддерживает защищённые серверы, судебные расследования и юридическую помощь, которая поддерживает сопротивление.",
          selectAmount: "Выберите сумму",
          customPlaceholder: "Другая сумма",
          email: "Email (необязательно)",
          contribute: "Внести вклад",
          processing: "Обработка...",
          successTitle: "Спасибо.",
          successMessage: "Ваш вклад получен. Запись сохранится.",
          canceledTitle: "Отменено",
          canceledMessage: "Ваша транзакция была отменена.",
          tryAgain: "Попробовать снова",
          currency: "₾",
          securityNote: "Все транзакции обрабатываются через защищённые, зашифрованные каналы. Мы не публикуем списки доноров.",
          cryptoTitle: "Анонимная поддержка",
          cryptoBody: "Для максимальной конфиденциальности мы принимаем криптовалюту напрямую на указанные ниже кошельки.",
          copyAddress: "Копировать",
          copied: "Скопировано",
        };
      case "az":
        return {
          headline: "Qeydi qoru",
          body: "Təbliğat maşını yaxşı maliyyələşdirilir. Həqiqət maşını sizə əsaslanır. Sizin töhfəniz təhlükəsiz serverləri, məhkəmə araşdırmalarını və müqaviməti canlı saxlayan hüquqi yardımı dəstəkləyir.",
          selectAmount: "Məbləğ seçin",
          customPlaceholder: "Digər məbləğ",
          email: "E-poçt (isteğe bağlı)",
          contribute: "Töhfə verin",
          processing: "Emal edilir...",
          successTitle: "Təşəkkür edirik.",
          successMessage: "Töhfəniz alındı. Qeyd qorunacaq.",
          canceledTitle: "Ləğv edildi",
          canceledMessage: "Əməliyyatınız ləğv edildi.",
          tryAgain: "Yenidən cəhd edin",
          currency: "₾",
          securityNote: "Bütün əməliyyatlar təhlükəsiz, şifrələnmiş kanallar vasitəsilə emal edilir. Donor siyahılarını dərc etmirik.",
          cryptoTitle: "Anonim dəstək",
          cryptoBody: "Maksimum məxfilik üçün aşağıdakı cüzdanlara birbaşa kriptovalyuta qəbul edirik.",
          copyAddress: "Kopyala",
          copied: "Kopyalandı",
        };
      default:
        return {
          headline: "Sustain the Record",
          body: "The machinery of propaganda is well-funded. The machinery of truth relies on you. Your contribution supports the secure servers, the forensic investigations, and the legal aid that keeps the resistance alive.",
          selectAmount: "Select an amount",
          customPlaceholder: "Other amount",
          email: "Email (optional)",
          contribute: "Contribute",
          processing: "Processing...",
          successTitle: "Thank you.",
          successMessage: "Your contribution has been received. The record endures.",
          canceledTitle: "Canceled",
          canceledMessage: "Your transaction was canceled.",
          tryAgain: "Try again",
          currency: "₾",
          securityNote: "All transactions are processed via secure, encrypted channels. We do not publish donor lists.",
          cryptoTitle: "Anonymous Support",
          cryptoBody: "For maximum privacy, we accept cryptocurrency directly to the wallets below.",
          copyAddress: "Copy",
          copied: "Copied",
        };
    }
  };

  const text = getText();

  const handleDonate = async () => {
    const amount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    
    if (!amount || amount < 1) {
      toast.error("Please select or enter a valid amount");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("create-donation", {
        body: { amount, email: email || undefined },
      });

      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(null);
    }
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const copyToClipboard = async (wallet: string, type: string) => {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopiedWallet(type);
      setTimeout(() => setCopiedWallet(null), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <article className="max-w-xl text-center space-y-6">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <h1 className="font-serif text-3xl font-semibold text-foreground">{text.successTitle}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{text.successMessage}</p>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  // Canceled state
  if (isCanceled) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <article className="max-w-xl text-center space-y-6">
            <XCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h1 className="font-serif text-3xl font-semibold text-foreground">{text.canceledTitle}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{text.canceledMessage}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = `/${language}/donate`}
              className="mt-4"
            >
              {text.tryAgain}
            </Button>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 px-4 py-12 md:py-20">
        <article className="max-w-2xl mx-auto">
          
          {/* THE ASK */}
          <header className="mb-12 md:mb-16 border-b border-border pb-10">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
              {text.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {text.body}
            </p>
          </header>

          {/* PAYMENT SECTION */}
          <section className="space-y-8 mb-16">
            
            {/* Amount Selection */}
            <div className="space-y-4">
              <h2 className="font-serif text-lg font-medium text-foreground">
                {text.selectAmount}
              </h2>
              <div className="flex flex-wrap gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetClick(amount)}
                    className={`
                      px-6 py-3 text-base font-medium border transition-all
                      ${selectedAmount === amount && !customAmount 
                        ? 'bg-foreground text-background border-foreground' 
                        : 'bg-transparent text-foreground border-border hover:border-foreground'
                      }
                    `}
                  >
                    {text.currency}{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm font-medium min-w-fit">or</span>
              <div className="relative flex-1 max-w-[200px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {text.currency}
                </span>
                <Input
                  type="number"
                  min="1"
                  placeholder={text.customPlaceholder}
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-8 border-border bg-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div className="max-w-sm">
              <Input
                type="email"
                placeholder={text.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-transparent"
              />
            </div>

            {/* Contribute Button */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={handleDonate}
                disabled={isLoading || (!selectedAmount && !customAmount)}
                className="px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {text.processing}
                  </>
                ) : (
                  <>
                    {text.contribute}
                    {(customAmount || selectedAmount) && (
                      <span className="ml-2">
                        {text.currency}{customAmount || selectedAmount}
                      </span>
                    )}
                  </>
                )}
              </Button>
            </div>

            {/* Security Note */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              {text.securityNote}
            </p>
          </section>

          {/* CRYPTO SECTION */}
          <section className="border-t border-border pt-12">
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              {text.cryptoTitle}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {text.cryptoBody}
            </p>

            <div className="space-y-6">
              {Object.entries(CRYPTO_WALLETS).map(([type, address]) => (
                <div key={type} className="group">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground tracking-wide">
                      {type}
                    </span>
                    <button
                      onClick={() => copyToClipboard(address, type)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copiedWallet === type ? text.copied : text.copyAddress}
                    </button>
                  </div>
                  <code className="block text-xs text-muted-foreground font-mono break-all p-3 bg-muted/30 border border-border">
                    {address}
                  </code>
                </div>
              ))}
            </div>

            {/* Repeated Security Note */}
            <p className="text-sm text-muted-foreground leading-relaxed mt-8 pt-8 border-t border-border">
              {text.securityNote}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
