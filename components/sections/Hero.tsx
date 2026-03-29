'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DirectionalButton from '@/components/shared/DirectionalButton';

interface HeroProps {
  onRequestQuote: () => void;
}

export default function Hero({ onRequestQuote }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const words = ['Turnkey', 'Construction.'];
  const subWords = ['From', 'Concept', 'to', 'Completion.'];

  const scrollToProjects = () => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dltxzncyt/video/upload/v1774794052/hf_20260329_140651_0456da02-d646-4789-adda-8144d93e8ed8_jx2ciz.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/30 to-obsidian/60" />
        <div className="absolute inset-0 bg-obsidian/20" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container-wide section-padding w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-gold">
            Est. 2014 · Vienna · Dubai · Monaco
          </span>
          <div className="w-8 h-px bg-gold" />
        </motion.div>

        <div className="max-w-5xl">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8">
            {subWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className={`inline-block mr-4 ${word === 'Completion.' ? 'text-gold' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="text-lg md:text-xl text-slate-300 font-light tracking-wide mb-12 max-w-xl mx-auto"
          >
            Design, build, and furnish — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <DirectionalButton
              onClick={scrollToProjects}
              hoverColor="#374151"
              className="px-8 py-4 font-semibold text-sm tracking-widest uppercase"
            >
              View Projects
            </DirectionalButton>

            <DirectionalButton
              onClick={onRequestQuote}
              variant="outline"
              className="px-8 py-4 font-medium text-sm tracking-widest uppercase backdrop-blur-sm"
            >
              Request a Quote
            </DirectionalButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
