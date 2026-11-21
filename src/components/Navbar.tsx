import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || route !== '/' || mobileOpen
            ? 'bg-white/92 backdrop-blur-xl border-b border-slate-200/75 shadow-[0_4px_24px_rgba(15,23,42,0.05)]'
            : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent'
        }`}
      >
        {/* Ultra-thin spring scroll progress bar */}
        <motion.div
          style={{ scaleX }}
          className="origin-left h-[2.5px] w-full bg-gradient-to-r from-[#E62225] via-[#FF5722] to-[#FB923C]"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 sm:h-18 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => go('/')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src="/images/zuppo-customer.png"
              alt="Zuppo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-md object-cover transition-transform group-hover:scale-105"
            />
            <span
              className={`text-xl font-black tracking-tight italic transition-colors ${
                isHeroDark ? 'text-white' : 'text-[#E62225]'
              }`}
            >
              zuppo
            </span>
          </motion.button>

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
                  <motion.span
                    layoutId="desktopNavDot"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#E62225]"
                  />
                )}
              </button>
            ))}

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={ZUPPO_LINKS.apk.customer}
              className="cta-shimmer inline-flex items-center gap-2 bg-[#E62225] hover:bg-[#cc1b1e] text-white text-sm font-extrabold px-4 py-2.5 rounded-full shadow-md shadow-red-500/25 transition-colors"
            >
              <Download className="w-4 h-4" />
              Get the App
            </motion.a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <AnimatePresence>
              {scrolled && !mobileOpen && (
                <motion.a
                  initial={{ opacity: 0, scale: 0.85, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: 10 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.94 }}
                  href={ZUPPO_LINKS.apk.customer}
                  className="inline-flex items-center gap-1.5 bg-[#E62225] text-white text-xs font-extrabold px-3 py-2 rounded-full shadow-sm shadow-red-500/25"
                >
                  <Download className="w-3.5 h-3.5" />
                  Get App
                </motion.a>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isHeroDark
                  ? 'text-white bg-white/15 backdrop-blur-md'
                  : 'text-slate-800 bg-slate-100'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Animated Mobile Sheet Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white/98 backdrop-blur-xl border-b border-slate-200/80 shadow-2xl rounded-b-3xl"
            >
              <div className="px-4 pt-2 pb-5 space-y-1.5">
                {[
                  { label: 'Home', to: '/' as AppRoute },
                  { label: 'Add Restaurant', to: '/partner' as AppRoute },
                  { label: 'Deliver with Zuppo', to: '/rider' as AppRoute },
                  { label: 'Help & Support', to: '/support' as AppRoute },
                  { label: 'Privacy Policy', to: '/privacy-policy' as AppRoute },
                ].map((item, idx) => (
                  <motion.button
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035, duration: 0.2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => go(item.to)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-bold transition-colors ${
                      route === item.to
                        ? 'bg-[#FFF2F2] text-[#E62225]'
                        : 'text-slate-700 active:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  whileTap={{ scale: 0.97 }}
                  href={ZUPPO_LINKS.apk.customer}
                  className="cta-shimmer mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#E62225] text-white text-sm font-extrabold px-4 py-3.5 rounded-2xl shadow-lg shadow-red-500/25"
                >
                  <Download className="w-4 h-4" />
                  Download Zuppo Android APK
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay to close mobile menu on tap outside */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </>
  );
};
