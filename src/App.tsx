
import { useState, useEffect } from 'react';
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
  Settings as SettingsIcon,
  Globe,
  Zap,
  BookOpen,
  Workflow,
  Mail,
  Sparkles,
  KeyRound,
  Heart,
  Bell,
  CheckCircle,
  FileText,
  MessageCircle,
  CheckSquare,
  PaintBucket,
  MousePointer,
  Wand2
} from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { LogOut, UserCircle } from 'lucide-react';

// Import navigation types for type safety
import type { 
  NavigationHandler, 
  NavigationParams, 
  NavigationState, 
  ScreenId, 
  NavigationTarget,
  NavigationError,
  NavigationLog 
} from './types/navigation';

// Import navigation logger for enhanced debugging
import { navigationLogger } from './utils/navigationLogger';

// Import navigation components
import { AppRouter } from './components/navigation/AppRouter';
import { CommandPalette } from './components/navigation/CommandPalette';
// import { GlobalNavbarMaster } from './components/navigation/GlobalNavbarMaster';
import { SimpleNavbar } from './components/navigation/SimpleNavbar';

// Import all screen components
import { AIToologistDesignSystem } from './components/design-system/AIToologistDesignSystem';
import { DesignTokenDocumentation } from './components/design-system/DesignTokenDocumentation';
import { EnhancedButtonDesignSystem } from './components/design-system/EnhancedButtonDesignSystem';
import { AIToologistComponents } from './components/ui-library/AIToologistComponents';
import { AIToologistHome } from './components/home/AIToologistHome';
import { NewModernHome } from './components/home/NewModernHome';
import { Explore } from './components/explore/Explore';
import { ExploreFrame } from './components/explore/ExploreFrame';
import { ToolDetail } from './components/tool-detail/ToolDetail';
import ComparePage from './components/compare/ComparePage';
import { ModernDashboard } from './components/tool-wallet/ModernDashboard';
import { SubmitTool } from './components/submit-tool/SubmitTool';
import { AdminPanel } from './components/admin/AdminPanel';
import { ModerationQueue } from './components/admin/ModerationQueue';
import { AuthOnboarding } from './components/auth/AuthOnboarding';
import { SignInFrame } from './components/auth/SignInFrame';
import { ForgotPasswordFrame } from './components/auth/ForgotPasswordFrame';
import { MagicLinkFrame } from './components/auth/MagicLinkFrame';
import { TwoFactorFrame } from './components/auth/TwoFactorFrame';
import { OnboardingStep1Frame } from './components/auth/OnboardingStep1Frame';
import { OnboardingStep2Frame } from './components/auth/OnboardingStep2Frame';
import { OnboardingStep3Frame } from './components/auth/OnboardingStep3Frame';
import { DeveloperHandoff } from './components/developer/DeveloperHandoff';
import { ThemingI18n } from './components/theming-i18n/ThemingI18n';
import MicroInteractions from './components/micro-interactions/MicroInteractions';
import { Tutorials } from './components/tutorials/Tutorials';
import { TutorialsFrame } from './components/tutorials/TutorialsFrame';
import { ToolCombinations } from './components/workflows/ToolCombinations';
import { ToolCombinationsFrame } from './components/workflows/ToolCombinationsFrame';
import { NewsFrame } from './components/news/NewsFrame';
import { NewsDetailFrame } from './components/news/NewsDetailFrame';
import { NotFound } from './components/error/NotFound';

// Import individual tool pages
import { ChatGPTPage, MidjourneyPage, NotionAIPage, GitHubCopilotPage, PerplexityPage, ClaudePage, StableDiffusionPage, RunwayMLPage, GrammarlyPage, FigmaAIPage } from './components/tools';

// Import Settings
import { Settings } from './components/settings/Settings';

// Import AI Chatbot
import { AIChatbot } from './components/ai-chatbot/AIChatbot';

const screens = [
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Colors, typography, spacing, states, and Tailwind mappings. Keyboard shortcuts: ⌘K for Command Palette, Esc to close overlays',
    icon: Palette,
    component: AIToologistDesignSystem,
    category: 'Foundation'
  },
  {
    id: 'design-tokens',
    title: 'Design Tokens',
    description: 'Comprehensive design token documentation with visual examples, usage guidelines, and accessibility compliance. Brand colors, typography scale, 8-point grid system, and elevation levels. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation',
    icon: PaintBucket,
    component: DesignTokenDocumentation,
    category: 'Foundation'
  },
  {
    id: 'enhanced-buttons',
    title: 'Enhanced Button System',
    description: 'Professional button design system with 11 variants, 4 sizes, interactive states, micro-interactions, and full accessibility compliance. Features loading states, toggle buttons, and e-commerce actions. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, Space/Enter to activate',
    icon: MousePointer,
    component: EnhancedButtonDesignSystem,
    category: 'Foundation'
  },
  {
    id: 'components',
    title: 'Component Library',
    description: 'Atoms, molecules, organisms – reusable UI elements. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, Enter/Space to activate',
    icon: Layers,
    component: AIToologistComponents,
    category: 'Foundation'
  },
  // {
  //   id: 'global-navbar-master',
  //   title: 'Global Navbar Master',
  //   description: 'Complete navigation component with all variants, auto layout, and sticky header behavior. Theme Toggle Interactions: Clicking toggle switches "light" ↔ "dark" theme token set across entire application. Persists user selection in localStorage (dev note: implement theme persistence). Respects system preference (prefers-color-scheme) on first load if no saved preference. In mobile view, theme toggle also appears in navigation drawer header for consistent access. Keyboard shortcuts: ⌘K for search, Tab for navigation, Esc to close mobile menu, Space/Enter to toggle theme',
  //   icon: Navigation,
  //   component: GlobalNavbarMaster,
  //   category: 'Foundation'
  // },
  {
    id: 'micro-interactions',
    title: 'Micro-Interactions',
    description: 'Button hover/press, input validation, toast, skeleton loaders, animations. Keyboard shortcuts: ⌘K for Command Palette, focus-visible styles for all interactive elements',
    icon: Zap,
    component: MicroInteractions,
    category: 'Foundation'
  },
  {
    id: 'theming-i18n',
    title: 'Theming & i18n',
    description: 'Theme tokens, internationalization, and accessibility guidelines. Keyboard shortcuts: ⌘K for Command Palette, respects prefers-reduced-motion',
    icon: Globe,
    component: ThemingI18n,
    category: 'Foundation'
  },
  {
    id: 'home',
    title: 'Home Page (Original)',
    description: 'Original landing page with hero, featured tools, categories, and latest AI news. Connects to: Browse Tools, Tool Detail, News, Tutorials. Prototype State: Tool Detail links pass tool_id parameter (e.g., tool_id=chatgpt-4, tool_id=claude-3). Keyboard shortcuts: ⌘K for Command Palette, / to focus search, Tab for navigation, Esc to close overlays. Accessibility: All CTAs and cards have focus-visible ring-2 ring-ring ring-offset-2 for keyboard navigation. Search input auto-focuses on / key.',
    icon: Home,
    component: AIToologistHome,
    category: 'Core Pages'
  },
  {
    id: 'modern-home',
    title: 'Modern Home Page',
    description: 'Brand new modern homepage with stunning parallax effects, glassmorphism design, playful animated eyes, floating gradient orbs, and professional yet whimsical styling. Features soft gradient backgrounds (indigo → rose, orange → sky blue), glassmorphism cards with subtle shadows and blur, bold Inter typography, and responsive design. Includes hero section with animated eyes, features section with smart search/compare/workflows, trending tools grid, and community CTA banner. WCAG 2.1 AA compliant with proper focus management and reduced motion support.',
    icon: Wand2,
    component: NewModernHome,
    category: 'Core Pages'
  },
  {
    id: 'explore',
    title: 'Tools',
    description: 'Discover AI tools by category with advanced search, filtering, and responsive design. Combined browse and categories experience with sticky search bar, category grid (2-cols mobile, 4-6 cols desktop), and featured tools list. Connects to: Tool Detail, Compare Tools, Tool Wallet, Submit Tool. Prototype State: Tool Detail links pass tool_id parameter (e.g., tool_id=chatgpt-4, tool_id=claude-3, tool_id=midjourney-v6). Keyboard shortcuts: ⌘K for Command Palette, / to focus search, Tab for navigation, Enter to select, Esc to clear filters',
    icon: Search,
    component: Explore,
    category: 'Core Pages'
  },
  {
    id: 'tool-detail',
    title: 'Tool Detail',
    description: 'Detailed tool view with tabbed content, pricing, reviews, and related tools. Subscribe to Realtime channels "public:votes" and "public:favorites" for current tool_id; update counters optimistically, reconcile on ack. Connects to: Compare Tools, Tool Wallet, Explore Tools. Prototype State: Accepts param tool_id (mock). When tool_id is valid → render normal detail tabs. When missing/invalid → navigate to "Not Found" frame. STATE NOTE WIRING: Breadcrumb "Explore" link restores filters_state (note only) when returning to Explore Frame for seamless UX. DEV NOTE: Fire analytics event "tool_open" with { tool_id } on frame load for user tracking. Keyboard shortcuts: ⌘K for Command Palette, Arrow keys for tab navigation',
    icon: Layers,
    component: ToolDetail,
    category: 'Core Pages'
  },
  {
    id: 'compare',
    title: 'Compare Tools',
    description: 'Advanced AI tools comparison page with side-by-side feature analysis, pricing comparison, and user reviews. Select up to 5 tools to compare their capabilities, features, and pricing plans. Supports URL sharing and CSV export.',
    icon: GitCompare,
    component: ComparePage,
    category: 'Core Pages'
  },
  {
    id: 'news',
    title: 'News',
    description: 'News and updates interface with filtering, search, and responsive design. Images stored in Supabase Storage bucket `news`. body_html produced by editor; sanitize on render. Connects to: News Detail, Home. Keyboard shortcuts: / to focus search, Tab for navigation, Enter to read article',
    icon: BookOpen,
    component: NewsFrame,
    category: 'Application Screens'
  },
  {
    id: 'explore-frame',
    title: 'Tools',
    description: 'Complete AI tools discovery interface with 12-column responsive layout. Features sticky search bar with keyboard hints (⌘/Ctrl+K), scrollable category chips, pricing/platform/model filters, responsive categories grid (6/4/2 cols), and tool cards with pagination. Includes loading, empty, and error states. NOW INCLUDES BUILT-IN COMPARISON SECTION: Switch between Browse and Compare modes using tab navigation. Compare mode allows selection of up to 3 tools for side-by-side feature comparison with interactive comparison table. Connects to: Tool Detail, Tool Wallet. Prototype State: Tool Detail links pass tool_id parameter (e.g., tool_id=chatgpt-4, tool_id=claude-3, tool_id=midjourney-v6). STATE NOTE WIRING: When navigating to Tool Detail, passes filters_state (serialized note containing active category, pricing, search text) for breadcrumb restoration. DEV NOTE: Fire analytics event "tool_card_click" with { tool_id } on card click for user interaction tracking. WCAG 2.1 AA compliant with keyboard navigation and focus management.',
    icon: Search,
    component: ExploreFrame,
    category: 'Application Screens'
  },
  {
    id: 'news-detail',
    title: 'News Detail',
    description: 'Individual news article view with prose content, author info, and related articles. Images stored in Supabase Storage bucket `news`. body_html produced by editor; sanitize on render. Connects to: News, Home, Related Articles. Keyboard shortcuts: Tab for navigation, Enter to navigate to related articles, Esc to return to news list',
    icon: FileText,
    component: NewsDetailFrame,
    category: 'Application Screens'
  },
  {
    id: 'tutorials-frame',
    title: 'Tutorials',
    description: 'Complete tutorials interface with filtering, search, and responsive design. NOW INCLUDES BUILT-IN WORKFLOWS SECTION: Switch between Tutorials and Workflows modes using tab navigation. Workflows mode allows creation and discovery of AI tool workflows with step-by-step guidance. Images stored in Supabase Storage bucket `screenshots`. body_html produced by editor; sanitize on render. Connects to: Tutorial Detail View, Workflow Detail View, Home. Keyboard shortcuts: / to focus search, Tab for navigation, Enter to open tutorial/workflow, Esc to clear search. WCAG 2.1 AA compliant with keyboard navigation and focus management.',
    icon: BookOpen,
    component: TutorialsFrame,
    category: 'Application Screens'
  },
  {
    id: 'tool-combinations-frame',
    title: 'Tool Combinations (Legacy)',
    description: 'Legacy standalone workflow builder. This functionality has been integrated into the main Tutorials page as a section. Navigate to "Tutorials" instead for the full experience including workflow features.',
    icon: Workflow,
    component: ToolCombinationsFrame,
    category: 'Legacy'
  },
  {
    id: 'wallet',
    title: 'Tool Wallet',
    description: 'Subscription tracking and spending analytics with Supabase CRUD operations. Dashboard and billing management. List: SELECT * FROM subscriptions WHERE user_id = auth.uid() ORDER BY created_at DESC. Create: INSERT INTO subscriptions (tool_id, plan, cycle, amount, next_renewal) VALUES (...). Update: UPDATE subscriptions SET status = $1, next_renewal = $2 WHERE id = $3 AND user_id = auth.uid(). Charts: SELECT DATE_TRUNC(\'month\', created_at) as month, SUM(amount) FROM subscriptions GROUP BY month. RLS: Only owner can read/write their subscriptions. i18n keys: wallet.title, wallet.subscriptions, wallet.analytics, wallet.add_subscription. Connects to: Tool Detail, Submit Tool, Browse Tools. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, Enter to edit subscriptions',
    icon: Wallet,
    component: ModernDashboard,
    category: 'User Features'
  },
  {
    id: 'submit',
    title: 'Submit Tool',
    description: 'Multi-step form for tool submissions with validation and preview. Connects to: Tool Detail, Admin Panel, Browse Tools. Keyboard shortcuts: ⌘K for Command Palette, Tab for form navigation, ⌘Enter to submit, Esc to close validation dialogs',
    icon: Plus,
    component: SubmitTool,
    category: 'User Features'
  },
  {
    id: 'admin',
    title: 'Admin Panel',
    description: 'User management, tool moderation, and system settings with comprehensive dashboard. Connects to: Moderation Queue, Browse Tools, Submit Tool. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, Enter for actions, Esc to close modals',
    icon: Shield,
    component: AdminPanel,
    category: 'Admin'
  },
  {
    id: 'moderation',
    title: 'Moderation Queue',
    description: 'Review and approve submitted AI tools with Kanban workflow. Connects to: Admin Panel, Submit Tool. Keyboard shortcuts: ⌘K for Command Palette, Arrow keys for card navigation, Space to select, Enter for actions',
    icon: CheckSquare,
    component: ModerationQueue,
    category: 'Admin'
  },
  {
    id: 'auth',
    title: 'Auth & Onboarding',
    description: 'Login, signup, and user onboarding flow using Supabase Auth. Email/Password: signInWithPassword(), OAuth: signInWithOAuth({ provider: "google|github" }). Includes loading, error, and success states with i18n keys: auth.signin, auth.signup, auth.loading, auth.error.invalid_credentials, auth.success.welcome. Connects to: Home, Tool Wallet, Browse Tools. Keyboard shortcuts: Tab for form navigation, ⌘Enter to submit, Esc to close error dialogs',
    icon: User,
    component: AuthOnboarding,
    category: 'User Features'
  },
  {
    id: 'sign-in',
    title: 'Sign In',
    description: 'Dedicated sign in page with email/password, OAuth (Google, GitHub), magic link, and forgot password options. Supabase Auth integration: signInWithPassword(), signInWithOAuth(), signInWithOtp(). Includes form validation, loading states, error handling, and WCAG 2.1 AA compliance. i18n keys: auth.signin.*, auth.loading, auth.error.*, auth.success.welcome. Connects to: Home, Sign Up, Forgot Password, Magic Link, Two-Factor. Keyboard shortcuts: Tab for form navigation, Enter to submit, Esc to close/go back, Space to toggle password visibility',
    icon: User,
    component: SignInFrame,
    category: 'User Features'
  },
  {
    id: 'forgot-password',
    title: 'Forgot Password',
    description: 'Password reset form using Supabase Auth resetPasswordForEmail(). Handles email input, loading state, success confirmation. i18n keys: auth.forgot_password.title, auth.forgot_password.submit, auth.forgot_password.success, auth.forgot_password.error.email_not_found. Connects to: Auth. Keyboard shortcuts: Tab for navigation, Enter to submit, Esc to return to sign in',
    icon: Mail,
    component: ForgotPasswordFrame,
    category: 'User Features'
  },
  {
    id: 'magic-link',
    title: 'Magic Link',
    description: 'Passwordless authentication using signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + "/auth/callback" }}). Shows email input, sending state, check email confirmation. i18n keys: auth.magic_link.title, auth.magic_link.description, auth.magic_link.send, auth.magic_link.check_email. Connects to: Auth. Keyboard shortcuts: Tab for navigation, Enter to send link, Esc to return to sign in',
    icon: Sparkles,
    component: MagicLinkFrame,
    category: 'User Features'
  },
  {
    id: 'two-factor',
    title: 'Two-Factor (MFA)',
    description: '6-digit TOTP verification UI (requires Supabase beta TOTP feature - UX only for now). Auto-advance input, resend code, loading/error states. i18n keys: auth.mfa.title, auth.mfa.description, auth.mfa.verify, auth.mfa.resend, auth.mfa.error.invalid_code. Note: Backend integration pending Supabase TOTP GA release. Connects to: Auth, Home. Keyboard shortcuts: Auto-advance on input, Tab for navigation, Enter to verify, Esc to return',
    icon: KeyRound,
    component: TwoFactorFrame,
    category: 'User Features'
  },
  {
    id: 'onboarding-step-1',
    title: 'Onboarding Step 1',
    description: 'Interest selection with multi-select chips and category icons. Creates user profile record: INSERT INTO profiles (user_id, interests) after signUp success. i18n keys: onboarding.step1.title, onboarding.step1.description, onboarding.interests.*, onboarding.continue. Connects to: Onboarding Step 2, Auth. Keyboard shortcuts: Space to select/deselect chips, Arrow keys for navigation, Enter to continue',
    icon: Heart,
    component: OnboardingStep1Frame,
    category: 'User Features'
  },
  {
    id: 'onboarding-step-2',
    title: 'Onboarding Step 2',
    description: 'Notification preferences with toggle switches. Updates profile: UPDATE profiles SET notification_settings = jsonb WHERE user_id = auth.uid(). i18n keys: onboarding.step2.title, onboarding.notifications.*, onboarding.back, onboarding.continue. Connects to: Onboarding Step 3, Onboarding Step 1. Keyboard shortcuts: Space to toggle switches, Tab for navigation, Enter to continue',
    icon: Bell,
    component: OnboardingStep2Frame,
    category: 'User Features'
  },
  {
    id: 'onboarding-step-3',
    title: 'Onboarding Step 3',
    description: 'Summary and completion with personalized Browse Tools CTA. Completes profile: UPDATE profiles SET onboarding_completed = true WHERE user_id = auth.uid(). i18n keys: onboarding.step3.title, onboarding.step3.summary, onboarding.complete, onboarding.start_browsing. Connects to: Browse Tools, Onboarding Step 2. Keyboard shortcuts: Enter to complete onboarding, Tab for navigation',
    icon: CheckCircle,
    component: OnboardingStep3Frame,
    category: 'User Features'
  },
  {
    id: 'developer',
    title: 'Developer Handoff',
    description: 'Implementation guidelines, code examples, and Supabase integration patterns with screen-specific documentation. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, ⌘C to copy code examples',
    icon: Code,
    component: DeveloperHandoff,
    category: 'Documentation'
  },
  {
    id: 'tutorials',
    title: 'Tutorials (Legacy)',
    description: 'Step-by-step guides for using the design system. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, Enter to open tutorial',
    icon: BookOpen,
    component: Tutorials,
    category: 'Documentation'
  },
  {
    id: 'workflows',
    title: 'Tool Workflows (Legacy)',
    description: 'Create and manage complex tool combinations. Keyboard shortcuts: ⌘K for Command Palette, Tab for navigation, Enter to open workflow editor',
    icon: Workflow,
    component: ToolCombinations,
    category: 'Documentation'
  },
  // Individual Tool Pages
  {
    id: 'chatgpt-page',
    title: 'ChatGPT',
    description: 'Detailed information about ChatGPT - OpenAI\'s conversational AI assistant. Features, pricing, reviews, and alternatives.',
    icon: MessageCircle,
    component: ChatGPTPage,
    category: 'Tool Pages'
  },
  {
    id: 'midjourney-page',
    title: 'Midjourney',
    description: 'Detailed information about Midjourney - AI image generation from text prompts. Features, pricing, reviews, and alternatives.',
    icon: Palette,
    component: MidjourneyPage,
    category: 'Tool Pages'
  },
  {
    id: 'notion-ai-page',
    title: 'Notion AI',
    description: 'Detailed information about Notion AI - AI writing and knowledge features inside Notion. Features, pricing, reviews, and alternatives.',
    icon: FileText,
    component: NotionAIPage,
    category: 'Tool Pages'
  },
  {
    id: 'github-copilot-page',
    title: 'GitHub Copilot',
    description: 'Detailed information about GitHub Copilot - AI pair programmer inside your IDE. Features, pricing, reviews, and alternatives.',
    icon: Code,
    component: GitHubCopilotPage,
    category: 'Tool Pages'
  },
  {
    id: 'perplexity-page',
    title: 'Perplexity AI',
    description: 'Detailed information about Perplexity AI - Answer engine with cited sources. Features, pricing, reviews, and alternatives.',
    icon: Search,
    component: PerplexityPage,
    category: 'Tool Pages'
  },
  {
    id: 'claude-page',
    title: 'Claude',
    description: 'Detailed information about Claude - Helpful, harmless, honest assistant by Anthropic. Features, pricing, reviews, and alternatives.',
    icon: MessageCircle,
    component: ClaudePage,
    category: 'Tool Pages'
  },
  {
    id: 'stable-diffusion-page',
    title: 'Stable Diffusion',
    description: 'Detailed information about Stable Diffusion - AI image generation from text prompts. Features, pricing, reviews, and alternatives.',
    icon: Palette,
    component: StableDiffusionPage,
    category: 'Tool Pages'
  },
  {
    id: 'runway-ml-page',
    title: 'Runway ML',
    description: 'Detailed information about Runway ML - AI video editing and animation tools. Features, pricing, reviews, and alternatives.',
    icon: Palette,
    component: RunwayMLPage,
    category: 'Tool Pages'
  },
  {
    id: 'grammarly-page',
    title: 'Grammarly',
    description: 'Detailed information about Grammarly - AI writing assistant for grammar, style, and clarity. Features, pricing, reviews, and alternatives.',
    icon: Palette,
    component: GrammarlyPage,
    category: 'Tool Pages'
  },
  {
    id: 'figma-ai-page',
    title: 'Figma AI',
    description: 'Detailed information about Figma AI - AI design tools for vector graphics and UI/UX. Features, pricing, reviews, and alternatives.',
    icon: Palette,
    component: FigmaAIPage,
    category: 'Tool Pages'
  },
  // Settings Page
  {
    id: 'settings',
    title: 'Settings',
    description: 'Customize your AI Toologist experience with theme, language, notification, privacy, accessibility, and data preferences. Keyboard shortcuts: ⌘K for Command Palette, ⌘S to save changes, Tab for navigation, Esc to go back.',
    icon: SettingsIcon,
    component: Settings,
    category: 'User Features'
  }
];

// Add NotFound screen
const errorScreens = [
  {
    id: 'not-found',
    title: 'Not Found',
    description: 'Error state handler for missing tools, invalid URLs, and 404 cases. Context-aware messaging based on error type (tool, page, resource). Provides navigation options back to working areas. Keyboard shortcuts: Tab for navigation, Enter for primary action, Esc to go back.',
    icon: FileText,
    component: NotFound,
    category: 'Error States'
  }
];

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('modern-home'); // DEFAULT TO MODERN HOME
  const [viewMode, setViewMode] = useState<'app' | 'overview' | 'router'>('app'); // CHANGED TO APP MODE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGlobalCommandPaletteOpen, setIsGlobalCommandPaletteOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Navigation state for detailed views and modals
  const [navigationState, setNavigationState] = useState({
    detailView: null as string | null,
    modalState: null as string | null,
    selectedItem: undefined as any
  });

  const currentScreenData = screens.find(screen => screen.id === currentScreen) || 
                         errorScreens.find(screen => screen.id === currentScreen);
  const CurrentComponent = currentScreenData?.component;

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalCommandPaletteOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ENHANCED: Safe navigation with comprehensive validation
  const handleNavigation = (screenId: string, detailView?: string, selectedItem?: any) => {
    // SAFETY CHECK: Validate screenId with enhanced logging
    if (!screenId || typeof screenId !== 'string' || screenId.trim() === '') {
      console.error(`Navigation error: Invalid screenId:`, {
        screenId,
        detailView,
        selectedItem,
        type: typeof screenId,
        stack: new Error().stack
      });
      // Enhanced fallback strategy
      const fallbackScreen = currentScreen === 'router' ? 'modern-home' : currentScreen;
      setCurrentScreen(fallbackScreen);
      setViewMode('app');
      return;
    }

    // ENHANCED: Validate screen exists before navigation
    const targetScreen = screens.find(screen => screen.id === screenId) || 
                         errorScreens.find(screen => screen.id === screenId);
    
    if (!targetScreen) {
      console.warn(`Navigation warning: Screen '${screenId}' not found. Available screens:`, 
        [...screens, ...errorScreens].map(s => s.id));
      // Fallback to explore-frame for unknown screens
      setCurrentScreen('explore-frame');
      setViewMode('app');
      return;
    }

    setCurrentScreen(screenId);
    setViewMode('app');
    
    // Handle detail views and modals with validation
    if (detailView && typeof detailView === 'string') {
      setNavigationState({
        detailView,
        modalState: null,
        selectedItem: selectedItem || undefined
      });
    } else {
      setNavigationState({
        detailView: null,
        modalState: null,
        selectedItem: selectedItem || undefined // Always pass selectedItem, even without detailView
      });
    }
    
    // Simulate authentication state changes
    if (screenId === 'auth') {
      setTimeout(() => setIsAuthenticated(true), 2000);
    }
  };

  // ENHANCED: Simplified and more robust cross-screen navigation
  const handleCrossScreenNavigation = (fromScreen: string, toScreen: string, params?: any) => {
    // ENHANCED: Immediate null/undefined validation with detailed logging
    if (toScreen === undefined || toScreen === null || toScreen === '') {
      console.warn(`🚨 Navigation blocked: Invalid toScreen parameter from ${fromScreen}`, {
        fromScreen,
        toScreen,
        toScreenType: typeof toScreen,
        params,
        timestamp: new Date().toISOString()
      });
      
      // Create detailed error for logging
      const error = navigationLogger.createError(
        'invalid_params',
        fromScreen || 'unknown',
        `${toScreen} (${typeof toScreen})`,
        new Error(`Navigation called with invalid toScreen: ${toScreen} (${typeof toScreen})`),
        { params, context: 'immediate_validation' }
      );
      
      navigationLogger.logError(error);
      
      // Safe fallback without attempting further validation
      const immediateFallback = 'explore-frame';
      console.warn(`🔄 Immediate fallback: ${fromScreen} → ${immediateFallback} (blocked invalid toScreen: ${toScreen})`);
      handleNavigation(immediateFallback);
      return;
    }

    // ENHANCED: String validation and sanitization
    if (typeof toScreen !== 'string') {
      console.warn(`🚨 Navigation blocked: toScreen is not a string from ${fromScreen}`, {
        fromScreen,
        toScreen,
        toScreenType: typeof toScreen,
        params,
        timestamp: new Date().toISOString()
      });
      
      const error = navigationLogger.createError(
        'invalid_params',
        fromScreen || 'unknown',
        `${toScreen} (${typeof toScreen})`,
        new Error(`toScreen must be a string, got ${typeof toScreen}`),
        { params, context: 'type_validation' }
      );
      
      navigationLogger.logError(error);
      handleNavigation('explore-frame');
      return;
    }

    // Sanitize toScreen
    const sanitizedToScreen = toScreen.trim();
    if (sanitizedToScreen === '') {
      console.warn(`🚨 Navigation blocked: Empty toScreen after sanitization from ${fromScreen}`);
      handleNavigation('explore-frame');
      return;
    }

    // ENHANCED PRE-VALIDATION: Use navigation logger validation
    const validation = navigationLogger.validateNavigationParams(fromScreen, sanitizedToScreen, params);
    
    if (!validation.isValid) {
      console.error(`🚫 Navigation validation failed:`, validation.errors);
      
      const error = navigationLogger.createError(
        'invalid_params',
        fromScreen || 'unknown',
        sanitizedToScreen || 'undefined',
        new Error(`Navigation validation failed: ${validation.errors.join(', ')}`),
        params
      );
      
      navigationLogger.logError(error);
      
      // Enhanced fallback strategy based on current context
      const safeFallbacks: Record<string, string> = {
        'router': 'modern-home',
        'auth': 'modern-home',
        'onboarding-step-1': 'auth',
        'onboarding-step-2': 'onboarding-step-1',
        'onboarding-step-3': 'onboarding-step-2',
        'tool-detail': 'explore-frame',
        'news-detail': 'news',
        'not-found': 'explore-frame',
        'tutorials-frame': 'explore-frame',
        'tool-combinations-frame': 'explore-frame'
      };
      
      const fallback = safeFallbacks[fromScreen] || 'explore-frame';
      console.warn(`🔄 Navigation fallback: ${fromScreen} → ${fallback} (original target was ${sanitizedToScreen})`);
      navigationLogger.logNavigation('error_fallback', fallback, { originalError: error });
      handleNavigation(fallback);
      return;
    }

    // ENHANCED: Additional validation for fromScreen
    const validatedFromScreen = (!fromScreen || typeof fromScreen !== 'string') 
      ? (currentScreen || 'modern-home')
      : fromScreen;
    
    if (!fromScreen || typeof fromScreen !== 'string') {
      console.warn(`⚠️ Invalid fromScreen parameter: ${fromScreen}, using current screen instead`);
    }

    // ENHANCED: Structured navigation routing with validation
    const navigationMap: Record<string, (fromScreen: string, params?: any) => void> = {
      // Settings Navigation
      'settings': (from, params) => {
        navigationLogger.logNavigation(from, 'settings', params);
        handleNavigation('settings', null, params);
      },

      // Design System Navigation
      'design-tokens': (from, params) => {
        navigationLogger.logNavigation(from, 'design-tokens', params);
        handleNavigation('design-tokens', null, params);
      },
      'enhanced-buttons': (from, params) => {
        navigationLogger.logNavigation(from, 'enhanced-buttons', params);
        handleNavigation('enhanced-buttons', null, params);
      },

      // Individual Tool Pages Navigation
      'chatgpt-page': (from, params) => {
        navigationLogger.logNavigation(from, 'chatgpt-page', params);
        handleNavigation('chatgpt-page', null, params);
      },
      'midjourney-page': (from, params) => {
        navigationLogger.logNavigation(from, 'midjourney-page', params);
        handleNavigation('midjourney-page', null, params);
      },
      'notion-ai-page': (from, params) => {
        navigationLogger.logNavigation(from, 'notion-ai-page', params);
        handleNavigation('notion-ai-page', null, params);
      },
      'github-copilot-page': (from, params) => {
        navigationLogger.logNavigation(from, 'github-copilot-page', params);
        handleNavigation('github-copilot-page', null, params);
      },
      'perplexity-page': (from, params) => {
        navigationLogger.logNavigation(from, 'perplexity-page', params);
        handleNavigation('perplexity-page', null, params);
      },
      'claude-page': (from, params) => {
        navigationLogger.logNavigation(from, 'claude-page', params);
        handleNavigation('claude-page', null, params);
      },
      'stable-diffusion-page': (from, params) => {
        navigationLogger.logNavigation(from, 'stable-diffusion-page', params);
        handleNavigation('stable-diffusion-page', null, params);
      },
      'runway-ml-page': (from, params) => {
        navigationLogger.logNavigation(from, 'runway-ml-page', params);
        handleNavigation('runway-ml-page', null, params);
      },
      'grammarly-page': (from, params) => {
        navigationLogger.logNavigation(from, 'grammarly-page', params);
        handleNavigation('grammarly-page', null, params);
      },
      'figma-ai-page': (from, params) => {
        navigationLogger.logNavigation(from, 'figma-ai-page', params);
        handleNavigation('figma-ai-page', null, params);
      },

      // Core page navigation
      'tool-detail': (from, params) => {
        console.log('🔍 App.tsx tool-detail navigation START:', {
          from,
          params,
          paramsKeys: params ? Object.keys(params) : 'no params',
          rawParams: params
        });
        
        const tool_id = params?.tool_id || params?.toolId || params?.id || 'fallback-tool';
        
        console.log('🔍 App.tsx tool-detail extracted tool_id:', tool_id);
        
        console.log('🔍 App.tsx calling handleNavigation with:', {
          screenId: 'tool-detail',
          detailView: null,
          selectedItem: { ...params, tool_id }
        });
        
        navigationLogger.logNavigation(from, 'tool-detail', { tool_id, params });
        handleNavigation('tool-detail', null, { ...params, tool_id });
      },
      
      // Frame navigation
      'explore-frame': (from, params) => {
        navigationLogger.logNavigation(from, 'explore-frame', params);
        handleNavigation('explore-frame', null, params);
      },
      'tutorials-frame': (from) => {
        navigationLogger.logNavigation(from, 'tutorials-frame');
        handleNavigation('tutorials-frame');
      },
      'news': (from) => {
        navigationLogger.logNavigation(from, 'news');
        handleNavigation('news');
      },
      'news-detail': (from, params) => {
        navigationLogger.logNavigation(from, 'news-detail', params);
        handleNavigation('news-detail', null, params);
      },
      
      // Blog redirect - FIX FOR ERRORS
      'blog': (from, params) => {
        console.warn(`🔄 Blog redirect: ${from} → news (blog has been replaced with news)`);
        navigationLogger.logNavigation(from, 'news', { redirect: 'blog-to-news', ...params });
        handleNavigation('news', null, params);
      },
      
      // Tutorial detail navigation
      'tutorial-detail': (from, params) => {
        const tutorial_id = params?.tutorial?.id || params?.tutorialId || params?.id || 'mock_tutorial';
        navigationLogger.logNavigation(from, 'tutorials-frame', { 
          detailView: 'tutorial-detail', 
          tutorial_id, 
          tutorial: params?.tutorial,
          params 
        });
        handleNavigation('tutorials-frame', 'tutorial-detail', {
          ...params,
          tutorial_id,
          tutorial: params?.tutorial
        });
      },
      
      // Workflow detail navigation (similar pattern)
      'workflow-detail': (from, params) => {
        const workflow_id = params?.workflow?.id || params?.workflowId || params?.id || 'mock_workflow';
        navigationLogger.logNavigation(from, 'tool-combinations-frame', { 
          detailView: 'workflow-detail', 
          workflow_id, 
          workflow: params?.workflow,
          params 
        });
        handleNavigation('tool-combinations-frame', 'workflow-detail', {
          ...params,
          workflow_id,
          workflow: params?.workflow
        });
      },
      
      // Auth flow
      'auth': (from) => {
        navigationLogger.logNavigation(from, 'auth');
        handleNavigation('auth');
      },
      'sign-in': (from) => {
        navigationLogger.logNavigation(from, 'sign-in');
        handleNavigation('sign-in');
      },
      'sign-up': (from) => {
        navigationLogger.logNavigation(from, 'auth', { flow: 'sign-up' });
        handleNavigation('auth', 'sign-up');
      },
      'forgot-password': (from) => {
        navigationLogger.logNavigation(from, 'forgot-password');
        handleNavigation('forgot-password');
      },
      'magic-link': (from) => {
        navigationLogger.logNavigation(from, 'magic-link');
        handleNavigation('magic-link');
      },
      'two-factor': (from) => {
        navigationLogger.logNavigation(from, 'two-factor');
        handleNavigation('two-factor');
      },
      
      // Onboarding flow
      'onboarding-step-1': (from) => {
        navigationLogger.logNavigation(from, 'onboarding-step-1');
        handleNavigation('onboarding-step-1');
      },
      'onboarding-step-2': (from, params) => {
        navigationLogger.logNavigation(from, 'onboarding-step-2', params);
        handleNavigation('onboarding-step-2', null, params);
      },
      'onboarding-step-3': (from, params) => {
        navigationLogger.logNavigation(from, 'onboarding-step-3', params);
        handleNavigation('onboarding-step-3', null, params);
      },
      
      // Feature pages
      'explore': (from) => {
        navigationLogger.logNavigation(from, 'explore-frame', { redirect: 'explore' });
        handleNavigation('explore-frame');
      },
      'tools': (from) => {
        navigationLogger.logNavigation(from, 'explore-frame', { redirect: 'tools' });
        handleNavigation('explore-frame');
      },
      'browse': (from) => {
        navigationLogger.logNavigation(from, 'explore-frame', { redirect: 'browse' });
        handleNavigation('explore-frame');
      },
      
      // UPDATED: Compare navigation now redirects to tools with compare mode
      'compare': (from, params) => {
        console.log(`🔄 Compare redirect: ${from} → explore-frame (compare is now integrated into tools page)`);
        navigationLogger.logNavigation(from, 'explore-frame', { redirect: 'compare', mode: 'compare', ...params });
        // Navigate to explore-frame and let it handle the compare mode
        handleNavigation('explore-frame', null, { mode: 'compare', ...params });
      },
      'compare-tools': (from, params) => {
        console.log(`🔄 Compare Tools redirect: ${from} → explore-frame (compare is now integrated into tools page)`);
        navigationLogger.logNavigation(from, 'explore-frame', { redirect: 'compare-tools', mode: 'compare', ...params });
        handleNavigation('explore-frame', null, { mode: 'compare', ...params });
      },
      
      'wallet': (from, params) => {
        navigationLogger.logNavigation(from, 'wallet', params);
        handleNavigation('wallet', 'tool-added', params);
      },
      'tool-wallet': (from, params) => {
        navigationLogger.logNavigation(from, 'wallet', { redirect: 'tool-wallet', ...params });
        handleNavigation('wallet', 'tool-added', params);
      },
      'submit': (from) => {
        navigationLogger.logNavigation(from, 'submit');
        handleNavigation('submit');
      },
      'submit-tool': (from) => {
        navigationLogger.logNavigation(from, 'submit', { redirect: 'submit-tool' });
        handleNavigation('submit');
      },
      
      // Home navigation
      'modern-home': (from) => {
        navigationLogger.logNavigation(from, 'modern-home');
        handleNavigation('modern-home');
      },
      
      // Legacy redirects
      'tutorials': (from) => {
        navigationLogger.logNavigation(from, 'tutorials-frame', { legacy: 'tutorials' });
        handleNavigation('tutorials-frame');
      },
      'workflows': (from, params) => {
        console.log(`🔄 Workflows redirect: ${from} → tutorials-frame (workflows is now integrated into tutorials page)`);
        navigationLogger.logNavigation(from, 'tutorials-frame', { redirect: 'workflows', mode: 'workflows', ...params });
        handleNavigation('tutorials-frame', null, { mode: 'workflows', ...params });
      },
      'tool-combinations-frame': (from, params) => {
        console.log(`🔄 Tool Combinations redirect: ${from} → tutorials-frame (workflows is now integrated into tutorials page)`);
        navigationLogger.logNavigation(from, 'tutorials-frame', { redirect: 'tool-combinations-frame', mode: 'workflows', ...params });
        handleNavigation('tutorials-frame', null, { mode: 'workflows', ...params });
      },
      
      // Back navigation
      'back': (from) => {
        const backMap: Record<string, string> = {
          'not-found': 'explore-frame',
          'tool-detail': 'explore-frame',
          'news-detail': 'news',
          'forgot-password': 'auth',
          'magic-link': 'auth',
          'two-factor': 'auth',
          'onboarding-step-1': 'auth',
          'onboarding-step-2': 'onboarding-step-1',
          'onboarding-step-3': 'onboarding-step-2',
          'submit': 'explore-frame',
          'tutorials-frame': 'modern-home',
          'tool-combinations-frame': 'modern-home'
        };
        const target = backMap[from] || 'modern-home';
        navigationLogger.logNavigation(from, target, { action: 'back' });
        handleNavigation(target);
      },
      
      // Null/undefined handlers to prevent errors
      'null': () => {
        console.warn('⚠️ Navigation attempted with null target, falling back to explore-frame');
        handleNavigation('explore-frame');
      },
      'undefined': () => {
        console.warn('⚠️ Navigation attempted with undefined target, falling back to explore-frame');
        handleNavigation('explore-frame');
      }
    };

    // ENHANCED: Execute navigation with comprehensive error handling
    const handler = navigationMap[sanitizedToScreen];
    if (handler) {
      try {
        handler(validatedFromScreen, params);
      } catch (error) {
        const navError = navigationLogger.createError(
          'handler_error',
          validatedFromScreen,
          sanitizedToScreen,
          error instanceof Error ? error : new Error('Unknown handler error'),
          params
        );
        
        navigationLogger.logError(navError);
        
        // Safe fallback
        console.error(`❌ Navigation handler failed for ${validatedFromScreen} → ${sanitizedToScreen}`, error);
        navigationLogger.logNavigation('error_fallback', 'explore-frame', { 
          originalTarget: sanitizedToScreen, 
          error: navError 
        });
        handleNavigation('explore-frame');
      }
    } else {
      // ENHANCED: Check if it's a valid screen before fallback
      const validTargets = [...screens, ...errorScreens].map(s => s.id);
      const validScreen = screens.find(screen => screen.id === sanitizedToScreen) || 
                          errorScreens.find(screen => screen.id === sanitizedToScreen);
      
      if (validScreen) {
        navigationLogger.logNavigation(validatedFromScreen, sanitizedToScreen, params);
        handleNavigation(sanitizedToScreen);
      } else {
        const error = navigationLogger.createError(
          'unknown_target',
          validatedFromScreen,
          sanitizedToScreen,
          new Error(`Unknown navigation target: ${sanitizedToScreen}`),
          params
        );
        
        navigationLogger.logError(error);
        navigationLogger.logWarning(
          validatedFromScreen,
          sanitizedToScreen,
          `Unknown navigation target. Available targets: ${Object.keys(navigationMap).concat(validTargets).join(', ')}`,
          params
        );
        
        // Safe fallback
        console.warn(`⚠️ Unknown navigation target: ${sanitizedToScreen}, falling back to explore-frame`);
        navigationLogger.logNavigation('error_fallback', 'explore-frame', { 
          originalTarget: sanitizedToScreen,
          availableTargets: Object.keys(navigationMap)
        });
        handleNavigation('explore-frame');
      }
    }
  };

  const handleGlobalCommandPaletteNavigate = (screenId: string) => {
    handleNavigation(screenId);
    setIsGlobalCommandPaletteOpen(false);
  };

  const handleLogout = () => {
    // Reset authentication state
    setIsAuthenticated(false);
    // Navigate to modern home page
    handleNavigation('modern-home');
    // In a real app, this would also:
    // - Clear tokens from localStorage/sessionStorage
    // - Call logout API endpoint
    // - Clear user data from state
    console.log('User logged out successfully');
  };

  // App Router View
  if (viewMode === 'router') {
    return (
      <>
        <Toaster position="bottom-right" />
        <div id="app-root" className="relative min-h-screen" style={{ backgroundColor: '#E9E3DF' }}>
          {/* Use SimpleNavbar for testing */}
        <SimpleNavbar onNavigate={(from, to) => handleNavigation(to)} />
        
        <AppRouter onNavigateToScreen={(toScreen, params) => handleNavigation(toScreen, undefined, params)} />
        
        {/* Global Command Palette for Router View */}
        <CommandPalette 
          isOpen={isGlobalCommandPaletteOpen}
          onClose={() => setIsGlobalCommandPaletteOpen(false)}
          onNavigate={(to) => {
            handleNavigation(to);
            setIsGlobalCommandPaletteOpen(false);
          }}
        />

        {/* AI Chatbot - Available on router view */}
        <AIChatbot />
      </div>
      </>
    );
  }

  // Individual Screen View with Global Navbar
  // Check if current screen has its own navigation
  const screensWithOwnNavigation = ['modern-home', 'explore-frame'];
  const shouldShowGlobalNav = !screensWithOwnNavigation.includes(currentScreen);
  
  return (
    <>
      <Toaster position="bottom-right" />
      <div id="app-root" className="relative min-h-screen">
      {/* Only show global navbar for screens that don't have their own navigation */}
      {shouldShowGlobalNav && (
        <>
          {/* Enhanced Modern Navbar - Transparent */}
          <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between h-20">
                {/* Logo with Glass Effect */}
                <button
                  onClick={() => handleNavigation('modern-home')}
                  className="group flex items-center gap-3 transition-transform hover:scale-105 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                      <span className="text-white text-2xl">🧠</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                      AI Toologist
                    </span>
                    <span className="text-xs text-gray-600 font-medium">Discover AI Tools</span>
                  </div>
                </button>

                {/* Navigation Links with Enhanced Design */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavigation('modern-home')}
                    className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md ${
                      currentScreen === 'modern-home' 
                        ? 'text-white shadow-2xl' 
                        : 'text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50'
                    }`}
                  >
                    {currentScreen === 'modern-home' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg animate-pulse" />
                    )}
                    <span className="relative flex items-center gap-2 drop-shadow-sm">
                      🏠 Home
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigation('explore-frame')}
                    className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md ${
                      currentScreen === 'explore-frame' 
                        ? 'text-white shadow-2xl' 
                        : 'text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50'
                    }`}
                  >
                    {currentScreen === 'explore-frame' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg animate-pulse" />
                    )}
                    <span className="relative flex items-center gap-2 drop-shadow-sm">
                      🤖 AI Tools
                      <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full animate-bounce">
                        New
                      </span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigation('tutorials-frame')}
                    className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md ${
                      currentScreen === 'tutorials-frame' 
                        ? 'text-white shadow-2xl' 
                        : 'text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50'
                    }`}
                  >
                    {currentScreen === 'tutorials-frame' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-lg animate-pulse" />
                    )}
                    <span className="relative flex items-center gap-2 drop-shadow-sm">
                      📚 Learning
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigation('news')}
                    className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md ${
                      currentScreen === 'news' 
                        ? 'text-white shadow-2xl' 
                        : 'text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50'
                    }`}
                  >
                    {currentScreen === 'news' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-lg animate-pulse" />
                    )}
                    <span className="relative flex items-center gap-2 drop-shadow-sm">
                      📰 News
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavigation('wallet')}
                    className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md ${
                      currentScreen === 'wallet' 
                        ? 'text-white shadow-2xl' 
                        : 'text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/50'
                    }`}
                  >
                    {currentScreen === 'wallet' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg animate-pulse" />
                    )}
                    <span className="relative flex items-center gap-2 drop-shadow-sm">
                      💳 Wallet
                    </span>
                  </button>
                </div>

                {/* Auth Buttons with Glassmorphism */}
                <div className="flex items-center gap-4">
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl hover:bg-white/50 transition-all duration-300">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-gray-700 font-medium">{user.email?.split('@')[0]}</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => handleNavigation('profile')}>
                          <UserCircle className="w-4 h-4 mr-2" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleNavigation('settings')}>
                          <SettingsIcon className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={async () => {
                            await signOut();
                            handleNavigation('auth');
                          }}
                          className="text-red-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <button
                        onClick={() => handleNavigation('sign-in')}
                        className="px-6 py-3 text-gray-700 font-semibold bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleNavigation('auth')}
                        className="relative px-8 py-3 font-bold text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-2">
                          ✨ Get Started
                          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
          
          {/* Spacer for fixed navbar */}
          <div className="h-20" />
        </>
      )}

      {/* Main Content - NO BACKGROUND COLOR, LET COMPONENT HANDLE IT */}
      <main>
        {CurrentComponent && (
          <>
            {/* Debug logging for ToolDetail component props */}
            {currentScreen === 'tool-detail' && console.log('🔍 Rendering ToolDetail with props:', {
              currentScreen,
              selectedItem: navigationState.selectedItem,
              params: navigationState.selectedItem,
              selectedItemKeys: navigationState.selectedItem ? Object.keys(navigationState.selectedItem) : 'no selectedItem'
            })}
            
            <CurrentComponent
              onNavigate={handleCrossScreenNavigation}
              currentScreen={currentScreen}
              isAuthenticated={isAuthenticated}
              navigationState={navigationState.detailView}
              selectedItem={navigationState.selectedItem}
              detailView={navigationState.detailView ? true : undefined}
              params={navigationState.selectedItem} // Pass params for ToolDetail component
            />
          </>
        )}
      </main>

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={isGlobalCommandPaletteOpen}
        onClose={() => setIsGlobalCommandPaletteOpen(false)}
        onNavigate={(from, to) => {
          handleNavigation(to);
          setIsGlobalCommandPaletteOpen(false);
        }}
      />

      {/* AI Chatbot - Available on all screens */}
      <AIChatbot />
    </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
