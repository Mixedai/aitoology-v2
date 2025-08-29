import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Wallet, 
  BarChart3, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Globe,
  Cpu,
  MousePointer,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  Activity,
  TrendingUp,
  Shield,
  Rocket,
  Brain,
  Target,
  Award,
  Users,
  Clock,
  DollarSign,
  Filter,
  Layers,
  GitCompare,
  Eye,
  Heart,
  Bookmark
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  features: { icon: any; text: string }[];
  stats: { label: string; value: string; icon: any }[];
  benefits: string[];
  videoUrl?: string;
  demoUrl?: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Discover",
    subtitle: "Explore 500+ AI Tools",
    description: "Navigate through our comprehensive AI tool ecosystem. Find the perfect solution for your needs with smart search and intelligent recommendations.",
    icon: Search,
    color: "from-blue-600 to-cyan-600",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    features: [
      { icon: Globe, text: "Global AI Marketplace" },
      { icon: Filter, text: "Smart Filtering System" },
      { icon: Brain, text: "AI-Powered Suggestions" }
    ],
    stats: [
      { label: "Tools Available", value: "500+", icon: Layers },
      { label: "Categories", value: "20+", icon: Target },
      { label: "Daily Updates", value: "50+", icon: Activity }
    ],
    benefits: [
      "Discover trending AI tools before everyone else",
      "Get personalized recommendations based on your needs",
      "Access exclusive early-bird deals and offers"
    ]
  },
  {
    id: 2,
    title: "Compare",
    subtitle: "Smart Comparison Engine",
    description: "Our advanced comparison matrix lets you evaluate multiple tools simultaneously. Make data-driven decisions with confidence.",
    icon: GitCompare,
    color: "from-purple-600 to-pink-600",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    features: [
      { icon: BarChart3, text: "Feature Matrix" },
      { icon: DollarSign, text: "Price Calculator" },
      { icon: Star, text: "Rating Analysis" }
    ],
    stats: [
      { label: "Comparison Points", value: "100+", icon: CheckCircle2 },
      { label: "User Reviews", value: "10K+", icon: Users },
      { label: "Accuracy Rate", value: "99%", icon: Award }
    ],
    benefits: [
      "Save hours of research time",
      "Avoid costly mistakes with wrong tool selection",
      "Get unbiased, data-driven comparisons"
    ]
  },
  {
    id: 3,
    title: "Save",
    subtitle: "Your AI Toolkit",
    description: "Build your personalized AI arsenal. Organize, categorize, and access your favorite tools instantly from one central hub.",
    icon: Wallet,
    color: "from-emerald-600 to-teal-600",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    features: [
      { icon: Bookmark, text: "Smart Collections" },
      { icon: Shield, text: "Secure Vault" },
      { icon: Heart, text: "Favorites System" }
    ],
    stats: [
      { label: "Sync Speed", value: "Instant", icon: Zap },
      { label: "Storage", value: "Unlimited", icon: Layers },
      { label: "Security", value: "256-bit", icon: Shield }
    ],
    benefits: [
      "Never lose track of useful AI tools again",
      "Share collections with your team",
      "Get alerts for tool updates and new features"
    ]
  },
  {
    id: 4,
    title: "Track",
    subtitle: "Performance Analytics",
    description: "Monitor your AI tool usage with advanced analytics. Optimize costs, measure ROI, and maximize productivity.",
    icon: TrendingUp,
    color: "from-orange-600 to-red-600",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    features: [
      { icon: Activity, text: "Real-time Monitoring" },
      { icon: Clock, text: "Usage Tracking" },
      { icon: DollarSign, text: "Cost Analysis" }
    ],
    stats: [
      { label: "Cost Savings", value: "40%", icon: DollarSign },
      { label: "Efficiency Gain", value: "3x", icon: Rocket },
      { label: "Insights", value: "Real-time", icon: Eye }
    ],
    benefits: [
      "Reduce AI tool spending by up to 40%",
      "Identify underutilized subscriptions",
      "Generate professional reports for stakeholders"
    ]
  }
];

export function UltimateGettingStarted({ onNavigate }: { onNavigate?: (from: string, to: string) => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // Auto-play steps
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleNavigation = (url: string) => {
    if (onNavigate) {
      onNavigate('getting-started', url.replace('/', ''));
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* HERO SECTION - VIBRANT ANIMATED BACKGROUND */}
      <div className="absolute inset-0">
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        
        {/* Large animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-400/40 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-400/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-2xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-blue-400/30 to-transparent rounded-full blur-2xl animate-blob animation-delay-4000" />
        </div>
        
        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }}
        />
      </div>
      
      {/* Original animated background - now as overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: backgroundOpacity * 0.5 }}
      >
        
        {/* Mesh Pattern Overlay */}
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Animated Aurora Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(120, 119, 198, 0.3), transparent 50%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(251, 113, 133, 0.3), transparent 50%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Gradient Spheres - More visible */}
        <motion.div
          className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-br from-yellow-400/40 to-orange-400/40 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-cyan-400/40 to-blue-400/40 rounded-full blur-2xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/30 via-pink-300/30 to-rose-300/30 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: 'soft-light',
          }}
        />
        
        {/* Starfield Effect */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Light overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20" />
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          {/* Premium Animated Badge with Glow */}
          <motion.div 
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl rounded-full mb-4 border border-white/20 shadow-2xl"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect behind badge */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-blue-400 drop-shadow-glow" />
            </motion.div>
            <span className="relative text-sm font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent uppercase tracking-wider">
              Getting Started Guide
            </span>
            <motion.span 
              className="text-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </motion.div>
          
          {/* Main Title with 3D Effect */}
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-4 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Shadow layers for 3D effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent blur-sm opacity-50">Master AI Tools</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent translate-x-0.5 translate-y-0.5">Master AI Tools</span>
            <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent bg-300% animate-gradient drop-shadow-2xl">
              Master AI Tools
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/90 max-w-2xl mx-auto mb-6 font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Join the <span className="text-yellow-300 font-bold">AI revolution</span> with our 
            <span className="text-cyan-300 font-bold"> 4-step journey</span> to becoming an 
            <span className="text-purple-300 font-bold">AI power user</span>
          </motion.p>

          {/* Play Controls */}
          <motion.div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 bg-red-500 rounded-sm" />
                  <span className="text-white font-medium">Pause Tour</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Auto Play</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Step Navigator */}
        <div className="mb-12">
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '100px' }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <motion.path
                d={`M 100 50 L ${100 + (600 / 3) * (activeStep + 0.5)} 50`}
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>

            {/* Step Bubbles */}
            <div className="flex items-center justify-between relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step Button */}
                  <motion.button
                    onClick={() => setActiveStep(index)}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeStep === index 
                        ? 'scale-125' 
                        : 'scale-100 hover:scale-110'
                    }`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow Effect */}
                    {activeStep === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Glass Morphism Background */}
                    <div className={`absolute inset-0 rounded-full backdrop-blur-xl ${
                      activeStep === index 
                        ? 'bg-gradient-to-br ' + step.color
                        : 'bg-white/10'
                    } ${activeStep > index ? 'opacity-100' : 'opacity-80'}`} />
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      {activeStep > index ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : (
                        React.createElement(step.icon, { 
                          className: `w-8 h-8 ${activeStep === index ? 'text-white' : 'text-gray-300'}` 
                        })
                      )}
                    </div>
                    
                    {/* Step Number */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-900"
                      animate={activeStep === index ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {step.id}
                    </motion.div>
                  </motion.button>
                  
                  {/* Step Label */}
                  <motion.div 
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className={`text-sm font-bold ${
                      activeStep === index 
                        ? 'text-white' 
                        : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Interactive Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative group">
              {/* Enhanced Card Glow with Animation */}
              <motion.div 
                className={`absolute -inset-2 bg-gradient-to-r ${steps[activeStep].color} rounded-3xl blur-2xl opacity-60 group-hover:opacity-100`}
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Premium Glass Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl overflow-hidden">
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
                {/* Header with floating icon */}
                <div className="relative flex items-start justify-between mb-8">
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${steps[activeStep].color} p-4 shadow-2xl`}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {React.createElement(steps[activeStep].icon, { className: "w-full h-full text-white drop-shadow-xl" })}
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xs font-bold text-gray-300">STEP</span>
                    <span className={`text-lg font-black bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                      {steps[activeStep].id}
                    </span>
                  </motion.div>
                </div>

                {/* Enhanced Title with shadow */}
                <h3 className="text-4xl font-black mb-3 relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent bg-clip-text text-transparent blur-sm">{steps[activeStep].title}</span>
                  <span className={`relative bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent drop-shadow-2xl`}>
                    {steps[activeStep].title}
                  </span>
                </h3>
                <p className="text-lg font-semibold text-gray-300 mb-4">
                  {steps[activeStep].subtitle}
                </p>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Premium Features Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {steps[activeStep].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.15, type: "spring" }}
                      className="relative flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/30 transition-all cursor-pointer group overflow-hidden"
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div 
                        className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${steps[activeStep].color} p-2 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {React.createElement(feature.icon, { className: "w-full h-full text-white drop-shadow" })}
                      </motion.div>
                      <span className="text-xs text-white/80 text-center font-semibold relative z-10">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-white/5 backdrop-blur rounded-xl mb-4">
                  {steps[activeStep].stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {React.createElement(stat.icon, { className: "w-4 h-4 text-gray-400" })}
                        <div className={`text-xl font-black bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleNavigation(`/${steps[activeStep].title.toLowerCase()}`)}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${steps[activeStep].color} text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 group overflow-hidden relative`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Started with {steps[activeStep].title}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-200, 200] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right: Benefits & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* 3D Visual Container */}
            <div className="relative h-[300px] mb-6">
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                animate={{ rotateY: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                {/* Layered Visual Effect */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute inset-0 rounded-3xl border-2 ${
                      i === 0 ? 'border-blue-500/30' :
                      i === 1 ? 'border-purple-500/30' :
                      i === 2 ? 'border-pink-500/30' :
                      'border-cyan-500/30'
                    }`}
                    style={{
                      transform: `translateZ(${i * 20}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
                
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${steps[activeStep].color} p-4 shadow-2xl`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {React.createElement(steps[activeStep].icon, { className: "w-full h-full text-white" })}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-4">Why This Matters</h4>
              {steps[activeStep].benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${steps[activeStep].color} p-1.5 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <CheckCircle2 className="w-full h-full text-white" />
                  </div>
                  <span className="text-gray-300 leading-relaxed">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={() => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length)}
                className="p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>
              
              <div className="flex items-center gap-2">
                {steps.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStep === index 
                        ? 'w-8 bg-gradient-to-r ' + steps[index].color
                        : 'bg-white/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Premium Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center relative"
        >
          {/* Glow effect behind CTA */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-80 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl" />
          </div>
          
          <motion.div 
            className="relative inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' }}
          >
            {/* Animated user avatars */}
            <div className="flex -space-x-3">
              {[
                { emoji: '👩‍💻', bg: 'from-blue-500 to-cyan-500' },
                { emoji: '👨‍🚀', bg: 'from-purple-500 to-pink-500' },
                { emoji: '👩‍🎨', bg: 'from-green-500 to-emerald-500' },
                { emoji: '👨‍💼', bg: 'from-orange-500 to-red-500' }
              ].map((user, i) => (
                <motion.div
                  key={i}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.bg} border-2 border-black/50 flex items-center justify-center text-lg shadow-xl`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i + 0.5 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                >
                  {user.emoji}
                </motion.div>
              ))}
            </div>
            
            {/* Counter with animation */}
            <div className="text-left">
              <div className="text-xs text-purple-300 font-semibold uppercase tracking-wider">Join</div>
              <motion.div 
                className="text-xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 100%' }}
              >
                50,000+ AI Pioneers
              </motion.div>
            </div>
            
            {/* Premium CTA Button */}
            <motion.button
              onClick={() => handleNavigation('/signup')}
              className="relative px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-base rounded-xl shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 5s ease infinite;
        }
        .bg-300\% {
          background-size: 300% 300%;
        }
      `}</style>
    </section>
  );
}