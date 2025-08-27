

export interface NavigationProps {
  onNavigate: (from: string, to: string, params?: any) => void;
  currentScreen: string;
  isAuthenticated?: boolean;
  params?: any;
  selectedItem?: any;
  detailView?: boolean;
  navigationState?: string | null;
}

export interface Tool {
  id: string;
  name: string;
  icon: any;
  category: string;
  description: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  rating: number;
  capabilities: string[];
  inputTypes: string[];
  outputTypes: string[];
  apiIntegration: boolean;
  realtime: boolean;
  complexity: 'Simple' | 'Intermediate' | 'Advanced';
  setupTime: string;
  documentation: {
    hasGuide: boolean;
    tutorialCount: number;
    apiDocs: boolean;
  };
  integrations: string[];
  tags: string[];
  featured: boolean;
  trending: boolean;
}

export interface WorkflowNode {
  id: string;
  toolId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  config: Record<string, any>;
  inputs: Array<{ 
    id: string; 
    type: string; 
    label: string;
    required: boolean;
    connected: boolean;
    value?: any;
  }>;
  outputs: Array<{ 
    id: string; 
    type: string; 
    label: string;
    connected: boolean;
    value?: any;
  }>;
  status: 'idle' | 'running' | 'success' | 'error' | 'warning';
  executionTime?: number;
  lastRun?: string;
  errors?: string[];
  logs?: string[];
}

export interface WorkflowConnection {
  id: string;
  fromNodeId: string;
  fromOutputId: string;
  toNodeId: string;
  toInputId: string;
  type: 'data' | 'trigger' | 'condition';
  label?: string;
  validated: boolean;
  dataType: string;
  transformations?: any[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  tools: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  previewNodes: WorkflowNode[];
  previewConnections: WorkflowConnection[];
  isPopular: boolean;
  uses: number;
  rating: number;
  tags: string[];
  author: string;
  authorAvatar?: string;
  lastUpdated: string;
  screenshots: string[];
  useCases: string[];
  requirements: string[];
  outputs: string[];
  aiSuggested: boolean;
  difficulty: number;
  businessValue: string;
  roi: string;
  timeToValue: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  tools: string[];
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  steps: number;
  estimatedTime: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  uses: number;
  views: number;
  forks: number;
  tags: string[];
  thumbnail: string;
  isPublic: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  lastUpdated: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  version: string;
  status: 'Draft' | 'Published' | 'Archived';
  performance: {
    successRate: number;
    avgExecutionTime: number;
    lastRun: string;
  };
  analytics: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    avgRating: number;
  };
}

export interface TestResult {
  id: string;
  nodeId: string;
  status: 'passed' | 'failed' | 'warning' | 'skipped';
  message: string;
  executionTime: number;
  timestamp: string;
  input?: any;
  output?: any;
  error?: string;
}

export interface WizardState {
  open: boolean;
  currentStep: number;
  isValid: boolean;
  isSubmitting: boolean;
  isDraft: boolean;
  hasUnsavedChanges: boolean;
  scrollPosition: number;
  aiAssistant: {
    enabled: boolean;
    suggestions: any[];
    analyzing: boolean;
  };
  collaboration: {
    enabled: boolean;
    collaborators: any[];
    changes: any[];
  };
  data: {
    template: WorkflowTemplate | null;
    importType: 'template' | 'file' | 'blank' | 'ai-generated' | 'from-url';
    importData: any;
    aiPrompt: string;
    templateFilters: {
      category: string[];
      complexity: string[];
      useCases: string[];
    };
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
    canvasViewport: { x: number; y: number; zoom: number };
    selectedNodes: string[];
    selectedConnections: string[];
    clipboard: any[];
    history: {
      past: any[];
      present: any;
      future: any[];
    };
    gridSettings: {
      enabled: boolean;
      size: number;
      snapToGrid: boolean;
    };
    name: string;
    description: string;
    category: string;
    tags: string[];
    isPublic: boolean;
    allowRemix: boolean;
    allowFork: boolean;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    estimatedExecutionTime: number;
    businessValue: string;
    useCases: string[];
    requirements: string[];
    testResults: TestResult[];
    testConfiguration: {
      runAllTests: boolean;
      enableMocks: boolean;
      timeout: number;
      retries: number;
    };
    performanceMetrics: {
      estimatedCost: number;
      estimatedTime: number;
      reliability: number;
    };
    publishSettings: {
      immediately: boolean;
      scheduledDate?: string;
      notifyFollowers: boolean;
      submitToGallery: boolean;
      makeTemplate: boolean;
      addToCollection?: string;
    };
    collaboration: {
      enableTeamAccess: boolean;
      teamMembers: string[];
      permissions: 'view' | 'edit' | 'admin';
    };
    monitoring: {
      enableAlerts: boolean;
      alertEmail: string;
      alertConditions: string[];
    };
  };
  validationErrors: Record<string, string>;
}