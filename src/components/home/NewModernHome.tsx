
import { useRef, useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { HeroSection2 } from "./HeroSection2";
import { HeroSection3 } from "./HeroSection3";
import { CompactGettingStarted } from "./CompactGettingStarted";
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from '../navigation/UserMenu';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Search, 
  BarChart3, 
  Zap,
  ArrowRight,
  Sparkles,
  Plus,
  Cpu,
  Network,
  Boxes,
  CircuitBoard,
  Brain,
  Bot,
  MessageCircle,
  Palette,
  FileText,
  Code,
  Star,
  TrendingUp,
  Users,
  Crown,
  Target,
  GitCompare,
  TestTube,
  FolderOpen,
  ChevronRight,
  CheckCircle,
  User,
  Settings,
  LogOut,
  UserCircle,
  Bookmark
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValueEvent } from "framer-motion";

interface NewModernHomeProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
}

// Enhanced Parallax Eye Component with micro-interactions
const ParallaxEye = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(24, Math.sqrt(Math.pow(e.clientX - eyeX, 2) + Math.pow(e.clientY - eyeY, 2)) / 6);
        
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
      className={`relative w-48 h-48 bg-white rounded-full shadow-2xl border-4 border-primary/20 ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.1,
        borderColor: "rgba(255, 107, 53, 0.4)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Outer ring animation on hover */}
      <motion.div
        className="absolute -inset-2 border-2 border-primary/30 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}
      >
        <motion.div 
          className="absolute top-3 left-3 w-6 h-6 bg-white rounded-full"
          animate={{
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Compact Feature Card
const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="relative p-4 h-full bg-white/90 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl group">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow flex-shrink-0">
            <feature.icon className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// App Guide Component - How to Use AIToologist
const AppGuide = ({ onNavigate }: { onNavigate?: (from: string, to: string, params?: any) => void }) => {
  const guideRef = useRef(null);
  const lineRef = useRef<SVGPathElement>(null);
  const isInView = useInView(guideRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: guideRef,
    offset: ["start end", "end start"]
  });
  
  // State for current active step based on scroll
  const [activeStep, setActiveStep] = useState(0);
  
  // Immediate scroll mapping for 4 steps
  const stepProgress = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.45, 0.6, 1], 
    [0, 1, 2, 3, 4, 4]
  );
  
  useMotionValueEvent(stepProgress, "change", (latest) => {
    const newStep = Math.floor(latest);
    if (newStep !== activeStep) {
      setActiveStep(newStep);
    }
  });

  // App Guide Steps - How to Use AIToologist
  const guideSteps = [
    {
      id: 1,
      icon: Search,
      title: "Discover",
      subtitle: "Explore 500+ AI Tools",
      description: "Browse hundreds of AI tools organized by categories. ChatGPT, Midjourney, Claude, and more - all in one platform.",
      features: ["20+ Categories", "Detailed Reviews", "Use Cases"],
      action: "Explore Tools",
      actionId: "explore-frame",
      stepNumber: "Step 1",
      highlight: "500+ AI Tools",
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      iconBg: "from-blue-500 to-indigo-600",
      animatedIcon: "🔍",
      glow: "shadow-blue-500/50",
      delay: 0,
      unlocked: true
    },
    {
      id: 2,
      icon: GitCompare,
      title: "Compare",
      subtitle: "Find Your Perfect Match",
      description: "Compare AI tools side-by-side to find the perfect fit. Analyze pricing, features, and capabilities at a glance.",
      features: ["Side-by-Side", "Price Analysis", "Feature Matrix"],
      action: "Compare Now",
      actionId: "explore-frame",
      actionParams: { mode: "compare" },
      stepNumber: "Step 2",
      highlight: "Smart Comparison",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
      iconBg: "from-emerald-500 to-teal-600",
      animatedIcon: "⚡",
      glow: "shadow-emerald-500/50",
      delay: 0.2,
      unlocked: true
    },
    {
      id: 3,
      icon: Bookmark,
      title: "Save",
      subtitle: "Build Your AI Wallet",
      description: "Save your favorite AI tools and create your personalized AI wallet. All your tools in one secure place.",
      features: ["Personal Wallet", "Collections", "Quick Access"],
      action: "My Wallet",
      actionId: "wallet",
      stepNumber: "Step 3",
      highlight: "AI Wallet",
      gradient: "from-purple-500 via-pink-600 to-rose-700",
      bgGradient: "from-purple-50 via-pink-50 to-rose-50",
      iconBg: "from-purple-500 to-pink-600",
      animatedIcon: "💎",
      glow: "shadow-purple-500/50",
      delay: 0.4,
      unlocked: true
    },
    {
      id: 4,
      icon: BarChart3,
      title: "Track",
      subtitle: "Optimize Your Workflow",
      description: "Monitor your AI tool usage with detailed analytics. Track costs, measure efficiency, and optimize your workflow.",
      features: ["Usage Analytics", "Cost Tracking", "Performance"],
      action: "View Stats",
      actionId: "stats",
      stepNumber: "Step 4",
      highlight: "Smart Analytics",
      gradient: "from-orange-500 via-red-600 to-pink-700",
      bgGradient: "from-orange-50 via-red-50 to-pink-50",
      iconBg: "from-orange-500 to-red-600",
      animatedIcon: "📊",
      glow: "shadow-orange-500/50",
      delay: 0.6,
      unlocked: true
    }
  ];

  // Animated SVG path for connecting line
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const handleStepAction = (actionId: string, params?: any) => {
    if (onNavigate) {
      onNavigate('modern-home', actionId, params);
    }
  };

  return (
    <>
    {/* Compact Getting Started Guide Component */}
    <CompactGettingStarted onNavigate={onNavigate} />
    
    {/* Original Getting Started Section (Hidden for now) */}
    <section className="min-h-screen py-32 px-6 relative overflow-hidden bg-black flex items-center" style={{ display: 'none' }}>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950"></div>
      
      {/* Enhanced Map-like Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Topographic map lines for dark theme */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="topographic" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1" />
              <circle cx="100" cy="100" r="100" fill="none" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topographic)" />
        </svg>
        
        {/* Dark theme gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Dotted grid pattern for dark map texture */}
        <div 
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Cyber grid effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Nebula effect */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]" />
        </div>
        
        {/* Animated stars for space effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 w-full">
        <motion.div
          ref={guideRef}
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Compact Hero Header */}
          <motion.div 
            className="text-center mb-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Badge with premium animation */}
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-8 py-3 shadow-2xl backdrop-blur-xl border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-xl animate-pulse">✨</span>
              <span className="font-bold text-sm uppercase tracking-wider">Getting Started Guide</span>
              <span className="text-xl animate-bounce">🚀</span>
            </motion.div>
            
            {/* Enhanced Title */}
            <h2 className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                How It Works
              </span>
            </h2>
            
            <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
              Master AI tools in 4 simple steps - Discover, Compare, Save & Track
            </p>
          </motion.div>

          {/* REDESIGNED Roadmap Steps - Map Journey Layout */}
          <div className="relative">
            <div className="-space-y-40 relative">
            {guideSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`relative flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{ marginTop: index === 3 ? '-64px' : '0' }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ 
                  opacity: 1,
                  x: 0
                }}
                animate={{ 
                  scale: activeStep === index + 1 ? 1.05 : 1,
                  filter: activeStep > index + 1 ? "brightness(1)" : activeStep === index + 1 ? "brightness(1.1)" : "brightness(0.7)"
                }}
                transition={{ 
                  duration: 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {/* Map Pin Marker */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 z-20"
                >
                  
                  {/* Pin circle with icon */}
                  <div 
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 ${
                      activeStep > index + 1
                        ? 'bg-green-500 border-green-400' 
                        : activeStep === index + 1
                        ? 'bg-orange-500 border-orange-400' 
                        : 'bg-gray-400 border-gray-300'
                    }`}
                  >
                    <span className="text-white font-bold text-lg drop-shadow">
                      {activeStep > index + 1 ? '✓' : step.id}
                    </span>
                  </div>
                  
                  {/* Enhanced pin bottom with gradient */}
                  <div className="relative">
                    <div className={`w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[20px] mx-auto -mt-1 ${
                      activeStep > index + 1
                        ? 'border-t-green-500' 
                        : activeStep === index + 1
                        ? 'border-t-orange-500' 
                        : 'border-t-gray-400'
                    } drop-shadow-lg`} />
                    
                  </div>
                </div>
                
                {/* Neon Cable Connection */}
                {index < guideSteps.length - 1 && (
                  <div className="absolute pointer-events-none" style={{
                    left: index % 2 === 0 ? '284px' : 'auto',
                    right: index % 2 === 1 ? '284px' : 'auto',
                    top: '24px',
                    width: 'calc(100% - 568px)',
                    height: '176px',
                    zIndex: 1
                  }}>
                    <svg className="w-full h-full" viewBox="0 0 600 176" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`neonGradient${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                        </linearGradient>
                        <filter id="neonGlow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Neon Cable */}
                      <motion.path
                        d={index % 2 === 0 
                          ? `M 0 0 Q 300 88 600 176` 
                          : `M 600 0 Q 300 88 0 176`
                        }
                        stroke={`url(#neonGradient${index})`}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#neonGlow)"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: activeStep > index + 1 ? 1 : 0,
                          opacity: activeStep > index + 1 ? 0.8 : 0.2
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Energy Pulse */}
                      {activeStep === index + 2 && (
                        <motion.circle
                          r="4"
                          fill="#fbbf24"
                          filter="url(#neonGlow)"
                          initial={{ offsetdistance: "0%" }}
                          animate={{ offsetdistance: "100%" }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{
                            offsetPath: `path('${index % 2 === 0 
                              ? "M 0 0 Q 300 88 600 176"
                              : "M 600 0 Q 300 88 0 176"}')`
                          }}
                        />
                      )}
                    </svg>
                  </div>
                )}
                
                <div 
                  className={`w-64 ${
                    index % 2 === 0 ? 'mr-auto ml-20' : 'ml-auto mr-20'
                  }`}
                >
                {/* Enhanced Premium Card */}
                <div className="relative">
                  <motion.div
                    className={`relative bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-2xl rounded-3xl border-2 p-6 transition-all duration-500 ${
                      activeStep === index + 1 
                        ? 'border-purple-500/60 shadow-2xl shadow-purple-500/30' 
                        : 'border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl'
                    }`}
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {/* Animated background glow */}
                    <motion.div 
                      className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-20 blur-xl`}
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Step Badge */}
                    <div className="absolute -top-3 right-6">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {step.stepNumber}
                      </motion.div>
                    </div>
                    
                    {/* Status Indicator with pulse */}
                    <div className="absolute top-4 left-4">
                      <div className="relative">
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${
                            activeStep > index + 1 ? 'bg-green-400' : 
                            activeStep === index + 1 ? 'bg-yellow-400' : 
                            'bg-gray-400'
                          }`}
                          animate={activeStep === index + 1 ? { 
                            scale: [1, 1.5, 1],
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        {activeStep === index + 1 && (
                          <div className="absolute inset-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                        )}
                      </div>
                    </div>
                    
                    {/* Enhanced Icon with animation */}
                    <div className="flex justify-center mb-5">
                      <motion.div 
                        className={`relative w-20 h-20 bg-gradient-to-br ${step.iconBg} rounded-2xl flex items-center justify-center shadow-2xl`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-3xl drop-shadow-lg">{step.animatedIcon}</span>
                        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Title */}
                    <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3 text-center font-medium">{step.subtitle}</p>
                    
                    {/* Premium Highlight Badge */}
                    <div className="flex justify-center mb-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-purple-300 font-bold uppercase tracking-wider">{step.highlight}</span>
                      </div>
                    </div>
                    
                    {/* Description with better readability */}
                    <p className="text-sm text-gray-200 mb-5 text-center leading-relaxed px-2">
                      {step.description}
                    </p>
                    
                    {/* Enhanced Features Section */}
                    <div className="bg-gradient-to-b from-black/40 to-black/60 rounded-2xl p-3 mb-5 backdrop-blur-xl border border-white/10">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {step.features.map((feature, idx) => (
                          <motion.span 
                            key={idx} 
                            className="text-xs bg-gradient-to-r from-white/10 to-white/5 text-gray-200 px-3 py-1.5 rounded-full border border-white/20 font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            ✓ {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Enhanced Action Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handleStepAction(step.actionId, step.actionParams)}
                        className={`relative w-full bg-gradient-to-r ${step.gradient} hover:shadow-2xl transition-all duration-300 text-white border-0 rounded-2xl font-bold py-3 text-sm uppercase tracking-wider overflow-hidden group`}
                        disabled={false}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {step.action}
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

// Compact Square Trending Card
const TrendingCard = ({ tool, index, onNavigate }: { tool: any; index: number; onNavigate?: (from: string, to: string, params?: any) => void }) => {
  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('modern-home', 'tool-detail', { tool_id: tool.id, tool: tool });
    }
  };

  return (
    <motion.div 
      className="flex-shrink-0 w-72 h-80"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card 
        className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-lg border border-purple-500/30 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] hover:border-purple-400/50 transition-all duration-300 rounded-2xl group cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View details for ${tool.name}`}
      >
        {/* Animated Gradient Overlay */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-70 group-hover:opacity-90 transition-opacity duration-300`}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ backgroundSize: "200% 200%" }}
        />
        
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
        
        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Rank Badge */}
          <motion.div 
            className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-white font-bold text-lg">#{index + 1}</span>
          </motion.div>
          
          {/* Top section */}
          <div>
            {/* Icon Container */}
            <motion.div 
              className="w-16 h-16 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <tool.icon className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Name and Category */}
            <h3 className="text-white font-bold text-xl mb-1 line-clamp-1">
              {tool.name}
            </h3>
            <p className="text-white/70 text-sm font-medium mb-2">
              {tool.category}
            </p>
            
            {/* Description */}
            <p className="text-white/60 text-sm line-clamp-2">
              {tool.description || "Transform your workflow with cutting-edge AI technology"}
            </p>
          </div>
          
          {/* Bottom section */}
          <div>
            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} 
                  />
                ))}
                <span className="text-sm text-white/90 ml-1 font-semibold">{tool.rating}</span>
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1 text-xs font-semibold">
                {tool.users || "10K+"} users
              </Badge>
            </div>
            
            {/* Action Button */}
            <motion.button 
              className="w-full py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-white font-semibold text-sm hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Tool
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export function NewModernHome({ onNavigate }: NewModernHomeProps) {
  const { scrollYProgress } = useScroll();
  const { user, signOut } = useAuth();
  
  // Enhanced parallax transforms with smooth spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "70%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "120%"]), springConfig);
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  
  // Section-specific parallax
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  // Enhanced gradient sweep for CTA
  const ctaGradientX = useTransform(scrollYProgress, [0.7, 1], ["-100%", "100%"]);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const roadmapRef = useRef(null);
  const featuresRef = useRef(null);
  const trendingRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Enhanced in-view detection with margins for smoother animations
  const heroInView = useInView(heroRef, { once: true, margin: "-20%" });
  const roadmapInView = useInView(roadmapRef, { once: true, margin: "-15%" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-15%" });
  const trendingInView = useInView(trendingRef, { once: true, margin: "-10%" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-20%" });

  // Animation variants with enhanced easing
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth motion
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // Enhanced text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find tools instantly by task, price, or rating with our AI-powered search engine."
    },
    {
      icon: BarChart3,
      title: "Deep Compare",
      description: "Compare features, pricing, and performance across multiple tools with detailed analysis."
    },
    {
      icon: Zap,
      title: "Ready Workflows",
      description: "Access pre-built workflows and step-by-step tutorials for maximum productivity."
    }
  ];

  // REAL TRENDING TOOLS DATA with actual content
  const trendingTools = [
    {
      id: 'chatgpt-4',
      name: 'ChatGPT-4',
      category: 'Conversational AI',
      description: 'Advanced AI chatbot for conversations, writing, coding, and creative tasks with superior reasoning.',
      gradient: 'from-emerald-400 to-cyan-500',
      icon: MessageCircle,
      rating: '4.8',
      users: '100M+',
      pricing: 'Free/Pro',
      isPremium: true
    },
    {
      id: 'midjourney-v6',
      name: 'Midjourney V6',
      category: 'Image Generation',
      description: 'Create stunning, photorealistic images and artwork from text prompts with the latest AI technology.',
      gradient: 'from-purple-400 to-pink-500',
      icon: Palette,
      rating: '4.9',
      users: '15M+',
      pricing: '$10/mo',
      isPremium: true
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'Code Assistant',
      description: 'AI pair programmer that helps you write code faster with intelligent suggestions and completions.',
      gradient: 'from-slate-400 to-slate-600',
      icon: Code,
      rating: '4.7',
      users: '5M+',
      pricing: '$10/mo',
      isPremium: false
    },
    {
      id: 'notion-ai',
      name: 'Notion AI',
      category: 'Productivity',
      description: 'AI-powered writing assistant integrated into Notion for brainstorming and content creation.',
      gradient: 'from-gray-400 to-gray-600',
      icon: FileText,
      rating: '4.6',
      users: '30M+',
      pricing: '$8/mo',
      isPremium: false
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      category: 'AI Assistant',
      description: 'Helpful, harmless, and honest AI assistant by Anthropic for complex reasoning and analysis.',
      gradient: 'from-orange-400 to-red-500',
      icon: Brain,
      rating: '4.8',
      users: '8M+',
      pricing: 'Free/Pro',
      isPremium: true
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      category: 'Search & Research',
      description: 'AI-powered answer engine that provides accurate information with cited sources.',
      gradient: 'from-blue-400 to-indigo-500',
      icon: Search,
      rating: '4.5',
      users: '12M+',
      pricing: 'Free/Pro',
      isPremium: false
    }
  ];

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
      {/* Enhanced Navbar with Glassmorphism */}
      <header className="fixed top-0 w-full bg-transparent z-50 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-12">
            {/* Brand with Enhanced Animation */}
            <button 
              onClick={() => onNavigate?.('modern-home', 'modern-home')}
              className="flex items-center gap-4 group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:rotate-12">
                  <span className="text-3xl drop-shadow-lg">🚀</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  AI Toologist
                </span>
                <span className="text-xs text-gray-600 font-medium">Discover AI Tools</span>
              </div>
            </button>
            
            {/* Navigation Links with Enhanced Design */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate?.('modern-home', 'modern-home')}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md text-white shadow-2xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg animate-pulse" />
                <span className="relative flex items-center gap-2 drop-shadow-sm">
                  🏠 Home
                </span>
              </button>

              <button
                onClick={() => onNavigate?.('modern-home', 'explore-frame')}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50`}
              >
                <span className="relative flex items-center gap-2 drop-shadow-sm">
                  🤖 AI Tools
                  <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full animate-bounce">
                    New
                  </span>
                </span>
              </button>

              <button
                onClick={() => onNavigate?.('modern-home', 'tutorials-frame')}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50`}
              >
                <span className="relative flex items-center gap-2 drop-shadow-sm">
                  📚 Learning
                </span>
              </button>

              <button
                onClick={() => onNavigate?.('modern-home', 'news')}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50`}
              >
                <span className="relative flex items-center gap-2 drop-shadow-sm">
                  📰 News
                </span>
              </button>

              <button
                onClick={() => onNavigate?.('modern-home', 'wallet')}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50`}
              >
                <span className="relative flex items-center gap-2 drop-shadow-sm">
                  💳 Wallet
                </span>
              </button>
            </div>
            
            {/* Auth Buttons with Glassmorphism */}
            <div className="flex items-center gap-4">
              <UserMenu onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed navbar */}
      <div className="h-20" />
      
      {/* ENHANCED PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Static Base Gradient */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, 
              #fef7ed 0%, 
              #fef2f2 25%, 
              #eff6ff 75%, 
              #eef2ff 100%
            )
          `
        }}
      />

      {/* Layer 2: Static Grid */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 3: Static Gradient Orbs */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -left-40 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)"
          }}
        />
        <div className="absolute -right-32 top-1/3 w-80 h-80 rounded-full blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 100%)"
          }}
        />
        <div className="absolute left-1/4 bottom-1/4 w-72 h-72 rounded-full blur-2xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)"
          }}
        />
      </div>


      {/* Main Content with Enhanced Transitions */}
      <div className="relative z-10">
        {/* HERO SECTION - Enhanced with Exit Animation */}
        <motion.div
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <section className="min-h-screen flex items-center justify-center px-6 py-24">
            <div className="container mx-auto max-w-5xl text-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="space-y-16"
              >
                {/* Enhanced Eyes with Micro-interactions */}
                <motion.div 
                  variants={textReveal}
                  className="flex justify-center gap-12 mb-20"
                >
                  <ParallaxEye delay={0} />
                  <ParallaxEye delay={0.3} />
                </motion.div>

                {/* Hero Title with Simple Glow Effect */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Static Title with Visible Text */}
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight max-w-5xl mx-auto text-center">
                      {/* First Line */}
                      <span className="block mb-2">
                        <span className="hero-glow inline-block px-2 text-purple-600">
                          Discover the Perfect
                        </span>
                      </span>
                      
                      {/* Second Line */}
                      <span className="block">
                        <span className="hero-glow inline-block px-2 text-orange-500 font-black">
                          AI Tool
                        </span>
                        <span className="hero-glow inline-block px-2 ml-3 text-gray-800">
                          for Every Task
                        </span>
                      </span>
                    </h1>
                  </div>

                  {/* Static Subtitle */}
                  <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-center">
                    <span className="hero-glow inline-block px-2 text-gray-600">
                      Compare, review, and find the best AI tools
                    </span>
                    <span className="hero-glow inline-block px-2 ml-2 font-bold text-purple-600">
                      to supercharge your workflow
                    </span>
                    <span className="inline-block ml-2">🚀</span>
                  </p>
                </motion.div>

                {/* Simple CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <motion.div
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleBrowseTools}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 h-14 px-10 gap-3 rounded-xl relative overflow-hidden group"
                      size="lg"
                    >
                      {/* Simple shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <Sparkles className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Browse All Tools</span>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleSubmitTool}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-foreground shadow-xl hover:shadow-2xl transition-all duration-300 h-14 px-10 gap-3 rounded-xl backdrop-blur-sm"
                      size="lg"
                    >
                      <Plus className="w-5 h-5" />
                      Submit Tool
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </motion.div>

        {/* ENHANCED AI JOURNEY ROADMAP SECTION - 2ND SECTION */}
        <AppGuide onNavigate={onNavigate} />

        {/* HERO SECTION 2 - UFO Cards */}
        <HeroSection3 />


        {/* TRENDING TOOLS SECTION - Enhanced with Real Content */}
        <motion.div
          ref={trendingRef}
          className="py-32 px-6 relative bg-black overflow-hidden"
        >
          {/* Animated Gradient Mesh Background */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-pink-950 opacity-50" />
            
            {/* Animated orbs */}
            <motion.div
              className="absolute top-0 left-0 w-[600px] h-[600px]"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-full h-full bg-gradient-radial from-purple-600/30 via-purple-600/10 to-transparent rounded-full blur-3xl" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-0 right-0 w-[800px] h-[800px]"
              animate={{
                x: [0, -150, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-full h-full bg-gradient-radial from-pink-600/30 via-pink-600/10 to-transparent rounded-full blur-3xl" />
            </motion.div>
            
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-full h-full bg-gradient-conic from-purple-600/20 via-pink-600/20 via-orange-600/20 to-purple-600/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
          
          {/* Animated Stars/Particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
          
          {/* Holographic Grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'center center',
            }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70" />
          
          <section className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={trendingInView ? "visible" : "hidden"}
              className="space-y-20"
            >
              {/* Enhanced Section Header */}
              <motion.div 
                variants={textReveal} 
                className="text-center space-y-6"
              >
                <motion.div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border border-purple-500/30 rounded-full px-8 py-4 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.3)",
                      "0 0 40px rgba(236, 72, 153, 0.3)",
                      "0 0 20px rgba(168, 85, 247, 0.3)"
                    ]
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </motion.div>
                  <span className="text-purple-300 font-bold text-sm uppercase tracking-wider">🔥 Trending Now</span>
                </motion.div>
                
                <motion.h2 
                  className="text-6xl md:text-8xl font-black max-w-5xl mx-auto leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={trendingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 inline-block">
                    <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Most Popular</span>
                    {" "}
                    <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text drop-shadow-[0_4px_8px_rgba(168,85,247,0.5)]">
                      AI Tools
                    </span>
                    {" "}
                    <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                      This Month
                    </span>
                  </div>
                </motion.h2>
                
                <motion.p 
                  className="text-xl max-w-3xl mx-auto leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={trendingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="text-white font-semibold">
                    Discover the top-rated AI tools trusted by
                  </span>
                  {" "}
                  <span className="text-white font-extrabold bg-purple-600/30 px-2 py-1 rounded">
                    millions of professionals
                  </span>
                  {" "}
                  <span className="text-white font-semibold">
                    worldwide.
                  </span>
                </motion.p>
              </motion.div>

              {/* Horizontal Slider for Trending Tools */}
              <div className="relative">
                <div className="overflow-x-auto" style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitScrollbar: { display: 'none' }
                }}>
                  <div className="flex gap-6 pb-6 px-4">
                    {trendingTools.map((tool, index) => (
                      <TrendingCard key={tool.id} tool={tool} index={index} onNavigate={onNavigate} />
                    ))}
                  </div>
                </div>
                
                {/* Scroll indicators */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
                  <button className="w-12 h-12 bg-gradient-to-r from-purple-600/80 to-pink-600/80 shadow-xl rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all backdrop-blur-sm border border-purple-500/30">
                    <ChevronRight className="w-6 h-6 rotate-180 text-white" />
                  </button>
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <button className="w-12 h-12 bg-gradient-to-r from-purple-600/80 to-pink-600/80 shadow-xl rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all backdrop-blur-sm border border-purple-500/30">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Enhanced View All CTA */}
              <motion.div 
                variants={textReveal}
                className="text-center pt-12"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleBrowseTools}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 px-12 py-6 rounded-xl gap-3 relative overflow-hidden group border-0 shadow-xl hover:shadow-2xl"
                    size="lg"
                  >
                    <span className="relative z-10 font-bold">Explore All {trendingTools.length}+ Tools</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                    
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        </motion.div>

        {/* ENHANCED CTA SECTION - Community & Submit */}
        <motion.div
          ref={ctaRef}
          className="py-32 px-6 relative"
        >
          <section className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="relative p-16 bg-gradient-to-br from-primary/5 via-white/90 to-secondary/5 backdrop-blur-xl border-white/60 shadow-2xl rounded-3xl overflow-hidden">
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"
                  style={{ x: ctaGradientX }}
                />
                
                <div className="relative text-center space-y-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <h2 className="mb-6">
                      Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                      Join thousands of professionals who have already discovered their perfect AI toolkit. Start your journey today.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={handleBrowseTools}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 px-12 py-6 rounded-xl gap-3 relative overflow-hidden group"
                        size="lg"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <Search className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Start Exploring</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={handleSubmitTool}
                        variant="outline"
                        className="bg-white/50 hover:bg-white/80 border-white/40 hover:border-primary/30 transition-all duration-300 px-12 py-6 rounded-xl gap-3"
                        size="lg"
                      >
                        <Plus className="w-5 h-5" />
                        Submit Your Tool
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}