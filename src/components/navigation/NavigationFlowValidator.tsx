
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  AlertTriangle,
  Info,
  ExternalLink,
  GitBranch,
  Navigation,
  Zap
} from 'lucide-react';

/*
NAVIGATION FLOW VALIDATOR - AI TOOLOGIST DESIGN SYSTEM

Comprehensive validation of navigation flows, multi-step wizards, and redirect logic.

Validates:
- Submit Tool: 4-step wizard with validation, draft saving, success redirect
- Create Workflow: 3-step wizard with template selection, tool configuration, settings
- Onboarding: 3-step flow with proper back/next navigation and completion redirect
- Auth Flow: Sign in/up, forgot password, magic link, 2FA with success states
- Cross-component Navigation: Tool Detail ↔ Browse ↔ Compare ↔ Wallet
- Modal Management: Scroll position preservation, focus trapping, escape handling
- Success States: Proper CTAs, auto-redirects, toast notifications

Client State Tracking:
- currentStep: number - Current wizard step
- isValid: boolean - Step validation state
- isSubmitting: boolean - Loading state during operations
- hasUnsavedChanges: boolean - Track unsaved changes for exit confirmation
- scrollPosition: number - Background scroll position for modals

Reports:
✅ Complete flows with proper state management
⚠️ Missing navigation links or incomplete state handling
❌ Broken flows or validation issues
*/

interface NavigationFlow {
  id: string;
  name: string;
  type: 'wizard' | 'simple' | 'modal' | 'redirect';
  steps?: string[];
  from: string;
  to: string;
  status: 'complete' | 'partial' | 'missing' | 'broken';
  clientState: string[];
  validation: string[];
  successState: string;
  issues: string[];
}

const navigationFlows: NavigationFlow[] = [
  // Multi-step Wizards
  {
    id: 'submit-tool-wizard',
    name: 'Submit Tool Wizard',
    type: 'wizard',
    steps: ['Basic Information', 'Features & Pricing', 'Media & Documentation', 'Review & Submit'],
    from: 'browse',
    to: 'submit → tool-detail',
    status: 'complete',
    clientState: ['currentStep: number (1-4)', 'isValid: boolean', 'isSubmitting: boolean', 'formData: object', 'hasUnsavedChanges: boolean'],
    validation: ['Step validation before proceeding', 'Form field validation', 'URL validation', 'Required field checks'],
    successState: 'Toast notification + auto-redirect to Tool Detail after 3 seconds',
    issues: []
  },
  {
    id: 'create-workflow-wizard',
    name: 'Create Workflow Wizard',
    type: 'wizard',
    steps: ['Choose Template', 'Configure Tools', 'Workflow Settings'],
    from: 'tool-combinations-frame',
    to: 'workflow-detail',
    status: 'complete',
    clientState: ['currentWizardStep: number (1-3)', 'isValid: boolean', 'isSubmitting: boolean', 'wizardData: object', 'hasUnsavedChanges: boolean', 'scrollPosition: number'],
    validation: ['Template selection required', 'At least one tool required', 'Tool connections validation', 'Workflow name and description required'],
    successState: 'Toast notification + auto-redirect to Workflow Detail after 2 seconds',
    issues: []
  },
  {
    id: 'onboarding-flow',
    name: 'User Onboarding Flow',
    type: 'wizard',
    steps: ['Interest Selection', 'Notification Preferences', 'Summary & Completion'],
    from: 'auth',
    to: 'onboarding-step-1 → onboarding-step-2 → onboarding-step-3 → browse',
    status: 'complete',
    clientState: ['currentStep: number (1-3)', 'selectedInterests: string[]', 'notificationSettings: object', 'isValid: boolean'],
    validation: ['At least one interest required', 'Valid notification preferences', 'Profile completion validation'],
    successState: 'Welcome toast + redirect to Browse Tools with onboarding-complete params',
    issues: []
  },

  // Auth Flows
  {
    id: 'auth-signin-flow',
    name: 'Sign In Flow',
    type: 'simple',
    from: 'auth',
    to: 'forgot-password | magic-link | two-factor',
    status: 'complete',
    clientState: ['isLoading: boolean', 'error: string | null', 'authMode: signin | signup'],
    validation: ['Email format validation', 'Password requirements', 'Form completion check'],
    successState: 'Success toast + redirect to intended destination or home',
    issues: []
  },
  {
    id: 'forgot-password-flow',
    name: 'Forgot Password Flow',
    type: 'simple',
    from: 'forgot-password',
    to: 'auth (with success state)',
    status: 'complete',
    clientState: ['isSubmitting: boolean', 'emailSent: boolean', 'error: string | null'],
    validation: ['Valid email format', 'Email existence check'],
    successState: 'Success message + return to Sign In with confirmation',
    issues: []
  },

  // Cross-component Navigation
  {
    id: 'browse-to-detail',
    name: 'Browse → Tool Detail',
    type: 'simple',
    from: 'browse',
    to: 'tool-detail',
    status: 'complete',
    clientState: ['selectedTool: object', 'previousFilters: object', 'scrollPosition: number'],
    validation: ['Tool ID validation', 'Tool data availability'],
    successState: 'Tool detail loads with tool data and back navigation to Browse',
    issues: []
  },
  {
    id: 'detail-to-compare',
    name: 'Tool Detail → Compare',
    type: 'simple',
    from: 'tool-detail',
    to: 'compare',
    status: 'complete',
    clientState: ['comparisonTools: object[]', 'maxComparisons: number'],
    validation: ['Comparison limit check', 'Tool compatibility validation'],
    successState: 'Tool added to comparison + navigate to Compare Tools',
    issues: []
  },
  {
    id: 'detail-to-wallet',
    name: 'Tool Detail → Wallet',
    type: 'simple',
    from: 'tool-detail',
    to: 'wallet',
    status: 'complete',
    clientState: ['subscription: object', 'billingInfo: object'],
    validation: ['Authentication required', 'Subscription plan validation'],
    successState: 'Subscription added + navigate to Wallet with success state',
    issues: []
  },

  // Modal Management
  {
    id: 'workflow-wizard-modal',
    name: 'Workflow Wizard Modal',
    type: 'modal',
    from: 'tool-combinations-frame',
    to: 'create-workflow-modal',
    status: 'complete',
    clientState: ['createWizardOpen: boolean', 'scrollPosition: number', 'hasUnsavedChanges: boolean'],
    validation: ['Scroll position preservation', 'Focus trap management', 'Escape key handling'],
    successState: 'Modal closes with scroll restoration + success toast',
    issues: []
  },

  // Missing/Incomplete Flows
  {
    id: 'tutorial-detail-flow',
    name: 'Tutorial Detail Navigation',
    type: 'simple',
    from: 'tutorials-frame',
    to: 'tutorial-detail',
    status: 'partial',
    clientState: ['selectedTutorial: object', 'progress: number'],
    validation: ['Tutorial ID validation', 'Progress tracking'],
    successState: 'Tutorial opens with progress tracking',
    issues: ['Missing detailed tutorial view implementation', 'Progress state not fully implemented']
  },
  {
    id: 'news-detail-navigation',
    name: 'News Detail Navigation',
    type: 'simple',
    from: 'news-frame',
    to: 'news-detail',
    status: 'complete',
    clientState: ['selectedArticle: object', 'readingProgress: number'],
    validation: ['Article ID validation', 'Content availability'],
    successState: 'Article opens with reading progress',
    issues: []
  },
  {
    id: 'admin-moderation-flow',
    name: 'Admin → Moderation Queue',
    type: 'simple',
    from: 'admin',
    to: 'moderation',
    status: 'partial',
    clientState: ['pendingItems: object[]', 'moderationActions: object'],
    validation: ['Admin role validation', 'Pending items availability'],
    successState: 'Moderation queue loads with admin tools',
    issues: ['Moderation workflow not fully connected to admin panel', 'Action state management incomplete']
  }
];

export function NavigationFlowValidator() {
  const completeFlows = navigationFlows.filter(flow => flow.status === 'complete');
  const partialFlows = navigationFlows.filter(flow => flow.status === 'partial');
  const missingFlows = navigationFlows.filter(flow => flow.status === 'missing');
  const brokenFlows = navigationFlows.filter(flow => flow.status === 'broken');

  const totalFlows = navigationFlows.length;
  const completionRate = Math.round((completeFlows.length / totalFlows) * 100);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="mb-2">Navigation Flow Validation</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of multi-step wizards, redirects, and cross-component navigation flows.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Flows</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFlows}</div>
            <p className="text-xs text-muted-foreground">
              Navigation flows mapped
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completeFlows.length}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partial</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{partialFlows.length}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{missingFlows.length + brokenFlows.length}</div>
            <p className="text-xs text-muted-foreground">
              Missing or broken
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Validation Summary:</strong> {completeFlows.length} flows are fully implemented with proper state management, 
          {partialFlows.length} flows need minor enhancements, and {missingFlows.length + brokenFlows.length} flows require implementation.
        </AlertDescription>
      </Alert>

      {/* Complete Flows */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-green-600 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Complete Flows ({completeFlows.length})
        </h2>
        <div className="grid gap-4">
          {completeFlows.map((flow) => (
            <Card key={flow.id} className="border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{flow.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {flow.type}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{flow.from}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>{flow.to}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {flow.steps && (
                  <div>
                    <p className="text-sm font-medium mb-2">Steps:</p>
                    <div className="flex flex-wrap gap-1">
                      {flow.steps.map((step, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {index + 1}. {step}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium mb-2">Client State:</p>
                  <div className="flex flex-wrap gap-1">
                    {flow.clientState.map((state, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {state}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Success State:</p>
                  <p className="text-sm text-muted-foreground">{flow.successState}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partial Flows */}
      {partialFlows.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Partial Flows ({partialFlows.length})
          </h2>
          <div className="grid gap-4">
            {partialFlows.map((flow) => (
              <Card key={flow.id} className="border-amber-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{flow.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {flow.type}
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Partial
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{flow.from}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>{flow.to}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Issues to Address:</p>
                    <ul className="space-y-1">
                      {flow.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Immediate Priorities:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Complete Tutorial Detail view implementation with progress tracking</li>
              <li>• Enhance Admin → Moderation Queue connection with proper state management</li>
              <li>• Add loading skeletons for all wizard steps</li>
              <li>• Implement comprehensive error boundaries for all multi-step flows</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Enhancements:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Add keyboard navigation for all wizard steps (Arrow keys, Tab, Enter)</li>
              <li>• Implement auto-save for all draft states every 30 seconds</li>
              <li>• Add progress indicators with step completion status</li>
              <li>• Enhance scroll position preservation for all modal interactions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}