import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  GitCompare, 
  Wallet, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onNavigate?: (from: string, to: string, params?: any) => void;
}

const steps = [
  {
    id: 1,
    title: "Discover",
    icon: Search,
    color: "from-blue-600 to-cyan-600",
    description: "500+ AI Tools"
  },
  {
    id: 2,
    title: "Compare",
    icon: GitCompare,
    color: "from-purple-600 to-pink-600",
    description: "Smart Analysis"
  },
  {
    id: 3,
    title: "Save",
    icon: Wallet,
    color: "from-green-600 to-emerald-600",
    description: "Personal Wallet"
  },
  {
    id: 4,
    title: "Track",
    icon: BarChart3,
    color: "from-orange-600 to-red-600",
    description: "Usage Analytics"
  }
];

export function CompactGettingStarted({ onNavigate }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Compact Header */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Getting Started
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl lg:text-6xl font-black text-white mb-4 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="relative">
                {/* Glow effect */}
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-50" aria-hidden="true">
                  Master AI Tools
                </span>
                <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Master AI Tools
                </span>
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join 50,000+ pioneers in 4 simple steps
            </motion.p>

            <motion.button
              onClick={() => onNavigate?.('getting-started', 'explore')}
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-2xl shadow-2xl hover:bg-white/90 hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Right: Horizontal Steps */}
          <div className="lg:w-2/3">
            <div className="flex gap-6 justify-center lg:justify-end">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => setActiveStep(index)}
                    className={`group relative flex flex-col items-center gap-4 p-8 rounded-2xl backdrop-blur-xl transition-all border min-w-[160px] ${
                      activeStep === index 
                        ? 'bg-white/25 scale-110 border-white/40 shadow-2xl' 
                        : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30'
                    }`}
                    whileHover={{ y: -5, scale: activeStep === index ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Step number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-base font-bold text-purple-600">{step.id}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 shadow-2xl`}>
                      {React.createElement(step.icon, { className: "w-full h-full text-white" })}
                    </div>
                    
                    {/* Title */}
                    <span className="text-base font-bold text-white">{step.title}</span>
                    
                    {/* Description */}
                    <span className="text-sm text-white/70">{step.description}</span>
                    
                    {/* Active indicator */}
                    {activeStep === index && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                  
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-6 w-6 h-0.5 bg-white/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}