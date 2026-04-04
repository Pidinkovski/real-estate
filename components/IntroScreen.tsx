'use client';

import { useEffect, useRef, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'video' | 'iris' | 'done'>('video');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setPhase('iris');
    };

    video.addEventListener('ended', handleEnded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setPhase('iris');
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (phase === 'iris') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      {phase === 'video' && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dltxzncyt/video/upload/hf_20260404_182008_b1969f2a-ab1e-4d1f-9a12-9f52f8892518_dlyqp6.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {phase === 'iris' && (
        <div className="fixed inset-0 z-[9999] iris-container">
          <div className="iris-top-panel" />
          <div className="iris-bottom-panel" />
          <svg
            className="iris-curve-top"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,120 Q720,0 1440,120 L1440,0 L0,0 Z" fill="black" />
          </svg>
          <svg
            className="iris-curve-bottom"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" fill="black" />
          </svg>
        </div>
      )}

      <style jsx global>{`
        .iris-container {
          pointer-events: none;
        }

        .iris-top-panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: black;
          transform: translateY(0);
          animation: irisTopOpen 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        .iris-bottom-panel {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: black;
          transform: translateY(0);
          animation: irisBottomOpen 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        .iris-curve-top {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 120px;
          transform: translateY(-100%);
          animation: irisCurveTopOpen 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        .iris-curve-bottom {
          position: absolute;
          bottom: 50%;
          left: 0;
          width: 100%;
          height: 120px;
          transform: translateY(100%);
          animation: irisCurveBottomOpen 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }

        @keyframes irisTopOpen {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }

        @keyframes irisBottomOpen {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        @keyframes irisCurveTopOpen {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(-200%); }
        }

        @keyframes irisCurveBottomOpen {
          0% { transform: translateY(100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </>
  );
}
