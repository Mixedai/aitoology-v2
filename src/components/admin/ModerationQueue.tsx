
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';
import {
  LayoutGrid,
  List,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Shield,
  Activity,
  Send,
  Trash2,
  Eye,
  ExternalLink
} from 'lucide-react';

/*
Admin Moderation Queue Implementation Notes:

Tailwind Classes:
- Kanban Layout: grid grid-cols-1 md:grid-cols-3 gap-6 for responsive column layout
- Kanban Cards: border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow
- Table Layout: w-full overflow-hidden rounded-lg border for responsive table container
- Detail Drawer: w-full lg:w-96 border-l bg-card for sidebar panel
- Bulk Actions: sticky top-0 bg-background/95 backdrop-blur border-b z-10 for floating action bar
- Activity Log: space-y-3 max-h-96 overflow-y-auto for scrollable activity feed
- Status Badges: bg-warning/10 text-warning-foreground for pending, bg-success/10 text-success-foreground for approved

Interactive States:
- Drag & Drop: cursor-grab active:cursor-grabbing transform hover:scale-[1.02] transition-transform
- Selection: data-[state=checked]:bg-primary/10 border-primary for selected items
- Hover States: hover:bg-accent/50 transition-colors for interactive elements

Responsive Design:
- Mobile: Single column Kanban, bottom sheet for details, simplified bulk actions
- Tablet: Two-column Kanban, side drawer for details, condensed table view
- Desktop: Three-column Kanban, full detail panel, complete table with all columns

Status Management:
- Pending: border-l-4 border-l-warning bg-warning/5 for visual emphasis
- Approved: border-l-4 border-l-success bg-success/5
- Rejected: border-l-4 border-l-destructive bg-destructive/5
- Color-coded throughout UI for consistency

Activity Tracking:
- Real-time updates with optimistic UI
- Action history with user attribution
- Timestamps with relative formatting
- Status change notifications
*/

interface ToolSubmission {
  id: string;
  name: string;
  description: string;
  category: string;
  website: string;
  logo?: string;
  screenshots: string[];
  submittedBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  pricing: {
    model: string;
    price?: number;
    currency?: string;
  };
  features: string[];
  rejectionReason?: string;
  moderatedBy?: {
    id: string;
    name: string;
  };
  moderatedAt?: Date;
  lastUpdated: Date;
}

interface ActivityLogEntry {
  id: string;
  type: 'status_change' | 'comment' | 'bulk_action' | 'system';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Mock data
const mockSubmissions: ToolSubmission[] = [
  {
    id: '1',
    name: 'AI Writer Pro',
    description: 'Advanced AI writing assistant with GPT-4 integration and collaborative features',
    category: 'Writing',
    website: 'https://aiwriterpro.com',
    logo: '✍️',
    screenshots: ['https://placehold.co/800x600/e2e8f0/475569?text=Screenshot+1', 'https://placehold.co/800x600/e2e8f0/475569?text=Screenshot+2'],
    submittedBy: {
      id: 'user1',
      name: 'Sarah Chen',
      email: 'sarah@aiwriterpro.com',
      avatar: 'https://ui-avatars.com/api/?size=32&background=6366f1&color=fff&name=User'
    },
    submittedAt: new Date('2024-01-10T10:30:00'),
    status: 'pending',
    priority: 'high',
    tags: ['AI', 'Writing', 'GPT-4', 'Collaboration'],
    pricing: {
      model: 'Freemium',
      price: 19.99,
      currency: 'USD'
    },
    features: ['AI Writing', 'Real-time Collaboration', 'Grammar Check', 'SEO Optimization'],
    lastUpdated: new Date('2024-01-10T10:30:00')
  },
  {
    id: '2',
    name: 'DataViz Studio',
    description: 'Create stunning data visualizations with AI-powered insights and automated chart generation',
    category: 'Analytics',
    website: 'https://datavizstudio.com',
    logo: '📊',
    screenshots: ['https://placehold.co/800x600/e2e8f0/475569?text=Screenshot'],
    submittedBy: {
      id: 'user2',
      name: 'Mike Rodriguez',
      email: 'mike@datavizstudio.com'
    },
    submittedAt: new Date('2024-01-09T14:15:00'),
    status: 'approved',
    priority: 'medium',
    tags: ['Data', 'Visualization', 'Analytics', 'Charts'],
    pricing: {
      model: 'Paid',
      price: 39.99,
      currency: 'USD'
    },
    features: ['AI Insights', 'Chart Generation', 'Data Import', 'Export Options'],
    moderatedBy: {
      id: 'admin1',
      name: 'John Admin'
    },
    moderatedAt: new Date('2024-01-09T16:20:00'),
    lastUpdated: new Date('2024-01-09T16:20:00')
  },
  {
    id: '3',
    name: 'CodeAssist',
    description: 'AI-powered code completion and debugging assistant',
    category: 'Development',
    website: 'https://codeassist.dev',
    logo: '🤖',
    screenshots: ['https://placehold.co/800x600/e2e8f0/475569?text=Screenshot+1', 'https://placehold.co/800x600/e2e8f0/475569?text=Screenshot+2', 'https://placehold.co/800x600/e2e8f0/475569?text=Screenshot+3'],
    submittedBy: {
      id: 'user3',
      name: 'Alex Thompson',
      email: 'alex@codeassist.dev'
    },
    submittedAt: new Date('2024-01-08T09:45:00'),
    status: 'rejected',
    priority: 'low',
    tags: ['Development', 'AI', 'Code', 'Debugging'],
    pricing: {
      model: 'Free'
    },
    features: ['Code Completion', 'Bug Detection', 'Code Review', 'Multi-language Support'],
    rejectionReason: 'Insufficient documentation and unclear pricing model. Please provide more detailed feature descriptions and usage examples.',
    moderatedBy: {
      id: 'admin2',
      name: 'Jane Moderator'
    },
    moderatedAt: new Date('2024-01-08T11:30:00'),
    lastUpdated: new Date('2024-01-08T11:30:00')
  },
  {
    id: '4',
    name: 'DesignGenie',
    description: 'AI-powered design tool for creating logos, banners, and marketing materials',
    category: 'Design',
    website: 'https://designgenie.ai',
    logo: '🎨',
    screenshots: ['https://placehold.co/800x600/e2e8f0/475569?text=Screenshot'],
    submittedBy: {
      id: 'user4',
      name: 'Lisa Wang',
      email: 'lisa@designgenie.ai'
    },
    submittedAt: new Date('2024-01-07T16:20:00'),
    status: 'pending',
    priority: 'medium',
    tags: ['Design', 'AI', 'Logo', 'Marketing'],
    pricing: {
      model: 'Freemium',
      price: 14.99,
      currency: 'USD'
    },
    features: ['Logo Generation', 'Banner Creation', 'Brand Colors', 'Template Library'],
    lastUpdated: new Date('2024-01-07T16:20:00')
  }
];

const mockActivityLog: ActivityLogEntry[] = [
  {
    id: '1',
    type: 'status_change',
    title: 'Tool Approved',
    description: 'DataViz Studio was approved and published',
    user: { name: 'John Admin', avatar: 'https://ui-avatars.com/api/?size=32&background=6366f1&color=fff&name=User' },
    timestamp: new Date('2024-01-09T16:20:00'),
    metadata: { toolId: '2', status: 'approved' }
  },
  {
    id: '2',
    type: 'bulk_action',
    title: 'Bulk Status Update',
    description: '3 tools marked as pending review',
    user: { name: 'Jane Moderator' },
    timestamp: new Date('2024-01-09T15:45:00'),
    metadata: { count: 3, action: 'pending' }
  },
  {
    id: '3',
    type: 'status_change',
    title: 'Tool Rejected',
    description: 'CodeAssist was rejected due to incomplete information',
    user: { name: 'Jane Moderator' },
    timestamp: new Date('2024-01-08T11:30:00'),
    metadata: { toolId: '3', status: 'rejected' }
  },
  {
    id: '4',
    type: 'comment',
    title: 'Comment Added',
    description: 'Requested additional screenshots for AI Writer Pro',
    user: { name: 'Sarah Reviewer' },
    timestamp: new Date('2024-01-08T10:15:00'),
    metadata: { toolId: '1', type: 'comment' }
  }
];

export function ModerationQueue() {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [submissions, setSubmissions] = useState<ToolSubmission[]>(mockSubmissions);
  const [selectedSubmissions, setSelectedSubmissions] = useState<Set<string>>(new Set());
  const [selectedSubmission, setSelectedSubmission] = useState<ToolSubmission | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy] = useState('lastUpdated');
  const [sortOrder] = useState<'asc' | 'desc'>('desc');
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(mockActivityLog);
  const [rejectionReason, setRejectionReason] = useState('');
  const [changeRequestReason, setChangeRequestReason] = useState('');
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);
  const [isChangeRequestDialogOpen, setIsChangeRequestDialogOpen] = useState(false);

  // Filter and sort submissions
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || submission.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || submission.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  }).sort((a, b) => {
    const getValue = (item: ToolSubmission) => {
      switch (sortBy) {
        case 'name': return item.name;
        case 'submittedAt': return item.submittedAt.getTime();
        case 'priority': return item.priority;
        case 'status': return item.status;
        default: return item.lastUpdated.getTime();
      }
    };
    
    const aVal = getValue(a);
    const bVal = getValue(b);
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  // Group submissions by status for Kanban
  const groupedSubmissions = {
    pending: filteredSubmissions.filter(s => s.status === 'pending'),
    approved: filteredSubmissions.filter(s => s.status === 'approved'),
    rejected: filteredSubmissions.filter(s => s.status === 'rejected')
  };

  const handleStatusChange = (submissionId: string, newStatus: 'approved' | 'rejected', reason?: string) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? {
            ...submission,
            status: newStatus,
            moderatedBy: { id: 'current-admin', name: 'Current Admin' },
            moderatedAt: new Date(),
            lastUpdated: new Date(),
            ...(reason && { rejectionReason: reason })
          }
        : submission
    ));

    // Add to activity log
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      const newActivity: ActivityLogEntry = {
        id: Date.now().toString(),
        type: 'status_change',
        title: `Tool ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
        description: `${submission.name} was ${newStatus}`,
        user: { name: 'Current Admin' },
        timestamp: new Date(),
        metadata: { toolId: submissionId, status: newStatus }
      };
      setActivityLog(prev => [newActivity, ...prev]);
    }

    toast.success(`Tool ${newStatus} successfully`);
  };

  const handleBulkAction = (action: string) => {
    const count = selectedSubmissions.size;
    if (count === 0) return;

    switch (action) {
      case 'approve':
        selectedSubmissions.forEach(id => handleStatusChange(id, 'approved'));
        break;
      case 'reject':
        // In a real app, you'd want individual rejection reasons
        selectedSubmissions.forEach(id => handleStatusChange(id, 'rejected', 'Bulk rejection'));
        break;
      case 'delete':
        setSubmissions(prev => prev.filter(s => !selectedSubmissions.has(s.id)));
        toast.success(`${count} tool(s) deleted`);
        break;
    }

    const newActivity: ActivityLogEntry = {
      id: Date.now().toString(),
      type: 'bulk_action',
      title: 'Bulk Action Performed',
      description: `${action} applied to ${count} tool(s)`,
      user: { name: 'Current Admin' },
      timestamp: new Date(),
      metadata: { count, action }
    };
    setActivityLog(prev => [newActivity, ...prev]);

    setSelectedSubmissions(new Set());
  };

  const handleSelectSubmission = (submissionId: string) => {
    setSelectedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedSubmissions.size === filteredSubmissions.length) {
      setSelectedSubmissions(new Set());
    } else {
      setSelectedSubmissions(new Set(filteredSubmissions.map(s => s.id)));
    }
  };

  const openDetailDrawer = (submission: ToolSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailDrawerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-success/10 text-success-foreground border-success"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive-foreground border-destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-xs">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-medium flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Moderation Queue
                </h1>
                <p className="text-muted-foreground">Review and manage submitted AI tools</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('kanban')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tools, submitters, or descriptions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedSubmissions.size > 0 && (
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedSubmissions.size} tool(s) selected
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('approve')}
                    className="gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('reject')}
                    className="gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('delete')}
                    className="gap-1 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {viewMode === 'kanban' ? (
              /* Kanban Board */
              <div className="h-full p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                  {Object.entries(groupedSubmissions).map(([status, items]) => (
                    <div key={status} className="flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium capitalize">{status}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {items.length}
                          </Badge>
                        </div>
                      </div>
                      
                      <ScrollArea className="flex-1">
                        <div className="space-y-3 pb-4">
                          {items.map((submission) => (
                            <Card
                              key={submission.id}
                              className={`cursor-pointer hover:shadow-md transition-all group border-l-4 ${
                                submission.status === 'pending' ? 'border-l-warning bg-warning/5' :
                                submission.status === 'approved' ? 'border-l-success bg-success/5' :
                                'border-l-destructive bg-destructive/5'
                              }`}
                              onClick={() => openDetailDrawer(submission)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-lg">
                                      {submission.logo || '🔧'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium truncate">{submission.name}</h4>
                                      <p className="text-sm text-muted-foreground truncate">
                                        {submission.category}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Checkbox
                                      checked={selectedSubmissions.has(submission.id)}
                                      onCheckedChange={() => handleSelectSubmission(submission.id)}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    {getPriorityBadge(submission.priority)}
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                  {submission.description}
                                </p>
                                
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {submission.submittedBy.name}
                                  </div>
                                  <span>{formatTimeAgo(submission.submittedAt)}</span>
                                </div>
                                
                                {submission.status === 'rejected' && submission.rejectionReason && (
                                  <div className="mt-3 p-2 bg-destructive/10 rounded text-xs">
                                    <p className="font-medium text-destructive">Rejection Reason:</p>
                                    <p className="text-destructive/80">{submission.rejectionReason}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Table View */
              <div className="h-full overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedSubmissions.size === filteredSubmissions.length && filteredSubmissions.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Tool</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Submitter</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow
                        key={submission.id}
                        className="cursor-pointer hover:bg-accent/50"
                        onClick={() => openDetailDrawer(submission)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedSubmissions.has(submission.id)}
                            onCheckedChange={() => handleSelectSubmission(submission.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-lg">
                              {submission.logo || '🔧'}
                            </div>
                            <div>
                              <div className="font-medium">{submission.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-xs">
                                {submission.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{submission.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={submission.submittedBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {submission.submittedBy.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{submission.submittedBy.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>{getPriorityBadge(submission.priority)}</TableCell>
                        <TableCell className="text-sm">{formatTimeAgo(submission.submittedAt)}</TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-1">
                            {submission.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(submission.id, 'approved')}
                                  className="gap-1 h-7"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedSubmission(submission);
                                    setIsRejectionDialogOpen(true);
                                  }}
                                  className="gap-1 h-7"
                                >
                                  <XCircle className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDetailDrawer(submission)}
                              className="h-7 w-7 p-0"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

        {/* Activity Log Sidebar */}
        <div className="w-80 border-l bg-card p-6 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Activity Log</h3>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {activityLog.map((activity) => (
                <div key={activity.id} className="border-l-2 border-muted pl-4 pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-6 h-6 mt-0.5">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback className="text-xs">
                        {activity.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Detail Drawer */}
      <Sheet open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen}>
        <SheetContent side="right" className="w-full sm:w-96 sm:max-w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedSubmission?.logo || '🔧'}</span>
              {selectedSubmission?.name}
            </SheetTitle>
            <SheetDescription>
              Submitted by {selectedSubmission?.submittedBy.name}
            </SheetDescription>
          </SheetHeader>
          
          {selectedSubmission && (
            <div className="mt-6 space-y-6">
              {/* Status and Actions */}
              <div className="flex items-center justify-between">
                {getStatusBadge(selectedSubmission.status)}
                {getPriorityBadge(selectedSubmission.priority)}
              </div>
              
              {selectedSubmission.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(selectedSubmission.id, 'approved')}
                    className="flex-1 gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsChangeRequestDialogOpen(true)}
                    className="flex-1 gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Request Changes
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setIsRejectionDialogOpen(true)}
                    className="flex-1 gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-3">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedSubmission.description}</p>
              </div>

              {/* Screenshots */}
              {selectedSubmission.screenshots.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Screenshots</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedSubmission.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-4">
                <h4 className="font-medium">Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{selectedSubmission.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website:</span>
                    <a
                      href={selectedSubmission.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pricing:</span>
                    <span>
                      {selectedSubmission.pricing.model}
                      {selectedSubmission.pricing.price && (
                        ` - $${selectedSubmission.pricing.price}/${selectedSubmission.pricing.currency || 'month'}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span>{selectedSubmission.submittedAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-medium">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h4 className="font-medium">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rejection Reason */}
              {selectedSubmission.status === 'rejected' && selectedSubmission.rejectionReason && (
                <div className="space-y-3">
                  <h4 className="font-medium text-destructive">Rejection Reason</h4>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-sm text-destructive">{selectedSubmission.rejectionReason}</p>
                  </div>
                </div>
              )}

              {/* Submitter Info */}
              <div className="space-y-3">
                <h4 className="font-medium">Submitter</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedSubmission.submittedBy.avatar} />
                    <AvatarFallback>
                      {selectedSubmission.submittedBy.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedSubmission.submittedBy.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedSubmission.submittedBy.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Tool Submission</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting "{selectedSubmission?.name}". This will help the submitter understand what needs to be improved.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Explain why this tool is being rejected and what the submitter can do to improve it..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsRejectionDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedSubmission && rejectionReason.trim()) {
                    handleStatusChange(selectedSubmission.id, 'rejected', rejectionReason);
                    setIsRejectionDialogOpen(false);
                    setRejectionReason('');
                    setIsDetailDrawerOpen(false);
                  }
                }}
                className="flex-1"
                disabled={!rejectionReason.trim()}
              >
                Reject Tool
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Request Dialog */}
      <Dialog open={isChangeRequestDialogOpen} onOpenChange={setIsChangeRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Changes</DialogTitle>
            <DialogDescription>
              Request specific changes or additional information for "{selectedSubmission?.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe what changes or additional information you need..."
              value={changeRequestReason}
              onChange={(e) => setChangeRequestReason(e.target.value)}
              rows={4}
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsChangeRequestDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (changeRequestReason.trim()) {
                    // In a real app, this would send a notification to the submitter
                    toast.success("Change request sent to submitter");
                    setIsChangeRequestDialogOpen(false);
                    setChangeRequestReason('');
                  }
                }}
                className="flex-1"
                disabled={!changeRequestReason.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}