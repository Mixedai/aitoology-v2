import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  Zap,
  Brain,
  Cpu,
  Network,
  Boxes,
  CircuitBoard,
  Bot,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  X,
  GitCompare,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Smartphone,
  Headphones,
  Building,
  Wifi,
  Shield,
  BarChart,
  Download,
  Trophy,
  FileText,
  LogIn,
  UserPlus
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { ModernToolCard } from './ModernToolCard';
import { FilterChips } from './FilterChips';
import { CompareModal } from '../compare/CompareModal';
import { AuthModal } from '../auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useSupabaseTools } from '@/hooks/useSupabaseTools';
import { useSupabaseCategories } from '@/hooks/useSupabaseCategories';

interface ExploreFrameProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  className?: string;
}

// Helper function to get gradient based on tool category or name
const getToolGradient = (tool: any): string => {
  // Define gradient mappings based on your screenshot
  const gradients: { [key: string]: string } = {
    // Tool-specific gradients matching the screenshot
    'chatgpt': 'from-teal-400 to-teal-600',
    'midjourney': 'from-purple-400 via-pink-400 to-purple-600',
    'github-copilot': 'from-gray-600 to-gray-800',
    'notion-ai': 'from-gray-500 to-gray-700',
    'claude': 'from-orange-400 to-orange-600',
    'perplexity': 'from-blue-400 to-blue-600',
    
    // Category-based fallbacks
    'Chatbot': 'from-teal-400 to-teal-600',
    'Design': 'from-purple-400 via-pink-400 to-purple-600',
    'Development': 'from-gray-600 to-gray-800',
    'Productivity': 'from-green-400 to-green-600',
    'Research': 'from-blue-400 to-blue-600',
    'Video': 'from-red-400 to-red-600',
    'Writing': 'from-indigo-400 to-indigo-600',
  };
  
  // First check for tool-specific gradient
  if (gradients[tool.id]) {
    return gradients[tool.id];
  }
  
  // Fall back to category-based gradient
  if (gradients[tool.category]) {
    return gradients[tool.category];
  }
  
  // Default gradient
  return 'from-primary to-secondary';
};

// Enhanced Category Card with glassmorphism
const CategoryCard = ({ 
  category, 
  index,
  onNavigate 
}: { 
  category: any; 
  index: number; 
  onNavigate?: (from: string, to: string, params?: any) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 120,
        damping: 20
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card 
        className="relative p-6 h-full bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl group cursor-pointer overflow-hidden"
        onClick={() => onNavigate?.('explore-frame', 'explore-frame', { category: category.id })}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNavigate?.('explore-frame', 'explore-frame', { category: category.id });
          }
        }}
        aria-label={`Browse ${category.name} tools`}
      >
        {/* Gradient glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="relative space-y-4">
          {/* Icon with gradient background */}
          <motion.div 
            className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ 
              scale: 1.05,
              rotate: 2
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <category.icon className="w-8 h-8 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {category.count} tools
            </p>
          </div>
        </div>

        {/* Light sweep effect on hover */}
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

// Using imported ModernToolCard component

// Redesigned Modern Comparison Component
const ComparisonTable = ({ 
  selectedTools,
  onRemoveTool 
}: { 
  selectedTools: any[];
  onRemoveTool: (toolId: string) => void;
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'pricing'>('overview');
  
  const features = {
    core: [
      { name: 'Free Plan', icon: DollarSign, value: 'free_plan' },
      { name: 'API Access', icon: Cpu, value: 'api' },
      { name: 'Mobile App', icon: Smartphone, value: 'mobile' },
      { name: 'Team Features', icon: Users, value: 'team' }
    ],
    advanced: [
      { name: 'Custom Training', icon: Brain, value: 'training' },
      { name: 'Priority Support', icon: Headphones, value: 'support' },
      { name: 'Enterprise', icon: Building, value: 'enterprise' },
      { name: 'Data Security', icon: Shield, value: 'security' }
    ],
    technical: [
      { name: 'Offline Mode', icon: Wifi, value: 'offline' },
      { name: 'Integrations', icon: Network, value: 'integrations' },
      { name: 'Analytics', icon: BarChart, value: 'analytics' },
      { name: 'Export Data', icon: Download, value: 'export' }
    ]
  };

  if (selectedTools.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-12"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex p-4 rounded-2xl bg-white shadow-xl mb-6"
          >
            <GitCompare className="w-12 h-12 text-purple-600" />
          </motion.div>
          
          <h3 className="text-3xl font-bold mb-3">
            Compare AI Tools Side by Side
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">
            Select up to 4 tools to compare features, pricing, and capabilities. Make informed decisions with our comprehensive comparison.
          </p>
          
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="w-32 h-40 bg-white rounded-2xl shadow-lg border-2 border-dashed border-purple-200 flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
              >
                <Plus className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-sm text-gray-500">Add Tool {i}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-gray-100 rounded-xl">
          {[
            { id: 'overview', label: 'Overview', icon: Grid3X3 },
            { id: 'detailed', label: 'Detailed', icon: List },
            { id: 'pricing', label: 'Pricing', icon: DollarSign }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-white shadow-md text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <view.icon className="w-4 h-4" />
              <span className="font-medium">{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Comparison Area */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Selected Tools Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-xl font-bold">
              Comparing {selectedTools.length} Tools
            </h3>
            <button
              onClick={() => {
                selectedTools.forEach(tool => onRemoveTool(tool.id));
                toast.success('Comparison cleared');
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {selectedTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 relative"
              >
                <button
                  onClick={() => onRemoveTool(tool.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
                
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tool.gradient || 'from-gray-400 to-gray-600'} flex items-center justify-center mb-3`}>
                    {tool.icon ? (
                      <tool.icon className="w-8 h-8 text-white" />
                    ) : (
                      <Sparkles className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900">{tool.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{tool.category}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{tool.rating}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                      {tool.pricing}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Empty Slots */}
            {Array.from({ length: 4 - selectedTools.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="border-2 border-dashed border-white/50 rounded-xl p-4 flex items-center justify-center min-h-[140px]"
              >
                <div className="text-center text-white/70">
                  <Plus className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs">Add Tool</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Content */}
        {activeView === 'overview' && (
          <div className="p-8">
            <div className="space-y-8">
              {/* Core Features */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Core Features
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {features.core.map((feature) => (
                    <motion.div
                      key={feature.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 w-48">
                        <feature.icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{feature.name}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-4 gap-4">
                        {selectedTools.map((tool) => {
                          const hasFeature = Math.random() > 0.3;
                          return (
                            <div key={`${tool.id}-${feature.value}`} className="flex justify-center">
                              {hasFeature ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"
                                >
                                  <Check className="w-5 h-5 text-white" />
                                </motion.div>
                              ) : (
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Minus className="w-4 h-4 text-gray-400" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <Trophy className="w-10 h-10 text-green-600 mb-3" />
                  <h5 className="font-bold text-gray-900 mb-1">Best Overall</h5>
                  <p className="text-sm text-gray-600">
                    {selectedTools[0]?.name} leads with most features
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
                  <DollarSign className="w-10 h-10 text-blue-600 mb-3" />
                  <h5 className="font-bold text-gray-900 mb-1">Best Value</h5>
                  <p className="text-sm text-gray-600">
                    {selectedTools.find(t => t.pricing === 'Free' || t.pricing === 'Free/Pro')?.name || selectedTools[0]?.name} offers great value
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <Users className="w-10 h-10 text-purple-600 mb-3" />
                  <h5 className="font-bold text-gray-900 mb-1">Most Popular</h5>
                  <p className="text-sm text-gray-600">
                    {selectedTools[0]?.name} trusted by millions
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'detailed' && (
          <div className="p-8">
            <div className="space-y-6">
              {Object.entries(features).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-gray-700 mb-3 capitalize">{category} Features</h4>
                  <div className="space-y-2">
                    {items.map((feature) => (
                      <div key={feature.value} className="grid grid-cols-5 gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <feature.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{feature.name}</span>
                        </div>
                        {selectedTools.map((tool) => (
                          <div key={`${tool.id}-${feature.value}`} className="text-center">
                            {Math.random() > 0.4 ? (
                              <Check className="w-4 h-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 mx-auto" />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'pricing' && (
          <div className="p-8">
            <div className="grid grid-cols-4 gap-6">
              {selectedTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                    <h4 className="font-bold text-xl mb-2">{tool.name}</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-4">
                      {tool.pricing}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 text-left">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>All basic features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>API access included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-gray-50 p-6 flex justify-center gap-4">
          <Button variant="outline" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <FileText className="w-4 h-4 mr-2" />
            Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export function ExploreFrame({ onNavigate, className = "" }: ExploreFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const { user, signOut, loading: authLoading } = useAuth();
  const { tools, loading: toolsLoading, searchTools, filterByCategory, filterByPricing } = useSupabaseTools();
  const { categories: dbCategories, loading: categoriesLoading } = useSupabaseCategories();
  
  // Debug auth state
  useEffect(() => {
    console.log('ExploreFrame - Auth state changed:', { 
      user: user?.email, 
      userId: user?.id,
      authLoading 
    });
  }, [user, authLoading]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'browse' | 'compare'>('browse');
  const [selectedToolsForComparison, setSelectedToolsForComparison] = useState<any[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLoadingCompare, setIsLoadingCompare] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  
  // Map database categories to UI format with icons - MOVED BEFORE useEffect
  const categoryIcons: { [key: string]: any } = {
    'Chatbot': Brain,
    'Design': Sparkles,
    'Development': Cpu,
    'Productivity': Zap,
    'Research': CircuitBoard,
    'Video': Bot,
    'Writing': FileText
  };
  
  const categories = dbCategories.map(cat => ({
    id: cat.slug,
    name: cat.name,
    icon: categoryIcons[cat.name] || Boxes,
    count: cat.tool_count || 0
  }));

  // Handle search and category changes
  useEffect(() => {
    if (searchQuery.trim()) {
      searchTools(searchQuery);
    } else if (selectedCategory !== 'all') {
      const categoryName = categories.find(c => c.id === selectedCategory)?.name;
      if (categoryName) {
        filterByCategory(categoryName);
      }
    }
  }, [searchQuery, selectedCategory, categories]);

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const toolsRef = useRef(null);
  const compareRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "-50px" });
  const compareInView = useInView(compareRef, { once: true, margin: "-50px" });
  
  // Original mock categories for fallback
  const mockCategories = [
    { id: 'conversational', name: 'Conversational AI', icon: Brain, count: 25 },
    { id: 'creative', name: 'Creative AI', icon: Sparkles, count: 32 },
    { id: 'code', name: 'Code Assistant', icon: Cpu, count: 18 },
    { id: 'productivity', name: 'Productivity', icon: Zap, count: 28 },
    { id: 'research', name: 'Research', icon: Network, count: 15 },
    { id: 'automation', name: 'Automation', icon: Bot, count: 12 }
  ];

  // Map Supabase tools to UI format
  const formattedTools = tools.map(tool => ({
    id: tool.slug || tool.id,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    rating: tool.rating ? tool.rating.toString() : '4.5',
    users: '10M+', // This could be added to database
    pricing: tool.pricing,
    isPremium: tool.pricing !== 'Free',
    gradient: getToolGradient(tool),
    icon: categoryIcons[tool.category] || Brain,
    features: tool.features || [],
    tags: tool.tags || [],
    website_url: tool.website_url,
    logo_emoji: tool.logo_emoji
  }));

  const filteredTools = formattedTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           tool.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic handled by filteredTools
  };

  const handleToolSelect = (tool: any) => {
    setSelectedToolsForComparison(prev => {
      const isSelected = prev.find(t => t.id === tool.id);
      if (isSelected) {
        toast.success(`${tool.name} removed from comparison`);
        return prev.filter(t => t.id !== tool.id);
      } else {
        if (prev.length >= 3) {
          toast.error('You can compare up to 3 tools at once');
          return prev;
        }
        toast.success(`${tool.name} added to comparison`);
        return [...prev, tool];
      }
    });
  };

  const handleRemoveFromComparison = (toolId: string) => {
    setSelectedToolsForComparison(prev => {
      const tool = prev.find(t => t.id === toolId);
      if (tool) {
        toast.success(`${tool.name} removed from comparison`);
      }
      return prev.filter(t => t.id !== toolId);
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative">
      {/* PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Dynamic Base Gradient */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
            linear-gradient(135deg, 
              #fef7ed 0%, 
              #fef2f2 30%, 
              #eff6ff 70%, 
              #eef2ff 100%
            )
          `
        }}
      />

      {/* Layer 2: Grid Pattern */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Layer 3: Floating Orbs */}
      <motion.div style={{ y: orbY }} className="fixed inset-0 z-0">
        {/* Primary Orb */}
        <motion.div
          className="absolute -left-32 top-1/4 w-80 h-80 rounded-full blur-3xl opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
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
          className="absolute -right-24 top-1/3 w-72 h-72 rounded-full blur-3xl opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(244, 63, 94, 0.25) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, 25, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>

      {/* Layer 4: AI Tech Shapes */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        {[
          { Icon: Brain, position: "top-1/6 left-1/5", delay: 0, duration: 16 },
          { Icon: Cpu, position: "top-1/4 right-1/4", delay: 2, duration: 14 },
          { Icon: Network, position: "bottom-1/3 left-1/3", delay: 4, duration: 18 },
          { Icon: CircuitBoard, position: "bottom-1/5 right-1/6", delay: 6, duration: 12 },
          { Icon: Bot, position: "top-1/2 left-1/2", delay: 8, duration: 20 },
          { Icon: Boxes, position: "top-1/8 right-1/2", delay: 10, duration: 15 }
        ].map(({ Icon, position, delay, duration }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} opacity-15 text-primary`}
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.05, 0.2, 0.05]
            }}
            transition={{ 
              duration, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay 
            }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        ))}
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 pt-20">
        {/* Auth Buttons */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          {authLoading ? (
            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
              <span className="text-gray-600 text-sm">Loading...</span>
            </div>
          ) : user ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-gray-800 font-medium text-sm">{user.email?.split('@')[0]}</span>
              </div>
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="bg-white/90 backdrop-blur-md hover:bg-white shadow-lg"
                size="sm"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                variant="ghost"
                className="text-gray-700 hover:bg-white/50 backdrop-blur-md"
                size="sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button
                onClick={() => {
                  setAuthModalTab('register');
                  setIsAuthModalOpen(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                size="sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </>
          )}
        </div>

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
              {/* Enhanced Title with Gradient Animation */}
              <motion.div 
                className="mb-8 relative"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto">
                  <span className="block mb-2">
                    <span className="inline-block text-gray-800 font-bold">
                      Find Your Perfect
                    </span>
                  </span>
                  <span className="block">
                    <motion.span 
                      className="inline-block relative mr-3"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-extrabold">
                        AI Tool
                      </span>
                      {/* Sparkle Icons */}
                      <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    </motion.span>
                    <span className="text-gray-800 font-bold">
                      in
                    </span>
                    <span className="ml-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                      Seconds
                    </span>
                  </span>
                  
                  {/* Animated Underline */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-4 mx-auto"
                    initial={{ width: "0%" }}
                    animate={heroInView ? { width: "60%" } : {}}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  />
                </h1>
              </motion.div>

              {/* Enhanced Description with Cards */}
              <motion.div 
                className="max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Browse our curated collection of <span className="font-bold text-purple-600">1000+ AI tools</span> across every category.
                </p>
                
                {/* Feature Cards - Smaller and Side by Side */}
                <div className="flex justify-center gap-3 mt-6">
                  {[
                    { icon: "🚀", text: "Smart Filtering", desc: "Find tools instantly" },
                    { icon: "⭐", text: "Authentic Reviews", desc: "Real user feedback" },
                    { icon: "🎯", text: "Perfect Match", desc: "Personalized recommendations" }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="rounded-lg px-3 py-2 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center gap-2"
                      style={{ backgroundColor: "#465C88" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                      whileHover={{ 
                        scale: 1.05
                      }}
                    >
                      <div className="text-lg">{feature.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white text-sm leading-tight">{feature.text}</h3>
                        <p className="text-xs text-white/90">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex justify-center mb-8"
              >
                <div className="bg-white/60 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
                  <Button
                    variant={currentTab === 'browse' ? 'default' : 'ghost'}
                    onClick={() => setCurrentTab('browse')}
                    className="gap-2 rounded-xl"
                  >
                    <Search className="w-4 h-4" />
                    Browse Tools
                  </Button>
                  <Button
                    variant={currentTab === 'compare' ? 'default' : 'ghost'}
                    onClick={() => setCurrentTab('compare')}
                    className="gap-2 rounded-xl"
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare Tools
                    {selectedToolsForComparison.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {selectedToolsForComparison.length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder={currentTab === 'browse' ? "Search AI tools... (⌘K for quick search)" : "Search tools to compare..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-20 py-4 text-lg bg-white/80 backdrop-blur-lg ring-1 ring-border/40 hover:ring-primary/50 focus:ring-primary rounded-2xl shadow-lg border-0 transition-shadow duration-300"
                      aria-label="Search for AI tools"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {currentTab === 'browse' && (
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-muted-foreground hover:text-primary"
                            >
                              <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-80">
                            <SheetHeader>
                              <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <div className="py-6 space-y-6">
                              {/* Price Range */}
                              <div className="space-y-4">
                                <label className="text-sm">Price Range</label>
                                <Slider
                                  value={priceRange}
                                  onValueChange={setPriceRange}
                                  max={100}
                                  step={10}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <span>Free</span>
                                  <span>${priceRange[1]}/mo</span>
                                </div>
                              </div>

                              {/* Platforms */}
                              <div className="space-y-4">
                                <label className="text-sm">Platforms</label>
                                <div className="space-y-2">
                                  {['Web', 'Mobile', 'Desktop', 'API'].map((platform) => (
                                    <div key={platform} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={platform}
                                        checked={selectedPlatforms.includes(platform)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            setSelectedPlatforms([...selectedPlatforms, platform]);
                                          } else {
                                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                                          }
                                        }}
                                      />
                                      <label htmlFor={platform} className="text-sm">
                                        {platform}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
                      
                      <Button
                        type="submit"
                        size="sm"
                        className="h-8 px-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CATEGORIES SECTION - Only show in browse mode */}
        {currentTab === 'browse' && (
          <section 
            ref={categoriesRef}
            className="py-16 px-6 relative"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            
            <div className="container mx-auto max-w-6xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-12"
              >
                <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Browse by Category
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Find AI tools organized by their primary use case and functionality.
                </p>
              </motion.div>

              {/* Redesigned Categories - Hexagon/Badge Style */}
              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      // Filter tools by category instead of navigating
                      setSearchQuery('');
                      setSelectedCategory(category.id);
                      if (category.id === 'all') {
                        searchTools('');
                      } else {
                        filterByCategory(category.name);
                      }
                      // Scroll to tools section
                      toolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={categoriesInView ? { 
                      opacity: 1, 
                      scale: 1,
                      rotate: 0
                    } : {}}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Category Badge Container */}
                    <div className="relative">
                      {/* Gradient Background with Animation */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                        style={{
                          background: `linear-gradient(135deg, 
                            ${index % 3 === 0 ? '#3B82F6' : index % 3 === 1 ? '#8B5CF6' : '#EC4899'} 0%, 
                            ${index % 3 === 0 ? '#06B6D4' : index % 3 === 1 ? '#EC4899' : '#F59E0B'} 100%)`
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.6, 0.4]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      
                      {/* Main Category Badge */}
                      <div 
                        className={`relative backdrop-blur-md rounded-2xl shadow-lg px-6 py-4 min-w-[160px] overflow-hidden transition-transform duration-300 border ${
                          selectedCategory === category.id 
                            ? 'bg-blue-600 border-2 border-white scale-105' 
                            : 'bg-white/80 border-white/50'
                        }`}
                      >
                        {/* Animated Pattern Background */}
                        <div className="absolute inset-0 opacity-10">
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 10px,
                                rgba(0,0,0,0.05) 10px,
                                rgba(0,0,0,0.05) 20px
                              )`
                            }}
                          />
                        </div>
                        
                        {/* Icon */}
                        <div className="relative flex justify-center mb-2">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                            style={{
                              background: `linear-gradient(135deg, 
                                ${index % 3 === 0 ? '#3B82F6' : index % 3 === 1 ? '#8B5CF6' : '#EC4899'} 0%, 
                                ${index % 3 === 0 ? '#06B6D4' : index % 3 === 1 ? '#EC4899' : '#F59E0B'} 100%)`
                            }}
                          >
                            <category.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Category Name */}
                        <h3 className={`font-bold text-sm mb-1 relative ${
                          selectedCategory === category.id ? 'text-white' : 'text-gray-800'
                        }`}>
                          {category.name}
                        </h3>
                        
                        {/* Tool Count Badge */}
                        <div className="flex items-center justify-center gap-1">
                          <span className={`text-2xl font-bold ${
                            selectedCategory === category.id 
                              ? 'text-white' 
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                          }`}>
                            {category.count}
                          </span>
                          <span className={`text-xs ${
                            selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                          }`}>tools</span>
                        </div>
                        
                        {/* Hover Indicator */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TOOLS SECTION */}
        <section 
          ref={toolsRef}
          className="py-16 px-6 relative"
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {currentTab === 'browse' 
                    ? (selectedCategory !== 'all' ? `${selectedCategory} Tools` : 'Popular AI Tools')
                    : 'Select Tools to Compare'}
                </h2>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground">
                    {currentTab === 'browse' 
                      ? `${filteredTools.length} tools found`
                      : `Choose up to 3 tools to compare side by side`
                    }
                  </p>
                  {selectedCategory !== 'all' && currentTab === 'browse' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear filter
                    </Button>
                  )}
                </div>
              </div>

              {currentTab === 'browse' && (
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="gap-2"
                  >
                    <Grid3X3 className="w-4 h-4" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="gap-2"
                  >
                    <List className="w-4 h-4" />
                    List
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Tools Grid */}
            {toolsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading tools...</p>
                </div>
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <CircuitBoard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl font-medium text-gray-600 mb-2">No tools found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              <motion.div 
                className={viewMode === 'grid' 
                  ? "grid grid-cols-4 gap-6 pt-8"
                  : "space-y-6 pt-8"
                }
                initial={{ opacity: 0 }}
                animate={toolsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {filteredTools.map((tool, index) => (
                  <ModernToolCard 
                    key={tool.id} 
                    tool={tool} 
                    index={index}
                    onNavigate={onNavigate}
                    showSelectButton={true}
                    isSelected={selectedToolsForComparison.some(t => t.id === tool.id)}
                    onSelect={handleToolSelect}
                  />
                ))}
              </motion.div>
            )}

            {/* Load More Button - Only in browse mode */}
            {currentTab === 'browse' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-12"
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                >
                  Load More Tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* COMPARISON SECTION - Only show in compare mode */}
        {currentTab === 'compare' && (
          <section 
            ref={compareRef}
            className="py-16 px-6 relative"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            
            <div className="container mx-auto max-w-6xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={compareInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-12"
              >
                <div className="text-center mb-8">
                  <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Tool Comparison
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Compare features, pricing, and capabilities side by side to make the best choice for your needs.
                  </p>
                </div>

                {/* Comparison Stats */}
                {selectedToolsForComparison.length > 0 && (
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="w-4 h-4" />
                      <span>{selectedToolsForComparison.length} of 3 tools selected</span>
                    </div>
                    {selectedToolsForComparison.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Scroll to comparison table
                          const comparisonElement = document.getElementById('comparison-table');
                          comparisonElement?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="gap-2"
                      >
                        <GitCompare className="w-4 h-4" />
                        View Comparison
                      </Button>
                    )}
                  </div>
                )}

                {/* Comparison Table */}
                <motion.div
                  id="comparison-table"
                  initial={{ opacity: 0, y: 30 }}
                  animate={compareInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-lg ring-1 ring-border/30"
                >
                  <ComparisonTable 
                    selectedTools={selectedToolsForComparison}
                    onRemoveTool={handleRemoveFromComparison}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
      
      {/* Floating Compare Bar */}
      <AnimatePresence>
        {selectedToolsForComparison.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-full shadow-2xl border border-purple-200 px-6 py-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">
                {selectedToolsForComparison.length} tools selected
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {selectedToolsForComparison.map(tool => (
                <div
                  key={tool.id}
                  className="flex items-center gap-2 bg-purple-100 rounded-full px-3 py-1.5"
                >
                  <span className="text-2xl">{tool.logo}</span>
                  <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                  <button
                    onClick={() => handleRemoveFromComparison(tool.id)}
                    className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              {selectedToolsForComparison.length >= 2 && (
                <motion.button
                  onClick={() => {
                    setIsLoadingCompare(true);
                    setTimeout(() => {
                      setIsCompareModalOpen(true);
                      setIsLoadingCompare(false);
                    }, 3500);
                  }}
                  disabled={isLoadingCompare}
                  className="relative px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={!isLoadingCompare ? { scale: 1.05 } : {}}
                  whileTap={!isLoadingCompare ? { scale: 0.95 } : {}}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center">
                    {isLoadingCompare ? (
                      <>
                        <motion.div
                          className="w-4 h-4 mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </motion.div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <GitCompare className="w-4 h-4 mr-2" />
                        Compare Now
                      </>
                    )}
                  </span>
                </motion.button>
              )}
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedToolsForComparison([])}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoadingCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-md text-center"
            >
              <div className="mb-6">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                >
                  <GitCompare className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Analyzing Tools
                </h3>
                <p className="text-gray-600 mb-4">
                  Comparing features, pricing, and capabilities...
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
                
                {/* Selected Tools Preview */}
                <div className="flex justify-center gap-2 mt-6">
                  {selectedToolsForComparison.slice(0, 3).map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gray-100 rounded-lg p-2"
                    >
                      <span className="text-2xl">{tool.logo}</span>
                    </motion.div>
                  ))}
                  {selectedToolsForComparison.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gray-100 rounded-lg p-2 flex items-center justify-center"
                    >
                      <span className="text-sm font-semibold text-gray-600">
                        +{selectedToolsForComparison.length - 3}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedTools={selectedToolsForComparison}
        onRemoveTool={handleRemoveFromComparison}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </div>
  );
}