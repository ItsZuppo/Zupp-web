import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ChevronRight, Download, Menu, X } from 'lucide-react';
import { AppRoute, ZUPPO_LINKS } from '../config/links';

interface NavbarProps {
  route: AppRoute;
  navigate: (to: AppRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ route, navigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHeroDark = route === '/' && !scrolled && !mobileOpen;

  const go = (to: AppRoute) => {
    setMobileOpen(false);
    navigate(to);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled || route !== '/' || mobileOpen
            ? 'bg-white border-b border-slate-200/80 shadow-xs'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent'
        }`}
      >
        {/* Ultra-thin GPU-only scroll progress bar (zero spring overhead) */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="origin-left h-[2.5px] w-full bg-gradient-to-r from-[#E62225] via-[#FF5722] to-[#FB923C] will-change-transform"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 sm:h-18 flex items-center justify-between">
          <button
            onClick={() => go('/')}
            className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-transform"
          >
            <img
              src="/images/zuppo-customer.png"
              alt="Zuppo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-sm object-cover"
            />
            <span
              className={`text-xl font-black tracking-tight italic transition-colors ${
                isHeroDark ? 'text-white' : 'text-[#E62225]'
              }`}
            >
              zuppo
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: 'Home', to: '/' as AppRoute },
              { label: 'Add Restaurant', to: '/partner' as AppRoute },
              { label: 'Deliver with Zuppo', to: '/rider' as AppRoute },
              { label: 'Support', to: '/support' as AppRoute },
            ].map((item) => (
              <button
                key={item.to}
                onClick={() => go(item.to)}
                className={`relative text-sm font-bold transition-colors cursor-pointer py-1 ${
                  isHeroDark
                    ? 'text-white/90 hover:text-white'
                    : route === item.to
                    ? 'text-[#E62225]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {route === item.to && !isHeroDark && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#E62225]" />
                )}
              </button>
            ))}

            <a
              href={ZUPPO_LINKS.apk.customer}
              className="inline-flex items-center gap-2 bg-[#E62225] hover:bg-[#cc1b1e] active:scale-95 text-white text-sm font-extrabold px-4 py-2.5 rounded-full shadow-md shadow-red-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              Get the App
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            {scrolled && !mobileOpen && (
              <a
                href={ZUPPO_LINKS.apk.customer}
                className="inline-flex items-center gap-1.5 bg-[#E62225] active:scale-95 text-white text-xs font-extrabold px-3 py-2 rounded-full shadow-xs transition-transform"
              >
                <Download className="w-3.5 h-3.5" />
                Get App
              </a>
            )}

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className={`p-2 rounded-xl active:scale-90 transition-transform cursor-pointer ${
                isHeroDark ? 'text-white bg-black/45' : 'text-slate-800 bg-slate-100'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Instant Zero-Lag GPU Mobile Menu (Transform + Opacity only, NO height reflow, NO blur!) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl rounded-b-3xl will-change-transform"
            >
              <div className="px-4 pt-2 pb-5 space-y-1">
                {[
                  { label: 'Home', to: '/' as AppRoute },
                  { label: 'Add Restaurant', to: '/partner' as AppRoute },
                  { label: 'Deliver with Zuppo', to: '/rider' as AppRoute },
                  { label: 'Help & Support', to: '/support' as AppRoute },
                  { label: 'Privacy Policy', to: '/privacy-policy' as AppRoute },
                ].map((item) => (
                  <button
                    key={item.to}
                    onClick={() => go(item.to)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform ${
                      route === item.to
                        ? 'bg-[#FFF2F2] text-[#E62225]'
                        : 'text-slate-700 active:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}

                <a
                  href={ZUPPO_LINKS.apk.customer}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#E62225] active:scale-[0.98] text-white text-sm font-extrabold px-4 py-3.5 rounded-2xl shadow-md transition-transform"
                >
                  <Download className="w-4 h-4" />
                  Download Zuppo Android APK
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Lightweight non-blurred backdrop overlay (zero GPU blur cost over live video!) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/45"
          />
        )}
      </AnimatePresence>
    </>
  );
};
