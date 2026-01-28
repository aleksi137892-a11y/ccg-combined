import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { LanguageRouteSync } from "@/components/LanguageRouteSync";

import { InstallPrompt } from "@/components/InstallPrompt";
import { PasswordGate } from "@/components/PasswordGate";
import { ScrollToTop } from "@/components/ScrollToTop";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import SubmitEvidenceLanding from "./pages/SubmitEvidenceLanding";
import EvidenceLanguageSelect from "./pages/EvidenceLanguageSelect";
import SubmitEvidenceForm from "./pages/SubmitEvidenceForm";
import Tier1Testimony from "./pages/tiers/Tier1Testimony";
import Tier2Documents from "./pages/tiers/Tier2Documents";
import TresoritRedirect from "./pages/tiers/TresoritRedirect";
import TresoritUpload from "./pages/tiers/TresoritUpload";
import Tier3Physical from "./pages/tiers/Tier3Physical";
import Tier3Berkeley from "./pages/tiers/Tier3Berkeley";
import Tier4Urgent from "./pages/tiers/Tier4Urgent";
import SecurityGuide from "./pages/SecurityGuide";
import ForensicIntake from "./pages/ForensicIntake";
import PhysicalExhibits from "./pages/PhysicalExhibits";
import ForumForJustice from "./pages/ForumForJustice";
import Methodology from "./pages/Methodology";
import CivicNecessity from "./pages/CivicNecessity";
import Donate from "./pages/Donate";
import Admin from "./pages/Admin";
import ProtocolsExport from "./pages/ProtocolsExport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Redirect root to default language
const RootRedirect = () => {
  const { language } = useLanguage();
  return <Navigate to={`/${language}`} replace />;
};

const LanguageRoutes = () => {
  return (
    <LanguageRouteSync>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Index />} />
        
        {/* Navigation pages */}
        <Route path="/forensic-intake" element={<ForensicIntake />} />
        <Route path="/physical-exhibits" element={<PhysicalExhibits />} />
        <Route path="/forum-for-justice" element={<ForumForJustice />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/civic-necessity" element={<CivicNecessity />} />
        
        {/* Evidence submission flow */}
        <Route path="/submit-evidence" element={<EvidenceLanguageSelect />} />
        <Route path="/submit-evidence/portal" element={<SubmitEvidenceLanding />} />
        <Route path="/submit-evidence/form" element={<SubmitEvidenceForm />} />
        <Route path="/submit-evidence/testimony" element={<Tier1Testimony />} />
        <Route path="/submit-evidence/documents" element={<Tier2Documents />} />
        <Route path="/submit-evidence/vault-redirect" element={<TresoritRedirect />} />
        <Route path="/submit-evidence/tresorit" element={<TresoritUpload />} />
        <Route path="/submit-evidence/physical" element={<Tier3Physical />} />
        <Route path="/submit-evidence/berkeley" element={<Tier3Berkeley />} />
        <Route path="/submit-evidence/urgent" element={<Tier4Urgent />} />
        
        {/* Security guide */}
        <Route path="/security-guide" element={<SecurityGuide />} />
        
        {/* Donate page */}
        <Route path="/donate" element={<Donate />} />
        
        {/* Admin page */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Catch-all for unknown routes within language */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageRouteSync>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Root redirect */}
        <Route path="/" element={<RootRedirect />} />
        
        {/* Admin route - accessible without language prefix */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Protocols export route - accessible without language prefix */}
        <Route path="/protocols-export" element={<ProtocolsExport />} />
        
        {/* Language-prefixed routes */}
        <Route path="/:lang/*" element={<LanguageRoutes />} />
        
        {/* Global catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <PasswordGate>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <InstallPrompt />
            <OfflineIndicator />
            <BrowserRouter>
              <ScrollToTop />
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </PasswordGate>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
