'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe as Globe2, Gem, UserCheck, ChartLine as LineChart } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const pillars = [
  {
    icon: Globe2,
    title: 'International Standards',
    description:
      'We build to Eurocode, Dubai Green Building Regulations, and ISO 9001 quality frameworks. Whether in Vienna, Monaco, or Dubai — the standard never changes.',
  },
  {
    icon: Gem,
    title: 'Premium Materials Only',
    description:
      'Every specification is reviewed by our materials team. We source Italian stone, German engineering components, and certified sustainable timber — nothing less.',
  },
  {
    icon: UserCheck,
    title: 'One Point of Contact',
    description:
      'A dedicated senior project director as your single interface. No chasing multiple contractors. No miscommunication. One call answers everything.',
  },
  {
    icon: LineChart,
    title: 'Full Transparency',
    description:
      'Real-time project dashboards, weekly photo reports, and open-book cost tracking. You always know where your project and budget stand.',
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" ref={ref} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionWrapper direction="left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">Why ARKON</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Built on<br />
              <span className="italic text-gold">Four Pillars</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm">
              We have spent a decade earning the trust of discerning clients across Europe and the Gulf. These principles are non-negotiable in every project we take on.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              {[
                { value: '98%', label: 'On-Time Delivery' },
                { value: '4.9', label: 'Client Satisfaction' },
                { value: '0', label: 'Legal Disputes' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-display font-bold text-gold">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="p-6 border border-white/5 bg-obsidian-light hover:border-gold/20 transition-all duration-500 group"
                >
                  <div className="mb-4">
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
      </div>
    </section>
  );
}
