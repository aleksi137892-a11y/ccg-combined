import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { viewportOnce } from '@/lib/animations';
import FoundationSection from '@/components/layout/FoundationSection';
import { PhotoPlaceholder } from '@/components/ui/photo-placeholder';
import { ExpandableSection } from '@/components/ui/expandable-section';
import { cn } from '@/lib/utils';
import { ProgramNav } from '@/components/layout/ProgramNav';

const Engine = () => {
  const { language, getLocalizedPath } = useLanguage();
  const isGeorgian = language === 'ge';

  useEffect(() => {
    document.title = isGeorgian 
      ? 'ხელში ჩაგდების მდგომარეობა | საბჭო' 
      : 'State of Capture | Sabcho';
  }, [isGeorgian]);

  const captureLayers = [
    {
      title: isGeorgian ? 'სასამართლო სისტემის ხელყოფა' : 'Judicial System Capture',
      description: isGeorgian 
        ? 'სასამართლო დამოუკიდებლობის სისტემატური შესუსტება.'
        : 'Systematic weakening of judicial independence.'
    },
    {
      title: isGeorgian ? 'მედია სივრცის კონტროლი' : 'Media Space Control',
      description: isGeorgian 
        ? 'კრიტიკული მედიის ეკონომიკური შევიწროება.'
        : 'Economic strangulation of critical media.'
    },
    {
      title: isGeorgian ? 'საარჩევნო ინფრასტრუქტურა' : 'Electoral Infrastructure',
      description: isGeorgian 
        ? 'საარჩევნო კომისიების პოლიტიზაცია.'
        : 'Politicization of election commissions.'
    },
    {
      title: isGeorgian ? 'ეკონომიკური ბერკეტები' : 'Economic Leverage',
      description: isGeorgian 
        ? 'სახელმწიფო კონტრაქტების გამოყენება ლოიალობისთვის.'
        : 'Use of state contracts to ensure loyalty.'
    },
    {
      title: isGeorgian ? 'სამოქალაქო საზოგადოება' : 'Civil Society',
      description: isGeorgian 
        ? 'არასამთავრობოების კანონმდებლობით შეზღუდვა.'
        : 'Legislative restrictions on NGOs.'
    }
  ];

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        {/* Hero */}
        <FoundationSection size="hero" variant="white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "font-narrative text-4xl md:text-5xl lg:text-6xl text-navy mb-8",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian ? 'ხელში ჩაგდების მდგომარეობა' : 'State of Capture'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "font-narrative text-xl text-navy/70 max-w-2xl leading-relaxed",
              isGeorgian && "font-georgian"
            )}
          >
            {isGeorgian 
              ? 'ხელყოფა ინჟინერირებულია. ის აშენებულია დაუსჯელობის, მორჩილებისა და მოგების წარმოებისთვის.'
              : 'Capture is engineered. It is built to produce impunity, obedience, and profit.'}
          </motion.p>
        </FoundationSection>

        {/* Photo */}
        <div className="container mx-auto px-4 -mt-8 mb-16">
          <div className="max-w-3xl">
            <PhotoPlaceholder 
              label="Capture visualization" 
              aspectRatio="2/1" 
            />
          </div>
        </div>

        {/* Core principle */}
        <FoundationSection variant="muted">
          <div className="border-l-2 border-navy pl-6">
            <p className={cn(
              "font-narrative text-lg text-navy",
              isGeorgian && "font-georgian"
            )}>
              {isGeorgian 
                ? 'ძირითადი პრინციპი: ხელყოფა არ არის შემთხვევითობა — ეს არის სისტემა.'
                : 'Core principle: Capture is not accident — it is system.'}
            </p>
          </div>
        </FoundationSection>

        {/* Layers of Capture */}
        <FoundationSection 
          variant="white"
          heading={isGeorgian ? 'ხელყოფის ფენები' : 'Layers of Capture'}
        >
          <div className="space-y-4 mt-8">
            {captureLayers.slice(0, 3).map((layer, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: index * 0.05 }}
                className="border-l-2 border-navy/20 pl-6 py-2"
              >
                <h3 className={cn(
                  "font-narrative text-base text-navy mb-1",
                  isGeorgian && "font-georgian"
                )}>
                  {layer.title}
                </h3>
                <p className={cn(
                  "font-narrative text-sm text-navy/60",
                  isGeorgian && "font-georgian"
                )}>
                  {layer.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <ExpandableSection 
            summary="View all layers" 
            summaryGe="ყველა ფენის ნახვა"
            className="mt-6"
          >
            <div className="space-y-4">
              {captureLayers.slice(3).map((layer, index) => (
                <div key={index} className="border-l-2 border-navy/20 pl-6 py-2">
                  <h3 className={cn(
                    "font-narrative text-base text-navy mb-1",
                    isGeorgian && "font-georgian"
                  )}>
                    {layer.title}
                  </h3>
                  <p className={cn(
                    "font-narrative text-sm text-navy/60",
                    isGeorgian && "font-georgian"
                  )}>
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </ExpandableSection>
        </FoundationSection>

        {/* Related Resources */}
        <FoundationSection variant="navy">
          <h2 className={cn(
            "font-narrative text-xl text-white mb-8",
            isGeorgian && "font-georgian"
          )}>
            {isGeorgian ? 'დაკავშირებული რესურსები' : 'Related Resources'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: '/report', label: isGeorgian ? 'ანგარიში' : 'The Report', desc: isGeorgian ? 'სრული ანალიზი' : 'Full analysis' },
              { href: '/evidence', label: isGeorgian ? 'მტკიცებულებები' : 'Evidence Library', desc: isGeorgian ? 'დოკუმენტური არქივი' : 'Documentary archive' },
              { href: '/the-list', label: isGeorgian ? 'სია' : 'The List', desc: isGeorgian ? 'ხელშემწყობთა რეესტრი' : 'Enablers registry' },
              { href: '/capture-map', label: isGeorgian ? 'რუკა' : 'Capture Map', desc: isGeorgian ? 'ვიზუალიზაცია' : 'Visualization' },
            ].map((item, idx) => (
              <Link 
                key={idx}
                to={getLocalizedPath(item.href)} 
                className="block border border-white/20 p-5 hover:bg-white/5 transition-colors"
              >
                <h3 className={cn(
                  "font-narrative text-base text-white mb-1",
                  isGeorgian && "font-georgian"
                )}>
                  {item.label}
                </h3>
                <p className={cn(
                  "font-narrative text-sm text-white/60",
                  isGeorgian && "font-georgian"
                )}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </FoundationSection>

        {/* Program Navigation */}
        <ProgramNav current="capture" />
      </article>
    </Layout>
  );
};

export default Engine;
