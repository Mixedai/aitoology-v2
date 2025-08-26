import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';
import { 
  Star, 
  Users, 
  DollarSign, 
  Heart, 
  Bookmark, 
  BookmarkCheck,
  ArrowUpRight, 
  ExternalLink,
  TrendingUp,
  Plus,
  GitCompare,
  Sparkles
} from 'lucide-react';

/*
BrowseToolCard Component - AI Tool Card with Hit Area Management
Design System: 8-point grid, semantic colors, elevation-2 on hover
Hit Areas: 
- FULL CARD HOTSPOT: Navigates to Tool Detail with tool_id parameter
- INTERNAL BUTTONS sit ABOVE hotspot (z-10) with separate actions:
  - "Compare" (GitCompare icon) → Compare Tools (preselects tool_id)
  - "Add to Wallet" (Plus icon) → Tool Wallet (toast: "Added {Title}")
- No invisible overlays cover buttons; proper z-order maintained
Focus Management: 
- Card: focus-visible:ring-2 ring-ring ring-offset-2
- Buttons: focus-visible:ring-2 ring-ring ring-offset-2 + focus-visible:opacity-100
- Hover buttons become visible with group-hover:opacity-100
- Focus makes buttons always visible with focus-visible:opacity-100
Accessibility: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
Event Handling: preventDefault() + stopPropagation() prevents button→card click conflicts
Developer Notes: Z-index 10 for all internal buttons, proper event isolation
*/

interface BrowseToolCardProps {
  tool: {
    id: string; // Slug ID from toolsData
    toolId?: string; // For backward compatibility
    name: string;
    description: string;
    category: string;
    rating: number;
    users?: string;
    pricing: string;
    tags?: string[];
    features?: string[];
    logo: string;
    featured?: boolean;
    verified?: boolean;
    trending?: boolean;
    isBookmarked?: boolean;
  };
  viewMode?: 'grid' | 'list';
  isBookmarked?: boolean;
  onToolClick?: (tool: any) => void;
  onBookmark?: (toolId: string) => void;
  onAction?: (action: string, toolId: string) => void;
}

export function BrowseToolCard({ 
  tool, 
  viewMode = 'grid', 
  isBookmarked = false,
  onToolClick,
  onBookmark,
  onAction 
}: BrowseToolCardProps) {
  // Use the slug ID directly from toolsData
  const toolId = tool.id; // This is the slug like "chatgpt", "midjourney", etc.

  // FULL CARD HOTSPOT - Navigate to Tool Detail with tool_id parameter
  const handleCardClick = () => {
    // DEV NOTE: Fire analytics event "tool_card_click" with { tool_id } on click
    // Example: analytics.track('tool_card_click', { tool_id: toolId });
    onToolClick?.(tool);
  };

  // INTERNAL BUTTON ACTIONS - Prevent event bubbling to card hotspot
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAction?.('bookmark', toolId);
  };

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();
    onAction?.(action, toolId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
    <Card 
      className={`relative group cursor-pointer transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 overflow-hidden ${ 
        viewMode === 'list' ? 'flex flex-row' : 'flex flex-col h-full'
      }`}
      role="article"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={0}
      aria-labelledby={`tool-${toolId}-name`}
      aria-describedby={`tool-${toolId}-desc`}
      aria-label={`View details for ${tool.name}`}
    >
      {/* Hidden note layer inside each card: "tool_id: {slug}" */}
      <span 
        className="sr-only" 
        data-testid={`tool-id-${toolId}`}
        aria-hidden="true"
      >
        tool_id: {toolId}
      </span>

      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-orange-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-orange-600/10 transition-all duration-500 pointer-events-none z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
      
      {/* Tool Image/Logo */}
      <div className={`relative ${ 
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'
      } bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 overflow-hidden`}>
        {typeof tool.logo === 'string' && tool.logo.startsWith('http') ? (
          <img 
            src={tool.logo}
            alt={tool.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-muted">
            {tool.logo}
          </div>
        )}
        
        {/* Tool Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
          {tool.featured && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs shadow-lg border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </motion.div>
          )}
          {tool.trending && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs shadow-lg border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </motion.div>
          )}
          {tool.verified && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs shadow-lg border-0">
                ✓ Verified
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Action Buttons Overlay - Z-INDEX 10 to sit above card hotspot */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white dark:bg-black/90 dark:hover:bg-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:opacity-100"
            onClick={(e) => handleActionClick(e, 'favorite')}
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white dark:bg-black/90 dark:hover:bg-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:opacity-100"
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-primary" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Tool Content */}
      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle id={`tool-${toolId}-name`} className="group-hover:text-primary transition-colors truncate">
                  {tool.name}
                </CardTitle>
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {tool.category}
                </Badge>
              </div>
              <p id={`tool-${toolId}-desc`} className="text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </div>
            {/* Quick View Arrow - Z-INDEX 10 to sit above card hotspot */}
            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:opacity-100 flex-shrink-0 z-10"
              onClick={(e) => handleActionClick(e, 'view')}
              aria-label="View tool details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Features/Tags */}
          <div className="flex flex-wrap gap-2">
            {(tool.tags || tool.features)?.slice(0, 3).map((item: string) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
            {(tool.tags || tool.features)?.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{(tool.tags || tool.features).length - 3}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
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
              <span className={`${tool.pricing === 'Free' ? 'text-green-600 dark:text-green-400' : 
                tool.pricing === 'Freemium' ? 'text-blue-600 dark:text-blue-400' : 
                'text-orange-600 dark:text-orange-400'}`}>
                {tool.pricing}
              </span>
            </div>
          </div>

          {/* PRIMARY ACTION BUTTONS - Z-INDEX 10 to sit above card hotspot */}
          <div className="flex gap-2 relative z-10">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg" 
                onClick={(e) => handleActionClick(e, 'view')}
              >
                View Details
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => handleActionClick(e, 'compare')}
                className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                aria-label="Compare → Compare Tools (preselect tool_id)"
                title="Add to comparison"
              >
                <GitCompare className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => handleActionClick(e, 'addToWallet')}
                className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                aria-label="Add to Wallet → Tool Wallet (toast: Added {Title})"
                title="Add to wallet"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </div>
    </Card>
    </motion.div>
  );
}