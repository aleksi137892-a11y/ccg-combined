import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'custom';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (status: ConsentStatus, prefs?: CookiePreferences) => {
    const consentData = {
      status,
      preferences: prefs || preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    saveConsent('accepted', allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    setPreferences(onlyNecessary);
    saveConsent('rejected', onlyNecessary);
  };

  const handleSavePreferences = () => {
    saveConsent('custom', preferences);
  };

  const text = {
    en: {
      title: 'Data Protection Notice',
      description: 'This platform uses essential cookies for security and functionality. Optional cookies help us improve our services.',
      accept: 'Accept All',
      reject: 'Essential Only',
      manage: 'Customize',
      save: 'Confirm Selection',
      necessary: 'Essential',
      necessaryDesc: 'Required for platform security and core functionality.',
      analytics: 'Performance',
      analyticsDesc: 'Anonymous usage data to improve platform reliability.',
      marketing: 'Communications',
      marketingDesc: 'Updates on investigations and institutional developments.',
      learnMore: 'Read our',
      privacyPolicy: 'Privacy Policy',
      close: 'Close',
    },
    ge: {
      title: 'მონაცემთა დაცვის შეტყობინება',
      description: 'ეს პლატფორმა იყენებს აუცილებელ ქუქებს უსაფრთხოებისა და ფუნქციონალობისთვის. არჩევითი ქუქები გვეხმარება სერვისების გაუმჯობესებაში.',
      accept: 'ყველას მიღება',
      reject: 'მხოლოდ აუცილებელი',
      manage: 'პარამეტრები',
      save: 'არჩევანის დადასტურება',
      necessary: 'აუცილებელი',
      necessaryDesc: 'საჭიროა პლატფორმის უსაფრთხოებისა და ძირითადი ფუნქციონალობისთვის.',
      analytics: 'წარმადობა',
      analyticsDesc: 'ანონიმური გამოყენების მონაცემები პლატფორმის საიმედოობის გასაუმჯობესებლად.',
      marketing: 'კომუნიკაციები',
      marketingDesc: 'განახლებები გამოძიებებისა და ინსტიტუციური მოვლენების შესახებ.',
      learnMore: 'წაიკითხეთ ჩვენი',
      privacyPolicy: 'კონფიდენციალურობის პოლიტიკა',
      close: 'დახურვა',
    },
  };

  const t = text[language];

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        {/* Institutional dark bar */}
        <div className="bg-navy dark:bg-background border-t border-white/10">
          {!showSettings ? (
            /* Main Banner - Compact institutional style */
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Text */}
                <div className="flex-1">
                  <p className={`text-sm text-white/90 leading-relaxed ${language === 'ge' ? 'font-georgian' : 'font-serif'}`}>
                    <span className="font-medium">{t.title}:</span>{' '}
                    <span className="text-white/70">{t.description}</span>
                      {' '}
                      <a 
                        href="/privacy#cookies-and-analytics" 
                        className="text-white/70 underline underline-offset-2 hover:text-white transition-colors inline-flex items-center gap-0.5"
                      >
                        {t.privacyPolicy}
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </p>
              </div>

                {/* Action buttons - Institutional style */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className={`text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors px-3 py-2 ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}
                  >
                    {t.manage}
                  </button>
                  <div className="w-px h-4 bg-white/20 hidden sm:block" />
                  <button
                    onClick={handleRejectAll}
                    className={`text-xs uppercase tracking-wider border border-white/30 text-white/80 px-4 py-2 hover:bg-white/10 transition-colors ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}
                  >
                    {t.reject}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className={`text-xs uppercase tracking-wider bg-parchment text-navy px-4 py-2 hover:bg-parchment/90 transition-colors font-medium ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}
                  >
                    {t.accept}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Settings Panel - Expanded institutional view */
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <h3 className={`text-sm uppercase tracking-wider text-white font-medium ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}>
                    {t.title}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-white/50 hover:text-white transition-colors p-1"
                    aria-label={t.close}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cookie options grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Essential */}
                  <div className="border border-white/20 p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs uppercase tracking-wider text-white/60 ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}>
                        {t.necessary}
                      </span>
                      <Switch 
                        checked={preferences.necessary} 
                        disabled 
                        className="data-[state=checked]:bg-white/40 cursor-not-allowed"
                      />
                    </div>
                    <p className={`text-xs text-white/50 leading-relaxed ${language === 'ge' ? 'font-georgian' : 'font-serif'}`}>
                      {t.necessaryDesc}
                    </p>
                  </div>

                  {/* Analytics */}
                  <div className="border border-white/20 p-4 hover:border-white/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs uppercase tracking-wider text-white/60 ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}>
                        {t.analytics}
                      </span>
                      <Switch 
                        checked={preferences.analytics}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                        className="data-[state=checked]:bg-white"
                      />
                    </div>
                    <p className={`text-xs text-white/50 leading-relaxed ${language === 'ge' ? 'font-georgian' : 'font-serif'}`}>
                      {t.analyticsDesc}
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="border border-white/20 p-4 hover:border-white/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs uppercase tracking-wider text-white/60 ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}>
                        {t.marketing}
                      </span>
                      <Switch 
                        checked={preferences.marketing}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                        className="data-[state=checked]:bg-white"
                      />
                    </div>
                    <p className={`text-xs text-white/50 leading-relaxed ${language === 'ge' ? 'font-georgian' : 'font-serif'}`}>
                      {t.marketingDesc}
                    </p>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <a 
                    href="/privacy#cookies-and-analytics" 
                    className={`text-xs text-white/50 hover:text-white transition-colors underline underline-offset-2 ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}
                  >
                    {t.learnMore} {t.privacyPolicy}
                  </a>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className={`text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors px-3 py-2 ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}
                    >
                      {t.accept}
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className={`text-xs uppercase tracking-wider bg-parchment text-navy px-5 py-2.5 hover:bg-parchment/90 transition-colors font-medium ${language === 'ge' ? 'font-georgian' : 'font-sans'}`}
                    >
                      {t.save}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
