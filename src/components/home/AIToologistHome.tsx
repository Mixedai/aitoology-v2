import { useEffect,useRef,useState, } from 'react';

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { 
  TrendingUp, 
  Star, 
  Heart, 
  Share2,
  ArrowRight,
  PenTool,
  Code,
  Palette,
  BarChart3,
  MessageSquare,
  Briefcase,
  Users,
  Award,
  CheckCircle,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Globe,
  Smartphone,
  Calendar,
  Clock,
  Sparkles,
  Brain,
  Rocket,
  Shield,
  Timer,
  Target,
  Plus,
  ChevronDown
} from "lucide-react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { MouseFollowingEyes } from "./MouseFollowingEyes";

interface AIToologistHomeProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
}

// OPTIMIZED: Simplified animation variants for better performance
const slideVariants = {
  // Hero - Simplified entrance
  heroEntrance: {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },

  // OPTIMIZED: Simplified scroll animations
  scrollDown: {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },
  
  scrollUp: {
    hidden: { 
      opacity: 0, 
      y: -40,
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }
};

// OPTIMIZED: Simplified stagger containers
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.6
    }
  }
};

// OPTIMIZED: Simplified item animations
const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

// OPTIMIZED: Simplified scroll indicator
const scrollIndicatorVariants = {
  animate: {
    y: [0, 8, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function AIToologistHome({ onNavigate }: AIToologistHomeProps) {
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [typedText, setTypedText] = useState('');
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const toolsRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredRef = useRef(null);
  const newsRef = useRef(null);
  const ctaRef = useRef(null);

  // OPTIMIZED: More conservative scroll tracking
  const { scrollY, scrollYProgress } = useScroll();
  
  // OPTIMIZED: Reduced transform calculations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.99]);

  // Scroll direction detection - throttled
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const direction = latest > previous ? 'down' : 'up';
    
    if (direction !== scrollDirection) {
      setScrollDirection(direction);
    }
  });

  // OPTIMIZED: Conservative in-view settings
  const heroInView = useInView(heroRef, { once: true, margin: "0px 0px -10% 0px" });
  const toolsInView = useInView(toolsRef, { once: true, margin: "0px 0px -20% 0px" });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "0px 0px -20% 0px" });
  const featuredInView = useInView(featuredRef, { once: true, margin: "0px 0px -20% 0px" });
  const newsInView = useInView(newsRef, { once: true, margin: "0px 0px -20% 0px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "0px 0px -20% 0px" });

  // Page load optimization
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Function to get animation variant based on scroll direction
  const getAnimationVariant = (downVariant: string, upVariant: string) => {
    return scrollDirection === 'down' ? downVariant : upVariant;
  };

  // OPTIMIZED: Simpler typewriter effect
  const fullText = "Discover the Perfect AI Tool for Every Task";
  useEffect(() => {
    if (!heroInView) return;
    
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setTypedText(fullText);
      }
    }, 50); // Slightly faster for better UX

    return () => clearInterval(timer);
  }, [heroInView]);

  // Mock data
  const trendingTools = [
    {
      id: 'chatgpt',
      name: "ChatGPT",
      description: "AI-powered conversational assistant for writing and analysis",
      category: "Writing",
      rating: 4.8,
      users: "100M+",
      pricing: "Freemium",
      logo: "🤖",
      trending: true,
      growth: "+15%"
    },
    {
      id: 'midjourney',
      name: "Midjourney",
      description: "AI image generation from text descriptions",
      category: "Design",
      rating: 4.6,
      users: "15M+",
      pricing: "Paid",
      logo: "🎨",
      trending: true,
      growth: "+28%"
    },
    {
      id: 'github-copilot',
      name: "GitHub Copilot",
      description: "AI pair programmer for faster coding",
      category: "Coding",
      rating: 4.7,
      users: "5M+",
      pricing: "Paid",
      logo: "💻",
      trending: true,
      growth: "+45%"
    }
  ];

  const categories = [
    {
      name: "Writing",
      icon: PenTool,
      count: 127,
      description: "Content creation, copywriting, and text generation",
      color: "bg-blue-500"
    },
    {
      name: "Design",
      icon: Palette,
      count: 89,
      description: "Image generation, graphic design, and visual content",
      color: "bg-purple-500"
    },
    {
      name: "Coding",
      icon: Code,
      count: 76,
      description: "Code generation, debugging, and development assistance",
      color: "bg-green-500"
    },
    {
      name: "Analytics",
      icon: BarChart3,
      count: 54,
      description: "Data analysis, insights, and business intelligence",
      color: "bg-orange-500"
    },
    {
      name: "Communication",
      icon: MessageSquare,
      count: 43,
      description: "Chatbots, customer service, and conversation AI",
      color: "bg-pink-500"
    },
    {
      name: "Business",
      icon: Briefcase,
      count: 68,
      description: "Automation, workflow optimization, and productivity",
      color: "bg-indigo-500"
    }
  ];

  const featuredTools = [
    {
      id: 'chatgpt',
      name: "GPT-4 Turbo",
      description: "OpenAI's latest language model with improved reasoning and multimodal capabilities",
      category: "Writing",
      badge: "Editor's Choice",
      rating: 4.9,
      pricing: "Paid",
      features: ["128k context", "Multimodal", "JSON mode"],
      logo: "🚀",
      stats: { users: "100M+", satisfaction: "98%" }
    },
    {
      id: 'midjourney',
      name: "DALL-E 3",
      description: "Advanced AI image generator with unprecedented creativity and adherence to prompts",
      category: "Design",
      badge: "New Release",
      rating: 4.7,
      pricing: "Paid",
      features: ["1024x1024", "Prompt adherence", "Creative control"],
      logo: "🎨",
      stats: { users: "15M+", satisfaction: "95%" }
    },
    {
      id: 'github-copilot',
      name: "GitHub Copilot",
      description: "AI-first code editor that understands your codebase and helps you ship faster",
      category: "Coding",
      badge: "Rising Star",
      rating: 4.8,
      pricing: "Freemium",
      features: ["Codebase chat", "Auto-complete", "Refactoring"],
      logo: "⚡",
      stats: { users: "5M+", satisfaction: "97%" }
    }
  ];

  const latestNews = [
    {
      id: 1,
      title: "OpenAI Announces GPT-4 Turbo with 128K Context Window",
      excerpt: "OpenAI's latest model offers improved performance and significantly expanded context length, enabling more comprehensive document analysis and conversation.",
      category: "Product Update",
      date: "2024-01-15",
      readTime: "3 min read",
      trending: true
    },
    {
      id: 2,
      title: "Google's Gemini Pro Outperforms GPT-4 in Multimodal Tasks", 
      excerpt: "New benchmarks show Google's latest AI model excelling at understanding images, video, and text simultaneously, marking a significant advancement.",
      category: "AI Research",
      date: "2024-01-12",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "EU AI Act: New Regulations Impact Tool Development",
      excerpt: "The European Union's comprehensive AI legislation sets new standards for AI tool development, transparency, and safety requirements across the industry.",
      category: "Industry",
      date: "2024-01-10",
      readTime: "4 min read"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Industry':
        return 'bg-blue-500 text-white';
      case 'Product Update':
        return 'bg-green-500 text-white';
      case 'AI Research':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Event handlers
  const handleBrowseAllTools = () => {
    if (onNavigate) {
      onNavigate('home', 'explore-frame');
    }
  };

  const handleSubmitTool = () => {
    if (onNavigate) {
      onNavigate('home', 'submit');
    }
  };

  const handleToolClick = (tool: any) => {
    if (onNavigate) {
      onNavigate('home', 'tool-detail', { toolId: tool.id, toolName: tool.name });
    }
  };

  const handleCategoryClick = (category: any) => {
    if (onNavigate) {
      onNavigate('home', 'explore-frame', { category: category.name });
    }
  };

  const handleNewsClick = (article: any) => {
    if (onNavigate) {
      onNavigate('home', 'news-detail', { articleId: article.id });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const handleScrollDown = () => {
    toolsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* OPTIMIZED BACKGROUND SYSTEM - Simplified for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static gradient background - no animations for better performance */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(70, 92, 136, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, #E9E3DF 0%, #F0EAE6 50%, #E5DDD7 100%)
            `
          }}
        />

        {/* OPTIMIZED: Minimal floating elements - only if page is loaded */}
        {isPageLoaded && (
          <>
            <motion.div
              className="absolute top-1/4 right-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="absolute bottom-1/3 left-1/5 w-20 h-20 bg-secondary/5 rounded-2xl blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}

        {/* Subtle static pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(70, 92, 136, 0.2) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* HERO SECTION - OPTIMIZED */}
        <motion.section 
          ref={heroRef}
          className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6"
          style={{ 
            willChange: 'transform, opacity',
            opacity: heroOpacity,
            scale: heroScale
          }}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={slideVariants.heroEntrance}
        >
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.div 
              className="space-y-8 md:space-y-12"
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <div className="space-y-8">
                {/* Interactive Eyes - Above Badge */}
                <motion.div
                  variants={staggerItem}
                  className="flex justify-center"
                >
                  <MouseFollowingEyes 
                    size="lg"
                    animated={true}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="flex justify-center"
                >
                  <Badge variant="secondary" className="w-fit gap-2 px-4 py-2 text-base backdrop-blur-sm bg-white/60">
                    <TrendingUp className="h-4 w-4" />
                    Discover the Best AI Tools
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight max-w-4xl mx-auto"
                  style={{ color: '#465C88' }}
                  variants={staggerItem}
                >
                  {typedText}
                  <motion.span
                    className="inline-block w-1.5 h-12 md:h-16 bg-primary ml-3"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                  variants={staggerItem}
                >
                  Compare, review, and find the best AI tools to supercharge your workflow. 
                  From writing assistants to image generators, we've got you covered.
                </motion.p>
              </div>

              {/* Enhanced Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                variants={staggerItem}
              >
                <Button 
                  onClick={handleBrowseAllTools}
                  className="gap-3 h-16 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Sparkles className="h-6 w-6" />
                  Browse All Tools
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleSubmitTool}
                  className="gap-3 h-16 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white/20 hover:bg-white/30"
                  size="lg"
                >
                  <Plus className="h-6 w-6" />
                  Submit Tool
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            variants={scrollIndicatorVariants}
            animate="animate"
            onClick={handleScrollDown}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </motion.div>
        </motion.section>

        {/* TRENDING TOOLS SECTION - UPDATED WITH #465C88 BACKGROUND */}
        <motion.section 
          ref={toolsRef}
          className="py-24 px-6 relative"
          style={{ backgroundColor: '#465C88' }}
          initial="hidden"
          animate={toolsInView ? "visible" : "hidden"}
          variants={slideVariants[getAnimationVariant('scrollDown', 'scrollUp')]}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={staggerItem}
            >
              <h2 className="mb-6 text-white">🔥 Trending Tools</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Most popular AI tools this week
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={toolsInView ? "visible" : "hidden"}
            >
              {trendingTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  variants={staggerItem}
                  className="group cursor-pointer"
                  onClick={() => handleToolClick(tool)}
                  whileHover={{ 
                    scale: 1.03, 
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-background/95 via-white/85 to-muted/60 backdrop-blur-sm">
                    <CardHeader className="space-y-6 p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl transform transition-transform group-hover:scale-110">{tool.logo}</div>
                          <div>
                            <h3 className="group-hover:text-primary transition-colors text-xl">
                              {tool.name}
                            </h3>
                            <Badge variant="secondary" className="mt-2">
                              {tool.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                          <TrendingUp className="h-4 w-4" />
                          {tool.growth}
                        </div>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-base leading-relaxed">
                        {tool.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium">{tool.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{tool.users} users</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-sm">{tool.pricing}</Badge>
                        <ArrowRight className="h-5 w-5 text-primary transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CATEGORIES SECTION - OPTIMIZED */}
        <motion.section 
          ref={categoriesRef}
          className="py-24 px-6 relative bg-muted/20"
          initial="hidden"
          animate={categoriesInView ? "visible" : "hidden"}
          variants={slideVariants[getAnimationVariant('scrollDown', 'scrollUp')]}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={staggerItem}
            >
              <h2 className="mb-6">Explore by Category</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Find the perfect AI tool for your specific needs across different categories
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={categoriesInView ? "visible" : "hidden"}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={staggerItem}
                  className="group cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                  whileHover={{ 
                    scale: 1.03, 
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-background/95 via-white/85 to-muted/60 backdrop-blur-sm">
                    <CardHeader className="space-y-6 p-8">
                      <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <category.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="group-hover:text-primary transition-colors text-xl">
                            {category.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {category.count} tools
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* FEATURED TOOLS SECTION - OPTIMIZED */}
        <motion.section 
          ref={featuredRef}
          className="py-24 px-6 relative bg-background/50"
          initial="hidden"
          animate={featuredInView ? "visible" : "hidden"}
          variants={slideVariants[getAnimationVariant('scrollDown', 'scrollUp')]}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={staggerItem}
            >
              <h2 className="mb-6">⭐ Featured Tools</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Editor's picks and breakthrough AI tools making waves in the industry
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
            >
              {featuredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  variants={staggerItem}
                  className="group cursor-pointer"
                  onClick={() => handleToolClick(tool)}
                  whileHover={{ 
                    scale: 1.02, 
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-background/95 via-white/85 to-muted/60 backdrop-blur-sm">
                    <CardHeader className="space-y-6 p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl transform transition-transform group-hover:scale-110">{tool.logo}</div>
                          <div>
                            <Badge className="mb-2" variant={tool.badge === "Editor's Choice" ? "default" : "secondary"}>
                              {tool.badge}
                            </Badge>
                            <h3 className="group-hover:text-primary transition-colors text-xl">
                              {tool.name}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{tool.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6 p-8 pt-0">
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>{tool.stats.users} • {tool.stats.satisfaction} satisfaction</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* AI NEWS SECTION - OPTIMIZED */}
        <motion.section 
          ref={newsRef}
          className="py-24 px-6 relative bg-accent/20"
          initial="hidden"
          animate={newsInView ? "visible" : "hidden"}
          variants={slideVariants[getAnimationVariant('scrollDown', 'scrollUp')]}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div 
              className="text-center mb-16"
              variants={staggerItem}
            >
              <h2 className="mb-6">📰 Latest AI News</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Stay updated with the latest developments in artificial intelligence
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={newsInView ? "visible" : "hidden"}
            >
              {latestNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={staggerItem}
                  className="group cursor-pointer"
                  onClick={() => handleNewsClick(article)}
                  whileHover={{ 
                    scale: 1.02, 
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-400 hover:-translate-y-1 border-0 bg-gradient-to-br from-background/95 via-white/85 to-muted/60 backdrop-blur-sm">
                    <CardHeader className="space-y-4 p-6">
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                        {article.trending && (
                          <Badge variant="outline" className="text-xs gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <h3 className="group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA SECTION - OPTIMIZED */}
        <motion.section 
          ref={ctaRef}
          className="py-24 px-6 relative bg-primary/5"
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={slideVariants[getAnimationVariant('scrollDown', 'scrollUp')]}
        >
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
            >
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl"
                variants={staggerItem}
              >
                Ready to Transform Your Workflow?
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                variants={staggerItem}
              >
                Join thousands of professionals who use AI Toologist to discover and compare the best AI tools for their projects.
              </motion.p>

              <motion.form 
                onSubmit={handleEmailSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                variants={staggerItem}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button type="submit" className="px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </motion.form>
              
              <motion.p 
                className="text-sm text-muted-foreground"
                variants={staggerItem}
              >
                No spam, unsubscribe at any time
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}