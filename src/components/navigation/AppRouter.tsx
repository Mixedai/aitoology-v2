import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Home, 
  Search, 
  Layers, 
  GitCompare, 
  Wallet, 
  Plus, 
  Shield, 
  User, 
  Code, 
  Palette,
  ArrowRight,
  Navigation,
  MousePointer,
  Smartphone,
  Monitor,
  BookOpen,
  Mail,
  Sparkles,
  KeyRound,
  Heart,
  Bell,
  CheckCircle,
  LogIn,
  UserPlus,
  Zap,
  Globe,
  Workflow,
  FileText,
  Settings,
  Eye
} from 'lucide-react';

interface AppRouterProps {
  onNavigateToScreen: (screenId: string) => void;
}

/*
App Router Visual Map - Complete Screen Collection
Tailwind Classes:
- Container: max-w-7xl mx-auto p-6 space-y-8
- Router Grid: grid grid-cols-1 lg:grid-cols-3 gap-6
- Screen Cards: bg-card border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer
- Navigation Arrows: text-primary/60 group-hover:text-primary transition-colors
- Responsive: Mobile stacked, Desktop 3-column layout
- Interactive: hover:bg-accent/50 hover:border-primary/20
- Focus: focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2

Navigation Flow:
Home → Explore → Tool Detail → Compare → Tool Wallet
Auth → Onboarding → Dashboard Flow  
Submit Tool → Admin Review → Publication
Tutorials → Tutorial Detail, News → News Detail
*/

const coreScreens = [
  {
    id: 'home',
    title: 'Home Page',
    description: 'Landing page with hero, featured tools, categories, and latest AI news',
    icon: Home,
    category: 'Core',
    connections: ['explore-frame', 'tool-detail', 'news', 'tutorials-frame'],
    primary: true,
    shortcuts: ['⌘K for Command Palette', '/ to focus search', 'Tab for navigation']
  },
  {
    id: 'explore-frame',
    title: 'Explore Tools',
    description: 'Unified tool discovery with advanced filters, categories, and faceted search',
    icon: Search,
    category: 'Core',
    connections: ['tool-detail', 'compare', 'wallet'],
    primary: true,
    shortcuts: ['/ to focus search', 'Esc to clear filters', 'Space to select for comparison']
  },
  {
    id: 'tool-detail',
    title: 'Tool Detail',
    description: 'Detailed tool view with tabbed content, pricing, reviews, and related tools',
    icon: Layers,
    category: 'Core',
    connections: ['compare', 'wallet', 'explore-frame'],
    primary: true,
    shortcuts: ['Arrow keys for tab navigation', 'Enter to add to wallet', 'C to add to comparison']
  },
  {
    id: 'compare',
    title: 'Compare Tools',
    description: 'Side-by-side tool comparison with typeahead search and feature matrix',
    icon: GitCompare,
    category: 'Core',
    connections: ['tool-detail', 'wallet', 'explore-frame'],
    primary: true,
    shortcuts: ['/ to focus search', 'Tab to navigate between tools', 'Esc to clear comparison']
  }
];

const contentScreens = [
  {
    id: 'news',
    title: 'News',
    description: 'News and updates interface with filtering, search, and responsive design',
    icon: BookOpen,
    category: 'Content',
    connections: ['news-detail', 'home'],
    primary: false,
    shortcuts: ['/ to focus search', 'Tab for navigation', 'Enter to read full article']
  },
  {
    id: 'news-detail',
    title: 'News Detail',
    description: 'Individual news article view with prose content, author info, and related articles',
    icon: FileText,
    category: 'Content',
    connections: ['news', 'home'],
    primary: false,
    shortcuts: ['Tab for navigation', 'Enter for related articles', 'Esc to return to news list']
  },
  {
    id: 'tutorials-frame',
    title: 'Tutorials',
    description: 'Complete learning interface with categorized tutorials, progress tracking, and search',
    icon: BookOpen,
    category: 'Content',
    connections: ['tutorial-detail', 'home'],
    primary: false,
    shortcuts: ['/ to focus search', 'Enter to start tutorial', 'Space to mark complete']
  },
  {
    id: 'tool-combinations-frame',
    title: 'Tool Combinations',
    description: 'Visual workflow builder with drag-and-drop interface, template gallery, and community sharing',
    icon: Workflow,
    category: 'Content',
    connections: ['workflow-detail', 'explore-frame'],
    primary: false,  
    shortcuts: ['Tab for navigation', 'Space to select', 'Arrow keys for positioning', 'Enter to edit']
  }
];

const userScreens = [
  {
    id: 'auth',
    title: 'Auth & Onboarding',
    description: 'Login, signup, and user onboarding flow with progressive disclosure',
    icon: User,
    category: 'User',
    connections: ['home', 'forgot-password', 'magic-link', 'two-factor', 'onboarding-step-1'],
    primary: false,
    shortcuts: ['Tab for form navigation', '⌘Enter to submit', 'Space for toggles']
  },
  {
    id: 'wallet',
    title: 'Tool Wallet',
    description: 'Subscription tracking and spending analytics with dashboard and billing management',
    icon: Wallet,
    category: 'User',
    connections: ['tool-detail', 'explore-frame'],
    primary: false,
    shortcuts: ['Tab for navigation', 'Enter to edit subscriptions', 'Space to toggle status']
  },
  {
    id: 'submit',
    title: 'Submit Tool',
    description: 'Multi-step form for tool submissions with validation and preview',
    icon: Plus,
    category: 'User',
    connections: ['tool-detail', 'admin', 'explore-frame'],
    primary: false,
    shortcuts: ['Tab for form navigation', '⌘Enter to submit', 'Arrow keys for step navigation']
  }
];

const authenticationScreens = [
  {
    id: 'auth',
    title: 'Sign In / Sign Up',
    description: 'Login and registration forms with social authentication options',
    icon: LogIn,
    category: 'Authentication',
    connections: ['forgot-password', 'magic-link', 'two-factor', 'onboarding-step-1', 'home'],
    flowStep: 1,
    shortcuts: ['Tab for form navigation', '⌘Enter to submit', 'Esc to close errors']
  },
  {
    id: 'forgot-password',
    title: 'Forgot Password',
    description: 'Password reset with email input and success state confirmation',
    icon: Mail,
    category: 'Authentication',
    connections: ['auth'],
    flowStep: 2,
    shortcuts: ['Tab for navigation', 'Enter to send reset', 'Esc to return to sign in']
  },
  {
    id: 'magic-link',
    title: 'Magic Link',
    description: 'Passwordless authentication with one-time sign-in link via email',
    icon: Sparkles,
    category: 'Authentication',
    connections: ['auth'],
    flowStep: 3,
    shortcuts: ['Tab for navigation', 'Enter to send link', 'Esc to return to sign in']
  },
  {
    id: 'two-factor',
    title: 'Two-Factor (MFA)',
    description: '6-digit TOTP verification with auto-advance input and resend functionality',
    icon: KeyRound,
    category: 'Authentication',
    connections: ['auth', 'home'],
    flowStep: 4,
    shortcuts: ['Auto-advance on input', 'Tab for navigation', 'Enter to verify']
  }
];

const onboardingScreens = [
  {
    id: 'onboarding-step-1',
    title: 'Pick Interests',
    description: 'Multi-select chips for AI tool categories with category icons',
    icon: Heart,
    category: 'Onboarding',
    connections: ['onboarding-step-2', 'auth'],
    flowStep: 1,
    shortcuts: ['Space to select/deselect chips', 'Arrow keys for navigation', 'Enter to continue']
  },
  {
    id: 'onboarding-step-2',
    title: 'Notification Preferences',
    description: 'Toggle switches for communication settings and update frequency',
    icon: Bell,
    category: 'Onboarding',
    connections: ['onboarding-step-3', 'onboarding-step-1'],
    flowStep: 2,
    shortcuts: ['Space to toggle switches', 'Tab for navigation', 'Enter to continue']
  },
  {
    id: 'onboarding-step-3',
    title: 'Setup Complete',
    description: 'Summary and completion with personalized Explore Tools CTA',
    icon: CheckCircle,
    category: 'Onboarding',
    connections: ['explore-frame', 'onboarding-step-2'],
    flowStep: 3,
    shortcuts: ['Enter to complete onboarding', 'Tab for navigation']
  }
];

const adminScreens = [
  {
    id: 'admin',
    title: 'Admin Panel',
    description: 'User management, tool moderation, and system settings with comprehensive dashboard',
    icon: Shield,
    category: 'Admin',
    connections: ['moderation', 'submit', 'explore-frame'],
    primary: false,
    shortcuts: ['Tab for navigation', 'Enter for actions', '/ to focus search', 'Space to select items']
  },
  {
    id: 'moderation',
    title: 'Moderation Queue',
    description: 'Review and approve submitted AI tools with Kanban workflow interface',
    icon: Eye,
    category: 'Admin',
    connections: ['admin', 'submit'],
    primary: false,
    shortcuts: ['Arrow keys for card navigation', 'Space to select', 'Enter for actions']
  }
];

const foundationScreens = [
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Colors, typography, spacing, states, and Tailwind mappings',
    icon: Palette,
    category: 'Foundation',
    connections: [],
    shortcuts: ['⌘K for Command Palette', 'Esc to close overlays']
  },
  {
    id: 'components',
    title: 'Component Library',
    description: 'Atoms, molecules, organisms – reusable UI elements',
    icon: Layers,
    category: 'Foundation',
    connections: [],
    shortcuts: ['Tab for navigation', 'Enter/Space to activate']
  },
  {
    id: 'global-navbar-master',
    title: 'Global Navbar Master',
    description: 'Complete navigation component with all variants, auto layout, and sticky behavior',
    icon: Navigation,
    category: 'Foundation',
    connections: [],
    shortcuts: ['⌘K for search', 'Tab for navigation', 'Esc to close mobile menu']
  },
  {
    id: 'micro-interactions',
    title: 'Micro-Interactions',
    description: 'Button hover/press, input validation, toast, skeleton loaders, animations',
    icon: Zap,
    category: 'Foundation',
    connections: [],
    shortcuts: ['Focus-visible styles for all interactive elements']
  },
  {
    id: 'theming-i18n',
    title: 'Theming & i18n',
    description: 'Theme tokens, internationalization, and accessibility guidelines',
    icon: Globe,
    category: 'Foundation',
    connections: [],
    shortcuts: ['Respects prefers-reduced-motion']
  }
];

const documentationScreens = [
  {
    id: 'developer',
    title: 'Developer Handoff',
    description: 'Implementation guidelines, code examples, and Supabase integration patterns',
    icon: Code,
    category: 'Documentation',
    connections: [],
    shortcuts: ['⌘C to copy code examples', 'Tab for navigation']
  }
];

export function AppRouter({ onNavigateToScreen }: AppRouterProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core': return 'bg-primary/10 text-primary border-primary/20';
      case 'User': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'Content': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Foundation': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Documentation': return 'bg-green-100 text-green-700 border-green-200';
      case 'Authentication': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Onboarding': return 'bg-sky-100 text-sky-700 border-sky-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderScreenCard = (screen: any, index?: number) => (
    <Card 
      key={screen.id + (index !== undefined ? `-${index}` : '')}
      className="group cursor-pointer hover:shadow-lg transition-all hover:bg-accent/50 hover:border-primary/20 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      onClick={() => onNavigateToScreen(screen.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigateToScreen(screen.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Navigate to ${screen.title}`}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              screen.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>
              <screen.icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="group-hover:text-primary transition-colors">
                {screen.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={getCategoryColor(screen.category)}
                >
                  {screen.category}
                </Badge>
                {screen.flowStep && (
                  <Badge variant="secondary" className="text-xs">
                    Step {screen.flowStep}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" aria-hidden="true" />
        </div>
        <CardDescription>{screen.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {screen.connections && screen.connections.length > 0 && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Connects to:</span> {screen.connections.join(', ')}
          </div>
        )}
        {screen.shortcuts && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Shortcuts:</span> {screen.shortcuts.join(', ')}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Navigation className="w-8 h-8 text-primary" aria-hidden="true" />
          <h1>AI Toologist App Router</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete visual navigation map showing all application screens, user flows, and prototype connections. 
          Click any screen to view its implementation with proper keyboard shortcuts and accessibility features.
        </p>
      </div>

      {/* Navigation Flow Overview */}
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5" aria-hidden="true" />
            Primary User Flows & Navigation Patterns
          </CardTitle>
          <CardDescription>
            Core navigation paths, screen connections, and keyboard accessibility patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="mb-4">Discovery Flow</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Home Page</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <Search className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Explore Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Explore Tools</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <Layers className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Tool Detail</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Tool Detail</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <GitCompare className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Compare Tools</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Authentication Flow</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <Home className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Home Page</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Sign Up</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <Heart className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Pick Interests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Onboarding Complete</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <Search className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Explore Tools</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Content & Learning</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>News</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <FileText className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>News Detail</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Tutorials</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <CheckCircle className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Tutorial Detail</span>
                </div>
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Tool Combinations</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <Plus className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <span>Create Workflow</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Application Screens */}
      <div>
        <h2 className="mb-6">Core Application Screens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      <Separator />

      {/* Content & Learning Screens */}
      <div>
        <h2 className="mb-6">Content & Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      <Separator />

      {/* User Management Screens */}
      <div>
        <h2 className="mb-6">User Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      <Separator />

      {/* Authentication Flow */}
      <div>
        <h2 className="mb-6">Authentication Flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authenticationScreens.map((screen, index) => renderScreenCard(screen, index))}
        </div>
      </div>

      <Separator />

      {/* Onboarding Flow */}
      <div>
        <h2 className="mb-6">User Onboarding Flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {onboardingScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      <Separator />

      {/* Admin Screens */}
      <div>
        <h2 className="mb-6">Administration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      <Separator />

      {/* Foundation & Design System */}
      <div>
        <h2 className="mb-6">Foundation & Design System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foundationScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      <Separator />

      {/* Documentation */}
      <div>
        <h2 className="mb-6">Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentationScreens.map((screen) => renderScreenCard(screen))}
        </div>
      </div>

      {/* Implementation & Accessibility Notes */}
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Implementation & Accessibility Guidelines
          </CardTitle>
          <CardDescription>
            Technical implementation notes, responsive design patterns, and WCAG 2.1 AA compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Desktop Navigation (1024px+)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Global navbar with sticky behavior (sticky top-0 z-50)</li>
                <li>• Full navigation menu with hover states</li>
                <li>• Search bar with ⌘K shortcut focus</li>
                <li>• User avatar with dropdown menu</li>
                <li>• Backdrop blur effect on scroll (backdrop-blur)</li>
                <li>• 44px minimum touch targets</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Mobile Navigation (320-768px)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Hamburger menu with slide-out navigation</li>
                <li>• Compact logo and search icon (md:hidden)</li>
                <li>• Collapsible menu with smooth transitions</li>
                <li>• Touch-friendly 44px minimum touch targets</li>
                <li>• Bottom safe area padding on iOS</li>
                <li>• Focus trap within mobile menu</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Accessibility Features
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Focus-visible indicators (focus-visible:ring-2)</li>
                <li>• ARIA labels and roles for all interactive elements</li>
                <li>• Keyboard navigation (Tab, Enter, Space, Esc)</li>
                <li>• Screen reader support with semantic HTML</li>
                <li>• Color contrast 4.5:1 ratio minimum</li>
                <li>• Reduced motion support (prefers-reduced-motion)</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h4 className="mb-3">Spacing Normalization (8-Point Grid System)</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Primary Spacing:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• gap-6 (24px): Cards, sections, layout elements</li>
                    <li>• p-6 (24px): Container padding</li>
                    <li>• space-y-6 (24px): Vertical content spacing</li>
                    <li>• mb-8 (32px): Major section breaks</li>
                  </ul>
                </div>
                <div>
                  <strong>Secondary Spacing:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• gap-4 (16px): Form elements, tighter layouts</li>
                    <li>• p-4 (16px): Smaller container padding</li>
                    <li>• space-y-4 (16px): CardHeader internal spacing</li>
                    <li>• mb-6 (24px): Subsection spacing</li>
                  </ul>
                </div>
                <div>
                  <strong>Micro Spacing:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• gap-2 (8px): Icon gaps, inline elements</li>
                    <li>• p-2 (8px): Button padding, small elements</li>
                    <li>• space-y-2 (8px): List items, small spacing</li>
                    <li>• Avoid: gap-3, gap-5, p-3, p-5 (breaks grid)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}