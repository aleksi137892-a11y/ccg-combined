import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

const SITE_PASSWORD = "5280";
const AUTH_KEY = "site-authenticated";
const AUTH_EXPIRY_KEY = "site-auth-expiry";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check localStorage first (with expiry validation)
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    if (expiry && Date.now() < parseInt(expiry, 10)) {
      setIsAuthenticated(true);
      return;
    } else if (expiry) {
      // Expired, clean up
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_EXPIRY_KEY);
    }

    // Fall back to sessionStorage
    const authStatus = sessionStorage.getItem(AUTH_KEY);
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      if (rememberMe) {
        localStorage.setItem(AUTH_KEY, "true");
        localStorage.setItem(AUTH_EXPIRY_KEY, String(Date.now() + SEVEN_DAYS_MS));
      } else {
        sessionStorage.setItem(AUTH_KEY, "true");
      }
      setIsAuthenticated(true);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 500);
    }
  };

  // Still checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xs text-center"
      >
        <h1 className="font-display text-2xl mb-2 text-foreground">
          Access Required
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Enter the access code to continue
        </p>

        <form onSubmit={handleSubmit}>
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className={`w-full text-center text-2xl tracking-[0.5em] py-4 px-6 bg-muted/50 border ${
                error ? "border-destructive" : "border-border"
              } focus:border-primary focus:outline-none transition-colors font-mono`}
              autoFocus
            />
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <label
              htmlFor="remember-me"
              className="text-sm text-muted-foreground cursor-pointer select-none"
            >
              Remember me for 7 days
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            Enter
          </button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-sm mt-4"
          >
            Incorrect code
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};
