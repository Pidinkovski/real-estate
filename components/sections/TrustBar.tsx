'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Clock, Layers, Users } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const icons = [Users, Award, Clock, Layers];

const copy = {
  bg: [
    { amount: 20, suffix: '+', label: 'Доволни клиента' },
    { amount: 10, suffix: '+', label: 'Години опит' },
    { amount: 24, suffix: 'ч.', label: 'Отговор на запитване' },
    { amount: 4, suffix: '', label: 'Основни направления' },
  ],
  en: [
    { amount: 20, suffix: '+', label: 'Happy clients' },
    { amount: 10, suffix: '+', label: 'Years of experience' },
    { amount: 24, suffix: 'h', label: 'Inquiry response' },
    { amount: 4, suffix: '', label: 'Core disciplines' },
  ],
} as const;

function CountUpValue({ amount, suffix, active }: { amount: number; suffix: string; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(amount * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, amount]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { lang } = useLang();
  const stats = copy[lang].map((item, i) => ({ ...item, icon: icons[i] }));

  return (
    <section ref={ref} className="relative bg-obsidian-light border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />
      <div className="container-wide section-padding py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={['clients', 'experience', 'response', 'disciplines'][i]}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center gap-2 md:gap-3 py-8 md:py-10 px-3 md:px-6 text-center group"
              >
                <Icon
                  size={18}
                  className="md:w-[22px] md:h-[22px] text-gold/60 group-hover:text-gold transition-colors duration-300"
                />
                <div>
                  <motion.div
                    animate={
                      inView
                        ? {
                            scale: [1, 1.08, 1],
                            textShadow: [
                              '0 0 0 rgba(207, 166, 91, 0)',
                              '0 0 22px rgba(207, 166, 91, 0.42)',
                              '0 0 0 rgba(207, 166, 91, 0)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                    className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight"
                  >
                    <CountUpValue amount={stat.amount} suffix={stat.suffix} active={inView} />
                  </motion.div>
                  <div className="text-[10px] md:text-xs tracking-widest text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
