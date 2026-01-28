import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BackToTop } from '@/components/ui/back-to-top';
import { ScrollProgress } from '@/components/ui/scroll-progress';

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  animateNavIn?: boolean;
  navInteractive?: boolean;
  lightHeader?: boolean;
  logoMode?: 'none' | 'wordmark';
  /** Hide back-to-top button (default: false) */
  hideBackToTop?: boolean;
  /** Show scroll progress indicator (default: false) */
  showScrollProgress?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideNav = false, 
  animateNavIn = false, 
  navInteractive = true, 
  lightHeader = false, 
  logoMode = 'wordmark',
  hideBackToTop = false,
  showScrollProgress = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header forceHidden={hideNav} animateIn={animateNavIn} interactive={navInteractive} lightMode={lightHeader} logoMode={logoMode} />
      {showScrollProgress && <ScrollProgress variant="subtle" />}
      <main className={`flex-1 ${hideNav ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
      {!hideBackToTop && <BackToTop />}
    </div>
  );
};

export default Layout;
