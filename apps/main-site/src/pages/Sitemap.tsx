import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { InstitutionalPageHeader } from '@/components/institutional';
import { sitemapContent, RouteStatus } from '@/data/sitemapContent';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  ExternalLink,
  Code2,
  Copy,
  Filter,
  ChevronDown,
  ChevronRight,
  Globe,
  Link2,
  Unlink,
  ArrowRight,
  LayoutGrid,
  List,
  AlertTriangle,
  GitBranch,
  FileDown,
  Palette,
  BookOpen,
  Loader2,
  FileCode,
  FileText,
  Braces,
  Network,
  Share2
} from 'lucide-react';
import { downloadDesignSystem, downloadTechnicalManifest, downloadCCGDesignSystem, downloadCCGTokensJSON, downloadCCGTokensCSS } from '@/lib/contentExport';
import { downloadGeneratedSitemapXML, downloadGeneratedSitemapMD, getSitemapStats } from '@/lib/sitemapGenerator';
import { downloadNavigationGraphMD, downloadNavigationGraphMermaid, getNavigationGraphStats } from '@/lib/navigationGraphGenerator';
import { ContentExportButton } from '@/components/admin/ContentExportButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from 'sonner';
import { RouteTree } from '@/components/sitemap/RouteTree';

const statusConfig: Record<RouteStatus, { icon: React.ElementType; color: string; label: string; bg: string }> = {
  active: { icon: CheckCircle2, color: 'text-emerald-600', label: 'Active', bg: 'bg-emerald-50 border-emerald-200' },
  orphan: { icon: Unlink, color: 'text-amber-600', label: 'Orphan', bg: 'bg-amber-50 border-amber-200' },
  dev: { icon: Code2, color: 'text-slate-500', label: 'Dev', bg: 'bg-slate-50 border-slate-200' },
  duplicate: { icon: Copy, color: 'text-orange-600', label: 'Duplicate', bg: 'bg-orange-50 border-orange-200' },
  external: { icon: ExternalLink, color: 'text-blue-600', label: 'External', bg: 'bg-blue-50 border-blue-200' },
};

const severityConfig = {
  high: { color: 'text-red-700 bg-red-50 border-red-200', icon: XCircle },
  medium: { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertCircle },
  low: { color: 'text-slate-600 bg-slate-50 border-slate-200', icon: AlertTriangle },
};

const Sitemap: React.FC = () => {
  const { isGeorgian, getLocalizedPath } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<RouteStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'tree' | 'hierarchy'>('hierarchy');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Forum for Justice', 'The Council']);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleDownloadDesignSystem = async () => {
    setIsDownloading('design');
    try {
      await downloadDesignSystem();
      toast.success('Design System downloaded');
    } catch (error) {
      toast.error('Failed to download Design System');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadTechnicalManifest = async () => {
    setIsDownloading('manifest');
    try {
      await downloadTechnicalManifest();
      toast.success('Technical Manifest downloaded');
    } catch (error) {
      toast.error('Failed to download Technical Manifest');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadCCGDesignSystem = async () => {
    setIsDownloading('ccg-design');
    try {
      await downloadCCGDesignSystem();
      toast.success('CCG Design System downloaded');
    } catch (error) {
      toast.error('Failed to download CCG Design System');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadCCGTokensJSON = async () => {
    setIsDownloading('tokens-json');
    try {
      await downloadCCGTokensJSON();
      toast.success('Design Tokens (JSON) downloaded');
    } catch (error) {
      toast.error('Failed to download Design Tokens (JSON)');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadCCGTokensCSS = async () => {
    setIsDownloading('tokens-css');
    try {
      await downloadCCGTokensCSS();
      toast.success('Design Tokens (CSS) downloaded');
    } catch (error) {
      toast.error('Failed to download Design Tokens (CSS)');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadSitemapXML = () => {
    setIsDownloading('sitemap-xml');
    try {
      downloadGeneratedSitemapXML();
      toast.success('Sitemap XML generated and downloaded');
    } catch (error) {
      toast.error('Failed to generate Sitemap XML');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadSitemapMD = () => {
    setIsDownloading('sitemap-md');
    try {
      downloadGeneratedSitemapMD();
      toast.success('Sitemap Markdown generated and downloaded');
    } catch (error) {
      toast.error('Failed to generate Sitemap Markdown');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadNavigationGraphMD = () => {
    setIsDownloading('nav-graph-md');
    try {
      downloadNavigationGraphMD();
      toast.success('Navigation Graph (Markdown) downloaded');
    } catch (error) {
      toast.error('Failed to generate Navigation Graph');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadNavigationGraphMermaid = () => {
    setIsDownloading('nav-graph-mermaid');
    try {
      downloadNavigationGraphMermaid();
      toast.success('Navigation Graph (Mermaid) downloaded');
    } catch (error) {
      toast.error('Failed to generate Mermaid diagram');
    } finally {
      setIsDownloading(null);
    }
  };

  const sitemapStats = getSitemapStats();
  const navGraphStats = getNavigationGraphStats();

  const getText = (en: string, ge: string) => isGeorgian ? ge : en;

  const filteredRoutes = useMemo(() => {
    if (activeFilter === 'all') return sitemapContent.routes;
    return sitemapContent.routes.filter(r => r.status === activeFilter);
  }, [activeFilter]);

  const routesByCategory = useMemo(() => {
    const grouped: Record<string, typeof sitemapContent.routes> = {};
    filteredRoutes.forEach(route => {
      if (!grouped[route.category]) grouped[route.category] = [];
      grouped[route.category].push(route);
    });
    return grouped;
  }, [filteredRoutes]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const copyRoutesAsJson = () => {
    navigator.clipboard.writeText(JSON.stringify(sitemapContent.routes, null, 2));
    toast.success('Routes copied to clipboard');
  };

  const StatusBadge = ({ status }: { status: RouteStatus }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded border', config.bg, config.color)}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const LinkIndicator = ({ linked, label }: { linked: boolean; label: string }) => (
    <span className={cn(
      'inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono rounded',
      linked ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
    )}>
      {linked ? <Link2 className="w-2.5 h-2.5" /> : <Unlink className="w-2.5 h-2.5" />}
      {label}
    </span>
  );

  return (
    <Layout>
      <article className="min-h-screen bg-slate-50 border-t-2 border-navy">
        <InstitutionalPageHeader
          title="Site Architecture"
          titleGe="საიტის არქიტექტურა"
          subtitle="Internal Route Map"
          subtitleGe="შიდა მარშრუტის რუკა"
          description={
            <span className="block max-w-3xl font-mono text-sm">
              {getText(sitemapContent.meta.description, sitemapContent.meta.descriptionGe)}
            </span>
          }
          breadcrumbs={[
            { label: 'Architecture', labelGe: 'არქიტექტურა' }
          ]}
        />

        {/* Stats Bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-6 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Total:</span>
                <span className="font-semibold text-navy">{sitemapContent.stats.totalRoutes}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-500">Active:</span>
                <span className="font-semibold text-emerald-700">{sitemapContent.stats.activeRoutes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Unlink className="w-4 h-4 text-amber-600" />
                <span className="text-slate-500">Orphan:</span>
                <span className="font-semibold text-amber-700">{sitemapContent.stats.orphanRoutes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-500" />
                <span className="text-slate-500">Dev:</span>
                <span className="font-semibold text-slate-600">{sitemapContent.stats.devRoutes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-slate-500">External:</span>
                <span className="font-semibold text-blue-700">{sitemapContent.stats.externalLinks}</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-slate-400 text-xs">Audit: {sitemapContent.meta.lastAudit}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content - Route Registry */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600 font-medium">Filter:</span>
                  <div className="flex gap-1">
                    {(['all', 'active', 'orphan', 'dev', 'duplicate'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setActiveFilter(status)}
                        className={cn(
                          'px-3 py-1 text-xs font-mono rounded transition-colors',
                          activeFilter === status 
                            ? 'bg-navy text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                      >
                        {status === 'all' ? 'All' : statusConfig[status].label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('hierarchy')}
                    className={cn('p-2 rounded', viewMode === 'hierarchy' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600')}
                    title="Nested Route Hierarchy"
                  >
                    <GitBranch className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={cn('p-2 rounded', viewMode === 'table' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600')}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('tree')}
                    className={cn('p-2 rounded', viewMode === 'tree' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600')}
                    title="Category Tree"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <Button variant="outline" size="sm" onClick={copyRoutesAsJson} className="ml-2">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy JSON
                  </Button>
                </div>
              </div>

              {/* New Nested Route Hierarchy View */}
              {viewMode === 'hierarchy' ? (
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    {getText('Nested URL Hierarchy', 'ჩადგმული URL იერარქია')}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">
                    {getText(
                      'Interactive visualization of the new nested route structure. Click folders to expand/collapse.',
                      'ახალი ჩადგმული მარშრუტის სტრუქტურის ინტერაქტიული ვიზუალიზაცია. დააწკაპუნეთ საქაღალდეებზე გასაშლელად/დასაკეცად.'
                    )}
                  </p>
                  <RouteTree />
                </div>
              ) : viewMode === 'tree' ? (
                <div className="space-y-3">
                  {Object.entries(routesByCategory).map(([category, routes]) => (
                    <Collapsible 
                      key={category}
                      open={expandedCategories.includes(category)}
                      onOpenChange={() => toggleCategory(category)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                          <div className="flex items-center gap-3">
                            {expandedCategories.includes(category) ? (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-500" />
                            )}
                            <span className="font-medium text-navy">{category}</span>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {routes.length}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            {routes.filter(r => r.status === 'active').length > 0 && (
                              <span className="text-xs text-emerald-600">{routes.filter(r => r.status === 'active').length} active</span>
                            )}
                            {routes.filter(r => r.status === 'orphan').length > 0 && (
                              <span className="text-xs text-amber-600">{routes.filter(r => r.status === 'orphan').length} orphan</span>
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-200 pl-4">
                          {routes.map(route => (
                            <div 
                              key={route.path}
                              className={cn(
                                'flex items-center justify-between p-3 rounded-md bg-white border',
                                route.status === 'orphan' && 'border-amber-200 bg-amber-50/50',
                                route.status === 'dev' && 'border-slate-200 bg-slate-50/50',
                                route.status === 'active' && 'border-slate-200',
                                route.status === 'duplicate' && 'border-orange-200 bg-orange-50/50'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <code className="text-sm font-mono text-navy">{route.path}</code>
                                <StatusBadge status={route.status} />
                              </div>
                              <div className="flex items-center gap-2">
                                <LinkIndicator linked={route.linkedInHeader} label="H" />
                                <LinkIndicator linked={route.linkedInFooter} label="F" />
                                {route.status !== 'dev' && route.status !== 'duplicate' && (
                                  <Link 
                                    to={getLocalizedPath(route.path)}
                                    className="p-1 text-slate-400 hover:text-navy transition-colors"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              ) : (
                /* Table View */
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="text-left p-3 font-mono font-medium text-slate-600">Path</th>
                          <th className="text-left p-3 font-mono font-medium text-slate-600">Category</th>
                          <th className="text-left p-3 font-mono font-medium text-slate-600">Status</th>
                          <th className="text-center p-3 font-mono font-medium text-slate-600">Nav</th>
                          <th className="text-left p-3 font-mono font-medium text-slate-600">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRoutes.map(route => (
                          <tr 
                            key={route.path}
                            className={cn(
                              'hover:bg-slate-50 transition-colors',
                              route.status === 'orphan' && 'bg-amber-50/30',
                              route.status === 'dev' && 'bg-slate-50/50 text-slate-500',
                              route.status === 'duplicate' && 'bg-orange-50/30'
                            )}
                          >
                            <td className="p-3">
                              <code className="text-navy font-mono">{route.path}</code>
                            </td>
                            <td className="p-3 text-slate-600">{route.category}</td>
                            <td className="p-3">
                              <StatusBadge status={route.status} />
                            </td>
                            <td className="p-3">
                              <div className="flex justify-center gap-1">
                                <LinkIndicator linked={route.linkedInHeader} label="H" />
                                <LinkIndicator linked={route.linkedInFooter} label="F" />
                              </div>
                            </td>
                            <td className="p-3 text-xs text-slate-500">{route.notes || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Issues & External Links */}
            <div className="space-y-6">

              {/* Documentation Exports Panel */}
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-navy flex items-center gap-2">
                    <FileDown className="w-4 h-4 text-navy" />
                    {getText('Documentation Exports', 'დოკუმენტაციის ექსპორტი')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {getText('Download technical specifications for design audits', 'ჩამოტვირთეთ ტექნიკური სპეციფიკაციები დიზაინის აუდიტისთვის')}
                  </p>
                </div>
                <div className="p-4 space-y-2">
                  
                  {/* Design Tokens Section */}
                  <div className="pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {getText('Design Tokens', 'დიზაინის ტოკენები')}
                    </span>
                  </div>

                  {/* CCG Tokens JSON */}
                  <button
                    onClick={handleDownloadCCGTokensJSON}
                    disabled={isDownloading === 'tokens-json'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-slate-200 hover:border-navy hover:bg-slate-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'tokens-json' ? (
                      <Loader2 className="w-4 h-4 text-navy animate-spin" />
                    ) : (
                      <Braces className="w-4 h-4 text-navy" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-navy">
                        {getText('Design Tokens (JSON)', 'დიზაინის ტოკენები (JSON)')}
                      </span>
                      <span className="block text-xs text-slate-500 font-mono">ccg.tokens.json</span>
                    </div>
                  </button>

                  {/* CCG Tokens CSS */}
                  <button
                    onClick={handleDownloadCCGTokensCSS}
                    disabled={isDownloading === 'tokens-css'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-slate-200 hover:border-navy hover:bg-slate-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'tokens-css' ? (
                      <Loader2 className="w-4 h-4 text-navy animate-spin" />
                    ) : (
                      <FileCode className="w-4 h-4 text-navy" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-navy">
                        {getText('Design Tokens (CSS)', 'დიზაინის ტოკენები (CSS)')}
                      </span>
                      <span className="block text-xs text-slate-500 font-mono">ccg.tokens.css</span>
                    </div>
                  </button>

                  {/* CCG Design System Markdown */}
                  <button
                    onClick={handleDownloadCCGDesignSystem}
                    disabled={isDownloading === 'ccg-design'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-slate-200 hover:border-navy hover:bg-slate-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'ccg-design' ? (
                      <Loader2 className="w-4 h-4 text-navy animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4 text-navy" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-navy">
                        {getText('Design System (Markdown)', 'დიზაინის სისტემა (Markdown)')}
                      </span>
                      <span className="block text-xs text-slate-500 font-mono">ccg-design-system.md</span>
                    </div>
                  </button>

                  {/* Legacy Documentation Section */}
                  <div className="pt-3 pb-2 mt-3 mb-2 border-t border-slate-100">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {getText('Legacy Documentation', 'ლეგასი დოკუმენტაცია')}
                    </span>
                  </div>
                  
                  {/* Design System (legacy) */}
                  <button
                    onClick={handleDownloadDesignSystem}
                    disabled={isDownloading === 'design'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-slate-200 hover:border-navy hover:bg-slate-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'design' ? (
                      <Loader2 className="w-4 h-4 text-navy animate-spin" />
                    ) : (
                      <Palette className="w-4 h-4 text-slate-400" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-slate-600">
                        {getText('Design System (Legacy)', 'დიზაინის სისტემა (ლეგასი)')}
                      </span>
                      <span className="block text-xs text-slate-500 font-mono">design-system.md</span>
                    </div>
                  </button>
                  
                  {/* Technical Manifest */}
                  <button
                    onClick={handleDownloadTechnicalManifest}
                    disabled={isDownloading === 'manifest'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-slate-200 hover:border-navy hover:bg-slate-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'manifest' ? (
                      <Loader2 className="w-4 h-4 text-navy animate-spin" />
                    ) : (
                      <BookOpen className="w-4 h-4 text-slate-400" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-slate-600">
                        {getText('Technical Manifest', 'ტექნიკური მანიფესტი')}
                      </span>
                      <span className="block text-xs text-slate-500 font-mono">technical-manifest.md</span>
                    </div>
                  </button>

                  {/* SEO Files Section - Auto-Generated */}
                  <div className="pt-3 pb-2 mt-3 mb-2 border-t border-slate-100">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {getText('SEO & Indexing', 'SEO და ინდექსაცია')}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-mono mt-1">
                      {getText(`Auto-generated from ${sitemapStats.totalRoutes} routes`, `ავტომატურად გენერირებული ${sitemapStats.totalRoutes} მარშრუტიდან`)}
                    </span>
                  </div>

                  {/* Sitemap XML - Dynamic */}
                  <button
                    onClick={handleDownloadSitemapXML}
                    disabled={isDownloading === 'sitemap-xml'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'sitemap-xml' ? (
                      <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    ) : (
                      <Globe className="w-4 h-4 text-emerald-600" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-emerald-700">
                        {getText('Sitemap XML', 'საიტის რუკა XML')}
                      </span>
                      <span className="block text-xs text-emerald-600 font-mono">
                        {getText('Generated from route config', 'გენერირებული მარშრუტის კონფიგურაციიდან')}
                      </span>
                    </div>
                  </button>

                  {/* Sitemap Markdown - Dynamic */}
                  <button
                    onClick={handleDownloadSitemapMD}
                    disabled={isDownloading === 'sitemap-md'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-emerald-200 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'sitemap-md' ? (
                      <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4 text-emerald-600" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-emerald-700">
                        {getText('Sitemap Markdown', 'საიტის რუკა Markdown')}
                      </span>
                      <span className="block text-xs text-emerald-600 font-mono">
                        {getText('Human-readable with bilingual labels', 'ორენოვანი ეტიკეტებით')}
                      </span>
                    </div>
                  </button>

                  {/* Navigation Graph Section */}
                  <div className="pt-3 pb-2 mt-3 mb-2 border-t border-slate-100">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {getText('Navigation Graph', 'ნავიგაციის გრაფი')}
                    </span>
                    <span className="block text-[10px] text-purple-600 font-mono mt-1">
                      {getText(`${navGraphStats.totalEdges} edges across ${navGraphStats.totalNodes} pages`, `${navGraphStats.totalEdges} კავშირი ${navGraphStats.totalNodes} გვერდზე`)}
                    </span>
                  </div>

                  {/* Navigation Graph Markdown */}
                  <button
                    onClick={handleDownloadNavigationGraphMD}
                    disabled={isDownloading === 'nav-graph-md'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-purple-200 bg-purple-50/50 hover:border-purple-400 hover:bg-purple-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'nav-graph-md' ? (
                      <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                    ) : (
                      <Network className="w-4 h-4 text-purple-600" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-purple-700">
                        {getText('Navigation Graph (Markdown)', 'ნავიგაციის გრაფი (Markdown)')}
                      </span>
                      <span className="block text-xs text-purple-600 font-mono">
                        {getText('Complete topology with stats', 'სრული ტოპოლოგია სტატისტიკით')}
                      </span>
                    </div>
                  </button>

                  {/* Navigation Graph Mermaid */}
                  <button
                    onClick={handleDownloadNavigationGraphMermaid}
                    disabled={isDownloading === 'nav-graph-mermaid'}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-purple-200 bg-purple-50/50 hover:border-purple-400 hover:bg-purple-50 transition-colors text-left disabled:opacity-50"
                  >
                    {isDownloading === 'nav-graph-mermaid' ? (
                      <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                    ) : (
                      <Share2 className="w-4 h-4 text-purple-600" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="block font-medium text-sm text-purple-700">
                        {getText('Navigation Graph (Mermaid)', 'ნავიგაციის გრაფი (Mermaid)')}
                      </span>
                      <span className="block text-xs text-purple-600 font-mono">
                        {getText('Flowchart diagram syntax', 'ფლოუჩარტის დიაგრამის სინტაქსი')}
                      </span>
                    </div>
                  </button>

                  {/* Content JSON */}
                  <div className="pt-3 border-t border-slate-100">
                    <ContentExportButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start gap-3 h-auto py-3 px-3 font-normal"
                    />
                  </div>
                </div>
              </div>
              
              {/* Issues Panel */}
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-navy flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Architecture Issues
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {sitemapContent.issues.map((issue, idx) => {
                    const config = severityConfig[issue.severity];
                    const Icon = config.icon;
                    return (
                      <div key={idx} className="p-4">
                        <div className="flex items-start gap-3">
                          <Icon className={cn('w-4 h-4 mt-0.5', config.color.split(' ')[0])} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn('text-xs font-mono px-2 py-0.5 rounded border', config.color)}>
                                {issue.severity.toUpperCase()}
                              </span>
                              <span className="text-xs text-slate-500 capitalize">{issue.type.replace('-', ' ')}</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{issue.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {issue.paths.slice(0, 5).map(path => (
                                <code key={path} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                                  {path}
                                </code>
                              ))}
                              {issue.paths.length > 5 && (
                                <span className="text-[10px] text-slate-400">+{issue.paths.length - 5} more</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* External Domains */}
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-navy flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    External Subdomains
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {['forum', 'integrity', 'capture', 'iimg', 'rustaveli'].map(subdomain => {
                    const links = sitemapContent.externalLinks.filter(l => l.subdomain === subdomain);
                    return (
                      <div key={subdomain} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3 text-blue-500" />
                          <code className="text-xs font-mono text-blue-700">{subdomain}.sabcho.org</code>
                          <Badge variant="secondary" className="text-[10px]">{links.length}</Badge>
                        </div>
                        <div className="ml-5 space-y-0.5">
                          {links.map(link => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs text-slate-500 hover:text-navy truncate"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Audit */}
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-navy flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-slate-600" />
                    Navigation Structure
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Header</span>
                    <div className="mt-2 space-y-2">
                      {sitemapContent.navigationStructure.header.categories.map(cat => (
                        <div key={cat.label} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{cat.label}</span>
                          <Badge variant="outline" className="font-mono text-xs">
                            {cat.links.length} links
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Footer</span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {sitemapContent.navigationStructure.footer.columns.map(col => (
                        <div key={col.label} className="text-xs">
                          <span className="text-slate-600">{col.label}</span>
                          <span className="text-slate-400 ml-1">({col.linkCount})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Sitemap;
