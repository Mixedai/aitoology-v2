import { useEffect,useMemo,useRef,useState, } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Progress } from '../ui/progress';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { Switch } from '../ui/switch';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  ArrowRight, 
  Search,
  Filter,
  Eye,
  Edit3,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Save,
  Rocket,
  Layers,
  Grid3X3,
  List,
  Wand2,
  Upload,
  Check,
  Home,
  Workflow
} from 'lucide-react';

// Import types and utilities
import type { NavigationProps, WizardState, Workflow as WorkflowModel } from './types';
import { workflowCategories, sortOptions } from './constants';
import { availableTools, mockWorkflows } from './mockData';
import { createNewNode, getStepTitle, getStepDescription } from './utils';
import { WizardStep1 } from './wizardSteps/WizardStep1';

export function ToolCombinationsFrame({ onNavigate, currentScreen, selectedItem, detailView }: NavigationProps) {
  // Core state
  const [workflows, setWorkflows] = useState<WorkflowModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  // Enhanced Wizard state
  const [wizardState, setWizardState] = useState<WizardState>({
    open: false,
    currentStep: 1,
    isValid: false,
    isSubmitting: false,
    isDraft: false,
    hasUnsavedChanges: false,
    scrollPosition: 0,
    aiAssistant: {
      enabled: false,
      suggestions: [],
      analyzing: false
    },
    collaboration: {
      enabled: false,
      collaborators: [],
      changes: []
    },
    data: {
      template: null,
      importType: 'blank',
      importData: null,
      aiPrompt: '',
      templateFilters: {
        category: [],
        complexity: [],
        useCases: []
      },
      nodes: [],
      connections: [],
      canvasViewport: { x: 0, y: 0, zoom: 1 },
      selectedNodes: [],
      selectedConnections: [],
      clipboard: [],
      history: {
        past: [],
        present: { nodes: [], connections: [] },
        future: []
      },
      gridSettings: {
        enabled: true,
        size: 20,
        snapToGrid: true
      },
      name: '',
      description: '',
      category: '',
      tags: [],
      isPublic: false,
      allowRemix: true,
      allowFork: true,
      difficulty: 'Easy',
      estimatedExecutionTime: 0,
      businessValue: '',
      useCases: [],
      requirements: [],
      testResults: [],
      testConfiguration: {
        runAllTests: true,
        enableMocks: false,
        timeout: 30,
        retries: 3
      },
      performanceMetrics: {
        estimatedCost: 0,
        estimatedTime: 0,
        reliability: 0
      },
      publishSettings: {
        immediately: true,
        notifyFollowers: false,
        submitToGallery: false,
        makeTemplate: false
      },
      collaboration: {
        enableTeamAccess: false,
        teamMembers: [],
        permissions: 'edit'
      },
      monitoring: {
        enableAlerts: false,
        alertEmail: '',
        alertConditions: []
      }
    },
    validationErrors: {}
  });

  // Refs for accessibility and performance
  const searchInputRef = useRef<HTMLInputElement>(null);
  const firstStepRef = useRef<HTMLDivElement>(null);

  // Handle detail view for workflow details
  useEffect(() => {
    if (detailView && selectedItem?.workflow) {
      console.log('Opening workflow detail:', selectedItem.workflow);
    }
  }, [detailView, selectedItem]);

  // Load workflows
  useEffect(() => {
    loadWorkflows();
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        if (wizardState.open) {
          closeWizard();
        } else if (filterDrawerOpen) {
          setFilterDrawerOpen(false);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        openCreateWizard();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [wizardState.open, filterDrawerOpen]);

  const loadWorkflows = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setWorkflows(mockWorkflows);
    } catch (err) {
      setError('Failed to load workflows');
      toast.error('Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort workflows
  const filteredWorkflows = useMemo(() => {
    let filtered = [...workflows];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(workflow => 
        workflow.name.toLowerCase().includes(query) ||
        workflow.description.toLowerCase().includes(query) ||
        workflow.author.toLowerCase().includes(query) ||
        workflow.tags.some(tag => tag.toLowerCase().includes(query)) ||
        workflow.tools.some(tool => tool.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(workflow => 
        workflow.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    if (difficultyFilter.length > 0) {
      filtered = filtered.filter(workflow => 
        difficultyFilter.includes(workflow.difficulty)
      );
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(workflow => workflow.isFeatured);
    }

    if (showVerifiedOnly) {
      filtered = filtered.filter(workflow => workflow.isVerified);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.analytics.avgRating - a.analytics.avgRating);
        break;
      case 'uses':
        filtered.sort((a, b) => b.uses - a.uses);
        break;
      case 'complexity':
        const complexityOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        filtered.sort((a, b) => complexityOrder[a.complexity] - complexityOrder[b.complexity]);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.likes + b.uses + b.views) - (a.likes + a.uses + a.views));
        break;
    }

    return filtered;
  }, [workflows, searchQuery, selectedCategory, sortBy, difficultyFilter, showFeaturedOnly, showVerifiedOnly]);

  // Wizard functions
  const openCreateWizard = () => {
    setWizardState(prev => ({
      ...prev,
      open: true,
      currentStep: 1,
      scrollPosition: window.scrollY
    }));
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      firstStepRef.current?.focus();
    }, 100);
  };

  const closeWizard = () => {
    if (wizardState.hasUnsavedChanges) {
      const shouldSave = confirm('You have unsaved changes. Save as draft before closing?');
      if (shouldSave) {
        saveDraft();
      }
    }
    
    setWizardState(prev => ({
      ...prev,
      open: false,
      currentStep: 1,
      hasUnsavedChanges: false
    }));
    
    document.body.style.overflow = 'auto';
    window.scrollTo(0, wizardState.scrollPosition);
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    const { data } = wizardState;

    switch (step) {
      case 1:
        if (data.importType === 'template' && !data.template) {
          errors.template = 'Please select a template';
        }
        if (data.importType === 'ai-generated' && !data.aiPrompt.trim()) {
          errors.aiPrompt = 'Please describe the workflow you want to create';
        }
        break;
      case 2:
        if (data.nodes.length === 0) {
          errors.nodes = 'Add at least one tool to your workflow';
        }
        break;
      case 3:
        if (!data.name.trim()) {
          errors.name = 'Workflow name is required';
        }
        if (!data.description.trim()) {
          errors.description = 'Description is required';
        }
        if (!data.category) {
          errors.category = 'Category is required';
        }
        break;
    }

    const isValid = Object.keys(errors).length === 0;
    setWizardState(prev => ({
      ...prev,
      isValid,
      validationErrors: errors
    }));

    return isValid;
  };

  const nextStep = () => {
    if (!validateStep(wizardState.currentStep)) return;
    
    if (wizardState.currentStep < 4) {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    } else {
      publishWorkflow();
    }
  };

  const prevStep = () => {
    if (wizardState.currentStep > 1) {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  const updateWizardData = (updates: Partial<WizardState['data']>) => {
    setWizardState(prev => ({
      ...prev,
      data: { ...prev.data, ...updates },
      hasUnsavedChanges: true
    }));
  };

  const generateWorkflowFromAI = async (prompt: string) => {
    setWizardState(prev => ({
      ...prev,
      aiAssistant: { ...prev.aiAssistant, analyzing: true }
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generatedNodes = [
        createNewNode(availableTools[0], { x: 100, y: 150 }),
        createNewNode(availableTools[5], { x: 400, y: 150 })
      ];

      updateWizardData({
        nodes: generatedNodes,
        name: `AI Generated: ${prompt.slice(0, 50)}...`,
        description: `Workflow generated from: ${prompt}`
      });

      toast.success('AI workflow generated successfully!');
      
    } catch (error) {
      toast.error('Failed to generate workflow');
    } finally {
      setWizardState(prev => ({
        ...prev,
        aiAssistant: { ...prev.aiAssistant, analyzing: false }
      }));
    }
  };

  const saveDraft = async () => {
    try {
      localStorage.setItem('workflow_draft', JSON.stringify(wizardState.data));
      setWizardState(prev => ({ ...prev, hasUnsavedChanges: false }));
      toast.success('Draft saved successfully');
    } catch (error) {
      toast.error('Failed to save draft');
    }
  };

  const publishWorkflow = async () => {
    if (!validateStep(4)) return;
    
    setWizardState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newWorkflow: WorkflowModel = {
        id: Date.now().toString(),
        name: wizardState.data.name,
        description: wizardState.data.description,
        category: wizardState.data.category,
        complexity: 'Intermediate',
        tools: wizardState.data.nodes.map(node => 
          availableTools.find(t => t.id === node.toolId)?.name || 'Unknown'
        ),
        nodes: wizardState.data.nodes,
        connections: wizardState.data.connections,
        steps: wizardState.data.nodes.length,
        estimatedTime: `${Math.max(1, Math.ceil(wizardState.data.estimatedExecutionTime / 60))} mins`,
        author: 'You',
        likes: 0,
        uses: 0,
        views: 0,
        forks: 0,
        tags: wizardState.data.tags,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
        isPublic: wizardState.data.isPublic,
        isVerified: false,
        isFeatured: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        difficulty: wizardState.data.difficulty,
        version: '1.0',
        status: 'Published',
        performance: {
          successRate: 0,
          avgExecutionTime: 0,
          lastRun: new Date().toISOString()
        },
        analytics: {
          totalRuns: 0,
          successfulRuns: 0,
          failedRuns: 0,
          avgRating: 0
        }
      };
      
      setWorkflows(prev => [newWorkflow, ...prev]);
      localStorage.removeItem('workflow_draft');
      closeWizard();
      
      toast.success('Workflow published successfully!', {
        description: `${newWorkflow.name} is now available${wizardState.data.isPublic ? ' to the community' : ' in your library'}`
      });
      
    } catch (error) {
      toast.error('Failed to publish workflow');
    } finally {
      setWizardState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // Handle workflow actions
  const handleWorkflowAction = (action: string, workflow: WorkflowModel) => {
    switch (action) {
      case 'view':
        onNavigate?.('tool-combinations-frame', 'workflow-detail', { 
          workflow,
          workflowId: workflow.id 
        });
        break;
      case 'remix':
        openCreateWizard();
        setTimeout(() => {
          updateWizardData({
            name: `${workflow.name} (Remix)`,
            description: `Remixed from: ${workflow.description}`,
            category: workflow.category,
            tags: [...workflow.tags, 'Remix']
          });
        }, 100);
        toast.success(`${workflow.name} loaded for remixing`);
        break;
      case 'fork':
        navigator.clipboard.writeText(`https://aitoologist.com/workflows/${workflow.id}`);
        toast.success('Workflow link copied to clipboard');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDifficultyFilter([]);
    setShowFeaturedOnly(false);
    setShowVerifiedOnly(false);
    setSortBy('popular');
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-8 w-64 bg-muted rounded animate-pulse" />
                <div className="h-4 w-96 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-full bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button 
            onClick={() => onNavigate?.('tool-combinations-frame', 'home')}
            className="hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
          </button>
          <ArrowRight className="w-3 h-3" />
          <span className="text-foreground">Workflows</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="gap-1">
                <Workflow className="w-3 h-3" />
                AI Workflows
              </Badge>
              <Badge variant="secondary">Enhanced</Badge>
            </div>
            <h1 className="mb-2">AI Tool Workflows</h1>
            <p className="text-muted-foreground max-w-2xl">
              Create powerful automated workflows by combining multiple AI tools. 
              Build, share, and discover workflows that boost your productivity.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate?.('tool-combinations-frame', 'explore-frame')}
                    className="gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Browse Tools</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Browse available AI tools</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button className="gap-2 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Workflow</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 border-b">
                  <h4 className="mb-1">Create New Workflow</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose how you want to start building your workflow
                  </p>
                </div>
                <div className="p-2">
                  <div className="space-y-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 p-3 h-auto"
                      onClick={() => openCreateWizard()}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm">Start from Scratch</div>
                        <div className="text-xs text-muted-foreground">
                          Build your own custom workflow
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 p-3 h-auto"
                      onClick={() => {
                        setWizardState(prev => ({
                          ...prev,
                          data: { ...prev.data, importType: 'ai-generated' }
                        }));
                        openCreateWizard();
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Wand2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm">AI Generated</div>
                        <div className="text-xs text-muted-foreground">
                          Describe your workflow in plain English
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 p-3 h-auto"
                      onClick={() => {
                        setWizardState(prev => ({
                          ...prev,
                          data: { ...prev.data, importType: 'template' }
                        }));
                        openCreateWizard();
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm">Use Template</div>
                        <div className="text-xs text-muted-foreground">
                          Start with a proven workflow template
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 p-3 h-auto"
                      onClick={() => {
                        setWizardState(prev => ({
                          ...prev,
                          data: { ...prev.data, importType: 'file' }
                        }));
                        openCreateWizard();
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Upload className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm">Import File</div>
                        <div className="text-xs text-muted-foreground">
                          Upload an existing workflow JSON file
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              ref={searchInputRef}
              placeholder="Search workflows... (Press / to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {workflowCategories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  <div className="flex items-center gap-2">
                    <option.icon className="w-4 h-4" />
                    {option.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Sheet open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
                {(difficultyFilter.length > 0 || showFeaturedOnly || showVerifiedOnly) && (
                  <Badge variant="secondary" className="ml-1">
                    {difficultyFilter.length + (showFeaturedOnly ? 1 : 0) + (showVerifiedOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Filter workflows by difficulty, features, and more
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 py-6">
                <div className="space-y-3">
                  <h4>Difficulty Level</h4>
                  <div className="space-y-2">
                    {['Easy', 'Medium', 'Hard'].map(difficulty => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={difficulty}
                          checked={difficultyFilter.includes(difficulty)}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              setDifficultyFilter(prev => [...prev, difficulty]);
                            } else {
                              setDifficultyFilter(prev => prev.filter(d => d !== difficulty));
                            }
                          }}
                        />
                        <label htmlFor={difficulty} className="text-sm">{difficulty}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4>Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
                      />
                      <label htmlFor="featured" className="text-sm">Featured Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={showVerifiedOnly}
                        onCheckedChange={(checked) => setShowVerifiedOnly(checked === true)}
                      />
                      <label htmlFor="verified" className="text-sm">Verified Authors</label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{filteredWorkflows.length} workflows found</span>
            {(searchQuery || selectedCategory !== 'all' || difficultyFilter.length > 0 || showFeaturedOnly || showVerifiedOnly) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-auto p-0 text-primary hover:text-primary/80"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>

        {/* Workflows Grid */}
        {filteredWorkflows.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredWorkflows.map(workflow => (
              <Card 
                key={workflow.id} 
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleWorkflowAction('view', workflow)}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  <img 
                    src={workflow.thumbnail} 
                    alt={workflow.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {workflow.difficulty}
                    </Badge>
                    {workflow.isFeatured && (
                      <Badge variant="default" className="gap-1 text-xs">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="hover:text-primary transition-colors line-clamp-1">
                      {workflow.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {workflow.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkflowAction('view', workflow);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkflowAction('remix', workflow);
                      }}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Remix
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3>No workflows found</h3>
                <p className="text-muted-foreground">
                  Be the first to create a workflow for the community!
                </p>
              </div>
              <Button onClick={openCreateWizard} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Workflow
              </Button>
            </div>
          </Card>
        )}

        {/* Enhanced Create Workflow Wizard */}
        <AnimatePresence>
          {wizardState.open && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wizard-title"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                    <div>
                      <CardTitle id="wizard-title" className="flex items-center gap-2">
                        <Workflow className="w-5 h-5 text-primary" />
                        {wizardState.data.template ? 'Create from Template' : 'Create New Workflow'}
                      </CardTitle>
                      <CardDescription>
                        Step {wizardState.currentStep} of 4: {getStepTitle(wizardState.currentStep)}
                        <br />
                        <span className="text-xs">{getStepDescription(wizardState.currentStep)}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={saveDraft}
                        disabled={!wizardState.hasUnsavedChanges || wizardState.isDraft}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {wizardState.isDraft ? 'Saving...' : 'Save Draft'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={closeWizard}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </CardHeader>

                  <div className="p-6">
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">{wizardState.currentStep}/4</span>
                      </div>
                      <Progress value={(wizardState.currentStep / 4) * 100} className="h-2" />
                      
                      <div className="flex items-center justify-between mt-3">
                        {[1, 2, 3, 4].map(step => (
                          <div 
                            key={step}
                            className={`flex items-center gap-2 text-xs ${
                              step <= wizardState.currentStep 
                                ? 'text-primary' 
                                : 'text-muted-foreground'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                              step <= wizardState.currentStep
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-muted-foreground'
                            }`}>
                              {step < wizardState.currentStep ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <span>{step}</span>
                              )}
                            </div>
                            <span className="hidden sm:inline">{getStepTitle(step)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step Content */}
                    <ScrollArea className="h-96">
                      <div ref={firstStepRef} tabIndex={-1}>
                        {wizardState.currentStep === 1 && (
                          <WizardStep1 
                            wizardState={wizardState}
                            updateWizardData={updateWizardData}
                            generateWorkflowFromAI={generateWorkflowFromAI}
                          />
                        )}
                        
                        {wizardState.currentStep === 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                          >
                            <div>
                              <h3 className="mb-2">Build Your Workflow</h3>
                              <p className="text-muted-foreground">
                                Add tools and connect them to create your automated workflow.
                              </p>
                            </div>
                            
                            <Card className="p-8 border-dashed">
                              <div className="text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                                  <Workflow className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                  <h4>Visual Workflow Builder</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Interactive canvas for building workflows (coming soon)
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        )}

                        {wizardState.currentStep === 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                          >
                            <div>
                              <h3 className="mb-2">Configure Your Workflow</h3>
                              <p className="text-muted-foreground mb-6">
                                Add details and settings for your workflow.
                              </p>
                            </div>
                            
                            <Card className="p-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm">Workflow Name *</label>
                                  <Input
                                    placeholder="My Awesome Workflow"
                                    value={wizardState.data.name}
                                    onChange={(e) => updateWizardData({ name: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm">Description *</label>
                                  <Input
                                    placeholder="Brief description..."
                                    value={wizardState.data.description}
                                    onChange={(e) => updateWizardData({ description: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm">Category *</label>
                                  <Select 
                                    value={wizardState.data.category} 
                                    onValueChange={(value: string) => updateWizardData({ category: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Content Creation">Content Creation</SelectItem>
                                      <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                                      <SelectItem value="Marketing">Marketing</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        )}

                        {wizardState.currentStep === 4 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                          >
                            <div>
                              <h3 className="mb-2">Test & Publish</h3>
                              <p className="text-muted-foreground mb-6">
                                Review your workflow and publish it to the community.
                              </p>
                            </div>

                            <Card className="p-6">
                              <h4 className="mb-4">Workflow Summary</h4>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-muted-foreground">Name: </span>
                                  <span className="font-medium">{wizardState.data.name || 'Untitled Workflow'}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-muted-foreground">Category: </span>
                                  <span className="font-medium">{wizardState.data.category || 'Not selected'}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-muted-foreground">Description: </span>
                                  <span className="font-medium">{wizardState.data.description || 'No description'}</span>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Wizard Actions */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={wizardState.currentStep === 1}
                        className="gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        {wizardState.currentStep < 4 ? (
                          <Button
                            onClick={nextStep}
                            disabled={!wizardState.isValid}
                            className="gap-2"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            onClick={publishWorkflow}
                            disabled={wizardState.isSubmitting || !wizardState.isValid}
                            className="gap-2"
                          >
                            {wizardState.isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Rocket className="w-4 h-4" />
                                Publish Workflow
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}