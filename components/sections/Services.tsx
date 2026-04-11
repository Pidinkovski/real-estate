'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HardHat, Sofa, PenTool, ChartBar as BarChart3 } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { useLang } from '@/lib/i18n';

const icons = [HardHat, Sofa, PenTool, BarChart3];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLang();
  const services = t.services.items.map((item, i) => ({ ...item, icon: icons[i] }));

  return (
    <section id="services" ref={ref} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">{t.services.label}</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.services.title1}<br />
            <span className="italic text-gold">{t.services.title2}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            {t.services.description}
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="group bg-obsidian border border-white/5 rounded-2xl p-8 hover:bg-obsidian-light hover:border-gold/20 transition-all duration-500 cursor-default"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 border border-white/10 rounded-xl group-hover:border-gold/40 flex items-center justify-center transition-all duration-500">
                    <Icon size={20} className="text-gold/70 group-hover:text-gold transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 group-hover:text-slate-400 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="mt-8 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
