'use client';

import { useState, useRef, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DirectionalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'outline-gold';
  hoverColor?: string;
}

export default function DirectionalButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'primary',
  hoverColor,
}: DirectionalButtonProps) {
  const [hoverOrigin, setHoverOrigin] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setHoverOrigin({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseClasses = variant === 'primary'
    ? 'bg-gold text-obsidian'
    : variant === 'outline-gold'
    ? 'border border-gold text-gold'
    : 'border border-white/15 text-slate-400';

  const fillColor = hoverColor
    ? hoverColor
    : variant === 'primary'
    ? '#d4b06a'
    : '#C9A84C';

  const diameter = 300;

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-full ${baseClasses} ${className}`}
    >
      <motion.span
        animate={{
          scale: isHovered ? 6 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'absolute',
          left: hoverOrigin.x - diameter / 2,
          top: hoverOrigin.y - diameter / 2,
          width: diameter,
          height: diameter,
          borderRadius: '50%',
          backgroundColor: fillColor,
          pointerEvents: 'none',
        }}
      />

      <span
        className="relative z-10 flex items-center gap-3 whitespace-nowrap transition-colors duration-300"
        style={{
          color: isHovered
            ? variant === 'outline-gold'
              ? '#0f1923'
              : variant === 'outline'
              ? '#ffffff'
              : variant === 'primary'
              ? '#ffffff'
              : undefined
            : undefined,
        }}
      >
        {children}
      </span>
    </button>
  );
}
