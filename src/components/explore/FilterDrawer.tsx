import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { SlidersHorizontal, X, RefreshCw } from 'lucide-react';

interface FilterDrawerProps {
  // Filter options
  categoryOptions?: string[];
  pricingOptions?: string[];
  platformOptions?: string[];
  modelTypeOptions?: string[];
  featureOptions?: string[];
  
  // Selected filters
  selectedFilters: {
    category?: string[];
    pricing?: string[];
    platform?: string[];
    modelType?: string[];
    features?: string[];
  };
  
  // Handlers
  onFilterChange: (filterType: string, value: string, checked: boolean) => void;
  onClearAll: () => void;
  
  // UI options
  triggerLabel?: string;
  activeFilterCount?: number;
  isMobile?: boolean;
}

const defaultOptions = {
  categoryOptions: ['AI Writing', 'Image Generation', 'Code Assistant', 'Design Tools', 'Analytics', 'Chatbots', 'Video & Audio', 'Productivity'],
  pricingOptions: ['Free', 'Freemium', 'Paid', 'Enterprise'],
  platformOptions: ['Web', 'Mobile', 'Desktop', 'API', 'Discord', 'IDE'],
  modelTypeOptions: ['LLM', 'Diffusion', 'Code', 'Multimodal', 'Audio', 'Vision'],
  featureOptions: ['Writing', 'Creative', 'Analysis', 'Automation', 'Integration', 'Collaboration']
};

export function FilterDrawer({
  categoryOptions = defaultOptions.categoryOptions,
  pricingOptions = defaultOptions.pricingOptions,
  platformOptions = defaultOptions.platformOptions,
  modelTypeOptions = defaultOptions.modelTypeOptions,
  featureOptions = defaultOptions.featureOptions,
  selectedFilters,
  onFilterChange,
  onClearAll,
  triggerLabel = 'Filters',
  activeFilterCount = 0,
  isMobile = false
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const filterSections = [
    { key: 'category', label: 'Category', options: categoryOptions },
    { key: 'pricing', label: 'Pricing', options: pricingOptions },
    { key: 'platform', label: 'Platform', options: platformOptions },
    { key: 'modelType', label: 'Model Type', options: modelTypeOptions },
    { key: 'features', label: 'Features', options: featureOptions }
  ];

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    onFilterChange(filterType, value, checked);
  };

  const handleClearAll = () => {
    onClearAll();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {triggerLabel}
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side={isMobile ? 'bottom' : 'right'} 
        className={isMobile ? 'h-[80vh]' : 'w-[400px] sm:w-[540px]'}
      >
        <SheetHeader>
          <SheetTitle>Filter Tools</SheetTitle>
          <SheetDescription>
            Refine your search by selecting specific categories, pricing models, and features.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-muted-foreground">
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            disabled={activeFilterCount === 0}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
        
        <Separator />
        
        <ScrollArea className="h-[calc(100vh-200px)] py-6">
          <div className="space-y-8">
            {filterSections.map((section, index) => (
              <div key={section.key}>
                <h4 className="mb-4 font-medium">{section.label}</h4>
                <div className="space-y-3">
                  {section.options.map((option) => {
                    const isChecked = selectedFilters[section.key as keyof typeof selectedFilters]?.includes(option) || false;
                    const checkboxId = `${section.key}-${option.replace(/\s+/g, '-').toLowerCase()}`;
                    
                    return (
                      <div key={option} className="flex items-center space-x-3">
                        <Checkbox
                          id={checkboxId}
                          checked={isChecked}
                          onCheckedChange={(checked) => 
                            handleFilterChange(section.key, option, checked as boolean)
                          }
                          className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        <Label 
                          htmlFor={checkboxId}
                          className="flex-1 cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </div>
                {index < filterSections.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
          <Button
            className="flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => setIsOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}