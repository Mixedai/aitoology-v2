import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  Star, 
  CheckCircle, 
  Users,
  Zap,
  ChevronDown,
  ArrowLeft,
  Palette,
  Image as ImageIcon
} from 'lucide-react';
import { getToolById } from '../../data/mockTools';
import { toastNotifications } from '../ui/toast-notifications';
import { analyticsEvents } from '../../utils/analytics';

export function MidjourneyPage({ 
  onNavigate,
  currentScreen 
}: { 
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  currentScreen?: string;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const tool = getToolById('midjourney');

  useEffect(() => {
    if (tool) {
      analyticsEvents.toolDetailView(tool.id, tool.name, 'direct-link');
    }
  }, [tool]);

  const handleAddToWallet = () => {
    if (tool) {
      toastNotifications.subscriptionAdded(tool.name);
      onNavigate?.(currentScreen || 'midjourney-page', 'wallet', {
        message: `${tool.name} added to your wallet`
      });
    }
  };

  const handleAddToFavorites = () => {
    if (tool) {
      toastNotifications.toolAdded(tool.name);
    }
  };

  const handleBackToExplore = () => {
    onNavigate?.(currentScreen || 'midjourney-page', 'explore-frame');
  };

  const handleCompare = () => {
    if (tool) {
      onNavigate?.(currentScreen || 'midjourney-page', 'compare', {
        preselectedTool: tool.id,
        message: `${tool.name} added to comparison`
      });
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1>Tool Not Found</h1>
          <p className="text-muted-foreground mb-6">Midjourney information is not available.</p>
          <Button onClick={handleBackToExplore}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content" className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
            <button
              onClick={handleBackToExplore}
              className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors flex items-center gap-2"
              aria-label="Back to Explore"
            >
              <ArrowLeft className="w-4 h-4" />
              Explore
            </button>
            <span className="text-muted-foreground/60" aria-hidden="true">
              <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            </span>
            <span className="text-foreground" aria-current="page">
              {tool.name}
            </span>
          </nav>
        </div>

        {/* Tool Header */}
        <div className="mb-8">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="text-6xl">{tool.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1>{tool.name}</h1>
                    <Badge variant="outline" className="text-xs">
                      ID: {tool.id}
                    </Badge>
                    {tool.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                    {tool.trending && (
                      <Badge className="gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                        <Zap className="w-3 h-3" />
                        Trending
                      </Badge>
                    )}
                    {tool.featured && (
                      <Badge className="gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tool.users}</span>
                    </div>
                    <Badge variant="outline">
                      {tool.category}
                    </Badge>
                    <Badge variant="outline" className="text-orange-600 dark:text-orange-400">
                      {tool.pricing}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddToFavorites}
                    className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Heart className="w-4 h-4" />
                    Favorite
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Tool Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <h3>Key Features</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-4">
                <h3>About Midjourney</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Midjourney is an independent research lab that creates AI-powered tools to expand the imaginative powers of the human species. Their flagship product generates stunning, artistic images from text descriptions using advanced AI models. Known for producing some of the highest quality AI-generated artwork, Midjourney has become the go-to tool for artists, designers, and creative professionals worldwide.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-2">Company Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Website:</span>
                        <a href={tool.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          Visit Site
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Founded:</span>
                        <span>{tool.founded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Headquarters:</span>
                        <span>{tool.headquarters}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">How Midjourney Works</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <ImageIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="mb-2">1. Write a Prompt</h5>
                      <p className="text-sm text-muted-foreground">Describe your vision in natural language</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="mb-2">2. AI Generation</h5>
                      <p className="text-sm text-muted-foreground">Advanced AI creates four unique variations</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Palette className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="mb-2">3. Refine & Upscale</h5>
                      <p className="text-sm text-muted-foreground">Choose favorites and enhance quality</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <h3>Midjourney Pricing Plans</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="space-y-4">
                      <h4>Basic</h4>
                      <p className="text-muted-foreground">Perfect for beginners</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-2xl mb-4">$10/month</div>
                      <ul className="space-y-2 text-sm">
                        <li>• ~200 generations per month</li>
                        <li>• General commercial terms</li>
                        <li>• Access to Discord gallery</li>
                        <li>• Optional credit top-ups</li>
                      </ul>
                      <Button className="w-full">Subscribe</Button>
                    </CardContent>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader className="space-y-4">
                      <h4>Standard</h4>
                      <p className="text-muted-foreground">Most popular choice</p>
                      <Badge className="w-fit">Most Popular</Badge>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-2xl mb-4">$30/month</div>
                      <ul className="space-y-2 text-sm">
                        <li>• ~900 generations per month</li>
                        <li>• Unlimited relaxed generations</li>
                        <li>• General commercial terms</li>
                        <li>• Optional credit top-ups</li>
                      </ul>
                      <Button className="w-full">Subscribe</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="space-y-4">
                      <h4>Pro</h4>
                      <p className="text-muted-foreground">For power users</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-2xl mb-4">$60/month</div>
                      <ul className="space-y-2 text-sm">
                        <li>• ~1800 generations per month</li>
                        <li>• Unlimited relaxed generations</li>
                        <li>• Stealth mode</li>
                        <li>• Maximum concurrent jobs</li>
                      </ul>
                      <Button className="w-full">Subscribe</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <h3>User Reviews</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {tool.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {String.fromCharCode(65 + index)}{String.fromCharCode(65 + ((index + 1) % 26))}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>User {index + 1}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.floor(tool.rating) }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {review}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alternatives" className="space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <h3>Similar Tools</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">🖼️</div>
                        <div className="flex-1">
                          <h4>Stable Diffusion</h4>
                          <p className="text-muted-foreground text-sm">Open-source AI image generation with local running capabilities</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => onNavigate?.(currentScreen || 'midjourney-page', 'tool-detail', { tool_id: 'stable-diffusion' })}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">🎛️</div>
                        <div className="flex-1">
                          <h4>Figma AI</h4>
                          <p className="text-muted-foreground text-sm">AI-powered design features integrated into Figma</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => onNavigate?.(currentScreen || 'midjourney-page', 'tool-detail', { tool_id: 'figma-ai' })}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button 
            onClick={handleAddToWallet}
            className="flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Add to Wallet
          </Button>
          <Button 
            variant="outline"
            onClick={handleCompare}
            className="flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Compare Tools
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.open(tool.website, '_blank')}
            className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </Button>
        </div>
      </main>
    </div>
  );
}