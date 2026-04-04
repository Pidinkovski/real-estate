'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const quickLinkHrefs = ['#projects', '#services', '#process', '#why-us', '#blog', '#contact'];

export default function Footer() {
  const { t } = useLang();
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080E1C] border-t border-white/5">
      <div className="container-wide section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="text-3xl font-display font-bold tracking-wider text-white mb-4">
              ARK<span className="text-gold">ON</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#C6A35A' }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {t.footer.links.map((label, i) => (
                <li key={quickLinkHrefs[i]}>
                  <button
                    onClick={() => handleNav(quickLinkHrefs[i])}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">{t.footer.services}</h4>
            <ul className="space-y-3">
              {t.footer.servicesList.map((s) => (
                <li key={s} className="text-sm text-slate-400">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400" style={{ whiteSpace: 'pre-line' }}>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" />
                <span className="text-sm text-slate-400">+43 1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold shrink-0" />
                <span className="text-sm text-slate-400">hello@arkon-build.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-wide section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t.footer.terms}</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{t.footer.imprint}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
