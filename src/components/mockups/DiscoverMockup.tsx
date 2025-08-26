import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Star, Filter, Grid3X3, List, ChevronDown, Loader2 } from "lucide-react";
import { AIInput } from "../ui-kit/AIInput";
import { AnimatedToolCard } from "../prototype/AnimatedToolCard";
import { CategoryTag, StatusTag } from "../ui-kit/AITag";

interface DiscoverMockupProps {
  theme: "light" | "dark";
  tools?: any[];
  comparisonTools?: any[];
  urlQuery?: string;
  onToolClick?: (toolId: string) => void;
  onCompare?: (tool: any) => void;
  onFilterChange?: (query: string) => void;
}

export function DiscoverMockup({ 
  theme, 
  tools: propTools, 
  comparisonTools = [], 
  urlQuery = "",
  onToolClick = () => {},
  onCompare = () => {},
  onFilterChange = () => {}
}: DiscoverMockupProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [gridView, setGridView] = useState(true);

  const defaultTools = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "Advanced AI language model for conversational AI, content generation, and complex reasoning tasks.",
      category: "AI Writing",
      rating: 4.8,
      pricing: "$20/month",
      status: "popular" as const,
      logo: "🤖"
    },
    {
      id: "midjourney",
      name: "Midjourney",
      description: "AI-powered image generation tool for creating stunning artwork and visual content.",
      category: "Image Generation",
      rating: 4.7,
      pricing: "$30/month",
      status: "paid" as const,
      logo: "🎨"
    },
    {
      id: "github-copilot",
      name: "GitHub Copilot",
      description: "AI pair programmer that helps write code faster with intelligent code suggestions.",
      category: "Code Assistant",
      rating: 4.6,
      pricing: "$10/month",
      status: "popular" as const,
      logo: "💻"
    },
    {
      id: "claude",
      name: "Claude",
      description: "AI assistant for analysis, writing, math, coding, and creative tasks with constitutional AI.",
      category: "AI Writing",
      rating: 4.5,
      pricing: "Free",
      status: "freemium" as const,
      logo: "🧠"
    },
    {
      id: "stable-diffusion",
      name: "Stable Diffusion",
      description: "Open-source deep learning text-to-image model for generating high-quality images.",
      category: "Image Generation",
      rating: 4.4,
      pricing: "Free",
      status: "free" as const,
      logo: "🖼️"
    },
    {
      id: "whisper",
      name: "Whisper",
      description: "Automatic speech recognition system with robust performance across diverse audio.",
      category: "Voice & Audio",
      rating: 4.6,
      pricing: "Free",
      status: "free" as const,
      logo: "🎤"
    }
  ];

  const tools = propTools || defaultTools;

  const handleSearch = (value: string) => {
    setSearchLoading(true);
    const query = value ? `search=${encodeURIComponent(value)}` : '';
    onFilterChange(query);
    setTimeout(() => setSearchLoading(false), 800);
  };

  const isToolInComparison = (toolId: string) => {
    return comparisonTools.some(t => t.id === toolId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden lg:relative absolute lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} top-0 left-0 h-full bg-background lg:bg-transparent z-30`}>
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm">Clear All</Button>
              </div>

              {/* Category Filter */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {[
                      { label: "AI Writing", count: 234 },
                      { label: "Image Generation", count: 156 },
                      { label: "Code Assistant", count: 89 },
                      { label: "Data Analysis", count: 67 },
                      { label: "Voice & Audio", count: 45 },
                      { label: "Video Creation", count: 34 }
                    ].map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`category-${index}`} />
                        <label
                          htmlFor={`category-${index}`}
                          className="text-sm flex-1 cursor-pointer"
                        >
                          {category.label}
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Pricing Filter */}
                <div>
                  <h4 className="font-medium mb-3">Pricing</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Free", count: 89 },
                      { label: "Freemium", count: 234 },
                      { label: "Paid", count: 567 },
                      { label: "Enterprise", count: 45 }
                    ].map((pricing, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`pricing-${index}`} />
                        <label
                          htmlFor={`pricing-${index}`}
                          className="text-sm flex-1 cursor-pointer"
                        >
                          {pricing.label}
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {pricing.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* API Availability */}
                <div>
                  <h4 className="font-medium mb-3">API Availability</h4>
                  <div className="space-y-2">
                    {[
                      { label: "REST API", count: 156 },
                      { label: "GraphQL", count: 78 },
                      { label: "Webhooks", count: 234 },
                      { label: "SDK Available", count: 123 }
                    ].map((api, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`api-${index}`} />
                        <label
                          htmlFor={`api-${index}`}
                          className="text-sm flex-1 cursor-pointer"
                        >
                          {api.label}
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {api.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm flex-1 cursor-pointer flex items-center"
                        >
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Controls */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <div className="flex-1 max-w-2xl relative">
                  <AIInput
                    type="search"
                    placeholder="Search for AI tools, features, or use cases..."
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {searchLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={gridView ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setGridView(true)}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={!gridView ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setGridView(false)}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button variant="outline" size="sm">
                    Sort by: Popular
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <CategoryTag category="AI Writing" removable />
                <StatusTag status="freemium" removable />
                <Badge variant="secondary" className="cursor-pointer">
                  4+ Stars
                  <button className="ml-2 hover:text-destructive">×</button>
                </Badge>
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground">
                Showing 1,247 AI tools
              </p>
            </div>

            {/* Tool Grid */}
            <div className={gridView ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {tools.map((tool, index) => (
                <AnimatedToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => onToolClick(tool.id)}
                  onCompare={() => onCompare(tool)}
                  isComparing={isToolInComparison(tool.id)}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Tools
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}