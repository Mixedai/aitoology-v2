import { useState, } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  MousePointer, 
  Zap, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Download, 
  Upload, 
  Heart, 
  Star, 
  Plus, 
  Minus, 
  Settings, 
  User, 
  Search, 
  Filter, 
  ArrowRight,
  ChevronDown,
  ExternalLink,
  ShoppingCart,
  CreditCard,
  Send,
  Save,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Palette,
  Code2,
  Layers,
  Sparkles
} from 'lucide-react';

interface EnhancedButtonDesignSystemProps {
  onNavigate: (from: string, to: string, params?: any) => void;
  currentScreen: string;
}

export function EnhancedButtonDesignSystem({ onNavigate, currentScreen }: EnhancedButtonDesignSystemProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(true);
  const [visibility, setVisibility] = useState(true);
  const [locked, setLocked] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Button showcase data
  const buttonVariants = [
    {
      name: 'Primary',
      variant: 'default' as const,
      description: 'Main CTAs, primary actions',
      usage: 'Sign Up, Get Started, Submit',
      code: '<Button variant="default">Primary Action</Button>',
      example: <Button variant="default">Primary Action</Button>
    },
    {
      name: 'Secondary',
      variant: 'secondary' as const,
      description: 'Secondary actions, supporting buttons',
      usage: 'Cancel, Back, Learn More',
      code: '<Button variant="secondary">Secondary Action</Button>',
      example: <Button variant="secondary">Secondary Action</Button>
    },
    {
      name: 'Outline',
      variant: 'outline' as const,
      description: 'Neutral actions, form buttons',
      usage: 'Filter, Sort, Options',
      code: '<Button variant="outline">Outline Button</Button>',
      example: <Button variant="outline">Outline Button</Button>
    },
    {
      name: 'Ghost',
      variant: 'ghost' as const,
      description: 'Subtle actions, menu items',
      usage: 'Close, Minimize, Menu Items',
      code: '<Button variant="ghost">Ghost Button</Button>',
      example: <Button variant="ghost">Ghost Button</Button>
    },
    {
      name: 'Navbar',
      variant: 'navbar' as const,
      description: 'Navigation-specific buttons, matches navbar color',
      usage: 'Nav CTAs, Header Buttons',
      code: '<Button variant="navbar">Navbar Style</Button>',
      example: <Button variant="navbar">Navbar Style</Button>
    },
    {
      name: 'Success',
      variant: 'success' as const,
      description: 'Positive actions, confirmations',
      usage: 'Save, Confirm, Approve',
      code: '<Button variant="success">Success Action</Button>',
      example: <Button variant="success">Success Action</Button>
    },
    {
      name: 'Warning',
      variant: 'warning' as const,
      description: 'Caution actions, important notices',
      usage: 'Warning, Caution, Important',
      code: '<Button variant="warning">Warning Action</Button>',
      example: <Button variant="warning">Warning Action</Button>
    },
    {
      name: 'Destructive',
      variant: 'destructive' as const,
      description: 'Delete actions, critical operations',
      usage: 'Delete, Remove, Cancel Subscription',
      code: '<Button variant="destructive">Delete Action</Button>',
      example: <Button variant="destructive">Delete Action</Button>
    },
    {
      name: 'Gradient',
      variant: 'gradient' as const,
      description: 'Premium actions, special CTAs',
      usage: 'Upgrade, Premium, Special Offers',
      code: '<Button variant="gradient">Premium Action</Button>',
      example: <Button variant="gradient">Premium Action</Button>
    },
    {
      name: 'Outline Primary',
      variant: 'outline-primary' as const,
      description: 'Primary outline style',
      usage: 'Alternative Primary, Secondary CTA',
      code: '<Button variant="outline-primary">Primary Outline</Button>',
      example: <Button variant="outline-primary">Primary Outline</Button>
    },
    {
      name: 'Outline Navbar',
      variant: 'outline-navbar' as const,
      description: 'Navbar outline style',
      usage: 'Navbar Secondary Actions',
      code: '<Button variant="outline-navbar">Navbar Outline</Button>',
      example: <Button variant="outline-navbar">Navbar Outline</Button>
    }
  ];

  const buttonSizes = [
    {
      name: 'Small',
      size: 'sm' as const,
      height: '32px',
      usage: 'Compact interfaces, tables, cards',
      code: '<Button size="sm">Small Button</Button>',
      example: <Button size="sm">Small Button</Button>
    },
    {
      name: 'Default',
      size: 'default' as const,
      height: '40px',
      usage: 'Standard forms, general actions',
      code: '<Button size="default">Default Button</Button>',
      example: <Button size="default">Default Button</Button>
    },
    {
      name: 'Large',
      size: 'lg' as const,
      height: '48px',
      usage: 'Hero sections, primary CTAs',
      code: '<Button size="lg">Large Button</Button>',
      example: <Button size="lg">Large Button</Button>
    },
    {
      name: 'Extra Large',
      size: 'xl' as const,
      height: '56px',
      usage: 'Landing pages, major actions',
      code: '<Button size="xl">Extra Large Button</Button>',
      example: <Button size="xl">Extra Large Button</Button>
    }
  ];

  const interactiveExamples = [
    {
      title: 'Loading States',
      description: 'Buttons with loading indicators and disabled states',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={simulateLoading} 
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Process
              </>
            )}
          </Button>
          
          <Button variant="outline" disabled>
            <Pause className="w-4 h-4" />
            Disabled
          </Button>
          
          <Button variant="success" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Complete'}
          </Button>
        </div>
      )
    },
    {
      title: 'Icon Combinations',
      description: 'Buttons with various icon placements and styles',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button variant="default" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          
          <Button variant="outline" className="gap-2">
            Upload
            <Upload className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button variant="outline-primary" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Open External
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )
    },
    {
      title: 'Toggle States',
      description: 'Buttons that change appearance based on state',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button 
            variant={favorites.includes('heart') ? 'destructive' : 'outline'}
            onClick={() => toggleFavorite('heart')}
            className="gap-2"
          >
            <Heart className={`w-4 h-4 ${favorites.includes('heart') ? 'fill-current' : ''}`} />
            {favorites.includes('heart') ? 'Favorited' : 'Add to Favorites'}
          </Button>
          
          <Button 
            variant={notifications ? 'warning' : 'outline'}
            onClick={() => setNotifications(!notifications)}
            className="gap-2"
          >
            {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {notifications ? 'Notifications On' : 'Notifications Off'}
          </Button>
          
          <Button 
            variant={visibility ? 'ghost' : 'secondary'}
            onClick={() => setVisibility(!visibility)}
            className="gap-2"
          >
            {visibility ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {visibility ? 'Hide' : 'Show'}
          </Button>
          
          <Button 
            variant={locked ? 'destructive' : 'success'}
            onClick={() => setLocked(!locked)}
            className="gap-2"
          >
            {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {locked ? 'Locked' : 'Unlocked'}
          </Button>
        </div>
      )
    },
    {
      title: 'E-commerce Actions',
      description: 'Common e-commerce and transaction buttons',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button variant="gradient" size="lg" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          
          <Button variant="success" size="lg" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Buy Now
          </Button>
          
          <Button variant="outline-primary" className="gap-2">
            <Heart className="w-4 h-4" />
            Save for Later
          </Button>
          
          <Button variant="navbar" className="gap-2">
            <Send className="w-4 h-4" />
            Share Product
          </Button>
        </div>
      )
    },
    {
      title: 'Form Actions',
      description: 'Common form and CRUD operation buttons',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button variant="success" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          
          <Button variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
          
          <Button variant="ghost" className="gap-2">
            Cancel
          </Button>
        </div>
      )
    }
  ];

  const CodeBlock = ({ code, title }: { code: string; title: string }) => (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <code className="text-sm font-medium">{title}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCopyCode(code)}
          className="gap-2"
        >
          {copiedCode === code ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copiedCode === code ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MousePointer className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1>Enhanced Button Design System</h1>
              <p className="text-muted-foreground mt-2">
                Professional button components with modern interactions, accessibility features, and consistent styling
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-2">
              <Zap className="w-3 h-3" />
              Interactive States
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Palette className="w-3 h-3" />
              11 Variants
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Layers className="w-3 h-3" />
              4 Sizes + Icons
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Sparkles className="w-3 h-3" />
              Micro-interactions
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="variants" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="variants">Button Variants</TabsTrigger>
            <TabsTrigger value="sizes">Sizes & Icons</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Examples</TabsTrigger>
            <TabsTrigger value="guidelines">Usage Guidelines</TabsTrigger>
          </TabsList>

          {/* Button Variants Tab */}
          <TabsContent value="variants" className="space-y-8">
            <div>
              <h2 className="mb-2">Button Variants</h2>
              <p className="text-muted-foreground mb-6">
                Complete set of button styles for different use cases and contexts. Each variant follows accessibility guidelines with proper contrast ratios.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {buttonVariants.map((variant, index) => (
                  <Card key={index}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3>{variant.name}</h3>
                          <p className="text-muted-foreground mt-1">{variant.description}</p>
                        </div>
                        {variant.example}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Best used for:</p>
                        <p className="text-sm text-muted-foreground">{variant.usage}</p>
                      </div>
                      <CodeBlock code={variant.code} title="Implementation" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sizes Tab */}
          <TabsContent value="sizes" className="space-y-8">
            <div>
              <h2 className="mb-2">Button Sizes</h2>
              <p className="text-muted-foreground mb-6">
                Four size variants following the 8-point grid system. Each size maintains proper touch targets and visual hierarchy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {buttonSizes.map((size, index) => (
                  <Card key={index}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3>{size.name}</h3>
                          <p className="text-muted-foreground">Height: {size.height}</p>
                        </div>
                        {size.example}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Recommended for:</p>
                        <p className="text-sm text-muted-foreground">{size.usage}</p>
                      </div>
                      <CodeBlock code={size.code} title="Implementation" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              {/* Icon Buttons */}
              <div>
                <h3 className="mb-4">Icon Buttons</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <h4>Small Icons</h4>
                      <p className="text-muted-foreground">32x32px compact icons</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon-sm">
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Button variant="default" size="icon-sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                      <CodeBlock code='<Button variant="outline" size="icon-sm"><Plus className="w-3 h-3" /></Button>' title="Small Icon" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h4>Standard Icons</h4>
                      <p className="text-muted-foreground">40x40px standard icons</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <User className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Search className="w-4 h-4" />
                        </Button>
                        <Button variant="default" size="icon">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                      <CodeBlock code='<Button variant="outline" size="icon"><User className="w-4 h-4" /></Button>' title="Standard Icon" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h4>Large Icons</h4>
                      <p className="text-muted-foreground">48x48px prominent icons</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon-lg">
                          <Star className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon-lg">
                          <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="default" size="icon-lg">
                          <Settings className="w-5 h-5" />
                        </Button>
                      </div>
                      <CodeBlock code='<Button variant="outline" size="icon-lg"><Star className="w-5 h-5" /></Button>' title="Large Icon" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Interactive Examples Tab */}
          <TabsContent value="interactive" className="space-y-8">
            <div>
              <h2 className="mb-2">Interactive Examples</h2>
              <p className="text-muted-foreground mb-6">
                Real-world button interactions with state management, animations, and user feedback.
              </p>
              
              <div className="space-y-8">
                {interactiveExamples.map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <h3>{example.title}</h3>
                      <p className="text-muted-foreground">{example.description}</p>
                    </CardHeader>
                    <CardContent>
                      {example.component}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-8">
            <div>
              <h2 className="mb-2">Usage Guidelines</h2>
              <p className="text-muted-foreground mb-6">
                Best practices for implementing buttons in your application with accessibility and consistency in mind.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Accessibility Guidelines */}
                <Card>
                  <CardHeader>
                    <h3>Accessibility Requirements</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Focus Management</p>
                          <p className="text-xs text-muted-foreground">All buttons include focus-visible styles with 2px ring offset</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Contrast Ratios</p>
                          <p className="text-xs text-muted-foreground">All variants meet WCAG 2.1 AA standards (4.5:1 minimum)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Touch Targets</p>
                          <p className="text-xs text-muted-foreground">Minimum 40px height for mobile accessibility</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">ARIA Labels</p>
                          <p className="text-xs text-muted-foreground">Icon buttons require aria-label for screen readers</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Design Guidelines */}
                <Card>
                  <CardHeader>
                    <h3>Design Guidelines</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">8-Point Grid</p>
                          <p className="text-xs text-muted-foreground">All spacing follows 8px increments (gap-2, gap-4, etc.)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Semantic Typography</p>
                          <p className="text-xs text-muted-foreground">No manual font-size or font-weight classes needed</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Color Tokens</p>
                          <p className="text-xs text-muted-foreground">Uses semantic color system (primary, secondary, etc.)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Consistent Spacing</p>
                          <p className="text-xs text-muted-foreground">gap-2 for all icon+text combinations</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Implementation Examples */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <h3>Implementation Examples</h3>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">✅ Correct Usage</h4>
                      <CodeBlock 
                        code={`// ✅ Good: Semantic variants with proper spacing
<Button variant="default" className="gap-2">
  <Plus className="w-4 h-4" />
  Add Item
</Button>

<Button variant="outline" size="lg">
  Learn More
</Button>

<Button variant="destructive" className="gap-2" aria-label="Delete item">
  <Trash2 className="w-4 h-4" />
  Delete
</Button>`}
                        title="Good Implementation"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">❌ Avoid These Patterns</h4>
                      <CodeBlock 
                        code={`// ❌ Bad: Manual styling breaks design system
<button className="bg-orange-500 text-white font-bold text-lg px-3 py-1">
  Custom Button
</button>

// ❌ Bad: Non-standard spacing
<Button className="gap-3 px-5">
  Breaks Grid System
</Button>

// ❌ Bad: Missing accessibility
<Button variant="ghost" size="icon">
  <X />  {/* No aria-label for screen readers */}
</Button>`}
                        title="Bad Implementation"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Code2 className="w-4 h-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> All button variants automatically handle focus states, hover effects, and disabled states. 
                  Use the semantic variants instead of custom styling to maintain consistency across your application.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Actions */}
      <div className="border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3>Enhanced Button System</h3>
              <p className="text-muted-foreground">
                Professional, accessible, and consistent button components for modern web applications
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => onNavigate(currentScreen, 'design-tokens')}
                className="gap-2"
              >
                <Palette className="w-4 h-4" />
                Design Tokens
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate(currentScreen, 'micro-interactions')}
                className="gap-2"
              >
                <Zap className="w-4 h-4" />
                Micro-Interactions
              </Button>
              <Button 
                variant="default" 
                onClick={() => onNavigate(currentScreen, 'components')}
                className="gap-2"
              >
                <Layers className="w-4 h-4" />
                View All Components
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}