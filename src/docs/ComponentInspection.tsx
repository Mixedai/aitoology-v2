import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Code, Copy, Check, Layers, Eye, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ComponentSpec {
  name: string;
  category: string;
  description: string;
  tailwindClasses: string[];
  htmlStructure: string;
  properties: {
    spacing: string[];
    colors: string[];
    typography: string[];
    layout: string[];
  };
  variants: {
    name: string;
    classes: string;
    description: string;
  }[];
  usage: string;
}

export function ComponentInspection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string>("tool-card");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const components: ComponentSpec[] = [
    {
      name: "Tool Card",
      category: "Cards",
      description: "Interactive card component for displaying AI tool information with hover effects",
      tailwindClasses: [
        "p-6", "hover:shadow-lg", "transition-shadow", "cursor-pointer",
        "bg-card", "border", "border-border", "rounded-lg"
      ],
      htmlStructure: `<div class="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-card border border-border rounded-lg">
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
        🤖
      </div>
      <div>
        <h3 class="font-semibold">ChatGPT</h3>
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
          AI Writing
        </span>
      </div>
    </div>
    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs border border-border">
      Popular
    </span>
  </div>
  <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
    Advanced AI language model for conversational AI and content generation.
  </p>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-1">
      <svg class="h-4 w-4 fill-warning text-warning">...</svg>
      <span class="text-sm font-medium">4.8</span>
    </div>
    <span class="font-semibold text-primary">$20/month</span>
  </div>
</div>`,
      properties: {
        spacing: ["p-6", "mb-4", "gap-3", "gap-1"],
        colors: ["bg-card", "border-border", "text-muted-foreground", "text-primary"],
        typography: ["font-semibold", "text-sm", "text-lg"],
        layout: ["flex", "items-start", "justify-between", "items-center"]
      },
      variants: [
        {
          name: "Default",
          classes: "p-6 hover:shadow-lg transition-shadow cursor-pointer",
          description: "Standard tool card with hover effect"
        },
        {
          name: "Compact", 
          classes: "p-4 hover:shadow-md transition-shadow cursor-pointer",
          description: "Smaller padding for dense layouts"
        },
        {
          name: "Featured",
          classes: "p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-primary",
          description: "Highlighted card with primary border"
        }
      ],
      usage: "Used in tool discovery grid, comparison selections, and featured tool lists"
    },
    {
      name: "Navigation Header",
      category: "Navigation",
      description: "Sticky header navigation with backdrop blur and responsive design",
      tailwindClasses: [
        "sticky", "top-0", "z-50", "w-full", "border-b", "bg-background/95", 
        "backdrop-blur", "supports-[backdrop-filter]:bg-background/60"
      ],
      htmlStructure: `<nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <h2 class="text-xl font-bold text-primary">AI Toologist</h2>
      </div>
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          <a href="#" class="text-foreground hover:text-primary transition-colors">Discover</a>
          <a href="#" class="text-foreground hover:text-primary transition-colors">Compare</a>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button class="p-2 hover:bg-muted rounded-lg transition-colors">
          <svg class="h-4 w-4">...</svg>
        </button>
        <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </div>
</nav>`,
      properties: {
        spacing: ["h-16", "px-4", "sm:px-6", "lg:px-8", "ml-10", "space-x-8", "space-x-4"],
        colors: ["bg-background/95", "border-b", "text-primary", "hover:text-primary"],
        typography: ["text-xl", "font-bold"],
        layout: ["sticky", "flex", "items-center", "justify-between", "hidden", "md:block"]
      },
      variants: [
        {
          name: "Landing",
          classes: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
          description: "Standard navigation for landing page"
        },
        {
          name: "App Navigation",
          classes: "sticky top-0 z-50 w-full border-b bg-background shadow-sm",
          description: "Solid background for app pages"
        },
        {
          name: "Transparent",
          classes: "absolute top-0 z-50 w-full bg-transparent",
          description: "Overlay navigation for hero sections"
        }
      ],
      usage: "Main site navigation, app header, mobile responsive navigation"
    },
    {
      name: "Stats Card",
      category: "Data Display",
      description: "Dashboard card displaying metrics with trend indicators and icons",
      tailwindClasses: [
        "p-6", "bg-card", "border", "border-border", "rounded-lg", "shadow-sm"
      ],
      htmlStructure: `<div class="p-6 bg-card border border-border rounded-lg shadow-sm">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm text-muted-foreground">API Calls Today</p>
      <p class="text-2xl font-bold">1,247</p>
    </div>
    <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
      <svg class="h-4 w-4 text-primary">...</svg>
    </div>
  </div>
  <div class="flex items-center gap-1 mt-4">
    <svg class="h-3 w-3 text-success">...</svg>
    <span class="text-xs text-success font-medium">+12.3%</span>
    <span class="text-xs text-muted-foreground">from yesterday</span>
  </div>
</div>`,
      properties: {
        spacing: ["p-6", "w-8", "h-8", "gap-1", "mt-4"],
        colors: ["bg-card", "border-border", "text-muted-foreground", "bg-primary/10", "text-primary", "text-success"],
        typography: ["text-sm", "text-2xl", "font-bold", "text-xs", "font-medium"],
        layout: ["flex", "items-center", "justify-between", "rounded-lg"]
      },
      variants: [
        {
          name: "Basic",
          classes: "p-6 bg-card border border-border rounded-lg",
          description: "Simple stat card without shadow"
        },
        {
          name: "Elevated",
          classes: "p-6 bg-card border border-border rounded-lg shadow-lg",
          description: "Card with prominent shadow"
        },
        {
          name: "Compact",
          classes: "p-4 bg-card border border-border rounded-lg",
          description: "Smaller padding for tight layouts"
        }
      ],
      usage: "Dashboard metrics, KPI displays, analytics overview"
    },
    {
      name: "Filter Sidebar",
      category: "Navigation",
      description: "Collapsible sidebar with filter categories and checkboxes",
      tailwindClasses: [
        "w-80", "transition-all", "duration-300", "overflow-hidden", "bg-background"
      ],
      htmlStructure: `<div class="w-80 transition-all duration-300 overflow-hidden bg-background">
  <div class="p-6 sticky top-24 bg-card border border-border rounded-lg">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-semibold">Filters</h3>
      <button class="text-sm text-muted-foreground hover:text-foreground">Clear All</button>
    </div>
    <div class="space-y-4">
      <div>
        <h4 class="font-medium mb-3">Category</h4>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <input type="checkbox" class="h-4 w-4 rounded border border-border" />
            <label class="text-sm flex-1 cursor-pointer">AI Writing</label>
            <span class="text-xs text-muted-foreground">234</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      properties: {
        spacing: ["w-80", "p-6", "mb-6", "mb-3", "space-y-4", "space-y-2", "space-x-2"],
        colors: ["bg-background", "bg-card", "border-border", "text-muted-foreground"],
        typography: ["font-semibold", "font-medium", "text-sm", "text-xs"],
        layout: ["sticky", "top-24", "flex", "items-center", "justify-between"]
      },
      variants: [
        {
          name: "Open",
          classes: "w-80 transition-all duration-300 overflow-hidden",
          description: "Fully expanded sidebar"
        },
        {
          name: "Collapsed",
          classes: "w-0 transition-all duration-300 overflow-hidden",
          description: "Hidden sidebar for mobile"
        },
        {
          name: "Fixed",
          classes: "w-80 bg-background",
          description: "Non-collapsible sidebar for desktop"
        }
      ],
      usage: "Tool filtering, search refinement, category selection"
    },
    {
      name: "Toast Notification",
      category: "Feedback",
      description: "Animated notification with status indicators and actions",
      tailwindClasses: [
        "flex", "items-start", "gap-3", "p-4", "rounded-lg", "border", "shadow-lg"
      ],
      htmlStructure: `<div class="flex items-start gap-3 p-4 rounded-lg border shadow-lg bg-success/10 border-success/20">
  <svg class="h-5 w-5 text-success">...</svg>
  <div class="flex-1">
    <h4 class="font-medium text-sm">Subscription updated</h4>
    <p class="text-sm opacity-90 mt-1">Welcome to AI Toologist Professional!</p>
  </div>
  <button class="opacity-70 hover:opacity-100 transition-opacity">
    <svg class="h-4 w-4">...</svg>
  </button>
</div>`,
      properties: {
        spacing: ["gap-3", "p-4", "mt-1"],
        colors: ["bg-success/10", "border-success/20", "text-success"],
        typography: ["font-medium", "text-sm"],
        layout: ["flex", "items-start", "flex-1", "rounded-lg"]
      },
      variants: [
        {
          name: "Success",
          classes: "bg-success/10 border-success/20 text-success-foreground",
          description: "Green theme for success messages"
        },
        {
          name: "Error",
          classes: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
          description: "Red theme for error messages"
        },
        {
          name: "Warning",
          classes: "bg-warning/10 border-warning/20 text-warning-foreground",
          description: "Yellow theme for warnings"
        },
        {
          name: "Info",
          classes: "bg-primary/10 border-primary/20 text-primary-foreground",
          description: "Blue theme for information"
        }
      ],
      usage: "Success notifications, error alerts, system messages"
    },
    {
      name: "Comparison Tray",
      category: "Interactive",
      description: "Slide-up tray for managing tool comparisons with animations",
      tailwindClasses: [
        "fixed", "bottom-0", "left-0", "right-0", "z-50", "bg-background", "border-t", "shadow-2xl"
      ],
      htmlStructure: `<div class="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-2xl">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg class="h-5 w-5 text-primary">...</svg>
        <h3 class="font-semibold">Compare Tools (2/3)</h3>
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground animate-pulse">
          Ready to compare!
        </span>
      </div>
      <button class="p-1 hover:bg-muted rounded transition-colors">
        <svg class="h-4 w-4">...</svg>
      </button>
    </div>
    <div class="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
      <!-- Tool cards go here -->
    </div>
  </div>
</div>`,
      properties: {
        spacing: ["py-4", "px-4", "sm:px-6", "lg:px-8", "gap-3", "gap-4", "mt-4", "pb-2"],
        colors: ["bg-background", "border-t", "text-primary", "bg-primary", "hover:bg-muted"],
        typography: ["font-semibold", "text-xs"],
        layout: ["fixed", "bottom-0", "left-0", "right-0", "flex", "items-center", "overflow-x-auto"]
      },
      variants: [
        {
          name: "Visible",
          classes: "translate-y-0 opacity-100",
          description: "Fully visible tray"
        },
        {
          name: "Hidden",
          classes: "translate-y-full opacity-0",
          description: "Hidden below viewport"
        },
        {
          name: "Minimized",
          classes: "translate-y-16 opacity-80",
          description: "Partially visible indicator"
        }
      ],
      usage: "Tool comparison, multi-select actions, persistent bottom actions"
    }
  ];

  const selectedComp = components.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === selectedComponent);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Component Inspection</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed Tailwind CSS specifications for each UI component
          </p>
        </div>

        {/* Component Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {components.map((component) => {
            const compId = component.name.toLowerCase().replace(/\s+/g, '-');
            const isSelected = selectedComponent === compId;
            
            return (
              <motion.button
                key={compId}
                onClick={() => setSelectedComponent(compId)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-background hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{component.category}</span>
                </div>
                <h3 className="font-medium text-sm">{component.name}</h3>
              </motion.button>
            );
          })}
        </div>

        {/* Component Details */}
        {selectedComp && (
          <motion.div
            key={selectedComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Component Overview */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedComp.name}</h2>
                    <p className="text-muted-foreground">{selectedComp.description}</p>
                  </div>
                  <Badge variant="secondary">{selectedComp.category}</Badge>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Usage Context</h3>
                  <p className="text-sm text-muted-foreground">{selectedComp.usage}</p>
                </div>
              </Card>

              {/* HTML Structure */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    HTML Structure
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(selectedComp.htmlStructure, selectedComp.name)}
                  >
                    {copiedCode === selectedComp.name ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{selectedComp.htmlStructure}</code>
                  </pre>
                </div>
              </Card>

              {/* Component Variants */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Component Variants</h3>
                <div className="space-y-4">
                  {selectedComp.variants.map((variant, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-background">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{variant.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(variant.classes, `${selectedComp.name}-${variant.name}`)}
                        >
                          {copiedCode === `${selectedComp.name}-${variant.name}` ? (
                            <Check className="h-3 w-3 text-success" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{variant.description}</p>
                      <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">
                        {variant.classes}
                      </code>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tailwind Classes */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Primary Classes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedComp.tailwindClasses.map((className, index) => (
                    <Badge key={index} variant="outline" className="font-mono text-xs">
                      {className}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Properties Breakdown */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Properties Breakdown</h3>
                
                <Tabs defaultValue="spacing" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="spacing">Spacing</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                  </TabsList>

                  <TabsContent value="spacing" className="space-y-2">
                    {selectedComp.properties.spacing.map((cls, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {cls}
                        </code>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-2">
                    {selectedComp.properties.colors.map((cls, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {cls}
                        </code>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="typography" className="space-y-2">
                    {selectedComp.properties.typography.map((cls, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {cls}
                        </code>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="layout" className="space-y-2">
                    {selectedComp.properties.layout.map((cls, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {cls}
                        </code>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => copyToClipboard(selectedComp.tailwindClasses.join(' '), 'all-classes')}
                  >
                    {copiedCode === 'all-classes' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy All Classes
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Zap className="h-4 w-4" />
                    View in Storybook
                  </Button>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}