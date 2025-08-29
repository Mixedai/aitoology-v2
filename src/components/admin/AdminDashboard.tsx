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
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { 
  Plus,
  Edit, 
  Trash2, 
  Save,
  X,
  Search,
  BarChart3,
  Users,
  Package,
  TrendingUp,
  LogOut,
  Shield
} from 'lucide-react';

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
}

interface AdminDashboardProps {
  onNavigate?: (screenId: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { signOut } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [newTool, setNewTool] = useState<Partial<Tool>>({
    name: '',
    description: '',
    category: '',
    pricing: '',
    features: [],
    website: '',
    status: 'active'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stats, setStats] = useState({
    totalTools: 0,
    activeTools: 0,
    pendingTools: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchTools();
    fetchStats();
  }, []);

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
    } finally {
      // Loading state removed as it was unused
    }
  };

  const fetchStats = async () => {
    try {
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

      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalTools: toolCount || 0,
        activeTools: activeCount || 0,
        pendingTools: pendingCount || 0,
        totalUsers: userCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddTool = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .insert([{
          ...newTool,
          features: Array.isArray(newTool.features) ? newTool.features : []
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
        status: 'active'
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
    return matchesSearch && matchesCategory;
  });

  const categories = ['Writing & Content', 'Design & Creative', 'Development', 'Marketing', 'Analytics', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Total Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                <span className="text-2xl font-bold text-white">{stats.totalTools}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Active Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-white">{stats.activeTools}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">{stats.pendingTools}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-bold text-white">{stats.totalUsers}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tools" className="space-y-4">
          <TabsList className="bg-black/40 border border-purple-500/20">
            <TabsTrigger value="tools">Manage Tools</TabsTrigger>
            <TabsTrigger value="add">Add New Tool</TabsTrigger>
          </TabsList>

          {/* Manage Tools Tab */}
          <TabsContent value="tools">
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">AI Tools Management</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-black/20 border-purple-500/20 text-white w-64"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-40 bg-black/20 border-purple-500/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-500/20">
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Category</TableHead>
                        <TableHead className="text-gray-400">Pricing</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTools.map((tool) => (
                        <TableRow key={tool.id} className="border-purple-500/20">
                          <TableCell className="text-white font-medium">
                            {editingTool?.id === tool.id ? (
                              <Input
                                value={editingTool.name}
                                onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                                className="bg-black/20 border-purple-500/20 text-white"
                              />
                            ) : (
                              tool.name
                            )}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {editingTool?.id === tool.id ? (
                              <Select 
                                value={editingTool.category} 
                                onValueChange={(value) => setEditingTool({...editingTool, category: value})}
                              >
                                <SelectTrigger className="bg-black/20 border-purple-500/20 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              tool.category
                            )}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {editingTool?.id === tool.id ? (
                              <Input
                                value={editingTool.pricing}
                                onChange={(e) => setEditingTool({...editingTool, pricing: e.target.value})}
                                className="bg-black/20 border-purple-500/20 text-white"
                              />
                            ) : (
                              tool.pricing
                            )}
                          </TableCell>
                          <TableCell>
                            {editingTool?.id === tool.id ? (
                              <Select 
                                value={editingTool.status} 
                                onValueChange={(value: any) => setEditingTool({...editingTool, status: value})}
                              >
                                <SelectTrigger className="bg-black/20 border-purple-500/20 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Badge 
                                variant={tool.status === 'active' ? 'default' : tool.status === 'pending' ? 'secondary' : 'destructive'}
                                className={
                                  tool.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                  tool.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }
                              >
                                {tool.status}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {editingTool?.id === tool.id ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdateTool(editingTool)}
                                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400"
                                  >
                                    <Save className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => setEditingTool(null)}
                                    className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-400"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => setEditingTool(tool)}
                                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleDeleteTool(tool.id)}
                                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add New Tool Tab */}
          <TabsContent value="add">
            <Card className="bg-black/40 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Add New AI Tool</CardTitle>
                <CardDescription className="text-gray-400">
                  Add a new AI tool to the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Tool Name</Label>
                    <Input
                      value={newTool.name}
                      onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                      placeholder="Enter tool name"
                      className="bg-black/20 border-purple-500/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Category</Label>
                    <Select 
                      value={newTool.category} 
                      onValueChange={(value) => setNewTool({...newTool, category: value})}
                    >
                      <SelectTrigger className="bg-black/20 border-purple-500/20 text-white">
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
                      placeholder="e.g., Free, $10/month, Freemium"
                      className="bg-black/20 border-purple-500/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Website</Label>
                    <Input
                      value={newTool.website}
                      onChange={(e) => setNewTool({...newTool, website: e.target.value})}
                      placeholder="https://example.com"
                      className="bg-black/20 border-purple-500/20 text-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={newTool.description}
                      onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                      placeholder="Enter tool description"
                      rows={4}
                      className="bg-black/20 border-purple-500/20 text-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-300">Features (comma-separated)</Label>
                    <Textarea
                      value={Array.isArray(newTool.features) ? newTool.features.join(', ') : ''}
                      onChange={(e) => setNewTool({...newTool, features: e.target.value.split(',').map(f => f.trim())})}
                      placeholder="Feature 1, Feature 2, Feature 3"
                      rows={2}
                      className="bg-black/20 border-purple-500/20 text-white"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAddTool}
                  className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  disabled={!newTool.name || !newTool.category || !newTool.description}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}