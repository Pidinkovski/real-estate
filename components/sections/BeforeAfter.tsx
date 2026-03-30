'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const projects = [
  {
    before: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Villa Aurum — Living Suite Renovation',
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
    title: 'Maison Côte d\'Azur — Master Bedroom',
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
    title: 'Penthouse Riviera — Open Kitchen',
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
    title: 'Atelier Lumière — Office Conversion',
    location: 'Paris · 340 m² · Completed 2023',
    stats: [
      { value: '16', label: 'Weeks' },
      { value: '40+', label: 'Desks' },
      { value: '€2.4M', label: 'Value' },
    ],
  },
];

interface SliderProps {
  before: string;
  after: string;
}

function BeforeAfterSlider({ before, after }: SliderProps) {
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
      className="relative h-[400px] md:h-[540px] overflow-hidden rounded-2xl select-none cursor-col-resize"
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold shadow-gold flex items-center justify-center cursor-col-resize"
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

export default function BeforeAfter() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => goTo((current - 1 + projects.length) % projects.length);
  const next = () => goTo((current + 1) % projects.length);

  const project = projects[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section id="transformation" ref={sectionRef} className="py-28 md:py-36 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-wide section-padding">
        <SectionWrapper className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">The Transformation</span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Before &amp; After
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
            Drag the handle to reveal the transformation. See how we convert raw space into extraordinary environments.
          </p>
        </SectionWrapper>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <BeforeAfterSlider before={project.before} after={project.after} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current + '-info'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{project.location}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current + '-stats'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-6"
                >
                  {project.stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6">
                      {i > 0 && <div className="w-px h-8 bg-white/10" />}
                      <div className="text-center">
                        <div className="text-xl font-display font-bold text-gold">{stat.value}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2 bg-gold'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs text-slate-500 tabular-nums">
                {current + 1} / {projects.length}
              </span>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-gold hover:text-gold transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
