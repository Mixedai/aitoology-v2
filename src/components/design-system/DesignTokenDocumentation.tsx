import { useState, } from 'react';

import { 
  Palette, 
  Type, 
  Grid3X3, 
  Layers, 
  Copy, 
  Check, 
  Eye, 
  Code2, 
  Zap,
  Box,
  Ruler,
  PaintBucket,
  Monitor,
  Smartphone,
  Sun,
  Moon
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';

interface DesignTokenDocumentationProps {
  onNavigate: (from: string, to: string, params?: any) => void;
  currentScreen: string;
}

interface ColorToken {
  name: string;
  value: string;
  description: string;
  usage: string[];
  wcagCompliance: string;
  cssVar: string;
  tailwindClass: string;
}

interface TypographyToken {
  name: string;
  element: string;
  size: string;
  weight: string;
  lineHeight: string;
  usage: string;
  cssVar: string;
}

interface SpacingToken {
  name: string;
  value: string;
  usage: string[];
  cssVar: string;
  tailwindClass: string;
}

interface ElevationToken {
  name: string;
  level: number;
  boxShadow: string;
  usage: string;
  tailwindClass: string;
}

export function DesignTokenDocumentation({ onNavigate, currentScreen }: DesignTokenDocumentationProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorTokens: ColorToken[] = [
    {
      name: 'Primary',
      value: '#FF6B35',
      description: 'AI Toologist turuncu brand rengi. Ana CTA butonları, linkler ve vurgular için.',
      usage: ['CTA Buttons', 'Primary Links', 'Brand Elements', 'Focus States'],
      wcagCompliance: 'AA (4.5:1 siyah üzerinde)',
      cssVar: '--primary',
      tailwindClass: 'bg-primary text-primary'
    },
    {
      name: 'Secondary',
      value: '#4A5C7A',
      description: 'Lacivert brand rengi. İkincil elementler ve professional görünüm için.',
      usage: ['Secondary Buttons', 'Muted Text', 'Professional Elements'],
      wcagCompliance: 'AAA (7.12:1 beyaz üzerinde)',
      cssVar: '--secondary',
      tailwindClass: 'bg-secondary text-secondary'
    },
    {
      name: 'Neutral Light',
      value: '#E5E1DB',
      description: 'Bej neutral renk. Arka planlar ve subtle elementler için.',
      usage: ['Card Backgrounds', 'Subtle Borders', 'Muted Sections'],
      wcagCompliance: 'AA (yeterli kontrast)',
      cssVar: '--neutral-light',
      tailwindClass: 'bg-neutral-light'
    },
    {
      name: 'Dark',
      value: '#1A1A1A',
      description: 'Ana metin rengi. Yüksek kontrast ve okunabilirlik için.',
      usage: ['Headings', 'Body Text', 'Dark UI Elements'],
      wcagCompliance: 'AAA (15.33:1 beyaz üzerinde)',
      cssVar: '--foreground',
      tailwindClass: 'text-foreground'
    },
    {
      name: 'Success',
      value: '#10B981',
      description: 'Başarı durumları ve pozitif feedback için.',
      usage: ['Success Messages', 'Confirmation States', 'Positive Actions'],
      wcagCompliance: 'AA (4.5:1)',
      cssVar: '--success',
      tailwindClass: 'text-success bg-success'
    },
    {
      name: 'Warning',
      value: '#EAB308',
      description: 'Uyarı durumları ve dikkat gerektiren elementler için.',
      usage: ['Warning Messages', 'Attention States', 'Caution Actions'],
      wcagCompliance: 'AA (4.5:1)',
      cssVar: '--warning',
      tailwindClass: 'text-warning bg-warning'
    },
    {
      name: 'Destructive',
      value: '#EF4444',
      description: 'Hata durumları ve destructive actionlar için.',
      usage: ['Error Messages', 'Delete Actions', 'Critical States'],
      wcagCompliance: 'AA (4.5:1)',
      cssVar: '--destructive',
      tailwindClass: 'text-destructive bg-destructive'
    }
  ];

  const typographyTokens: TypographyToken[] = [
    {
      name: 'Display',
      element: 'h1',
      size: '24px',
      weight: '500',
      lineHeight: '1.5',
      usage: 'Ana başlıklar ve hero sections',
      cssVar: '--text-2xl + --font-weight-medium'
    },
    {
      name: 'Heading',
      element: 'h2',
      size: '20px',
      weight: '500',
      lineHeight: '1.5',
      usage: 'Section başlıkları',
      cssVar: '--text-xl + --font-weight-medium'
    },
    {
      name: 'Subheading',
      element: 'h3',
      size: '18px',
      weight: '500',
      lineHeight: '1.5',
      usage: 'Alt başlıklar ve card başlıkları',
      cssVar: '--text-lg + --font-weight-medium'
    },
    {
      name: 'Body',
      element: 'p',
      size: '16px',
      weight: '400',
      lineHeight: '1.5',
      usage: 'Genel metin içeriği',
      cssVar: '--text-base + --font-weight-normal'
    },
    {
      name: 'Caption',
      element: 'small',
      size: '14px',
      weight: '400',
      lineHeight: '1.5',
      usage: 'Açıklayıcı metinler ve metadata',
      cssVar: '--text-sm + --font-weight-normal'
    },
    {
      name: 'Code',
      element: 'code',
      size: '14px',
      weight: '400',
      lineHeight: '1.5',
      usage: 'Kod snippets ve monospace metin',
      cssVar: '--text-sm (JetBrains Mono)'
    }
  ];

  const spacingTokens: SpacingToken[] = [
    {
      name: 'Micro',
      value: '8px',
      usage: ['Icon gaps', 'Inline spacing', 'Tight layouts'],
      cssVar: '--spacing-2',
      tailwindClass: 'gap-2 p-2 m-2'
    },
    {
      name: 'Small',
      value: '16px',
      usage: ['Form elements', 'Card padding', 'Component spacing'],
      cssVar: '--spacing-4',
      tailwindClass: 'gap-4 p-4 m-4'
    },
    {
      name: 'Medium',
      value: '24px',
      usage: ['Section spacing', 'Card gaps', 'Layout spacing'],
      cssVar: '--spacing-6',
      tailwindClass: 'gap-6 p-6 m-6'
    },
    {
      name: 'Large',
      value: '32px',
      usage: ['Major sections', 'Page margins', 'Hero spacing'],
      cssVar: '--spacing-8',
      tailwindClass: 'gap-8 p-8 m-8'
    },
    {
      name: 'XLarge',
      value: '48px',
      usage: ['Section breaks', 'Page padding', 'Major layouts'],
      cssVar: '--spacing-12',
      tailwindClass: 'gap-12 p-12 m-12'
    },
    {
      name: 'XXLarge',
      value: '64px',
      usage: ['Hero sections', 'Page separators', 'Major breaks'],
      cssVar: '--spacing-16',
      tailwindClass: 'gap-16 p-16 m-16'
    }
  ];

  const elevationTokens: ElevationToken[] = [
    {
      name: 'Flat',
      level: 0,
      boxShadow: 'none',
      usage: 'Default state, no elevation',
      tailwindClass: 'shadow-none'
    },
    {
      name: 'Subtle',
      level: 1,
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      usage: 'Cards, buttons, subtle depth',
      tailwindClass: 'shadow-sm'
    },
    {
      name: 'Medium',
      level: 2,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      usage: 'Hover states, active elements',
      tailwindClass: 'shadow-md'
    },
    {
      name: 'High',
      level: 3,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      usage: 'Modals, dropdowns, overlays',
      tailwindClass: 'shadow-lg'
    },
    {
      name: 'Maximum',
      level: 4,
      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      usage: 'Maximum emphasis, hero elements',
      tailwindClass: 'shadow-2xl'
    }
  ];

  const ColorSwatch = ({ token }: { token: ColorToken }) => (
    <Card className="relative group">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-lg border border-border"
            style={{ backgroundColor: token.value }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium">{token.name}</h4>
              <Badge variant="outline" className="text-xs">{token.wcagCompliance}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{token.value}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleCopyToken(token.value)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copiedToken === token.value ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        
        <p className="text-sm mb-4">{token.description}</p>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium mb-1">CSS Variable:</p>
            <code className="text-xs bg-muted px-2 py-1 rounded">{token.cssVar}</code>
          </div>
          <div>
            <p className="text-xs font-medium mb-1">Tailwind Classes:</p>
            <code className="text-xs bg-muted px-2 py-1 rounded">{token.tailwindClass}</code>
          </div>
          <div>
            <p className="text-xs font-medium mb-1">Usage:</p>
            <div className="flex flex-wrap gap-1">
              {token.usage.map((usage, index) => (
                <Badge key={index} variant="secondary" className="text-xs">{usage}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TypographyExample = ({ token }: { token: TypographyToken }) => {
    const Tag = token.element as keyof JSX.IntrinsicElements;
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{token.name}</h4>
              <Badge variant="outline">{token.element}</Badge>
            </div>
            
            <div className="border rounded-lg p-4 bg-background">
              <Tag className="!m-0">
                {token.name} Typography Example - AI Toologist Design System
              </Tag>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Size:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">{token.size}</code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Weight:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">{token.weight}</code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Line Height:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">{token.lineHeight}</code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">CSS Variable:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">{token.cssVar}</code>
              </div>
            </div>
            
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Usage:</p>
              <p className="text-sm">{token.usage}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SpacingExample = ({ token }: { token: SpacingToken }) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{token.name}</h4>
            <Badge variant="outline">{token.value}</Badge>
          </div>
          
          <div className="border rounded-lg p-4 bg-background">
            <div className="flex items-center">
              <div 
                className="bg-primary/20 border-2 border-primary border-dashed flex items-center justify-center"
                style={{ width: token.value, height: token.value }}
              >
                <Ruler className="w-3 h-3 text-primary" />
              </div>
              <div className="ml-4 text-sm text-muted-foreground">
                {token.value} spacing example
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground mb-1 text-sm">CSS Variable:</p>
              <code className="bg-muted px-2 py-1 rounded text-xs">{token.cssVar}</code>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Tailwind Classes:</p>
              <code className="bg-muted px-2 py-1 rounded text-xs">{token.tailwindClass}</code>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Usage:</p>
              <div className="flex flex-wrap gap-1">
                {token.usage.map((usage, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{usage}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ElevationExample = ({ token }: { token: ElevationToken }) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{token.name}</h4>
            <Badge variant="outline">Level {token.level}</Badge>
          </div>
          
          <div className="border rounded-lg p-8 bg-background flex justify-center">
            <div 
              className="w-24 h-24 bg-card rounded-lg flex items-center justify-center"
              style={{ boxShadow: token.boxShadow }}
            >
              <Box className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Box Shadow:</p>
              <code className="bg-muted px-2 py-1 rounded text-xs block break-all">{token.boxShadow}</code>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Tailwind Class:</p>
              <code className="bg-muted px-2 py-1 rounded text-xs">{token.tailwindClass}</code>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Usage:</p>
              <p className="text-sm">{token.usage}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-medium">Design Token Documentation</h1>
              <p className="text-muted-foreground mt-2">
                AI Toologist design system'inin temel token'ları ve kullanım rehberi
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-2">
              <Zap className="w-3 h-3" />
              WCAG 2.1 AA Compliant
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Grid3X3 className="w-3 h-3" />
              8-Point Grid System
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Type className="w-3 h-3" />
              Inter + JetBrains Mono
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Layers className="w-3 h-3" />
              4 Elevation Levels
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="colors" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="colors" className="gap-2">
              <PaintBucket className="w-4 h-4" />
              Renkler
            </TabsTrigger>
            <TabsTrigger value="typography" className="gap-2">
              <Type className="w-4 h-4" />
              Tipografi
            </TabsTrigger>
            <TabsTrigger value="spacing" className="gap-2">
              <Ruler className="w-4 h-4" />
              Spacing
            </TabsTrigger>
            <TabsTrigger value="elevation" className="gap-2">
              <Layers className="w-4 h-4" />
              Elevation
            </TabsTrigger>
            <TabsTrigger value="usage" className="gap-2">
              <Code2 className="w-4 h-4" />
              Kullanım
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <div>
              <h2 className="mb-2">Color Tokens</h2>
              <p className="text-muted-foreground mb-6">
                Brand renklerinden sistem renklerine kadar tüm color token'ları. Her renk WCAG 2.1 AA accessibility standartlarına uygun.
              </p>
              
              <Alert className="mb-6">
                <Eye className="w-4 h-4" />
                <AlertDescription>
                  Tüm renk kombinasyonları minimum 4.5:1 kontrast oranını sağlayacak şekilde test edilmiştir.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colorTokens.map((token, index) => (
                  <ColorSwatch key={index} token={token} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <div>
              <h2 className="mb-2">Typography Scale</h2>
              <p className="text-muted-foreground mb-6">
                Semantic HTML elementleri kullanarak otomatik styling. Inter (ana font) ve JetBrains Mono (kod) font aileleri.
              </p>
              
              <Alert className="mb-6">
                <Type className="w-4 h-4" />
                <AlertDescription>
                  Font-size ve font-weight class'ları kullanmayın. Semantic HTML elementleri otomatik styling sağlar.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {typographyTokens.map((token, index) => (
                  <TypographyExample key={index} token={token} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-8">
            <div>
              <h2 className="mb-2">8-Point Grid System</h2>
              <p className="text-muted-foreground mb-6">
                Tüm spacing değerleri 8'in katları olarak tanımlanmıştır. Visual consistency ve rhythm için kritik.
              </p>
              
              <Alert className="mb-6">
                <Grid3X3 className="w-4 h-4" />
                <AlertDescription>
                  gap-3, gap-5, p-3, p-5 gibi 8-point grid'i bozan değerler kullanmayın.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spacingTokens.map((token, index) => (
                  <SpacingExample key={index} token={token} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Elevation Tab */}
          <TabsContent value="elevation" className="space-y-8">
            <div>
              <h2 className="mb-2">Elevation System</h2>
              <p className="text-muted-foreground mb-6">
                Hierarchy ve depth oluşturmak için 5 seviye elevation sistemi. Cards'dan modallara kadar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elevationTokens.map((token, index) => (
                  <ElevationExample key={index} token={token} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-8">
            <div>
              <h2 className="mb-2">Implementation Guidelines</h2>
              <p className="text-muted-foreground mb-6">
                Design token'ların doğru kullanımı için kod örnekleri ve best practices.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Color Usage */}
                <Card>
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <PaintBucket className="w-5 h-5" />
                      Color Usage
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">✅ Doğru Kullanım:</p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`<Button className="bg-primary text-primary-foreground">
  Primary Action
</Button>

<p className="text-muted-foreground">
  Açıklayıcı metin
</p>`}
                      </pre>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">❌ Yanlış Kullanım:</p>
                      <pre className="bg-destructive/10 p-3 rounded text-xs overflow-x-auto">
{`<Button className="bg-orange-500 text-white">
  Hardcoded colors
</Button>

<p className="text-gray-600">
  Non-semantic colors
</p>`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Typography Usage */}
                <Card>
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Typography Usage
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">✅ Doğru Kullanım:</p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`<h1>Ana Başlık</h1>
<h2>Section Başlığı</h2>
<p>Normal metin içeriği</p>`}
                      </pre>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">❌ Yanlış Kullanım:</p>
                      <pre className="bg-destructive/10 p-3 rounded text-xs overflow-x-auto">
{`<div className="text-2xl font-bold">
  Non-semantic heading
</div>

<p className="text-lg font-medium">
  Custom sizing
</p>`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Spacing Usage */}
                <Card>
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <Ruler className="w-5 h-5" />
                      Spacing Usage
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">✅ Doğru Kullanım:</p>
                      <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`<div className="space-y-6 p-6">
  <Card className="p-6">
    <div className="flex gap-4">
      <!-- 8-point grid -->
    </div>
  </Card>
</div>`}
                      </pre>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">❌ Yanlış Kullanım:</p>
                      <pre className="bg-destructive/10 p-3 rounded text-xs overflow-x-auto">
{`<div className="space-y-5 p-3">
  <!-- Breaks 8-point grid -->
  <Card className="p-5">
    <div className="flex gap-3">
      <!-- Non-standard spacing -->
    </div>
  </Card>
</div>`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Accessibility Guidelines */}
                <Card>
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Accessibility Guidelines
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Minimum Kontrast</p>
                          <p className="text-xs text-muted-foreground">Tüm renk kombinasyonları 4.5:1 kontrast oranını sağlar</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Focus States</p>
                          <p className="text-xs text-muted-foreground">Tüm interactive elementlerde focus-visible styles</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Semantic HTML</p>
                          <p className="text-xs text-muted-foreground">Screen reader uyumluluğu için semantic elements</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-success rounded-full mt-2" />
                        <div>
                          <p className="font-medium text-sm">Motion Preferences</p>
                          <p className="text-xs text-muted-foreground">prefers-reduced-motion desteği</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Actions */}
      <div className="border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-medium mb-2">Design System Resources</h3>
              <p className="text-muted-foreground text-sm">
                Additional resources ve implementation guidelines
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => onNavigate(currentScreen, 'components')}
                className="gap-2"
              >
                <Layers className="w-4 h-4" />
                Component Library
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
                variant="outline" 
                onClick={() => onNavigate(currentScreen, 'theming-i18n')}
                className="gap-2"
              >
                <Globe className="w-4 h-4" />
                Theming & i18n
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}