import React, { useState, useEffect, useRef } from 'react';
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface EyesCardProps {
  className?: string;
}

export function EyesCard({ className = "" }: EyesCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener to window for global mouse tracking
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set visible after mount
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate pupil position based on mouse position
  const calculatePupilPosition = (eyeCenterX: number, eyeCenterY: number) => {
    if (!cardRef.current) return { x: 0, y: 0 };

    const rect = cardRef.current.getBoundingClientRect();
    const eyeAbsoluteX = rect.left + eyeCenterX;
    const eyeAbsoluteY = rect.top + eyeCenterY;

    // Calculate angle from eye center to mouse
    const deltaX = mousePosition.x - eyeAbsoluteX;
    const deltaY = mousePosition.y - eyeAbsoluteY;
    const angle = Math.atan2(deltaY, deltaX);

    // Limit pupil movement within the eye bounds (radius constraint)
    const maxRadius = 8; // Maximum distance pupil can move from center
    const distance = Math.min(maxRadius, Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 0.05);

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };

  // Eye positions (relative to card center)
  const leftEyePos = calculatePupilPosition(32, 32); // Left eye center
  const rightEyePos = calculatePupilPosition(88, 32); // Right eye center

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5
      }}
      whileHover={{ 
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.5 }
      }}
    >
      <Card className="w-32 h-20 bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        {/* Eyes container */}
        <div className="relative w-full h-full flex items-center justify-center gap-6">
          {/* Left Eye */}
          <div className="relative">
            {/* Eye socket */}
            <div className="w-8 h-8 bg-background rounded-full border-2 border-primary/20 shadow-inner relative overflow-hidden">
              {/* Iris */}
              <div className="absolute inset-1 bg-gradient-to-br from-primary/60 to-secondary/40 rounded-full">
                {/* Pupil */}
                <motion.div
                  className="absolute w-3 h-3 bg-foreground rounded-full top-1/2 left-1/2"
                  style={{
                    x: leftEyePos.x,
                    y: leftEyePos.y,
                    transformOrigin: 'center'
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                >
                  {/* Pupil highlight */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-background/60 rounded-full" />
                </motion.div>
              </div>
              {/* Eye highlight */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-background/30 rounded-full blur-sm" />
            </div>
          </div>

          {/* Right Eye */}
          <div className="relative">
            {/* Eye socket */}
            <div className="w-8 h-8 bg-background rounded-full border-2 border-primary/20 shadow-inner relative overflow-hidden">
              {/* Iris */}
              <div className="absolute inset-1 bg-gradient-to-br from-primary/60 to-secondary/40 rounded-full">
                {/* Pupil */}
                <motion.div
                  className="absolute w-3 h-3 bg-foreground rounded-full top-1/2 left-1/2"
                  style={{
                    x: rightEyePos.x,
                    y: rightEyePos.y,
                    transformOrigin: 'center'
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                >
                  {/* Pupil highlight */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-background/60 rounded-full" />
                </motion.div>
              </div>
              {/* Eye highlight */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-background/30 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-primary/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50" />
      </Card>
    </motion.div>
  );
}