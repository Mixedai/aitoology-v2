import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Copy, Check, Eye, Code, Palette, Type, Ruler, Layout } from "lucide-react";
import { motion } from "framer-motion";

// Import new insurance components
import { HeroSection } from "../insurance/HeroSection";
import { AboutUsBlock } from "../insurance/AboutUsBlock";
import { InsuranceCategoryCard } from "../insurance/InsuranceCategoryCard";
import { PartnerLogosRow } from "../insurance/PartnerLogosRow";
import { ContactSection } from "../insurance/ContactSection";

export function InsuranceDesignSystem() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const colorTokens = [
    {
      name: "Primary",
      description: "Main brand color for buttons, links, and key actions",
      light: "#FF6B35",
      dark: "#FF6B35",
      tailwind: "bg-primary text-primary border-primary",
      usage: "Primary buttons, active states, brand accents"
    },
    {
      name: "Secondary", 
      description: "Supporting color for secondary actions and text",
      light: "#4A5C7A",
      dark: "#475569",
      tailwind: "bg-secondary text-secondary border-secondary",
      usage: "Secondary buttons, navigation, helper text"
    },
    {
      name: "Background",
      description: "Main page background color",
      light: "#ffffff",
      dark: "#0F172A",
      tailwind: "bg-background",
      usage: "Page backgrounds, modal overlays"
    },
    {
      name: "Foreground",
      description: "Primary text color with good contrast",
      light: "#1A1A1A",
      dark: "#F1F5F9", 
      tailwind: "text-foreground",
      usage: "Headers, body text, primary content"
    },
    {
      name: "Muted",
      description: "Subtle background for cards and sections",
      light: "#E5E1DB",
      dark: "#334155",
      tailwind: "bg-muted text-muted-foreground",
      usage: "Card backgrounds, disabled states, subtle sections"
    },
    {
      name: "Success",
      description: "Success states and positive feedback",
      light: "#10B981",
      dark: "#10B981",
      tailwind: "bg-success text-success border-success",
      usage: "Success messages, confirmations, positive indicators"
    },
    {
      name: "Destructive",
      description: "Error states and warnings",
      light: "#EF4444", 
      dark: "#EF4444",
      tailwind: "bg-destructive text-destructive border-destructive",
      usage: "Error messages, delete buttons, warnings"
    },
    {
      name: "Warning",
      description: "Warning states and caution indicators",
      light: "#EAB308",
      dark: "#EAB308", 
      tailwind: "bg-warning text-warning border-warning",
      usage: "Warning messages, attention indicators"
    }
  ];

  const spacingScale = [
    { class: "p-1", value: "0.25rem", pixels: "4px", usage: "Icon padding, small spacing" },
    { class: "p-2", value: "0.5rem", pixels: "8px", usage: "Compact padding, tight layouts" },
    { class: "p-3", value: "0.75rem", pixels: "12px", usage: "Small component padding" },
    { class: "p-4", value: "1rem", pixels: "16px", usage: "Standard component padding" },
    { class: "p-6", value: "1.5rem", pixels: "24px", usage: "Card content, comfortable spacing" },
    { class: "p-8", value: "2rem", pixels: "32px", usage: "Page sections, large containers" },
    { class: "p-12", value: "3rem", pixels: "48px", usage: "Hero sections, major spacing" },
    { class: "gap-4", value: "1rem", pixels: "16px", usage: "Grid gaps, flex spacing" },
    { class: "gap-6", value: "1.5rem", pixels: "24px", usage: "Section spacing" },
    { class: "gap-8", value: "2rem", pixels: "32px", usage: "Layout column gaps" }
  ];

  const typographyScale = [
    {
      name: "Heading 1",
      element: "h1",
      size: "1.75rem", // 28px at 14px base
      weight: "500",
      lineHeight: "1.5",
      tailwind: "text-2xl font-medium",
      usage: "Page titles, main headers"
    },
    {
      name: "Heading 2", 
      element: "h2",
      size: "1.5rem", // 24px
      weight: "500",
      lineHeight: "1.5", 
      tailwind: "text-xl font-medium",
      usage: "Section headers, card titles"
    },
    {
      name: "Heading 3",
      element: "h3", 
      size: "1.25rem", // 20px
      weight: "500",
      lineHeight: "1.5",
      tailwind: "text-lg font-medium", 
      usage: "Subsection headers"
    },
    {
      name: "Heading 4",
      element: "h4",
      size: "1rem", // 16px
      weight: "500", 
      lineHeight: "1.5",
      tailwind: "text-base font-medium",
      usage: "Small headers, form labels"
    },
    {
      name: "Body Text",
      element: "p",
      size: "1rem", // 16px
      weight: "400",
      lineHeight: "1.5",
      tailwind: "text-base font-normal",
      usage: "Paragraph text, descriptions"
    },
    {
      name: "Button Text",
      element: "button", 
      size: "1rem", // 16px
      weight: "500",
      lineHeight: "1.5",
      tailwind: "text-base font-medium",
      usage: "Button labels, interactive text"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Insurance Design System</h1>
                <p className="text-muted-foreground">
                  Complete design tokens, components, and guidelines for our insurance web application
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? '🌞' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="colors" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="colors" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="spacing" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Spacing
              </TabsTrigger>
              <TabsTrigger value="components" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Components
              </TabsTrigger>
            </TabsList>

            {/* Colors Section */}
            <TabsContent value="colors" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
                <p className="text-muted-foreground mb-8">
                  Our color system provides semantic meaning and ensures accessibility across light and dark themes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colorTokens.map((color, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{color.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(color.tailwind, `color-${index}`)}
                        >
                          {copiedCode === `color-${index}` ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <div 
                            className="h-16 rounded-lg border"
                            style={{ backgroundColor: color.light }}
                          />
                          <div className="text-xs">
                            <div className="font-mono">{color.light}</div>
                            <div className="text-muted-foreground">Light</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div 
                            className="h-16 rounded-lg border"
                            style={{ backgroundColor: color.dark }}
                          />
                          <div className="text-xs">
                            <div className="font-mono">{color.dark}</div>
                            <div className="text-muted-foreground">Dark</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{color.description}</p>
                        <div className="bg-muted p-2 rounded text-xs font-mono">
                          {color.tailwind}
                        </div>
                        <p className="text-xs text-muted-foreground">{color.usage}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Typography Section */}
            <TabsContent value="typography" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Typography Scale</h2>
                <p className="text-muted-foreground mb-8">
                  Our typography system uses a 14px base font size with consistent spacing and weights.
                </p>
              </div>

              <div className="space-y-6">
                {typographyScale.map((type, index) => (
                  <Card key={index} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{type.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(type.tailwind, `typo-${index}`)}
                          >
                            {copiedCode === `typo-${index}` ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Element</div>
                            <div className="font-mono">{type.element}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Size</div>
                            <div className="font-mono">{type.size}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Weight</div>
                            <div className="font-mono">{type.weight}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Line Height</div>
                            <div className="font-mono">{type.lineHeight}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-muted p-2 rounded text-xs font-mono">
                            {type.tailwind}
                          </div>
                          <p className="text-xs text-muted-foreground">{type.usage}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div 
                          className={type.tailwind}
                          style={{ 
                            fontSize: type.size,
                            fontWeight: type.weight,
                            lineHeight: type.lineHeight
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Spacing Section */} 
            <TabsContent value="spacing" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Spacing Scale</h2>
                <p className="text-muted-foreground mb-8">
                  Our spacing system follows an 8-point grid with consistent padding, margins, and gaps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {spacingScale.map((spacing, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold font-mono">{spacing.class}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(spacing.class, `spacing-${index}`)}
                        >
                          {copiedCode === `spacing-${index}` ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Value</div>
                          <div className="font-mono">{spacing.value}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Pixels</div>
                          <div className="font-mono">{spacing.pixels}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-primary/10 border border-primary rounded">
                          <div 
                            className="bg-primary/20 rounded"
                            style={{ 
                              padding: spacing.value,
                              margin: '4px'
                            }}
                          >
                            <div className="bg-primary rounded h-4"></div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{spacing.usage}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Components Section */}
            <TabsContent value="components" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Component Library</h2>
                <p className="text-muted-foreground mb-8">
                  Complete set of reusable components for insurance web applications with responsive design and interactive states.
                </p>
              </div>

              {/* Insurance-Specific Components */}
              <Card className="p-6">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Insurance Components</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('Complete insurance component library with responsive variants', 'insurance-components')}
                    >
                      {copiedCode === 'insurance-components' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Hero Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Hero Section</h4>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Default Variant</div>
                        <div className="border rounded-lg overflow-hidden">
                          <HeroSection variant="default" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<HeroSection variant="default" className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 md:py-24 lg:py-32" />`}
                        </code>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Centered Variant</div>
                        <div className="border rounded-lg overflow-hidden">
                          <HeroSection variant="centered" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<HeroSection variant="centered" className="bg-gradient-to-br from-background to-muted py-16 md:py-24 lg:py-32" />`}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* About Us Block */}
                  <div className="space-y-4">
                    <h4 className="font-medium">About Us Block</h4>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Default Layout</div>
                        <div className="border rounded-lg overflow-hidden">
                          <AboutUsBlock variant="default" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<AboutUsBlock variant="default" className="bg-background py-16 md:py-24" />`}
                        </code>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Stats Variant</div>
                        <div className="border rounded-lg overflow-hidden">
                          <AboutUsBlock variant="stats" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<AboutUsBlock variant="stats" className="bg-background py-16 md:py-24" />`}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Insurance Category Cards */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Insurance Category Card</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Default Card</div>
                        <InsuranceCategoryCard type="auto" variant="default" />
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<InsuranceCategoryCard type="auto" variant="default" />`}
                        </code>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Compact Card</div>
                        <InsuranceCategoryCard type="home" variant="compact" />
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<InsuranceCategoryCard type="home" variant="compact" />`}
                        </code>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Featured Card</div>
                        <InsuranceCategoryCard type="life" variant="featured" />
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<InsuranceCategoryCard type="life" variant="featured" />`}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Partner Logos */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Partner Logos Row</h4>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Default Layout</div>
                        <div className="border rounded-lg overflow-hidden">
                          <PartnerLogosRow variant="default" title="Trusted Partners" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<PartnerLogosRow variant="default" title="Trusted Partners" className="bg-muted py-16" />`}
                        </code>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Animated Carousel</div>
                        <div className="border rounded-lg overflow-hidden">
                          <PartnerLogosRow variant="animated" title="Industry Leaders" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<PartnerLogosRow variant="animated" title="Industry Leaders" className="bg-background py-12 overflow-hidden" />`}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Contact Section</h4>
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Default Layout</div>
                        <div className="border rounded-lg overflow-hidden">
                          <ContactSection variant="default" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<ContactSection variant="default" className="bg-background py-16 md:py-24" />`}
                        </code>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Info Cards Layout</div>
                        <div className="border rounded-lg overflow-hidden">
                          <ContactSection variant="info-cards" />
                        </div>
                        <code className="text-xs bg-muted p-2 rounded block mt-2">
                          {`<ContactSection variant="info-cards" className="bg-background py-16 md:py-24" />`}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Component Properties */}
                  <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-4">Responsive Breakpoints & Classes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium mb-2">Mobile First</div>
                        <code className="bg-background p-2 rounded block">
                          px-4 py-8 text-2xl
                        </code>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Tablet (md:)</div>
                        <code className="bg-background p-2 rounded block">
                          md:px-6 md:py-12 md:text-3xl
                        </code>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Desktop (lg:)</div>
                        <code className="bg-background p-2 rounded block">
                          lg:px-8 lg:py-16 lg:text-4xl
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Usage Guidelines */}
                  <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-medium mb-4 text-primary">Component Usage Guidelines</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Hero Section:</strong> Use at the top of landing pages. Choose variant based on content layout needs.
                      </div>
                      <div>
                        <strong>About Us Block:</strong> Ideal for company information sections. Stats variant works well on main pages.
                      </div>
                      <div>
                        <strong>Category Cards:</strong> Product showcase pages. Use compact for grids, featured for promotional content.
                      </div>
                      <div>
                        <strong>Partner Logos:</strong> Trust building sections. Animated variant for modern, dynamic feel.
                      </div>
                      <div>
                        <strong>Contact Section:</strong> Contact pages and lead generation. Form-focus variant maximizes conversions.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Basic UI Components - keep existing code */}
              {/* Button Components */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Button</h3>
                    <Button
                      variant="ghost"
                      size="sm" 
                      onClick={() => copyToClipboard('bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors', 'button-primary')}
                    >
                      {copiedCode === 'button-primary' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Primary Button</h4>
                      <div className="space-y-2">
                        <Button className="w-full">Default</Button>
                        <Button className="w-full hover:bg-primary/90">Hover</Button>
                        <Button className="w-full bg-primary/80">Active</Button>
                        <Button className="w-full" disabled>Disabled</Button>
                      </div>
                      <code className="text-xs bg-muted p-2 rounded block">
                        bg-primary text-primary-foreground hover:bg-primary/90
                      </code>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Secondary Button</h4>
                      <div className="space-y-2">
                        <Button variant="secondary" className="w-full">Default</Button>
                        <Button variant="secondary" className="w-full hover:bg-secondary/90">Hover</Button>
                        <Button variant="secondary" className="w-full bg-secondary/80">Active</Button>
                        <Button variant="secondary" className="w-full" disabled>Disabled</Button>
                      </div>
                      <code className="text-xs bg-muted p-2 rounded block">
                        bg-secondary text-secondary-foreground hover:bg-secondary/90
                      </code>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Outline Button</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">Default</Button>
                        <Button variant="outline" className="w-full hover:bg-muted">Hover</Button>
                        <Button variant="outline" className="w-full bg-muted">Active</Button>
                        <Button variant="outline" className="w-full" disabled>Disabled</Button>
                      </div>
                      <code className="text-xs bg-muted p-2 rounded block">
                        border border-border hover:bg-muted
                      </code>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Input Components */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Input</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('flex h-10 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:cursor-not-allowed disabled:opacity-50', 'input-field')}
                    >
                      {copiedCode === 'input-field' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Text Input States</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Default</label>
                          <Input placeholder="Enter your email" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Focused</label>
                          <Input placeholder="Enter your email" className="ring-2 ring-ring border-ring" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Error</label>
                          <Input placeholder="Enter your email" className="border-destructive ring-destructive" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Disabled</label>
                          <Input placeholder="Enter your email" disabled />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Tailwind Classes</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Default</div>
                          <code className="text-xs bg-muted p-2 rounded block">
                            border border-border bg-input px-3 py-2 rounded-lg
                          </code>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Focus</div>
                          <code className="text-xs bg-muted p-2 rounded block">
                            focus:ring-2 focus:ring-ring focus:border-ring
                          </code>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Error</div>
                          <code className="text-xs bg-muted p-2 rounded block">
                            border-destructive ring-destructive
                          </code>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Disabled</div>
                          <code className="text-xs bg-muted p-2 rounded block">
                            disabled:opacity-50 disabled:cursor-not-allowed
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Select Components */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Select</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('flex h-10 w-full items-center justify-between rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50', 'select-field')}
                    >
                      {copiedCode === 'select-field' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Select States</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Default</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="option1">Option 1</SelectItem>
                              <SelectItem value="option2">Option 2</SelectItem>
                              <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">With Value</label>
                          <Select defaultValue="option1">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="option1">Option 1</SelectItem>
                              <SelectItem value="option2">Option 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Disabled</label>
                          <Select disabled>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Implementation</h4>
                      <code className="text-xs bg-muted p-3 rounded block whitespace-pre-wrap">
{`<Select>
  <SelectTrigger className="h-10 border-border bg-input">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`}
                      </code>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Card Components */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Card</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('bg-card text-card-foreground border border-border rounded-lg shadow-sm', 'card-component')}
                    >
                      {copiedCode === 'card-component' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Basic Card</h4>
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Card Title</h4>
                        <p className="text-sm text-muted-foreground">
                          This is a basic card with padding and border.
                        </p>
                      </Card>
                      <code className="text-xs bg-muted p-2 rounded block">
                        bg-card border border-border rounded-lg p-4
                      </code>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Interactive Card</h4>
                      <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <h4 className="font-medium mb-2">Interactive</h4>
                        <p className="text-sm text-muted-foreground">
                          This card has hover effects and transitions.
                        </p>
                      </Card>
                      <code className="text-xs bg-muted p-2 rounded block">
                        hover:shadow-lg transition-shadow cursor-pointer
                      </code>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Muted Card</h4>
                      <Card className="p-4 bg-muted border-muted">
                        <h4 className="font-medium mb-2">Muted Style</h4>
                        <p className="text-sm text-muted-foreground">
                          This card uses muted background colors.
                        </p>
                      </Card>
                      <code className="text-xs bg-muted p-2 rounded block">
                        bg-muted border-muted
                      </code>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Navbar Component */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Navbar</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', 'navbar-component')}
                    >
                      {copiedCode === 'navbar-component' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <nav className="border-b bg-card px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-8">
                            <h3 className="font-bold text-primary">Insurance Co.</h3>
                            <div className="hidden md:flex space-x-6">
                              <a href="#" className="text-foreground hover:text-primary transition-colors">
                                Home
                              </a>
                              <a href="#" className="text-foreground hover:text-primary transition-colors">
                                Products
                              </a>
                              <a href="#" className="text-foreground hover:text-primary transition-colors">
                                Claims
                              </a>
                              <a href="#" className="text-foreground hover:text-primary transition-colors">
                                Support
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost">Login</Button>
                            <Button>Get Quote</Button>
                          </div>
                        </div>
                      </nav>
                    </div>

                    <code className="text-xs bg-muted p-3 rounded block whitespace-pre-wrap">
{`<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-primary">Insurance Co.</h3>
      <div className="hidden md:flex space-x-6">
        <a href="#" className="text-foreground hover:text-primary transition-colors">
          Home
        </a>
      </div>
      <Button>Get Quote</Button>
    </div>
  </div>
</nav>`}
                    </code>
                  </div>
                </div>
              </Card>

              {/* Footer Component */}
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Footer</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('bg-muted text-muted-foreground border-t py-8', 'footer-component')}
                    >
                      {copiedCode === 'footer-component' ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <footer className="bg-muted px-6 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          <div>
                            <h4 className="font-bold text-foreground mb-4">Insurance Co.</h4>
                            <p className="text-sm text-muted-foreground">
                              Protecting what matters most with comprehensive insurance solutions.
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground mb-3">Products</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li><a href="#" className="hover:text-foreground transition-colors">Auto Insurance</a></li>
                              <li><a href="#" className="hover:text-foreground transition-colors">Home Insurance</a></li>
                              <li><a href="#" className="hover:text-foreground transition-colors">Life Insurance</a></li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground mb-3">Support</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                              <li><a href="#" className="hover:text-foreground transition-colors">Claims</a></li>
                              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground mb-3">Legal</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                            </ul>
                          </div>
                        </div>
                        <div className="border-t border-border mt-8 pt-8 text-center">
                          <p className="text-sm text-muted-foreground">
                            © 2024 Insurance Co. All rights reserved.
                          </p>
                        </div>
                      </footer>
                    </div>

                    <code className="text-xs bg-muted p-3 rounded block whitespace-pre-wrap">
{`<footer className="bg-muted border-t py-8">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-bold text-foreground mb-4">Insurance Co.</h4>
        <p className="text-sm text-muted-foreground">
          Protecting what matters most.
        </p>
      </div>
      <!-- Additional columns -->
    </div>
  </div>
</footer>`}
                    </code>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}