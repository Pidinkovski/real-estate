'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** When playback reaches this time (seconds), iris transition starts (unless the file ends sooner). */
const INTRO_MAX_PLAY_SECONDS = 10;
/** Matches `.reveal-*` animation duration in `globals.css`. */
const IRIS_TRANSITION_MS = 1200;

const INTRO_VIDEO_SRC = 'https://res.cloudinary.com/dtqaoposo/video/upload/v1781693600/%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D1%86%D0%B8%D1%8F_%D0%9B%D0%BE%D0%B3%D0%BE_dwixua.mp4';

interface IntroScreenProps {
  onComplete: () => void;
  onIrisStart: () => void;
}

export default function IntroScreen({ onComplete, onIrisStart }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'video' | 'iris' | 'done'>('video');

  const goToIris = useCallback(() => {
    videoRef.current?.pause();
    onIrisStart();
    setPhase('iris');
  }, [onIrisStart]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= INTRO_MAX_PLAY_SECONDS) {
        goToIris();
      }
    };

    const handleEnded = () => {
      goToIris();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        goToIris();
      });
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [goToIris]);

  useEffect(() => {
    if (phase === 'iris') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, IRIS_TRANSITION_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <>
      {phase === 'video' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <div className="relative h-[75vh] w-[75vw] max-h-[90vh] max-w-[92vw] overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={INTRO_VIDEO_SRC}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full bg-black object-contain [transform:translateZ(0)]"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  'radial-gradient(ellipse 96% 96% at 50% 50%, transparent 34%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.72) 82%, #000 100%)',
                boxShadow: [
                  'inset 0 0 min(42vw, 480px) min(32vh, 340px) rgba(0,0,0,0.38)',
                  'inset 0 0 min(22vw, 260px) min(16vh, 200px) rgba(0,0,0,0.72)',
                  'inset 0 0 min(10vw, 140px) min(8vh, 110px) rgba(0,0,0,0.95)',
                  'inset 0 0 min(4vw, 56px) min(3vh, 44px) #000',
                ].join(', '),
              }}
              aria-hidden
            />
          </div>
          <button
            type="button"
            onClick={goToIris}
            className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500 transition-colors hover:text-white"
          >
            Skip
          </button>
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
