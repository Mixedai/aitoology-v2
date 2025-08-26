import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { 
  Search, 
  ArrowRight,
  GitCompare,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface SimpleModernHomeProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
}

export function SimpleModernHome({ onNavigate }: SimpleModernHomeProps) {
  const [selectedFilter, setSelectedFilter] = useState('smart-filtering');

  const filterOptions = [
    { 
      id: 'smart-filtering', 
      title: 'Smart Filtering', 
      subtitle: 'Find tools instantly', 
      icon: '🎯',
      active: selectedFilter === 'smart-filtering'
    },
    { 
      id: 'authentic-reviews', 
      title: 'Authentic Reviews', 
      subtitle: 'Real user feedback', 
      icon: '⭐',
      active: selectedFilter === 'authentic-reviews'
    },
    { 
      id: 'perfect-match', 
      title: 'Perfect Match', 
      subtitle: 'Personalized recommendations', 
      icon: '✨',
      active: selectedFilter === 'perfect-match'
    },
  ];

  const handleBrowseTools = () => {
    if (onNavigate) {
      onNavigate('simple-modern-home', 'explore-frame');
    }
  };

  const handleCompareTools = () => {
    if (onNavigate) {
      onNavigate('simple-modern-home', 'compare');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Clean Gradient Background - Matching Screenshot */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50/40 to-orange-50/50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-purple-50/20" />
        
        {/* Subtle animated orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center space-y-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Main Heading - Matching Screenshot */}
              <div className="space-y-6">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="text-orange-500">AI Tools</span>
                  <span className="text-gray-400"> in </span>
                  <span className="text-purple-500">Seconds</span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Browse our curated collection of <span className="font-semibold text-purple-600">1000+ AI tools</span> across every category.
                </motion.p>
              </div>

              {/* Filter Cards - Matching Screenshot */}
              <motion.div
                className="flex flex-wrap gap-6 justify-center items-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {filterOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    className={`relative flex flex-col items-center p-8 rounded-2xl cursor-pointer transition-all duration-300 min-w-[220px] ${
                      option.active 
                        ? 'bg-white shadow-xl border-2 border-purple-200 scale-105' 
                        : 'bg-white/80 hover:bg-white hover:shadow-lg border border-gray-100'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    onClick={() => setSelectedFilter(option.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-500">{option.subtitle}</p>
                    {option.active && (
                      <motion.div
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <Button
                  size="lg"
                  className="px-10 py-4 text-base font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  onClick={handleBrowseTools}
                >
                  <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Browse Tools
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-4 text-base font-medium border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                  onClick={handleCompareTools}
                >
                  <GitCompare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Compare Tools
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}