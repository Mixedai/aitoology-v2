import React from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { 
  Search, 
  FolderOpen, 
  BookOpen, 
  Workflow, 
  Newspaper, 
  Plus,
  RefreshCw,
  Filter,
  Lightbulb,
  Users,
  Zap,
  TrendingUp
} from 'lucide-react';

/*
EMPTY STATE COMPONENTS - AI TOOLOGIST DESIGN SYSTEM

Comprehensive empty states for lists with clear CTAs and proper accessibility.

Tailwind Classes:
- Container: flex flex-col items-center justify-center py-12 px-6 text-center
- Icon: w-16 h-16 md:w-20 md:h-20 text-muted-foreground mb-6
- Title: text-lg md:text-xl font-medium mb-2
- Description: text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed
- CTA Button: gap-2 transition-all duration-200 hover:scale-105
- Spacing: space-y-4 gap-6 mb-6 (8-point grid compliance)

Accessibility:
- role="status" for screen readers
- aria-label for context
- Proper semantic headings
- Clear action-oriented CTAs
- Focus management for primary actions
*/

interface EmptyStateProps {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// Generic Empty State Component
export function EmptyState({ 
  icon: Icon = FolderOpen, 
  title, 
  description, 
  action, 
  secondaryAction,
  className = ""
}: EmptyStateProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
      role="status"
      aria-label={`${title}: ${description}`}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg md:text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {action && (
            <Button 
              onClick={action.onClick}
              className="gap-2 transition-all duration-200 hover:scale-105"
              autoFocus
            >
              <Plus className="w-4 h-4" />
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              variant="outline" 
              onClick={secondaryAction.onClick}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Browse Tools Empty State
export function BrowseEmptyState({ onClearFilters, onSubmitTool }: {
  onClearFilters?: () => void;
  onSubmitTool?: () => void;
}) {
  return (
    <EmptyState
      icon={Search}
      title="No tools found"
      description="We couldn't find any tools matching your current filters. Try adjusting your search criteria or explore our curated collection."
      action={onSubmitTool ? {
        label: "Submit a Tool",
        onClick: onSubmitTool
      } : undefined}
      secondaryAction={onClearFilters ? {
        label: "Clear Filters",
        onClick: onClearFilters
      } : undefined}
    />
  );
}

// News Empty State
export function NewsEmptyState({ onRefresh, onSubmitNews }: {
  onRefresh?: () => void;
  onSubmitNews?: () => void;
}) {
  return (
    <EmptyState
      icon={Newspaper}
      title="No articles available"
      description="There are no articles to display right now. Check back later for the latest AI news and updates."
      action={onSubmitNews ? {
        label: "Submit News",
        onClick: onSubmitNews
      } : undefined}
      secondaryAction={onRefresh ? {
        label: "Refresh",
        onClick: onRefresh
      } : undefined}
    />
  );
}

// Tutorials Empty State
export function TutorialsEmptyState({ onBrowseAll, onSuggestTutorial }: {
  onBrowseAll?: () => void;
  onSuggestTutorial?: () => void;
}) {
  return (
    <EmptyState
      icon={BookOpen}
      title="No tutorials found"
      description="We couldn't find any tutorials matching your criteria. Explore our complete tutorial library or suggest a new topic."
      action={onBrowseAll ? {
        label: "Browse All Tutorials",
        onClick: onBrowseAll
      } : undefined}
      secondaryAction={onSuggestTutorial ? {
        label: "Suggest Tutorial",
        onClick: onSuggestTutorial
      } : undefined}
    />
  );
}

// Workflows Empty State
export function WorkflowsEmptyState({ onCreateWorkflow, onBrowseTemplates }: {
  onCreateWorkflow?: () => void;
  onBrowseTemplates?: () => void;
}) {
  return (
    <EmptyState
      icon={Workflow}
      title="No workflows found"
      description="Start building your first AI workflow to automate tasks and boost productivity. Choose from templates or create from scratch."
      action={onCreateWorkflow ? {
        label: "Create Workflow",
        onClick: onCreateWorkflow
      } : undefined}
      secondaryAction={onBrowseTemplates ? {
        label: "Browse Templates",
        onClick: onBrowseTemplates
      } : undefined}
    />
  );
}

// Tool Wallet Empty State
export function WalletEmptyState({ onAddSubscription, onBrowseTools }: {
  onAddSubscription?: () => void;
  onBrowseTools?: () => void;
}) {
  return (
    <EmptyState
      icon={Zap}
      title="No subscriptions tracked"
      description="Start tracking your AI tool subscriptions to monitor spending, get renewal alerts, and optimize your toolkit."
      action={onAddSubscription ? {
        label: "Add Subscription",
        onClick: onAddSubscription
      } : undefined}
      secondaryAction={onBrowseTools ? {
        label: "Browse Tools",
        onClick: onBrowseTools
      } : undefined}
    />
  );
}

// Search Results Empty State
export function SearchEmptyState({ searchQuery, onClearSearch, onSuggestTool }: {
  searchQuery?: string;
  onClearSearch?: () => void;
  onSuggestTool?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center" role="status">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Search className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg md:text-xl font-medium mb-2">
        No results for "{searchQuery}"
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
        We couldn't find any tools matching your search. Try different keywords or browse our categories.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onSuggestTool && (
          <Button onClick={onSuggestTool} className="gap-2">
            <Lightbulb className="w-4 h-4" />
            Suggest This Tool
          </Button>
        )}
        {onClearSearch && (
          <Button variant="outline" onClick={onClearSearch} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Clear Search
          </Button>
        )}
      </div>
    </div>
  );
}

// Favorites Empty State
export function FavoritesEmptyState({ onBrowseTools }: {
  onBrowseTools?: () => void;
}) {
  return (
    <EmptyState
      icon={TrendingUp}
      title="No favorites yet"
      description="Start favoriting tools to create your personalized collection. Your starred tools will appear here for quick access."
      action={onBrowseTools ? {
        label: "Browse Tools",
        onClick: onBrowseTools
      } : undefined}
    />
  );
}

// Community Empty State
export function CommunityEmptyState({ onJoinCommunity, onCreatePost }: {
  onJoinCommunity?: () => void;
  onCreatePost?: () => void;
}) {
  return (
    <EmptyState
      icon={Users}
      title="No community posts"
      description="Be the first to share your experience! Connect with other AI enthusiasts and contribute to the conversation."
      action={onCreatePost ? {
        label: "Create Post",
        onClick: onCreatePost
      } : undefined}
      secondaryAction={onJoinCommunity ? {
        label: "Join Community",
        onClick: onJoinCommunity
      } : undefined}
    />
  );
}

// Filter Results Empty State
export function FilterEmptyState({ activeFilters, onClearFilters, onBrowseAll }: {
  activeFilters?: string[];
  onClearFilters?: () => void;
  onBrowseAll?: () => void;
}) {
  const filterText = activeFilters && activeFilters.length > 0 
    ? `your current filters (${activeFilters.join(', ')})`
    : 'the selected criteria';

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center" role="status">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Filter className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg md:text-xl font-medium mb-2">No matches found</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
        No items match {filterText}. Try adjusting your filters or browse all available options.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onClearFilters && (
          <Button onClick={onClearFilters} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
        {onBrowseAll && (
          <Button variant="outline" onClick={onBrowseAll} className="gap-2">
            <FolderOpen className="w-4 h-4" />
            Browse All
          </Button>
        )}
      </div>
    </div>
  );
}