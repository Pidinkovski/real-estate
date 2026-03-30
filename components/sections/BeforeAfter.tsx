'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GripVertical, X, Eye } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const projects = [
  {
    before: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Villa Aurum',
    subtitle: 'Living Suite Renovation',
    location: 'Monaco · 120 m² · Completed 2023',
    stats: [
      { value: '14', label: 'Weeks' },
      { value: '100%', label: 'Turnkey' },
      { value: '3', label: 'Rooms' },
    ],
  },
  {
    before: 'https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: "Maison Côte d'Azur",
    subtitle: 'Master Bedroom',
    location: 'Nice · 85 m² · Completed 2024',
    stats: [
      { value: '8', label: 'Weeks' },
      { value: '2', label: 'Floors' },
      { value: '€1.2M', label: 'Value' },
    ],
  },
  {
    before: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Penthouse Riviera',
    subtitle: 'Open Kitchen',
    location: 'Cannes · 210 m² · Completed 2024',
    stats: [
      { value: '22', label: 'Weeks' },
      { value: '5', label: 'Rooms' },
      { value: '100%', label: 'Custom' },
    ],
  },
  {
    before: 'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Atelier Lumière',
    subtitle: 'Office Conversion',
    location: 'Paris · 340 m² · Completed 2023',
    stats: [
      { value: '16', label: 'Weeks' },
      { value: '40+', label: 'Desks' },
      { value: '€2.4M', label: 'Value' },
    ],
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseUp = () => setDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePosition(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); updatePosition(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-col-resize"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${after})` }} />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${before})`, clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />
      <div className="absolute top-0 bottom-0 w-px bg-gold z-10 pointer-events-none" style={{ left: `${position}%` }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold flex items-center justify-center cursor-col-resize shadow-lg"
          onMouseDown={onMouseDown}
          onTouchStart={() => setDragging(true)}
        >
          <GripVertical size={18} className="text-obsidian" />
        </div>
      </div>
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 bg-obsidian/80 text-slate-300 border border-white/10 rounded-sm">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 bg-gold text-obsidian rounded-sm">
          After
        </span>
      </div>
    </div>
  );
}

interface CardProps {
  project: typeof projects[0];
  position: 'left' | 'center' | 'right' | 'hidden';
  onClick: () => void;
  onView: () => void;
}

function ProjectCard({ project, position, onClick, onView }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const cardVariants = {
    left: {
      x: '-62%',
      rotateY: 28,
      scale: 0.78,
      z: -120,
      opacity: 0.7,
      zIndex: 1,
    },
    center: {
      x: '0%',
      rotateY: 0,
      scale: 1,
      z: 0,
      opacity: 1,
      zIndex: 10,
    },
    right: {
      x: '62%',
      rotateY: -28,
      scale: 0.78,
      z: -120,
      opacity: 0.7,
      zIndex: 1,
    },
    hidden: {
      x: '0%',
      rotateY: 0,
      scale: 0.6,
      z: -300,
      opacity: 0,
      zIndex: 0,
    },
  };

  const isCenter = position === 'center';

  return (
    <motion.div
      variants={cardVariants}
      animate={position}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute inset-0 cursor-pointer"
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      onClick={isCenter ? undefined : onClick}
      onMouseEnter={() => !isCenter && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${project.after})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs text-gold tracking-wider uppercase mb-1">{project.subtitle}</p>
          <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
          <p className="text-xs text-slate-400 mt-1">{project.location}</p>
        </div>

        {!isCenter && (
          <motion.div
            initial={false}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: hovered
                ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(212,175,55,0.08) 100%)'
                : 'transparent',
              backdropFilter: hovered ? 'blur(6px) brightness(0.7)' : 'none',
            }}
          >
            {hovered && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-px bg-gold/60" />
                <button
                  onClick={(e) => { e.stopPropagation(); onView(); }}
                  className="flex items-center gap-2 px-6 py-3 bg-gold text-obsidian text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-gold/90 transition-colors shadow-lg"
                >
                  <Eye size={15} />
                  View
                </button>
                <div className="w-16 h-px bg-gold/60" />
              </div>
            )}
          </motion.div>
        )}

        {isCenter && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={onView}
              className="flex items-center gap-2 px-6 py-3 bg-gold/90 hover:bg-gold text-obsidian text-sm font-semibold tracking-wider uppercase rounded-full transition-colors shadow-xl backdrop-blur-sm"
            >
              <Eye size={15} />
              View Transformation
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BeforeAfter() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const total = projects.length;

  const getPosition = (index: number): 'left' | 'center' | 'right' | 'hidden' => {
    const diff = (index - current + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1 || (diff === total - 1 && total === 2)) return 'right';
    if (diff === total - 1) return 'left';
    return 'hidden';
  };

  const openModal = (index: number) => {
    setModalProject(index);
    setModalOpen(true);
  };

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const mp = projects[modalProject];

  return (
    <section id="transformation" ref={sectionRef} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">The Transformation</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Before &amp; After
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
            Browse our transformations. Hover a card and click View to reveal the full before &amp; after.
          </p>
        </SectionWrapper>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="relative mx-auto"
            style={{ width: '100%', maxWidth: 860, height: 480, perspective: '1200px' }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                position={getPosition(i)}
                onClick={() => setCurrent(i)}
                onView={() => openModal(i)}
              />
            ))}

            <button
              onClick={prev}
              className="absolute -left-6 md:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/15 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-colors"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={next}
              className="absolute -right-6 md:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/15 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-colors"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500 tabular-nums">{current + 1} / {total}</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-5xl bg-obsidian rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="h-[420px] md:h-[520px]">
                <BeforeAfterSlider before={mp.before} after={mp.after} />
              </div>

              <div className="px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {mp.title} — {mp.subtitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{mp.location}</p>
                </div>
                <div className="flex items-center gap-6">
                  {mp.stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6">
                      {i > 0 && <div className="w-px h-8 bg-white/10" />}
                      <div className="text-center">
                        <div className="text-xl font-display font-bold text-gold">{stat.value}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
