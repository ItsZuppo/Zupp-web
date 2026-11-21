import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, MessageCircle } from 'lucide-react';
import { ZUPPO_LINKS } from '../config/links';
import { InquiryForm } from './InquiryForm';

export const RiderPage: React.FC = () => {
  return (
    <main className="w-full bg-white">
      {/* Full-Bleed Sexy Editorial Hero — Airy Stacked Photo on Mobile, Widescreen Cinema on Desktop */}
      <section className="relative w-full bg-[#071410] text-white pt-16 sm:pt-36 pb-12 sm:pb-24 overflow-hidden">
        {/* Mobile-Only Clean Unobstructed Hero Photo at Top */}
        <div className="sm:hidden relative w-full h-[230px] overflow-hidden">
          <img
            src="/images/rider-hero.jpg"
            alt="Zuppo Delivery Partner"
            className="w-full h-full object-cover object-[76%_15%] select-none"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071410] via-[#071410]/60 to-transparent" />
        </div>

        {/* Desktop-Only Widescreen Cinema Background */}
        <img
          src="/images/rider-hero.jpg"
          alt="Zuppo Delivery Partner"
          className="hidden sm:block pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-right-top opacity-90"
        />
        <div className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071410] via-[#071410]/75 to-transparent" />
        <div className="hidden sm:block pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071410] via-transparent to-[#071410]/45" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 -mt-4 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Zuppo Fleet • Ambikapur
            </div>

            <h1 className="mt-3 sm:mt-4 text-[32px] sm:text-6xl md:text-[64px] font-black tracking-tight leading-[1.06]">
              Ride on your hours.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Earn every week.
              </span>
            </h1>

            <p className="mt-3.5 sm:mt-5 text-slate-300 text-[13.5px] sm:text-lg font-medium max-w-xl leading-relaxed">
              Toggle Duty ON anytime, navigate smoothly with live GPS radar, and receive fast weekly payouts across Ambikapur.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={ZUPPO_LINKS.apk.rider}
                className="cta-shimmer flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-colors"
              >
                <Download className="w-4 h-4 shrink-0" />
                Rider APK
              </motion.a>
              <a
                href={ZUPPO_LINKS.whatsappRiderUrl}
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
            <span>Flexible Hours</span>
            <span className="text-emerald-400">• Live GPS •</span>
            <span>Fast Payouts</span>
          </div>

          <div className="hidden sm:grid mt-14 pt-8 border-t border-white/10 grid-cols-3 gap-6 max-w-2xl">
            <div>
              <div className="text-3xl font-black text-white">Flexible</div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Part-time or full-time
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">Live GPS</div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Smart Ambikapur routing
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">Fast Pay</div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Transparent payouts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial 2-Column Split: Clean Numbered Steps + Direct Rider Form */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
          {/* Left: Clean Editorial Steps */}
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600">
              How it works
            </div>
            <h2 className="mt-2.5 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Start delivering in 3 simple steps.
            </h2>

            <div className="mt-10 divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
              {[
                {
                  num: '01',
                  title: 'Submit Your Quick Application',
                  desc: 'Fill the short form with your phone number and vehicle details (Bike / Scooter / EV). Our local team verifies your KYC quickly.',
                },
                {
                  num: '02',
                  title: 'Go Online Anytime',
                  desc: 'Open the Zuppo Rider app, toggle Duty ON, and receive instant order alerts near your live GPS location in Ambikapur.',
                },
                {
                  num: '03',
                  title: 'Deliver & Track Earnings Live',
                  desc: 'Pick up hot food, follow crisp map directions, and watch your wallet & weekly payouts grow transparently.',
                },
              ].map((step) => (
                <div key={step.num} className="py-6 flex gap-5">
                  <span className="text-sm font-black text-emerald-600 tabular-nums pt-0.5">
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

          {/* Right: Live Rider Application Form (Direct to Supabase) */}
          <InquiryForm
            type="rider"
            accent="emerald"
            heading="Apply as a Delivery Partner"
            subheading="Leave your phone number or email — our fleet manager will contact you for quick KYC onboarding."
            subjectLabel="Vehicle Type"
            subjectPlaceholder="e.g. Bike / Scooter / Electric Two-Wheeler"
            messageLabel="Your Area & Availability"
            messagePlaceholder="Share your area in Ambikapur and whether you prefer full-time or part-time shifts..."
            submitLabel="Submit Rider Application"
          />
        </div>
      </section>
    </main>
  );
};
