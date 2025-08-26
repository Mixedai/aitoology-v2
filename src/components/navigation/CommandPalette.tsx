import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { VisuallyHidden } from '../ui/visually-hidden';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { 
  Search, 
  Clock, 
  Layers, 
  Plus, 
  Wallet, 
  Home, 
  GitCompare, 
  User, 
  Shield, 
  Code,
  Zap,
  ArrowUpDown,
  CornerDownLeft,
  Command,
  Settings
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (currentScreen: string, targetScreen: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: 'tools' | 'categories' | 'actions' | 'recent';
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  keywords?: string[];
}

/*
Command Palette Implementation Notes:

Tailwind Classes:
- Modal Overlay: fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
- Dialog Container: fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2
- Search Container: flex h-14 items-center border-b px-4
- Results Container: max-h-[300px] overflow-y-auto p-2
- Result Item: flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer
- Selected Item: bg-accent text-accent-foreground
- Category Header: px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide
- Empty State: flex flex-col items-center justify-center p-12 text-center
- Loading Skeleton: space-y-2 p-3

Accessibility Features:
- aria-role="dialog" for modal
- aria-modal="true" 
- aria-labelledby for dialog title
- Focus trap within modal
- Keyboard navigation (↑↓ arrows, Enter, Escape)
- aria-selected for highlighted items
- Screen reader announcements for results count

Keyboard Shortcuts:
- ⌘K / Ctrl+K: Open command palette
- ↑↓: Navigate results
- Enter: Select result
- Escape: Close palette
- Tab: Navigate between sections

Focus Management:
- Auto-focus search input on open
- Restore focus to trigger element on close
- Trap focus within modal
*/

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    'ChatGPT',
    'Midjourney',
    'writing tools'
  ]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mock data for search results
  const allResults: SearchResult[] = [
    // Tools
    { id: 'chatgpt', title: 'ChatGPT', description: 'AI-powered writing assistant', category: 'tools', icon: Zap, keywords: ['ai', 'writing', 'chat', 'openai'] },
    { id: 'midjourney', title: 'Midjourney', description: 'AI image generation tool', category: 'tools', icon: Layers, keywords: ['ai', 'image', 'art', 'design'] },
    { id: 'notion', title: 'Notion', description: 'All-in-one workspace', category: 'tools', icon: Layers, keywords: ['productivity', 'notes', 'workspace'] },
    { id: 'figma', title: 'Figma', description: 'Collaborative design tool', category: 'tools', icon: Layers, keywords: ['design', 'ui', 'collaboration'] },
    { id: 'github-copilot', title: 'GitHub Copilot', description: 'AI code assistant', category: 'tools', icon: Code, keywords: ['code', 'ai', 'development', 'github'] },
    
    // Categories
    { id: 'writing-content', title: 'Writing & Content', description: 'AI writing and content creation tools', category: 'categories', icon: Layers },
    { id: 'design-creative', title: 'Design & Creative', description: 'AI design and creative tools', category: 'categories', icon: Layers },
    { id: 'development-code', title: 'Development & Code', description: 'AI coding and development tools', category: 'categories', icon: Code },
    { id: 'business-productivity', title: 'Business & Productivity', description: 'AI business and productivity tools', category: 'categories', icon: Layers },
    
    // Actions
    { id: 'tutorials-frame', title: 'View Tutorials', description: 'Learn how to use AI tools effectively', category: 'actions', icon: Layers },
    { id: 'tool-combinations-frame', title: 'Browse Workflows', description: 'Discover AI tool combinations and workflows', category: 'actions', icon: Layers },
    { id: 'submit-tool', title: 'Submit a Tool', description: 'Add a new AI tool to the directory', category: 'actions', icon: Plus },
    { id: 'tool-wallet', title: 'Open Tool Wallet', description: 'Manage your subscriptions and spending', category: 'actions', icon: Wallet },
    { id: 'compare-tools', title: 'Compare Tools', description: 'Compare AI tools side by side', category: 'actions', icon: GitCompare },
    { id: 'browse-tools', title: 'Browse Tools', description: 'Explore the complete AI tools directory', category: 'actions', icon: Search },
    { id: 'settings', title: 'Settings', description: 'Customize your AI Toologist experience and preferences', category: 'actions', icon: Settings },
    { id: 'not-found', title: 'Error Page', description: 'View 404 and error handling states', category: 'actions', icon: Shield },
  ];

  // Filter results based on search query
  const getFilteredResults = useCallback(() => {
    if (!searchQuery.trim()) {
      return {
        recent: recentQueries.slice(0, 3),
        tools: allResults.filter(r => r.category === 'tools').slice(0, 5),
        categories: allResults.filter(r => r.category === 'categories').slice(0, 4),
        actions: allResults.filter(r => r.category === 'actions')
      };
    }

    const query = searchQuery.toLowerCase();
    const filtered = allResults.filter(result => 
      result.title.toLowerCase().includes(query) ||
      result.description?.toLowerCase().includes(query) ||
      result.keywords?.some(keyword => keyword.toLowerCase().includes(query))
    );

    const groupedResults = {
      recent: [] as string[],
      tools: filtered.filter(r => r.category === 'tools'),
      categories: filtered.filter(r => r.category === 'categories'),
      actions: filtered.filter(r => r.category === 'actions')
    };

    return groupedResults;
  }, [searchQuery, recentQueries]);

  const filteredResults = getFilteredResults();
  
  // Flatten results for keyboard navigation
  const flatResults = [
    ...(searchQuery ? [] : filteredResults.recent.map(query => ({ type: 'recent' as const, query }))),
    ...filteredResults.tools.map(result => ({ type: 'result' as const, result })),
    ...filteredResults.categories.map(result => ({ type: 'result' as const, result })),
    ...filteredResults.actions.map(result => ({ type: 'result' as const, result }))
  ];

  // Define handleSelectResult early to avoid hoisting issues
  const handleSelectResult = useCallback((index: number) => {
    const selected = flatResults[index];
    if (!selected) return;

    if (selected.type === 'recent') {
      setSearchQuery(selected.query);
      return;
    }

    const result = selected.result;
    
    // Add to recent queries if it's a tool search
    if (result.category === 'tools' && searchQuery) {
      setRecentQueries(prev => {
        const updated = [searchQuery, ...prev.filter(q => q !== searchQuery)];
        return updated.slice(0, 5);
      });
    }

    // Navigate based on result type - use consistent from/to navigation pattern
    switch (result.id) {
      case 'tutorials-frame':
        onNavigate('command-palette', 'tutorials-frame');
        break;
      case 'tool-combinations-frame':
        onNavigate('command-palette', 'tool-combinations-frame');
        break;
      case 'submit-tool':
        onNavigate('command-palette', 'submit');
        break;
      case 'tool-wallet':
        onNavigate('command-palette', 'wallet');
        break;
      case 'compare-tools':
        onNavigate('command-palette', 'compare');
        break;
      case 'browse-tools':
        onNavigate('command-palette', 'explore-frame');
        break;
      default:
        if (result.category === 'tools') {
          onNavigate('command-palette', 'tool-detail', { tool_id: result.id });
        } else if (result.category === 'categories') {
          onNavigate('command-palette', 'explore-frame', { category: result.id });
        } else {
          // Handle direct ID navigation for actions
          onNavigate('command-palette', result.id);
        }
    }
    
    onClose();
  }, [flatResults, searchQuery, onNavigate, onClose]);

  // Keyboard navigation - now handleSelectResult is defined
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % flatResults.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? flatResults.length - 1 : prev - 1);
          break;
        case 'Enter':
          e.preventDefault();
          handleSelectResult(selectedIndex);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, flatResults.length, handleSelectResult, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus search input when modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      // Reset state when closed
      setSearchQuery('');
      setSelectedIndex(0);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

  // Simulate loading state
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const renderResultItem = (item: SearchResult, index: number, isSelected: boolean) => (
    <div
      key={item.id}
      ref={el => resultRefs.current[index] = el}
      onClick={() => handleSelectResult(index)}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
      }`}
      role="option"
      aria-selected={isSelected}
    >
      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
        <item.icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate">{item.title}</div>
        {item.description && (
          <div className="text-xs text-muted-foreground truncate">{item.description}</div>
        )}
      </div>
      {isSelected && (
        <CornerDownLeft className="w-3 h-3 text-muted-foreground" />
      )}
    </div>
  );

  const renderRecentQuery = (query: string, index: number, isSelected: boolean) => (
    <div
      key={`recent-${query}`}
      ref={el => resultRefs.current[index] = el}
      onClick={() => handleSelectResult(index)}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
      }`}
      role="option"
      aria-selected={isSelected}
    >
      <Clock className="w-4 h-4 text-muted-foreground" />
      <span className="flex-1">{query}</span>
      {isSelected && (
        <CornerDownLeft className="w-3 h-3 text-muted-foreground" />
      )}
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="space-y-2 p-3">
      {[...Array(6)].map((_, i) => (
        <div key={`skeleton-${i}`} className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Search className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="mb-2">No results found</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Try searching for AI tools, categories, or actions
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="text-xs">ChatGPT</Badge>
        <Badge variant="outline" className="text-xs">Midjourney</Badge>
        <Badge variant="outline" className="text-xs">Writing Tools</Badge>
      </div>
    </div>
  );

  let currentIndex = 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-0 p-0 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        aria-describedby="command-palette-description"
      >
        {/* Hidden title and description for accessibility */}
        <VisuallyHidden>
          <DialogTitle id="command-palette-title">
            Command Palette
          </DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription id="command-palette-description">
            Search for AI tools, categories, and actions. Use arrow keys to navigate and enter to select.
          </DialogDescription>
        </VisuallyHidden>

        {/* Search Header */}
        <div className="flex h-14 items-center border-b px-4">
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          <Input
            ref={searchInputRef}
            placeholder="Search AI tools, categories, or actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Search command palette"
          />
          <div className="flex items-center gap-1 ml-2">
            <Badge variant="outline" className="text-xs font-mono">
              <ArrowUpDown className="w-2 h-2 mr-1" />
              ↑↓
            </Badge>
          </div>
        </div>

        {/* Results */}
        <div 
          className="max-h-[300px] overflow-y-auto p-2"
          role="listbox"
          aria-label="Search results"
        >
          {isLoading ? (
            renderLoadingSkeleton()
          ) : (
            <>
              {/* Recent Queries */}
              {!searchQuery && filteredResults.recent.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Recent
                  </div>
                  {filteredResults.recent.map((query, queryIndex) => {
                    const isSelected = selectedIndex === currentIndex;
                    const element = renderRecentQuery(query, currentIndex, isSelected);
                    currentIndex++;
                    return element;
                  })}
                  {(filteredResults.tools.length > 0 || filteredResults.categories.length > 0 || filteredResults.actions.length > 0) && (
                    <Separator className="my-2" />
                  )}
                </>
              )}

              {/* Tools */}
              {filteredResults.tools.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Tools
                  </div>
                  {filteredResults.tools.map((result, toolIndex) => {
                    const isSelected = selectedIndex === currentIndex;
                    const element = renderResultItem(result, currentIndex, isSelected);
                    currentIndex++;
                    return element;
                  })}
                  {(filteredResults.categories.length > 0 || filteredResults.actions.length > 0) && (
                    <Separator className="my-2" />
                  )}
                </>
              )}

              {/* Categories */}
              {filteredResults.categories.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Categories
                  </div>
                  {filteredResults.categories.map((result, categoryIndex) => {
                    const isSelected = selectedIndex === currentIndex;
                    const element = renderResultItem(result, currentIndex, isSelected);
                    currentIndex++;
                    return element;
                  })}
                  {filteredResults.actions.length > 0 && <Separator className="my-2" />}
                </>
              )}

              {/* Actions */}
              {filteredResults.actions.length > 0 && (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Actions
                  </div>
                  {filteredResults.actions.map((result, actionIndex) => {
                    const isSelected = selectedIndex === currentIndex;
                    const element = renderResultItem(result, currentIndex, isSelected);
                    currentIndex++;
                    return element;
                  })}
                </>
              )}

              {/* Empty State */}
              {!isLoading && flatResults.length === 0 && renderEmptyState()}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs font-mono">
                <CornerDownLeft className="w-2 h-2 mr-1" />
                ↵
              </Badge>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs font-mono">esc</Badge>
              <span>to close</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>Search</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}