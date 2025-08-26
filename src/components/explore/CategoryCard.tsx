import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string; // Changed from LucideIcon to string (emoji)
    color: string;
    count?: number; // Made optional to handle undefined cases
  };
  isSelected?: boolean;
  onClick?: (categoryId: string) => void;
}

export function CategoryCard({ category, isSelected = false, onClick }: CategoryCardProps) {
  const handleClick = () => {
    onClick?.(category.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Safety check: ensure count is a valid number
  const safeCount = typeof category.count === 'number' ? category.count : 0;

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md focus-within:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={handleKeyDown}
      aria-label={`Filter by ${category.name}, ${safeCount} tools`}
    >
      <CardContent className="p-6 text-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${category.color}`}>
          <span className="text-2xl">{category.icon}</span>
        </div>
        <h3 className="mb-2">{category.name}</h3>
        <Badge variant="secondary" className="text-xs">
          {safeCount.toLocaleString()} {safeCount === 1 ? 'tool' : 'tools'}
        </Badge>
      </CardContent>
    </Card>
  );
}