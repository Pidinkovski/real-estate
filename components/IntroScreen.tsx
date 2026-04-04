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
    if (phase === 'iris') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        {phase === 'video' && (
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dltxzncyt/video/upload/hf_20260404_182008_b1969f2a-ab1e-4d1f-9a12-9f52f8892518_dlyqp6.mp4"
            muted
            playsInline
            preload="auto"
            style={{ width: '65%', height: '65%', objectFit: 'contain' }}
          />
        )}

        {phase === 'iris' && (
          <div className="iris-wipe" />
        )}
      </div>

      <style jsx global>{`
        .iris-wipe {
          position: absolute;
          inset: 0;
          background: black;
          animation: irisExpand 1.25s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        @keyframes irisExpand {
          0% {
            clip-path: ellipse(100% 55% at 50% 50%);
          }
          100% {
            clip-path: ellipse(0% 0% at 50% 50%);
          }
        }
      `}</style>
    </>
  );
}
