'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HardHat, Sofa, PenTool, ChartBar as BarChart3 } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const services = [
  {
    icon: HardHat,
    title: 'Turnkey Construction',
    description:
      'Full lifecycle delivery from foundation to final certificate. We manage every contractor, timeline, and material — so you never have to.',
    tags: ['Structural', 'MEP', 'Facade', 'Finishing'],
  },
  {
    icon: Sofa,
    title: 'Interior & Furnishing',
    description:
      'Curated spaces with bespoke furniture, premium materials, and lighting design. Every room delivered move-in ready.',
    tags: ['FF&E', 'Lighting', 'Joinery', 'Art Curation'],
  },
  {
    icon: PenTool,
    title: 'Architectural Design',
    description:
      'Award-winning design aligned to your vision and local regulations. From concept sketches through BIM-ready permit drawings.',
    tags: ['Concept', 'BIM', 'Permits', '3D Rendering'],
  },
  {
    icon: BarChart3,
    title: 'Project Management',
    description:
      'One dedicated senior PM as your single point of contact. Real-time reporting, risk management, and budget control.',
    tags: ['Cost Control', 'Scheduling', 'Reporting', 'QA/QC'],
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">What We Do</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Every Discipline.<br />
            <span className="italic text-gold">One Team.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            We eliminate the friction of managing multiple vendors. Design, construction, and furnishing — all coordinated under a single contract.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className="group bg-obsidian p-8 hover:bg-obsidian-light transition-all duration-500 cursor-default"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 border border-white/10 group-hover:border-gold/40 flex items-center justify-center transition-all duration-500">
                    <Icon size={20} className="text-gold/70 group-hover:text-gold transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 group-hover:text-slate-400 transition-colors duration-300">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 border border-white/5 text-slate-600 group-hover:border-gold/20 group-hover:text-slate-500 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
