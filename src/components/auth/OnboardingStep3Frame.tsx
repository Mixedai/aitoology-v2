import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, ArrowRight, Check, Brain, Image, Music, Video, Bot, Zap, Search, Mail, Package, Bell, Sparkles } from 'lucide-react';

/*
ONBOARDING STEP 3: FINISH - AI TOOLOGIST DESIGN SYSTEM

Summary and completion screen showing user selections with personalized CTA to Browse Tools.
Features comprehensive Tailwind class mappings and mobile-optimized layout.

LAYOUT ARCHITECTURE:
- Card container: max-w-lg mx-auto (centered, responsive width)
- Summary sections: space-y-6 (vertical rhythm between sections)
- Selection items: flex items-center gap-3 (horizontal alignment)

SUMMARY SECTIONS:
- Selected Interests: Grid of selected categories with icons
- Notification Preferences: List of enabled communication settings
- Next Steps: Personalized call-to-action

SELECTION DISPLAY:
- Interest chips: badge-style with primary colors
- Preference items: check icon with labels
- Completion state: success colors and congratulations

TAILWIND CLASSES REFERENCE:
- Summary section: space-y-4 p-4 bg-muted/30 rounded-lg
- Interest badge: inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full
- Preference item: flex items-center gap-2 text-sm
- Success elements: text-success bg-success/10 border-success/20
- CTA button: bg-primary text-primary-foreground hover:bg-primary/90
*/

interface OnboardingStep3FrameProps {
  onNavigate?: (destination: string, data?: any) => void;
  showVariants?: boolean;
  initialData?: any;
}

const interestIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  llm: Brain,
  image: Image,
  audio: Music,
  video: Video,
  agents: Bot,
  automation: Zap,
  research: Search
};

const interestLabels: Record<string, string> = {
  llm: 'LLM',
  image: 'Image',
  audio: 'Audio',
  video: 'Video',
  agents: 'Agents',
  automation: 'Automation',
  research: 'Research'
};

const preferenceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  emailTips: Mail,
  weeklyDigest: Package,
  productUpdates: Bell
};

const preferenceLabels: Record<string, string> = {
  emailTips: 'Email tips',
  weeklyDigest: 'Weekly digest',
  productUpdates: 'Product updates'
};

export function OnboardingStep3Frame({ 
  onNavigate, 
  showVariants = true, 
  initialData 
}: OnboardingStep3FrameProps) {
  
  // Mock data for demo purposes
  const selectedInterests = initialData?.selectedInterests || ['llm', 'image', 'automation'];
  const notificationPreferences = initialData?.notificationPreferences || {
    emailTips: true,
    weeklyDigest: true,
    productUpdates: false
  };

  const enabledPreferences = Object.entries(notificationPreferences)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key);

  const handleFinish = () => {
    if (onNavigate) {
      // Navigate to Browse Tools with pre-filled filters based on selected interests
      onNavigate('browse', { 
        preFilledCategories: selectedInterests,
        onboardingComplete: true 
      });
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('onboarding-step-2');
    }
  };

  const renderOnboardingCard = (title: string, variant: string) => (
    <Card className="w-full max-w-lg mx-auto">
      {showVariants && (
        <div className="bg-muted/30 p-3 border-b">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {variant}
            </Badge>
            <div className="text-xs text-muted-foreground font-mono">
              Step 3/3 • Completion Summary
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Back to preferences"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              {title}
              <Sparkles className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="mt-1">
              You're all set! Here's a summary of your personalized AI Toologist experience.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Indicator - Complete */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Step 3 of 3</span>
            <span className="text-success flex items-center gap-1">
              <Check className="w-3 h-3" />
              Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Congratulations */}
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 text-success">
            <Check className="w-5 h-5" />
            <div>
              <p className="font-medium">Congratulations!</p>
              <p className="text-sm text-success/80 mt-1">
                Your AI Toologist account is ready with personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Interests Summary */}
        <div className="space-y-4">
          <h3 className="font-medium">Your interests</h3>
          <div className="p-4 bg-muted/30 rounded-lg space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map(interestId => {
                const IconComponent = interestIcons[interestId];
                const label = interestLabels[interestId];
                
                return (
                  <div
                    key={interestId}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    <IconComponent className="w-3 h-3" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              We'll show you tools from these categories first
            </p>
          </div>
        </div>

        {/* Notification Preferences Summary */}
        <div className="space-y-4">
          <h3 className="font-medium">Notifications</h3>
          <div className="p-4 bg-muted/30 rounded-lg space-y-3">
            {enabledPreferences.length > 0 ? (
              <div className="space-y-2">
                {enabledPreferences.map(prefId => {
                  const IconComponent = preferenceIcons[prefId];
                  const label = preferenceLabels[prefId];
                  
                  return (
                    <div key={prefId} className="flex items-center gap-2 text-sm">
                      <Check className="w-3 h-3 text-success" />
                      <IconComponent className="w-3 h-3 text-muted-foreground" />
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No notifications enabled</p>
            )}
            <p className="text-xs text-muted-foreground">
              Change these anytime in settings
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <Button 
            onClick={handleFinish}
            size="lg"
            className="w-full"
          >
            Go to Personalized Browse
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <div className="text-center">
            <button
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Go back to make changes
            </button>
          </div>
        </div>

        {showVariants && (
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Tailwind Classes:</strong></p>
              <p>• Summary section: <code>p-4 bg-muted/30 rounded-lg space-y-3</code></p>
              <p>• Interest badge: <code>inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full</code></p>
              <p>• Preference item: <code>flex items-center gap-2 text-sm</code></p>
              <p>• Success state: <code>text-success bg-success/10 border-success/20</code></p>
              <p>• Progress complete: <code>bg-success h-2 rounded-full transition-all duration-500</code></p>
              <p>• CTA button: <code>w-full size-lg bg-primary hover:bg-primary/90</code></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!showVariants) {
    return renderOnboardingCard("You're all set!", "Single Frame");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Component Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Onboarding Step 3: Finish</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Completion summary showing user selections with personalized call-to-action. 
            Features success states and comprehensive Tailwind class mappings.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="gap-1">
              <Check className="w-3 h-3" />
              Summary
            </Badge>
            <Badge variant="outline">Completion</Badge>
            <Badge variant="outline">Success State</Badge>
            <Badge variant="outline">Personalized CTA</Badge>
          </div>
        </div>
      </div>

      {/* Component Variants */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Desktop Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Desktop Variant</h3>
          {renderOnboardingCard("You're all set!", "Desktop")}
        </div>

        {/* Mobile Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Mobile Variant</h3>
          <div className="max-w-sm mx-auto">
            {renderOnboardingCard("You're all set!", "Mobile")}
          </div>
        </div>

        {/* Implementation Notes */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Implementation Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Component Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete progress indicator (100%)</li>
                  <li>• Success state with congratulations message</li>
                  <li>• Summary of selected interests with icons</li>
                  <li>• Enabled notification preferences list</li>
                  <li>• Personalized CTA leading to Browse Tools</li>
                  <li>• Option to go back and make changes</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Prototype Flow</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Entry: From Onboarding Step 2 with complete data</li>
                  <li>• Display: Summary of all user selections</li>
                  <li>• Primary action: "Go to Personalized Browse"</li>
                  <li>• Navigation: CTA → Browse Tools with pre-filled filters</li>
                  <li>• Back: "Go back" → Onboarding Step 2</li>
                  <li>• Completion: Marks onboarding as finished</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}