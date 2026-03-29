'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from 'lucide-react';

const services = [
  'Turnkey Construction',
  'Architectural Design',
  'Interior & Furnishing',
  'Project Management',
  'Structural Engineering',
  'Renovation Works',
];

const quickLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Our Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
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
              Premium turnkey construction and architectural design. From first concept to final key — across Europe and the Middle East.
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
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="text-sm text-slate-400">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">Vienna, Austria<br />Dubai, UAE<br />Monaco</span>
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
            © {new Date().getFullYear()} ARKON Construction Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
