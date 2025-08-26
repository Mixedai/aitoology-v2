import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Check, X, Star, ExternalLink, Plus } from "lucide-react";
import { StatusTag } from "../ui-kit/AITag";

interface CompareMockupProps {
  theme: "light" | "dark";
}

export function CompareMockup({ theme }: CompareMockupProps) {
  const tools = [
    {
      name: "ChatGPT",
      logo: "🤖",
      description: "Advanced AI language model for conversational AI and content generation",
      rating: 4.8,
      reviews: 12450,
      price: "20",
      period: "month",
      plan: "Plus",
      features: {
        "Text Generation": true,
        "Code Generation": true,
        "Image Analysis": true,
        "Voice Input": false,
        "Custom Training": false,
        "API Access": true,
        "Team Collaboration": true,
        "Priority Support": true
      },
      apiLimits: {
        "Requests per minute": "60",
        "Characters per request": "32,000",
        "Monthly quota": "Unlimited"
      },
      pros: [
        "Excellent natural language understanding",
        "Fast response times",
        "Regular model updates"
      ],
      cons: [
        "Limited to text-only interactions",
        "No real-time data access"
      ]
    },
    {
      name: "Claude",
      logo: "🧠",
      description: "AI assistant with constitutional AI training for safe and helpful responses",
      rating: 4.6,
      reviews: 8920,
      price: "18",
      period: "month",
      plan: "Pro",
      features: {
        "Text Generation": true,
        "Code Generation": true,
        "Image Analysis": true,
        "Voice Input": false,
        "Custom Training": true,
        "API Access": true,
        "Team Collaboration": false,
        "Priority Support": true
      },
      apiLimits: {
        "Requests per minute": "50",
        "Characters per request": "100,000",
        "Monthly quota": "1M tokens"
      },
      pros: [
        "Strong reasoning capabilities",
        "Constitutional AI safety",
        "Large context window"
      ],
      cons: [
        "Newer platform with fewer integrations",
        "No team features in base plan"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Compare AI Tools</h1>
          <p className="text-muted-foreground">
            Side-by-side comparison of features, pricing, and capabilities
          </p>
        </div>

        {/* Tool Selection */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Tool 1</label>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                <span className="text-2xl">{tools[0].logo}</span>
                <div>
                  <h3 className="font-semibold">{tools[0].name}</h3>
                  <p className="text-sm text-muted-foreground">AI Language Model</p>
                </div>
              </div>
            </div>
            
            <div className="text-2xl text-muted-foreground">VS</div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Tool 2</label>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                <span className="text-2xl">{tools[1].logo}</span>
                <div>
                  <h3 className="font-semibold">{tools[1].name}</h3>
                  <p className="text-sm text-muted-foreground">AI Assistant</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          </div>
        </Card>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-background border-b z-10">
              <div className="grid grid-cols-3 gap-4 p-4">
                <div className="font-medium">Feature</div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">{tools[0].logo}</span>
                    <h3 className="font-semibold">{tools[0].name}</h3>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm">{tools[0].rating}</span>
                    <span className="text-sm text-muted-foreground">({tools[0].reviews})</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">{tools[1].logo}</span>
                    <h3 className="font-semibold">{tools[1].name}</h3>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm">{tools[1].rating}</span>
                    <span className="text-sm text-muted-foreground">({tools[1].reviews})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <Card className="mb-6">
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="font-medium">Overview</div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{tools[0].description}</p>
                  <StatusTag status="popular" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{tools[1].description}</p>
                  <StatusTag status="new" />
                </div>
              </div>
            </Card>

            {/* Pricing Section */}
            <Card className="mb-6">
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="font-medium">Pricing</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    ${tools[0].price}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    per {tools[0].period}
                  </div>
                  <Badge variant="secondary">{tools[0].plan}</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    ${tools[1].price}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    per {tools[1].period}
                  </div>
                  <Badge variant="secondary">{tools[1].plan}</Badge>
                </div>
              </div>
            </Card>

            {/* Features Section */}
            <Card className="mb-6">
              <div className="p-6">
                <h3 className="font-medium mb-4">Features Comparison</h3>
                <div className="space-y-3">
                  {Object.keys(tools[0].features).map((feature) => {
                    const featureKey = feature as any;
                    return (
                      <div key={feature} className="grid grid-cols-3 gap-4 py-2 border-b border-border/50 last:border-0">
                        <div className="text-sm font-medium">{feature}</div>
                        <div className="text-center">
                          {tools[0].features[featureKey] ? (
                            <Check className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </div>
                        <div className="text-center">
                          {tools[1].features[featureKey] ? (
                            <Check className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* API Limits Section */}
            <Card className="mb-6">
              <div className="p-6">
                <h3 className="font-medium mb-4">API Limits</h3>
                <div className="space-y-3">
                  {Object.keys(tools[0].apiLimits).map((limit) => {
                    const limitKey = limit as any;
                    return (
                      <div key={limit} className="grid grid-cols-3 gap-4 py-2 border-b border-border/50 last:border-0">
                        <div className="text-sm font-medium">{limit}</div>
                        <div className="text-center">
                          <span className="text-sm font-medium">
                            {tools[0].apiLimits[limitKey]}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-medium">
                            {tools[1].apiLimits[limitKey]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Pros & Cons Section */}
            <Card className="mb-6">
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="font-medium">Pros & Cons</div>
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-success mb-2">Pros</h4>
                    <ul className="space-y-1">
                      {tools[0].pros.map((pro, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-destructive mb-2">Cons</h4>
                    <ul className="space-y-1">
                      {tools[0].cons.map((con, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <X className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-success mb-2">Pros</h4>
                    <ul className="space-y-1">
                      {tools[1].pros.map((pro, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-destructive mb-2">Cons</h4>
                    <ul className="space-y-1">
                      {tools[1].cons.map((con, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <X className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 p-6">
              <div></div>
              <Button className="w-full">
                Choose {tools[0].name}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <Button className="w-full">
                Choose {tools[1].name}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="outline">
            Save Comparison
          </Button>
          <Button variant="outline">
            Share Comparison
          </Button>
          <Button variant="outline">
            Export to PDF
          </Button>
        </div>
      </div>
    </div>
  );
}