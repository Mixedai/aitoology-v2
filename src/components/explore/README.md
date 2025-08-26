# Explore Components Migration

## Overview
This directory contains the unified Explore experience that combines the functionality from the legacy Browse and Categories pages. The migration extracted reusable components to create a modular, maintainable system.

## Migrated Components

### 1. BrowseToolCard (`BrowseToolCard.tsx`)
**Source**: Extracted from `/components/browse/BrowseTools.tsx` ToolCard component
**Features**:
- Supports both grid and list view modes
- Bookmark functionality with visual feedback
- Featured/verified/trending badges
- Hover interactions with action buttons
- WCAG 2.1 AA compliant with proper focus management
- Responsive design with mobile-optimized layouts

**Props**:
```typescript
interface BrowseToolCardProps {
  tool: ToolData;
  viewMode?: 'grid' | 'list';
  isBookmarked?: boolean;
  onToolClick?: (tool: any) => void;
  onBookmark?: (toolId: number) => void;
  onAction?: (action: string, toolId: number) => void;
}
```

### 2. CategoryCard (`CategoryCard.tsx`)
**Source**: Consolidated from category grid implementations
**Features**:
- Icon-based category representation
- Tool count display with localization
- Selection state management
- Keyboard navigation support
- Responsive design with consistent spacing

**Props**:
```typescript
interface CategoryCardProps {
  category: CategoryData;
  isSelected?: boolean;
  onClick?: (categoryId: string) => void;
}
```

### 3. FilterChips (`FilterChips.tsx`)
**Source**: Extracted from multiple filter implementations
**Features**:
- Horizontal scrollable category chips
- Active filter management with remove functionality
- Search query display
- Clear all filters action
- Support for both inline and card layouts

**Props**:
```typescript
interface FilterChipsProps {
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  activeFilters?: FilterObject;
  showCategoryChips?: boolean;
  showActiveFilters?: boolean;
  layout?: 'horizontal' | 'card';
}
```

### 4. FilterDrawer (`FilterDrawer.tsx`)
**Source**: Enhanced from basic filter functionality
**Features**:
- Mobile-responsive drawer (bottom on mobile, right on desktop)
- Multi-select checkboxes for all filter types
- Active filter count display
- Bulk clear functionality
- Keyboard navigation and WCAG compliance

**Props**:
```typescript
interface FilterDrawerProps {
  categoryOptions?: string[];
  pricingOptions?: string[];
  platformOptions?: string[];
  selectedFilters: FilterObject;
  onFilterChange: (type: string, value: string, checked: boolean) => void;
  onClearAll: () => void;
  activeFilterCount?: number;
  isMobile?: boolean;
}
```

## Updated Main Components

### Explore (`Explore.tsx`)
- Uses new reusable components
- Maintains original functionality
- Enhanced with better accessibility
- Improved keyboard navigation

### ExploreFrame (`ExploreFrame.tsx`)
- Complete rewrite using migrated components
- Added pagination support
- Enhanced filtering capabilities
- Better responsive design
- Loading, error, and empty states

## Legacy Components Status

### ❌ Deprecated (Do Not Delete Yet)
- `/components/browse/BrowseTools.tsx` - Marked as deprecated
- Category grid in other components - Replaced by CategoryCard

### ✅ Available for Reuse
All the new components in `/components/explore/` are designed for reuse across the application.

## Design System Compliance

All migrated components follow the design system guidelines:
- **Spacing**: 8-point grid system (gap-2, gap-4, gap-6)
- **Typography**: Semantic HTML elements with automatic styling
- **Colors**: Semantic color tokens (text-primary, text-muted-foreground)
- **Accessibility**: WCAG 2.1 AA compliant with focus management
- **Responsive**: Mobile-first design with breakpoints

## Keyboard Navigation

All components support comprehensive keyboard navigation:
- **Tab/Shift+Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons and selections
- **Arrow keys**: Navigate within component grids
- **Escape**: Clear filters and close overlays
- **/ key**: Focus search input
- **⌘/Ctrl+K**: Open command palette

## Mobile Optimizations

- Category grid: 2 columns on mobile, 4-6 on desktop
- Filter drawer: Bottom sheet on mobile, side panel on desktop
- Touch-friendly interaction targets (min 44px)
- Responsive typography and spacing
- Optimized for both landscape and portrait orientations

## Future Enhancements

- [ ] Add virtual scrolling for large tool lists
- [ ] Implement infinite scroll with intersection observer
- [ ] Add advanced filter persistence
- [ ] Enhance search with fuzzy matching
- [ ] Add tool comparison from card actions
- [ ] Implement personalized recommendations

## Notes for Developers

1. **Component Reusability**: All components are designed to be reused in other parts of the application
2. **Props Flexibility**: Props are designed to be optional where possible for easy integration
3. **State Management**: Components handle their own internal state but allow external control through props
4. **Performance**: Components use React best practices for re-rendering optimization
5. **Testing**: All interactive functionality should be tested with keyboard navigation