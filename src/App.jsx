import { useEffect, memo, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// EAGER IMPORTS (Above the Fold)
import Navbar from './components/Navbar';
import GeometricBackground from './components/GeometricBackground';
import Hero from './components/Hero';
import GestureUI from './components/GestureUI';

import { GestureProvider } from './context/GestureContext';
import { LanguageProvider } from './context/LanguageContext';
import { EarlyAccessProvider } from './context/EarlyAccessContext';
import LanguageSelector from './components/LanguageSelector';
import AIAgent from './components/AIAgent';

// LAZY IMPORTS (Below the Fold / Performance Optimization)
const Ecosystem = lazy(() => import('./components/Ecosystem'));
const Intelligence = lazy(() => import('./components/Intelligence'));
const Security = lazy(() => import('./components/Security'));
const Closure = lazy(() => import('./components/Closure'));
const Footer = lazy(() => import('./components/Footer'));

// LAZY PAGES
const ManifestoPage = lazy(() => import('./components/ManifestoPage'));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const MissionPage = lazy(() => import('./pages/MissionPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage')); // New Dashboard

// Fallback Loader (Minimal layout shift)
const SectionLoader = () => <div className="min-h-[50vh] w-full flex items-center justify-center opacity-20"><div className="animate-pulse w-full h-full bg-white/5 rounded-xl"></div></div>;

// Landing Page Component to group home sections
const LandingPage = memo(() => (
  <>
    <Navbar />
    <GestureUI /> {/* Global UI Layer - Outside Main Transform Context */}
    <main className="relative z-10 w-full flex flex-col items-center">
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Ecosystem />
        <Intelligence />
        <Security />
        <Closure />
      </Suspense>
    </main>
  </>
));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // ANALYTICS: Track Page Visit
    // Fire and forget (don't block UI)
    const apiUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace('/api/chat', '')
      : 'http://localhost:3001';

    fetch(`${apiUrl}/api/analytics/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname, userAgent: navigator.userAgent })
    }).catch(err => console.warn('Analytics failed', err));

  }, [pathname]);

  useEffect(() => {
    // STEP 1: SCROLL PHYSICS ENGINE (LENIS)
    // "Heavy" feel with linear interpolation (lerp: 0.1) to mask frame drops.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1, // MANDATORY: Inertia-based smoothing
    });

    let rafId = null;
    let lastScrollTime = Date.now();
    let isIdle = false;

    function raf(time) {
      lenis.raf(time);

      // PERFORMANCE: Pause RAF when idle (no scroll for 150ms)
      const now = Date.now();
      if (lenis.velocity === 0) {
        if (!isIdle && now - lastScrollTime > 150) {
          isIdle = true;
          // Stop the loop when idle to save CPU/Battery
          return;
        }
      } else {
        lastScrollTime = now;
        isIdle = false;
      }

      rafId = requestAnimationFrame(raf);
    }

    // Resume RAF on scroll events (PASSIVE LISTENERS)
    const resumeRAF = () => {
      if (isIdle) {
        isIdle = false;
        rafId = requestAnimationFrame(raf);
      }
    };

    window.addEventListener('wheel', resumeRAF, { passive: true });
    window.addEventListener('touchstart', resumeRAF, { passive: true });

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', resumeRAF);
      window.removeEventListener('touchstart', resumeRAF);
    };
  }, []);

  return (
    <LanguageProvider>
      <GestureProvider>
        <EarlyAccessProvider>

          <LanguageSelector />
          <AIAgent />

          {/* GLOBAL BACKGROUND - Only mounted once */}
          <div className="relative min-h-screen bg-[#030303] text-white selection:bg-wec-blue/30 selection:text-white">
            <GeometricBackground />

            <Suspense fallback={<SectionLoader />}>
              <div className="relative z-10 w-full flex flex-col">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/manifesto" element={<ManifestoPage />} />
                  <Route path="/ecosystem" element={<EcosystemPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="/download" element={<DownloadPage />} />
                  <Route path="/mission" element={<MissionPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
              </div>
            </Suspense>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>

        </EarlyAccessProvider>
      </GestureProvider>
    </LanguageProvider>
  );
}

export default App;
