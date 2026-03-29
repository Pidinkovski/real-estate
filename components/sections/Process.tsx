'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, ClipboardCheck, Lightbulb, Calculator, HardHat, Key } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Inquiry',
    description: 'Share your vision, timeline, and requirements with our team.',
  },
  {
    icon: ClipboardCheck,
    number: '02',
    title: 'Site Inspection',
    description: 'We visit the property and conduct a full feasibility assessment.',
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'Concept Design',
    description: 'Architects develop a tailored concept with 3D renders and material boards.',
  },
  {
    icon: Calculator,
    number: '04',
    title: 'Budget & Contract',
    description: 'Detailed cost breakdown and fixed-price contract for full transparency.',
  },
  {
    icon: HardHat,
    number: '05',
    title: 'Execution',
    description: 'Our teams build on schedule with weekly client reports and site access.',
  },
  {
    icon: Key,
    number: '06',
    title: 'Delivery',
    description: 'Final walkthrough, snag list completion, and handover of keys.',
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

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
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">How We Work</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            From Inquiry to<br />
            <span className="italic text-gold">Key Handover</span>
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
                    <div className="w-[104px] h-[104px] border border-white/10 bg-obsidian flex flex-col items-center justify-center gap-1 group-hover:border-gold/30 transition-colors">
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

        <SectionWrapper className="mt-20 border border-white/5 p-8 md:p-12 bg-obsidian-light" delay={0.4}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Typical project timeline: <span className="text-gold">12–36 weeks</span>
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                From first meeting to key handover — we provide fixed timelines in every contract. No ambiguity, no delays without notice.
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              {[
                { label: 'Design Phase', value: '2–6 wks' },
                { label: 'Permits', value: '4–8 wks' },
                { label: 'Build', value: '8–24 wks' },
              ].map((phase) => (
                <div key={phase.label} className="text-center">
                  <div className="text-xl font-display font-bold text-gold">{phase.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{phase.label}</div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
