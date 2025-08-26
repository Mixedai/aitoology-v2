import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Copy, Check, Monitor, Tablet, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

import { HeroSection } from "./HeroSection";
import { AboutUsBlock } from "./AboutUsBlock";
import { InsuranceCategoryCard } from "./InsuranceCategoryCard";
import { PartnerLogosRow } from "./PartnerLogosRow";
import { ContactSection } from "./ContactSection";

export function InsuranceComponentShowcase() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const deviceStyles = {
    desktop: "w-full",
    tablet: "w-[768px] mx-auto",
    mobile: "w-[375px] mx-auto"
  };

  const componentData = [
    {
      id: "hero-section",
      name: "Hero Section",
      description: "Primary landing section with call-to-action and trust indicators",
      variants: [
        {
          name: "Default",
          component: <HeroSection variant="default" />,
          props: 'variant="default"',
          tailwindClasses: [
            "bg-gradient-to-r from-primary/5 to-secondary/5",
            "py-16 md:py-24 lg:py-32",
            "container mx-auto px-4 sm:px-6 lg:px-8",
            "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl",
            "flex flex-col sm:flex-row gap-4"
          ]
        },
        {
          name: "Centered",
          component: <HeroSection variant="centered" />,
          props: 'variant="centered"',
          tailwindClasses: [
            "bg-gradient-to-br from-background to-muted",
            "text-center max-w-4xl mx-auto",
            "grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12",
            "w-12 h-12 bg-primary/10 rounded-full"
          ]
        },
        {
          name: "Split Layout",
          component: <HeroSection variant="split" />,
          props: 'variant="split"',
          tailwindClasses: [
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16",
            "order-2 lg:order-1",
            "bg-gradient-to-br from-primary/20 to-secondary/20"
          ]
        }
      ]
    },
    {
      id: "about-us",
      name: "About Us Block",
      description: "Company information with stats, timeline, or standard layout",
      variants: [
        {
          name: "Default",
          component: <AboutUsBlock variant="default" />,
          props: 'variant="default"',
          tailwindClasses: [
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16",
            "aspect-square bg-gradient-to-br",
            "grid grid-cols-1 sm:grid-cols-2 gap-6"
          ]
        },
        {
          name: "Stats Focus",
          component: <AboutUsBlock variant="stats" />,
          props: 'variant="stats"',
          tailwindClasses: [
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
            "text-4xl font-bold text-primary mb-2",
            "text-center"
          ]
        },
        {
          name: "Timeline",
          component: <AboutUsBlock variant="timeline" />,
          props: 'variant="timeline"',
          tailwindClasses: [
            "relative",
            "absolute left-4 md:left-1/2 md:-ml-0.5",
            "w-0.5 bg-border",
            "space-y-12"
          ]
        }
      ]
    },
    {
      id: "category-cards",
      name: "Insurance Category Cards",
      description: "Product showcase cards with pricing and features",
      variants: [
        {
          name: "Default",
          component: <InsuranceCategoryCard type="auto" variant="default" />,
          props: 'type="auto" variant="default"',
          tailwindClasses: [
            "p-6 hover:shadow-lg transition-all duration-200",
            "w-12 h-12 bg-primary/10 rounded-xl",
            "space-y-2 mb-6"
          ]
        },
        {
          name: "Compact",
          component: <InsuranceCategoryCard type="home" variant="compact" />,
          props: 'type="home" variant="compact"',
          tailwindClasses: [
            "p-4 hover:shadow-lg",
            "flex items-center gap-3 mb-3",
            "w-10 h-10 bg-primary/10 rounded-lg"
          ]
        },
        {
          name: "Featured",
          component: <InsuranceCategoryCard type="life" variant="featured" />,
          props: 'type="life" variant="featured"',
          tailwindClasses: [
            "p-6 hover:shadow-xl transition-all duration-300",
            "border-primary ring-1 ring-primary",
            "grid grid-cols-2 gap-3"
          ]
        }
      ]
    },
    {
      id: "partner-logos",
      name: "Partner Logos Row",
      description: "Trust building section with partner/client logos",
      variants: [
        {
          name: "Default Grid",
          component: <PartnerLogosRow variant="default" title="Trusted Partners" />,
          props: 'variant="default"',
          tailwindClasses: [
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8",
            "aspect-square bg-background rounded-xl",
            "hover:shadow-md transition-all duration-200"
          ]
        },
        {
          name: "Animated Carousel",
          component: <PartnerLogosRow variant="animated" title="Industry Leaders" />,
          props: 'variant="animated"',
          tailwindClasses: [
            "relative overflow-hidden",
            "flex gap-12 items-center",
            "animate motion library"
          ]
        },
        {
          name: "Minimal",
          component: <PartnerLogosRow variant="minimal" title="" />,
          props: 'variant="minimal"',
          tailwindClasses: [
            "flex flex-wrap items-center justify-center gap-8",
            "opacity-60 hover:opacity-100 transition-opacity"
          ]
        }
      ]
    },
    {
      id: "contact-section",
      name: "Contact Section",
      description: "Lead generation forms with contact information",
      variants: [
        {
          name: "Default Split",
          component: <ContactSection variant="default" />,
          props: 'variant="default"',
          tailwindClasses: [
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16",
            "space-y-6",
            "flex items-start gap-4"
          ]
        },
        {
          name: "Info Cards",
          component: <ContactSection variant="info-cards" />,
          props: 'variant="info-cards"',
          tailwindClasses: [
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
            "p-6 text-center hover:shadow-lg",
            "w-12 h-12 bg-primary/10 rounded-xl"
          ]
        },
        {
          name: "Form Focus",
          component: <ContactSection variant="form-focus" />,
          props: 'variant="form-focus"',
          tailwindClasses: [
            "bg-gradient-to-br from-primary/5 to-secondary/5",
            "grid grid-cols-1 md:grid-cols-2 gap-6",
            "flex flex-col sm:flex-row gap-4"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Insurance Component Library</h1>
              <p className="text-muted-foreground">
                Comprehensive set of reusable components with responsive design and Tailwind class documentation
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedDevice === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedDevice === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={selectedDevice === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDevice("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-16">
          {componentData.map((component) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Component Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">{component.name}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{component.description}</p>
              </div>

              {/* Component Variants */}
              <Tabs defaultValue={component.variants[0].name.toLowerCase().replace(/\s+/g, '-')} className="space-y-6">
                <TabsList className="grid w-full max-w-md mx-auto" style={{ gridTemplateColumns: `repeat(${component.variants.length}, 1fr)` }}>
                  {component.variants.map((variant) => (
                    <TabsTrigger
                      key={variant.name}
                      value={variant.name.toLowerCase().replace(/\s+/g, '-')}
                      className="text-xs"
                    >
                      {variant.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {component.variants.map((variant) => (
                  <TabsContent 
                    key={variant.name}
                    value={variant.name.toLowerCase().replace(/\s+/g, '-')}
                    className="space-y-6"
                  >
                    {/* Live Preview */}
                    <Card className="overflow-hidden">
                      <div className="bg-muted/30 p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{variant.name}</Badge>
                            <code className="text-xs bg-background px-2 py-1 rounded">
                              <{component.name.replace(/\s+/g, '')} {variant.props} />
                            </code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(
                              `<${component.name.replace(/\s+/g, '')} ${variant.props} />`,
                              `${component.id}-${variant.name}`
                            )}
                          >
                            {copiedCode === `${component.id}-${variant.name}` ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-0">
                        <div className={`${deviceStyles[selectedDevice]} transition-all duration-300 overflow-hidden`}>
                          {variant.component}
                        </div>
                      </div>
                    </Card>

                    {/* Tailwind Classes Documentation */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Key Tailwind Classes</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {variant.tailwindClasses.map((classGroup, index) => (
                          <div key={index} className="space-y-2">
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <code className="text-sm text-foreground break-all">
                                {classGroup}
                              </code>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs"
                              onClick={() => copyToClipboard(classGroup, `${component.id}-${variant.name}-${index}`)}
                            >
                              {copiedCode === `${component.id}-${variant.name}-${index}` ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy Classes
                                </>
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Responsive Behavior */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Responsive Behavior</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h5 className="font-medium flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Mobile (375px+)
                          </h5>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>• Single column layout</div>
                            <div>• Stacked navigation</div>
                            <div>• Reduced padding (p-4)</div>
                            <div>• Smaller text (text-2xl)</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium flex items-center gap-2">
                            <Tablet className="h-4 w-4" />
                            Tablet (768px+)
                          </h5>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>• md: Two column grids</div>
                            <div>• md:px-6 spacing</div>
                            <div>• md:text-3xl headings</div>
                            <div>• md:flex-row layouts</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            Desktop (1024px+)
                          </h5>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>• lg: Multi-column layouts</div>
                            <div>• lg:px-8 lg:py-16</div>
                            <div>• lg:text-4xl xl:text-6xl</div>
                            <div>• Full feature visibility</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          ))}
        </div>

        {/* Usage Guidelines */}
        <Card className="p-8 mt-16">
          <h3 className="text-xl font-bold mb-6">Usage Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Component Organization</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hero Section: Always first on landing pages</li>
                <li>• About Us: Company credibility section</li>
                <li>• Category Cards: Product/service showcase</li>
                <li>• Partner Logos: Trust and credibility</li>
                <li>• Contact Section: Lead generation and forms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Responsive Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use container mx-auto for centering</li>
                <li>• Apply responsive padding: px-4 sm:px-6 lg:px-8</li>
                <li>• Stack grids on mobile: grid-cols-1 md:grid-cols-2</li>
                <li>• Scale text responsively: text-2xl md:text-3xl lg:text-4xl</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}