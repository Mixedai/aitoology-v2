import { lazy, Suspense, useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { RouteErrorBoundary } from './components/ErrorBoundary/RouteErrorBoundary';

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Lazy load all heavy components
const NewModernHome = lazy(() => import('./components/home/NewModernHome').then(m => ({ default: m.NewModernHome })));
const ExploreFrame = lazy(() => import('./components/explore/ExploreFrame').then(m => ({ default: m.ExploreFrame })));
const ToolDetail = lazy(() => import('./components/tool-detail/ToolDetail').then(m => ({ default: m.ToolDetail })));
const ComparePage = lazy(() => import('./components/compare/ComparePage'));
const ModernDashboard = lazy(() => import('./components/tool-wallet/ModernDashboard').then(m => ({ default: m.ModernDashboard })));
const TutorialsFrame = lazy(() => import('./components/tutorials/TutorialsFrame').then(m => ({ default: m.TutorialsFrame })));
const NewsFrame = lazy(() => import('./components/news/NewsFrame').then(m => ({ default: m.NewsFrame })));
const NewsDetailFrame = lazy(() => import('./components/news/NewsDetailFrame').then(m => ({ default: m.NewsDetailFrame })));
const SubmitTool = lazy(() => import('./components/submit-tool/SubmitTool').then(m => ({ default: m.SubmitTool })));
const Settings = lazy(() => import('./components/settings/Settings').then(m => ({ default: m.Settings })));
const SignInFrame = lazy(() => import('./components/auth/SignInFrame').then(m => ({ default: m.SignInFrame })));
const AuthOnboarding = lazy(() => import('./components/auth/AuthOnboarding').then(m => ({ default: m.AuthOnboarding })));
const OnboardingStep1Frame = lazy(() => import('./components/auth/OnboardingStep1Frame').then(m => ({ default: m.OnboardingStep1Frame })));
const OnboardingStep2Frame = lazy(() => import('./components/auth/OnboardingStep2Frame').then(m => ({ default: m.OnboardingStep2Frame })));
const OnboardingStep3Frame = lazy(() => import('./components/auth/OnboardingStep3Frame').then(m => ({ default: m.OnboardingStep3Frame })));
const NotFound = lazy(() => import('./components/error/NotFound').then(m => ({ default: m.NotFound })));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then(m => ({ default: m.AdminPanel })));
const ModerationQueue = lazy(() => import('./components/admin/ModerationQueue').then(m => ({ default: m.ModerationQueue })));

// Command Palette - lazy load since it's not always used
const CommandPalette = lazy(() => import('./components/navigation/CommandPalette').then(m => ({ default: m.CommandPalette })));

// AI Chatbot - lazy load since it's optional
const AIChatbot = lazy(() => import('./components/ai-chatbot/AIChatbot').then(m => ({ default: m.AIChatbot })));

// Design system pages - lazy load since they're rarely accessed
const AIToologistDesignSystem = lazy(() => import('./components/design-system/AIToologistDesignSystem').then(m => ({ default: m.AIToologistDesignSystem })));
const DesignTokenDocumentation = lazy(() => import('./components/design-system/DesignTokenDocumentation').then(m => ({ default: m.DesignTokenDocumentation })));
const EnhancedButtonDesignSystem = lazy(() => import('./components/design-system/EnhancedButtonDesignSystem').then(m => ({ default: m.EnhancedButtonDesignSystem })));
const AIToologistComponents = lazy(() => import('./components/ui-library/AIToologistComponents').then(m => ({ default: m.AIToologistComponents })));
const MicroInteractions = lazy(() => import('./components/micro-interactions/MicroInteractions'));
const ThemingI18n = lazy(() => import('./components/theming-i18n/ThemingI18n').then(m => ({ default: m.ThemingI18n })));
const DeveloperHandoff = lazy(() => import('./components/developer/DeveloperHandoff').then(m => ({ default: m.DeveloperHandoff })));

// Tool pages - lazy load all
const ChatGPTPage = lazy(() => import('./components/tools').then(m => ({ default: m.ChatGPTPage })));
const MidjourneyPage = lazy(() => import('./components/tools').then(m => ({ default: m.MidjourneyPage })));
const NotionAIPage = lazy(() => import('./components/tools').then(m => ({ default: m.NotionAIPage })));
const GitHubCopilotPage = lazy(() => import('./components/tools').then(m => ({ default: m.GitHubCopilotPage })));
const PerplexityPage = lazy(() => import('./components/tools').then(m => ({ default: m.PerplexityPage })));
const ClaudePage = lazy(() => import('./components/tools').then(m => ({ default: m.ClaudePage })));
const StableDiffusionPage = lazy(() => import('./components/tools').then(m => ({ default: m.StableDiffusionPage })));
const RunwayMLPage = lazy(() => import('./components/tools').then(m => ({ default: m.RunwayMLPage })));
const GrammarlyPage = lazy(() => import('./components/tools').then(m => ({ default: m.GrammarlyPage })));
const FigmaAIPage = lazy(() => import('./components/tools').then(m => ({ default: m.FigmaAIPage })));

// Component map for dynamic rendering
export const componentMap = {
  'modern-home': NewModernHome,
  'explore-frame': ExploreFrame,
  'tool-detail': ToolDetail,
  'compare': ComparePage,
  'wallet': ModernDashboard,
  'tutorials-frame': TutorialsFrame,
  'news': NewsFrame,
  'news-detail': NewsDetailFrame,
  'submit': SubmitTool,
  'settings': Settings,
  'sign-in': SignInFrame,
  'auth': AuthOnboarding,
  'onboarding-step-1': OnboardingStep1Frame,
  'onboarding-step-2': OnboardingStep2Frame,
  'onboarding-step-3': OnboardingStep3Frame,
  'not-found': NotFound,
  'admin': AdminPanel,
  'moderation': ModerationQueue,
  'design-system': AIToologistDesignSystem,
  'design-tokens': DesignTokenDocumentation,
  'enhanced-buttons': EnhancedButtonDesignSystem,
  'components': AIToologistComponents,
  'micro-interactions': MicroInteractions,
  'theming-i18n': ThemingI18n,
  'developer': DeveloperHandoff,
  'chatgpt-page': ChatGPTPage,
  'midjourney-page': MidjourneyPage,
  'notion-ai-page': NotionAIPage,
  'github-copilot-page': GitHubCopilotPage,
  'perplexity-page': PerplexityPage,
  'claude-page': ClaudePage,
  'stable-diffusion-page': StableDiffusionPage,
  'runway-ml-page': RunwayMLPage,
  'grammarly-page': GrammarlyPage,
  'figma-ai-page': FigmaAIPage,
};

// Lazy App Component wrapper
export function LazyApp() {
  const [currentScreen, setCurrentScreen] = useState('modern-home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { } = useAuth();

  const CurrentComponent = componentMap[currentScreen as keyof typeof componentMap] || NotFound;

  // Global keyboard shortcut for command palette
  useEffect(() => {
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
    setCurrentScreen(screenId);
  };

  const handleCrossScreenNavigation = (_fromScreen: string, toScreen: string, _params?: any) => {
    setCurrentScreen(toScreen);
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div id="app-root" className="relative min-h-screen">
        {/* Navigation removed - each page has its own navbar */}
        
        {/* Main Content with Suspense */}
        <main>
          <Suspense fallback={<PageLoader />}>
            <RouteErrorBoundary routeName={currentScreen}>
              <CurrentComponent
                onNavigate={handleCrossScreenNavigation}
                currentScreen={currentScreen}
              />
            </RouteErrorBoundary>
          </Suspense>
        </main>

        {/* Command Palette - Lazy loaded */}
        {isCommandPaletteOpen && (
          <Suspense fallback={null}>
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              onNavigate={(_from: string, to: string) => {
                handleNavigation(to);
                setIsCommandPaletteOpen(false);
              }}
            />
          </Suspense>
        )}

        {/* AI Chatbot - Lazy loaded */}
        <Suspense fallback={null}>
          <AIChatbot />
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LazyApp />
    </AuthProvider>
  );
}