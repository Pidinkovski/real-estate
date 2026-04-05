'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project } from '@/lib/supabase';
import SectionWrapper from '@/components/shared/SectionWrapper';
import DirectionalButton from '@/components/shared/DirectionalButton';
import { useLang } from '@/lib/i18n';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  autoReveal: boolean;
  direction: 'next' | 'prev';
}

function ProjectCard({ project, index, total, autoReveal, direction }: ProjectCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setInfoVisible(false);
    const t1 = setTimeout(() => setRevealed(true), autoReveal ? 300 : 80);
    const t2 = setTimeout(() => setInfoVisible(true), autoReveal ? 1100 : 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [project.id, autoReveal]);

  const hiddenClip = direction === 'next' ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)';
  const revealedClip = direction === 'next' ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image_url})` }}
      />

      <motion.div
        className="absolute inset-0 bg-[#080E1C]"
        initial={{ clipPath: hiddenClip }}
        animate={revealed ? { clipPath: revealedClip } : { clipPath: hiddenClip }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
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
  const { t } = useLang();

  const displayed = projects.slice(0, 3);
  const [current, setCurrent] = useState(0);
  const [canAutoReveal, setCanAutoReveal] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [showAllModal, setShowAllModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (inView && !hasAutoRevealed.current) {
      hasAutoRevealed.current = true;
      setCanAutoReveal(true);
    }
  }, [inView]);

  const navigateTo = (index: number, dir: 'next' | 'prev') => {
    if (index === current) return;
    setDirection(dir);
    setCurrent(index);
  };

  const goNext = () => { if (current < displayed.length - 1) navigateTo(current + 1, 'next'); };
  const goPrev = () => { if (current > 0) navigateTo(current - 1, 'prev'); };

  const project = displayed[current];
  if (!project) return null;

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36 bg-[#080E1C] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">{t.projects.label}</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.projects.title1} <span className="italic text-gold">{t.projects.title2}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            {t.projects.description}
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
                  direction={direction}
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
              onClick={() => navigateTo(i, i > current ? 'next' : 'prev')}
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
            onClick={() => setShowAllModal(true)}
          >
            {t.projects.viewAll}
          </DirectionalButton>
        </SectionWrapper>
      </div>

      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => !selectedProject && setShowAllModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-6xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setShowAllModal(false);
                }}
                className="fixed top-6 right-6 w-12 h-12 rounded-full bg-obsidian/90 hover:bg-obsidian border border-white/20 hover:border-gold flex items-center justify-center text-white hover:text-gold transition-all shadow-xl z-[60]"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-obsidian rounded-2xl overflow-hidden border border-white/10"
                  >
                    <div className="relative h-[500px]">
                      <img
                        src={selectedProject.image_url}
                        alt={selectedProject.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="text-xs tracking-widest uppercase text-gold mb-2">
                          {selectedProject.category}
                        </div>
                        <h3 className="font-display text-3xl font-bold text-white mb-3">
                          {selectedProject.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <MapPin size={14} />
                          <span>{selectedProject.location}</span>
                          <span>·</span>
                          <span>{selectedProject.sqm.toLocaleString()} m²</span>
                          <span>·</span>
                          <span>{selectedProject.year}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 border-t border-white/5">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="px-6 py-2.5 bg-gold text-obsidian text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-gold/90 transition-colors"
                      >
                        ← Back to Gallery
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="carousel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 className="text-center text-2xl font-display font-bold text-white mb-8">
                      All Projects
                    </h2>

                    <div className="relative" style={{ perspective: '2000px', height: '520px' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {projects.map((proj, idx) => {
                          const position = (idx - carouselIndex + projects.length) % projects.length;
                          const total = projects.length;

                          let x = 0;
                          let z = -400;
                          let rotateY = 0;
                          let scale = 0.6;
                          let opacity = 0.3;
                          let zIndex = 0;

                          if (position === 0) {
                            x = 0;
                            z = 0;
                            rotateY = 0;
                            scale = 1;
                            opacity = 1;
                            zIndex = 10;
                          } else if (position === 1 || (position === total - 1 && total === 2)) {
                            x = 420;
                            z = -250;
                            rotateY = -35;
                            scale = 0.75;
                            opacity = 0.6;
                            zIndex = 5;
                          } else if (position === total - 1) {
                            x = -420;
                            z = -250;
                            rotateY = 35;
                            scale = 0.75;
                            opacity = 0.6;
                            zIndex = 5;
                          } else if (position === 2) {
                            x = 600;
                            z = -400;
                            rotateY = -45;
                            scale = 0.6;
                            opacity = 0.3;
                            zIndex = 2;
                          } else if (position === total - 2) {
                            x = -600;
                            z = -400;
                            rotateY = 45;
                            scale = 0.6;
                            opacity = 0.3;
                            zIndex = 2;
                          }

                          return (
                            <motion.div
                              key={proj.id}
                              initial={false}
                              animate={{
                                x,
                                z,
                                rotateY,
                                scale,
                                opacity,
                                zIndex,
                              }}
                              transition={{
                                duration: 0.7,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="absolute w-[480px] h-[400px] cursor-pointer"
                              style={{
                                transformStyle: 'preserve-3d',
                              }}
                              onClick={() => {
                                if (position === 0) {
                                  setSelectedProject(proj);
                                } else {
                                  setCarouselIndex(idx);
                                }
                              }}
                            >
                              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                                <img
                                  src={proj.image_url}
                                  alt={proj.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                  <div className="text-xs tracking-widest uppercase text-gold mb-1">
                                    {proj.category}
                                  </div>
                                  <h3 className="font-display text-xl font-bold text-white">
                                    {proj.name}
                                  </h3>
                                  <p className="text-xs text-slate-400 mt-1">{proj.location}</p>
                                </div>
                                {position === 0 && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                  >
                                    <div className="px-6 py-3 bg-gold text-obsidian text-sm font-semibold tracking-wider uppercase rounded-full">
                                      View Details
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCarouselIndex((carouselIndex - 1 + projects.length) % projects.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCarouselIndex((carouselIndex + 1) % projects.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                      {projects.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCarouselIndex(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            idx === carouselIndex ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
