import { useEffect, useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { 
  Search, 
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
  Loader2
} from "lucide-react";

// Import services and types
import { aiToolsService, AITool, ToolCategory } from '../../lib/aiToolsService';
import { supabase } from '../../lib/supabaseClient';

// Import state management components
import { 
  BrowseLoadingSkeleton
} from '../ui/loading-skeleton';
import { 
  BrowseEmptyState, 
  SearchEmptyState, 
  FilterEmptyState 
} from '../ui/empty-state';
import { 
  ListErrorState
} from '../ui/error-state';
import { toastNotifications } from '../ui/toast-notifications';

// Add loading and error state types
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface BrowseState {
  tools: AITool[];
  filteredTools: AITool[];
  categories: ToolCategory[];
  loadingState: LoadingState;
  error: string | null;
  searchQuery: string;
  activeFilters: {
    category: string[];
    pricing: string[];
    features: string[];
  };
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'rating' | 'popular' | 'newest';
  currentUser: any;
  userFavorites: Set<string>;
  userBookmarks: Set<string>;
}

export function BrowseTools({ onNavigate }: { onNavigate?: (screen: string, params?: any) => void }) {
  // State management
  const [state, setState] = useState<BrowseState>({
    tools: [],
    filteredTools: [],
    categories: [],
    loadingState: 'idle',
    error: null,
    searchQuery: '',
    activeFilters: {
      category: [],
      pricing: [],
      features: []
    },
    viewMode: 'grid',
    sortBy: 'rating',
    currentUser: null,
    userFavorites: new Set(),
    userBookmarks: new Set()
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
    checkCurrentUser();
  }, []);

  // Filter tools when search or filters change
  useEffect(() => {
    filterTools();
  }, [state.searchQuery, state.activeFilters, state.sortBy]);

  const checkCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      loadUserInteractions(user.id);
    }
  };

  const loadUserInteractions = async (userId: string) => {
    // Load user favorites
    const { data: favorites } = await aiToolsService.getUserFavorites(userId);
    if (favorites) {
      setState(prev => ({
        ...prev,
        userFavorites: new Set(favorites.map((f: any) => f.ai_tools?.id || f.id))
      }));
    }

    // Load user bookmarks
    const { data: bookmarks } = await aiToolsService.getUserBookmarks(userId);
    if (bookmarks) {
      setState(prev => ({
        ...prev,
        userBookmarks: new Set(bookmarks.map(b => b.ai_tools.id))
      }));
    }
  };

  const loadInitialData = async () => {
    setState(prev => ({ ...prev, loadingState: 'loading', error: null }));
    
    try {
      // Load categories
      const { data: categoriesData, error: categoriesError } = await aiToolsService.getCategories();
      if (categoriesError) throw categoriesError;

      // Load tools
      const { data: toolsData, error: toolsError } = await aiToolsService.getTools({
        sortBy: 'rating',
        limit: 50
      });
      if (toolsError) throw toolsError;

      setState(prev => ({ 
        ...prev, 
        tools: toolsData || [], 
        filteredTools: toolsData || [],
        categories: categoriesData || [],
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

  const filterTools = async () => {
    setState(prev => ({ ...prev, loadingState: 'loading' }));

    try {
      const filters: any = {
        sortBy: state.sortBy
      };

      // Apply search filter
      if (state.searchQuery.trim()) {
        filters.search = state.searchQuery;
      }

      // Apply category filters
      if (state.activeFilters.category.length > 0) {
        filters.category = state.activeFilters.category[0]; // API takes single category
      }

      // Apply pricing filters
      if (state.activeFilters.pricing.length > 0) {
        filters.pricing = state.activeFilters.pricing;
      }

      const { data, error } = await aiToolsService.getTools(filters);
      
      if (error) throw error;

      setState(prev => ({ 
        ...prev, 
        filteredTools: data || [],
        loadingState: 'success'
      }));
    } catch (error) {
      console.error('Error filtering tools:', error);
      setState(prev => ({ 
        ...prev, 
        loadingState: 'error',
        error: 'Failed to filter tools'
      }));
    }
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
    loadInitialData();
  };

  const handleToolAction = async (action: string, tool: AITool) => {
    if (!state.currentUser) {
      toastNotifications.error('Please sign in to perform this action');
      onNavigate?.('signin');
      return;
    }

    switch (action) {
      case 'favorite':
        const { favorited } = await aiToolsService.toggleFavorite(tool.id, state.currentUser.id);
        if (favorited) {
          setState(prev => ({
            ...prev,
            userFavorites: new Set([...prev.userFavorites, tool.id])
          }));
          toastNotifications.success(`Added ${tool.name} to favorites`);
        } else {
          const newFavorites = new Set(state.userFavorites);
          newFavorites.delete(tool.id);
          setState(prev => ({
            ...prev,
            userFavorites: newFavorites
          }));
          toastNotifications.success(`Removed ${tool.name} from favorites`);
        }
        break;
      
      case 'bookmark':
        const { bookmarked } = await aiToolsService.toggleBookmark(tool.id, state.currentUser.id);
        if (bookmarked) {
          setState(prev => ({
            ...prev,
            userBookmarks: new Set([...prev.userBookmarks, tool.id])
          }));
          toastNotifications.success(`Bookmarked ${tool.name}`);
        } else {
          const newBookmarks = new Set(state.userBookmarks);
          newBookmarks.delete(tool.id);
          setState(prev => ({
            ...prev,
            userBookmarks: newBookmarks
          }));
          toastNotifications.success(`Removed ${tool.name} from bookmarks`);
        }
        break;
      
      case 'view':
        await aiToolsService.incrementClickCount(tool.id);
        if (tool.website_url) {
          window.open(tool.website_url, '_blank');
        }
        break;
      
      case 'details':
        onNavigate?.('tool-detail', { toolId: tool.id, toolSlug: tool.slug });
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
  if (state.loadingState === 'loading' && state.tools.length === 0) {
    return <BrowseLoadingSkeleton />;
  }

  // Render error state
  if (state.loadingState === 'error' && state.tools.length === 0) {
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
      .flatMap(([, values]) => values)
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

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {state.categories.map(category => (
            <Button
              key={category.id}
              variant={state.activeFilters.category.includes(category.slug) ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('category', category.slug)}
              className="gap-1"
            >
              {category.name}
              {state.activeFilters.category.includes(category.slug) && (
                <X className="w-3 h-3 ml-1" />
              )}
            </Button>
          ))}
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
            Showing {state.filteredTools.length} tools
          </span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select
              value={state.sortBy}
              onChange={(e) => setState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-background border rounded px-2 py-1"
            >
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading indicator for filtering */}
      {state.loadingState === 'loading' && state.tools.length > 0 && (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

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
            isFavorited={state.userFavorites.has(tool.id)}
            isBookmarked={state.userBookmarks.has(tool.id)}
            onAction={(action) => handleToolAction(action, tool)}
          />
        ))}
      </div>

      {/* Load More */}
      {state.filteredTools.length > 0 && state.filteredTools.length % 50 === 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Tools
          </Button>
        </div>
      )}
    </div>
  );
}

// Enhanced Tool Card Component with real data
function ToolCard({ 
  tool, 
  viewMode, 
  isFavorited,
  isBookmarked,
  onAction 
}: {
  tool: AITool;
  viewMode: 'grid' | 'list';
  isFavorited: boolean;
  isBookmarked: boolean;
  onAction: (action: string) => void;
}) {
  // Get pricing display text
  const getPricingDisplay = () => {
    switch (tool.pricing_model) {
      case 'free':
        return 'Free';
      case 'freemium':
        return tool.starting_price ? `Free / $${tool.starting_price}/mo` : 'Freemium';
      case 'paid':
      case 'subscription':
        return tool.starting_price ? `$${tool.starting_price}/mo` : 'Paid';
      case 'usage_based':
        return 'Usage Based';
      case 'enterprise':
        return 'Enterprise';
      default:
        return tool.pricing_model;
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${
      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col h-full'
    }`}>
      {/* Tool Image/Logo */}
      <div className={`relative ${
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'
      } bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden flex items-center justify-center`}>
        {tool.logo_url ? (
          <img 
            src={tool.logo_url}
            alt={tool.name}
            className="w-24 h-24 object-contain"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${tool.name}&background=random`;
            }}
          />
        ) : (
          <div className="w-24 h-24 bg-primary/20 rounded-lg flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {tool.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Tool Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {tool.is_featured && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
              Featured
            </Badge>
          )}
          {tool.is_trending && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {tool.is_verified && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              Verified
            </Badge>
          )}
          {tool.is_new && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
              New
            </Badge>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            variant="secondary"
            className={`h-8 w-8 p-0 bg-white/90 hover:bg-white ${isFavorited ? 'text-red-500' : ''}`}
            onClick={() => onAction('favorite')}
            aria-label="Add to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={`h-8 w-8 p-0 bg-white/90 hover:bg-white ${isBookmarked ? 'text-blue-500' : ''}`}
            onClick={() => onAction('bookmark')}
            aria-label="Bookmark tool"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
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
                {tool.category && (
                  <Badge variant="outline" className="text-xs">
                    {tool.category.name}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {tool.short_description || tool.description}
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
          {/* Features/Capabilities */}
          {tool.ai_capabilities && tool.ai_capabilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tool.ai_capabilities.slice(0, 3).map((capability: string) => (
                <Badge key={capability} variant="secondary" className="text-xs">
                  {capability.replace(/_/g, ' ')}
                </Badge>
              ))}
              {tool.ai_capabilities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.ai_capabilities.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-4">
              {tool.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{tool.rating.toFixed(1)}</span>
                  {tool.total_reviews > 0 && (
                    <span className="text-xs">({tool.total_reviews})</span>
                  )}
                </div>
              )}
              {tool.total_users && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{tool.total_users}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>{getPricingDisplay()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => onAction('details')}>
              View Details
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAction('view')}
              disabled={!tool.website_url}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}