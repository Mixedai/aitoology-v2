import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  GitCompare, 
  Download, 
  Share2, 
  Filter, 
  ChevronDown,
  ChevronUp,
  Check,
  Minus,
  Star,
  DollarSign,
  Zap,
  Shield,
  Users,
  Globe,
  Cpu,
  Cloud,
  Lock,
  Unlock,
  Sparkles,
  Trophy,
  TrendingUp,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../ui/tooltip';
import { toast } from 'sonner';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  rating: number;
  users?: string;
  pricing: string;
  features?: string[];
  tags?: string[];
  pros?: string[];
  cons?: string[];
  integrations?: string[];
  platforms?: string[];
}

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTools: Tool[];
  onRemoveTool: (toolId: string) => void;
}

// Feature categories for comparison
const FEATURE_CATEGORIES = {
  'Core Features': [
    { key: 'ai_powered', label: 'AI Powered', icon: Sparkles },
    { key: 'collaboration', label: 'Collaboration', icon: Users },
    { key: 'cloud_based', label: 'Cloud Based', icon: Cloud },
    { key: 'offline_mode', label: 'Offline Mode', icon: Globe },
    { key: 'api_access', label: 'API Access', icon: Cpu },
    { key: 'custom_models', label: 'Custom Models', icon: Zap }
  ],
  'Security & Privacy': [
    { key: 'end_to_end', label: 'End-to-End Encryption', icon: Lock },
    { key: 'data_privacy', label: 'Data Privacy', icon: Shield },
    { key: 'gdpr_compliant', label: 'GDPR Compliant', icon: Check },
    { key: 'sso_support', label: 'SSO Support', icon: Unlock }
  ],
  'Pricing & Plans': [
    { key: 'free_tier', label: 'Free Tier', icon: DollarSign },
    { key: 'trial_period', label: 'Trial Period', icon: TrendingUp },
    { key: 'enterprise', label: 'Enterprise Plan', icon: Trophy },
    { key: 'student_discount', label: 'Student Discount', icon: Star }
  ]
};

export function CompareModal({ isOpen, onClose, selectedTools, onRemoveTool }: CompareModalProps) {
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const collapsedCategories = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  // Generate shareable link
  const generateShareLink = () => {
    const toolIds = selectedTools.map(t => t.id).join(',');
    const url = `${window.location.origin}/compare?tools=${toolIds}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Comparison link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Export comparison as CSV
  const exportAsCSV = () => {
    const headers = ['Feature', ...selectedTools.map(t => t.name)];
    const rows = [];
    
    Object.entries(FEATURE_CATEGORIES).forEach(([category, features]) => {
      rows.push([category]);
      features.forEach(feature => {
        const row = [feature.label];
        selectedTools.forEach(tool => {
          // Mock data - in real app, this would come from tool data
          row.push(Math.random() > 0.5 ? 'Yes' : 'No');
        });
        rows.push(row);
      });
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparison-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Comparison exported as CSV!');
  };

  // Get feature value for a tool (mock data)
  const getFeatureValue = (toolId: string, featureKey: string) => {
    // In real app, this would come from actual tool data
    const mockValues = {
      'ai_powered': true,
      'collaboration': Math.random() > 0.3,
      'cloud_based': Math.random() > 0.2,
      'offline_mode': Math.random() > 0.7,
      'api_access': Math.random() > 0.5,
      'custom_models': Math.random() > 0.6,
      'end_to_end': Math.random() > 0.5,
      'data_privacy': true,
      'gdpr_compliant': Math.random() > 0.4,
      'sso_support': Math.random() > 0.6,
      'free_tier': Math.random() > 0.5,
      'trial_period': Math.random() > 0.3,
      'enterprise': Math.random() > 0.4,
      'student_discount': Math.random() > 0.7
    };
    return mockValues[featureKey] || false;
  };

  // Check if feature values differ across tools
  const isDifferent = (featureKey: string) => {
    const values = selectedTools.map(tool => getFeatureValue(tool.id, featureKey));
    return values.some(v => v !== values[0]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GitCompare className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Tool Comparison</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tool Cards */}
              <div className="flex gap-4">
                {selectedTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tool.logo}</span>
                        <div>
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-white/80 text-sm">{tool.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveTool(tool.id)}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{tool.rating}</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {tool.pricing}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-gray-50 px-6 py-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch
                    checked={showOnlyDifferences}
                    onCheckedChange={setShowOnlyDifferences}
                  />
                  <span className="text-sm font-medium">Show only differences</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateShareLink}
                        className="gap-2"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                        Share
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy comparison link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportAsCSV}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="mx-6 mt-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1 px-6 pb-6">
                <TabsContent value="overview" className="mt-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {selectedTools.map((tool, index) => (
                      <Card key={tool.id} className="p-4">
                        <div className="text-center">
                          <span className="text-4xl mb-2">{tool.logo}</span>
                          <h4 className="font-semibold mb-4">{tool.name}</h4>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rating</span>
                              <span className="font-medium">{tool.rating} ⭐</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Users</span>
                              <span className="font-medium">{tool.users || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Pricing</span>
                              <span className="font-medium">{tool.pricing}</span>
                            </div>
                          </div>

                          <Button className="w-full mt-4" variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit Website
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Description */}
                  <h3 className="font-semibold mb-3">Description</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {selectedTools.map(tool => (
                      <Card key={tool.id} className="p-4">
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="features" className="mt-4 space-y-6">
                  {Object.entries(FEATURE_CATEGORIES).map(([category, features]) => {
                    const hasVisibleFeatures = !showOnlyDifferences || 
                      features.some(f => isDifferent(f.key));
                    
                    if (!hasVisibleFeatures) return null;

                    return (
                      <div key={category}>
                        <h3 className="font-semibold mb-3 text-purple-600">{category}</h3>
                        <div className="space-y-2">
                          {features.map(feature => {
                            if (showOnlyDifferences && !isDifferent(feature.key)) {
                              return null;
                            }

                            const Icon = feature.icon;
                            
                            return (
                              <div key={feature.key} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-medium">{feature.label}</span>
                                </div>
                                {selectedTools.map(tool => {
                                  const hasFeature = getFeatureValue(tool.id, feature.key);
                                  return (
                                    <div key={tool.id} className="text-center">
                                      {hasFeature ? (
                                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                                      ) : (
                                        <Minus className="w-5 h-5 text-gray-400 mx-auto" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </TabsContent>

                <TabsContent value="pricing" className="mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    {selectedTools.map(tool => (
                      <Card key={tool.id} className="p-6">
                        <div className="text-center mb-6">
                          <h4 className="font-semibold text-lg mb-2">{tool.name}</h4>
                          <div className="text-3xl font-bold text-purple-600">
                            {tool.pricing === 'Free' ? '$0' : 
                             tool.pricing === 'Freemium' ? 'Free to start' : 
                             '$XX/mo'}
                          </div>
                        </div>

                        <div className="space-y-3">
                          {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <Button className="w-full mt-6">
                          Get Started
                        </Button>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    {selectedTools.map(tool => (
                      <Card key={tool.id} className="p-6">
                        <h4 className="font-semibold mb-4">{tool.name} Reviews</h4>
                        
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-purple-600 mb-1">
                            {tool.rating}
                          </div>
                          <div className="flex justify-center gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                className={`w-5 h-5 ${
                                  star <= tool.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{tool.users || '1000+'} users</p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Pros:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Fast and reliable</li>
                            <li>• Great customer support</li>
                            <li>• Easy to use interface</li>
                          </ul>
                        </div>

                        <div className="space-y-2 mt-4">
                          <h5 className="font-medium text-sm">Cons:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Limited free tier</li>
                            <li>• Learning curve</li>
                          </ul>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}