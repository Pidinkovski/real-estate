'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/lib/supabase';
import SectionWrapper from '@/components/shared/SectionWrapper';
import DirectionalButton from '@/components/shared/DirectionalButton';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  autoReveal: boolean;
}

function ProjectCard({ project, index, total, autoReveal }: ProjectCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setInfoVisible(false);
    const t1 = setTimeout(() => setRevealed(true), autoReveal ? 300 : 80);
    const t2 = setTimeout(() => setInfoVisible(true), autoReveal ? 1100 : 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [project.id, autoReveal]);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image_url})` }}
      />

      <motion.div
        className="absolute inset-0 bg-[#080E1C]"
        initial={{ clipPath: 'inset(0% 50% 0% 0%)' }}
        animate={revealed ? { clipPath: 'inset(0% 100% 0% 0%)' } : { clipPath: 'inset(0% 50% 0% 0%)' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        className="absolute inset-0 bg-[#080E1C]"
        initial={{ clipPath: 'inset(0% 0% 0% 50%)' }}
        animate={revealed ? { clipPath: 'inset(0% 0% 0% 100%)' } : { clipPath: 'inset(0% 0% 0% 50%)' }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

      <AnimatePresence>
        {infoVisible && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-10"
          >
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs tracking-widest uppercase text-gold mb-2">{project.category}</div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-sm text-slate-400">{project.location}</span>
                  <span className="text-slate-600 mx-1">·</span>
                  <span className="text-sm text-slate-400">{project.sqm.toLocaleString()} m²</span>
                  <span className="text-slate-600 mx-1">·</span>
                  <span className="text-sm text-slate-400">{project.year}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center shrink-0 ml-6 hover:border-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={infoVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 right-6 text-xs text-slate-400 tracking-widest"
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </motion.div>
    </div>
  );
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-120px' });
  const hasAutoRevealed = useRef(false);

  const displayed = projects.slice(0, 6);
  const [current, setCurrent] = useState(0);
  const [canAutoReveal, setCanAutoReveal] = useState(false);

  useEffect(() => {
    if (inView && !hasAutoRevealed.current) {
      hasAutoRevealed.current = true;
      setCanAutoReveal(true);
    }
  }, [inView]);

  const navigateTo = (index: number) => {
    if (index === current) return;
    setCurrent(index);
  };

  const goNext = () => { if (current < displayed.length - 1) navigateTo(current + 1); };
  const goPrev = () => { if (current > 0) navigateTo(current - 1); };

  const project = displayed[current];
  if (!project) return null;

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36 bg-[#080E1C] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">Our Work</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Selected <span className="italic text-gold">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            From private residences in Monaco to commercial towers in Vienna — each project reflects our commitment to precision and permanence.
          </p>
        </SectionWrapper>

        <div className="relative flex items-center justify-center gap-6 md:gap-10">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
              current === 0
                ? 'text-white/20 cursor-not-allowed bg-white/5'
                : 'text-gold hover:bg-gold/10 cursor-pointer bg-white/5'
            }`}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl" style={{ height: '520px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0"
              >
                <ProjectCard
                  project={project}
                  index={current}
                  total={displayed.length}
                  autoReveal={canAutoReveal && current === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={goNext}
            disabled={current === displayed.length - 1}
            className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
              current === displayed.length - 1
                ? 'text-white/20 cursor-not-allowed bg-white/5'
                : 'text-gold hover:bg-gold/10 cursor-pointer bg-white/5'
            }`}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {displayed.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateTo(i)}
              className={`transition-all duration-300 ${
                i === current ? 'w-6 h-1.5 bg-gold' : 'w-2 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
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
