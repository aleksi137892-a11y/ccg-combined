import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  animateNavIn?: boolean;
  navInteractive?: boolean;
  lightHeader?: boolean;
  logoMode?: 'none' | 'wordmark';
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false, animateNavIn = false, navInteractive = true, lightHeader = false, logoMode = 'wordmark' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header forceHidden={hideNav} animateIn={animateNavIn} interactive={navInteractive} lightMode={lightHeader} logoMode={logoMode} />
      <main className={`flex-1 ${hideNav ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
