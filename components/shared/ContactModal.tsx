'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CircleCheck as CheckCircle, Loader as Loader2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const budgetRanges = ['€100k – €500k', '€500k – €1M', '€1M – €5M', '€5M – €10M', '€10M+', 'To be discussed'];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'Residential',
    budget_range: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      setLoading(false);
      if (!res.ok) {
        setError(t.modal.error);
        return;
      }
      setSuccess(true);
    } catch {
      setLoading(false);
      setError(t.modal.error);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); setError(''); setForm({ name: '', email: '', phone: '', project_type: 'Residential', budget_range: '', message: '' }); }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-obsidian-light border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 md:p-8 border-b border-white/10">
              <div>
                <h2 className="text-xl md:text-2xl font-display font-semibold text-white">{t.modal.title}</h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1">{t.modal.subtitle}</p>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors p-1">
                <X size={20} className="md:w-[22px] md:h-[22px]" />
              </button>
            </div>

            {success ? (
              <div className="p-8 md:p-12 flex flex-col items-center gap-4 text-center">
                <CheckCircle size={40} className="md:w-12 md:h-12 text-gold" />
                <h3 className="text-xl md:text-2xl font-display font-semibold text-white">{t.modal.successTitle}</h3>
                <p className="text-sm md:text-base text-slate-400 max-w-sm">
                  {t.modal.successMessage}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 md:px-8 py-2.5 md:py-3 bg-gold text-obsidian text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors"
                >
                  {t.modal.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-slate-400 block mb-2">{t.modal.fullName} *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder={t.modal.placeholder.name}
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-slate-400 block mb-2">{t.modal.email} *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder={t.modal.placeholder.email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-slate-400 block mb-2">{t.modal.phone}</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder={t.modal.placeholder.phone}
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-slate-400 block mb-2">{t.modal.projectType}</label>
                    <select
                      name="project_type"
                      value={form.project_type}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                    >
                      {t.modal.projectTypes.map((pt) => <option key={pt} value={pt} className="bg-obsidian">{pt}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase text-slate-400 block mb-2">{t.modal.budget}</label>
                  <select
                    name="budget_range"
                    value={form.budget_range}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option value="" className="bg-obsidian">{t.modal.selectRange}</option>
                    {budgetRanges.map((b) => <option key={b} value={b} className="bg-obsidian">{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase text-slate-400 block mb-2">{t.modal.description}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-600 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder={t.modal.placeholder.description}
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{t.modal.error}</p>}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-gold rounded-lg text-obsidian font-semibold text-sm tracking-widest uppercase hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> {t.modal.sending}</> : t.modal.send}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
