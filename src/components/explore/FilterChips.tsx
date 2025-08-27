
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { X, RefreshCw } from 'lucide-react';

interface FilterChipsProps {
  // Category chips
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  
  // Active filters
  activeFilters?: {
    search?: string;
    pricing?: string[];
    platform?: string[];
    modelType?: string[];
    features?: string[];
  };
  onFilterRemove?: (filterType: string, value: string) => void;
  onClearSearch?: () => void;
  onClearAllFilters?: () => void;
  
  // Display options
  showCategoryChips?: boolean;
  showActiveFilters?: boolean;
  layout?: 'horizontal' | 'card';
}

export function FilterChips({
  categories = [],
  selectedCategory,
  onCategoryChange,
  activeFilters = {},
  onFilterRemove,
  onClearSearch,
  onClearAllFilters,
  showCategoryChips = true,
  showActiveFilters = true,
  layout = 'horizontal'
}: FilterChipsProps) {
  const hasActiveFilters = Boolean(
    activeFilters.search ||
    (activeFilters.pricing && activeFilters.pricing.length > 0) ||
    (activeFilters.platform && activeFilters.platform.length > 0) ||
    (activeFilters.modelType && activeFilters.modelType.length > 0) ||
    (activeFilters.features && activeFilters.features.length > 0)
  );

  const allActiveFilterEntries = [
    ...(activeFilters.pricing || []).map(value => ({ type: 'pricing', value })),
    ...(activeFilters.platform || []).map(value => ({ type: 'platform', value })),
    ...(activeFilters.modelType || []).map(value => ({ type: 'modelType', value })),
    ...(activeFilters.features || []).map(value => ({ type: 'features', value }))
  ];

  if (layout === 'card' && (showActiveFilters && hasActiveFilters)) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Active Filters</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAllFilters}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {activeFilters.search && (
            <Badge variant="secondary" className="gap-2 pr-2">
              Search: {activeFilters.search}
              <button
                onClick={onClearSearch}
                className="hover:bg-muted-foreground/20 rounded p-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {allActiveFilterEntries.map(({ type, value }) => (
            <Badge key={`${type}-${value}`} variant="secondary" className="gap-2 pr-2">
              {value}
              <button
                onClick={() => onFilterRemove?.(type, value)}
                className="hover:bg-muted-foreground/20 rounded p-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Remove ${value} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Category Chips */}
      {showCategoryChips && categories.length > 0 && (
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange?.(category)}
                className="whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Active Filters */}
      {showActiveFilters && hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {activeFilters.search && (
            <Badge variant="secondary" className="gap-2 pr-2">
              "{activeFilters.search}"
              <button
                onClick={onClearSearch}
                className="hover:bg-muted-foreground/20 rounded p-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {allActiveFilterEntries.map(({ type, value }) => (
            <Badge key={`${type}-${value}`} variant="secondary" className="gap-2 pr-2">
              {value}
              <button
                onClick={() => onFilterRemove?.(type, value)}
                className="hover:bg-muted-foreground/20 rounded p-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Remove ${value} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAllFilters}
            className="text-muted-foreground hover:text-foreground ml-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}