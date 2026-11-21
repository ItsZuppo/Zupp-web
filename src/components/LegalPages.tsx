import React from 'react';
import { Mail, MapPin, MessageCircle, Phone, ShieldAlert } from 'lucide-react';
import { AppRoute, ZUPPO_LINKS } from '../config/links';
import { InquiryForm } from './InquiryForm';

interface LegalPageProps {
  route: Exclude<AppRoute, '/' | '/rider' | '/partner' | '/admin'>;
}

export const LegalPages: React.FC<LegalPageProps> = ({ route }) => {
  if (route === '/support') {
    return (
      <main className="w-full bg-white">
        {/* Full-Bleed Clean Editorial Header */}
        <section className="relative w-full bg-[#0F1117] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 w-[380px] h-[380px] rounded-full bg-[#E62225]/20 blur-[120px]" />
          <div className="relative z-10 max-w-6xl mx-auto px-5">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#FF6B6B]">
              <span className="w-2 h-2 rounded-full bg-[#E62225]" />
              Zuppo Helpdesk • Ambikapur
            </div>
            <h1 className="mt-3.5 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
              How can we help you?
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-lg font-medium max-w-xl leading-relaxed">
              Submit a support ticket, restaurant inquiry, rider question, or general message — just drop your phone number or email ID and our local team will reply fast.
            </p>
          </div>
        </section>

        {/* 2-Column Split: Direct Channels + Live Supabase Form */}
        <section className="max-w-6xl mx-auto px-5 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Direct Channels</h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Prefer calling or messaging directly? Reach our Ambikapur operations desk anytime between 9:00 AM – 11:00 PM.
                </p>
              </div>

              <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
                <a
                  href={`mailto:${ZUPPO_LINKS.supportEmail}`}
                  className="py-5 flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#E62225] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Support
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#E62225] transition-colors">
                      {ZUPPO_LINKS.supportEmail}
                    </div>
                  </div>
                </a>

                <a
                  href={ZUPPO_LINKS.whatsappSupportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-5 flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      WhatsApp & Phone
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {ZUPPO_LINKS.supportPhoneDisplay}
                    </div>
                  </div>
                </a>

                <div className="py-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Operations Hub
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      Ambikapur, Surguja, Chhattisgarh 497001
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <InquiryForm
              type="support"
              accent="red"
              heading="Send a Message or Support Request"
              subheading="Enter your phone number or email ID so we can get back to you quickly."
              topicOptions={[
                'Order Support',
                'General Contact',
                'Refund / Payment',
                'Restaurant Inquiry',
                'Rider Inquiry',
              ]}
              subjectLabel="Subject"
              subjectPlaceholder="How can we help?"
              messageLabel="Your Message / Order ID"
              messagePlaceholder="Describe your issue, Order ID, or question in brief..."
              submitLabel="Submit Request"
            />
          </div>
        </section>
      </main>
    );
  }

  if (route === '/delete-account') {
    return (
      <main className="pt-28 pb-20 bg-slate-50 min-h-screen px-5">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-7 sm:p-10">
            <h1 className="text-3xl font-black text-slate-900">Account & Data Deletion</h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              You can permanently delete your Zuppo account (Customer, Rider, or Partner) directly inside the Zuppo mobile app under <strong>Profile → Account Settings → Delete Account</strong>, or submit a verified deletion request below.
            </p>
            <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900">
                Deleting your account permanently removes your profile, saved addresses, and active login credentials within 7 business days. Minimal invoice/transaction logs may be retained where required by Indian tax law.
              </p>
            </div>
          </div>

          <InquiryForm
            type="delete_account"
            accent="red"
            heading="Request Account Deletion"
            subheading="Provide your registered phone number or email ID so our team can verify and permanently delete your Zuppo account."
            subjectLabel="App Role"
            subjectPlaceholder="Customer / Rider / Partner"
            messageLabel="Confirmation Note"
            messagePlaceholder="Please delete my Zuppo account and all associated personal data."
            submitLabel="Submit Deletion Request"
          />
        </div>
      </main>
    );
  }

  const contentMap = {
    '/privacy-policy': {
      title: 'Privacy Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'Zuppo collects only the information required to deliver food orders safely across Ambikapur: your name, email address, phone number, delivery addresses, and order history. For Delivery Partners and Restaurant Partners, we collect KYC verification details (such as Aadhaar/PAN/FSSAI/Vehicle details and payout bank/UPI information) strictly for onboarding and payouts.',
        },
        {
          heading: '2. Location Data Usage',
          body: 'Zuppo Customer uses foreground location to help you pin your exact delivery address and show nearby open restaurants. Zuppo Rider uses foreground and background location only while a delivery partner toggles ON DUTY, so customers can track live order progress accurately.',
        },
        {
          heading: '3. Camera & Photo Library',
          body: 'Camera and photo library access is requested only when you choose to upload a profile picture, restaurant dish photo, or partner KYC verification document.',
        },
        {
          heading: '4. Data Security & Sharing',
          body: 'We never sell your personal data. Necessary order details (name, delivery address, and phone number) are shared strictly with the restaurant preparing your order and the assigned Zuppo delivery partner to complete delivery.',
        },
        {
          heading: '5. Account Deletion & Contact',
          body: `You may delete your account anytime from inside the Zuppo app or by emailing ${ZUPPO_LINKS.supportEmail}. Grievance & Support Contact: ${ZUPPO_LINKS.supportEmail} | ${ZUPPO_LINKS.supportPhoneDisplay}.`,
        },
      ],
    },
    '/terms': {
      title: 'Terms & Conditions',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Platform Overview',
          body: 'Zuppo connects customers in Ambikapur, Chhattisgarh with local partner restaurants and independent delivery partners through the Zuppo Customer, Zuppo Rider, and Zuppo Partner applications.',
        },
        {
          heading: '2. Orders & Pricing',
          body: 'Menu prices, item availability, and food quality are managed by partner restaurants. Delivery fees, promotional discounts, and applicable totals are displayed transparently before you confirm an order.',
        },
        {
          heading: '3. Payments & Cash on Delivery',
          body: 'Customers may pay via supported online payment methods or Cash on Delivery (COD). For COD orders, customers agree to pay the exact order total upon delivery.',
        },
        {
          heading: '4. User, Partner & Rider Conduct',
          body: 'All users, restaurant partners, and riders must maintain respectful conduct and provide accurate account details. Zuppo reserves the right to suspend accounts involved in fraud, abuse, or policy violations.',
        },
      ],
    },
    '/refund-policy': {
      title: 'Cancellation & Refund Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Order Cancellations',
          body: 'Customers can cancel an active order directly inside the Zuppo app prior to delivery completion. If a restaurant is unable to fulfill an order or no rider is assigned within the acceptance window, the order is automatically cancelled.',
        },
        {
          heading: '2. Refunds for Prepaid Orders',
          body: 'For eligible cancellations, missing items, or verified quality issues on prepaid orders, refunds are processed back to the original payment source or Zuppo Coins wallet within 5–7 business days.',
        },
        {
          heading: '3. Support Assistance',
          body: `For any order or refund issue, contact our Ambikapur support team at ${ZUPPO_LINKS.supportEmail} or ${ZUPPO_LINKS.supportPhoneDisplay} with your Order ID.`,
        },
      ],
    },
  };

  const doc = contentMap[route];

  return (
    <main className="pt-28 pb-20 bg-slate-50 min-h-screen px-5">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-10">
        <div className="text-xs font-extrabold uppercase tracking-wider text-[#E62225]">
          Zuppo Legal • Last Updated {doc.updated}
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">{doc.title}</h1>
        <div className="mt-8 space-y-6">
          {doc.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="text-lg font-extrabold text-slate-900">{sec.heading}</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">{sec.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> {ZUPPO_LINKS.supportPhoneDisplay}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> {ZUPPO_LINKS.supportEmail}
          </span>
        </div>
      </article>
    </main>
  );
};
