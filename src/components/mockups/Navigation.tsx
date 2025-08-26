import { useState } from "react";
import { Button } from "../ui/button";
import { AIInput } from "../ui-kit/AIInput";
import { useTheme } from "./ThemeProvider";
import { Search, Moon, Sun, Menu, X } from "lucide-react";

interface NavigationProps {
  variant?: "landing" | "discover" | "dashboard";
}

export function Navigation({ variant = "landing" }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold text-primary">AI Toologist</h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {variant === "landing" && (
                <>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Discover</a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Compare</a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Pricing</a>
                </>
              )}
              {variant === "discover" && (
                <>
                  <div className="w-80">
                    <AIInput
                      type="search"
                      placeholder="Search AI tools..."
                      icon={<Search className="h-4 w-4" />}
                    />
                  </div>
                </>
              )}
              {variant === "dashboard" && (
                <>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Discover</a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Compare</a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">Usage</a>
                </>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {variant === "landing" && (
              <>
                <Button variant="ghost">Sign In</Button>
                <Button>Get Started</Button>
              </>
            )}
            
            {variant === "discover" && (
              <Button variant="outline">Sign In</Button>
            )}
            
            {variant === "dashboard" && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                JD
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {variant === "discover" && (
                <div className="mb-4">
                  <AIInput
                    type="search"
                    placeholder="Search AI tools..."
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
              )}
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">Discover</a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">Compare</a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">Pricing</a>
              <div className="pt-4 border-t">
                {variant === "landing" && (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                    <Button className="w-full">Get Started</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}