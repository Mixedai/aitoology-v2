import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  Home, 
  Search, 
  Star, 
  User, 
  Settings, 
  BarChart3,
  ArrowRight,
  ArrowDown,
  Monitor,
  Tablet,
  Smartphone,
  Users,
  Shield,
  Zap,
  Copy,
  Check,
  Eye,
  MessageSquare,
  Heart,
  Plus,
  Filter,
  BookOpen,
  Info,
  Globe,
  UserCheck,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";

export function InformationArchitecture() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Site Structure Data
  const siteStructure = {
    public: [
      { id: "home", name: "Home", icon: Home, path: "/", description: "Landing page with hero, featured tools, categories" },
      { id: "browse", name: "Browse Tools", icon: Search, path: "/browse", description: "Tool directory with search, filters, pagination" },
      { id: "tool-detail", name: "Tool Detail", icon: Eye, path: "/tool/:id", description: "Individual tool information, reviews, pricing" },
      { id: "categories", name: "Categories", icon: BookOpen, path: "/categories", description: "Browse tools by category, subcategories" },
      { id: "compare", name: "Compare Tools", icon: BarChart3, path: "/compare", description: "Side-by-side tool comparison" },
      { id: "about", name: "About", icon: Info, path: "/about", description: "Company info, mission, team" },
      { id: "blog", name: "Blog", icon: MessageSquare, path: "/blog", description: "AI tool reviews, tutorials, industry news" }
    ],
    functional: [
      { id: "search", name: "Search & Filters", icon: Filter, description: "Global search with advanced filtering" },
      { id: "reviews", name: "Reviews & Comments", icon: MessageSquare, description: "User reviews, ratings, discussions" },
      { id: "favorites", name: "Upvote/Favorite", icon: Heart, description: "Save and rate tools" },
      { id: "submit", name: "Tool Submission", icon: Plus, description: "Submit new AI tools for review" }
    ],
    user: [
      { id: "auth", name: "Authentication", icon: UserCheck, path: "/auth", description: "Sign in/up, password reset" },
      { id: "profile", name: "Profile", icon: User, path: "/profile", description: "User settings, preferences, public profile" },
      { id: "wallet", name: "My Tool Wallet", icon: Star, path: "/wallet", description: "Subscriptions, spending tracker, recommendations" },
      { id: "notifications", name: "Notifications", icon: Settings, path: "/notifications", description: "Updates, mentions, tool recommendations" }
    ],
    admin: [
      { id: "moderation", name: "Tool Moderation", icon: Shield, path: "/admin/moderation", description: "Review submitted tools, approve/reject" },
      { id: "categories-mgmt", name: "Categories Management", icon: Settings, path: "/admin/categories", description: "Manage tool categories and tags" },
      { id: "featured", name: "Weekly Featured", icon: Crown, path: "/admin/featured", description: "Select and manage featured tools" },
      { id: "analytics", name: "Basic Analytics", icon: BarChart3, path: "/admin/analytics", description: "Traffic, engagement, tool popularity metrics" }
    ]
  };

  // User Flow Steps
  const userFlows = {
    discovery: [
      { step: "Land on Homepage", description: "User arrives via search/referral", page: "Home" },
      { step: "Browse Categories", description: "Explore AI tool categories", page: "Categories" },
      { step: "Search/Filter Tools", description: "Use search and filters", page: "Browse Tools" },
      { step: "View Tool Details", description: "Click on interesting tool", page: "Tool Detail" },
      { step: "Compare Options", description: "Add to comparison", page: "Compare Tools" },
      { step: "Sign Up/Save", description: "Create account to save", page: "Auth" }
    ],
    engagement: [
      { step: "User Login", description: "Returning user signs in", page: "Auth" },
      { step: "Check Wallet", description: "View saved tools/subscriptions", page: "My Tool Wallet" },
      { step: "Browse New Tools", description: "Discover latest additions", page: "Browse Tools" },
      { step: "Leave Review", description: "Rate and review tools", page: "Tool Detail" },
      { step: "Submit Tool", description: "Contribute to platform", page: "Tool Submission" },
      { step: "Update Profile", description: "Manage preferences", page: "Profile" }
    ],
    admin: [
      { step: "Admin Login", description: "Admin authentication", page: "Auth" },
      { step: "Review Submissions", description: "Moderate new tools", page: "Tool Moderation" },
      { step: "Update Categories", description: "Manage taxonomy", page: "Categories Management" },
      { step: "Select Featured", description: "Choose weekly highlights", page: "Weekly Featured" },
      { step: "Check Analytics", description: "Review platform metrics", page: "Basic Analytics" }
    ]
  };

  // Wireframe specifications
  const wireframeSpecs = {
    home: {
      sections: ["Navigation", "Hero Section", "Featured Tools", "Categories Grid", "Recent Reviews", "Newsletter Signup", "Footer"],
      breakpoints: {
        mobile: "Single column, stacked navigation, 1-col tool grid",
        tablet: "2-col tool grid, collapsible navigation",
        desktop: "3-col tool grid, full navigation, sidebar filters"
      },
      content: "Hero with value prop, 6 featured tools, 8 main categories, 3 recent reviews"
    },
    browse: {
      sections: ["Navigation", "Search Bar", "Filters Sidebar", "Results Grid", "Pagination", "Footer"],
      breakpoints: {
        mobile: "Drawer filters, 1-col results, compact cards",
        tablet: "Collapsible filters, 2-col results",
        desktop: "Fixed sidebar filters, 3-col results, detailed cards"
      },
      content: "Search input, 8 filter categories, 12 tools per page, load more button"
    },
    toolDetail: {
      sections: ["Navigation", "Tool Header", "Description", "Pricing", "Features", "Reviews", "Similar Tools", "Footer"],
      breakpoints: {
        mobile: "Stacked layout, tabbed sections, compact pricing",
        tablet: "2-col layout for some sections",
        desktop: "Sidebar layout, detailed pricing table, expanded reviews"
      },
      content: "Tool info, pricing tiers, feature comparison, user reviews, recommendations"
    },
    compare: {
      sections: ["Navigation", "Comparison Table", "Feature Matrix", "Pricing Comparison", "User Ratings", "Footer"],
      breakpoints: {
        mobile: "Card-based comparison, swipe between tools",
        tablet: "2 tools side-by-side",
        desktop: "3-4 tools in table format"
      },
      content: "Up to 4 tools, 15 comparison criteria, ratings, pricing"
    },
    profile: {
      sections: ["Navigation", "Profile Header", "Settings Tabs", "Saved Tools", "Activity Feed", "Footer"],
      breakpoints: {
        mobile: "Stacked profile info, tab navigation",
        tablet: "2-col layout for some sections",
        desktop: "Sidebar navigation, 3-col saved tools"
      },
      content: "User info, preferences, favorite tools, review history"
    },
    admin: {
      sections: ["Admin Navigation", "Dashboard Stats", "Action Items", "Quick Actions", "Recent Activity"],
      breakpoints: {
        mobile: "Simplified dashboard, essential metrics only",
        tablet: "2-col layout, condensed charts",
        desktop: "Full dashboard, detailed charts, multiple columns"
      },
      content: "Key metrics, pending reviews, moderation queue, analytics"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">AI Toologist</h1>
                  <p className="text-primary font-medium">Information Architecture</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Complete sitemap, user flows, and wireframe specifications for the AI Toologist platform.
                Includes responsive design considerations and content hierarchy guidelines.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedDevice === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedDevice === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedDevice === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="sitemap" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
            <TabsTrigger value="flows">User Flows</TabsTrigger>
            <TabsTrigger value="wireframes">Wireframes</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          {/* Sitemap Section */}
          <TabsContent value="sitemap" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Site Structure</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Complete information architecture showing all pages, features, and user access levels.
                Each section is organized by user role and functionality.
              </p>
            </div>

            <div className="space-y-8">
              {/* Public Pages */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Public Pages</h3>
                      <p className="text-sm text-muted-foreground">Accessible to all visitors</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    {siteStructure.public.length} pages
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {siteStructure.public.map((page) => {
                    const IconComponent = page.icon;
                    return (
                      <motion.div
                        key={page.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-success" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{page.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {page.description}
                            </p>
                            {page.path && (
                              <code className="text-xs bg-muted px-2 py-0.5 rounded mt-2 inline-block">
                                {page.path}
                              </code>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Functional Features */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Functional Features</h3>
                      <p className="text-sm text-muted-foreground">Core platform functionality</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {siteStructure.functional.length} features
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteStructure.functional.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* User Pages */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">User Dashboard</h3>
                      <p className="text-sm text-muted-foreground">Authenticated user features</p>
                    </div>
                  </div>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    {siteStructure.user.length} pages
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteStructure.user.map((page) => {
                    const IconComponent = page.icon;
                    return (
                      <motion.div
                        key={page.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{page.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {page.description}
                            </p>
                            {page.path && (
                              <code className="text-xs bg-muted px-2 py-0.5 rounded mt-2 inline-block">
                                {page.path}
                              </code>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Admin Pages */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Admin Panel</h3>
                      <p className="text-sm text-muted-foreground">Administrative functions</p>
                    </div>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    {siteStructure.admin.length} pages
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteStructure.admin.map((page) => {
                    const IconComponent = page.icon;
                    return (
                      <motion.div
                        key={page.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-4 w-4 text-warning" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{page.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {page.description}
                            </p>
                            {page.path && (
                              <code className="text-xs bg-muted px-2 py-0.5 rounded mt-2 inline-block">
                                {page.path}
                              </code>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* User Flows Section */}
          <TabsContent value="flows" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">User Journey Flows</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Key user paths through the platform showing how different user types interact with features and content.
              </p>
            </div>

            <div className="space-y-8">
              {/* Discovery Flow */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Search className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">New User Discovery Flow</h3>
                    <p className="text-sm text-muted-foreground">First-time visitor exploring the platform</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {userFlows.discovery.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-success">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step.step}</h4>
                          <Badge variant="outline" className="text-xs">{step.page}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index < userFlows.discovery.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Engagement Flow */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Returning User Engagement</h3>
                    <p className="text-sm text-muted-foreground">Registered user exploring and contributing</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {userFlows.engagement.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step.step}</h4>
                          <Badge variant="outline" className="text-xs">{step.page}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index < userFlows.engagement.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Admin Flow */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Admin Management Flow</h3>
                    <p className="text-sm text-muted-foreground">Platform administration and content moderation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {userFlows.admin.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-warning">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step.step}</h4>
                          <Badge variant="outline" className="text-xs">{step.page}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      {index < userFlows.admin.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Wireframes Section */}
          <TabsContent value="wireframes" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Low-Fidelity Wireframes</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Page structure and content hierarchy for key pages across different device breakpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Home Page Wireframe */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Home Page</h3>
                  <Badge variant="outline">Landing</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                    <div className="font-medium mb-1">Navigation Bar</div>
                    <div className="text-xs text-muted-foreground">Logo, Menu, Search, Auth</div>
                  </div>
                  
                  <div className="border-2 border-dashed border-primary/30 p-4 rounded bg-primary/5">
                    <div className="font-medium mb-1">Hero Section</div>
                    <div className="text-xs text-muted-foreground">Value proposition, CTA, featured tool count</div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                    <div className="font-medium mb-1">Featured Tools (6)</div>
                    <div className="text-xs text-muted-foreground grid grid-cols-3 gap-1">
                      <div className="bg-muted/50 p-2 rounded text-center">Tool 1</div>
                      <div className="bg-muted/50 p-2 rounded text-center">Tool 2</div>
                      <div className="bg-muted/50 p-2 rounded text-center">Tool 3</div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                    <div className="font-medium mb-1">Categories Grid (8)</div>
                    <div className="text-xs text-muted-foreground">Browse by category icons</div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="font-medium mb-1">Footer</div>
                    <div className="text-xs text-muted-foreground">Links, newsletter, social</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
                  <strong>Responsive:</strong><br />
                  Mobile: 1-col grid, hamburger menu<br />
                  Tablet: 2-col tools, sidebar menu<br />
                  Desktop: 3-col tools, full nav
                </div>
              </Card>

              {/* Browse Tools Wireframe */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Browse Tools</h3>
                  <Badge variant="outline">Directory</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="font-medium mb-1">Search & Sort Bar</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div className="border-2 border-dashed border-secondary/30 p-3 rounded bg-secondary/5">
                      <div className="font-medium mb-1">Filters</div>
                      <div className="text-xs text-muted-foreground">Categories, Price, Rating, Features</div>
                    </div>
                    
                    <div className="col-span-3 border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                      <div className="font-medium mb-1">Results Grid (12/page)</div>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        {[1,2,3,4,5,6].map(i => (
                          <div key={i} className="bg-muted/50 p-2 rounded text-center">Tool {i}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="text-center font-medium">Pagination / Load More</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
                  <strong>Responsive:</strong><br />
                  Mobile: Drawer filters, 1-col results<br />
                  Tablet: Collapsible filters, 2-col<br />
                  Desktop: Fixed sidebar, 3-col grid
                </div>
              </Card>

              {/* Tool Detail Wireframe */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Tool Detail</h3>
                  <Badge variant="outline">Product</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-2 border-dashed border-primary/30 p-3 rounded bg-primary/5">
                    <div className="font-medium mb-1">Tool Header</div>
                    <div className="text-xs text-muted-foreground">Logo, name, rating, category, actions (save/share)</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                      <div className="font-medium mb-2">Description & Features</div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div>What it does</div>
                        <div>Key features list</div>
                        <div>Use cases</div>
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-secondary/30 p-3 rounded bg-secondary/5">
                      <div className="font-medium mb-1">Pricing</div>
                      <div className="text-xs text-muted-foreground">Tiers, features, CTA</div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                    <div className="font-medium mb-1">Reviews Section</div>
                    <div className="text-xs text-muted-foreground">User reviews, ratings, add review form</div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="font-medium">Similar Tools (4)</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
                  <strong>Responsive:</strong><br />
                  Mobile: Stacked layout, tabs for sections<br />
                  Tablet: 2-col for description/pricing<br />
                  Desktop: Sidebar pricing, full layout
                </div>
              </Card>

              {/* Compare Tools Wireframe */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Compare Tools</h3>
                  <Badge variant="outline">Analysis</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="font-medium mb-1">Comparison Header</div>
                    <div className="text-xs text-muted-foreground">Selected tools (2-4), add/remove</div>
                  </div>
                  
                  <div className="border-2 border-dashed border-primary/30 p-4 rounded bg-primary/5">
                    <div className="font-medium mb-2">Comparison Table</div>
                    <div className="grid grid-cols-4 gap-1 text-xs">
                      <div className="font-medium">Features</div>
                      <div className="bg-muted/50 p-1 text-center">Tool A</div>
                      <div className="bg-muted/50 p-1 text-center">Tool B</div>
                      <div className="bg-muted/50 p-1 text-center">Tool C</div>
                      <div className="text-muted-foreground">Pricing</div>
                      <div className="bg-muted/30 p-1">$29/mo</div>
                      <div className="bg-muted/30 p-1">$49/mo</div>
                      <div className="bg-muted/30 p-1">Free</div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="font-medium">Feature Matrix</div>
                    <div className="text-xs text-muted-foreground">Detailed feature comparison</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
                  <strong>Responsive:</strong><br />
                  Mobile: Card-based, swipe between tools<br />
                  Tablet: 2 tools side-by-side<br />
                  Desktop: Up to 4 tools in table
                </div>
              </Card>

              {/* User Profile Wireframe */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">User Profile</h3>
                  <Badge variant="outline">Account</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-2 border-dashed border-secondary/30 p-3 rounded bg-secondary/5">
                    <div className="font-medium mb-1">Profile Header</div>
                    <div className="text-xs text-muted-foreground">Avatar, name, join date, stats</div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-2 rounded">
                    <div className="font-medium mb-1">Settings Navigation</div>
                    <div className="text-xs text-muted-foreground">Profile, Preferences, Billing, Security</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                      <div className="font-medium mb-1">Saved Tools</div>
                      <div className="space-y-1">
                        {[1,2,3].map(i => (
                          <div key={i} className="bg-muted/50 p-1 rounded text-xs">Saved Tool {i}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                      <div className="font-medium mb-1">Activity Feed</div>
                      <div className="text-xs text-muted-foreground">Recent reviews, votes, submissions</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
                  <strong>Responsive:</strong><br />
                  Mobile: Stacked, tab navigation<br />
                  Tablet: 2-col for some sections<br />
                  Desktop: Sidebar nav, 3-col saved tools
                </div>
              </Card>

              {/* Admin Dashboard Wireframe */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Admin Dashboard</h3>
                  <Badge variant="outline">Management</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="border-2 border-dashed border-warning/30 p-3 rounded bg-warning/5">
                    <div className="font-medium mb-1">Key Metrics</div>
                    <div className="grid grid-cols-4 gap-1 text-xs">
                      <div className="bg-muted/50 p-2 text-center">Tools</div>
                      <div className="bg-muted/50 p-2 text-center">Users</div>
                      <div className="bg-muted/50 p-2 text-center">Reviews</div>
                      <div className="bg-muted/50 p-2 text-center">Traffic</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                      <div className="font-medium mb-1">Pending Reviews</div>
                      <div className="text-xs text-muted-foreground">Tools awaiting approval</div>
                    </div>
                    
                    <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                      <div className="font-medium mb-1">Quick Actions</div>
                      <div className="text-xs text-muted-foreground">Moderate, feature, categorize</div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground/30 p-3 rounded">
                    <div className="font-medium mb-1">Recent Activity</div>
                    <div className="text-xs text-muted-foreground">User actions, submissions, reviews</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
                  <strong>Responsive:</strong><br />
                  Mobile: Essential metrics, simplified view<br />
                  Tablet: 2-col layout, condensed charts<br />
                  Desktop: Full dashboard, multiple columns
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Specifications Section */}
          <TabsContent value="specifications" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Detailed requirements for each page type including content hierarchy, 
                component specifications, and responsive behavior guidelines.
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(wireframeSpecs).map(([pageType, spec]) => (
                <Card key={pageType} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold capitalize">
                      {pageType.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(spec, null, 2), pageType)}
                    >
                      {copiedSection === pageType ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Page Sections</h4>
                      <div className="space-y-2">
                        {spec.sections.map((section, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm">{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Responsive Behavior</h4>
                      <div className="space-y-3">
                        {Object.entries(spec.breakpoints).map(([device, behavior]) => (
                          <div key={device} className="space-y-1">
                            <div className="flex items-center gap-2">
                              {device === 'mobile' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                              {device === 'tablet' && <Tablet className="h-4 w-4 text-muted-foreground" />}
                              {device === 'desktop' && <Monitor className="h-4 w-4 text-muted-foreground" />}
                              <span className="text-sm font-medium capitalize">{device}</span>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">{behavior}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Content Strategy</h4>
                      <p className="text-sm text-muted-foreground">{spec.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Implementation Notes */}
            <Card className="p-6 bg-muted/20">
              <h3 className="text-lg font-semibold mb-4">Implementation Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Content Hierarchy</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use semantic HTML elements (header, nav, main, section, article)</li>
                    <li>• Maintain consistent heading hierarchy (h1 → h2 → h3)</li>
                    <li>• Prioritize above-the-fold content for each page type</li>
                    <li>• Implement progressive enhancement for interactive features</li>
                    <li>• Use loading states and skeleton screens for dynamic content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Performance Considerations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Lazy load images and non-critical content</li>
                    <li>• Implement virtual scrolling for large lists (Browse Tools)</li>
                    <li>• Use pagination or infinite scroll for tool directories</li>
                    <li>• Cache frequently accessed data (categories, featured tools)</li>
                    <li>• Optimize images with WebP format and responsive sizes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}