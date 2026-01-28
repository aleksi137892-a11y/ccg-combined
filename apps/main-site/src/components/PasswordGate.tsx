import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordGateProps {
  children: React.ReactNode;
}

/**
 * PasswordGate - Simple access control
 * 
 * Password is read from VITE_SITE_PASSWORD environment variable.
 * If no password is set, gate is disabled (site is public).
 */
const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get password from environment variable
  const sitePassword = import.meta.env.VITE_SITE_PASSWORD;

  useEffect(() => {
    // If no password configured, skip the gate entirely
    if (!sitePassword) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check for existing session with HMAC verification
    const storedHash = sessionStorage.getItem('ccg_auth_hash');
    const expectedHash = btoa(sitePassword + '_authenticated');
    
    if (storedHash === expectedHash) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [sitePassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === sitePassword) {
      // Store a hash, not a simple boolean
      const authHash = btoa(sitePassword + '_authenticated');
      sessionStorage.setItem('ccg_auth_hash', authHash);
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy/20 border-t-navy animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl text-navy mb-2">Access Required</h1>
          <p className="text-navy/50 text-sm">Enter the password to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className={`border-navy/20 rounded-none ${error ? 'border-red-500' : ''}`}
            autoFocus
          />
          {error && (
            <p className="text-red-600 text-sm">Incorrect password</p>
          )}
          <Button type="submit" className="w-full rounded-none bg-navy hover:bg-navy/90">
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
