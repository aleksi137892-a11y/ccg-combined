// Breadcrumb Hook
// Provides breadcrumb navigation data for the current route

import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBreadcrumbs, routeConfig } from '@/config/routes';

interface Breadcrumb {
  label: string;
  href: string;
  isCurrent: boolean;
}

/**
 * Hook to get breadcrumb trail for the current route
 */
export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation();
  const { isGeorgian } = useLanguage();
  
  // Strip /ge prefix for route lookup
  const cleanPath = location.pathname.replace(/^\/ge/, '') || '/';
  
  const breadcrumbs = getBreadcrumbs(cleanPath, isGeorgian);
  
  return breadcrumbs.map((crumb, index) => ({
    ...crumb,
    isCurrent: index === breadcrumbs.length - 1,
  }));
}

/**
 * Hook to get current route configuration
 */
export function useCurrentRoute() {
  const location = useLocation();
  const { isGeorgian } = useLanguage();
  
  // Strip /ge prefix for route lookup
  const cleanPath = location.pathname.replace(/^\/ge/, '') || '/';
  
  const config = routeConfig[cleanPath];
  
  if (!config) return null;
  
  return {
    ...config,
    currentLabel: isGeorgian ? config.labelGe : config.label,
    fullPath: isGeorgian ? `/ge${config.path}` : config.path,
  };
}

/**
 * Hook to get sibling routes for sub-navigation
 */
export function useSiblingRoutes() {
  const location = useLocation();
  const { isGeorgian } = useLanguage();
  
  const cleanPath = location.pathname.replace(/^\/ge/, '') || '/';
  const currentConfig = routeConfig[cleanPath];
  
  if (!currentConfig?.parent) {
    // If no parent, check if this route has children (it's a section landing)
    const children = currentConfig?.children || [];
    return children
      .map(path => {
        const config = routeConfig[path];
        if (!config || config.isDynamic) return null;
        return {
          path: isGeorgian ? `/ge${config.path}` : config.path,
          label: isGeorgian ? config.labelGe : config.label,
          isCurrent: false,
        };
      })
      .filter(Boolean);
  }
  
  // Get parent's children (siblings)
  const parentConfig = routeConfig[currentConfig.parent];
  const siblingPaths = parentConfig?.children || [];
  
  return siblingPaths
    .map(path => {
      const config = routeConfig[path];
      if (!config || config.isDynamic) return null;
      return {
        path: isGeorgian ? `/ge${config.path}` : config.path,
        label: isGeorgian ? config.labelGe : config.label,
        isCurrent: cleanPath === config.path,
      };
    })
    .filter(Boolean);
}
