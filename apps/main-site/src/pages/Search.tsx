import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';

// The /search route now redirects to home and the CommandPalette is the primary search experience
// triggered via ⌘K from anywhere on the site

const Search: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home - the CommandPalette is accessible via ⌘K
    navigate('/', { replace: true });
    
    // Trigger the command palette to open after navigation
    setTimeout(() => {
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true
      });
      document.dispatchEvent(event);
    }, 100);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Search | CCG' : 'ძებნა | CCG'}</title>
      </Helmet>
      <div className="min-h-screen bg-navy" />
    </>
  );
};

export default Search;
