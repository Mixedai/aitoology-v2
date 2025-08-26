import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  ArrowRight,
  Tag,
  Bookmark,
  Share2,
  ExternalLink,
  Zap,
  Brain,
  Cpu,
  Network,
  Boxes,
  CircuitBoard,
  Bot,
  Sparkles,
  FileText,
  Globe,
  MessageCircle,
  Star,
  Award,
  BookOpen,
  Mail,
  CheckCircle
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface NewsFrameProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  className?: string;
}

// Enhanced News Card
const NewsCard = ({ 
  article, 
  index,
  onNavigate,
  featured = false
}: { 
  article: any; 
  index: number;
  onNavigate?: (from: string, to: string, params?: any) => void;
  featured?: boolean;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleCardClick = () => {
    onNavigate?.('news', 'news-detail', { 
      article_id: article.id, 
      article 
    });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle bookmark logic
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle share logic
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        className="relative overflow-hidden bg-white/75 backdrop-blur-lg ring-1 ring-border/40 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl group cursor-pointer h-full"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`Read article: ${article.title}`}
      >
        {/* Image/Header - Smaller */}
        <div className={`relative overflow-hidden ${featured ? 'h-40 lg:h-48' : 'h-32'}`}>
          <ImageWithFallback
            src={article.image || '/api/placeholder/600/400'}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          
          {/* Category badge - Smaller */}
          <div className="absolute top-2 left-2">
            <Badge 
              className={`text-[10px] px-1.5 py-0.5 text-white border-white/20 ${
                article.category === 'Breaking' 
                  ? 'bg-red-500/80' 
                  : article.category === 'AI Research'
                  ? 'bg-blue-500/80'
                  : article.category === 'Product Updates'
                  ? 'bg-green-500/80'
                  : 'bg-primary/80'
              }`}
            >
              {article.category}
            </Badge>
          </div>

          {/* Reading time - Smaller */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-sm rounded px-1.5 py-0.5">
              <Clock className="w-2.5 h-2.5 text-white" />
              <span className="text-[10px] text-white">{article.readTime}</span>
            </div>
          </div>

          {/* Featured label */}
          {featured && (
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1 bg-primary/80 backdrop-blur-sm rounded-lg px-3 py-1">
                <Star className="w-3 h-3 text-white fill-white" />
                <span className="text-xs text-white font-medium">Featured</span>
              </div>
            </div>
          )}

          {/* Action buttons - Smaller */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleBookmark}
              className="w-6 h-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 p-0"
            >
              <Bookmark className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleShare}
              className="w-6 h-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 p-0"
            >
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Content - Smaller padding */}
        <div className="p-3 space-y-2">
          {/* Meta info - Smaller */}
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Calendar className="w-2.5 h-2.5" />
                {article.publishedAt}
              </div>
              <div className="flex items-center gap-0.5">
                <Users className="w-2.5 h-2.5" />
                {article.views}
              </div>
            </div>
            {article.trending && (
              <div className="flex items-center gap-0.5 text-orange-500">
                <TrendingUp className="w-2.5 h-2.5" />
                <span className="text-[10px]">Trending</span>
              </div>
            )}
          </div>

          {/* Title and Excerpt */}
          <div className="space-y-1">
            <h3 className={`line-clamp-2 group-hover:text-primary transition-colors duration-300 ${
              featured ? 'text-base lg:text-lg font-semibold' : 'text-sm font-semibold'
            }`}>
              {article.title}
            </h3>
            <p className={`text-muted-foreground leading-relaxed ${
              featured ? 'line-clamp-2 text-sm' : 'line-clamp-2 text-xs'
            }`}>
              {article.excerpt}
            </p>
          </div>

          {/* Author and Tags */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Avatar className="w-5 h-5">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback className="text-[10px]">{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">{article.author.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
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

// Newsletter Signup Card
const NewsletterCard = ({ 
  index 
}: { 
  index: number; 
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
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
    >
      <Card className="relative p-4 h-full bg-gradient-to-br from-primary to-secondary text-white rounded-xl overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />

        <div className="relative space-y-3">
          {/* Icon */}
          <motion.div 
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
            whileHover={{ 
              scale: 1.05,
              rotate: 2
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Mail className="w-5 h-5 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">Stay Updated</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Get the latest AI news, tool updates, and insights delivered to your inbox weekly.
            </p>
          </div>

          {/* Newsletter form */}
          <form onSubmit={handleSubscribe} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubscribed}
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Subscribed!
                </>
              ) : (
                'Subscribe to Newsletter'
              )}
            </Button>
          </form>

          <p className="text-xs text-white/60">
            Join 50,000+ AI enthusiasts. Unsubscribe anytime.
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export function NewsFrame({ onNavigate, className = "" }: NewsFrameProps) {
  const { scrollYProgress } = useScroll();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [activeTab, setActiveTab] = useState('all');

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const newsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const newsInView = useInView(newsRef, { once: true, margin: "-100px" });

  // Mock news data
  const mockNews = [
    {
      id: 'openai-gpt5-announcement',
      title: 'OpenAI Announces GPT-5: The Next Generation of AI Language Models',
      excerpt: 'OpenAI unveils GPT-5 with groundbreaking capabilities in reasoning, multimodal understanding, and reduced hallucinations. The new model promises to revolutionize AI applications across industries.',
      category: 'Breaking',
      author: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/40/40'
      },
      publishedAt: '2 hours ago',
      readTime: '5 min read',
      views: '12.5K',
      trending: true,
      tags: ['OpenAI', 'GPT-5', 'LLM', 'AI Research'],
      image: '/api/placeholder/800/400'
    },
    {
      id: 'midjourney-v7-features',
      title: 'Midjourney V7 Introduces Revolutionary 3D Generation Capabilities',
      excerpt: 'The latest update to Midjourney brings native 3D object generation, allowing users to create stunning three-dimensional art and designs directly from text prompts.',
      category: 'Product Updates',
      author: {
        name: 'Marcus Rodriguez',
        avatar: '/api/placeholder/40/40'
      },
      publishedAt: '6 hours ago',
      readTime: '4 min read',
      views: '8.3K',
      trending: true,
      tags: ['Midjourney', '3D Generation', 'AI Art'],
      image: '/api/placeholder/800/400'
    },
    {
      id: 'ai-ethics-framework',
      title: 'New Global Framework for AI Ethics Gets Industry-Wide Support',
      excerpt: 'Leading tech companies unite behind comprehensive ethical guidelines for AI development, focusing on transparency, fairness, and responsible deployment.',
      category: 'AI Research',
      author: {
        name: 'Dr. Emily Watson',
        avatar: '/api/placeholder/40/40'
      },
      publishedAt: '1 day ago',
      readTime: '7 min read',
      views: '15.2K',
      trending: false,
      tags: ['AI Ethics', 'Industry', 'Governance'],
      image: '/api/placeholder/800/400'
    },
    {
      id: 'github-copilot-enterprise',
      title: 'GitHub Copilot Enterprise Launches with Advanced Code Generation',
      excerpt: 'GitHub unveils enterprise-grade Copilot with enhanced security, custom model training, and advanced code review capabilities for large organizations.',
      category: 'Product Updates',
      author: {
        name: 'David Kim',
        avatar: '/api/placeholder/40/40'
      },
      publishedAt: '2 days ago',
      readTime: '6 min read',
      views: '9.7K',
      trending: false,
      tags: ['GitHub Copilot', 'Enterprise', 'Coding'],
      image: '/api/placeholder/800/400'
    },
    {
      id: 'ai-market-trends-2024',
      title: '2024 AI Market Trends: What to Expect in the Coming Year',
      excerpt: 'Comprehensive analysis of emerging AI trends, market predictions, and investment opportunities that will shape the artificial intelligence landscape in 2024.',
      category: 'Industry Analysis',
      author: {
        name: 'Lisa Zhang',
        avatar: '/api/placeholder/40/40'
      },
      publishedAt: '3 days ago',
      readTime: '10 min read',
      views: '22.1K',
      trending: false,
      tags: ['Market Trends', 'Investment', 'Predictions'],
      image: '/api/placeholder/800/400'
    },
    {
      id: 'claude-3-benchmarks',
      title: 'Claude 3 Sets New Benchmarks in AI Safety and Performance',
      excerpt: 'Anthropic\'s latest model demonstrates superior performance in safety evaluations while maintaining competitive capabilities across diverse AI tasks.',
      category: 'AI Research',
      author: {
        name: 'Alex Johnson',
        avatar: '/api/placeholder/40/40'
      },
      publishedAt: '4 days ago',
      readTime: '8 min read',
      views: '11.4K',
      trending: false,
      tags: ['Claude', 'AI Safety', 'Benchmarks'],
      image: '/api/placeholder/800/400'
    }
  ];

  // Filter news based on search and filters
  const filteredNews = mockNews.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'trending' && article.trending) ||
                      (activeTab === 'breaking' && article.category === 'Breaking') ||
                      (activeTab === 'research' && article.category === 'AI Research');

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Sort news
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'trending') {
      return Number(b.trending) - Number(a.trending);
    }
    if (sortBy === 'popular') {
      return parseInt(b.views.replace('K', '000').replace('.', '')) - parseInt(a.views.replace('K', '000').replace('.', ''));
    }
    return 0; // Default to order as-is for 'latest'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Dynamic Base Gradient */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(251, 146, 60, 0.15) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%),
            linear-gradient(135deg, 
              #fefbff 0%, 
              #fef7ed 25%, 
              #eff6ff 75%, 
              #f0f9ff 100%
            )
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(251, 146, 60, 0.15) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%),
             linear-gradient(135deg, #fefbff 0%, #fef7ed 25%, #eff6ff 75%, #f0f9ff 100%)`,
            `radial-gradient(circle at 25% 35%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 75% 65%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
             linear-gradient(135deg, #fefbff 0%, #fef7ed 25%, #eff6ff 75%, #f0f9ff 100%)`
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Layer 2: Grid Pattern */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px)
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
          className="absolute -left-24 top-1/5 w-64 h-64 rounded-full blur-3xl opacity-30"
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
          className="absolute -right-20 bottom-1/4 w-56 h-56 rounded-full blur-3xl opacity-25"
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
          className="absolute left-1/4 top-1/3 w-48 h-48 rounded-full blur-3xl opacity-20"
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

      {/* Layer 4: News Tech Shapes */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        {[
          { Icon: FileText, position: "top-1/6 left-1/5", delay: 0, duration: 16 },
          { Icon: Globe, position: "top-1/4 right-1/4", delay: 2, duration: 14 },
          { Icon: MessageCircle, position: "bottom-1/3 left-1/4", delay: 4, duration: 18 },
          { Icon: BookOpen, position: "bottom-1/6 right-1/3", delay: 6, duration: 12 },
          { Icon: TrendingUp, position: "top-1/2 right-1/2", delay: 8, duration: 20 }
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
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="text-blue-600">AI News</span>
                <span className="text-gray-400"> & </span>
                <span className="text-purple-600">Updates</span>
              </motion.h1>
              
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-semibold">
                  <span className="text-gray-700">Stay informed with the latest </span>
                  <span className="text-blue-600 font-bold">developments</span>
                  <span className="text-gray-700"> in artificial intelligence, </span>
                  <span className="text-purple-600 font-bold">product updates</span>
                  <span className="text-gray-700">, </span>
                  <span className="text-cyan-600 font-bold">industry analysis</span>
                  <span className="text-gray-700">, and </span>
                  <span className="text-pink-600 font-bold">breakthrough research</span>
                  <span className="text-gray-700">.</span>
                </p>
                
                {/* Stats badges */}
                <div className="flex justify-center items-center gap-4 mt-6">
                  <motion.div 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600">Global Coverage</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-600">Real-time Updates</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-50 to-pink-100 px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Award className="w-4 h-4 text-pink-600" />
                    <span className="text-sm font-semibold text-pink-600">Expert Analysis</span>
                  </motion.div>
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
                      placeholder="Search news, topics, or companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-lg ring-1 ring-border/40 hover:ring-primary/50 focus:ring-primary rounded-2xl shadow-lg border-0 transition-all duration-300"
                      aria-label="Search for news articles"
                    />
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* NEWS SECTION */}
        <section 
          ref={newsRef}
          className="py-16 px-6 relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={newsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Filters and Tabs */}
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white/60 backdrop-blur-sm">
                    <TabsTrigger value="all">All News</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="breaking">Breaking</TabsTrigger>
                    <TabsTrigger value="research">Research</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 bg-white/60 backdrop-blur-sm">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Breaking">Breaking News</SelectItem>
                      <SelectItem value="Product Updates">Product Updates</SelectItem>
                      <SelectItem value="AI Research">AI Research</SelectItem>
                      <SelectItem value="Industry Analysis">Industry Analysis</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-white/60 backdrop-blur-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {sortedNews.length} article{sortedNews.length !== 1 ? 's' : ''} found
                </p>
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="gap-2"
                  >
                    Clear search
                  </Button>
                )}
              </div>

              {/* News Grid - All cards same size */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {sortedNews.map((article, index) => (
                  <NewsCard 
                    key={article.id} 
                    article={article} 
                    index={index}
                    onNavigate={onNavigate}
                    featured={false}
                  />
                ))}
              </div>

              {/* Empty State */}
              {sortedNews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setActiveTab('all');
                    }}
                    className="bg-white/60 backdrop-blur-sm"
                  >
                    Clear all filters
                  </Button>
                </motion.div>
              )}

              {/* Load More */}
              {sortedNews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center pt-8"
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  >
                    Load More Articles
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}