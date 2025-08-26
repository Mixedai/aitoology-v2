import React, { useState, useEffect, useRef } from 'react';
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface RobotEyesCardProps {
  className?: string;
}

export function RobotEyesCard({ className = "" }: RobotEyesCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Track mouse position globally with enhanced performance
  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // ENHANCED: Pupil position calculation for larger eyes
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

    // ENHANCED: Larger pupil movement range for bigger eyes
    const maxRadius = 14; // Increased from 10px for larger eyes
    
    // Enhanced scaling for more responsive movement
    const movementScale = Math.min(1, distance / 120); // More sensitive scaling
    const actualRadius = maxRadius * movementScale;

    // Calculate pupil offset from eye center
    return {
      x: Math.cos(angle) * actualRadius,
      y: Math.sin(angle) * actualRadius
    };
  };

  // UPDATED: Eye center positions for larger card (w-80 h-64 = 320x256px)
  // Eyes are w-24 h-24 (96px), with gap-8 (32px) between them
  // Left eye center: ~120px from left edge
  // Right eye center: ~200px from left edge  
  // Vertical center: ~128px from top
  const leftEyePos = calculatePupilPosition(120, 128);   
  const rightEyePos = calculatePupilPosition(200, 128); 

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
        duration: 1.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.4 }
      }}
    >
      {/* ENHANCED: Larger card with better proportions */}
      <Card className="w-80 h-64 bg-gradient-to-br from-card/95 to-muted/70 backdrop-blur-sm border-primary/30 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden relative">
        
        {/* Animated background orbs */}
        <motion.div
          className="absolute -top-8 -right-8 w-24 h-24 bg-primary/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -left-8 w-20 h-20 bg-secondary/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Robot Head Frame with enhanced styling */}
        <div className="absolute inset-3 rounded-xl border-2 border-primary/25 bg-gradient-to-br from-background/60 to-muted/40 backdrop-blur-sm">
          
          {/* Enhanced top antenna array */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 flex gap-6">
            <motion.div
              className="w-3 h-8 bg-gradient-to-t from-primary/60 to-primary/80 rounded-full shadow-lg"
              animate={{
                height: [32, 40, 32],
                opacity: [0.6, 1, 0.6],
                scaleY: [1, 1.2, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-2 h-6 bg-gradient-to-t from-secondary/60 to-secondary/80 rounded-full shadow-md"
              animate={{
                height: [24, 32, 24],
                opacity: [0.6, 1, 0.6],
                scaleY: [1, 1.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7
              }}
            />
            <motion.div
              className="w-2.5 h-5 bg-gradient-to-t from-primary/50 to-primary/70 rounded-full shadow-sm"
              animate={{
                height: [20, 28, 20],
                opacity: [0.5, 0.9, 0.5],
                scaleY: [1, 1.4, 1]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
              }}
            />
          </div>

          {/* ENHANCED: Robot Eyes Container with larger spacing */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex items-center gap-8">
              
              {/* ENHANCED: Left Eye - Much Larger */}
              <div className="relative">
                {/* Eye Housing - Larger and more detailed */}
                <div className="w-24 h-24 bg-gradient-to-br from-background via-muted/60 to-background rounded-full border-4 border-primary/40 shadow-2xl relative overflow-hidden">
                  {/* Enhanced inner eye ring */}
                  <div className="absolute inset-3 bg-gradient-to-br from-muted/90 to-background rounded-full border-2 border-primary/30 shadow-inner">
                    {/* Enhanced iris with better gradients */}
                    <div className="absolute inset-3 bg-gradient-to-br from-primary/50 via-primary/70 to-secondary/50 rounded-full shadow-inner relative overflow-hidden">
                      {/* Iris texture lines */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={`iris-line-${i}`}
                            className="absolute w-full h-0.5 bg-foreground/30 origin-center"
                            style={{
                              top: '50%',
                              transform: `rotate(${i * 22.5}deg) translateY(-50%)`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* ENHANCED: Pupil - Larger and more detailed */}
                      <motion.div
                        className="absolute w-8 h-8 bg-gradient-to-br from-foreground via-foreground to-foreground/90 rounded-full shadow-xl"
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
                          damping: 30,     
                          mass: 0.5        
                        }}
                      >
                        {/* Enhanced pupil highlights */}
                        <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-background/90 rounded-full" />
                        <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-background/60 rounded-full" />
                        {/* Digital scan effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent rounded-full"
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced eye glare effects */}
                  <div className="absolute top-3 left-4 w-4 h-4 bg-background/50 rounded-full blur-sm" />
                  <div className="absolute top-5 right-5 w-2 h-2 bg-background/30 rounded-full" />
                  
                  {/* Enhanced digital scan line */}
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                    animate={{
                      y: [0, 88, 0],
                      opacity: [0, 0.9, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0
                    }}
                  />
                </div>
                
                {/* Enhanced LED indicator */}
                <motion.div
                  className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg border-2 border-background"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                    boxShadow: ["0 0 0 0 rgba(255,107,53,0.4)", "0 0 0 8px rgba(255,107,53,0)", "0 0 0 0 rgba(255,107,53,0.4)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* ENHANCED: Right Eye - Much Larger */}
              <div className="relative">
                {/* Eye Housing - Larger and more detailed */}
                <div className="w-24 h-24 bg-gradient-to-br from-background via-muted/60 to-background rounded-full border-4 border-primary/40 shadow-2xl relative overflow-hidden">
                  {/* Enhanced inner eye ring */}
                  <div className="absolute inset-3 bg-gradient-to-br from-muted/90 to-background rounded-full border-2 border-primary/30 shadow-inner">
                    {/* Enhanced iris with better gradients */}
                    <div className="absolute inset-3 bg-gradient-to-br from-primary/50 via-primary/70 to-secondary/50 rounded-full shadow-inner relative overflow-hidden">
                      {/* Iris texture lines */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={`iris-line-right-${i}`}
                            className="absolute w-full h-0.5 bg-foreground/30 origin-center"
                            style={{
                              top: '50%',
                              transform: `rotate(${i * 22.5}deg) translateY(-50%)`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* ENHANCED: Pupil - Larger and more detailed */}
                      <motion.div
                        className="absolute w-8 h-8 bg-gradient-to-br from-foreground via-foreground to-foreground/90 rounded-full shadow-xl"
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
                          damping: 30,     
                          mass: 0.5        
                        }}
                      >
                        {/* Enhanced pupil highlights */}
                        <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-background/90 rounded-full" />
                        <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-background/60 rounded-full" />
                        {/* Digital scan effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent rounded-full"
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced eye glare effects */}
                  <div className="absolute top-3 left-4 w-4 h-4 bg-background/50 rounded-full blur-sm" />
                  <div className="absolute top-5 right-5 w-2 h-2 bg-background/30 rounded-full" />
                  
                  {/* Enhanced digital scan line */}
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                    animate={{
                      y: [0, 88, 0],
                      opacity: [0, 0.9, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2
                    }}
                  />
                </div>
                
                {/* Enhanced LED indicator */}
                <motion.div
                  className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-br from-secondary to-secondary/80 rounded-full shadow-lg border-2 border-background"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                    boxShadow: ["0 0 0 0 rgba(74,92,122,0.4)", "0 0 0 8px rgba(74,92,122,0)", "0 0 0 0 rgba(74,92,122,0.4)"]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Robot Mouth/Speaker Array */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex gap-1.5">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`mouth-bar-${i}`}
                  className="w-1.5 bg-gradient-to-t from-primary/40 via-primary/60 to-primary/30 rounded-full shadow-sm"
                  animate={{
                    height: [6, 12, 6],
                    opacity: [0.4, 0.8, 0.4],
                    scaleY: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.06,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Side Control Panels */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`left-panel-${i}`}
                  className="w-8 h-1.5 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-full shadow-sm"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    width: [32, 40, 32],
                    scaleX: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`right-panel-${i}`}
                  className="w-8 h-1.5 bg-gradient-to-r from-secondary/30 via-secondary/50 to-secondary/30 rounded-full shadow-sm"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    width: [32, 40, 32],
                    scaleX: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4 + 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Corner Elements */}
        <div className="absolute top-6 left-6 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
        <div className="absolute top-6 right-6 w-4 h-4 border-r-2 border-t-2 border-primary/50" />
        <div className="absolute bottom-6 left-6 w-4 h-4 border-l-2 border-b-2 border-primary/50" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-r-2 border-b-2 border-primary/50" />

        {/* Floating digital particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${15 + (i % 3) * 20}%`
            }}
            animate={{
              opacity: [0, 0.8, 0],
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
      </Card>
    </motion.div>
  );
}