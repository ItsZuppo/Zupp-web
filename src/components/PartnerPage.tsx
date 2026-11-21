import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, MessageCircle } from 'lucide-react';
import { ZUPPO_LINKS } from '../config/links';
import { InquiryForm } from './InquiryForm';

export const PartnerPage: React.FC = () => {
  return (
    <main className="w-full bg-white">
      {/* Full-Bleed Sexy Editorial Hero — Airy Stacked Photo on Mobile, Widescreen Cinema on Desktop */}
      <section className="relative w-full bg-[#110C0A] text-white pt-16 sm:pt-36 pb-12 sm:pb-24 overflow-hidden">
        {/* Mobile-Only Clean Unobstructed Hero Photo at Top */}
        <div className="sm:hidden relative w-full h-[230px] overflow-hidden">
          <img
            src="/images/partner-hero.jpg"
            alt="Zuppo Partner Kitchen"
            className="w-full h-full object-cover object-[78%_20%] select-none"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#110C0A] via-[#110C0A]/60 to-transparent" />
        </div>

        {/* Desktop-Only Widescreen Cinema Background */}
        <img
          src="/images/partner-hero.jpg"
          alt="Zuppo Partner Kitchen"
          className="hidden sm:block pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-right-top opacity-90"
        />
        <div className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-r from-[#110C0A] via-[#110C0A]/75 to-transparent" />
        <div className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-t from-[#110C0A] via-transparent to-[#110C0A]/45" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 -mt-4 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Zuppo Partner • Ambikapur
            </div>

            <h1 className="mt-3 sm:mt-4 text-[32px] sm:text-6xl md:text-[64px] font-black tracking-tight leading-[1.06]">
              Turn every table into
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FBBF24]">
                city-wide orders.
              </span>
            </h1>

            <p className="mt-3.5 sm:mt-5 text-slate-300 text-[13.5px] sm:text-lg font-medium max-w-xl leading-relaxed">
              Reach hungry customers across Ambikapur with live kitchen order chimes, cloud menu control, and weekly bank payouts.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={ZUPPO_LINKS.apk.partner}
                className="cta-shimmer flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-600/30 transition-colors"
              >
                <Download className="w-4 h-4 shrink-0" />
                Partner APK
              </motion.a>
              <a
                href={ZUPPO_LINKS.whatsappPartnerUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-3.5 rounded-2xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                WhatsApp
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </motion.div>

          {/* Airy Compact Inline Tagline on Mobile, Hairline Metrics on Desktop */}
          <div className="sm:hidden mt-6 pt-5 border-t border-white/10 text-xs font-bold text-slate-400 flex items-center justify-between">
            <span>Fast KYC</span>
            <span className="text-orange-400">• Cloud Menu •</span>
            <span>Weekly Payouts</span>
          </div>

          <div className="hidden sm:grid mt-14 pt-8 border-t border-white/10 grid-cols-3 gap-6 max-w-2xl">
            <div>
              <div className="text-3xl font-black text-white">0 Hassle</div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Fast local KYC setup
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-orange-400">Live</div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Menu & price control
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">Weekly</div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Direct bank payouts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial 2-Column Split: Clean Numbered Process + Direct Application Form */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
          {/* Left: Clean Editorial Steps (Zero SaaS Icon Cards!) */}
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#EA580C]">
              Why kitchens choose Zuppo
            </div>
            <h2 className="mt-2.5 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Built for real Ambikapur kitchens — not spreadsheets.
            </h2>

            <div className="mt-10 divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
              {[
                {
                  num: '01',
                  title: 'Instant Kitchen Order Chimes',
                  desc: 'Never miss an incoming order — loud real-time kitchen alerts, prep timer controls, and cooking notes straight on your phone.',
                },
                {
                  num: '02',
                  title: 'Cloud Menu Studio',
                  desc: 'Update dish prices, mark items out-of-stock in 1 tap, and upload mouthwatering food photos anytime without waiting on support.',
                },
                {
                  num: '03',
                  title: 'Zero-Drama Weekly Payouts',
                  desc: 'Track daily sales, order history, and clean settlement summaries with direct UPI or bank payouts every week.',
                },
              ].map((step) => (
                <div key={step.num} className="py-6 flex gap-5">
                  <span className="text-sm font-black text-[#EA580C] tabular-nums pt-0.5">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Restaurant Onboarding Form (Direct to Supabase) */}
          <InquiryForm
            type="partner"
            accent="orange"
            heading="Register Your Restaurant"
            subheading="Drop your restaurant details below — our Ambikapur onboarding team will get you live fast."
            subjectLabel="Restaurant / Kitchen Name"
            subjectPlaceholder="e.g. Spice Garden, Gandhi Chowk"
            messageLabel="Location & Cuisine Details"
            messagePlaceholder="Share your area in Ambikapur, cuisine type (Veg / Non-Veg / Cafe), and best time to call..."
            submitLabel="Submit Partner Application"
          />
        </div>
      </section>
    </main>
  );
};
