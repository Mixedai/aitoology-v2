import { useEffect,useRef,useState, } from 'react';

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Search, 
  BarChart3, 
  Zap,
  ArrowRight,
  Sparkles,
  Plus,
  Eye,
  Cpu,
  Network,
  Boxes,
  CircuitBoard,
  Brain,
  Bot
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ModernAIToologistHomeProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
}

// Parallax Eye Component
const ParallaxEye = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(8, Math.sqrt(Math.pow(e.clientX - eyeX, 2) + Math.pow(e.clientY - eyeY, 2)) / 10);
        
        setMousePosition({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={eyeRef}
      className={`relative w-16 h-16 bg-white rounded-full shadow-xl border-4 border-primary/30 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  );
};

// Enhanced Floating Orb Component
const FloatingOrb = ({ 
  className = "", 
  size = "w-64 h-64", 
  delay = 0,
  duration = 20,
  colors = "from-sky-400 to-indigo-500"
}: { 
  className?: string; 
  size?: string; 
  delay?: number;
  duration?: number;
  colors?: string;
}) => (
  <motion.div
    className={`absolute ${size} ${className} rounded-full blur-2xl pointer-events-none bg-gradient-to-br ${colors}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.4, 0.7, 0.4],
      scale: [1, 1.3, 1],
      x: [0, 30, 0],
      y: [0, -20, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// AI Decorative Shape Component
const AIShape = ({ 
  icon: Icon, 
  className = "", 
  delay = 0,
  duration = 15 
}: { 
  icon: any; 
  className?: string; 
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    className={`absolute ${className} opacity-20 pointer-events-none text-primary`}
    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 360],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    <Icon className="w-6 h-6" />
  </motion.div>
);

// Floating Dots Component
const FloatingDots = ({ count = 15 }: { count?: number }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 8,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute bg-primary/20 rounded-full pointer-events-none"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
            y: [0, -15, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

export function ModernAIToologistHome({ onNavigate }: ModernAIToologistHomeProps) {
  const { scrollYProgress } = useScroll();
  
  // Enhanced Parallax transforms with more noticeable movement
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']); // Slower
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']); // Medium
  const shapesY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']); // Faster
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const trendingRef = useRef(null);
  const ctaRef = useRef(null);
  
  // In-view detection
  const heroInView = useInView(heroRef, { once: true, margin: "-10%" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-10%" });
  const trendingInView = useInView(trendingRef, { once: true, margin: "-10%" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-10%" });

  // Animation variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find tools instantly by task, price, or rating."
    },
    {
      icon: BarChart3,
      title: "Compare",
      description: "Compare features across multiple tools with tables."
    },
    {
      icon: Zap,
      title: "Workflows",
      description: "Ready-made workflows and tutorials."
    }
  ];

  const trendingCards = Array(6).fill(null).map((_, i) => ({
    id: i,
    gradient: [
      'from-blue-400 to-purple-500',
      'from-green-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-yellow-400 to-orange-500',
      'from-pink-400 to-red-500',
      'from-indigo-400 to-purple-500'
    ][i]
  }));

  // Event handlers
  const handleBrowseTools = () => {
    if (onNavigate) {
      onNavigate('modern-home', 'explore-frame');
    }
  };

  const handleSubmitTool = () => {
    if (onNavigate) {
      onNavigate('modern-home', 'submit');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* COMPLETELY REDESIGNED PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Base Gradient Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.20) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
            linear-gradient(135deg, 
              #fef7ed 0%, 
              #fef2f2 25%, 
              #eff6ff 75%, 
              #eef2ff 100%
            )
          `
        }}
      />

      {/* Layer 2: Grid Texture with Strong Parallax */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 3: Large Animated Orbs */}
      <motion.div style={{ y: orbY }} className="fixed inset-0 z-0">
        {/* Left Sky Blue → Indigo Orb */}
        <FloatingOrb 
          className="-left-32 top-1/4"
          size="w-80 h-80"
          colors="from-sky-400 via-blue-500 to-indigo-600"
          delay={0}
          duration={20}
        />
        
        {/* Right Amber → Rose Orb */}
        <FloatingOrb 
          className="-right-24 top-1/3"
          size="w-96 h-96"
          colors="from-amber-400 via-orange-500 to-rose-500"
          delay={3}
          duration={25}
        />
        
        {/* Bottom Left Purple Orb */}
        <FloatingOrb 
          className="left-1/4 bottom-1/4"
          size="w-64 h-64"
          colors="from-purple-400 via-pink-500 to-rose-400"
          delay={6}
          duration={30}
        />
        
        {/* Top Right Cyan Orb */}
        <FloatingOrb 
          className="right-1/3 top-1/5"
          size="w-48 h-48"
          colors="from-cyan-400 via-teal-500 to-blue-500"
          delay={9}
          duration={18}
        />
      </motion.div>

      {/* Layer 4: AI Tech Shapes with Fast Parallax */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        <AIShape icon={Brain} className="top-1/6 left-1/5" delay={0} duration={16} />
        <AIShape icon={Cpu} className="top-1/4 right-1/4" delay={2} duration={14} />
        <AIShape icon={Network} className="bottom-1/3 left-1/3" delay={4} duration={18} />
        <AIShape icon={CircuitBoard} className="bottom-1/5 right-1/6" delay={6} duration={12} />
        <AIShape icon={Bot} className="top-1/2 left-1/2" delay={8} duration={20} />
        <AIShape icon={Boxes} className="top-1/8 right-1/2" delay={10} duration={15} />
        <AIShape icon={Search} className="top-2/3 left-1/6" delay={3} duration={13} />
        <AIShape icon={Zap} className="bottom-1/6 right-1/3" delay={7} duration={17} />
      </motion.div>

      {/* Layer 5: Animated Dots */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        <FloatingDots count={20} />
      </motion.div>

      {/* Layer 6: Connecting Lines */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/6 w-32 h-px bg-gradient-to-r from-primary/30 to-transparent"
          animate={{ 
            scaleX: [1, 1.5, 1], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-24 h-px bg-gradient-to-l from-secondary/30 to-transparent rotate-45"
          animate={{ 
            scaleX: [1, 1.3, 1], 
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-28 h-px bg-gradient-to-r from-primary/20 to-transparent -rotate-12"
          animate={{ 
            scaleX: [1, 1.4, 1], 
            opacity: [0.15, 0.25, 0.15] 
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 py-24"
          style={{ y: heroY }}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              {/* Playful Eyes */}
              <motion.div 
                variants={fadeUpVariant}
                className="flex justify-center gap-6 mb-12"
              >
                <ParallaxEye delay={0} />
                <ParallaxEye delay={0.2} />
              </motion.div>

              {/* Hero Text with Enhanced Styling */}
              <motion.h1 
                variants={fadeUpVariant}
                className="text-4xl md:text-6xl lg:text-7xl leading-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent max-w-4xl mx-auto"
              >
                Discover the Perfect AI Tool for Every Task
              </motion.h1>

              <motion.p 
                variants={fadeUpVariant}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Compare, review, and find the best AI tools to supercharge your workflow.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div 
                variants={fadeUpVariant}
                className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
              >
                <Button 
                  onClick={handleBrowseTools}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 h-14 px-10 gap-3 rounded-xl"
                  size="lg"
                >
                  <Sparkles className="w-6 h-6" />
                  Browse All Tools
                </Button>
                
                <Button 
                  onClick={handleSubmitTool}
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 h-14 px-10 gap-3 rounded-xl"
                  size="lg"
                >
                  <Plus className="w-6 h-6" />
                  Submit Tool
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          ref={featuresRef}
          className="py-24 px-6 relative"
        >
          {/* Section Background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeUpVariant}
                className="text-3xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Supercharge your discovery
              </motion.h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeUpVariant}>
                  <Card className="relative p-8 h-full bg-white/70 backdrop-blur-lg border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 rounded-3xl group">
                    {/* Enhanced gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                    
                    <div className="relative space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Trending Section */}
        <motion.section 
          ref={trendingRef}
          className="py-24 px-6 relative"
        >
          {/* Section Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-blue-50/80 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={trendingInView ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeUpVariant}
                className="text-3xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                See what's trending
              </motion.h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate={trendingInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {trendingCards.map((card, index) => (
                <motion.div 
                  key={card.id} 
                  variants={fadeUpVariant}
                  style={{ 
                    transform: `translateZ(${index * 10}px)` 
                  }}
                >
                  <Card className="relative overflow-hidden bg-white/70 backdrop-blur-lg border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 rounded-3xl group cursor-pointer">
                    {/* Enhanced gradient mockup */}
                    <div className={`h-56 bg-gradient-to-br ${card.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/5" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    {/* Content mockup */}
                    <div className="p-8 space-y-4">
                      <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg w-3/4" />
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.section 
          ref={ctaRef}
          className="py-24 px-6 relative overflow-hidden"
        >
          {/* Enhanced background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600" />
          
          {/* Enhanced blurred lights */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/40 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/30 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.h2 
                variants={fadeUpVariant}
                className="text-3xl md:text-5xl text-white drop-shadow-lg"
              >
                Build with the community
              </motion.h2>

              <motion.p 
                variants={fadeUpVariant}
                className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
              >
                Submit a tool, suggest edits and keep the database sharp.
              </motion.p>

              <motion.div variants={fadeUpVariant}>
                <Button 
                  onClick={handleSubmitTool}
                  className="bg-white text-indigo-600 hover:bg-white/95 shadow-2xl hover:shadow-3xl transition-all duration-300 h-14 px-10 gap-3 rounded-xl text-lg font-medium"
                  size="lg"
                >
                  <Plus className="w-6 h-6" />
                  Submit your tool
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}