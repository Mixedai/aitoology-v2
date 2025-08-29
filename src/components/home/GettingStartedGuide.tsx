import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Wallet, 
  BarChart3, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Globe,
  Cpu,
  Layers,
  Users,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  features: string[];
  stats?: { label: string; value: string }[];
  action: string;
  actionUrl: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Discover",
    subtitle: "Explore 500+ AI Tools",
    description: "Browse hundreds of AI tools organized by categories. ChatGPT, Midjourney, Claude, and more - all in one platform.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    features: ["20+ Categories", "Detailed Reviews", "Use Cases"],
    stats: [
      { label: "Tools", value: "500+" },
      { label: "Categories", value: "20+" },
      { label: "Reviews", value: "10K+" }
    ],
    action: "Explore Tools",
    actionUrl: "/explore"
  },
  {
    id: 2,
    title: "Compare",
    subtitle: "Find Your Perfect Match",
    description: "Compare AI tools side-by-side to find the perfect fit. Analyze pricing, features, and capabilities at a glance.",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    features: ["Side-by-Side", "Price Analysis", "Feature Matrix"],
    stats: [
      { label: "Comparisons", value: "∞" },
      { label: "Filters", value: "15+" },
      { label: "Metrics", value: "50+" }
    ],
    action: "Compare Now",
    actionUrl: "/compare"
  },
  {
    id: 3,
    title: "Save",
    subtitle: "Build Your AI Wallet",
    description: "Save your favorite AI tools and create your personalized AI wallet. All your tools in one secure place.",
    icon: Wallet,
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    features: ["Personal Wallet", "Collections", "Quick Access"],
    stats: [
      { label: "Secure", value: "100%" },
      { label: "Collections", value: "∞" },
      { label: "Access", value: "24/7" }
    ],
    action: "My Wallet",
    actionUrl: "/wallet"
  },
  {
    id: 4,
    title: "Track",
    subtitle: "Optimize Your Workflow",
    description: "Monitor your AI tool usage with detailed analytics. Track costs, measure efficiency, and optimize your workflow.",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    features: ["Usage Analytics", "Cost Tracking", "Performance"],
    stats: [
      { label: "Insights", value: "Real-time" },
      { label: "Reports", value: "Custom" },
      { label: "Savings", value: "30%+" }
    ],
    action: "View Stats",
    actionUrl: "/analytics"
  }
];

export function GettingStartedGuide({ onNavigate }: { onNavigate?: (from: string, to: string) => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleNavigation = (url: string) => {
    if (onNavigate) {
      onNavigate('getting-started', url.replace('/', ''));
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#E9E3DF]">
      {/* Simple background without gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Optional: Add subtle texture or pattern if needed */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Getting Started Guide
            </span>
            <span className="text-2xl">🚀</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master AI tools in 4 simple steps - Discover, Compare, Save & Track
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <button
                  onClick={() => setActiveStep(index)}
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeStep >= index 
                      ? 'bg-gradient-to-r ' + step.color + ' text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                  }`}
                >
                  {activeStep > index ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="font-bold">{step.id}</span>
                  )}
                </button>
                
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute top-1/2 left-full w-full h-1 -translate-y-1/2 transition-all duration-500 ${
                      activeStep > index 
                        ? 'bg-gradient-to-r ' + step.color
                        : 'bg-gray-200'
                    }`}
                    style={{ width: 'calc(100vw / 8)' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {/* Active Step Detail */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className={`h-full p-8 rounded-3xl ${steps[activeStep].gradient} backdrop-blur-sm border border-white/50 shadow-2xl`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${steps[activeStep].color} p-3 shadow-lg`}>
                    {React.createElement(steps[activeStep].icon, { className: "w-full h-full text-white" })}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-semibold text-gray-600">Step</span>
                    <span className={`text-lg font-bold bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                      {steps[activeStep].id}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-2">
                  <span className={`bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                    {steps[activeStep].title}
                  </span>
                </h3>
                
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  {steps[activeStep].subtitle}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {steps[activeStep].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-xl"
                    >
                      <CheckCircle2 className={`w-4 h-4 text-transparent bg-gradient-to-r ${steps[activeStep].color} bg-clip-text`} />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                {steps[activeStep].stats && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {steps[activeStep].stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="text-center"
                      >
                        <div className={`text-2xl font-bold bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(steps[activeStep].actionUrl)}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${steps[activeStep].color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                >
                  <span>{steps[activeStep].action}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All Steps Grid */}
          <div className="grid grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setActiveStep(index)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-white shadow-xl scale-105 border-2 border-gradient-to-r ' + step.color
                    : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg'
                }`}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} p-2.5 mb-4 shadow-md`}>
                    {React.createElement(step.icon, { className: "w-full h-full text-white" })}
                  </div>
                  
                  <h4 className="text-lg font-bold mb-1">
                    <span className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.title}
                    </span>
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {step.subtitle}
                  </p>

                  {/* Mini Features */}
                  <div className="flex flex-wrap gap-2">
                    {step.features.slice(0, 2).map((feature, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-10 pointer-events-none`}
                    />
                  )}
                </AnimatePresence>

                {/* Active Indicator */}
                {activeStep === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Join <span className="font-bold text-blue-600">50,000+</span> users mastering AI tools
            </span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}