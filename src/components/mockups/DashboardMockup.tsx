import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { TrendingUp, TrendingDown, BarChart3, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { StatCard } from "../ui-kit/AICard";

interface DashboardMockupProps {
  theme: "light" | "dark";
}

export function DashboardMockup({ theme }: DashboardMockupProps) {
  const apiCalls = [
    {
      id: "req_1234567890",
      endpoint: "ChatGPT API",
      timestamp: "2024-01-15 14:32:15",
      status: "success",
      cost: "$0.025",
      responseTime: "1.2s",
      tokens: 450
    },
    {
      id: "req_1234567891",
      endpoint: "Claude API",
      timestamp: "2024-01-15 14:28:42",
      status: "success", 
      cost: "$0.018",
      responseTime: "0.9s",
      tokens: 320
    },
    {
      id: "req_1234567892",
      endpoint: "Midjourney API",
      timestamp: "2024-01-15 14:15:33",
      status: "failed",
      cost: "$0.000",
      responseTime: "5.0s",
      tokens: 0
    },
    {
      id: "req_1234567893",
      endpoint: "GPT-4 Vision",
      timestamp: "2024-01-15 14:12:18",
      status: "success",
      cost: "$0.045",
      responseTime: "2.1s",
      tokens: 680
    },
    {
      id: "req_1234567894",
      endpoint: "Whisper API",
      timestamp: "2024-01-15 14:08:55",
      status: "pending",
      cost: "$0.012",
      responseTime: "-",
      tokens: 200
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-success/10 text-success",
      failed: "bg-destructive/10 text-destructive", 
      pending: "bg-warning/10 text-warning"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-muted text-muted-foreground"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">
              Last login: 2 hours ago
            </p>
          </div>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="API Calls Today"
            value="1,247"
            change="+12.3%"
            trend="up"
            icon={<BarChart3 className="h-5 w-5" />}
          />
          
          <StatCard
            title="Credits Remaining"
            value="8,450"
            change="-5.2%"
            trend="down"
            icon={<CreditCard className="h-5 w-5" />}
          />
          
          <StatCard
            title="Tools Saved"
            value="42"
            change="+3"
            trend="up"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          
          <StatCard
            title="Avg Response Time"
            value="1.2s"
            change="-0.3s"
            trend="up"
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Usage Analytics */}
          <div className="xl:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Usage Analytics</h3>
                <Button variant="outline" size="sm">
                  Last 30 days
                </Button>
              </div>
              
              {/* Simplified Chart Representation */}
              <div className="space-y-4">
                <div className="h-64 bg-muted/20 rounded-lg p-4 flex items-end justify-between">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92, 78, 85].map((height, index) => (
                    <div
                      key={index}
                      className="bg-primary rounded-t-sm flex-1 mx-0.5 transition-all hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Jan 1</span>
                  <span>Jan 15</span>
                  <span>Today</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Subscription Details */}
          <div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Subscription</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <Badge>Professional</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next billing</span>
                  <span className="text-sm font-medium">Mar 15, 2024</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium">$29/month</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits used</span>
                    <span>1,550 / 10,000</span>
                  </div>
                  <Progress value={15.5} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                  <Button size="sm">
                    Upgrade
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent API Calls */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent API Calls</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiCalls.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{call.endpoint}</div>
                            <div className="text-xs text-muted-foreground">
                              {call.timestamp}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(call.status)}
                            {getStatusBadge(call.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {call.cost}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {call.responseTime}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Saved Tools */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Saved Tools</h3>
                <Button variant="outline" size="sm">
                  View All (42)
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "ChatGPT", category: "AI Writing", logo: "🤖", status: "active" },
                  { name: "Midjourney", category: "Image Generation", logo: "🎨", status: "trial" },
                  { name: "GitHub Copilot", category: "Code Assistant", logo: "💻", status: "active" },
                  { name: "Claude", category: "AI Writing", logo: "🧠", status: "inactive" },
                  { name: "Stable Diffusion", category: "Image Generation", logo: "🖼️", status: "active" }
                ].map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tool.logo}</span>
                      <div>
                        <div className="font-medium text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.category}</div>
                      </div>
                    </div>
                    <Badge 
                      variant={tool.status === "active" ? "default" : tool.status === "trial" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {tool.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}