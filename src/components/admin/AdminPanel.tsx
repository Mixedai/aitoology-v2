
// import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner';
import { 
  Settings, 
  Users, 
  FileText, 
  Shield, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Database,
  UserPlus,
  Mail,
  AlertTriangle
} from 'lucide-react';

// Mock data
const pendingSubmissions = [
  {
    id: 1,
    name: 'SuperAI Writer',
    submitter: 'john@example.com',
    category: 'Writing & Content',
    submittedAt: '2024-01-10',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    name: 'DesignBot Pro',
    submitter: 'sarah@design.com',
    category: 'Design & Creative',
    submittedAt: '2024-01-09',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 3,
    name: 'CodeAssist AI',
    submitter: 'dev@startup.com',
    category: 'Development & Code',
    submittedAt: '2024-01-08',
    status: 'under_review',
    priority: 'low'
  }
];

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    joinedAt: '2023-12-01',
    lastActive: '2024-01-10',
    status: 'active'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'moderator',
    joinedAt: '2023-11-15',
    lastActive: '2024-01-09',
    status: 'active'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'user',
    joinedAt: '2023-10-20',
    lastActive: '2024-01-05',
    status: 'inactive'
  }
];

const systemStats = {
  totalTools: 1247,
  pendingSubmissions: 23,
  totalUsers: 8932,
  activeUsers: 3421,
  monthlyGrowth: 12.5
};

export function AdminPanel() {
  // const [selectedSubmission, setSelectedSubmission] = useState(null);
  // const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleApproveSubmission = (_id: number) => {
    toast.success('Tool submission approved and published');
    // Update submission status
  };

  const handleRejectSubmission = (_id: number) => {
    toast.error('Tool submission rejected');
    // Update submission status
  };

  const handleDeleteUser = (_id: number) => {
    toast.success('User deleted successfully');
    // Delete user
  };

  const handleChangeUserRole = (_id: number, newRole: string) => {
    toast.success(`User role changed to ${newRole}`);
    // Update user role
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'under_review':
        return <Badge variant="outline"><Eye className="w-3 h-3 mr-1" />Under Review</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getUserStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive">Admin</Badge>;
      case 'moderator':
        return <Badge variant="outline">Moderator</Badge>;
      case 'user':
        return <Badge variant="secondary">User</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Manage tools, users, and system settings</p>
          </div>
          <Badge variant="outline" className="gap-2">
            <Shield className="w-4 h-4" />
            Administrator
          </Badge>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalTools.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{systemStats.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.pendingSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                requiring attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                registered accounts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                last 30 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{systemStats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">
                monthly growth
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submissions" className="gap-2">
              <FileText className="w-4 h-4" />
              Tool Submissions
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* Tool Submissions */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tool Submissions</CardTitle>
                <CardDescription>
                  Review and moderate tools submitted by the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingSubmissions.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No pending submissions</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tool Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitter</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>{submission.category}</TableCell>
                          <TableCell>{submission.submitter}</TableCell>
                          <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell>{getPriorityBadge(submission.priority)}</TableCell>
                          <TableCell>{getStatusBadge(submission.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="w-3 h-3" />
                                Review
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => handleApproveSubmission(submission.id)}
                              >
                                <CheckCircle className="w-3 h-3" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => handleRejectSubmission(submission.id)}
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts, roles, and permissions
                    </CardDescription>
                  </div>
                  <Button className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Invite User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                        <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select onValueChange={(value: string) => handleChangeUserRole(user.id, value)}>
                              <SelectTrigger className="w-auto">
                                <SelectValue placeholder="Change Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Configuration</CardTitle>
                  <CardDescription>
                    Manage global site settings and configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="AI Toologist" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea 
                      id="siteDescription" 
                      defaultValue="Discover and compare the best AI tools for your workflow"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" defaultValue="admin@aitoologist.com" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Configure automated email notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      Email notifications are currently enabled. You'll receive alerts for new submissions and user registrations.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input id="adminEmail" defaultValue="admin@aitoologist.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailFrequency">Notification Frequency</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Update Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage security and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-warning bg-warning/10">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <AlertDescription>
                      Two-factor authentication is recommended for all admin accounts.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                  </div>
                  <Button>Save Security Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}