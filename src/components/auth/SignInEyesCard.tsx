import React, { useState, useEffect, useRef } from 'react';
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface SignInEyesCardProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SignInEyesCard({ className = "", size = 'md' }: SignInEyesCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Enhanced size configurations following 8-point grid system
  const sizeConfig = {
    sm: {
      card: "w-64 h-40", // 256x160px - 8-point grid
      eye: "w-16 h-16",  // 64x64px
      pupil: "w-6 h-6",  // 24x24px
      gap: "gap-4",      // 16px gap
      eyeCenterLeft: 80,  // Left eye center X
      eyeCenterRight: 176, // Right eye center X
      eyeCenterY: 80,     // Eye center Y
      maxRadius: 8        // Pupil movement range
    },
    md: {
      card: "w-96 h-56",  // Larger card: 384x224px - 8-point grid
      eye: "w-24 h-24",   // Larger eyes: 96x96px
      pupil: "w-10 h-10", // Larger pupils: 40x40px
      gap: "gap-8",       // More gap: 32px gap
      eyeCenterLeft: 120,  // Adjusted for larger card
      eyeCenterRight: 264, // Adjusted for larger card
      eyeCenterY: 112,     // Adjusted for larger card
      maxRadius: 15       // More movement range
    },
    lg: {
      card: "w-[28rem] h-64", // Even larger: 448x256px - 8-point grid
      eye: "w-28 h-28",   // 112x112px
      pupil: "w-12 h-12", // 48x48px
      gap: "gap-10",      // 40px gap
      eyeCenterLeft: 140,
      eyeCenterRight: 308,
      eyeCenterY: 128,
      maxRadius: 18
    }
  };

  const config = sizeConfig[size];

  // Performance-optimized mouse tracking with debug
  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsInteracting(true);
        
        // Reset interaction state after a brief delay
        setTimeout(() => setIsInteracting(false), 150);
      });
    };

    console.log('🔍 SignInEyesCard: Mouse tracking setup complete');
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Enhanced pupil position calculation with debug
  const calculatePupilPosition = (eyeCenterX: number, eyeCenterY: number) => {
    if (!cardRef.current) return { x: 0, y: 0 };

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate absolute eye center position on screen
    const eyeAbsoluteX = rect.left + eyeCenterX;
    const eyeAbsoluteY = rect.top + eyeCenterY;

    // Calculate vector from eye center to mouse
    const deltaX = mousePosition.x - eyeAbsoluteX;
    const deltaY = mousePosition.y - eyeAbsoluteY;
    
    // Calculate distance and angle
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    // Enhanced scaling for natural eye movement
    const movementScale = Math.min(1, distance / 150);
    const actualRadius = config.maxRadius * movementScale;

    // Calculate pupil offset from eye center
    return {
      x: Math.cos(angle) * actualRadius,
      y: Math.sin(angle) * actualRadius
    };
  };

  const leftEyePos = calculatePupilPosition(config.eyeCenterLeft, config.eyeCenterY);   
  const rightEyePos = calculatePupilPosition(config.eyeCenterRight, config.eyeCenterY); 

  console.log('🔍 SignInEyesCard rendering with:', { 
    size, 
    config: config.card, 
    isVisible, 
    mousePosition,
    leftEyePos,
    rightEyePos
  });

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.9,
        y: isVisible ? 0 : 20
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      role="img"
      aria-label="AI Assistant - Interactive eyes that follow your cursor"
    >
      <Card className={`${config.card} bg-gradient-to-br from-card/95 to-muted/70 backdrop-blur-sm border-primary/30 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative`}>
        
        {/* Enhanced visual indicator that this is interactive */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-xs text-primary">👀 Interactive</span>
          </div>
        </div>
        
        {/* Animated background elements with reduced motion support */}
        <motion.div
          className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-xl motion-reduce-simplify"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/10 rounded-full blur-xl motion-reduce-simplify"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Main content area with semantic structure */}
        <div className="absolute inset-4 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-background/60 to-muted/40 backdrop-blur-sm">
          
          {/* Eyes container with proper spacing */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`flex items-center ${config.gap}`}>
              
              {/* Left Eye with enhanced visibility */}
              <div className="relative">
                <div 
                  className={`${config.eye} bg-gradient-to-br from-background via-muted/50 to-background rounded-full border-4 border-primary/40 shadow-2xl relative overflow-hidden`}
                  role="presentation"
                  aria-hidden="true"
                >
                  {/* Eye inner ring */}
                  <div className="absolute inset-3 bg-gradient-to-br from-muted/80 to-background rounded-full border-2 border-primary/30 shadow-inner">
                    {/* Iris with design system colors - more prominent */}
                    <div className="absolute inset-3 bg-gradient-to-br from-primary/50 via-primary/70 to-secondary/50 rounded-full shadow-inner relative overflow-hidden">
                      
                      {/* Pupil with enhanced tracking - larger and more visible */}
                      <motion.div
                        className={`absolute ${config.pupil} bg-gradient-to-br from-foreground via-foreground to-foreground/90 rounded-full shadow-xl border border-foreground/20`}
                        style={{
                          left: '50%',
                          top: '50%',
                          x: leftEyePos.x,
                          y: leftEyePos.y,
                          translateX: '-50%',
                          translateY: '-50%'
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 280,  
                          damping: 25,     
                          mass: 0.4        
                        }}
                      >
                        {/* Enhanced pupil highlights for realism */}
                        <div className="absolute top-2 left-2 w-3 h-3 bg-background/90 rounded-full" />
                        <div className="absolute top-1 left-1 w-2 h-2 bg-background/60 rounded-full" />
                        
                        {/* Interactive scan effect - more prominent */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent rounded-full"
                          animate={{
                            opacity: isInteracting ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
                            scale: isInteracting ? [1, 1.1, 1] : [1, 1.05, 1]
                          }}
                          transition={{
                            duration: isInteracting ? 0.5 : 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced eye glare effects */}
                  <div className="absolute top-3 left-4 w-4 h-4 bg-background/50 rounded-full blur-sm" />
                  <div className="absolute bottom-3 right-3 w-2 h-2 bg-background/30 rounded-full" />
                </div>
              </div>

              {/* Right Eye - Mirror of left eye with enhanced visibility */}
              <div className="relative">
                <div 
                  className={`${config.eye} bg-gradient-to-br from-background via-muted/50 to-background rounded-full border-4 border-primary/40 shadow-2xl relative overflow-hidden`}
                  role="presentation"
                  aria-hidden="true"
                >
                  {/* Eye inner ring */}
                  <div className="absolute inset-3 bg-gradient-to-br from-muted/80 to-background rounded-full border-2 border-primary/30 shadow-inner">
                    {/* Iris with design system colors - more prominent */}
                    <div className="absolute inset-3 bg-gradient-to-br from-primary/50 via-primary/70 to-secondary/50 rounded-full shadow-inner relative overflow-hidden">
                      
                      {/* Pupil with enhanced tracking - larger and more visible */}
                      <motion.div
                        className={`absolute ${config.pupil} bg-gradient-to-br from-foreground via-foreground to-foreground/90 rounded-full shadow-xl border border-foreground/20`}
                        style={{
                          left: '50%',
                          top: '50%',
                          x: rightEyePos.x,
                          y: rightEyePos.y,
                          translateX: '-50%',
                          translateY: '-50%'
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 280,  
                          damping: 25,     
                          mass: 0.4        
                        }}
                      >
                        {/* Enhanced pupil highlights for realism */}
                        <div className="absolute top-2 left-2 w-3 h-3 bg-background/90 rounded-full" />
                        <div className="absolute top-1 left-1 w-2 h-2 bg-background/60 rounded-full" />
                        
                        {/* Interactive scan effect - more prominent */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent rounded-full"
                          animate={{
                            opacity: isInteracting ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
                            scale: isInteracting ? [1, 1.1, 1] : [1, 1.05, 1]
                          }}
                          transition={{
                            duration: isInteracting ? 0.5 : 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced eye glare effects */}
                  <div className="absolute top-3 left-4 w-4 h-4 bg-background/50 rounded-full blur-sm" />
                  <div className="absolute bottom-3 right-3 w-2 h-2 bg-background/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced corner decorations following design system */}
        <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
        <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary/50" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-primary/50" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-primary/50" />

        {/* Floating particles with proper spacing */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full motion-reduce-hide"
            style={{
              left: `${20 + i * 12}%`,
              top: `${15 + (i % 3) * 20}%`
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Bottom indicator text */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="px-2 py-1 bg-foreground/10 rounded-full">
            <span className="text-xs text-muted-foreground">Move your mouse! 🖱️</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}