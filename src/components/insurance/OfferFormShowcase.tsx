import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Copy, Check, Monitor, Tablet, Smartphone, Code } from "lucide-react";
import { OfferForm } from "./OfferForm";

export function OfferFormShowcase() {
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

  const tailwindClasses = [
    {
      category: "Layout & Spacing",
      classes: [
        "bg-gradient-to-br from-primary/5 to-secondary/5",
        "py-16 md:py-24",
        "container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl",
        "space-y-8",
        "grid grid-cols-1 md:grid-cols-2 gap-6"
      ]
    },
    {
      category: "Cards & Shadows",
      classes: [
        "shadow-sm",
        "shadow-lg", 
        "p-6 md:p-8",
        "rounded-lg",
        "bg-white border border-border"
      ]
    },
    {
      category: "Form Elements",
      classes: [
        "bg-white border rounded-md p-4",
        "border-destructive (error state)",
        "border-border (default state)",
        "text-sm text-destructive (error text)",
        "text-sm text-muted-foreground (helper text)"
      ]
    },
    {
      category: "Progress & States",
      classes: [
        "bg-primary/10 border border-primary/20 (current step)",
        "bg-success/10 border border-success/20 (completed step)",
        "bg-muted/50 (future step)",
        "h-2 (progress bar height)"
      ]
    },
    {
      category: "Mobile Responsive",
      classes: [
        "grid-cols-1 md:grid-cols-2",
        "text-3xl sm:text-4xl",
        "px-4 sm:px-6 lg:px-8",
        "gap-4 md:gap-6",
        "hidden sm:block"
      ]
    }
  ];

  const componentFeatures = [
    {
      title: "3-Step Progress Flow",
      description: "Visual progress indicator with step validation",
      code: `<Progress value={progress} className="h-2" />
<div className="grid grid-cols-3 gap-4">
  {steps.map((step) => (
    <div className={step.number === currentStep ? "bg-primary/10" : "bg-muted/50"}>
      <div className="w-8 h-8 rounded-full bg-primary">
        {step.number < currentStep ? <Check /> : step.number}
      </div>
    </div>
  ))}
</div>`
    },
    {
      title: "Smart Form Validation", 
      description: "Real-time validation with clear error states",
      code: `const validateStep = (step: number): boolean => {
  const newErrors: ValidationErrors = {};
  if (step === 1 && !formData.insuranceType) {
    newErrors.insuranceType = "Please select an insurance type";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

<Input className={errors.email ? 'border-destructive' : 'border-border'} />
{errors.email && (
  <p className="text-sm text-destructive flex items-center gap-1">
    <AlertCircle className="h-3 w-3" />
    {errors.email}
  </p>
)}`
    },
    {
      title: "Responsive Design",
      description: "Mobile-first layout with adaptive spacing",
      code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="space-y-2">
    <Label htmlFor="firstName">First Name</Label>
    <Input className="bg-white border rounded-md p-4" />
  </div>
</div>

// Mobile: Single column, smaller padding
// Tablet: Two columns, medium padding  
// Desktop: Full layout, large padding`
    },
    {
      title: "Dynamic Content",
      description: "Form fields adapt based on insurance type selection",
      code: `{formData.insuranceType === "auto" && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Select value={formData.vehicleYear}>
      <SelectTrigger className="bg-white border rounded-md p-4">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
    </Select>
  </div>
)}

{formData.insuranceType === "home" && (
  // Home insurance specific fields
)}

{formData.insuranceType === "life" && (
  // Life insurance specific fields  
)}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Offer Form Component</h1>
              <p className="text-muted-foreground">
                Step-based insurance quote form with progress tracking, validation, and responsive design
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
        <Tabs defaultValue="preview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="code">Code Examples</TabsTrigger>
            <TabsTrigger value="classes">Tailwind Classes</TabsTrigger>
          </TabsList>

          {/* Live Preview */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="overflow-hidden">
              <div className="bg-muted/30 p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Interactive Form</Badge>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      <OfferForm />
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard('<OfferForm className="custom-styles" />', 'offer-form')}
                  >
                    {copiedCode === 'offer-form' ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="p-0">
                <div className={`${deviceStyles[selectedDevice]} transition-all duration-300 overflow-hidden`}>
                  <OfferForm />
                </div>
              </div>
            </Card>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {componentFeatures.map((feature, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <code className="text-xs text-foreground whitespace-pre-wrap">
                      {feature.code.split('\n').slice(0, 6).join('\n')}
                      {feature.code.split('\n').length > 6 && '\n...'}
                    </code>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Code Examples */}
          <TabsContent value="code" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Basic Implementation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`import { OfferForm } from './components/insurance/OfferForm';\n\nexport default function QuotePage() {\n  return (\n    <div className="min-h-screen bg-background">\n      <OfferForm />\n    </div>\n  );\n}`, 'basic-impl')}
                >
                  {copiedCode === 'basic-impl' ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { OfferForm } from './components/insurance/OfferForm';

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background">
      <OfferForm />
    </div>
  );
}`}</code>
                </pre>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Form Validation Pattern</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`const validateStep = (step: number): boolean => {\n  const newErrors: ValidationErrors = {};\n  \n  if (step === 1) {\n    if (!formData.insuranceType) {\n      newErrors.insuranceType = "Please select an insurance type";\n    }\n  }\n  \n  if (step === 3) {\n    if (!formData.email) newErrors.email = "Email is required";\n    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {\n      newErrors.email = "Please enter a valid email";\n    }\n  }\n  \n  setErrors(newErrors);\n  return Object.keys(newErrors).length === 0;\n};`, 'validation-pattern')}
                >
                  {copiedCode === 'validation-pattern' ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`const validateStep = (step: number): boolean => {
  const newErrors: ValidationErrors = {};
  
  if (step === 1) {
    if (!formData.insuranceType) {
      newErrors.insuranceType = "Please select an insurance type";
    }
  }
  
  if (step === 3) {
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};`}</code>
                </pre>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Progress Indicator Component</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`<div className="grid grid-cols-3 gap-4">\n  {steps.map((step) => (\n    <div\n      key={step.number}\n      className={\\`text-center p-3 rounded-lg transition-colors \\${\n        step.number === currentStep\n          ? "bg-primary/10 border border-primary/20"\n          : step.number < currentStep\n          ? "bg-success/10 border border-success/20"\n          : "bg-muted/50"\n      }\\`}\n    >\n      <div className={\\`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 \\${\n        step.number === currentStep\n          ? "bg-primary text-primary-foreground"\n          : step.number < currentStep\n          ? "bg-success text-success-foreground"\n          : "bg-muted text-muted-foreground"\n      }\\`}>\n        {step.number < currentStep ? (\n          <Check className="h-4 w-4" />\n        ) : (\n          <span className="text-sm font-medium">{step.number}</span>\n        )}\n      </div>\n      <h4 className="font-medium text-sm">{step.title}</h4>\n    </div>\n  ))}\n</div>`, 'progress-indicator')}
                >
                  {copiedCode === 'progress-indicator' ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`<div className="grid grid-cols-3 gap-4">
  {steps.map((step) => (
    <div
      key={step.number}
      className={\`text-center p-3 rounded-lg transition-colors \${
        step.number === currentStep
          ? "bg-primary/10 border border-primary/20"
          : step.number < currentStep
          ? "bg-success/10 border border-success/20"
          : "bg-muted/50"
      }\`}
    >
      <div className={\`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 \${
        step.number === currentStep
          ? "bg-primary text-primary-foreground"
          : step.number < currentStep
          ? "bg-success text-success-foreground"
          : "bg-muted text-muted-foreground"
      }\`}>
        {step.number < currentStep ? (
          <Check className="h-4 w-4" />
        ) : (
          <span className="text-sm font-medium">{step.number}</span>
        )}
      </div>
      <h4 className="font-medium text-sm">{step.title}</h4>
    </div>
  ))}
</div>`}</code>
                </pre>
              </div>
            </Card>
          </TabsContent>

          {/* Tailwind Classes */}
          <TabsContent value="classes" className="space-y-6">
            {tailwindClasses.map((section, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-4">{section.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.classes.map((className, classIndex) => (
                    <div key={classIndex} className="space-y-2">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <code className="text-sm text-foreground break-all">
                          {className}
                        </code>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => copyToClipboard(className, `${section.category}-${classIndex}`)}
                      >
                        {copiedCode === `${section.category}-${classIndex}` ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Class
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* Responsive Guidelines */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Responsive Design Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Mobile (375px+)
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• <code>px-4</code> - Minimal side padding</div>
                    <div>• <code>py-16</code> - Reduced vertical spacing</div>
                    <div>• <code>grid-cols-1</code> - Single column layout</div>
                    <div>• <code>text-3xl</code> - Smaller headings</div>
                    <div>• <code>gap-4</code> - Tighter gaps</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Tablet className="h-4 w-4" />
                    Tablet (768px+)
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• <code>md:px-6</code> - Medium padding</div>
                    <div>• <code>md:py-24</code> - Increased spacing</div>
                    <div>• <code>md:grid-cols-2</code> - Two columns</div>
                    <div>• <code>sm:text-4xl</code> - Larger headings</div>
                    <div>• <code>md:gap-6</code> - Comfortable gaps</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop (1024px+)
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• <code>lg:px-8</code> - Maximum padding</div>
                    <div>• <code>max-w-4xl</code> - Content width limit</div>
                    <div>• <code>lg:grid-cols-3</code> - Three columns</div>
                    <div>• <code>text-4xl</code> - Full size headings</div>
                    <div>• <code>gap-8</code> - Spacious layout</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}