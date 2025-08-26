import { useState, useCallback } from "react";
import { ThemeProvider } from "../mockups/ThemeProvider";
import { Navigation } from "../mockups/Navigation";
import { LandingMockup } from "../mockups/LandingMockup";
import { DiscoverMockup } from "../mockups/DiscoverMockup";
import { ToolDetailMockup } from "../mockups/ToolDetailMockup";
import { CompareMockup } from "../mockups/CompareMockup";
import { AuthMockup } from "../mockups/AuthMockup";
import { DashboardMockup } from "../mockups/DashboardMockup";
import { ComparisonTray } from "./ComparisonTray";
import { StripeCheckoutModal } from "./StripeCheckoutModal";
import { ToastNotification } from "./ToastNotification";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Play, RotateCcw, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Screen = "landing" | "discover" | "tool-detail" | "compare" | "auth" | "dashboard";

interface Tool {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  rating: number;
  pricing: string;
  status: "free" | "paid" | "freemium" | "popular" | "new";
}

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

export function PrototypeFlow() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [comparisonTools, setComparisonTools] = useState<Tool[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>("chatgpt");
  const [urlQuery, setUrlQuery] = useState("");

  // Mock tools data
  const tools = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      logo: "🤖",
      description: "Advanced AI language model for conversational AI and content generation",
      category: "AI Writing",
      rating: 4.8,
      pricing: "$20/month",
      status: "popular" as const
    },
    {
      id: "claude",
      name: "Claude",
      logo: "🧠", 
      description: "AI assistant with constitutional AI training for safe and helpful responses",
      category: "AI Writing",
      rating: 4.6,
      pricing: "$18/month",
      status: "new" as const
    },
    {
      id: "midjourney",
      name: "Midjourney",
      logo: "🎨",
      description: "AI-powered image generation tool for creating stunning artwork",
      category: "Image Generation", 
      rating: 4.7,
      pricing: "$30/month",
      status: "paid" as const
    }
  ];

  // Navigation functions
  const navigateToScreen = useCallback((screen: Screen, toolId?: string) => {
    if (toolId) setSelectedTool(toolId);
    setCurrentScreen(screen);
    
    // TODO: integrate React Router transition here
    console.log(`Navigating to ${screen}${toolId ? ` with tool ${toolId}` : ''}`);
  }, []);

  // Comparison tray functions
  const addToComparison = useCallback((tool: Tool) => {
    if (comparisonTools.length >= 3) {
      addToast({
        type: "warning",
        title: "Maximum tools reached",
        description: "You can compare up to 3 tools at once"
      });
      return;
    }

    if (comparisonTools.find(t => t.id === tool.id)) {
      addToast({
        type: "info", 
        title: "Tool already added",
        description: `${tool.name} is already in your comparison`
      });
      return;
    }

    setComparisonTools(prev => [...prev, tool]);
    addToast({
      type: "success",
      title: "Tool added to comparison",
      description: `${tool.name} has been added to your comparison tray`
    });

    // Simulate URL update
    const newQuery = `compare=${[...comparisonTools, tool].map(t => t.id).join(',')}`;
    setUrlQuery(newQuery);
    console.log(`URL updated: /discover?${newQuery}`);
  }, [comparisonTools]);

  const removeFromComparison = useCallback((toolId: string) => {
    setComparisonTools(prev => prev.filter(t => t.id !== toolId));
    
    // Update URL query
    const remainingTools = comparisonTools.filter(t => t.id !== toolId);
    const newQuery = remainingTools.length > 0 
      ? `compare=${remainingTools.map(t => t.id).join(',')}`
      : '';
    setUrlQuery(newQuery);
    console.log(`URL updated: /discover${newQuery ? `?${newQuery}` : ''}`);
  }, [comparisonTools]);

  const startComparison = useCallback(() => {
    navigateToScreen("compare");
  }, [navigateToScreen]);

  const clearComparison = useCallback(() => {
    setComparisonTools([]);
    setUrlQuery('');
  }, []);

  // Toast functions
  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Checkout functions
  const handleUpgrade = useCallback(() => {
    setShowCheckoutModal(true);
  }, []);

  const handleCheckoutSuccess = useCallback(() => {
    setShowCheckoutModal(false);
    addToast({
      type: "success",
      title: "Subscription updated",
      description: "Welcome to AI Toologist Professional! Your account has been upgraded.",
      duration: 6000
    });
    navigateToScreen("dashboard");
  }, [navigateToScreen, addToast]);

  // Tool detail functions
  const handleToolClick = useCallback((toolId: string) => {
    navigateToScreen("tool-detail", toolId);
  }, [navigateToScreen]);

  const handleSignUp = useCallback(() => {
    navigateToScreen("auth");
  }, [navigateToScreen]);

  const handleAuthSuccess = useCallback(() => {
    addToast({
      type: "success",
      title: "Welcome to AI Toologist!",
      description: "Your account has been created successfully"
    });
    navigateToScreen("dashboard");
  }, [navigateToScreen, addToast]);

  // Reset prototype
  const resetPrototype = useCallback(() => {
    setCurrentScreen("landing");
    setComparisonTools([]);
    setShowCheckoutModal(false);
    setToasts([]);
    setUrlQuery('');
  }, []);

  // Get navigation variant based on current screen
  const getNavVariant = () => {
    switch (currentScreen) {
      case "discover":
      case "tool-detail":
      case "compare":
        return "discover";
      case "dashboard":
        return "dashboard";
      default:
        return "landing";
    }
  };

  const renderScreen = () => {
    const screenProps = {
      theme,
      onToolClick: handleToolClick,
      onCompare: addToComparison,
      onUpgrade: handleUpgrade,
      onSignUp: handleSignUp
    };

    switch (currentScreen) {
      case "landing":
        return (
          <LandingMockup 
            {...screenProps}
            onGetStarted={() => navigateToScreen("discover")}
            onSignIn={() => navigateToScreen("auth")}
          />
        );
      
      case "discover":
        return (
          <DiscoverMockup 
            {...screenProps}
            tools={tools}
            comparisonTools={comparisonTools}
            urlQuery={urlQuery}
            onFilterChange={(query) => {
              setUrlQuery(query);
              console.log(`Filter URL updated: /discover?${query}`);
            }}
          />
        );
      
      case "tool-detail":
        return (
          <ToolDetailMockup
            {...screenProps}
            toolId={selectedTool}
            onBack={() => navigateToScreen("discover")}
          />
        );
      
      case "compare":
        return (
          <CompareMockup 
            {...screenProps}
            tools={comparisonTools}
            onBack={() => navigateToScreen("discover")}
          />
        );
      
      case "auth":
        return (
          <AuthMockup
            {...screenProps}
            variant="register"
            onSuccess={handleAuthSuccess}
            onSignIn={() => navigateToScreen("dashboard")}
          />
        );
      
      case "dashboard":
        return (
          <DashboardMockup 
            {...screenProps}
            onUpgrade={handleUpgrade}
          />
        );
      
      default:
        return <LandingMockup {...screenProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Prototype Controls */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Core Flow v1 - Interactive Prototype</h1>
              <Badge variant="secondary">
                {currentScreen.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
              {urlQuery && (
                <Badge variant="outline" className="font-mono text-xs">
                  ?{urlQuery}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={resetPrototype}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Share Link
              </Button>
              
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </Button>
            </div>
          </div>
          
          {/* Flow Breadcrumb */}
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>Flow:</span>
            {["landing", "discover", "tool-detail", "compare", "auth", "dashboard"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <button
                  onClick={() => navigateToScreen(step as Screen)}
                  className={`px-2 py-1 rounded transition-colors ${
                    currentScreen === step 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  {step.replace("-", " ")}
                </button>
                {index < 5 && <span>→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prototype Screen */}
      <ThemeProvider defaultTheme={theme}>
        <div className={theme === "dark" ? "dark" : ""}>
          <div className="bg-background text-foreground">
            {currentScreen !== "auth" && (
              <Navigation variant={getNavVariant()} />
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ThemeProvider>

      {/* Overlays */}
      <ComparisonTray
        tools={comparisonTools}
        onRemoveTool={removeFromComparison}
        onCompare={startComparison}
        onClose={clearComparison}
      />

      <StripeCheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onSuccess={handleCheckoutSuccess}
      />

      <ToastNotification
        toasts={toasts}
        onRemove={removeToast}
      />

      {/* Comments for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-background/90 p-2 rounded border">
          TODO: integrate React Router transition here<br/>
          Current transitions: 200ms ease-out
        </div>
      )}
    </div>
  );
}