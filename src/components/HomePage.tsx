import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Bike,
  ChevronDown,
  Coins,
  Download,
  Headphones,
  Leaf,
  MapPin,
  Percent,
  ShieldCheck,
  Sparkles,
  Store,
  Wallet,
  Zap,
} from 'lucide-react';
import { AppRoute, ZUPPO_LINKS } from '../config/links';

interface HomePageProps {
  navigate: (to: AppRoute) => void;
}

interface FeatureTile {
  id: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  tip: string;
  iconBg: string;
  offset: string;
}

const LEFT_TILES: FeatureTile[] = [
  {
    id: 'gps',
    icon: MapPin,
    label: 'Live GPS\nTracking',
    tip: 'Track your rider live from kitchen to doorstep.',
    iconBg: 'bg-sky-50 text-sky-600',
    offset: 'lg:translate-y-0',
  },
  {
    id: 'veg',
    icon: Leaf,
    label: 'Pure Veg\nMode',
    tip: '1-tap filter for 100% vegetarian dishes & kitchens.',
    iconBg: 'bg-emerald-50 text-emerald-600',
    offset: 'lg:translate-y-6',
  },
  {
    id: 'coins',
    icon: Coins,
    label: 'Zuppo\nCoins',
    tip: 'Earn & redeem Zuppo Coins directly at checkout.',
    iconBg: 'bg-amber-50 text-amber-600',
    offset: 'lg:translate-y-2',
  },
  {
    id: 'deals',
    icon: Percent,
    label: 'Flash\nDeals',
    tip: 'Daily Ambikapur hotel offers & free delivery deals.',
    iconBg: 'bg-rose-50 text-[#E62225]',
    offset: 'lg:translate-y-8',
  },
];

const RIGHT_TILES: FeatureTile[] = [
  {
    id: 'pay',
    icon: Wallet,
    label: 'COD &\nUPI Pay',
    tip: 'Pay with Cash on Delivery or instant UPI — zero fuss.',
    iconBg: 'bg-violet-50 text-violet-600',
    offset: 'lg:translate-y-6',
  },
  {
    id: 'fast',
    icon: Zap,
    label: 'Fast\nDelivery',
    tip: 'Hot, fresh food delivered across Ambikapur in minutes.',
    iconBg: 'bg-orange-50 text-orange-600',
    offset: 'lg:translate-y-0',
  },
  {
    id: 'verified',
    icon: ShieldCheck,
    label: 'Verified\nKitchens',
    tip: 'Every restaurant & rider is manually KYC verified.',
    iconBg: 'bg-teal-50 text-teal-600',
    offset: 'lg:translate-y-8',
  },
  {
    id: 'support',
    icon: Headphones,
    label: 'Local\nSupport',
    tip: 'Real local Ambikapur support whenever you need help.',
    iconBg: 'bg-pink-50 text-pink-600',
    offset: 'lg:translate-y-2',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const foodSectionRef = useRef<HTMLDivElement>(null);
  const phoneSectionRef = useRef<HTMLDivElement>(null);

  const [phoneView, setPhoneView] = useState<'home' | 'dish'>('home');
  const [activeTile, setActiveTile] = useState<FeatureTile | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Subtle hero scroll parallax & fade
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const heroContentY = useTransform(heroScroll, [0, 1], [0, 64]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.72], [1, 0]);
  const heroVideoScale = useTransform(heroScroll, [0, 1], [1.02, 1.12]);

  // Food section scroll-driven parallax (tuned smoothly for both mobile & desktop)
  const { scrollYProgress } = useScroll({
    target: foodSectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.35,
  });

  const burgerX = useTransform(smoothProgress, [0, 0.48, 1], [-56, 0, -18]);
  const burgerY = useTransform(smoothProgress, [0, 0.48, 1], [34, 0, -48]);
  const burgerRotate = useTransform(smoothProgress, [0, 0.48, 1], [-14, 3, 12]);

  const pizzaX = useTransform(smoothProgress, [0, 0.48, 1], [56, 0, 18]);
  const pizzaY = useTransform(smoothProgress, [0, 0.48, 1], [38, 0, -52]);
  const pizzaRotate = useTransform(smoothProgress, [0, 0.48, 1], [14, -3, -12]);

  const momosX = useTransform(smoothProgress, [0, 0.55, 1], [-48, 0, -14]);
  const momosY = useTransform(smoothProgress, [0, 0.55, 1], [60, 0, -40]);

  const biryaniX = useTransform(smoothProgress, [0, 0.55, 1], [48, 0, 14]);
  const biryaniY = useTransform(smoothProgress, [0, 0.55, 1], [60, 0, -40]);

  // Mobile-friendly gentle horizontal glide for momos & biryani row
  const mobileMomosX = useTransform(smoothProgress, [0.15, 0.55, 0.9], [-22, 0, -10]);
  const mobileBiryaniX = useTransform(smoothProgress, [0.15, 0.55, 0.9], [22, 0, 10]);

  // Scroll-driven phone rising smoothly from bottom (Zomato.com signature effect)
  const { scrollYProgress: phoneScrollProgress } = useScroll({
    target: phoneSectionRef,
    offset: ['start end', 'center center'],
  });
  const smoothPhoneProgress = useSpring(phoneScrollProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const phoneRiseY = useTransform(smoothPhoneProgress, [0, 1], [110, 0]);
  const phoneScale = useTransform(smoothPhoneProgress, [0, 1], [0.93, 1]);

  const scrollToFood = () => {
    foodSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTileTap = (tile: FeatureTile) => {
    setActiveTile((prev) => (prev?.id === tile.id ? null : tile));
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* ===================================================================== */}
      {/* SECTION 1: FULL-SCREEN CINEMATIC HERO VIDEO (MOBILE + DESKTOP TUNED)  */}
      {/* ===================================================================== */}
      <section
        ref={heroSectionRef}
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-end sm:justify-center overflow-hidden bg-[#0B0F19]"
      >
        {/* Warm Dark Shimmer Skeleton while Hero Video buffers */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[#161114] via-[#211518] to-[#0B0F19] transition-opacity duration-700 ${
            videoReady ? 'opacity-0' : 'opacity-100 animate-pulse'
          }`}
        />

        {/* Looping Background Food Video */}
        <motion.video
          style={{ scale: heroVideoScale }}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          src="/hero-food.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* Cinematic Gradient Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.65)_100%)]" />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-24 pb-10 sm:py-20 text-center flex flex-col items-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white/95 text-xs sm:text-sm font-bold mb-4 sm:mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            Now Serving {ZUPPO_LINKS.city}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-black italic tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
          >
            zuppo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2.5 text-[32px] sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md"
          >
            Ambikapur&apos;s #1
            <br />
            food delivery app
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3.5 max-w-md sm:max-w-xl text-[13.5px] sm:text-lg text-white/85 font-medium leading-relaxed"
          >
            Fast, fresh doorstep delivery from Ambikapur&apos;s favourite kitchens — with live GPS tracking and zero fuss.
          </motion.p>

          {/* Download Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-none"
          >
            {/* Primary Direct APK Download */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={ZUPPO_LINKS.apk.customer}
              className="cta-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E62225] hover:bg-[#cf1b1e] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-xl shadow-red-600/35 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Android App
            </motion.a>

            {/* Google Play & App Store — Coming Soon */}
            <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center justify-center gap-2.5">
              <div className="inline-flex items-center justify-center sm:justify-start gap-2 bg-black/70 backdrop-blur-md border border-white/20 text-white px-3.5 py-2.5 rounded-2xl select-none">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.77 1.77 0 0 1-.61-1.34V3.154c0-.525.235-.996.609-1.34zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Coming Soon
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold">Google Play</div>
                </div>
              </div>

              <div className="inline-flex items-center justify-center sm:justify-start gap-2 bg-black/70 backdrop-blur-md border border-white/20 text-white px-3.5 py-2.5 rounded-2xl select-none">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.32c.67-.81 1.12-1.94 1-3.07-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.86-1 2.96 1.07.08 2.16-.53 2.82-1.34" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Coming Soon
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold">App Store</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.button
            onClick={scrollToFood}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 sm:mt-14 inline-flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-bold tracking-widest uppercase">Scroll down</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: ZOMATO-STYLE SCROLL-PARALLAX FLOATING FOOD SECTION         */}
      {/* ===================================================================== */}
      <section
        ref={foodSectionRef}
        className="relative w-full bg-white pt-14 pb-16 sm:py-36 overflow-hidden"
      >
        {/* Subtle decorative arched rings like Zomato.com */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[380px] sm:w-[820px] h-[380px] sm:h-[820px] rounded-full border border-red-100/80" />
          <div className="absolute w-[240px] sm:w-[540px] h-[240px] sm:h-[540px] rounded-full border border-orange-100/70" />
        </div>

        {/* Desktop Floating Scroll-Parallax Burger (Top-Left) */}
        <motion.img
          src="/images/food-burger.webp"
          alt="Gourmet Burger"
          style={{ x: burgerX, y: burgerY, rotate: burgerRotate }}
          className="food-blend pointer-events-none select-none hidden sm:block absolute left-4 md:left-12 lg:left-24 top-14 w-44 md:w-56 object-contain drop-shadow-2xl will-change-transform"
        />

        {/* Desktop Floating Scroll-Parallax Pizza (Top-Right) */}
        <motion.img
          src="/images/food-pizza.webp"
          alt="Loaded Cheese Pizza"
          style={{ x: pizzaX, y: pizzaY, rotate: pizzaRotate }}
          className="food-blend pointer-events-none select-none hidden sm:block absolute right-4 md:right-12 lg:right-24 top-16 w-44 md:w-56 object-contain drop-shadow-2xl will-change-transform"
        />

        {/* Desktop Floating Scroll-Parallax Momos (Bottom-Left) */}
        <motion.img
          src="/images/food-momos.webp"
          alt="Steaming Momos"
          style={{ x: momosX, y: momosY }}
          className="food-blend pointer-events-none select-none hidden sm:block absolute left-4 md:left-16 lg:left-28 bottom-12 w-36 md:w-48 object-contain drop-shadow-xl will-change-transform"
        />

        {/* Desktop Floating Scroll-Parallax Biryani (Bottom-Right) */}
        <motion.img
          src="/images/food-biryani.webp"
          alt="Royal Saffron Biryani"
          style={{ x: biryaniX, y: biryaniY }}
          className="food-blend pointer-events-none select-none hidden sm:block absolute right-4 md:right-16 lg:right-28 bottom-12 w-36 md:w-48 object-contain drop-shadow-xl will-change-transform"
        />

        {/* Mobile-Only Balanced Top Food Pair (Clean Clearance Below Navbar) */}
        <div className="sm:hidden relative z-10 flex items-center justify-between px-4 mb-2">
          <motion.img
            src="/images/food-burger.webp"
            alt="Gourmet Burger"
            style={{ x: burgerX, rotate: burgerRotate }}
            className="food-blend w-24 h-24 object-contain drop-shadow-lg will-change-transform"
          />
          <motion.img
            src="/images/food-pizza.webp"
            alt="Loaded Cheese Pizza"
            style={{ x: pizzaX, rotate: pizzaRotate }}
            className="food-blend w-24 h-24 object-contain drop-shadow-lg will-change-transform"
          />
        </div>

        {/* Center Editorial Copy */}
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center sm:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#E62225] bg-red-50 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Made for Ambikapur
            </span>

            <h2 className="mt-4 text-[34px] sm:text-5xl md:text-6xl font-black tracking-tight text-[#E62225] leading-[1.06]">
              Better food for
              <br />
              every craving
            </h2>

            <p className="mt-4 text-slate-600 text-[14.5px] sm:text-lg max-w-md sm:max-w-xl mx-auto leading-relaxed font-medium">
              From piping hot biryani and tandoori feasts to crispy burgers, pizzas, and steaming momos — Zuppo brings Ambikapur&apos;s best local kitchens straight to your doorstep.
            </p>
          </motion.div>

          {/* Mobile-Only Bottom Food Pair with Scroll Glide */}
          <div className="sm:hidden mt-6 flex items-center justify-center gap-8">
            <motion.img
              src="/images/food-momos.webp"
              alt="Momos"
              style={{ x: mobileMomosX }}
              className="food-blend w-24 h-24 object-contain animate-float-slow will-change-transform"
            />
            <motion.img
              src="/images/food-biryani.webp"
              alt="Biryani"
              style={{ x: mobileBiryaniX }}
              className="food-blend w-24 h-24 object-contain animate-float-delayed will-change-transform"
            />
          </div>

          {/* Crisp Stats Strip (Zomato-style floating white card with tactile tap) */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 sm:mt-16 bg-white/95 backdrop-blur-md border border-slate-200/85 rounded-3xl shadow-[0_14px_40px_rgba(15,23,42,0.06)] py-5 px-3 sm:p-8 grid grid-cols-3 divide-x divide-slate-200"
          >
            {[
              { value: '15+', label: 'Local Kitchens', accent: false },
              { value: '70+', label: 'Fresh Dishes', accent: false },
              { value: 'Live', label: 'GPS Tracking', accent: true },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileTap={{ scale: 0.94 }}
                className="px-2 sm:px-4 select-none cursor-default"
              >
                <div
                  className={`text-2xl sm:text-4xl font-black ${
                    stat.accent ? 'text-[#E62225]' : 'text-slate-900'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] sm:text-sm font-semibold text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: ZOMATO-STYLE RISING REAL PHONE + INFINITE FLOATING MARQUEE */}
      {/* ===================================================================== */}
      <section
        ref={phoneSectionRef}
        className="relative w-full bg-gradient-to-b from-[#FFF3F4] via-[#FFF9F9] to-white pt-16 sm:pt-28 pb-10 sm:pb-12 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-5">
          {/* Clean Editorial Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className="text-[32px] sm:text-5xl md:text-[54px] font-black tracking-tight text-[#E62225] leading-[1.08]">
              What&apos;s waiting for you
              <br />
              on the app?
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
              Packed with features that make ordering across Ambikapur effortless.
            </p>

            {/* Interactive Micro-Interaction: Segmented Screen Preview Switch */}
            <div className="mt-5 inline-flex items-center p-1 rounded-full bg-white/90 border border-rose-100 shadow-xs">
              {(
                [
                  { key: 'home', label: 'Home Feed' },
                  { key: 'dish', label: 'Dish Details' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPhoneView(tab.key)}
                  className={`relative px-4 py-1.5 text-xs font-extrabold rounded-full transition-colors cursor-pointer ${
                    phoneView === tab.key ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {phoneView === tab.key && (
                    <motion.span
                      layoutId="phoneScreenTab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#E62225] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Center Real Zuppo App Phone — Crisp Natural Aspect Ratio, Rises Smoothly from Bottom */}
          <div className="relative mt-9 sm:mt-12 mx-auto flex flex-col items-center overflow-hidden pt-2">
            {/* Soft warm halo behind phone */}
            <div className="pointer-events-none absolute -bottom-8 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-[#E62225]/12 blur-3xl" />

            <motion.div
              style={{ y: phoneRiseY, scale: phoneScale }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setPhoneView((prev) => (prev === 'home' ? 'dish' : 'home'))}
              title="Tap to switch app preview"
              className="relative w-[248px] sm:w-[292px] rounded-t-[38px] sm:rounded-t-[44px] bg-[#111318] pt-[8px] sm:pt-[9px] px-[8px] sm:px-[9px] pb-0 shadow-[0_-10px_54px_rgba(15,23,42,0.16)] border-x-[2px] border-t-[2px] border-[#2A2E37] cursor-pointer will-change-transform"
            >
              {/* Real App Screen — True Mobile Proportions (No Overlapping Fake Notch!) */}
              <div className="rounded-t-[30px] sm:rounded-t-[35px] overflow-hidden bg-white aspect-[9/15.8] relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={phoneView}
                    src={
                      phoneView === 'home'
                        ? '/images/zuppo-app-screen.jpg'
                        : '/images/zuppo-app-dish.png'
                    }
                    alt={
                      phoneView === 'home'
                        ? 'Zuppo App Home Feed'
                        : 'Zuppo Double Cheese Crunchy Burger Screen'
                    }
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover object-top select-none"
                  />
                </AnimatePresence>

                {/* Subtle bottom fade into white section floor */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Clean, Calm Static Editorial Feature Strip (Zero Spinning, Zero AI Boxes!) */}
          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto border-t border-rose-100/90 pt-7 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 text-center">
            {LEFT_TILES.map((item) => {
              const isSelected = activeTile?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTileTap(item)}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${item.iconBg}`}
                  >
                    <item.icon className="w-4 h-4 stroke-[2.3]" />
                  </div>
                  <div
                    className={`mt-2.5 text-xs sm:text-sm font-extrabold transition-colors ${
                      isSelected ? 'text-[#E62225]' : 'text-slate-900 group-hover:text-[#E62225]'
                    }`}
                  >
                    {item.label.replace('\n', ' ')}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500 font-medium leading-snug max-w-[165px]">
                    {item.tip}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: ZOMATO-STYLE LIGHT BLUSH DOWNLOAD SHOWCASE                 */}
      {/* ===================================================================== */}
      <section className="w-full bg-white pt-10 sm:pt-24 pb-14 sm:pb-24 px-4 sm:px-5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="relative rounded-[30px] sm:rounded-[36px] bg-gradient-to-br from-[#FFF5F5] via-[#FFFBFB] to-[#FFF1EE] border border-[#FAD4D6] px-5 sm:px-14 pt-9 pb-8 md:pt-14 md:pb-0 overflow-hidden shadow-[0_20px_60px_rgba(230,34,37,0.07)]"
          >
            {/* Soft warm ambient glow */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#E62225]/10 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] items-end gap-7 md:gap-10">
              {/* Left Copy & (Desktop) Store Buttons */}
              <div className="text-center md:text-left md:pb-14">
                <h2 className="text-[28px] sm:text-4xl md:text-[42px] font-black tracking-tight text-slate-900 leading-[1.12]">
                  Download the app now!
                </h2>
                <p className="mt-3 text-slate-600 text-[13.5px] sm:text-base font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                  Experience seamless food ordering, live rider tracking, and exclusive local deals — only on the Zuppo app.
                </p>

                {/* Desktop-Only Buttons (Left column) */}
                <div className="hidden md:block">
                  <div className="mt-7 flex items-start gap-3">
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      href={ZUPPO_LINKS.apk.customer}
                      className="cta-shimmer inline-flex items-center justify-center gap-2.5 bg-[#E62225] hover:bg-[#cf1b1e] text-white font-extrabold text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-red-500/25 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Android APK
                    </motion.a>
                  </div>

                  <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                    <div className="inline-flex items-center gap-2 bg-[#111318] text-white px-3.5 py-2.5 rounded-xl select-none">
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.77 1.77 0 0 1-.61-1.34V3.154c0-.525.235-.996.609-1.34zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                      </svg>
                      <div className="text-left leading-tight">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                          Coming Soon
                        </div>
                        <div className="text-xs font-extrabold">Google Play</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-[#111318] text-white px-3.5 py-2.5 rounded-xl select-none">
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.32c.67-.81 1.12-1.94 1-3.07-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.86-1 2.96 1.07.08 2.16-.53 2.82-1.34" />
                      </svg>
                      <div className="text-left leading-tight">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                          Coming Soon
                        </div>
                        <div className="text-xs font-extrabold">App Store</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peeking Real Zuppo Dish Details Phone — True Tall Smartphone Proportions */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto w-[205px] sm:w-[235px] md:w-[250px] rounded-[34px] md:rounded-b-none md:rounded-t-[40px] bg-[#111318] p-[7px] md:p-[8px] md:pb-0 shadow-[0_18px_45px_rgba(15,23,42,0.18)] md:shadow-[0_-10px_40px_rgba(15,23,42,0.14)] border-[2px] md:border-b-0 border-[#2A2E37]"
              >
                <div className="rounded-[27px] md:rounded-b-none md:rounded-t-[32px] overflow-hidden bg-white md:aspect-[9/15.2] relative">
                  <img
                    src="/images/zuppo-app-dish.png"
                    alt="Zuppo App Dish Preview"
                    className="w-full h-auto md:h-full md:object-cover md:object-top block select-none"
                  />
                </div>
              </motion.div>

              {/* Mobile-Only Buttons BELOW Phone Image */}
              <div className="md:hidden w-full">
                <motion.a
                  whileTap={{ scale: 0.96 }}
                  href={ZUPPO_LINKS.apk.customer}
                  className="cta-shimmer w-full inline-flex items-center justify-center gap-2.5 bg-[#E62225] hover:bg-[#cf1b1e] text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-red-500/25 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Android APK
                </motion.a>

                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <div className="inline-flex items-center justify-center gap-2 bg-[#111318] text-white px-3.5 py-2.5 rounded-xl select-none">
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.77 1.77 0 0 1-.61-1.34V3.154c0-.525.235-.996.609-1.34zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                        Coming Soon
                      </div>
                      <div className="text-xs font-extrabold">Google Play</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center justify-center gap-2 bg-[#111318] text-white px-3.5 py-2.5 rounded-xl select-none">
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.32c.67-.81 1.12-1.94 1-3.07-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.86-1 2.96 1.07.08 2.16-.53 2.82-1.34" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                        Coming Soon
                      </div>
                      <div className="text-xs font-extrabold">App Store</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clean Editorial Partner & Rider Strip */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/partner')}
              className="group flex items-center justify-between gap-4 bg-slate-50 hover:bg-[#FFF5F5] border border-slate-200/80 hover:border-[#FAD4D6] rounded-2xl px-5 sm:px-6 py-4 sm:py-5 text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-[#E62225] shadow-xs shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    Partner with Zuppo
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    List your restaurant & grow orders in Ambikapur
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#E62225] group-hover:translate-x-1 transition-all shrink-0" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/rider')}
              className="group flex items-center justify-between gap-4 bg-slate-50 hover:bg-[#FFF5F5] border border-slate-200/80 hover:border-[#FAD4D6] rounded-2xl px-5 sm:px-6 py-4 sm:py-5 text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    Deliver with Zuppo
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Flexible hours & fast weekly payouts for riders
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
};
