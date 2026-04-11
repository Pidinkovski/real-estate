'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Clock, Globe, Layers } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const icons = [Building2, Clock, Globe, Layers];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLang();
  const values = ['20+', t.trust.processControl, '3', t.trust.endToEnd];
  const labels = [
    t.trust.projectsDelivered,
    t.trust.processControlSub,
    t.trust.citiesOfOperation,
    t.trust.servicesProvided,
  ];
  const stats = icons.map((icon, i) => ({ icon, value: values[i], label: labels[i] }));

  return (
    <section ref={ref} className="relative bg-obsidian-light border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />
      <div className="container-wide section-padding py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={['projects', 'process', 'cities', 'services'][i]}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center gap-2 md:gap-3 py-8 md:py-10 px-3 md:px-6 text-center group"
              >
                <Icon
                  size={18}
                  className="md:w-[22px] md:h-[22px] text-gold/60 group-hover:text-gold transition-colors duration-300"
                />
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  {stat.label ? (
                    <div className="text-[10px] md:text-xs tracking-widest text-slate-500 mt-1">
                      {stat.label}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
