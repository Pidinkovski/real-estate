'use client';

import { useState } from 'react';
import IntroScreen from './IntroScreen';

interface IntroWrapperProps {
  children: React.ReactNode;
}

export default function IntroWrapper({ children }: IntroWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  const handleIrisStart = () => {
    setSiteVisible(true);
  };

  const handleComplete = () => {
    setShowIntro(false);
  };

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
