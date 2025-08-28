import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion } from 'framer-motion';
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
  Bar
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Bell,
  Clock,
  CreditCard,
  PieChart as PieChartIcon,
  BarChart3,
  Wallet,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Palette,
  Code,
  MessageSquare,
  Settings,
  Search,
  Filter,
  Calendar,
  Activity,
  Package,
  Users,
  Cpu,
  Database,
  Shield,
  Globe,
  Layers
} from 'lucide-react';

// Modern color palette
const COLORS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  dark: '#1F2937',
  light: '#F9FAFB'
};

// Enhanced mock data
const monthlyData = [
  { month: 'Jan', spend: 423, tools: 12 },
  { month: 'Feb', spend: 467, tools: 13 },
  { month: 'Mar', spend: 501, tools: 14 },
  { month: 'Apr', spend: 489, tools: 14 },
  { month: 'May', spend: 523, tools: 15 },
  { month: 'Jun', spend: 578, tools: 16 },
];

const categoryBreakdown = [
  { name: 'AI Tools', value: 45, color: COLORS.primary, icon: Cpu },
  { name: 'Design', value: 25, color: COLORS.secondary, icon: Palette },
  { name: 'Productivity', value: 20, color: COLORS.success, icon: Target },
  { name: 'Development', value: 10, color: COLORS.warning, icon: Code }
];

const recentActivity = [
  { id: 1, action: 'Subscription Added', tool: 'ChatGPT Plus', time: '2 hours ago', type: 'add' },
  { id: 2, action: 'Payment Processed', tool: 'Figma Pro', time: '5 hours ago', type: 'payment' },
  { id: 3, action: 'Renewal Alert', tool: 'Notion AI', time: '1 day ago', type: 'alert' },
  { id: 4, action: 'Tool Cancelled', tool: 'Canva Pro', time: '3 days ago', type: 'cancel' },
];

const topTools = [
  { name: 'ChatGPT Plus', usage: 95, spend: 20, trend: 'up' },
  { name: 'Midjourney', usage: 88, spend: 30, trend: 'up' },
  { name: 'Figma Pro', usage: 75, spend: 12, trend: 'stable' },
  { name: 'GitHub Copilot', usage: 70, spend: 10, trend: 'up' },
  { name: 'Notion AI', usage: 65, spend: 10, trend: 'down' },
];

export function ModernDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('overview');

  // Calculate metrics
  const totalMonthlySpend = 578;
  const totalTools = 16;
  const activeSubscriptions = 14;
  const savingsThisMonth = 45;
  const spendGrowth = 12;

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {value}
              </p>
              {subtitle && (
                <div className="flex items-center gap-2">
                  {trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : trend === 'down' ? (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  ) : null}
                  <p className={`text-xs font-medium ${
                    trend === 'up' ? 'text-green-600' : 
                    trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {trendValue && `${trendValue}% `}{subtitle}
                  </p>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${
              Icon === DollarSign ? 'from-blue-500 to-blue-600' :
              Icon === Package ? 'from-purple-500 to-purple-600' :
              Icon === TrendingUp ? 'from-green-500 to-green-600' :
              'from-orange-500 to-orange-600'
            }`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              AI Tools Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and optimize your AI tool subscriptions
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4" />
              Add Tool
            </Button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Monthly Spend"
            value={`$${totalMonthlySpend}`}
            subtitle="vs last month"
            icon={DollarSign}
            trend="up"
            trendValue={spendGrowth}
          />
          <MetricCard
            title="Active Tools"
            value={activeSubscriptions}
            subtitle="tools active"
            icon={Package}
            trend="stable"
          />
          <MetricCard
            title="Usage Rate"
            value="87%"
            subtitle="efficiency score"
            icon={TrendingUp}
            trend="up"
            trendValue={5}
          />
          <MetricCard
            title="Savings"
            value={`$${savingsThisMonth}`}
            subtitle="saved this month"
            icon={Target}
            trend="up"
            trendValue={23}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Spending Trend */}
              <Card className="lg:col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Spending Trend</CardTitle>
                      <CardDescription>Monthly spending over time</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {['6M', '1Y', 'All'].map((period) => (
                        <Button
                          key={period}
                          variant={selectedPeriod === period.toLowerCase() ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedPeriod(period.toLowerCase())}
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="spend"
                          stroke={COLORS.primary}
                          fillOpacity={1}
                          fill="url(#colorSpend)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Spending by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {categoryBreakdown.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <span className="text-sm font-bold">{category.value}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Top Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                    <Activity className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'add' ? 'bg-green-100 text-green-600' :
                          activity.type === 'payment' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'alert' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {activity.type === 'add' ? <Plus className="w-4 h-4" /> :
                           activity.type === 'payment' ? <CreditCard className="w-4 h-4" /> :
                           activity.type === 'alert' ? <Bell className="w-4 h-4" /> :
                           <AlertTriangle className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.tool}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Tools */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Top Tools</CardTitle>
                    <Zap className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTools.map((tool, index) => (
                      <div key={tool.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                            <span className="text-sm font-medium">{tool.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold">${tool.spend}</span>
                            {tool.trend === 'up' ? (
                              <ArrowUpRight className="w-3 h-3 text-green-500" />
                            ) : tool.trend === 'down' ? (
                              <ArrowDownRight className="w-3 h-3 text-red-500" />
                            ) : (
                              <div className="w-3 h-3 rounded-full bg-gray-400" />
                            )}
                          </div>
                        </div>
                        <Progress value={tool.usage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Renewals */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Renewals</CardTitle>
                    <CardDescription>Next 30 days</CardDescription>
                  </div>
                  <Badge variant="destructive">3 due soon</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'ChatGPT Plus', date: 'Jan 15', amount: 20, daysLeft: 3 },
                    { name: 'Midjourney', date: 'Jan 18', amount: 30, daysLeft: 6 },
                    { name: 'GitHub Copilot', date: 'Jan 22', amount: 10, daysLeft: 10 },
                  ].map((renewal) => (
                    <div key={renewal.name} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          renewal.daysLeft <= 3 ? 'bg-red-100 text-red-600' :
                          renewal.daysLeft <= 7 ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{renewal.name}</p>
                          <p className="text-sm text-gray-600">{renewal.date} • ${renewal.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={renewal.daysLeft <= 3 ? 'destructive' : 'secondary'}>
                          {renewal.daysLeft} days
                        </Badge>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Deep dive into your usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-gray-400">
                  <BarChart3 className="w-12 h-12 mb-4" />
                  <p>Analytics view coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>All Tools</CardTitle>
                <CardDescription>Manage your AI tool subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-gray-400">
                  <Package className="w-12 h-12 mb-4" />
                  <p>Tools management coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}