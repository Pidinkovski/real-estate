'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '@/lib/supabase';
import SectionWrapper from '@/components/shared/SectionWrapper';
import DirectionalButton from '@/components/shared/DirectionalButton';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const displayed = projects.slice(0, 6);

  const gridLayout = [
    'md:col-span-2 md:row-span-2',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-1 md:row-span-1',
    'md:col-span-2 md:row-span-1',
  ];

  const heights = [
    'h-[400px] md:h-full',
    'h-[280px]',
    'h-[280px]',
    'h-[280px]',
    'h-[280px]',
    'h-[280px]',
  ];

  return (
    <section id="projects" ref={ref} className="py-28 md:py-36 bg-[#080E1C] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">Our Work</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-xl leading-tight">
              Selected<br />
              <span className="italic text-gold">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              From private residences in Monaco to commercial towers in Vienna — each project reflects our commitment to precision and permanence.
            </p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {displayed.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative overflow-hidden group cursor-pointer ${gridLayout[i] ?? ''} ${heights[i] ?? 'h-[280px]'}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image_url})` }}
              />
              <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs tracking-widest uppercase text-gold mb-1">{project.category}</div>
                    <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin size={11} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{project.location}</span>
                      <span className="text-slate-600 mx-1">·</span>
                      <span className="text-xs text-slate-400">{project.sqm.toLocaleString()} m²</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center shrink-0">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-slate-300 tracking-widest">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <SectionWrapper className="mt-20 md:mt-24 flex justify-center" delay={0.3}>
          <DirectionalButton
            variant="outline"
            className="px-10 py-3.5 text-xs tracking-widest uppercase"
          >
            View All Projects
          </DirectionalButton>
        </SectionWrapper>
      </div>
    </section>
  );
}
