'use client';

import { useState, useRef, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DirectionalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'outline';
}

export default function DirectionalButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'primary',
}: DirectionalButtonProps) {
  const [hoverOrigin, setHoverOrigin] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverOrigin({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseClasses = variant === 'primary'
    ? 'bg-gold text-obsidian'
    : 'border border-white/15 text-slate-400';

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${baseClasses} ${className}`}
    >
      {/* Directional fill layer */}
      <motion.span
        className={`absolute aspect-square ${variant === 'primary' ? 'bg-gold-light' : 'bg-gold'}`}
        initial={false}
        animate={{
          scale: isHovered ? 3 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          left: hoverOrigin.x,
          top: hoverOrigin.y,
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
        }}
      />

      {/* Text layer */}
      <span className={`relative z-10 flex items-center gap-3 whitespace-nowrap ${variant === 'outline' && isHovered ? 'text-obsidian' : ''} transition-colors duration-300`}>
        {children}
      </span>
    </button>
  );
}
