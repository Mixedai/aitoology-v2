import React, { useRef } from 'react';
import { Search, BarChart3, Zap } from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Card } from "../ui/card";

interface HeroSection2Props {
  className?: string;
}

// Individual Card Component with Parallax
const ParallaxCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index,
  parallaxDepth 
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
  parallaxDepth: number;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  // Scroll-driven parallax transform
  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const parallaxY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxDepth * 100}%`]), 
    springConfig
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y: parallaxY }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15, // 150ms stagger
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -10, // Gentle lift on hover
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="relative group" // Performance optimization class
    >
      {/* UFO Container */}
      <div className="relative w-full h-[320px]">
        
        {/* UFO Beam/Shadow Effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 opacity-20 group-hover:opacity-40"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.4), transparent 70%)",
            filter: "blur(20px)",
            transform: "translateX(-50%) scaleX(2) scaleY(0.5)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* UFO Main Body */}
        <div className="relative">
          
          {/* Top Dome/Glass Cockpit */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 top-8 w-32 h-20 z-20"
            style={{
              background: "linear-gradient(180deg, rgba(147, 197, 253, 0.6) 0%, rgba(99, 102, 241, 0.3) 100%)",
              borderRadius: "50% 50% 50% 50% / 100% 100% 20% 20%",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(147, 197, 253, 0.4)",
              boxShadow: "inset 0 10px 20px rgba(255, 255, 255, 0.3), 0 5px 15px rgba(99, 102, 241, 0.3)",
            }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glass reflection */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-white/30 rounded-full blur-md" />
          </motion.div>
          
          {/* Main Saucer Body */}
          <motion.div 
            className="relative top-16 mx-auto w-64 h-32 z-10"
            style={{
              background: "linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)",
              borderRadius: "50% / 40%",
              boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3), inset 0 -5px 10px rgba(0, 0, 0, 0.1)",
              border: "2px solid rgba(99, 102, 241, 0.2)",
            }}
            animate={{
              rotateZ: [0, 1, -1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Metallic band around middle */}
            <div 
              className="absolute top-1/2 left-0 right-0 h-4 transform -translate-y-1/2"
              style={{
                background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
            
            {/* Blinking Lights */}
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-around px-8">
              <motion.div 
                className="w-3 h-3 bg-yellow-400 rounded-full"
                style={{ boxShadow: "0 0 10px rgba(250, 204, 21, 0.8)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div 
                className="w-3 h-3 bg-red-400 rounded-full"
                style={{ boxShadow: "0 0 10px rgba(248, 113, 113, 0.8)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full"
                style={{ boxShadow: "0 0 10px rgba(74, 222, 128, 0.8)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              />
              <motion.div 
                className="w-3 h-3 bg-blue-400 rounded-full"
                style={{ boxShadow: "0 0 10px rgba(96, 165, 250, 0.8)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
              />
            </div>
          </motion.div>
          
          {/* Bottom Ring/Engine */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-24 w-56 h-20 z-5"
            style={{
              background: "linear-gradient(180deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)",
              borderRadius: "50% / 50%",
              filter: "blur(8px)",
            }}
          />
          
          {/* Content Container */}
          <div className="relative top-32 px-6 pt-8 pb-6 text-center z-30">
            {/* Icon */}
            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4"
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            
            {/* Text Content */}
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Hover Beam Effect */}
          <motion.div
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-40 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ scaleY: 0, opacity: 0 }}
            whileHover={{ scaleY: 1, opacity: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{
                background: "linear-gradient(180deg, rgba(99, 102, 241, 0.4) 0%, transparent 100%)",
                clipPath: "polygon(35% 0%, 65% 0%, 85% 100%, 15% 100%)",
                filter: "blur(10px)",
                height: "100%",
                width: "100%",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function HeroSection2({ className = "" }: HeroSection2Props) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  // Value propositions data
  const valueProps = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find tools instantly by task, price, or rating.",
      parallaxDepth: 0.04 // Left card - slowest parallax
    },
    {
      icon: BarChart3,
      title: "Deep Compare",
      description: "Compare features, pricing, and performance across tools.",
      parallaxDepth: 0.07 // Middle card - medium parallax
    },
    {
      icon: Zap,
      title: "Ready Workflows",
      description: "Access pre-built workflows and step-by-step tutorials.",
      parallaxDepth: 0.10 // Right card - fastest parallax
    }
  ];

  // Responsive parallax depths (reduced for mobile)
  const mobileParallaxDepths = [0.02, 0.03, 0.04];

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 px-6 overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      
      {/* Light pastel radial gradient wash */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.04) 0%, transparent 70%)
          `
        }}
      />

      {/* Faint horizontal grid (6-8% opacity) */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '100% 32px' // 32px = 4 * 8px for 8-point grid alignment
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Supercharge your discovery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore, compare, and master AI tools with our intelligent platform designed for modern workflows.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div 
              key={prop.title}
              className="intersection-optimized" // Performance optimization
            >
              {/* Desktop: Use original parallax depths */}
              <div className="hidden md:block">
                <ParallaxCard
                  icon={prop.icon}
                  title={prop.title}
                  description={prop.description}
                  index={index}
                  parallaxDepth={prop.parallaxDepth}
                />
              </div>
              
              {/* Mobile: Use reduced parallax depths */}
              <div className="block md:hidden">
                <ParallaxCard
                  icon={prop.icon}
                  title={prop.title}
                  description={prop.description}
                  index={index}
                  parallaxDepth={mobileParallaxDepths[index]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}