'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import DirectionalButton from '@/components/shared/DirectionalButton';
import { useLang } from '@/lib/i18n';

interface FinalCTAProps {
  onRequestConsultation: () => void;
}

export default function FinalCTA({ onRequestConsultation }: FinalCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
      />
      <div className="absolute inset-0 bg-obsidian/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/60" />

      <div className="relative z-10 container-wide section-padding py-24 md:py-36 lg:py-48 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">{t.cta.label}</span>
          <div className="w-8 h-px bg-gold" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 px-4 md:px-0"
        >
          {t.cta.title1}<br />
          <span className="italic text-gold">{t.cta.title2}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-8 md:mb-12 rounded-3xl border border-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 max-w-sm text-center mx-4 md:mx-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}
        >
          <p className="text-lg md:text-xl lg:text-2xl font-display font-light text-slate-200 mb-2 md:mb-3">
            {t.cta.subtitle}
          </p>
          <p className="text-xs md:text-sm text-black leading-relaxed font-bold">
            {t.cta.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <DirectionalButton
            onClick={onRequestConsultation}
            hoverColor="#374151"
            className="flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 font-semibold text-xs md:text-sm tracking-widest uppercase group w-full sm:w-auto justify-center"
          >
            <span className="whitespace-nowrap">{t.cta.requestConsultation}</span> <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
          </DirectionalButton>

          <div
            className="rounded-2xl border border-white/10 backdrop-blur-sm px-4 md:px-5 py-2.5 md:py-3 w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}
          >
            <a
              href="mailto:hello@arkon-build.com"
              className="text-xs md:text-sm text-slate-400 hover:text-gold transition-colors tracking-wider border-b border-slate-700 hover:border-gold pb-1"
            >
              {t.cta.emailUs}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 px-4 md:px-0"
        >
          {[
            { value: 'EU', label: t.cta.euLabel },
            { value: 'UAE', label: t.cta.uaeLabel },
            { value: 'MC', label: t.cta.mcLabel },
          ].map((item) => (
            <div
              key={item.value}
              className="text-center px-2 md:px-4 py-2 md:py-3 rounded-2xl border border-white/10 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)' }}
            >
              <div className="text-xs md:text-sm font-display font-bold text-gold mb-0.5">{item.value}</div>
              <div className="text-[9px] md:text-[11px] text-slate-400 leading-snug">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
