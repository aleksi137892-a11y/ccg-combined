// Navigation Graph Generator
// Builds a complete navigation topology from all navigation sources

import { routeConfig } from '@/config/routes';
import { 
  EdgeType,
  HEADER_NAV_DATA,
  FOOTER_ACTION_STRIP,
  FOOTER_TRUST_BAR,
  FOOTER_MAIN_COLUMNS,
  FOOTER_LEGAL_LINKS,
  PROGRAM_NAV_LINKS,
  EXTERNAL_LINKS,
  IN_PAGE_CTAS,
} from '@/data/navigationData';

// ============================================================================
// TYPES
// ============================================================================

export interface NavigationEdge {
  from: string;
  to: string;
  type: EdgeType;
  label: string;
  labelGe: string;
  context?: string;
  isExternal?: boolean;
}

export interface NavigationNode {
  path: string;
  label: string;
  labelGe: string;
  inbound: NavigationEdge[];
  outbound: NavigationEdge[];
}

export interface NavigationGraph {
  nodes: Map<string, NavigationNode>;
  edges: NavigationEdge[];
  stats: GraphStats;
}

export interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  edgesByType: Record<EdgeType, number>;
  mostConnected: Array<{ path: string; inbound: number; outbound: number; total: number }>;
  orphanPages: string[];
  externalLinks: number;
}

// ============================================================================
// EDGE EXTRACTION FUNCTIONS
// ============================================================================

/**
 * Extract edges from header navigation
 * Each link in the mega-menu represents an edge from the home page AND from the category landing
 */
function extractHeaderEdges(): NavigationEdge[] {
  const edges: NavigationEdge[] = [];
  
  HEADER_NAV_DATA.forEach(category => {
    // Category label links to landing page (from home)
    if (category.href) {
      edges.push({
        from: '/',
        to: category.href,
        type: 'header',
        label: category.label,
        labelGe: category.labelGe,
        context: 'Header nav category'
      });
    }
    
    // Each section link is accessible from header (from /)
    category.sections.forEach(section => {
      section.links.forEach(link => {
        // Skip external links
        if (link.href.startsWith('http')) return;
        
        edges.push({
          from: '/',
          to: link.href.split('#')[0], // Remove anchor
          type: 'header',
          label: link.label,
          labelGe: link.labelGe,
          context: `${category.label} > ${section.heading}`
        });
      });
    });
  });
  
  return edges;
}

/**
 * Extract edges from footer navigation
 */
function extractFooterEdges(): NavigationEdge[] {
  const edges: NavigationEdge[] = [];
  
  // Action strip
  edges.push({
    from: '/',
    to: FOOTER_ACTION_STRIP.primary.href,
    type: 'footer-action',
    label: FOOTER_ACTION_STRIP.primary.label,
    labelGe: FOOTER_ACTION_STRIP.primary.labelGe,
    context: 'Footer action strip primary'
  });
  
  FOOTER_ACTION_STRIP.secondary.forEach(item => {
    edges.push({
      from: '/',
      to: item.href,
      type: 'footer-action',
      label: item.label,
      labelGe: item.labelGe,
      context: 'Footer action strip secondary'
    });
  });
  
  edges.push({
    from: '/',
    to: FOOTER_ACTION_STRIP.link.href.split('#')[0],
    type: 'footer-action',
    label: FOOTER_ACTION_STRIP.link.label,
    labelGe: FOOTER_ACTION_STRIP.link.labelGe,
    context: 'Footer action strip link'
  });
  
  // Trust bar
  FOOTER_TRUST_BAR.forEach(item => {
    edges.push({
      from: '/',
      to: item.href.split('#')[0],
      type: 'footer-trust',
      label: item.label,
      labelGe: item.labelGe,
      context: 'Footer trust bar'
    });
  });
  
  // Main columns
  FOOTER_MAIN_COLUMNS.forEach(column => {
    column.links.forEach(link => {
      edges.push({
        from: '/',
        to: link.href.split('#')[0],
        type: 'footer-column',
        label: link.label,
        labelGe: link.labelGe,
        context: `Footer > ${column.heading}`
      });
    });
  });
  
  // Legal links
  FOOTER_LEGAL_LINKS.forEach(item => {
    edges.push({
      from: '/',
      to: item.href,
      type: 'footer-legal',
      label: item.label,
      labelGe: item.labelGe,
      context: 'Footer legal links'
    });
  });
  
  return edges;
}

/**
 * Extract breadcrumb edges from route config (parent-child relationships)
 */
function extractBreadcrumbEdges(): NavigationEdge[] {
  const edges: NavigationEdge[] = [];
  
  Object.entries(routeConfig).forEach(([path, config]) => {
    if (config.isDynamic) return;
    
    // Parent → Child (sibling navigation from parent page)
    if (config.children) {
      config.children.forEach(childPath => {
        const childConfig = routeConfig[childPath];
        if (childConfig && !childConfig.isDynamic) {
          edges.push({
            from: path,
            to: childPath,
            type: 'sibling',
            label: childConfig.label,
            labelGe: childConfig.labelGe,
            context: `Parent links to child`
          });
        }
      });
    }
    
    // Child → Parent (breadcrumb navigation up)
    if (config.parent) {
      const parentConfig = routeConfig[config.parent];
      if (parentConfig) {
        edges.push({
          from: path,
          to: config.parent,
          type: 'breadcrumb',
          label: parentConfig.label,
          labelGe: parentConfig.labelGe,
          context: 'Breadcrumb to parent'
        });
      }
    }
  });
  
  return edges;
}

/**
 * Extract program nav edges (cross-linking between hubs)
 * These appear on each program hub page
 */
function extractProgramNavEdges(): NavigationEdge[] {
  const edges: NavigationEdge[] = [];
  const programPaths = PROGRAM_NAV_LINKS.map(p => p.href);
  
  // Each program hub links to all other program hubs
  programPaths.forEach(fromPath => {
    PROGRAM_NAV_LINKS.forEach(link => {
      if (link.href !== fromPath) {
        edges.push({
          from: fromPath,
          to: link.href,
          type: 'program-nav',
          label: link.label,
          labelGe: link.labelGe,
          context: 'Program navigation bar'
        });
      }
    });
  });
  
  return edges;
}

/**
 * Extract in-page CTA edges
 */
function extractInPageCTAEdges(): NavigationEdge[] {
  return IN_PAGE_CTAS.map(cta => ({
    from: cta.fromPage,
    to: cta.toPage,
    type: 'in-page-cta' as EdgeType,
    label: cta.label,
    labelGe: cta.labelGe,
    context: cta.context
  }));
}

/**
 * Extract external link edges
 */
function extractExternalEdges(): NavigationEdge[] {
  return EXTERNAL_LINKS.map(link => ({
    from: '/justice', // Featured in justice menu
    to: link.href,
    type: 'external' as EdgeType,
    label: link.label,
    labelGe: link.labelGe,
    context: link.context,
    isExternal: true
  }));
}

// ============================================================================
// GRAPH BUILDER
// ============================================================================

/**
 * Build the complete navigation graph
 */
export function buildNavigationGraph(): NavigationGraph {
  // Collect all edges from all sources
  const allEdges: NavigationEdge[] = [
    ...extractHeaderEdges(),
    ...extractFooterEdges(),
    ...extractBreadcrumbEdges(),
    ...extractProgramNavEdges(),
    ...extractInPageCTAEdges(),
    ...extractExternalEdges(),
  ];
  
  // Build nodes map
  const nodes = new Map<string, NavigationNode>();
  
  // Initialize nodes from route config
  Object.entries(routeConfig).forEach(([path, config]) => {
    if (!config.isDynamic) {
      nodes.set(path, {
        path,
        label: config.label,
        labelGe: config.labelGe,
        inbound: [],
        outbound: [],
      });
    }
  });
  
  // Process edges and attach to nodes
  allEdges.forEach(edge => {
    // Add to source node's outbound
    const sourceNode = nodes.get(edge.from);
    if (sourceNode) {
      sourceNode.outbound.push(edge);
    }
    
    // Add to target node's inbound (skip external)
    if (!edge.isExternal) {
      const targetNode = nodes.get(edge.to);
      if (targetNode) {
        targetNode.inbound.push(edge);
      }
    }
  });
  
  // Calculate stats
  const edgesByType: Record<EdgeType, number> = {
    'header': 0,
    'footer-column': 0,
    'footer-trust': 0,
    'footer-legal': 0,
    'footer-action': 0,
    'breadcrumb': 0,
    'sibling': 0,
    'program-nav': 0,
    'in-page-cta': 0,
    'external': 0,
  };
  
  allEdges.forEach(edge => {
    edgesByType[edge.type]++;
  });
  
  // Find most connected pages
  const connectivity = Array.from(nodes.values())
    .map(node => ({
      path: node.path,
      inbound: node.inbound.length,
      outbound: node.outbound.length,
      total: node.inbound.length + node.outbound.length,
    }))
    .sort((a, b) => b.total - a.total);
  
  // Find orphan pages (no inbound links except from header/footer)
  const orphanPages = Array.from(nodes.values())
    .filter(node => {
      // Ignore homepage
      if (node.path === '/') return false;
      // Check if has any non-global inbound links
      const nonGlobalInbound = node.inbound.filter(e => 
        e.type !== 'header' && 
        e.type !== 'footer-column' && 
        e.type !== 'footer-trust' &&
        e.type !== 'footer-legal' &&
        e.type !== 'footer-action'
      );
      return nonGlobalInbound.length === 0;
    })
    .map(n => n.path);
  
  return {
    nodes,
    edges: allEdges,
    stats: {
      totalNodes: nodes.size,
      totalEdges: allEdges.length,
      edgesByType,
      mostConnected: connectivity.slice(0, 10),
      orphanPages,
      externalLinks: allEdges.filter(e => e.isExternal).length,
    },
  };
}

// ============================================================================
// EXPORT GENERATORS
// ============================================================================

/**
 * Generate Markdown representation of the navigation graph
 */
export function generateGraphMarkdown(): string {
  const graph = buildNavigationGraph();
  const { nodes, stats } = graph;
  const lastmod = new Date().toISOString().split('T')[0];
  
  let md = `# Navigation Graph - The Council for Constitutional Governance

**Generated:** ${lastmod}  
**Total Nodes:** ${stats.totalNodes} pages  
**Total Edges:** ${stats.totalEdges} navigation links  
**External Links:** ${stats.externalLinks}

---

## Edge Summary by Type

| Type | Count | % of Total |
|------|-------|------------|
`;
  
  const edgeTypes = Object.entries(stats.edgesByType)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  
  edgeTypes.forEach(([type, count]) => {
    const pct = ((count / stats.totalEdges) * 100).toFixed(1);
    md += `| \`${type}\` | ${count} | ${pct}% |\n`;
  });
  
  md += `
---

## Most Connected Pages (Top 10)

| Page | Inbound | Outbound | Total |
|------|---------|----------|-------|
`;
  
  stats.mostConnected.forEach(item => {
    const node = nodes.get(item.path);
    const label = node ? node.label : item.path;
    md += `| \`${item.path}\` (${label}) | ${item.inbound} | ${item.outbound} | ${item.total} |\n`;
  });
  
  if (stats.orphanPages.length > 0) {
    md += `
---

## Pages Without Deep Links

These pages are only linked from global navigation (header/footer), not from page content:

`;
    stats.orphanPages.forEach(path => {
      const node = nodes.get(path);
      const label = node ? node.label : path;
      md += `- \`${path}\` — ${label}\n`;
    });
  }
  
  md += `
---

## Full Navigation Map

`;
  
  // Group by category for cleaner output
  const categories = new Map<string, NavigationNode[]>();
  nodes.forEach(node => {
    const category = node.path.split('/')[1] || 'root';
    if (!categories.has(category)) categories.set(category, []);
    categories.get(category)!.push(node);
  });
  
  categories.forEach((categoryNodes, category) => {
    md += `### ${category === 'root' ? 'Root Level' : '/' + category}\n\n`;
    
    categoryNodes.sort((a, b) => a.path.localeCompare(b.path)).forEach(node => {
      md += `#### \`${node.path}\` — ${node.label}\n\n`;
      
      if (node.outbound.length > 0) {
        md += `**Outbound Links (${node.outbound.length}):**\n\n`;
        md += `| To | Type | Label |\n|---|------|-------|\n`;
        node.outbound.slice(0, 15).forEach(edge => {
          md += `| \`${edge.to}\` | ${edge.type} | ${edge.label} |\n`;
        });
        if (node.outbound.length > 15) {
          md += `| ... | | +${node.outbound.length - 15} more |\n`;
        }
        md += '\n';
      }
      
      if (node.inbound.length > 0) {
        md += `**Inbound Links (${node.inbound.length}):**\n\n`;
        md += `| From | Type | Label |\n|-----|------|-------|\n`;
        node.inbound.slice(0, 10).forEach(edge => {
          md += `| \`${edge.from}\` | ${edge.type} | ${edge.label} |\n`;
        });
        if (node.inbound.length > 10) {
          md += `| ... | | +${node.inbound.length - 10} more |\n`;
        }
        md += '\n';
      }
      
      md += '---\n\n';
    });
  });
  
  return md;
}

/**
 * Generate Mermaid flowchart representation
 */
export function generateGraphMermaid(): string {
  const graph = buildNavigationGraph();
  const { nodes, edges } = graph;
  
  // Create safe node IDs for Mermaid
  const safeId = (path: string): string => {
    if (path === '/') return 'HOME';
    return path.replace(/\//g, '_').replace(/^_/, '').replace(/-/g, '_').toUpperCase();
  };
  
  let mermaid = `flowchart LR
    %% Navigation Graph - Auto-generated
    %% Nodes: ${nodes.size} | Edges: ${edges.length}
    
`;
  
  // Group nodes by top-level category
  const subgraphs = new Map<string, string[]>();
  nodes.forEach(node => {
    const category = node.path === '/' ? 'Root' : node.path.split('/')[1] || 'Root';
    const subgraphName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
    if (!subgraphs.has(subgraphName)) subgraphs.set(subgraphName, []);
    subgraphs.get(subgraphName)!.push(`        ${safeId(node.path)}["${node.path}"]`);
  });
  
  // Write subgraphs
  subgraphs.forEach((nodeLines, name) => {
    mermaid += `    subgraph ${name.replace(/\s/g, '_')}\n`;
    nodeLines.forEach(line => mermaid += line + '\n');
    mermaid += `    end\n\n`;
  });
  
  mermaid += `    %% Edges (showing key connections only)\n`;
  
  // Show only significant edges to avoid clutter
  // Priority: in-page-cta, program-nav, breadcrumb, sibling
  const significantTypes: EdgeType[] = ['in-page-cta', 'program-nav', 'breadcrumb', 'sibling'];
  const significantEdges = edges.filter(e => significantTypes.includes(e.type) && !e.isExternal);
  
  // Deduplicate edges
  const seenEdges = new Set<string>();
  significantEdges.forEach(edge => {
    const key = `${edge.from}->${edge.to}`;
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    
    const typeLabel = edge.type.replace(/-/g, ' ');
    mermaid += `    ${safeId(edge.from)} -->|${typeLabel}| ${safeId(edge.to)}\n`;
  });
  
  return mermaid;
}

/**
 * Get graph statistics
 */
export function getNavigationGraphStats() {
  const graph = buildNavigationGraph();
  return graph.stats;
}

/**
 * Download navigation graph as Markdown
 */
export function downloadNavigationGraphMD(): void {
  const content = generateGraphMarkdown();
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `navigation-graph-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  URL.revokeObjectURL(url);
}

/**
 * Download navigation graph as Mermaid
 */
export function downloadNavigationGraphMermaid(): void {
  const content = generateGraphMermaid();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `navigation-graph-${new Date().toISOString().split('T')[0]}.mmd`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  
  URL.revokeObjectURL(url);
}
