import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { 
  Code, 
  Download, 
  ExternalLink, 
  Copy, 
  Check,
  Package,
  Palette,
  Layers,
  FileCode,
  Github,
  BookOpen,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

export function DevModeHandoff() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const npmPackages = [
    {
      name: "@headlessui/react",
      version: "^1.7.17",
      description: "Unstyled, fully accessible UI components",
      usage: "Modal dialogs, dropdowns, toggles"
    },
    {
      name: "react-router-dom", 
      version: "^6.8.0",
      description: "Declarative routing for React applications",
      usage: "Navigation between screens, deep linking"
    },
    {
      name: "recharts",
      version: "^2.8.0", 
      description: "Composable charting library for React",
      usage: "Dashboard analytics, usage charts"
    },
    {
      name: "framer-motion",
      version: "^11.0.0",
      description: "Production-ready motion library for React",
      usage: "Animations, transitions, gestures"
    },
    {
      name: "lucide-react",
      version: "^0.294.0",
      description: "Beautiful & consistent icon toolkit",
      usage: "Icons throughout the application"
    },
    {
      name: "@radix-ui/react-*",
      version: "^1.0.0",
      description: "Low-level UI primitives",
      usage: "shadcn/ui component foundation"
    }
  ];

  const tailwindSpacing = [
    { class: "p-4", css: "padding: 1rem", usage: "Card padding, button padding" },
    { class: "p-6", css: "padding: 1.5rem", css: "Card content padding" },
    { class: "p-8", css: "padding: 2rem", usage: "Page container padding" },
    { class: "gap-4", css: "gap: 1rem", usage: "Grid/flex item spacing" },
    { class: "gap-6", css: "gap: 1.5rem", usage: "Section spacing" },
    { class: "gap-8", css: "gap: 2rem", usage: "Layout column spacing" },
    { class: "space-y-4", css: "margin-top: 1rem (children)", usage: "Vertical stack spacing" },
    { class: "space-y-6", css: "margin-top: 1.5rem (children)", usage: "Form field spacing" },
    { class: "mb-4", css: "margin-bottom: 1rem", usage: "Section bottom margin" },
    { class: "mb-6", css: "margin-bottom: 1.5rem", usage: "Header bottom margin" },
    { class: "mb-8", css: "margin-bottom: 2rem", usage: "Major section spacing" }
  ];

  const tailwindColors = [
    { class: "bg-primary", css: "--primary: #FF6B35", usage: "Primary buttons, accents" },
    { class: "text-primary", css: "color: #FF6B35", usage: "Primary text, links" },
    { class: "bg-secondary", css: "--secondary: #4A5C7A", usage: "Secondary buttons" },
    { class: "text-secondary", css: "color: #4A5C7A", usage: "Secondary text" },
    { class: "bg-muted", css: "--muted: #E5E1DB", usage: "Subtle backgrounds" },
    { class: "text-muted-foreground", css: "color: #4A5C7A", usage: "Helper text, labels" },
    { class: "bg-background", css: "--background: #ffffff", usage: "Page background" },
    { class: "text-foreground", css: "color: #1A1A1A", usage: "Primary text color" },
    { class: "border-border", css: "border-color: rgba(74, 92, 122, 0.2)", usage: "Card borders, dividers" },
    { class: "bg-success", css: "--success: #10B981", usage: "Success states" },
    { class: "bg-destructive", css: "--destructive: #EF4444", usage: "Error states" },
    { class: "bg-warning", css: "--warning: #EAB308", usage: "Warning states" }
  ];

  const componentSnippets = [
    {
      name: "Tool Card",
      description: "Interactive tool card with hover effects",
      code: `<Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
        🤖
      </div>
      <div>
        <h3 className="font-semibold">ChatGPT</h3>
        <Badge variant="secondary" className="text-xs">AI Writing</Badge>
      </div>
    </div>
    <Badge variant="outline">Popular</Badge>
  </div>
  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
    Advanced AI language model for conversational AI and content generation.
  </p>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-warning text-warning" />
      <span className="text-sm font-medium">4.8</span>
    </div>
    <span className="font-semibold text-primary">$20/month</span>
  </div>
</Card>`
    },
    {
      name: "Navigation Header",
      description: "Sticky navigation with theme toggle",
      code: `<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <h2 className="text-xl font-bold text-primary">AI Toologist</h2>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-foreground hover:text-primary transition-colors">
          Discover
        </a>
        <a href="#" className="text-foreground hover:text-primary transition-colors">
          Compare
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <Sun className="h-4 w-4" />
        </Button>
        <Button>Get Started</Button>
      </div>
    </div>
  </div>
</nav>`
    },
    {
      name: "Stats Card",
      description: "Dashboard stat card with trend indicator",
      code: `<Card className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-muted-foreground">API Calls Today</p>
      <p className="text-2xl font-bold">1,247</p>
    </div>
    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
      <BarChart3 className="h-4 w-4 text-primary" />
    </div>
  </div>
  <div className="flex items-center gap-1 mt-4">
    <TrendingUp className="h-3 w-3 text-success" />
    <span className="text-xs text-success font-medium">+12.3%</span>
    <span className="text-xs text-muted-foreground">from yesterday</span>
  </div>
</Card>`
    },
    {
      name: "Filter Sidebar",
      description: "Collapsible filter sidebar with checkboxes",
      code: `<Card className="p-6 sticky top-24">
  <div className="flex items-center justify-between mb-6">
    <h3 className="font-semibold">Filters</h3>
    <Button variant="ghost" size="sm">Clear All</Button>
  </div>
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-3">Category</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="ai-writing" />
          <label htmlFor="ai-writing" className="text-sm flex-1 cursor-pointer">
            AI Writing
          </label>
          <span className="text-xs text-muted-foreground">234</span>
        </div>
      </div>
    </div>
  </div>
</Card>`
    },
    {
      name: "Toast Notification",
      description: "Animated toast with success state",
      code: `<motion.div
  initial={{ x: "100%", opacity: 0, scale: 0.8 }}
  animate={{ x: 0, opacity: 1, scale: 1 }}
  exit={{ x: "100%", opacity: 0, scale: 0.8 }}
  className="flex items-start gap-3 p-4 rounded-lg border shadow-lg bg-success/10 border-success/20"
>
  <CheckCircle className="h-5 w-5 text-success" />
  <div className="flex-1">
    <h4 className="font-medium text-sm">Subscription updated</h4>
    <p className="text-sm opacity-90 mt-1">
      Welcome to AI Toologist Professional!
    </p>
  </div>
  <button className="opacity-70 hover:opacity-100">
    <X className="h-4 w-4" />
  </button>
</motion.div>`
    }
  ];

  const assets = [
    {
      category: "Logos & Branding",
      items: [
        { name: "AI Toologist Logo", type: "SVG", size: "Vector", description: "Primary brand logo" },
        { name: "Logo Icon", type: "SVG", size: "32x32", description: "Favicon and app icon" },
        { name: "Logo Wordmark", type: "SVG", size: "Vector", description: "Text-only logo" }
      ]
    },
    {
      category: "Tool Icons",
      items: [
        { name: "ChatGPT Icon", type: "SVG", size: "24x24", description: "🤖 emoji replacement" },
        { name: "Midjourney Icon", type: "SVG", size: "24x24", description: "🎨 emoji replacement" },
        { name: "Code Assistant Icon", type: "SVG", size: "24x24", description: "💻 emoji replacement" }
      ]
    },
    {
      category: "Mockup Screenshots",
      items: [
        { name: "Landing Page", type: "PNG", size: "1280x720", description: "Desktop landing page" },
        { name: "Discover Page", type: "PNG", size: "1280x720", description: "Tool discovery interface" },
        { name: "Dashboard", type: "PNG", size: "1280x720", description: "User dashboard view" },
        { name: "Mobile Screens", type: "PNG", size: "375x812", description: "Mobile responsive views" }
      ]
    },
    {
      category: "UI Components",
      items: [
        { name: "Button States", type: "SVG", size: "Vector", description: "All button variants" },
        { name: "Form Elements", type: "SVG", size: "Vector", description: "Input, select, checkbox" },
        { name: "Card Components", type: "SVG", size: "Vector", description: "Tool cards, stat cards" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">🚀 Dev Mode Handoff</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete development specifications for AI Toologist React + Tailwind implementation
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub Repository
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Storybook Documentation
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button variant="outline" className="gap-2">
              <FileCode className="h-4 w-4" />
              API Documentation
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="packages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            <TabsTrigger value="packages">📦 Packages</TabsTrigger>
            <TabsTrigger value="spacing">📏 Spacing</TabsTrigger>
            <TabsTrigger value="colors">🎨 Colors</TabsTrigger>
            <TabsTrigger value="components">🧩 Components</TabsTrigger>
            <TabsTrigger value="assets">📁 Assets</TabsTrigger>
          </TabsList>

          {/* NPM Packages Tab */}
          <TabsContent value="packages" className="space-y-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Required NPM Packages</h2>
              </div>
              
              <div className="grid gap-6">
                {npmPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6 bg-background"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <code className="font-mono font-semibold text-lg">{pkg.name}</code>
                          <Badge variant="secondary">{pkg.version}</Badge>
                        </div>
                        <p className="text-muted-foreground">{pkg.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`npm install ${pkg.name}`, pkg.name)}
                        className="shrink-0"
                      >
                        {copiedSnippet === pkg.name ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Usage:</span>
                      <span className="text-muted-foreground">{pkg.usage}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Installation Commands</h3>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                  <p className="text-green-400"># Install all dependencies</p>
                  <p>npm install @headlessui/react react-router-dom recharts framer-motion lucide-react</p>
                  <br />
                  <p className="text-green-400"># Install Radix UI components (for shadcn/ui)</p>
                  <p>npx shadcn-ui@latest init</p>
                  <p>npx shadcn-ui@latest add button card input badge</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Tailwind Spacing Classes</h2>
              </div>
              
              <div className="grid gap-4">
                {tailwindSpacing.map((spacing, index) => (
                  <div key={spacing.class} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm">
                        {spacing.class}
                      </code>
                      <span className="text-muted-foreground font-mono text-sm">{spacing.css}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{spacing.usage}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">8-Point Grid System</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  All spacing follows an 8-point grid system where each unit = 0.25rem (4px). 
                  This ensures consistent spacing throughout the application.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Tailwind Color Classes</h2>
              </div>
              
              <div className="grid gap-4">
                {tailwindColors.map((color, index) => (
                  <div key={color.class} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded border ${color.class}`}></div>
                        <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm">
                          {color.class}
                        </code>
                      </div>
                      <span className="text-muted-foreground font-mono text-sm">{color.css}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{color.usage}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Dark Mode Support</h3>
                <p className="text-orange-800 dark:text-orange-200 text-sm">
                  All color classes automatically adapt to dark mode using CSS custom properties. 
                  Use the <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">dark:</code> prefix for dark-specific overrides.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Component Code Snippets</h2>
              </div>
              
              <div className="space-y-8">
                {componentSnippets.map((snippet, index) => (
                  <motion.div
                    key={snippet.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 bg-muted/50 border-b">
                      <div>
                        <h3 className="font-semibold">{snippet.name}</h3>
                        <p className="text-sm text-muted-foreground">{snippet.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(snippet.code, snippet.name)}
                      >
                        {copiedSnippet === snippet.name ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="bg-slate-900 text-slate-100 p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-8">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Download className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Downloadable Assets</h2>
                </div>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download All Assets (.zip)
                </Button>
              </div>
              
              <div className="space-y-8">
                {assets.map((category, categoryIndex) => (
                  <div key={category.category}>
                    <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                    <div className="grid gap-4">
                      {category.items.map((asset, index) => (
                        <motion.div
                          key={asset.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                          className="flex items-center justify-between p-4 border rounded-lg bg-background hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileCode className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{asset.name}</h4>
                              <p className="text-sm text-muted-foreground">{asset.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{asset.type}</Badge>
                            <Badge variant="secondary">{asset.size}</Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Asset Guidelines</h3>
                <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                  <li>• SVG assets are optimized and include proper viewBox attributes</li>
                  <li>• PNG mockups are exported at 2x resolution for Retina displays</li>
                  <li>• All assets follow consistent naming conventions</li>
                  <li>• Icons are 24x24px with 2px stroke width for consistency</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t">
          <p className="text-muted-foreground">
            For questions about implementation, please refer to the{" "}
            <Button variant="link" className="p-0 h-auto">
              GitHub repository
            </Button>{" "}
            or reach out to the design team.
          </p>
        </div>
      </div>
    </div>
  );
}