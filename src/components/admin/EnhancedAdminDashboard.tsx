import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { 
  Settings, 
  Plus,
  Edit, 
  Trash2, 
  Save,
  Search,
  BarChart3,
  Users,
  Package,
  TrendingUp,
  LogOut,
  Shield,
  Activity,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  Star,
  MessageSquare,
  Bell,
  ArrowDownRight,
  MoreVertical,
  ExternalLink,
  Mail
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  features: string[];
  website: string;
  image_url?: string;
  status: 'active' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
  views?: number;
  likes?: number;
  rating?: number;
  tags?: string[];
}

interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  last_sign_in?: string;
  role?: string;
  subscription_status?: string;
}

interface Activity {
  id: string;
  type: 'tool_added' | 'tool_updated' | 'user_registered' | 'review_submitted';
  description: string;
  timestamp: string;
  user?: string;
  metadata?: any;
}

interface EnhancedAdminDashboardProps {
  onNavigate?: (screenId: string) => void;
}

export function EnhancedAdminDashboard({ onNavigate }: EnhancedAdminDashboardProps) {
  const { signOut, user } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [bulkSelection, setBulkSelection] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [timeRange, setTimeRange] = useState('7d');
  const [newTool, setNewTool] = useState<Partial<Tool>>({
    name: '',
    description: '',
    category: '',
    pricing: '',
    features: [],
    website: '',
    status: 'active',
    tags: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    totalTools: 0,
    activeTools: 0,
    pendingTools: 0,
    totalUsers: 0,
    revenue: 0,
    growth: 0,
    activeUsers: 0,
    conversionRate: 0
  });

  // Chart data
  const [chartData, setChartData] = useState({
    toolsGrowth: [] as Array<{ date: string; count: number }>,
    userGrowth: [] as Array<{ date: string; count: number }>,
    categoryDistribution: [] as Array<{ category: string; count: number }>,
    revenueData: [] as Array<{ month: string; revenue: number }>
  });

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchActivities, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchTools(),
      fetchUsers(),
      fetchStats(),
      fetchActivities(),
      fetchChartData()
    ]);
  };

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error: any) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to load tools');
    }
  };

  const fetchUsers = async () => {
    try {
      // First try to get profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        setUsers([]);
        return;
      }

      // Map profiles data to users format
      const mappedUsers = profilesData?.map(profile => ({
        id: profile.id,
        email: profile.email || `user_${profile.id}@aitoologist.com`,
        full_name: profile.full_name || profile.username || 'Unknown User',
        avatar_url: profile.avatar_url || '',
        created_at: profile.created_at,
        last_sign_in: profile.updated_at || profile.created_at,
        role: 'user',
        subscription_status: 'active'
      })) || [];

      setUsers(mappedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchStats = async () => {
    try {
      // Get tools stats
      const { count: toolCount } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true });

      const { count: activeCount } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      const { count: pendingCount } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get user stats
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get active users approximation (we can't access auth.admin without service role key)
      // So we'll estimate based on profiles created recently
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: activeUserCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Get tools created in last 30 days for growth calculation
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: recentToolsCount } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      const { count: previousMonthTools } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', thirtyDaysAgo.toISOString());

      // Calculate real growth percentage
      const growth = previousMonthTools && previousMonthTools > 0 
        ? Math.round(((recentToolsCount || 0) / previousMonthTools) * 100)
        : 100;

      // Calculate revenue based on premium tools (mock pricing tiers)
      const { data: premiumTools } = await supabase
        .from('ai_tools')
        .select('pricing')
        .neq('pricing', 'Free')
        .neq('pricing', '');

      // Simple revenue calculation based on tool pricing
      let revenue = 0;
      premiumTools?.forEach(tool => {
        const price = tool.pricing?.toLowerCase();
        if (price?.includes('$')) {
          const match = price.match(/\$(\d+)/);
          if (match) {
            revenue += parseInt(match[1]) * 100; // Assume 100 users per tool
          }
        }
      });

      // Calculate conversion rate (active tools / total tools)
      const conversionRate = toolCount && toolCount > 0 
        ? Math.round(((activeCount || 0) / toolCount) * 100)
        : 0;

      setStats({
        totalTools: toolCount || 0,
        activeTools: activeCount || 0,
        pendingTools: pendingCount || 0,
        totalUsers: userCount || 0,
        revenue: revenue || 0,
        growth: growth,
        activeUsers: activeUserCount || 0,
        conversionRate: conversionRate
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values on error
      setStats({
        totalTools: 0,
        activeTools: 0,
        pendingTools: 0,
        totalUsers: 0,
        revenue: 0,
        growth: 0,
        activeUsers: 0,
        conversionRate: 0
      });
    }
  };

  const fetchActivities = async () => {
    try {
      const activities: Activity[] = [];
      
      // Get recent tools (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const { data: recentTools } = await supabase
        .from('ai_tools')
        .select('id, name, created_at, updated_at')
        .gte('created_at', oneDayAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(5);

      recentTools?.forEach(tool => {
        activities.push({
          id: `tool-${tool.id}`,
          type: 'tool_added',
          description: `New tool "${tool.name}" was added`,
          timestamp: tool.created_at,
          user: 'Admin'
        });
      });

      // Get recently updated tools (filter out tools where created_at = updated_at in JS)
      const { data: allUpdatedTools } = await supabase
        .from('ai_tools')
        .select('id, name, created_at, updated_at')
        .gte('updated_at', oneDayAgo.toISOString())
        .order('updated_at', { ascending: false })
        .limit(10);
      
      // Filter tools that were actually updated (not just created)
      const updatedTools = allUpdatedTools?.filter(tool => 
        tool.created_at !== tool.updated_at
      ).slice(0, 5);

      updatedTools?.forEach(tool => {
        activities.push({
          id: `update-${tool.id}`,
          type: 'tool_updated',
          description: `Tool "${tool.name}" was updated`,
          timestamp: tool.updated_at,
          user: 'Admin'
        });
      });

      // Get recent users (profiles table might not have email, so we select available fields)
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('id, created_at')
        .gte('created_at', oneDayAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(5);

      recentUsers?.forEach(user => {
        activities.push({
          id: `user-${user.id}`,
          type: 'user_registered',
          description: 'New user registered',
          timestamp: user.created_at,
          user: 'New User'
        });
      });

      // Sort all activities by timestamp
      activities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setActivities(activities.slice(0, 10)); // Keep only 10 most recent
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]);
    }
  };

  const fetchChartData = async () => {
    try {
      // Get tools growth for last 7 days
      const toolsGrowthData = [];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
        const { count } = await supabase
          .from('ai_tools')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfDay.toISOString())
          .lte('created_at', endOfDay.toISOString());
        
        toolsGrowthData.push({
          date: days[startOfDay.getDay()],
          count: count || 0
        });
      }

      // Get user growth for last 7 days
      const userGrowthData = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfDay.toISOString())
          .lte('created_at', endOfDay.toISOString());
        
        userGrowthData.push({
          date: days[startOfDay.getDay()],
          count: count || 0
        });
      }

      // Get category distribution
      const { data: categoryData } = await supabase
        .from('ai_tools')
        .select('category');
      
      const categoryCount: Record<string, number> = {};
      categoryData?.forEach(tool => {
        const cat = tool.category || 'Other';
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });

      const categoryDistribution = Object.entries(categoryCount)
        .map(([category, count]) => ({
          category: category.split(' ')[0], // Shorten category names
          count
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5 categories

      // Calculate monthly revenue (last 6 months)
      const revenueData = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = months[date.getMonth()];
        
        // Get tools created in that month
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const { data: monthTools } = await supabase
          .from('ai_tools')
          .select('pricing')
          .gte('created_at', startOfMonth.toISOString())
          .lte('created_at', endOfMonth.toISOString())
          .neq('pricing', 'Free')
          .neq('pricing', '');

        let monthRevenue = 0;
        monthTools?.forEach(tool => {
          const price = tool.pricing?.toLowerCase();
          if (price?.includes('$')) {
            const match = price.match(/\$(\d+)/);
            if (match) {
              monthRevenue += parseInt(match[1]) * 50; // Assume 50 users per tool per month
            }
          }
        });

        revenueData.push({
          month,
          revenue: monthRevenue
        });
      }

      setChartData({
        toolsGrowth: toolsGrowthData,
        userGrowth: userGrowthData,
        categoryDistribution,
        revenueData
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
      // Set empty data on error
      setChartData({
        toolsGrowth: [],
        userGrowth: [],
        categoryDistribution: [],
        revenueData: []
      });
    }
  };

  const handleBulkAction = async (action: 'delete' | 'activate' | 'deactivate') => {
    if (bulkSelection.length === 0) {
      toast.error('No items selected');
      return;
    }

    try {
      switch (action) {
        case 'delete':
          if (!confirm(`Delete ${bulkSelection.length} tools?`)) return;
          for (const id of bulkSelection) {
            await supabase.from('ai_tools').delete().eq('id', id);
          }
          toast.success(`Deleted ${bulkSelection.length} tools`);
          break;
        case 'activate':
          for (const id of bulkSelection) {
            await supabase.from('ai_tools').update({ status: 'active' }).eq('id', id);
          }
          toast.success(`Activated ${bulkSelection.length} tools`);
          break;
        case 'deactivate':
          for (const id of bulkSelection) {
            await supabase.from('ai_tools').update({ status: 'rejected' }).eq('id', id);
          }
          toast.success(`Deactivated ${bulkSelection.length} tools`);
          break;
      }
      setBulkSelection([]);
      fetchTools();
      fetchStats();
    } catch (error) {
      toast.error('Bulk action failed');
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Category', 'Pricing', 'Status', 'Created'],
      ...tools.map(t => [
        t.name,
        t.category,
        t.pricing,
        t.status,
        new Date(t.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-tools-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Data exported successfully');
  };

  const handleAddTool = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .insert([{
          ...newTool,
          features: Array.isArray(newTool.features) ? newTool.features : [],
          tags: Array.isArray(newTool.tags) ? newTool.tags : []
        }])
        .select()
        .single();

      if (error) throw error;

      setTools([data, ...tools]);
      setNewTool({
        name: '',
        description: '',
        category: '',
        pricing: '',
        features: [],
        website: '',
        status: 'active',
        tags: []
      });
      toast.success('Tool added successfully');
      fetchStats();
    } catch (error: any) {
      console.error('Error adding tool:', error);
      toast.error('Failed to add tool');
    }
  };

  const handleUpdateTool = async (tool: Tool) => {
    try {
      const { error } = await supabase
        .from('ai_tools')
        .update({
          name: tool.name,
          description: tool.description,
          category: tool.category,
          pricing: tool.pricing,
          features: tool.features,
          website: tool.website,
          status: tool.status,
          tags: tool.tags,
          updated_at: new Date().toISOString()
        })
        .eq('id', tool.id);

      if (error) throw error;

      setTools(tools.map(t => t.id === tool.id ? tool : t));
      setEditingTool(null);
      toast.success('Tool updated successfully');
    } catch (error: any) {
      console.error('Error updating tool:', error);
      toast.error('Failed to update tool');
    }
  };

  const handleDeleteTool = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const { error } = await supabase
        .from('ai_tools')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTools(tools.filter(t => t.id !== id));
      toast.success('Tool deleted successfully');
      fetchStats();
    } catch (error: any) {
      console.error('Error deleting tool:', error);
      toast.error('Failed to delete tool');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    if (onNavigate) {
      onNavigate('admin-login');
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['Writing & Content', 'Design & Creative', 'Development', 'Marketing', 'Analytics', 'Other'];

  // Calculate real percentage changes based on time range
  const [percentageChanges, setPercentageChanges] = useState({
    tools: 0,
    users: 0,
    revenue: 0,
    activeUsers: 0
  });

  const calculatePercentageChanges = async () => {
    try {
      let compareDate = new Date();
      
      switch(timeRange) {
        case '24h':
          compareDate.setDate(compareDate.getDate() - 1);
          break;
        case '7d':
          compareDate.setDate(compareDate.getDate() - 7);
          break;
        case '30d':
          compareDate.setDate(compareDate.getDate() - 30);
          break;
        case '90d':
          compareDate.setDate(compareDate.getDate() - 90);
          break;
      }

      // Tools change
      const { count: currentTools } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true });
      
      const { count: previousTools } = await supabase
        .from('ai_tools')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', compareDate.toISOString());

      const toolsChange = previousTools && previousTools > 0 
        ? Math.round((((currentTools || 0) - previousTools) / previousTools) * 100)
        : (currentTools || 0) > 0 ? 100 : 0;

      // Users change
      const { count: currentUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      const { count: previousUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', compareDate.toISOString());

      const usersChange = previousUsers && previousUsers > 0 
        ? Math.round((((currentUsers || 0) - previousUsers) / previousUsers) * 100)
        : (currentUsers || 0) > 0 ? 100 : 0;

      setPercentageChanges({
        tools: toolsChange,
        users: usersChange,
        revenue: stats.growth, // Use growth as revenue change
        activeUsers: Math.round((stats.activeUsers / stats.totalUsers) * 100) || 0
      });
    } catch (error) {
      console.error('Error calculating percentage changes:', error);
    }
  };

  useEffect(() => {
    calculatePercentageChanges();
  }, [timeRange, stats]);

  const toolsChange = percentageChanges.tools;
  const usersChange = percentageChanges.users;
  const revenueChange = percentageChanges.revenue;
  const activeUsersChange = percentageChanges.activeUsers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Enhanced Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Welcome back, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Time Range Selector */}
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 backdrop-blur-sm text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>

              {/* Quick Actions */}
              <Button
                onClick={() => fetchAllData()}
                variant="outline"
                size="icon"
                className="bg-white/10 border-white/20 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>

              <Button
                onClick={exportData}
                variant="outline"
                size="icon"
                className="bg-white/10 border-white/20 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20"
              >
                <Download className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Recent Activities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {activities.slice(0, 5).map(activity => (
                    <DropdownMenuItem key={activity.id} className="flex flex-col items-start gap-1 py-3">
                      <span className="text-sm font-medium">{activity.description}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handleSignOut}
                variant="outline"
                className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Stats Grid - Compact & Colorful */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/30 backdrop-blur-sm hover:scale-105 transition-all">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-medium text-purple-200">Total Tools</CardTitle>
                <Package className="w-4 h-4 text-purple-300" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">{stats.totalTools}</span>
                  <p className={cn(
                    "text-xs flex items-center gap-1 mt-1",
                    toolsChange >= 0 ? "text-emerald-300" : "text-rose-300"
                  )}>
                    {toolsChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(toolsChange)}%
                  </p>
                </div>
                <div className="h-8 w-12">
                  <div className="flex items-end gap-0.5 h-full">
                    {[40, 60, 45, 70, 65, 80, 75].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t opacity-70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30 backdrop-blur-sm hover:scale-105 transition-all">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-medium text-blue-200">Total Users</CardTitle>
                <Users className="w-4 h-4 text-blue-300" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">{stats.totalUsers}</span>
                  <p className={cn(
                    "text-xs flex items-center gap-1 mt-1",
                    usersChange >= 0 ? "text-emerald-300" : "text-rose-300"
                  )}>
                    {usersChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(usersChange)}%
                  </p>
                </div>
                <div className="h-8 w-12">
                  <div className="flex items-end gap-0.5 h-full">
                    {[50, 55, 60, 65, 70, 75, 80].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t opacity-70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border-emerald-400/30 backdrop-blur-sm hover:scale-105 transition-all">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-medium text-emerald-200">Revenue</CardTitle>
                <DollarSign className="w-4 h-4 text-emerald-300" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">${(stats.revenue / 1000).toFixed(1)}k</span>
                  <p className={cn(
                    "text-xs flex items-center gap-1 mt-1",
                    revenueChange >= 0 ? "text-emerald-300" : "text-rose-300"
                  )}>
                    {revenueChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(revenueChange)}%
                  </p>
                </div>
                <div className="h-8 w-12">
                  <div className="flex items-end gap-0.5 h-full">
                    {[45, 50, 48, 55, 60, 65, 72].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-emerald-400 to-green-500 rounded-t opacity-70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-400/30 backdrop-blur-sm hover:scale-105 transition-all">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-medium text-amber-200">Active Users</CardTitle>
                <Activity className="w-4 h-4 text-amber-300" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">{stats.activeUsers}</span>
                  <p className={cn(
                    "text-xs flex items-center gap-1 mt-1",
                    activeUsersChange >= 0 ? "text-emerald-300" : "text-rose-300"
                  )}>
                    {activeUsersChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(activeUsersChange)}%
                  </p>
                </div>
                <div className="h-8 w-12">
                  <div className="flex items-end gap-0.5 h-full">
                    {[60, 58, 62, 65, 63, 68, 70].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-amber-400 to-orange-500 rounded-t opacity-70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-black/40 border border-purple-500/20 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600/20">
              <Package className="w-4 h-4 mr-2" />
              Tools Management
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600/20">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600/20">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Recent Activities */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activities</CardTitle>
                  <CardDescription className="text-gray-400">
                    Latest system activities and events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-white/10 hover:bg-black/30 transition-colors">
                        <div className={cn(
                          "p-2 rounded-lg",
                          activity.type === 'tool_added' && "bg-green-500/20",
                          activity.type === 'user_registered' && "bg-blue-500/20",
                          activity.type === 'review_submitted' && "bg-yellow-500/20",
                          activity.type === 'tool_updated' && "bg-purple-500/20"
                        )}>
                          {activity.type === 'tool_added' && <Plus className="w-4 h-4 text-green-400" />}
                          {activity.type === 'user_registered' && <Users className="w-4 h-4 text-blue-400" />}
                          {activity.type === 'review_submitted' && <Star className="w-4 h-4 text-yellow-400" />}
                          {activity.type === 'tool_updated' && <Edit className="w-4 h-4 text-purple-400" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">
                              {new Date(activity.timestamp).toLocaleString()}
                            </span>
                            {activity.user && (
                              <span className="text-xs text-gray-500">by {activity.user}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Stats</CardTitle>
                  <CardDescription className="text-gray-400">
                    Key performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Conversion Rate</span>
                      <span className="text-sm font-bold text-white">{stats.conversionRate}%</span>
                    </div>
                    <Progress value={stats.conversionRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Active Tools</span>
                      <span className="text-sm font-bold text-white">
                        {stats.activeTools}/{stats.totalTools}
                      </span>
                    </div>
                    <Progress 
                      value={(stats.activeTools / stats.totalTools) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">User Engagement</span>
                      <span className="text-sm font-bold text-white">
                        {((stats.activeUsers / stats.totalUsers) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={(stats.activeUsers / stats.totalUsers) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <Separator className="bg-purple-500/20" />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Top Categories</h4>
                    {chartData.categoryDistribution.map((cat) => (
                      <div key={cat.category} className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{cat.category}</span>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {cat.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Management Tab */}
          <TabsContent value="tools" className="space-y-4">
            <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                  <div>
                    <CardTitle className="text-white">AI Tools Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage and moderate AI tools in the platform
                    </CardDescription>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Search and Filters */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 backdrop-blur-sm text-white w-64"
                      />
                    </div>
                    
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-40 bg-white/10 border-white/20 backdrop-blur-sm text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 backdrop-blur-sm text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                        className="bg-white/10 border-white/20 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20"
                      >
                        {viewMode === 'list' ? <Package className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
                      </Button>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Tool
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-slate-900 border-purple-500/20">
                        <DialogHeader>
                          <DialogTitle className="text-white">Add New AI Tool</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Add a new AI tool to the platform
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div className="space-y-2">
                            <Label className="text-gray-300">Tool Name</Label>
                            <Input
                              value={newTool.name}
                              onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                              placeholder="Enter tool name"
                              className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-300">Category</Label>
                            <Select 
                              value={newTool.category} 
                              onValueChange={(value) => setNewTool({...newTool, category: value})}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-300">Pricing</Label>
                            <Input
                              value={newTool.pricing}
                              onChange={(e) => setNewTool({...newTool, pricing: e.target.value})}
                              placeholder="e.g., Free, $10/month"
                              className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-300">Website</Label>
                            <Input
                              value={newTool.website}
                              onChange={(e) => setNewTool({...newTool, website: e.target.value})}
                              placeholder="https://example.com"
                              className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-300">Description</Label>
                            <Textarea
                              value={newTool.description}
                              onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                              placeholder="Enter tool description"
                              rows={4}
                              className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-300">Features (comma-separated)</Label>
                            <Textarea
                              value={Array.isArray(newTool.features) ? newTool.features.join(', ') : ''}
                              onChange={(e) => setNewTool({...newTool, features: e.target.value.split(',').map(f => f.trim())})}
                              placeholder="Feature 1, Feature 2, Feature 3"
                              rows={2}
                              className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-300">Tags (comma-separated)</Label>
                            <Input
                              value={Array.isArray(newTool.tags) ? newTool.tags.join(', ') : ''}
                              onChange={(e) => setNewTool({...newTool, tags: e.target.value.split(',').map(t => t.trim())})}
                              placeholder="ai, chatbot, productivity"
                              className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            onClick={handleAddTool}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            disabled={!newTool.name || !newTool.category || !newTool.description}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Tool
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Bulk Actions */}
                {bulkSelection.length > 0 && (
                  <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-between">
                    <span className="text-white">
                      {bulkSelection.length} item{bulkSelection.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('activate')}
                        className="bg-green-500/20 border-green-500/20 text-green-400 hover:bg-green-500/30"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('deactivate')}
                        className="bg-yellow-500/20 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Deactivate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('delete')}
                        className="bg-red-500/20 border-red-500/20 text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setBulkSelection([])}
                        className="text-gray-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tools Table/Grid */}
                {viewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-purple-500/20">
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              className="rounded border-purple-500/20"
                              checked={bulkSelection.length === filteredTools.length && filteredTools.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkSelection(filteredTools.map(t => t.id));
                                } else {
                                  setBulkSelection([]);
                                }
                              }}
                            />
                          </TableHead>
                          <TableHead className="text-gray-400">Name</TableHead>
                          <TableHead className="text-gray-400">Category</TableHead>
                          <TableHead className="text-gray-400">Pricing</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                          <TableHead className="text-gray-400">Stats</TableHead>
                          <TableHead className="text-gray-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTools.map((tool) => (
                          <TableRow key={tool.id} className="border-purple-500/20 hover:bg-white/10">
                            <TableCell>
                              <input
                                type="checkbox"
                                className="rounded border-purple-500/20"
                                checked={bulkSelection.includes(tool.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setBulkSelection([...bulkSelection, tool.id]);
                                  } else {
                                    setBulkSelection(bulkSelection.filter(id => id !== tool.id));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell className="text-white font-medium">
                              <div className="flex items-center gap-2">
                                {tool.image_url && (
                                  <img src={tool.image_url} alt={tool.name} className="w-8 h-8 rounded" />
                                )}
                                <div>
                                  <p className="font-medium">{tool.name}</p>
                                  <p className="text-xs text-gray-500 max-w-xs truncate">{tool.description}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-300">{tool.category}</TableCell>
                            <TableCell className="text-gray-300">{tool.pricing}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={tool.status === 'active' ? 'default' : tool.status === 'pending' ? 'secondary' : 'destructive'}
                                className={cn(
                                  tool.status === 'active' && "bg-green-500/20 text-green-400",
                                  tool.status === 'pending' && "bg-yellow-500/20 text-yellow-400",
                                  tool.status === 'rejected' && "bg-red-500/20 text-red-400"
                                )}
                              >
                                {tool.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {tool.views || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {tool.rating || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {tool.likes || 0}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => window.open(tool.website, '_blank')}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setEditingTool(tool)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => window.open(tool.website, '_blank')}>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Visit Website
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteTool(tool.id)}
                                    className="text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTools.map((tool) => (
                      <Card key={tool.id} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-black/30 transition-all">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {tool.image_url && (
                                <img src={tool.image_url} alt={tool.name} className="w-10 h-10 rounded" />
                              )}
                              <div>
                                <CardTitle className="text-white text-lg">{tool.name}</CardTitle>
                                <Badge 
                                  variant="secondary"
                                  className="mt-1 text-xs bg-purple-500/20 text-purple-300"
                                >
                                  {tool.category}
                                </Badge>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-white h-8 w-8"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setEditingTool(tool)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteTool(tool.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-3">{tool.description}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium">{tool.pricing}</span>
                            <Badge 
                              className={cn(
                                tool.status === 'active' && "bg-green-500/20 text-green-400",
                                tool.status === 'pending' && "bg-yellow-500/20 text-yellow-400",
                                tool.status === 'rejected' && "bg-red-500/20 text-red-400"
                              )}
                            >
                              {tool.status}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {tool.views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {tool.rating || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {tool.likes || 0}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage platform users and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-500/20">
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Joined</TableHead>
                      <TableHead className="text-gray-400">Last Active</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-purple-500/20">
                        <TableCell className="text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-bold">
                              {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium">{user.full_name || 'Unknown'}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-400">
                            {user.role || 'User'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">
                            {user.subscription_status || 'Active'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400 text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-400 text-sm">
                          {user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString() : 'Never'}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-400">
                                <XCircle className="w-4 h-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tools Growth Chart */}
              <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Tools Growth</CardTitle>
                  <CardDescription className="text-gray-400">
                    Number of tools added over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end gap-2">
                    {chartData.toolsGrowth.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t hover:opacity-80 transition-opacity"
                          style={{ height: `${(data.count / 80) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500">{data.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Growth Chart */}
              <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">User Growth</CardTitle>
                  <CardDescription className="text-gray-400">
                    New user registrations over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end gap-2">
                    {chartData.userGrowth.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-cyan-600 rounded-t hover:opacity-80 transition-opacity"
                          style={{ height: `${(data.count / 200) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500">{data.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Distribution */}
            <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Category Distribution</CardTitle>
                <CardDescription className="text-gray-400">
                  Tools distribution across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.categoryDistribution.map((cat) => {
                    const percentage = (cat.count / 100) * 100;
                    return (
                      <div key={cat.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{cat.category}</span>
                          <span className="text-sm font-bold text-white">{cat.count} tools</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Platform Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">General Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Maintenance Mode</Label>
                      <p className="text-sm text-gray-400">Enable maintenance mode for the platform</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Auto-approve Tools</Label>
                      <p className="text-sm text-gray-400">Automatically approve new tool submissions</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Send email notifications for important events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator className="bg-purple-500/20" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Security Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Session Timeout</Label>
                      <p className="text-sm text-gray-400">Auto logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 backdrop-blur-sm text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-purple-500/20" />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="bg-white/10 border-white/20 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20">
                    Reset to Defaults
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Tool Dialog */}
      {editingTool && (
        <Dialog open={!!editingTool} onOpenChange={() => setEditingTool(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 border-purple-500/20">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Tool</DialogTitle>
              <DialogDescription className="text-gray-400">
                Make changes to the AI tool
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Tool Name</Label>
                <Input
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                  className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Category</Label>
                <Select 
                  value={editingTool.category} 
                  onValueChange={(value) => setEditingTool({...editingTool, category: value})}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Pricing</Label>
                <Input
                  value={editingTool.pricing}
                  onChange={(e) => setEditingTool({...editingTool, pricing: e.target.value})}
                  className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Status</Label>
                <Select 
                  value={editingTool.status} 
                  onValueChange={(value: any) => setEditingTool({...editingTool, status: value})}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  value={editingTool.description}
                  onChange={(e) => setEditingTool({...editingTool, description: e.target.value})}
                  rows={4}
                  className="bg-white/10 border-white/20 backdrop-blur-sm text-white"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingTool(null)}
                className="bg-white/10 border-white/20 backdrop-blur-sm text-gray-400 hover:bg-black/30"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleUpdateTool(editingTool)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}