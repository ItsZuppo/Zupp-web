import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { InquiryType, submitWebsiteInquiry } from '../lib/inquiries';

interface InquiryFormProps {
  type: InquiryType;
  heading: string;
  subheading: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  accent?: 'red' | 'orange' | 'emerald';
  topicOptions?: string[];
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  type,
  heading,
  subheading,
  subjectLabel,
  subjectPlaceholder,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  accent = 'red',
  topicOptions,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(topicOptions?.[0] ?? '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const btnColors =
    accent === 'emerald'
      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
      : accent === 'orange'
      ? 'bg-[#EA580C] hover:bg-[#c2410c] shadow-orange-600/25'
      : 'bg-[#E62225] hover:bg-[#cf1b1e] shadow-red-600/25';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError('Please enter either your Phone Number or Email ID so we can reach you.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a short message.');
      return;
    }

    setLoading(true);
    try {
      await submitWebsiteInquiry({
        type,
        full_name: fullName,
        phone,
        email,
        subject,
        message,
      });
      setSubmitted(true);
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/85 shadow-[0_20px_60px_rgba(15,23,42,0.06)] p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          {heading}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
          {subheading}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Request Submitted!</h4>
            <p className="mt-1.5 text-sm text-slate-500 max-w-xs">
              Our Ambikapur team has received your details and will contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs font-extrabold text-[#E62225] hover:underline cursor-pointer"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {topicOptions && topicOptions.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {topicOptions.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSubject(topic)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                        subject === topic
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number <span className="text-slate-400 font-medium">(or Email)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email ID <span className="text-slate-400 font-medium">(or Phone)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {!topicOptions && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {subjectLabel}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={subjectPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {messageLabel} *
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={messagePlaceholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-bold text-red-700">
                {error}
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className={`cta-shimmer w-full inline-flex items-center justify-center gap-2 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer disabled:opacity-60 ${btnColors}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {submitLabel}
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
