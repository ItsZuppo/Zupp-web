import React from 'react';
import { AppRoute, ZUPPO_LINKS } from '../config/links';

interface FooterProps {
  navigate: (to: AppRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#0B0F19] text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-5 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-10 border-b border-slate-800">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer w-fit"
          >
            <img
              src="/images/zuppo-customer.png"
              alt="Zuppo"
              className="w-9 h-9 rounded-xl"
            />
            <span className="text-2xl font-black italic tracking-tight text-white">
              zuppo
            </span>
          </button>
          <div className="text-xs font-bold text-slate-400">
            Serving {ZUPPO_LINKS.city} • {ZUPPO_LINKS.supportEmail}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              For Restaurants
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/partner')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <a
                  href={ZUPPO_LINKS.apk.partner}
                  className="hover:text-white transition-colors"
                >
                  Zuppo Partner App (APK)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              For Delivery Partners
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/rider')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Join as a Rider
                </button>
              </li>
              <li>
                <a
                  href={ZUPPO_LINKS.apk.rider}
                  className="hover:text-white transition-colors"
                >
                  Zuppo Rider App (APK)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Learn More
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/refund-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cancellation & Refund
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/delete-account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Support & Apps
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigate('/support')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help & Support
                </button>
              </li>
              <li>
                <a
                  href={ZUPPO_LINKS.apk.customer}
                  className="hover:text-white transition-colors"
                >
                  Download Customer APK
                </a>
              </li>
              <li className="text-xs text-slate-500 pt-1">
                Google Play & Apple App Store — Coming Soon
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Zuppo. All rights reserved.</div>
          <div>Built with ❤️ for Ambikapur</div>
        </div>
      </div>
    </footer>
  );
};
