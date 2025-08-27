
import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  DollarSign, 
  ExternalLink, 
  Heart, 
  Share2, 
  Plus,
  Check,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Code,
  Brain,
  Cpu,
  Network,
  Boxes,
  CircuitBoard,
  Bot,
  BarChart3
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ToolDetailProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  params?: any;
  selectedItem?: any;
  className?: string;
}

// Enhanced Feature Card
const FeatureCard = ({ 
  feature, 
  index 
}: { 
  feature: any; 
  index: number; 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="relative p-6 h-full bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group overflow-hidden">
        {/* Gradient glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="relative space-y-4">
          {/* Icon */}
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              boxShadow: "0 20px 25px -5px rgba(255, 107, 53, 0.3)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <feature.icon className="w-6 h-6 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <h4 className="group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
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

// Enhanced Review Card
const ReviewCard = ({ 
  review, 
  index 
}: { 
  review: any; 
  index: number; 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <Card className="p-6 bg-white/60 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={review.avatar} />
                <AvatarFallback>{review.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < review.rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Review text */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {review.text}
          </p>

          {/* Date */}
          <p className="text-xs text-muted-foreground">
            {review.date}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export function ToolDetail({ onNavigate, params, selectedItem, className = "" }: ToolDetailProps) {
  const { scrollYProgress } = useScroll();
  const [isLiked, setIsLiked] = useState(false);
  const [isInWallet, setIsInWallet] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get tool data from params or selectedItem
  const tool = selectedItem || params || {
    id: 'chatgpt-4',
    name: 'ChatGPT-4',
    description: 'Advanced AI chatbot for conversations, writing, coding, and creative tasks with superior reasoning capabilities.',
    category: 'Conversational AI',
    rating: '4.8',
    reviewCount: '12.5K',
    users: '100M+',
    pricing: 'Free/Pro',
    isPremium: true,
    gradient: 'from-emerald-400 to-cyan-500',
    icon: Brain,
    website: 'https://chat.openai.com',
    platforms: ['Web', 'Mobile', 'API']
  };

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "20%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "80%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

  // Mock data
  const features = [
    {
      icon: Brain,
      title: 'Advanced Reasoning',
      description: 'Superior logical thinking and problem-solving capabilities'
    },
    {
      icon: Code,
      title: 'Code Generation',
      description: 'Generate, debug, and explain code in multiple languages'
    },
    {
      icon: Sparkles,
      title: 'Creative Writing',
      description: 'Create stories, poems, scripts, and marketing copy'
    },
    {
      icon: Globe,
      title: 'Multilingual',
      description: 'Supports conversations in 50+ languages'
    }
  ];

  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      text: 'ChatGPT-4 has revolutionized how I handle daily tasks. The reasoning capabilities are incredible.',
      date: '2 weeks ago'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Software Developer',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      text: 'Best coding assistant I\'ve ever used. Helps me debug complex issues in minutes.',
      date: '1 month ago'
    },
    {
      name: 'Emily Watson',
      role: 'Content Creator',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      text: 'Great for creative writing projects. Sometimes needs a bit of guidance but overall excellent.',
      date: '3 weeks ago'
    }
  ];

  const handleAddToWallet = () => {
    setIsInWallet(true);
    // Navigate to wallet with tool added state
    onNavigate?.('tool-detail', 'wallet', { toolAdded: tool });
  };

  const handleCompare = () => {
    onNavigate?.('tool-detail', 'compare', { tools: [tool] });
  };

  const handleBack = () => {
    onNavigate?.('tool-detail', 'explore-frame');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Dynamic Base Gradient */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 70%, rgba(251, 146, 60, 0.15) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%),
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
            `radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
             radial-gradient(circle at 75% 70%, rgba(251, 146, 60, 0.15) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%),
             linear-gradient(135deg, #fefbff 0%, #fef7ed 25%, #eff6ff 75%, #f0f9ff 100%)`,
            `radial-gradient(circle at 30% 35%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
             radial-gradient(circle at 70% 65%, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 70%),
             linear-gradient(135deg, #fefbff 0%, #fef7ed 25%, #eff6ff 75%, #f0f9ff 100%)`
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
          className="absolute -right-20 top-1/4 w-56 h-56 rounded-full blur-3xl opacity-25"
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
      </motion.div>

      {/* Layer 4: AI Tech Shapes */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        {[
          { Icon: Brain, position: "top-1/6 left-1/6", delay: 0, duration: 16 },
          { Icon: Cpu, position: "top-1/3 right-1/5", delay: 2, duration: 14 },
          { Icon: Network, position: "bottom-1/4 left-1/4", delay: 4, duration: 18 },
          { Icon: Bot, position: "bottom-1/6 right-1/3", delay: 6, duration: 12 }
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
          className="py-16 px-6"
        >
          <div className="container mx-auto max-w-6xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={handleBack}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Explore
              </Button>
            </motion.div>

            {/* Tool Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
            >
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tool Icon and Basic Info */}
                <div className="flex items-start gap-6">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br ${tool.gradient || 'from-primary to-secondary'} rounded-3xl flex items-center justify-center shadow-2xl`}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 2,
                      boxShadow: "0 25px 50px -12px rgba(255, 107, 53, 0.4)"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {tool.icon ? (
                      <tool.icon className="w-10 h-10 text-white" />
                    ) : (
                      <Brain className="w-10 h-10 text-white" />
                    )}
                  </motion.div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {tool.name}
                        </h1>
                        {tool.isPremium && (
                          <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {tool.category}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{tool.rating}</span>
                        <span className="text-muted-foreground">({tool.reviewCount || '12.5K'})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{tool.users}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span>{tool.pricing}</span>
                      </div>
                    </div>

                    {/* Platforms */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Available on:</span>
                      {(tool.platforms || ['Web', 'Mobile', 'API']).map((platform) => (
                        <Badge key={platform} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                    onClick={() => window.open(tool.website || 'https://chat.openai.com', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Try Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleAddToWallet}
                    disabled={isInWallet}
                    className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  >
                    {isInWallet ? (
                      <>
                        <Check className="w-4 h-4" />
                        In Wallet
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add to Wallet
                      </>
                    )}
                  </Button>

                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={handleCompare}
                    className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Compare
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`gap-2 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Right Column - Quick Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Card className="p-6 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
                  <div className="space-y-6">
                    <h3>Quick Stats</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Popularity</span>
                        </div>
                        <Badge variant="secondary">Top 1%</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">Rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{tool.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Response Time</span>
                        </div>
                        <span className="text-sm font-medium">&lt; 1s</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Privacy</span>
                        </div>
                        <Badge variant="secondary">Secure</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CONTENT TABS */}
        <section 
          ref={contentRef}
          className="py-16 px-6 relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <Card className="p-8 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
                    <div className="space-y-6">
                      <h3>About {tool.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.name} represents the cutting edge of AI technology, offering advanced capabilities that transform how users interact with artificial intelligence. With superior reasoning abilities and natural language understanding, it serves as a powerful assistant for a wide range of tasks.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Whether you're looking to enhance your productivity, solve complex problems, or explore creative possibilities, {tool.name} provides the tools and intelligence you need to achieve your goals efficiently and effectively.
                      </p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-8">
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} index={index} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-8 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4>Free Plan</h4>
                          <p className="text-3xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/month</span></p>
                        </div>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Limited conversations
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Basic AI model
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Standard response time
                          </li>
                        </ul>
                        <Button className="w-full" variant="outline">
                          Get Started
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-8 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl ring-2 ring-primary/50">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4>Pro Plan</h4>
                            <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                              Popular
                            </Badge>
                          </div>
                          <p className="text-3xl font-bold">$20<span className="text-base font-normal text-muted-foreground">/month</span></p>
                        </div>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Unlimited conversations
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Advanced AI model
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Priority support
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            API access
                          </li>
                        </ul>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                          Upgrade to Pro
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}