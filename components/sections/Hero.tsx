'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DirectionalButton from '@/components/shared/DirectionalButton';
import { useLang } from '@/lib/i18n';

interface HeroProps {
  onRequestQuote: () => void;
}

export default function Hero({ onRequestQuote }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const { t } = useLang();

  const words = [t.hero.headline1, t.hero.headline2];
  const subWords = [t.hero.sub1, t.hero.sub2, t.hero.sub3, t.hero.sub4];

  const scrollToProjects = () => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[700px] overflow-hidden flex items-center">
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
          <source src="https://res.cloudinary.com/dltxzncyt/video/upload/hf_20260404_175225_abc4564d-ec71-472b-86a6-4c1c08301b8e_jkwtdd.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian/70" />
        <div className="absolute inset-0 bg-obsidian/30" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container-wide section-padding w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8"
        >
          <div className="w-6 md:w-8 h-px bg-gold" />
          <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.25em] uppercase text-gold">
            {t.hero.tagline}
          </span>
          <div className="w-6 md:w-8 h-px bg-gold" />
        </motion.div>

        <div className="max-w-4xl">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-2">
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
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-none mb-8">
            {subWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                className={`inline-block mr-4 ${i === subWords.length - 1 ? 'text-gold' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="text-base md:text-lg lg:text-xl text-slate-300 font-light tracking-wide mb-8 md:mb-12 max-w-xl mx-auto px-4 md:px-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <DirectionalButton
              onClick={scrollToProjects}
              variant="primary"
              className="px-6 md:px-8 py-3 md:py-4 font-semibold text-xs md:text-sm tracking-widest uppercase w-full sm:w-auto"
            >
              {t.hero.viewProjects}
            </DirectionalButton>

            <DirectionalButton
              onClick={onRequestQuote}
              variant="outline"
              className="px-6 md:px-8 py-3 md:py-4 font-medium text-xs md:text-sm tracking-widest uppercase backdrop-blur-sm w-full sm:w-auto"
            >
              {t.hero.requestQuote}
            </DirectionalButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
