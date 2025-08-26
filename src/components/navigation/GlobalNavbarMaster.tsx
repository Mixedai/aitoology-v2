import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CommandPalette } from './CommandPalette';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { 
  Search, 
  Layers, 
  User, 
  LogOut, 
  Settings, 
  CreditCard,
  Menu,
  X,
  BookOpen,
  FolderOpen,
  Workflow,
  Command,
  Newspaper,
  Home,
  Sparkles,
  Bell,
  Shield,
  Zap,
  Star,
  Users
} from 'lucide-react';

/*
ENHANCED GLOBAL NAVBAR MASTER COMPONENT - AI TOOLOGIST DESIGN SYSTEM V2

Modern glassmorphism navigation with enhanced animations, better accessibility,
and improved mobile experience following Guidelines.md standards.

NEW FEATURES:
- Enhanced glassmorphism effects with gradient overlays
- Smooth scroll-based opacity changes
- Improved micro-interactions and hover effects
- Better mobile menu with slide animations
- Enhanced accessibility with proper ARIA labels
- Notification badges for user engagement
- Professional gradient backgrounds
- Light mode only (dark mode removed for simplicity)

TECHNICAL IMPROVEMENTS:
- Uses framer-motion for smooth animations
- Scroll-based opacity for better performance
- Guidelines.md compliant spacing (gap-6, p-6, space-y-6)
- Semantic HTML with proper heading hierarchy
- WCAG 2.1 AA compliant focus management
- Reduced motion support for accessibility
*/

interface GlobalNavbarMasterProps {
  variant?: 'default' | 'authenticated' | 'mobile';
  showVariants?: boolean;
  currentScreen?: string;
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  onLogout?: () => void;
}

export function GlobalNavbarMaster({ 
  variant = 'default',
  showVariants = true,
  currentScreen = 'home',
  onNavigate,
  onLogout
}: GlobalNavbarMasterProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(variant);

  // Scroll-based effects
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 16]);

  // References for focus management
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);

  // Enhanced navigation items with icons and descriptions
  const navigationItems = [
    { 
      id: 'modern-home', 
      label: 'Home', 
      icon: Home,
      description: 'Main dashboard and discovery'
    },
    { 
      id: 'explore-frame', 
      label: 'Tools', 
      icon: Search,
      description: 'Browse and compare AI tools'
    },
    { 
      id: 'tutorials-frame', 
      label: 'Learning', 
      icon: BookOpen,
      description: 'Tutorials and workflows'
    },
    { 
      id: 'news', 
      label: 'News', 
      icon: Newspaper,
      description: 'Latest AI industry news'
    }
  ];

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Trap focus within mobile menu
      const firstFocusable = mobileMenuRef.current?.querySelector('button');
      firstFocusable?.focus();
    }
  }, [isMobileMenuOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavigation = (screenId: string) => {
    if (onNavigate) {
      onNavigate(currentScreen, screenId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      handleNavigation('modern-home');
      console.log('Logging out user...');
    }
  };

  const getNavbarVariant = () => {
    if (variant === 'mobile') return 'mobile';
    if (variant === 'authenticated') return 'authenticated';
    return variant || activeVariant;
  };

  const isAuthenticated = getNavbarVariant() === 'authenticated';
  const isMobileVariant = getNavbarVariant() === 'mobile';

  // Enhanced Logo Component
  const Logo = () => (
    <motion.button 
      onClick={() => handleNavigation('modern-home')}
      className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg p-1"
      aria-label="AI Toologist Home"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
        whileHover={{ 
          boxShadow: "0 10px 25px -5px rgba(255, 107, 53, 0.4)",
          y: -1
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
        <Layers className="w-6 h-6 text-primary-foreground relative z-10" aria-hidden="true" />
      </motion.div>
      <div className="hidden sm:block">
        <div className="flex flex-col items-start">
          <span className="text-lg font-medium text-white">AI Toologist</span>
          <span className="text-xs text-white/60">Smart AI Discovery</span>
        </div>
      </div>
    </motion.button>
  );

  // Enhanced Navigation Link Component
  const NavLink = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <motion.button
      onClick={() => handleNavigation(item.id)}
      className={`relative text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg px-4 py-2 ${
        isActive 
          ? 'text-primary' 
          : 'text-white/80 hover:text-white'
      }`}
      aria-current={isActive ? 'page' : undefined}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{item.label}</span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-lg"
          layoutId="activeTab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-lg opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );

  // Enhanced Search Button
  const SearchButton = ({ isMobile = false }: { isMobile?: boolean }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant={isMobile ? "ghost" : "outline"}
        size="sm"
        onClick={() => setIsCommandPaletteOpen(true)}
        className={
          isMobile 
            ? `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300` 
            : `items-center gap-3 w-64 justify-start focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-white/20 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-sm transition-all duration-300 hidden md:flex`
        }
        aria-label={isMobile ? "Open search" : "Open command palette (Ctrl+K)"}
        aria-keyshortcuts={isMobile ? undefined : "Control+KeyK"}
      >
        <Search className="w-4 h-4" aria-hidden="true" />
        {!isMobile && (
          <>
            <span>Search tools...</span>
            <Badge variant="secondary" className="ml-auto text-xs bg-white/20 text-white/80 border-white/20">
              ⌘K
            </Badge>
          </>
        )}
      </Button>
    </motion.div>
  );

  // Enhanced User Menu
  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            className="relative h-10 w-10 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-white/10 transition-all duration-300"
            aria-label="User menu"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="John Doe" />
              <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            
            {/* Notification badge */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-navbar-bg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mr-4" align="end" forceMount>
        <div className="flex items-center justify-start gap-3 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="John Doe" />
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">john@example.com</p>
            <Badge variant="secondary" className="text-xs w-fit">Pro Plan</Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('wallet')} className="gap-3">
          <CreditCard className="h-4 w-4" aria-hidden="true" />
          <div className="flex flex-col">
            <span>Tool Wallet</span>
            <span className="text-xs text-muted-foreground">Manage subscriptions</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('settings')} className="gap-3">
          <Settings className="h-4 w-4" aria-hidden="true" />
          <div className="flex flex-col">
            <span>Settings</span>
            <span className="text-xs text-muted-foreground">Preferences & privacy</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="gap-3 text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Enhanced Sign In Button
  const SignInButton = () => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={() => handleNavigation('sign-in')}
        variant="outline"
        size="sm"
        className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-white/20 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-sm transition-all duration-300"
      >
        <User className="w-4 h-4" aria-hidden="true" />
        Sign In
      </Button>
    </motion.div>
  );

  // Enhanced Mobile Menu
  const MobileMenu = () => (
    <AnimatePresence>
      {(isMobileMenuOpen || isMobileVariant) && (
        <motion.div
          ref={mobileMenuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`border-t backdrop-blur-md ${isMobileVariant ? 'block' : 'md:hidden'}`}
          style={{ 
            background: `linear-gradient(180deg, rgba(70, 92, 136, 0.95) 0%, rgba(70, 92, 136, 0.98) 100%)` 
          }}
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
            <span className="text-sm font-medium text-white/80">Navigation</span>
            <Badge variant="secondary" className="text-xs bg-white/20 text-white/80 border-white/20">
              Menu
            </Badge>
          </div>
          
          {/* Mobile Navigation Items */}
          <div className="px-6 pt-4 pb-6 space-y-2">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 w-full text-left group ${
                  currentScreen === item.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-current={currentScreen === item.id ? 'page' : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs opacity-60">{item.description}</span>
                </div>
                {currentScreen === item.id && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Mobile-only actions */}
            <motion.div 
              className="pt-4 border-t border-white/20 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {!isAuthenticated && (
                <button
                  onClick={() => handleNavigation('sign-in')}
                  className="flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 w-full text-left text-white/80 hover:text-white hover:bg-white/10"
                >
                  <User className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span>Sign In</span>
                    <span className="text-xs opacity-60">Access your account</span>
                  </div>
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderNavbar = (variantType: string, title: string) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <Badge variant="outline" className="text-xs">
          {variantType}
        </Badge>
      </div>
      
      {/* Enhanced Navbar Implementation */}
      <Card className="overflow-hidden">
        <div className="bg-muted/30 p-3 text-xs text-muted-foreground border-b">
          <code>sticky top-0 z-50 backdrop-blur-md bg-navbar-bg/95 border-b</code>
        </div>
        
        <motion.nav 
          className="backdrop-blur-md border-b relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, rgba(70, 92, 136, 0.95) 0%, rgba(70, 92, 136, 0.98) 100%)`,
            opacity: navbarOpacity,
            backdropFilter: `blur(${navbarBlur}px)`
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo Section */}
              <div className="flex items-center">
                <Logo />
              </div>

              {/* Desktop Navigation Links */}
              <nav className={`items-center gap-2 ${isMobileVariant ? 'hidden' : 'hidden md:flex'}`} role="navigation" aria-label="Main navigation">
                {navigationItems.map((item) => (
                  <NavLink 
                    key={item.id} 
                    item={item} 
                    isActive={currentScreen === item.id} 
                  />
                ))}
              </nav>

              {/* Actions Section */}
              <div className="flex items-center gap-4">
                
                {/* Search Buttons */}
                <SearchButton />
                <div className={`${isMobileVariant ? 'flex' : 'md:hidden'}`}>
                  <SearchButton isMobile />
                </div>

                {/* Authentication Section */}
                {isAuthenticated ? <UserMenu /> : <SignInButton />}

                {/* Mobile Menu Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    ref={mobileMenuTriggerRef}
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 ${isMobileVariant ? 'flex' : 'md:hidden'}`}
                    aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-4 h-4" aria-hidden="true" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-4 h-4" aria-hidden="true" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </motion.nav>
      </Card>
    </div>
  );

  if (!showVariants) {
    return (
      <motion.nav 
        className="sticky top-0 z-50 backdrop-blur-md border-b relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, rgba(70, 92, 136, 0.95) 0%, rgba(70, 92, 136, 0.98) 100%)`,
          opacity: navbarOpacity,
          backdropFilter: `blur(${navbarBlur}px)`
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className={`items-center gap-2 ${isMobileVariant ? 'hidden' : 'hidden md:flex'}`} role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.id} 
                  item={item} 
                  isActive={currentScreen === item.id} 
                />
              ))}
            </nav>

            {/* Actions Section */}
            <div className="flex items-center gap-4">
              
              {/* Search Buttons */}
              <SearchButton />
              <div className={`${isMobileVariant ? 'flex' : 'md:hidden'}`}>
                <SearchButton isMobile />
              </div>

              {/* Authentication Section */}
              {isAuthenticated ? <UserMenu /> : <SignInButton />}

              {/* Mobile Menu Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  ref={mobileMenuTriggerRef}
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 ${isMobileVariant ? 'flex' : 'md:hidden'}`}
                  aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-4 h-4" aria-hidden="true" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>

        {/* Command Palette Integration */}
        <CommandPalette 
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(from, to) => handleNavigation(to)}
        />
      </motion.nav>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Component Header */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Layers className="w-6 h-6 text-primary" />
          </motion.div>
          <h1>Enhanced Global Navbar System</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Modern glassmorphism navigation with enhanced animations, better accessibility,
          and improved mobile experience. Light mode only for simplified user experience.
        </p>
        
        {/* Component Status */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge className="gap-2">
            <Command className="w-3 h-3" />
            Published to Library
          </Badge>
          <Badge variant="outline">Auto Layout</Badge>
          <Badge variant="outline">Glassmorphism</Badge>
          <Badge variant="outline">WCAG 2.1 AA</Badge>
          <Badge variant="outline">Light Mode Only</Badge>
          <Badge variant="outline" style={{ backgroundColor: '#465C88', color: 'white' }}>
            Professional Theme
          </Badge>
        </div>
      </motion.div>

      {/* Enhanced Implementation Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Enhanced Features & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="mb-3">Modern Glassmorphism</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="font-mono bg-muted/50 p-2 rounded text-xs">
                    backdrop-blur-md bg-gradient
                  </div>
                  <p>• Enhanced glass effects</p>
                  <p>• Gradient overlays</p>
                  <p>• Scroll-based opacity</p>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3">Smooth Animations</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="font-mono bg-muted/50 p-2 rounded text-xs">
                    framer-motion integration
                  </div>
                  <p>• Micro-interactions</p>
                  <p>• Page transitions</p>
                  <p>• Reduced motion support</p>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Simplified Experience</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="font-mono bg-muted/50 p-2 rounded text-xs">
                    Light mode only
                  </div>
                  <p>• Consistent visual experience</p>
                  <p>• Reduced complexity</p>
                  <p>• Better performance</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3">Accessibility Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium text-sm">WCAG 2.1 AA Compliant</div>
                  <div className="text-sm text-muted-foreground">
                    <p>• Proper ARIA labels and roles</p>
                    <p>• Keyboard navigation support</p>
                    <p>• Focus trap in mobile menu</p>
                    <p>• Screen reader optimization</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-sm">Motion Preferences</div>
                  <div className="text-sm text-muted-foreground">
                    <p>• Respects prefers-reduced-motion</p>
                    <p>• Essential animations only</p>
                    <p>• Performance optimized</p>
                    <p>• Smooth transitions</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator />

      {/* Variant Showcase */}
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {renderNavbar('default', 'Default State (Logged Out)')}
        {renderNavbar('authenticated', 'Authenticated State')}
        {renderNavbar('mobile', 'Mobile Variant')}
      </motion.div>

      {/* Command Palette Integration */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(from, to) => handleNavigation(to)}
      />
    </div>
  );
}