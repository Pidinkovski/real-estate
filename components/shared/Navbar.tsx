'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AnimatedNavLink from './AnimatedNavLink';
import DirectionalButton from './DirectionalButton';
import { useLang } from '@/lib/i18n';

function BulgarianFlag({ size = 28 }: { size?: number }) {
  const h = Math.round(size * 0.625);
  return (
    <svg width={size} height={h} viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="8" height="1.667" fill="#FFFFFF" />
      <rect x="0" y="1.667" width="8" height="1.667" fill="#00966E" />
      <rect x="0" y="3.333" width="8" height="1.667" fill="#D62612" />
    </svg>
  );
}

function UKFlag({ size = 28 }: { size?: number }) {
  const h = Math.round(size * 0.5);
  return (
    <svg width={size} height={h} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function LangButton({ langCode, current, onClick, title, children }: {
  langCode: string; current: string; onClick: () => void; title: string; children: React.ReactNode;
}) {
  const active = langCode === current;
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded overflow-hidden transition-all duration-300 flex items-center ${
        active ? 'ring-2 ring-gold opacity-100 scale-110' : 'opacity-45 hover:opacity-75 hover:scale-105'
      }`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.about, href: '#why-us' },
    { label: t.nav.blog, href: '#blog' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
      >
        <div className="w-4/5 max-w-5xl relative flex items-center justify-center">
          <div
            className={`w-full flex items-center justify-between px-4 lg:px-6 transition-all duration-500 ${
              scrolled
                ? 'bg-obsidian/80 backdrop-blur-md border border-white/10 rounded-full py-2 shadow-lg shadow-black/20'
                : 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-full py-3'
            }`}
          >
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group"
            >
              <span className="relative text-xl font-display font-bold tracking-wider text-white overflow-hidden">
                Virtus{' '}
                <span className="relative inline-block">
                  <span className="text-gold">Decora</span>
                  <motion.span
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                  />
                </span>
              </span>
            </a>

            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href} className="group">
                  <AnimatedNavLink
                    label={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-xs font-medium tracking-wider uppercase text-slate-300 hover:text-gold transition-colors duration-300"
                  />
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-4">
              <DirectionalButton
                onClick={() => handleNavClick('#contact')}
                variant="primary"
                textOnlyHover
                className="px-4 py-2 text-xs font-bold tracking-wider uppercase"
              >
                {t.nav.requestQuote}
              </DirectionalButton>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 absolute -right-24 top-1/2 -translate-y-1/2">
            <LangButton langCode="bg" current={lang} onClick={() => setLang('bg')} title="Български">
              <BulgarianFlag size={28} />
            </LangButton>
            <LangButton langCode="en" current={lang} onClick={() => setLang('en')} title="English">
              <UKFlag size={28} />
            </LangButton>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-obsidian flex flex-col justify-center px-10"
          >
            <div className="absolute top-8 right-8 flex items-center gap-3">
              <LangButton langCode="bg" current={lang} onClick={() => setLang('bg')} title="Български">
                <BulgarianFlag size={32} />
              </LangButton>
              <LangButton langCode="en" current={lang} onClick={() => setLang('en')} title="English">
                <UKFlag size={32} />
              </LangButton>
            </div>

            <ul className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-4xl font-display font-medium text-white hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => handleNavClick('#contact')}
              className="mt-12 px-8 py-4 border border-gold text-gold text-sm font-medium tracking-widest uppercase self-start hover:bg-gold hover:text-obsidian transition-all duration-300"
            >
              {t.nav.requestQuote}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
