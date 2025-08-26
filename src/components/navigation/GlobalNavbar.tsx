import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { CommandPalette } from './CommandPalette';
import { 
  Search, 
  Layers, 
  Plus, 
  User, 
  LogOut, 
  Settings, 
  CreditCard,
  Menu,
  X
} from 'lucide-react';

interface GlobalNavbarProps {
  currentScreen?: string;
  onNavigate?: (screenId: string) => void;
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
}

/* 
Tailwind Implementation Notes:
- Navbar: sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b
- Container: max-w-7xl mx-auto px-6 h-16 flex items-center justify-between
- Logo: flex items-center gap-2 hover:opacity-80 transition-opacity
- Nav Links: hidden md:flex items-center space-x-8
- Search: hidden md:flex items-center gap-2 
- Mobile Menu: md:hidden
- User Avatar: w-8 h-8 rounded-full
- Command Palette: Integrated via CommandPalette component

Responsive Behavior:
- Mobile: Show hamburger menu, hide nav links and search
- Tablet+: Show full navigation with all links
- Search: Command+K shortcut opens command palette
- Sticky: Navbar stays at top on scroll with backdrop blur

Accessibility:
- Proper focus management
- Keyboard navigation support
- Screen reader labels
- High contrast support
*/

export function GlobalNavbar({ 
  currentScreen = 'home', 
  onNavigate, 
  isAuthenticated = false,
  userName = 'John Doe',
  userAvatar = ''
}: GlobalNavbarProps) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'browse', label: 'Browse', href: '/browse' },
    { id: 'categories', label: 'Categories', href: '/categories' },
    { id: 'compare', label: 'Compare', href: '/compare' },
    { id: 'tutorials', label: 'Tutorials', href: '/tutorials' },
    { id: 'workflows', label: 'Workflows', href: '/workflows' },
    { id: 'blog', label: 'Blog', href: '/blog' }
  ];

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigation = (screenId: string) => {
    if (onNavigate) {
      onNavigate(screenId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleCommandPaletteNavigate = (screenId: string) => {
    handleNavigation(screenId);
    setIsCommandPaletteOpen(false);
  };

  return (
    <>
      {/* 
      Sticky Navbar with backdrop blur
      Classes: sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b
      */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            
            {/* Left: Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => handleNavigation('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="AI Toologist Home"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-medium">AI Toologist</span>
                </div>
              </button>
            </div>

            {/* Center: Navigation Links (Hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentScreen === item.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                  aria-current={currentScreen === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right: Search, Submit Tool, User */}
            <div className="flex items-center gap-4">
              
              {/* Search Button (Hidden on mobile) - Opens Command Palette */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden md:flex items-center gap-2 w-64 justify-start text-muted-foreground"
                aria-label="Open command palette"
              >
                <Search className="w-4 h-4" />
                <span>Search tools...</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  ⌘K
                </Badge>
              </Button>

              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="md:hidden"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* Submit Tool Button */}
              <Button
                onClick={() => handleNavigation('submit')}
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Submit Tool
              </Button>

              {/* User Authentication */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-8 w-8 rounded-full"
                      aria-label="User menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback>
                          {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{userName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleNavigation('wallet')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Tool Wallet</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => handleNavigation('auth')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left ${
                      currentScreen === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    aria-current={currentScreen === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t pt-2 mt-2">
                  <button
                    onClick={() => handleNavigation('submit')}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <Plus className="w-4 h-4" />
                    Submit Tool
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleCommandPaletteNavigate}
      />
    </>
  );
}