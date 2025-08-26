// Navigation types for AI Toologist SaaS application
// Ensures type safety across all navigation components

export interface NavigationParams {
  toolId?: string;
  tool_id?: string;
  id?: string;
  filters_state?: any;
  source?: string;
  tutorialId?: string;
  tutorial_id?: string;
  tutorial?: any;
  workflowId?: string;
  workflow_id?: string;
  workflow?: any;
  [key: string]: any;
}

export interface NavigationState {
  detailView: string | null;
  modalState: string | null;
  selectedItem: any;
}

export interface NavigationHandler {
  (fromScreen: string, toScreen: string, params?: NavigationParams): void;
}

export interface SafeNavigationHandler {
  (screenId: string, detailView?: string, selectedItem?: any): void;
}

export interface ComponentNavigationProps {
  onNavigate: NavigationHandler;
  currentScreen: string;
  isAuthenticated?: boolean;
  navigationState?: string | null;
  selectedItem?: any;
  detailView?: boolean;
}

// Screen category types
export type ScreenCategory = 
  | 'Foundation'
  | 'Core Pages'
  | 'Application Screens'
  | 'User Features'
  | 'Admin'
  | 'Documentation'
  | 'Error States';

// Valid screen IDs for type safety
export type ScreenId = 
  | 'design-system'
  | 'components'
  | 'global-navbar-master'
  | 'micro-interactions'
  | 'theming-i18n'
  | 'home'
  | 'explore'
  | 'tool-detail'
  | 'compare'
  | 'news'
  | 'blog'
  | 'explore-frame'
  | 'news-detail'
  | 'tutorials-frame'
  | 'tool-combinations-frame'
  | 'wallet'
  | 'submit'
  | 'admin'
  | 'moderation'
  | 'auth'
  | 'forgot-password'
  | 'magic-link'
  | 'two-factor'
  | 'onboarding-step-1'
  | 'onboarding-step-2'
  | 'onboarding-step-3'
  | 'developer'
  | 'tutorials'
  | 'workflows'
  | 'not-found'
  | 'router';

// Navigation target validation
export type NavigationTarget = ScreenId | 'back' | 'sign-in' | 'sign-up' | 'browse' | 'compare-tools' | 'tool-wallet' | 'submit-tool' | 'tutorial-detail' | 'workflow-detail' | 'blog';

// Error context types for better error handling
export interface NavigationError {
  type: 'invalid_screen' | 'invalid_params' | 'handler_error' | 'unknown_target';
  fromScreen: string;
  toScreen: string;
  params?: NavigationParams;
  originalError?: Error;
  timestamp: string;
}

// Navigation context for error recovery
export interface NavigationContext {
  currentScreen: ScreenId;
  previousScreen?: ScreenId;
  navigationHistory: ScreenId[];
  fallbackScreen: ScreenId;
}

// Enhanced logging interface
export interface NavigationLog {
  from: string;
  to: string;
  params?: NavigationParams;
  timestamp: string;
  hasHandler: boolean;
  success: boolean;
  error?: NavigationError;
}

// Component-specific navigation requirements
export interface ToolDetailNavigationProps extends ComponentNavigationProps {
  toolId?: string;
  filters_state?: any;
}

export interface AuthNavigationProps extends ComponentNavigationProps {
  authFlow?: 'sign-in' | 'sign-up' | 'forgot-password' | 'magic-link' | 'two-factor';
  redirectTo?: string;
}

export interface OnboardingNavigationProps extends ComponentNavigationProps {
  step?: 1 | 2 | 3;
  userData?: any;
}

// Tutorial navigation props
export interface TutorialNavigationProps extends ComponentNavigationProps {
  tutorialId?: string;
  tutorial?: any;
  detailView?: 'tutorial-detail';
}

// Workflow navigation props
export interface WorkflowNavigationProps extends ComponentNavigationProps {
  workflowId?: string;
  workflow?: any;
  detailView?: 'workflow-detail';
}

// Global navbar navigation props
export interface NavbarNavigationProps {
  currentScreen: string;
  variant?: 'default' | 'authenticated';
  showVariants?: boolean;
  onNavigate: NavigationHandler;
}

// Command palette navigation
export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screenId: string) => void;
}

export default NavigationHandler;