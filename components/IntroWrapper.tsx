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
  const [siteVisible, setSiteVisible] = useState(false);

  useEffect(() => {
    const needs = shouldShowIntro();
    setShowIntro(needs);
    if (!needs) setSiteVisible(true);
  }, []);

  const handleIrisStart = () => {
    setSiteVisible(true);
  };

  const handleComplete = () => {
    markIntroShown();
    setShowIntro(false);
  };

  if (showIntro === null) {
    return <div className="fixed inset-0 bg-black z-[9999]" />;
  }

  return (
    <>
      {showIntro && (
        <IntroScreen onComplete={handleComplete} onIrisStart={handleIrisStart} />
      )}
      <div
        style={{
          visibility: siteVisible ? 'visible' : 'hidden',
          opacity: siteVisible ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>
  );
}
