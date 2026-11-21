import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import {
  deleteWebsiteInquiry,
  fetchWebsiteInquiries,
  InquiryStatus,
  InquiryType,
  updateInquiryStatus,
  WebsiteInquiry,
} from '../lib/inquiries';

const SESSION_KEY = 'zuppo_web_admin_key';

const TYPE_META: Record<InquiryType, { label: string; color: string }> = {
  support: { label: 'Support', color: 'bg-red-50 text-[#E62225] border-red-200' },
  contact: { label: 'Contact', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  partner: { label: 'Partner', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  rider: { label: 'Rider', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  delete_account: { label: 'Delete Acct', color: 'bg-slate-100 text-slate-700 border-slate-300' },
};

const STATUS_META: Record<InquiryStatus, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  in_progress: { label: 'In Progress', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  resolved: { label: 'Resolved', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export const AdminPage: React.FC = () => {
  const [activePasscode, setActivePasscode] = useState<string>(
    () => (typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_KEY) || '' : '')
  );
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [inquiries, setInquiries] = useState<WebsiteInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | InquiryType>('all');
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadData = async (code: string) => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchWebsiteInquiries(code);
      setInquiries(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not load inquiries.';
      if (msg.toLowerCase().includes('invalid admin passcode')) {
        sessionStorage.removeItem(SESSION_KEY);
        setActivePasscode('');
        setAuthError('Session expired or passcode changed. Please unlock again.');
      } else {
        setLoadError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePasscode) {
      loadData(activePasscode);
    }
  }, [activePasscode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passcodeInput.trim();
    if (!trimmed) {
      setAuthError('Please enter your admin passcode.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await fetchWebsiteInquiries(trimmed);
      sessionStorage.setItem(SESSION_KEY, trimmed);
      setActivePasscode(trimmed);
      setInquiries(data);
      setPasscodeInput('');
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Invalid admin passcode.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setActivePasscode('');
    setInquiries([]);
  };

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    setBusyId(id);
    try {
      await updateInquiryStatus(activePasscode, id, status);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    setBusyId(id);
    try {
      await deleteWebsiteInquiry(activePasscode, id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((item) => {
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (!q) return true;
      return (
        item.full_name.toLowerCase().includes(q) ||
        (item.phone ?? '').toLowerCase().includes(q) ||
        (item.email ?? '').toLowerCase().includes(q) ||
        (item.subject ?? '').toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    });
  }, [inquiries, filterType, search]);

  const counts = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === 'new').length,
      inProgress: inquiries.filter((i) => i.status === 'in_progress').length,
      resolved: inquiries.filter((i) => i.status === 'resolved').length,
    };
  }, [inquiries]);

  if (!activePasscode) {
    return (
      <main className="min-h-screen bg-[#0B0F19] pt-28 pb-20 px-5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-white rounded-3xl p-7 sm:p-8 shadow-2xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E62225] flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Zuppo Web Admin</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Passcode is verified securely against encrypted database credentials.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="Enter admin passcode"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
            />
            {authError && (
              <div className="text-xs font-bold text-red-600">{authError}</div>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#E62225] hover:bg-[#cf1b1e] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-red-600/25 cursor-pointer transition-colors disabled:opacity-60"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Unlock Inbox'
              )}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#E62225]">
              Encrypted DB Auth • Live Inbox
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Zuppo Website Admin
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => loadData(activePasscode)}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { label: 'Total Requests', val: counts.total, color: 'text-slate-900' },
            { label: 'New / Unread', val: counts.new, color: 'text-amber-600' },
            { label: 'In Progress', val: counts.inProgress, color: 'text-sky-600' },
            { label: 'Resolved', val: counts.resolved, color: 'text-emerald-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200/80 px-5 py-4"
            >
              <div className={`text-2xl sm:text-3xl font-black ${stat.color}`}>{stat.val}</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs + Search */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'support', label: 'Support' },
                { id: 'partner', label: 'Partner' },
                { id: 'rider', label: 'Rider' },
                { id: 'contact', label: 'Contact' },
                { id: 'delete_account', label: 'Delete Acct' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, email..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        {loadError && (
          <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm font-bold text-red-700">
            {loadError}
          </div>
        )}

        {/* Inquiries List */}
        <div className="mt-6 space-y-3.5">
          {!loading && filtered.length === 0 && !loadError && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-sm font-semibold text-slate-500">
              No inquiries found yet. Submissions from Support, Partner, Rider & Delete Account forms will appear here live!
            </div>
          )}

          {filtered.map((item) => {
            const tMeta = TYPE_META[item.type] ?? TYPE_META.support;
            const sMeta = STATUS_META[item.status] ?? STATUS_META.new;
            const cleanPhone = (item.phone || '').replace(/[^\d]/g, '');

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/85 p-5 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${tMeta.color}`}
                      >
                        {tMeta.label}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${sMeta.color}`}
                      >
                        {sMeta.label}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {new Date(item.created_at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-black text-slate-900">
                      {item.full_name}
                      {item.subject ? (
                        <span className="font-semibold text-slate-500"> — {item.subject}</span>
                      ) : null}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {item.message}
                    </p>
                  </div>

                  {/* Quick Status & Delete Controls */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {item.status !== 'in_progress' && (
                      <button
                        disabled={busyId === item.id}
                        onClick={() => handleStatusChange(item.id, 'in_progress')}
                        className="inline-flex items-center gap-1 text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        In Progress
                      </button>
                    )}
                    {item.status !== 'resolved' && (
                      <button
                        disabled={busyId === item.id}
                        onClick={() => handleStatusChange(item.id, 'resolved')}
                        className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolve
                      </button>
                    )}
                    <button
                      disabled={busyId === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 1-Click Contact Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5 text-xs font-bold">
                  {item.phone && (
                    <>
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {item.phone}
                      </a>
                      {cleanPhone.length >= 10 && (
                        <a
                          href={`https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </a>
                      )}
                    </>
                  )}
                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {item.email}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
