import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MouseFollowingEyesProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  eyeColor?: string;
  pupilColor?: string;
  animated?: boolean;
}

export function MouseFollowingEyes({ 
  className = "",
  size = 'md',
  eyeColor = '#ffffff',
  pupilColor = '#3B82F6',
  animated = true
}: MouseFollowingEyesProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePositions, setEyePositions] = useState({ 
    left: { x: 0, y: 0 }, 
    right: { x: 0, y: 0 } 
  });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-16 h-8',
      eye: 'w-6 h-6',
      pupil: 'w-2 h-2',
      gap: 'gap-2'
    },
    md: {
      container: 'w-24 h-12',
      eye: 'w-10 h-10',
      pupil: 'w-3 h-3',
      gap: 'gap-4'
    },
    lg: {
      container: 'w-96 h-48',
      eye: 'w-40 h-40',
      pupil: 'w-12 h-12',
      gap: 'gap-20'
    }
  };

  const config = sizeConfig[size];

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (animated) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [animated]);

  // Calculate eye positions based on mouse position
  useEffect(() => {
    if (!leftEyeRef.current || !rightEyeRef.current || !containerRef.current || !animated) {
      return;
    }

    const calculateEyePosition = (eyeElement: HTMLElement) => {
      const eyeRect = eyeElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const deltaX = mousePosition.x - eyeCenterX;
      const deltaY = mousePosition.y - eyeCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Maximum distance the pupil can move from center
      const maxDistance = eyeRect.width * 0.25;
      const limitedDistance = Math.min(distance, maxDistance);

      const angle = Math.atan2(deltaY, deltaX);
      const x = Math.cos(angle) * limitedDistance;
      const y = Math.sin(angle) * limitedDistance;

      return { x, y };
    };

    const leftPos = calculateEyePosition(leftEyeRef.current);
    const rightPos = calculateEyePosition(rightEyeRef.current);

    setEyePositions({
      left: leftPos,
      right: rightPos
    });
  }, [mousePosition, animated]);

  // Animation variants for blinking
  const blinkVariants = {
    normal: { scaleY: 1 },
    blink: { scaleY: 0.1 }
  };

  const containerVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.1 }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`flex items-center justify-center ${config.container} ${config.gap} ${className}`}
      variants={containerVariants}
      initial="idle"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      {/* Left Eye */}
      <motion.div
        ref={leftEyeRef}
        className={`relative ${config.eye} rounded-full border-2 border-border overflow-hidden`}
        style={{ backgroundColor: eyeColor }}
        variants={blinkVariants}
        animate={animated ? "normal" : "normal"}
        transition={{ duration: 0.1 }}
        onHoverStart={() => {
          // Random blink animation
          if (Math.random() > 0.7) {
            // Trigger blink
          }
        }}
      >
        {/* Eye shine/reflection */}
        <div 
          className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm"
          style={{ 
            width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '24px',
            height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '24px'
          }}
        />
        
        {/* Pupil */}
        <motion.div
          className={`absolute top-1/2 left-1/2 ${config.pupil} rounded-full -translate-x-1/2 -translate-y-1/2`}
          style={{ 
            backgroundColor: pupilColor,
            x: animated ? eyePositions.left.x : 0,
            y: animated ? eyePositions.left.y : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          {/* Pupil shine */}
          <div 
            className="absolute top-0.5 left-0.5 bg-white/60 rounded-full"
            style={{ 
              width: size === 'sm' ? '2px' : size === 'md' ? '3px' : '12px',
              height: size === 'sm' ? '2px' : size === 'md' ? '3px' : '12px'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Right Eye */}
      <motion.div
        ref={rightEyeRef}
        className={`relative ${config.eye} rounded-full border-2 border-border overflow-hidden`}
        style={{ backgroundColor: eyeColor }}
        variants={blinkVariants}
        animate={animated ? "normal" : "normal"}
        transition={{ duration: 0.1 }}
      >
        {/* Eye shine/reflection */}
        <div 
          className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full blur-sm"
          style={{ 
            width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '24px',
            height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '24px'
          }}
        />
        
        {/* Pupil */}
        <motion.div
          className={`absolute top-1/2 left-1/2 ${config.pupil} rounded-full -translate-x-1/2 -translate-y-1/2`}
          style={{ 
            backgroundColor: pupilColor,
            x: animated ? eyePositions.right.x : 0,
            y: animated ? eyePositions.right.y : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          {/* Pupil shine */}
          <div 
            className="absolute top-0.5 left-0.5 bg-white/60 rounded-full"
            style={{ 
              width: size === 'sm' ? '2px' : size === 'md' ? '3px' : '12px',
              height: size === 'sm' ? '2px' : size === 'md' ? '3px' : '12px'
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Hook for using MouseFollowingEyes in other components
export function useMouseFollowingEyes() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleAnimation = () => setIsAnimated(!isAnimated);

  return {
    isVisible,
    isAnimated,
    toggleVisibility,
    toggleAnimation,
    EyesComponent: MouseFollowingEyes
  };
}

export default MouseFollowingEyes;