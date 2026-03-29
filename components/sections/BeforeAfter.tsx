'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const BEFORE_IMAGE = 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200';
const AFTER_IMAGE = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseUp = () => setDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePosition(e.clientX); };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
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
          <div
            ref={containerRef}
            className="relative h-[400px] md:h-[560px] overflow-hidden rounded-2xl select-none cursor-col-resize"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${AFTER_IMAGE})` }}
            />

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${BEFORE_IMAGE})`,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
            />

            <div
              className="absolute top-0 bottom-0 w-px bg-gold z-10 pointer-events-none"
              style={{ left: `${position}%` }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold shadow-gold flex items-center justify-center cursor-col-resize"
                onMouseDown={onMouseDown}
                onTouchStart={() => setDragging(true)}
              >
                <GripVertical size={18} className="text-obsidian" />
              </div>
            </div>

            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 bg-obsidian/80 text-slate-300 border border-white/10">
                Before
              </span>
            </div>
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 bg-gold text-obsidian">
                After
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5 pt-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Villa Aurum — Living Suite Renovation</h3>
              <p className="text-xs text-slate-500 mt-1">Monaco · 120 m² · Completed 2023</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xl font-display font-bold text-gold">14</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Weeks</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-xl font-display font-bold text-gold">100%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Turnkey</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-xl font-display font-bold text-gold">3</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Rooms</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
