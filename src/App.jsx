import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import GeometricBackground from './components/GeometricBackground';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import Intelligence from './components/Intelligence';
import Security from './components/Security';
import Closure from './components/Closure';
import ManifestoPage from './components/ManifestoPage';
import EcosystemPage from './pages/EcosystemPage';
import SecurityPage from './pages/SecurityPage';

// Landing Page Component to group home sections
const LandingPage = () => (
  <>
    <Navbar />
    <main className="relative z-10 w-full flex flex-col items-center">
      <Hero />
      <Ecosystem />
      <Intelligence />
      <Security />
      <Closure />
    </main>
  </>
);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = null;
    let lastScrollTime = Date.now();
    let isIdle = false;

    function raf(time) {
      lenis.raf(time);

      // PERFORMANCE: Pause RAF when idle (no scroll for 100ms)
      const now = Date.now();
      if (lenis.velocity === 0) {
        if (!isIdle && now - lastScrollTime > 100) {
          isIdle = true;
          // Stop the loop when idle
          return;
        }
      } else {
        lastScrollTime = now;
        isIdle = false;
      }

      rafId = requestAnimationFrame(raf);
    }

    // Resume RAF on scroll events
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
    <div className="relative w-full min-h-screen text-slate-400 overflow-hidden font-sans selection:bg-wec-blue/30 selection:text-white">
      {/* GLOBAL BACKGROUND */}
      <GeometricBackground />

      {/* Cinematic Grit - GLOBAL */}
      <div className="film-grain" />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
