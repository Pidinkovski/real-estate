'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import DirectionalButton from '@/components/shared/DirectionalButton';

interface FinalCTAProps {
  onRequestConsultation: () => void;
}

export default function FinalCTA({ onRequestConsultation }: FinalCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
      />
      <div className="absolute inset-0 bg-obsidian/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/60" />

      <div className="relative z-10 container-wide section-padding py-36 md:py-48 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">Start Your Project</span>
          <div className="w-8 h-px bg-gold" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
        >
          Have a project<br />
          <span className="italic text-gold">in mind?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl font-display font-light text-slate-300 mb-4"
        >
          Let&apos;s build it together.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm text-slate-400 max-w-md mb-12"
        >
          From a private villa in the South of France to a commercial complex in Dubai — we work on projects across Europe and the Gulf. Every engagement starts with a confidential consultation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <DirectionalButton
            onClick={onRequestConsultation}
            hoverColor="#374151"
            className="flex items-center gap-3 px-10 py-5 font-semibold text-sm tracking-widest uppercase group whitespace-nowrap"
          >
            Request a Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </DirectionalButton>

          <a
            href="mailto:hello@arkon-build.com"
            className="text-sm text-slate-400 hover:text-gold transition-colors tracking-wider border-b border-slate-700 hover:border-gold pb-1"
          >
            or email us directly
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-4 md:gap-6"
        >
          {[
            { value: 'EU', label: 'Licensed in Austria, Germany, France, Croatia' },
            { value: 'UAE', label: 'RERA & Dubai Municipality Registered' },
            { value: 'MC', label: 'Monaco Principality Certified' },
          ].map((item) => (
            <div
              key={item.value}
              className="text-center px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)' }}
            >
              <div className="text-sm font-display font-bold text-gold mb-0.5">{item.value}</div>
              <div className="text-[11px] text-slate-400 leading-snug">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
