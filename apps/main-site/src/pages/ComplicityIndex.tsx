import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import InstitutionalPageHeader from '@/components/institutional/InstitutionalPageHeader';
import { ComplicityUploader, ComplicityEntityCard } from '@/components/complicity';
import { LedgerCSVUploader } from '@/components/ledger';
import { supabase } from '@/integrations/supabase/client';
import { ComplicityEntity } from '@/types/complicityIndex';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Building2, User, Landmark, Loader2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type EntityTypeFilter = 'all' | 'individual' | 'company' | 'institution';
type SeverityFilter = 'all' | 'high' | 'medium' | 'low';

const ENTITY_TYPE_LABELS = {
  all: { en: 'All Types', ge: 'ყველა ტიპი' },
  individual: { en: 'Individuals', ge: 'ფიზიკური პირები' },
  company: { en: 'Companies', ge: 'კომპანიები' },
  institution: { en: 'Institutions', ge: 'ინსტიტუციები' },
};

const SEVERITY_LABELS = {
  all: { en: 'All Levels', ge: 'ყველა დონე' },
  high: { en: 'High', ge: 'მაღალი' },
  medium: { en: 'Medium', ge: 'საშუალო' },
  low: { en: 'Low', ge: 'დაბალი' },
};

const ComplicityIndex: React.FC = () => {
  const { isGeorgian } = useLanguage();
  const [entities, setEntities] = useState<ComplicityEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState<EntityTypeFilter>('all');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [showUploader, setShowUploader] = useState(false);

  const fetchEntities = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('complicity_entities')
      .select('*')
      .order('total_donations_gel', { ascending: false });

    if (error) {
      console.error('Error fetching entities:', error);
    } else {
      setEntities((data as unknown as ComplicityEntity[]) || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        entity.name.toLowerCase().includes(searchLower) ||
        entity.name_ge?.toLowerCase().includes(searchLower) ||
        entity.organization?.toLowerCase().includes(searchLower) ||
        entity.position?.toLowerCase().includes(searchLower);

      // Entity type filter
      const matchesType =
        entityTypeFilter === 'all' || entity.entity_type === entityTypeFilter;

      // Severity filter
      const matchesSeverity =
        severityFilter === 'all' || entity.severity === severityFilter;

      return matchesSearch && matchesType && matchesSeverity;
    });
  }, [entities, searchQuery, entityTypeFilter, severityFilter]);

  // Stats
  const stats = useMemo(() => {
    const totalDonations = entities.reduce((sum, e) => sum + e.total_donations_gel, 0);
    const totalProcurement = entities.reduce((sum, e) => sum + e.total_procurement_gel, 0);
    return {
      count: entities.length,
      donations: totalDonations,
      procurement: totalProcurement,
    };
  }, [entities]);

  const formatGel = (amount: number): string => {
    if (amount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000).toFixed(2)}B`;
    }
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1)}M`;
    }
    return amount.toLocaleString();
  };

  const EntityTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'individual':
        return <User className="h-4 w-4 text-navy/40" />;
      case 'company':
        return <Building2 className="h-4 w-4 text-navy/40" />;
      case 'institution':
        return <Landmark className="h-4 w-4 text-navy/40" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <article className="min-h-screen bg-white border-t-2 border-navy">
        <InstitutionalPageHeader
          title="The Complicity Index"
          titleGe="თანამონაწილეობის ინდექსი"
          subtitle="Accountability"
          subtitleGe="ანგარიშვალდებულება"
          description="A comprehensive registry of entities involved in political finance and state procurement—maintained for transparency and historical accountability."
          descriptionGe="პოლიტიკურ დაფინანსებასა და სახელმწიფო შესყიდვებში მონაწილე სუბიექტების ყოვლისმომცველი რეესტრი—გამჭვირვალობისა და ისტორიული ანგარიშვალდებულებისთვის."
          breadcrumbs={[
            { label: 'Forum for Justice', labelGe: 'სამართლიანობის ფორუმი', href: '/justice' },
          ]}
        />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl">
            {/* Stats bar */}
            {entities.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-navy/10">
                <div>
                  <p className="text-xs font-sans uppercase tracking-wider text-navy/50">
                    {isGeorgian ? 'სუბიექტები' : 'Entities'}
                  </p>
                  <p className="font-serif text-2xl text-navy">{stats.count}</p>
                </div>
                <div>
                  <p className="text-xs font-sans uppercase tracking-wider text-navy/50">
                    {isGeorgian ? 'შემოწირულობები' : 'Donations'}
                  </p>
                  <p className="font-serif text-2xl text-navy">{formatGel(stats.donations)} GEL</p>
                </div>
                <div>
                  <p className="text-xs font-sans uppercase tracking-wider text-navy/50">
                    {isGeorgian ? 'შესყიდვები' : 'Procurement'}
                  </p>
                  <p className="font-serif text-2xl text-navy">{formatGel(stats.procurement)} GEL</p>
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="space-y-4 mb-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
                <Input
                  type="text"
                  placeholder={isGeorgian ? 'ძიება სახელით, ორგანიზაციით...' : 'Search by name, organization...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-navy/20 focus:border-navy font-sans"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {/* Entity Type Filter */}
                {(Object.keys(ENTITY_TYPE_LABELS) as EntityTypeFilter[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setEntityTypeFilter(type)}
                    className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                      entityTypeFilter === type
                        ? 'bg-navy text-white'
                        : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
                    }`}
                  >
                    {isGeorgian
                      ? ENTITY_TYPE_LABELS[type].ge
                      : ENTITY_TYPE_LABELS[type].en}
                  </button>
                ))}
                <span className="w-px h-6 bg-navy/10 self-center mx-2" />
                {/* Severity Filter */}
                {(Object.keys(SEVERITY_LABELS) as SeverityFilter[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSeverityFilter(level)}
                    className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors ${
                      severityFilter === level
                        ? 'bg-navy text-white'
                        : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
                    }`}
                  >
                    {isGeorgian
                      ? SEVERITY_LABELS[level].ge
                      : SEVERITY_LABELS[level].en}
                  </button>
                ))}
              </div>
            </div>

            {/* Entity List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 text-navy/40 animate-spin" />
              </div>
            ) : filteredEntities.length === 0 ? (
              <div className="border border-navy/10 bg-navy/[0.02] p-8 text-center">
                <p className={`font-serif text-lg text-navy mb-2 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {searchQuery || entityTypeFilter !== 'all' || severityFilter !== 'all'
                    ? isGeorgian
                      ? 'შედეგები არ მოიძებნა'
                      : 'No results found'
                    : isGeorgian
                    ? 'რეესტრი ცარიელია'
                    : 'Registry is empty'}
                </p>
                <p className={`font-sans text-sm text-navy/60 ${isGeorgian ? 'font-georgian' : ''}`}>
                  {searchQuery || entityTypeFilter !== 'all' || severityFilter !== 'all'
                    ? isGeorgian
                      ? 'სცადეთ სხვა საძიებო ტერმინი ან ფილტრი'
                      : 'Try a different search term or filter'
                    : isGeorgian
                    ? 'მონაცემების ატვირთვისთვის გამოიყენეთ ქვემოთ მოცემული ფორმა'
                    : 'Use the upload form below to add data'}
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="divide-y divide-navy/10 border-y border-navy/10">
                {filteredEntities.map((entity) => (
                  <AccordionItem key={entity.id} value={entity.id} className="border-0">
                    <AccordionTrigger className="py-4 hover:no-underline group">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <EntityTypeIcon type={entity.entity_type} />
                          <span className={`font-serif text-lg text-navy text-left ${isGeorgian && entity.name_ge ? 'font-georgian' : ''}`}>
                            {isGeorgian && entity.name_ge ? entity.name_ge : entity.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {entity.organization && (
                            <span className="text-sm text-navy/40 font-sans hidden md:block">
                              {entity.organization}
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 text-xs font-sans uppercase tracking-wider ${
                              entity.severity === 'high'
                                ? 'bg-red-100 text-red-800'
                                : entity.severity === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {entity.severity}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ComplicityEntityCard entity={entity} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            {/* Results count */}
            {!isLoading && filteredEntities.length > 0 && (
              <p className="text-sm text-navy/40 font-sans mt-4">
                {isGeorgian
                  ? `ნაჩვენებია ${filteredEntities.length} სუბიექტი ${entities.length}-დან`
                  : `Showing ${filteredEntities.length} of ${entities.length} entities`}
              </p>
            )}

            {/* Admin Upload Section */}
            <div className="mt-16">
              <Collapsible open={showUploader} onOpenChange={setShowUploader}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-navy/40 hover:text-navy/60 transition-colors font-sans">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showUploader ? 'rotate-180' : ''}`}
                  />
                  {isGeorgian ? 'მონაცემების ატვირთვა' : 'Data Upload'}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-6">
                  <div>
                    <h4 className="text-sm font-sans font-medium text-navy mb-2">CSV Upload</h4>
                    <LedgerCSVUploader onUploadComplete={fetchEntities} />
                  </div>
                  <div className="border-t border-navy/10 pt-6">
                    <h4 className="text-sm font-sans font-medium text-navy mb-2">JSON Upload</h4>
                    <ComplicityUploader onUploadComplete={fetchEntities} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ComplicityIndex;
