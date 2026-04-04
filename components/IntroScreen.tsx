'use client';

import { useEffect, useRef, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
  onIrisStart: () => void;
}

export default function IntroScreen({ onComplete, onIrisStart }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'video' | 'iris' | 'done'>('video');
  const [irisProgress, setIrisProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      onIrisStart();
      setPhase('iris');
    };

    video.addEventListener('ended', handleEnded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        onIrisStart();
        setPhase('iris');
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onIrisStart]);

  useEffect(() => {
    if (phase !== 'iris') return;

    const duration = 1400;
    const start = performance.now();

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    let rafId: number;
    function tick(now: number) {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      const progress = easeInOut(raw);
      setIrisProgress(progress);

      if (raw < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase('done');
        onComplete();
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  const openAmount = irisProgress;
  const topY = 50 - openAmount * 55;
  const botY = 50 + openAmount * 55;
  const ctrlTop = 50 - openAmount * 120;
  const ctrlBot = 50 + openAmount * 120;

  const topPath = `M 0 ${topY} Q 50 ${ctrlTop} 100 ${topY} L 100 0 L 0 0 Z`;
  const botPath = `M 0 ${botY} Q 50 ${ctrlBot} 100 ${botY} L 100 100 L 0 100 Z`;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {phase === 'video' && (
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dltxzncyt/video/upload/hf_20260404_182008_b1969f2a-ab1e-4d1f-9a12-9f52f8892518_dlyqp6.mp4"
          muted
          playsInline
          preload="auto"
          style={{ width: '75%', height: '75%', objectFit: 'contain' }}
        />
      )}

      {phase === 'iris' && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={topPath} fill="black" />
          <path d={botPath} fill="black" />
        </svg>
      )}
    </div>
  );
}
