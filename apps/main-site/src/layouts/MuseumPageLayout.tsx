import React from 'react';
import { motion } from 'motion/react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import FoundationSection from '@/components/layout/FoundationSection';
import { cn } from '@/lib/utils';

interface JumpToItem {
  id: string;
  label: string;
  labelGe?: string;
}

interface MuseumPageLayoutProps {
  title: string;
  titleGe?: string;
  eyebrow?: string;
  eyebrowGe?: string;
  pullQuote?: string;
  pullQuoteGe?: string;
  jumpToItems?: JumpToItem[];
  lastUpdated?: string;
  lastUpdatedGe?: string;
  children: React.ReactNode;
  className?: string;
}

const MuseumPageLayout: React.FC<MuseumPageLayoutProps> = ({
  title,
  titleGe,
  eyebrow,
  eyebrowGe,
  pullQuote,
  pullQuoteGe,
  lastUpdated,
  lastUpdatedGe,
  children,
  className = '',
}) => {
  const { isGeorgian } = useLanguage();

  const getText = (en?: string, ge?: string) => isGeorgian && ge ? ge : en;

  return (
    <Layout>
      <article className={cn('min-h-screen bg-white', className)}>
        {/* Navy accent bar */}
        <div className="h-0.5 bg-navy" />

        {/* Hero Section */}
        <FoundationSection size="hero" variant="white">
          {eyebrow && (
            <motion.span
              className="font-mono text-xs uppercase tracking-[0.2em] text-navy/40 block mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {getText(eyebrow, eyebrowGe)}
            </motion.span>
          )}
          
          <motion.h1
            className={cn(
              'font-narrative text-4xl md:text-5xl lg:text-6xl tracking-tight text-navy leading-[1.1] mb-8',
              isGeorgian && 'font-georgian'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {getText(title, titleGe)}
          </motion.h1>

          {pullQuote && (
            <motion.p
              className={cn(
                'font-narrative text-xl md:text-2xl text-navy/60 leading-relaxed max-w-2xl',
                isGeorgian && 'font-georgian'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getText(pullQuote, pullQuoteGe)}
            </motion.p>
          )}
        </FoundationSection>

        {/* Main content */}
        {children}

        {/* Last updated footer */}
        {lastUpdated && (
          <div className="container mx-auto px-4 py-8">
            <p className="font-mono text-xs text-navy/30">
              {getText(lastUpdated, lastUpdatedGe)}
            </p>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default MuseumPageLayout;