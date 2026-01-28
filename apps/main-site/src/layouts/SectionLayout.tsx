// Shared Section Layout Component
// Provides consistent structure for nested route sections with breadcrumbs

import { Outlet, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { routeConfig, getBreadcrumbs, RouteCategory } from '@/config/routes';
import { ChevronRight, Home } from 'lucide-react';

interface SectionLayoutProps {
  category: RouteCategory;
  children?: React.ReactNode;
}

export function SectionLayout({ category, children }: SectionLayoutProps) {
  const location = useLocation();
  const { isGeorgian } = useLanguage();
  
  // Strip /ge prefix for route lookup
  const cleanPath = location.pathname.replace(/^\/ge/, '') || '/';
  const breadcrumbs = getBreadcrumbs(cleanPath, isGeorgian);

  const langPrefix = isGeorgian ? '/ge' : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 1 && (
        <nav 
          aria-label="Breadcrumb" 
          className="border-b border-border/50 bg-muted/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 py-3 text-sm">
              <li>
                <Link 
                  to={langPrefix || '/'} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link 
                      to={crumb.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {/* Page Content */}
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
}

// =============================================================================
// SECTION-SPECIFIC LAYOUTS
// =============================================================================

export function AppealLayout() {
  return <SectionLayout category="appeal" />;
}

export function RecordLayout() {
  return <SectionLayout category="record" />;
}

export function RemedyLayout() {
  return <SectionLayout category="remedy" />;
}

export function StateOfCaptureLayout() {
  return <SectionLayout category="state-of-capture" />;
}

export function RustaveliLayout() {
  return <SectionLayout category="rustaveli" />;
}

export function AboutLayout() {
  return <SectionLayout category="about" />;
}
