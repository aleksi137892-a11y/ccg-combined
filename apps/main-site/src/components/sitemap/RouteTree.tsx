// Interactive Route Tree Component
// Visual hierarchical display of the new nested URL structure

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { routeConfig, RouteCategory, RouteConfig } from '@/config/routes';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
  ExternalLink,
  Home,
  Scale,
  BookOpen,
  Gavel,
  Eye,
  Landmark,
  Info,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Category icons and colors - monochrome navy palette only
const categoryConfig: Record<RouteCategory, { 
  icon: React.ElementType; 
  color: string; 
  bg: string;
  label: string;
  labelGe: string;
}> = {
  root: { 
    icon: Home, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'Root',
    labelGe: 'ძირი'
  },
  appeal: { 
    icon: Scale, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'Appeal',
    labelGe: 'აპელაცია'
  },
  record: { 
    icon: BookOpen, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'Record',
    labelGe: 'ჩანაწერი'
  },
  remedy: { 
    icon: Gavel, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'Remedy',
    labelGe: 'გამოსწორება'
  },
  'state-of-capture': { 
    icon: Eye, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'State of Capture',
    labelGe: 'ხელში ჩაგდების მდგომარეობა'
  },
  rustaveli: { 
    icon: Landmark, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'Rustaveli',
    labelGe: 'რუსთაველი'
  },
  about: { 
    icon: Info, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'About',
    labelGe: 'შესახებ'
  },
  legal: { 
    icon: Shield, 
    color: 'text-foreground', 
    bg: 'bg-muted',
    label: 'Legal',
    labelGe: 'სამართლებრივი'
  },
};

interface TreeNodeProps {
  route: RouteConfig;
  depth: number;
  isGeorgian: boolean;
  expandedNodes: Set<string>;
  toggleNode: (path: string) => void;
}

function TreeNode({ route, depth, isGeorgian, expandedNodes, toggleNode }: TreeNodeProps) {
  const hasChildren = route.children && route.children.length > 0;
  const isExpanded = expandedNodes.has(route.path);
  const config = categoryConfig[route.category];
  const Icon = config.icon;
  
  // Get child routes
  const childRoutes = hasChildren 
    ? route.children!
        .map(path => routeConfig[path])
        .filter(Boolean)
        .filter(r => !r.isDynamic) // Skip dynamic routes in tree
    : [];

  const langPrefix = isGeorgian ? '/ge' : '';

  return (
    <div className="select-none">
      <div 
        className={cn(
          'flex items-center gap-2 py-1.5 px-2 transition-colors group',
          'hover:bg-muted/50',
          depth === 0 && 'font-medium'
        )}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {/* Expand/collapse toggle */}
        {hasChildren ? (
          <button
            onClick={() => toggleNode(route.path)}
            className="p-0.5 hover:bg-muted transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        ) : (
          <span className="w-5" /> // Spacer for alignment
        )}

        {/* Folder/file icon */}
        {hasChildren ? (
          isExpanded ? (
            <FolderOpen className={cn('w-4 h-4', config.color)} />
          ) : (
            <Folder className={cn('w-4 h-4', config.color)} />
          )
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground" />
        )}

        {/* Route label */}
        <Link
          to={`${langPrefix}${route.path}`}
          className="flex-1 text-sm hover:underline"
        >
          {isGeorgian ? route.labelGe : route.label}
        </Link>

        {/* Path badge */}
        <code className="hidden md:inline text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {route.path}
        </code>

        {/* External link icon */}
        <Link
          to={`${langPrefix}${route.path}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted"
        >
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
        </Link>
      </div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && childRoutes.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {childRoutes.map(child => (
              <TreeNode
                key={child.path}
                route={child}
                depth={depth + 1}
                isGeorgian={isGeorgian}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface RouteTreeProps {
  className?: string;
}

export function RouteTree({ className }: RouteTreeProps) {
  const { isGeorgian } = useLanguage();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['/appeal', '/record', '/remedy', '/state-of-capture', '/rustaveli', '/about'])
  );

  const toggleNode = (path: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allPaths = Object.values(routeConfig)
      .filter(r => r.children && r.children.length > 0)
      .map(r => r.path);
    setExpandedNodes(new Set(allPaths));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // Get root-level routes (no parent) organized by category
  const rootRoutes = useMemo(() => {
    return Object.values(routeConfig)
      .filter(r => !r.parent && !r.isDynamic)
      .sort((a, b) => {
        // Sort order: root, appeal, record, remedy, state-of-capture, rustaveli, about, legal
        const order: RouteCategory[] = ['root', 'appeal', 'record', 'remedy', 'state-of-capture', 'rustaveli', 'about', 'legal'];
        return order.indexOf(a.category) - order.indexOf(b.category);
      });
  }, []);

  // Group by category for summary
  const categorySummary = useMemo(() => {
    const summary: Record<RouteCategory, number> = {
      root: 0,
      appeal: 0,
      record: 0,
      remedy: 0,
      'state-of-capture': 0,
      rustaveli: 0,
      about: 0,
      legal: 0,
    };
    Object.values(routeConfig).forEach(r => {
      if (!r.isDynamic) {
        summary[r.category]++;
      }
    });
    return summary;
  }, []);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Category Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon;
          const count = categorySummary[key as RouteCategory];
          if (count === 0) return null;
          
          return (
            <div 
              key={key}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border',
                config.bg,
                config.color
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isGeorgian ? config.labelGe : config.label}</span>
              <span className="opacity-60">({count})</span>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={expandAll}
          className="text-xs px-3 py-1.5 border border-border bg-muted hover:bg-muted/80 transition-colors"
        >
          {isGeorgian ? 'გაშლა ყველა' : 'Expand All'}
        </button>
        <button
          onClick={collapseAll}
          className="text-xs px-3 py-1.5 border border-border bg-muted hover:bg-muted/80 transition-colors"
        >
          {isGeorgian ? 'დაკეცვა ყველა' : 'Collapse All'}
        </button>
      </div>

      {/* Tree */}
      <div className="border bg-card p-4 font-mono text-sm">
        {rootRoutes.map(route => (
          <TreeNode
            key={route.path}
            route={route}
            depth={0}
            isGeorgian={isGeorgian}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        ))}
      </div>
    </div>
  );
}
