// Dynamic Sitemap Generator - Creates XML and Markdown sitemaps from route config
import { routeConfig, RouteConfig, RouteCategory } from '@/config/routes';

const BASE_URL = 'https://blue-white-duo.lovable.app';

// Priority mapping by category and depth
const categoryPriority: Record<RouteCategory, number> = {
  'root': 0.9,
  'appeal': 0.8,
  'record': 0.8,
  'remedy': 0.8,
  'state-of-capture': 0.8,
  'rustaveli': 0.7,
  'about': 0.7,
  'legal': 0.4,
};

// Change frequency by category
const categoryFrequency: Record<RouteCategory, 'daily' | 'weekly' | 'monthly'> = {
  'root': 'weekly',
  'appeal': 'weekly',
  'record': 'weekly',
  'remedy': 'weekly',
  'state-of-capture': 'weekly',
  'rustaveli': 'monthly',
  'about': 'monthly',
  'legal': 'monthly',
};

// Category display names
const categoryLabels: Record<RouteCategory, { en: string; ge: string }> = {
  'root': { en: 'Root Level', ge: 'ძირითადი დონე' },
  'appeal': { en: 'Appeal Section', ge: 'აპელაციის განყოფილება' },
  'record': { en: 'The Record', ge: 'ჩანაწერი' },
  'remedy': { en: 'Remedy Section', ge: 'გამოსწორების განყოფილება' },
  'state-of-capture': { en: 'State of Capture', ge: 'ხელში ჩაგდების მდგომარეობა' },
  'rustaveli': { en: 'The Rustaveli Project', ge: 'რუსთაველის პროექტი' },
  'about': { en: 'About', ge: 'შესახებ' },
  'legal': { en: 'Legal & Compliance', ge: 'იურიდიული და შესაბამისობა' },
};

export interface SitemapEntry {
  path: string;
  label: string;
  labelGe: string;
  category: RouteCategory;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly';
  isDynamic: boolean;
  legacyPath?: string;
  depth: number;
}

/**
 * Get all static routes from the route config (excludes dynamic :param routes)
 */
export const getStaticRoutes = (): SitemapEntry[] => {
  const entries: SitemapEntry[] = [];
  
  Object.entries(routeConfig).forEach(([path, config]) => {
    // Skip dynamic routes with :param
    if (config.isDynamic) return;
    
    const depth = path.split('/').filter(Boolean).length;
    const basePriority = categoryPriority[config.category];
    // Reduce priority for deeper routes
    const priority = Math.max(0.3, basePriority - (depth * 0.1));
    
    entries.push({
      path: config.path,
      label: config.label,
      labelGe: config.labelGe,
      category: config.category,
      priority: Math.round(priority * 10) / 10,
      changefreq: categoryFrequency[config.category],
      isDynamic: false,
      legacyPath: config.legacyPath,
      depth,
    });
  });
  
  // Sort by priority (descending), then by path
  return entries.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.path.localeCompare(b.path);
  });
};

/**
 * Get routes grouped by category
 */
export const getRoutesByCategory = (): Record<RouteCategory, SitemapEntry[]> => {
  const routes = getStaticRoutes();
  const grouped: Record<RouteCategory, SitemapEntry[]> = {
    'root': [],
    'appeal': [],
    'record': [],
    'remedy': [],
    'state-of-capture': [],
    'rustaveli': [],
    'about': [],
    'legal': [],
  };
  
  routes.forEach(route => {
    grouped[route.category].push(route);
  });
  
  // Sort each category by path for consistent ordering
  Object.keys(grouped).forEach(category => {
    grouped[category as RouteCategory].sort((a, b) => a.path.localeCompare(b.path));
  });
  
  return grouped;
};

/**
 * Generate XML sitemap content
 */
export const generateSitemapXML = (): string => {
  const routes = getStaticRoutes();
  const lastmod = new Date().toISOString().split('T')[0];
  
  const urlEntries = routes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Generate Markdown sitemap content
 */
export const generateSitemapMarkdown = (): string => {
  const routesByCategory = getRoutesByCategory();
  const routes = getStaticRoutes();
  const lastmod = new Date().toISOString().split('T')[0];
  
  let markdown = `# Sitemap - The Council for Constitutional Governance

**Last updated:** ${lastmod}  
**Total routes:** ${routes.length} static pages  
**Base URL:** ${BASE_URL}

---

`;
  
  // Order categories logically
  const categoryOrder: RouteCategory[] = [
    'root',
    'appeal',
    'record',
    'remedy',
    'state-of-capture',
    'rustaveli',
    'about',
    'legal',
  ];
  
  categoryOrder.forEach(category => {
    const categoryRoutes = routesByCategory[category];
    if (categoryRoutes.length === 0) return;
    
    const labels = categoryLabels[category];
    markdown += `## ${labels.en}

| Route | Label (EN / GE) | Priority | Frequency |
|-------|-----------------|----------|-----------|
`;
    
    categoryRoutes.forEach(route => {
      const legacyNote = route.legacyPath ? ` *(was: ${route.legacyPath})*` : '';
      markdown += `| \`${route.path}\` | ${route.label} / ${route.labelGe}${legacyNote} | ${route.priority.toFixed(1)} | ${route.changefreq} |\n`;
    });
    
    markdown += '\n---\n\n';
  });
  
  markdown += `## Notes

- Priority scale: 1.0 (highest) to 0.3 (lowest)
- Frequency indicates expected content update cadence
- All routes support bilingual content (English/Georgian)
- Routes are SEO-optimized with proper meta tags and structured data
- Legacy paths shown in italics redirect to new locations (301)
- This sitemap is auto-generated from the route configuration
`;
  
  return markdown;
};

/**
 * Get sitemap statistics
 */
export const getSitemapStats = () => {
  const routes = getStaticRoutes();
  const routesByCategory = getRoutesByCategory();
  
  return {
    totalRoutes: routes.length,
    byCategory: Object.entries(routesByCategory).map(([category, categoryRoutes]) => ({
      category: category as RouteCategory,
      label: categoryLabels[category as RouteCategory].en,
      count: categoryRoutes.length,
    })).filter(c => c.count > 0),
    lastUpdated: new Date().toISOString().split('T')[0],
  };
};

/**
 * Download generated XML sitemap
 */
export const downloadGeneratedSitemapXML = (): void => {
  const content = generateSitemapXML();
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `sitemap-${new Date().toISOString().split('T')[0]}.xml`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  URL.revokeObjectURL(url);
};

/**
 * Download generated Markdown sitemap
 */
export const downloadGeneratedSitemapMD = (): void => {
  const content = generateSitemapMarkdown();
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `sitemap-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  URL.revokeObjectURL(url);
};
