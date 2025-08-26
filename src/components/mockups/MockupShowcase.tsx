import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { ThemeProvider } from "./ThemeProvider";
import { Navigation } from "./Navigation";
import { LandingMockup } from "./LandingMockup";
import { DiscoverMockup } from "./DiscoverMockup";
import { CompareMockup } from "./CompareMockup";
import { DashboardMockup } from "./DashboardMockup";
import { AuthMockup } from "./AuthMockup";

interface MockupFrameProps {
  title: string;
  breakpoint: "sm" | "md" | "lg";
  theme: "light" | "dark";
  width: number;
  height: number;
  children: React.ReactNode;
}

function MockupFrame({ title, breakpoint, theme, width, height, children }: MockupFrameProps) {
  const breakpointColors = {
    sm: "bg-green-500",
    md: "bg-yellow-500",
    lg: "bg-blue-500"
  };

  const deviceIcons = {
    sm: <Smartphone className="w-4 h-4" />,
    md: <Tablet className="w-4 h-4" />,
    lg: <Monitor className="w-4 h-4" />
  };

  return (
    <div className="space-y-4">
      {/* Frame Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {width} × {height}
          </Badge>
          <div className={`w-3 h-3 rounded-full ${breakpointColors[breakpoint]}`} />
          <div className="flex items-center gap-1">
            {deviceIcons[breakpoint]}
            <span className="font-mono text-xs text-muted-foreground">{breakpoint.toUpperCase()}</span>
          </div>
          <Badge variant={theme === "dark" ? "default" : "secondary"} className="text-xs">
            {theme}
          </Badge>
        </div>
      </div>

      {/* Mockup Container */}
      <div 
        className={`${theme === "dark" ? "dark" : ""} bg-background border border-border rounded-lg overflow-hidden shadow-lg`}
        style={{ width: `${Math.min(width, 1200)}px`, height: `${Math.min(height, 800)}px` }}
      >
        <div className="overflow-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MockupShowcase() {
  const [selectedMockup, setSelectedMockup] = useState("landing");
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const mockups = [
    { id: "landing", name: "Landing", nav: "landing" },
    { id: "discover", name: "Discover", nav: "discover" },
    { id: "compare", name: "Compare", nav: "dashboard" },
    { id: "dashboard", name: "Dashboard", nav: "dashboard" },
    { id: "auth", name: "Auth", nav: "landing" }
  ];

  const renderMockup = (mockup: string, theme: "light" | "dark", nav: string) => {
    const content = (() => {
      switch (mockup) {
        case "landing":
          return <LandingMockup theme={theme} />;
        case "discover":
          return <DiscoverMockup theme={theme} />;
        case "compare":
          return <CompareMockup theme={theme} />;
        case "dashboard":
          return <DashboardMockup theme={theme} />;
        case "auth":
          return <AuthMockup theme={theme} variant="login" />;
        default:
          return <LandingMockup theme={theme} />;
      }
    })();

    return (
      <ThemeProvider defaultTheme={theme}>
        <div className={theme === "dark" ? "dark" : ""}>
          {mockup !== "auth" && <Navigation variant={nav as any} />}
          {content}
        </div>
      </ThemeProvider>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">AI Toologist - Hi-Fi Mockups</h1>
          <p className="text-muted-foreground">
            High-fidelity mockups using UI-Kit components with light/dark themes
          </p>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex gap-2">
              {mockups.map((mockup) => (
                <Button
                  key={mockup.id}
                  variant={selectedMockup === mockup.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMockup(mockup.id)}
                >
                  {mockup.name}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedTheme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTheme("light")}
              >
                Light
              </Button>
              <Button
                variant={selectedTheme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTheme("dark")}
              >
                Dark
              </Button>
            </div>
          </div>

          {/* Breakpoint Legend */}
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <Smartphone className="w-4 h-4" />
              <span>LG (1280×720)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <Tablet className="w-4 h-4" />
              <span>MD (768×1024)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <Monitor className="w-4 h-4" />
              <span>SM (375×812)</span>
            </div>
          </div>
        </div>

        {/* Mockup Display */}
        <div className="space-y-12">
          {/* Desktop Version */}
          <MockupFrame
            title={`01-${selectedMockup}-lg-${selectedTheme}`}
            breakpoint="lg"
            theme={selectedTheme}
            width={1280}
            height={720}
          >
            {renderMockup(
              selectedMockup, 
              selectedTheme, 
              mockups.find(m => m.id === selectedMockup)?.nav || "landing"
            )}
          </MockupFrame>

          {/* Mobile Version */}
          <MockupFrame
            title={`01-${selectedMockup}-sm-${selectedTheme}`}
            breakpoint="sm"
            theme={selectedTheme}
            width={375}
            height={812}
          >
            {renderMockup(
              selectedMockup, 
              selectedTheme, 
              mockups.find(m => m.id === selectedMockup)?.nav || "landing"
            )}
          </MockupFrame>
        </div>

        {/* Design System Notes */}
        <Card className="p-6 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-4">Design System Implementation</h3>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Grid System:</strong> 12-column responsive grid with breakpoints at 640/768/1024/1280px
            </div>
            <div>
              <strong>Typography:</strong> 24px sub-copy as specified, with Inter font family
            </div>
            <div>
              <strong>Components:</strong> Built using UI-Kit components from Prompt 3
            </div>
            <div>
              <strong>Dark Mode:</strong> Slate color palette (slate-900, slate-100) with consistent theming
            </div>
            <div>
              <strong>Safe Areas:</strong> Navigation is sticky with proper z-index for fixed positioning
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}