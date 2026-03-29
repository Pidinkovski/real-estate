'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AnimatedNavLink from './AnimatedNavLink';
import DirectionalButton from './DirectionalButton';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#why-us' },
  { label: 'Blog', href: '#blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-5 lg:px-8 transition-all duration-500 ${
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
            <span className="text-2xl font-display font-bold tracking-wider text-white">
              ARK<span className="text-gold">ON</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href} className="group">
                <AnimatedNavLink
                  label={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium tracking-widest uppercase text-slate-300 hover:text-gold transition-colors duration-300"
                />
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-6">
            <DirectionalButton
              onClick={() => handleNavClick('#contact')}
              variant="primary"
              hoverColor="#374151"
              className="px-6 py-2.5 text-sm font-bold tracking-widest uppercase"
            >
              Request a Quote
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
              Request a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
