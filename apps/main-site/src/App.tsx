import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/routing/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import PasswordGate from "@/components/PasswordGate";

// Layouts - keep synchronous as they're needed for page structure
import {
  AppealLayout,
  RecordLayout,
  RemedyLayout,
  StateOfCaptureLayout,
  RustaveliLayout,
  AboutLayout,
} from "@/layouts/SectionLayout";

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// =============================================================================
// LAZY-LOADED PAGES (Code Splitting)
// Heavy pages are loaded on-demand to reduce initial bundle size
// =============================================================================

// Core pages - loaded immediately as they're frequently accessed
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages - loaded on-demand
const Justice = lazy(() => import("./pages/Justice"));
const ForumFaq = lazy(() => import("./pages/ForumFaq"));
const Mandate = lazy(() => import("./pages/Mandate"));
const Mission = lazy(() => import("./pages/Mission"));
const About = lazy(() => import("./pages/About"));
const Leadership = lazy(() => import("./pages/Leadership"));
const Contact = lazy(() => import("./pages/Contact"));
const SolidarityPledge = lazy(() => import("./pages/SolidarityPledge"));
const ComplicityIndex = lazy(() => import("./pages/ComplicityIndex"));
const TheList = lazy(() => import("./pages/TheList"));
const SubmitPetition = lazy(() => import("./pages/SubmitPetition"));
const SecureChannel = lazy(() => import("./pages/SecureChannel"));
const Safety = lazy(() => import("./pages/Safety"));
const SourceProtection = lazy(() => import("./pages/SourceProtection"));
const JusticeDocket = lazy(() => import("./pages/JusticeDocket"));
const DossierDesk = lazy(() => import("./pages/DossierDesk"));
const IIMGeorgia = lazy(() => import("./pages/IIMGeorgia"));
const InternationalPathways = lazy(() => import("./pages/InternationalPathways"));
const OffRamp = lazy(() => import("./pages/OffRamp"));
const Compliance = lazy(() => import("./pages/Compliance"));
const Sanctions = lazy(() => import("./pages/Sanctions"));
const CaptureMap = lazy(() => import("./pages/CaptureMap"));
const Investigations = lazy(() => import("./pages/Investigations"));
const Engine = lazy(() => import("./pages/Engine"));
const Report = lazy(() => import("./pages/Report"));
const Evidence = lazy(() => import("./pages/Evidence"));
const Rustaveli = lazy(() => import("./pages/Rustaveli"));
const Canon = lazy(() => import("./pages/Canon"));
const Dignity = lazy(() => import("./pages/Dignity"));
const Heritage = lazy(() => import("./pages/Heritage"));
const Standards = lazy(() => import("./pages/Standards"));
const Methodology = lazy(() => import("./pages/Methodology"));
const RightOfReply = lazy(() => import("./pages/RightOfReply"));
const Corrections = lazy(() => import("./pages/Corrections"));
const Transparency = lazy(() => import("./pages/Transparency"));
const Funding = lazy(() => import("./pages/Funding"));
const Governance = lazy(() => import("./pages/Governance"));
const Advisory = lazy(() => import("./pages/Advisory"));
const Press = lazy(() => import("./pages/Press"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const ReportError = lazy(() => import("./pages/ReportError"));
const Faq = lazy(() => import("./pages/Faq"));
const Charter = lazy(() => import("./pages/Charter"));
const Search = lazy(() => import("./pages/Search"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const CivicNecessity = lazy(() => import("./pages/CivicNecessity"));
const RightToRemedy = lazy(() => import("./pages/RightToRemedy"));
const ComplicityLedger = lazy(() => import("./pages/ComplicityLedger"));

// Section Index Pages
const AppealIndex = lazy(() => import("./pages/appeal/AppealIndex"));
const RecordIndex = lazy(() => import("./pages/record/RecordIndex"));
const RemedyIndex = lazy(() => import("./pages/remedy/RemedyIndex"));
const HarmIntake = lazy(() => import("./pages/appeal/HarmIntake"));
const WrongdoingIntake = lazy(() => import("./pages/appeal/WrongdoingIntake"));
const InsideIntake = lazy(() => import("./pages/appeal/InsideIntake"));
const AppealsTriage = lazy(() => import("./pages/admin/AppealsTriage"));
const StrategicLitigation = lazy(() => import("./pages/remedy/StrategicLitigation"));
const InternationalMechanisms = lazy(() => import("./pages/remedy/InternationalMechanisms"));

const queryClient = new QueryClient();

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================

// Helper to generate both English and Georgian route sets
const createRoutes = (prefix: string = '') => (
  <>
    {/* Root level pages */}
    <Route path={`${prefix}/`} element={<Index />} />
    <Route path={`${prefix}/contact`} element={<Contact />} />
    <Route path={`${prefix}/search`} element={<Search />} />
    <Route path={`${prefix}/sitemap`} element={<Sitemap />} />
    <Route path={`${prefix}/justice`} element={<Justice />} />
    <Route path={`${prefix}/justice/faq`} element={<ForumFaq />} />
    
    {/* Legal pages (stay at root level per convention) */}
    <Route path={`${prefix}/privacy`} element={<Privacy />} />
    <Route path={`${prefix}/terms`} element={<Terms />} />
    <Route path={`${prefix}/cookies`} element={<Cookies />} />
    <Route path={`${prefix}/accessibility`} element={<Accessibility />} />
    <Route path={`${prefix}/standards`} element={<Standards />} />
    <Route path={`${prefix}/report-error`} element={<ReportError />} />

    {/* =========================================================================
        APPEAL SECTION - /appeal/*
        ========================================================================= */}
    <Route path={`${prefix}/appeal`} element={<AppealLayout />}>
      <Route index element={<AppealIndex />} />
      <Route path="harm" element={<HarmIntake />} />
      <Route path="wrongdoing" element={<WrongdoingIntake />} />
      <Route path="inside" element={<InsideIntake />} />
      <Route path="protections" element={<Safety />} />
      <Route path="how-handled" element={<SubmitPetition />} />
    </Route>
    
    {/* Legacy Appeal redirects */}
    <Route path={`${prefix}/submit-petition`} element={<Navigate to={`${prefix}/appeal`} replace />} />
    <Route path={`${prefix}/safety`} element={<Navigate to={`${prefix}/appeal/protections`} replace />} />
    <Route path={`${prefix}/secure-channel`} element={<Navigate to={`${prefix}/appeal/protections`} replace />} />
    <Route path={`${prefix}/source-protection`} element={<Navigate to={`${prefix}/appeal/protections`} replace />} />

    {/* =========================================================================
        RECORD SECTION - /record/*
        ========================================================================= */}
    <Route path={`${prefix}/record`} element={<RecordLayout />}>
      <Route index element={<RecordIndex />} />
      <Route path="harm" element={<JusticeDocket />} />
      <Route path="harm/political-prisoners" element={<TheList />} />
      <Route path="harm/claims-archive" element={<JusticeDocket />} />
      <Route path="ledger" element={<ComplicityLedger />} />
      <Route path="ledger/:entryId" element={<ComplicityLedger />} />
      <Route path="registry" element={<ComplicityIndex />} />
      <Route path="registry/the-list" element={<TheList />} />
      <Route path="registry/the-list/:entryId" element={<TheList />} />
      <Route path="registry/corporate-responsibility-index" element={<ComplicityIndex />} />
      <Route path="registry/reply-corrections" element={<RightOfReply />} />
    </Route>
    
    {/* Legacy Record redirects */}
    <Route path={`${prefix}/justice-docket`} element={<Navigate to={`${prefix}/record/harm`} replace />} />
    <Route path={`${prefix}/complicity-index`} element={<Navigate to={`${prefix}/record/registry`} replace />} />
    <Route path={`${prefix}/the-list`} element={<Navigate to={`${prefix}/record/registry/the-list`} replace />} />
    <Route path={`${prefix}/right-of-reply`} element={<Navigate to={`${prefix}/record/registry/reply-corrections`} replace />} />
    <Route path={`${prefix}/record/registry/ledger`} element={<Navigate to={`${prefix}/record/ledger`} replace />} />
    <Route path={`${prefix}/corrections`} element={<Navigate to={`${prefix}/record/registry/reply-corrections`} replace />} />

    {/* =========================================================================
        REMEDY SECTION - /remedy/*
        ========================================================================= */}
    <Route path={`${prefix}/remedy`} element={<RemedyLayout />}>
      <Route index element={<RemedyIndex />} />
      <Route path="sanctions" element={<Sanctions />} />
      <Route path="litigation" element={<StrategicLitigation />} />
      <Route path="criminal-dossiers" element={<DossierDesk />} />
      <Route path="iimg" element={<IIMGeorgia />} />
      <Route path="partners" element={<InternationalPathways />} />
      <Route path="international" element={<InternationalMechanisms />} />
    </Route>
    
    {/* Legacy Remedy redirects */}
    <Route path={`${prefix}/off-ramp`} element={<Navigate to={`${prefix}/remedy`} replace />} />
    <Route path={`${prefix}/sanctions`} element={<Navigate to={`${prefix}/remedy/sanctions`} replace />} />
    <Route path={`${prefix}/compliance`} element={<Navigate to={`${prefix}/remedy/sanctions`} replace />} />
    <Route path={`${prefix}/dossier-desk`} element={<Navigate to={`${prefix}/remedy/criminal-dossiers`} replace />} />
    <Route path={`${prefix}/iim-georgia`} element={<Navigate to={`${prefix}/remedy/iimg`} replace />} />
    <Route path={`${prefix}/international-pathways`} element={<Navigate to={`${prefix}/remedy/partners`} replace />} />

    {/* =========================================================================
        STATE OF CAPTURE SECTION - /state-of-capture/*
        ========================================================================= */}
    <Route path={`${prefix}/state-of-capture`} element={<StateOfCaptureLayout />}>
      <Route index element={<Engine />} />
      <Route path="anatomy" element={<CaptureMap />} />
      <Route path="findings" element={<Report />} />
      <Route path="findings/:briefId" element={<Report />} />
      <Route path="track" element={<Engine />} />
      <Route path="methods" element={<Evidence />} />
    </Route>
    
    {/* Legacy State of Capture redirects */}
    <Route path={`${prefix}/engine`} element={<Navigate to={`${prefix}/state-of-capture`} replace />} />
    <Route path={`${prefix}/capture-map`} element={<Navigate to={`${prefix}/state-of-capture/anatomy`} replace />} />
    <Route path={`${prefix}/report`} element={<Navigate to={`${prefix}/state-of-capture/findings`} replace />} />
    <Route path={`${prefix}/evidence`} element={<Navigate to={`${prefix}/state-of-capture/methods`} replace />} />
    <Route path={`${prefix}/investigations`} element={<Navigate to={`${prefix}/state-of-capture`} replace />} />

    {/* =========================================================================
        RUSTAVELI SECTION - /rustaveli/*
        ========================================================================= */}
    <Route path={`${prefix}/rustaveli`} element={<RustaveliLayout />}>
      <Route index element={<Rustaveli />} />
      <Route path="movement" element={<Dignity />} />
      <Route path="exhibition" element={<Rustaveli />} />
      <Route path="exhibition/:entryId" element={<Rustaveli />} />
      <Route path="acts" element={<Rustaveli />} />
      <Route path="acts/:entryId" element={<Rustaveli />} />
      <Route path="canon" element={<Canon />} />
      <Route path="canon/:entryId" element={<Canon />} />
      <Route path="join" element={<SolidarityPledge />} />
    </Route>
    
    {/* Legacy Rustaveli redirects */}
    <Route path={`${prefix}/canon`} element={<Navigate to={`${prefix}/rustaveli/canon`} replace />} />
    <Route path={`${prefix}/dignity`} element={<Navigate to={`${prefix}/rustaveli/movement`} replace />} />
    <Route path={`${prefix}/heritage`} element={<Navigate to={`${prefix}/rustaveli`} replace />} />
    <Route path={`${prefix}/solidarity-pledge`} element={<Navigate to={`${prefix}/rustaveli/join`} replace />} />

    {/* =========================================================================
        ABOUT SECTION - /about/*
        ========================================================================= */}
    <Route path={`${prefix}/about`} element={<AboutLayout />}>
      <Route index element={<About />} />
      <Route path="leadership" element={<Leadership />} />
      <Route path="mission" element={<Mission />} />
      <Route path="civic-necessity" element={<CivicNecessity />} />
      <Route path="right-to-remedy" element={<RightToRemedy />} />
      <Route path="governance" element={<Governance />} />
      <Route path="funding" element={<Funding />} />
      <Route path="privacy-security" element={<Privacy />} />
      <Route path="press" element={<Press />} />
      <Route path="faq" element={<Faq />} />
    </Route>
    
    {/* Legacy About redirects */}
    <Route path={`${prefix}/mission`} element={<Navigate to={`${prefix}/about/mission`} replace />} />
    <Route path={`${prefix}/mandate`} element={<Navigate to={`${prefix}/about/mission`} replace />} />
    <Route path={`${prefix}/governance`} element={<Navigate to={`${prefix}/about/governance`} replace />} />
    <Route path={`${prefix}/funding`} element={<Navigate to={`${prefix}/about/funding`} replace />} />
    <Route path={`${prefix}/press`} element={<Navigate to={`${prefix}/about/press`} replace />} />
    <Route path={`${prefix}/advisory`} element={<Navigate to={`${prefix}/about/governance`} replace />} />
    <Route path={`${prefix}/methodology`} element={<Navigate to={`${prefix}/standards`} replace />} />
    <Route path={`${prefix}/transparency`} element={<Navigate to={`${prefix}/about/funding`} replace />} />
    <Route path={`${prefix}/charter`} element={<Navigate to={`${prefix}/about/mission`} replace />} />
    <Route path={`${prefix}/faq`} element={<Navigate to={`${prefix}/about/faq`} replace />} />

    {/* =========================================================================
        ADMIN SECTION - /admin/* (Staff only)
        ========================================================================= */}
    <Route path={`${prefix}/admin/appeals`} element={<AppealsTriage />} />
  </>
);

// Wrapper to provide LanguageProvider inside BrowserRouter
const AppRoutes = () => (
  <LanguageProvider>
    <ScrollToTop />
    <Toaster />
    <Sonner />
    <CookieConsent />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* English routes */}
        {createRoutes('')}
        
        {/* Georgian routes - same structure with /ge prefix */}
        {createRoutes('/ge')}

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </LanguageProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PasswordGate>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </BrowserRouter>
      </PasswordGate>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
