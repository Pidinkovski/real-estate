'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe as Globe2, Gem, UserCheck, ChartLine as LineChart } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { useLang } from '@/lib/i18n';

const pillarIcons = [Globe2, Gem, UserCheck, LineChart];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();
  const pillars = t.whyUs.pillars.map((p, i) => ({ ...p, icon: pillarIcons[i] }));

  return (
    <section id="why-us" ref={ref} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="container-wide section-padding">
        <SectionWrapper direction="up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">{t.whyUs.label}</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.whyUs.title1}{' '}
            <span className="italic text-gold">{t.whyUs.title2}</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-10">
            {t.whyUs.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: '98%', label: t.whyUs.onTimeDelivery },
              { value: '4.9', label: t.whyUs.clientSatisfaction },
              { value: '0', label: t.whyUs.legalDisputes },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-gold">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="p-6 border border-white/5 rounded-2xl bg-obsidian-light hover:border-gold/20 transition-all duration-500 group text-center"
              >
                <div className="mb-4 flex justify-center">
                  <Icon size={24} className="text-gold/70 group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
