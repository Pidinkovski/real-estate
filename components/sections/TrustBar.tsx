'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Clock, Globe, Layers } from 'lucide-react';

const stats = [
  { icon: Building2, value: '120+', label: 'Projects Delivered' },
  { icon: Clock, value: '10+', label: 'Years Experience' },
  { icon: Globe, value: '3', label: 'Cities of Operation' },
  { icon: Layers, value: 'End-to-end', label: 'Services Provided' },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative bg-obsidian-light border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />
      <div className="container-wide section-padding py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center group"
              >
                <Icon
                  size={22}
                  className="text-gold/60 group-hover:text-gold transition-colors duration-300"
                />
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-widest uppercase text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
