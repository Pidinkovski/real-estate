'use client';

import { useEffect, useState } from 'react';
import IntroScreen from './IntroScreen';

const SESSION_KEY = 'intro_shown';
const EXPIRY_MS = 30 * 60 * 1000;

function shouldShowIntro(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return true;
    const { timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > EXPIRY_MS) return true;
    return false;
  } catch {
    return true;
  }
}

function markIntroShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ timestamp: Date.now() }));
  } catch {}
}

interface IntroWrapperProps {
  children: React.ReactNode;
}

export default function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    setShowIntro(shouldShowIntro());
  }, []);

  const handleComplete = () => {
    markIntroShown();
    setShowIntro(false);
  };

  if (showIntro === null) {
    return <div className="fixed inset-0 bg-black z-[9999]" />;
  }

  return (
    <>
      {showIntro && <IntroScreen onComplete={handleComplete} />}
      <div
        style={{
          visibility: showIntro ? 'hidden' : 'visible',
          opacity: showIntro ? 0 : 1,
          transition: showIntro ? 'none' : 'opacity 0.3s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
