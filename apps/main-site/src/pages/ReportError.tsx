import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle } from 'lucide-react';

const ReportError: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className={`text-center mb-12 ${language === 'ge' ? 'font-georgian' : ''}`}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy/10 dark:bg-navy-pale mb-6">
                <AlertCircle className="w-8 h-8 text-navy dark:text-primary-foreground" />
              </div>
              <h1 className="font-display text-display-sm text-foreground mb-4">
                {language === 'en' ? 'Report an Error' : 'შეცდომის შეტყობინება'}
              </h1>
              <p className="text-body text-muted-foreground">
                {language === 'en'
                  ? 'Help us maintain accuracy. Report factual errors, broken links, or other issues.'
                  : 'დაგვეხმარეთ სიზუსტის შენარჩუნებაში. შეგვატყობინეთ ფაქტობრივი შეცდომების, გატეხილი ბმულების ან სხვა პრობლემების შესახებ.'}
              </p>
            </div>

            <div className="bg-muted/30 border border-border p-8 text-center">
              <p className={`text-lg text-foreground mb-2 ${language === 'ge' ? 'font-georgian' : ''}`}>
                {language === 'en' ? 'Error Report Form' : 'შეცდომის შეტყობინების ფორმა'}
              </p>
              <p className={`text-muted-foreground ${language === 'ge' ? 'font-georgian' : ''}`}>
                {language === 'en' ? 'Coming Soon' : 'მალე'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportError;
