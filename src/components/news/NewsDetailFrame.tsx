
import { useState, useRef } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Share2,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Link,
  MessageCircle,
  ThumbsUp,
  Eye,
  Tag,
  TrendingUp,
  Star,
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
  BookOpen
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface NewsDetailFrameProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  selectedItem?: any;
  params?: any;
  className?: string;
}

// Related Article Card
const RelatedArticleCard = ({ 
  article, 
  index,
  onNavigate 
}: { 
  article: any; 
  index: number;
  onNavigate?: (from: string, to: string, params?: any) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleCardClick = () => {
    onNavigate?.('news-detail', 'news-detail', { 
      article_id: article.id, 
      article 
    });
  };

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
      <Card 
        className="relative overflow-hidden bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`Read related article: ${article.title}`}
      >
        {/* Image */}
        <div className="h-40 relative overflow-hidden">
          <ImageWithFallback
            src={article.image || '/api/placeholder/400/200'}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          {/* Category */}
          <div className="absolute top-3 left-3">
            <Badge className="text-white bg-black/50 backdrop-blur-sm border-0">
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h4 className="line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {article.title}
          </h4>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
          
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <span>{article.publishedAt}</span>
            <span>{article.readTime}</span>
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

// Share Options Component
const ShareOptions = ({ 
  article 
}: { 
  article: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = article.title;
    const text = article.excerpt;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
        } catch (err) {
          toast.error('Failed to copy link');
        }
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 bg-white/60 backdrop-blur-sm"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="absolute top-full right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg ring-1 ring-border/30 z-50"
        >
          <div className="p-2 space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="w-full justify-start gap-3"
            >
              <Twitter className="w-4 h-4 text-blue-500" />
              Share on Twitter
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="w-full justify-start gap-3"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              Share on Facebook
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="w-full justify-start gap-3"
            >
              <Linkedin className="w-4 h-4 text-blue-700" />
              Share on LinkedIn
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('copy')}
              className="w-full justify-start gap-3"
            >
              <Link className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </motion.div>
      )}

      {/* Overlay to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export function NewsDetailFrame({ 
  onNavigate, 
  selectedItem, 
  params, 
  className = "" 
}: NewsDetailFrameProps) {
  const { scrollYProgress } = useScroll();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Get article data from selectedItem or params
  const article = selectedItem?.article || params?.article || {
    id: 'openai-gpt5-announcement',
    title: 'OpenAI Announces GPT-5: The Next Generation of AI Language Models',
    excerpt: 'OpenAI unveils GPT-5 with groundbreaking capabilities in reasoning, multimodal understanding, and reduced hallucinations. The new model promises to revolutionize AI applications across industries.',
    category: 'Breaking',
    author: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      bio: 'Senior AI Researcher and Technology Journalist covering artificial intelligence breakthroughs and industry developments.'
    },
    publishedAt: '2 hours ago',
    readTime: '5 min read',
    views: '12.5K',
    trending: true,
    tags: ['OpenAI', 'GPT-5', 'LLM', 'AI Research'],
    image: '/api/placeholder/800/400',
    content: `
      <p>In a groundbreaking announcement that has sent ripples through the tech industry, OpenAI has officially unveiled GPT-5, the next iteration of their revolutionary language model series. This new model represents a significant leap forward in artificial intelligence capabilities, promising to address many of the limitations present in previous versions while introducing entirely new functionalities.</p>

      <h3>Revolutionary Capabilities</h3>
      <p>GPT-5 introduces several breakthrough features that set it apart from its predecessors. The model demonstrates unprecedented reasoning abilities, with improved logical thinking and problem-solving capabilities that approach human-level performance in many domains. The multimodal understanding has been dramatically enhanced, allowing the system to seamlessly process and generate content across text, images, audio, and video formats.</p>

      <p>One of the most significant improvements is the substantial reduction in hallucinations - a persistent challenge in previous models. OpenAI's research team has implemented advanced verification mechanisms and training techniques that result in more accurate and reliable outputs.</p>

      <h3>Industry Impact</h3>
      <p>The implications of GPT-5's capabilities extend far beyond academic research. Industries ranging from healthcare and education to creative fields and software development are expected to see transformative changes. Early beta testers report remarkable improvements in code generation, scientific research assistance, and creative writing applications.</p>

      <p>Major technology companies have already begun exploring integration possibilities, with several announcing partnerships to incorporate GPT-5 into their existing platforms and services. This rapid adoption suggests that the AI landscape is about to undergo another significant transformation.</p>

      <h3>Technical Innovations</h3>
      <p>Under the hood, GPT-5 features a completely redesigned architecture that enables more efficient processing and better contextual understanding. The model can maintain coherent conversations over much longer contexts, remember previous interactions more effectively, and adapt its communication style to specific user needs and preferences.</p>

      <p>The training process itself has been revolutionized, incorporating advanced techniques from reinforcement learning, constitutional AI, and novel data curation methods. This comprehensive approach has resulted in a model that not only performs better but also aligns more closely with human values and expectations.</p>
    `
  };

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "20%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "80%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });
  const relatedInView = useInView(relatedRef, { once: true, margin: "-50px" });

  // Mock related articles
  const relatedArticles = [
    {
      id: 'midjourney-v7-features',
      title: 'Midjourney V7 Introduces Revolutionary 3D Generation',
      excerpt: 'The latest update brings native 3D object generation capabilities.',
      category: 'Product Updates',
      publishedAt: '6 hours ago',
      readTime: '4 min read',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'ai-ethics-framework',
      title: 'New Global Framework for AI Ethics Gets Industry Support',
      excerpt: 'Leading tech companies unite behind comprehensive ethical guidelines.',
      category: 'AI Research',
      publishedAt: '1 day ago',
      readTime: '7 min read',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'github-copilot-enterprise',
      title: 'GitHub Copilot Enterprise Launches with Advanced Features',
      excerpt: 'Enterprise-grade Copilot with enhanced security and customization.',
      category: 'Product Updates',
      publishedAt: '2 days ago',
      readTime: '6 min read',
      image: '/api/placeholder/400/200'
    }
  ];

  const handleBack = () => {
    onNavigate?.('news-detail', 'news');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  useEffect(() => {
    setLikes(Math.floor(Math.random() * 500) + 100);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* PARALLAX BACKGROUND SYSTEM */}
      
      {/* Layer 1: Dynamic Base Gradient */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 70%, rgba(251, 146, 60, 0.1) 0%, rgba(244, 63, 94, 0.08) 50%, transparent 70%),
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
            `radial-gradient(circle at 25% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 75% 70%, rgba(251, 146, 60, 0.1) 0%, rgba(244, 63, 94, 0.08) 50%, transparent 70%),
             linear-gradient(135deg, #fefbff 0%, #fef7ed 25%, #eff6ff 75%, #f0f9ff 100%)`,
            `radial-gradient(circle at 30% 35%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
             radial-gradient(circle at 70% 65%, rgba(251, 146, 60, 0.15) 0%, rgba(244, 63, 94, 0.12) 50%, transparent 70%),
             linear-gradient(135deg, #fefbff 0%, #fef7ed 25%, #eff6ff 75%, #f0f9ff 100%)`
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Layer 2: Grid Pattern */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
        animate={{
          backgroundSize: ["32px 32px", "34px 34px", "32px 32px"]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3: Floating Orbs */}
      <motion.div style={{ y: orbY }} className="fixed inset-0 z-0">
        <motion.div
          className="absolute -left-24 top-1/6 w-48 h-48 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -right-16 bottom-1/5 w-40 h-40 rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, rgba(244, 63, 94, 0.15) 50%, transparent 100%)"
          }}
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>

      {/* Layer 4: Article Tech Shapes */}
      <motion.div style={{ y: shapesY }} className="fixed inset-0 z-0">
        {[
          { Icon: FileText, position: "top-1/8 left-1/6", delay: 0, duration: 18 },
          { Icon: Globe, position: "top-1/3 right-1/5", delay: 3, duration: 16 },
          { Icon: BookOpen, position: "bottom-1/4 left-1/5", delay: 6, duration: 20 }
        ].map(({ Icon, position, delay, duration }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} opacity-8 text-primary`}
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.03, 0.1, 0.03]
            }}
            transition={{ 
              duration, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay 
            }}
          >
            <Icon className="w-4 h-4" />
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
          <div className="container mx-auto max-w-4xl">
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
                Back to News
              </Button>
            </motion.div>

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Category and Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge 
                    className={`${
                      article.category === 'Breaking' 
                        ? 'bg-red-500' 
                        : article.category === 'AI Research'
                        ? 'bg-blue-500'
                        : article.category === 'Product Updates'
                        ? 'bg-green-500'
                        : 'bg-primary'
                    }`}
                  >
                    {article.category}
                  </Badge>
                  {article.trending && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Trending</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    className={`gap-2 ${isBookmarked ? 'bg-primary text-white' : 'bg-white/60 backdrop-blur-sm'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Saved' : 'Save'}
                  </Button>
                  <ShareOptions article={article} />
                </div>
              </div>

              {/* Title */}
              <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed text-lg">
                {article.excerpt}
              </p>

              {/* Author and Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">{article.author.bio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.publishedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views}
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={article.image || '/api/placeholder/800/400'}
                  alt={article.title}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section 
          ref={contentRef}
          className="py-16 px-6 relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-12"
            >
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="p-8 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Engagement */}
                  <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={`gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        {likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Comment
                      </Button>
                    </div>
                    <ShareOptions article={article} />
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Table of Contents */}
                <Card className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl sticky top-24">
                  <h4 className="mb-4">In this article</h4>
                  <nav className="space-y-2">
                    <a href="#revolutionary-capabilities" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      Revolutionary Capabilities
                    </a>
                    <a href="#industry-impact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      Industry Impact
                    </a>
                    <a href="#technical-innovations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                      Technical Innovations
                    </a>
                  </nav>
                </Card>

                {/* Author Info */}
                <Card className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                  <div className="text-center space-y-4">
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarImage src={article.author.avatar} />
                      <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4>{article.author.name}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {article.author.bio}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Follow Author
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* RELATED ARTICLES */}
        <section 
          ref={relatedRef}
          className="py-16 px-6 relative"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={relatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Related Articles
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Continue reading with these related stories from the AI world.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle, index) => (
                  <RelatedArticleCard 
                    key={relatedArticle.id} 
                    article={relatedArticle} 
                    index={index}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => onNavigate?.('news-detail', 'news')}
                  className="gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                >
                  View All Articles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}