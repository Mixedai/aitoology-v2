import { 
  Grid3X3, 
  List, 
  BarChart3, 
  FileText, 
  Megaphone, 
  Cog, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Palette, 
  Target, 
  TrendingUp, 
  Clock, 
  Star 
} from 'lucide-react';

export const workflowCategories = [
  { id: 'all', name: 'All Categories', icon: Grid3X3 },
  { id: 'content', name: 'Content Creation', icon: FileText },
  { id: 'analytics', name: 'Data Analytics', icon: BarChart3 },
  { id: 'marketing', name: 'Marketing', icon: Megaphone },
  { id: 'automation', name: 'Automation', icon: Cog },
  { id: 'research', name: 'Research', icon: BookOpen },
  { id: 'social-media', name: 'Social Media', icon: Users },
  { id: 'customer-service', name: 'Customer Service', icon: MessageCircle },
  { id: 'design', name: 'Design', icon: Palette },
  { id: 'productivity', name: 'Productivity', icon: Target }
];

export const sortOptions = [
  { id: 'popular', name: 'Most Popular', icon: TrendingUp },
  { id: 'newest', name: 'Newest', icon: Clock },
  { id: 'rating', name: 'Highest Rated', icon: Star },
  { id: 'uses', name: 'Most Used', icon: Users },
  { id: 'complexity', name: 'Complexity', icon: BarChart3 }
];

export const comparisonViews = [
  { id: 'table', label: 'Table View', icon: Grid3X3 },
  { id: 'cards', label: 'Card View', icon: List },
  { id: 'insights', label: 'Insights', icon: BarChart3 }
];

export const WIZARD_STEPS = {
  TEMPLATE_SELECTION: 1,
  WORKFLOW_BUILDER: 2,
  CONFIGURATION: 3,
  TEST_PUBLISH: 4
} as const;

export const NODE_DEFAULT_SIZE = {
  width: 200,
  height: 120
} as const;

export const CANVAS_SETTINGS = {
  DEFAULT_ZOOM: 1,
  MIN_ZOOM: 0.5,
  MAX_ZOOM: 2,
  ZOOM_STEP: 1.2,
  GRID_SIZE: 20
} as const;