import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  ArrowRight,
  Tag,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  Brain,
  Cpu,
  Network,
  Boxes,
  CircuitBoard,
  Bot,
  Sparkles,
  FileText,
  Video,
  Code,
  Palette,
  MessageCircle,
  Workflow,
  Plus,
  Share2,
  GitMerge,
  Target,
  Link
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface TutorialsFrameProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  detailView?: boolean;
  selectedItem?: any;
  className?: string;
}

// Enhanced Tutorial Card
const TutorialCard = ({ 
  tutorial, 
  index,
  onNavigate 
}: { 
  tutorial: any; 
  index: number;
  onNavigate?: (from: string, to: string, params?: any) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleCardClick = () => {
    onNavigate?.('tutorials-frame', 'tutorial-detail', { 
      tutorial_id: tutorial.id, 
      tutorial 
    });
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
        y: -6,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card 
        className="relative overflow-hidden bg-white/75 backdrop-blur-lg ring-1 ring-border/40 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl group cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`Read tutorial: ${tutorial.title}`}
      >
        {/* Thumbnail/Header - Even smaller height */}
        <div className={`h-24 bg-gradient-to-br ${tutorial.gradient || 'from-primary to-secondary'} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 0.4 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Play button for video tutorials - Even smaller */}
          {tutorial.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-5 h-5 text-white ml-0.5" />
              </motion.div>
            </div>
          )}

          {/* Tutorial type icon - Smaller */}
          <div className="absolute top-2 left-2">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              {tutorial.type === 'video' ? (
                <Video className="w-4 h-4 text-white" />
              ) : tutorial.type === 'code' ? (
                <Code className="w-4 h-4 text-white" />
              ) : (
                <FileText className="w-4 h-4 text-white" />
              )}
            </div>
          </div>

          {/* Difficulty badge - Smaller */}
          <div className="absolute top-2 right-2">
            <Badge 
              className={`text-xs text-white border-white/20 ${
                tutorial.difficulty === 'beginner' 
                  ? 'bg-green-500/80' 
                  : tutorial.difficulty === 'intermediate'
                  ? 'bg-yellow-500/80'
                  : 'bg-red-500/80'
              }`}
            >
              {tutorial.difficulty}
            </Badge>
          </div>

          {/* Duration */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
              <Clock className="w-3 h-3 text-white" />
              <span className="text-xs text-white">{tutorial.duration}</span>
            </div>
          </div>
        </div>

        {/* Content - Even smaller padding and text */}
        <div className="p-3 space-y-2">
          {/* Category and Date */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {tutorial.category}
            </Badge>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="w-2.5 h-2.5" />
              {tutorial.publishedAt}
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {tutorial.title}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
              {tutorial.description}
            </p>
          </div>

          {/* Author and Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Avatar className="w-5 h-5">
                <AvatarImage src={tutorial.author.avatar} />
                <AvatarFallback className="text-[10px]">{tutorial.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-muted-foreground">{tutorial.author.name}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                {tutorial.rating}
              </div>
              <div className="flex items-center gap-0.5">
                <Users className="w-2.5 h-2.5" />
                {tutorial.views}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tutorial.tags.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5">
                {tag}
              </Badge>
            ))}
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

// Workflow Card Component
const WorkflowCard = ({ 
  workflow, 
  index,
  onNavigate 
}: { 
  workflow: any; 
  index: number; 
  onNavigate?: (from: string, to: string, params?: any) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleCardClick = () => {
    onNavigate?.('tutorials-frame', 'workflow-detail', { 
      workflow_id: workflow.id, 
      workflow 
    });
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
        y: -6,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card 
        className="relative overflow-hidden bg-white/75 backdrop-blur-lg ring-1 ring-border/40 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl group cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View workflow: ${workflow.name}`}
      >
        {/* Header with gradient - Even smaller */}
        <div className={`h-24 bg-gradient-to-br ${workflow.gradient || 'from-primary to-secondary'} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 0.4 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Workflow icon - Smaller */}
          <div className="absolute top-2 left-2">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Workflow className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Difficulty badge - Smaller */}
          <div className="absolute top-2 right-2">
            <Badge 
              className={`text-xs text-white border-white/20 ${
                workflow.difficulty === 'Beginner' 
                  ? 'bg-green-500/80' 
                  : workflow.difficulty === 'Intermediate'
                  ? 'bg-yellow-500/80'
                  : 'bg-red-500/80'
              }`}
            >
              {workflow.difficulty}
            </Badge>
          </div>

          {/* Duration - Smaller */}
          <div className="absolute bottom-2 right-2">
            <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-sm rounded px-1.5 py-0.5">
              <Clock className="w-2.5 h-2.5 text-white" />
              <span className="text-[10px] text-white">{workflow.duration}</span>
            </div>
          </div>

          {/* Tools count - Smaller */}
          <div className="absolute bottom-2 left-2">
            <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-sm rounded px-1.5 py-0.5">
              <Link className="w-2.5 h-2.5 text-white" />
              <span className="text-[10px] text-white">{workflow.tools.length} tools</span>
            </div>
          </div>
        </div>

        {/* Content - Even smaller */}
        <div className="p-3 space-y-2">
          {/* Category */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {workflow.category}
            </Badge>
          </div>

          {/* Title and Description */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {workflow.name}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
              {workflow.description}
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground">Tools used:</p>
            <div className="flex flex-wrap gap-1">
              {workflow.tools.slice(0, 2).map((tool: string) => (
                <Badge key={tool} variant="secondary" className="text-[10px] px-2 py-0.5">
                  {tool}
                </Badge>
              ))}
              {workflow.tools.length > 2 && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                  +{workflow.tools.length - 2}
                </Badge>
              )}
            </div>
          </div>

          {/* Author and Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-[10px] text-muted-foreground">{workflow.author}</span>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                {workflow.rating}
              </div>
              <div className="flex items-center gap-0.5">
                <Users className="w-2.5 h-2.5" />
                {workflow.uses}
              </div>
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

// Tutorial Detail View Component
const TutorialDetailView = ({ 
  tutorial, 
  onNavigate 
}: { 
  tutorial: any; 
  onNavigate?: (from: string, to: string, params?: any) => void; 
}) => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true });

  return (
    <motion.div
      ref={contentRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => onNavigate?.('tutorial-detail', 'tutorials-frame')}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Tutorials
      </Button>

      {/* Tutorial Header */}
      <div className="space-y-6">
        <div className={`h-64 bg-gradient-to-br ${tutorial.gradient || 'from-primary to-secondary'} rounded-2xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            {tutorial.type === 'video' && (
              <motion.div
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-10 h-10 text-white ml-1" />
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge 
              className={`${
                tutorial.difficulty === 'beginner' 
                  ? 'bg-green-500' 
                  : tutorial.difficulty === 'intermediate'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              {tutorial.difficulty}
            </Badge>
            <Badge variant="outline">{tutorial.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {tutorial.duration}
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {tutorial.title}
          </h1>

          <p className="text-muted-foreground leading-relaxed">
            {tutorial.description}
          </p>

          {/* Author and Stats */}
          <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={tutorial.author.avatar} />
                <AvatarFallback>{tutorial.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{tutorial.author.name}</p>
                <p className="text-sm text-muted-foreground">Published {tutorial.publishedAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {tutorial.rating}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {tutorial.views}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <Card className="p-8 bg-white/70 backdrop-blur-lg ring-1 ring-border/30 shadow-lg rounded-2xl">
        <div className="prose prose-lg max-w-none">
          <h3>Tutorial Overview</h3>
          <p>
            This comprehensive tutorial will guide you through {tutorial.title.toLowerCase()}. 
            Whether you're a {tutorial.difficulty} or looking to expand your skills, 
            this tutorial provides step-by-step instructions and practical examples.
          </p>
          
          <h3>What You'll Learn</h3>
          <ul>
            <li>Core concepts and fundamentals</li>
            <li>Practical implementation techniques</li>
            <li>Best practices and common pitfalls</li>
            <li>Real-world examples and use cases</li>
          </ul>

          <h3>Prerequisites</h3>
          <p>
            Basic understanding of AI tools and {tutorial.category.toLowerCase()} concepts 
            is recommended but not required.
          </p>

          {/* This would be the actual tutorial content in a real implementation */}
          <div className="bg-gray-50 p-6 rounded-xl mt-8">
            <p className="text-muted-foreground italic">
              Full tutorial content would be loaded here from the CMS...
            </p>
          </div>
        </div>
      </Card>

      {/* Related Tutorials */}
      <Card className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
        <h3 className="mb-4">Related Tutorials</h3>
        <p className="text-muted-foreground">
          Discover more tutorials in the {tutorial.category} category...
        </p>
      </Card>
    </motion.div>
  );
};

// Workflows Content Component
const WorkflowsContent = ({ 
  searchQuery,
  filteredWorkflows,
  onNavigate,
  tutorialsInView 
}: any) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={tutorialsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              AI Workflows Library
            </h2>
            <p className="text-muted-foreground">
              {filteredWorkflows.length} workflows found
            </p>
          </div>
          
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Workflow
          </Button>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { name: 'Content Creation', icon: FileText, count: '12' },
            { name: 'Research', icon: Search, count: '8' },
            { name: 'Marketing', icon: TrendingUp, count: '15' },
            { name: 'Development', icon: Code, count: '6' }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={tutorialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors cursor-pointer">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.count} workflows</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Workflows Grid - More columns and smaller gaps */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        initial={{ opacity: 0 }}
        animate={tutorialsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {filteredWorkflows.map((workflow: any, index: number) => (
          <WorkflowCard 
            key={workflow.id} 
            workflow={workflow} 
            index={index}
            onNavigate={onNavigate}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredWorkflows.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2">No workflows found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or create a new workflow.
          </p>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create New Workflow
          </Button>
        </motion.div>
      )}
    </>
  );
};

// Tutorials Content Component  
const TutorialsContent = ({ 
  searchQuery,
  selectedCategory,
  selectedDifficulty,
  activeTab,
  setSelectedCategory,
  setSelectedDifficulty,
  setActiveTab,
  filteredTutorials,
  onNavigate,
  tutorialsInView 
}: any) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={tutorialsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Learn from Expert Tutorials
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Step-by-step guides to master AI tools and improve your workflow.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={tutorialsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="video" className="gap-1">
              <Video className="w-3 h-3" />
              Video
            </TabsTrigger>
            <TabsTrigger value="article" className="gap-1">
              <FileText className="w-3 h-3" />
              Article
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1">
              <Code className="w-3 h-3" />
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/60 backdrop-blur-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Conversational AI">Conversational AI</SelectItem>
              <SelectItem value="Image Generation">Image Generation</SelectItem>
              <SelectItem value="Code Assistant">Code Assistant</SelectItem>
              <SelectItem value="Content Creation">Content Creation</SelectItem>
              <SelectItem value="Automation">Automation</SelectItem>
              <SelectItem value="AI Ethics">AI Ethics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="bg-white/60 backdrop-blur-sm">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Tutorials Grid - More columns and smaller gaps */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        initial={{ opacity: 0 }}
        animate={tutorialsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {filteredTutorials.map((tutorial: any, index: number) => (
          <TutorialCard 
            key={tutorial.id} 
            tutorial={tutorial} 
            index={index}
            onNavigate={onNavigate}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTutorials.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2">No tutorials found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setActiveTab('all');
            }}
            className="bg-white/60 backdrop-blur-sm"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </>
  );
};

export function TutorialsFrame({ 
  onNavigate, 
  detailView, 
  selectedItem, 
  className = "" 
}: TutorialsFrameProps) {
  const { scrollYProgress } = useScroll();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [currentSection, setCurrentSection] = useState<'tutorials' | 'workflows'>('tutorials');

  // Check for workflow mode in selectedItem params
  useEffect(() => {
    if (selectedItem?.mode === 'workflows') {
      setCurrentSection('workflows');
    }
  }, [selectedItem]);

  // Parallax transforms
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "60%"]), springConfig);
  const shapesY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);

  // Section refs
  const heroRef = useRef(null);
  const tutorialsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const tutorialsInView = useInView(tutorialsRef, { once: true, margin: "-100px" });

  // Mock workflows data
  const mockWorkflows = [
    {
      id: 'content-creation-pipeline',
      name: 'AI Content Creation Pipeline',
      description: 'Generate ideas with ChatGPT, create images with Midjourney, and refine content with Grammarly',
      category: 'Content Creation',
      difficulty: 'Intermediate',
      duration: '45 min',
      tools: ['ChatGPT', 'Midjourney', 'Grammarly'],
      author: 'Alex Johnson',
      rating: '4.8',
      uses: '2.3K',
      views: '15.2K',
      gradient: 'from-blue-400 to-purple-500',
      tags: ['Content', 'Writing', 'Images']
    },
    {
      id: 'research-analysis-workflow',
      name: 'Research & Analysis Workflow',
      description: 'Research topics with Perplexity, analyze data with Claude, and create visualizations',
      category: 'Research',
      difficulty: 'Advanced',
      duration: '60 min',
      tools: ['Perplexity AI', 'Claude', 'Notion AI'],
      author: 'Sarah Chen',
      rating: '4.9',
      uses: '1.8K',
      views: '12.5K',
      gradient: 'from-green-400 to-teal-500',
      tags: ['Research', 'Analysis', 'Data']
    },
    {
      id: 'social-media-automation',
      name: 'Social Media Content Automation',
      description: 'Generate posts with AI, create graphics, and schedule content across platforms',
      category: 'Marketing',
      difficulty: 'Beginner',
      duration: '30 min',
      tools: ['ChatGPT', 'DALL-E', 'Buffer'],
      author: 'Maria Rodriguez',
      rating: '4.7',
      uses: '3.1K',
      views: '18.7K',
      gradient: 'from-pink-400 to-rose-500',
      tags: ['Social Media', 'Marketing', 'Automation']
    },
    {
      id: 'code-review-pipeline',
      name: 'AI-Powered Code Review Pipeline',
      description: 'Review code with GitHub Copilot, generate documentation, and optimize performance',
      category: 'Development',
      difficulty: 'Advanced',
      duration: '50 min',
      tools: ['GitHub Copilot', 'CodeT5', 'SonarQube'],
      author: 'David Kim',
      rating: '4.6',
      uses: '1.2K',
      views: '8.9K',
      gradient: 'from-slate-400 to-gray-600',
      tags: ['Development', 'Code Review', 'Documentation']
    }
  ];

  // Mock tutorials data
  const mockTutorials = [
    {
      id: 'getting-started-chatgpt',
      title: 'Getting Started with ChatGPT: A Complete Beginner\'s Guide',
      description: 'Learn how to effectively use ChatGPT for various tasks including writing, coding, and problem-solving.',
      category: 'Conversational AI',
      difficulty: 'beginner',
      duration: '15 min',
      type: 'video',
      gradient: 'from-emerald-400 to-cyan-500',
      author: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/40/40'
      },
      rating: '4.8',
      views: '12.5K',
      publishedAt: '2 weeks ago',
      tags: ['ChatGPT', 'Beginner', 'AI Chat']
    },
    {
      id: 'midjourney-masterclass',
      title: 'Midjourney Masterclass: Creating Stunning AI Art',
      description: 'Master the art of prompt engineering and create professional-quality images with Midjourney.',
      category: 'Image Generation',
      difficulty: 'intermediate',
      duration: '32 min',
      type: 'video',
      gradient: 'from-purple-400 to-pink-500',
      author: {
        name: 'Marcus Rodriguez',
        avatar: '/api/placeholder/40/40'
      },
      rating: '4.9',
      views: '8.3K',
      publishedAt: '1 week ago',
      tags: ['Midjourney', 'AI Art', 'Prompts']
    },
    {
      id: 'github-copilot-workflow',
      title: 'Supercharge Your Coding with GitHub Copilot',
      description: 'Integrate GitHub Copilot into your development workflow and boost your productivity.',
      category: 'Code Assistant',
      difficulty: 'intermediate',
      duration: '25 min',
      type: 'code',
      gradient: 'from-slate-400 to-slate-600',
      author: {
        name: 'Emily Watson',
        avatar: '/api/placeholder/40/40'
      },
      rating: '4.7',
      views: '15.2K',
      publishedAt: '3 days ago',
      tags: ['GitHub Copilot', 'Coding', 'Productivity']
    },
    {
      id: 'ai-writing-techniques',
      title: 'Advanced AI Writing Techniques and Best Practices',
      description: 'Learn advanced techniques for using AI writing tools to create high-quality content.',
      category: 'Content Creation',
      difficulty: 'advanced',
      duration: '45 min',
      type: 'article',
      gradient: 'from-orange-400 to-red-500',
      author: {
        name: 'David Kim',
        avatar: '/api/placeholder/40/40'
      },
      rating: '4.6',
      views: '6.7K',
      publishedAt: '5 days ago',
      tags: ['AI Writing', 'Content', 'Advanced']
    },
    {
      id: 'automation-workflows',
      title: 'Building AI-Powered Automation Workflows',
      description: 'Create powerful automation workflows by combining multiple AI tools and services.',
      category: 'Automation',
      difficulty: 'advanced',
      duration: '38 min',
      type: 'video',
      gradient: 'from-blue-400 to-indigo-500',
      author: {
        name: 'Lisa Zhang',
        avatar: '/api/placeholder/40/40'
      },
      rating: '4.9',
      views: '9.1K',
      publishedAt: '1 week ago',
      tags: ['Automation', 'Workflows', 'Integration']
    },
    {
      id: 'ai-ethics-guide',
      title: 'Understanding AI Ethics and Responsible Usage',
      description: 'Learn about AI ethics, bias, and how to use AI tools responsibly in your work.',
      category: 'AI Ethics',
      difficulty: 'beginner',
      duration: '20 min',
      type: 'article',
      gradient: 'from-green-400 to-blue-500',
      author: {
        name: 'Alex Johnson',
        avatar: '/api/placeholder/40/40'
      },
      rating: '4.8',
      views: '4.5K',
      publishedAt: '4 days ago',
      tags: ['Ethics', 'Responsible AI', 'Guidelines']
    }
  ];

  // Filter workflows based on search
  const filteredWorkflows = mockWorkflows.filter(workflow => {
    if (currentSection !== 'workflows') return true;
    
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  // Filter tutorials based on search and filters
  const filteredTutorials = mockTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'video' && tutorial.type === 'video') ||
                      (activeTab === 'article' && tutorial.type === 'article') ||
                      (activeTab === 'code' && tutorial.type === 'code');

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // If in detail view, show tutorial detail
  if (detailView && selectedItem) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Same background system as main view */}
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
        />

        <div className="relative z-10 pt-20">
          <div className="py-16 px-6">
            <div className="container mx-auto max-w-4xl">
              <TutorialDetailView 
                tutorial={selectedItem.tutorial || selectedItem} 
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          className="absolute left-1/3 top-1/3 w-48 h-48 rounded-full blur-3xl opacity-20"
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
          { Icon: BookOpen, position: "top-1/6 left-1/5", delay: 0, duration: 16 },
          { Icon: Brain, position: "top-1/4 right-1/4", delay: 2, duration: 14 },
          { Icon: Code, position: "bottom-1/3 left-1/4", delay: 4, duration: 18 },
          { Icon: Sparkles, position: "bottom-1/6 right-1/3", delay: 6, duration: 12 },
          { Icon: Video, position: "top-1/2 right-1/2", delay: 8, duration: 20 }
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
      <div className="relative z-10">
        {/* HERO SECTION - Full Height with Content at Top */}
        <section 
          ref={heroRef}
          className="min-h-screen px-6 pt-32 pb-8"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {currentSection === 'tutorials' ? (
                  <>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Learn AI Tools</span>
                    <br />
                    <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">with Expert Tutorials</span>
                  </>
                ) : (
                  <>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Build Powerful</span>
                    <br />
                    <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">AI Workflows</span>
                  </>
                )}
              </motion.h1>
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-semibold">
                  {currentSection === 'tutorials' ? (
                    <>
                      <span className="text-gray-700">Master AI tools with </span>
                      <span className="text-blue-600 font-bold">step-by-step tutorials</span>
                      <span className="text-gray-700">, </span>
                      <span className="text-purple-600 font-bold">video guides</span>
                      <span className="text-gray-700">, and </span>
                      <span className="text-pink-600 font-bold">practical examples</span>
                      <span className="text-gray-700"> from industry experts.</span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-700">Create powerful </span>
                      <span className="text-blue-600 font-bold">automated workflows</span>
                      <span className="text-gray-700"> by combining </span>
                      <span className="text-purple-600 font-bold">multiple AI tools</span>
                      <span className="text-gray-700">. Build, share, and discover workflows that </span>
                      <span className="text-pink-600 font-bold">boost your productivity</span>
                      <span className="text-gray-700">.</span>
                    </>
                  )}
                </p>
                
                {/* Decorative elements */}
                <div className="flex justify-center items-center gap-3 mt-4">
                  <motion.div 
                    className="h-1 w-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                    animate={{ width: ["48px", "60px", "48px"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="h-2 w-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  />
                  <motion.div 
                    className="h-1 w-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                    animate={{ width: ["48px", "60px", "48px"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  />
                </div>
              </motion.div>
              
              {/* Enhanced descriptive box with better design */}
              <motion.div
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-5 max-w-4xl mx-auto mb-6 shadow-2xl border border-white/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 pointer-events-none" />
                
                <div className="relative">
                  {/* Header with icon */}
                  <div className="flex items-center justify-center mb-4">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-lg" />
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    Welcome to AIToology Learning Hub
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-6">
                    {currentSection === 'tutorials'
                      ? 'Discover comprehensive tutorials covering everything from beginner basics to advanced techniques. Our curated collection includes video guides, interactive code examples, and real-world case studies. Learn at your own pace with content from verified AI experts and practitioners.'
                      : 'Explore pre-built AI workflows that combine multiple tools to automate complex tasks. Each workflow comes with detailed setup instructions, tool requirements, and expected outcomes. Perfect for professionals looking to streamline their processes and maximize productivity.'
                    }
                  </p>
                  
                  {/* Stats with better design - Smaller and side by side */}
                  <div className="flex justify-center items-center gap-4 md:gap-6">
                    <motion.div 
                      className="group flex items-center gap-2 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-xl cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-md transition-shadow">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {currentSection === 'tutorials' ? '500+' : '200+'}
                        </div>
                        <div className="text-[10px] text-purple-600/80 font-medium leading-tight">
                          {currentSection === 'tutorials' ? 'Tutorials' : 'Workflows'}
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="group flex items-center gap-2 bg-gradient-to-r from-pink-50 to-pink-100 px-4 py-2 rounded-xl cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:shadow-md transition-shadow">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-pink-600">50K+</div>
                        <div className="text-[10px] text-pink-600/80 font-medium leading-tight">Learners</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="group flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-2 rounded-xl cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:shadow-md transition-shadow">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-600">Daily</div>
                        <div className="text-[10px] text-orange-600/80 font-medium leading-tight">Updates</div>
                      </div>
                    </motion.div>
                  </div>
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
                    variant={currentSection === 'tutorials' ? 'default' : 'ghost'}
                    onClick={() => setCurrentSection('tutorials')}
                    className="gap-2 rounded-xl"
                  >
                    <BookOpen className="w-4 h-4" />
                    Tutorials
                  </Button>
                  <Button
                    variant={currentSection === 'workflows' ? 'default' : 'ghost'}
                    onClick={() => setCurrentSection('workflows')}
                    className="gap-2 rounded-xl"
                  >
                    <Workflow className="w-4 h-4" />
                    Workflows
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
                      placeholder={currentSection === 'tutorials' ? "Search tutorials, topics, or tools..." : "Search workflows, automations..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-lg ring-1 ring-border/40 hover:ring-primary/50 focus:ring-primary rounded-2xl shadow-lg border-0 transition-all duration-300"
                      aria-label={currentSection === 'tutorials' ? "Search for tutorials" : "Search for workflows"}
                    />
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section 
          ref={tutorialsRef}
          className="py-16 px-6 relative"
        >
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            {currentSection === 'tutorials' ? (
              <TutorialsContent 
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                activeTab={activeTab}
                setSelectedCategory={setSelectedCategory}
                setSelectedDifficulty={setSelectedDifficulty}
                setActiveTab={setActiveTab}
                filteredTutorials={filteredTutorials}
                onNavigate={onNavigate}
                tutorialsInView={tutorialsInView}
              />
            ) : (
              <WorkflowsContent 
                searchQuery={searchQuery}
                filteredWorkflows={filteredWorkflows}
                onNavigate={onNavigate}
                tutorialsInView={tutorialsInView}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}