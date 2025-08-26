import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Users, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink,
  Sparkles,
  SortAsc,
  Brain,
  Cpu,
  Network,
  Zap,
  Bot,
  Boxes,
  CircuitBoard,
  Palette,
  ArrowRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { toast } from 'sonner@2.0.3';

// Import mock data
import { getAllTools, getCategories, searchTools, getToolsByCategory, MockTool } from '../../data/mockTools';

// Import analytics
import { analyticsEvents } from '../../utils/analytics';

interface ExploreProps {
  onNavigate?: (from: string, to: string, params?: any) => void;
  className?: string;
}

// Enhanced Category Card with modern design
const ModernCategoryCard = ({ 
  category, 
  index, 
  isSelected,
  onSelect 
}: { 
  category: any; 
  index: number; 
  isSelected: boolean;
  onSelect: (id: string) => void;
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
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card 
        className={`relative p-6 h-full bg-white/70 backdrop-blur-lg ring-1 transition-all duration-300 rounded-2xl group cursor-pointer overflow-hidden ${
          isSelected 
            ? 'ring-primary/60 shadow-xl bg-white/80' 
            : 'ring-border/30 shadow-lg hover:shadow-xl'
        }`}
        onClick={() => onSelect(category.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(category.id);
          }
        }}
        aria-label={`Filter by ${category.name}`}
        aria-pressed={isSelected}
      >
        {/* Gradient glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="relative text-center space-y-4">
          {/* Icon with gradient background */}
          <motion.div 
            className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center shadow-lg ${
              isSelected 
                ? 'bg-gradient-to-br from-primary to-secondary' 
                : 'bg-gradient-to-br from-primary/80 via-secondary/80 to-indigo-600/80'
            }`}
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              boxShadow: "0 20px 25px -5px rgba(255, 107, 53, 0.3)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {category.icon ? (
              <category.icon className="w-6 h-6 text-white" />
            ) : (
              <span className="text-lg">{category.iconEmoji || '🔧'}</span>
            )}
          </motion.div>
          
          <div className="space-y-2">
            <h3 className={`transition-colors duration-300 ${
              isSelected ? 'text-primary' : 'group-hover:text-primary'
            }`}>
              {category.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {category.toolCount} tools
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

// Enhanced Tool Card with modern design
const ModernToolCard = ({ 
  tool, 
  index, 
  viewMode,
  isBookmarked,
  onToolClick,
  onBookmark 
}: { 
  tool: MockTool; 
  index: number; 
  viewMode: 'grid' | 'list';
  isBookmarked: boolean;
  onToolClick: (tool: MockTool) => void;
  onBookmark: (toolId: number) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-30px" });

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ 
          duration: 0.5,
          delay: index * 0.05,
          ease: "easeOut"
        }}
        whileHover={{ 
          x: 4,
          transition: { duration: 0.2 }
        }}
      >
        <Card 
          className="relative overflow-hidden bg-white/75 backdrop-blur-lg ring-1 ring-border/40 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
          onClick={() => onToolClick(tool)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToolClick(tool);
            }
          }}
          aria-label={`View details for ${tool.name}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="text-4xl flex-shrink-0">{tool.logo}</div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="group-hover:text-primary transition-colors duration-300 truncate">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {tool.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{tool.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{tool.users}</span>
                      </div>
                      <span className="text-primary font-medium">{tool.pricing}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(tool.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100"
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-primary" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

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
  }

  // Grid view
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card 
        className="relative overflow-hidden bg-white/75 backdrop-blur-lg ring-1 ring-border/40 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer h-full"
        onClick={() => onToolClick(tool)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToolClick(tool);
          }
        }}
        aria-label={`View details for ${tool.name}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="text-3xl flex-shrink-0">{tool.logo}</div>
              <div className="flex-1 min-w-0">
                <CardTitle className="group-hover:text-primary transition-colors truncate">
                  {tool.name}
                </CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">
                  {tool.category}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(tool.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 flex-shrink-0"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-2">
            {tool.description}
          </CardDescription>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{tool.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{tool.users}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{tool.pricing}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

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

export function Explore({ onNavigate, className = "" }: ExploreProps) {
  const { scrollYProgress } = useScroll();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarkedTools, setBookmarkedTools] = useState<Set<number>>(new Set([2, 4]));
  const [displayedTools, setDisplayedTools] = useState(getAllTools().slice(0, 12));
  const [isLoading, setIsLoading] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const toolsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "-50px" });

  // Focus search on "/" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBookmark = (toolId: number) => {
    setBookmarkedTools(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
        toast.success('Removed from bookmarks');
      } else {
        newSet.add(toolId);
        toast.success('Added to bookmarks');
      }
      return newSet;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Simulate category filtering
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const categoryName = categoryId === 'all' ? 'All Categories' : categoryId;
      toast.success(`Filtered by ${categoryName}`);
    }, 500);
  };

  const handleToolClick = (tool: MockTool) => {
    // Add validation for tool parameter
    if (!tool || !tool.id) {
      console.error('Explore: Invalid tool passed to handleToolClick:', tool);
      return;
    }

    // Track analytics event for tool card click
    analyticsEvents.toolCardClick(
      tool.id, // Use the slug ID from toolsData
      tool.name, 
      'explore'
    );
    
    // Add validation for onNavigate
    if (!onNavigate) {
      console.error('Explore: onNavigate not available for tool navigation');
      return;
    }
    
    // Navigate to tool detail
    onNavigate('explore', 'tool-detail', { 
      tool_id: tool.id, // Use slug ID like "chatgpt", "midjourney", etc.
      toolId: tool.id, // For backward compatibility
      tool: tool // Pass full tool object
    });
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more tools
    setTimeout(() => {
      setDisplayedTools(prev => [...prev, ...getAllTools().slice(0, 6)]);
      setIsLoading(false);
      toast.success('Loaded more tools');
    }, 1000);
  };

  // Create categories data for display with proper icons
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Chatbot': Brain,
      'Image Generation': Palette,
      'Productivity': Zap,
      'Research': Network,
      'Code Assistant': Cpu,
      'Creative AI': Sparkles,
      'Automation': Bot
    };
    return iconMap[category] || Boxes;
  };

  const categoriesData = [
    {
      id: 'all',
      name: 'All Categories',
      toolCount: getAllTools().length,
      icon: Sparkles,
      iconEmoji: '✨'
    },
    ...getCategories().map(cat => ({
      id: cat.toLowerCase().replace(/\s+/g, '-'),
      name: cat,
      toolCount: getToolsByCategory(cat).length,
      icon: getCategoryIcon(cat)
    }))
  ];

  const filteredTools = displayedTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           tool.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
                           tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Dynamic Base Gradient */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 75% 65%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
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
            `radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 75% 65%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
             linear-gradient(135deg, #fef7ed 0%, #fef2f2 25%, #eff6ff 75%, #eef2ff 100%)`,
            `radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 70% 60%, rgba(251, 146, 60, 0.25) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 70%),
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
        <motion.div
          className="absolute -left-24 top-1/5 w-72 h-72 rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -right-20 top-1/3 w-64 h-64 rounded-full blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, rgba(244, 63, 94, 0.2) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -25, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        <motion.div
          className="absolute left-1/4 bottom-1/4 w-56 h-56 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 15, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
      </motion.div>

      {/* Layer 4: AI Tech Shapes */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        {[
          { Icon: Brain, position: "top-1/6 left-1/5", delay: 0, duration: 16 },
          { Icon: Cpu, position: "top-1/4 right-1/4", delay: 2, duration: 14 },
          { Icon: Network, position: "bottom-1/3 left-1/3", delay: 4, duration: 18 },
          { Icon: Bot, position: "bottom-1/6 right-1/3", delay: 6, duration: 12 },
          { Icon: Sparkles, position: "top-1/2 left-1/2", delay: 8, duration: 20 },
          { Icon: Palette, position: "top-1/8 right-1/2", delay: 10, duration: 15 }
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
        {/* Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Skip to main content
        </a>

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
                Find Your Perfect AI Tool in Seconds
              </motion.h1>
              <motion.p 
                className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Browse our curated collection of 1000+ AI tools across every category. Compare features, read authentic reviews, and discover the tools that will transform your workflow. From conversational AI to image generation, find exactly what you need with smart filtering and personalized recommendations.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search tools and categories... (Press / to focus)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-lg ring-1 ring-border/40 hover:ring-primary/50 focus:ring-primary rounded-2xl shadow-lg border-0 transition-all duration-300"
                    aria-label="Search tools and categories"
                  />
                </div>
              </motion.div>

              {/* Filter Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/60 backdrop-blur-sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="alphabetical">A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-lg p-1 bg-white/60 backdrop-blur-sm">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section 
          ref={categoriesRef}
          className="py-16 px-6 relative"
          aria-labelledby="categories-heading"
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
              <h2 id="categories-heading" className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Browse by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover AI tools organized by their primary use case and functionality.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categoriesData.map((category, index) => (
                <ModernCategoryCard 
                  key={category.id} 
                  category={category} 
                  index={index}
                  isSelected={selectedCategory === category.id}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS SECTION */}
        <section 
          ref={toolsRef}
          className="py-16 px-6 relative"
          aria-labelledby="tools-heading"
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
                <h2 id="tools-heading" className="mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {selectedCategory === 'all' ? 'Featured Tools' : `${categoriesData.find(c => c.id === selectedCategory)?.name} Tools`}
                </h2>
                <p className="text-muted-foreground">
                  {filteredTools.length} tools found
                </p>
              </div>
              
              {selectedCategory !== 'all' && (
                <Button 
                  variant="outline" 
                  onClick={() => handleCategorySelect('all')}
                  className="bg-white/60 backdrop-blur-sm"
                >
                  Clear Filter
                </Button>
              )}
            </motion.div>

            {/* Tools Grid/List */}
            <motion.div 
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }`}
              initial={{ opacity: 0 }}
              animate={toolsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {filteredTools.map((tool, index) => (
                <ModernToolCard 
                  key={tool.id} 
                  tool={tool} 
                  index={index}
                  viewMode={viewMode}
                  isBookmarked={bookmarkedTools.has(tool.id)}
                  onToolClick={handleToolClick}
                  onBookmark={handleBookmark}
                />
              ))}
            </motion.div>

            {/* Load More Button */}
            {filteredTools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={toolsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-12"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading more tools...
                    </>
                  ) : (
                    <>
                      Load More Tools
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Empty State */}
            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="bg-white/60 backdrop-blur-sm"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}