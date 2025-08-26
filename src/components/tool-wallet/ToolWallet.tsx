import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Upload, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Bell,
  Clock,
  CreditCard,
  Download,
  PieChart as PieChartIcon,
  BarChart3,
  PauseCircle,
  X,
  Wallet,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Users,
  Code,
  Palette,
  BarChart4,
  MessageSquare,
  Briefcase,
  Eye,
  EyeOff,
  RefreshCcw,
  Settings,
  Filter,
  Search,
  Moon,
  Sun
} from 'lucide-react';

/*
Enhanced Tool Wallet Implementation Notes:

Tailwind Classes:
- Dashboard Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 for responsive metrics layout
- Chart Containers: h-[300px] lg:h-[400px] relative for responsive chart sizing
- Category Pills: flex flex-wrap gap-2 mb-4 for category filter layout
- Renewal Cards: border-l-4 for color-coded urgency indicators
- Modal Layout: space-y-6 max-h-[80vh] overflow-y-auto for scrollable form content
- Empty States: flex flex-col items-center justify-center py-12 text-center
- Dark Mode: dark:bg-slate-900 dark:text-slate-100 for theme variants

Chart Styling:
- Primary colors from CSS variables: hsl(var(--primary)), hsl(var(--chart-1))
- Category colors: --chart-1 through --chart-5 for consistent color mapping
- Responsive containers with min-height constraints
- Custom tooltips with proper formatting and dark mode support

Responsive Design:
- Mobile: Single column layout, simplified charts, bottom sheet modals
- Tablet: Two-column grid, compact charts with horizontal scrolling
- Desktop: Full dashboard with side-by-side charts and expanded controls

Interactive Features:
- Chart period toggles (6 months, 12 months, 2 years)
- Category filtering with visual indicators
- Renewal snooze/dismiss with optimistic UI updates
- Search and filtering for subscription management
- Dark mode toggle with system preference detection

Accessibility:
- Proper ARIA labels for chart data
- Keyboard navigation for all interactive elements
- Screen reader friendly renewal alerts
- High contrast mode compatible colors
*/

// Enhanced mock data with categories and more detailed information
const monthlySpendData = [
  { month: 'Jul 23', spend: 245, categories: { ai: 120, design: 60, productivity: 45, development: 20 } },
  { month: 'Aug 23', spend: 289, categories: { ai: 140, design: 75, productivity: 54, development: 20 } },
  { month: 'Sep 23', spend: 267, categories: { ai: 135, design: 60, productivity: 52, development: 20 } },
  { month: 'Oct 23', spend: 324, categories: { ai: 160, design: 84, productivity: 60, development: 20 } },
  { month: 'Nov 23', spend: 398, categories: { ai: 200, design: 98, productivity: 80, development: 20 } },
  { month: 'Dec 23', spend: 445, categories: { ai: 225, design: 110, productivity: 90, development: 20 } },
  { month: 'Jan 24', spend: 423, categories: { ai: 210, design: 103, productivity: 90, development: 20 } },
  { month: 'Feb 24', spend: 467, categories: { ai: 240, design: 117, productivity: 90, development: 20 } },
  { month: 'Mar 24', spend: 501, categories: { ai: 260, design: 131, productivity: 90, development: 20 } },
  { month: 'Apr 24', spend: 489, categories: { ai: 250, design: 129, productivity: 90, development: 20 } },
  { month: 'May 24', spend: 523, categories: { ai: 275, design: 138, productivity: 90, development: 20 } },
  { month: 'Jun 24', spend: 578, categories: { ai: 315, design: 153, productivity: 90, development: 20 } },
];

const categoryData = [
  { name: 'AI Tools', value: 315, color: '#FF6B35', icon: Zap },
  { name: 'Design', value: 153, color: '#4A5C7A', icon: Palette },
  { name: 'Productivity', value: 90, color: '#10B981', icon: Target },
  { name: 'Development', value: 20, color: '#EAB308', icon: Code }
];

const currentSubscriptions = [
  {
    id: 1,
    tool: 'ChatGPT Plus',
    plan: 'Plus',
    cycle: 'Monthly',
    nextBilling: '2024-01-15',
    cost: 20,
    currency: 'USD',
    status: 'active',
    category: 'AI Tools',
    description: 'Advanced AI assistant for writing and coding',
    logo: '🤖',
    website: 'https://openai.com',
    features: ['GPT-4 Access', 'Faster Response', 'Priority Access']
  },
  {
    id: 2,
    tool: 'Figma',
    plan: 'Professional',
    cycle: 'Annual',
    nextBilling: '2024-03-10',
    cost: 144,
    currency: 'USD',
    status: 'active',
    category: 'Design',
    description: 'Collaborative design platform',
    logo: '🎨',
    website: 'https://figma.com',
    features: ['Unlimited Projects', 'Version History', 'Team Libraries']
  },
  {
    id: 3,
    tool: 'Notion AI',
    plan: 'Plus',
    cycle: 'Monthly',
    nextBilling: '2024-01-08',
    cost: 10,
    currency: 'USD',
    status: 'active',
    category: 'Productivity',
    description: 'AI-powered workspace and note-taking',
    logo: '📝',
    website: 'https://notion.so',
    features: ['AI Writing', 'Unlimited Blocks', 'Team Collaboration']
  },
  {
    id: 4,
    tool: 'Canva Pro',
    plan: 'Pro',
    cycle: 'Annual',
    nextBilling: '2024-02-22',
    cost: 119.99,
    currency: 'USD',
    status: 'cancelled',
    category: 'Design',
    description: 'Professional design tool with templates',
    logo: '🎯',
    website: 'https://canva.com',
    features: ['Premium Templates', 'Brand Kit', 'Background Remover']
  },
  {
    id: 5,
    tool: 'GitHub Copilot',
    plan: 'Individual',
    cycle: 'Monthly',
    nextBilling: '2024-01-12',
    cost: 10,
    currency: 'USD',
    status: 'active',
    category: 'Development',
    description: 'AI pair programmer',
    logo: '💻',
    website: 'https://github.com/features/copilot',
    features: ['Code Completion', 'Chat Interface', 'CLI Integration']
  },
  {
    id: 6,
    tool: 'Midjourney',
    plan: 'Standard',
    cycle: 'Monthly',
    nextBilling: '2024-01-18',
    cost: 30,
    currency: 'USD',
    status: 'active',
    category: 'AI Tools',
    description: 'AI image generation platform',
    logo: '🎭',
    website: 'https://midjourney.com',
    features: ['Unlimited Generations', 'Stealth Mode', 'Member Gallery']
  }
];

const upcomingRenewals = [
  {
    id: 1,
    tool: 'Notion AI',
    amount: 10,
    currency: 'USD',
    renewalDate: '2024-01-08',
    daysUntil: 3,
    snoozed: false,
    category: 'Productivity',
    logo: '📝'
  },
  {
    id: 2,
    tool: 'GitHub Copilot',
    amount: 10,
    currency: 'USD',
    renewalDate: '2024-01-12',
    daysUntil: 7,
    snoozed: false,
    category: 'Development',
    logo: '💻'
  },
  {
    id: 3,
    tool: 'ChatGPT Plus',
    amount: 20,
    currency: 'USD',
    renewalDate: '2024-01-15',
    daysUntil: 10,
    snoozed: false,
    category: 'AI Tools',
    logo: '🤖'
  },
  {
    id: 4,
    tool: 'Midjourney',
    amount: 30,
    currency: 'USD',
    renewalDate: '2024-01-18',
    daysUntil: 13,
    snoozed: false,
    category: 'AI Tools',
    logo: '🎭'
  },
  {
    id: 5,
    tool: 'Adobe Creative Cloud',
    amount: 52.99,
    currency: 'USD',
    renewalDate: '2024-01-20',
    daysUntil: 15,
    snoozed: true,
    category: 'Design',
    logo: '🎨'
  },
];

export function ToolWallet() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [renewals, setRenewals] = useState(upcomingRenewals);
  const [subscriptionsCollapsed, setSubscriptionsCollapsed] = useState(false);
  const [renewalsCollapsed, setRenewalsCollapsed] = useState(false);
  const [chartsCollapsed, setChartsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chartPeriod, setChartPeriod] = useState('12m');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSnoozed, setShowSnoozed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newSubscription, setNewSubscription] = useState({
    tool: '',
    plan: '',
    currency: 'USD',
    cycle: 'monthly',
    amount: '',
    startDate: '',
    category: '',
    description: '',
    website: ''
  });

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('tool-wallet-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('tool-wallet-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Calculate enhanced insights
  const totalMonthlySpend = currentSubscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => {
      const monthlyCost = sub.cycle === 'Annual' ? sub.cost / 12 : sub.cost;
      return total + monthlyCost;
    }, 0);

  const totalAnnualSpend = totalMonthlySpend * 12;
  const activeSubscriptions = currentSubscriptions.filter(sub => sub.status === 'active').length;
  const cancelledThisMonth = currentSubscriptions.filter(sub => sub.status === 'cancelled').length;
  const avgMonthlyGrowth = 12; // Mock growth percentage
  
  // Category spending breakdown
  const categorySpending = categoryData.map(cat => ({
    ...cat,
    percentage: (cat.value / totalMonthlySpend) * 100,
    monthlySpend: cat.value
  }));

  // Filtered data based on search and category
  const filteredSubscriptions = currentSubscriptions.filter(sub => {
    const matchesSearch = sub.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || sub.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredRenewals = renewals.filter(renewal => {
    if (!showSnoozed && renewal.snoozed) return false;
    return !selectedCategory || renewal.category === selectedCategory;
  });

  // Get chart data based on period
  const getChartData = () => {
    switch (chartPeriod) {
      case '6m':
        return monthlySpendData.slice(-6);
      case '24m':
        return [...monthlySpendData, ...monthlySpendData.slice(-12).map(item => ({
          ...item,
          month: item.month.replace('24', '25'),
          spend: item.spend * 1.1
        }))];
      default:
        return monthlySpendData;
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!newSubscription.tool.trim()) {
      errors.tool = 'Tool name is required';
    }
    
    if (!newSubscription.amount || parseFloat(newSubscription.amount) <= 0) {
      errors.amount = 'Please enter a valid amount greater than 0';
    }
    
    if (!newSubscription.category) {
      errors.category = 'Please select a category';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSnoozeRenewal = (id: number) => {
    setRenewals(renewals.map(renewal => 
      renewal.id === id ? { ...renewal, snoozed: true } : renewal
    ));
    toast.success('Renewal reminder snoozed for 7 days');
  };

  const handleDismissRenewal = (id: number) => {
    setRenewals(renewals.filter(renewal => renewal.id !== id));
    toast.success('Renewal reminder dismissed');
  };

  const handleAddSubscription = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`${newSubscription.tool} subscription added successfully!`);
      setIsAddModalOpen(false);
      setNewSubscription({
        tool: '',
        plan: '',
        currency: 'USD',
        cycle: 'monthly',
        amount: '',
        startDate: '',
        category: '',
        description: '',
        website: ''
      });
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to add subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImportCSV = () => {
    toast.success('CSV import feature coming soon!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRenewalUrgency = (daysUntil: number) => {
    if (daysUntil <= 3) return 'urgent';
    if (daysUntil <= 7) return 'warning';
    return 'normal';
  };

  const getRenewalIcon = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Calendar className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const EmptyState = ({ icon: Icon, title, description, action }: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    action?: React.ReactNode;
  }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-primary rounded-lg flex items-center justify-center">
                <Wallet className="w-4 md:w-5 h-4 md:h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl">My Tool Wallet</h1>
                <p className="text-muted-foreground text-sm md:text-base">Track and optimize your AI tool subscriptions</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 text-sm">
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                ${totalMonthlySpend.toFixed(0)}/month
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Target className="w-3 h-3" />
                {activeSubscriptions} active tools
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Sun className={`w-4 h-4 ${!darkMode ? 'text-foreground' : 'text-muted-foreground'}`} />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className={`w-4 h-4 ${darkMode ? 'text-foreground' : 'text-muted-foreground'}`} />
            </div>
            <Button variant="outline" onClick={handleImportCSV} className="gap-2 flex-1 sm:flex-none">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import CSV</span>
              <span className="sm:hidden">Import</span>
            </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 flex-1 sm:flex-none">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Subscription</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-full mx-4">
                <DialogHeader>
                  <DialogTitle>Add New Subscription</DialogTitle>
                  <DialogDescription>
                    Track a new tool subscription to monitor your spending and renewals.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tool">Tool Name *</Label>
                        <Input
                          id="tool"
                          placeholder="e.g. ChatGPT Plus"
                          value={newSubscription.tool}
                          onChange={(e) => setNewSubscription({...newSubscription, tool: e.target.value})}
                          className={validationErrors.tool ? 'border-destructive' : ''}
                        />
                        {validationErrors.tool && (
                          <p className="text-sm text-destructive">{validationErrors.tool}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="plan">Plan</Label>
                        <Input
                          id="plan"
                          placeholder="e.g. Plus, Pro"
                          value={newSubscription.plan}
                          onChange={(e) => setNewSubscription({...newSubscription, plan: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={newSubscription.category} 
                        onValueChange={(value) => setNewSubscription({...newSubscription, category: value})}
                      >
                        <SelectTrigger className={validationErrors.category ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AI Tools">🤖 AI Tools</SelectItem>
                          <SelectItem value="Design">🎨 Design</SelectItem>
                          <SelectItem value="Productivity">📝 Productivity</SelectItem>
                          <SelectItem value="Development">💻 Development</SelectItem>
                          <SelectItem value="Marketing">📈 Marketing</SelectItem>
                          <SelectItem value="Analytics">📊 Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.category && (
                        <p className="text-sm text-destructive">{validationErrors.category}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Brief description of the tool"
                        value={newSubscription.description}
                        onChange={(e) => setNewSubscription({...newSubscription, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={newSubscription.currency} onValueChange={(value) => setNewSubscription({...newSubscription, currency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="CAD">CAD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cycle">Billing Cycle</Label>
                        <Select value={newSubscription.cycle} onValueChange={(value) => setNewSubscription({...newSubscription, cycle: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={newSubscription.amount}
                          onChange={(e) => setNewSubscription({...newSubscription, amount: e.target.value})}
                          className={validationErrors.amount ? 'border-destructive' : ''}
                        />
                        {validationErrors.amount && (
                          <p className="text-sm text-destructive">{validationErrors.amount}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newSubscription.startDate}
                          onChange={(e) => setNewSubscription({...newSubscription, startDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://example.com"
                          value={newSubscription.website}
                          onChange={(e) => setNewSubscription({...newSubscription, website: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddModalOpen(false)} 
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddSubscription} 
                      className="flex-1 gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCcw className="w-4 h-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add Subscription
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalMonthlySpend.toFixed(2)}</div>
              <div className="flex items-center gap-1 text-xs">
                <ArrowUpRight className="w-3 h-3 text-success" />
                <span className="text-success">+{avgMonthlyGrowth}%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Projection</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAnnualSpend.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">
                based on current subscriptions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tools</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground">
                subscriptions active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Renewals Due</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{renewals.filter(r => !r.snoozed && r.daysUntil <= 14).length}</div>
              <p className="text-xs text-muted-foreground">
                in next 14 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Spend Analytics */}
        <Card>
          <Collapsible open={!chartsCollapsed} onOpenChange={(open) => setChartsCollapsed(!open)}>
            <CardHeader className="cursor-pointer" onClick={() => setChartsCollapsed(!chartsCollapsed)}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Spend Analytics
                  </CardTitle>
                  <CardDescription>Track your spending patterns and category breakdown</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Button
                      variant={chartPeriod === '6m' ? 'default' : 'outline'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChartPeriod('6m');
                      }}
                    >
                      6M
                    </Button>
                    <Button
                      variant={chartPeriod === '12m' ? 'default' : 'outline'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChartPeriod('12m');
                      }}
                    >
                      12M
                    </Button>
                    <Button
                      variant={chartPeriod === '24m' ? 'default' : 'outline'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChartPeriod('24m');
                      }}
                    >
                      2Y
                    </Button>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {chartsCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="timeline" className="gap-2">
                      <BarChart4 className="w-4 h-4" />
                      Spending Timeline
                    </TabsTrigger>
                    <TabsTrigger value="categories" className="gap-2">
                      <PieChartIcon className="w-4 h-4" />
                      Category Breakdown
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="timeline" className="space-y-4">
                    <div className="h-[300px] lg:h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getChartData()}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 12 }}
                            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                          />
                          <Tooltip 
                            formatter={(value) => [`$${value}`, 'Spend']}
                            labelFormatter={(label) => `Month: ${label}`}
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              fontSize: '14px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="spend" 
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary))" 
                            fillOpacity={0.1}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="categories" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, value }) => `${name}: $${value}`}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`$${value}`, 'Spend']}
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Category Breakdown</h4>
                        {categorySpending.map((category) => {
                          const IconComponent = category.icon;
                          return (
                            <div key={category.name} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4" style={{ color: category.color }} />
                                  <span>{category.name}</span>
                                </div>
                                <span className="font-medium">${category.monthlySpend}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={category.percentage} 
                                  className="flex-1 h-2"
                                />
                                <span className="text-xs text-muted-foreground w-12 text-right">
                                  {category.percentage.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Enhanced Upcoming Renewals */}
        <Card>
          <Collapsible open={!renewalsCollapsed} onOpenChange={(open) => setRenewalsCollapsed(!open)}>
            <CardHeader className="cursor-pointer" onClick={() => setRenewalsCollapsed(!renewalsCollapsed)}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Upcoming Renewals
                    {filteredRenewals.length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {filteredRenewals.length}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Tools that will renew soon</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Switch
                      checked={showSnoozed}
                      onCheckedChange={setShowSnoozed}
                      size="sm"
                    />
                    <span className="text-muted-foreground">Show snoozed</span>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {renewalsCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {filteredRenewals.length === 0 ? (
                  <EmptyState
                    icon={CheckCircle}
                    title="All caught up!"
                    description="No upcoming renewals to worry about. You're all set for now."
                  />
                ) : (
                  <div className="space-y-3">
                    {filteredRenewals.map((renewal) => {
                      const urgency = getRenewalUrgency(renewal.daysUntil);
                      return (
                        <Alert 
                          key={renewal.id} 
                          className={`transition-all ${
                            urgency === 'urgent' 
                              ? 'border-l-4 border-l-destructive bg-destructive/5' 
                              : urgency === 'warning'
                              ? 'border-l-4 border-l-warning bg-warning/5'
                              : 'border-l-4 border-l-muted'
                          } ${renewal.snoozed ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{renewal.logo}</span>
                                {getRenewalIcon(urgency)}
                              </div>
                              <div>
                                <AlertTitle className="text-base">{renewal.tool}</AlertTitle>
                                <AlertDescription className="flex items-center gap-4 mt-1">
                                  <span>${renewal.amount} {renewal.currency}</span>
                                  <span>•</span>
                                  <span>Renews in {renewal.daysUntil} days</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {renewal.category}
                                  </Badge>
                                  {renewal.snoozed && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="secondary" className="text-xs gap-1">
                                        <PauseCircle className="w-3 h-3" />
                                        Snoozed
                                      </Badge>
                                    </>
                                  )}
                                </AlertDescription>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!renewal.snoozed && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleSnoozeRenewal(renewal.id)}
                                  className="gap-1"
                                >
                                  <PauseCircle className="w-3 h-3" />
                                  Snooze
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDismissRenewal(renewal.id)}
                                className="gap-1 text-muted-foreground hover:text-foreground"
                              >
                                <X className="w-3 h-3" />
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        </Alert>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Enhanced Current Subscriptions */}
        <Card>
          <Collapsible open={!subscriptionsCollapsed} onOpenChange={(open) => setSubscriptionsCollapsed(!open)}>
            <CardHeader className="cursor-pointer" onClick={() => setSubscriptionsCollapsed(!subscriptionsCollapsed)}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Current Subscriptions
                  </CardTitle>
                  <CardDescription>Manage your active and cancelled subscriptions</CardDescription>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {subscriptionsCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search subscriptions..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === null ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All
                    </Button>
                    {categoryData.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Button
                          key={category.name}
                          variant={selectedCategory === category.name ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category.name)}
                          className="gap-1"
                        >
                          <IconComponent className="w-3 h-3" />
                          {category.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {filteredSubscriptions.length === 0 ? (
                  <EmptyState
                    icon={searchQuery ? Search : CreditCard}
                    title={searchQuery ? "No matching subscriptions" : "No subscriptions tracked yet"}
                    description={
                      searchQuery 
                        ? "Try adjusting your search terms or filters"
                        : "Start tracking your tool subscriptions to monitor spending and renewals"
                    }
                    action={
                      !searchQuery && (
                        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
                          <Plus className="w-4 h-4" />
                          Add Your First Subscription
                        </Button>
                      )
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {/* Desktop Table */}
                    <div className="hidden lg:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tool</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Billing</TableHead>
                            <TableHead>Next Billing</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSubscriptions.map((subscription) => {
                            const categoryInfo = categoryData.find(cat => cat.name === subscription.category);
                            const CategoryIcon = categoryInfo?.icon || Zap;
                            
                            return (
                              <TableRow key={subscription.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{subscription.logo}</span>
                                    <div>
                                      <div className="font-medium">{subscription.tool}</div>
                                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                                        {subscription.description}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="gap-1">
                                    <CategoryIcon className="w-3 h-3" />
                                    {subscription.category}
                                  </Badge>
                                </TableCell>
                                <TableCell>{subscription.plan}</TableCell>
                                <TableCell>{subscription.cycle}</TableCell>
                                <TableCell>{new Date(subscription.nextBilling).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">${subscription.cost} {subscription.currency}</TableCell>
                                <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="w-4 h-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile/Tablet Cards */}
                    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredSubscriptions.map((subscription) => {
                        const categoryInfo = categoryData.find(cat => cat.name === subscription.category);
                        const CategoryIcon = categoryInfo?.icon || Zap;
                        
                        return (
                          <Card key={subscription.id} className="relative">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{subscription.logo}</span>
                                  <div>
                                    <h3 className="font-medium">{subscription.tool}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {subscription.plan} • {subscription.cycle}
                                    </p>
                                  </div>
                                </div>
                                {getStatusBadge(subscription.status)}
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Category</span>
                                  <Badge variant="outline" className="gap-1">
                                    <CategoryIcon className="w-3 h-3" />
                                    {subscription.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Next billing</span>
                                  <span>{new Date(subscription.nextBilling).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-muted-foreground">Cost</span>
                                  <span className="font-medium">${subscription.cost} {subscription.currency}</span>
                                </div>
                                {subscription.description && (
                                  <p className="text-muted-foreground text-xs pt-2 border-t">
                                    {subscription.description}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" className="flex-1">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
}