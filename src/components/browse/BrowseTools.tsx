import { useEffect,useState, } from 'react';

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  Bookmark, 
  TrendingUp, 
  Users, 
  DollarSign,
  Heart,
  ArrowUpRight,
  Grid3x3,
  List,
  SlidersHorizontal,
  X,
  Plus,
  RefreshCw
} from "lucide-react";

// Import state management components
import { 
  BrowseLoadingSkeleton, 
  ToolCardSkeleton 
} from '../ui/loading-skeleton';
import { 
  BrowseEmptyState, 
  SearchEmptyState, 
  FilterEmptyState 
} from '../ui/empty-state';
import { 
  ListErrorState, 
  NetworkErrorState, 
  ApiErrorState 
} from '../ui/error-state';
import { toastNotifications } from '../ui/toast-notifications';

// Add loading and error state types
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface BrowseState {
  tools: any[];
  filteredTools: any[];
  loadingState: LoadingState;
  error: string | null;
  searchQuery: string;
  activeFilters: {
    category: string[];
    pricing: string[];
    features: string[];
  };
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'rating' | 'popularity' | 'newest';
}

// Mock data for tools
const mockTools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Advanced AI chatbot for conversations, content creation, and complex problem solving",
    category: "Conversational AI",
    rating: 4.8,
    users: "100M+",
    pricing: "Freemium",
    features: ["Natural Language", "Content Creation", "Code Generation"],
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop&crop=face",
    featured: true,
    verified: true,
    trending: true
  },
  {
    id: 2,
    name: "Midjourney",
    description: "AI-powered image generation tool for creating stunning artwork and designs",
    category: "Image Generation",
    rating: 4.6,
    users: "15M+",
    pricing: "Paid",
    features: ["Image Generation", "Art Creation", "Style Transfer"],
    logo: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=64&h=64&fit=crop&crop=face",
    featured: true,
    verified: true,
    trending: false
  },
  {
    id: 3,
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster and with fewer errors",
    category: "Code Assistant",
    rating: 4.5,
    users: "5M+",
    pricing: "Paid",
    features: ["Code Generation", "Auto-completion", "Documentation"],
    logo: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=64&h=64&fit=crop&crop=face",
    featured: false,
    verified: true,
    trending: true
  },
  {
    id: 4,
    name: "Notion AI",
    description: "Integrated AI writing assistant for notes, documents, and project management",
    category: "Productivity",
    rating: 4.4,
    users: "20M+",
    pricing: "Freemium",
    features: ["Writing Assistant", "Summarization", "Translation"],
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=face",
    featured: false,
    verified: true,
    trending: false
  },
  {
    id: 5,
    name: "RunwayML",
    description: "Creative AI toolkit for video editing, image generation, and content creation",
    category: "Creative AI",
    rating: 4.3,
    users: "2M+",
    pricing: "Freemium",
    features: ["Video Editing", "Image Generation", "AI Effects"],
    logo: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=64&h=64&fit=crop&crop=face",
    featured: false,
    verified: true,
    trending: true
  },
  {
    id: 6,
    name: "Jasper AI",
    description: "AI writing assistant for marketing copy, blog posts, and business content",
    category: "Content Creation",
    rating: 4.2,
    users: "1M+",
    pricing: "Paid",
    features: ["Content Writing", "SEO Optimization", "Brand Voice"],
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=64&h=64&fit=crop&crop=face",
    featured: false,
    verified: true,
    trending: false
  }
];

export function BrowseTools({ onNavigate }: { onNavigate?: (screen: string, params?: any) => void }) {
  // State management
  const [state, setState] = useState<BrowseState>({
    tools: [],
    filteredTools: [],
    loadingState: 'idle',
    error: null,
    searchQuery: '',
    activeFilters: {
      category: [],
      pricing: [],
      features: []
    },
    viewMode: 'grid',
    sortBy: 'popularity'
  });

  // Load tools data
  useEffect(() => {
    loadTools();
  }, []);

  // Filter tools when search or filters change
  useEffect(() => {
    filterTools();
  }, [state.tools, state.searchQuery, state.activeFilters]);

  const loadTools = async () => {
    setState(prev => ({ ...prev, loadingState: 'loading', error: null }));
    
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use mock data for now
      setState(prev => ({ 
        ...prev, 
        tools: mockTools, 
        loadingState: 'success' 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loadingState: 'error', 
        error: error instanceof Error ? error.message : 'Failed to load tools'
      }));
      toastNotifications.loadError('tools');
    }
  };

  const filterTools = () => {
    let filtered = [...state.tools];

    // Apply search filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (state.activeFilters.category.length > 0) {
      filtered = filtered.filter(tool => 
        state.activeFilters.category.includes(tool.category)
      );
    }

    // Apply pricing filters
    if (state.activeFilters.pricing.length > 0) {
      filtered = filtered.filter(tool => 
        state.activeFilters.pricing.includes(tool.pricing)
      );
    }

    // Apply feature filters
    if (state.activeFilters.features.length > 0) {
      filtered = filtered.filter(tool => 
        state.activeFilters.features.some(feature => 
          tool.features.includes(feature)
        )
      );
    }

    setState(prev => ({ ...prev, filteredTools: filtered }));
  };

  const handleSearch = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const handleFilterChange = (filterType: keyof BrowseState['activeFilters'], value: string) => {
    setState(prev => ({
      ...prev,
      activeFilters: {
        ...prev.activeFilters,
        [filterType]: prev.activeFilters[filterType].includes(value)
          ? prev.activeFilters[filterType].filter(item => item !== value)
          : [...prev.activeFilters[filterType], value]
      }
    }));
  };

  const clearAllFilters = () => {
    setState(prev => ({
      ...prev,
      searchQuery: '',
      activeFilters: {
        category: [],
        pricing: [],
        features: []
      }
    }));
  };

  const clearSearch = () => {
    setState(prev => ({ ...prev, searchQuery: '' }));
  };

  const retryLoad = () => {
    loadTools();
  };

  const handleToolAction = (action: string, toolId: number, toolName: string) => {
    switch (action) {
      case 'favorite':
        toastNotifications.toolAdded(toolName);
        break;
      case 'subscribe':
        toastNotifications.subscriptionAdded(toolName);
        break;
      case 'view':
        onNavigate?.('tool-detail', { toolId });
        break;
      default:
        break;
    }
  };

  const handleSubmitTool = () => {
    onNavigate?.('submit');
  };

  const handleSuggestTool = () => {
    onNavigate?.('submit');
  };

  // Get active filter count
  const activeFilterCount = Object.values(state.activeFilters).flat().length;
  const hasActiveFilters = activeFilterCount > 0 || state.searchQuery.trim();

  // Render loading state
  if (state.loadingState === 'loading') {
    return <BrowseLoadingSkeleton />;
  }

  // Render error state
  if (state.loadingState === 'error') {
    return <ListErrorState onRetry={retryLoad} />;
  }

  // Render empty states
  const isEmpty = state.filteredTools.length === 0;
  
  if (isEmpty && state.tools.length === 0) {
    // No tools loaded at all
    return (
      <BrowseEmptyState 
        onClearFilters={clearAllFilters}
        onSubmitTool={handleSubmitTool}
      />
    );
  }

  if (isEmpty && state.searchQuery.trim()) {
    // No search results
    return (
      <SearchEmptyState
        searchQuery={state.searchQuery}
        onClearSearch={clearSearch}
        onSuggestTool={handleSuggestTool}
      />
    );
  }

  if (isEmpty && hasActiveFilters) {
    // No filter results
    const activeFilterLabels = Object.entries(state.activeFilters)
      .flatMap(([key, values]) => values)
      .filter(Boolean);
    
    return (
      <FilterEmptyState
        activeFilters={activeFilterLabels}
        onClearFilters={clearAllFilters}
        onBrowseAll={() => console.log('Browse all')}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2">Browse AI Tools</h1>
        <p className="text-muted-foreground">Discover and compare the best AI tools for your needs</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search AI tools..." 
              value={state.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              aria-label="Search AI tools"
            />
            {state.searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setState(prev => ({ 
                ...prev, 
                viewMode: prev.viewMode === 'grid' ? 'list' : 'grid' 
              }))}
              className="p-2"
              aria-label={`Switch to ${state.viewMode === 'grid' ? 'list' : 'grid'} view`}
            >
              {state.viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {state.searchQuery}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={clearSearch}
                  />
                </Badge>
              )}
              {Object.entries(state.activeFilters).map(([filterType, values]) =>
                values.map(value => (
                  <Badge key={`${filterType}-${value}`} variant="secondary" className="gap-1">
                    {value}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleFilterChange(filterType as keyof BrowseState['activeFilters'], value)}
                    />
                  </Badge>
                ))
              )}
            </div>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {state.filteredTools.length} of {state.tools.length} tools
          </span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-normal"
            >
              {state.sortBy === 'popularity' ? 'Most Popular' : 
               state.sortBy === 'rating' ? 'Highest Rated' : 
               state.sortBy === 'newest' ? 'Newest' : 'Name'}
            </Button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className={`grid gap-6 ${
        state.viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {state.filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            viewMode={state.viewMode}
            onAction={(action) => handleToolAction(action, tool.id, tool.name)}
          />
        ))}
      </div>

      {/* Load More */}
      {state.filteredTools.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Tools
          </Button>
        </div>
      )}
    </div>
  );
}

// Enhanced Tool Card Component with actions
function ToolCard({ tool, viewMode, onAction }: {
  tool: any;
  viewMode: 'grid' | 'list';
  onAction: (action: string) => void;
}) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${
      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col h-full'
    }`}>
      {/* Tool Image/Logo */}
      <div className={`relative ${
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'
      } bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden`}>
        <img 
          src={tool.logo || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop`}
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Tool Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {tool.featured && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
              Featured
            </Badge>
          )}
          {tool.trending && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {tool.verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              Verified
            </Badge>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => onAction('favorite')}
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => onAction('bookmark')}
            aria-label="Bookmark tool"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tool Content */}
      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {tool.category}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {tool.description}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
              onClick={() => onAction('view')}
              aria-label="Open tool"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.features?.slice(0, 3).map((feature: string) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {tool.features?.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.features.length - 3}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{tool.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{tool.users}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{tool.pricing}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => onAction('view')}>
              View Details
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAction('subscribe')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}