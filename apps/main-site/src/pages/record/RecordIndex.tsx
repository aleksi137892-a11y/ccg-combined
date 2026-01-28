// Record Section Landing Page
// Navigation hub for Ledger and Registry subsections

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { 
  BookOpen, 
  Users, 
  ArrowRight, 
  Search,
  Download,
  Landmark,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SubsectionCardProps {
  title: string;
  titleGe: string;
  description: string;
  descriptionGe: string;
  icon: React.ElementType;
  href: string;
  stats?: { label: string; labelGe: string; value: string }[];
  children?: { label: string; labelGe: string; href: string }[];
  accentColor: string;
  isGeorgian: boolean;
}

function SubsectionCard({ 
  title, 
  titleGe, 
  description, 
  descriptionGe, 
  icon: Icon, 
  href, 
  stats,
  children,
  accentColor,
  isGeorgian 
}: SubsectionCardProps) {
  const langPrefix = isGeorgian ? '/ge' : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border overflow-hidden"
    >
      {/* Header */}
      <div className={cn('p-6 border-b border-l-2', accentColor)}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-foreground/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className={cn(
              'text-xl font-display text-foreground mb-1',
              isGeorgian && 'font-georgian'
            )}>
              {isGeorgian ? titleGe : title}
            </h3>
            <p className={cn(
              'text-muted-foreground text-sm',
              isGeorgian && 'font-georgian'
            )}>
              {isGeorgian ? descriptionGe : description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 divide-x border-b">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4 text-center">
              <div className="text-2xl font-display text-foreground">{stat.value}</div>
              <div className={cn(
                'text-xs text-muted-foreground',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian ? stat.labelGe : stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Child links */}
      {children && children.length > 0 && (
        <div className="p-4 space-y-1">
          {children.map((child, idx) => (
            <Link
              key={idx}
              to={`${langPrefix}${child.href}`}
              className={cn(
                'flex items-center justify-between p-3 transition-colors',
                'hover:bg-muted group'
              )}
            >
              <span className={cn(
                'text-sm text-foreground',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian ? child.labelGe : child.label}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      )}

      {/* Main CTA */}
      <div className="p-4 pt-0">
        <Link
          to={`${langPrefix}${href}`}
          className={cn(
            'flex items-center justify-center gap-2 w-full py-3 transition-colors',
            'bg-primary text-primary-foreground hover:bg-primary/90',
            isGeorgian && 'font-georgian'
          )}
        >
          {isGeorgian ? 'სრულად ნახვა' : 'View Full Section'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

const RecordIndex: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const langPrefix = isGeorgian ? '/ge' : '';
  
  // Live stats from database
  const [ledgerCount, setLedgerCount] = useState<string>('—');
  
  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase
        .from('complicity_entities')
        .select('*', { count: 'exact', head: true });
      
      if (count !== null) {
        setLedgerCount(count.toString());
      }
    };
    fetchStats();
  }, []);

  const subsections = [
    {
      title: 'The Complicity Ledger',
      titleGe: 'თანამონაწილეობის რეესტრი',
      description: 'Financial architecture of state capture—donors, contractors, and enablers mapped with documentary evidence.',
      descriptionGe: 'სახელმწიფოს ხელში ჩაგდების ფინანსური არქიტექტურა—დონორები, კონტრაქტორები და ხელშემწყობები დოკუმენტური მტკიცებულებებით.',
      icon: Landmark,
      href: '/record/ledger',
      accentColor: 'border-l-primary',
      stats: [
        { label: 'Entities', labelGe: 'სუბიექტები', value: ledgerCount },
        { label: 'Modes', labelGe: 'რეჟიმები', value: '7' },
        { label: 'Sectors', labelGe: 'სექტორები', value: '15+' },
      ],
      children: [],
    },
    {
      title: 'The Ledger of Harm',
      titleGe: 'ზიანის რეესტრი',
      description: 'Documented record of harm caused by state capture—individual cases, systemic violations, and political persecution.',
      descriptionGe: 'დოკუმენტირებული ჩანაწერი სახელმწიფოს ხელში ჩაგდებით გამოწვეული ზიანის შესახებ—ინდივიდუალური შემთხვევები, სისტემური დარღვევები და პოლიტიკური დევნა.',
      icon: BookOpen,
      href: '/record/harm',
      accentColor: 'border-l-primary/80',
      stats: [
        { label: 'Entries', labelGe: 'ჩანაწერები', value: '—' },
        { label: 'Verified', labelGe: 'დადასტურებული', value: '—' },
        { label: 'Pending', labelGe: 'მოლოდინში', value: '—' },
      ],
      children: [
        { label: 'Political Prisoners', labelGe: 'პოლიტიკური პატიმრები', href: '/record/harm/political-prisoners' },
        { label: 'Claims Archive', labelGe: 'მოთხოვნების არქივი', href: '/record/harm/claims-archive' },
      ],
    },
    {
      title: 'The Registry of Responsibility',
      titleGe: 'პასუხისმგებლობის რეესტრი',
      description: 'Named individuals and entities documented for their role in state capture, with evidence-linked entries and right of reply.',
      descriptionGe: 'დასახელებული პირები და ერთეულები, რომლებიც დოკუმენტირებულია მათი როლისთვის სახელმწიფოს ხელში ჩაგდებაში, მტკიცებულებებთან დაკავშირებული ჩანაწერებით და პასუხის უფლებით.',
      icon: Users,
      href: '/record/registry',
      accentColor: 'border-l-primary/60',
      stats: [
        { label: 'Individuals', labelGe: 'პირები', value: '—' },
        { label: 'Entities', labelGe: 'ერთეულები', value: '—' },
        { label: 'Corrections', labelGe: 'შესწორებები', value: '—' },
      ],
      children: [
        { label: 'The List', labelGe: 'სია', href: '/record/registry/the-list' },
        { label: 'Corporate Responsibility Index', labelGe: 'კორპორატიული პასუხისმგებლობის ინდექსი', href: '/record/registry/corporate-responsibility-index' },
        { label: 'Reply & Corrections', labelGe: 'პასუხი და შესწორებები', href: '/record/registry/reply-corrections' },
      ],
    },
  ];

  return (
    <Layout>
      <article className="min-h-screen bg-background border-t-2 border-primary">
        <InstitutionalPageHeader
          title="The Public Record"
          titleGe="საჯარო ჩანაწერი"
          subtitle="Permanent Archive"
          subtitleGe="მუდმივი არქივი"
          description="The Record maintains the public archive of harm and responsibility—evidence-linked, correctable, and durable. We preserve the truth so that justice becomes possible."
          descriptionGe="ჩანაწერი ინახავს ზიანის და პასუხისმგებლობის საჯარო არქივს—მტკიცებულებებთან დაკავშირებულ, შესწორებად და მყარს. ჩვენ ვინახავთ სიმართლეს, რათა სამართლიანობა გახდეს შესაძლებელი."
          breadcrumbs={[]}
        />

        {/* Main Subsections */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {subsections.map((subsection, idx) => (
              <SubsectionCard
                key={idx}
                {...subsection}
                isGeorgian={isGeorgian}
              />
            ))}
          </div>
        </section>

        {/* Search & Access */}
        <section className="border-t border-border bg-muted/20">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className={cn(
                'text-2xl font-semibold text-foreground mb-8 text-center',
                isGeorgian && 'font-georgian'
              )}>
                {isGeorgian ? 'წვდომა ჩანაწერზე' : 'Access the Record'}
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Search */}
                <Link
                  to={`${langPrefix}/search`}
                  className="group flex items-start gap-4 p-6 bg-card border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      'font-medium text-foreground mb-1',
                      isGeorgian && 'font-georgian'
                    )}>
                      {isGeorgian ? 'ძებნა და ფილტრი' : 'Search & Filter'}
                    </h3>
                    <p className={cn(
                      'text-sm text-muted-foreground',
                      isGeorgian && 'font-georgian'
                    )}>
                      {isGeorgian 
                        ? 'მოძებნეთ კონკრეტული ჩანაწერები, პირები ან ინციდენტები' 
                        : 'Find specific entries, individuals, or incidents'}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>

                {/* Download */}
                <div className="flex items-start gap-4 p-6 bg-card border opacity-60">
                  <div className="w-10 h-10 bg-muted flex items-center justify-center">
                    <Download className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      'font-medium text-foreground mb-1',
                      isGeorgian && 'font-georgian'
                    )}>
                      {isGeorgian ? 'ჩამოტვირთვა და ექსპორტი' : 'Download & Export'}
                    </h3>
                    <p className={cn(
                      'text-sm text-muted-foreground',
                      isGeorgian && 'font-georgian'
                    )}>
                      {isGeorgian 
                        ? 'საჯარო ჩანაწერის ექსპორტი სტრუქტურირებულ ფორმატებში (მალე)' 
                        : 'Export public record in structured formats (coming soon)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Make an Appeal', labelGe: 'მიმართვის გაკეთება', href: '/appeal' },
                { label: 'Reply & Corrections', labelGe: 'პასუხი და შესწორებები', href: '/record/registry/reply-corrections' },
                { label: 'Standards & Safeguards', labelGe: 'სტანდარტები და გარანტიები', href: '/standards' },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={`${langPrefix}${link.href}`}
                  className={cn(
                    'text-sm text-muted-foreground hover:text-foreground transition-colors',
                    isGeorgian && 'font-georgian'
                  )}
                >
                  {isGeorgian ? link.labelGe : link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default RecordIndex;
