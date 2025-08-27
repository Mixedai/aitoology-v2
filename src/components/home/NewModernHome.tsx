
import { useRef, useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { HeroSection2 } from "./HeroSection2";
import { HeroSection3 } from "./HeroSection3";
import { useAuth } from '@/contexts/AuthContext';
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
  UserCircle
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

// REDESIGNED AI Journey Roadmap Component with Clear Communication
const AIJourneyRoadmap = ({ onNavigate }: { onNavigate?: (from: string, to: string, params?: any) => void }) => {
  const roadmapRef = useRef(null);
  const lineRef = useRef<SVGPathElement>(null);
  const isInView = useInView(roadmapRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start end", "end start"]
  });
  
  // State for current active quest based on scroll
  const [activeQuest, setActiveQuest] = useState(-1);
  
  // Immediate scroll mapping for 4 quests - Quest 4 appears earlier
  const questProgress = useTransform(scrollYProgress, 
    [0, 0.15, 0.3, 0.45, 0.6, 1], 
    [-1, 0, 1, 2, 3, 3]
  );
  
  useMotionValueEvent(questProgress, "change", (latest) => {
    const newQuest = Math.floor(latest);
    if (newQuest !== activeQuest) {
      setActiveQuest(newQuest);
    }
  });

  // GAMIFIED roadmap steps - Quest Stages
  const roadmapSteps = [
    {
      id: 1,
      icon: Search,
      title: "🔍 Discovery Quest",
      subtitle: "Journey Through the AI Universe",
      description: "Embark on an epic expedition across 500+ cutting-edge AI tools. Each discovery illuminates your path, earning precious knowledge points and revealing hidden tool categories in this vast digital frontier.",
      features: ["🏆 +250 XP Rewards", "🎯 Master 5 Categories", "⭐ Explorer Badge"],
      action: "Begin Journey",
      actionId: "explore-frame",
      questLevel: "Novice Explorer",
      questIcon: "🗺️",
      rewards: "250 XP • Discovery Badge • Category Mastery",
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
      iconBg: "from-blue-500 to-indigo-600",
      delay: 0,
      difficulty: "Beginner Friendly",
      unlocked: true
    },
    {
      id: 2,
      icon: GitCompare,
      title: "⚔️ Battle Arena",
      subtitle: "Tool Comparison Challenge",
      description: "Compare AI champions side-by-side! Master the art of analysis to choose your ultimate toolkit and earn comparison mastery.",
      features: ["🏆 +500 XP", "🎯 Analysis Skills", "⭐ Analyst Badge"],
      action: "Enter Arena",
      actionId: "explore-frame",
      actionParams: { mode: "compare" },
      questLevel: "Level 2",
      questIcon: "⚔️",
      rewards: "500 XP • Analyst Badge",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
      iconBg: "from-emerald-500 to-teal-600",
      delay: 0.2,
      difficulty: "★★☆☆☆",
      unlocked: true
    },
    {
      id: 3,
      icon: Zap,
      title: "📚 Academy Training",
      subtitle: "Master the Ancient Arts",
      description: "Level up your skills! Complete tutorials, unlock workflow combos, and learn secret techniques from AI masters.",
      features: ["🏆 +750 XP", "🎯 Skill Mastery", "⭐ Scholar Badge"],
      action: "Enter Academy",
      actionId: "tutorials-frame",
      questLevel: "Level 3",
      questIcon: "🎓",
      rewards: "750 XP • Scholar Badge",
      gradient: "from-purple-500 via-pink-600 to-rose-700",
      bgGradient: "from-purple-50 via-pink-50 to-rose-50",
      iconBg: "from-purple-500 to-pink-600",
      delay: 0.4,
      difficulty: "★★★☆☆",
      unlocked: true
    },
    {
      id: 4,
      icon: BarChart3,
      title: "💎 Treasury Management",
      subtitle: "Optimize Your Arsenal",
      description: "Final boss level! Master resource management, track your power stats, and become the ultimate AI tool strategist.",
      features: ["🏆 +1000 XP", "🎯 Strategy Master", "⭐ Legend Badge"],
      action: "Open Treasury",
      actionId: "wallet",
      questLevel: "Level 4",
      questIcon: "👑",
      rewards: "1000 XP • Legend Badge",
      gradient: "from-orange-500 via-red-600 to-pink-700",
      bgGradient: "from-orange-50 via-red-50 to-pink-50",
      iconBg: "from-orange-500 to-red-600",
      delay: 0.6,
      difficulty: "★★★★☆",
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
    <section className="min-h-screen py-32 px-6 relative overflow-hidden bg-black flex items-center">
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
          ref={roadmapRef}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full px-6 py-2 shadow-lg">
              <span className="text-lg">🎮</span>
              <span className="font-semibold text-sm">Level Up Your AI Journey</span>
              <span className="text-lg">⚡</span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Complete Your AI Quest
              </span>
            </h2>
            
            <p className="text-base text-gray-300 max-w-2xl mx-auto">
              Transform from beginner to power user in 4 epic stages
            </p>
          </motion.div>

          {/* REDESIGNED Roadmap Steps - Map Journey Layout */}
          <div className="relative">
            <div className="-space-y-40 relative">
            {roadmapSteps.map((step, index) => (
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
                  scale: activeQuest === index ? 1.05 : 1,
                  filter: activeQuest > index ? "brightness(1)" : activeQuest === index ? "brightness(1.1)" : "brightness(0.7)"
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
                      activeQuest > index 
                        ? 'bg-green-500 border-green-400' 
                        : activeQuest === index 
                        ? 'bg-orange-500 border-orange-400' 
                        : 'bg-gray-400 border-gray-300'
                    }`}
                  >
                    <span className="text-white font-bold text-lg drop-shadow">
                      {activeQuest > index ? '✓' : step.id}
                    </span>
                  </div>
                  
                  {/* Enhanced pin bottom with gradient */}
                  <div className="relative">
                    <div className={`w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[20px] mx-auto -mt-1 ${
                      activeQuest > index 
                        ? 'border-t-green-500' 
                        : activeQuest === index 
                        ? 'border-t-orange-500' 
                        : 'border-t-gray-400'
                    } drop-shadow-lg`} />
                    
                  </div>
                </div>
                
                {/* Neon Cable Connection */}
                {index < roadmapSteps.length - 1 && (
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
                          pathLength: activeQuest > index ? 1 : 0,
                          opacity: activeQuest > index ? 0.8 : 0.2
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Energy Pulse */}
                      {activeQuest === index + 1 && (
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
                {/* UFO Quest Card */}
                <div className="relative h-[420px]">
                  
                  {/* UFO Shadow/Glow Effect */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-24"
                    style={{
                      background: activeQuest >= index 
                        ? "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.4), transparent 70%)"
                        : "radial-gradient(ellipse at center, rgba(100, 116, 139, 0.2), transparent 70%)",
                      filter: "blur(20px)",
                      transform: "translateX(-50%) scaleX(1.5) scaleY(0.5)",
                    }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* UFO Body Container */}
                  <motion.div 
                    className="relative"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    
                    {/* Glass Dome Top */}
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 top-4 w-40 h-24 z-20"
                      style={{
                        background: activeQuest >= index
                          ? "linear-gradient(180deg, rgba(147, 51, 234, 0.5) 0%, rgba(168, 85, 247, 0.3) 100%)"
                          : "linear-gradient(180deg, rgba(100, 116, 139, 0.4) 0%, rgba(71, 85, 105, 0.2) 100%)",
                        borderRadius: "50% 50% 50% 50% / 100% 100% 20% 20%",
                        backdropFilter: "blur(10px)",
                        border: activeQuest >= index 
                          ? "2px solid rgba(168, 85, 247, 0.5)"
                          : "2px solid rgba(100, 116, 139, 0.3)",
                        boxShadow: "inset 0 10px 20px rgba(255, 255, 255, 0.2), 0 5px 15px rgba(147, 51, 234, 0.3)",
                      }}
                    >
                      {/* Quest Level Badge on Dome */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-2 py-0.5 text-xs shadow-lg">
                          {step.questLevel}
                        </Badge>
                      </div>
                      {/* Glass reflection */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-24 h-10 bg-white/20 rounded-full blur-md" />
                    </div>
                    
                    {/* Main Saucer Body */}
                    <div 
                      className="relative top-20 mx-auto w-64 h-40 z-10"
                      style={{
                        background: activeQuest > index
                          ? "linear-gradient(180deg, #86efac 0%, #4ade80 50%, #22c55e 100%)"
                          : activeQuest === index
                          ? "linear-gradient(180deg, #c084fc 0%, #a855f7 50%, #9333ea 100%)"
                          : "linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)",
                        borderRadius: "50% / 35%",
                        boxShadow: activeQuest >= index
                          ? "0 20px 40px rgba(147, 51, 234, 0.4), inset 0 -5px 10px rgba(0, 0, 0, 0.2)"
                          : "0 15px 30px rgba(0, 0, 0, 0.3), inset 0 -5px 10px rgba(0, 0, 0, 0.2)",
                        border: activeQuest >= index
                          ? "2px solid rgba(168, 85, 247, 0.4)"
                          : "2px solid rgba(100, 116, 139, 0.3)",
                      }}
                    >
                      {/* Metallic band */}
                      <div 
                        className="absolute top-1/2 left-0 right-0 h-5 transform -translate-y-1/2"
                        style={{
                          background: activeQuest >= index
                            ? "linear-gradient(90deg, #9333ea 0%, #ec4899 50%, #9333ea 100%)"
                            : "linear-gradient(90deg, #475569 0%, #64748b 50%, #475569 100%)",
                          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                      
                      {/* Status Lights */}
                      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-around px-8">
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${
                            activeQuest > index ? 'bg-green-400' : 
                            activeQuest === index ? 'bg-yellow-400' : 
                            'bg-gray-400'
                          }`}
                          style={{ 
                            boxShadow: activeQuest >= index 
                              ? `0 0 15px ${activeQuest > index ? 'rgba(74, 222, 128, 0.8)' : 'rgba(250, 204, 21, 0.8)'}` 
                              : 'none' 
                          }}
                          animate={activeQuest === index ? { opacity: [1, 0.3, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${
                            activeQuest > index ? 'bg-green-400' : 
                            activeQuest === index ? 'bg-purple-400' : 
                            'bg-gray-400'
                          }`}
                          style={{ 
                            boxShadow: activeQuest >= index 
                              ? `0 0 15px ${activeQuest > index ? 'rgba(74, 222, 128, 0.8)' : 'rgba(168, 85, 247, 0.8)'}` 
                              : 'none' 
                          }}
                          animate={activeQuest === index ? { opacity: [1, 0.3, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${
                            activeQuest > index ? 'bg-green-400' : 
                            activeQuest === index ? 'bg-blue-400' : 
                            'bg-gray-400'
                          }`}
                          style={{ 
                            boxShadow: activeQuest >= index 
                              ? `0 0 15px ${activeQuest > index ? 'rgba(74, 222, 128, 0.8)' : 'rgba(96, 165, 250, 0.8)'}` 
                              : 'none' 
                          }}
                          animate={activeQuest === index ? { opacity: [1, 0.3, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                        />
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${
                            activeQuest > index ? 'bg-green-400' : 
                            activeQuest === index ? 'bg-pink-400' : 
                            'bg-gray-400'
                          }`}
                          style={{ 
                            boxShadow: activeQuest >= index 
                              ? `0 0 15px ${activeQuest > index ? 'rgba(74, 222, 128, 0.8)' : 'rgba(236, 72, 153, 0.8)'}` 
                              : 'none' 
                          }}
                          animate={activeQuest === index ? { opacity: [1, 0.3, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
                        />
                      </div>
                    </div>
                    
                    {/* Engine Glow */}
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 top-32 w-56 h-24 z-5"
                      style={{
                        background: activeQuest >= index
                          ? "linear-gradient(180deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.1) 100%)"
                          : "linear-gradient(180deg, rgba(100, 116, 139, 0.2) 0%, rgba(71, 85, 105, 0.1) 100%)",
                        borderRadius: "50% / 50%",
                        filter: "blur(12px)",
                      }}
                    />
                    
                    {/* Content Container */}
                    <div className="relative top-40 px-4 text-center z-30">
                      {/* Dark Background Box for Content */}
                      <div className="absolute inset-0 -top-4 -bottom-4 bg-black/80 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl" />
                      
                      {/* Content Wrapper */}
                      <div className="relative z-10 py-4">
                      {/* Icon */}
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br ${step.iconBg} rounded-full flex items-center justify-center shadow-xl mx-auto mb-2`}
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <step.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-extrabold text-white mb-2 drop-shadow-lg">{step.title}</h3>
                      <p className="text-sm font-bold text-white mb-3">{step.subtitle}</p>
                      
                      {/* Description */}
                      <p className="text-sm text-white leading-relaxed mb-4 line-clamp-3 font-bold px-2">
                        {step.description}
                      </p>
                      
                      {/* Rewards */}
                      <div className="flex flex-col items-center justify-center gap-2 mb-4">
                        {step.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-sm bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white px-3 py-1 rounded-lg border border-purple-400/40 font-semibold backdrop-blur-sm shadow-md">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <Button
                        onClick={() => handleStepAction(step.actionId, step.actionParams)}
                        className={`bg-gradient-to-r ${step.gradient} hover:shadow-xl hover:scale-105 transition-all duration-200 text-white border-0 px-6 py-2.5 rounded-xl gap-2 text-sm font-bold shadow-lg`}
                        disabled={activeQuest < index}
                      >
                        <span>{step.action}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      </div>
                    </div>
                    
                    {/* Hover Beam Effect */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-48 opacity-0 group-hover:opacity-60 pointer-events-none"
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileHover={{ scaleY: 1, opacity: 0.6 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div
                        style={{
                          background: activeQuest >= index
                            ? "linear-gradient(180deg, rgba(168, 85, 247, 0.4) 0%, transparent 100%)"
                            : "linear-gradient(180deg, rgba(100, 116, 139, 0.3) 0%, transparent 100%)",
                          clipPath: "polygon(35% 0%, 65% 0%, 85% 100%, 15% 100%)",
                          filter: "blur(15px)",
                          height: "100%",
                          width: "100%",
                        }}
                      />
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
        <AIJourneyRoadmap onNavigate={onNavigate} />

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