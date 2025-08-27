import { useRef } from 'react';
import { Search, BarChart3, Zap, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface HeroSection3Props {
  className?: string;
}

export function HeroSection3({ className = "" }: HeroSection3Props) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find tools instantly by task, price, or rating.",
      iconBg: "bg-blue-500",
      iconColor: "text-white"
    },
    {
      icon: BarChart3,
      title: "Deep Compare",
      description: "Compare features, pricing, and performance across tools.",
      iconBg: "bg-purple-500",
      iconColor: "text-white"
    },
    {
      icon: Zap,
      title: "Ready Workflows",
      description: "Access pre-built workflows and step-by-step tutorials.",
      iconBg: "bg-orange-500",
      iconColor: "text-white"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 px-6 overflow-hidden ${className}`}
    >
      {/* Light gradient background matching screenshot */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-50" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-semibold mb-4 text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Supercharge your discovery
          </motion.h2>
          <motion.p 
            className="text-base text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore, compare, and master AI tools with our intelligent platform designed for modern workflows.
          </motion.p>
        </motion.div>

        {/* Feature Cards - Clean Design */}
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6,
                delay: 0.3 + index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                {/* Icon */}
                <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4 shadow-sm`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors group/btn">
                  Learn more
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}