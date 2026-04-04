'use client';

import { useEffect, useRef, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
  onIrisStart: () => void;
}

export default function IntroScreen({ onComplete, onIrisStart }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'video' | 'iris' | 'done'>('video');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 4) {
        video.pause();
        onIrisStart();
        setPhase('iris');
      }
    };

    const handleEnded = () => {
      onIrisStart();
      setPhase('iris');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        onIrisStart();
        setPhase('iris');
      });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onIrisStart]);

  useEffect(() => {
    if (phase === 'iris') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      {phase === 'video' && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dltxzncyt/video/upload/hf_20260404_182008_b1969f2a-ab1e-4d1f-9a12-9f52f8892518_dlyqp6.mp4"
            muted
            playsInline
            preload="auto"
            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
          />
        </div>
      )}

      {phase === 'iris' && (
        <>
          <div className="reveal-top" />
          <div className="reveal-bottom" />
        </>
      )}

</>
  );
}
