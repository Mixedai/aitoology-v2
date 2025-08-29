import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  X,
  Star,
  Users,
  DollarSign,
  ExternalLink,
  Check,
  Brain,
  Cpu,
  Network,
  Boxes,
  Bot,
  Sparkles
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CompareToolsProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  className?: string;
}

// Enhanced Tool Search Card
const ToolSearchCard = ({ 
  onAddTool, 
  index 
}: { 
  onAddTool: (tool: any) => void; 
  index: number; 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Mock search results
  const mockTools = [
    {
      id: 'chatgpt-4',
      name: 'ChatGPT-4',
      category: 'Conversational AI',
      icon: Brain,
      gradient: 'from-emerald-400 to-cyan-500',
      rating: '4.8',
      users: '100M+',
      pricing: 'Free/Pro'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      category: 'Conversational AI',
      icon: Brain,
      gradient: 'from-orange-400 to-red-500',
      rating: '4.8',
      users: '8M+',
      pricing: 'Free/Pro'
    },
    {
      id: 'midjourney-v6',
      name: 'Midjourney V6',
      category: 'Image Generation',
      icon: Sparkles,
      gradient: 'from-purple-400 to-pink-500',
      rating: '4.9',
      users: '15M+',
      pricing: '$10/mo'
    }
  ];

  const filteredTools = mockTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="relative p-8 h-full bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group overflow-hidden min-h-[500px]">
        {/* Gradient glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="relative space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg mx-auto"
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                boxShadow: "0 20px 25px -5px rgba(255, 107, 53, 0.3)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Plus className="w-8 h-8 text-white" />
            </motion.div>
            <h3>Add Tool to Compare</h3>
            <p className="text-muted-foreground">
              Search and select an AI tool to add to your comparison.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm ring-1 ring-border/40 rounded-xl"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSearching}
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              {isSearching ? 'Searching...' : 'Search Tools'}
            </Button>
          </form>

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-colors cursor-pointer"
                  onClick={() => onAddTool(tool)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${tool.gradient} rounded-lg flex items-center justify-center`}>
                      <tool.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">{tool.category}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
              {filteredTools.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-4">
                  No tools found. Try a different search term.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Light sweep effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </Card>
    </motion.div>
  );
};

// Enhanced Tool Comparison Card
const ToolComparisonCard = ({ 
  tool, 
  onRemove, 
  index,
  onNavigate 
}: { 
  tool: any; 
  onRemove: () => void; 
  index: number;
  onNavigate?: (from: string, to: string, params?: any) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleViewDetails = () => {
    onNavigate?.('compare', 'tool-detail', { tool_id: tool.id, tool });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="relative p-8 h-full bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group overflow-hidden min-h-[500px]">
        {/* Remove button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onRemove}
          className="absolute top-4 right-4 z-10 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Gradient glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="relative space-y-6">
          {/* Tool Header */}
          <div className="text-center space-y-4">
            <motion.div 
              className={`w-16 h-16 bg-gradient-to-br ${tool.gradient || 'from-primary to-secondary'} rounded-2xl flex items-center justify-center shadow-lg mx-auto`}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                boxShadow: "0 20px 25px -5px rgba(255, 107, 53, 0.3)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {tool.icon ? (
                <tool.icon className="w-8 h-8 text-white" />
              ) : (
                <Brain className="w-8 h-8 text-white" />
              )}
            </motion.div>
            <div>
              <h3 className="group-hover:text-primary transition-colors duration-300">
                {tool.name}
              </h3>
              <Badge variant="outline" className="mt-2">
                {tool.category}
              </Badge>
            </div>
          </div>

          {/* Key Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">Rating</span>
              </div>
              <span className="font-medium">{tool.rating}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Users</span>
              </div>
              <span className="font-medium">{tool.users}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Pricing</span>
              </div>
              <span className="font-medium">{tool.pricing}</span>
            </div>

            <Separator />

            {/* Features Comparison */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Key Features</h4>
              {(tool.features || [
                'Natural Language Processing',
                'Real-time Processing',
                'API Integration',
                'Multi-language Support',
                'Custom Training'
              ]).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{feature}</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={() => window.open(tool.website || '#', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Try Now
            </Button>
            <Button 
              variant="outline" 
              className="w-full bg-white/60 backdrop-blur-sm"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Light sweep effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </Card>
    </motion.div>
  );
};

export function CompareTools({ onNavigate, className = "" }: CompareToolsProps) {
  const { scrollYProgress } = useScroll();
  const [selectedTools, setSelectedTools] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const comparisonRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" });

  const handleAddTool = (tool: any) => {
    if (selectedTools.length < 3 && !selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools(selectedTools.filter(tool => tool.id !== toolId));
  };

  const handleClearAll = () => {
    setSelectedTools([]);
  };

  // Fill empty slots with search cards
  const comparisonSlots = [];
  for (let i = 0; i < 3; i++) {
    if (selectedTools[i]) {
      comparisonSlots.push(
        <ToolComparisonCard
          key={selectedTools[i].id}
          tool={selectedTools[i]}
          onRemove={() => handleRemoveTool(selectedTools[i].id)}
          index={i}
          onNavigate={onNavigate}
        />
      );
    } else {
      comparisonSlots.push(
        <ToolSearchCard
          key={`search-${i}`}
          onAddTool={handleAddTool}
          index={i}
        />
      );
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Dynamic Base Gradient */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
            linear-gradient(135deg, 
              #fef7ed 0%, 
              #fef2f2 25%, 
              #eff6ff 75%, 
              #eef2ff 100%
            )
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 70% 80%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
             linear-gradient(135deg, #fef7ed 0%, #fef2f2 25%, #eff6ff 75%, #eef2ff 100%)`,
            `radial-gradient(circle at 35% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 65% 75%, rgba(251, 146, 60, 0.25) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 70%),
             linear-gradient(135deg, #fef7ed 0%, #fef2f2 25%, #eff6ff 75%, #eef2ff 100%)`
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Layer 2: Grid Pattern */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
        animate={{
          backgroundSize: ["32px 32px", "34px 34px", "32px 32px"]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3: Floating Orbs */}
      <motion.div style={{ y: orbY }} className="fixed inset-0 z-0">
        {/* Primary Orb */}
        <motion.div
          className="absolute -left-24 top-1/6 w-64 h-64 rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 25, 0],
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary Orb */}
        <motion.div
          className="absolute -right-20 top-1/3 w-56 h-56 rounded-full blur-3xl opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(244, 63, 94, 0.25) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Tertiary Orb */}
        <motion.div
          className="absolute left-1/3 bottom-1/4 w-48 h-48 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -25, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
        />
      </motion.div>

      {/* Layer 4: AI Tech Shapes */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        {[
          { Icon: Brain, position: "top-1/6 left-1/5", delay: 0, duration: 16 },
          { Icon: Cpu, position: "top-1/4 right-1/4", delay: 2, duration: 14 },
          { Icon: Network, position: "bottom-1/3 left-1/4", delay: 4, duration: 18 },
          { Icon: Bot, position: "bottom-1/6 right-1/3", delay: 6, duration: 12 },
          { Icon: Boxes, position: "top-1/2 left-1/2", delay: 8, duration: 20 }
        ].map(({ Icon, position, delay, duration }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} opacity-10 text-primary`}
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay 
            }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        ))}
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section 
          ref={heroRef}
          className="py-24 px-6"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <motion.h1 
                className="mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Compare AI Tools Side-by-Side
              </motion.h1>
              <motion.p 
                className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Make informed decisions by comparing features, pricing, and performance of different AI tools in a comprehensive side-by-side view.
              </motion.p>

              {/* Quick Actions */}
              {selectedTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center justify-center gap-4"
                >
                  <Badge variant="secondary" className="px-4 py-2">
                    {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    className="gap-2 bg-white/60 backdrop-blur-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section 
          ref={comparisonRef}
          className="py-16 px-6 relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Tool Comparison
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {selectedTools.length === 0 
                    ? "Start by searching and adding AI tools to compare their features."
                    : "Compare the selected tools across key metrics and features."
                  }
                </p>
              </div>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {comparisonSlots}
              </div>

              {/* Detailed Comparison Table (when tools are selected) */}
              {selectedTools.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-16"
                >
                  <Card className="p-8 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
                    <div className="space-y-6">
                      <h3 className="text-center">Detailed Feature Comparison</h3>
                      
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="features">Features</TabsTrigger>
                          <TabsTrigger value="pricing">Pricing</TabsTrigger>
                          <TabsTrigger value="platforms">Platforms</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-border/50">
                                  <th className="text-left py-3 px-4">Metric</th>
                                  {selectedTools.map((tool) => (
                                    <th key={tool.id} className="text-center py-3 px-4">
                                      {tool.name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="space-y-2">
                                <tr className="border-b border-border/20">
                                  <td className="py-3 px-4 font-medium">Rating</td>
                                  {selectedTools.map((tool) => (
                                    <td key={tool.id} className="text-center py-3 px-4">
                                      <div className="flex items-center justify-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        {tool.rating}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                                <tr className="border-b border-border/20">
                                  <td className="py-3 px-4 font-medium">Users</td>
                                  {selectedTools.map((tool) => (
                                    <td key={tool.id} className="text-center py-3 px-4">
                                      {tool.users}
                                    </td>
                                  ))}
                                </tr>
                                <tr className="border-b border-border/20">
                                  <td className="py-3 px-4 font-medium">Pricing</td>
                                  {selectedTools.map((tool) => (
                                    <td key={tool.id} className="text-center py-3 px-4">
                                      {tool.pricing}
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </TabsContent>

                        <TabsContent value="features" className="space-y-4">
                          <p className="text-center text-muted-foreground">
                            Detailed feature comparison coming soon...
                          </p>
                        </TabsContent>

                        <TabsContent value="pricing" className="space-y-4">
                          <p className="text-center text-muted-foreground">
                            Pricing breakdown comparison coming soon...
                          </p>
                        </TabsContent>

                        <TabsContent value="platforms" className="space-y-4">
                          <p className="text-center text-muted-foreground">
                            Platform availability comparison coming soon...
                          </p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Call to Action */}
              {selectedTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center pt-8"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Ready to try one of these tools?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        className="bg-gradient-to-r from-primary to-secondary gap-2"
                        onClick={() => onNavigate?.('compare', 'explore-frame')}
                      >
                        <Search className="w-4 h-4" />
                        Explore More Tools
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 bg-white/60 backdrop-blur-sm"
                        onClick={() => onNavigate?.('compare', 'wallet', { tools: selectedTools })}
                      >
                        <Plus className="w-4 h-4" />
                        Save to Wallet
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}