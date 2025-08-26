import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Star, ExternalLink, Heart, Share2, ArrowLeft, Check, X, Users, Zap, Shield, BarChart3 } from "lucide-react";
import { StatusTag, CategoryTag } from "../ui-kit/AITag";
import { AIAvatar } from "../ui-kit/AIAvatar";
import { AIButton } from "../ui-kit/AIButton";

interface ToolDetailMockupProps {
  theme: "light" | "dark";
  toolId?: string;
  onBack: () => void;
  onCompare: (tool: any) => void;
}

export function ToolDetailMockup({ theme, toolId = "chatgpt", onBack, onCompare }: ToolDetailMockupProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock tool data - in real app this would come from API
  const tool = {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "🤖",
    description: "Advanced AI language model for conversational AI, content generation, and complex reasoning tasks. Built by OpenAI, ChatGPT represents the cutting edge of natural language processing technology.",
    longDescription: "ChatGPT is a state-of-the-art conversational AI model developed by OpenAI. It excels at understanding context, generating human-like responses, and assisting with a wide variety of tasks including writing, coding, analysis, and creative projects. The model has been fine-tuned to be helpful, harmless, and honest.",
    category: "AI Writing",
    rating: 4.8,
    reviews: 12450,
    pricing: {
      free: "Limited usage",
      paid: "$20/month",
      enterprise: "Custom pricing"
    },
    website: "https://chat.openai.com",
    features: [
      "Natural language conversations",
      "Code generation and debugging",
      "Text analysis and summarization",
      "Creative writing assistance",
      "Math and reasoning",
      "Multilingual support"
    ],
    pros: [
      "Excellent natural language understanding",
      "Fast response times",
      "Regular model updates",
      "Wide range of capabilities",
      "User-friendly interface"
    ],
    cons: [
      "Limited to text-only interactions",
      "No real-time data access",
      "May occasionally generate incorrect information",
      "Usage limits on free tier"
    ],
    apiInfo: {
      available: true,
      documentation: "https://platform.openai.com/docs",
      rateLimit: "60 requests/minute",
      pricing: "$0.002 per 1K tokens"
    },
    useCases: [
      "Customer support automation",
      "Content creation and editing",
      "Code assistance and review",
      "Educational tutoring",
      "Research and analysis"
    ],
    alternatives: ["Claude", "Bard", "Bing Chat", "Perplexity"],
    tags: ["AI", "NLP", "Chatbot", "OpenAI", "GPT-4", "API"]
  };

  const reviews = [
    {
      author: "Sarah Chen",
      role: "Product Manager",
      company: "TechStart",
      rating: 5,
      date: "2 days ago",
      content: "ChatGPT has revolutionized how our team approaches content creation. The quality of responses is consistently high, and it's become an essential tool in our workflow.",
      helpful: 23,
      avatar: "SC"
    },
    {
      author: "Michael Rodriguez",
      role: "Software Engineer",
      company: "DevCorp",
      rating: 4,
      date: "1 week ago", 
      content: "Great for code assistance and debugging. Sometimes the responses can be verbose, but the accuracy is impressive. The API integration was straightforward.",
      helpful: 18,
      avatar: "MR"
    },
    {
      author: "Emily Johnson",
      role: "Content Writer",
      company: "Creative Agency",
      rating: 5,
      date: "2 weeks ago",
      content: "As a writer, ChatGPT has become my go-to tool for brainstorming and overcoming writer's block. It helps me explore different angles and improve my writing.",
      helpful: 31,
      avatar: "EJ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discover
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center text-3xl">
                {tool.logo}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{tool.name}</h1>
                  <StatusTag status="popular" />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(tool.rating) ? 'fill-warning text-warning' : 'text-muted-foreground'}`}
                      />
                    ))}
                    <span className="font-medium ml-2">{tool.rating}</span>
                    <span className="text-muted-foreground">({tool.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <CategoryTag category={tool.category} />
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <AIButton size="lg" className="flex-1 sm:flex-none">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </AIButton>
              
              <AIButton 
                variant="outline" 
                size="lg"
                onClick={() => onCompare(tool)}
                className="flex-1 sm:flex-none"
              >
                Add to Compare
              </AIButton>
              
              <AIButton variant="secondary" size="lg">
                View API Docs
              </AIButton>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">About {tool.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {tool.longDescription}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {tool.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <X className="h-4 w-4 text-destructive" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {tool.cons.map((con, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-destructive rounded-full mt-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Use Cases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Similar Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.alternatives.map((alt, index) => (
                      <Badge key={index} variant="outline">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">User Reviews ({tool.reviews.toLocaleString()})</h3>
                  <Button variant="outline">Write Review</Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start gap-4">
                        <AIAvatar fallback={review.avatar} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.author}</span>
                            <span className="text-sm text-muted-foreground">
                              {review.role} at {review.company}
                            </span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? 'fill-warning text-warning' : 'text-muted-foreground'}`}
                              />
                            ))}
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-3">
                            {review.content}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="hover:text-foreground transition-colors">
                              Helpful ({review.helpful})
                            </button>
                            <button className="hover:text-foreground transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">API Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Available</span>
                      <Badge variant="default">Yes</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Rate Limit</span>
                      <span className="text-sm text-muted-foreground">{tool.apiInfo.rateLimit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pricing</span>
                      <span className="text-sm text-muted-foreground">{tool.apiInfo.pricing}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Documentation</span>
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View API Docs
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Pricing</h3>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Free</span>
                    <span className="text-sm text-muted-foreground">$0</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.pricing.free}</p>
                </div>
                
                <div className="p-3 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Plus</span>
                    <span className="text-sm font-medium text-primary">{tool.pricing.paid}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Unlimited usage + priority</p>
                  <Button className="w-full mt-3">Choose Plan</Button>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Enterprise</span>
                    <span className="text-sm text-muted-foreground">Custom</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.pricing.enterprise}</p>
                  <Button variant="outline" className="w-full mt-3">Contact Sales</Button>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">100M+ users</div>
                    <div className="text-xs text-muted-foreground">Active monthly users</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">4.8/5 rating</div>
                    <div className="text-xs text-muted-foreground">Based on {tool.reviews.toLocaleString()} reviews</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Enterprise ready</div>
                    <div className="text-xs text-muted-foreground">SOC 2 compliant</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}