import React, { useCallback,useEffect,useRef,useState, } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow,
  Plus, 
  ArrowRight, 
  Search, 
  Heart,
  ThumbsUp,
  Share2,
  Copy,
  Edit,
  Star,
  Play,
  Save,
  Zap,
  Bot,
  Brain,
  Image as ImageIcon,
  Volume2,
  Code,
  MessageSquare,
  Users,
  TrendingUp,
  ChevronRight,
  X,
  Eye,
  Bookmark,
  Settings,
  Target,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';

// Types for workflow system
interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'LLM' | 'Image' | 'Audio' | 'Automation' | 'Analytics' | 'Design';
  color: string;
  description: string;
  isPopular?: boolean;
}

interface WorkflowNode {
  id: string;
  toolId: string;
  position: { x: number; y: number };
  config?: Record<string, any>;
}

interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
}

interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  upvotes: number;
  favorites: number;
  views: number;
  isPublic: boolean;
  isFavorited: boolean;
  isUpvoted: boolean;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  tags: string[];
  coverImage?: string;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Mock data
const availableTools: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: Brain,
    category: 'LLM',
    color: 'bg-emerald-500',
    description: 'Advanced language model for text generation',
    isPopular: true
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: Bot,
    category: 'LLM',
    color: 'bg-orange-500',
    description: 'Constitutional AI assistant',
    isPopular: true
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    icon: ImageIcon,
    category: 'Image',
    color: 'bg-purple-500',
    description: 'AI image generation platform',
    isPopular: true
  },
  {
    id: 'dall-e',
    name: 'DALL-E',
    icon: ImageIcon,
    category: 'Image',
    color: 'bg-pink-500',
    description: 'OpenAI\'s image generation model'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: Zap,
    category: 'Automation',
    color: 'bg-yellow-500',
    description: 'Workflow automation platform',
    isPopular: true
  },
  {
    id: 'make',
    name: 'Make',
    icon: Settings,
    category: 'Automation',
    color: 'bg-indigo-500',
    description: 'Visual automation builder'
  },
  {
    id: 'eleven-labs',
    name: 'ElevenLabs',
    icon: Volume2,
    category: 'Audio',
    color: 'bg-red-500',
    description: 'AI voice synthesis'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: Code,
    category: 'Design',
    color: 'bg-blue-500',
    description: 'Design and prototyping tool'
  }
];

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    title: 'Content Creation Pipeline',
    description: 'Generate blog posts with ChatGPT, create accompanying images with Midjourney, and auto-publish via Zapier',
    category: 'Content',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b8fe0e3c?w=150',
    createdAt: '2024-01-15',
    upvotes: 234,
    favorites: 89,
    views: 1240,
    isPublic: true,
    isFavorited: false,
    isUpvoted: false,
    nodes: [
      { id: 'n1', toolId: 'chatgpt', position: { x: 50, y: 100 } },
      { id: 'n2', toolId: 'midjourney', position: { x: 300, y: 100 } },
      { id: 'n3', toolId: 'zapier', position: { x: 550, y: 100 } }
    ],
    connections: [
      { id: 'c1', from: 'n1', to: 'n2' },
      { id: 'c2', from: 'n2', to: 'n3' }
    ],
    tags: ['Content', 'Automation', 'Publishing'],
    coverImage: 'https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZmxvdyUyMGF1dG9tYXRpb24lMjBuZXR3b3JrfGVufDF8fHx8MTc1NTI5NTIwNHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    title: 'AI Research Assistant',
    description: 'Use Claude to analyze documents, generate summaries, and create visual presentations',
    category: 'Research',
    author: 'Dr. Michael Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2024-01-12',
    upvotes: 189,
    favorites: 67,
    views: 892,
    isPublic: true,
    isFavorited: true,
    isUpvoted: false,
    nodes: [
      { id: 'n1', toolId: 'claude', position: { x: 50, y: 100 } },
      { id: 'n2', toolId: 'dall-e', position: { x: 300, y: 100 } },
      { id: 'n3', toolId: 'figma', position: { x: 550, y: 100 } }
    ],
    connections: [
      { id: 'c1', from: 'n1', to: 'n2' },
      { id: 'c2', from: 'n2', to: 'n3' }
    ],
    tags: ['Research', 'Analysis', 'Presentation']
  },
  {
    id: '3',
    title: 'Podcast Production Flow',
    description: 'Generate scripts with AI, create voice synthesis, and automate publishing workflow',
    category: 'Media',
    author: 'Emma Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    createdAt: '2024-01-10',
    upvotes: 156,
    favorites: 45,
    views: 673,
    isPublic: true,
    isFavorited: false,
    isUpvoted: true,
    nodes: [
      { id: 'n1', toolId: 'chatgpt', position: { x: 50, y: 100 } },
      { id: 'n2', toolId: 'eleven-labs', position: { x: 300, y: 100 } },
      { id: 'n3', toolId: 'make', position: { x: 550, y: 100 } }
    ],
    connections: [
      { id: 'c1', from: 'n1', to: 'n2' },
      { id: 'c2', from: 'n2', to: 'n3' }
    ],
    tags: ['Audio', 'Content', 'Automation']
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    content: 'This workflow is amazing! Saved me hours of manual work.',
    timestamp: '2024-01-16T10:30:00Z',
    likes: 12
  },
  {
    id: '2',
    author: 'Maria Garcia',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    content: 'Could you add more details about the Zapier configuration?',
    timestamp: '2024-01-16T14:22:00Z',
    likes: 8
  }
];

interface ToolCombinationsProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  navigationState?: {
    detailView: string | null;
    modalState: string | null;
    selectedItem: any;
  };
  selectedItem?: any;
  detailView?: string | null;
}

export function ToolCombinations({ 
  onNavigate, 
  navigationState, 
  selectedItem, 
  detailView 
}: ToolCombinationsProps = {}) {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isWorkflowDetailOpen, setIsWorkflowDetailOpen] = useState(false);
  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [createStep, setCreateStep] = useState(1);
  
  // Workflow builder state
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([]);
  const [workflowConnections, setWorkflowConnections] = useState<WorkflowConnection[]>([]);
  const [workflowTitle, setWorkflowTitle] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [workflowTags, setWorkflowTags] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Filter workflows
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle navigation state from parent
  useEffect(() => {
    if (detailView === 'detail' && selectedItem) {
      setSelectedWorkflow(selectedItem);
      setIsWorkflowDetailOpen(true);
    } else if (detailView === 'create') {
      setIsCreateWorkflowOpen(true);
      if (selectedItem?.action === 'remix') {
        // Pre-populate with remix data
        setSelectedTools(selectedItem.tools || []);
        setWorkflowNodes(selectedItem.nodes || []);
        setWorkflowTitle(`Remix: ${selectedItem.title || ''}`);
        setWorkflowDescription(selectedItem.description || '');
      }
    }
  }, [detailView, selectedItem]);

  const handleWorkflowClick = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setIsWorkflowDetailOpen(true);
    
    // Notify parent about navigation if callback exists
    if (onNavigate) {
      onNavigate('workflows', 'workflow-detail', workflow);
    }
  };

  const handleUpvote = (workflowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? { ...w, upvotes: w.isUpvoted ? w.upvotes - 1 : w.upvotes + 1, isUpvoted: !w.isUpvoted }
        : w
    ));
  };

  const handleFavorite = (workflowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? { ...w, favorites: w.isFavorited ? w.favorites - 1 : w.favorites + 1, isFavorited: !w.isFavorited }
        : w
    ));
  };

  // Workflow builder functions
  const handleToolSelection = (tool: Tool) => {
    if (selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools(prev => prev.filter(t => t.id !== tool.id));
    } else {
      setSelectedTools(prev => [...prev, tool]);
    }
  };

  const addNodeToCanvas = (tool: Tool) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      toolId: tool.id,
      position: { x: Math.random() * 400 + 50, y: Math.random() * 200 + 50 }
    };
    setWorkflowNodes(prev => [...prev, newNode]);
  };

  const handleNodeDrag = useCallback((nodeId: string, e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDraggedNode(nodeId);
    setDragOffset({
      x: e.clientX - rect.left - workflowNodes.find(n => n.id === nodeId)!.position.x,
      y: e.clientY - rect.top - workflowNodes.find(n => n.id === nodeId)!.position.y
    });
  }, [workflowNodes]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedNode || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    setWorkflowNodes(prev => prev.map(node =>
      node.id === draggedNode
        ? { ...node, position: { x: Math.max(0, Math.min(newX, 750)), y: Math.max(0, Math.min(newY, 350)) } }
        : node
    ));
  }, [draggedNode, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null);
  }, []);

  useEffect(() => {
    if (draggedNode) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedNode, handleMouseMove, handleMouseUp]);

  const createWorkflow = () => {
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      title: workflowTitle,
      description: workflowDescription,
      category: 'Custom',
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      createdAt: new Date().toISOString().split('T')[0],
      upvotes: 0,
      favorites: 0,
      views: 0,
      isPublic: true,
      isFavorited: false,
      isUpvoted: false,
      nodes: workflowNodes,
      connections: workflowConnections,
      tags: workflowTags
    };
    
    setWorkflows(prev => [newWorkflow, ...prev]);
    
    // Reset create workflow state
    setCreateStep(1);
    setSelectedTools([]);
    setWorkflowNodes([]);
    setWorkflowConnections([]);
    setWorkflowTitle('');
    setWorkflowDescription('');
    setWorkflowTags([]);
    setIsCreateWorkflowOpen(false);
  };

  const getToolInfo = (toolId: string) => {
    return availableTools.find(tool => tool.id === toolId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Content':
        return <Edit className="w-4 h-4" />;
      case 'Research':
        return <Search className="w-4 h-4" />;
      case 'Media':
        return <Volume2 className="w-4 h-4" />;
      case 'Automation':
        return <Zap className="w-4 h-4" />;
      default:
        return <Workflow className="w-4 h-4" />;
    }
  };

  // Enhanced remix handler with navigation
  const handleRemixWorkflow = (workflow: Workflow) => {
    // Prepare remix data
    const remixData = {
      action: 'remix',
      title: workflow.title,
      description: workflow.description,
      nodes: workflow.nodes,
      tools: workflow.nodes.map(node => getToolInfo(node.toolId)).filter(Boolean)
    };
    
    setIsWorkflowDetailOpen(false);
    setIsCreateWorkflowOpen(true);
    
    // Notify parent about navigation to create workflow
    if (onNavigate) {
      onNavigate('workflow-detail', 'create-workflow', remixData);
    }
  };

  // Enhanced navigation handlers
  const handleCloseDetail = () => {
    setIsWorkflowDetailOpen(false);
    setSelectedWorkflow(null);
    
    if (onNavigate) {
      onNavigate('workflow-detail', 'workflows');
    }
  };

  const handleCloseCreate = () => {
    setIsCreateWorkflowOpen(false);
    setCreateStep(1);
    setSelectedTools([]);
    setWorkflowNodes([]);
    setWorkflowConnections([]);
    setWorkflowTitle('');
    setWorkflowDescription('');
    setWorkflowTags([]);
    
    if (onNavigate) {
      onNavigate('create-workflow', 'workflows');
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Hero Section - Enhanced with workflow visualization theme */}
        <section 
          className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-muted/20 py-16 md:py-24"
          role="banner"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Workflow className="w-8 h-8 text-primary" />
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <div className="p-3 bg-success/10 rounded-full">
                  <Target className="w-8 h-8 text-success" />
                </div>
              </div>
              
              <h1 
                id="hero-heading"
                className="text-3xl md:text-5xl font-medium text-foreground mb-6 max-w-4xl mx-auto"
              >
                Combine Tools into Powerful Workflows
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Build intelligent automation pipelines by connecting your favorite AI tools. 
                From content creation to data analysis, create workflows that work for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  className="gap-2 transition-all duration-200 hover:scale-105"
                  onClick={() => setIsCreateWorkflowOpen(true)}
                  aria-describedby="create-workflow-description"
                >
                  <Plus className="w-5 h-5" />
                  Create Workflow
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => document.getElementById('popular-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Eye className="w-5 h-5" />
                  Browse Examples
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-medium text-primary">{workflows.length}</div>
                  <div className="text-sm text-muted-foreground">Workflows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-primary">{availableTools.length}</div>
                  <div className="text-sm text-muted-foreground">Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-primary">
                    {workflows.reduce((sum, w) => sum + w.upvotes, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Upvotes</div>
                </div>
              </div>
            </motion.div>
          </div>
          <p id="create-workflow-description" className="sr-only">
            Open the workflow creation dialog
          </p>
        </section>

        {/* Popular Combinations Section */}
        <section 
          id="popular-section"
          className="max-w-7xl mx-auto px-6 py-16"
          aria-labelledby="popular-heading"
        >
          <div className="text-center mb-12">
            <h2 id="popular-heading" className="text-2xl font-medium mb-4">
              Popular Combinations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover workflows created by the community. Get inspired and build upon proven automation patterns.
            </p>
          </div>

          {/* Featured Carousel - Mobile and Desktop */}
          <div className="mb-12">
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {workflows.slice(0, 3).map((workflow, index) => (
                  <CarouselItem key={workflow.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group h-full"
                        onClick={() => handleWorkflowClick(workflow)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleWorkflowClick(workflow);
                          }
                        }}
                        aria-label={`View workflow: ${workflow.title}`}
                      >
                        {/* Cover Image */}
                        <div className="relative aspect-video overflow-hidden rounded-t-lg">
                          {workflow.coverImage ? (
                            <ImageWithFallback
                              src={workflow.coverImage}
                              alt={workflow.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <Workflow className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className="bg-background/90 text-foreground gap-1">
                              {getCategoryIcon(workflow.category)}
                              {workflow.category}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-3">
                          <CardTitle className="group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {workflow.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {workflow.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {/* Workflow Preview - Tool Chain */}
                          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                            {workflow.nodes.slice(0, 4).map((node, nodeIndex) => {
                              const tool = getToolInfo(node.toolId);
                              if (!tool) return null;
                              
                              return (
                                <React.Fragment key={node.id}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className={`p-2 rounded-lg ${tool.color} flex-shrink-0`}>
                                        <tool.icon className="w-4 h-4 text-white" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{tool.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  
                                  {nodeIndex < workflow.nodes.length - 1 && nodeIndex < 3 && (
                                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  )}
                                </React.Fragment>
                              );
                            })}
                            {workflow.nodes.length > 4 && (
                              <div className="text-xs text-muted-foreground whitespace-nowrap">
                                +{workflow.nodes.length - 4}
                              </div>
                            )}
                          </div>

                          {/* Author and Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={workflow.authorAvatar} alt={workflow.author} />
                                <AvatarFallback className="text-xs">
                                  {workflow.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{workflow.author}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <button 
                                className={`flex items-center gap-1 hover:text-primary transition-colors ${
                                  workflow.isUpvoted ? 'text-primary' : ''
                                }`}
                                onClick={(e) => handleUpvote(workflow.id, e)}
                                aria-label={`${workflow.isUpvoted ? 'Remove upvote' : 'Upvote'} workflow`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                {workflow.upvotes}
                              </button>
                              <button 
                                className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                                  workflow.isFavorited ? 'text-red-500' : ''
                                }`}
                                onClick={(e) => handleFavorite(workflow.id, e)}
                                aria-label={`${workflow.isFavorited ? 'Remove from favorites' : 'Add to favorites'}`}
                              >
                                <Heart className="w-3 h-3" />
                                {workflow.favorites}
                              </button>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-3">
                            {workflow.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {workflow.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{workflow.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    type="search"
                    placeholder="Search workflows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    aria-label="Search workflows by title, description, or tags"
                  />
                </div>
                
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger 
                    className="w-full md:w-48 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    aria-label="Filter by category"
                  >
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Content">Content Creation</SelectItem>
                    <SelectItem value="Research">Research & Analysis</SelectItem>
                    <SelectItem value="Media">Media Production</SelectItem>
                    <SelectItem value="Automation">Business Automation</SelectItem>
                    <SelectItem value="Custom">Custom Workflows</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsCreateWorkflowOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Create New
                </Button>
              </div>
            </Card>
          </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="grid" aria-label="Workflows grid">
            {filteredWorkflows.map((workflow) => (
              <Card 
                key={workflow.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                onClick={() => handleWorkflowClick(workflow)}
                role="gridcell"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleWorkflowClick(workflow);
                  }
                }}
                aria-label={`Workflow: ${workflow.title} by ${workflow.author}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="gap-1">
                      {getCategoryIcon(workflow.category)}
                      {workflow.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{workflow.views}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {workflow.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {workflow.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Tool Chain Preview */}
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                    {workflow.nodes.slice(0, 5).map((node, nodeIndex) => {
                      const tool = getToolInfo(node.toolId);
                      if (!tool) return null;
                      
                      return (
                        <React.Fragment key={node.id}>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className={`p-2 rounded-lg ${tool.color} flex-shrink-0`}>
                                <tool.icon className="w-4 h-4 text-white" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tool.name}</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          {nodeIndex < workflow.nodes.length - 1 && nodeIndex < 4 && (
                            <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          )}
                        </React.Fragment>
                      );
                    })}
                    {workflow.nodes.length > 5 && (
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        +{workflow.nodes.length - 5}
                      </div>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={workflow.authorAvatar} alt={workflow.author} />
                      <AvatarFallback className="text-xs">
                        {workflow.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{workflow.author}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(workflow.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <button 
                        className={`flex items-center gap-1 hover:text-primary transition-colors ${
                          workflow.isUpvoted ? 'text-primary' : ''
                        }`}
                        onClick={(e) => handleUpvote(workflow.id, e)}
                        aria-label={`${workflow.isUpvoted ? 'Remove upvote' : 'Upvote'} workflow`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {workflow.upvotes}
                      </button>
                      <button 
                        className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                          workflow.isFavorited ? 'text-red-500' : ''
                        }`}
                        onClick={(e) => handleFavorite(workflow.id, e)}
                        aria-label={`${workflow.isFavorited ? 'Remove from favorites' : 'Add to favorites'}`}
                      >
                        <Heart className="w-4 h-4" />
                        {workflow.favorites}
                      </button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkflowClick(workflow);
                      }}
                    >
                      <Play className="w-4 h-4" />
                      View
                    </Button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {workflow.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredWorkflows.length === 0 && (
            <div className="text-center py-16">
              <Workflow className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No workflows found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or create a new workflow.
              </p>
              <Button onClick={() => setIsCreateWorkflowOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Workflow
              </Button>
            </div>
          )}
        </section>

        {/* Create Workflow Modal */}
        <Dialog open={isCreateWorkflowOpen} onOpenChange={handleCloseCreate}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" aria-describedby="create-workflow-description-modal">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription id="create-workflow-description-modal">
                Build a custom workflow by connecting AI tools together
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <Tabs value={createStep.toString()} onValueChange={(v) => setCreateStep(parseInt(v))}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="1" className="gap-2">
                    <Search className="w-4 h-4" />
                    Select Tools
                  </TabsTrigger>
                  <TabsTrigger value="2" className="gap-2">
                    <Workflow className="w-4 h-4" />
                    Build Flow
                  </TabsTrigger>
                  <TabsTrigger value="3" className="gap-2">
                    <Save className="w-4 h-4" />
                    Configure & Save
                  </TabsTrigger>
                </TabsList>

                {/* Step 1: Select Tools */}
                <TabsContent value="1" className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Choose your tools</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Select the AI tools you want to connect in your workflow. You can add more later.
                    </p>

                    {/* Tool Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableTools.map((tool) => (
                        <Card 
                          key={tool.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedTools.find(t => t.id === tool.id)
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:shadow-md hover:scale-[1.02]'
                          }`}
                          onClick={() => handleToolSelection(tool)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-lg ${tool.color}`}>
                                <tool.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{tool.name}</h4>
                                  {tool.isPopular && (
                                    <Badge variant="secondary" className="text-xs">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{tool.category}</p>
                              </div>
                              <Checkbox 
                                checked={!!selectedTools.find(t => t.id === tool.id)}
                                onChange={() => handleToolSelection(tool)}
                                aria-label={`Select ${tool.name}`}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <div className="text-sm text-muted-foreground">
                        {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected
                      </div>
                      <Button 
                        onClick={() => setCreateStep(2)} 
                        disabled={selectedTools.length === 0}
                        className="gap-2"
                      >
                        Next: Build Flow
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Step 2: Build Flow */}
                <TabsContent value="2" className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Design your workflow</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Drag tools onto the canvas and connect them to create your workflow. Click and drag to move nodes around.
                    </p>

                    <div className="grid grid-cols-12 gap-6">
                      {/* Tool Palette */}
                      <div className="col-span-12 lg:col-span-3">
                        <Card className="h-96">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Available Tools</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ScrollArea className="h-80">
                              <div className="space-y-2">
                                {selectedTools.map((tool) => (
                                  <div 
                                    key={tool.id}
                                    className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => addNodeToCanvas(tool)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        addNodeToCanvas(tool);
                                      }
                                    }}
                                    aria-label={`Add ${tool.name} to canvas`}
                                  >
                                    <div className={`p-2 rounded ${tool.color}`}>
                                      <tool.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">{tool.name}</div>
                                      <div className="text-xs text-muted-foreground">{tool.category}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Canvas */}
                      <div className="col-span-12 lg:col-span-9">
                        <Card className="h-96">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">Workflow Canvas</CardTitle>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setWorkflowNodes([])}
                                  className="gap-2"
                                  disabled={workflowNodes.length === 0}
                                >
                                  <RotateCcw className="w-4 h-4" />
                                  Clear
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div 
                              ref={canvasRef}
                              className="relative w-full h-80 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 overflow-hidden"
                              onMouseMove={handleMouseMove}
                              onMouseUp={handleMouseUp}
                            >
                              {workflowNodes.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                  <div className="text-center">
                                    <Workflow className="w-12 h-12 mx-auto mb-2" />
                                    <p className="text-sm">Click tools from the palette to add them here</p>
                                  </div>
                                </div>
                              )}

                              {/* Render Nodes */}
                              <AnimatePresence>
                                {workflowNodes.map((node) => {
                                  const tool = getToolInfo(node.toolId);
                                  if (!tool) return null;

                                  return (
                                    <motion.div
                                      key={node.id}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      className="absolute cursor-move group"
                                      style={{
                                        left: node.position.x,
                                        top: node.position.y
                                      }}
                                      onMouseDown={(e) => handleNodeDrag(node.id, e)}
                                    >
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <div className={`p-3 rounded-lg ${tool.color} shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-primary/20`}>
                                            <tool.icon className="w-6 h-6 text-white" />
                                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                              {tool.name}
                                            </div>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{tool.name} - {tool.description}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </motion.div>
                                  );
                                })}
                              </AnimatePresence>

                              {/* Connection Lines (Simple version) */}
                              {workflowConnections.map((connection) => {
                                const fromNode = workflowNodes.find(n => n.id === connection.from);
                                const toNode = workflowNodes.find(n => n.id === connection.to);
                                
                                if (!fromNode || !toNode) return null;

                                return (
                                  <svg
                                    key={connection.id}
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ width: '100%', height: '100%' }}
                                  >
                                    <defs>
                                      <marker
                                        id={`arrowhead-${connection.id}`}
                                        markerWidth="10"
                                        markerHeight="7"
                                        refX="9"
                                        refY="3.5"
                                        orient="auto"
                                      >
                                        <polygon
                                          points="0 0, 10 3.5, 0 7"
                                          className="fill-primary"
                                        />
                                      </marker>
                                    </defs>
                                    <line
                                      x1={fromNode.position.x + 24}
                                      y1={fromNode.position.y + 24}
                                      x2={toNode.position.x + 24}
                                      y2={toNode.position.y + 24}
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      className="text-primary"
                                      markerEnd={`url(#arrowhead-${connection.id})`}
                                    />
                                  </svg>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCreateStep(1)}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button 
                        onClick={() => setCreateStep(3)} 
                        disabled={workflowNodes.length === 0}
                        className="gap-2"
                      >
                        Next: Configure
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Step 3: Configure & Save */}
                <TabsContent value="3" className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Configure your workflow</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Add details about your workflow to help others understand and use it.
                    </p>

                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 lg:col-span-8 space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="workflow-title">Title *</Label>
                            <Input
                              id="workflow-title"
                              placeholder="Enter workflow title..."
                              value={workflowTitle}
                              onChange={(e) => setWorkflowTitle(e.target.value)}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="workflow-description">Description *</Label>
                            <Textarea
                              id="workflow-description"
                              placeholder="Describe what your workflow does and how to use it..."
                              value={workflowDescription}
                              onChange={(e) => setWorkflowDescription(e.target.value)}
                              className="mt-1 min-h-[100px]"
                            />
                          </div>

                          <div>
                            <Label htmlFor="workflow-tags">Tags</Label>
                            <Input
                              id="workflow-tags"
                              placeholder="Enter tags separated by commas..."
                              onChange={(e) => setWorkflowTags(e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                              className="mt-1"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Add relevant tags to help others discover your workflow
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-12 lg:col-span-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Workflow Preview</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-2">Tools ({workflowNodes.length})</p>
                              <div className="flex flex-wrap gap-1">
                                {workflowNodes.slice(0, 6).map((node) => {
                                  const tool = getToolInfo(node.toolId);
                                  if (!tool) return null;
                                  
                                  return (
                                    <div key={node.id} className={`p-1 rounded ${tool.color}`}>
                                      <tool.icon className="w-3 h-3 text-white" />
                                    </div>
                                  );
                                })}
                                {workflowNodes.length > 6 && (
                                  <div className="px-2 py-1 bg-muted rounded text-xs">
                                    +{workflowNodes.length - 6}
                                  </div>
                                )}
                              </div>
                            </div>

                            {workflowTags.length > 0 && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-2">Tags</p>
                                <div className="flex flex-wrap gap-1">
                                  {workflowTags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <Separator />

                            <div className="flex items-center gap-2">
                              <Switch id="public-workflow" defaultChecked />
                              <Label htmlFor="public-workflow" className="text-sm">
                                Make public
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Public workflows can be discovered and used by the community
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setCreateStep(2)}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button 
                        onClick={createWorkflow}
                        disabled={!workflowTitle || !workflowDescription || workflowNodes.length === 0}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Create Workflow
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>

        {/* Workflow Detail Modal */}
        <Dialog open={isWorkflowDetailOpen} onOpenChange={handleCloseDetail}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" aria-describedby="workflow-detail-description">
            {selectedWorkflow && (
              <>
                <DialogHeader className="sticky top-0 bg-background z-10 pb-6 border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="gap-1">
                          {getCategoryIcon(selectedWorkflow.category)}
                          {selectedWorkflow.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {selectedWorkflow.nodes.length} tools
                        </Badge>
                      </div>
                      <DialogTitle className="text-xl font-medium mb-2">
                        {selectedWorkflow.title}
                      </DialogTitle>
                      <DialogDescription id="workflow-detail-description" className="text-base">
                        {selectedWorkflow.description}
                      </DialogDescription>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                          // Handle remix functionality
                          console.log('Remix workflow:', selectedWorkflow);
                          handleRemixWorkflow(selectedWorkflow);
                        }}
                      >
                        <Copy className="w-4 h-4" />
                        Remix
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <Bookmark className="w-4 h-4" />
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* Author and Stats */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={selectedWorkflow.authorAvatar} alt={selectedWorkflow.author} />
                        <AvatarFallback className="text-xs">
                          {selectedWorkflow.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedWorkflow.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedWorkflow.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Separator orientation="vertical" className="h-8" />
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{selectedWorkflow.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{selectedWorkflow.favorites}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedWorkflow.views}</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="pt-6">
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview" className="gap-2">
                        <Workflow className="w-4 h-4" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="steps" className="gap-2">
                        <Play className="w-4 h-4" />
                        Steps
                      </TabsTrigger>
                      <TabsTrigger value="discussion" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Discussion ({mockComments.length})
                      </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                      {/* Workflow Visualization */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Workflow Diagram</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative w-full h-64 bg-muted/20 rounded-lg border overflow-hidden">
                            {/* Render workflow nodes for display */}
                            {selectedWorkflow.nodes.map((node) => {
                              const tool = getToolInfo(node.toolId);
                              if (!tool) return null;

                              return (
                                <div
                                  key={node.id}
                                  className="absolute"
                                  style={{
                                    left: node.position.x,
                                    top: node.position.y
                                  }}
                                >
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className={`p-3 rounded-lg ${tool.color} shadow-md`}>
                                        <tool.icon className="w-6 h-6 text-white" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{tool.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              );
                            })}

                            {/* Render connections */}
                            {selectedWorkflow.connections.map((connection) => {
                              const fromNode = selectedWorkflow.nodes.find(n => n.id === connection.from);
                              const toNode = selectedWorkflow.nodes.find(n => n.id === connection.to);
                              
                              if (!fromNode || !toNode) return null;

                              return (
                                <svg
                                  key={connection.id}
                                  className="absolute inset-0 pointer-events-none"
                                  style={{ width: '100%', height: '100%' }}
                                >
                                  <defs>
                                    <marker
                                      id={`arrowhead-detail-${connection.id}`}
                                      markerWidth="10"
                                      markerHeight="7"
                                      refX="9"
                                      refY="3.5"
                                      orient="auto"
                                    >
                                      <polygon
                                        points="0 0, 10 3.5, 0 7"
                                        className="fill-primary"
                                      />
                                    </marker>
                                  </defs>
                                  <line
                                    x1={fromNode.position.x + 24}
                                    y1={fromNode.position.y + 24}
                                    x2={toNode.position.x + 24}
                                    y2={toNode.position.y + 24}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-primary"
                                    markerEnd={`url(#arrowhead-detail-${connection.id})`}
                                  />
                                </svg>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tools Used */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Tools Used</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedWorkflow.nodes.map((node, index) => {
                              const tool = getToolInfo(node.toolId);
                              if (!tool) return null;

                              return (
                                <div key={node.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center font-medium">
                                      {index + 1}
                                    </div>
                                    <div className={`p-2 rounded ${tool.color}`}>
                                      <tool.icon className="w-4 h-4 text-white" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{tool.name}</p>
                                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tags */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Tags</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedWorkflow.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Steps Tab - Mobile optimized */}
                    <TabsContent value="steps" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Step-by-Step Guide</CardTitle>
                          <CardDescription>
                            Follow these steps to implement this workflow
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {/* Desktop: Horizontal Steps */}
                          <div className="hidden md:block">
                            <div className="relative">
                              <div className="flex items-center justify-between mb-8">
                                {selectedWorkflow.nodes.map((node, index) => {
                                  const tool = getToolInfo(node.toolId);
                                  if (!tool) return null;

                                  return (
                                    <React.Fragment key={node.id}>
                                      <div className="flex flex-col items-center">
                                        <div className={`p-4 rounded-full ${tool.color} mb-3`}>
                                          <tool.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-center">
                                          <p className="font-medium">{tool.name}</p>
                                          <p className="text-xs text-muted-foreground max-w-20">
                                            Step {index + 1}
                                          </p>
                                        </div>
                                      </div>
                                      {index < selectedWorkflow.nodes.length - 1 && (
                                        <ArrowRight className="w-6 h-6 text-muted-foreground" />
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Mobile: Vertical Steps */}
                          <div className="md:hidden space-y-4">
                            {selectedWorkflow.nodes.map((node, index) => {
                              const tool = getToolInfo(node.toolId);
                              if (!tool) return null;

                              return (
                                <div key={node.id} className="flex items-start gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className={`p-3 rounded-full ${tool.color}`}>
                                      <tool.icon className="w-5 h-5 text-white" />
                                    </div>
                                    {index < selectedWorkflow.nodes.length - 1 && (
                                      <div className="w-px h-8 bg-border mt-2" />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-6">
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="font-medium">{tool.name}</p>
                                      <Badge variant="outline" className="text-xs">
                                        Step {index + 1}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {tool.description}
                                    </p>
                                    <p className="text-sm">
                                      Configure {tool.name} for your specific use case and connect the output to the next step.
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <Separator className="my-6" />

                          <div className="space-y-4">
                            <h4 className="font-medium">Implementation Tips</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li>• Start with test data to verify each step works correctly</li>
                              <li>• Set up proper error handling between tool connections</li>
                              <li>• Monitor usage and costs for each integrated service</li>
                              <li>• Create backup workflows for critical automation</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Discussion Tab */}
                    <TabsContent value="discussion" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Community Discussion</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* Add Comment */}
                          <div className="mb-6 p-4 border rounded-lg">
                            <Textarea 
                              placeholder="Share your thoughts, ask questions, or provide feedback..."
                              className="mb-3"
                            />
                            <Button size="sm" className="gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Post Comment
                            </Button>
                          </div>

                          {/* Comments */}
                          <div className="space-y-4">
                            {mockComments.map((comment) => (
                              <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                  <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                                  <AvatarFallback className="text-xs">
                                    {comment.author.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(comment.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm mb-2">{comment.content}</p>
                                  <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                      <ThumbsUp className="w-3 h-3" />
                                      {comment.likes}
                                    </button>
                                    <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}