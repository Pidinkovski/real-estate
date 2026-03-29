'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedNavLinkProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export default function AnimatedNavLink({ label, onClick, className = '' }: AnimatedNavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const characters = label.split('');

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <span className="sr-only">{label}</span>

      {/* Main text layer */}
      <span className="relative block" aria-hidden="true">
        {characters.map((char, index) => (
          <motion.span
            key={`main-${index}`}
            className="inline-block"
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: isHovered ? -20 : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.025,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Incoming text layer from below */}
      <span className="absolute inset-0 flex" aria-hidden="true">
        {characters.map((char, index) => (
          <motion.span
            key={`hover-${index}`}
            className="inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.025,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Underline animation */}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
    </button>
  );
}
