import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Star, 
  Users, 
  ArrowRight,
  Bookmark,
  GitCompare,
  Check
} from 'lucide-react';

interface ModernToolCardProps {
  tool: {
    id: string;
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
  onNavigate?: (from: string, to: string, params?: any) => void;
  onBookmark?: (toolId: string) => void;
  onAction?: (action: string, toolId: string) => void;
  onSelect?: (tool: any) => void;
  showSelectButton?: boolean;
  isSelected?: boolean;
  index?: number;
}

export function ModernToolCard({ 
  tool, 
  viewMode = 'grid', 
  isBookmarked = false,
  onToolClick,
  onNavigate,
  onBookmark,
  onAction,
  onSelect,
  showSelectButton,
  isSelected,
  index = 0
}: ModernToolCardProps) {
  const toolId = tool.id;

  const handleCardClick = () => {
    // If onNavigate is provided, use it for navigation
    if (onNavigate) {
      console.log('🔍 ModernToolCard: Navigating to tool-detail', {
        toolId: tool.id,
        toolName: tool.name
      });
      onNavigate('explore-frame', 'tool-detail', {
        tool_id: tool.id,
        toolId: tool.id,
        tool: tool
      });
    } else if (onToolClick) {
      // Fallback to onToolClick if provided
      onToolClick(tool);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAction?.('bookmark', toolId);
  };

  return (
    <Card 
      className={`relative group cursor-pointer h-full overflow-hidden
        bg-white hover:shadow-lg
        border transition-all duration-200
        ${isSelected 
          ? 'border-purple-500 ring-2 ring-purple-200 shadow-lg' 
          : 'border-gray-200 hover:border-purple-300'
        }
        ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'}
      `}
      onClick={handleCardClick}
    >
      {/* Logo Section */}
      <div className={`relative ${
        viewMode === 'list' ? 'w-40 flex-shrink-0' : 'w-full h-40'
      } bg-gray-50 flex items-center justify-center`}>
        
        {/* Logo */}
        {typeof tool.logo === 'string' && tool.logo.startsWith('http') ? (
          <img 
            src={tool.logo}
            alt={tool.name}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <div className="text-5xl">
            {tool.logo}
          </div>
        )}
        
        {/* Badges */}
        {(tool.featured || tool.trending) && (
          <div className="absolute top-2 left-2">
            {tool.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                Featured
              </Badge>
            )}
            {tool.trending && (
              <Badge className="bg-purple-100 text-purple-800 text-xs ml-1">
                Trending
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Compare Button */}
          {showSelectButton && (
            <button
              className={`p-1.5 rounded-lg border transition-all ${
                isSelected 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-500 opacity-0 group-hover:opacity-100'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(tool);
              }}
              title={isSelected ? "Remove from compare" : "Add to compare"}
            >
              {isSelected ? (
                <Check className="w-4 h-4" />
              ) : (
                <GitCompare className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* Bookmark Button */}
          <button
            className="p-1.5 rounded-lg bg-white border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleBookmarkClick}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-purple-600 text-purple-600' : 'text-gray-500'}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 p-4 ${viewMode === 'list' ? '' : ''}`}>
        {/* Header */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {tool.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{tool.category}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              tool.pricing === 'Free' ? 'bg-green-100 text-green-700' : 
              tool.pricing === 'Freemium' ? 'bg-blue-100 text-blue-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {tool.pricing}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {tool.description}
        </p>

        {/* Tags */}
        {(tool.tags || tool.features) && (
          <div className="flex flex-wrap gap-1 mb-3">
            {(tool.tags || tool.features)?.slice(0, 2).map((item: string) => (
              <span
                key={item}
                className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-700">{tool.rating}</span>
            </div>
            {tool.users && (
              <div className="flex items-center gap-0.5 text-gray-500">
                <Users className="w-3.5 h-3.5" />
                <span>{tool.users}</span>
              </div>
            )}
          </div>
          
          <button
            className="p-1.5 rounded-lg bg-purple-100 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.('view', toolId);
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}