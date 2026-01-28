// Legacy Redirect Component
// Handles redirects from old flat URLs to new nested structure

import { Navigate, useLocation } from 'react-router-dom';
import { getRedirectPath } from '@/config/routes';

interface LegacyRedirectProps {
  fallback?: React.ReactNode;
}

/**
 * Component that redirects legacy flat URLs to their new nested equivalents.
 * Preserves hash fragments and query parameters during redirect.
 */
export function LegacyRedirect({ fallback }: LegacyRedirectProps) {
  const location = useLocation();
  
  // Check if this is a Georgian route
  const isGeorgian = location.pathname.startsWith('/ge');
  const cleanPath = isGeorgian 
    ? location.pathname.replace(/^\/ge/, '') 
    : location.pathname;
  
  // Look up redirect
  const newPath = getRedirectPath(cleanPath);
  
  if (newPath) {
    // Preserve the Georgian prefix if present
    const prefix = isGeorgian ? '/ge' : '';
    // Preserve hash and query string
    const redirectTo = `${prefix}${newPath}${location.search}${location.hash}`;
    
    return <Navigate to={redirectTo} replace />;
  }
  
  // No redirect found, render fallback or null
  return fallback ? <>{fallback}</> : null;
}

/**
 * Hook to check if current path should redirect
 */
export function useRedirectCheck(): { shouldRedirect: boolean; redirectTo: string | null } {
  const location = useLocation();
  
  const isGeorgian = location.pathname.startsWith('/ge');
  const cleanPath = isGeorgian 
    ? location.pathname.replace(/^\/ge/, '') 
    : location.pathname;
  
  const newPath = getRedirectPath(cleanPath);
  
  if (newPath) {
    const prefix = isGeorgian ? '/ge' : '';
    return {
      shouldRedirect: true,
      redirectTo: `${prefix}${newPath}${location.search}${location.hash}`,
    };
  }
  
  return { shouldRedirect: false, redirectTo: null };
}
