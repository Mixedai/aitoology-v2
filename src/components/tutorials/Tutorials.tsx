import { useEffect,useState, } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Filter, 
  Search, 
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  User,
  Calendar,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Download,
  Code,
  Eye,
  Users,
  Star,
  Award,
  TrendingUp,
  Zap,
  Brain,
  Image as ImageIcon,
  Volume2,
  Bot
} from 'lucide-react';

// Tutorial data types
interface Tutorial {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: 'LLM' | 'Image' | 'Audio' | 'Agents';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  type: 'video' | 'article';
  author: string;
  authorAvatar: string;
  publishedAt: string;
  views: number;
  likes: number;
  isCompleted: boolean;
  videoUrl?: string;
  content?: string;
  steps?: TutorialStep[];
  tags: string[];
}

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  codeSnippet?: string;
  screenshot?: string;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

// Mock data
const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with ChatGPT API',
    description: 'Learn how to integrate ChatGPT API into your applications with practical examples.',
    coverImage: 'https://images.unsplash.com/photo-1745674684639-9cef0092212c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTUyOTQ3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'LLM',
    difficulty: 'Beginner',
    duration: 15,
    type: 'video',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b8fe0e3c?w=150',
    publishedAt: '2024-01-15',
    views: 2340,
    likes: 187,
    isCompleted: false,
    videoUrl: 'https://example.com/video1',
    tags: ['API', 'OpenAI', 'Integration'],
    steps: [
      {
        id: 'step-1',
        title: 'API Key Setup',
        content: 'First, you need to get your API key from OpenAI platform.',
        codeSnippet: 'const apiKey = process.env.OPENAI_API_KEY;'
      },
      {
        id: 'step-2',
        title: 'Making Your First Request',
        content: 'Let\'s make a simple API call to ChatGPT.',
        codeSnippet: `const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});`
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Prompt Engineering Techniques',
    description: 'Master the art of crafting effective prompts for better AI responses.',
    coverImage: 'https://images.unsplash.com/photo-1717583191083-cd82ed7f217e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjB0dXRvcmlhbHxlbnwxfHx8fDE3NTUyOTQ3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'LLM',
    difficulty: 'Advanced',
    duration: 25,
    type: 'article',
    author: 'Dr. Michael Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    publishedAt: '2024-01-12',
    views: 1876,
    likes: 243,
    isCompleted: true,
    tags: ['Prompt Engineering', 'LLM', 'Best Practices']
  },
  {
    id: '3',
    title: 'Creating AI-Generated Images with DALL-E',
    description: 'Step-by-step guide to generating stunning images using AI.',
    coverImage: 'https://images.unsplash.com/photo-1661205827673-4330f088f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1NTI3MTMyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Image',
    difficulty: 'Intermediate',
    duration: 12,
    type: 'video',
    author: 'Emma Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    publishedAt: '2024-01-10',
    views: 3421,
    likes: 298,
    isCompleted: false,
    tags: ['DALL-E', 'Image Generation', 'Creative AI']
  },
  {
    id: '4',
    title: 'Voice Synthesis with AI Audio Tools',
    description: 'Learn to create realistic voice synthesis using modern AI audio tools.',
    coverImage: 'https://images.unsplash.com/photo-1724185773486-0b39642e607e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpbyUyMHdhdmVmb3JtJTIwc291bmR8ZW58MXx8fHwxNzU1Mjk0NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Audio',
    difficulty: 'Intermediate',
    duration: 18,
    type: 'article',
    author: 'Alex Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    publishedAt: '2024-01-08',
    views: 1567,
    likes: 134,
    isCompleted: false,
    tags: ['Voice Synthesis', 'Audio AI', 'TTS']
  },
  {
    id: '5',
    title: 'Building Your First AI Agent',
    description: 'Create an intelligent agent that can perform tasks autonomously.',
    coverImage: 'https://images.unsplash.com/photo-1703668929798-67cab2e41f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NTI5NDc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Agents',
    difficulty: 'Advanced',
    duration: 35,
    type: 'video',
    author: 'David Park',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    publishedAt: '2024-01-05',
    views: 2198,
    likes: 312,
    isCompleted: false,
    tags: ['AI Agents', 'Automation', 'LangChain']
  },
  {
    id: '6',
    title: 'Fine-tuning Language Models',
    description: 'Advanced techniques for customizing LLMs for specific use cases.',
    coverImage: 'https://images.unsplash.com/photo-1654375408506-d46c2b43308f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2dyYW1taW5nJTIwY29kZXxlbnwxfHx8fDE3NTUyOTQ3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'LLM',
    difficulty: 'Advanced',
    duration: 45,
    type: 'article',
    author: 'Dr. Lisa Wang',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    publishedAt: '2024-01-03',
    views: 987,
    likes: 156,
    isCompleted: false,
    tags: ['Fine-tuning', 'Machine Learning', 'Custom Models']
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'John Doe',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    content: 'Great tutorial! The code examples were really helpful.',
    timestamp: '2024-01-16T10:30:00Z',
    likes: 12,
    replies: [
      {
        id: '1-1',
        author: 'Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b8fe0e3c?w=150',
        content: 'Thanks John! Glad you found it useful.',
        timestamp: '2024-01-16T11:15:00Z',
        likes: 3
      }
    ]
  },
  {
    id: '2',
    author: 'Maria Garcia',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    content: 'Could you add more examples for error handling?',
    timestamp: '2024-01-16T14:22:00Z',
    likes: 8
  }
];

interface TutorialsProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  navigationState?: {
    detailView: string | null;
    modalState: string | null;
    selectedItem: any;
  };
  selectedItem?: any;
  detailView?: string | null;
}

export function Tutorials({ 
  onNavigate, 
  navigationState, 
  selectedItem, 
  detailView 
}: TutorialsProps = {}) {
  const [tutorials, setTutorials] = useState<Tutorial[]>(mockTutorials);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);

  // Handle navigation state from parent
  useEffect(() => {
    if (detailView === 'detail' && selectedItem) {
      setSelectedTutorial(selectedItem);
      setIsDetailModalOpen(true);
    }
  }, [detailView, selectedItem]);

  // Calculate completion progress
  const completedTutorials = tutorials.filter(t => t.isCompleted).length;
  const completionPercentage = Math.round((completedTutorials / tutorials.length) * 100);

  // Filter tutorials based on selected criteria
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    
    let matchesDuration = true;
    if (selectedDuration !== 'all') {
      switch (selectedDuration) {
        case 'short':
          matchesDuration = tutorial.duration <= 15;
          break;
        case 'medium':
          matchesDuration = tutorial.duration > 15 && tutorial.duration <= 30;
          break;
        case 'long':
          matchesDuration = tutorial.duration > 30;
          break;
      }
    }

    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
  });

  const toggleTutorialCompletion = (tutorialId: string) => {
    setTutorials(prev => prev.map(tutorial => 
      tutorial.id === tutorialId 
        ? { ...tutorial, isCompleted: !tutorial.isCompleted }
        : tutorial
    ));
  };

  const handleTutorialClick = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setIsDetailModalOpen(true);
    
    // Notify parent about navigation if callback exists
    if (onNavigate) {
      onNavigate('tutorials', 'tutorial-detail', tutorial);
    }
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'LLM':
        return <Brain className="w-4 h-4" />;
      case 'Image':
        return <ImageIcon className="w-4 h-4" />;
      case 'Audio':
        return <Volume2 className="w-4 h-4" />;
      case 'Agents':
        return <Bot className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-warning text-warning-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Enhanced navigation handler for smooth transitions
  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedTutorial(null);
    
    // Notify parent about navigation back
    if (onNavigate) {
      onNavigate('tutorial-detail', 'tutorials');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Enhanced with better contrast and visual hierarchy */}
      <section 
        className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-muted/20 py-16 md:py-24"
        role="banner"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 
            id="hero-heading"
            className="text-3xl md:text-5xl font-medium text-foreground mb-6 max-w-4xl mx-auto"
          >
            Learn How to Use AI Tools Smarter
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Master AI tools with our comprehensive tutorials. From beginner guides to advanced techniques, 
            level up your skills with practical, hands-on learning.
          </p>
          
          {/* Progress Section - Added for better user engagement */}
          <div className="bg-card/80 backdrop-blur-sm border rounded-lg p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-muted-foreground">{completedTutorials}/{tutorials.length} completed</span>
            </div>
            <Progress 
              value={completionPercentage} 
              className="mb-2" 
              aria-label={`${completionPercentage}% of tutorials completed`}
            />
            <p className="text-xs text-muted-foreground">{completionPercentage}% complete</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 transition-all duration-200 hover:scale-105"
              onClick={() => document.getElementById('tutorials-section')?.scrollIntoView({ behavior: 'smooth' })}
              aria-describedby="cta-description"
            >
              <Play className="w-5 h-5" />
              Start Learning
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              aria-label="View learning statistics"
            >
              <TrendingUp className="w-5 h-5" />
              View Stats
            </Button>
          </div>
          <p id="cta-description" className="sr-only">
            Scroll to the tutorials section to begin learning
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section 
        id="tutorials-section"
        className="max-w-7xl mx-auto px-6 py-12"
        role="main"
        aria-labelledby="tutorials-heading"
      >
        {/* Header with Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 id="tutorials-heading" className="text-2xl font-medium mb-2">
                All Tutorials
              </h2>
              <p className="text-muted-foreground">
                {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            {/* Search - Enhanced with better accessibility */}
            <div className="relative w-full md:w-80 mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                aria-label="Search tutorials by title, description, or tags"
              />
            </div>
          </div>

          {/* Filters - Enhanced mobile experience with collapsible design */}
          <Card className="p-4">
            <div className="flex items-center justify-between md:hidden mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="gap-2"
                aria-expanded={isMobileFiltersOpen}
                aria-controls="mobile-filters"
              >
                <Filter className="w-4 h-4" />
                {isMobileFiltersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>

            <Collapsible open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <CollapsibleContent 
                id="mobile-filters"
                className="md:block"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="category-filter" className="text-sm font-medium">
                      Category
                    </Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger 
                        id="category-filter"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-label="Filter by category"
                      >
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="LLM">
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Large Language Models
                          </div>
                        </SelectItem>
                        <SelectItem value="Image">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Image Generation
                          </div>
                        </SelectItem>
                        <SelectItem value="Audio">
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4" />
                            Audio Processing
                          </div>
                        </SelectItem>
                        <SelectItem value="Agents">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4" />
                            AI Agents
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="difficulty-filter" className="text-sm font-medium">
                      Difficulty
                    </Label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger 
                        id="difficulty-filter"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-label="Filter by difficulty level"
                      >
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration Filter */}
                  <div className="space-y-2">
                    <Label htmlFor="duration-filter" className="text-sm font-medium">
                      Duration
                    </Label>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger 
                        id="duration-filter"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        aria-label="Filter by tutorial duration"
                      >
                        <SelectValue placeholder="Any Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Duration</SelectItem>
                        <SelectItem value="short">Quick (≤15 min)</SelectItem>
                        <SelectItem value="medium">Medium (16-30 min)</SelectItem>
                        <SelectItem value="long">Deep Dive (30+ min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium invisible md:visible">Actions</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedDifficulty('all');
                        setSelectedDuration('all');
                        setSearchQuery('');
                      }}
                      aria-label="Clear all filters and search"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Tutorials Grid - Enhanced with better spacing and hover states */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="grid"
          aria-label="Tutorials grid"
        >
          {filteredTutorials.map((tutorial) => (
            <Card
              key={tutorial.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary/20"
              onClick={() => handleTutorialClick(tutorial)}
              role="gridcell"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTutorialClick(tutorial);
                }
              }}
              aria-label={`${tutorial.title} - ${tutorial.difficulty} level ${tutorial.type} tutorial`}
            >
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={tutorial.coverImage}
                  alt={`Cover image for ${tutorial.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  {tutorial.type === 'video' ? (
                    <Play className="w-12 h-12 text-white" aria-hidden="true" />
                  ) : (
                    <BookOpen className="w-12 h-12 text-white" aria-hidden="true" />
                  )}
                </div>
                
                {/* Completion Badge */}
                <div className="absolute top-3 right-3">
                  <Button
                    size="sm"
                    variant={tutorial.isCompleted ? "default" : "secondary"}
                    className={`w-8 h-8 p-0 rounded-full transition-all duration-200 ${
                      tutorial.isCompleted 
                        ? 'bg-success hover:bg-success/90' 
                        : 'bg-background/80 hover:bg-background'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTutorialCompletion(tutorial.id);
                    }}
                    aria-label={tutorial.isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {tutorial.isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Type Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-background/90 text-foreground gap-1"
                  >
                    {tutorial.type === 'video' ? (
                      <Play className="w-3 h-3" />
                    ) : (
                      <BookOpen className="w-3 h-3" />
                    )}
                    {tutorial.type}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(tutorial.category)}
                    <Badge variant="outline" className="text-xs">
                      {tutorial.category}
                    </Badge>
                  </div>
                  <Badge 
                    className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}
                  >
                    {tutorial.difficulty}
                  </Badge>
                </div>

                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                  {tutorial.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {tutorial.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Tutorial Metadata */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{tutorial.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{tutorial.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{tutorial.likes}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={tutorial.authorAvatar} alt={tutorial.author} />
                    <AvatarFallback className="text-xs">
                      {tutorial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{tutorial.author}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(tutorial.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {tutorial.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tutorial.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{tutorial.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tutorials found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Tutorial Detail Modal - Enhanced with better accessibility and layout */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent 
          className="max-w-6xl max-h-[90vh] overflow-y-auto"
          aria-describedby="tutorial-detail-description"
        >
          {selectedTutorial && (
            <>
              <DialogHeader className="sticky top-0 bg-background z-10 pb-6 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-xl font-medium mb-2">
                      {selectedTutorial.title}
                    </DialogTitle>
                    <DialogDescription id="tutorial-detail-description" className="text-base">
                      {selectedTutorial.description}
                    </DialogDescription>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={selectedTutorial.isCompleted ? "default" : "outline"}
                      className={`gap-2 ${
                        selectedTutorial.isCompleted 
                          ? 'bg-success hover:bg-success/90' 
                          : ''
                      }`}
                      onClick={() => toggleTutorialCompletion(selectedTutorial.id)}
                    >
                      {selectedTutorial.isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      {selectedTutorial.isCompleted ? 'Completed' : 'Mark Complete'}
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Bookmark className="w-4 h-4" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Tutorial Metadata */}
                <div className="flex flex-wrap items-center gap-4 pt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedTutorial.authorAvatar} alt={selectedTutorial.author} />
                      <AvatarFallback className="text-xs">
                        {selectedTutorial.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedTutorial.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedTutorial.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-8" />
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(selectedTutorial.category)}
                      <span>{selectedTutorial.category}</span>
                    </div>
                    <Badge className={getDifficultyColor(selectedTutorial.difficulty)}>
                      {selectedTutorial.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedTutorial.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedTutorial.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="pt-6">
                <Tabs defaultValue="content" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content" className="gap-2">
                      {selectedTutorial.type === 'video' ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="discussion" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Discussion ({comments.length})
                    </TabsTrigger>
                  </TabsList>

                  {/* Tutorial Content */}
                  <TabsContent value="content" className="space-y-6">
                    {selectedTutorial.type === 'video' ? (
                      /* Video Player Placeholder */
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Video Player</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedTutorial.videoUrl}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Article Content */
                      <div className="prose prose-sm max-w-none">
                        <ImageWithFallback
                          src={selectedTutorial.coverImage}
                          alt={selectedTutorial.title}
                          className="w-full aspect-video object-cover rounded-lg mb-6"
                        />
                      </div>
                    )}

                    {/* Tutorial Steps */}
                    {selectedTutorial.steps && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Tutorial Steps</h3>
                        {selectedTutorial.steps.map((step, index) => (
                          <Card key={step.id} className="p-6">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="flex-1 space-y-4">
                                <h4 className="font-medium">{step.title}</h4>
                                <p className="text-muted-foreground">{step.content}</p>
                                
                                {step.codeSnippet && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <Label className="text-sm font-medium">Code Example</Label>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-2"
                                        onClick={() => navigator.clipboard.writeText(step.codeSnippet!)}
                                      >
                                        <Copy className="w-3 h-3" />
                                        Copy
                                      </Button>
                                    </div>
                                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                                      <code>{step.codeSnippet}</code>
                                    </pre>
                                  </div>
                                )}
                                
                                {step.screenshot && (
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Screenshot</Label>
                                    <ImageWithFallback
                                      src={step.screenshot}
                                      alt={`Screenshot for ${step.title}`}
                                      className="w-full rounded-lg border"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTutorial.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Discussion Tab */}
                  <TabsContent value="discussion" className="space-y-6">
                    {/* Add Comment */}
                    <Card className="p-6">
                      <h3 className="font-medium mb-4">Add a Comment</h3>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Share your thoughts, ask questions, or provide feedback..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px]"
                          aria-label="Write a comment"
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={addComment}
                            disabled={!newComment.trim()}
                            className="gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </Card>

                    {/* Comments List */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Comments ({comments.length})</h3>
                      
                      {comments.length === 0 ? (
                        <Card className="p-8 text-center">
                          <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                        </Card>
                      ) : (
                        comments.map((comment) => (
                          <Card key={comment.id} className="p-6">
                            <div className="flex gap-4">
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                                <AvatarFallback className="text-xs">
                                  {comment.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{comment.author}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(comment.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                                
                                <p className="text-sm">{comment.content}</p>
                                
                                <div className="flex items-center gap-4">
                                  <Button variant="ghost" size="sm" className="gap-1 h-8">
                                    <ThumbsUp className="w-3 h-3" />
                                    {comment.likes}
                                  </Button>
                                  <Button variant="ghost" size="sm" className="gap-1 h-8">
                                    <MessageCircle className="w-3 h-3" />
                                    Reply
                                  </Button>
                                </div>

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                  <div className="ml-6 pt-4 space-y-4 border-l-2 border-muted pl-4">
                                    {comment.replies.map((reply) => (
                                      <div key={reply.id} className="flex gap-3">
                                        <Avatar className="w-6 h-6 flex-shrink-0">
                                          <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                                          <AvatarFallback className="text-xs">
                                            {reply.author.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{reply.author}</span>
                                            <span className="text-xs text-muted-foreground">
                                              {new Date(reply.timestamp).toLocaleDateString()}
                                            </span>
                                          </div>
                                          <p className="text-sm">{reply.content}</p>
                                          <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                                            <ThumbsUp className="w-3 h-3" />
                                            {reply.likes}
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}