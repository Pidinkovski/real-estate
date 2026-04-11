'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, ClipboardCheck, Lightbulb, Calculator, HardHat, Key } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { useLang } from '@/lib/i18n';

const stepIcons = [MessageSquare, ClipboardCheck, Lightbulb, Calculator, HardHat, Key];
const stepNumbers = ['01', '02', '03', '04', '05', '06'];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();
  const steps = t.process.steps.map((s, i) => ({ ...s, icon: stepIcons[i], number: stepNumbers[i] }));

  return (
    <section id="process" ref={ref} className="py-28 md:py-36 bg-[#080E1C] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-wide section-padding relative">
        <SectionWrapper className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">{t.process.label}</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t.process.title1}<br />
            <span className="italic text-gold">{t.process.title2}</span>
          </h2>
        </SectionWrapper>

        <div className="relative">
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-white/5 z-0" />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ originX: 0 }}
            className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-gold/60 via-gold/40 to-gold/10 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  className="flex flex-col items-start lg:items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-[104px] h-[104px] border border-white/10 rounded-2xl bg-obsidian flex flex-col items-center justify-center gap-1 group-hover:border-gold/30 transition-colors">
                      <Icon size={24} className="text-gold/70" />
                      <span className="text-xs text-slate-600 font-mono">{step.number}</span>
                    </div>
                  </div>

                  <div className="lg:text-center">
                    <h3 className="font-display text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
